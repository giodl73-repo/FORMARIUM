(function (root) {
  "use strict";

  var SHA_PATTERN = /^[0-9a-f]{64}$/;
  var LIMITS = { depth: 6, edges: 6, nodes: 24, work: 64 };

  function assert(condition, message) {
    if (!condition) throw new Error(message);
  }

  function uniqueSorted(values, label) {
    assert(Array.isArray(values), label + " must be an array");
    var sorted = values.slice().sort();
    sorted.forEach(function (value, index) {
      assert(typeof value === "string" && value.length > 0, label + " has an invalid identity");
      assert(index === 0 || value !== sorted[index - 1], label + " repeats " + value);
    });
    return sorted;
  }

  function validatePayloads(labPayload, readingPayload) {
    assert(labPayload && labPayload.schema === "factorium-composition-lab-payload-v0",
      "Unknown composition lab payload");
    assert(readingPayload && readingPayload.schema === "factorium-composition-reading-payload-v0",
      "Unknown composition reading payload");
    assert(SHA_PATTERN.test(labPayload.referenceSha256) && SHA_PATTERN.test(labPayload.relationsSha256),
      "Invalid composition source identity");
    assert(readingPayload.referenceSha256 === labPayload.referenceSha256 &&
      readingPayload.relationsSha256 === labPayload.relationsSha256,
    "Composition payload identity mismatch");
    assert(Array.isArray(labPayload.relations) && Array.isArray(readingPayload.bindings),
      "Composition payload records are missing");
  }

  function buildContinuations(result, labPayload, readingPayload, resultSha256) {
    validatePayloads(labPayload, readingPayload);
    assert(result && result.schema === "factorium-composition-lab-result-v0" && result.request &&
      result.request.budget && result.sources && result.graph && SHA_PATTERN.test(resultSha256),
    "Malformed composition continuation input");
    assert(result.sources.referenceSha256 === labPayload.referenceSha256 &&
      result.sources.relationsSha256 === labPayload.relationsSha256,
    "Result source identity mismatch");
    ["nodes", "edges", "frontiers", "unresolvedRelations", "conflicts", "inactiveExclusions"]
      .forEach(function (key) { assert(Array.isArray(result.graph[key]), "Missing graph " + key); });

    var relationById = new Map(labPayload.relations.map(function (relation) {
      return [relation.id, relation];
    }));
    assert(relationById.size === labPayload.relations.length, "Duplicate relation identity");
    var bindingByArtifact = new Map(readingPayload.bindings.map(function (binding) {
      return [binding.artifact, binding];
    }));
    assert(bindingByArtifact.size === readingPayload.bindings.length, "Duplicate reading binding");
    var nodeByArtifact = new Map(result.graph.nodes.map(function (node) {
      return [node.artifact, node];
    }));
    assert(nodeByArtifact.size === result.graph.nodes.length, "Duplicate working node");
    var selectedRelations = uniqueSorted(result.request.relations, "Relations");
    var selectedSeeds = uniqueSorted(result.request.seeds, "Seeds");
    var selectedExclusions = uniqueSorted(result.request.exclusions, "Exclusions");
    assert(["depth", "edges", "nodes", "work"].every(function (control) {
      return Number.isInteger(result.request.budget[control]);
    }) && Number.isInteger(result.work), "Invalid continuation budget record");
    result.graph.edges.forEach(function (edge) {
      assert(selectedRelations.includes(edge.id), "Unselected admitted edge " + edge.id);
    });
    result.graph.frontiers.concat(result.graph.unresolvedRelations).forEach(function (record) {
      assert(selectedRelations.includes(record.relation), "Unselected relation boundary " + record.relation);
    });
    result.graph.conflicts.concat(result.graph.inactiveExclusions).forEach(function (record) {
      assert(selectedExclusions.includes(record.artifact), "Unselected exclusion boundary " + record.artifact);
    });
    var actions = [];

    function binding(artifact) {
      var record = bindingByArtifact.get(artifact);
      assert(record, "Missing continuation binding " + artifact);
      return { artifact: artifact, label: record.label, href: record.href, pageTitle: record.pageTitle };
    }

    function single(records, key, value, label) {
      var matches = records.filter(function (record) { return record[key] === value; });
      assert(matches.length <= 1, "Duplicate " + label + " " + value);
      return matches[0] || null;
    }

    function budgetAction(relation, reason, control, before, after) {
      assert(Number.isInteger(before) && Number.isInteger(after) && after > before,
        "Invalid continuation budget arithmetic " + relation.id);
      var available = after <= LIMITS[control];
      return {
        id: "relation-" + relation.id + "-raise-" + control,
        sourceKind: "relation",
        sourceIdentity: relation.id,
        sourceReason: reason,
        kind: "raise-budget",
        target: { control: control, before: before, after: after },
        label: "Raise " + control + " budget: " + before + " → " + after,
        explanation: "Changes only the finite " + control + " control for the next request.",
        available: available,
        unavailableReason: available ? "none" : control + " maximum is " + LIMITS[control]
      };
    }

    selectedRelations.forEach(function (relationId) {
      var relation = relationById.get(relationId);
      assert(relation, "Unknown selected relation " + relationId);
      var edge = single(result.graph.edges, "id", relationId, "edge");
      var frontier = single(result.graph.frontiers, "relation", relationId, "frontier");
      var unresolved = single(result.graph.unresolvedRelations, "relation", relationId, "unresolved relation");
      assert([edge, frontier, unresolved].filter(Boolean).length === 1,
        "Selected relation must have one continuation source " + relationId);
      if (edge) {
        ["verb", "source", "target", "scope", "qualifiers"].forEach(function (key) {
          assert(edge[key] === relation[key], "Admitted edge drift " + relationId + " " + key);
        });
        return;
      }

      var predecessor = result.request.direction === "forward" ? relation.source : relation.target;
      var derived = result.request.direction === "forward" ? relation.target : relation.source;
      var predecessorNode = nodeByArtifact.get(predecessor);
      var source = frontier || unresolved;
      var reason = source.reason;
      if (frontier) {
        assert(frontier.artifact === derived && predecessorNode,
          "Frontier continuation does not match relation " + relationId);
        if (reason === "edge-budget-before-" + relationId) {
          actions.push(budgetAction(relation, reason, "edges", result.request.budget.edges,
            result.request.budget.edges + 1));
        } else if (reason === "depth-budget-before-" + relationId) {
          actions.push(budgetAction(relation, reason, "depth", result.request.budget.depth,
            predecessorNode.depth + 1));
        } else if (reason === "node-budget-before-" + relationId) {
          var missing = [derived, relation.scope].filter(function (artifact, index, values) {
            return values.indexOf(artifact) === index && !nodeByArtifact.has(artifact);
          }).length;
          assert(missing > 0, "Node frontier has no missing atomic nodes " + relationId);
          actions.push(budgetAction(relation, reason, "nodes", result.request.budget.nodes,
            result.graph.nodes.length + missing));
        } else {
          throw new Error("Unknown frontier continuation reason " + reason);
        }
        return;
      }

      assert(unresolved.predecessor === predecessor, "Unresolved predecessor mismatch " + relationId);
      if (reason === "selected-predecessor-not-reached") {
        var available = !selectedSeeds.includes(predecessor) && selectedSeeds.length < 3;
        var predecessorBinding = binding(predecessor);
        actions.push({
          id: "relation-" + relation.id + "-add-predecessor-seed",
          sourceKind: "relation", sourceIdentity: relation.id, sourceReason: reason,
          kind: "add-seed",
          target: { control: "seeds", artifact: predecessor, before: false, after: true },
          label: "Add " + predecessorBinding.label + " as a seed",
          explanation: "Adds the exact traversal predecessor to the next request.",
          available: available,
          unavailableReason: available ? "none" : "seed maximum is 3",
          artifact: predecessorBinding
        });
        return;
      }
      var match = /^atomic-relation-needs-(\d+)-(node|work)-slots$/.exec(reason);
      if (match) {
        var amount = Number(match[1]);
        var control = match[2] === "node" ? "nodes" : "work";
        var observed = control === "nodes" ? result.graph.nodes.length : result.work;
        actions.push(budgetAction(relation, reason, control, result.request.budget[control], observed + amount));
      } else if (reason === "depth-budget-not-reached-by-working-graph") {
        assert(predecessorNode, "Depth continuation predecessor is not a working node " + relationId);
        actions.push(budgetAction(relation, reason, "depth", result.request.budget.depth,
          predecessorNode.depth + 1));
      } else if (reason === "atomic-frontier-needs-1-work-slot") {
        actions.push(budgetAction(relation, reason, "work", result.request.budget.work, result.work + 1));
      } else {
        throw new Error("Unknown unresolved continuation reason " + reason);
      }
    });

    selectedExclusions.forEach(function (artifact) {
      var conflict = single(result.graph.conflicts, "artifact", artifact, "conflict");
      var inactive = single(result.graph.inactiveExclusions, "artifact", artifact, "inactive exclusion");
      assert([conflict, inactive].filter(Boolean).length === 1,
        "Selected exclusion must have one continuation source " + artifact);
      var source = conflict || inactive;
      if (conflict) {
        assert(/^requested-exclusion-of-reached-(required|evaluative)-node$/.test(source.reason),
          "Unknown exclusion conflict reason " + source.reason);
      } else {
        assert(source.reason === "target-not-reached", "Unknown inactive exclusion reason " + source.reason);
      }
      var bound = binding(artifact);
      actions.push({
        id: "exclusion-" + artifact.replace(/[^a-z0-9]+/g, "-") + "-remove",
        sourceKind: "exclusion", sourceIdentity: artifact, sourceReason: source.reason,
        kind: "remove-exclusion",
        target: { control: "exclusions", artifact: artifact, before: true, after: false },
        label: "Remove " + bound.label + " exclusion",
        explanation: "Removes only this exclusion request from the next request.",
        available: true, unavailableReason: "none", artifact: bound
      });
    });

    actions.sort(function (left, right) { return left.id.localeCompare(right.id); });
    return {
      schema: "factorium-composition-continuations-v0",
      resultSha256: resultSha256,
      sources: { referenceSha256: labPayload.referenceSha256,
        relationsSha256: labPayload.relationsSha256 },
      actions: actions,
      counts: { total: actions.length,
        available: actions.filter(function (action) { return action.available; }).length,
        unavailable: actions.filter(function (action) { return !action.available; }).length },
      boundary: "These optional edits change controls only. They do not rerun closure or predict the next result."
    };
  }

  function element(documentObject, tag, className, text) {
    var node = documentObject.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function findControl(form, action) {
    if (action.kind === "raise-budget") return form.elements[action.target.control];
    return Array.from(form.querySelectorAll('input[name="' + action.target.control + '"]'))
      .find(function (input) { return input.value === action.target.artifact; }) || null;
  }

  function applyAction(form, action) {
    assert(action.available, "Continuation is unavailable");
    var control = findControl(form, action);
    assert(control, "Continuation target control is missing");
    if (action.kind === "raise-budget") {
      assert(Number(control.value) === action.target.before,
        "controls changed since this result");
      control.value = String(action.target.after);
    } else {
      assert(control.checked === action.target.before, "controls changed since this result");
      if (action.kind === "add-seed") {
        var selectedCount = form.querySelectorAll('input[name="seeds"]:checked').length;
        assert(selectedCount < 3, "controls changed since this result");
      }
      control.checked = action.target.after;
    }
    control.dispatchEvent(new Event("input", { bubbles: true }));
    control.dispatchEvent(new Event("change", { bubbles: true }));
    return control;
  }

  function renderContinuations(documentObject, reconciliationSection, record, form) {
    var existing = reconciliationSection.querySelector(".composition-continuations");
    if (existing) existing.remove();
    var section = element(documentObject, "section", "composition-continuations");
    section.append(element(documentObject, "h4", "", "Possible next-request edits"),
      element(documentObject, "p", "composition-continuations__intro",
        "Choose an exact control edit only if it fits your intent. Another boundary may appear after rerun."));
    var list = element(documentObject, "ul", "composition-continuations__list");
    if (!record.actions.length) {
      list.appendChild(element(documentObject, "li", "lab-empty",
        "No mechanical next edit is derived from this result."));
    }
    record.actions.forEach(function (action) {
      var item = element(documentObject, "li", "composition-continuations__item");
      var button = element(documentObject, "button", "", action.label);
      button.type = "button";
      button.disabled = !action.available;
      button.dataset.continuationId = action.id;
      item.append(button, element(documentObject, "p", "", action.explanation));
      if (!action.available) {
        item.appendChild(element(documentObject, "small", "", "Unavailable · " + action.unavailableReason));
      }
      item.appendChild(element(documentObject, "small", "composition-meta--full",
        action.id + " · " + action.sourceReason + " · result " + record.resultSha256));
      button.addEventListener("click", function () {
        try {
          applyAction(form, action);
          button.disabled = true;
          button.dataset.applied = "true";
          status.textContent = "Applied to controls: " + action.label +
            ". The displayed result is unchanged; run again when ready.";
        } catch (error) {
          status.textContent = "Not applied: " + error.message + ".";
        }
      });
      list.appendChild(item);
    });
    section.appendChild(list);
    var status = element(documentObject, "p", "composition-continuations__status",
      "No edit applied. The displayed result still matches its executed controls.");
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");
    section.append(status, element(documentObject, "p", "composition-continuations__boundary", record.boundary));
    var boundary = reconciliationSection.querySelector(".composition-reconciliation__boundary");
    if (boundary) boundary.insertAdjacentElement("beforebegin", section);
    else reconciliationSection.appendChild(section);
  }

  var api = { buildContinuations: buildContinuations, applyAction: applyAction,
    validatePayloads: validatePayloads };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (root && root.document && root.FACTORIUM_COMPOSITION_LAB && root.FACTORIUM_COMPOSITION_READING &&
    typeof root.FACTORIUM_COMPOSITION_READING_ROUTE_RENDER === "function") {
    var previousRenderer = root.FACTORIUM_COMPOSITION_READING_ROUTE_RENDER;
    root.FACTORIUM_COMPOSITION_READING_ROUTE_RENDER = function (identified) {
      previousRenderer(identified);
      var reconciliationSection = root.document.getElementById("composition-result-reconciliation");
      var form = root.document.getElementById("composition-lab-form");
      if (!reconciliationSection || !form) return;
      try {
        renderContinuations(root.document, reconciliationSection,
          buildContinuations(identified.result, root.FACTORIUM_COMPOSITION_LAB,
            root.FACTORIUM_COMPOSITION_READING, identified.sha256), form);
      } catch (_) {
        var boundary = reconciliationSection.querySelector(".composition-reconciliation__boundary");
        var notice = element(root.document, "p", "lab-error", "Next-request edits unavailable; controls and result are unchanged.");
        if (boundary) boundary.insertAdjacentElement("beforebegin", notice);
        else reconciliationSection.appendChild(notice);
      }
    };
  }
})(typeof window !== "undefined" ? window : null);

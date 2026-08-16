(function (root) {
  "use strict";

  var ID_PATTERN = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
  var SHA_PATTERN = /^[0-9a-f]{64}$/;

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

  function shortCode(relationId) {
    var match = /^f([1-6])-/.exec(relationId);
    assert(match, "Unknown relation code " + relationId);
    return "F" + match[1];
  }

  function bindArtifact(artifact, bindingByArtifact) {
    var binding = bindingByArtifact.get(artifact);
    assert(binding, "Missing reading binding " + artifact);
    return {
      artifact: artifact,
      label: binding.label,
      pageTitle: binding.pageTitle,
      href: binding.href,
      kind: binding.kind
    };
  }

  function plainReason(decision, rawReason) {
    if (decision === "admitted") return "Traversed into the bounded working graph.";
    if (decision === "stopped") return "Stopped at the declared " + rawReason.split("-budget-before-")[0] + " budget.";
    if (rawReason === "selected-predecessor-not-reached") return "Its selected predecessor was not reached.";
    if (rawReason === "depth-budget-not-reached-by-working-graph") return "The next depth could not be admitted atomically.";
    if (/^atomic-frontier-needs-1-work-slot$/.test(rawReason)) return "The frontier record could not fit the work cap.";
    var match = /^atomic-relation-needs-(\d+)-(node|work)-slots$/.exec(rawReason);
    if (match) return "The atomic relation needed " + match[1] + " " + match[2] + " slots.";
    throw new Error("Unknown reconciliation reason " + rawReason);
  }

  function buildReconciliation(result, labPayload, readingPayload, resultSha256) {
    validatePayloads(labPayload, readingPayload);
    assert(result && result.schema === "factorium-composition-lab-result-v0",
      "Unknown composition result");
    assert(SHA_PATTERN.test(resultSha256), "Invalid result identity");
    assert(result.sources && result.sources.referenceSha256 === labPayload.referenceSha256 &&
      result.sources.relationsSha256 === labPayload.relationsSha256,
    "Result source identity mismatch");
    assert(result.request && result.request.budget && result.graph &&
      Array.isArray(result.graph.nodes) && Array.isArray(result.graph.edges) &&
      Array.isArray(result.graph.frontiers) && Array.isArray(result.graph.unresolvedRelations) &&
      Array.isArray(result.graph.conflicts) && Array.isArray(result.graph.inactiveExclusions) &&
      Array.isArray(result.evaluation), "Malformed composition result");

    var relationById = new Map(labPayload.relations.map(function (relation) {
      assert(ID_PATTERN.test(relation.id), "Invalid relation identity");
      return [relation.id, relation];
    }));
    assert(relationById.size === labPayload.relations.length, "Duplicate relation identity");
    var bindingByArtifact = new Map(readingPayload.bindings.map(function (binding) {
      return [binding.artifact, binding];
    }));
    assert(bindingByArtifact.size === readingPayload.bindings.length, "Duplicate reading binding");

    var nodesByArtifact = new Map(result.graph.nodes.map(function (node) {
      return [node.artifact, node];
    }));
    assert(nodesByArtifact.size === result.graph.nodes.length, "Duplicate working node");
    var seeds = uniqueSorted(result.request.seeds, "Seeds").map(function (artifact) {
      var node = nodesByArtifact.get(artifact);
      assert(node && node.class === "required" && node.depth === 0 &&
        node.origin === "seed" && node.predecessor === "none",
      "Seed is not an admitted depth-zero node " + artifact);
      return { artifact: bindArtifact(artifact, bindingByArtifact), decision: "admitted-seed" };
    });

    function singleBy(records, key, value, label) {
      var matches = records.filter(function (record) { return record[key] === value; });
      assert(matches.length <= 1, "Duplicate " + label + " for " + value);
      return matches[0] || null;
    }

    var selectedRelationIds = uniqueSorted(result.request.relations, "Relations");
    var selectedRelationSet = new Set(selectedRelationIds);
    result.graph.edges.forEach(function (edge) {
      assert(selectedRelationSet.has(edge.id), "Result contains an unselected edge " + edge.id);
    });
    result.graph.frontiers.forEach(function (frontier) {
      assert(selectedRelationSet.has(frontier.relation), "Result contains an unselected frontier " + frontier.relation);
    });
    result.graph.unresolvedRelations.forEach(function (unresolved) {
      assert(selectedRelationSet.has(unresolved.relation), "Result contains an unselected unresolved relation " + unresolved.relation);
    });
    var relationDecisions = selectedRelationIds.map(function (relationId) {
      var relation = relationById.get(relationId);
      assert(relation, "Unknown selected relation " + relationId);
      var edge = singleBy(result.graph.edges, "id", relationId, "edge");
      var frontier = singleBy(result.graph.frontiers, "relation", relationId, "frontier");
      var unresolved = singleBy(result.graph.unresolvedRelations, "relation", relationId, "unresolved relation");
      assert([edge, frontier, unresolved].filter(Boolean).length === 1,
        "Selected relation must have exactly one result decision " + relationId);
      var predecessor = result.request.direction === "forward" ? relation.source : relation.target;
      var derived = result.request.direction === "forward" ? relation.target : relation.source;
      var decision;
      var rawReason;
      var check = null;
      if (edge) {
        decision = "admitted";
        rawReason = "admitted-edge";
        assert(edge.verb === relation.verb && edge.source === relation.source &&
          edge.target === relation.target && edge.scope === relation.scope &&
          edge.qualifiers === relation.qualifiers, "Admitted edge does not match its relation " + relationId);
        check = singleBy(result.evaluation, "id", relationId + "-scope-review", "check");
        assert(check && check.target === relation.scope && check.outcome === "unresolved",
          "Admitted relation requires its unresolved scope check " + relationId);
      } else if (frontier) {
        decision = "stopped";
        rawReason = frontier.reason;
        assert(/^(edge|depth|node)-budget-before-/.test(rawReason) &&
          rawReason.endsWith(relationId), "Invalid frontier reason " + relationId);
        assert(frontier.artifact === derived, "Frontier does not name the derived endpoint " + relationId);
      } else {
        rawReason = unresolved.reason;
        assert(unresolved.predecessor === predecessor,
          "Unresolved relation does not name its traversal predecessor " + relationId);
        decision = rawReason === "selected-predecessor-not-reached" ?
          "predecessor-unreached" : "capacity-limited";
        if (decision === "capacity-limited") plainReason(decision, rawReason);
      }
      return {
        id: relation.id,
        code: shortCode(relation.id),
        verb: relation.verb,
        decision: decision,
        explanation: plainReason(decision, rawReason),
        rawReason: rawReason,
        canonicalSource: bindArtifact(relation.source, bindingByArtifact),
        canonicalTarget: bindArtifact(relation.target, bindingByArtifact),
        predecessor: bindArtifact(predecessor, bindingByArtifact),
        derived: bindArtifact(derived, bindingByArtifact),
        scope: bindArtifact(relation.scope, bindingByArtifact),
        qualifiers: relation.qualifiers,
        check: check ? { id: check.id, kind: check.kind, target: check.target, outcome: check.outcome } : null
      };
    });

    var selectedExclusionIds = uniqueSorted(result.request.exclusions, "Exclusions");
    var selectedExclusionSet = new Set(selectedExclusionIds);
    result.graph.conflicts.forEach(function (conflict) {
      assert(selectedExclusionSet.has(conflict.artifact), "Result contains an unselected conflict " + conflict.artifact);
    });
    result.graph.inactiveExclusions.forEach(function (inactive) {
      assert(selectedExclusionSet.has(inactive.artifact), "Result contains an unselected inactive exclusion " + inactive.artifact);
    });
    var exclusions = selectedExclusionIds.map(function (artifact) {
      var conflict = singleBy(result.graph.conflicts, "artifact", artifact, "conflict");
      var inactive = singleBy(result.graph.inactiveExclusions, "artifact", artifact, "inactive exclusion");
      assert([conflict, inactive].filter(Boolean).length === 1,
        "Selected exclusion must have exactly one result decision " + artifact);
      if (conflict) {
        assert(/^requested-exclusion-of-reached-(required|evaluative)-node$/.test(conflict.reason),
          "Invalid exclusion conflict reason " + artifact);
      } else {
        assert(inactive.reason === "target-not-reached", "Invalid inactive exclusion reason " + artifact);
      }
      return {
        artifact: bindArtifact(artifact, bindingByArtifact),
        decision: conflict ? "conflict" : "inactive",
        explanation: conflict ?
          "The reached required or evaluative node remained and created a conflict." :
          "The requested target was not reached, so the exclusion remained inactive.",
        rawReason: (conflict || inactive).reason
      };
    });

    var maxDepth = result.graph.nodes.reduce(function (maximum, node) {
      assert(Number.isInteger(node.depth) && node.depth >= 0, "Invalid node depth");
      return Math.max(maximum, node.depth);
    }, 0);
    var budgetUses = { depth: maxDepth, edges: result.graph.edges.length,
      nodes: result.graph.nodes.length, work: result.work };
    var budgets = ["depth", "edges", "nodes", "work"].map(function (name) {
      var cap = result.request.budget[name];
      var used = budgetUses[name];
      assert(Number.isInteger(cap) && Number.isInteger(used) && used <= cap,
        "Invalid " + name + " budget ledger");
      return { name: name, used: used, cap: cap, status: used === cap ? "reached" : "remaining" };
    });

    var admittedCount = relationDecisions.filter(function (item) { return item.decision === "admitted"; }).length;
    var stoppedCount = relationDecisions.filter(function (item) { return item.decision === "stopped"; }).length;
    var capacityCount = relationDecisions.filter(function (item) { return item.decision === "capacity-limited"; }).length;
    var unreachableCount = relationDecisions.filter(function (item) { return item.decision === "predecessor-unreached"; }).length;
    var conflictCount = exclusions.filter(function (item) { return item.decision === "conflict"; }).length;
    var inactiveCount = exclusions.length - conflictCount;
    assert(admittedCount + stoppedCount + capacityCount + unreachableCount === relationDecisions.length,
      "Relation decisions do not reconcile");
    assert(conflictCount + inactiveCount === exclusions.length, "Exclusion decisions do not reconcile");
    assert(result.evaluation.length === admittedCount,
      "Evaluation records do not reconcile with admitted relations");

    var unresolvedChecks = result.evaluation.filter(function (check) { return check.outcome === "unresolved"; }).length;
    var explanation;
    if (result.state === "contradictory") {
      assert(conflictCount > 0, "Contradictory result requires a selected exclusion conflict");
      explanation = conflictCount + " selected exclusion " + (conflictCount === 1 ? "request conflicts" : "requests conflict") +
        " with a reached required or evaluative node.";
    } else if (result.state === "truncated") {
      assert(stoppedCount > 0 && conflictCount === 0, "Truncated result requires a stopped frontier without conflict");
      explanation = stoppedCount + " selected " + (stoppedCount === 1 ? "relation stopped" : "relations stopped") +
        " at a declared budget frontier.";
    } else {
      assert(result.state === "incomplete" && conflictCount === 0 && stoppedCount === 0,
        "Unsupported reconciliation state");
      var unadmittedCount = capacityCount + unreachableCount;
      explanation = unresolvedChecks + " structural " + (unresolvedChecks === 1 ? "check remains" : "checks remain") +
        " unresolved; " + (unadmittedCount === 0 ?
          "all selected relations were structurally admitted." :
          unadmittedCount + " selected " + (unadmittedCount === 1 ? "relation was" : "relations were") + " not traversed.");
    }

    return {
      schema: "factorium-composition-reconciliation-v0",
      resultSha256: resultSha256,
      sources: { referenceSha256: labPayload.referenceSha256,
        relationsSha256: labPayload.relationsSha256 },
      state: result.state,
      stateExplanation: explanation,
      counts: {
        selectedSeeds: seeds.length,
        selectedRelations: relationDecisions.length,
        admittedRelations: admittedCount,
        stoppedRelations: stoppedCount,
        capacityLimitedRelations: capacityCount,
        predecessorUnreachedRelations: unreachableCount,
        selectedExclusions: exclusions.length,
        conflictExclusions: conflictCount,
        inactiveExclusions: inactiveCount,
        unresolvedChecks: unresolvedChecks
      },
      budgets: budgets,
      seeds: seeds,
      relations: relationDecisions,
      exclusions: exclusions,
      boundary: "Only explicitly selected relations and exclusions were evaluated. Unselected routes were not considered."
    };
  }

  function element(documentObject, tag, className, text) {
    var node = documentObject.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function renderReconciliation(documentObject, target, reconciliation) {
    var previous = target.querySelector("#composition-result-reconciliation");
    if (previous) previous.remove();
    var section = element(documentObject, "section", "composition-reconciliation");
    section.id = "composition-result-reconciliation";
    section.dataset.state = reconciliation.state;
    section.append(element(documentObject, "p", "lab-stage__operator", "Reconcile"),
      element(documentObject, "h3", "", "What happened to your request"),
      element(documentObject, "p", "composition-reconciliation__state", reconciliation.stateExplanation));

    var totals = element(documentObject, "dl", "composition-reconciliation__totals");
    [["Seeds admitted", reconciliation.counts.selectedSeeds],
      ["Relations admitted", reconciliation.counts.admittedRelations + " / " + reconciliation.counts.selectedRelations],
      ["Relations not traversed", reconciliation.counts.stoppedRelations + reconciliation.counts.capacityLimitedRelations + reconciliation.counts.predecessorUnreachedRelations],
      ["Exclusion conflicts", reconciliation.counts.conflictExclusions]].forEach(function (pair) {
      var group = element(documentObject, "div", "");
      group.append(element(documentObject, "dt", "", pair[0]), element(documentObject, "dd", "", String(pair[1])));
      totals.appendChild(group);
    });
    section.appendChild(totals);

    var budgetSection = element(documentObject, "div", "composition-reconciliation__budgets");
    budgetSection.appendChild(element(documentObject, "h4", "", "Finite budget ledger"));
    var budgetList = element(documentObject, "ul", "");
    reconciliation.budgets.forEach(function (budget) {
      var item = element(documentObject, "li", "", budget.name + " " + budget.used + " / " + budget.cap);
      item.appendChild(element(documentObject, "span", "reconciliation-status reconciliation-status--" + budget.status, budget.status));
      budgetList.appendChild(item);
    });
    budgetSection.appendChild(budgetList);
    section.appendChild(budgetSection);

    var decisions = element(documentObject, "div", "composition-reconciliation__decisions");
    var relationGroup = element(documentObject, "div", "");
    relationGroup.appendChild(element(documentObject, "h4", "", "Selected relation decisions"));
    var relationList = element(documentObject, "ul", "reconciliation-list");
    reconciliation.relations.forEach(function (relation) {
      var item = element(documentObject, "li", "reconciliation-list__item");
      var heading = element(documentObject, "div", "reconciliation-list__heading");
      heading.append(element(documentObject, "span", "reconciliation-status reconciliation-status--" + relation.decision, relation.decision.replace(/-/g, " ")),
        element(documentObject, "strong", "", relation.code + " · " + relation.verb));
      var route = element(documentObject, "p", "reconciliation-list__route");
      var from = element(documentObject, "a", "", relation.predecessor.label);
      from.href = relation.predecessor.href;
      var to = element(documentObject, "a", "", relation.derived.label);
      to.href = relation.derived.href;
      route.append(from, documentObject.createTextNode(" → "), to);
      item.append(heading, route,
        element(documentObject, "p", "reconciliation-list__reason", relation.explanation),
        element(documentObject, "p", "composition-meta--full reconciliation-list__exact",
          relation.id + " · " + relation.rawReason + " · " + relation.qualifiers));
      relationList.appendChild(item);
    });
    relationGroup.appendChild(relationList);
    decisions.appendChild(relationGroup);

    var exclusionGroup = element(documentObject, "div", "");
    exclusionGroup.appendChild(element(documentObject, "h4", "", "Selected exclusion decisions"));
    if (!reconciliation.exclusions.length) {
      exclusionGroup.appendChild(element(documentObject, "p", "lab-empty", "No exclusion was selected."));
    } else {
      var exclusionList = element(documentObject, "ul", "reconciliation-list");
      reconciliation.exclusions.forEach(function (exclusion) {
        var item = element(documentObject, "li", "reconciliation-list__item");
        var heading = element(documentObject, "div", "reconciliation-list__heading");
        heading.append(element(documentObject, "span", "reconciliation-status reconciliation-status--" + exclusion.decision, exclusion.decision),
          element(documentObject, "a", "", exclusion.artifact.label));
        heading.lastChild.href = exclusion.artifact.href;
        item.append(heading, element(documentObject, "p", "reconciliation-list__reason", exclusion.explanation),
          element(documentObject, "p", "composition-meta--full reconciliation-list__exact",
            exclusion.artifact.artifact + " · " + exclusion.rawReason));
        exclusionList.appendChild(item);
      });
      exclusionGroup.appendChild(exclusionList);
    }
    decisions.appendChild(exclusionGroup);
    section.appendChild(decisions);
    section.append(element(documentObject, "p", "composition-reconciliation__boundary", reconciliation.boundary),
      element(documentObject, "p", "composition-meta--full composition-reconciliation__identity",
        "Inherited result identity · " + reconciliation.resultSha256));

    var metrics = target.querySelector(".lab-metrics");
    if (metrics && metrics.parentNode) metrics.insertAdjacentElement("afterend", section);
    else target.prepend(section);
  }

  function renderUnavailable(documentObject, target) {
    var previous = target.querySelector("#composition-result-reconciliation");
    if (previous) previous.remove();
    var section = element(documentObject, "section", "composition-reconciliation");
    section.id = "composition-result-reconciliation";
    section.append(element(documentObject, "h3", "", "Request reconciliation unavailable"),
      element(documentObject, "p", "lab-error", "The detailed result, map, and reading route remain authoritative."));
    var metrics = target.querySelector(".lab-metrics");
    if (metrics) metrics.insertAdjacentElement("afterend", section);
    else target.prepend(section);
  }

  var api = { buildReconciliation: buildReconciliation, renderReconciliation: renderReconciliation,
    validatePayloads: validatePayloads };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (root && root.document && root.FACTORIUM_COMPOSITION_LAB && root.FACTORIUM_COMPOSITION_READING &&
    typeof root.FACTORIUM_COMPOSITION_READING_ROUTE_RENDER === "function") {
    var previousRenderer = root.FACTORIUM_COMPOSITION_READING_ROUTE_RENDER;
    root.FACTORIUM_COMPOSITION_READING_ROUTE_RENDER = function (identified) {
      previousRenderer(identified);
      var target = root.document.getElementById("composition-lab-result");
      if (!target) return;
      try {
        renderReconciliation(root.document, target, buildReconciliation(identified.result,
          root.FACTORIUM_COMPOSITION_LAB, root.FACTORIUM_COMPOSITION_READING, identified.sha256));
      } catch (_) {
        renderUnavailable(root.document, target);
      }
    };
  }
})(typeof window !== "undefined" ? window : null);

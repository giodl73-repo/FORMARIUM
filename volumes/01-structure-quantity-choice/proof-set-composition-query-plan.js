(function (root) {
  "use strict";

  var ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  var SHA_PATTERN = /^[a-f0-9]{64}$/;

  function assert(condition, message) {
    if (!condition) throw new Error(message);
  }

  function sortedUnique(values, label) {
    assert(Array.isArray(values), label + " must be an array");
    var seen = new Set();
    values.forEach(function (value) {
      assert(typeof value === "string" && value.length > 0, label + " has an invalid identity");
      assert(!seen.has(value), label + " repeats " + value);
      seen.add(value);
    });
    return Array.from(seen).sort();
  }

  function shortCode(relationId) {
    var match = String(relationId || "").match(/^f\d+/i);
    return match ? match[0].toUpperCase() : String(relationId || "");
  }

  function humanVerb(value) {
    var text = String(value || "").replace(/-/g, " ");
    return text ? text.charAt(0).toUpperCase() + text.slice(1) : text;
  }

  function validContextSelections(value) {
    var pairs = String(value || "").split(",");
    var seen = new Set();
    var hasReferenceFrame = false;
    if (!pairs.length) return false;
    for (var index = 0; index < pairs.length; index += 1) {
      var pair = pairs[index].trim();
      var separator = pair.indexOf("=");
      if (separator <= 0 || separator >= pair.length - 1) return false;
      var key = pair.slice(0, separator);
      var selection = pair.slice(separator + 1);
      if (!ID_PATTERN.test(key) || !ID_PATTERN.test(selection) || seen.has(key)) return false;
      seen.add(key);
      if (key === "reference-frame") hasReferenceFrame = true;
    }
    return hasReferenceFrame;
  }

  function validatePayloads(labPayload, readingPayload) {
    assert(labPayload && labPayload.schema === "factorium-composition-lab-payload-v0",
      "Unknown composition lab payload");
    assert(readingPayload && readingPayload.schema === "factorium-composition-reading-payload-v0",
      "Unknown composition reading payload");
    assert(SHA_PATTERN.test(labPayload.referenceSha256 || "") &&
      SHA_PATTERN.test(labPayload.relationsSha256 || ""), "Composition plan source identity is invalid");
    assert(labPayload.referenceSha256 === readingPayload.referenceSha256 &&
      labPayload.relationsSha256 === readingPayload.relationsSha256,
    "Composition plan payload identity mismatch");
    assert(Array.isArray(labPayload.relations) && labPayload.relations.length === 6,
      "Composition plan requires six relations");
    assert(Array.isArray(readingPayload.bindings) && readingPayload.bindings.length === 18,
      "Composition plan requires 18 reading bindings");
  }

  function buildQueryPlan(request, labPayload, readingPayload) {
    validatePayloads(labPayload, readingPayload);
    assert(request && typeof request === "object", "Composition plan request is required");
    var bindingByArtifact = new Map();
    readingPayload.bindings.forEach(function (binding) {
      assert(binding && typeof binding.artifact === "string" &&
        typeof binding.label === "string" && typeof binding.pageTitle === "string" &&
        typeof binding.href === "string", "Composition plan binding is malformed");
      assert(!bindingByArtifact.has(binding.artifact),
        "Composition plan repeats binding " + binding.artifact);
      bindingByArtifact.set(binding.artifact, binding);
    });
    var relationById = new Map();
    var endpointSet = new Set();
    var artifactSet = new Set();
    labPayload.relations.forEach(function (relation) {
      assert(relation && ID_PATTERN.test(relation.id || "") &&
        !relationById.has(relation.id), "Composition plan relation is invalid or duplicated");
      ["source", "target", "scope", "verb", "qualifiers"].forEach(function (key) {
        assert(typeof relation[key] === "string" && relation[key].length > 0,
          "Composition plan relation omits " + key);
      });
      relationById.set(relation.id, relation);
      endpointSet.add(relation.source);
      endpointSet.add(relation.target);
      artifactSet.add(relation.source);
      artifactSet.add(relation.target);
      artifactSet.add(relation.scope);
    });
    artifactSet.forEach(function (artifact) {
      assert(bindingByArtifact.has(artifact), "Composition plan omits binding " + artifact);
    });

    var seeds = sortedUnique(request.seeds || [], "Plan seeds");
    var relations = sortedUnique(request.relations || [], "Plan relations");
    var exclusions = sortedUnique(request.exclusions || [], "Plan exclusions");
    seeds.forEach(function (artifact) {
      assert(endpointSet.has(artifact), "Unknown plan seed " + artifact);
    });
    relations.forEach(function (relationId) {
      assert(relationById.has(relationId), "Unknown plan relation " + relationId);
    });
    exclusions.forEach(function (artifact) {
      assert(artifactSet.has(artifact), "Unknown plan exclusion " + artifact);
    });

    function bindArtifact(artifact) {
      var binding = bindingByArtifact.get(artifact);
      return {
        artifact: artifact,
        label: binding.label,
        pageTitle: binding.pageTitle,
        href: binding.href,
        kind: binding.kind
      };
    }

    var direction = String(request.direction || "");
    var multiply = relations.map(function (relationId) {
      var relation = relationById.get(relationId);
      var predecessor = direction === "reverse" ? relation.target : relation.source;
      var derived = direction === "reverse" ? relation.source : relation.target;
      return {
        id: relation.id,
        code: shortCode(relation.id),
        verb: humanVerb(relation.verb),
        direction: direction,
        predecessor: bindArtifact(predecessor),
        derived: bindArtifact(derived),
        canonicalSource: bindArtifact(relation.source),
        canonicalTarget: bindArtifact(relation.target),
        scope: bindArtifact(relation.scope),
        qualifiers: relation.qualifiers
      };
    });

    var problem = String(request.problem || "").trim().replace(/\s+/g, " ");
    var contextId = String(request.contextId || "").trim();
    var contextSelections = String(request.contextSelections || "").trim();
    var budget = request.budget || {};
    var diagnostics = [];
    if (problem.length < 10 || problem.length > 240) diagnostics.push("Problem");
    if (!ID_PATTERN.test(contextId)) diagnostics.push("Context profile");
    if (!validContextSelections(contextSelections)) diagnostics.push("Context selections");
    if (direction !== "forward" && direction !== "reverse") diagnostics.push("Direction");
    if (!Number.isInteger(budget.depth) || budget.depth < 1 || budget.depth > 6) diagnostics.push("Depth budget");
    if (!Number.isInteger(budget.edges) || budget.edges < 1 || budget.edges > 6) diagnostics.push("Edge budget");
    if (!Number.isInteger(budget.nodes) || budget.nodes < 3 || budget.nodes > 24) diagnostics.push("Node budget");
    // SIM24-WORK-DIAGNOSTIC
    if (!Number.isInteger(budget.work) || budget.work < 3 || budget.work > 64) diagnostics.push("Work budget");
    if (seeds.length < 1 || seeds.length > 3) diagnostics.push("Seeds");
    if (relations.length < 1 || relations.length > 6) diagnostics.push("Relations");

    return {
      schema: "factorium-composition-query-plan-v0",
      sources: {
        referenceSha256: labPayload.referenceSha256,
        relationsSha256: labPayload.relationsSha256
      },
      controlState: diagnostics.length ? "needs-explicit-controls" : "control-complete",
      diagnostics: diagnostics,
      problem: problem,
      frame: { contextId: contextId, selections: contextSelections },
      bound: {
        direction: direction,
        depth: budget.depth,
        edges: budget.edges,
        nodes: budget.nodes,
        // SIM24-WORK-BOUND
        work: budget.work
      },
      add: seeds.map(bindArtifact),
      multiply: multiply,
      subtract: exclusions.map(bindArtifact),
      counts: { seeds: seeds.length, relations: relations.length, exclusions: exclusions.length }
    };
  }

  function element(documentObject, name, className, text) {
    var node = documentObject.createElement(name);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function appendArtifactList(documentObject, parent, records, emptyText) {
    if (!records.length) {
      parent.appendChild(element(documentObject, "p", "query-plan__empty", emptyText));
      return;
    }
    var list = element(documentObject, "ul", "query-plan__records");
    records.forEach(function (record) {
      var item = element(documentObject, "li", "");
      var link = element(documentObject, "a", "", record.label);
      link.href = record.href;
      item.append(link,
        element(documentObject, "small", "composition-meta--essential", record.pageTitle),
        element(documentObject, "code", "composition-meta--full", record.artifact));
      list.appendChild(item);
    });
    parent.appendChild(list);
  }

  function renderPlan(documentObject, target, plan, alignment) {
    target.replaceChildren();
    target.dataset.controlState = plan.controlState;
    target.dataset.resultAlignment = alignment;
    var header = element(documentObject, "div", "query-plan__header");
    var heading = element(documentObject, "h2", "", "Your explicit query plan");
    heading.id = "composition-query-plan-heading";
    header.append(
      element(documentObject, "span", "query-plan__state", plan.controlState.replace(/-/g, " ")),
      heading
    );
    var status = element(documentObject, "p", "query-plan__status");
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");
    status.textContent = plan.diagnostics.length ?
      "Needs explicit controls: " + plan.diagnostics.join(", ") + "." :
      "All required controls are present. Structural validity is not evaluated.";
    var problem = element(documentObject, "p", "query-plan__problem composition-detail--core",
      plan.problem || "No valid problem label yet.");
    problem.prepend(element(documentObject, "strong", "", "Graph-inert label · "));
    target.append(header, status, problem);

    var stages = element(documentObject, "div", "query-plan__stages");
    var add = element(documentObject, "section", "query-plan__stage");
    add.append(element(documentObject, "span", "query-plan__operator", "Add"),
      element(documentObject, "h3", "", plan.counts.seeds + " selected concept" +
        (plan.counts.seeds === 1 ? "" : "s")));
    appendArtifactList(documentObject, add, plan.add, "No seed selected.");
    var multiply = element(documentObject, "section", "query-plan__stage");
    multiply.append(element(documentObject, "span", "query-plan__operator", "Multiply"),
      element(documentObject, "h3", "", plan.counts.relations + " selected typed route" +
        (plan.counts.relations === 1 ? "" : "s")));
    if (!plan.multiply.length) {
      multiply.appendChild(element(documentObject, "p", "query-plan__empty", "No relation selected."));
    } else {
      var relationList = element(documentObject, "ul", "query-plan__records");
      plan.multiply.forEach(function (record) {
        var item = element(documentObject, "li", "");
        item.append(
          element(documentObject, "strong", "", record.code + " · " + record.verb),
          element(documentObject, "span", "query-plan__route",
            record.predecessor.label + " → " + record.derived.label),
          element(documentObject, "small", "composition-meta--essential",
            record.direction + " traversal"),
          element(documentObject, "code", "composition-meta--full",
            record.id + " | canonical " + record.canonicalSource.artifact + " → " +
              record.canonicalTarget.artifact + " | " + record.qualifiers)
        );
        relationList.appendChild(item);
      });
      multiply.appendChild(relationList);
    }
    var subtract = element(documentObject, "section", "query-plan__stage");
    subtract.append(element(documentObject, "span", "query-plan__operator", "Subtract"),
      element(documentObject, "h3", "", plan.counts.exclusions + " exclusion request" +
        (plan.counts.exclusions === 1 ? "" : "s")));
    appendArtifactList(documentObject, subtract, plan.subtract, "No exclusion requested.");
    stages.append(add, multiply, subtract);
    target.appendChild(stages);

    var controls = element(documentObject, "dl", "query-plan__controls");
    [["Frame", plan.frame.contextId || "not declared"],
      ["Selections", plan.frame.selections || "not declared"],
      ["Bound", (plan.bound.direction || "no direction") + " · depth " + plan.bound.depth +
        " · edges " + plan.bound.edges + " · nodes " + plan.bound.nodes +
        // SIM24-WORK-DISPLAY
        " · work " + plan.bound.work]].forEach(function (pair) {
      controls.append(element(documentObject, "dt", "", pair[0]),
        element(documentObject, "dd", "", String(pair[1])));
    });
    var alignmentText = alignment === "matches-displayed-result" ?
      "Matches displayed result: it was executed from these controls; inspect its closure and unresolved checks below." :
      (alignment === "controls-changed" ?
        "Controls changed: the displayed result belongs to the previous request. Run again to evaluate this plan." :
        "Not executed: admission, closure, evaluation, state, and result identity remain unknown.");
    target.append(controls,
      element(documentObject, "p", "query-plan__boundary", alignmentText));
    var digests = element(documentObject, "p", "query-plan__digests composition-meta--full");
    digests.append(element(documentObject, "strong", "", "Source digests"),
      element(documentObject, "code", "", plan.sources.referenceSha256),
      element(documentObject, "code", "", plan.sources.relationsSha256));
    target.appendChild(digests);
  }

  function initialize(documentObject, labPayload, readingPayload) {
    var form = documentObject.getElementById("composition-lab-form");
    var target = documentObject.getElementById("composition-query-plan");
    var output = documentObject.getElementById("composition-lab-result");
    if (!form || !target || !output) return;
    validatePayloads(labPayload, readingPayload);
    var lastExecutedPlan = null;
    var pendingPlan = null;
    var currentPlan = null;

    function checkedValues(name) {
      return Array.from(form.querySelectorAll('input[name="' + name + '"]:checked'))
        .map(function (input) { return input.value; });
    }

    function readPlan() {
      return buildQueryPlan({
          problem: form.elements.problem.value,
          contextId: form.elements.contextId.value,
          contextSelections: form.elements.contextSelections.value,
          direction: form.elements.direction.value,
          budget: {
            depth: Number(form.elements.depth.value),
            edges: Number(form.elements.edges.value),
            nodes: Number(form.elements.nodes.value),
            // SIM24-WORK-FORM
            work: Number(form.elements.work.value)
          },
          seeds: checkedValues("seeds"),
          relations: checkedValues("relations"),
          exclusions: checkedValues("exclusions")
        }, labPayload, readingPayload);
    }

    function update() {
      try {
        currentPlan = readPlan();
        var canonical = JSON.stringify(currentPlan);
        var alignment = lastExecutedPlan === null ? "not-run" :
          (canonical === lastExecutedPlan ? "matches-displayed-result" : "controls-changed");
        renderPlan(documentObject, target, currentPlan, alignment);
      } catch (error) {
        target.replaceChildren(element(documentObject, "p", "lab-error",
          "Query plan unavailable: " + error.message));
      }
    }

    form.addEventListener("input", update);
    form.addEventListener("change", update);
    form.addEventListener("submit", function () {
      try { pendingPlan = JSON.stringify(readPlan()); } catch (_) { pendingPlan = null; }
    });
    var observer = new MutationObserver(function () {
      if (output.querySelector(".lab-result__empty")) {
        lastExecutedPlan = null;
        pendingPlan = null;
        update();
      } else if (output.querySelector(".lab-result__heading") && pendingPlan !== null) {
        lastExecutedPlan = pendingPlan;
        pendingPlan = null;
        update();
      } else if (output.querySelector(".lab-error")) {
        pendingPlan = null;
        update();
      }
    });
    observer.observe(output, { childList: true, subtree: true });
    update();
    target.dataset.enhanced = "true";
  }

  var api = {
    buildQueryPlan: buildQueryPlan,
    validContextSelections: validContextSelections,
    shortCode: shortCode,
    humanVerb: humanVerb
  };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (root && root.document && root.FACTORIUM_COMPOSITION_LAB &&
    root.FACTORIUM_COMPOSITION_READING) {
    initialize(root.document, root.FACTORIUM_COMPOSITION_LAB,
      root.FACTORIUM_COMPOSITION_READING);
  }
}(typeof window !== "undefined" ? window : globalThis));

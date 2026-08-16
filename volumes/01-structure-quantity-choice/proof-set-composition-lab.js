(function (root) {
  "use strict";

  var ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  var SHA_PATTERN = /^[a-f0-9]{64}$/;

  function assert(condition, message) {
    if (!condition) throw new Error(message);
  }

  function sortedUnique(values, label) {
    var seen = new Set();
    values.forEach(function (value) {
      assert(typeof value === "string" && value.length > 0, label + " has an invalid ID");
      assert(!seen.has(value), label + " repeats " + value);
      seen.add(value);
    });
    return Array.from(seen).sort();
  }

  function canonicalize(value) {
    if (Array.isArray(value)) {
      return "[" + value.map(canonicalize).join(",") + "]";
    }
    if (value && typeof value === "object") {
      return "{" + Object.keys(value).sort().map(function (key) {
        return JSON.stringify(key) + ":" + canonicalize(value[key]);
      }).join(",") + "}";
    }
    return JSON.stringify(value);
  }

  function parseContextSelections(value) {
    var selections = {};
    String(value || "").split(",").forEach(function (pair) {
      var trimmed = pair.trim();
      if (!trimmed) return;
      var separator = trimmed.indexOf("=");
      assert(separator > 0 && separator < trimmed.length - 1,
        "Context selections use comma-separated key=value pairs");
      var key = trimmed.slice(0, separator);
      var selection = trimmed.slice(separator + 1);
      assert(ID_PATTERN.test(key) && ID_PATTERN.test(selection),
        "Context keys and values use lower-kebab identifiers");
      assert(!Object.prototype.hasOwnProperty.call(selections, key),
        "Context selection repeats " + key);
      selections[key] = selection;
    });
    return selections;
  }

  function validatePayload(payload) {
    assert(payload && payload.schema === "factorium-composition-lab-payload-v0",
      "Unknown composition payload");
    assert(SHA_PATTERN.test(payload.referenceSha256 || ""),
      "Composition payload omits reference identity");
    assert(SHA_PATTERN.test(payload.relationsSha256 || ""),
      "Composition payload omits relation identity");
    assert(Array.isArray(payload.relations) && payload.relations.length === 6,
      "Composition lab requires exactly six reviewed relations");

    var relationIds = new Set();
    payload.relations.forEach(function (relation) {
      assert(ID_PATTERN.test(relation.id || ""), "Invalid relation ID");
      assert(!relationIds.has(relation.id), "Duplicate relation " + relation.id);
      relationIds.add(relation.id);
      ["source", "target", "scope", "verb", "qualifiers", "scopeHref"].forEach(function (key) {
        assert(typeof relation[key] === "string" && relation[key].length > 0,
          "Relation " + relation.id + " omits " + key);
      });
    });
  }

  function normalizeRequest(request, payload) {
    validatePayload(payload);
    assert(request && typeof request === "object", "Composition request is required");

    var problem = String(request.problem || "").trim().replace(/\s+/g, " ");
    assert(problem.length >= 10 && problem.length <= 240,
      "Problem must contain 10-240 characters");
    var contextId = String(request.contextId || "").trim();
    assert(ID_PATTERN.test(contextId), "Context profile uses a lower-kebab ID");
    var selections = request.contextSelections;
    if (typeof selections === "string") selections = parseContextSelections(selections);
    assert(selections && typeof selections === "object" && !Array.isArray(selections),
      "Context selections are required");
    var normalizedSelections = {};
    Object.keys(selections).sort().forEach(function (key) {
      var value = String(selections[key]);
      assert(ID_PATTERN.test(key) && ID_PATTERN.test(value),
        "Context selections use lower-kebab key=value pairs");
      normalizedSelections[key] = value;
    });
    assert(Object.prototype.hasOwnProperty.call(normalizedSelections, "reference-frame"),
      "Context must declare reference-frame explicitly");

    assert(request.direction === "forward" || request.direction === "reverse",
      "Direction must be forward or reverse");
    var budget = request.budget || {};
    [["depth", 1, 6], ["edges", 1, 6], ["nodes", 3, 24]].forEach(function (rule) {
      assert(Number.isInteger(budget[rule[0]]) &&
        budget[rule[0]] >= rule[1] && budget[rule[0]] <= rule[2],
      "Budget " + rule[0] + " must be " + rule[1] + "-" + rule[2]);
    });

    var artifacts = new Set();
    var endpoints = new Set();
    var relationIds = new Set();
    payload.relations.forEach(function (relation) {
      endpoints.add(relation.source);
      endpoints.add(relation.target);
      artifacts.add(relation.source);
      artifacts.add(relation.target);
      artifacts.add(relation.scope);
      relationIds.add(relation.id);
    });
    var seeds = sortedUnique(request.seeds || [], "Seeds");
    assert(seeds.length >= 1 && seeds.length <= 3, "Select 1-3 seed artifacts");
    seeds.forEach(function (seed) {
      assert(endpoints.has(seed), "Unknown seed artifact " + seed);
    });
    var relations = sortedUnique(request.relations || [], "Relations");
    assert(relations.length >= 1 && relations.length <= 6, "Select 1-6 relations");
    relations.forEach(function (relation) {
      assert(relationIds.has(relation), "Unknown relation " + relation);
    });
    var exclusions = sortedUnique(request.exclusions || [], "Exclusions");
    exclusions.forEach(function (artifact) {
      assert(artifacts.has(artifact), "Unknown exclusion artifact " + artifact);
    });

    return {
      problem: problem,
      context: { id: contextId, selections: normalizedSelections },
      direction: request.direction,
      budget: { depth: budget.depth, edges: budget.edges, nodes: budget.nodes },
      seeds: seeds,
      relations: relations,
      exclusions: exclusions
    };
  }

  function checkKind(scope) {
    var local = scope.split(":").pop();
    if (local.indexOf("constraint-") === 0) return "constraint";
    if (local.indexOf("diagnostic-") === 0) return "diagnostic";
    return "completeness";
  }

  function runComposition(request, payload) {
    var normalized = normalizeRequest(request, payload);
    var relationById = new Map(payload.relations.map(function (relation) {
      return [relation.id, relation];
    }));
    var nodes = new Map();
    normalized.seeds.forEach(function (seed) {
      nodes.set(seed, {
        artifact: seed,
        class: "required",
        depth: 0,
        origin: "seed",
        predecessor: "none"
      });
    });

    var admitted = new Set();
    var blocked = new Set();
    var edges = [];
    var frontiers = [];
    var capacityRequirements = [];
    var changed = true;
    while (changed) {
      changed = false;
      normalized.relations.forEach(function (relationId) {
        if (admitted.has(relationId) || blocked.has(relationId)) return;
        var relation = relationById.get(relationId);
        var predecessor = normalized.direction === "forward" ? relation.source : relation.target;
        var derived = normalized.direction === "forward" ? relation.target : relation.source;
        if (!nodes.has(predecessor)) return;
        var nextDepth = nodes.get(predecessor).depth + 1;
        var additions = [];
        if (!nodes.has(derived)) additions.push(derived);
        if (!nodes.has(relation.scope) && relation.scope !== derived) additions.push(relation.scope);

        var reason = "";
        if (edges.length >= normalized.budget.edges) reason = "edge-budget-before-" + relationId;
        else if (nextDepth > normalized.budget.depth &&
          Math.max.apply(null, Array.from(nodes.values()).map(function (node) { return node.depth; })) ===
            normalized.budget.depth) reason = "depth-budget-before-" + relationId;
        else if (nodes.size >= normalized.budget.nodes) reason = "node-budget-before-" + relationId;

        if (reason) {
          frontiers.push({ artifact: derived, reason: reason, relation: relationId });
          blocked.add(relationId);
          return;
        }
        if (nodes.size + additions.length > normalized.budget.nodes) {
          capacityRequirements.push({
            relation: relationId,
            predecessor: predecessor,
            reason: "atomic-relation-needs-" + additions.length + "-node-slots"
          });
          blocked.add(relationId);
          return;
        }
        if (nextDepth > normalized.budget.depth) {
          capacityRequirements.push({
            relation: relationId,
            predecessor: predecessor,
            reason: "depth-budget-not-reached-by-working-graph"
          });
          blocked.add(relationId);
          return;
        }

        admitted.add(relationId);
        edges.push({
          id: relation.id,
          verb: relation.verb,
          source: relation.source,
          target: relation.target,
          scope: relation.scope,
          qualifiers: relation.qualifiers
        });
        if (!nodes.has(derived)) {
          nodes.set(derived, {
            artifact: derived,
            class: "required",
            depth: nextDepth,
            origin: "relation:" + relationId,
            predecessor: predecessor
          });
        }
        if (!nodes.has(relation.scope)) {
          nodes.set(relation.scope, {
            artifact: relation.scope,
            class: "evaluative",
            depth: nextDepth,
            origin: "scope:" + relationId,
            predecessor: predecessor
          });
        }
        changed = true;
      });
    }

    var unresolvedRelations = normalized.relations.filter(function (relationId) {
      return !admitted.has(relationId) && !blocked.has(relationId);
    }).map(function (relationId) {
      var relation = relationById.get(relationId);
      return {
        relation: relationId,
        predecessor: normalized.direction === "forward" ? relation.source : relation.target,
        reason: "selected-predecessor-not-reached"
      };
    }).concat(capacityRequirements).sort(function (left, right) {
      return left.relation.localeCompare(right.relation);
    });

    var conflicts = [];
    var inactiveExclusions = [];
    normalized.exclusions.forEach(function (artifact) {
      if (nodes.has(artifact) &&
        (nodes.get(artifact).class === "required" || nodes.get(artifact).class === "evaluative")) {
        conflicts.push({
          id: "exclude-" + artifact.split("/").pop().replace(/[^a-z0-9-]/g, "-"),
          artifact: artifact,
          reason: "requested-exclusion-of-reached-" + nodes.get(artifact).class + "-node"
        });
      } else {
        inactiveExclusions.push({ artifact: artifact, reason: "target-not-reached" });
      }
    });

    var checks = edges.map(function (edge) {
      return {
        id: edge.id + "-scope-review",
        kind: checkKind(edge.scope),
        target: edge.scope,
        outcome: "unresolved"
      };
    }).sort(function (left, right) { return left.id.localeCompare(right.id); });
    var conflictTargets = new Set(conflicts.map(function (conflict) { return conflict.artifact; }));
    var nodeRecords = Array.from(nodes.values()).sort(function (left, right) {
      return left.artifact.localeCompare(right.artifact);
    });
    edges.sort(function (left, right) { return left.id.localeCompare(right.id); });
    frontiers.sort(function (left, right) {
      return left.artifact.localeCompare(right.artifact) || left.relation.localeCompare(right.relation);
    });
    conflicts.sort(function (left, right) { return left.id.localeCompare(right.id); });
    inactiveExclusions.sort(function (left, right) { return left.artifact.localeCompare(right.artifact); });
    var projections = nodeRecords.map(function (node) {
      return {
        artifact: node.artifact,
        disposition: conflictTargets.has(node.artifact) ? "rejected" : "selected",
        loss: "simulation-draft"
      };
    });
    var state = conflicts.length ? "contradictory" :
      (frontiers.length ? "truncated" : "incomplete");
    var work = normalized.seeds.length + nodeRecords.length + edges.length +
      frontiers.length + conflicts.length + checks.length + projections.length;

    return {
      schema: "factorium-composition-lab-result-v0",
      sources: {
        referenceSha256: payload.referenceSha256,
        relationsSha256: payload.relationsSha256
      },
      request: normalized,
      graph: {
        nodes: nodeRecords,
        edges: edges,
        frontiers: frontiers,
        unresolvedRelations: unresolvedRelations,
        conflicts: conflicts,
        inactiveExclusions: inactiveExclusions
      },
      evaluation: checks,
      projections: projections,
      state: state,
      work: work
    };
  }

  function hashText(text) {
    assert(root && root.crypto && root.crypto.subtle, "SHA-256 is unavailable");
    return root.crypto.subtle.digest("SHA-256", new TextEncoder().encode(text))
      .then(function (digest) {
        return Array.from(new Uint8Array(digest)).map(function (byte) {
          return byte.toString(16).padStart(2, "0");
        }).join("");
      });
  }

  function identify(result) {
    var canonical = canonicalize(result);
    return hashText(canonical).then(function (sha256) {
      return { result: result, canonical: canonical, sha256: sha256 };
    });
  }

  function artifactLabel(artifact) {
    return artifact.split("/").pop().split(":").pop().replace(/-/g, " ");
  }

  function element(documentObject, name, className, text) {
    var node = documentObject.createElement(name);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function appendRecordList(documentObject, parent, records, render) {
    var list = element(documentObject, "ul", "lab-records");
    records.forEach(function (record) {
      var item = element(documentObject, "li", "");
      render(item, record);
      list.appendChild(item);
    });
    parent.appendChild(list);
  }

  function renderResult(documentObject, target, identified) {
    var result = identified.result;
    target.replaceChildren();
    var heading = element(documentObject, "div", "lab-result__heading");
    heading.append(
      element(documentObject, "span", "lab-state lab-state--" + result.state, result.state),
      element(documentObject, "h2", "", "Bounded working graph")
    );
    var caveat = element(documentObject, "p", "lab-result__caveat",
      "Simulation draft only. Every admitted check remains unresolved; this is not a domain answer or canonical Factor Guide.");
    target.append(heading, caveat);

    var metrics = element(documentObject, "dl", "lab-metrics");
    [["Seeds", result.request.seeds.length], ["Nodes", result.graph.nodes.length],
      ["Edges", result.graph.edges.length], ["Work", result.work]].forEach(function (pair) {
      metrics.append(element(documentObject, "dt", "", pair[0]),
        element(documentObject, "dd", "", String(pair[1])));
    });
    target.appendChild(metrics);

    var stages = element(documentObject, "div", "lab-result__stages");
    var add = element(documentObject, "section", "lab-stage");
    add.append(element(documentObject, "p", "lab-stage__operator", "Add"),
      element(documentObject, "h3", "", "Required seeds"));
    appendRecordList(documentObject, add, result.request.seeds, function (item, seed) {
      item.append(element(documentObject, "strong", "", artifactLabel(seed)),
        element(documentObject, "code", "", seed));
    });
    var multiply = element(documentObject, "section", "lab-stage");
    multiply.append(element(documentObject, "p", "lab-stage__operator", "Multiply"),
      element(documentObject, "h3", "", "Typed closure"));
    appendRecordList(documentObject, multiply, result.graph.edges, function (item, edge) {
      item.append(element(documentObject, "strong", "", edge.id + " · " + edge.verb),
        element(documentObject, "code", "", edge.source + " → " + edge.target),
        element(documentObject, "small", "", edge.qualifiers));
    });
    if (!result.graph.edges.length) {
      multiply.appendChild(element(documentObject, "p", "lab-empty", "No selected relation became eligible."));
    }
    appendRecordList(documentObject, multiply, result.graph.nodes.filter(function (node) {
      return node.origin !== "seed";
    }), function (item, node) {
      item.append(element(documentObject, "strong", "", artifactLabel(node.artifact)),
        element(documentObject, "code", "", node.artifact),
        element(documentObject, "small", "", node.class + " · depth " + node.depth));
    });

    var subtract = element(documentObject, "section", "lab-stage");
    subtract.append(element(documentObject, "p", "lab-stage__operator", "Subtract"),
      element(documentObject, "h3", "", "Exclusion requests"));
    appendRecordList(documentObject, subtract, result.graph.conflicts, function (item, conflict) {
      item.append(element(documentObject, "strong", "", "Conflict"),
        element(documentObject, "code", "", conflict.artifact),
        element(documentObject, "small", "", conflict.reason));
    });
    appendRecordList(documentObject, subtract, result.graph.inactiveExclusions, function (item, inactive) {
      item.append(element(documentObject, "strong", "", "Inactive request"),
        element(documentObject, "code", "", inactive.artifact),
        element(documentObject, "small", "", inactive.reason));
    });
    if (!result.request.exclusions.length) {
      subtract.appendChild(element(documentObject, "p", "lab-empty", "No exclusion requested."));
    }

    var evaluate = element(documentObject, "section", "lab-stage");
    evaluate.append(element(documentObject, "p", "lab-stage__operator", "Evaluate"),
      element(documentObject, "h3", "", "Unresolved checks"));
    appendRecordList(documentObject, evaluate, result.evaluation, function (item, check) {
      item.append(element(documentObject, "strong", "", check.id),
        element(documentObject, "code", "", check.target),
        element(documentObject, "small", "", check.kind + " · " + check.outcome));
    });
    if (!result.evaluation.length) {
      evaluate.appendChild(element(documentObject, "p", "lab-empty", "No relation scope was admitted for evaluation."));
    }
    stages.append(add, multiply, subtract, evaluate);
    target.appendChild(stages);

    var boundary = element(documentObject, "section", "lab-boundary");
    boundary.append(element(documentObject, "p", "lab-stage__operator", "Stop"),
      element(documentObject, "h3", "", "Closure boundary"));
    appendRecordList(documentObject, boundary, result.graph.frontiers, function (item, frontier) {
      item.append(element(documentObject, "strong", "", "Budget frontier · " + frontier.relation),
        element(documentObject, "code", "", frontier.artifact),
        element(documentObject, "small", "", frontier.reason));
    });
    appendRecordList(documentObject, boundary, result.graph.unresolvedRelations, function (item, unresolved) {
      item.append(element(documentObject, "strong", "", "Unresolved relation · " + unresolved.relation),
        element(documentObject, "code", "", unresolved.predecessor),
        element(documentObject, "small", "", unresolved.reason));
    });
    if (!result.graph.frontiers.length && !result.graph.unresolvedRelations.length) {
      boundary.appendChild(element(documentObject, "p", "lab-empty", "Stable identity reached; unresolved checks still prevent completion."));
    }
    target.appendChild(boundary);

    var draft = element(documentObject, "section", "lab-draft");
    draft.append(element(documentObject, "p", "lab-stage__operator", "Flatten"),
      element(documentObject, "h3", "", "Draft Factor Guide projection"),
      element(documentObject, "p", "", result.request.problem));
    appendRecordList(documentObject, draft, result.projections, function (item, projection) {
      item.append(element(documentObject, "strong", "", projection.disposition),
        element(documentObject, "code", "", projection.artifact),
        element(documentObject, "small", "", "loss: " + projection.loss));
    });
    var identity = element(documentObject, "div", "lab-identity");
    identity.append(element(documentObject, "strong", "", "Local result identity"),
      element(documentObject, "code", "", identified.sha256),
      element(documentObject, "small", "", "SHA-256 over canonical result JSON; reload deletes this work product."));
    draft.appendChild(identity);
    target.appendChild(draft);
  }

  function addCheckbox(documentObject, parent, name, value, label, detail, checked) {
    var wrapper = element(documentObject, "label", "lab-choice");
    var input = element(documentObject, "input", "");
    input.type = "checkbox";
    input.name = name;
    input.value = value;
    input.checked = Boolean(checked);
    var copy = element(documentObject, "span", "");
    copy.append(element(documentObject, "strong", "", label),
      element(documentObject, "code", "", value));
    if (detail) copy.appendChild(element(documentObject, "small", "", detail));
    wrapper.append(input, copy);
    parent.appendChild(wrapper);
  }

  function initialize(documentObject, payload) {
    var form = documentObject.getElementById("composition-lab-form");
    var output = documentObject.getElementById("composition-lab-result");
    if (!form || !output) return;
    validatePayload(payload);
    var seedsContainer = documentObject.getElementById("composition-lab-seeds");
    var relationsContainer = documentObject.getElementById("composition-lab-relations");
    var exclusionsContainer = documentObject.getElementById("composition-lab-exclusions");
    var artifacts = new Map();
    payload.relations.forEach(function (relation, index) {
      artifacts.set(relation.source, artifactLabel(relation.source));
      artifacts.set(relation.target, artifactLabel(relation.target));
      artifacts.set(relation.scope, artifactLabel(relation.scope));
      addCheckbox(documentObject, relationsContainer, "relations", relation.id,
        relation.id + " · " + relation.verb,
        relation.source + " → " + relation.target + " · " + relation.qualifiers,
        index === 0);
    });
    Array.from(artifacts.keys()).filter(function (artifact) {
      return payload.relations.some(function (relation) {
        return relation.source === artifact || relation.target === artifact;
      });
    }).sort().forEach(function (artifact) {
      addCheckbox(documentObject, seedsContainer, "seeds", artifact,
        artifacts.get(artifact), "exact relation endpoint",
        artifact === payload.relations[0].source);
    });
    Array.from(artifacts.keys()).sort().forEach(function (artifact) {
      addCheckbox(documentObject, exclusionsContainer, "exclusions", artifact,
        artifacts.get(artifact), "request only; reached required nodes remain", false);
    });

    function checkedValues(name) {
      return Array.from(form.querySelectorAll('input[name="' + name + '"]:checked'))
        .map(function (input) { return input.value; });
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      try {
        var result = runComposition({
          problem: form.elements.problem.value,
          contextId: form.elements.contextId.value,
          contextSelections: form.elements.contextSelections.value,
          direction: form.elements.direction.value,
          budget: {
            depth: Number(form.elements.depth.value),
            edges: Number(form.elements.edges.value),
            nodes: Number(form.elements.nodes.value)
          },
          seeds: checkedValues("seeds"),
          relations: checkedValues("relations"),
          exclusions: checkedValues("exclusions")
        }, payload);
        output.setAttribute("aria-busy", "true");
        identify(result).then(function (identified) {
          renderResult(documentObject, output, identified);
          output.setAttribute("aria-busy", "false");
          output.focus();
        }).catch(function (error) {
          output.replaceChildren(element(documentObject, "p", "lab-error", error.message));
          output.setAttribute("aria-busy", "false");
        });
      } catch (error) {
        output.replaceChildren(element(documentObject, "p", "lab-error", error.message));
        output.setAttribute("aria-busy", "false");
        output.focus();
      }
    });
  }

  var api = {
    canonicalize: canonicalize,
    parseContextSelections: parseContextSelections,
    normalizeRequest: normalizeRequest,
    runComposition: runComposition
  };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (root && root.document && root.FACTORIUM_COMPOSITION_LAB) {
    initialize(root.document, root.FACTORIUM_COMPOSITION_LAB);
  }
})(typeof window !== "undefined" ? window : null);

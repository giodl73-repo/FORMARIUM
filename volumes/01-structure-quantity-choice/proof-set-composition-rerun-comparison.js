(function (root) {
  "use strict";

  var SHA_PATTERN = /^[0-9a-f]{64}$/;
  var LIMITS = { depth: 6, edges: 6, nodes: 24, work: 64 };

  function assert(condition, message) {
    if (!condition) throw new Error(message);
  }

  function canonicalize(value) {
    if (Array.isArray(value)) return "[" + value.map(canonicalize).join(",") + "]";
    if (value && typeof value === "object") {
      return "{" + Object.keys(value).sort().map(function (key) {
        return JSON.stringify(key) + ":" + canonicalize(value[key]);
      }).join(",") + "}";
    }
    return JSON.stringify(value);
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
    assert(labPayload && labPayload.schema === "factorium-composition-lab-payload-v0" &&
      Array.isArray(labPayload.relations) && labPayload.relations.length === 6,
    "Unknown composition lab payload");
    assert(readingPayload && readingPayload.schema === "factorium-composition-reading-payload-v0" &&
      Array.isArray(readingPayload.bindings), "Unknown composition reading payload");
    assert(SHA_PATTERN.test(labPayload.referenceSha256) && SHA_PATTERN.test(labPayload.relationsSha256),
      "Invalid composition source identity");
    assert(readingPayload.referenceSha256 === labPayload.referenceSha256 &&
      readingPayload.relationsSha256 === labPayload.relationsSha256,
    "Composition payload identity mismatch");
  }

  function maps(labPayload, readingPayload) {
    var relationById = new Map(labPayload.relations.map(function (relation) {
      return [relation.id, relation];
    }));
    var bindingByArtifact = new Map(readingPayload.bindings.map(function (binding) {
      return [binding.artifact, binding];
    }));
    assert(relationById.size === labPayload.relations.length, "Duplicate relation identity");
    assert(bindingByArtifact.size === readingPayload.bindings.length, "Duplicate reading binding");
    return { relations: relationById, bindings: bindingByArtifact };
  }

  function binding(artifact, bindingByArtifact) {
    var record = bindingByArtifact.get(artifact);
    assert(record && typeof record.label === "string" && typeof record.href === "string" &&
      typeof record.pageTitle === "string", "Missing comparison binding " + artifact);
    return { artifact: artifact, label: record.label, href: record.href, pageTitle: record.pageTitle };
  }

  function single(records, key, value, label) {
    var matches = records.filter(function (record) { return record[key] === value; });
    assert(matches.length <= 1, "Duplicate " + label + " " + value);
    return matches[0] || null;
  }

  function validateResult(identified, labPayload, readingPayload) {
    assert(identified && SHA_PATTERN.test(identified.sha256) && identified.result,
      "Malformed identified comparison result");
    var result = identified.result;
    assert(result.schema === "factorium-composition-lab-result-v0" && result.sources &&
      result.sources.referenceSha256 === labPayload.referenceSha256 &&
      result.sources.relationsSha256 === labPayload.relationsSha256,
    "Comparison result source identity mismatch");
    assert(result.request && result.request.context && result.request.budget && result.graph &&
      Array.isArray(result.graph.nodes) && Array.isArray(result.graph.edges) &&
      Array.isArray(result.graph.frontiers) && Array.isArray(result.graph.unresolvedRelations) &&
      Array.isArray(result.graph.conflicts) && Array.isArray(result.graph.inactiveExclusions) &&
      Array.isArray(result.evaluation) && Array.isArray(result.projections),
    "Malformed comparison result records");
    assert(result.request.direction === "forward" || result.request.direction === "reverse",
      "Invalid comparison direction");
    assert(typeof result.request.problem === "string" && typeof result.request.context.id === "string" &&
      result.request.context.selections && typeof result.request.context.selections === "object" &&
      !Array.isArray(result.request.context.selections), "Malformed comparison request context");
    [["depth", 1, 6], ["edges", 1, 6], ["nodes", 3, 24], ["work", 3, 64]].forEach(function (rule) {
      var value = result.request.budget[rule[0]];
      assert(Number.isInteger(value) && value >= rule[1] && value <= rule[2],
        "Invalid comparison " + rule[0] + " budget");
    });
    var tables = maps(labPayload, readingPayload);
    var relationIds = uniqueSorted(result.request.relations, "Relations");
    var relationSet = new Set(relationIds);
    var seedIds = uniqueSorted(result.request.seeds, "Seeds");
    var exclusionIds = uniqueSorted(result.request.exclusions, "Exclusions");
    var exclusionSet = new Set(exclusionIds);
    assert(seedIds.length >= 1 && seedIds.length <= 3 && relationIds.length >= 1 && relationIds.length <= 6,
      "Invalid comparison request set sizes");
    var nodes = new Map(result.graph.nodes.map(function (node) { return [node.artifact, node]; }));
    assert(nodes.size === result.graph.nodes.length, "Duplicate comparison working node");
    result.graph.nodes.forEach(function (node) {
      assert(typeof node.artifact === "string" && (node.class === "required" || node.class === "evaluative") &&
        Number.isInteger(node.depth) && node.depth >= 0 && typeof node.origin === "string" &&
        typeof node.predecessor === "string", "Malformed comparison working node");
      binding(node.artifact, tables.bindings);
    });
    seedIds.forEach(function (seed) {
      var node = nodes.get(seed);
      assert(node && node.class === "required" && node.depth === 0 && node.origin === "seed" &&
        node.predecessor === "none", "Invalid comparison seed " + seed);
    });
    result.graph.edges.forEach(function (edge) {
      assert(relationSet.has(edge.id), "Unselected comparison edge " + edge.id);
    });
    result.graph.frontiers.concat(result.graph.unresolvedRelations).forEach(function (record) {
      assert(relationSet.has(record.relation), "Unselected comparison boundary " + record.relation);
    });
    result.graph.conflicts.concat(result.graph.inactiveExclusions).forEach(function (record) {
      assert(exclusionSet.has(record.artifact), "Unselected comparison exclusion " + record.artifact);
    });

    var checksById = new Map(result.evaluation.map(function (check) { return [check.id, check]; }));
    assert(checksById.size === result.evaluation.length, "Duplicate comparison check");
    var relationDecisions = new Map();
    relationIds.forEach(function (relationId) {
      var relation = tables.relations.get(relationId);
      assert(relation, "Unknown comparison relation " + relationId);
      var edge = single(result.graph.edges, "id", relationId, "edge");
      var frontier = single(result.graph.frontiers, "relation", relationId, "frontier");
      var unresolved = single(result.graph.unresolvedRelations, "relation", relationId, "unresolved relation");
      assert([edge, frontier, unresolved].filter(Boolean).length === 1,
        "Comparison relation must have one decision " + relationId);
      var predecessor = result.request.direction === "forward" ? relation.source : relation.target;
      var derived = result.request.direction === "forward" ? relation.target : relation.source;
      var decision;
      var reason;
      if (edge) {
        ["verb", "source", "target", "scope", "qualifiers"].forEach(function (key) {
          assert(edge[key] === relation[key], "Comparison edge drift " + relationId + " " + key);
        });
        var check = checksById.get(relationId + "-scope-review");
        assert(check && check.target === relation.scope && check.outcome === "unresolved",
          "Comparison admitted relation check drift " + relationId);
        decision = "admitted";
        reason = "admitted-edge";
      } else if (frontier) {
        assert(frontier.artifact === derived && ["edge", "depth", "node"].some(function (control) {
          return frontier.reason === control + "-budget-before-" + relationId;
        }), "Comparison frontier drift " + relationId);
        decision = "stopped";
        reason = frontier.reason;
      } else {
        assert(unresolved.predecessor === predecessor, "Comparison predecessor drift " + relationId);
        assert(unresolved.reason === "selected-predecessor-not-reached" ||
          unresolved.reason === "depth-budget-not-reached-by-working-graph" ||
          unresolved.reason === "atomic-frontier-needs-1-work-slot" ||
          /^atomic-relation-needs-\d+-(node|work)-slots$/.test(unresolved.reason),
        "Unknown comparison unresolved reason " + relationId);
        decision = unresolved.reason === "selected-predecessor-not-reached" ?
          "predecessor-unreached" : "capacity-limited";
        reason = unresolved.reason;
      }
      relationDecisions.set(relationId, { id: relationId, decision: decision, reason: reason,
        predecessor: predecessor, derived: derived, verb: relation.verb });
    });
    assert(result.evaluation.length === result.graph.edges.length,
      "Comparison checks do not reconcile with admitted edges");
    result.evaluation.forEach(function (check) {
      var relationId = check.id.replace(/-scope-review$/, "");
      var relation = tables.relations.get(relationId);
      assert(check.id === relationId + "-scope-review" && relation &&
        relationDecisions.get(relationId).decision === "admitted" && check.target === relation.scope &&
        check.outcome === "unresolved", "Malformed comparison check " + check.id);
      var expectedKind = relation.scope.indexOf("view:constraint-") === 0 ? "constraint" :
        (relation.scope.indexOf("view:diagnostic-") === 0 ? "diagnostic" : "completeness");
      assert(check.kind === expectedKind, "Comparison check kind drift " + check.id);
    });

    result.graph.nodes.filter(function (node) { return node.origin !== "seed"; }).forEach(function (node) {
      var separator = node.origin.indexOf(":");
      assert(separator > 0, "Unknown comparison node origin " + node.artifact);
      var originKind = node.origin.slice(0, separator);
      var relationId = node.origin.slice(separator + 1);
      var relation = tables.relations.get(relationId);
      var decision = relationDecisions.get(relationId);
      assert(relation && decision && decision.decision === "admitted" &&
        (originKind === "relation" || originKind === "scope"),
      "Unknown comparison node owner " + node.artifact);
      var expectedArtifact = originKind === "relation" ? decision.derived : relation.scope;
      var expectedClass = originKind === "relation" ? "required" : "evaluative";
      var predecessorNode = nodes.get(decision.predecessor);
      assert(node.artifact === expectedArtifact && node.class === expectedClass &&
        node.predecessor === decision.predecessor && predecessorNode &&
        node.depth === predecessorNode.depth + 1, "Comparison node ownership drift " + node.artifact);
    });

    var exclusionDecisions = new Map();
    exclusionIds.forEach(function (artifact) {
      var conflict = single(result.graph.conflicts, "artifact", artifact, "conflict");
      var inactive = single(result.graph.inactiveExclusions, "artifact", artifact, "inactive exclusion");
      assert([conflict, inactive].filter(Boolean).length === 1,
        "Comparison exclusion must have one decision " + artifact);
      if (conflict) {
        assert(/^requested-exclusion-of-reached-(required|evaluative)-node$/.test(conflict.reason),
          "Unknown comparison conflict reason " + artifact);
      } else assert(inactive.reason === "target-not-reached", "Unknown comparison inactive reason " + artifact);
      exclusionDecisions.set(artifact, { artifact: artifact,
        decision: conflict ? "conflict" : "inactive", reason: (conflict || inactive).reason });
    });

    assert(result.state === (result.graph.conflicts.length ? "contradictory" :
      (result.graph.frontiers.length ? "truncated" : "incomplete")),
    "Comparison state does not match structural records");
    var canonicalWork = seedIds.length + result.graph.nodes.length + result.graph.edges.length +
      result.graph.frontiers.length + result.graph.conflicts.length + result.evaluation.length +
      result.projections.length;
    assert(result.work === canonicalWork && Number.isInteger(result.work) &&
      result.work <= result.request.budget.work, "Comparison work accounting drift");
    var maxDepth = result.graph.nodes.reduce(function (maximum, node) {
      return Math.max(maximum, node.depth);
    }, 0);
    assert(maxDepth <= result.request.budget.depth &&
      result.graph.edges.length <= result.request.budget.edges &&
      result.graph.nodes.length <= result.request.budget.nodes,
    "Comparison finite budget exceeded");
    var conflictArtifacts = new Set(result.graph.conflicts.map(function (record) { return record.artifact; }));
    var projectionArtifacts = uniqueSorted(result.projections.map(function (projection) {
      assert((projection.disposition === "selected" || projection.disposition === "rejected") &&
        projection.loss === "simulation-draft", "Malformed comparison projection");
      assert(projection.disposition === (conflictArtifacts.has(projection.artifact) ? "rejected" : "selected"),
        "Comparison projection disposition drift " + projection.artifact);
      return projection.artifact;
    }), "Projections");
    assert(canonicalize(projectionArtifacts) === canonicalize(Array.from(nodes.keys()).sort()),
      "Comparison projections do not match working nodes");
    return { result: result, relations: relationDecisions, exclusions: exclusionDecisions,
      nodes: nodes, checks: checksById, tables: tables };
  }

  function buildSourceActions(identified, labPayload, readingPayload) {
    var validated = validateResult(identified, labPayload, readingPayload);
    var result = validated.result;
    var actions = [];
    function budgetAction(relation, reason, control, before, after) {
      assert(Number.isInteger(before) && Number.isInteger(after) && after > before,
        "Invalid comparison continuation arithmetic " + relation.id);
      var available = after <= LIMITS[control];
      return { id: "relation-" + relation.id + "-raise-" + control,
        sourceKind: "relation", sourceIdentity: relation.id, sourceReason: reason,
        kind: "raise-budget", target: { control: control, before: before, after: after },
        label: "Raise " + control + " budget: " + before + " → " + after,
        explanation: "Changes only the finite " + control + " control for the next request.",
        available: available, unavailableReason: available ? "none" : control + " maximum is " + LIMITS[control] };
    }
    Array.from(validated.relations.keys()).sort().forEach(function (relationId) {
      var decision = validated.relations.get(relationId);
      if (decision.decision === "admitted") return;
      var relation = validated.tables.relations.get(relationId);
      var predecessorNode = validated.nodes.get(decision.predecessor);
      var reason = decision.reason;
      if (decision.decision === "stopped") {
        if (reason === "edge-budget-before-" + relationId) {
          actions.push(budgetAction(relation, reason, "edges", result.request.budget.edges,
            result.request.budget.edges + 1));
        } else if (reason === "depth-budget-before-" + relationId) {
          assert(predecessorNode, "Missing comparison depth predecessor " + relationId);
          actions.push(budgetAction(relation, reason, "depth", result.request.budget.depth,
            predecessorNode.depth + 1));
        } else if (reason === "node-budget-before-" + relationId) {
          var missing = [decision.derived, relation.scope].filter(function (artifact, index, values) {
            return values.indexOf(artifact) === index && !validated.nodes.has(artifact);
          }).length;
          assert(missing > 0, "Comparison node frontier has no missing nodes " + relationId);
          actions.push(budgetAction(relation, reason, "nodes", result.request.budget.nodes,
            result.graph.nodes.length + missing));
        }
        return;
      }
      if (decision.decision === "predecessor-unreached") {
        var selectedSeeds = uniqueSorted(result.request.seeds, "Seeds");
        var available = !selectedSeeds.includes(decision.predecessor) && selectedSeeds.length < 3;
        var bound = binding(decision.predecessor, validated.tables.bindings);
        actions.push({ id: "relation-" + relation.id + "-add-predecessor-seed",
          sourceKind: "relation", sourceIdentity: relation.id, sourceReason: reason,
          kind: "add-seed", target: { control: "seeds", artifact: decision.predecessor,
            before: false, after: true }, label: "Add " + bound.label + " as a seed",
          explanation: "Adds the exact traversal predecessor to the next request.",
          available: available, unavailableReason: available ? "none" : "seed maximum is 3", artifact: bound });
        return;
      }
      var match = /^atomic-relation-needs-(\d+)-(node|work)-slots$/.exec(reason);
      if (match) {
        var amount = Number(match[1]);
        var control = match[2] === "node" ? "nodes" : "work";
        var observed = control === "nodes" ? result.graph.nodes.length : result.work;
        actions.push(budgetAction(relation, reason, control, result.request.budget[control], observed + amount));
      } else if (reason === "depth-budget-not-reached-by-working-graph") {
        assert(predecessorNode, "Missing comparison depth predecessor " + relationId);
        actions.push(budgetAction(relation, reason, "depth", result.request.budget.depth,
          predecessorNode.depth + 1));
      } else if (reason === "atomic-frontier-needs-1-work-slot") {
        actions.push(budgetAction(relation, reason, "work", result.request.budget.work, result.work + 1));
      }
    });
    Array.from(validated.exclusions.keys()).sort().forEach(function (artifact) {
      var decision = validated.exclusions.get(artifact);
      var bound = binding(artifact, validated.tables.bindings);
      actions.push({ id: "exclusion-" + artifact.replace(/[^a-z0-9]+/g, "-") + "-remove",
        sourceKind: "exclusion", sourceIdentity: artifact, sourceReason: decision.reason,
        kind: "remove-exclusion", target: { control: "exclusions", artifact: artifact,
          before: true, after: false }, label: "Remove " + bound.label + " exclusion",
        explanation: "Removes only this exclusion request from the next request.",
        available: true, unavailableReason: "none", artifact: bound });
    });
    return actions.sort(function (left, right) { return left.id.localeCompare(right.id); });
  }

  function atomicRequestChanges(previous, current, actions, bindingByArtifact, relationById) {
    var changes = [];
    function actionIdsFor(control, operation, before, after, artifact) {
      return actions.filter(function (action) {
        if (action.target.control !== control) return false;
        if (action.kind === "raise-budget") return operation === "replace" &&
          action.target.before === before && action.target.after === after;
        if (action.kind === "add-seed") return operation === "add" && artifact === action.target.artifact;
        return action.kind === "remove-exclusion" && operation === "remove" && artifact === action.target.artifact;
      }).map(function (action) { return action.id; }).sort();
    }
    function scalar(control, before, after) {
      if (canonicalize(before) === canonicalize(after)) return;
      var ids = actionIdsFor(control.replace("budget.", ""), "replace", before, after);
      changes.push({ control: control, operation: "replace", before: before, after: after,
        source: ids.length ? "continuation-action" : "additional-control-edit", actionIds: ids });
    }
    scalar("problem", previous.problem, current.problem);
    scalar("context.id", previous.context.id, current.context.id);
    var contextKeys = Array.from(new Set(Object.keys(previous.context.selections)
      .concat(Object.keys(current.context.selections)))).sort();
    contextKeys.forEach(function (key) {
      scalar("context.selection." + key, previous.context.selections[key] === undefined ? null : previous.context.selections[key],
        current.context.selections[key] === undefined ? null : current.context.selections[key]);
    });
    scalar("direction", previous.direction, current.direction);
    ["depth", "edges", "nodes", "work"].forEach(function (control) {
      scalar("budget." + control, previous.budget[control], current.budget[control]);
    });
    function boundValue(control, value) {
      if (control !== "relations") return binding(value, bindingByArtifact);
      var relation = relationById.get(value);
      assert(relation, "Missing request-change relation " + value);
      return { artifact: value, label: value + " · " + relation.verb, href: "", pageTitle: "" };
    }
    function setChanges(control, beforeValues, afterValues) {
      var before = new Set(uniqueSorted(beforeValues, control + " before"));
      var after = new Set(uniqueSorted(afterValues, control + " after"));
      Array.from(before).filter(function (value) { return !after.has(value); }).sort().forEach(function (artifact) {
        var ids = actionIdsFor(control, "remove", null, null, artifact);
        changes.push({ control: control, operation: "remove", artifact: boundValue(control, artifact),
          source: ids.length ? "continuation-action" : "additional-control-edit", actionIds: ids });
      });
      Array.from(after).filter(function (value) { return !before.has(value); }).sort().forEach(function (artifact) {
        var ids = actionIdsFor(control, "add", null, null, artifact);
        changes.push({ control: control, operation: "add", artifact: boundValue(control, artifact),
          source: ids.length ? "continuation-action" : "additional-control-edit", actionIds: ids });
      });
    }
    setChanges("seeds", previous.seeds, current.seeds);
    setChanges("relations", previous.relations, current.relations);
    setChanges("exclusions", previous.exclusions, current.exclusions);
    return changes;
  }

  function transitionRecords(previousMap, currentMap, identityKey, bindRecord) {
    var identities = Array.from(new Set(Array.from(previousMap.keys()).concat(Array.from(currentMap.keys())))).sort();
    var changed = [];
    var unchanged = 0;
    identities.forEach(function (identity) {
      var before = previousMap.get(identity) || null;
      var after = currentMap.get(identity) || null;
      if (canonicalize(before) === canonicalize(after)) { unchanged += 1; return; }
      changed.push({ identity: bindRecord(identity), before: before, after: after,
        transition: !before ? "added" : (!after ? "removed" : "changed"), identityKey: identityKey });
    });
    return { changed: changed, unchanged: unchanged, total: identities.length };
  }

  function relationDecisionLabel(record) {
    if (!record) return "not selected";
    if (record.decision === "admitted") return "admitted";
    if (record.decision === "predecessor-unreached") return "predecessor not reached";
    if (record.decision === "stopped") {
      var frontier = /^(edge|depth|node)-budget-before-/.exec(record.reason);
      assert(frontier, "Unknown stopped comparison label");
      return "stopped at " + frontier[1] + " budget";
    }
    if (record.reason === "depth-budget-not-reached-by-working-graph") return "capacity limited by depth";
    if (record.reason === "atomic-frontier-needs-1-work-slot") return "capacity limited by frontier work";
    var atomic = /^atomic-relation-needs-\d+-(node|work)-slots$/.exec(record.reason);
    assert(atomic, "Unknown capacity comparison label");
    return "capacity limited by " + atomic[1];
  }

  function buildRerunComparison(previousIdentified, currentIdentified, appliedActions,
    labPayload, readingPayload) {
    validatePayloads(labPayload, readingPayload);
    var previous = validateResult(previousIdentified, labPayload, readingPayload);
    var current = validateResult(currentIdentified, labPayload, readingPayload);
    assert(Array.isArray(appliedActions) && appliedActions.length > 0,
      "Comparison requires an applied continuation action");
    var availableActions = new Map(buildSourceActions(previousIdentified, labPayload, readingPayload)
      .map(function (action) { return [action.id, action]; }));
    var actionIds = new Set();
    var actions = appliedActions.slice().sort(function (left, right) { return left.id.localeCompare(right.id); })
      .map(function (action) {
        assert(action && !actionIds.has(action.id), "Duplicate applied continuation action");
        actionIds.add(action.id);
        var exact = availableActions.get(action.id);
        assert(exact && exact.available && canonicalize(exact) === canonicalize(action),
          "Applied continuation action does not match source result");
        return exact;
      });
    var requestChanges = atomicRequestChanges(previous.result.request, current.result.request,
      actions, previous.tables.bindings, previous.tables.relations);
    var attributedIds = new Set(requestChanges.reduce(function (all, change) {
      return all.concat(change.actionIds);
    }, []));
    var actionRecords = actions.map(function (action) {
      return { id: action.id, kind: action.kind, label: action.label, target: action.target,
        disposition: attributedIds.has(action.id) ? "present-in-executed-request" : "superseded-before-run" };
    });

    function relationBinding(relationId) {
      var relation = previous.tables.relations.get(relationId) || current.tables.relations.get(relationId);
      assert(relation, "Missing comparison relation binding " + relationId);
      return { id: relationId, verb: relation.verb,
        source: binding(relation.source, previous.tables.bindings),
        target: binding(relation.target, previous.tables.bindings) };
    }
    var relationTransitions = transitionRecords(previous.relations, current.relations, "relation", relationBinding);
    relationTransitions.changed.forEach(function (record) {
      record.beforeDecision = record.before ? record.before.decision : "not-selected";
      record.afterDecision = record.after ? record.after.decision : "not-selected";
      record.beforeLabel = relationDecisionLabel(record.before);
      record.afterLabel = relationDecisionLabel(record.after);
    });
    var exclusionTransitions = transitionRecords(previous.exclusions, current.exclusions, "exclusion",
      function (artifact) { return binding(artifact, previous.tables.bindings); });
    exclusionTransitions.changed.forEach(function (record) {
      record.beforeDecision = record.before ? record.before.decision : "not-selected";
      record.afterDecision = record.after ? record.after.decision : "not-selected";
    });
    var nodeTransitions = transitionRecords(previous.nodes, current.nodes, "node",
      function (artifact) { return binding(artifact, previous.tables.bindings); });
    var checkTransitions = transitionRecords(previous.checks, current.checks, "check",
      function (checkId) { return { id: checkId }; });
    function metrics(validated) {
      var result = validated.result;
      return { work: result.work, workCap: result.request.budget.work,
        nodes: result.graph.nodes.length, edges: result.graph.edges.length,
        frontiers: result.graph.frontiers.length,
        unresolvedRelations: result.graph.unresolvedRelations.length,
        conflicts: result.graph.conflicts.length, checks: result.evaluation.length };
    }
    return { schema: "factorium-composition-rerun-comparison-v0",
      sources: { referenceSha256: labPayload.referenceSha256,
        relationsSha256: labPayload.relationsSha256 },
      previousResultSha256: previousIdentified.sha256,
      currentResultSha256: currentIdentified.sha256,
      actions: actionRecords,
      requestChanges: requestChanges,
      result: { state: { before: previous.result.state, after: current.result.state,
          changed: previous.result.state !== current.result.state },
        metrics: { before: metrics(previous), after: metrics(current) },
        relations: relationTransitions, exclusions: exclusionTransitions,
        nodes: nodeTransitions, checks: checkTransitions },
      counts: { actions: actionRecords.length,
        actionsPresent: actionRecords.filter(function (action) {
          return action.disposition === "present-in-executed-request";
        }).length,
        actionsSuperseded: actionRecords.filter(function (action) {
          return action.disposition === "superseded-before-run";
        }).length,
        requestChanges: requestChanges.length,
        additionalControlEdits: requestChanges.filter(function (change) {
          return change.source === "additional-control-edit";
        }).length,
        changedRelations: relationTransitions.changed.length,
        changedExclusions: exclusionTransitions.changed.length,
        changedNodes: nodeTransitions.changed.length,
        changedChecks: checkTransitions.changed.length },
      boundary: "This compares two explicit local runs. It does not score the edit, attribute every result difference to it, or evaluate domain validity." };
  }

  function element(documentObject, tag, className, text) {
    var node = documentObject.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function renderComparison(documentObject, target, record) {
    var previous = target.querySelector("#composition-rerun-comparison");
    if (previous) previous.remove();
    var section = element(documentObject, "section", "composition-rerun-comparison");
    section.id = "composition-rerun-comparison";
    section.append(element(documentObject, "p", "lab-stage__operator", "Compare"),
      element(documentObject, "h3", "", "Compared with your previous run"));

    var actionSummary = element(documentObject, "p", "rerun-comparison__summary",
      record.counts.actionsPresent + " of " + record.counts.actions + " recorded continuation " +
      (record.counts.actions === 1 ? "edit was" : "edits were") + " present in the executed request.");
    section.appendChild(actionSummary);
    var actionList = element(documentObject, "ul", "rerun-comparison__actions");
    record.actions.forEach(function (action) {
      var item = element(documentObject, "li", "", action.label);
      item.appendChild(element(documentObject, "span", "rerun-comparison__status rerun-comparison__status--" +
        action.disposition, action.disposition.replace(/-/g, " ")));
      actionList.appendChild(item);
    });
    section.appendChild(actionList);

    var requests = element(documentObject, "div", "rerun-comparison__requests");
    requests.appendChild(element(documentObject, "h4", "", "Executed request changes"));
    var requestList = element(documentObject, "ul", "rerun-comparison__request-list");
    if (!record.requestChanges.length) requestList.appendChild(element(documentObject, "li", "lab-empty", "No request difference remained at execution."));
    record.requestChanges.forEach(function (change) {
      var value = change.artifact ? change.artifact.label : String(change.before) + " → " + String(change.after);
      var item = element(documentObject, "li", "", change.control + " · " + change.operation + " · " + value);
      item.appendChild(element(documentObject, "span", "rerun-comparison__source", change.source.replace(/-/g, " ")));
      requestList.appendChild(item);
    });
    requests.appendChild(requestList);
    section.appendChild(requests);

    var state = element(documentObject, "div", "rerun-comparison__state");
    state.append(element(documentObject, "span", "lab-state lab-state--" + record.result.state.before,
      record.result.state.before), element(documentObject, "span", "rerun-comparison__arrow", "→"),
    element(documentObject, "span", "lab-state lab-state--" + record.result.state.after,
      record.result.state.after));
    section.appendChild(state);
    var metrics = element(documentObject, "dl", "rerun-comparison__metrics");
    [["Work records", "work"], ["Nodes", "nodes"], ["Admitted edges", "edges"],
      ["Frontiers", "frontiers"], ["Unresolved relations", "unresolvedRelations"],
      ["Conflicts", "conflicts"], ["Checks", "checks"]].forEach(function (pair) {
      var group = element(documentObject, "div", "");
      group.append(element(documentObject, "dt", "", pair[0]), element(documentObject, "dd", "",
        record.result.metrics.before[pair[1]] + " → " + record.result.metrics.after[pair[1]]));
      metrics.appendChild(group);
    });
    section.appendChild(metrics);

    var decisions = element(documentObject, "div", "rerun-comparison__decisions");
    decisions.appendChild(element(documentObject, "h4", "", "Changed structural decisions"));
    var decisionList = element(documentObject, "ul", "rerun-comparison__decision-list");
    record.result.relations.changed.forEach(function (change) {
      decisionList.appendChild(element(documentObject, "li", "", change.identity.id + " · " + change.identity.verb +
        " · " + change.beforeLabel + " → " + change.afterLabel));
    });
    record.result.exclusions.changed.forEach(function (change) {
      decisionList.appendChild(element(documentObject, "li", "", change.identity.label + " exclusion · " +
        change.beforeDecision + " → " + change.afterDecision));
    });
    if (!decisionList.children.length) decisionList.appendChild(element(documentObject, "li", "lab-empty",
      "No selected relation or exclusion decision changed."));
    decisions.appendChild(decisionList);
    section.appendChild(decisions);

    var detail = element(documentObject, "details", "rerun-comparison__detail composition-meta--abbreviated");
    detail.appendChild(element(documentObject, "summary", "", "Node and check record changes"));
    detail.append(element(documentObject, "p", "", record.result.nodes.changed.length + " node records changed; " +
      record.result.nodes.unchanged + " unchanged."), element(documentObject, "p", "",
      record.result.checks.changed.length + " check records changed; " + record.result.checks.unchanged + " unchanged."));
    section.append(detail, element(documentObject, "p", "rerun-comparison__boundary", record.boundary),
      element(documentObject, "p", "composition-meta--full rerun-comparison__identity",
        "Previous result " + record.previousResultSha256 + " · Current result " + record.currentResultSha256 +
        " · Reference " + record.sources.referenceSha256 + " · Relations " + record.sources.relationsSha256));
    var reconciliation = target.querySelector("#composition-result-reconciliation");
    if (reconciliation) reconciliation.insertAdjacentElement("afterend", section);
    else target.querySelector(".lab-metrics").insertAdjacentElement("afterend", section);
  }

  var api = { buildRerunComparison: buildRerunComparison, buildSourceActions: buildSourceActions,
    validateResult: validateResult, canonicalize: canonicalize };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (root && root.document && root.FACTORIUM_COMPOSITION_LAB && root.FACTORIUM_COMPOSITION_READING &&
    typeof root.FACTORIUM_COMPOSITION_READING_ROUTE_RENDER === "function") {
    var lastIdentified = null;
    var pending = null;
    root.document.addEventListener("click", function (event) {
      var button = event.target.closest && event.target.closest(".composition-continuations button[data-continuation-id]");
      if (!button || button.dataset.applied !== "true" || !lastIdentified) return;
      try {
        var action = buildSourceActions(lastIdentified, root.FACTORIUM_COMPOSITION_LAB,
          root.FACTORIUM_COMPOSITION_READING).find(function (candidate) {
          return candidate.id === button.dataset.continuationId;
        });
        assert(action && action.available, "Clicked continuation action is not available");
        if (!pending || pending.source.sha256 !== lastIdentified.sha256) {
          pending = { source: lastIdentified, actions: [] };
        }
        if (!pending.actions.some(function (existing) { return existing.id === action.id; })) {
          pending.actions.push(action);
        }
      } catch (_) {
        pending = null;
      }
    });
    var previousRenderer = root.FACTORIUM_COMPOSITION_READING_ROUTE_RENDER;
    root.FACTORIUM_COMPOSITION_READING_ROUTE_RENDER = function (identified) {
      previousRenderer(identified);
      var target = root.document.getElementById("composition-lab-result");
      if (pending && target) {
        try {
          renderComparison(root.document, target, buildRerunComparison(pending.source, identified,
            pending.actions, root.FACTORIUM_COMPOSITION_LAB, root.FACTORIUM_COMPOSITION_READING));
        } catch (_) {
          var reconciliation = target.querySelector("#composition-result-reconciliation");
          var notice = element(root.document, "p", "lab-error", "Previous-run comparison unavailable; the current result is unchanged.");
          if (reconciliation) reconciliation.insertAdjacentElement("afterend", notice);
          else target.prepend(notice);
        }
        pending = null;
      }
      lastIdentified = identified;
    };
  }
})(typeof window !== "undefined" ? window : null);

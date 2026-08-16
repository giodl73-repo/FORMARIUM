(function (root) {
  "use strict";

  var SHA_PATTERN = /^[a-f0-9]{64}$/;
  var STATES = new Set(["incomplete", "truncated", "contradictory"]);
  var MISSING_WORK = [
    ["guide-brief", "Guide identity and intended reader", "The lab supplies a problem statement, not a reviewed guide brief."],
    ["local-evidence", "Named local evidence", "Problem and context controls are declarations, not sourced observations."],
    ["sense-narrowing", "Sense and alternative narrowing", "Graph membership does not select or reject canonical senses."],
    ["mechanism-assignment", "Role and mechanism assignment", "No target mechanism or mapping rationale is supplied."],
    ["check-outcomes", "Substantive check outcomes", "The lab is authorized to emit unresolved checks only."],
    ["recommended-result", "Recommended result and controls", "Structural closure is not a domain recommendation."],
    ["change-tests", "Change tests", "No expected, invalid, or alternative-correct case is supplied."],
    ["review", "Domain and roles review", "Browser execution is not review evidence."]
  ];
  var RETAINED = [
    "problem-declaration", "context-declaration", "structural-state",
    "canonical-trace", "graph-membership", "typed-traversals",
    "closure-boundaries", "unresolved-checks", "source-custody"
  ];

  function assert(condition, message) {
    if (!condition) throw new Error(message);
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function compareBy(keys) {
    return function (left, right) {
      for (var index = 0; index < keys.length; index += 1) {
        var result = String(left[keys[index]] || "").localeCompare(String(right[keys[index]] || ""));
        if (result) return result;
      }
      return 0;
    };
  }

  function validateInputs(result, labPayload, readingPayload, resultSha256) {
    assert(result && result.schema === "factorium-composition-lab-result-v0",
      "Guide skeleton requires a Composition Lab result");
    assert(labPayload && labPayload.schema === "factorium-composition-lab-payload-v0",
      "Guide skeleton requires the Composition Lab payload");
    assert(readingPayload && readingPayload.schema === "factorium-composition-reading-payload-v0",
      "Guide skeleton requires the Composition Reading payload");
    assert(SHA_PATTERN.test(resultSha256 || ""), "Guide skeleton requires result identity");
    assert(SHA_PATTERN.test(labPayload.referenceSha256 || "") &&
      SHA_PATTERN.test(labPayload.relationsSha256 || ""),
    "Guide skeleton payload omits source identity");
    assert(labPayload.referenceSha256 === readingPayload.referenceSha256 &&
      labPayload.referenceSha256 === result.sources.referenceSha256,
    "Guide skeleton reference identity mismatch");
    assert(labPayload.relationsSha256 === readingPayload.relationsSha256 &&
      labPayload.relationsSha256 === result.sources.relationsSha256,
    "Guide skeleton relation identity mismatch");
    assert(STATES.has(result.state), "Guide skeleton rejects unknown or complete state");
    assert(Array.isArray(result.graph && result.graph.nodes) &&
      Array.isArray(result.graph.edges) && Array.isArray(result.evaluation) &&
      Array.isArray(result.projections), "Guide skeleton result is incomplete");
    assert(result.evaluation.every(function (check) { return check.outcome === "unresolved"; }),
      "Guide skeleton rejects substantive check outcomes");
    assert(Array.isArray(labPayload.relations) && labPayload.relations.length === 6,
      "Guide skeleton requires six reviewed relations");
    assert(Array.isArray(readingPayload.bindings) && readingPayload.bindings.length === 18,
      "Guide skeleton requires 18 exact bindings");
    var artifacts = new Set();
    readingPayload.bindings.forEach(function (binding) {
      assert(binding && typeof binding.artifact === "string" && !artifacts.has(binding.artifact),
        "Guide skeleton has a missing or duplicate binding");
      artifacts.add(binding.artifact);
      assert(binding.kind === "anchor" || binding.kind === "view",
        "Guide skeleton binding has invalid kind");
      ["label", "pageTitle", "href"].forEach(function (field) {
        assert(typeof binding[field] === "string" && binding[field].length > 0,
          "Guide skeleton binding omits " + field);
      });
    });
    var nodeArtifacts = new Set(result.graph.nodes.map(function (node) { return node.artifact; }));
    assert(nodeArtifacts.size === result.graph.nodes.length, "Guide skeleton graph repeats a node");
    result.graph.nodes.forEach(function (node) {
      assert(artifacts.has(node.artifact), "No guide binding for admitted artifact " + node.artifact);
    });
    assert(result.projections.length === result.graph.nodes.length,
      "Guide skeleton projection does not cover every node");
    var projected = new Set(result.projections.map(function (row) { return row.artifact; }));
    assert(projected.size === nodeArtifacts.size &&
      Array.from(nodeArtifacts).every(function (artifact) { return projected.has(artifact); }),
    "Guide skeleton projection membership mismatch");
  }

  function graphRole(node) {
    return node.origin === "seed" ? "seed" : node.class;
  }

  function buildTrace(result, bindingByArtifact, projectionByArtifact) {
    var pages = new Map();
    result.graph.nodes.slice().sort(compareBy(["artifact"])).forEach(function (node) {
      var binding = bindingByArtifact.get(node.artifact);
      var stage = node.origin === "seed" ? "start" :
        (binding.kind === "anchor" ? "continue" : "evaluate");
      var rank = { start: 0, continue: 1, evaluate: 2 }[stage];
      var page = pages.get(binding.href);
      if (!page) {
        page = {
          href: binding.href, pageTitle: binding.pageTitle, kind: binding.kind,
          stage: stage, stageRank: rank, bindings: []
        };
        pages.set(binding.href, page);
      } else if (rank < page.stageRank) {
        page.stage = stage;
        page.stageRank = rank;
      }
      page.bindings.push({
        artifact: node.artifact,
        label: binding.label,
        graphRole: graphRole(node),
        disposition: projectionByArtifact.get(node.artifact).disposition
      });
    });
    return Array.from(pages.values()).map(function (page) {
      page.bindings.sort(compareBy(["artifact"]));
      return page;
    }).sort(function (left, right) {
      return left.stageRank - right.stageRank ||
        compareBy(["pageTitle", "href"])(left, right) ||
        left.bindings[0].artifact.localeCompare(right.bindings[0].artifact);
    }).map(function (page) {
      delete page.stageRank;
      return page;
    });
  }

  function buildGuideSkeleton(result, labPayload, readingPayload, resultSha256) {
    validateInputs(result, labPayload, readingPayload, resultSha256);
    var bindingByArtifact = new Map(readingPayload.bindings.map(function (binding) {
      return [binding.artifact, binding];
    }));
    var projectionByArtifact = new Map(result.projections.map(function (projection) {
      return [projection.artifact, projection];
    }));
    var relationById = new Map(labPayload.relations.map(function (relation) {
      return [relation.id, relation];
    }));
    var nodeByArtifact = new Map(result.graph.nodes.map(function (node) {
      return [node.artifact, node];
    }));

    var relations = result.graph.edges.map(function (edge) {
      var relation = relationById.get(edge.id);
      assert(relation, "Guide skeleton has unknown admitted relation " + edge.id);
      return {
        id: edge.id, verb: edge.verb, source: edge.source,
        target: edge.target, scope: edge.scope
      };
    }).sort(compareBy(["id"]));
    var rows = result.projections.map(function (projection) {
      var node = nodeByArtifact.get(projection.artifact);
      var binding = bindingByArtifact.get(projection.artifact);
      return {
        artifact: projection.artifact,
        label: binding.label,
        graphRole: graphRole(node),
        disposition: projection.disposition,
        loss: projection.loss
      };
    }).sort(compareBy(["artifact"]));
    var ledger = result.evaluation.map(function (check) {
      var binding = bindingByArtifact.get(check.target);
      assert(binding && binding.kind === "view", "Guide check target must bind to a view");
      return {
        id: check.id, kind: check.kind, target: check.target,
        targetLabel: binding.pageTitle, href: binding.href,
        outcome: check.outcome, requiredInput: "named-local-evidence"
      };
    }).sort(compareBy(["id"]));

    return {
      schema: "factorium-composition-guide-skeleton-v0",
      resultSha256: resultSha256,
      referenceSha256: labPayload.referenceSha256,
      relationsSha256: labPayload.relationsSha256,
      brief: {
        title: "Guide skeleton: " + result.request.problem,
        problem: result.request.problem,
        status: "incomplete-guide-skeleton",
        decisionStatus: "missing",
        contextId: result.request.context.id,
        contextSelections: Object.keys(result.request.context.selections).sort().map(function (key) {
          return key + "=" + result.request.context.selections[key];
        }),
        state: result.state
      },
      canonicalTrace: buildTrace(result, bindingByArtifact, projectionByArtifact),
      workingSet: {
        seeds: result.request.seeds.slice().sort().map(function (artifact) {
          return { artifact: artifact, label: bindingByArtifact.get(artifact).label };
        }),
        relations: relations,
        rows: rows
      },
      evaluationLedger: ledger,
      closureBoundary: {
        frontiers: clone(result.graph.frontiers || []).sort(compareBy(["artifact", "relation"])),
        unresolvedRelations: clone(result.graph.unresolvedRelations || []).sort(compareBy(["relation", "predecessor"])),
        conflicts: clone(result.graph.conflicts || []).sort(compareBy(["id", "artifact"])),
        inactiveExclusions: clone(result.graph.inactiveExclusions || []).sort(compareBy(["artifact"]))
      },
      missingWork: MISSING_WORK.map(function (item) {
        return { code: item[0], label: item[1], status: "missing", reason: item[2] };
      }).sort(compareBy(["code"])),
      lossManifest: {
        retained: RETAINED.slice().sort(),
        absent: MISSING_WORK.map(function (item) { return item[0]; }).sort(),
        boundary: "Retained structure is not local evidence, sense narrowing, substantive evaluation, or recommendation."
      }
    };
  }

  function element(documentObject, name, className, text) {
    var node = documentObject.createElement(name);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function appendDefinition(documentObject, list, term, description) {
    list.append(element(documentObject, "dt", "", term),
      element(documentObject, "dd", "", description));
  }

  function stageLabel(stage) {
    return stage.charAt(0).toUpperCase() + stage.slice(1);
  }

  function renderGuideSkeleton(documentObject, target, guide) {
    var previous = target.querySelector("#composition-guide-skeleton");
    if (previous) previous.remove();
    var section = element(documentObject, "article", "composition-guide-skeleton");
    section.id = "composition-guide-skeleton";
    section.dataset.state = guide.brief.state;
    section.append(
      element(documentObject, "p", "lab-stage__operator", "Guide"),
      element(documentObject, "h3", "", "Factor Guide skeleton"),
      element(documentObject, "p", "guide-skeleton__status guide-skeleton__status--" + guide.brief.state,
        guide.brief.state + " structure · 8 requirements missing"),
      element(documentObject, "p", "guide-skeleton__caveat",
        "Book-form structural projection only. This is not a completed guide, domain evaluation, or recommendation.")
    );

    var brief = element(documentObject, "section", "guide-skeleton__section guide-skeleton__brief");
    brief.append(element(documentObject, "p", "guide-skeleton__eyebrow", "Declared brief"),
      element(documentObject, "h4", "", "The question carried into this skeleton"),
      element(documentObject, "p", "guide-skeleton__problem", guide.brief.problem));
    var declaration = element(documentObject, "dl", "guide-skeleton__declarations");
    appendDefinition(documentObject, declaration, "Context Profile", guide.brief.contextId);
    appendDefinition(documentObject, declaration, "Declared frame", guide.brief.contextSelections.join(" · "));
    appendDefinition(documentObject, declaration, "Local decision", "Not supplied");
    appendDefinition(documentObject, declaration, "Named local evidence", "Not supplied; the problem and frame are declarations only");
    brief.appendChild(declaration);
    section.appendChild(brief);

    var trace = element(documentObject, "section", "guide-skeleton__section guide-skeleton__trace");
    trace.append(element(documentObject, "p", "guide-skeleton__eyebrow", "Canonical trace"),
      element(documentObject, "h4", "", "Read from the sources that own the admitted structure"));
    var traceList = element(documentObject, "ol", "guide-skeleton__trace-list");
    guide.canonicalTrace.forEach(function (page) {
      var item = element(documentObject, "li", "guide-skeleton__trace-item");
      item.appendChild(element(documentObject, "span", "guide-skeleton__stage guide-skeleton__stage--" + page.stage,
        stageLabel(page.stage)));
      var link = element(documentObject, "a", "", page.pageTitle);
      link.href = page.href;
      item.appendChild(link);
      var exact = element(documentObject, "details", "composition-meta--full guide-skeleton__exact");
      exact.appendChild(element(documentObject, "summary", "", "Exact graph bindings"));
      var bindings = element(documentObject, "ul", "");
      page.bindings.forEach(function (binding) {
        var row = element(documentObject, "li", binding.disposition === "rejected" ? "is-rejected" : "");
        row.append(element(documentObject, "strong", "", binding.label),
          element(documentObject, "span", "", binding.graphRole + " · " + binding.disposition),
          element(documentObject, "code", "", binding.artifact));
        bindings.appendChild(row);
      });
      exact.appendChild(bindings);
      item.appendChild(exact);
      traceList.appendChild(item);
    });
    trace.appendChild(traceList);
    section.appendChild(trace);

    var evaluation = element(documentObject, "section", "guide-skeleton__section guide-skeleton__evaluation");
    evaluation.append(element(documentObject, "p", "guide-skeleton__eyebrow", "Evaluation ledger"),
      element(documentObject, "h4", "", "What still requires evidence"),
      element(documentObject, "p", "guide-skeleton__evaluation-summary",
        guide.evaluationLedger.length + " substantive checks unresolved; no outcome was inferred."));
    var evaluationList = element(documentObject, "ul", "composition-detail--core guide-skeleton__ledger");
    guide.evaluationLedger.forEach(function (check) {
      var item = element(documentObject, "li", "");
      var link = element(documentObject, "a", "", check.targetLabel);
      link.href = check.href;
      item.append(element(documentObject, "strong", "", "Unresolved " + check.kind), link,
        element(documentObject, "span", "", "Requires named local evidence and a declared outcome."),
        element(documentObject, "code", "composition-meta--full", check.id));
      evaluationList.appendChild(item);
    });
    evaluation.appendChild(evaluationList);
    section.appendChild(evaluation);

    var boundary = element(documentObject, "section", "guide-skeleton__section guide-skeleton__boundary");
    boundary.append(element(documentObject, "p", "guide-skeleton__eyebrow", "Closure boundary"),
      element(documentObject, "h4", "", "Where the structural work stops"));
    var boundaryList = element(documentObject, "ul", "guide-skeleton__boundary-list");
    guide.closureBoundary.frontiers.forEach(function (record) {
      var item = element(documentObject, "li", "is-frontier");
      item.append(element(documentObject, "strong", "", "Finite frontier · " + record.relation),
        element(documentObject, "span", "", "A reached traversal stopped at the declared budget."),
        element(documentObject, "code", "composition-meta--full", record.artifact + " · " + record.reason));
      boundaryList.appendChild(item);
    });
    guide.closureBoundary.unresolvedRelations.forEach(function (record) {
      var item = element(documentObject, "li", "is-unresolved");
      item.append(element(documentObject, "strong", "", "Selected relation unresolved · " + record.relation),
        element(documentObject, "span", "", "Its required predecessor or capacity was not available."),
        element(documentObject, "code", "composition-meta--full", record.predecessor + " · " + record.reason));
      boundaryList.appendChild(item);
    });
    guide.closureBoundary.conflicts.forEach(function (record) {
      var item = element(documentObject, "li", "is-conflict");
      item.append(element(documentObject, "strong", "", "Exclusion conflict"),
        element(documentObject, "span", "", "The requested removal targets reached required structure and remains unresolved."),
        element(documentObject, "code", "composition-meta--full", record.artifact + " · " + record.reason));
      boundaryList.appendChild(item);
    });
    guide.closureBoundary.inactiveExclusions.forEach(function (record) {
      var item = element(documentObject, "li", "is-inactive");
      item.append(element(documentObject, "strong", "", "Inactive exclusion request"),
        element(documentObject, "span", "", "The target was not reached and no conflict was created."),
        element(documentObject, "code", "composition-meta--full", record.artifact + " · " + record.reason));
      boundaryList.appendChild(item);
    });
    if (!boundaryList.children.length) {
      boundaryList.appendChild(element(documentObject, "li", "is-stable",
        "No budget frontier, unreachable selected relation, or exclusion conflict; unresolved checks still prevent completion."));
    }
    boundary.appendChild(boundaryList);
    section.appendChild(boundary);

    var working = element(documentObject, "details", "composition-detail--core guide-skeleton__working");
    working.appendChild(element(documentObject, "summary", "", "Inspect the structural working set"));
    var workingBody = element(documentObject, "div", "guide-skeleton__working-body");
    var relationList = element(documentObject, "ul", "guide-skeleton__working-list");
    guide.workingSet.relations.forEach(function (relation) {
      var item = element(documentObject, "li", "");
      item.append(element(documentObject, "strong", "", relation.verb.replace(/-/g, " ")),
        element(documentObject, "span", "", "Typed traversal admitted structurally."),
        element(documentObject, "code", "composition-meta--full",
          relation.id + " · " + relation.source + " → " + relation.target + " · " + relation.scope));
      relationList.appendChild(item);
    });
    if (!relationList.children.length) relationList.appendChild(element(documentObject, "li", "", "No typed relation was admitted."));
    workingBody.appendChild(relationList);
    working.appendChild(workingBody);
    section.appendChild(working);

    var missing = element(documentObject, "details", "guide-skeleton__missing");
    missing.appendChild(element(documentObject, "summary", "", "8 requirements missing before this can become a Factor Guide"));
    var missingList = element(documentObject, "ol", "guide-skeleton__missing-list");
    guide.missingWork.forEach(function (record) {
      var item = element(documentObject, "li", "");
      item.dataset.missingCode = record.code;
      item.append(element(documentObject, "strong", "", record.label),
        element(documentObject, "span", "", record.reason),
        element(documentObject, "code", "composition-meta--full", record.code + " · " + record.status));
      missingList.appendChild(item);
    });
    missing.appendChild(missingList);
    section.appendChild(missing);

    var loss = element(documentObject, "details", "composition-detail--core guide-skeleton__loss");
    loss.appendChild(element(documentObject, "summary", "", "Read the loss declaration"));
    loss.appendChild(element(documentObject, "p", "", guide.lossManifest.boundary));
    loss.appendChild(element(documentObject, "p", "composition-meta--full", "Retained · " +
      guide.lossManifest.retained.join(" · ") + " | Absent · " + guide.lossManifest.absent.join(" · ")));
    section.appendChild(loss);
    section.appendChild(element(documentObject, "p", "composition-meta--full guide-skeleton__identity",
      "Inherited result " + guide.resultSha256 + " · Reference " + guide.referenceSha256 +
      " · Relations " + guide.relationsSha256));

    var map = target.querySelector("#composition-closure-map");
    var route = target.querySelector("#composition-reading-route");
    if (map) map.insertAdjacentElement("afterend", section);
    else if (route) route.insertAdjacentElement("beforebegin", section);
    else target.appendChild(section);

    function applyDisclosure(profile) {
      missing.open = profile !== "compact";
      working.open = profile === "full";
      loss.open = profile === "full";
    }
    var activeButton = documentObject.querySelector("[data-composition-profile][aria-pressed='true']");
    applyDisclosure(activeButton ? activeButton.dataset.compositionProfile : "book");
    Array.from(documentObject.querySelectorAll("[data-composition-profile]")).forEach(function (button) {
      button.addEventListener("click", function () { applyDisclosure(button.dataset.compositionProfile); });
    });
  }

  function renderUnavailable(documentObject, target) {
    var previous = target.querySelector("#composition-guide-skeleton");
    if (previous) previous.remove();
    var notice = element(documentObject, "p", "lab-error guide-skeleton__error",
      "Factor Guide skeleton unavailable. The exact graph, stage audit, and canonical reading route remain available.");
    var map = target.querySelector("#composition-closure-map");
    var route = target.querySelector("#composition-reading-route");
    if (map) map.insertAdjacentElement("afterend", notice);
    else if (route) route.insertAdjacentElement("beforebegin", notice);
    else target.appendChild(notice);
  }

  var api = {
    MISSING_WORK: MISSING_WORK,
    RETAINED: RETAINED,
    validateInputs: validateInputs,
    buildGuideSkeleton: buildGuideSkeleton,
    renderGuideSkeleton: renderGuideSkeleton
  };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (root && root.document && root.FACTORIUM_COMPOSITION_LAB &&
    root.FACTORIUM_COMPOSITION_READING &&
    typeof root.FACTORIUM_COMPOSITION_READING_ROUTE_RENDER === "function") {
    var previousRenderer = root.FACTORIUM_COMPOSITION_READING_ROUTE_RENDER;
    root.FACTORIUM_COMPOSITION_READING_ROUTE_RENDER = function (identified) {
      previousRenderer(identified);
      var target = root.document.getElementById("composition-lab-result");
      if (!target) return;
      try {
        renderGuideSkeleton(root.document, target, buildGuideSkeleton(
          identified.result, root.FACTORIUM_COMPOSITION_LAB,
          root.FACTORIUM_COMPOSITION_READING, identified.sha256));
      } catch (_) {
        renderUnavailable(root.document, target);
      }
    };
  }
})(typeof window !== "undefined" ? window : null);

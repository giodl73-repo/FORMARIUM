(function (root) {
  "use strict";

  var SHA_PATTERN = /^[a-f0-9]{64}$/;

  function assert(condition, message) {
    if (!condition) throw new Error(message);
  }

  function validatePayload(payload) {
    assert(payload && payload.schema === "factorium-composition-reading-payload-v0",
      "Unknown composition reading payload");
    assert(SHA_PATTERN.test(payload.referenceSha256 || ""),
      "Reading payload omits reference identity");
    assert(SHA_PATTERN.test(payload.relationsSha256 || ""),
      "Reading payload omits relation identity");
    assert(Array.isArray(payload.bindings) && payload.bindings.length === 18,
      "Reading payload requires 18 exact artifact bindings");
    var artifacts = new Set();
    payload.bindings.forEach(function (binding) {
      assert(binding && typeof binding.artifact === "string" && binding.artifact.length > 0,
        "Reading binding omits artifact");
      assert(!artifacts.has(binding.artifact), "Duplicate reading binding " + binding.artifact);
      artifacts.add(binding.artifact);
      assert(binding.kind === "anchor" || binding.kind === "view",
        "Reading binding has invalid kind");
      ["label", "pageTitle", "href"].forEach(function (key) {
        assert(typeof binding[key] === "string" && binding[key].length > 0,
          "Reading binding omits " + key);
      });
      assert(/^entries\/[a-z0-9-]+\.html$/.test(binding.href),
        "Reading binding has invalid local destination");
    });
  }

  function stageFor(node, binding) {
    if (node.origin === "seed") return { id: "start", label: "Start", rank: 0 };
    if (binding.kind === "anchor") return { id: "continue", label: "Continue", rank: 1 };
    return { id: "evaluate", label: "Evaluate", rank: 2 };
  }

  function buildReadingRoute(result, payload, resultSha256) {
    validatePayload(payload);
    assert(result && result.schema === "factorium-composition-lab-result-v0",
      "Reading route requires a Composition Lab result");
    assert(SHA_PATTERN.test(resultSha256 || ""), "Reading route requires result identity");
    assert(Array.isArray(result.graph && result.graph.nodes),
      "Reading route requires graph nodes");

    var bindingByArtifact = new Map(payload.bindings.map(function (binding) {
      return [binding.artifact, binding];
    }));
    var conflictTargets = new Set((result.graph.conflicts || []).map(function (conflict) {
      return conflict.artifact;
    }));
    var pages = new Map();
    result.graph.nodes.forEach(function (node) {
      var binding = bindingByArtifact.get(node.artifact);
      assert(binding, "No reading binding for admitted artifact " + node.artifact);
      if (node.class === "evaluative") {
        assert(binding.kind === "view", "Evaluative node must bind to a view");
      } else {
        assert(binding.kind === "anchor", "Required node must bind to an anchor");
      }
      var stage = stageFor(node, binding);
      var page = pages.get(binding.href);
      if (!page) {
        page = {
          href: binding.href,
          pageTitle: binding.pageTitle,
          kind: binding.kind,
          stage: stage.id,
          stageLabel: stage.label,
          stageRank: stage.rank,
          bindings: []
        };
        pages.set(binding.href, page);
      } else {
        assert(page.pageTitle === binding.pageTitle && page.kind === binding.kind,
          "One reading destination has conflicting custody");
        if (stage.rank < page.stageRank) {
          page.stage = stage.id;
          page.stageLabel = stage.label;
          page.stageRank = stage.rank;
        }
      }
      page.bindings.push({
        artifact: node.artifact,
        label: binding.label,
        graphRole: node.origin === "seed" ? "seed" : node.class,
        disposition: conflictTargets.has(node.artifact) ? "rejected" : "selected"
      });
    });

    var routePages = Array.from(pages.values()).map(function (page) {
      page.bindings.sort(function (left, right) {
        return left.artifact.localeCompare(right.artifact);
      });
      return page;
    }).sort(function (left, right) {
      return left.stageRank - right.stageRank ||
        left.pageTitle.localeCompare(right.pageTitle) || left.href.localeCompare(right.href);
    }).map(function (page) {
      delete page.stageRank;
      return page;
    });

    return {
      schema: "factorium-composition-reading-route-v0",
      resultSha256: resultSha256,
      referenceSha256: payload.referenceSha256,
      relationsSha256: payload.relationsSha256,
      admittedNodeCount: result.graph.nodes.length,
      pages: routePages
    };
  }

  function element(documentObject, name, className, text) {
    var node = documentObject.createElement(name);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function explanation(page) {
    if (page.stage === "start") return "Start with the anchor entry that owns a selected factor.";
    if (page.stage === "continue") return "Continue with the anchor entry that owns a derived required factor.";
    return "Use this specialized view to inspect the unresolved structural check.";
  }

  function renderReadingRoute(documentObject, target, route) {
    var section = element(documentObject, "section", "composition-reading-route");
    section.id = "composition-reading-route";
    section.append(
      element(documentObject, "p", "lab-stage__operator", "Read"),
      element(documentObject, "h3", "", "Read the admitted closure"),
      element(documentObject, "p", "composition-reading-route__summary",
        route.pages.length + " book pages, deduplicated from " +
        route.admittedNodeCount + " admitted graph nodes.")
    );
    var list = element(documentObject, "ol", "composition-reading-route__pages");
    route.pages.forEach(function (page) {
      var item = element(documentObject, "li", "composition-reading-route__page");
      var heading = element(documentObject, "div", "composition-reading-route__heading");
      heading.append(element(documentObject, "span", "composition-reading-route__stage composition-reading-route__stage--" + page.stage,
        page.stageLabel));
      var link = element(documentObject, "a", "", page.pageTitle);
      link.href = page.href;
      heading.appendChild(link);
      item.append(heading, element(documentObject, "p", "", explanation(page)));
      var details = element(documentObject, "details", "composition-reading-route__bindings");
      details.appendChild(element(documentObject, "summary", "", "Show graph bindings"));
      var bindings = element(documentObject, "ul", "");
      page.bindings.forEach(function (binding) {
        var bindingItem = element(documentObject, "li", binding.disposition === "rejected" ? "is-rejected" : "");
        bindingItem.append(
          element(documentObject, "strong", "", binding.label),
          element(documentObject, "span", "", binding.graphRole + " · " + binding.disposition),
          element(documentObject, "code", "", binding.artifact)
        );
        bindings.appendChild(bindingItem);
      });
      details.appendChild(bindings);
      item.appendChild(details);
      list.appendChild(item);
    });
    section.appendChild(list);
    section.appendChild(element(documentObject, "p", "composition-reading-route__boundary",
      "Navigation projection only. These pages remain authoritative; the route is not evidence or a canonical Factor Guide."));
    target.appendChild(section);
  }

  var api = { validatePayload: validatePayload, buildReadingRoute: buildReadingRoute };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (root && root.document && root.FACTORIUM_COMPOSITION_READING) {
    validatePayload(root.FACTORIUM_COMPOSITION_READING);
    root.FACTORIUM_COMPOSITION_READING_ROUTE_RENDER = function (identified) {
      var target = root.document.getElementById("composition-lab-result");
      if (!target) return;
      var route = buildReadingRoute(identified.result,
        root.FACTORIUM_COMPOSITION_READING, identified.sha256);
      renderReadingRoute(root.document, target, route);
    };
  }
})(typeof window !== "undefined" ? window : null);

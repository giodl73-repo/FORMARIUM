(function (root) {
  "use strict";

  var routeSpecs = [
    { label: "Evaluation or rating scale", path: "tables/entries/evaluation-measure-scale-criterion.md" },
    { label: "Unit, numerical, or temperature scale", path: "tables/entries/quantity-value-unit-conversion.md" },
    { label: "Geometric scaling or size", path: "tables/entries/geometric-reference-structure.md" }
  ];

  function normalize(value) {
    return String(value || "").normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
      .toLowerCase().trim().replace(/\s+/g, " ");
  }

  function routesForQuery(query, records) {
    if (normalize(query) !== "scale") return null;
    return routeSpecs.map(function (spec) {
      var targets = records.filter(function (record) { return record.path === spec.path; });
      if (targets.length !== 1) throw new Error("Scale chooser target must resolve exactly once: " + spec.path);
      return { label: spec.label, path: spec.path, title: targets[0].familyTitle || targets[0].title, href: targets[0].familyHref || targets[0].href };
    });
  }

  function initialize(records, documentObject) {
    var input = documentObject.getElementById("proof-search-query");
    var status = documentObject.getElementById("proof-search-status");
    if (!input || !status) return;
    var panel = documentObject.createElement("aside");
    panel.id = "proof-search-scale-chooser";
    panel.className = "proof-search__scale-chooser";
    panel.hidden = true;
    panel.setAttribute("aria-live", "polite");
    var identity = documentObject.createElement("span"); identity.textContent = "Meaning chooser";
    var heading = documentObject.createElement("strong"); heading.textContent = "Which kind of scale?";
    var links = documentObject.createElement("ul");
    var boundary = documentObject.createElement("small");
    boundary.textContent = "Choose an existing Table meaning; this does not classify the query or make the meanings equivalent.";
    panel.append(identity, heading, links, boundary);
    status.parentNode.insertBefore(panel, status);

    function render() {
      var routes = routesForQuery(input.value, records);
      panel.hidden = !routes; links.replaceChildren();
      if (!routes) return;
      routes.forEach(function (route) {
        var item = documentObject.createElement("li");
        var label = documentObject.createElement("strong"); label.textContent = route.label;
        var link = documentObject.createElement("a"); link.href = route.href; link.textContent = route.title;
        item.append(label, link); links.appendChild(item);
      });
    }
    input.addEventListener("input", render); render();
  }

  var api = { normalize: normalize, routesForQuery: routesForQuery };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (root && root.document && root.FACTORIUM_SEARCH_INDEX) initialize(root.FACTORIUM_SEARCH_INDEX, root.document);
})(typeof window !== "undefined" ? window : null);


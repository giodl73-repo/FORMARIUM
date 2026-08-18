(function (root) {
  "use strict";

  var aliases = new Map([
    ["electric power", ["tables/entries/electrical-quantity.md"]],
    ["field of force", ["tables/entries/electrical-quantity.md", "tables/entries/matter-load-measure.md"]],
    ["force field", ["tables/entries/electrical-quantity.md", "tables/entries/matter-load-measure.md"]],
    ["frame of reference", ["tables/entries/geometric-reference-structure.md"]],
    ["organisation", ["tables/entries/organization-role-authority.md"]]
  ]);

  function normalize(value) {
    return String(value || "")
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " ");
  }

  function routesForQuery(query, records) {
    var paths = aliases.get(normalize(query));
    if (!paths) return null;
    return paths.map(function (targetPath) {
      var targets = records.filter(function (record) { return record.path === targetPath; });
      if (targets.length !== 1) throw new Error("Lookup alias target must resolve exactly once: " + targetPath);
      return {
        path: targetPath,
        title: targets[0].familyTitle || targets[0].title,
        href: targets[0].familyHref || targets[0].href
      };
    });
  }

  function initialize(records, documentObject) {
    var input = documentObject.getElementById("proof-search-query");
    var status = documentObject.getElementById("proof-search-status");
    if (!input || !status) return;

    var panel = documentObject.createElement("aside");
    panel.id = "proof-search-alias";
    panel.className = "proof-search__alias";
    panel.hidden = true;
    panel.setAttribute("aria-live", "polite");
    var identity = documentObject.createElement("span");
    identity.textContent = "Lookup alias";
    var heading = documentObject.createElement("strong");
    heading.textContent = "Existing Table routes";
    var links = documentObject.createElement("ul");
    var boundary = documentObject.createElement("small");
    boundary.textContent = "Language routes to existing Tables; not a new concept, equivalence, classification, or semantic closure.";
    panel.append(identity, heading, links, boundary);
    status.parentNode.insertBefore(panel, status);

    function render() {
      var routes = routesForQuery(input.value, records);
      panel.hidden = !routes;
      links.replaceChildren();
      if (!routes) return;
      routes.forEach(function (route) {
        var item = documentObject.createElement("li");
        var link = documentObject.createElement("a");
        link.href = route.href;
        link.textContent = route.title;
        item.appendChild(link);
        links.appendChild(item);
      });
    }

    input.addEventListener("input", render);
    render();
  }

  var api = { aliases: aliases, normalize: normalize, routesForQuery: routesForQuery };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (root && root.document && root.FACTORIUM_SEARCH_INDEX) initialize(root.FACTORIUM_SEARCH_INDEX, root.document);
})(typeof window !== "undefined" ? window : null);


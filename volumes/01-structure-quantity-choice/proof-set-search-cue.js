(function (root) {
  "use strict";

  var cueQueries = new Set(["size", "how big", "how large"]);
  var targetPath = "tables/entries/geometric-measure.md";

  function normalize(value) {
    return String(value || "")
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " ");
  }

  function cueForQuery(query, records) {
    if (!cueQueries.has(normalize(query))) return null;
    var targets = records.filter(function (record) {
      return record.path === targetPath;
    });
    if (targets.length !== 1) {
      throw new Error("Everyday search cue target must resolve exactly once");
    }
    return {
      label: "If you mean geometric size",
      title: targets[0].familyTitle || targets[0].title,
      href: targets[0].familyHref || targets[0].href
    };
  }

  function initialize(records, documentObject) {
    var input = documentObject.getElementById("proof-search-query");
    var status = documentObject.getElementById("proof-search-status");
    if (!input || !status) return;

    var cue = documentObject.createElement("aside");
    cue.id = "proof-search-cue";
    cue.className = "proof-search__cue";
    cue.hidden = true;
    cue.setAttribute("aria-live", "polite");
    var identity = documentObject.createElement("span");
    identity.textContent = "Navigation cue";
    var condition = documentObject.createElement("strong");
    var link = documentObject.createElement("a");
    var boundary = documentObject.createElement("small");
    boundary.textContent = "A conditional route, not a synonym or classification.";
    cue.append(identity, condition, link, boundary);
    status.parentNode.insertBefore(cue, status);

    function render() {
      var match = cueForQuery(input.value, records);
      cue.hidden = !match;
      if (!match) {
        condition.textContent = "";
        link.removeAttribute("href");
        link.textContent = "";
        return;
      }
      condition.textContent = match.label + ":";
      link.href = match.href;
      link.textContent = match.title;
    }

    input.addEventListener("input", render);
    render();
  }

  var api = { normalize: normalize, cueForQuery: cueForQuery };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (root && root.document && root.FACTORIUM_SEARCH_INDEX) {
    initialize(root.FACTORIUM_SEARCH_INDEX, root.document);
  }
})(typeof window !== "undefined" ? window : null);

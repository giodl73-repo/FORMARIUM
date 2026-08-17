(function (root) {
  "use strict";

  function normalize(value) {
    return String(value || "")
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  function searchRecords(records, query, kind, domain) {
    var phrase = normalize(query).trim();
    var stopWords = new Set([
      "a", "an", "and", "are", "as", "at", "be", "by", "did", "do",
      "does", "for", "from", "how", "in", "is", "it", "of", "on",
      "or", "the", "to", "was", "were", "what", "when", "where",
      "which", "why", "with"
    ]);
    var rawTokens = phrase.match(/[a-z0-9]+/g) || [];
    var tokens = rawTokens.filter(function (token) { return !stopWords.has(token); });
    if (!tokens.length) tokens = rawTokens;

    return records
      .filter(function (record) {
        return (!kind || record.kind === kind) &&
          (!domain || record.domain === domain);
      })
      .map(function (record) {
        var title = normalize(record.title);
        var metadata = normalize(
          [record.kind, record.domain, record.maturity, record.path].join(" ")
        );
        var summary = normalize(record.summary);
        var body = normalize(record.text);
        var score = 0;

        if (!tokens.length) {
          return { record: record, score: 0 };
        }
        if (title === phrase) score += 200;
        if (title.indexOf(phrase) !== -1) score += 100;
        if (summary.indexOf(phrase) !== -1) score += 35;
        if (body.indexOf(phrase) !== -1) score += 15;

        var matchedTokens = 0;
        tokens.forEach(function (token) {
          var matched = title.indexOf(token) !== -1 ||
            metadata.indexOf(token) !== -1 ||
            summary.indexOf(token) !== -1 || body.indexOf(token) !== -1;
          if (matched) matchedTokens += 1;
          if (title.indexOf(token) !== -1) score += 30;
          if (metadata.indexOf(token) !== -1) score += 12;
          if (summary.indexOf(token) !== -1) score += 8;
          if (body.indexOf(token) !== -1) score += 2;
        });
        if (matchedTokens === tokens.length && tokens.length > 1) score += 60;
        score += Math.round(20 * matchedTokens / Math.max(1, tokens.length));

        return { record: record, score: score };
      })
      .filter(function (match) {
        return !tokens.length || match.score > 0;
      })
      .sort(function (left, right) {
        return (
          right.score - left.score ||
          left.record.title.localeCompare(right.record.title)
        );
      })
      .map(function (match) {
        return match.record;
      });
  }

  function initialize(records, documentObject, locationObject, historyObject) {
    var queryInput = documentObject.getElementById("proof-search-query");
    var kindSelect = documentObject.getElementById("proof-search-kind");
    var domainSelect = documentObject.getElementById("proof-search-domain");
    var status = documentObject.getElementById("proof-search-status");
    var results = documentObject.getElementById("proof-search-results");
    if (!queryInput || !kindSelect || !domainSelect || !status || !results) return;

    Array.from(new Set(records.map(function (record) { return record.kind; })))
      .sort()
      .forEach(function (kind) {
        var option = documentObject.createElement("option");
        option.value = kind;
        option.textContent = kind.charAt(0).toUpperCase() + kind.slice(1);
        kindSelect.appendChild(option);
      });

    Array.from(new Set(records.map(function (record) { return record.domain; })))
      .filter(Boolean)
      .sort()
      .forEach(function (domain) {
        var option = documentObject.createElement("option");
        option.value = domain;
        option.textContent = domain.charAt(0).toUpperCase() + domain.slice(1);
        domainSelect.appendChild(option);
      });

    var parameters = new URLSearchParams(locationObject.search);
    queryInput.value = parameters.get("q") || "";
    kindSelect.value = parameters.get("kind") || "";
    domainSelect.value = parameters.get("domain") || "";

    function render() {
      var query = queryInput.value.trim();
      var kind = kindSelect.value;
      var domain = domainSelect.value;
      var matches = searchRecords(records, query, kind, domain);
      var awaitingQuery = !query && !kind && !domain;
      var shown = awaitingQuery ? [] : matches.slice(0, 20);
      var nextParameters = new URLSearchParams(locationObject.search);
      nextParameters.delete("q");
      nextParameters.delete("kind");
      nextParameters.delete("domain");
      if (query) nextParameters.set("q", query);
      if (kind) nextParameters.set("kind", kind);
      if (domain) nextParameters.set("domain", domain);
      var nextUrl = locationObject.pathname +
        (nextParameters.toString() ? "?" + nextParameters.toString() : "") +
        locationObject.hash;
      historyObject.replaceState(null, "", nextUrl);

      status.textContent = awaitingQuery
        ? records.length + " records available. Enter terms or choose a filter."
        : matches.length + " result" +
          (matches.length === 1 ? "" : "s") +
          (matches.length > shown.length ? "; showing first " + shown.length : "");
      results.replaceChildren();

      shown.forEach(function (record) {
        var item = documentObject.createElement("li");
        item.className = "proof-search__result";
        var link = documentObject.createElement("a");
        link.href = record.href || "#" + record.anchor;
        link.textContent = record.title;
        var meta = documentObject.createElement("span");
        meta.className = "proof-search__meta";
        meta.textContent = [record.kind, record.domain]
          .filter(Boolean)
          .join(" · ");
        var summary = documentObject.createElement("p");
        summary.className = "proof-search__summary";
        summary.textContent = record.summary;
        item.append(link, meta, summary);
        results.appendChild(item);
      });
    }

    queryInput.addEventListener("input", render);
    kindSelect.addEventListener("change", render);
    domainSelect.addEventListener("change", render);
    render();
  }

  var api = { normalize: normalize, searchRecords: searchRecords };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (root && root.document && root.FACTORIUM_SEARCH_INDEX) {
    initialize(root.FACTORIUM_SEARCH_INDEX, root.document, root.location, root.history);
  }
})(typeof window !== "undefined" ? window : null);

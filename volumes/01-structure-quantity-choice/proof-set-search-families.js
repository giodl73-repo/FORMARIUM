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

        if (!tokens.length) return { record: record, score: 0 };
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
      .filter(function (match) { return !tokens.length || match.score > 0; })
      .sort(function (left, right) {
        return right.score - left.score ||
          left.record.title.localeCompare(right.record.title);
      })
      .map(function (match) { return match.record; });
  }

  function groupRecords(records) {
    var groups = [];
    var byKey = new Map();
    records.forEach(function (record) {
      var key = record.familyKey || record.path;
      var group = byKey.get(key);
      if (!group) {
        group = {
          key: key,
          kind: record.familyKind || "standalone",
          title: record.familyTitle || record.title,
          href: record.familyHref || record.href || "#" + record.anchor,
          records: []
        };
        byKey.set(key, group);
        groups.push(group);
      }
      group.records.push(record);
    });
    return groups;
  }

  function pickSurprise(records, randomValue) {
    var candidates = records.filter(function (record) {
      return record.recordClass === "canonical-entry";
    });
    if (!candidates.length) return null;
    var random = typeof randomValue === "function" ? randomValue() : Math.random();
    var index = Math.min(candidates.length - 1, Math.floor(random * candidates.length));
    return candidates[index];
  }

  function initializeSurprise(records, documentObject) {
    documentObject.querySelectorAll("[data-surprise-entry]").forEach(function (link) {
      var record = pickSurprise(records);
      if (record && record.href) link.href = record.href;
    });
  }

  function appendRecord(record, parent, documentObject) {
    var item = documentObject.createElement("li");
    item.className = "proof-search__result";
    item.dataset.resultPath = record.path;
    var link = documentObject.createElement("a");
    link.href = record.href || "#" + record.anchor;
    link.textContent = record.title;
    var meta = documentObject.createElement("span");
    meta.className = "proof-search__meta";
    meta.textContent = [record.kind, record.domain].filter(Boolean).join(" · ");
    var summary = documentObject.createElement("p");
    summary.className = "proof-search__summary";
    summary.textContent = record.summary;
    item.append(link, meta, summary);
    parent.appendChild(item);
  }

  function initialize(records, documentObject, locationObject, historyObject) {
    var queryInput = documentObject.getElementById("proof-search-query");
    var kindSelect = documentObject.getElementById("proof-search-kind");
    var domainSelect = documentObject.getElementById("proof-search-domain");
    var viewSelect = documentObject.getElementById("proof-search-view");
    var status = documentObject.getElementById("proof-search-status");
    var results = documentObject.getElementById("proof-search-results");
    if (!queryInput || !kindSelect || !domainSelect || !viewSelect ||
        !status || !results) return;

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
    viewSelect.value = parameters.get("view") === "records" ? "records" : "families";

    function render() {
      var query = queryInput.value.trim();
      var kind = kindSelect.value;
      var domain = domainSelect.value;
      var view = viewSelect.value === "records" ? "records" : "families";
      var matches = searchRecords(records, query, kind, domain);
      var awaitingQuery = !query && !kind && !domain;
      var rankedWindow = awaitingQuery ? [] : matches.slice(0, 20);
      var nextParameters = new URLSearchParams(locationObject.search);
      ["q", "kind", "domain", "view"].forEach(function (key) {
        nextParameters.delete(key);
      });
      if (query) nextParameters.set("q", query);
      if (kind) nextParameters.set("kind", kind);
      if (domain) nextParameters.set("domain", domain);
      if (view === "records") nextParameters.set("view", "records");
      var nextUrl = locationObject.pathname +
        (nextParameters.toString() ? "?" + nextParameters.toString() : "") +
        locationObject.hash;
      historyObject.replaceState(null, "", nextUrl);
      results.replaceChildren();
      results.dataset.resultView = view;

      if (awaitingQuery) {
        status.textContent = records.length +
          " records available. Enter terms or choose a filter.";
        return;
      }

      if (view === "records") {
        status.textContent = matches.length + " matched record" +
          (matches.length === 1 ? "" : "s") +
          (matches.length > rankedWindow.length ?
            "; showing first " + rankedWindow.length : "");
        rankedWindow.forEach(function (record) {
          appendRecord(record, results, documentObject);
        });
        return;
      }

      var groups = groupRecords(rankedWindow);
      status.textContent = matches.length + " matched record" +
        (matches.length === 1 ? "" : "s") + " in " + groups.length +
        " ownership group" + (groups.length === 1 ? "" : "s") +
        (matches.length > rankedWindow.length ?
          "; grouping first " + rankedWindow.length + " records" : "");
      groups.forEach(function (group) {
        var family = documentObject.createElement("li");
        family.className = "proof-search__family";
        family.dataset.familyKey = group.key;
        family.dataset.familyKind = group.kind;
        var heading = documentObject.createElement("div");
        heading.className = "proof-search__family-heading";
        var identity = documentObject.createElement("span");
        identity.textContent = group.kind === "canonical" ?
          "Owning Table" : group.kind === "guide" ? "Factor Guide" :
            group.kind === "reader" ? "Reader companion" :
              "Curated Table record";
        var link = documentObject.createElement("a");
        link.href = group.href;
        link.textContent = group.title;
        var count = documentObject.createElement("small");
        count.textContent = group.records.length + " matching record" +
          (group.records.length === 1 ? "" : "s");
        heading.append(identity, link, count);
        var members = documentObject.createElement("ol");
        members.className = "proof-search__family-members";
        group.records.forEach(function (record) {
          appendRecord(record, members, documentObject);
        });
        family.append(heading, members);
        results.appendChild(family);
      });
    }

    queryInput.addEventListener("input", render);
    kindSelect.addEventListener("change", render);
    domainSelect.addEventListener("change", render);
    viewSelect.addEventListener("change", render);
    render();
  }

  var api = {
    normalize: normalize,
    searchRecords: searchRecords,
    groupRecords: groupRecords,
    pickSurprise: pickSurprise
  };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (root) root.FactoriumSearchFamilies = api;
  if (root && root.document && root.FACTORIUM_SEARCH_INDEX) {
    initializeSurprise(root.FACTORIUM_SEARCH_INDEX, root.document);
    initialize(root.FACTORIUM_SEARCH_INDEX, root.document, root.location, root.history);
  }
})(typeof window !== "undefined" ? window : null);

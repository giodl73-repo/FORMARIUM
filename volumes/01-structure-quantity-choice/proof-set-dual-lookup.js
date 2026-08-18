(function (root) {
  "use strict";

  var api = root.FactoriumSearchFamilies;
  var records = root.FACTORIUM_SEARCH_INDEX;
  var form = root.document && root.document.getElementById("dual-lookup-form");
  if (!api || !Array.isArray(records) || !form) return;

  var inputs = [
    root.document.getElementById("dual-lookup-query-one"),
    root.document.getElementById("dual-lookup-query-two")
  ];
  var lists = [
    root.document.getElementById("dual-lookup-results-one"),
    root.document.getElementById("dual-lookup-results-two")
  ];
  var comparison = root.document.getElementById("dual-lookup-comparison");
  var status = root.document.getElementById("dual-lookup-status");
  var clear = root.document.getElementById("dual-lookup-clear");

  function firstFamilies(query) {
    return api.groupRecords(api.searchRecords(records, query, "", "")).slice(0, 10);
  }

  function appendFamily(group, rank, list) {
    var item = root.document.createElement("li");
    item.dataset.familyKey = group.key;
    var position = root.document.createElement("span");
    position.className = "dual-lookup__rank";
    position.textContent = String(rank);
    var link = root.document.createElement("a");
    link.href = group.href;
    link.textContent = group.title;
    item.append(position, link);
    list.appendChild(item);
  }

  function renderComparison(groups) {
    var byKey = new Map();
    groups.forEach(function (list, queryIndex) {
      list.forEach(function (group) {
        var record = byKey.get(group.key) || {
          key: group.key, title: group.title, href: group.href, queries: []
        };
        if (record.queries.indexOf(queryIndex + 1) === -1) record.queries.push(queryIndex + 1);
        byKey.set(group.key, record);
      });
    });
    Array.from(byKey.values()).sort(function (left, right) {
      return left.title.localeCompare(right.title);
    }).forEach(function (record) {
      var item = root.document.createElement("li");
      item.dataset.familyKey = record.key;
      var link = root.document.createElement("a");
      link.href = record.href;
      link.textContent = record.title;
      var presence = root.document.createElement("span");
      presence.textContent = record.queries.length === 2 ? "Both literal searches" :
        "Literal search " + record.queries[0];
      item.append(link, presence);
      comparison.appendChild(item);
    });
    return byKey.size;
  }

  function render(event) {
    if (event) event.preventDefault();
    var queries = inputs.map(function (input) { return input.value.trim(); });
    lists.forEach(function (list) { list.replaceChildren(); });
    comparison.replaceChildren();
    if (queries.some(function (query) { return !query; })) {
      status.textContent = "Enter two literal searches to compare their independent Table-family results.";
      return;
    }
    var groups = queries.map(firstFamilies);
    groups.forEach(function (familyGroups, queryIndex) {
      familyGroups.forEach(function (group, rank) {
        appendFamily(group, rank + 1, lists[queryIndex]);
      });
    });
    var unionCount = renderComparison(groups);
    status.textContent = "Literal search 1 shows " + groups[0].length +
      " families; literal search 2 shows " + groups[1].length +
      "; the identity comparison contains " + unionCount +
      ". No rank, relation, or closure is merged.";
  }

  form.addEventListener("submit", render);
  clear.addEventListener("click", function () {
    form.reset();
    lists.forEach(function (list) { list.replaceChildren(); });
    comparison.replaceChildren();
    status.textContent = "Cleared. No query or comparison is saved.";
    inputs[0].focus();
  });
})(typeof window !== "undefined" ? window : null);

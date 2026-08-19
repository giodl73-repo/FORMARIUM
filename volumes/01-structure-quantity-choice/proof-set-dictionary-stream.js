(function () {
  "use strict";

  document.querySelectorAll("[data-dictionary-view]").forEach(function (select) {
    select.addEventListener("change", function () {
      if (select.value) window.location.assign(select.value);
    });
    document.querySelectorAll("[data-dictionary-print]").forEach(function (button) {
      button.addEventListener("click", function () {
        window.print();
      });
    });
  });

  var root = document.querySelector("[data-dictionary-stream]");
  var data = document.getElementById("dictionary-stream-data");
  if (!root || !data) return;

  var records = JSON.parse(data.textContent);
  var items = root.querySelector("[data-dictionary-stream-items]");
  var loadButton = root.querySelector("[data-dictionary-stream-load]");
  var status = root.querySelector("[data-dictionary-stream-status]");
  var batchSize = Number(root.dataset.batchSize) || 4;
  var cursor = 0;
  var loading = false;

  function rewriteLocalUrls(container, sourceUrl) {
    container.querySelectorAll("[href], [src]").forEach(function (element) {
      var attribute = element.hasAttribute("href") ? "href" : "src";
      var value = element.getAttribute(attribute);
      if (!value || value.startsWith("#") || value.startsWith("mailto:")) return;
      element.setAttribute(attribute, new URL(value, sourceUrl).href);
    });
  }

  async function fetchRecord(record, index) {
    var response = await fetch(record.href);
    if (!response.ok) {
      throw new Error("Could not load " + record.title + " (" + response.status + ")");
    }
    var source = new DOMParser().parseFromString(await response.text(), "text/html");
    var content = source.querySelector(
      record.kind === "pointer" ? "main.pointer-page" : "main.site-entry",
    );
    if (!content) throw new Error("Missing entry content for " + record.title);

    content.removeAttribute("id");
    content.querySelectorAll(".site-breadcrumbs, .dictionary-sequence").forEach(
      function (element) {
        element.remove();
      },
    );
    rewriteLocalUrls(content, response.url);
    var projection = document.createElement("div");
    projection.className = content.className + " dictionary-stream__content";
    Array.from(content.attributes).forEach(function (attribute) {
      if (attribute.name !== "id" && attribute.name !== "class") {
        projection.setAttribute(attribute.name, attribute.value);
      }
    });
    while (content.firstChild) projection.append(content.firstChild);

    var article = document.createElement("article");
    article.className = "dictionary-stream__item";
    article.dataset.dictionaryKind = record.kind;
    article.dataset.dictionaryPosition = String(index + 1);

    var heading = document.createElement("header");
    heading.className = "dictionary-stream__item-heading";
    var label = document.createElement("p");
    label.textContent =
      "Item " + (index + 1) + " of " + records.length + " · " +
      (record.kind === "pointer" ? "Pointer" : "Canonical Table");
    var permalink = document.createElement("a");
    permalink.href = record.href;
    permalink.textContent = "Open standalone page";
    heading.append(label, permalink);
    article.append(heading, projection);
    return article;
  }

  async function loadNextBatch() {
    if (loading || cursor >= records.length) return;
    loading = true;
    loadButton.disabled = true;
    status.textContent = "Loading the next dictionary entries…";

    var start = cursor;
    var end = Math.min(start + batchSize, records.length);
    try {
      var batch = await Promise.all(
        records.slice(start, end).map(function (record, offset) {
          return fetchRecord(record, start + offset);
        }),
      );
      batch.forEach(function (article) {
        items.append(article);
      });
      cursor = end;
      status.textContent =
        "Showing " + cursor + " of " + records.length + " dictionary entries.";
      if (cursor === records.length) {
        loadButton.hidden = true;
        if (observer) observer.disconnect();
      }
    } catch (error) {
      status.textContent = error.message + ". Use “Try again” to continue.";
      loadButton.textContent = "Try again";
    } finally {
      loading = false;
      loadButton.disabled = false;
    }
  }

  var observer =
    "IntersectionObserver" in window
      ? new IntersectionObserver(
          function (entries) {
            if (entries.some(function (entry) { return entry.isIntersecting; })) {
              loadNextBatch();
            }
          },
          { rootMargin: "800px 0px" },
        )
      : null;

  loadButton.addEventListener("click", loadNextBatch);
  if (observer) observer.observe(loadButton);
  loadNextBatch();
})();

(function () {
  "use strict";

  document.querySelectorAll("[data-dictionary-view]").forEach(function (select) {
    select.addEventListener("change", function () {
      if (select.value) window.location.assign(select.value);
    });
  });

  document.querySelectorAll("[data-dictionary-print]").forEach(function (button) {
    button.addEventListener("click", function () {
      window.print();
    });
  });

  var bookPages = document.querySelector("[data-book-pages]");
  if (bookPages) {
    var previousPage = document.querySelector("[data-book-page-previous]");
    var nextPage = document.querySelector("[data-book-page-next]");
    var pageStatus = document.querySelector("[data-book-page-status]");
    var runningHead = document.querySelector("[data-book-running-head]");
    var pageUpdateFrame = 0;
    var continuationTitles = [];
    var continuationWidth = -1;
    var continuationScrollWidth = -1;

    function bookPageState() {
      var width = bookPages.clientWidth;
      var total = width ? Math.max(1, Math.ceil(bookPages.scrollWidth / width)) : 1;
      var current = width
        ? Math.min(total, Math.round(bookPages.scrollLeft / width) + 1)
        : 1;
      return { current: current, total: total, width: width };
    }

    function mapContinuationTitles(state) {
      if (
        continuationWidth === state.width &&
        continuationScrollWidth === bookPages.scrollWidth
      ) {
        return;
      }
      continuationTitles = [];
      continuationWidth = state.width;
      continuationScrollWidth = bookPages.scrollWidth;
      if (!state.width) return;

      var pagesRect = bookPages.getBoundingClientRect();
      var entries = bookPages.querySelectorAll(".dictionary-book__item");

      for (var entryIndex = 0; entryIndex < entries.length; entryIndex += 1) {
        var firstPage = Infinity;
        var lastPage = -1;
        entries[entryIndex]
          .querySelectorAll(
            ".dictionary-book__item-heading, .dictionary-book__meta, " +
              ".dictionary-book__content > *",
          )
          .forEach(function (element) {
            Array.prototype.forEach.call(element.getClientRects(), function (rect) {
              if (!rect.width || !rect.height) return;
              var contentLeft = rect.left - pagesRect.left + bookPages.scrollLeft;
              var rectPage = Math.max(
                0,
                Math.floor((contentLeft + 1) / state.width),
              );
              firstPage = Math.min(firstPage, rectPage);
              lastPage = Math.max(lastPage, rectPage);
            });
          });
        for (var pageIndex = firstPage + 1; pageIndex <= lastPage; pageIndex += 1) {
          continuationTitles[pageIndex] =
            entries[entryIndex].dataset.dictionaryTitle || "";
        }
      }
    }

    function carriedBookTitle(state) {
      if (state.current <= 1) return "";
      mapContinuationTitles(state);
      return continuationTitles[state.current - 1] || "";
    }

    function invalidateBookLayout() {
      continuationWidth = -1;
      continuationScrollWidth = -1;
      scheduleBookPageUpdate();
    }

    function updateBookPages() {
      pageUpdateFrame = 0;
      var state = bookPageState();
      var carriedTitle = carriedBookTitle(state);
      previousPage.disabled = state.current <= 1;
      nextPage.disabled = state.current >= state.total;
      pageStatus.textContent = "Page " + state.current + " of " + state.total;
      runningHead.textContent = carriedTitle ? carriedTitle + " — continued" : "";
      runningHead.hidden = !carriedTitle;
    }

    function scheduleBookPageUpdate() {
      if (!pageUpdateFrame) {
        pageUpdateFrame = window.requestAnimationFrame(updateBookPages);
      }
    }

    function moveBookPage(direction) {
      var state = bookPageState();
      bookPages.scrollTo({
        left: Math.max(0, (state.current - 1 + direction) * state.width),
        behavior: "smooth",
      });
    }

    previousPage.addEventListener("click", function () {
      moveBookPage(-1);
    });
    nextPage.addEventListener("click", function () {
      moveBookPage(1);
    });
    bookPages.addEventListener("scroll", scheduleBookPageUpdate, { passive: true });
    bookPages.addEventListener("keydown", function (event) {
      if (event.key !== "PageDown" && event.key !== "PageUp") return;
      event.preventDefault();
      moveBookPage(event.key === "PageDown" ? 1 : -1);
    });
    bookPages.querySelectorAll(".dictionary-book__supplement").forEach(
      function (supplement) {
        supplement.addEventListener("toggle", invalidateBookLayout);
      },
    );
    window.addEventListener("resize", invalidateBookLayout);
    if ("ResizeObserver" in window) {
      new ResizeObserver(invalidateBookLayout).observe(bookPages);
    }
    scheduleBookPageUpdate();
  }

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

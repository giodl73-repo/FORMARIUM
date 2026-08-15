(function (root) {
  "use strict";

  var PRESETS = {
    compact: { detail: "summary", metadata: "minimal", density: "tight" },
    abbreviated: { detail: "core", metadata: "minimal", density: "tight" },
    book: { detail: "core", metadata: "essential", density: "comfortable" },
    full: { detail: "full", metadata: "full", density: "comfortable" }
  };
  var LEVELS = { summary: 0, core: 1, full: 2, minimal: 0, essential: 1 };
  var SUMMARY_HEADINGS = new Set([
    "orientation",
    "governing question",
    "local problem and decision",
    "selected relation",
    "shared interpretation"
  ]);
  var EXTENDED_HEADINGS = new Set([
    "alternative views",
    "change tests",
    "diagnostic examples",
    "dimensional audit",
    "equivalent forms",
    "cross-references",
    "round-trip examples",
    "special forms",
    "unresolved choices"
  ]);

  function normalizeHeading(value) {
    return String(value || "").trim().toLowerCase().replace(/\s+/g, " ");
  }

  function classifySection(title) {
    var heading = normalizeHeading(title);
    if (heading === "reference delta" || heading === "sources" ||
        heading === "sources and provenance") {
      return { detail: "core", metadata: "full" };
    }
    if (heading === "maturity and provenance") {
      return { detail: "core", metadata: "essential" };
    }
    if (SUMMARY_HEADINGS.has(heading)) {
      return { detail: "summary", metadata: "minimal" };
    }
    if (EXTENDED_HEADINGS.has(heading) || heading.indexOf("diagnostic") === 0) {
      return { detail: "full", metadata: "minimal" };
    }
    return { detail: "core", metadata: "minimal" };
  }

  function resolvePreset(name) {
    return Object.assign({}, PRESETS[name] || PRESETS.book);
  }

  function requiredLevel(value) {
    return value === "full" ? 2 : LEVELS[value] || 0;
  }

  function initialize(documentObject, locationObject, historyObject, storageObject) {
    var records = root.FACTORIUM_SEARCH_INDEX || [];
    var sources = root.FACTORIUM_SOURCE_INDEX || [];
    var recordByAnchor = new Map(records.map(function (record) {
      return [record.anchor, record];
    }));
    var sourceByAnchor = new Map(sources.map(function (source) {
      return [source.anchor, source];
    }));
    var headings = Array.from(documentObject.querySelectorAll("body > h1"));

    headings.forEach(function (heading, index) {
      var nextHeading = headings[index + 1] || null;
      var source = sourceByAnchor.get(heading.id) || { path: "", anchor: heading.id };
      var record = recordByAnchor.get(heading.id);
      var article = documentObject.createElement("article");
      article.className = record ? "proof-entry" : "proof-source";
      article.dataset.sourcePath = source.path;
      article.dataset.sourceKind = record ? "record" : "support";
      heading.parentNode.insertBefore(article, heading);

      var node = heading;
      while (node && node !== nextHeading) {
        var following = node.nextSibling;
        article.appendChild(node);
        node = following;
      }

      if (!record) return;
      article.dataset.defaultDetail = "inherit";
      var deck = documentObject.createElement("div");
      deck.className = "proof-entry__deck";
      var badges = documentObject.createElement("div");
      badges.className = "proof-entry__badges";
      [record.kind, record.domain, record.maturity].filter(Boolean).forEach(function (value) {
        var badge = documentObject.createElement("span");
        badge.className = "proof-entry__badge";
        badge.textContent = value;
        badges.appendChild(badge);
      });
      var localView = documentObject.createElement("button");
      localView.type = "button";
      localView.className = "proof-entry__local-view";
      localView.textContent = "Show full entry";
      localView.addEventListener("click", function () {
        var expanded = article.dataset.localFull === "true";
        article.dataset.localFull = expanded ? "false" : "true";
        localView.textContent = expanded ? "Show full entry" : "Use global view";
        applyVisibility(article);
      });
      deck.append(badges, localView);
      heading.after(deck);

      var directNodes = Array.from(article.childNodes).filter(function (child) {
        return child !== heading && child !== deck;
      });
      var intro = documentObject.createElement("section");
      intro.className = "proof-entry__intro";
      intro.dataset.detailLevel = "summary";
      article.insertBefore(intro, directNodes[0] || null);
      var currentSection = intro;

      directNodes.forEach(function (child) {
        if (child.nodeType === 1 && child.tagName === "H2") {
          currentSection = documentObject.createElement("section");
          currentSection.className = "proof-entry__section";
          var classification = classifySection(child.textContent);
          currentSection.dataset.detailLevel = classification.detail;
          currentSection.dataset.metadataLevel = classification.metadata;
          article.insertBefore(currentSection, child);
        }
        currentSection.appendChild(child);
      });

      Array.from(intro.querySelectorAll(":scope > p")).forEach(function (paragraph) {
        if (/^(status|primary family|canonical headword|sense|owning entry|maturity|resolution status):/i.test(paragraph.textContent.trim())) {
          paragraph.dataset.metadataLevel = "essential";
        }
      });
    });

    var toolbar = documentObject.querySelector(".reader-toolbar");
    var detailSelect = documentObject.getElementById("reader-detail");
    var metadataSelect = documentObject.getElementById("reader-metadata");
    var densitySelect = documentObject.getElementById("reader-density");
    var status = documentObject.getElementById("reader-profile-status");
    var toc = documentObject.getElementById("TOC");
    var tocButton = documentObject.getElementById("reader-toc-toggle");
    var profileButtons = Array.from(documentObject.querySelectorAll("[data-reader-profile]"));
    var parameters = new URLSearchParams(locationObject.search);
    var stored = null;
    try { stored = storageObject.getItem("factorium-reader-profile"); } catch (_) {}
    var profileName = parameters.get("view") || stored || "book";
    var state = resolvePreset(profileName);

    function profileForState() {
      return Object.keys(PRESETS).find(function (name) {
        var preset = PRESETS[name];
        return preset.detail === state.detail && preset.metadata === state.metadata &&
          preset.density === state.density;
      }) || "custom";
    }

    function applyVisibility(scope) {
      var detailLevel = requiredLevel(state.detail);
      var metadataLevel = requiredLevel(state.metadata);
      var articles = scope && scope.matches && scope.matches(".proof-entry")
        ? [scope]
        : Array.from(documentObject.querySelectorAll(".proof-entry"));
      articles.forEach(function (article) {
        var localFull = article.dataset.localFull === "true";
        Array.from(article.querySelectorAll("[data-detail-level], [data-metadata-level]")).forEach(function (element) {
          var detailRequired = requiredLevel(element.dataset.detailLevel || "summary");
          var metadataRequired = requiredLevel(element.dataset.metadataLevel || "minimal");
          element.hidden = !localFull &&
            (detailRequired > detailLevel || metadataRequired > metadataLevel);
        });
      });
      Array.from(documentObject.querySelectorAll('.proof-source')).forEach(function (source) {
        source.hidden = state.metadata !== "full";
      });
    }

    function update(pushUrl) {
      var activeProfile = profileForState();
      documentObject.documentElement.dataset.readerDensity = state.density;
      detailSelect.value = state.detail;
      metadataSelect.value = state.metadata;
      densitySelect.value = state.density;
      profileButtons.forEach(function (button) {
        button.setAttribute("aria-pressed", String(button.dataset.readerProfile === activeProfile));
      });
      status.textContent = (activeProfile === "custom" ? "Custom" :
        activeProfile.charAt(0).toUpperCase() + activeProfile.slice(1)) +
        " · " + state.detail + " detail · " + state.metadata +
        " metadata · " + state.density + " spacing";
      applyVisibility();
      if (pushUrl) {
        var next = new URLSearchParams(locationObject.search);
        next.set("view", activeProfile);
        historyObject.replaceState(null, "", locationObject.pathname + "?" + next.toString() + locationObject.hash);
      }
      if (activeProfile !== "custom") {
        try { storageObject.setItem("factorium-reader-profile", activeProfile); } catch (_) {}
      }
    }

    profileButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        state = resolvePreset(button.dataset.readerProfile);
        update(true);
      });
    });
    [detailSelect, metadataSelect, densitySelect].forEach(function (select) {
      select.addEventListener("change", function () {
        state = {
          detail: detailSelect.value,
          metadata: metadataSelect.value,
          density: densitySelect.value
        };
        update(true);
      });
    });
    toc.classList.add("reader-toc--collapsed");
    tocButton.addEventListener("click", function () {
      var collapsed = toc.classList.toggle("reader-toc--collapsed");
      tocButton.setAttribute("aria-expanded", String(!collapsed));
      tocButton.textContent = collapsed ? "Show contents" : "Hide contents";
    });

    function revealHashTarget() {
      if (!locationObject.hash) return;
      var target = documentObject.getElementById(decodeURIComponent(locationObject.hash.slice(1)));
      if (!target) return;
      var hiddenParent = target.closest("[hidden]");
      if (hiddenParent) {
        hiddenParent.hidden = false;
        hiddenParent.classList.add("reader-revealed-by-link");
      }
      root.setTimeout(function () {
        target.scrollIntoView({ block: "start" });
      }, 0);
    }
    root.addEventListener("hashchange", revealHashTarget);
    root.addEventListener("load", revealHashTarget);
    documentObject.body.classList.add("reader-ready");
    update(false);
    revealHashTarget();
    if (toolbar) toolbar.hidden = false;
  }

  var api = {
    PRESETS: PRESETS,
    classifySection: classifySection,
    resolvePreset: resolvePreset
  };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (root && root.document && root.FACTORIUM_SEARCH_INDEX && root.FACTORIUM_SOURCE_INDEX) {
    initialize(root.document, root.location, root.history, root.localStorage);
  }
})(typeof window !== "undefined" ? window : null);

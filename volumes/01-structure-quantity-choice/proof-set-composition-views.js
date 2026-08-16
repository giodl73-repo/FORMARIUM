(function (root) {
  "use strict";

  var PROFILE_KEY = "factorium-reader-profile";
  var PROFILES = {
    compact: { detail: "summary", metadata: "minimal", density: "tight" },
    abbreviated: { detail: "core", metadata: "minimal", density: "tight" },
    book: { detail: "core", metadata: "essential", density: "comfortable" },
    full: { detail: "full", metadata: "full", density: "comfortable" }
  };

  function assert(condition, message) {
    if (!condition) throw new Error(message);
  }

  function validProfile(value) {
    return Object.prototype.hasOwnProperty.call(PROFILES, value);
  }

  function resolveProfile(search, stored) {
    var parameters = new URLSearchParams(String(search || ""));
    if (parameters.has("view")) {
      var requested = parameters.get("view");
      return validProfile(requested) ? requested : "book";
    }
    return validProfile(stored) ? stored : "book";
  }

  function profileState(name) {
    return Object.assign({}, PROFILES[validProfile(name) ? name : "book"]);
  }

  function shortCode(relationId) {
    var match = String(relationId || "").match(/^f\d+/i);
    return match ? match[0].toUpperCase() : String(relationId || "");
  }

  function humanVerb(value) {
    var text = String(value || "").replace(/-/g, " ");
    return text ? text.charAt(0).toUpperCase() + text.slice(1) : text;
  }

  function classify(element, kind, level) {
    if (!element) return;
    element.classList.add("composition-" + kind + "--" + level);
  }

  function validatePayloads(labPayload, readingPayload) {
    assert(labPayload && labPayload.schema === "factorium-composition-lab-payload-v0",
      "Unknown composition lab payload");
    assert(readingPayload && readingPayload.schema === "factorium-composition-reading-payload-v0",
      "Unknown composition reading payload");
    assert(labPayload.referenceSha256 === readingPayload.referenceSha256,
      "Composition view reference identity mismatch");
    assert(labPayload.relationsSha256 === readingPayload.relationsSha256,
      "Composition view relation identity mismatch");
    assert(Array.isArray(labPayload.relations) && labPayload.relations.length === 6,
      "Composition view requires six relations");
    assert(Array.isArray(readingPayload.bindings) && readingPayload.bindings.length === 18,
      "Composition view requires 18 exact bindings");
  }

  function initialize(documentObject, locationObject, historyObject, storageObject,
    labPayload, readingPayload) {
    var toolbar = documentObject.getElementById("composition-view-toolbar");
    var form = documentObject.getElementById("composition-lab-form");
    var output = documentObject.getElementById("composition-lab-result");
    if (!toolbar || !form || !output) return;
    validatePayloads(labPayload, readingPayload);

    var bindingByArtifact = new Map(readingPayload.bindings.map(function (binding) {
      return [binding.artifact, binding];
    }));
    var relationById = new Map(labPayload.relations.map(function (relation) {
      return [relation.id, relation];
    }));
    var buttons = Array.from(toolbar.querySelectorAll("[data-composition-profile]"));
    var status = documentObject.getElementById("composition-view-status");
    assert(buttons.length === 4 && status, "Composition view toolbar is incomplete");

    function bindingLabel(artifact) {
      var binding = bindingByArtifact.get(artifact);
      return binding ? binding.label : "";
    }

    function classifyForm() {
      Array.from(form.querySelectorAll(".lab-help, .lab-field small")).forEach(function (element) {
        classify(element, "detail", "core");
      });
      Array.from(form.querySelectorAll(".lab-choice")).forEach(function (choice) {
        var input = choice.querySelector("input");
        var copy = choice.querySelector(":scope > span");
        if (!input || !copy) return;
        var strong = copy.querySelector(":scope > strong");
        var code = copy.querySelector(":scope > code");
        var small = copy.querySelector(":scope > small");
        classify(code, "meta", "full");
        if (input.name === "relations") {
          var relation = relationById.get(input.value);
          assert(relation, "Unknown relation control " + input.value);
          strong.textContent = shortCode(relation.id) + " · " + humanVerb(relation.verb);
          if (!copy.querySelector(".composition-relation-route")) {
            var route = documentObject.createElement("small");
            route.className = "composition-relation-route";
            route.textContent = bindingLabel(relation.source) + " → " +
              bindingLabel(relation.target);
            classify(route, "meta", "essential");
            code.after(route);
          }
          classify(small, "meta", "full");
        } else {
          var binding = bindingByArtifact.get(input.value);
          if (binding && strong) strong.textContent = binding.label;
          classify(small, "meta", "essential");
        }
      });
    }

    function addContext(item, text, minimum) {
      if (!text || item.querySelector(".composition-record-context")) return;
      var context = documentObject.createElement("small");
      context.className = "composition-record-context";
      context.textContent = text;
      classify(context, "meta", minimum || "essential");
      item.appendChild(context);
    }

    function enhanceResult() {
      if (!output.querySelector(".lab-result__heading") ||
        output.dataset.compositionViewClassified === "true") return;
      output.dataset.compositionViewClassified = "true";
      Array.from(output.querySelectorAll(".lab-records li")).forEach(function (item) {
        var strong = item.querySelector(":scope > strong");
        var codes = Array.from(item.querySelectorAll(":scope > code"));
        var code = codes[0];
        if (!strong || !code) return;
        var exact = code.textContent;
        if (exact.indexOf(" → ") !== -1) {
          var endpoints = exact.split(" → ");
          var edgeRelation = Array.from(relationById.values()).find(function (relation) {
            return relation.source === endpoints[0] && relation.target === endpoints[1];
          });
          if (edgeRelation) {
            strong.textContent = shortCode(edgeRelation.id) + " · " + humanVerb(edgeRelation.verb);
            addContext(item, bindingLabel(edgeRelation.source) + " → " +
              bindingLabel(edgeRelation.target), "essential");
          }
        } else if (bindingByArtifact.has(exact)) {
          var binding = bindingByArtifact.get(exact);
          if (!/^(Conflict|Inactive request|selected|rejected)$/i.test(strong.textContent)) {
            if (/^check:/i.test(strong.textContent)) {
              var exactCheck = documentObject.createElement("code");
              exactCheck.textContent = strong.textContent;
              classify(exactCheck, "meta", "full");
              item.insertBefore(exactCheck, code);
              var checkKind = item.querySelector(":scope > small")?.textContent.split(" · ")[0] || "check";
              strong.textContent = "Unresolved " + checkKind + " · " + binding.pageTitle;
            } else {
              strong.textContent = binding.label;
              addContext(item, binding.pageTitle, "essential");
            }
          } else {
            addContext(item, binding.label + " · " + binding.pageTitle, "essential");
          }
        }
      });
      Array.from(output.querySelectorAll("code")).forEach(function (code) {
        classify(code, "meta", "full");
      });
      Array.from(output.querySelectorAll(".lab-records small, .lab-identity small")).forEach(function (small) {
        if (!small.classList.contains("composition-meta--essential")) {
          classify(small, "detail", "core");
        }
      });
    }

    var stored = null;
    try { stored = storageObject.getItem(PROFILE_KEY); } catch (_) {}
    var active = resolveProfile(locationObject.search, stored);

    function applyProfile(pushUrl) {
      var state = profileState(active);
      documentObject.documentElement.dataset.compositionDetail = state.detail;
      documentObject.documentElement.dataset.compositionMetadata = state.metadata;
      documentObject.documentElement.dataset.compositionDensity = state.density;
      buttons.forEach(function (button) {
        button.setAttribute("aria-pressed",
          String(button.dataset.compositionProfile === active));
      });
      status.textContent = active.charAt(0).toUpperCase() + active.slice(1) +
        " · " + state.detail + " detail · " + state.metadata +
        " metadata · " + state.density + " spacing";
      if (pushUrl) {
        var parameters = new URLSearchParams(locationObject.search);
        parameters.set("view", active);
        historyObject.replaceState(null, "", locationObject.pathname + "?" +
          parameters.toString() + locationObject.hash);
      }
      try { storageObject.setItem(PROFILE_KEY, active); } catch (_) {}
    }

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        active = button.dataset.compositionProfile;
        applyProfile(true);
      });
    });
    form.addEventListener("submit", function () {
      delete output.dataset.compositionViewClassified;
    });
    var observer = new MutationObserver(enhanceResult);
    observer.observe(output, { childList: true, subtree: true });
    classifyForm();
    applyProfile(false);
    enhanceResult();
    toolbar.hidden = false;
    documentObject.body.classList.add("composition-views-ready");
  }

  var api = {
    PROFILE_KEY: PROFILE_KEY,
    PROFILES: PROFILES,
    resolveProfile: resolveProfile,
    profileState: profileState,
    shortCode: shortCode,
    humanVerb: humanVerb
  };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (root && root.document && root.FACTORIUM_COMPOSITION_LAB &&
    root.FACTORIUM_COMPOSITION_READING) {
    initialize(root.document, root.location, root.history, root.localStorage,
      root.FACTORIUM_COMPOSITION_LAB, root.FACTORIUM_COMPOSITION_READING);
  }
})(typeof window !== "undefined" ? window : null);

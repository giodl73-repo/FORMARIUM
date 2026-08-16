(function (root) {
  "use strict";

  var ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  var SHA_PATTERN = /^[a-f0-9]{64}$/;

  function assert(condition, message) {
    if (!condition) throw new Error(message);
  }

  function validatePayload(payload, labPayload) {
    assert(payload && payload.schema === "factorium-composition-starters-v0",
      "Unknown composition starter payload");
    assert(labPayload && Array.isArray(labPayload.relations),
      "Composition starters require the lab payload");
    assert(payload.referenceSha256 === labPayload.referenceSha256 &&
      payload.relationsSha256 === labPayload.relationsSha256,
    "Composition starter source identity mismatch");
    assert(Array.isArray(payload.starters) && payload.starters.length === 5,
      "Composition starters require five authored records");
    var relationIds = new Set(labPayload.relations.map(function (record) { return record.id; }));
    var artifacts = new Set(labPayload.relations.flatMap(function (record) {
      return [record.source, record.target, record.scope];
    }));
    var ids = new Set();
    payload.starters.forEach(function (starter) {
      assert(ID_PATTERN.test(starter.id || "") && !ids.has(starter.id),
        "Invalid or duplicate starter ID");
      ids.add(starter.id);
      assert(SHA_PATTERN.test(starter.traceSha256 || ""), "Starter omits trace identity");
      assert(typeof starter.problem === "string" && starter.problem.length >= 10,
        "Starter omits problem");
      assert(ID_PATTERN.test(starter.contextId || "") &&
        typeof starter.contextSelections === "string" &&
        starter.contextSelections.includes("reference-frame="), "Starter context is invalid");
      assert(starter.direction === "forward" || starter.direction === "reverse",
        "Starter direction is invalid");
      assert(starter.budget && typeof starter.budget === "object",
        "Starter budget is invalid");
      ["depth", "edges", "nodes"].forEach(function (key) {
        assert(Number.isInteger(starter.budget[key]), "Starter budget is invalid");
      });
      // SIM24-WORK-VALIDATION
      if (Object.prototype.hasOwnProperty.call(starter.budget, "work")) {
        assert(Number.isInteger(starter.budget.work), "Starter work budget is invalid");
      }
      assert(Array.isArray(starter.seeds) && starter.seeds.length >= 1 &&
        starter.seeds.length <= 3, "Starter seed count is invalid");
      assert(Array.isArray(starter.relations) && starter.relations.length >= 1,
        "Starter relation count is invalid");
      assert(Array.isArray(starter.exclusions), "Starter exclusions are invalid");
      [starter.seeds, starter.relations, starter.exclusions].forEach(function (values) {
        assert(new Set(values).size === values.length,
          "Starter controls contain a duplicate identity");
      });
      starter.seeds.forEach(function (value) { assert(artifacts.has(value), "Unknown starter seed"); });
      starter.relations.forEach(function (value) {
        assert(relationIds.has(value), "Unknown starter relation");
      });
      starter.exclusions.forEach(function (value) {
        assert(artifacts.has(value), "Unknown starter exclusion");
      });
    });
    return payload.starters;
  }

  function initialize(documentObject, payload, labPayload) {
    var form = documentObject.getElementById("composition-lab-form");
    var container = documentObject.getElementById("composition-starters");
    var result = documentObject.getElementById("composition-lab-result");
    if (!form || !container || !result) return;
    var starters = validatePayload(payload, labPayload);
    var byId = new Map(starters.map(function (starter) { return [starter.id, starter]; }));
    var status = documentObject.getElementById("composition-starters-status");
    var applying = false;
    var activeId = "";

    function checkValues(name, values) {
      var selected = new Set(values);
      Array.from(form.querySelectorAll('input[name="' + name + '"]')).forEach(function (input) {
        input.checked = selected.has(input.value);
      });
    }

    function openSelectedGroups() {
      Array.from(form.querySelectorAll(".lab-concept-group")).forEach(function (group) {
        group.open = Boolean(group.querySelector('input[name="seeds"]:checked'));
      });
    }

    function showActive(id) {
      Array.from(container.querySelectorAll(".composition-starter")).forEach(function (card) {
        card.dataset.active = String(card.dataset.starterId === id);
      });
    }

    function load(starter, fromFragment) {
      applying = true;
      form.elements.problem.value = starter.problem;
      form.elements.contextId.value = starter.contextId;
      form.elements.contextSelections.value = starter.contextSelections;
      form.elements.direction.value = starter.direction;
      form.elements.depth.value = starter.budget.depth;
      form.elements.edges.value = starter.budget.edges;
      form.elements.nodes.value = starter.budget.nodes;
      // SIM24-WORK-LOAD
      if (form.elements.work && Number.isInteger(starter.budget.work)) {
        form.elements.work.value = starter.budget.work;
      }
      checkValues("seeds", starter.seeds);
      checkValues("relations", starter.relations);
      checkValues("exclusions", starter.exclusions);
      openSelectedGroups();
      form.elements.direction.dispatchEvent(new Event("change", { bubbles: true }));
      result.innerHTML = '<p class="lab-result__empty">Starter loaded. Review the explicit controls, then run bounded closure.</p>';
      activeId = starter.id;
      showActive(activeId);
      status.textContent = "Loaded “" + starter.title + "” from reviewed trace " +
        starter.id + ". The lab has not run; its checks will remain unresolved.";
      if (!fromFragment && root.history && root.location) {
        root.history.replaceState(null, "", "#starter-" + starter.id);
      }
      applying = false;
    }

    container.addEventListener("click", function (event) {
      var button = event.target.closest("[data-load-starter]");
      if (!button) return;
      load(byId.get(button.dataset.loadStarter), false);
      form.elements.problem.focus();
    });

    form.addEventListener("input", function () {
      if (applying || !activeId) return;
      activeId = "";
      showActive("");
      status.textContent = "Starter modified. The visible controls now define a new local request.";
      if (root.history && root.location && root.location.hash.indexOf("#starter-") === 0) {
        root.history.replaceState(null, "", root.location.pathname + root.location.search);
      }
    });

    var fragment = root.location && root.location.hash || "";
    if (fragment.indexOf("#starter-") === 0) {
      var id = fragment.slice("#starter-".length);
      if (byId.has(id)) load(byId.get(id), true);
    }
  }

  var api = { validatePayload: validatePayload };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (root && root.document && root.FACTORIUM_COMPOSITION_STARTERS &&
    root.FACTORIUM_COMPOSITION_LAB) {
    initialize(root.document, root.FACTORIUM_COMPOSITION_STARTERS,
      root.FACTORIUM_COMPOSITION_LAB);
  }
}(typeof window !== "undefined" ? window : globalThis));

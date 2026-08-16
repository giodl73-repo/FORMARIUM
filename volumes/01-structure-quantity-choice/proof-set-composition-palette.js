(function (root) {
  "use strict";

  function assert(condition, message) {
    if (!condition) throw new Error(message);
  }

  function sortedUnique(values, label) {
    var seen = new Set();
    values.forEach(function (value) {
      assert(typeof value === "string" && value.length > 0, label + " has invalid value");
      assert(!seen.has(value), label + " repeats " + value);
      seen.add(value);
    });
    return Array.from(seen).sort();
  }

  function anchorGroups(readingPayload) {
    assert(readingPayload && Array.isArray(readingPayload.bindings),
      "Concept palette requires reading bindings");
    var anchors = readingPayload.bindings.filter(function (binding) {
      return binding.kind === "anchor";
    });
    assert(anchors.length === 12, "Concept palette requires 12 anchor factors");
    var artifacts = new Set();
    var groups = new Map();
    anchors.forEach(function (binding) {
      assert(!artifacts.has(binding.artifact), "Duplicate palette artifact " + binding.artifact);
      artifacts.add(binding.artifact);
      assert(typeof binding.pageTitle === "string" && binding.pageTitle.length > 0,
        "Palette binding omits page title");
      assert(typeof binding.label === "string" && binding.label.length > 0,
        "Palette binding omits factor label");
      var group = groups.get(binding.href);
      if (!group) {
        group = { href: binding.href, title: binding.pageTitle, factors: [] };
        groups.set(binding.href, group);
      } else {
        assert(group.title === binding.pageTitle, "Palette page has conflicting title");
      }
      group.factors.push({ artifact: binding.artifact, label: binding.label });
    });
    var records = Array.from(groups.values()).map(function (group) {
      group.factors.sort(function (left, right) {
        return left.label.localeCompare(right.label) || left.artifact.localeCompare(right.artifact);
      });
      assert(group.factors.length === 2, "Each prototype topic requires two endpoint factors");
      return group;
    }).sort(function (left, right) {
      return left.title.localeCompare(right.title) || left.href.localeCompare(right.href);
    });
    assert(records.length === 6, "Concept palette requires six owning entry groups");
    return records;
  }

  function deriveReadiness(request, labPayload) {
    assert(labPayload && Array.isArray(labPayload.relations) && labPayload.relations.length === 6,
      "Readiness requires six reviewed relations");
    assert(request && (request.direction === "forward" || request.direction === "reverse"),
      "Readiness direction must be forward or reverse");
    var relationIds = new Set();
    var relations = labPayload.relations.slice().sort(function (left, right) {
      return left.id.localeCompare(right.id);
    });
    relations.forEach(function (relation) {
      assert(!relationIds.has(relation.id), "Duplicate readiness relation " + relation.id);
      relationIds.add(relation.id);
    });
    var endpoints = new Set(relations.flatMap(function (relation) {
      return [relation.source, relation.target];
    }));
    var seeds = sortedUnique(request.seeds || [], "Readiness seeds");
    seeds.forEach(function (seed) {
      assert(endpoints.has(seed), "Unknown readiness seed " + seed);
    });
    var selectedRelations = sortedUnique(request.relations || [], "Readiness relations");
    selectedRelations.forEach(function (relationId) {
      assert(relationIds.has(relationId), "Unknown readiness relation " + relationId);
    });
    var selected = new Set(selectedRelations);
    var seedSet = new Set(seeds);
    var reachable = new Set(seeds);
    var changed = true;
    while (changed) {
      changed = false;
      relations.forEach(function (relation) {
        if (!selected.has(relation.id)) return;
        var predecessor = request.direction === "forward" ? relation.source : relation.target;
        var derived = request.direction === "forward" ? relation.target : relation.source;
        if (reachable.has(predecessor) && !reachable.has(derived)) {
          reachable.add(derived);
          changed = true;
        }
      });
    }
    return relations.map(function (relation) {
      var predecessor = request.direction === "forward" ? relation.source : relation.target;
      var status = seedSet.has(predecessor) ? "seed-ready" :
        (reachable.has(predecessor) ? "route-ready" : "needs-predecessor");
      return {
        relation: relation.id,
        predecessor: predecessor,
        status: status,
        selected: selected.has(relation.id)
      };
    });
  }

  function element(documentObject, name, className, text) {
    var node = documentObject.createElement(name);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function initialize(documentObject, labPayload, readingPayload) {
    var form = documentObject.getElementById("composition-lab-form");
    var seedContainer = documentObject.getElementById("composition-lab-seeds");
    var relationContainer = documentObject.getElementById("composition-lab-relations");
    if (!form || !seedContainer || !relationContainer) return;
    var groups = anchorGroups(readingPayload);
    var bindingByArtifact = new Map(readingPayload.bindings.map(function (binding) {
      return [binding.artifact, binding];
    }));
    var seedChoiceByArtifact = new Map(Array.from(
      seedContainer.querySelectorAll('input[name="seeds"]')
    ).map(function (input) {
      return [input.value, input.closest("label")];
    }));
    assert(seedChoiceByArtifact.size === 12, "Palette seed controls do not match bindings");
    groups.sort(function (left, right) {
      var leftSelected = left.factors.some(function (factor) {
        return seedChoiceByArtifact.get(factor.artifact).querySelector("input").checked;
      });
      var rightSelected = right.factors.some(function (factor) {
        return seedChoiceByArtifact.get(factor.artifact).querySelector("input").checked;
      });
      return Number(rightSelected) - Number(leftSelected) ||
        left.title.localeCompare(right.title) || left.href.localeCompare(right.href);
    });
    groups.forEach(function (group) {
      group.factors.forEach(function (factor) {
        assert(seedChoiceByArtifact.has(factor.artifact),
          "Palette omits seed control " + factor.artifact);
      });
    });

    var paletteHeader = element(documentObject, "div", "lab-palette-header");
    var paletteSummary = element(documentObject, "p", "",
      "Six anchor entries · twelve exact factor choices");
    var toggle = element(documentObject, "button", "lab-palette-toggle", "Open all topics");
    toggle.type = "button";
    toggle.setAttribute("aria-expanded", "false");
    paletteHeader.append(paletteSummary, toggle);
    var groupContainer = element(documentObject, "div", "lab-concept-groups");
    groups.forEach(function (group) {
      var details = element(documentObject, "details", "lab-concept-group");
      details.dataset.pageHref = group.href;
      var summary = element(documentObject, "summary", "");
      var summaryCopy = element(documentObject, "span", "");
      summaryCopy.append(
        element(documentObject, "strong", "", group.title),
        element(documentObject, "small", "", group.factors.length + " concepts")
      );
      summary.appendChild(summaryCopy);
      var choices = element(documentObject, "div", "lab-concept-group__choices");
      group.factors.forEach(function (factor) {
        var choice = seedChoiceByArtifact.get(factor.artifact);
        var binding = bindingByArtifact.get(factor.artifact);
        choice.querySelector("strong").textContent = binding.label;
        choice.querySelector("small").textContent = "Factor in " + binding.pageTitle;
        choices.appendChild(choice);
        if (choice.querySelector("input").checked) details.open = true;
      });
      details.append(summary, choices);
      groupContainer.appendChild(details);
    });
    seedContainer.replaceChildren(paletteHeader, groupContainer);
    seedContainer.classList.add("lab-choice-grid--palette");

    function selectedValues(name) {
      return Array.from(form.querySelectorAll('input[name="' + name + '"]:checked'))
        .map(function (input) { return input.value; });
    }

    function collapseToSelections() {
      Array.from(groupContainer.querySelectorAll("details")).forEach(function (details) {
        details.open = Boolean(details.querySelector('input[name="seeds"]:checked'));
      });
      toggle.textContent = "Open all topics";
      toggle.setAttribute("aria-expanded", "false");
    }

    toggle.addEventListener("click", function () {
      var details = Array.from(groupContainer.querySelectorAll("details"));
      var allOpen = details.every(function (record) { return record.open; });
      if (allOpen) {
        collapseToSelections();
      } else {
        details.forEach(function (record) { record.open = true; });
        toggle.textContent = "Collapse topics";
        toggle.setAttribute("aria-expanded", "true");
      }
    });

    var readinessSummary = element(documentObject, "p", "lab-readiness-summary");
    readinessSummary.id = "composition-relation-readiness";
    readinessSummary.setAttribute("aria-live", "polite");
    relationContainer.parentNode.insertBefore(readinessSummary, relationContainer);
    var relationChoiceById = new Map(Array.from(
      relationContainer.querySelectorAll('input[name="relations"]')
    ).map(function (input) {
      var choice = input.closest("label");
      var badge = element(documentObject, "span", "lab-relation-readiness");
      choice.querySelector("span").appendChild(badge);
      return [input.value, { choice: choice, badge: badge }];
    }));
    assert(relationChoiceById.size === 6, "Palette relation controls do not match payload");

    function updateReadiness() {
      var records = deriveReadiness({
        seeds: selectedValues("seeds"),
        relations: selectedValues("relations"),
        direction: form.elements.direction.value
      }, labPayload);
      var readyCount = 0;
      records.forEach(function (record) {
        var relationChoice = relationChoiceById.get(record.relation);
        assert(relationChoice, "Missing relation choice " + record.relation);
        var text;
        if (record.status === "seed-ready") {
          text = "Ready from selected seed";
          readyCount += 1;
        } else if (record.status === "route-ready") {
          text = "Reachable through selected relations";
          readyCount += 1;
        } else {
          var binding = bindingByArtifact.get(record.predecessor);
          assert(binding, "Missing predecessor label " + record.predecessor);
          text = "Needs " + binding.label;
        }
        relationChoice.choice.dataset.readiness = record.status;
        relationChoice.badge.textContent = text;
      });
      readinessSummary.textContent = readyCount + " of 6 relations structurally reachable. " +
        "All six remain selectable; readiness does not evaluate budgets or domain validity.";
    }

    form.addEventListener("change", function (event) {
      if (["seeds", "relations", "direction"].includes(event.target.name)) updateReadiness();
    });
    updateReadiness();
    form.classList.add("composition-lab--palette");
  }

  var api = { anchorGroups: anchorGroups, deriveReadiness: deriveReadiness };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (root && root.document && root.FACTORIUM_COMPOSITION_LAB && root.FACTORIUM_COMPOSITION_READING) {
    initialize(root.document, root.FACTORIUM_COMPOSITION_LAB, root.FACTORIUM_COMPOSITION_READING);
  }
})(typeof window !== "undefined" ? window : null);

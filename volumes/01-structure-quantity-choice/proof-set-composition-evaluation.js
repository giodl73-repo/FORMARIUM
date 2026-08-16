(function (root) {
  "use strict";

  var SHA_PATTERN = /^[a-f0-9]{64}$/;
  var OUTCOMES = new Set(["pass", "fail", "unresolved"]);
  var CONTROL_PATTERN = /[\u0000-\u001f\u007f-\u009f]/u;

  function assert(condition, message) {
    if (!condition) throw new Error(message);
  }

  function codePointLength(value) {
    return Array.from(value).length;
  }

  function normalizeText(value, field, minimum, maximum) {
    var text = String(value || "").trim().replace(/\s+/gu, " ");
    assert(!CONTROL_PATTERN.test(text), field + " contains a control character");
    var length = codePointLength(text);
    assert(length >= minimum && length <= maximum,
      field + " must contain " + minimum + "-" + maximum + " characters");
    return text;
  }

  function canonicalValue(value) {
    if (Array.isArray(value)) return value.map(canonicalValue);
    if (value && typeof value === "object") {
      var output = {};
      Object.keys(value).sort().forEach(function (key) {
        output[key] = canonicalValue(value[key]);
      });
      return output;
    }
    return value;
  }

  function canonicalize(value) {
    return JSON.stringify(canonicalValue(value));
  }

  function validateSources(result, resultSha256, labPayload, readingPayload) {
    assert(result && result.schema === "factorium-composition-lab-result-v0",
      "Evaluation requires a Composition Lab result");
    assert(SHA_PATTERN.test(resultSha256 || ""), "Evaluation requires result identity");
    assert(labPayload && labPayload.schema === "factorium-composition-lab-payload-v0",
      "Evaluation requires the Composition Lab payload");
    assert(readingPayload && readingPayload.schema === "factorium-composition-reading-payload-v0",
      "Evaluation requires the Composition Reading payload");
    assert(result.sources.referenceSha256 === labPayload.referenceSha256 &&
      labPayload.referenceSha256 === readingPayload.referenceSha256,
    "Evaluation reference identity mismatch");
    assert(result.sources.relationsSha256 === labPayload.relationsSha256 &&
      labPayload.relationsSha256 === readingPayload.relationsSha256,
    "Evaluation relation identity mismatch");
    assert(Array.isArray(result.evaluation), "Evaluation result omits checks");
    assert(result.evaluation.every(function (check) { return check.outcome === "unresolved"; }),
      "Evaluation simulation requires unresolved base checks");
    var checkIds = new Set();
    result.evaluation.forEach(function (check) {
      assert(typeof check.id === "string" && !checkIds.has(check.id),
        "Evaluation result repeats a check");
      checkIds.add(check.id);
    });
    assert(Array.isArray(readingPayload.bindings) && readingPayload.bindings.length === 18,
      "Evaluation requires 18 exact bindings");
    var artifacts = new Set();
    readingPayload.bindings.forEach(function (binding) {
      assert(binding && typeof binding.artifact === "string" && !artifacts.has(binding.artifact),
        "Evaluation has a missing or duplicate binding");
      artifacts.add(binding.artifact);
    });
  }

  function buildEvaluationRecord(result, resultSha256, labPayload, readingPayload, input) {
    validateSources(result, resultSha256, labPayload, readingPayload);
    assert(result.evaluation.length > 0, "No admitted checks are available to evaluate");
    assert(input && input.boundResultSha256 === resultSha256,
      "Evaluation input is stale for the bound result");
    assert(Array.isArray(input.records) && input.records.length > 0,
      "Select at least one check to record");

    var bindingByArtifact = new Map(readingPayload.bindings.map(function (binding) {
      return [binding.artifact, binding];
    }));
    var checkById = new Map(result.evaluation.map(function (check) {
      return [check.id, check];
    }));
    var seen = new Set();
    var records = input.records.map(function (record) {
      assert(record && typeof record.checkId === "string" && checkById.has(record.checkId),
        "Unknown or stale evaluation check " + String(record && record.checkId));
      assert(!seen.has(record.checkId), "Duplicate evaluation check " + record.checkId);
      seen.add(record.checkId);
      assert(OUTCOMES.has(record.outcome), "Invalid evaluation outcome for " + record.checkId);
      var check = checkById.get(record.checkId);
      var binding = bindingByArtifact.get(check.target);
      assert(binding && binding.kind === "view", "Evaluation check target lacks view custody");
      return {
        checkId: check.id,
        kind: check.kind,
        target: check.target,
        targetLabel: binding.pageTitle,
        href: binding.href,
        outcome: record.outcome,
        evidenceStatus: "user-declared-unverified",
        evidenceReference: normalizeText(record.evidenceReference,
          "Evidence reference", 3, 240),
        observation: normalizeText(record.observation, "Observation", 10, 500),
        rationale: normalizeText(record.rationale, "Rationale", 10, 500)
      };
    }).sort(function (left, right) { return left.checkId.localeCompare(right.checkId); });

    var unrecorded = result.evaluation.map(function (check) { return check.id; })
      .filter(function (checkId) { return !seen.has(checkId); }).sort();
    var outcomes = { pass: 0, fail: 0, unresolved: 0 };
    records.forEach(function (record) { outcomes[record.outcome] += 1; });
    return {
      schema: "factorium-composition-evaluation-record-v0",
      resultSha256: resultSha256,
      referenceSha256: labPayload.referenceSha256,
      relationsSha256: labPayload.relationsSha256,
      status: unrecorded.length ? "partially-recorded" : "fully-recorded",
      coverage: { recorded: records.length, total: result.evaluation.length },
      outcomes: outcomes,
      records: records,
      unrecordedCheckIds: unrecorded,
      boundary: "User-declared and unverified. This record does not change the structural result, close Guide Skeleton gaps, or create a recommendation."
    };
  }

  function hashText(text) {
    assert(root && root.crypto && root.crypto.subtle, "SHA-256 is unavailable");
    return root.crypto.subtle.digest("SHA-256", new TextEncoder().encode(text))
      .then(function (digest) {
        return Array.from(new Uint8Array(digest)).map(function (byte) {
          return byte.toString(16).padStart(2, "0");
        }).join("");
      });
  }

  function identify(record) {
    var canonical = canonicalize(record);
    return hashText(canonical).then(function (sha256) {
      return { record: record, canonical: canonical, sha256: sha256 };
    });
  }

  function element(documentObject, name, className, text) {
    var node = documentObject.createElement(name);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function closureSnapshot(form) {
    return JSON.stringify(Array.from(form.elements).filter(function (control) {
      return control.name && control.type !== "submit";
    }).map(function (control) {
      return {
        name: control.name,
        type: control.type,
        value: control.value,
        checked: Boolean(control.checked),
        disabled: Boolean(control.disabled)
      };
    }));
  }

  function setEvaluationEnabled(card, enabled) {
    Array.from(card.querySelectorAll("select, input[type='text'], textarea")).forEach(function (control) {
      control.disabled = !enabled;
      control.required = enabled;
    });
  }

  function renderReceipt(documentObject, target, identified, resultState) {
    target.replaceChildren();
    var record = identified.record;
    var header = element(documentObject, "div", "evaluation-receipt__header");
    header.append(
      element(documentObject, "span", "evaluation-receipt__status", record.status),
      element(documentObject, "h4", "", "Local evaluation receipt")
    );
    target.append(header,
      element(documentObject, "p", "evaluation-receipt__qualification",
        record.coverage.recorded + " of " + record.coverage.total +
        " checks recorded · not reviewed or verified"),
      element(documentObject, "p", "evaluation-receipt__result-state",
        "Bound structural result remains " + resultState + ". The receipt does not change it."));
    var summary = element(documentObject, "dl", "evaluation-receipt__summary");
    [["Pass", record.outcomes.pass], ["Fail", record.outcomes.fail],
      ["Unresolved", record.outcomes.unresolved]].forEach(function (pair) {
      summary.append(element(documentObject, "dt", "", pair[0]),
        element(documentObject, "dd", "", String(pair[1])));
    });
    target.appendChild(summary);
    var list = element(documentObject, "ol", "evaluation-receipt__records");
    record.records.forEach(function (entry) {
      var item = element(documentObject, "li", "evaluation-receipt__record evaluation-receipt__record--" + entry.outcome);
      var link = element(documentObject, "a", "", entry.targetLabel);
      link.href = entry.href;
      item.append(element(documentObject, "strong", "", "You recorded: " + entry.outcome), link,
        element(documentObject, "p", "", "Evidence reference · " + entry.evidenceReference),
        element(documentObject, "p", "", "Observation · " + entry.observation),
        element(documentObject, "p", "", "Rationale · " + entry.rationale),
        element(documentObject, "code", "composition-meta--full", entry.checkId + " · " + entry.evidenceStatus));
      list.appendChild(item);
    });
    target.appendChild(list);
    var unrecorded = element(documentObject, "section", "evaluation-receipt__unrecorded");
    unrecorded.appendChild(element(documentObject, "h5", "", "Checks not recorded"));
    if (record.unrecordedCheckIds.length) {
      var missing = element(documentObject, "ul", "");
      record.unrecordedCheckIds.forEach(function (checkId) {
        missing.appendChild(element(documentObject, "li", "", checkId));
      });
      unrecorded.appendChild(missing);
    } else {
      unrecorded.appendChild(element(documentObject, "p", "", "None. Full coverage is still not review or verification."));
    }
    target.append(unrecorded,
      element(documentObject, "p", "evaluation-receipt__boundary", record.boundary));
    var exact = element(documentObject, "details", "composition-meta--full evaluation-receipt__exact");
    exact.append(element(documentObject, "summary", "", "Exact evaluation custody"),
      element(documentObject, "p", "", "Evaluation SHA-256 · " + identified.sha256),
      element(documentObject, "p", "", "Bound result SHA-256 · " + record.resultSha256),
      element(documentObject, "pre", "", identified.canonical));
    target.appendChild(exact);
    var alignment = element(documentObject, "p", "evaluation-receipt__alignment",
      "Recorded inputs match this receipt.");
    alignment.dataset.alignment = "matches-record";
    target.appendChild(alignment);
  }

  function renderWorkspace(documentObject, target, identified, readingPayload) {
    var previous = target.querySelector("#composition-evaluation-workspace");
    if (previous) previous.remove();
    var section = element(documentObject, "section", "composition-evaluation-workspace");
    section.id = "composition-evaluation-workspace";
    section.dataset.resultSha256 = identified.sha256;
    section.append(element(documentObject, "p", "lab-stage__operator", "Evaluate"),
      element(documentObject, "h3", "", "Record local evaluation"),
      element(documentObject, "p", "evaluation-workspace__intro",
        "Record what you observed and the outcome you declare. Factorium does not verify evidence or select an outcome."),
      element(documentObject, "p", "evaluation-workspace__privacy",
        "Use non-sensitive references and summaries only. Nothing is stored, transmitted, copied, or downloaded."));

    var route = target.querySelector("#composition-reading-route");
    var guide = target.querySelector("#composition-guide-skeleton");
    if (guide) guide.insertAdjacentElement("afterend", section);
    else if (route) route.insertAdjacentElement("beforebegin", section);
    else target.appendChild(section);

    if (!identified.result.evaluation.length) {
      section.appendChild(element(documentObject, "p", "evaluation-workspace__empty",
        "No admitted checks are available. Address the structural boundary and run closure again before evaluation."));
      return;
    }

    var bindingByArtifact = new Map(readingPayload.bindings.map(function (binding) {
      return [binding.artifact, binding];
    }));
    var form = element(documentObject, "form", "evaluation-form");
    form.noValidate = false;
    var cards = element(documentObject, "div", "evaluation-form__checks");
    identified.result.evaluation.slice().sort(function (left, right) {
      return left.id.localeCompare(right.id);
    }).forEach(function (check) {
      var binding = bindingByArtifact.get(check.target);
      assert(binding && binding.kind === "view", "Evaluation form lacks check view binding");
      var card = element(documentObject, "fieldset", "evaluation-check");
      card.dataset.checkId = check.id;
      var legend = element(documentObject, "legend", "", binding.pageTitle);
      card.appendChild(legend);
      var meta = element(documentObject, "p", "evaluation-check__meta",
        check.kind + " check · currently unresolved");
      var source = element(documentObject, "a", "evaluation-check__source", "Open the check-owning canonical view");
      source.href = binding.href;
      var exact = element(documentObject, "code", "composition-meta--full", check.id + " · " + check.target);
      var includeLabel = element(documentObject, "label", "evaluation-check__include");
      var include = element(documentObject, "input", "");
      include.type = "checkbox";
      include.name = "include:" + check.id;
      include.value = check.id;
      includeLabel.append(include, element(documentObject, "span", "", "Include this check in the record"));
      var outcomeLabel = element(documentObject, "label", "evaluation-field");
      outcomeLabel.appendChild(element(documentObject, "span", "", "Outcome you declare"));
      var outcome = element(documentObject, "select", "");
      outcome.name = "outcome:" + check.id;
      ["unresolved", "pass", "fail"].forEach(function (value) {
        var option = element(documentObject, "option", "", value);
        option.value = value;
        outcome.appendChild(option);
      });
      outcomeLabel.appendChild(outcome);
      function textField(label, name, type, maximum) {
        var wrapper = element(documentObject, "label", "evaluation-field");
        wrapper.appendChild(element(documentObject, "span", "", label));
        var control = element(documentObject, type, "");
        control.name = name + ":" + check.id;
        control.maxLength = maximum;
        if (type === "input") control.type = "text";
        if (type === "textarea") control.rows = 3;
        wrapper.appendChild(control);
        return wrapper;
      }
      card.append(legend, meta, source, exact, includeLabel, outcomeLabel,
        textField("Evidence reference", "evidence", "input", 240),
        textField("Observation summary", "observation", "textarea", 500),
        textField("Outcome rationale", "rationale", "textarea", 500));
      setEvaluationEnabled(card, false);
      include.addEventListener("change", function () { setEvaluationEnabled(card, include.checked); });
      cards.appendChild(card);
    });
    form.appendChild(cards);
    var action = element(documentObject, "div", "evaluation-form__action");
    var button = element(documentObject, "button", "", "Record selected evaluation");
    button.type = "submit";
    var status = element(documentObject, "p", "evaluation-form__status",
      "No local evaluation has been recorded.");
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");
    action.append(button, status);
    form.appendChild(action);
    var receipt = element(documentObject, "section", "evaluation-receipt");
    receipt.hidden = true;
    receipt.setAttribute("aria-live", "polite");
    section.append(form, receipt,
      element(documentObject, "p", "evaluation-workspace__boundary",
        "Local input only. The structural result and all eight Guide Skeleton gaps remain unchanged."));

    var closureForm = documentObject.getElementById("composition-lab-form");
    assert(closureForm, "Evaluation cannot locate closure controls");
    var executedSnapshot = closureSnapshot(closureForm);
    var closureChanged = false;

    function updateClosureAlignment() {
      closureChanged = closureSnapshot(closureForm) !== executedSnapshot;
      button.disabled = closureChanged;
      section.dataset.resultAlignment = closureChanged ? "result-controls-changed" : "matches-result";
      if (closureChanged) {
        status.textContent = "Result controls changed. Run closure again before recording evaluation.";
        if (!receipt.hidden) {
          var alignment = receipt.querySelector(".evaluation-receipt__alignment");
          alignment.textContent = "Result controls changed. This receipt remains bound to the previous result.";
          alignment.dataset.alignment = "result-controls-changed";
        }
      } else if (receipt.hidden) {
        status.textContent = "No local evaluation has been recorded.";
      }
    }
    closureForm.addEventListener("input", updateClosureAlignment);
    closureForm.addEventListener("change", updateClosureAlignment);

    form.addEventListener("input", function () {
      if (receipt.hidden) return;
      var alignment = receipt.querySelector(".evaluation-receipt__alignment");
      alignment.textContent = "Evaluation inputs changed. Record again to create a new receipt.";
      alignment.dataset.alignment = "inputs-changed";
    });
    form.addEventListener("change", function () {
      if (receipt.hidden) return;
      var alignment = receipt.querySelector(".evaluation-receipt__alignment");
      alignment.textContent = "Evaluation inputs changed. Record again to create a new receipt.";
      alignment.dataset.alignment = "inputs-changed";
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (closureChanged) return;
      try {
        var records = Array.from(cards.querySelectorAll(".evaluation-check")).filter(function (card) {
          return card.querySelector(".evaluation-check__include input").checked;
        }).map(function (card) {
          var checkId = card.dataset.checkId;
          return {
            checkId: checkId,
            outcome: card.querySelector("[name='outcome:" + checkId + "']").value,
            evidenceReference: card.querySelector("[name='evidence:" + checkId + "']").value,
            observation: card.querySelector("[name='observation:" + checkId + "']").value,
            rationale: card.querySelector("[name='rationale:" + checkId + "']").value
          };
        });
        var record = buildEvaluationRecord(identified.result, identified.sha256,
          root.FACTORIUM_COMPOSITION_LAB, readingPayload,
          { boundResultSha256: section.dataset.resultSha256, records: records });
        button.disabled = true;
        status.textContent = "Identifying the local evaluation record…";
        identify(record).then(function (evaluated) {
          renderReceipt(documentObject, receipt, evaluated, identified.result.state);
          receipt.hidden = false;
          status.textContent = evaluated.record.coverage.recorded + " of " +
            evaluated.record.coverage.total + " checks recorded; not reviewed or verified.";
          button.disabled = false;
        }).catch(function (error) {
          status.textContent = error.message;
          button.disabled = false;
        });
      } catch (error) {
        status.textContent = error.message;
        var firstEnabled = form.querySelector("input:enabled, select:enabled, textarea:enabled");
        if (firstEnabled) firstEnabled.focus();
      }
    });
    updateClosureAlignment();
  }

  function renderUnavailable(documentObject, target) {
    var previous = target.querySelector("#composition-evaluation-workspace");
    if (previous) previous.remove();
    var notice = element(documentObject, "p", "lab-error evaluation-workspace__error",
      "Local evaluation unavailable. The structural result, Guide Skeleton, and canonical reading route remain available.");
    var guide = target.querySelector("#composition-guide-skeleton");
    var route = target.querySelector("#composition-reading-route");
    if (guide) guide.insertAdjacentElement("afterend", notice);
    else if (route) route.insertAdjacentElement("beforebegin", notice);
    else target.appendChild(notice);
  }

  var api = {
    OUTCOMES: OUTCOMES,
    normalizeText: normalizeText,
    canonicalize: canonicalize,
    validateSources: validateSources,
    buildEvaluationRecord: buildEvaluationRecord,
    closureSnapshot: closureSnapshot
  };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (root && root.document && root.FACTORIUM_COMPOSITION_LAB &&
    root.FACTORIUM_COMPOSITION_READING &&
    typeof root.FACTORIUM_COMPOSITION_READING_ROUTE_RENDER === "function") {
    var previousRenderer = root.FACTORIUM_COMPOSITION_READING_ROUTE_RENDER;
    root.FACTORIUM_COMPOSITION_READING_ROUTE_RENDER = function (identified) {
      previousRenderer(identified);
      var target = root.document.getElementById("composition-lab-result");
      if (!target) return;
      try {
        validateSources(identified.result, identified.sha256,
          root.FACTORIUM_COMPOSITION_LAB, root.FACTORIUM_COMPOSITION_READING);
        renderWorkspace(root.document, target, identified, root.FACTORIUM_COMPOSITION_READING);
      } catch (_) {
        renderUnavailable(root.document, target);
      }
    };
  }
})(typeof window !== "undefined" ? window : null);

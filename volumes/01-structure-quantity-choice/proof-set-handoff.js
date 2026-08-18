(function () {
  "use strict";

  function fallbackCopy(text, documentObject) {
    var field = documentObject.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    documentObject.body.appendChild(field);
    field.select();
    var copied = documentObject.execCommand("copy");
    field.remove();
    return copied;
  }

  function initialize(section, documentObject, windowObject, navigatorObject) {
    var question = section.querySelector("[data-handoff-question]");
    var unresolved = section.querySelector("[data-handoff-unresolved]");
    var source = section.querySelector("[data-handoff-source]");
    var page = section.querySelector("[data-handoff-page]");
    var status = section.querySelector("[data-handoff-status]");
    var copy = section.querySelector("[data-handoff-copy]");
    var print = section.querySelector("[data-handoff-print]");
    var clear = section.querySelector("[data-handoff-clear]");
    var pageTitle = documentObject.title.replace(/ · Factorium$/, "");
    page.textContent = pageTitle + " — " + windowObject.location.href;

    function payload() {
      return [
        "Factorium handoff note",
        "Question or situation: " + (question.value.trim() || "[not entered]"),
        "Current Factorium page: " + pageTitle + " — " + windowObject.location.href,
        "What remains unresolved: " + (unresolved.value.trim() || "[not entered]"),
        "Next authoritative source: " + (source.value.trim() || "[not entered]"),
        "Boundary: User-entered, unverified, and not stored by Factorium."
      ].join("\n");
    }

    copy.addEventListener("click", async function () {
      var copied = false;
      try {
        if (navigatorObject.clipboard && navigatorObject.clipboard.writeText) {
          await navigatorObject.clipboard.writeText(payload());
          copied = true;
        }
      } catch (_) {}
      if (!copied) copied = fallbackCopy(payload(), documentObject);
      status.textContent = copied ? "Handoff copied. Nothing was saved." : "Copy was unavailable. Select and copy the fields manually.";
    });
    print.addEventListener("click", function () { windowObject.print(); });
    clear.addEventListener("click", function () {
      question.value = ""; unresolved.value = ""; source.value = "";
      status.textContent = "Cleared. Nothing is saved.";
      question.focus();
    });
  }

  document.querySelectorAll("[data-factorium-handoff]").forEach(function (section) {
    initialize(section, document, window, navigator);
  });
})();

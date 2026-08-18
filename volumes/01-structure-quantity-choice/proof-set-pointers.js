(function (root) {
  "use strict";

  function escapePattern(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function enhance(documentObject, pointers) {
    if (!documentObject || !Array.isArray(pointers) || pointers.length === 0) return 0;
    var byTerm = new Map(pointers.map(function (pointer) { return [pointer.term.toLowerCase(), pointer]; }));
    var pattern = new RegExp("(^|[^a-z0-9-])(" + pointers.slice().sort(function (a, b) { return b.term.length - a.term.length; }).map(function (pointer) { return escapePattern(pointer.term); }).join("|") + ")(?=$|[^a-z0-9-])", "gi");
    var linked = 0;

    Array.from(documentObject.querySelectorAll("main.site-entry code")).forEach(function (code) {
      var walker = documentObject.createTreeWalker(code, NodeFilter.SHOW_TEXT);
      var nodes = [];
      while (walker.nextNode()) {
        if (!walker.currentNode.parentElement.closest("a")) nodes.push(walker.currentNode);
      }
      nodes.forEach(function (node) {
        var text = node.nodeValue;
        pattern.lastIndex = 0;
        if (!pattern.test(text)) return;
        pattern.lastIndex = 0;
        var fragment = documentObject.createDocumentFragment();
        var cursor = 0;
        var match;
        while ((match = pattern.exec(text)) !== null) {
          var prefixLength = match[1].length;
          var termStart = match.index + prefixLength;
          if (termStart > cursor) fragment.append(text.slice(cursor, termStart));
          var pointer = byTerm.get(match[2].toLowerCase());
          var anchor = documentObject.createElement("a");
          anchor.className = "pointer-link";
          anchor.href = "../pointers/" + pointer.slug + ".html";
          anchor.textContent = match[2];
          fragment.append(anchor);
          linked += 1;
          cursor = termStart + match[2].length;
          if (pattern.lastIndex <= cursor) pattern.lastIndex = cursor;
        }
        if (cursor < text.length) fragment.append(text.slice(cursor));
        node.replaceWith(fragment);
      });
    });
    return linked;
  }

  if (typeof module !== "undefined" && module.exports) module.exports = {enhance: enhance};
  if (root && root.document) enhance(root.document, root.FACTORIUM_POINTERS || []);
})(typeof window !== "undefined" ? window : globalThis);


(function (root) {
  "use strict";

  function indexBindings(payload) {
    var profiles = new Map((payload.profiles || []).map(function (profile) {
      return [profile.id, profile];
    }));
    var bindings = new Map();
    (payload.bindings || []).forEach(function (binding) {
      if (!profiles.has(binding.profileId)) {
        throw new Error("Unknown context profile: " + binding.profileId);
      }
      if (!bindings.has(binding.path)) bindings.set(binding.path, []);
      bindings.get(binding.path).push({
        binding: binding,
        profile: profiles.get(binding.profileId)
      });
    });
    return bindings;
  }

  function appendList(documentObject, parent, values) {
    var list = documentObject.createElement("ul");
    values.forEach(function (value) {
      var item = documentObject.createElement("li");
      item.textContent = value;
      list.appendChild(item);
    });
    parent.appendChild(list);
  }

  function initialize(documentObject, payload) {
    var bindingsByPath = indexBindings(payload);
    var decorated = 0;
    documentObject.querySelectorAll(".proof-entry[data-source-path]").forEach(function (article) {
      var matches = bindingsByPath.get(article.dataset.sourcePath) || [];
      if (!matches.length) return;
      var container = documentObject.createElement("div");
      container.className = "context-profiles";
      container.setAttribute("aria-label", "Inherited context profiles");

      matches.forEach(function (match) {
        var binding = match.binding;
        var profile = match.profile;
        var details = documentObject.createElement("details");
        details.className = "context-profile";
        var summary = documentObject.createElement("summary");
        summary.textContent = "Context: " + profile.name;
        var scope = documentObject.createElement("p");
        scope.className = "context-profile__scope";
        scope.textContent = "Applies to: " + binding.appliesTo;
        var description = documentObject.createElement("p");
        description.className = "context-profile__summary";
        description.textContent = profile.summary;
        var definitions = documentObject.createElement("dl");
        var defaultsTerm = documentObject.createElement("dt");
        defaultsTerm.textContent = "Inherited defaults";
        var defaultsValue = documentObject.createElement("dd");
        appendList(documentObject, defaultsValue, profile.defaults);
        var requiresTerm = documentObject.createElement("dt");
        requiresTerm.textContent = "Still required";
        var requiresValue = documentObject.createElement("dd");
        requiresValue.className = "context-profile__warning";
        appendList(documentObject, requiresValue, profile.requires);
        definitions.append(defaultsTerm, defaultsValue, requiresTerm, requiresValue);
        var link = documentObject.createElement("a");
        link.href = "#" + profile.anchor;
        link.textContent = "Open full context profile";
        details.append(summary, scope, description, definitions, link);
        container.appendChild(details);
        decorated += 1;
      });

      var deck = article.querySelector(":scope > .proof-entry__deck");
      if (deck) deck.after(container);
      else article.querySelector(":scope > h1").after(container);
    });
    documentObject.documentElement.dataset.contextBindings = String(decorated);
  }

  var api = { indexBindings: indexBindings };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (root && root.document && root.FACTORIUM_CONTEXT_PROFILES) {
    initialize(root.document, root.FACTORIUM_CONTEXT_PROFILES);
  }
})(typeof window !== "undefined" ? window : null);

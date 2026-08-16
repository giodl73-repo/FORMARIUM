"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const views = require(path.join("..", "volumes", "01-structure-quantity-choice",
  "proof-set-composition-views.js"));

assert.deepEqual(Object.keys(views.PROFILES),
  ["compact", "abbreviated", "book", "full"], "exact profile vocabulary");
assert.deepEqual(views.profileState("compact"),
  { detail: "summary", metadata: "minimal", density: "tight" });
assert.deepEqual(views.profileState("abbreviated"),
  { detail: "core", metadata: "minimal", density: "tight" });
assert.deepEqual(views.profileState("book"),
  { detail: "core", metadata: "essential", density: "comfortable" });
assert.deepEqual(views.profileState("full"),
  { detail: "full", metadata: "full", density: "comfortable" });
assert.equal(views.resolveProfile("", null), "book", "fresh fallback");
assert.equal(views.resolveProfile("", "compact"), "compact", "stored profile");
assert.equal(views.resolveProfile("?view=full", "compact"), "full", "URL precedence");
assert.equal(views.resolveProfile("?view=unknown", "compact"), "book", "invalid URL fails to Book");
assert.equal(views.resolveProfile("", "unknown"), "book", "invalid stored value fails to Book");
assert.equal(views.shortCode("f6-evidence-obligation"), "F6");
assert.equal(views.humanVerb("satisfies-obligation"), "Satisfies obligation");

const source = fs.readFileSync(path.join(__dirname, "..", "volumes",
  "01-structure-quantity-choice", "proof-set-composition-views.js"), "utf8");
assert.match(source, /factorium-reader-profile/, "shared preference key");
assert.doesNotMatch(source, /fetch\s*\(|XMLHttpRequest|WebSocket|sendBeacon|indexedDB|sessionStorage/,
  "no network or query storage mechanism");
assert.equal((source.match(/\.setItem\s*\(/g) || []).length, 1,
  "stores one profile preference only");

console.log("OK profiles=4 default=book preference=reader-profile closure-inputs=0");

"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const work = read("tables/entries/coordinated-work.md");
const capacity = read("tables/entries/operational-resource-capacity-demand.md");
const identity = read("tables/entries/identity-naming-classification-versioning.md");
const access = read("tables/entries/access-permission-authorization-entitlement.md");

assert.match(work, /\[Objective, Control, Monitoring, and Response\]\(control-monitoring-response\.md\)\r?\n- \[Operational Resource, Capacity, Demand, and Allocation\]\(operational-resource-capacity-demand\.md\)\r?\n- \[Governance, Obligation, and Compliance\]/);
assert.match(capacity, /\[Coordinated Work\]\(coordinated-work\.md\)/);
assert.match(identity, /\[Identity\]\(\.\.\/roots\/identity\.md\)\r?\n- \[Access, Permission, Authorization, and Entitlement\]\(access-permission-authorization-entitlement\.md\)\r?\n- \[Relation\]/);
assert.match(access, /\[Identity, Namespace, Naming, Classification, and Versioning\]\(identity-naming-classification-versioning\.md\)/);
assert.equal((work.match(/operational-resource-capacity-demand\.md/g) || []).length, 1);
assert.equal((identity.match(/access-permission-authorization-entitlement\.md/g) || []).length, 1);
console.log("OK reciprocal-connections=2 reverse-existing=2 preview-order=frozen semantics=untyped");

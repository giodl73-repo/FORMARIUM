"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const portfolio = JSON.parse(fs.readFileSync(path.join(root, "fixtures/coverage/biography-thought-closure-portfolio-01.json"), "utf8"));

assert.equal(portfolio.schema, "factorium.biography-thought-closure-portfolio.v1");
assert.equal(portfolio.status, "frozen-before-factorium-comparison");
assert.equal(portfolio.packets.length, 24);
assert.deepEqual(portfolio.admission_ceiling, {anchors: 1, views: 2, relations: 0, discovery_repairs: 1});

const expected = {"leadership-history": 8, "intellectual-biography": 6, "mind-language-society": 6, "boundary-adversarial": 4};
const actual = Object.fromEntries(Object.keys(expected).map((lane) => [lane, portfolio.packets.filter((packet) => packet.lane === lane).length]));
assert.deepEqual(actual, expected);
assert.equal(new Set(portfolio.packets.map((packet) => packet.id)).size, 24);

for (const [index, packet] of portfolio.packets.entries()) {
  assert.equal(packet.id, `BTC-01-${String(index + 1).padStart(2, "0")}`);
  assert.ok(packet.case && packet.question);
  assert.ok(packet.sources.length >= 1);
  assert.ok(packet.required_distinctions.length >= 6);
  assert.equal(packet.owner_entry_ids, undefined, "owner comparison must not enter frozen packet");
  for (const source of packet.sources) {
    assert.match(source.url, /^https:\/\//);
    assert.ok(source.role);
  }
}

assert.match(portfolio.reader_job, /named person/i);
assert.match(portfolio.claims_boundary, /no historical truth/i);
console.log("OK campaign=BTC-01 packets=24 leadership=8 intellectual=6 mind=6 boundary=4 status=frozen");

"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { spawn } = require("node:child_process");

const root = path.resolve(process.argv[2] || "target/proof-set-sim-41");
const screenshot = path.resolve(process.argv[3] || "target/sim41-subject-object-depth.png");
const edge = [
  process.env.EDGE_PATH,
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
].filter(Boolean).find(fs.existsSync);
assert.ok(edge, "Microsoft Edge executable not found");

const port = 10140 + (process.pid % 30);
const profile = path.resolve(`target/edge-subject-object-profile-${process.pid}`);
fs.mkdirSync(profile, { recursive: true });
const pagePath = path.join(root,
  "entries/tables-primes-subject-object-relationship.html");
const browser = spawn(edge, [
  "--headless=new", "--disable-gpu", "--no-first-run",
  "--no-default-browser-check", `--remote-debugging-port=${port}`,
  "--remote-allow-origins=*", `--user-data-dir=${profile}`,
  pathToFileURL(pagePath).href,
], { stdio: "ignore", windowsHide: true });
const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function findTarget() {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      const page = list.find((item) => item.type === "page");
      if (page) return page;
    } catch (_) {}
    await delay(100);
  }
  throw new Error("Timed out waiting for Edge");
}

function connect(url) {
  const socket = new WebSocket(url);
  let nextId = 1;
  const pending = new Map();
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (!message.id || !pending.has(message.id)) return;
    const operation = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) operation.reject(new Error(message.error.message));
    else operation.resolve(message.result);
  });
  return {
    ready: new Promise((resolve, reject) => {
      socket.addEventListener("open", resolve, { once: true });
      socket.addEventListener("error", reject, { once: true });
    }),
    call(method, params = {}) {
      const id = nextId++;
      return new Promise((resolve, reject) => {
        pending.set(id, { resolve, reject });
        socket.send(JSON.stringify({ id, method, params }));
      });
    },
    close() { socket.close(); },
  };
}

async function evaluate(client, expression) {
  const response = await client.call("Runtime.evaluate", {
    expression, awaitPromise: true, returnByValue: true,
  });
  if (response.exceptionDetails) throw new Error(response.exceptionDetails.text);
  return response.result.value;
}

async function waitFor(client, expression, message) {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    if (await evaluate(client, expression)) return;
    await delay(60);
  }
  throw new Error(message);
}

(async () => {
  let client;
  try {
    client = connect((await findTarget()).webSocketDebuggerUrl);
    await client.ready;
    await client.call("Runtime.enable");
    await client.call("Page.enable");
    await waitFor(client, "document.readyState === 'complete'", "page did not load");
    const state = await evaluate(client, `(() => ({
      title: document.querySelector("main h1").textContent.replace(/\\s+/g, " ").trim(),
      identity: document.querySelector(".table-navigator__heading span").textContent,
      action: [...document.querySelectorAll(".table-navigator__actions a")].at(-1).textContent,
      links: [...document.querySelectorAll(".table-navigator__connections a")].map(a => ({
        title: a.textContent.replace(/\\s+/g, " ").trim(), href: a.getAttribute("href")
      })),
      boundary: document.querySelector(".table-navigator__boundary").textContent,
      maturity: [...document.querySelectorAll("main p")].at(-1).textContent
    }))()`);
    assert.equal(state.title, "Subject-Object Relationship");
    assert.equal(state.identity, "Curated Table record");
    assert.equal(state.action, "All cross-references (2)");
    assert.deepEqual(state.links.map((link) => link.title), [
      "Relation", "Access, Permission, Authorization, and Entitlement"
    ]);
    assert.match(state.links[0].href, /^tables-roots-relation\.html#/);
    assert.match(state.links[1].href,
      /^tables-entries-access-permission-authorization-entitlement\.html#/);
    assert.match(state.boundary, /Authored connections are navigation/);
    assert.equal(state.maturity, "Maturity: candidate");

    await client.call("Emulation.setDeviceMetricsOverride", {
      width: 390, height: 1100, deviceScaleFactor: 1, mobile: true,
    });
    await evaluate(client, `document.querySelector(".table-navigator").scrollIntoView(); true`);
    const mobile = await evaluate(client, `(() => ({
      links: document.querySelectorAll(".table-navigator__connections a").length,
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
    }))()`);
    assert.equal(mobile.links, 2);
    assert.equal(mobile.overflow, false);
    const shot = await client.call("Page.captureScreenshot", {
      format: "png", captureBeyondViewport: false,
    });
    fs.writeFileSync(screenshot, Buffer.from(shot.data, "base64"));
    assert.ok(fs.statSync(screenshot).size > 15000, "screenshot is non-trivial");
    console.log(`OK routes=2 curated=preserved mobile=390 screenshot=${screenshot}`);
  } finally {
    if (client) client.close();
    browser.kill();
  }
})().catch((error) => {
  browser.kill();
  console.error(error.stack || error.message);
  process.exitCode = 1;
});

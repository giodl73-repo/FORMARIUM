"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { spawn } = require("node:child_process");

const siteRoot = path.resolve(process.argv[2] || "target/proof-set-sim-32");
const screenshotPath = path.resolve(process.argv[3] || "target/sim32-table-navigator.png");
const manifest = JSON.parse(fs.readFileSync(path.join(siteRoot, "manifest.json"), "utf8"));
const records = JSON.parse(fs.readFileSync(path.join(siteRoot, "search-index.json"), "utf8"));
assert.equal(manifest.edition, "sim-32", "browser check requires sim-32");
const entry = records.find((record) => record.path ===
  "tables/entries/amount-concentration-composition.md");
const view = records.find((record) => record.path ===
  "tables/constraints/evaluation-threshold-acceptance.md");
assert.ok(entry && view);
const edgePath = [
  process.env.EDGE_PATH,
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
].filter(Boolean).find((candidate) => fs.existsSync(candidate));
assert.ok(edgePath, "Microsoft Edge executable not found");

const port = 10020 + (process.pid % 30);
const profile = path.resolve(`target/edge-table-navigator-profile-${process.pid}`);
assert.ok(profile.startsWith(path.resolve("target") + path.sep));
fs.mkdirSync(profile, { recursive: true });
const entryUrl = pathToFileURL(path.join(siteRoot, entry.href)).href;
const viewUrl = pathToFileURL(path.join(siteRoot, view.href)).href;
const browser = spawn(edgePath, [
  "--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check",
  `--remote-debugging-port=${port}`, "--remote-allow-origins=*",
  `--user-data-dir=${profile}`, entryUrl,
], { stdio: "ignore", windowsHide: true });
const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function browserTarget() {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    try {
      const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      const target = targets.find((item) => item.type === "page");
      if (target) return target;
    } catch (_) {}
    await delay(100);
  }
  throw new Error("Timed out waiting for Edge Table page");
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
  const ready = new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });
  return {
    ready,
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
    client = connect((await browserTarget()).webSocketDebuggerUrl);
    await client.ready;
    await client.call("Runtime.enable");
    await client.call("Page.enable");
    await waitFor(client, "document.readyState === 'complete'", "entry did not load");
    const entryState = await evaluate(client, `(() => {
      const nav = document.querySelector(".table-navigator");
      return {
        identity: nav.dataset.tableClass,
        actions: [...nav.querySelectorAll(".table-navigator__actions a")].map(node => node.textContent),
        connections: nav.querySelectorAll(".table-navigator__connections li").length,
        beforeHeading: Boolean(nav.compareDocumentPosition(document.querySelector("main h1")) & Node.DOCUMENT_POSITION_FOLLOWING),
        boundary: nav.querySelector(".table-navigator__boundary").textContent
      };
    })()`);
    assert.deepEqual(entryState, {
      identity: "Canonical entry",
      actions: ["Search Tables", "Browse Tables", "Compare nearby terms", "All cross-references (9)"],
      connections: 6,
      beforeHeading: true,
      boundary: "Authored connections are navigation, not synonym, broader/narrower, equivalence, dependency, or closure claims.",
    });

    await client.call("Emulation.setDeviceMetricsOverride", {
      width: 390, height: 1600, deviceScaleFactor: 1, mobile: true,
    });
    const mobile = await evaluate(client, `(() => ({
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      visible: getComputedStyle(document.querySelector(".table-navigator")).display !== "none",
      chips: document.querySelectorAll(".table-navigator__connections li").length
    }))()`);
    assert.deepEqual(mobile, { overflow: false, visible: true, chips: 6 });
    const shot = await client.call("Page.captureScreenshot", {
      format: "png", captureBeyondViewport: false,
    });
    fs.writeFileSync(screenshotPath, Buffer.from(shot.data, "base64"));
    assert.ok(fs.statSync(screenshotPath).size > 20000, "navigator screenshot is non-trivial");

    await evaluate(client, `location.href = ${JSON.stringify(viewUrl)}; true`);
    await waitFor(client,
      `document.querySelector(".site-entry")?.dataset.sourcePath === "tables/constraints/evaluation-threshold-acceptance.md"`,
      "specialized view did not load");
    const viewState = await evaluate(client, `(() => ({
      identity: document.querySelector(".table-navigator").dataset.tableClass,
      ownerLabel: document.querySelector(".table-navigator__owner span").textContent,
      owner: document.querySelector(".table-navigator__owner").textContent.replace("Owning Table", "").trim(),
      ownerHref: document.querySelector(".table-navigator__owner").getAttribute("href"),
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
    }))()`);
    assert.deepEqual(viewState, {
      identity: "Specialized constraint view",
      ownerLabel: "Owning Table",
      owner: "Evaluation Measure, Scale, Criterion, and Score",
      ownerHref: "tables-entries-evaluation-measure-scale-criterion.html",
      overflow: false,
    });
    console.log(`OK entry=canonical actions=4 connections=6 mobile=390 view=constraint owner=exact screenshot=${screenshotPath}`);
  } finally {
    if (client) client.close();
    browser.kill();
  }
})().catch((error) => {
  browser.kill();
  console.error(error.stack || error.message);
  process.exitCode = 1;
});

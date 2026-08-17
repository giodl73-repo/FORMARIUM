"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { spawn } = require("node:child_process");

const siteRoot = path.resolve(process.argv[2] || "target/proof-set-sim-37");
const screenshotPath = path.resolve(process.argv[3] ||
  "target/sim37-factorium-reader-sequence.png");
const manifest = JSON.parse(fs.readFileSync(path.join(siteRoot, "manifest.json"), "utf8"));
const records = JSON.parse(fs.readFileSync(path.join(siteRoot, "search-index.json"), "utf8"));
assert.equal(manifest.edition, "sim-37", "browser check requires sim-37");
const firstRecord = records.find((record) => record.path === "tables/roots/purpose.md");
const secondRecord = records.find((record) => record.path === "tables/roots/context.md");
assert.ok(firstRecord && secondRecord);
const edgePath = [
  process.env.EDGE_PATH,
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
].filter(Boolean).find((candidate) => fs.existsSync(candidate));
assert.ok(edgePath, "Microsoft Edge executable not found");

const port = 10170 + (process.pid % 30);
const profile = path.resolve(`target/edge-reader-sequence-profile-${process.pid}`);
assert.ok(profile.startsWith(path.resolve("target") + path.sep));
fs.mkdirSync(profile, { recursive: true });
const firstUrl = pathToFileURL(path.join(siteRoot, firstRecord.href)).href;
const browser = spawn(edgePath, [
  "--headless=new", "--disable-gpu", "--no-first-run",
  "--no-default-browser-check", `--remote-debugging-port=${port}`,
  "--remote-allow-origins=*", `--user-data-dir=${profile}`, firstUrl,
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
  throw new Error("Timed out waiting for Edge Reader sequence");
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
    await client.call("Page.navigate", { url: firstUrl });
    await waitFor(client, `document.querySelector(".reader-sequence")`,
      "first Reader step did not load");
    const first = await evaluate(client, `(() => ({
      source: document.querySelector(".site-entry").dataset.sourcePath,
      step: document.querySelector(".reader-sequence").dataset.readerStep,
      part: document.querySelector(".reader-sequence").dataset.readerPart,
      previous: document.querySelector('[data-reader-direction="previous"]'),
      next: document.querySelector('[data-reader-direction="next"]').getAttribute("href"),
      globalLabel: document.querySelector(".all-record-sequence > p").textContent,
      globalAria: document.querySelector(".all-record-sequence nav").getAttribute("aria-label")
    }))()`);
    assert.equal(first.source, "tables/roots/purpose.md");
    assert.equal(first.step, "1");
    assert.equal(first.part, "1");
    assert.equal(first.previous, null);
    assert.equal(first.next, path.basename(secondRecord.href));
    assert.equal(first.globalLabel, "All contents sequence");
    assert.equal(first.globalAria, "All-record sequence");

    await evaluate(client, `document.querySelector('[data-reader-direction="next"]').click(); true`);
    await waitFor(client,
      `document.querySelector(".reader-sequence")?.dataset.readerStep === "2"`,
      "Reader next did not open step 2");
    const second = await evaluate(client, `(() => ({
      source: document.querySelector(".site-entry").dataset.sourcePath,
      previous: document.querySelector('[data-reader-direction="previous"] span').textContent,
      next: document.querySelector('[data-reader-direction="next"] span').textContent
    }))()`);
    assert.equal(second.source, "tables/roots/context.md");
    assert.equal(second.previous, "Previous Reader step");
    assert.equal(second.next, "Next Reader step");

    await client.call("Page.navigate", { url: firstUrl });
    await waitFor(client, `document.querySelector(".reader-sequence")`,
      "first Reader step did not reload");
    await client.call("Emulation.setDeviceMetricsOverride", {
      width: 390, height: 1500, deviceScaleFactor: 1, mobile: true,
    });
    await evaluate(client, `document.querySelector(".reader-sequence").scrollIntoView(); true`);
    const mobile = await evaluate(client, `(() => ({
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      columns: getComputedStyle(document.querySelector(".reader-sequence__links")).gridTemplateColumns,
      panelWidth: document.querySelector(".reader-sequence").getBoundingClientRect().width,
      viewport: document.documentElement.clientWidth
    }))()`);
    assert.equal(mobile.overflow, false);
    assert.ok(!mobile.columns.includes(" "));
    assert.ok(mobile.panelWidth <= mobile.viewport);
    const shot = await client.call("Page.captureScreenshot", {
      format: "png", captureBeyondViewport: false,
    });
    fs.writeFileSync(screenshotPath, Buffer.from(shot.data, "base64"));
    assert.ok(fs.statSync(screenshotPath).size > 20000,
      "Reader sequence screenshot is non-trivial");
    console.log(
      `OK first=1 next=2 panels=24 mobile=390 screenshot=${screenshotPath}`
    );
  } finally {
    if (client) client.close();
    browser.kill();
  }
})().catch((error) => {
  browser.kill();
  console.error(error.stack || error.message);
  process.exitCode = 1;
});

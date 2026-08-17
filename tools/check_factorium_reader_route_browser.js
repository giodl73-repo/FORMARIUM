"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { spawn } = require("node:child_process");

const siteRoot = path.resolve(process.argv[2] || "target/proof-set-sim-36");
const screenshotPath = path.resolve(process.argv[3] ||
  "target/sim36-factorium-reader-route.png");
const manifest = JSON.parse(fs.readFileSync(path.join(siteRoot, "manifest.json"), "utf8"));
assert.equal(manifest.edition, "sim-36", "browser check requires sim-36");
const edgePath = [
  process.env.EDGE_PATH,
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
].filter(Boolean).find((candidate) => fs.existsSync(candidate));
assert.ok(edgePath, "Microsoft Edge executable not found");

const port = 10140 + (process.pid % 30);
const profile = path.resolve(`target/edge-reader-route-profile-${process.pid}`);
assert.ok(profile.startsWith(path.resolve("target") + path.sep));
fs.mkdirSync(profile, { recursive: true });
const homeUrl = pathToFileURL(path.join(siteRoot, "index.html")).href;
const readerUrl = pathToFileURL(path.join(siteRoot, "reader.html")).href;
const browser = spawn(edgePath, [
  "--headless=new", "--disable-gpu", "--no-first-run",
  "--no-default-browser-check", `--remote-debugging-port=${port}`,
  "--remote-allow-origins=*", `--user-data-dir=${profile}`, homeUrl,
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
  throw new Error("Timed out waiting for Edge Reader route");
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
    await client.call("Page.navigate", { url: homeUrl });
    await waitFor(client,
      `document.readyState === "complete" && document.querySelector('[data-book="reader"]')`,
      "home did not load");
    const homeRoute = await evaluate(client,
      `document.querySelector('[data-book="reader"] .site-book-card__primary').getAttribute('href')`);
    assert.equal(homeRoute, "reader.html");

    await client.call("Page.navigate", { url: readerUrl });
    await waitFor(client, `document.querySelector(".reader-route__spine")`,
      "Reader route did not load");
    const desktop = await evaluate(client, `(() => ({
      heading: document.querySelector("h1").textContent,
      records: document.querySelectorAll("[data-reader-path]").length,
      parts: document.querySelectorAll(".reader-route__part").length,
      sizes: [...document.querySelectorAll(".reader-route__part")].map(
        part => part.querySelectorAll("[data-reader-path]").length),
      first: document.querySelector("[data-reader-path] a").textContent,
      columns: getComputedStyle(document.querySelector(".reader-route__spine")).gridTemplateColumns,
      current: document.querySelector('[aria-current="page"]').textContent,
      boundary: document.querySelector(".reader-route__boundary").textContent
    }))()`);
    assert.equal(desktop.heading, "The Factorium Reader");
    assert.equal(desktop.records, 24);
    assert.equal(desktop.parts, 5);
    assert.deepEqual(desktop.sizes, [6, 6, 5, 4, 3]);
    assert.equal(desktop.first, "Purpose");
    assert.equal(desktop.current, "Reader");
    assert.ok(desktop.columns.split(" ").length >= 2);
    assert.match(desktop.boundary, /^Tables remain authoritative\./);

    await client.call("Emulation.setDeviceMetricsOverride", {
      width: 390, height: 1500, deviceScaleFactor: 1, mobile: true,
    });
    await evaluate(client, `document.querySelector(".reader-route__heading").scrollIntoView(); true`);
    const mobile = await evaluate(client, `(() => ({
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      columns: getComputedStyle(document.querySelector(".reader-route__spine")).gridTemplateColumns,
      firstSpan: getComputedStyle(document.querySelector(".reader-route__part:first-child")).gridColumn,
      parts: document.querySelectorAll(".reader-route__parts a").length
    }))()`);
    assert.equal(mobile.overflow, false);
    assert.ok(!mobile.columns.includes(" "));
    assert.equal(mobile.firstSpan, "auto");
    assert.equal(mobile.parts, 5);
    const shot = await client.call("Page.captureScreenshot", {
      format: "png", captureBeyondViewport: false,
    });
    fs.writeFileSync(screenshotPath, Buffer.from(shot.data, "base64"));
    assert.ok(fs.statSync(screenshotPath).size > 20000,
      "Reader route screenshot is non-trivial");
    console.log(
      `OK route=reader.html records=24 parts=5 mobile=390 screenshot=${screenshotPath}`
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

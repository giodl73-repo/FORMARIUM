"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { spawn } = require("node:child_process");

const root = path.resolve(process.argv[2] || "target/proof-set-sim-40");
const screenshot = path.resolve(process.argv[3] || "target/sim40-everyday-search-cue.png");
const edge = [
  process.env.EDGE_PATH,
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
].filter(Boolean).find(fs.existsSync);
assert.ok(edge, "Microsoft Edge executable not found");

const port = 10100 + (process.pid % 30);
const profile = path.resolve(`target/edge-search-cue-profile-${process.pid}`);
fs.mkdirSync(profile, { recursive: true });
const url = pathToFileURL(path.join(root, "index.html")).href + "#search";
const browser = spawn(edge, [
  "--headless=new", "--disable-gpu", "--no-first-run",
  "--no-default-browser-check", `--remote-debugging-port=${port}`,
  "--remote-allow-origins=*", `--user-data-dir=${profile}`, url,
], { stdio: "ignore", windowsHide: true });
const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function target() {
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

function connect(urlValue) {
  const socket = new WebSocket(urlValue);
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
    client = connect((await target()).webSocketDebuggerUrl);
    await client.ready;
    await client.call("Runtime.enable");
    await client.call("Page.enable");
    await waitFor(client, "document.readyState === 'complete'", "page did not load");
    await evaluate(client, `(() => {
      const input = document.querySelector("#proof-search-query");
      input.value = "size";
      input.dispatchEvent(new Event("input", { bubbles: true }));
      return true;
    })()`);
    await waitFor(client, `!document.querySelector("#proof-search-cue").hidden`,
      "cue did not appear");
    const state = await evaluate(client, `(() => ({
      identity: document.querySelector("#proof-search-cue span").textContent,
      condition: document.querySelector("#proof-search-cue strong").textContent,
      target: document.querySelector("#proof-search-cue a").textContent,
      href: document.querySelector("#proof-search-cue a").getAttribute("href"),
      boundary: document.querySelector("#proof-search-cue small").textContent,
      status: document.querySelector("#proof-search-status").textContent,
      first: document.querySelector(".proof-search__family .proof-search__result a").textContent
    }))()`);
    assert.equal(state.identity, "Navigation cue");
    assert.equal(state.condition, "If you mean geometric size:");
    assert.equal(state.target, "Geometric Measure");
    assert.equal(state.href, "entries/tables-entries-geometric-measure.html");
    assert.match(state.boundary, /not a synonym or classification/);
    assert.match(state.status, /^10 matched records/);
    assert.equal(state.first, "Sampling and Generalization Failure Diagnostic");

    await evaluate(client, `(() => {
      const input = document.querySelector("#proof-search-query");
      input.value = "sample size";
      input.dispatchEvent(new Event("input", { bubbles: true }));
      return true;
    })()`);
    assert.equal(await evaluate(client,
      `document.querySelector("#proof-search-cue").hidden`), true);

    await client.call("Emulation.setDeviceMetricsOverride", {
      width: 390, height: 1000, deviceScaleFactor: 1, mobile: true,
    });
    await evaluate(client, `(() => {
      const input = document.querySelector("#proof-search-query");
      input.value = "how big";
      input.dispatchEvent(new Event("input", { bubbles: true }));
      document.querySelector("#search").scrollIntoView();
      return true;
    })()`);
    const mobile = await evaluate(client, `(() => ({
      visible: !document.querySelector("#proof-search-cue").hidden,
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
    }))()`);
    assert.equal(mobile.visible, true);
    assert.equal(mobile.overflow, false);
    const shot = await client.call("Page.captureScreenshot", {
      format: "png", captureBeyondViewport: false,
    });
    fs.writeFileSync(screenshot, Buffer.from(shot.data, "base64"));
    assert.ok(fs.statSync(screenshot).size > 15000, "screenshot is non-trivial");
    console.log(`OK cue=conditional lexical=unchanged mobile=390 screenshot=${screenshot}`);
  } finally {
    if (client) client.close();
    browser.kill();
  }
})().catch((error) => {
  browser.kill();
  console.error(error.stack || error.message);
  process.exitCode = 1;
});

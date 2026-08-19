"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const {pathToFileURL} = require("node:url");
const {spawn} = require("node:child_process");

const siteRoot = path.resolve(process.argv[2] || "target/proof-set-sim-65");
const screenshot = path.resolve(process.argv[3] || "target/sim65-formarium-reader.png");
assert.equal(
  JSON.parse(fs.readFileSync(path.join(siteRoot, "manifest.json"), "utf8")).edition,
  "sim-65",
);
const edge = [
  process.env.EDGE_PATH,
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
]
  .filter(Boolean)
  .find(fs.existsSync);
assert.ok(edge, "Microsoft Edge executable not found");
const port = 10520 + (process.pid % 40);
const profile = path.resolve(`target/edge-formarium-${process.pid}`);
fs.mkdirSync(profile, {recursive: true});
const url = pathToFileURL(path.join(siteRoot, "reader.html")).href;
const browser = spawn(
  edge,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--no-default-browser-check",
    `--remote-debugging-port=${port}`,
    "--remote-allow-origins=*",
    `--user-data-dir=${profile}`,
    url,
  ],
  {stdio: "ignore", windowsHide: true},
);
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function target() {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    try {
      const pages = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      const page = pages.find((item) => item.type === "page");
      if (page) return page;
    } catch (_) {}
    await delay(100);
  }
  throw new Error("Timed out waiting for Edge");
}

function connect(webSocketUrl) {
  const socket = new WebSocket(webSocketUrl);
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
      socket.addEventListener("open", resolve, {once: true});
      socket.addEventListener("error", reject, {once: true});
    }),
    call(method, params = {}) {
      const id = nextId++;
      return new Promise((resolve, reject) => {
        pending.set(id, {resolve, reject});
        socket.send(JSON.stringify({id, method, params}));
      });
    },
    close() {
      socket.close();
    },
  };
}

async function evaluate(client, expression) {
  const response = await client.call("Runtime.evaluate", {
    expression,
    returnByValue: true,
  });
  if (response.exceptionDetails) throw new Error(response.exceptionDetails.text);
  return response.result.value;
}

(async () => {
  let client;
  try {
    client = connect((await target()).webSocketDebuggerUrl);
    await client.ready;
    await client.call("Runtime.enable");
    await client.call("Page.enable");
    for (
      let attempt = 0;
      attempt < 100 &&
      !(await evaluate(client, "document.readyState === 'complete'"));
      attempt += 1
    ) {
      await delay(60);
    }
    const state = await evaluate(
      client,
      `(() => ({
        brand: document.querySelector(".site-brand").textContent.trim(),
        banner: document.querySelector(".identity-preview").textContent.trim(),
        heading: document.querySelector("h1").textContent.trim(),
        authority: document.querySelector(".reader-route__boundary").textContent.trim(),
        start: document.querySelector('[data-reader-start="sequence"]').getAttribute("href")
      }))()`,
    );
    assert.match(state.brand, /Formarium.*feedback preview/);
    assert.match(state.banner, /public feedback identity/i);
    assert.equal(state.heading, "The Formarium Reader");
    assert.match(state.authority, /compatibility internals/i);
    assert.ok(fs.existsSync(path.join(siteRoot, state.start)));
    await client.call("Emulation.setDeviceMetricsOverride", {
      width: 390,
      height: 1100,
      deviceScaleFactor: 1,
      mobile: true,
    });
    assert.equal(
      await evaluate(
        client,
        "document.documentElement.scrollWidth > document.documentElement.clientWidth",
      ),
      false,
    );
    const shot = await client.call("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: false,
    });
    fs.writeFileSync(screenshot, Buffer.from(shot.data, "base64"));
    assert.ok(fs.statSync(screenshot).size > 15000);
    console.log(
      `OK brand=Formarium heading=Formarium-Reader mobile=390 screenshot=${screenshot}`,
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

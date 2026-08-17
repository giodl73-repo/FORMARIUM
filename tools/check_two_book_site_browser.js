"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { spawn } = require("node:child_process");

const siteRoot = path.resolve(process.argv[2] || "target/proof-set-sim-31");
const screenshotPath = path.resolve(process.argv[3] || "target/sim31-two-book-front-door.png");
const manifest = JSON.parse(fs.readFileSync(path.join(siteRoot, "manifest.json"), "utf8"));
assert.equal(manifest.edition, "sim-31", "browser check requires sim-31");
const edgePath = [
  process.env.EDGE_PATH,
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
].filter(Boolean).find((candidate) => fs.existsSync(candidate));
assert.ok(edgePath, "Microsoft Edge executable not found");

const port = 9990 + (process.pid % 30);
const profile = path.resolve(`target/edge-two-book-profile-${process.pid}`);
assert.ok(profile.startsWith(path.resolve("target") + path.sep));
fs.mkdirSync(profile, { recursive: true });
const browser = spawn(edgePath, [
  "--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check",
  `--remote-debugging-port=${port}`, "--remote-allow-origins=*",
  `--user-data-dir=${profile}`,
  pathToFileURL(path.join(siteRoot, "index.html")).href,
], { stdio: "ignore", windowsHide: true });
const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function browserTarget() {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    try {
      const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      const target = targets.find((item) => item.type === "page" && item.url.includes("index.html"));
      if (target) return target;
    } catch (_) {}
    await delay(100);
  }
  throw new Error("Timed out waiting for Edge two-book page");
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

(async () => {
  let client;
  try {
    client = connect((await browserTarget()).webSocketDebuggerUrl);
    await client.ready;
    await client.call("Runtime.enable");
    await client.call("Page.enable");
    for (let attempt = 0; attempt < 100; attempt += 1) {
      if (await evaluate(client, "document.readyState === 'complete'")) break;
      await delay(50);
    }
    await client.call("Emulation.setDeviceMetricsOverride", {
      width: 1280, height: 1400, deviceScaleFactor: 1, mobile: false,
    });
    const desktop = await evaluate(client, `(() => {
      const cards = [...document.querySelectorAll(".site-book-card")];
      const tables = cards[0].getBoundingClientRect();
      const reader = cards[1].getBoundingClientRect();
      return {
        books: cards.map(card => card.dataset.book),
        actions: cards.map(card => card.querySelectorAll("a").length),
        sameRow: Math.abs(tables.top - reader.top) < 2,
        tablesFirst: tables.left < reader.left,
        nav: [...document.querySelectorAll(".site-nav a")].slice(0, 2).map(node => node.textContent),
        readerFields: document.querySelectorAll("#reader .site-candidate__brief li").length,
        overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
      };
    })()`);
    assert.deepEqual(desktop, {
      books: ["tables", "reader"], actions: [2, 2], sameRow: true,
      tablesFirst: true, nav: ["Tables", "Reader"], readerFields: 6, overflow: false,
    });

    await client.call("Emulation.setDeviceMetricsOverride", {
      width: 390, height: 1800, deviceScaleFactor: 1, mobile: true,
    });
    const mobile = await evaluate(client, `(() => {
      const tables = document.querySelector('[data-book="tables"]').getBoundingClientRect();
      const reader = document.querySelector('[data-book="reader"]').getBoundingClientRect();
      return {
        stacked: reader.top > tables.bottom,
        tablesFirst: tables.top < reader.top,
        overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
        primaryActions: [...document.querySelectorAll(".site-book-card__primary")]
          .map(node => node.textContent)
      };
    })()`);
    assert.deepEqual(mobile, {
      stacked: true, tablesFirst: true, overflow: false,
      primaryActions: ["Search the Tables", "Read the Guide"],
    });
    const shot = await client.call("Page.captureScreenshot", {
      format: "png", captureBeyondViewport: false,
    });
    fs.writeFileSync(screenshotPath, Buffer.from(shot.data, "base64"));
    assert.ok(fs.statSync(screenshotPath).size > 20000, "two-book screenshot is non-trivial");
    console.log(`OK books=2 desktop=two-column mobile=stacked width=390 screenshot=${screenshotPath}`);
  } finally {
    if (client) client.close();
    browser.kill();
  }
})().catch((error) => {
  browser.kill();
  console.error(error.stack || error.message);
  process.exitCode = 1;
});

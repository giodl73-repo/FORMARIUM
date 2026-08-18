"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { spawn } = require("node:child_process");

const siteRoot = path.resolve(process.argv[2] || "target/proof-set-sim-43");
const screenshotPath = path.resolve(process.argv[3] || "target/sim43-intent-router.png");
const manifest = JSON.parse(fs.readFileSync(path.join(siteRoot, "manifest.json"), "utf8"));
assert.ok(["sim-43", "sim-44", "sim-45", "sim-46"].includes(manifest.edition));
const edgePath = [process.env.EDGE_PATH, "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe", "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe"]
  .filter(Boolean).find((candidate) => fs.existsSync(candidate));
assert.ok(edgePath, "Microsoft Edge executable not found");

const port = 9990 + (process.pid % 30);
const profile = path.resolve(`target/edge-intent-router-${process.pid}`);
assert.ok(profile.startsWith(path.resolve("target") + path.sep));
fs.mkdirSync(profile, { recursive: true });
const browser = spawn(edgePath, ["--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check", `--remote-debugging-port=${port}`, "--remote-allow-origins=*", `--user-data-dir=${profile}`, pathToFileURL(path.join(siteRoot, "index.html")).href], { stdio: "ignore", windowsHide: true });
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function target() {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    try {
      const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      const page = targets.find((item) => item.type === "page" && item.url.includes("index.html"));
      if (page) return page;
    } catch (_) {}
    await delay(100);
  }
  throw new Error("Timed out waiting for Edge intent-router page");
}

function connect(url) {
  const socket = new WebSocket(url);
  let nextId = 1;
  const pending = new Map();
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (!message.id || !pending.has(message.id)) return;
    const operation = pending.get(message.id); pending.delete(message.id);
    if (message.error) operation.reject(new Error(message.error.message));
    else operation.resolve(message.result);
  });
  const ready = new Promise((resolve, reject) => { socket.addEventListener("open", resolve, { once: true }); socket.addEventListener("error", reject, { once: true }); });
  return { ready, call(method, params = {}) { const id = nextId++; return new Promise((resolve, reject) => { pending.set(id, { resolve, reject }); socket.send(JSON.stringify({ id, method, params })); }); }, close() { socket.close(); } };
}

async function evaluate(client, expression) {
  const response = await client.call("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
  if (response.exceptionDetails) throw new Error(response.exceptionDetails.text);
  return response.result.value;
}

(async () => {
  let client;
  try {
    client = connect((await target()).webSocketDebuggerUrl); await client.ready;
    await client.call("Runtime.enable"); await client.call("Page.enable");
    for (let attempt = 0; attempt < 100; attempt += 1) { if (await evaluate(client, "document.readyState === 'complete'")) break; await delay(50); }
    await client.call("Emulation.setDeviceMetricsOverride", { width: 1280, height: 1200, deviceScaleFactor: 1, mobile: false });
    const desktop = await evaluate(client, `(() => { const cards=[...document.querySelectorAll('.site-intent article')]; const boxes=cards.map(card=>card.getBoundingClientRect()); return { cards:cards.length, labels:cards.map(card=>card.querySelector('h3').textContent), sameRow:boxes.every(box=>Math.abs(box.top-boxes[0].top)<2), beforeLibrary:document.querySelector('#choose').compareDocumentPosition(document.querySelector('#library'))===Node.DOCUMENT_POSITION_FOLLOWING, overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth }; })()`);
    assert.deepEqual(desktop, { cards: 3, labels: ["I know the term", "I have a question", "I want to learn or explore"], sameRow: true, beforeLibrary: true, overflow: false });
    await client.call("Emulation.setDeviceMetricsOverride", { width: 390, height: 1600, deviceScaleFactor: 1, mobile: true });
    const mobile = await evaluate(client, `(() => { const boxes=[...document.querySelectorAll('.site-intent article')].map(card=>card.getBoundingClientRect()); return { stacked:boxes[1].top>boxes[0].bottom&&boxes[2].top>boxes[1].bottom, overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth, links:[...document.querySelectorAll('.site-intent article>a')].map(link=>link.getAttribute('href')) }; })()`);
    assert.deepEqual(mobile, { stacked: true, overflow: false, links: ["#search", "compose.html", "reader.html"] });
    const shot = await client.call("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
    fs.writeFileSync(screenshotPath, Buffer.from(shot.data, "base64"));
    assert.ok(fs.statSync(screenshotPath).size > 20000);
    console.log(`OK edition=${manifest.edition} intent-router=3 desktop=row mobile=stacked width=390 screenshot=${screenshotPath}`);
  } finally { if (client) client.close(); browser.kill(); }
})().catch((error) => { browser.kill(); console.error(error.stack || error.message); process.exitCode = 1; });

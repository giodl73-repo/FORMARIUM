"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { spawn } = require("node:child_process");

const siteRoot = path.resolve(process.argv[2] || "target/proof-set-sim-46");
const screenshotPath = path.resolve(process.argv[3] || "target/sim46-reciprocal-connections.png");
const manifest = JSON.parse(fs.readFileSync(path.join(siteRoot, "manifest.json"), "utf8"));
assert.equal(manifest.edition, "sim-46");
const edgePath = [process.env.EDGE_PATH, "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe", "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe"]
  .filter(Boolean).find((candidate) => fs.existsSync(candidate));
assert.ok(edgePath, "Microsoft Edge executable not found");

const workUrl = pathToFileURL(path.join(siteRoot, "entries", "tables-entries-coordinated-work.html")).href;
const identityUrl = pathToFileURL(path.join(siteRoot, "entries", "tables-entries-identity-naming-classification-versioning.html")).href;
const port = 10020 + (process.pid % 30);
const profile = path.resolve(`target/edge-reciprocal-connections-${process.pid}`);
assert.ok(profile.startsWith(path.resolve("target") + path.sep));
fs.mkdirSync(profile, { recursive: true });
const browser = spawn(edgePath, ["--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check", `--remote-debugging-port=${port}`, "--remote-allow-origins=*", `--user-data-dir=${profile}`, workUrl], { stdio: "ignore", windowsHide: true });
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function target() {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    try {
      const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      const page = targets.find((item) => item.type === "page" && item.url.includes("coordinated-work"));
      if (page) return page;
    } catch (_) {}
    await delay(100);
  }
  throw new Error("Timed out waiting for Edge reciprocal-connection page");
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

async function waitForPage(client, titleFragment) {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    if (await evaluate(client, `document.readyState === "complete" && document.title.includes(${JSON.stringify(titleFragment)})`)) return;
    await delay(50);
  }
  throw new Error(`Timed out waiting for ${titleFragment}`);
}

async function inspect(client, expectedText) {
  return evaluate(client, `(() => {
    const area = document.querySelector('.table-navigator__connections');
    const links = area ? [...area.querySelectorAll('a')] : [];
    const link = links.find((item) => item.textContent.replace(/\\s+/g, ' ').trim() === ${JSON.stringify(expectedText)});
    const boundary = document.querySelector('.table-navigator__boundary');
    return { found: Boolean(link), href: link && link.getAttribute('href'), inPreview: links.indexOf(link) >= 0 && links.indexOf(link) < 6, boundary: Boolean(boundary), overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth };
  })()`);
}

(async () => {
  let client;
  try {
    client = connect((await target()).webSocketDebuggerUrl); await client.ready;
    await client.call("Runtime.enable"); await client.call("Page.enable");
    await client.call("Emulation.setDeviceMetricsOverride", { width: 390, height: 1600, deviceScaleFactor: 1, mobile: true });
    await waitForPage(client, "Coordinated Work");
    const work = await inspect(client, "Operational Resource, Capacity, Demand, and Allocation");
    assert.deepEqual(work, { found: true, href: "tables-entries-operational-resource-capacity-demand.html#tables__entries__operational-resource-capacity-demandmd__operational-resource-capacity-demand-and-allocation", inPreview: true, boundary: true, overflow: false });
    await client.call("Page.navigate", { url: identityUrl });
    await waitForPage(client, "Identity, Naming");
    const identity = await inspect(client, "Access, Permission, Authorization, and Entitlement");
    assert.deepEqual(identity, { found: true, href: "tables-entries-access-permission-authorization-entitlement.html#tables__entries__access-permission-authorization-entitlementmd__access-permission-authorization-and-entitlement", inPreview: true, boundary: true, overflow: false });
    const shot = await client.call("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
    fs.writeFileSync(screenshotPath, Buffer.from(shot.data, "base64"));
    assert.ok(fs.statSync(screenshotPath).size > 20000);
    console.log(`OK edition=${manifest.edition} reciprocal-previews=2 viewport=390 overflow=0 semantics=untyped screenshot=${screenshotPath}`);
  } finally { if (client) client.close(); browser.kill(); }
})().catch((error) => { browser.kill(); console.error(error.stack || error.message); process.exitCode = 1; });

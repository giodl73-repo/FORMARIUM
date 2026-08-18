"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const {pathToFileURL} = require("node:url");
const {spawn} = require("node:child_process");

const siteRoot = path.resolve(process.argv[2] || "target/proof-set-sim-52");
const screenshot = path.resolve(process.argv[3] || "target/sim52-actor-pointer.png");
const expectedEdition = process.argv[4] || "sim-52";
assert.equal(JSON.parse(fs.readFileSync(path.join(siteRoot, "manifest.json"), "utf8")).edition, expectedEdition);
const edge = [process.env.EDGE_PATH, "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe", "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe"].filter(Boolean).find(fs.existsSync);
assert.ok(edge, "Microsoft Edge executable not found");
const port = 10480 + (process.pid % 40);
const profile = path.resolve(`target/edge-pointer-${process.pid}`);
fs.mkdirSync(profile, {recursive: true});
const url = pathToFileURL(path.join(siteRoot, "entries", "tables-roots-agency.html")).href;
const browser = spawn(edge, ["--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check", `--remote-debugging-port=${port}`, "--remote-allow-origins=*", `--user-data-dir=${profile}`, url], {stdio: "ignore", windowsHide: true});
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function target() {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    try { const pages = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); const page = pages.find((item) => item.type === "page" && item.url.includes("tables-roots-agency.html")); if (page) return page; } catch (_) {}
    await delay(100);
  }
  throw new Error("Timed out waiting for Edge");
}
function connect(webSocketUrl) {
  const socket = new WebSocket(webSocketUrl); let nextId = 1; const pending = new Map();
  socket.addEventListener("message", (event) => { const message = JSON.parse(event.data); if (!message.id || !pending.has(message.id)) return; const operation = pending.get(message.id); pending.delete(message.id); if (message.error) operation.reject(new Error(message.error.message)); else operation.resolve(message.result); });
  return {ready: new Promise((resolve, reject) => { socket.addEventListener("open", resolve, {once: true}); socket.addEventListener("error", reject, {once: true}); }), call(method, params = {}) { const id = nextId++; return new Promise((resolve, reject) => { pending.set(id, {resolve, reject}); socket.send(JSON.stringify({id, method, params})); }); }, close() { socket.close(); }};
}
async function evaluate(client, expression) { const response = await client.call("Runtime.evaluate", {expression, returnByValue: true}); if (response.exceptionDetails) throw new Error((response.exceptionDetails.exception && response.exceptionDetails.exception.description) || response.exceptionDetails.text); return response.result.value; }
async function waitFor(client, expression, message) { for (let attempt = 0; attempt < 100; attempt += 1) { if (await evaluate(client, expression)) return; await delay(60); } throw new Error(message); }

(async () => {
  let client;
  try {
    client = connect((await target()).webSocketDebuggerUrl); await client.ready; await client.call("Runtime.enable"); await client.call("Page.enable");
    await waitFor(client, "document.readyState === 'complete'", "Agency did not load");
    const agency = await evaluate(client, `(() => ({url:location.href,heading:document.querySelector('h1').textContent.trim(),pointerCount:document.querySelectorAll('.pointer-link').length,actor:document.querySelector('.pointer-link')&&document.querySelector('.pointer-link').textContent,terms:Array.from(document.querySelectorAll('code .pointer-link')).map(a=>a.textContent)}))()`);
    assert.equal(agency.heading, "Agency");
    assert.equal(agency.pointerCount, 4, agency.url);
    assert.equal(agency.actor, "actor");
    assert.deepEqual(agency.terms, ["actor", "capability", "authority", "context"]);
    await evaluate(client, `document.querySelector('.pointer-link').click()`);
    await waitFor(client, "document.querySelector('h1') && document.querySelector('h1').textContent.trim() === 'Actor'", "Actor pointer did not load");
    const actor = await evaluate(client, `(() => ({owners:document.querySelectorAll('.pointer-owner').length,boundary:document.querySelector('.pointer-page__boundary').textContent,paths:Array.from(document.querySelectorAll('.pointer-owner')).map(x=>x.dataset.sourcePath),back:Array.from(document.querySelectorAll('.pointer-owner')).find(x=>x.dataset.sourcePath==='tables/roots/agency.md').querySelector('h2 a').getAttribute('href')}))()`);
    assert.equal(actor.owners, 3);
    assert.match(actor.boundary, /Pointer, not canonical entry/);
    assert.ok(actor.paths.includes("tables/roots/agency.md"));
    assert.match(actor.back, /tables-roots-agency\.html/);
    await client.call("Emulation.setDeviceMetricsOverride", {width: 390, height: 1100, deviceScaleFactor: 1, mobile: true});
    assert.equal(await evaluate(client, "document.documentElement.scrollWidth > document.documentElement.clientWidth"), false);
    const shot = await client.call("Page.captureScreenshot", {format: "png", captureBeyondViewport: false});
    fs.writeFileSync(screenshot, Buffer.from(shot.data, "base64"));
    assert.ok(fs.statSync(screenshot).size > 15000);
    console.log(`OK agency->actor owners=3 mobile=390 screenshot=${screenshot}`);
  } finally { if (client) client.close(); browser.kill(); }
})().catch((error) => { browser.kill(); console.error(error.stack || error.message); process.exitCode = 1; });

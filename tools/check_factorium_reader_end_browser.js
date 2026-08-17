"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { spawn } = require("node:child_process");

const root = path.resolve(process.argv[2] || "target/proof-set-sim-39");
const screenshot = path.resolve(process.argv[3] || "target/sim39-factorium-reader-end.png");
const records = JSON.parse(fs.readFileSync(path.join(root, "search-index.json"), "utf8"));
const last = records.find((record) => record.path === "tables/evidence/change-lineage.md");
const edge = [process.env.EDGE_PATH,
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe"]
  .filter(Boolean).find(fs.existsSync);
assert.ok(edge && last);
const port = 10230 + (process.pid % 30);
const profile = path.resolve(`target/edge-reader-end-profile-${process.pid}`);
fs.mkdirSync(profile, { recursive: true });
const url = pathToFileURL(path.join(root, last.href)).href;
const browser = spawn(edge, ["--headless=new", "--disable-gpu", "--no-first-run",
  `--remote-debugging-port=${port}`, "--remote-allow-origins=*",
  `--user-data-dir=${profile}`, url], { stdio: "ignore", windowsHide: true });
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function target() {
  for (let i = 0; i < 100; i++) { try {
    const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
    const page = list.find((item) => item.type === "page"); if (page) return page;
  } catch (_) {} await delay(100); } throw new Error("Edge timeout");
}
function connect(ws) {
  const socket = new WebSocket(ws); let id = 1; const pending = new Map();
  socket.onmessage = (event) => { const message = JSON.parse(event.data);
    if (!pending.has(message.id)) return; const op = pending.get(message.id); pending.delete(message.id);
    message.error ? op.reject(new Error(message.error.message)) : op.resolve(message.result); };
  const ready = new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
  return { ready, call(method, params = {}) { const callId = id++; return new Promise((resolve, reject) => {
    pending.set(callId, { resolve, reject }); socket.send(JSON.stringify({ id: callId, method, params })); }); },
  close() { socket.close(); } };
}
async function evalIn(client, expression) {
  const result = await client.call("Runtime.evaluate", { expression, returnByValue: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text); return result.result.value;
}
async function waitFor(client, expression) {
  for (let i = 0; i < 100; i++) { if (await evalIn(client, expression)) return; await delay(60); }
  throw new Error(`Timeout: ${expression}`);
}
(async () => { let client; try {
  client = connect((await target()).webSocketDebuggerUrl); await client.ready;
  await client.call("Runtime.enable"); await client.call("Page.enable");
  await client.call("Page.navigate", { url }); await waitFor(client, `document.querySelector('[data-reader-direction="finish"]')`);
  const state = await evalIn(client, `(() => ({step:document.querySelector('.reader-sequence').dataset.readerStep,
    finish:document.querySelector('[data-reader-direction="finish"]').textContent,
    next:document.querySelector('[data-reader-direction="next"]')}))()`);
  assert.equal(state.step, "24"); assert.match(state.finish, /^End of selected route/); assert.equal(state.next, null);
  await evalIn(client, `document.querySelector('[data-reader-direction="finish"]').click(); true`);
  await waitFor(client, `location.hash === '#reader-route-after-heading'`);
  const heading = await evalIn(client, `document.querySelector('#reader-route-after-heading').textContent`);
  assert.equal(heading, "Branch only when the question requires it");
  await client.call("Emulation.setDeviceMetricsOverride", { width: 390, height: 1000, deviceScaleFactor: 1, mobile: true });
  assert.equal(await evalIn(client, `document.documentElement.scrollWidth > document.documentElement.clientWidth`), false);
  const shot = await client.call("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(screenshot, Buffer.from(shot.data, "base64")); assert.ok(fs.statSync(screenshot).size > 20000);
  console.log(`OK finish=step-24 arrival=after-route mobile=390 screenshot=${screenshot}`);
} finally { if (client) client.close(); browser.kill(); } })().catch((error) => {
  browser.kill(); console.error(error.stack || error); process.exitCode = 1;
});

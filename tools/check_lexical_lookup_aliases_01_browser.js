"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { spawn } = require("node:child_process");

const root = path.resolve(process.argv[2] || "target/proof-set-sim-47");
const screenshot = path.resolve(process.argv[3] || "target/sim47-lookup-aliases.png");
const edge = [process.env.EDGE_PATH, "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe", "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe"].filter(Boolean).find(fs.existsSync);
assert.ok(edge, "Microsoft Edge executable not found");
const port = 10200 + (process.pid % 30);
const profile = path.resolve(`target/edge-lookup-alias-profile-${process.pid}`);
fs.mkdirSync(profile, { recursive: true });
const url = pathToFileURL(path.join(root, "index.html")).href + "#search";
const browser = spawn(edge, ["--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check", `--remote-debugging-port=${port}`, "--remote-allow-origins=*", `--user-data-dir=${profile}`, url], { stdio: "ignore", windowsHide: true });
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
  const socket = new WebSocket(urlValue); let nextId = 1; const pending = new Map();
  socket.addEventListener("message", (event) => { const message = JSON.parse(event.data); if (!message.id || !pending.has(message.id)) return; const op = pending.get(message.id); pending.delete(message.id); if (message.error) op.reject(new Error(message.error.message)); else op.resolve(message.result); });
  return { ready: new Promise((resolve, reject) => { socket.addEventListener("open", resolve, { once: true }); socket.addEventListener("error", reject, { once: true }); }), call(method, params = {}) { const id = nextId++; return new Promise((resolve, reject) => { pending.set(id, { resolve, reject }); socket.send(JSON.stringify({ id, method, params })); }); }, close() { socket.close(); } };
}
async function evaluate(client, expression) { const response = await client.call("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true }); if (response.exceptionDetails) throw new Error(response.exceptionDetails.text); return response.result.value; }
async function waitFor(client, expression, message) { for (let attempt = 0; attempt < 100; attempt += 1) { if (await evaluate(client, expression)) return; await delay(60); } throw new Error(message); }

(async () => {
  let client;
  try {
    client = connect((await target()).webSocketDebuggerUrl); await client.ready; await client.call("Runtime.enable"); await client.call("Page.enable");
    await waitFor(client, "document.readyState === 'complete'", "page did not load");
    await evaluate(client, `(() => { const input=document.querySelector("#proof-search-query"); input.value="field of force"; input.dispatchEvent(new Event("input",{bubbles:true})); return true; })()`);
    await waitFor(client, `!document.querySelector("#proof-search-alias").hidden`, "alias did not appear");
    const state = await evaluate(client, `(() => { const panel=document.querySelector("#proof-search-alias"); return { identity:panel.querySelector("span").textContent, titles:Array.from(panel.querySelectorAll("a"),a=>a.textContent), hrefs:Array.from(panel.querySelectorAll("a"),a=>a.getAttribute("href")), boundary:panel.querySelector("small").textContent }; })()`);
    assert.equal(state.identity, "Lookup alias");
    assert.deepEqual(state.titles, ["Electrical Quantity", "Matter and Load Measure"]);
    assert.deepEqual(state.hrefs, ["entries/tables-entries-electrical-quantity.html", "entries/tables-entries-matter-load-measure.html"]);
    assert.match(state.boundary, /not a new concept, equivalence, classification, or semantic closure/);
    await evaluate(client, `(() => { const input=document.querySelector("#proof-search-query"); input.value="the force field"; input.dispatchEvent(new Event("input",{bubbles:true})); return true; })()`);
    assert.equal(await evaluate(client, `document.querySelector("#proof-search-alias").hidden`), true);
    await client.call("Emulation.setDeviceMetricsOverride", { width: 390, height: 1000, deviceScaleFactor: 1, mobile: true });
    await evaluate(client, `(() => { const input=document.querySelector("#proof-search-query"); input.value="frame of reference"; input.dispatchEvent(new Event("input",{bubbles:true})); document.querySelector("#search").scrollIntoView(); return true; })()`);
    const mobile = await evaluate(client, `(() => ({ visible:!document.querySelector("#proof-search-alias").hidden, links:document.querySelectorAll("#proof-search-alias a").length, overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth }))()`);
    assert.deepEqual(mobile, { visible: true, links: 1, overflow: false });
    const shot = await client.call("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
    fs.writeFileSync(screenshot, Buffer.from(shot.data, "base64"));
    assert.ok(fs.statSync(screenshot).size > 15000);
    console.log(`OK aliases=5 ambiguous=2 mobile=390 screenshot=${screenshot}`);
  } finally { if (client) client.close(); browser.kill(); }
})().catch((error) => { browser.kill(); console.error(error.stack || error.message); process.exitCode = 1; });

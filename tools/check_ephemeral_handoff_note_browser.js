"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { spawn } = require("node:child_process");

const siteRoot = path.resolve(process.argv[2] || "target/proof-set-sim-44");
const screenshotPath = path.resolve(process.argv[3] || "target/sim44-handoff-note.png");
const manifest = JSON.parse(fs.readFileSync(path.join(siteRoot, "manifest.json"), "utf8"));
assert.equal(manifest.edition, "sim-44");
const edgePath = [process.env.EDGE_PATH, "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe", "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe"].filter(Boolean).find((candidate) => fs.existsSync(candidate));
assert.ok(edgePath, "Microsoft Edge executable not found");
const port = 9990 + (process.pid % 30);
const profile = path.resolve(`target/edge-handoff-check-${process.pid}`);
assert.ok(profile.startsWith(path.resolve("target") + path.sep));
fs.mkdirSync(profile, { recursive: true });
const pageUrl = pathToFileURL(path.join(siteRoot, "entries", "tables-entries-comparative-quantity.html")).href;
const browser = spawn(edgePath, ["--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check", `--remote-debugging-port=${port}`, "--remote-allow-origins=*", `--user-data-dir=${profile}`, pageUrl], { stdio: "ignore", windowsHide: true });
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function target() { for (let i = 0; i < 100; i += 1) { try { const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); const page = targets.find((item) => item.type === "page" && item.url.includes("comparative-quantity")); if (page) return page; } catch (_) {} await delay(100); } throw new Error("Timed out waiting for handoff page"); }
function connect(url) { const socket = new WebSocket(url); let nextId = 1; const pending = new Map(); socket.addEventListener("message", (event) => { const message = JSON.parse(event.data); if (!message.id || !pending.has(message.id)) return; const operation = pending.get(message.id); pending.delete(message.id); if (message.error) operation.reject(new Error(message.error.message)); else operation.resolve(message.result); }); const ready = new Promise((resolve, reject) => { socket.addEventListener("open", resolve, { once: true }); socket.addEventListener("error", reject, { once: true }); }); return { ready, call(method, params = {}) { const id = nextId++; return new Promise((resolve, reject) => { pending.set(id, { resolve, reject }); socket.send(JSON.stringify({ id, method, params })); }); }, close() { socket.close(); } }; }
async function evaluate(client, expression) { const response = await client.call("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true }); if (response.exceptionDetails) throw new Error(response.exceptionDetails.text); return response.result.value; }

(async () => {
  let client;
  try {
    client = connect((await target()).webSocketDebuggerUrl); await client.ready; await client.call("Runtime.enable"); await client.call("Page.enable");
    for (let i = 0; i < 100; i += 1) { if (await evaluate(client, "document.readyState === 'complete'")) break; await delay(50); }
    await client.call("Emulation.setDeviceMetricsOverride", { width: 390, height: 1200, deviceScaleFactor: 1, mobile: true });
    const initial = await evaluate(client, `(() => { const section=document.querySelector('[data-factorium-handoff]'); section.scrollIntoView(); const rect=section.getBoundingClientRect(); return { sections:document.querySelectorAll('[data-factorium-handoff]').length, fields:section.querySelectorAll('textarea,input').length, buttons:section.querySelectorAll('button').length, values:[...section.querySelectorAll('textarea,input')].map(field=>field.value), page:section.querySelector('[data-handoff-page]').textContent, display:getComputedStyle(section).display, height:rect.height, ancestors:[...function*(){let node=section; while(node){yield {tag:node.tagName, className:node.className, hidden:node.hidden, display:getComputedStyle(node).display, height:node.getBoundingClientRect().height}; node=node.parentElement;}}()], overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth }; })()`);
    assert.equal(initial.sections, 1); assert.equal(initial.fields, 3); assert.equal(initial.buttons, 3); assert.deepEqual(initial.values, ["", "", ""]); assert.match(initial.page, /Comparative Quantity/); assert.notEqual(initial.display, "none"); assert.ok(initial.height > 300, JSON.stringify(initial)); assert.equal(initial.overflow, false);
    const cleared = await evaluate(client, `(() => { const section=document.querySelector('[data-factorium-handoff]'); section.querySelector('[data-handoff-question]').value='Five percent of what?'; section.querySelector('[data-handoff-unresolved]').value='The denominator basis'; section.querySelector('[data-handoff-source]').value='Product label'; section.querySelector('[data-handoff-clear]').click(); return { values:[...section.querySelectorAll('textarea,input')].map(field=>field.value), status:section.querySelector('[data-handoff-status]').textContent }; })()`);
    assert.deepEqual(cleared, { values: ["", "", ""], status: "Cleared. Nothing is saved." });
    const scroll = await evaluate(client, `(() => { const section=document.querySelector('[data-factorium-handoff]'); section.scrollIntoView({block:'start'}); return { pageTop:visualViewport.pageTop, top:section.getBoundingClientRect().top }; })()`);
    assert.ok(scroll.pageTop > 0, JSON.stringify(scroll)); assert.ok(scroll.top < 80, JSON.stringify(scroll)); await delay(100);
    const shot = await client.call("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip: { x:0, y:scroll.pageTop, width:390, height:1200, scale:1 } }); fs.writeFileSync(screenshotPath, Buffer.from(shot.data, "base64")); assert.ok(fs.statSync(screenshotPath).size > 10000);
    console.log(`OK edition=sim-44 handoff=1 fields=3 actions=3 clear=pass mobile-overflow=false screenshot=${screenshotPath}`);
  } finally { if (client) client.close(); browser.kill(); }
})().catch((error) => { browser.kill(); console.error(error.stack || error.message); process.exitCode = 1; });

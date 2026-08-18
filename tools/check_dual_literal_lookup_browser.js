"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { spawn } = require("node:child_process");

const siteRoot = path.resolve(process.argv[2] || "target/proof-set-sim-45");
const screenshotPath = path.resolve(process.argv[3] || "target/sim45-dual-lookup.png");
const baseline = JSON.parse(fs.readFileSync(path.resolve("fixtures/synthetic-users/dual-lookup-baseline-06.json"), "utf8"));
const expected = baseline.results.find((row) => row.assignment_id === "SUJ-06-04");
const manifest = JSON.parse(fs.readFileSync(path.join(siteRoot, "manifest.json"), "utf8"));
assert.ok(["sim-45", "sim-46"].includes(manifest.edition));
const edgePath = [process.env.EDGE_PATH, "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe", "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe"].filter(Boolean).find((candidate) => fs.existsSync(candidate));
assert.ok(edgePath, "Microsoft Edge executable not found");
const port = 9990 + (process.pid % 30);
const profile = path.resolve(`target/edge-dual-lookup-${process.pid}`);
assert.ok(profile.startsWith(path.resolve("target") + path.sep));
fs.mkdirSync(profile, { recursive: true });
const browser = spawn(edgePath, ["--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check", `--remote-debugging-port=${port}`, "--remote-allow-origins=*", `--user-data-dir=${profile}`, pathToFileURL(path.join(siteRoot, "index.html")).href], { stdio: "ignore", windowsHide: true });
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function target() { for (let i = 0; i < 100; i += 1) { try { const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); const page = targets.find((item) => item.type === "page"); if (page) return page; } catch (_) {} await delay(100); } throw new Error("Timed out waiting for dual lookup page"); }
function connect(url) { const socket = new WebSocket(url); let nextId = 1; const pending = new Map(); socket.addEventListener("message", (event) => { const message = JSON.parse(event.data); if (!message.id || !pending.has(message.id)) return; const operation = pending.get(message.id); pending.delete(message.id); if (message.error) operation.reject(new Error(message.error.message)); else operation.resolve(message.result); }); const ready = new Promise((resolve, reject) => { socket.addEventListener("open", resolve, { once: true }); socket.addEventListener("error", reject, { once: true }); }); return { ready, call(method, params = {}) { const id = nextId++; return new Promise((resolve, reject) => { pending.set(id, { resolve, reject }); socket.send(JSON.stringify({ id, method, params })); }); }, close() { socket.close(); } }; }
async function evaluate(client, expression) { const response = await client.call("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true }); if (response.exceptionDetails) throw new Error(response.exceptionDetails.text); return response.result.value; }

(async () => {
  let client;
  try {
    client = connect((await target()).webSocketDebuggerUrl); await client.ready; await client.call("Runtime.enable"); await client.call("Page.enable");
    for (let i = 0; i < 100; i += 1) { if (await evaluate(client, "document.readyState === 'complete'")) break; await delay(50); }
    await client.call("Emulation.setDeviceMetricsOverride", { width: 390, height: 1200, deviceScaleFactor: 1, mobile: true });
    const observed = await evaluate(client, `(() => { const one=${JSON.stringify(expected.lists[0].query)}; const two=${JSON.stringify(expected.lists[1].query)}; document.querySelector('#dual-lookup-query-one').value=one; document.querySelector('#dual-lookup-query-two').value=two; document.querySelector('#dual-lookup-form').requestSubmit(); const section=document.querySelector('#compare-searches'); const rect=section.getBoundingClientRect(); return { one:[...document.querySelectorAll('#dual-lookup-results-one [data-family-key]')].map(node=>node.dataset.familyKey), two:[...document.querySelectorAll('#dual-lookup-results-two [data-family-key]')].map(node=>node.dataset.familyKey), comparison:[...document.querySelectorAll('#dual-lookup-comparison [data-family-key]')].map(node=>node.dataset.familyKey), status:document.querySelector('#dual-lookup-status').textContent, columns:getComputedStyle(document.querySelector('.dual-lookup__panels')).gridTemplateColumns, overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth, clip:{x:0,y:rect.top,width:390,height:Math.min(1200,rect.height),scale:1} }; })()`);
    assert.deepEqual(observed.one, expected.lists[0].families.map((family) => family.key));
    assert.deepEqual(observed.two, expected.lists[1].families.map((family) => family.key));
    assert.equal(observed.comparison.length, expected.union_family_count);
    assert.match(observed.status, /No rank, relation, or closure is merged/);
    assert.equal(observed.columns.split(" ").length, 1);
    assert.equal(observed.overflow, false);
    const shot = await client.call("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip: observed.clip }); fs.writeFileSync(screenshotPath, Buffer.from(shot.data, "base64")); assert.ok(fs.statSync(screenshotPath).size > 15000);
    const cleared = await evaluate(client, `(() => { document.querySelector('#dual-lookup-clear').click(); return { values:[document.querySelector('#dual-lookup-query-one').value,document.querySelector('#dual-lookup-query-two').value], one:document.querySelector('#dual-lookup-results-one').children.length, two:document.querySelector('#dual-lookup-results-two').children.length, comparison:document.querySelector('#dual-lookup-comparison').children.length, status:document.querySelector('#dual-lookup-status').textContent }; })()`);
    assert.deepEqual(cleared, { values: ["", ""], one: 0, two: 0, comparison: 0, status: "Cleared. No query or comparison is saved." });
    console.log(`OK edition=${manifest.edition} dual-lookup=1 lists=10+10 union=${observed.comparison.length} mobile=stacked overflow=false clear=pass screenshot=${screenshotPath}`);
  } finally { if (client) client.close(); browser.kill(); }
})().catch((error) => { browser.kill(); console.error(error.stack || error.message); process.exitCode = 1; });

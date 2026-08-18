"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { spawn } = require("node:child_process");

const siteRoot = path.resolve(process.argv[2] || "target/proof-set-sim-49");
const screenshot = path.resolve(process.argv[3] || "target/sim49-meaning-custody-search.png");
assert.equal(JSON.parse(fs.readFileSync(path.join(siteRoot, "manifest.json"), "utf8")).edition, "sim-49");
const edge = [process.env.EDGE_PATH,
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe"]
  .filter(Boolean).find(fs.existsSync);
assert.ok(edge, "Microsoft Edge executable not found");
const port = 10300 + (process.pid % 40);
const profile = path.resolve(`target/edge-gpc09-v1-${process.pid}`);
fs.mkdirSync(profile, { recursive: true });
const url = pathToFileURL(path.join(siteRoot, "index.html")).href + "#search";
const browser = spawn(edge, ["--headless=new", "--disable-gpu", "--no-first-run",
  "--no-default-browser-check", `--remote-debugging-port=${port}`,
  "--remote-allow-origins=*", `--user-data-dir=${profile}`, url],
{ stdio: "ignore", windowsHide: true });
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
    const operation = pending.get(message.id); pending.delete(message.id);
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
    close() { socket.close(); }
  };
}

async function evaluate(client, expression) {
  const response = await client.call("Runtime.evaluate", {
    expression, awaitPromise: true, returnByValue: true
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

async function query(client, value) {
  await evaluate(client, `(() => { const input=document.querySelector("#proof-search-query"); input.value=${JSON.stringify(value)}; input.dispatchEvent(new Event("input",{bubbles:true})); return true; })()`);
  await waitFor(client, `document.querySelectorAll(".proof-search__result").length > 0`, `no results for ${value}`);
  return evaluate(client, `(() => ({ owner:document.querySelector(".proof-search__family-heading a").textContent, titles:[...document.querySelectorAll(".proof-search__result a")].map(a=>a.textContent), hrefs:[...document.querySelectorAll(".proof-search__result a")].map(a=>a.getAttribute("href")) }))()`);
}

(async () => {
  let client;
  try {
    client = connect((await target()).webSocketDebuggerUrl); await client.ready;
    await client.call("Runtime.enable"); await client.call("Page.enable");
    await waitFor(client, "document.readyState === 'complete'", "site did not load");
    const epistemic = await query(client, "warrant defeaters standing");
    assert.equal(epistemic.owner, "Claim and Evidence");
    assert.ok(epistemic.titles.includes("Epistemic Standing, Inquiry, and Warrant"));
    const custody = await query(client, "authority to share consent restriction");
    assert.equal(custody.owner, "Claim and Evidence");
    assert.ok(custody.titles.includes("Source, Performance, and Research Custody"));
    const meaning = await query(client, "meaning interpretation translation");
    assert.equal(meaning.owner, "Meaning, Reference, Interpretation, and Use");
    assert.ok(meaning.titles.includes("Meaning, Reference, Interpretation, and Use"));
    for (const href of [...epistemic.hrefs, ...custody.hrefs, ...meaning.hrefs])
      assert.ok(fs.existsSync(path.join(siteRoot, href)), `search target exists: ${href}`);
    await client.call("Emulation.setDeviceMetricsOverride", {
      width: 390, height: 1100, deviceScaleFactor: 1, mobile: true
    });
    const mobile = await evaluate(client, `(() => ({ overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth, profile:document.documentElement.dataset.readerProfile || document.body.dataset.readerProfile || "book", results:document.querySelectorAll(".proof-search__result").length }))()`);
    assert.equal(mobile.overflow, false);
    assert.ok(mobile.results > 0);
    await evaluate(client, `document.querySelector("#search").scrollIntoView(); true`);
    const shot = await client.call("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
    fs.writeFileSync(screenshot, Buffer.from(shot.data, "base64"));
    assert.ok(fs.statSync(screenshot).size > 15000);
    console.log(`OK queries=3 owners=2 mobile=390 screenshot=${screenshot}`);
  } finally {
    if (client) client.close();
    browser.kill();
  }
})().catch((error) => { browser.kill(); console.error(error.stack || error.message); process.exitCode = 1; });

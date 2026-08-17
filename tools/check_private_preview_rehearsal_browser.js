"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { spawn } = require("node:child_process");

const root = path.resolve(__dirname, "..");
const siteRoot = path.join(root, "target", "proof-set-sim-42");
const outputPath = path.join(root, "fixtures", "private-preview-rehearsal", "browser-01.json");
const manifest = JSON.parse(fs.readFileSync(path.join(siteRoot, "manifest.json"), "utf8"));
assert.equal(manifest.edition, "sim-42");
assert.equal(manifest.source_commit, "531dea50dafeaf47e4909dbf8b7be93dac3d3021");

const edgePath = [
  process.env.EDGE_PATH,
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
].filter(Boolean).find((candidate) => fs.existsSync(candidate));
assert.ok(edgePath, "Microsoft Edge executable not found");

const port = 10220 + (process.pid % 30);
const profile = path.join(root, "target", `edge-private-preview-${process.pid}`);
assert.ok(profile.startsWith(path.join(root, "target") + path.sep));
fs.mkdirSync(profile, { recursive: true });
const browser = spawn(edgePath, [
  "--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check",
  `--remote-debugging-port=${port}`, "--remote-allow-origins=*",
  `--user-data-dir=${profile}`, pathToFileURL(path.join(siteRoot, "index.html")).href,
], { stdio: "ignore", windowsHide: true });
const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function browserTarget() {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    try {
      const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      const target = targets.find((item) => item.type === "page");
      if (target) return target;
    } catch (_) {}
    await delay(100);
  }
  throw new Error("Timed out waiting for Edge");
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
  const response = await client.call("Runtime.evaluate", { expression, returnByValue: true });
  if (response.exceptionDetails) throw new Error(response.exceptionDetails.text);
  return response.result.value;
}

(async () => {
  let client;
  try {
    const target = await browserTarget();
    client = connect(target.webSocketDebuggerUrl);
    await client.ready;
    await client.call("Runtime.enable");
    await client.call("Page.enable");
    await client.call("Emulation.setDeviceMetricsOverride", {
      width: 390, height: 844, deviceScaleFactor: 1, mobile: true,
    });
    await delay(250);
    const home = await evaluate(client, `({
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      tables: Boolean(document.querySelector('[data-book="tables"] a[href="#search"]')),
      reader: Boolean(document.querySelector('[data-book="reader"] a[href="reader.html"]')),
      authority: document.body.textContent.includes('The Tables define and distinguish.'),
      readerBeforeProblems: document.querySelector('#reader').compareDocumentPosition(document.querySelector('#problems')) === Node.DOCUMENT_POSITION_FOLLOWING
    })`);
    await client.call("Page.navigate", { url: pathToFileURL(path.join(siteRoot, "reader.html")).href });
    await delay(400);
    const reader = await evaluate(client, `({
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      records: document.querySelectorAll('[data-reader-path]').length,
      first: document.querySelector('[data-reader-path]')?.getAttribute('data-reader-path'),
      last: [...document.querySelectorAll('[data-reader-path]')].at(-1)?.getAttribute('data-reader-path'),
      boundary: document.body.textContent.includes('other 151 records') && document.body.textContent.includes('Tables remain authoritative')
    })`);
    assert.deepEqual(home, { overflow: false, tables: true, reader: true, authority: true, readerBeforeProblems: true });
    assert.deepEqual(reader, {
      overflow: false,
      records: 24,
      first: "tables/roots/purpose.md",
      last: "tables/evidence/change-lineage.md",
      boundary: true,
    });
    const output = {
      artifact: "SIM-PP-01 narrow-viewport browser mechanics",
      edition: manifest.edition,
      source_commit: manifest.source_commit,
      viewport: { width: 390, height: 844 },
      home,
      reader,
      evidence_boundary: "mechanical overflow and DOM presence only; not accessibility or reader evidence",
    };
    fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");
    console.log(`OK edition=${manifest.edition} viewport=390x844 home_overflow=false reader_overflow=false records=24`);
  } finally {
    if (client) client.close();
    browser.kill();
  }
})().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});

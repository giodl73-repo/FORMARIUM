"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { spawn } = require("node:child_process");

const siteRoot = path.resolve(process.argv[2] || "target/proof-set-sim-34");
const screenshotPath = path.resolve(process.argv[3] ||
  "target/sim34-table-family-contents.png");
const manifest = JSON.parse(fs.readFileSync(path.join(siteRoot, "manifest.json"), "utf8"));
const records = JSON.parse(fs.readFileSync(path.join(siteRoot, "search-index.json"), "utf8"));
assert.equal(manifest.edition, "sim-34", "browser check requires sim-34");
const sparse = records.find((record) => record.path ===
  "tables/entries/amount-concentration-composition.md");
const dense = records.find((record) => record.path ===
  "tables/entries/evaluation-measure-scale-criterion.md");
assert.ok(sparse && dense);
const edgePath = [
  process.env.EDGE_PATH,
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
].filter(Boolean).find((candidate) => fs.existsSync(candidate));
assert.ok(edgePath, "Microsoft Edge executable not found");

const port = 10080 + (process.pid % 30);
const profile = path.resolve(`target/edge-family-contents-profile-${process.pid}`);
assert.ok(profile.startsWith(path.resolve("target") + path.sep));
fs.mkdirSync(profile, { recursive: true });
const sparseUrl = pathToFileURL(path.join(siteRoot, sparse.href)).href;
const denseUrl = pathToFileURL(path.join(siteRoot, dense.href)).href;
const browser = spawn(edgePath, [
  "--headless=new", "--disable-gpu", "--no-first-run",
  "--no-default-browser-check", `--remote-debugging-port=${port}`,
  "--remote-allow-origins=*", `--user-data-dir=${profile}`, sparseUrl,
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
  throw new Error("Timed out waiting for Edge Table family page");
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

async function waitFor(client, expression, message) {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    if (await evaluate(client, expression)) return;
    await delay(60);
  }
  throw new Error(message);
}

(async () => {
  let client;
  try {
    client = connect((await browserTarget()).webSocketDebuggerUrl);
    await client.ready;
    await client.call("Runtime.enable");
    await client.call("Page.enable");
    await waitFor(client, "document.readyState === 'complete'", "sparse entry did not load");
    const sparseState = await evaluate(client, `(() => {
      const family = document.querySelector(".table-navigator__family");
      return {
        count: family.dataset.viewCount,
        open: family.open,
        links: family.querySelectorAll("li a").length,
        label: family.querySelector("summary span").textContent,
        boundary: family.querySelector("p").textContent
      };
    })()`);
    assert.deepEqual(sparseState, {
      count: "1", open: true, links: 1,
      label: "Specialized views owned by this Table",
      boundary: "Publication ownership only; these are not subtypes, broader/narrower terms, dependencies, or closure steps.",
    });

    await evaluate(client, `location.href = ${JSON.stringify(denseUrl)}; true`);
    await waitFor(client,
      `document.querySelector(".site-entry")?.dataset.sourcePath === "tables/entries/evaluation-measure-scale-criterion.md"`,
      "dense entry did not load");
    const denseState = await evaluate(client, `(() => {
      const family = document.querySelector(".table-navigator__family");
      return {
        count: family.dataset.viewCount,
        open: family.open,
        links: family.querySelectorAll("li a").length,
        firstKind: family.querySelector("li span").textContent,
        lastPath: family.querySelector("li:last-child").dataset.viewPath
      };
    })()`);
    assert.deepEqual(denseState, {
      count: "8", open: false, links: 8, firstKind: "constraint view",
      lastPath: "tables/procedures/evaluation-review-disposition.md",
    });

    await client.call("Emulation.setDeviceMetricsOverride", {
      width: 390, height: 1500, deviceScaleFactor: 1, mobile: true,
    });
    await evaluate(client, `(() => {
      const family = document.querySelector(".table-navigator__family");
      family.open = true;
      family.scrollIntoView();
      return true;
    })()`);
    const mobile = await evaluate(client, `(() => ({
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      columns: getComputedStyle(document.querySelector(".table-navigator__family ul")).gridTemplateColumns,
      links: document.querySelectorAll(".table-navigator__family li a").length
    }))()`);
    assert.equal(mobile.overflow, false);
    assert.equal(mobile.links, 8);
    assert.ok(!mobile.columns.includes(" "), "mobile family uses one column");
    const shot = await client.call("Page.captureScreenshot", {
      format: "png", captureBeyondViewport: false,
    });
    fs.writeFileSync(screenshotPath, Buffer.from(shot.data, "base64"));
    assert.ok(fs.statSync(screenshotPath).size > 20000,
      "family-contents screenshot is non-trivial");
    console.log(
      `OK sparse=open dense=folded denseViews=8 mobile=390 ` +
      `screenshot=${screenshotPath}`
    );
  } finally {
    if (client) client.close();
    browser.kill();
  }
})().catch((error) => {
  browser.kill();
  console.error(error.stack || error.message);
  process.exitCode = 1;
});

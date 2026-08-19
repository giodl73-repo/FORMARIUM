"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { spawn } = require("node:child_process");

const siteRoot = path.resolve(process.argv[2] || "target/proof-set-sim-35");
const screenshotPath = path.resolve(process.argv[3] ||
  "target/sim35-tables-alphabetical-index.png");
const manifest = JSON.parse(fs.readFileSync(path.join(siteRoot, "manifest.json"), "utf8"));
assert.ok(["sim-35", "sim-66"].includes(manifest.edition),
  "browser check requires sim-35 or sim-66");
const includesPointers = manifest.edition === "sim-66";
const edgePath = [
  process.env.EDGE_PATH,
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
].filter(Boolean).find((candidate) => fs.existsSync(candidate));
assert.ok(edgePath, "Microsoft Edge executable not found");

const port = 10110 + (process.pid % 30);
const profile = path.resolve(`target/edge-tables-index-profile-${process.pid}`);
assert.ok(profile.startsWith(path.resolve("target") + path.sep));
fs.mkdirSync(profile, { recursive: true });
const homeUrl = pathToFileURL(path.join(siteRoot, "index.html")).href;
const tablesUrl = pathToFileURL(path.join(siteRoot, "tables.html")).href;
const browser = spawn(edgePath, [
  "--headless=new", "--disable-gpu", "--no-first-run",
  "--no-default-browser-check", `--remote-debugging-port=${port}`,
  "--remote-allow-origins=*", `--user-data-dir=${profile}`, homeUrl,
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
  throw new Error("Timed out waiting for Edge Tables index");
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
    await client.call("Emulation.setDeviceMetricsOverride", {
      width: 1280, height: 1000, deviceScaleFactor: 1, mobile: false,
    });
    await client.call("Page.navigate", { url: homeUrl });
    await waitFor(client,
      `document.readyState === "complete" && document.querySelector('[data-book="tables"]')`,
      "home did not load");
    const homeRoute = await evaluate(client,
      `document.querySelector('[data-book="tables"] .site-book-card__actions a:last-child').getAttribute('href')`);
    assert.equal(homeRoute, "tables.html");
    await evaluate(client, `location.href = ${JSON.stringify(tablesUrl)}; true`);
    await waitFor(client,
      `document.querySelector(".tables-index__canonical")`,
      "Tables index did not load");
    const desktop = await evaluate(client, `(() => ({
      heading: document.querySelector("h1").textContent,
      canonical: document.querySelectorAll(".tables-index__canonical [data-index-path]").length,
      curated: document.querySelectorAll(".tables-index__curated [data-index-path]").length,
      pointers: document.querySelectorAll(".tables-index__canonical [data-pointer-slug]").length,
      letters: document.querySelectorAll(".tables-index__letters a").length,
      first: document.querySelector(".tables-index__canonical [data-index-path] a").textContent,
      firstMeta: document.querySelector(".tables-index__canonical [data-index-path] span").textContent,
      firstDictionary: document.querySelector(".tables-index__dictionary li a")?.textContent || null,
      dictionaryStart: document.querySelector("[data-dictionary-start]")?.getAttribute("href") || null,
      firstPointer: document.querySelector(".tables-index__canonical [data-pointer-slug] a")?.getAttribute("href") || null,
      columns: getComputedStyle(document.querySelector(".tables-index__canonical")).columnCount,
      boundary: document.querySelector(".tables-index__boundary").textContent
    }))()`);
    assert.equal(desktop.heading,
      includesPointers ? "Formarium Tables A-Z" : "Factorium Tables A-Z");
    assert.equal(desktop.canonical, includesPointers ? 54 : 53);
    assert.equal(desktop.curated, 27);
    assert.equal(desktop.pointers, includesPointers ? 250 : 0);
    assert.ok(desktop.letters >= 17);
    assert.equal(desktop.first, "Access, Permission, Authorization, and Entitlement");
    assert.match(desktop.firstMeta, /governance · 1 specialized view/);
    assert.equal(desktop.firstDictionary, includesPointers ? "Access" : null);
    assert.equal(desktop.dictionaryStart, includesPointers
      ? "pointers/access.html"
      : null);
    assert.equal(desktop.firstPointer, includesPointers ? "pointers/access.html" : null);
    assert.ok(Number(desktop.columns) >= 2);
    assert.equal(desktop.boundary,
      "Alphabetical adjacency is presentation only; it does not assert relatedness, hierarchy, synonymy, dependency, recommendation, or closure.");

    await client.call("Emulation.setDeviceMetricsOverride", {
      width: 390, height: 1500, deviceScaleFactor: 1, mobile: true,
    });
    await evaluate(client,
      `document.querySelector(".tables-index__heading").scrollIntoView(); true`);
    const mobile = await evaluate(client, `(() => ({
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      columns: getComputedStyle(document.querySelector(".tables-index__canonical")).columnCount,
      curatedColumns: getComputedStyle(document.querySelector(".tables-index__curated ol")).gridTemplateColumns,
      letters: document.querySelectorAll(".tables-index__letters a").length
    }))()`);
    assert.equal(mobile.overflow, false);
    assert.equal(mobile.columns, "1");
    assert.ok(!mobile.curatedColumns.includes(" "));
    assert.equal(mobile.letters, desktop.letters);
    if (includesPointers) {
      await evaluate(client,
        `document.querySelector(".tables-index__dictionary").scrollIntoView(); true`);
    }
    const shot = await client.call("Page.captureScreenshot", {
      format: "png", captureBeyondViewport: false,
    });
    const indexScreenshotPath = includesPointers
      ? screenshotPath.replace(/\.png$/i, "-index.png")
      : screenshotPath;
    fs.writeFileSync(indexScreenshotPath, Buffer.from(shot.data, "base64"));
    assert.ok(fs.statSync(indexScreenshotPath).size > 20000,
      "Tables index screenshot is non-trivial");
    if (includesPointers) {
      await evaluate(client,
        `location.href = new URL(${JSON.stringify(desktop.dictionaryStart)}, ${JSON.stringify(tablesUrl)}).href; true`);
      await waitFor(client,
        `document.readyState === "complete" && document.querySelector('[data-dictionary-step="1"]')`,
        "Tables A-Z sequence did not start");
      await evaluate(client,
        `document.querySelector(".dictionary-sequence").scrollIntoView(); true`);
      const dictionaryShot = await client.call("Page.captureScreenshot", {
        format: "png", captureBeyondViewport: false,
      });
      fs.writeFileSync(screenshotPath, Buffer.from(dictionaryShot.data, "base64"));
      assert.ok(fs.statSync(screenshotPath).size > 20000,
        "Tables A-Z sequence screenshot is non-trivial");
      assert.equal(await evaluate(client,
        `document.querySelector(".pointer-page h1").textContent`), "Access");
      assert.equal(await evaluate(client,
        `document.querySelector(".dictionary-sequence").getAttribute("data-dictionary-kind")`),
      "pointer");
      assert.equal(await evaluate(client,
        `document.querySelector('[data-dictionary-direction="next"]').getAttribute("href")`),
      "../entries/tables-entries-access-permission-authorization-entitlement.html");
      await evaluate(client,
        `document.querySelector('[data-dictionary-direction="next"]').click(); true`);
      await waitFor(client,
        `document.readyState === "complete" && document.querySelector('[data-dictionary-step="2"]')`,
        "Tables A-Z sequence did not advance");
      assert.equal(await evaluate(client,
        `document.querySelector(".site-entry h1").textContent.replace(/\\s+/g, " ").trim()`),
      "Access, Permission, Authorization, and Entitlement");
      assert.equal(await evaluate(client,
        `document.querySelector(".dictionary-sequence").getAttribute("data-dictionary-kind")`),
      "table");
      assert.equal(await evaluate(client,
        `document.querySelector('[data-dictionary-direction="next"]').getAttribute("href")`),
      "../pointers/accumulation.html");
      assert.equal(await evaluate(client,
        `document.querySelector(".all-record-sequence") === null`), true);
      await evaluate(client,
        `document.querySelector('[data-dictionary-direction="next"]').click(); true`);
      await waitFor(client,
        `document.readyState === "complete" && document.querySelector('[data-dictionary-step="3"]')`,
        "Merged dictionary did not advance to Accumulation");
      assert.equal(await evaluate(client,
        `document.querySelector(".pointer-page h1").textContent`), "Accumulation");
    }
    console.log(
      `OK route=tables.html canonical=${desktop.canonical} curated=27 ` +
      `pointers=${desktop.pointers} dictionary=${includesPointers ? 304 : 0} ` +
      `letters=${desktop.letters} mobile=390 screenshot=${screenshotPath}`
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

"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { spawn } = require("node:child_process");

const siteRoot = path.resolve(process.argv[2] || "target/proof-set-sim-33");
const screenshotPath = path.resolve(process.argv[3] ||
  "target/sim33-table-family-search.png");
const manifest = JSON.parse(fs.readFileSync(path.join(siteRoot, "manifest.json"), "utf8"));
assert.equal(manifest.edition, "sim-33", "browser check requires sim-33");
const edgePath = [
  process.env.EDGE_PATH,
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
].filter(Boolean).find((candidate) => fs.existsSync(candidate));
assert.ok(edgePath, "Microsoft Edge executable not found");

const port = 10050 + (process.pid % 30);
const profile = path.resolve(`target/edge-family-search-profile-${process.pid}`);
assert.ok(profile.startsWith(path.resolve("target") + path.sep));
fs.mkdirSync(profile, { recursive: true });
const siteUrl = pathToFileURL(path.join(siteRoot, "index.html")).href + "#search";
const browser = spawn(edgePath, [
  "--headless=new", "--disable-gpu", "--no-first-run",
  "--no-default-browser-check", `--remote-debugging-port=${port}`,
  "--remote-allow-origins=*", `--user-data-dir=${profile}`, siteUrl,
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
  throw new Error("Timed out waiting for Edge Tables search page");
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
    await waitFor(client, "document.readyState === 'complete'", "site did not load");
    await evaluate(client, `(() => {
      const input = document.querySelector("#proof-search-query");
      input.value = "threshold acceptance";
      input.dispatchEvent(new Event("input", { bubbles: true }));
      return true;
    })()`);
    await waitFor(client,
      `document.querySelectorAll(".proof-search__family").length > 0`,
      "family results did not render");
    const familyState = await evaluate(client, `(() => {
      const first = document.querySelector(".proof-search__family");
      return {
        view: document.querySelector("#proof-search-view").value,
        resultView: document.querySelector("#proof-search-results").dataset.resultView,
        identity: first.querySelector(".proof-search__family-heading span").textContent,
        owner: first.querySelector(".proof-search__family-heading a").textContent,
        ownerHref: first.querySelector(".proof-search__family-heading a").getAttribute("href"),
        firstMember: first.querySelector(".proof-search__result a").textContent,
        memberPaths: [...first.querySelectorAll(".proof-search__result")].map(node => node.dataset.resultPath),
        boundary: document.querySelector(".proof-search__families-boundary").textContent
      };
    })()`);
    assert.equal(familyState.view, "families");
    assert.equal(familyState.resultView, "families");
    assert.equal(familyState.identity, "Owning Table");
    assert.equal(familyState.owner,
      "Evaluation Measure, Scale, Criterion, and Score");
    assert.equal(familyState.ownerHref,
      "entries/tables-entries-evaluation-measure-scale-criterion.html");
    assert.equal(familyState.firstMember,
      "Evaluation Threshold and Acceptance Constraint Table");
    assert.ok(familyState.memberPaths.includes(
      "tables/constraints/evaluation-threshold-acceptance.md"));
    assert.equal(familyState.boundary,
      "Table families show exact publication ownership, not broader/narrower, synonym, relatedness, dependency, or closure.");

    await evaluate(client, `(() => {
      const select = document.querySelector("#proof-search-view");
      select.value = "records";
      select.dispatchEvent(new Event("change", { bubbles: true }));
      return true;
    })()`);
    await waitFor(client,
      `document.querySelector("#proof-search-results").dataset.resultView === "records"`,
      "flat records did not render");
    const recordState = await evaluate(client, `(() => ({
      families: document.querySelectorAll(".proof-search__family").length,
      first: document.querySelector("#proof-search-results > .proof-search__result a").textContent,
      url: location.search
    }))()`);
    assert.equal(recordState.families, 0);
    assert.equal(recordState.first,
      "Evaluation Threshold and Acceptance Constraint Table");
    assert.match(recordState.url, /view=records/);
    assert.match(recordState.url, /q=threshold\+acceptance/);

    await evaluate(client, `(() => {
      const select = document.querySelector("#proof-search-view");
      select.value = "families";
      select.dispatchEvent(new Event("change", { bubbles: true }));
      return true;
    })()`);
    await client.call("Emulation.setDeviceMetricsOverride", {
      width: 390, height: 1300, deviceScaleFactor: 1, mobile: true,
    });
    const mobile = await evaluate(client, `(() => ({
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      controls: document.querySelectorAll(".proof-search__controls label").length,
      families: document.querySelectorAll(".proof-search__family").length
    }))()`);
    assert.equal(mobile.overflow, false);
    assert.equal(mobile.controls, 4);
    assert.ok(mobile.families > 0);
    await evaluate(client,
      `document.querySelector("#search").scrollIntoView(); true`);
    const shot = await client.call("Page.captureScreenshot", {
      format: "png", captureBeyondViewport: false,
    });
    fs.writeFileSync(screenshotPath, Buffer.from(shot.data, "base64"));
    assert.ok(fs.statSync(screenshotPath).size > 20000,
      "family-search screenshot is non-trivial");
    console.log(
      `OK default=families owner=exact flat=preserved mobile=390 ` +
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

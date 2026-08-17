"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { spawn } = require("node:child_process");

const siteRoot = path.resolve(process.argv[2] || "target/proof-set-sim-30");
const screenshotPath = path.resolve(process.argv[3] || "target/sim30-book-one-candidate.png");
const manifest = JSON.parse(fs.readFileSync(path.join(siteRoot, "manifest.json"), "utf8"));
assert.equal(manifest.edition, "sim-30", "browser check requires sim-30");
const edgePath = [
  process.env.EDGE_PATH,
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
].filter(Boolean).find((candidate) => fs.existsSync(candidate));
assert.ok(edgePath, "Microsoft Edge executable not found");

const port = 9950 + (process.pid % 40);
const profile = path.resolve(`target/edge-book-one-profile-${process.pid}`);
assert.ok(profile.startsWith(path.resolve("target") + path.sep));
fs.mkdirSync(profile, { recursive: true });
const browser = spawn(edgePath, [
  "--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check",
  `--remote-debugging-port=${port}`, "--remote-allow-origins=*",
  `--user-data-dir=${profile}`,
  pathToFileURL(path.join(siteRoot, "index.html")).href,
], { stdio: "ignore", windowsHide: true });
const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function browserTarget() {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    try {
      const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      const target = targets.find((item) => item.type === "page" && item.url.includes("index.html"));
      if (target) return target;
    } catch (_) {}
    await delay(100);
  }
  throw new Error("Timed out waiting for Edge candidate page");
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

(async () => {
  let client;
  try {
    client = connect((await browserTarget()).webSocketDebuggerUrl);
    await client.ready;
    await client.call("Runtime.enable");
    await client.call("Page.enable");
    for (let attempt = 0; attempt < 100; attempt += 1) {
      if (await evaluate(client, "document.readyState === 'complete'")) break;
      await delay(50);
    }
    const initial = await evaluate(client, `(() => {
      const candidate = document.getElementById("candidate");
      const search = document.getElementById("search");
      const contents = document.getElementById("contents");
      return {
        candidate: Boolean(candidate),
        brief: candidate.querySelectorAll(".site-candidate__brief li").length,
        links: candidate.querySelectorAll(".site-candidate__actions a").length,
        beforeSearch: Boolean(candidate.compareDocumentPosition(search) & Node.DOCUMENT_POSITION_FOLLOWING),
        beforeContents: Boolean(candidate.compareDocumentPosition(contents) & Node.DOCUMENT_POSITION_FOLLOWING),
        boundary: /24-record teaching spine/.test(candidate.textContent) &&
          /151 additional canonical records/.test(candidate.textContent)
      };
    })()`);
    assert.deepEqual(initial, {
      candidate: true, brief: 6, links: 3,
      beforeSearch: true, beforeContents: true, boundary: true,
    });

    const titles = await evaluate(client, `(() => {
      const input = document.getElementById("proof-search-query");
      input.value = "why did operation differ from the plan?";
      input.dispatchEvent(new Event("input", { bubbles: true }));
      return [...document.querySelectorAll("#proof-search-results a")]
        .slice(0, 5).map((node) => node.textContent);
    })()`);
    assert.equal(titles[0], "Book One Candidate Quickstart");
    assert.ok(titles.some((title) => title.includes("Bounded-Question")));
    assert.ok(!titles.slice(0, 2).some((title) =>
      /Mathematical Relation|Thermal Quantity/.test(title)));

    await client.call("Emulation.setDeviceMetricsOverride", {
      width: 390, height: 1800, deviceScaleFactor: 1, mobile: true,
    });
    const mobile = await evaluate(client, `(() => ({
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      primaryVisible: getComputedStyle(document.querySelector(".site-candidate__primary")).display !== "none",
      width: document.documentElement.clientWidth
    }))()`);
    assert.deepEqual(mobile, { overflow: false, primaryVisible: true, width: 390 });
    const shot = await client.call("Page.captureScreenshot", {
      format: "png", captureBeyondViewport: false,
    });
    fs.writeFileSync(screenshotPath, Buffer.from(shot.data, "base64"));
    assert.ok(fs.statSync(screenshotPath).size > 20000, "candidate screenshot is non-trivial");
    console.log(`OK candidate=visible brief=6 links=3 search=${titles.join(" | ")} mobile=390 screenshot=${screenshotPath}`);
  } finally {
    if (client) client.close();
    browser.kill();
  }
})().catch((error) => {
  browser.kill();
  console.error(error.stack || error.message);
  process.exitCode = 1;
});

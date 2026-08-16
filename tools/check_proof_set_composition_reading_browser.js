"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { spawn } = require("node:child_process");

const siteRoot = path.resolve(process.argv[2] || "target/proof-set-sim-17");
const manifest = JSON.parse(fs.readFileSync(path.join(siteRoot, "manifest.json"), "utf8"));
const editionNumber = Number(manifest.edition.split("-")[1]);
const screenshotPath = path.resolve(process.argv[3] ||
  `target/${manifest.edition.replace("-", "")}-composition-reading.png`);
const edgeCandidates = [
  process.env.EDGE_PATH,
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe"
].filter(Boolean);
const edgePath = edgeCandidates.find((candidate) => fs.existsSync(candidate));
assert.ok(edgePath, "Microsoft Edge executable not found");
assert.ok(fs.existsSync(path.join(siteRoot, "compose.html")), "sim-17 compose page not found");

const port = 9337;
const profile = path.resolve("target/edge-composition-reading-profile");
fs.mkdirSync(profile, { recursive: true });
const browser = spawn(edgePath, [
  "--headless=new",
  "--disable-gpu",
  "--no-first-run",
  "--no-default-browser-check",
  `--remote-debugging-port=${port}`,
  "--remote-allow-origins=*",
  `--user-data-dir=${profile}`,
  pathToFileURL(path.join(siteRoot, "compose.html")).href
], { stdio: "ignore", windowsHide: true });

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function browserTarget() {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/list`);
      const targets = await response.json();
      const target = targets.find((item) => item.type === "page" && item.url.includes("compose.html"));
      if (target) return target;
    } catch (_) {
      // Edge may not have opened its debugging socket yet.
    }
    await delay(100);
  }
  throw new Error("Timed out waiting for Edge composition page");
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
      const id = nextId;
      nextId += 1;
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
    expression,
    awaitPromise: true,
    returnByValue: true
  });
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
    for (let attempt = 0; attempt < 50; attempt += 1) {
      if (await evaluate(client, "document.readyState === 'complete'")) break;
      await delay(100);
    }
    await evaluate(client, `(() => {
      const form = document.getElementById("composition-lab-form");
      form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
      return true;
    })()`);
    let state;
    for (let attempt = 0; attempt < 80; attempt += 1) {
      state = await evaluate(client, `(() => ({
        routePages: document.querySelectorAll(".composition-reading-route__page").length,
        labState: document.querySelector(".lab-state")?.textContent || "",
        error: document.querySelector(".lab-error")?.textContent || ""
      }))()`);
      if (state.routePages > 0 || state.error) break;
      await delay(100);
    }
    assert.equal(state.error, "", "browser runtime error");
    assert.equal(state.labState, "incomplete", "browser default remains incomplete");
    assert.equal(state.routePages, 2, "browser renders two route pages");
    const route = await evaluate(client, `(() => ({
      title: document.querySelector(".composition-reading-route h3")?.textContent,
      summary: document.querySelector(".composition-reading-route__summary")?.textContent,
      stages: [...document.querySelectorAll(".composition-reading-route__stage")].map(node => node.textContent),
      titles: [...document.querySelectorAll(".composition-reading-route__heading a")].map(node => node.textContent),
      hrefs: [...document.querySelectorAll(".composition-reading-route__heading a")].map(node => node.getAttribute("href")),
      bindings: [...document.querySelectorAll(".composition-reading-route__bindings li")].map(node => node.textContent)
    }))()`);
    assert.equal(route.title, "Read the admitted closure", "reading route heading");
    assert.deepEqual(route.stages, ["Start", "Evaluate"], "browser route order");
    assert.equal(route.bindings.length, 3, "browser retains three exact graph bindings");
    for (const href of route.hrefs) {
      assert.ok(fs.existsSync(path.join(siteRoot, href.split("#")[0])),
        `browser route target exists: ${href}`);
    }
    const metrics = await client.call("Page.getLayoutMetrics");
    const width = Math.ceil(metrics.cssContentSize.width);
    const height = Math.ceil(metrics.cssContentSize.height);
    const screenshot = await client.call("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: true,
      clip: { x: 0, y: 0, width, height, scale: 1 }
    });
    fs.writeFileSync(screenshotPath, Buffer.from(screenshot.data, "base64"));
    await client.call("Emulation.setDeviceMetricsOverride", {
      width: 600, height: 900, deviceScaleFactor: 1, mobile: false
    });
    await delay(100);
    const mobileCardTops = await evaluate(client,
      `[...document.querySelectorAll(".composition-reading-route__page")].map(node => node.getBoundingClientRect().top)`);
    assert.ok(mobileCardTops[1] > mobileCardTops[0],
      "reading route collapses to one column at 600 pixels");
    let focusSummary = "";
    if (editionNumber >= 18) {
      assert.match(route.hrefs[0], /#factor-focus-[a-z0-9-]+$/,
        "start route carries exact factor focus");
      await evaluate(client, `location.href = ${JSON.stringify(route.hrefs[0])}`);
      let focus;
      for (let attempt = 0; attempt < 80; attempt += 1) {
        focus = await evaluate(client, `(() => {
          const target = document.querySelector(location.hash);
          const root = target?.querySelector('a[href^="#"]');
          return {
            ready: document.readyState,
            hash: location.hash,
            display: target ? getComputedStyle(target).display : "",
            kicker: target?.querySelector(".factor-focus__kicker")?.textContent || "",
            label: target?.querySelector(".factor-focus__title")?.textContent || "",
            artifact: target?.querySelector("code")?.textContent || "",
            rootHref: root?.getAttribute("href") || "",
            rootExists: root ? Boolean(document.querySelector(root.getAttribute("href"))) : false
          };
        })()`);
        if (focus.ready === "complete" && focus.display) break;
        await delay(100);
      }
      assert.equal(focus.display, "block", "targeted factor focus is visible");
      assert.equal(focus.kicker, "Composition focus", "focus card status");
      assert.match(focus.artifact, /^factor:/, "focus card retains exact factor artifact");
      assert.equal(focus.rootExists, true, "focus card hands off to Root factorization");
      const focusMetrics = await client.call("Page.getLayoutMetrics");
      const focusScreenshot = await client.call("Page.captureScreenshot", {
        format: "png",
        captureBeyondViewport: true,
        clip: {
          x: 0,
          y: 0,
          width: Math.ceil(focusMetrics.cssContentSize.width),
          height: Math.ceil(focusMetrics.cssContentSize.height),
          scale: 1
        }
      });
      const focusScreenshotPath = screenshotPath.replace(/\.png$/i, "-focus.png");
      fs.writeFileSync(focusScreenshotPath, Buffer.from(focusScreenshot.data, "base64"));
      focusSummary = ` focus=${focus.hash.slice(1)} focus_screenshot=${focusScreenshotPath}`;
    }
    console.log(`OK state=${state.labState} pages=${state.routePages} ` +
      `stages=${route.stages.join(",")} mobile=one-column screenshot=${screenshotPath}${focusSummary}`);
  } finally {
    if (client) client.close();
    browser.kill();
  }
})().catch((error) => {
  browser.kill();
  console.error(error.stack || error.message);
  process.exitCode = 1;
});

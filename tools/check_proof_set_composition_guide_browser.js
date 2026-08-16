"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { spawn } = require("node:child_process");

const siteRoot = path.resolve(process.argv[2] || "target/proof-set-sim-29");
const manifest = JSON.parse(fs.readFileSync(path.join(siteRoot, "manifest.json"), "utf8"));
const screenshotPath = path.resolve(process.argv[3] ||
  `target/${manifest.edition.replace("-", "")}-composition-guide.png`);
const edgeCandidates = [
  process.env.EDGE_PATH,
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe"
].filter(Boolean);
const edgePath = edgeCandidates.find((candidate) => fs.existsSync(candidate));
assert.ok(edgePath, "Microsoft Edge executable not found");
assert.ok(Number(manifest.edition.replace("sim-", "")) >= 28,
  "browser check requires the sim-28 guide or a later retained edition");

const port = 9400 + (process.pid % 400);
const profile = path.resolve(`target/edge-composition-guide-profile-${process.pid}`);
assert.ok(profile.startsWith(path.resolve("target") + path.sep), "browser profile stays under target");
fs.mkdirSync(profile, { recursive: true });
const browser = spawn(edgePath, [
  "--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check",
  `--remote-debugging-port=${port}`, "--remote-allow-origins=*",
  `--user-data-dir=${profile}`,
  pathToFileURL(path.join(siteRoot, "compose.html")).href
], { stdio: "ignore", windowsHide: true });

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function browserTarget() {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/list`);
      const targets = await response.json();
      const target = targets.find((item) => item.type === "page" && item.url.includes("compose.html"));
      if (target) return target;
    } catch (_) {}
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
  if (response.exceptionDetails) {
    throw new Error(response.exceptionDetails.exception?.description || response.exceptionDetails.text);
  }
  return response.result.value;
}

async function waitFor(client, expression, message) {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    if (await evaluate(client, expression)) return;
    await delay(100);
  }
  throw new Error(message);
}

(async () => {
  let client;
  try {
    const target = await browserTarget();
    client = connect(target.webSocketDebuggerUrl);
    await client.ready;
    await client.call("Runtime.enable");
    await client.call("Page.enable");
    await waitFor(client, "document.readyState === 'complete'", "page did not finish loading");

    await evaluate(client, "document.getElementById('composition-lab-form').requestSubmit(); true");
    await waitFor(client, "Boolean(document.getElementById('composition-guide-skeleton'))",
      "default guide skeleton did not render");
    const book = await evaluate(client, `(() => {
      const guide = document.getElementById("composition-guide-skeleton");
      const map = document.getElementById("composition-closure-map");
      const route = document.getElementById("composition-reading-route");
      const missing = guide.querySelector(".guide-skeleton__missing");
      const resultIdentity = document.querySelector(".lab-identity code")?.textContent || "";
      const guideIdentity = guide.querySelector(".guide-skeleton__identity")?.textContent || "";
      return {
        profile: document.querySelector('[data-composition-profile][aria-pressed="true"]')?.dataset.compositionProfile,
        state: guide.dataset.state,
        status: guide.querySelector(".guide-skeleton__status")?.textContent,
        trace: guide.querySelectorAll(".guide-skeleton__trace-item").length,
        evaluations: guide.querySelectorAll(".guide-skeleton__ledger li").length,
        missing: guide.querySelectorAll(".guide-skeleton__missing-list li").length,
        missingOpen: missing.open,
        declarations: guide.querySelectorAll(".guide-skeleton__declarations dt").length,
        order: Boolean(map.compareDocumentPosition(guide) & Node.DOCUMENT_POSITION_FOLLOWING) &&
          Boolean(guide.compareDocumentPosition(route) & Node.DOCUMENT_POSITION_FOLLOWING),
        sameIdentity: resultIdentity.length === 64 && guideIdentity.includes(resultIdentity),
        bodyText: guide.textContent
      };
    })()`);
    assert.equal(book.profile, "book");
    assert.equal(book.state, "incomplete");
    assert.match(book.status, /8 requirements missing/);
    assert.equal(book.trace, 2);
    assert.equal(book.evaluations, 1);
    assert.equal(book.missing, 8);
    assert.equal(book.missingOpen, true);
    assert.equal(book.declarations, 4);
    assert.equal(book.order, true, "guide sits between map and reading route");
    assert.equal(book.sameIdentity, true, "guide inherits the exact local result identity");
    assert.doesNotMatch(book.bodyText, /\bcomplete guide\b|\bvalid result\b|\bsuccessful\b/i);

    const profile = await evaluate(client, `(() => {
      const form = document.getElementById("composition-lab-form");
      const snapshot = () => [...form.elements].map(node => ({
        name: node.name, value: node.value, checked: Boolean(node.checked), disabled: Boolean(node.disabled)
      }));
      const before = JSON.stringify(snapshot());
      document.querySelector('[data-composition-profile="compact"]').click();
      const guide = document.getElementById("composition-guide-skeleton");
      const compact = {
        missingOpen: guide.querySelector(".guide-skeleton__missing").open,
        missing: guide.querySelectorAll(".guide-skeleton__missing-list li").length,
        statusDisplay: getComputedStyle(guide.querySelector(".guide-skeleton__status")).display,
        exactDisplay: getComputedStyle(guide.querySelector(".guide-skeleton__identity")).display,
        boundaryDisplay: getComputedStyle(guide.querySelector(".guide-skeleton__boundary-list li")).display
      };
      document.querySelector('[data-composition-profile="full"]').click();
      const full = {
        missingOpen: guide.querySelector(".guide-skeleton__missing").open,
        exactDisplay: getComputedStyle(guide.querySelector(".guide-skeleton__identity")).display,
        exactBindings: guide.querySelectorAll(".guide-skeleton__exact code").length
      };
      return { compact, full, controlsUnchanged: before === JSON.stringify(snapshot()) };
    })()`);
    assert.deepEqual(profile.compact, {
      missingOpen: false, missing: 8, statusDisplay: "block",
      exactDisplay: "none", boundaryDisplay: "list-item"
    });
    assert.equal(profile.full.missingOpen, true);
    assert.notEqual(profile.full.exactDisplay, "none");
    assert.equal(profile.full.exactBindings, 3);
    assert.equal(profile.controlsUnchanged, true, "profiles do not alter query controls");

    await evaluate(client, `(() => {
      document.querySelector('[data-composition-profile="compact"]').click();
      const form = document.getElementById("composition-lab-form");
      const payload = window.FACTORIUM_COMPOSITION_LAB;
      form.querySelectorAll('input[name="seeds"], input[name="relations"], input[name="exclusions"]').forEach(input => input.checked = false);
      [payload.relations[0].source, payload.relations[1].source].forEach(value => {
        form.querySelector('input[name="seeds"][value="' + value + '"]').checked = true;
      });
      [payload.relations[0].id, payload.relations[1].id].forEach(value => {
        form.querySelector('input[name="relations"][value="' + value + '"]').checked = true;
      });
      form.elements.edges.value = "1";
      form.elements.nodes.value = "8";
      form.elements.work.value = "13";
      form.requestSubmit();
      return true;
    })()`);
    await waitFor(client, "document.getElementById('composition-guide-skeleton')?.dataset.state === 'truncated'",
      "frontier guide did not render");
    const frontier = await evaluate(client, `(() => {
      const guide = document.getElementById("composition-guide-skeleton");
      const item = guide.querySelector(".guide-skeleton__boundary-list .is-frontier");
      return {
        state: guide.dataset.state,
        frontiers: guide.querySelectorAll(".guide-skeleton__boundary-list .is-frontier").length,
        visible: getComputedStyle(item).display,
        missing: guide.querySelectorAll(".guide-skeleton__missing-list li").length
      };
    })()`);
    assert.deepEqual(frontier, { state: "truncated", frontiers: 1, visible: "list-item", missing: 8 });

    await evaluate(client, `(() => {
      const form = document.getElementById("composition-lab-form");
      const relation = window.FACTORIUM_COMPOSITION_LAB.relations[0];
      form.querySelectorAll('input[name="seeds"], input[name="relations"], input[name="exclusions"]').forEach(input => input.checked = false);
      form.querySelector('input[name="seeds"][value="' + relation.source + '"]').checked = true;
      form.querySelector('input[name="relations"][value="' + relation.id + '"]').checked = true;
      form.querySelector('input[name="exclusions"][value="' + relation.target + '"]').checked = true;
      form.elements.nodes.value = "6";
      form.elements.work.value = "10";
      form.requestSubmit();
      return true;
    })()`);
    await waitFor(client, "document.getElementById('composition-guide-skeleton')?.dataset.state === 'contradictory'",
      "conflict guide did not render");
    const conflict = await evaluate(client, `(() => {
      const guide = document.getElementById("composition-guide-skeleton");
      const item = guide.querySelector(".guide-skeleton__boundary-list .is-conflict");
      return {
        state: guide.dataset.state,
        conflicts: guide.querySelectorAll(".guide-skeleton__boundary-list .is-conflict").length,
        visible: getComputedStyle(item).display,
        rejected: guide.querySelectorAll(".guide-skeleton__exact li.is-rejected").length,
        missing: guide.querySelectorAll(".guide-skeleton__missing-list li").length
      };
    })()`);
    assert.deepEqual(conflict, {
      state: "contradictory", conflicts: 1, visible: "list-item", rejected: 1, missing: 8
    });

    await evaluate(client, "document.querySelector('[data-composition-profile=\"book\"]').click(); true");
    const metrics = await client.call("Page.getLayoutMetrics");
    await client.call("Emulation.setDeviceMetricsOverride", {
      width: 1280,
      height: Math.min(5000, Math.ceil(metrics.contentSize.height)),
      deviceScaleFactor: 1,
      mobile: false
    });
    const shot = await client.call("Page.captureScreenshot", { format: "png", captureBeyondViewport: true });
    fs.writeFileSync(screenshotPath, Buffer.from(shot.data, "base64"));
    assert.ok(fs.statSync(screenshotPath).size > 20000, "guide screenshot is non-trivial");

    console.log(`OK book=${book.trace} trace/${book.missing} missing ` +
      `frontier=${frontier.frontiers} conflict=${conflict.conflicts} screenshot=${screenshotPath}`);
  } finally {
    if (client) client.close();
    browser.kill();
    await delay(250);
    fs.rmSync(profile, { recursive: true, force: true, maxRetries: 20, retryDelay: 100 });
  }
})().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});

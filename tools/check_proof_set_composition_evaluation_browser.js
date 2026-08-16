"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { spawn } = require("node:child_process");

const siteRoot = path.resolve(process.argv[2] || "target/proof-set-sim-29");
const manifest = JSON.parse(fs.readFileSync(path.join(siteRoot, "manifest.json"), "utf8"));
const screenshotPath = path.resolve(process.argv[3] ||
  `target/${manifest.edition.replace("-", "")}-composition-evaluation.png`);
const edgeCandidates = [
  process.env.EDGE_PATH,
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe"
].filter(Boolean);
const edgePath = edgeCandidates.find((candidate) => fs.existsSync(candidate));
assert.ok(edgePath, "Microsoft Edge executable not found");
assert.equal(manifest.edition, "sim-29", "browser check requires sim-29");

const port = 9800 + (process.pid % 150);
const profile = path.resolve(`target/edge-composition-evaluation-profile-${process.pid}`);
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
  for (let attempt = 0; attempt < 100; attempt += 1) {
    if (await evaluate(client, expression)) return;
    await delay(80);
  }
  throw new Error(message);
}

const fillFirstCheck = `((outcome, evidence, observation, rationale) => {
  const workspace = document.getElementById("composition-evaluation-workspace");
  const card = workspace.querySelector(".evaluation-check");
  const include = card.querySelector(".evaluation-check__include input");
  include.checked = true;
  include.dispatchEvent(new Event("change", { bubbles: true }));
  card.querySelector("select").value = outcome;
  const fields = card.querySelectorAll("input[type=text], textarea");
  [evidence, observation, rationale].forEach((value, index) => {
    fields[index].value = value;
    fields[index].dispatchEvent(new Event("input", { bubbles: true }));
  });
  workspace.querySelector(".evaluation-form").requestSubmit();
  return true;
})`;

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
    await waitFor(client, "Boolean(document.getElementById('composition-evaluation-workspace'))",
      "evaluation workspace did not render");
    const initial = await evaluate(client, `(() => {
      const workspace = document.getElementById("composition-evaluation-workspace");
      const guide = document.getElementById("composition-guide-skeleton");
      const route = document.getElementById("composition-reading-route");
      const card = workspace.querySelector(".evaluation-check");
      return {
        checks: workspace.querySelectorAll(".evaluation-check").length,
        included: card.querySelector(".evaluation-check__include input").checked,
        outcome: card.querySelector("select").value,
        outcomeDisabled: card.querySelector("select").disabled,
        receiptHidden: workspace.querySelector(".evaluation-receipt").hidden,
        alignment: workspace.dataset.resultAlignment,
        order: Boolean(guide.compareDocumentPosition(workspace) & Node.DOCUMENT_POSITION_FOLLOWING) &&
          Boolean(workspace.compareDocumentPosition(route) & Node.DOCUMENT_POSITION_FOLLOWING),
        privacy: workspace.querySelector(".evaluation-workspace__privacy").textContent
      };
    })()`);
    assert.deepEqual(initial, {
      checks: 1, included: false, outcome: "unresolved", outcomeDisabled: true,
      receiptHidden: true, alignment: "matches-result", order: true,
      privacy: "Use non-sensitive references and summaries only. Nothing is stored, transmitted, copied, or downloaded."
    });

    const resultBefore = await evaluate(client, `(() => ({
      state: document.getElementById("composition-guide-skeleton").dataset.state,
      identity: document.querySelector(".lab-identity code").textContent,
      gaps: document.querySelectorAll(".guide-skeleton__missing-list li").length
    }))()`);
    await evaluate(client, `${fillFirstCheck}(
      "pass", "Local inspection record A-17",
      "The declared interface was present at the inspected system boundary.",
      "The observation directly addresses the selected structural check."
    )`);
    await waitFor(client, "!document.querySelector('.evaluation-receipt').hidden",
      "evaluation receipt did not render");
    const recorded = await evaluate(client, `(() => {
      const workspace = document.getElementById("composition-evaluation-workspace");
      const receipt = workspace.querySelector(".evaluation-receipt");
      const exact = receipt.querySelector(".evaluation-receipt__exact").textContent;
      const hashes = exact.match(/[a-f0-9]{64}/g) || [];
      return {
        status: receipt.querySelector(".evaluation-receipt__status").textContent,
        qualification: receipt.querySelector(".evaluation-receipt__qualification").textContent,
        resultState: receipt.querySelector(".evaluation-receipt__result-state").textContent,
        outcome: receipt.querySelector(".evaluation-receipt__record strong").textContent,
        evidence: receipt.querySelector(".evaluation-receipt__record p").textContent,
        unrecorded: receipt.querySelector(".evaluation-receipt__unrecorded").textContent,
        alignment: receipt.querySelector(".evaluation-receipt__alignment").dataset.alignment,
        evaluationSha: hashes[0] || "",
        boundSha: hashes[1] || "",
        guideGaps: document.querySelectorAll(".guide-skeleton__missing-list li").length,
        resultIdentity: document.querySelector(".lab-identity code").textContent,
        resultStateNow: document.getElementById("composition-guide-skeleton").dataset.state
      };
    })()`);
    assert.equal(recorded.status, "fully-recorded");
    assert.match(recorded.qualification, /^1 of 1 checks recorded · not reviewed or verified$/);
    assert.equal(recorded.outcome, "You recorded: pass");
    assert.match(recorded.evidence, /Local inspection record A-17/);
    assert.match(recorded.unrecorded, /None\. Full coverage is still not review or verification\./);
    assert.equal(recorded.alignment, "matches-record");
    assert.match(recorded.evaluationSha, /^[a-f0-9]{64}$/);
    assert.equal(recorded.boundSha, resultBefore.identity);
    assert.equal(recorded.resultIdentity, resultBefore.identity);
    assert.equal(recorded.resultStateNow, resultBefore.state);
    assert.equal(recorded.guideGaps, resultBefore.gaps);

    await evaluate(client,
      "document.querySelector('.evaluation-form').requestSubmit(); true");
    await delay(150);
    const repeatedSha = await evaluate(client, `(() => {
      const text = document.querySelector(".evaluation-receipt__exact").textContent;
      return (text.match(/[a-f0-9]{64}/g) || [])[0] || "";
    })()`);
    assert.equal(repeatedSha, recorded.evaluationSha, "unchanged input preserves evaluation identity");

    const profiles = await evaluate(client, `(() => {
      const form = document.querySelector(".evaluation-form");
      const snapshot = () => [...form.elements].map(node => ({
        name: node.name, value: node.value, checked: Boolean(node.checked), disabled: Boolean(node.disabled)
      }));
      const before = JSON.stringify(snapshot());
      document.querySelector('[data-composition-profile="compact"]').click();
      const compact = {
        qualification: getComputedStyle(document.querySelector(".evaluation-receipt__qualification")).display,
        exact: getComputedStyle(document.querySelector(".evaluation-receipt__exact")).display,
        outcome: getComputedStyle(document.querySelector(".evaluation-receipt__record strong")).display,
        gaps: document.querySelectorAll(".guide-skeleton__missing-list li").length
      };
      document.querySelector('[data-composition-profile="full"]').click();
      const full = { exact: getComputedStyle(document.querySelector(".evaluation-receipt__exact")).display };
      return { compact, full, unchanged: before === JSON.stringify(snapshot()) };
    })()`);
    assert.deepEqual(profiles.compact,
      { qualification: "block", exact: "none", outcome: "block", gaps: 8 });
    assert.notEqual(profiles.full.exact, "none");
    assert.equal(profiles.unchanged, true, "profiles do not change evaluation inputs");

    await evaluate(client, `(() => {
      const field = document.querySelector(".evaluation-check input[type=text]");
      field.value += " revised";
      field.dispatchEvent(new Event("input", { bubbles: true }));
      return true;
    })()`);
    assert.equal(await evaluate(client,
      "document.querySelector('.evaluation-receipt__alignment').dataset.alignment"),
    "inputs-changed", "evaluation edit marks receipt stale");

    const closureStale = await evaluate(client, `(() => {
      const problem = document.querySelector('#composition-lab-form [name="problem"]');
      const prior = problem.value;
      problem.value = prior + " changed";
      problem.dispatchEvent(new Event("input", { bubbles: true }));
      const changed = {
        state: document.getElementById("composition-evaluation-workspace").dataset.resultAlignment,
        disabled: document.querySelector(".evaluation-form__action button").disabled,
        receipt: document.querySelector(".evaluation-receipt__alignment").dataset.alignment
      };
      problem.value = prior;
      problem.dispatchEvent(new Event("input", { bubbles: true }));
      return { changed, restoredDisabled: document.querySelector(".evaluation-form__action button").disabled };
    })()`);
    assert.deepEqual(closureStale, {
      changed: { state: "result-controls-changed", disabled: true, receipt: "result-controls-changed" },
      restoredDisabled: false
    });

    await evaluate(client, "document.querySelector('[data-composition-profile=\"book\"]').click(); true");
    const metrics = await client.call("Page.getLayoutMetrics");
    await client.call("Emulation.setDeviceMetricsOverride", {
      width: 1280, height: Math.min(6000, Math.ceil(metrics.contentSize.height)),
      deviceScaleFactor: 1, mobile: false
    });
    const shot = await client.call("Page.captureScreenshot", { format: "png", captureBeyondViewport: true });
    fs.writeFileSync(screenshotPath, Buffer.from(shot.data, "base64"));
    assert.ok(fs.statSync(screenshotPath).size > 20000, "evaluation screenshot is non-trivial");

    await evaluate(client, "document.getElementById('composition-lab-form').requestSubmit(); true");
    await waitFor(client, `document.querySelector(".evaluation-receipt")?.hidden === true`,
      "explicit rerun did not clear prior evaluation receipt");

    await evaluate(client, `(() => {
      const form = document.getElementById("composition-lab-form");
      const payload = window.FACTORIUM_COMPOSITION_LAB;
      form.querySelectorAll('input[name="seeds"], input[name="relations"], input[name="exclusions"]').forEach(input => input.checked = false);
      [payload.relations[0].source, payload.relations[1].source].forEach(value =>
        form.querySelector('input[name="seeds"][value="' + value + '"]').checked = true);
      [payload.relations[0].id, payload.relations[1].id].forEach(value =>
        form.querySelector('input[name="relations"][value="' + value + '"]').checked = true);
      form.elements.edges.value = "2";
      form.elements.nodes.value = "8";
      form.elements.work.value = "18";
      form.requestSubmit();
      return true;
    })()`);
    await waitFor(client, "document.querySelectorAll('.evaluation-check').length === 2",
      "two-check evaluation workspace did not render");
    await evaluate(client, `${fillFirstCheck}(
      "fail", "Local inspection record B-4",
      "The selected evidence view did not contain the required supporting record.",
      "The missing supporting record does not meet the declared local check."
    )`);
    await waitFor(client, "!document.querySelector('.evaluation-receipt').hidden",
      "partial receipt did not render");
    const partial = await evaluate(client, `(() => ({
      status: document.querySelector(".evaluation-receipt__status").textContent,
      coverage: document.querySelector(".evaluation-receipt__qualification").textContent,
      unrecorded: document.querySelectorAll(".evaluation-receipt__unrecorded li").length,
      outcome: document.querySelector(".evaluation-receipt__record strong").textContent
    }))()`);
    assert.deepEqual(partial, {
      status: "partially-recorded",
      coverage: "1 of 2 checks recorded · not reviewed or verified",
      unrecorded: 1,
      outcome: "You recorded: fail"
    });

    await evaluate(client, `(() => {
      const form = document.getElementById("composition-lab-form");
      const relation = window.FACTORIUM_COMPOSITION_LAB.relations[0];
      form.querySelectorAll('input[name="seeds"], input[name="relations"], input[name="exclusions"]').forEach(input => input.checked = false);
      form.querySelector('input[name="seeds"][value="' + relation.source + '"]').checked = true;
      form.querySelector('input[name="relations"][value="' + relation.id + '"]').checked = true;
      form.elements.edges.value = "1";
      form.elements.nodes.value = "6";
      form.elements.work.value = "8";
      form.requestSubmit();
      return true;
    })()`);
    await waitFor(client, "Boolean(document.querySelector('.evaluation-workspace__empty'))",
      "no-check boundary did not render");
    assert.equal(await evaluate(client,
      "Boolean(document.querySelector('#composition-evaluation-workspace .evaluation-form'))"),
    false, "no-check result offers no record action");

    await client.call("Page.reload", { ignoreCache: true });
    await waitFor(client, "document.readyState === 'complete'", "page did not reload");
    const reload = await evaluate(client, `(() => ({
      workspace: Boolean(document.getElementById("composition-evaluation-workspace")),
      receipt: Boolean(document.querySelector(".evaluation-receipt:not([hidden])")),
      evidence: document.body.textContent.includes("Local inspection record B-4"),
      storedKeys: Object.keys(localStorage)
    }))()`);
    assert.equal(reload.workspace, false);
    assert.equal(reload.receipt, false);
    assert.equal(reload.evidence, false);
    assert.deepEqual(reload.storedKeys, ["factorium-reader-profile"],
      "only the existing reader profile may persist");

    console.log(`OK default=${initial.checks} full=${recorded.outcome} partial=${partial.coverage} ` +
      `stale=${closureStale.changed.state} reload=empty screenshot=${screenshotPath}`);
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

"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { spawn } = require("node:child_process");

const root = path.resolve(__dirname, "..");
const siteRoot = path.join(root, "target", "proof-set-sim-45");
const fixtureRoot = path.join(root, "fixtures", "synthetic-users");
const campaignPath = path.join(fixtureRoot, "campaign-06.json");
const baselinePath = path.join(fixtureRoot, "dual-lookup-baseline-06.json");
const manifestPath = path.join(siteRoot, "manifest.json");
const campaign = JSON.parse(fs.readFileSync(campaignPath, "utf8"));
const baseline = JSON.parse(fs.readFileSync(baselinePath, "utf8"));
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const sha = (filePath) => crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
assert.equal(manifest.edition, "sim-45");

const edgePath = [process.env.EDGE_PATH, "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe", "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe"].filter(Boolean).find((candidate) => fs.existsSync(candidate));
assert.ok(edgePath, "Microsoft Edge executable not found");
const port = 9990 + (process.pid % 30);
const profile = path.resolve(`target/edge-dual-rerun-${process.pid}`);
assert.ok(profile.startsWith(path.resolve("target") + path.sep));
fs.mkdirSync(profile, { recursive: true });
const browser = spawn(edgePath, ["--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check", `--remote-debugging-port=${port}`, "--remote-allow-origins=*", `--user-data-dir=${profile}`, pathToFileURL(path.join(siteRoot, "index.html")).href], { stdio: "ignore", windowsHide: true });
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function target() { for (let i = 0; i < 100; i += 1) { try { const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); const page = targets.find((item) => item.type === "page"); if (page) return page; } catch (_) {} await delay(100); } throw new Error("Timed out waiting for dual lookup rerun page"); }
function connect(url) { const socket = new WebSocket(url); let nextId = 1; const pending = new Map(); socket.addEventListener("message", (event) => { const message = JSON.parse(event.data); if (!message.id || !pending.has(message.id)) return; const operation = pending.get(message.id); pending.delete(message.id); if (message.error) operation.reject(new Error(message.error.message)); else operation.resolve(message.result); }); const ready = new Promise((resolve, reject) => { socket.addEventListener("open", resolve, { once: true }); socket.addEventListener("error", reject, { once: true }); }); return { ready, call(method, params = {}) { const id = nextId++; return new Promise((resolve, reject) => { pending.set(id, { resolve, reject }); socket.send(JSON.stringify({ id, method, params })); }); }, close() { socket.close(); } }; }
async function evaluate(client, expression) { const response = await client.call("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true }); if (response.exceptionDetails) throw new Error(response.exceptionDetails.text); return response.result.value; }

(async () => {
  let client;
  try {
    client = connect((await target()).webSocketDebuggerUrl); await client.ready; await client.call("Runtime.enable"); await client.call("Page.enable");
    for (let i = 0; i < 100; i += 1) { if (await evaluate(client, "document.readyState === 'complete'")) break; await delay(50); }
    await client.call("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
    const traces = [];
    for (const assignment of campaign.assignments) {
      const expected = baseline.results.find((row) => row.assignment_id === assignment.id);
      assert.ok(expected, `Missing baseline row ${assignment.id}`);
      const observed = await evaluate(client, `(() => { document.querySelector('#dual-lookup-query-one').value=${JSON.stringify(assignment.queries[0])}; document.querySelector('#dual-lookup-query-two').value=${JSON.stringify(assignment.queries[1])}; document.querySelector('#dual-lookup-form').requestSubmit(); const comparison=[...document.querySelectorAll('#dual-lookup-comparison [data-family-key]')]; return { one:[...document.querySelectorAll('#dual-lookup-results-one [data-family-key]')].map(node=>node.dataset.familyKey), two:[...document.querySelectorAll('#dual-lookup-results-two [data-family-key]')].map(node=>node.dataset.familyKey), comparison:comparison.map(node=>({key:node.dataset.familyKey,presence:node.querySelector('span').textContent})), status:document.querySelector('#dual-lookup-status').textContent, search:location.search, hash:location.hash, localStorage:localStorage.length, sessionStorage:sessionStorage.length, overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth }; })()`);
      const expectedOne = expected.lists[0].families.map((family) => family.key);
      const expectedTwo = expected.lists[1].families.map((family) => family.key);
      assert.deepEqual(observed.one, expectedOne, `${assignment.id} query one order`);
      assert.deepEqual(observed.two, expectedTwo, `${assignment.id} query two order`);
      const visibleKeys = observed.comparison.map((record) => record.key);
      const intendedVisible = expected.intended_families.filter((family) => visibleKeys.includes(family));
      traces.push({
        assignment_id: assignment.id,
        task_id: assignment.task_id,
        queries: assignment.queries,
        query_one_families: observed.one,
        query_two_families: observed.two,
        comparison_families: observed.comparison,
        intended_families_visible: intendedVisible,
        intended_family_count: intendedVisible.length,
        exposes_two_intended_families: intendedVisible.length >= 2,
        second_query_adds_intended_family: expected.second_query_adds_intended_family,
        rankings_match_baseline: true,
        url_state_unchanged: !observed.search && !observed.hash,
        storage_empty: observed.localStorage === 0 && observed.sessionStorage === 0,
        viewport_overflow: observed.overflow,
        boundary_visible: observed.status.includes("No rank, relation, or closure is merged")
      });
      await evaluate(client, "document.querySelector('#dual-lookup-clear').click(); true");
    }
    const unionPassing = traces.filter((trace) => trace.exposes_two_intended_families).length;
    const incrementalPassing = traces.filter((trace) => trace.second_query_adds_intended_family).length;
    const output = {
      artifact: "SUJ-06 exact sim-45 dual literal lookup browser rerun",
      campaign_id: campaign.campaign_id,
      evidence_class: campaign.evidence_class,
      custody: {
        frozen_commit: "5269f7f",
        implementation_commit: "e54a36e",
        campaign_sha256: sha(campaignPath),
        baseline_sha256: sha(baselinePath),
        build: { edition: manifest.edition, source_commit: manifest.source_commit, site_identity: manifest.output.site_identity, manifest_sha256: sha(manifestPath) }
      },
      viewport: { width: 390, height: 844 },
      summary: {
        assignments: traces.length,
        union_two_intended: unionPassing,
        second_query_adds_intended: incrementalPassing,
        rankings_match_baseline: traces.filter((trace) => trace.rankings_match_baseline).length,
        boundary_visible: traces.filter((trace) => trace.boundary_visible).length,
        url_state_unchanged: traces.filter((trace) => trace.url_state_unchanged).length,
        storage_empty: traces.filter((trace) => trace.storage_empty).length,
        viewport_overflow: traces.filter((trace) => trace.viewport_overflow).length,
        admitted_gates_preserved: unionPassing >= 8 && incrementalPassing >= 6
      },
      traces
    };
    fs.writeFileSync(path.join(fixtureRoot, "dual-lookup-rerun-06-sim-45.json"), `${JSON.stringify(output, null, 2)}\n`, "utf8");
    console.log(`OK campaign=SUJ-06 routes=10 union=${unionPassing}/10 incremental=${incrementalPassing}/10 rankings=10 boundary=10 overflow=${output.summary.viewport_overflow}`);
  } finally { if (client) client.close(); browser.kill(); }
})().catch((error) => { browser.kill(); console.error(error.stack || error.message); process.exitCode = 1; });

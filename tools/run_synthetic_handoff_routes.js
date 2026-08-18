"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { spawn } = require("node:child_process");
const searchApi = require("../volumes/01-structure-quantity-choice/proof-set-search-families.js");

const root = path.resolve(__dirname, "..");
const edition = process.argv[2] || "sim-43";
assert.match(edition, /^sim-\d+$/, "edition must look like sim-N");
const siteRoot = path.join(root, "target", `proof-set-${edition}`);
const fixtureRoot = path.join(root, "fixtures", "synthetic-users");
const campaignPath = path.join(fixtureRoot, "campaign-04.json");
const campaign = JSON.parse(fs.readFileSync(campaignPath, "utf8"));
const records = JSON.parse(fs.readFileSync(path.join(siteRoot, "search-index.json"), "utf8"));
const recordByPath = new Map(records.map((record) => [record.path, record]));
const sha = (filePath) => crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
const edgePath = [process.env.EDGE_PATH, "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe", "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe"]
  .filter(Boolean).find((candidate) => fs.existsSync(candidate));
assert.ok(edgePath, "Microsoft Edge executable not found");
const manifestPath = path.join(siteRoot, "manifest.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
if (edition === campaign.baseline.edition) assert.equal(campaign.baseline.site_identity, manifest.output.site_identity);

const routePlans = campaign.assignments.map((assignment) => {
  const intendedFamilies = new Set(assignment.intended_paths.map((target) => {
    const record = recordByPath.get(target);
    assert.ok(record, `${assignment.id} target absent from sim-43: ${target}`);
    return record.familyKey || record.path;
  }));
  if (assignment.entrance !== "know-term") return { assignment, intendedFamilies: [...intendedFamilies] };
  const ranked = searchApi.searchRecords(records, assignment.first_action.query, "", "").slice(0, 20);
  const groups = searchApi.groupRecords(ranked);
  const groupIndex = groups.findIndex((group) => intendedFamilies.has(group.key));
  return { assignment, intendedFamilies: [...intendedFamilies], expectedGroup: groupIndex >= 0 ? { rank: groupIndex + 1, key: groups[groupIndex].key, title: groups[groupIndex].title, href: groups[groupIndex].href } : null };
});

const port = 9990 + (process.pid % 30);
const profile = path.resolve(`target/edge-handoff-${process.pid}`);
assert.ok(profile.startsWith(path.resolve("target") + path.sep));
fs.mkdirSync(profile, { recursive: true });
const browser = spawn(edgePath, ["--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check", `--remote-debugging-port=${port}`, "--remote-allow-origins=*", `--user-data-dir=${profile}`, pathToFileURL(path.join(siteRoot, "index.html")).href], { stdio: "ignore", windowsHide: true });
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function browserTarget() {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    try {
      const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      const page = targets.find((item) => item.type === "page");
      if (page) return page;
    } catch (_) {}
    await delay(100);
  }
  throw new Error("Timed out waiting for Edge SUJ-04 page");
}

function connect(url) {
  const socket = new WebSocket(url); let nextId = 1; const pending = new Map();
  socket.addEventListener("message", (event) => { const message = JSON.parse(event.data); if (!message.id || !pending.has(message.id)) return; const operation = pending.get(message.id); pending.delete(message.id); if (message.error) operation.reject(new Error(message.error.message)); else operation.resolve(message.result); });
  const ready = new Promise((resolve, reject) => { socket.addEventListener("open", resolve, { once: true }); socket.addEventListener("error", reject, { once: true }); });
  return { ready, call(method, params = {}) { const id = nextId++; return new Promise((resolve, reject) => { pending.set(id, { resolve, reject }); socket.send(JSON.stringify({ id, method, params })); }); }, close() { socket.close(); } };
}

async function evaluate(client, expression) {
  const response = await client.call("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
  if (response.exceptionDetails) throw new Error(response.exceptionDetails.text);
  return response.result.value;
}
async function navigate(client, fileName) {
  const match = /^([^?#]+)(.*)$/.exec(fileName);
  const url = pathToFileURL(path.join(siteRoot, match[1])).href + match[2];
  await client.call("Page.navigate", { url });
  for (let attempt = 0; attempt < 100; attempt += 1) { if (await evaluate(client, "document.readyState === 'complete'")) { await delay(25); return; } await delay(25); }
  throw new Error(`Timed out navigating ${fileName}`);
}

(async () => {
  let client;
  try {
    client = connect((await browserTarget()).webSocketDebuggerUrl); await client.ready;
    await client.call("Runtime.enable"); await client.call("Page.enable");
    await client.call("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
    const traces = [];
    for (const plan of routePlans) {
      const assignment = plan.assignment;
      let routeState = "entrance-only";
      let destination = null;
      let entranceObservation = {};
      if (assignment.entrance === "know-term") {
        const searchUrl = `index.html?q=${encodeURIComponent(assignment.first_action.query)}#search`;
        await navigate(client, searchUrl);
        const familyKeys = await evaluate(client, "[...document.querySelectorAll('#proof-search-results > [data-family-key]')].map(node => node.dataset.familyKey)");
        const familyIndex = familyKeys.findIndex((key) => plan.intendedFamilies.includes(key));
        entranceObservation = { query: assignment.first_action.query, ownership_groups_shown: familyKeys.length, intended_family_rank: familyIndex >= 0 ? familyIndex + 1 : null };
        if (familyIndex >= 0) {
          const href = await evaluate(client, `document.querySelectorAll('#proof-search-results > [data-family-key]')[${familyIndex}].querySelector('.proof-search__family-heading a').getAttribute('href')`);
          destination = { href, intended_family: familyKeys[familyIndex] };
          routeState = "destination-reached";
          await navigate(client, href);
        }
      } else if (assignment.entrance === "have-question") {
        await navigate(client, "compose.html");
        const starterId = assignment.first_action.starter_id;
        const starterExists = starterId ? await evaluate(client, `Boolean(document.querySelector('[data-starter-id=${JSON.stringify(starterId)}]'))`) : false;
        entranceObservation = { starter_id: starterId, exact_starter_available: starterExists };
        if (starterExists) {
          await evaluate(client, `document.querySelector('[data-load-starter=${JSON.stringify(starterId)}]').click(); true`);
          destination = { href: `compose.html#starter-${starterId}`, starter_id: starterId };
          routeState = "destination-reached";
        }
      } else {
        await navigate(client, "reader.html");
        const member = await evaluate(client, `(() => { const intended=${JSON.stringify(assignment.intended_paths)}; const nodes=[...document.querySelectorAll('[data-reader-path]')]; const node=nodes.find(item=>intended.includes(item.dataset.readerPath)); return node ? { path:node.dataset.readerPath, href:node.querySelector('a').getAttribute('href') } : null; })()`);
        entranceObservation = { teaching_route_records: await evaluate(client, "document.querySelectorAll('[data-reader-path]').length"), intended_route_member: Boolean(member) };
        if (member) { destination = member; routeState = "destination-reached"; await navigate(client, member.href); }
      }
      const page = await evaluate(client, `(() => { const task=${JSON.stringify(assignment.task)}; const text=document.body.innerText.replace(/\\s+/g,' ').trim(); const density=document.querySelectorAll('[data-reader-profile], [data-composition-profile]').length; const mainLinks=[...document.querySelectorAll('main a[href]')].filter(link=>!link.closest('.site-nav')); const handoff=document.querySelector('[data-factorium-handoff]'); return { title:document.title, href:location.pathname.split('/').pop()+location.hash, original_task_visible:text.includes(task), density_control_available:density===4, density_controls:density, related_routes_available:mainLinks.length>0, related_route_links:mainLinks.length, explicit_handoff_package:Boolean(handoff && handoff.getBoundingClientRect().height > 0), viewport_overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth }; })()`);
      traces.push({ assignment_id: assignment.id, task_id: assignment.task_id, task: assignment.task, entrance: assignment.entrance, start_href: assignment.start_href, first_action: assignment.first_action, intended_paths: assignment.intended_paths, task_fit_profile: assignment.task_fit_profile, entrance_observation: entranceObservation, destination, route_state: routeState, original_task_visible: page.original_task_visible, density_control_available: page.density_control_available, related_routes_available: page.related_routes_available, explicit_handoff_package: page.explicit_handoff_package, viewport_overflow: page.viewport_overflow, page_observation: page });
    }
    const repairRerun = edition !== campaign.baseline.edition;
    const output = { artifact: `SUJ-04 exact ${edition} browser route ${repairRerun ? "repair rerun" : "trace"}`, campaign_id: campaign.campaign_id, evidence_class: campaign.evidence_class, frozen_commit: "87d3daa", campaign_sha256: sha(campaignPath), baseline: campaign.baseline, ...(repairRerun ? { repair_build: { edition, source_commit: manifest.source_commit, site_identity: manifest.output.site_identity, manifest_sha256: sha(manifestPath) } } : {}), viewport: { width: 390, height: 844 }, traces };
    const outputName = repairRerun ? `repair-rerun-04-${edition}.json` : "browser-routes-04.json";
    fs.writeFileSync(path.join(fixtureRoot, outputName), `${JSON.stringify(output, null, 2)}\n`, "utf8");
    const reached = traces.filter((trace) => trace.route_state === "destination-reached").length;
    console.log(`OK campaign=SUJ-04 routes=25 reached=${reached} task-visible=${traces.filter((trace) => trace.original_task_visible).length} handoff=${traces.filter((trace) => trace.explicit_handoff_package).length} overflow=${traces.filter((trace) => trace.viewport_overflow).length}`);
  } finally { if (client) client.close(); browser.kill(); }
})().catch((error) => { browser.kill(); console.error(error.stack || error.message); process.exitCode = 1; });

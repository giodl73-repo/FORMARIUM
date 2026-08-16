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
const profile = path.resolve(`target/edge-composition-reading-profile-${process.pid}`);
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
  if (response.exceptionDetails) {
    throw new Error(response.exceptionDetails.exception?.description ||
      response.exceptionDetails.text);
  }
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
    let paletteSummary = "";
    if (editionNumber >= 19) {
      const paletteState = await evaluate(client, `(() => ({
        groups: document.querySelectorAll(".lab-concept-group").length,
        openGroups: document.querySelectorAll(".lab-concept-group[open]").length,
        concepts: document.querySelectorAll('.lab-concept-group input[name="seeds"]').length,
        readinessBadges: document.querySelectorAll(".lab-relation-readiness").length,
        readyRelations: document.querySelectorAll('.lab-choice[data-readiness="seed-ready"], .lab-choice[data-readiness="route-ready"]').length,
        selectedLabel: document.querySelector('input[name="seeds"]:checked')?.closest("label")?.querySelector("strong")?.textContent || "",
        summary: document.getElementById("composition-relation-readiness")?.textContent || ""
      }))()`);
      assert.equal(paletteState.groups, 6, "browser renders six concept groups");
      assert.equal(paletteState.openGroups, 1, "only selected topic opens initially");
      assert.equal(paletteState.concepts, 12, "browser retains 12 exact seed controls");
      assert.equal(paletteState.readinessBadges, 6, "browser renders six readiness badges");
      assert.equal(paletteState.readyRelations, 1, "default has one reachable relation");
      assert.equal(paletteState.selectedLabel, "dependency source, target, and direction",
        "palette uses exact human factor label");
      assert.match(paletteState.summary, /^1 of 6 relations structurally reachable/,
        "palette live summary");
      const disclosure = await evaluate(client, `(() => {
        const button = document.querySelector(".lab-palette-toggle");
        button.click();
        const opened = document.querySelectorAll(".lab-concept-group[open]").length;
        button.click();
        return {
          opened,
          collapsed: document.querySelectorAll(".lab-concept-group[open]").length,
          selected: document.querySelectorAll('input[name="seeds"]:checked').length
        };
      })()`);
      assert.deepEqual(disclosure, { opened: 6, collapsed: 1, selected: 1 },
        "palette disclosure never changes selection");
      const directionState = await evaluate(client, `(() => {
        const direction = document.querySelector('select[name="direction"]');
        const selectedRelation = document.querySelector('input[name="relations"]:checked');
        direction.value = "reverse";
        direction.dispatchEvent(new Event("change", { bubbles: true }));
        const reverse = {
          readiness: selectedRelation.closest("label").dataset.readiness,
          badge: selectedRelation.closest("label").querySelector(".lab-relation-readiness").textContent,
          selected: selectedRelation.checked
        };
        direction.value = "forward";
        direction.dispatchEvent(new Event("change", { bubbles: true }));
        return reverse;
      })()`);
      assert.equal(directionState.readiness, "needs-predecessor",
        "reverse direction changes structural predecessor");
      assert.match(directionState.badge, /^Needs /, "reverse badge names missing predecessor");
      assert.equal(directionState.selected, true, "readiness never clears selected relation");
      paletteSummary = ` palette=${paletteState.groups}x${paletteState.concepts}`;
    }
    let profileSummary = "";
    let defaultControlSnapshot = null;
    if (editionNumber >= 20) {
      const profileState = await evaluate(client, `(() => {
        const snapshot = () => [...document.getElementById("composition-lab-form").elements].map(node => ({
          tag: node.tagName, type: node.type, name: node.name, value: node.value,
          checked: Boolean(node.checked), disabled: Boolean(node.disabled)
        }));
        return {
          buttons: document.querySelectorAll("[data-composition-profile]").length,
          active: document.querySelector('[data-composition-profile][aria-pressed="true"]')?.dataset.compositionProfile || "",
          metadata: document.documentElement.dataset.compositionMetadata,
          density: document.documentElement.dataset.compositionDensity,
          exactDisplay: getComputedStyle(document.querySelector(".lab-choice code")).display,
          routeDisplay: getComputedStyle(document.querySelector(".composition-relation-route")).display,
          relationLabel: document.querySelector('input[name="relations"]')?.closest("label")?.querySelector("strong")?.textContent || "",
          snapshot: snapshot()
        };
      })()`);
      assert.equal(profileState.buttons, 4, "browser renders four composition profiles");
      assert.equal(profileState.active, "book", "Book is the fresh default");
      assert.equal(profileState.metadata, "essential", "Book uses essential metadata");
      assert.equal(profileState.density, "comfortable", "Book uses comfortable spacing");
      assert.equal(profileState.exactDisplay, "none", "Book folds exact audit identifiers");
      assert.notEqual(profileState.routeDisplay, "none", "Book shows human endpoint route");
      assert.equal(profileState.relationLabel, "F1 · Depends on", "Book uses short human relation label");
      defaultControlSnapshot = profileState.snapshot;
      const switched = await evaluate(client, `(() => {
        const snapshot = () => [...document.getElementById("composition-lab-form").elements].map(node => ({
          tag: node.tagName, type: node.type, name: node.name, value: node.value,
          checked: Boolean(node.checked), disabled: Boolean(node.disabled)
        }));
        const read = () => ({
          active: document.querySelector('[data-composition-profile][aria-pressed="true"]')?.dataset.compositionProfile || "",
          exactDisplay: getComputedStyle(document.querySelector(".lab-choice code")).display,
          routeDisplay: getComputedStyle(document.querySelector(".composition-relation-route")).display,
          helpDisplay: getComputedStyle(document.querySelector(".lab-help")).display,
          snapshot: snapshot()
        });
        document.querySelector('[data-composition-profile="compact"]').click();
        const compact = read();
        document.querySelector('[data-composition-profile="full"]').click();
        const full = read();
        document.querySelector('[data-composition-profile="book"]').click();
        return { compact, full, restored: read(), storage: Object.entries(localStorage) };
      })()`);
      assert.equal(switched.compact.active, "compact");
      assert.equal(switched.compact.exactDisplay, "none");
      assert.equal(switched.compact.routeDisplay, "none");
      assert.equal(switched.compact.helpDisplay, "none");
      assert.deepEqual(switched.compact.snapshot, defaultControlSnapshot,
        "Compact changes no query control");
      assert.equal(switched.full.active, "full");
      assert.notEqual(switched.full.exactDisplay, "none");
      assert.notEqual(switched.full.routeDisplay, "none");
      assert.deepEqual(switched.full.snapshot, defaultControlSnapshot,
        "Full changes no query control");
      assert.deepEqual(switched.restored.snapshot, defaultControlSnapshot,
        "Book restoration changes no query control");
      assert.deepEqual(switched.storage, [["factorium-reader-profile", "book"]],
        "only the shared profile name is stored");
      profileSummary = " profiles=4:book";
    }
    let queryPlanSummary = "";
    if (editionNumber >= 23) {
      const initialPlan = await evaluate(client, `(() => {
        const plan = document.getElementById("composition-query-plan");
        return {
          enhanced: plan.dataset.enhanced,
          labelled: Boolean(document.getElementById(plan.getAttribute("aria-labelledby"))),
          state: plan.dataset.controlState,
          alignment: plan.dataset.resultAlignment,
          stages: plan.querySelectorAll(".query-plan__stage").length,
          addLinks: plan.querySelectorAll(".query-plan__stage:first-child a").length,
          route: plan.querySelector(".query-plan__route")?.textContent || "",
          subtract: plan.querySelector(".query-plan__stage:nth-child(3) .query-plan__empty")?.textContent || "",
          boundary: plan.querySelector(".query-plan__boundary")?.textContent || "",
          exactDisplay: getComputedStyle(plan.querySelector(".composition-meta--full")).display
        };
      })()`);
      assert.equal(initialPlan.enhanced, "true", "query plan enhancement is installed");
      assert.equal(initialPlan.labelled, true, "query plan keeps its programmatic heading");
      assert.equal(initialPlan.state, "control-complete", "default controls are complete");
      assert.equal(initialPlan.alignment, "not-run", "default plan has not executed");
      assert.equal(initialPlan.stages, 3, "query plan shows Add, Multiply, and Subtract");
      assert.equal(initialPlan.addLinks, 1, "query plan links one selected concept into the book");
      assert.equal(initialPlan.route,
        "dependency source, target, and direction → interfaces and interaction contracts",
      "query plan shows the human forward route");
      assert.equal(initialPlan.subtract, "No exclusion requested.");
      assert.match(initialPlan.boundary, /^Not executed:/,
        "query plan keeps execution boundary visible");
      assert.equal(initialPlan.exactDisplay, "none", "Book folds exact plan custody");
      const partialPlan = await evaluate(client, `(() => {
        const form = document.getElementById("composition-lab-form");
        const seed = form.querySelector('input[name="seeds"]:checked');
        seed.checked = false;
        seed.dispatchEvent(new Event("input", { bubbles: true }));
        const partial = {
          state: document.getElementById("composition-query-plan").dataset.controlState,
          status: document.querySelector(".query-plan__status").textContent
        };
        seed.checked = true;
        seed.dispatchEvent(new Event("input", { bubbles: true }));
        return { partial, restored: document.getElementById("composition-query-plan").dataset.controlState };
      })()`);
      assert.deepEqual(partialPlan, {
        partial: { state: "needs-explicit-controls", status: "Needs explicit controls: Seeds." },
        restored: "control-complete"
      }, "query plan reports and recovers from a missing explicit seed");
      const planProfiles = await evaluate(client, `(() => {
        const form = document.getElementById("composition-lab-form");
        const snapshot = () => [...form.elements].map(node => ({ name: node.name,
          value: node.value, checked: Boolean(node.checked) }));
        const before = snapshot();
        document.querySelector('[data-composition-profile="full"]').click();
        const full = getComputedStyle(document.querySelector("#composition-query-plan .composition-meta--full")).display;
        document.querySelector('[data-composition-profile="book"]').click();
        return { full, same: JSON.stringify(before) === JSON.stringify(snapshot()) };
      })()`);
      assert.notEqual(planProfiles.full, "none", "Full reveals exact query-plan custody");
      assert.equal(planProfiles.same, true, "plan profile changes no controls");
      queryPlanSummary = " plan=control-complete";
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
    if (editionNumber >= 23) {
      assert.equal(await evaluate(client,
        `document.getElementById("composition-query-plan").dataset.resultAlignment`),
      "matches-displayed-result", "successful run binds the displayed result to current controls");
    }
    let mapSummary = "";
    if (editionNumber >= 21) {
      const mapState = await evaluate(client, `(() => {
        const map = document.getElementById("composition-closure-map");
        const audit = document.querySelector(".closure-map__audit");
        const route = document.getElementById("composition-reading-route");
        const artifacts = [...map.querySelectorAll(".closure-map__node[data-artifact]")]
          .map(node => node.dataset.artifact);
        return {
          exists: Boolean(map),
          nodes: map.querySelectorAll(".closure-map__node:not(.closure-map__node--frontier)").length,
          uniqueNodes: new Set(artifacts).size,
          edges: map.querySelectorAll(".closure-map__edge").length,
          scopes: map.querySelectorAll(".closure-map__scope-edge").length,
          frontiers: map.querySelectorAll(".closure-map__node--frontier").length,
          svgRole: map.querySelector("svg")?.getAttribute("role") || "",
          svgTitle: map.querySelector("svg title")?.textContent || "",
          svgDescription: map.querySelector("svg desc")?.textContent || "",
          recordNodes: map.querySelectorAll(".closure-map__records-body h4:first-of-type + ul > li").length,
          recordTraversals: map.querySelectorAll(".closure-map__records-body h4:nth-of-type(2) + ul > li").length,
          auditOpen: audit?.open,
          mapBeforeAudit: Boolean(map.compareDocumentPosition(audit) & Node.DOCUMENT_POSITION_FOLLOWING),
          auditBeforeRoute: Boolean(audit.compareDocumentPosition(route) & Node.DOCUMENT_POSITION_FOLLOWING),
          mapIdentity: map.querySelector(".closure-map__identity code")?.textContent || "",
          resultIdentity: document.querySelector(".lab-identity code")?.textContent || ""
        };
      })()`);
      assert.equal(mapState.exists, true, "browser renders closure map");
      assert.equal(mapState.nodes, 3, "map renders three admitted nodes");
      assert.equal(mapState.uniqueNodes, 3, "map nodes are unique by artifact");
      assert.equal(mapState.edges, 1, "map renders one typed traversal");
      assert.equal(mapState.scopes, 1, "map renders one non-semantic scope connector");
      assert.equal(mapState.frontiers, 0, "default map has no frontier ghost");
      assert.equal(mapState.svgRole, "img", "map SVG has image semantics");
      assert.equal(mapState.svgTitle, "Composition closure map", "map SVG has a title");
      assert.match(mapState.svgDescription, /3 admitted nodes, 1 typed traversals/,
        "map SVG has an exact count description");
      assert.equal(mapState.recordNodes, 3, "HTML alternative retains three node records");
      assert.equal(mapState.recordTraversals, 1,
        "HTML alternative retains one traversal record");
      assert.equal(mapState.auditOpen, false, "Book begins with exact stage audit folded");
      assert.equal(mapState.mapBeforeAudit, true, "map precedes exact stage audit");
      assert.equal(mapState.auditBeforeRoute, true, "audit precedes book route");
      assert.equal(mapState.mapIdentity, mapState.resultIdentity,
        "map inherits the exact local result identity");
      mapSummary = " map=3n/1e";
    }
    if (editionNumber >= 20) {
      const projected = await evaluate(client, `(() => {
        const identity = () => document.querySelector(".lab-identity code")?.textContent || "";
        const snapshot = () => [...document.getElementById("composition-lab-form").elements].map(node => ({
          tag: node.tagName, type: node.type, name: node.name, value: node.value,
          checked: Boolean(node.checked), disabled: Boolean(node.disabled)
        }));
        const before = identity();
        document.querySelector('[data-composition-profile="compact"]').click();
        const compact = {
          identity: identity(), snapshot: snapshot(),
          auditOpen: document.querySelector(".closure-map__audit")?.open
        };
        document.querySelector('[data-composition-profile="full"]').click();
        const full = {
          identity: identity(), snapshot: snapshot(),
          exactDisplay: getComputedStyle(document.querySelector(".lab-result code")).display,
          auditOpen: document.querySelector(".closure-map__audit")?.open
        };
        document.querySelector('[data-composition-profile="book"]').click();
        return {
          before, compact, full, restored: identity(),
          restoredAuditOpen: document.querySelector(".closure-map__audit")?.open
        };
      })()`);
      assert.match(projected.before, /^[0-9a-f]{64}$/, "browser result has exact SHA-256");
      assert.equal(projected.compact.identity, projected.before,
        "Compact leaves result identity unchanged");
      assert.equal(projected.full.identity, projected.before,
        "Full leaves result identity unchanged");
      assert.equal(projected.restored, projected.before,
        "Book restoration leaves result identity unchanged");
      assert.deepEqual(projected.compact.snapshot, defaultControlSnapshot,
        "post-result Compact changes no controls");
      assert.deepEqual(projected.full.snapshot, defaultControlSnapshot,
        "post-result Full changes no controls");
      assert.notEqual(projected.full.exactDisplay, "none", "Full reveals exact result custody");
      if (editionNumber >= 21) {
        assert.equal(projected.compact.auditOpen, false, "Compact folds exact stage audit");
        assert.equal(projected.full.auditOpen, true, "Full opens exact stage audit");
        assert.equal(projected.restoredAuditOpen, false, "Book refolds exact stage audit");
      }
    }
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
    if (editionNumber >= 21) {
      const mobileMap = await evaluate(client, `(() => {
        const scroll = document.querySelector(".closure-map__scroll");
        return { scrollWidth: scroll.scrollWidth, clientWidth: scroll.clientWidth,
          tabIndex: scroll.tabIndex };
      })()`);
      assert.ok(mobileMap.scrollWidth > mobileMap.clientWidth,
        "closure map remains horizontally accessible at 600 pixels");
      assert.equal(mobileMap.tabIndex, 0, "closure map scroll region is keyboard focusable");
    }
    if (editionNumber >= 20) {
      await evaluate(client,
        `document.querySelector('[data-composition-profile="full"]').click()`);
      await client.call("Page.reload");
      let reloaded;
      for (let attempt = 0; attempt < 80; attempt += 1) {
        reloaded = await evaluate(client, `(() => ({
          ready: document.readyState,
          enhanced: document.body.classList.contains("composition-views-ready"),
          active: document.querySelector('[data-composition-profile][aria-pressed="true"]')?.dataset.compositionProfile || "",
          resultEmpty: Boolean(document.querySelector(".lab-result__empty")),
          snapshot: [...document.getElementById("composition-lab-form").elements].map(node => ({
            tag: node.tagName, type: node.type, name: node.name, value: node.value,
            checked: Boolean(node.checked), disabled: Boolean(node.disabled)
          })),
          storage: Object.entries(localStorage)
        }))()`);
        if (reloaded.ready === "complete" && reloaded.enhanced) break;
        await delay(100);
      }
      assert.equal(reloaded.active, "full", "reload retains only the shared view preference");
      assert.equal(reloaded.resultEmpty, true, "reload deletes the composition result");
      assert.deepEqual(reloaded.snapshot, defaultControlSnapshot,
        "reload restores edition query defaults");
      assert.deepEqual(reloaded.storage, [["factorium-reader-profile", "full"]],
        "reload retains no work product in storage");
      await evaluate(client, `(() => {
        document.querySelector('[data-composition-profile="book"]').click();
        document.getElementById("composition-lab-form").dispatchEvent(
          new Event("submit", { bubbles: true, cancelable: true }));
      })()`);
      for (let attempt = 0; attempt < 80; attempt += 1) {
        const rerunPages = await evaluate(client,
          `document.querySelectorAll(".composition-reading-route__page").length`);
        if (rerunPages === 2) break;
        await delay(100);
      }
      assert.equal(await evaluate(client,
        `document.querySelectorAll(".composition-reading-route__page").length`), 2,
      "reloaded default query recreates the same reading route");
      if (editionNumber >= 21) {
        assert.equal(await evaluate(client,
          `document.querySelectorAll(".closure-map__node:not(.closure-map__node--frontier)").length`),
        3, "reloaded default query recreates the same unique-node map");
      }
    }
    let starterSummary = "";
    if (editionNumber >= 22) {
      await client.call("Page.navigate", { url: pathToFileURL(
        path.join(siteRoot, "compose.html")).href + "#starter-alert-outcome-feedback" });
      let routedStarter;
      for (let attempt = 0; attempt < 80; attempt += 1) {
        routedStarter = await evaluate(client, `(() => ({
          ready: document.readyState,
          active: document.querySelector('.composition-starter[data-active="true"]')?.dataset.starterId || "",
          direction: document.getElementById("composition-lab-form")?.elements.direction.value || "",
          empty: Boolean(document.querySelector(".lab-result__empty")),
          alignment: document.getElementById("composition-query-plan")?.dataset.resultAlignment || ""
        }))()`);
        if (routedStarter.ready === "complete" && routedStarter.active) break;
        await delay(50);
      }
      assert.deepEqual(routedStarter, { ready: "complete", active: "alert-outcome-feedback",
        direction: "reverse", empty: true,
        alignment: editionNumber >= 23 ? "not-run" : "" },
      "fixed homepage-style fragment loads reverse controls without running");
      if (editionNumber >= 23) {
        const reversePlan = await evaluate(client, `(() => ({
          state: document.getElementById("composition-query-plan").dataset.controlState,
          direction: document.querySelector(".query-plan__stage:nth-child(2) small")?.textContent || "",
          route: document.querySelector(".query-plan__route")?.textContent || "",
          boundary: document.querySelector(".query-plan__boundary")?.textContent || ""
        }))()`);
        assert.equal(reversePlan.state, "control-complete");
        assert.equal(reversePlan.direction, "reverse traversal");
        assert.equal(reversePlan.route,
          "monitoring method, window, and frequency → outcome measures and time horizon",
        "reverse starter plan shows traversal without reversing canonical semantics");
        assert.match(reversePlan.boundary, /^Not executed:/);
      }
      const loadedConflict = await evaluate(client, `(() => {
        document.querySelector('[data-load-starter="dependency-exclusion-conflict"]').click();
        const form = document.getElementById("composition-lab-form");
        return {
          cards: document.querySelectorAll(".composition-starter").length,
          active: document.querySelector('.composition-starter[data-active="true"]')?.dataset.starterId || "",
          hash: location.hash,
          empty: Boolean(document.querySelector(".lab-result__empty")),
          direction: form.elements.direction.value,
          seeds: form.querySelectorAll('input[name="seeds"]:checked').length,
          relations: form.querySelectorAll('input[name="relations"]:checked').length,
          exclusions: form.querySelectorAll('input[name="exclusions"]:checked').length,
          status: document.getElementById("composition-starters-status").textContent
        };
      })()`);
      assert.deepEqual(loadedConflict, {
        cards: 5,
        active: "dependency-exclusion-conflict",
        hash: "#starter-dependency-exclusion-conflict",
        empty: true,
        direction: "forward",
        seeds: 1,
        relations: 1,
        exclusions: 1,
        status: "Loaded “Required-interface conflict” from reviewed trace dependency-exclusion-conflict. The lab has not run; its checks will remain unresolved."
      }, "conflict starter loads controls without running");
      if (editionNumber >= 23) {
        const conflictPlan = await evaluate(client, `(() => ({
          exclusions: document.querySelectorAll(".query-plan__stage:nth-child(3) a").length,
          label: document.querySelector(".query-plan__stage:nth-child(3) a")?.textContent || "",
          predictsContradiction: document.getElementById("composition-query-plan").textContent.includes("contradictory")
        }))()`);
        assert.deepEqual(conflictPlan, { exclusions: 1,
          label: "interfaces and interaction contracts", predictsContradiction: false },
        "conflict starter plan shows subtraction without predicting result state");
      }
      await evaluate(client, `document.getElementById("composition-lab-form").dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true }))`);
      for (let attempt = 0; attempt < 80; attempt += 1) {
        if (await evaluate(client,
          `document.querySelector(".lab-state")?.textContent === "contradictory"`)) break;
        await delay(50);
      }
      assert.equal(await evaluate(client,
        `document.querySelector(".lab-state")?.textContent`), "contradictory",
      "conflict starter recomputes a contradictory unresolved draft");
      const loadedFrontier = await evaluate(client, `(() => {
        document.querySelector('[data-load-starter="delegated-compliance-frontier"]').click();
        const form = document.getElementById("composition-lab-form");
        const values = name => [...form.querySelectorAll('input[name="' + name + '"]:checked')].map(node => node.value).sort();
        return { empty: Boolean(document.querySelector(".lab-result__empty")),
          seeds: values("seeds"), relations: values("relations"), edges: form.elements.edges.value };
      })()`);
      assert.equal(loadedFrontier.empty, true, "loading another starter clears the prior result");
      assert.equal(loadedFrontier.seeds.length, 2);
      assert.deepEqual(loadedFrontier.relations,
        ["f2-delegation-authority", "f6-evidence-obligation"]);
      assert.equal(loadedFrontier.edges, "1");
      if (editionNumber >= 23) {
        const frontierPlan = await evaluate(client, `(() => ({
          add: document.querySelectorAll(".query-plan__stage:first-child a").length,
          multiply: document.querySelectorAll(".query-plan__stage:nth-child(2) li").length,
          bound: [...document.querySelectorAll(".query-plan__controls dd")].at(-1)?.textContent || "",
          predictsFrontier: document.querySelector(".query-plan__boundary").textContent.toLowerCase().includes("frontier")
        }))()`);
        assert.deepEqual(frontierPlan, { add: 2, multiply: 2,
          bound: "forward · depth 1 · edges 1 · nodes 4" +
            (editionNumber >= 24 ? " · work 13" : ""), predictsFrontier: false },
        "frontier starter plan exposes selections and bound without predicting closure");
      }
      await evaluate(client, `document.getElementById("composition-lab-form").dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true }))`);
      for (let attempt = 0; attempt < 80; attempt += 1) {
        if (await evaluate(client,
          `document.querySelector(".lab-state")?.textContent === "truncated"`)) break;
        await delay(50);
      }
      assert.equal(await evaluate(client,
        `document.querySelectorAll(".closure-map__node--frontier").length`), 1,
      "frontier starter recomputes one visible stopped node");
      if (editionNumber >= 23) {
        assert.equal(await evaluate(client,
          `document.getElementById("composition-query-plan").dataset.controlState`),
        "control-complete", "executed result leaves its explicit control receipt visible");
        assert.equal(await evaluate(client,
          `document.getElementById("composition-query-plan").dataset.resultAlignment`),
        "matches-displayed-result", "frontier result remains aligned to its controls");
      }
      const modified = await evaluate(client, `(() => {
        const problem = document.getElementById("composition-lab-form").elements.problem;
        problem.value += " Modified";
        problem.dispatchEvent(new Event("input", { bubbles: true }));
        return { hash: location.hash,
          active: document.querySelectorAll('.composition-starter[data-active="true"]').length,
          status: document.getElementById("composition-starters-status").textContent,
          planAlignment: document.getElementById("composition-query-plan")?.dataset.resultAlignment || "",
          planBoundary: document.querySelector(".query-plan__boundary")?.textContent || "" };
      })()`);
      assert.deepEqual(modified, { hash: "", active: 0,
        status: "Starter modified. The visible controls now define a new local request.",
        planAlignment: editionNumber >= 23 ? "controls-changed" : "",
        planBoundary: editionNumber >= 23 ?
          "Controls changed: the displayed result belongs to the previous request. Run again to evaluate this plan." : "" },
      "editing clears authored-route identity without persistence");
      starterSummary = " starters=5 conflict=contradictory frontier=truncated";
    }
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
      `stages=${route.stages.join(",")} mobile=one-column${paletteSummary}${profileSummary}${mapSummary} ` +
      `screenshot=${screenshotPath}${queryPlanSummary}${starterSummary}${focusSummary}`);
  } finally {
    if (client) client.close();
    browser.kill();
  }
})().catch((error) => {
  browser.kill();
  console.error(error.stack || error.message);
  process.exitCode = 1;
});

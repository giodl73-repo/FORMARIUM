"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const { spawn } = require("node:child_process");

const siteRoot = path.resolve(process.argv[2] || "target/proof-set-sim-66");
const screenshotPath = path.resolve(
  process.argv[3] || "target/sim66-dictionary-stream.png",
);
const manifest = JSON.parse(
  fs.readFileSync(path.join(siteRoot, "manifest.json"), "utf8"),
);
assert.equal(manifest.edition, "sim-66");

const edgePath = [
  process.env.EDGE_PATH,
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
]
  .filter(Boolean)
  .find((candidate) => fs.existsSync(candidate));
assert.ok(edgePath, "Microsoft Edge executable not found");

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
};
const server = http.createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  const file = path.resolve(siteRoot, `.${pathname}`);
  if (!file.startsWith(`${siteRoot}${path.sep}`) || !fs.existsSync(file)) {
    response.writeHead(404).end("Not found");
    return;
  }
  response.setHeader(
    "Content-Type",
    contentTypes[path.extname(file)] || "application/octet-stream",
  );
  fs.createReadStream(file).pipe(response);
});

const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

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
  return {
    ready: new Promise((resolve, reject) => {
      socket.addEventListener("open", resolve, { once: true });
      socket.addEventListener("error", reject, { once: true });
    }),
    call(method, params = {}) {
      const id = nextId++;
      return new Promise((resolve, reject) => {
        pending.set(id, { resolve, reject });
        socket.send(JSON.stringify({ id, method, params }));
      });
    },
    close() {
      socket.close();
    },
  };
}

async function evaluate(client, expression) {
  const response = await client.call("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (response.exceptionDetails) {
    throw new Error(
      response.exceptionDetails.exception?.description ||
        response.exceptionDetails.text,
    );
  }
  return response.result.value;
}

async function waitFor(client, expression, message) {
  for (let attempt = 0; attempt < 150; attempt += 1) {
    if (await evaluate(client, expression)) return;
    await delay(80);
  }
  throw new Error(message);
}

(async () => {
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const serverPort = server.address().port;
  const browserPort = 10600 + (process.pid % 50);
  const profile = path.resolve(`target/edge-dictionary-stream-${process.pid}`);
  fs.mkdirSync(profile, { recursive: true });
  const url = `http://127.0.0.1:${serverPort}/dictionary.html`;
  const browser = spawn(
    edgePath,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-first-run",
      "--no-default-browser-check",
      `--remote-debugging-port=${browserPort}`,
      "--remote-allow-origins=*",
      `--user-data-dir=${profile}`,
      url,
    ],
    { stdio: "ignore", windowsHide: true },
  );
  let client;
  try {
    let target;
    for (let attempt = 0; attempt < 100; attempt += 1) {
      try {
        const targets = await (
          await fetch(`http://127.0.0.1:${browserPort}/json/list`)
        ).json();
        target = targets.find(
          (candidate) =>
            candidate.type === "page" &&
            candidate.url.includes("/dictionary.html"),
        );
        if (target) break;
      } catch (_) {}
      await delay(100);
    }
    assert.ok(target, "Timed out waiting for the dictionary stream page");

    client = connect(target.webSocketDebuggerUrl);
    await client.ready;
    await client.call("Runtime.enable");
    await client.call("Page.enable");
    await waitFor(
      client,
      `document.querySelectorAll(".dictionary-stream__item").length >= 4`,
      "Initial dictionary batch did not load",
    );
    const initial = await evaluate(
      client,
      `(() => ({
        count: document.querySelectorAll(".dictionary-stream__item").length,
        kinds: Array.from(document.querySelectorAll(".dictionary-stream__item"))
          .slice(0, 4).map((item) => item.dataset.dictionaryKind),
        titles: Array.from(document.querySelectorAll(".dictionary-stream__item"))
          .slice(0, 4).map((item) =>
            item.querySelector("h1").textContent.replace(/\\s+/g, " ").trim()),
        status: document.querySelector("[data-dictionary-stream-status]").textContent,
        permalink: document.querySelector(".dictionary-stream__item-heading a").href
      }))()`,
    );
    assert.ok(initial.count >= 4 && initial.count < 304);
    assert.deepEqual(initial.kinds, ["pointer", "table", "pointer", "pointer"]);
    assert.deepEqual(initial.titles, [
      "Access",
      "Access, Permission, Authorization, and Entitlement",
      "Accumulation",
      "Action",
    ]);
    assert.match(initial.status, /Showing \d+ of 304 dictionary entries/);
    assert.match(initial.permalink, /\/pointers\/access\.html$/);

    const beforeScroll = initial.count;
    await evaluate(
      client,
      `document.querySelector("[data-dictionary-stream-load]").scrollIntoView(); true`,
    );
    await waitFor(
      client,
      `document.querySelectorAll(".dictionary-stream__item").length > ${beforeScroll}`,
      "Continuous scroll did not load another batch",
    );

    await client.call("Emulation.setDeviceMetricsOverride", {
      width: 390,
      height: 1200,
      deviceScaleFactor: 1,
      mobile: true,
    });
    await evaluate(
      client,
      `document.querySelector(".dictionary-stream__item").scrollIntoView(); true`,
    );
    const mobile = await evaluate(
      client,
      `(() => ({
        overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
        width: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        offenders: Array.from(document.querySelectorAll("body *"))
          .filter((element) => element.getBoundingClientRect().right >
            document.documentElement.clientWidth + 1)
          .slice(0, 8)
          .map((element) => ({
            tag: element.tagName,
            className: element.className,
            right: Math.round(element.getBoundingClientRect().right),
            scrollWidth: element.scrollWidth
          }))
      }))()`,
    );
    assert.equal(mobile.overflow, false, JSON.stringify(mobile));
    const shot = await client.call("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: false,
    });
    fs.writeFileSync(screenshotPath, Buffer.from(shot.data, "base64"));
    assert.ok(fs.statSync(screenshotPath).size > 20000);

    await client.call("Emulation.setDeviceMetricsOverride", {
      width: 1280,
      height: 1000,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await client.call("Page.navigate", {
      url: `http://127.0.0.1:${serverPort}/book.html`,
    });
    await waitFor(
      client,
      `document.readyState === "complete" &&
        document.querySelectorAll(".dictionary-book__item").length === 304`,
      "Condensed book did not load",
    );
    const book = await evaluate(
      client,
      `(() => ({
        items: document.querySelectorAll(".dictionary-book__item").length,
        pointers: document.querySelectorAll('[data-dictionary-kind="pointer"]').length,
        tables: document.querySelectorAll('[data-dictionary-kind="table"]').length,
        columns: getComputedStyle(document.querySelector(".dictionary-book__entries"))
          .columnCount,
        itemBreak: getComputedStyle(document.querySelector(".dictionary-book__item"))
          .breakInside,
        supplements: document.querySelectorAll(".dictionary-book__supplement").length,
        openSupplements: document.querySelectorAll(".dictionary-book__supplement[open]").length,
        selectedView: document.querySelector("[data-dictionary-view]").value,
        chrome: document.querySelectorAll(
          ".site-header, .site-handoff, .dictionary-sequence, .pointer-owner, .table-navigator"
        ).length,
        first: Array.from(document.querySelectorAll(".dictionary-book__item"))
          .slice(0, 3).map((item) =>
            item.querySelector(".dictionary-book__content > h2").textContent
              .replace(/\\s+/g, " ").trim())
      }))()`,
    );
    assert.deepEqual(book, {
      items: 304,
      pointers: 250,
      tables: 54,
      columns: "2",
      itemBreak: "auto",
      supplements: 183,
      openSupplements: 0,
      selectedView: "book.html",
      chrome: 0,
      first: [
        "Access",
        "Access, Permission, Authorization, and Entitlement",
        "Accumulation",
      ],
    });
    await evaluate(
      client,
      `document.querySelector(".dictionary-book__supplement").open = true`,
    );
    assert.equal(
      await evaluate(
        client,
        `document.querySelector(".dictionary-book__supplement").open`,
      ),
      true,
    );
    await client.call("Emulation.setEmulatedMedia", { media: "print" });
    const printBook = await evaluate(
      client,
      `(() => ({
        columns: getComputedStyle(document.querySelector(".dictionary-book__entries"))
          .columnCount,
        tools: getComputedStyle(document.querySelector(".dictionary-book__tools"))
          .display,
        standalone: getComputedStyle(
          document.querySelector(".dictionary-book__item-heading a")
        ).display,
        supplement: getComputedStyle(
          document.querySelector(".dictionary-book__supplement")
        ).display,
        itemBreak: getComputedStyle(
          document.querySelector(".dictionary-book__item")
        ).breakInside
      }))()`,
    );
    assert.deepEqual(printBook, {
      columns: "2",
      tools: "none",
      standalone: "none",
      supplement: "none",
      itemBreak: "auto",
    });
    await client.call("Emulation.setEmulatedMedia", { media: "screen" });
    await client.call("Emulation.setDeviceMetricsOverride", {
      width: 390,
      height: 1200,
      deviceScaleFactor: 1,
      mobile: true,
    });
    const mobileBook = await evaluate(
      client,
      `(() => ({
        overflow: document.documentElement.scrollWidth >
          document.documentElement.clientWidth,
        columns: getComputedStyle(document.querySelector(".dictionary-book__entries"))
          .columnCount,
        width: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        offenders: Array.from(document.querySelectorAll("body *"))
          .filter((element) => element.getBoundingClientRect().right >
            document.documentElement.clientWidth + 1)
          .slice(0, 8)
          .map((element) => ({
            tag: element.tagName,
            className: element.className,
            right: Math.round(element.getBoundingClientRect().right),
            scrollWidth: element.scrollWidth
          }))
      }))()`,
    );
    assert.equal(mobileBook.overflow, false, JSON.stringify(mobileBook));
    assert.equal(mobileBook.columns, "1");
    const bookShot = await client.call("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: false,
    });
    const bookScreenshotPath = screenshotPath.replace(/\.png$/i, "-book.png");
    fs.writeFileSync(bookScreenshotPath, Buffer.from(bookShot.data, "base64"));
    assert.ok(fs.statSync(bookScreenshotPath).size > 20000);
    console.log(
      `OK dictionary-stream initial=${initial.count} next>${beforeScroll} ` +
        `book=304 columns=2/1 mobile=390 screenshot=${screenshotPath}`,
    );
  } finally {
    if (client) client.close();
    browser.kill();
    await new Promise((resolve) => server.close(resolve));
  }
})().catch((error) => {
  server.close();
  console.error(error.stack || error.message);
  process.exitCode = 1;
});

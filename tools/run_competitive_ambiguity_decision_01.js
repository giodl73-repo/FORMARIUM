"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const readJson = (relative) => JSON.parse(fs.readFileSync(path.join(root, relative), "utf8"));
const plan = readJson("fixtures/competitive-reference/campaign-01.json");
const webCapture = readJson("fixtures/competitive-reference/web-status-quo-capture-01.json");
const records = readJson("target/proof-set-sim-48/search-index.json");
const search = require(path.join(root, "volumes", "01-structure-quantity-choice", "proof-set-search-families.js"));
const chooser = require(path.join(root, "volumes", "01-structure-quantity-choice", "proof-set-scale-chooser.js"));
const hash = (value) => crypto.createHash("sha256").update(value).digest("hex");
const clip = (value, length = 600) => String(value || "").replace(/\s+/g, " ").trim().slice(0, length);
const stripHtml = (value) => clip(String(value || "").replace(/<[^>]+>/g, " "));

async function getText(url) {
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const response = await fetch(url, { headers: { "user-agent": "Factorium-CAD-01/1.0 (internal reference audit)" } });
    const text = await response.text();
    if (response.ok) return { text, status: response.status, final_url: response.url };
    if (response.status !== 429 || attempt === 3) throw new Error(`${response.status} ${url}`);
    await new Promise((resolve) => setTimeout(resolve, 750 * (attempt + 1)));
  }
  throw new Error(`unreachable ${url}`);
}

const wordnetDir = path.join(root, plan.capture.wordnet_source);
const wordnetIndex = new Map();
for (const filename of fs.readdirSync(wordnetDir).filter((name) => /^noun\..+\.json$/.test(name)).sort()) {
  const data = readJson(path.relative(root, path.join(wordnetDir, filename)));
  for (const [id, synset] of Object.entries(data)) {
    for (const member of synset.members || []) {
      const key = member.toLowerCase().replace(/[_-]+/g, " ").trim();
      if (!wordnetIndex.has(key)) wordnetIndex.set(key, []);
      wordnetIndex.get(key).push({
        id,
        members: (synset.members || []).slice(0, 12),
        definition: clip(synset.definition, 240),
        relation_kinds: Object.keys(synset).filter((key) => Array.isArray(synset[key]) && key !== "members" && synset[key].length).sort()
      });
    }
  }
}

async function captureQuery(query) {
  const ranked = search.searchRecords(records, query, "", "");
  const uniqueFamilies = [];
  const seen = new Set();
  for (const record of ranked) {
    const key = record.familyKey || record.path;
    if (seen.has(key)) continue;
    seen.add(key);
    uniqueFamilies.push(record);
    if (uniqueFamilies.length === 5) break;
  }
  const routes = chooser.routesForQuery(query, records) || [];
  const factorium = {
    available: uniqueFamilies.length > 0,
    first_output: uniqueFamilies.map((record) => ({ title: record.familyTitle || record.title, path: record.familyKey || record.path, summary: clip(record.summary, 280) })),
    explicit_meaning_routes: routes.map((route) => ({ label: route.label, path: route.path })),
    opened_outputs: uniqueFamilies.slice(0, 2).map((record) => ({
      title: record.familyTitle || record.title,
      path: record.familyKey || record.path,
      visible_text: clip(record.text, 5000),
      sha256: hash(record.text)
    }))
  };

  const wikiSearchUrl = `https://en.wikipedia.org/w/index.php?search=${encodeURIComponent(query)}`;
  let wikipedia;
  try {
    const response = await getText(wikiSearchUrl);
    const title = clip((response.text.match(/<title>(.*?)<\/title>/is) || [])[1], 180);
    const headings = [...response.text.matchAll(/<h[12][^>]*>(.*?)<\/h[12]>/gis)].map((match) => stripHtml(match[1])).filter(Boolean).slice(0, 20);
    const paragraphs = [...response.text.matchAll(/<p[^>]*>(.*?)<\/p>/gis)].map((match) => stripHtml(match[1], 320)).filter((value) => value.length >= 40).slice(0, 8);
    wikipedia = {
      available: true,
      urls: [wikiSearchUrl, response.final_url],
      first_output: [{ title, headings, paragraphs }],
      opened_outputs: [],
      sha256: hash(response.text)
    };
  } catch (error) {
    wikipedia = { available: false, error: error.message, urls: [wikiSearchUrl] };
  }

  const mwOriginal = `https://www.merriam-webster.com/thesaurus/${encodeURIComponent(query)}`;
  const mwCaptureUrl = `https://r.jina.ai/http://www.merriam-webster.com/thesaurus/${encodeURIComponent(query)}`;
  let merriamWebster;
  try {
    const response = await getText(mwCaptureUrl);
    const lines = response.text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    const structuralLines = lines.filter((line) => /^(Title:|#{1,4}\s|as in\b|Definition of\b|Synonyms|Antonyms|Near Antonyms)/i.test(line)).slice(0, 36);
    const chooserIndex = lines.findIndex((line) => /^##\s+Synonym Chooser/i.test(line.replace(/[*_]/g, "")));
    const chooserExcerpt = chooserIndex < 0 ? "" : clip(lines.slice(chooserIndex, chooserIndex + 18).join(" "), 800);
    merriamWebster = {
      available: true,
      original_url: mwOriginal,
      capture_url: mwCaptureUrl,
      first_output: structuralLines.map((line) => clip(line, 180)),
      synonym_chooser_excerpt: chooserExcerpt,
      opened_outputs: [],
      sha256: hash(response.text)
    };
  } catch (error) {
    merriamWebster = { available: false, error: error.message, original_url: mwOriginal, capture_url: mwCaptureUrl };
  }

  const oneLookUrl = `https://onelook.com/thesaurus?s=${encodeURIComponent(query)}`;
  const datamuseUrl = `https://api.datamuse.com/words?ml=${encodeURIComponent(query)}&md=dps&max=20`;
  let oneLook;
  try {
    const response = await getText(datamuseUrl);
    const words = JSON.parse(response.text);
    oneLook = {
      available: true,
      original_url: oneLookUrl,
      capture_url: datamuseUrl,
      proxy_note: "Official Datamuse API core used by OneLook; the OneLook interface describes its version as souped-up.",
      first_output: words.map((item) => ({ word: item.word, tags: item.tags || [], definitions: (item.defs || []).slice(0, 2).map((definition) => clip(definition, 180)) })),
      opened_outputs: [],
      sha256: hash(response.text)
    };
  } catch (error) {
    oneLook = { available: false, error: error.message, original_url: oneLookUrl, capture_url: datamuseUrl };
  }

  const wordnetSynsets = wordnetIndex.get(query) || [];
  const wordnet = {
    available: wordnetSynsets.length > 0,
    source: "Open English WordNet 2025 local frozen data",
    first_output: wordnetSynsets,
    opened_outputs: [],
    source_path: plan.capture.wordnet_source,
    sha256: hash(JSON.stringify(wordnetSynsets))
  };

  const web = webCapture.queries.find((item) => item.query === query);
  return { query, factorium, web_search_status_quo: web, wikipedia, merriam_webster_thesaurus: merriamWebster, onelook_thesaurus: oneLook, open_english_wordnet_2025: wordnet };
}

(async () => {
  const captures = [];
  for (const query of plan.queries) {
    captures.push(await captureQuery(query));
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
  const result = {
    campaign_id: plan.campaign_id,
    status: "capture-complete-unscored",
    captured_on: "2026-08-17",
    candidate: plan.candidate,
    capture_contract: plan.capture,
    queries: captures
  };
  const output = path.join(root, "fixtures", "competitive-reference", "captures-01.json");
  fs.writeFileSync(output, `${JSON.stringify(result, null, 2)}\n`);
  const available = captures.flatMap((item) => [item.factorium, item.wikipedia, item.merriam_webster_thesaurus, item.onelook_thesaurus, item.open_english_wordnet_2025]).filter((item) => item.available).length;
  console.log(`OK campaign=${plan.campaign_id} queries=${captures.length} product-captures=${captures.length * 6} network-or-local-available=${available}/60 web-seed=12`);
})().catch((error) => { console.error(error); process.exitCode = 1; });

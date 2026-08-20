"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const check = process.argv.includes("--check");
const outputs = [];

function normalizeNewlines(text) {
  return text.replace(/\r\n?/g, "\n");
}

function read(relative) {
  return normalizeNewlines(
    fs.readFileSync(path.join(root, relative), "utf8"),
  );
}

function sha256(text) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

function emit(relative, text) {
  const target = path.join(root, relative);
  if (check) {
    if (
      !fs.existsSync(target) ||
      normalizeNewlines(fs.readFileSync(target, "utf8")) !== text
    ) {
      throw new Error(`stale generated contract: ${relative}`);
    }
  } else {
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, text, "utf8");
  }
  outputs.push(relative);
}

const lexiconPublicationSource = read(
  "tables/entries/factorium-entry-publication.md",
)
  .replaceAll("Factorium", "Lexicon")
  .replace(
    "../procedures/entry-publication.md",
    "../procedures/lexicon-entry-publication.md",
  )
  .replace(
    "../scales/editorial-maturity.md",
    "../scales/lexicon-editorial-maturity.md",
  );
emit(
  "tables/entries/lexicon-entry-publication.md",
  lexiconPublicationSource,
);
const lexiconPublicationSourceSha256 = sha256(lexiconPublicationSource);
const lexiconProcedureSource = read("tables/procedures/entry-publication.md")
  .replaceAll("Factorium", "Lexicon")
  .replace(
    "../entries/factorium-entry-publication.md",
    "../entries/lexicon-entry-publication.md",
  );
emit(
  "tables/procedures/lexicon-entry-publication.md",
  lexiconProcedureSource,
);
const lexiconProcedureSourceSha256 = sha256(lexiconProcedureSource);
const lexiconScaleSource = read("tables/scales/editorial-maturity.md")
  .replaceAll("Factorium", "Lexicon")
  .replace(
    "../entries/factorium-entry-publication.md",
    "../entries/lexicon-entry-publication.md",
  );
emit("tables/scales/lexicon-editorial-maturity.md", lexiconScaleSource);
const lexiconScaleSourceSha256 = sha256(lexiconScaleSource);
emit(
  "specs/LEXICON-ENTRY-GRAPH.md",
  read("specs/FACTORIUM-ENTRY-GRAPH.md").replaceAll("Factorium", "Lexicon"),
);

const legacyReference = read("reference/factorium-reference-v2.factorium");
function sortReferenceRecords(text) {
  const lines = text.trimEnd().split("\n");
  const header = lines.shift();
  const end = lines.pop();
  const entries = [];
  const views = [];
  while (lines.length > 0) {
    const first = lines.shift();
    const type = first.startsWith("entry ")
      ? "entry"
      : first.startsWith("view ")
        ? "view"
        : null;
    if (!type) {
      throw new Error(`unexpected reference record: ${first}`);
    }
    const block = [first];
    const terminator = `end-${type}`;
    while (block.at(-1) !== terminator) {
      if (lines.length === 0) {
        throw new Error(`unterminated ${type} record`);
      }
      block.push(lines.shift());
    }
    (type === "entry" ? entries : views).push(block);
  }
  const byId = (left, right) => (left[0] < right[0] ? -1 : left[0] > right[0] ? 1 : 0);
  entries.sort(byId);
  views.sort(byId);
  return `${header}\n${[...entries, ...views].flat().join("\n")}\n${end}\n`;
}

const reference = sortReferenceRecords(
  legacyReference
  .replace(/^factorium-reference-v2\n/, "lexicon-reference-v4\n")
  .split("\n")
  .map((line) => {
    if (line.startsWith("entry factorium-entry-publication | ")) {
      return line
        .replace(
          "entry factorium-entry-publication | Factorium Entry Publication |",
          "entry lexicon-entry-publication | Lexicon Entry Publication |",
        )
        .replace(
          "tables/entries/factorium-entry-publication.md",
          "tables/entries/lexicon-entry-publication.md",
        )
        .replace(
          " | Factorium publication is ",
          " | Lexicon publication is ",
        );
    }
    if (
      line.startsWith("view procedure-entry-publication | ") ||
      line.startsWith("view scale-editorial-maturity | ")
    ) {
      const renamedOwner = line.replace(
        " | factorium-entry-publication | ",
        " | lexicon-entry-publication | ",
      );
      return renamedOwner
        .replace(
          "tables/procedures/entry-publication.md",
          "tables/procedures/lexicon-entry-publication.md",
        )
        .replace(
          "tables/scales/editorial-maturity.md",
          "tables/scales/lexicon-editorial-maturity.md",
        );
    }
    return line;
  })
  .join("\n"),
);
emit("reference/lexicon-reference-v4.lexicon", reference);

const legacyRelations = read("reference/factorium-relations-v0.factorium");
const relations = legacyRelations.replace(
  /^factorium-relations-v0\n/,
  "lexicon-relations-v2\n",
);
emit("reference/lexicon-relations-v2.lexicon", relations);

const legacyRelationSha256 = sha256(legacyRelations);
const relationSha256 = sha256(relations);
const assuranceLines = read("reference/factorium-assurance-v2.factorium")
  .replace(/^factorium-assurance-v2\n/, "lexicon-assurance-v4\n")
  .replace(
    /^review entry:factorium-entry-publication /m,
    "review entry:lexicon-entry-publication ",
  )
  .split("\n")
  .map((line) =>
    line.startsWith("review relation:")
      ? line.replace(` | ${legacyRelationSha256} | `, ` | ${relationSha256} | `)
      : line.startsWith("review entry:lexicon-entry-publication ")
        ? line.replace(
            /^review entry:lexicon-entry-publication \| [a-f0-9]{64} \| /,
            `review entry:lexicon-entry-publication | ${lexiconPublicationSourceSha256} | `,
          )
        : line.startsWith("review view:procedure-entry-publication ")
          ? line.replace(
              /^review view:procedure-entry-publication \| [a-f0-9]{64} \| /,
              `review view:procedure-entry-publication | ${lexiconProcedureSourceSha256} | `,
            )
          : line.startsWith("review view:scale-editorial-maturity ")
            ? line.replace(
                /^review view:scale-editorial-maturity \| [a-f0-9]{64} \| /,
                `review view:scale-editorial-maturity | ${lexiconScaleSourceSha256} | `,
              )
            : line,
  )
  .filter((line) => line !== "lexicon-assurance-v4" && line !== "end-assurance" && line !== "")
  .sort();
const assurance = `lexicon-assurance-v4\n${assuranceLines.join("\n")}\nend-assurance\n`;
emit("reference/lexicon-assurance-v4.lexicon", assurance);

const referenceSha256 = sha256(reference);
const queryDirectory = path.join(root, "fixtures", "composition");
for (const name of fs
  .readdirSync(queryDirectory)
  .filter((candidate) => candidate.endsWith(".factorium-query"))
  .sort()) {
  const query = read(path.join("fixtures", "composition", name))
    .replace(
      /^factorium-composition-query-v0\n/,
      "lexicon-composition-query-v2\n",
    )
    .replace(
      /^source [a-f0-9]{64} \| [a-f0-9]{64}$/m,
      `source ${referenceSha256} | ${relationSha256}`,
    );
  emit(
    path.join(
      "fixtures",
      "composition",
      name.replace(/\.factorium-query$/, ".lexicon-query"),
    ),
    query,
  );
}

function pointerRows(relative, visited = new Set()) {
  if (visited.has(relative)) {
    throw new Error(`pointer registry inheritance cycle: ${relative}`);
  }
  visited.add(relative);
  const lines = read(relative).trimEnd().split(/\r?\n/);
  if (lines.at(-1) !== "end-factorium-pointer-registry") {
    throw new Error(`invalid legacy pointer registry: ${relative}`);
  }
  if (lines[0] === "factorium-pointer-registry-v0") {
    return lines.slice(1, -1);
  }
  if (lines[0] !== "factorium-pointer-registry-delta-v0") {
    throw new Error(`unknown legacy pointer registry: ${relative}`);
  }
  const match = /^extends (.+)$/.exec(lines[1]);
  if (!match) {
    throw new Error(`missing pointer registry base: ${relative}`);
  }
  return [
    ...pointerRows(path.join(path.dirname(relative), match[1]), visited),
    ...lines.slice(2, -1),
  ];
}

const pointers = pointerRows(
  "volumes/01-structure-quantity-choice/proof-set-pointer-registry-v12.factorium",
);
emit(
  "volumes/01-structure-quantity-choice/lexicon-pointer-registry-v1.lexicon",
  `lexicon-pointer-registry-v1\n${pointers.join("\n")}\nend-lexicon-pointer-registry\n`,
);

const labAllowlist = read(
  "volumes/01-structure-quantity-choice/proof-set-composition-lab-relations.factorium",
)
  .replace(
    /^factorium-composition-lab-relations-v0\n/,
    "lexicon-composition-lab-relations-v1\n",
  );
emit(
  "volumes/01-structure-quantity-choice/lexicon-composition-lab-relations.lexicon",
  labAllowlist,
);

console.log(
  `${check ? "checked" : "generated"}=${outputs.length} reference=${referenceSha256} relations=${relationSha256} pointers=${pointers.length}`,
);

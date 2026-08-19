const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const packet = path.join(
  root,
  "docs",
  "research",
  "formography",
  "practitioner-evaluation-v0",
);

function read(name) {
  return fs.readFileSync(path.join(packet, name), "utf8").trimEnd();
}

function parseCsv(name) {
  return read(name)
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => line.split(","));
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const protocol = JSON.parse(read("practitioner-protocol-v0.json"));
const scoring = JSON.parse(read("scoring-contract-v0.json"));
const manifest = JSON.parse(
  fs.readFileSync(
    path.join(
      root,
      "docs",
      "research",
      "formography",
      "formography-research-module-manifest.json",
    ),
    "utf8",
  ),
);
const responseRows = parseCsv("participant-response-form-v0.csv");
const [header, ...assignments] = parseCsv("randomization-v0.csv");
const [responseHeader] = responseRows;
const [slotIndex, positionIndex, caseIndex, labelIndex] = [
  "participant_slot",
  "case_position",
  "case_id",
  "displayed_label",
].map((field) => header.indexOf(field));

assert(protocol.design.participant_slots === 12, "expected 12 participant slots");
assert(assignments.length === 36, "expected 36 case assignments");
assert(responseRows.length === 1, "response form must contain only its header");
assert(
  JSON.stringify(responseHeader) ===
    JSON.stringify(Object.keys(scoring.field_contracts)),
  "response form header must match the ordered scoring field contract",
);
assert(
  new Set(responseHeader).size === responseHeader.length,
  "response form header must not contain duplicate fields",
);
assert(
  scoring.expected_rows_at_completion === 36,
  "scoring contract must expect one row per assignment",
);
assert(
  scoring.adjudication.promotion_analysis_requires_all_12_eligible_slots === true,
  "promotion analysis must require the complete eligible sample",
);
assert(
  scoring.field_contracts.terminology_preference.required_on_position === 3 &&
    scoring.field_contracts.terminology_burden.required_on_position === 3,
  "participant-level terminology fields must be recorded once on position 3",
);
assert(
  Object.keys(scoring.case_scoring).sort().join(",") ===
    protocol.design.case_ids.slice().sort().join(","),
  "every protocol case must have one scoring anchor",
);
assert(
  protocol.boundaries.human_evidence_available === false,
  "human evidence must remain false before sessions",
);
assert(
  protocol.boundaries.promotion_authorized === false &&
    manifest.independent_coding_v1_promotion_gate === false,
  "promotion must remain unauthorized",
);

const excluded = protocol.design.excluded_participants.join(" ").toLowerCase();
assert(excluded.includes("model agents"), "model agents must be excluded");
assert(excluded.includes("synthetic personas"), "synthetic personas must be excluded");

const slots = new Set(assignments.map((row) => row[slotIndex]));
assert(slots.size === 12, "expected 12 distinct anonymous slots");

const sortedSlots = [...slots].sort();
for (const slot of sortedSlots) {
  const rows = assignments.filter((row) => row[slotIndex] === slot);
  assert(rows.length === 3, `${slot} must have three cases`);
  assert(new Set(rows.map((row) => row[caseIndex])).size === 3, `${slot} repeats a case`);
  assert(
    rows.map((row) => Number(row[positionIndex])).sort().join(",") === "1,2,3",
    `${slot} must use all three positions`,
  );
}

for (let index = 0; index < sortedSlots.length; index += 2) {
  const pair = sortedSlots.slice(index, index + 2);
  assert(pair.length === 2, "every schedule must have a complementary pair");
  const pairRows = pair.map((slot) =>
    assignments
      .filter((row) => row[slotIndex] === slot)
      .sort((left, right) => Number(left[positionIndex]) - Number(right[positionIndex])),
  );
  for (let position = 0; position < 3; position += 1) {
    assert(
      pairRows[0][position][caseIndex] === pairRows[1][position][caseIndex],
      `${pair.join("/")} must use the same case order`,
    );
    assert(
      pairRows[0][position][labelIndex] !== pairRows[1][position][labelIndex],
      `${pair.join("/")} must use complementary labels`,
    );
  }
}

for (const caseId of protocol.design.case_ids) {
  const rows = assignments.filter((row) => row[caseIndex] === caseId);
  assert(rows.length === 12, `${caseId} must appear once per slot`);
  for (const label of protocol.design.labels) {
    assert(
      rows.filter((row) => row[labelIndex] === label).length === 6,
      `${caseId} must appear six times under ${label}`,
    );
  }
  for (const position of ["1", "2", "3"]) {
    assert(
      rows.filter((row) => row[positionIndex] === position).length === 4,
      `${caseId} must appear four times in position ${position}`,
    );
    for (const label of protocol.design.labels) {
      assert(
        rows.filter(
          (row) => row[positionIndex] === position && row[labelIndex] === label,
        ).length === 2,
        `${caseId} position ${position} must appear twice under ${label}`,
      );
    }
  }
}

const methodCard = read("participant-method-card-v0.md");
assert(
  methodCard.match(/\{\{METHOD_LABEL\}\}/g)?.length === 1,
  "method card must contain one label placeholder",
);
assert(
  !methodCard.includes("Governed Property Graph") && !methodCard.includes("Formography"),
  "method body must not embed either tested label",
);

const recruitment = read("recruitment-handoff-v0.md");
const invitation = recruitment.split("## Eligibility")[0];
assert(
  !invitation.includes("Formography") &&
    !invitation.includes("Governed Property Graph"),
  "neutral invitation must not reveal either tested label",
);
assert(
  recruitment.includes("no name") &&
    recruitment.includes("employer") &&
    recruitment.includes("confidential"),
  "recruitment handoff must retain privacy warnings",
);

console.log(
  "practitioner protocol: slots=12, assignments=36, labels=6/6 per case, positions=4/4/4 per case, responses=0",
);

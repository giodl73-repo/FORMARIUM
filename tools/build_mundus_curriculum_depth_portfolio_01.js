"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

const root = path.resolve(__dirname, "..");
const inventoryPath = path.join(root, "fixtures", "coverage", "mundus-courseware-inventory-01.json");
const outputPath = path.join(root, "fixtures", "coverage", "mundus-curriculum-depth-portfolio-01.json");
const inventory = JSON.parse(fs.readFileSync(inventoryPath, "utf8"));

const selections = [
  // Mathematics
  ["mathematics", "fontes:mit:ocw:18-06-linear-algebra-spring-2010", ["foundational", "expected-no-gap-control"], "Foundational structure and representation control."],
  ["mathematics", "fontes:mit:ocw:18-03sc-differential-equations-fall-2011", ["foundational", "dynamics-edge"], "Introductory change, response, and dynamical structure."],
  ["mathematics", "fontes:mit:ocw:18-330-introduction-numerical-analysis-spring-2012", ["advanced", "error-edge"], "Approximation, error, and numerical-method pressure."],
  ["mathematics", "fontes:stanford-see:ee364a-convex-optimization", ["advanced", "cross-domain-edge"], "Optimization, constraint, and duality pressure across domains."],
  ["mathematics", "fontes:stanford-public-course-sites:math-foundations-public-course-surfaces:stanford-math108-homepage", ["breadth", "discrete-edge"], "Metadata probe for discrete and combinatorial structure."],
  ["mathematics", "fontes:stanford-public-course-sites:math-foundations-public-course-surfaces:stanford-math113-homepage", ["breadth", "abstraction-edge"], "Metadata probe for abstraction and algebraic structure."],

  // Physical science
  ["physical-science", "fontes:mit:ocw:5-111sc-principles-of-chemical-science-fall-2014", ["foundational", "mechanism-edge"], "Atomic, molecular, thermodynamic, equilibrium, and kinetic pressure."],
  ["physical-science", "fontes:mit:ocw:8-01sc-classical-mechanics-fall-2016", ["foundational", "expected-no-gap-control"], "Mechanics control for state, force, energy, and momentum."],
  ["physical-science", "fontes:open-yale:phys-201-fundamentals-of-physics-ii", ["foundational", "cross-source"], "Independent physics sequence spanning fields, optics, and quantum mechanics."],
  ["physical-science", "fontes:open-yale:chem-125a-freshman-organic-chemistry-i", ["advanced", "cross-source"], "Structure, mechanism, bonding, and stereochemistry pressure."],
  ["physical-science", "fontes:stanford-public-course-sites:physical-sciences-public-course-surfaces:stanford-chem33-homepage", ["breadth", "structure-reactivity-edge"], "Metadata probe at the structure/reactivity boundary."],
  ["physical-science", "fontes:stanford-public-course-sites:earth-climate-energy-public-course-surfaces:stanford-earthsys10-homepage", ["breadth", "cross-domain-edge"], "Metadata probe for coupled earth-system concepts."],

  // Life and health science
  ["life-health-science", "fontes:mit:ocw:6-s897-machine-learning-for-healthcare-spring-2019", ["cross-domain-edge", "only-record-depth"], "Only individual-record bridge into clinical evidence, fairness, and interpretation."],
  ["life-health-science", "fontes:stanford-public-course-sites:bio-biomed-public-course-surfaces:stanford-gene211-homepage", ["breadth", "biological-information-edge"], "Metadata probe for genomic information and variation."],
  ["life-health-science", "fontes:stanford-public-course-sites:medicine-public-health-public-course-surfaces:stanford-hrp225-homepage", ["breadth", "expected-no-gap-control"], "Metadata control for population, exposure, outcome, and evidence distinctions."],
  ["life-health-science", "fontes:stanford-public-course-sites:medicine-public-health-public-course-surfaces:stanford-hrp251-homepage", ["breadth", "evidence-edge"], "Metadata probe for intervention and comparison design."],
  ["life-health-science", "fontes:stanford-public-course-sites:bio-biomed-public-course-surfaces:stanford-bioe220-homepage", ["breadth", "mechanism-design-edge"], "Metadata probe for biological mechanism and constructed systems."],
  ["life-health-science", "fontes:stanford-public-course-sites:earth-climate-energy-public-course-surfaces:stanford-earthsys105-homepage", ["breadth", "cross-domain-edge"], "Metadata probe across food, environment, and coupled outcomes."],

  // Computing and software
  ["computing-software", "fontes:mit:ocw:6-006-introduction-to-algorithms-fall-2011", ["foundational", "expected-no-gap-control"], "Algorithm and data-structure control."],
  ["computing-software", "fontes:mit:ocw:6-172-performance-engineering-fall-2018", ["advanced", "performance-edge"], "Performance, resource, locality, and concurrency pressure."],
  ["computing-software", "fontes:mit:ocw:6-831-user-interface-design-spring-2011", ["cross-domain-edge", "evaluation-edge"], "Interface, usability, testing, and accessibility pressure."],
  ["computing-software", "fontes:stanford-see:cs107-programming-paradigms", ["foundational", "cross-source"], "Paradigm and mechanism variation without choosing one implementation model."],
  ["computing-software", "fontes:stanford-public-course-sites:software-public-course-surfaces:stanford-cs111-homepage", ["breadth", "systems-edge"], "Metadata probe for operating-system principles."],
  ["computing-software", "fontes:stanford-public-course-sites:computing-practice-society-public-course-surfaces:stanford-cs181-homepage", ["breadth", "social-boundary-edge"], "Metadata probe across computing, ethics, and public policy."],

  // AI, data, and inference
  ["ai-data-inference", "fontes:mit:ocw:6-034-artificial-intelligence-fall-2010", ["foundational", "expected-no-gap-control"], "Search, representation, and learning control."],
  ["ai-data-inference", "fontes:mit:ocw:6-036-introduction-to-machine-learning-fall-2020", ["foundational", "prediction-edge"], "Modeling and prediction pressure at introductory scope."],
  ["ai-data-inference", "fontes:mit:ocw:6-867-machine-learning-fall-2006", ["advanced", "inference-edge"], "Classification and statistical-inference pressure."],
  ["ai-data-inference", "fontes:stanford-see:cs229-machine-learning", ["advanced", "cross-source"], "Independent machine-learning sequence and no-gap comparison."],
  ["ai-data-inference", "fontes:stanford-public-course-sites:stats-data-public-course-surfaces:stanford-stats200-homepage", ["breadth", "statistical-inference-edge"], "Metadata probe for inference-specific vocabulary."],
  ["ai-data-inference", "fontes:berkeley-public-course-sites:stats-probability-data-public-course-surfaces:berkeley-prob140-homepage", ["breadth", "cross-source"], "Metadata probe for probability foundations from another institution."],

  // Engineering, systems, and control
  ["engineering-systems-control", "fontes:mit:ocw:2-003sc-engineering-dynamics-fall-2011", ["foundational", "expected-no-gap-control"], "Kinematics, frames, dynamics, and vibration control."],
  ["engineering-systems-control", "fontes:mit:ocw:6-4210-robotic-manipulation-fall-2022", ["advanced", "perception-action-edge"], "Perception, planning, control, and geometry pressure."],
  ["engineering-systems-control", "fontes:stanford-see:ee263-linear-dynamical-systems", ["advanced", "state-estimation-edge"], "State, observability, estimation, and control pressure."],
  ["engineering-systems-control", "fontes:stanford-see:cs223a-introduction-to-robotics", ["foundational", "cross-source"], "Independent robotics and simulation sequence."],
  ["engineering-systems-control", "fontes:stanford-public-course-sites:engineering-design-public-course-surfaces:stanford-me80-homepage", ["breadth", "material-response-edge"], "Metadata probe for stress, strain, and strength distinctions."],
  ["engineering-systems-control", "fontes:stanford-public-course-sites:earth-climate-energy-public-course-surfaces:stanford-energy221-homepage", ["breadth", "cross-domain-edge"], "Metadata probe for energy systems beyond mechanics."],

  // Social science and humanities
  ["social-humanities", "fontes:mit:ocw:cms-300-videogame-studies-fall-2011", ["interpretive-edge", "record-depth"], "Interpretation, culture, narrative, space, and identity pressure."],
  ["social-humanities", "fontes:mit:ocw:cms-615-games-for-social-change-fall-2013", ["cross-domain-edge", "record-depth"], "Intent, intervention, assessment, and social-outcome pressure."],
  ["social-humanities", "fontes:stanford-public-course-sites:philosophy-ethics-public-course-surfaces:stanford-phil188-homepage", ["breadth", "expected-no-gap-control"], "Metadata control at the personal-identity boundary."],
  ["social-humanities", "fontes:stanford-public-course-sites:humanities-social-public-course-surfaces:stanford-psych45-homepage", ["breadth", "cognition-edge"], "Metadata probe for learning and memory distinctions."],
  ["social-humanities", "fontes:stanford-public-course-sites:humanities-social-public-course-surfaces:stanford-history202-homepage", ["breadth", "evidence-method-edge"], "Metadata probe for historical method and evidence."],
  ["social-humanities", "fontes:stanford-public-course-sites:sociology-public-course-surfaces:stanford-soc142-homepage", ["breadth", "network-edge"], "Metadata probe for social-network structure."],

  // Economics and organizations
  ["economics-organizations", "fontes:open-yale:econ-159-game-theory", ["record-depth", "strategic-edge"], "Only individual-record economics sequence; strategy and interaction pressure."],
  ["economics-organizations", "fontes:stanford-public-course-sites:business-economics-public-course-surfaces:stanford-econ1-homepage", ["breadth", "expected-no-gap-control"], "Introductory metadata control for economic distinctions."],
  ["economics-organizations", "fontes:stanford-public-course-sites:business-economics-public-course-surfaces:stanford-econ50-homepage", ["breadth", "choice-edge"], "Metadata probe for microeconomic choice and allocation."],
  ["economics-organizations", "fontes:stanford-public-course-sites:business-economics-public-course-surfaces:stanford-econ51-homepage", ["breadth", "stock-flow-edge"], "Metadata probe for macroeconomic stock/flow pressure."],
  ["economics-organizations", "fontes:stanford-public-course-sites:business-economics-public-course-surfaces:stanford-msande140-homepage", ["breadth", "organization-edge"], "Metadata probe for management science and operations modeling."],
  ["economics-organizations", "fontes:stanford-public-course-sites:business-economics-public-course-surfaces:stanford-msande152-homepage", ["breadth", "decision-edge"], "Metadata probe for decision analysis and value tradeoffs."],
];

const inventoryById = new Map(inventory.courses.map((course) => [course.source_id, course]));
const courses = selections.map(([lane, sourceId, selectionRoles, selectionReason], index) => {
  const course = inventoryById.get(sourceId);
  if (!course) throw new Error(`unknown inventory course: ${sourceId}`);
  return {
    packet_id: `MCC-01-${String(index + 1).padStart(2, "0")}`,
    lane,
    selection_roles: selectionRoles,
    selection_reason: selectionReason,
    permitted_use: course.evidence_tier === "course-work-record"
      ? "inspect only rights-compatible source-owned surfaces recorded by FONTES"
      : "existence and curriculum-pressure metadata only; no concept admission",
    ...course,
  };
});

const countBy = (field) => Object.fromEntries([...new Set(courses.map((course) => course[field]))]
  .sort().map((value) => [value, courses.filter((course) => course[field] === value).length]));
const sha256 = (file) => crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
const sourceCommit = execFileSync("git", ["-C", root, "rev-parse", "HEAD"], { encoding: "utf8" }).trim();

const portfolio = {
  schema: "factorium.mundus-curriculum-depth-portfolio.v1",
  status: "frozen-before-factorium-comparison",
  generated: "2026-08-18",
  baseline: {
    source_commit: sourceCommit,
    inventory_path: "fixtures/coverage/mundus-courseware-inventory-01.json",
    inventory_sha256: sha256(inventoryPath),
    mundus_commit: inventory.custody.mundus_commit,
    fontes_commit: inventory.custody.fontes_commit,
  },
  design: {
    lanes: 8,
    courses_per_lane: 6,
    evidence_balance: "24 course-work records and 24 homepage-metadata probes",
    reader_job: "find reusable distinctions that materially improve concept lookup or composition across more than one course context",
    selection_timing: "frozen before systematic vocabulary extraction and Factorium closure comparison",
    processing_order: "packet order is fixed; retain covered, no-gap, duplicate, and insufficient-evidence outcomes",
    metadata_boundary: "metadata-only packets may prioritize later source review but emit no concept-admission candidate",
    null_policy: "covered, no-gap, insufficient-evidence, and zero-admission results remain valid",
  },
  summary: {
    courses: courses.length,
    by_lane: countBy("lane"),
    by_evidence_tier: countBy("evidence_tier"),
    by_source_family: countBy("source_family"),
  },
  courses,
};

fs.writeFileSync(outputPath, `${JSON.stringify(portfolio, null, 2)}\n`);
console.log(JSON.stringify(portfolio.summary, null, 2));

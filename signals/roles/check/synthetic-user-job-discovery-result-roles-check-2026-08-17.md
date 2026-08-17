---
skill: roles-check
topic: synthetic-user-job-discovery-result
date: 2026-08-17
roles_used: 6
p1_count: 0
verdict: APPROVED
---

# Synthetic User Job Discovery Result Roles Check

## Artifact identification

Artifact type: synthetic product-research result and positioning synthesis.

Reviewed artifacts include the frozen campaign, lexical trace, authored route
analysis, generated results, campaign result, and cross-signal synthesis.

## Selected roles

Experimental Methodologist, Data Split & Leakage Auditor, Reference
Lexicographer, Evidence & Claims Editor, Reference Practitioner, and Product
Owner review the same lenses selected at plan time.

## Findings

### Experimental Methodologist

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | All 25 personas and 50 queries remained frozen after commit `ac63455` | P3 | custody | Preserve hashes and commit boundary |
| 2 | Both technical falsification thresholds survive, while the behavioral test remains unrun | P3 | falsification | Report capability only |
| 3 | Lookup controls produce four replacements and one not-served null | P3 | controls | Keep them prominent in summaries |

### Data Split & Leakage Auditor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Search ranking is identical for every persona and does not consume profile metadata | P3 | lexical runner | Retain persona-independent execution |
| 2 | The portfolio deliberately includes known Factorium-relevant tasks | P3 | selection | Do not infer natural task frequency or demand |
| 3 | Available/unusable was selected after QLD-02 and is not independent gap recurrence | P3 | decision | Keep its repair disposition deferred |

### Reference Lexicographer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Dictionary and thesaurus starts yield nine bridges, one new reason, one replacement, and one not served | P3 | alternatives | Position lexical tools as on-ramps |
| 2 | Exact alias lookup is an honest case where the thesaurus is better | P3 | SUJ-01-17 | Preserve the null without a one-query repair |
| 3 | Distinct value consistently comes from sense boundaries, relations, conditions, and stops | P3 | product answer | Use this language as a hypothesis for external testing |

### Evidence & Claims Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Every reaction carries an authored-synthetic evidence label | P3 | generated results | Preserve the label in projections |
| 2 | The report avoids simulated success, timing, quotations, preference, and return-use metrics | P3 | claim boundary | Keep those measures prohibited |
| 3 | Relationship counts describe author classifications, not population rates | P3 | summary | Avoid percentages and market extrapolation |

### Reference Practitioner

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Purposeful tasks consistently expose a bridge or structural job | P3 | intent result | Test that framing with real practitioners |
| 2 | Curiosity tasks show that Factorium can be excessive for simple lookup | P3 | fun result | Preserve a light Tables entrance |
| 3 | Handbooks, workplace documents, and external authorities retain their governing roles | P3 | losses | Present Factorium as framing and navigation, not replacement authority |

### Product Owner

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | The campaign sharpens the product promise without adding content or software | P3 | product answer | Keep the positioning hypothesis |
| 2 | Current home already has lookup and problem-led routes, so synthetic results do not prove a missing feature | P3 | decision | Do not mint `sim-43` |
| 3 | The next valuable evidence is actual route choice and task use | P3 | next step | Carry the question into R4E rather than another persona round |

## Synthesis

Roles reviewed: 6

P1 blockers: 0 | P2 issues: 0 | P3 notes: 18

Verdict: **APPROVED**

Top finding: the defensible positioning is “second reference move,” not
“better dictionary.”

Cross-role consensus: the internal mechanism is credible and fully routed,
but persona selection and authored reactions prevent any claim about actual
reader demand or behavior.

## Amendments applied

1. Report intent and starting-alternative breakdowns alongside the aggregate.
2. Name the alias null and the known QLD-02 scenario-selection dependency.
3. Admit no repair or new edition; carry only the positioning hypothesis into
   real-reader observation.

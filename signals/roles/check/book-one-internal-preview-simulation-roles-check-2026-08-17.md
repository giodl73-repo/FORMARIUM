---
skill: roles-check
topic: book-one-internal-preview-simulation
date: 2026-08-17
roles_used: 10
p1_count: 0
p2_count: 0
verdict: PASS
---

# Book One Internal Preview Simulation Roles Check

## Artifact identification

Type: release-facing simulation plan and book-site candidate design.

Domain signals: books, navigation, search, composition, evaluation, release
claims, provenance, accessibility mechanics, and internal experimental method.

Proposed reader: a practitioner encountering Factorium without author help.
Their job is to orient from an ordinary question, use the 24-record candidate
spine, reach specialized depth when needed, and preserve an incomplete or
contradictory result instead of forcing an answer.

Current friction: the exact 24-record spine exists inside one guide, while the
current homepage and quickstart still present the entire 175-record proof
edition. The candidate has no candidate-specific quickstart, task packet,
feedback path, fixed simulation identity, or findings ledger.

Product change: `sim-30` will make the candidate spine the explicit front
door while keeping all 151 additional records as searchable depth. Four
deterministic route strategies will inspect onboarding and bounded application
without inventing participant behavior.

## Role selection

| Role | Why selected |
|---|---|
| Compositional Semantics Steward | The candidate route includes typed closure, ambiguity, exclusion, and flattening. |
| Experimental Methodologist | The work is an internal simulation with strict evidence boundaries. |
| Reference Architecture Editor | The artifact changes the book's front door and selection hierarchy. |
| Evidence & Claims Editor | Preview language can easily overstate simulated evidence. |
| Benchmark Numeracy Checker | Counts, route denominators, and non-scores must reconcile. |
| Research Integrity & Provenance | The candidate and each simulation input/result need exact custody. |
| Mapping Integrity Auditor | The 24-record spine projects a larger reference and must expose loss. |
| Reference Practitioner | The simulation targets independent orientation and practical use. |
| Schema Implementer | The candidate manifest and checks must be independently reproducible. |
| Product Owner | The work must reduce reader friction rather than add another feature lane. |

## Review findings

### Compositional Semantics Steward

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | The task route could imply that ordinary-language problem prose determines graph semantics. | P2 | application task | Keep prose graph-inert; exact seeds, senses, relations, and checks own the route. |
| 2 | A single candidate spine could be mistaken for the canonical decomposition of all questions. | P2 | candidate selection | Label it an editorial teaching projection with specialized depth and alternate valid starts. |
| 3 | Shared records across tasks can silently look like evidence of independence or completeness. | P3 | route results | Preserve overlap, interaction, unresolved frontier, and explicit non-completeness. |

### Experimental Methodologist

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Fictional participants, timings, task outcomes, quotes, preferences, or return use would invalidate the simulation claim. | P2 | method | Use `SIM-*` route strategies and artifact observations only. |
| 2 | Selecting only successful routes after inspection would hide candidate defects. | P2 | task set | Freeze search-first, contents-first, problem-first, and composition-first strategies before execution. |
| 3 | One browser configuration cannot establish accessibility or cross-device usability. | P3 | browser checks | Test deterministic desktop/mobile mechanics and defer comprehension/accessibility claims. |

### Reference Architecture Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | The candidate spine is buried in a guide while the homepage foregrounds the full proof edition. | P2 | homepage | Add one candidate start section before worked traces and catalog navigation. |
| 2 | A second copied 24-record book would create authority and revision drift. | P2 | candidate manifest | Project exact canonical paths; do not copy entry prose. |
| 3 | Candidate quickstart, tasks, feedback, and findings need separate purposes. | P3 | supporting artifacts | Cross-link them from one candidate section and retain canonical authority in tables. |

### Evidence & Claims Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | `private preview` could falsely imply invited-reader evidence or entry-gate completion. | P2 | status language | Use `internal preview simulation candidate`; prohibit `preview-01` admission. |
| 2 | Expected-answer reachability is not findability, comprehension, application success, or value. | P2 | results | Report mechanics, coverage, ambiguities, and defects only. |
| 3 | A repaired predicted defect is still author-detectable evidence, not observed reader evidence. | P3 | findings | Preserve evidence level and leave R4/R5P external gates open. |

### Benchmark Numeracy Checker

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | The 24-record spine, 151-record depth, 175 canonical total, and guide counts must reconcile. | P2 | manifest | Check exact unique paths and selection arithmetic mechanically. |
| 2 | Four strategies must not become a completion-rate denominator. | P2 | reporting | Report four route inspections, never `4/4 readers` or a percentage. |
| 3 | Search result counts can change with metadata and must bind to the rendered identity. | P3 | render result | Record source, search, page, target, site, and standalone identities together. |

### Research Integrity & Provenance

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | The candidate needs an exact source commit, reference digest, relation digest, spine digest, and renderer identity. | P2 | custody | Emit a deterministic candidate manifest and checker. |
| 2 | Simulation inputs and expected routes need pre-execution custody. | P2 | tasks/rubric | Separate reader-facing prompts from author-only route expectations. |
| 3 | Superseded or repaired findings must remain reconstructable. | P3 | ledger | Use stable finding IDs with open/fix/defer/reject dispositions and rerun evidence. |

### Mapping Integrity Auditor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Selecting 24 of 175 records is a lossy projection whose exclusions must remain visible. | P2 | candidate boundary | State that 151 records remain searchable specialized depth. |
| 2 | Candidate ordering must not imply a universal dependency order. | P2 | spine | Label order as a teaching route and preserve direct search/alternate starts. |
| 3 | Homepage labels must map to exact guide and quickstart targets without copied authority. | P3 | generated site | Verify source path, page path, link direction, and missing-target count. |

### Reference Practitioner

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | A first-time reader still faces the full collection before learning what the candidate is for. | P2 | onboarding | Lead with “bring a bounded question” and the six-field default. |
| 2 | The existing quickstart predates the candidate spine and cannot teach its depth boundary. | P2 | quickstart | Add a short candidate-specific self-guided route with ordinary-language starts. |
| 3 | The task set needs both one-entry lookup and multi-concept application. | P3 | tasks | Cover search, contents, problem-led reading, and composition without author paths. |

### Schema Implementer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | A prose-only freeze cannot be independently checked. | P2 | manifest | Define an exact deterministic manifest with sorted/ordered paths and SHA-256 identities. |
| 2 | Candidate route checks must fail on missing, duplicate, reordered, or extra spine records. | P2 | checker | Extend the existing Book One checker and add generated-site assertions. |
| 3 | Edition changes must not silently mutate earlier simulation identities. | P3 | renderer | Add `sim-30` without changing `sim-29` behavior and record both identities. |

### Product Owner

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | More composition UI would not address the current onboarding problem. | P2 | scope | Add one calm candidate start surface; defer new builders and graph features. |
| 2 | The smallest valuable slice is candidate custody plus independent-route rehearsal, not another content batch. | P2 | value | Freeze the 24-record spine, quickstart it, simulate four strategies, and disposition defects. |
| 3 | Continue only if the simulation exposes and repairs a concrete route defect or proves candidate mechanics ready. | P3 | decision | End with continue/repair/narrow and explicit external-evidence remainder. |

## Synthesis

Roles reviewed: 10

P1 blockers: 0 | P2 issues: 20 | P3 notes: 10

Verdict: APPROVED-WITH-CONDITIONS

Top finding: the 24-record candidate is not yet the product's explicit front
door, even though it is the selected teaching route.

Cross-role consensus: freeze one loss-aware candidate projection, separate
prompts from expected routes, and report only artifact-level simulation
evidence.

## Amendments

1. Add a candidate-specific quickstart and homepage start section before the
   full collection, while retaining all 151 non-spine records as searchable
   specialized depth.
2. Freeze four deterministic route strategies and exact expected artifacts
   before running them; record no fictional behavior or human metrics.
3. Bind the candidate to exact source/reference/relation/spine/render
   identities, maintain a stable findings ledger, and leave R4/R5P external
   evidence gates open.

## Fixed-point result verification

All twenty P2 recommendations were implemented and rerun; no P1/P2 finding
remains open.

| Role | Closure evidence |
|---|---|
| Compositional Semantics Steward | The quickstart and guide retain typed ownership, ambiguity, exclusion, frontier, projection loss, and non-automatic evaluation. |
| Experimental Methodologist | Four prompts remain artifact inspections; the ledger contains no participant denominator or human outcome field. |
| Reference Architecture Editor | One 24-record teaching route fronts the site while 151 records remain canonical searchable depth. |
| Evidence & Claims Editor | Every candidate artifact says internal simulation; R4/R5P and `preview-01` remain open. |
| Benchmark Numeracy Checker | Mechanical checks reconcile 24 + 151 = 175, four strategies, ten guides, 185 search records, 217 sources, and 237 pages. |
| Research Integrity & Provenance | The manifest binds source, reference, relation, guide, spine, artifact, site, and standalone identities. |
| Mapping Integrity Auditor | The route is explicitly lossy and non-universal; direct search and specialized depth remain available. |
| Reference Practitioner | The homepage leads with an ordinary bounded question and six retained fields; live narrow-screen mechanics pass. |
| Schema Implementer | Missing/reordered spine paths, manifest drift, route omissions, bad rankings, and missing targets fail deterministic checks. |
| Product Owner | One onboarding and search slice repaired demonstrated defects without new canonical content or product machinery. |

Final verdict: **PASS**. Product decision: **prepare**, without external-reader
or release admission.

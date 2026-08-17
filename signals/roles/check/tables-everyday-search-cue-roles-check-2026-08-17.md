---
skill: roles-check
topic: tables-everyday-search-cue
date: 2026-08-17
roles_used: 7
p1_count: 0
p2_count: 0
verdict: PASS
---

# Tables Everyday Search Cue Roles Check

## Artifact identification

Type: bounded search-navigation proposal.

Domain signals: everyday vocabulary, lexical ambiguity, canonical ownership,
ranking preservation, generated publication, and usability evidence.

## Role selection

| Role | Why selected |
|---|---|
| Reference Lexicographer | Everyday wording must aid lookup without becoming a false synonym. |
| Reference Architecture Editor | The cue must point into the Tables authority rather than copy it. |
| Concept & Taxonomy Boundary Editor | A lookup cue must not create a new concept or taxonomy edge. |
| Mapping Integrity Auditor | Phrase, condition, target, and direction need explicit custody. |
| Reference Practitioner | The slice should reduce a demonstrated lookup detour. |
| Schema Implementer | Exact matching and target resolution need fail-closed checks. |
| Product Owner | The repair must earn value without reopening content intake or Workbench scope. |

## Review

### Reference Lexicographer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | `size` is polysemous and cannot be declared a synonym of geometric measure. | P2 | semantics | Label the route conditionally: `If you mean geometric size`. |
| 2 | The intended geometric owner is hidden below a sampling diagnostic for the observed query. | P2 | lookup | Put one visible canonical-owner cue before the unchanged results. |
| 3 | Phrase variants can grow into an unsupported synonym list. | P3 | vocabulary | Admit only the exact observed phrases `size`, `how big`, and `how large`. |

### Reference Architecture Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Copying an explanation into the cue would create another prose authority. | P2 | rendering | Render only the condition, canonical title, and link. |
| 2 | A cue embedded in canonical metadata would change the reference contract. | P2 | custody | Keep it edition-local in the generated search asset. |
| 3 | The prior search behavior must remain reproducible. | P3 | compatibility | Add `sim-40` and prove `sim-39` byte identity. |

### Concept & Taxonomy Boundary Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | An everyday phrase does not earn a new canonical entry. | P2 | canon | Add no entry, sense, view, or relation. |
| 2 | The cue could be mistaken for broader/narrower or equivalence semantics. | P2 | label | Call it a navigation cue and state that it does not classify the phrase. |
| 3 | General query expansion invites unbounded vocabulary filling. | P3 | stopping rule | Stop after the one documented geometric lookup defect. |

### Mapping Integrity Auditor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | The phrase-to-page direction and condition must be visible. | P2 | mapping | Show `If you mean geometric size` and link only to Geometric Measure. |
| 2 | A stale target could silently produce a broken suggestion. | P2 | generation | Fail the checker unless the exact selected target exists once. |
| 3 | Case and surrounding whitespace should not change identity. | P3 | normalization | Match exact normalized phrases only. |

### Reference Practitioner

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | The current `size` order sends a geometric lookup through an unrelated diagnostic first. | P2 | task | Surface the likely geometric owner without suppressing alternate meanings. |
| 2 | Replacing results with one inferred intent would prevent correction. | P2 | recovery | Preserve every lexical match and both family/record views. |
| 3 | The cue must remain legible on a narrow screen. | P3 | presentation | Run a 390-pixel live browser check. |

### Schema Implementer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Fuzzy phrase matching would make activation unpredictable. | P2 | algorithm | Use a closed exact normalized-key map. |
| 2 | The cue must not alter record scores, counts, filters, or grouping. | P2 | contract | Assert result-array equality with the prior search asset. |
| 3 | A test should cover cue absence as well as presence. | P3 | fixtures | Check admitted phrases, a near miss, and empty query. |

### Product Owner

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | The recognizable job is reaching geometric measure from ordinary wording. | P2 | value | Limit the slice to that demonstrated detour. |
| 2 | Alias infrastructure or broad query rewriting would exceed the evidence. | P2 | scope | Ship one transparent cue and defer a general thesaurus layer. |
| 3 | Internal checks cannot establish that readers understand or prefer the cue. | P3 | claims | Report mechanics only and retain external findability as untested. |

## Synthesis

Roles reviewed: 7

P1 blockers: 0 | P2 issues: 14 | P3 notes: 7

Verdict: APPROVED-WITH-CONDITIONS

Top finding: preserve the ambiguity of `size`; never silently promote the cue
to synonym, classification, or canonical relation.

Cross-role consensus: use one transparent edition-local route while leaving
the lexical result set, ranking, grouping, filters, counts, and reference
authority unchanged.

## Amendments

1. Render an explicitly conditional cue for three exact normalized phrases.
2. Resolve its one target against the selected edition and test nonactivation.
3. Freeze `sim-39`, make no canonical change, and admit no reader-value claim.

## Fixed-point result

All fourteen P2 findings are closed in `sim-40`. One visible conditional cue
activates for the three exact normalized phrases and resolves the selected
Geometric Measure target once. The complete search index and complete ranked
paths for the admitted phrases remain identical to `sim-39`; filters,
grouping, counts, URL state, direct identities, and canonical sources are
unchanged. Near misses do not activate. Static and live 390-pixel Edge checks
pass, and `sim-39` reproduces its frozen identities exactly.

Final verdict: PASS. The seven P3 notes remain durable boundaries. No synonym,
classification, query-expansion, findability, comprehension, preference, or
preview-readiness claim is admitted.

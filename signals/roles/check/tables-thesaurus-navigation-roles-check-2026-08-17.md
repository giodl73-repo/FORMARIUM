---
skill: roles-check
topic: tables-thesaurus-navigation
date: 2026-08-17
roles_used: 7
p1_count: 0
p2_count: 0
verdict: PASS
---

# Tables Thesaurus Navigation Roles Check

## Artifact identification

Type: generated dictionary/thesaurus navigation proposal.

Domain signals: canonical ownership, cross-references, contrast, hierarchy,
semantic relations, lookup, generated pages, and responsive publication.

## Role selection

| Role | Why selected |
|---|---|
| Reference Lexicographer | The surface must improve concept movement without false synonymy. |
| Reference Architecture Editor | Navigation must preserve canonical ownership and avoid copied authority. |
| Concept & Taxonomy Boundary Editor | Thesaurus behavior can drift into arbitrary hierarchy or cataloging. |
| Mapping Integrity Auditor | Owner and cross-reference projections need explicit direction and loss. |
| Reference Practitioner | The navigator must reduce actual lookup work. |
| Schema Implementer | Extraction and coverage must be deterministic and fail closed. |
| Product Owner | The slice must earn value without adding semantic content or features. |

## Review

### Reference Lexicographer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Existing Cross-references do not encode broader, narrower, related, contrast, or confused kinds. | P2 | relation labels | Call them authored untyped connections; do not infer thesaurus types. |
| 2 | Contrast tables are stronger evidence than arbitrary body links. | P2 | extraction | Expose the authored Contrast table as a distinct comparison action. |
| 3 | A future typed thesaurus needs editorial relation records, not ranking heuristics. | P3 | boundary | Defer typed relations to a separately reviewed sidecar. |

### Reference Architecture Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Specialized views currently hide their owner until the reader reconstructs it. | P2 | ownership | Generate exact Owning Table links from canonical metadata. |
| 2 | Copying Cross-reference prose into a new authority would create drift. | P2 | projection | Copy links and labels only; retain source sections and canonical content. |
| 3 | The navigator belongs before source content but below global controls. | P3 | placement | Keep profiles and page authority intact. |

### Concept & Taxonomy Boundary Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Automatically generated broader/narrower trees would encode an unjustified universal taxonomy. | P2 | hierarchy | Admit no hierarchy without explicit reviewed direction. |
| 2 | Cross-reference density can become an open-ended catalog. | P2 | display | Use the existing bounded authored section and a compact projection. |
| 3 | Curated foundations outside interchange must not be called canonical entries. | P3 | identity | Label them Curated Table records. |

### Mapping Integrity Auditor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | View-to-owner is directional and not reciprocal equivalence. | P2 | owner mapping | Label the destination Owning Table and retain view identity. |
| 2 | A cross-reference link does not specify mapping kind or round trip. | P2 | connections | State untyped and prohibit synonym/hierarchy/closure interpretation. |
| 3 | Missing or unknown owner paths must fail generation. | P3 | validation | Resolve all 95 canonical views mechanically. |

### Reference Practitioner

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Important comparison and connection routes arrive too late in long pages. | P2 | placement | Put compact actions before the Table source. |
| 2 | Readers need an escape back to lookup on every page. | P2 | actions | Include Search Tables and Browse Tables universally. |
| 3 | Too many duplicated links could overwhelm compact reading. | P3 | density | Cap the connection preview and link to the full authored section. |

### Schema Implementer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Heading and section extraction must fail predictably under drift. | P2 | parser | Match exact authored headings and count generated coverage. |
| 2 | Cross-reference extraction must not ingest Sources or arbitrary body links. | P2 | parser | Bound extraction between the Cross-references heading and next H2. |
| 3 | Sim-32 must not mutate sim-31 CSS or markup. | P3 | compatibility | Add edition-specific CSS and checks. |

### Product Owner

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | A typed thesaurus sidecar is too large before the basic navigation job is tested. | P2 | scope | Ship exact owner/contrast/untyped navigation first. |
| 2 | The slice earns value only if every Table gains a useful next action. | P2 | coverage | Provide universal Search/Browse plus data-driven local actions. |
| 3 | Internal route coverage is not findability evidence. | P3 | claims | Report mechanics only and defer value claims. |

## Synthesis

Roles reviewed: 7

P1 blockers: 0 | P2 issues: 14 | P3 notes: 7

Verdict: APPROVED-WITH-CONDITIONS

Top finding: untyped authored links must not be presented as typed thesaurus
relations.

Cross-role consensus: expose exact ownership and authored navigation now;
defer inferred hierarchy and synonymy.

## Amendments

1. Define exact admitted inputs, labels, placement, and non-inference boundary.
2. Generate universal Search/Browse actions plus exact owner, Contrast, and
   bounded Cross-reference routes with mechanical coverage checks.
3. Preserve sim-31 and all canonical artifacts; report no human-value claim.

## Fixed-point result

All fourteen P2 findings are closed in `sim-32`: exact owner links cover all
95 specialized views, all 175 selected Table pages receive universal lookup
actions, section extraction is exact and bounded, connection previews are
capped at six, semantic non-inference is visible, local targets are complete,
the 390-pixel browser route has no overflow, and `sim-31` reproduces exactly.

Final verdict: PASS. The seven P3 notes remain durable design boundaries, not
release blockers. No human lookup, semantic completeness, or preview claim is
admitted.

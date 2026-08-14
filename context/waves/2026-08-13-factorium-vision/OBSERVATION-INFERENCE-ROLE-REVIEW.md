# Observation, Measurement, and Inference Review

Status: fixed point for candidate publication

## Scope

- `docs/research/2026-08-14-observation-measurement-inference.md`
- `tables/entries/claim-evidence.md`
- `tables/evidence/observation-inference-chain.md`
- canonical interchange registration and generated projections
- Factor Forge F3 intake record

## Dispositions

| Role or lens | Result | Finding or rationale |
|---|---|---|
| Compositional Semantics Steward | pass after findings | Source, activity, observation, measurement, result, inference, claim implication, limitation, confidence, and provenance remain distinct. |
| Experimental Methodologist | pass after findings | Methods, conditions, comparisons, nulls, contradictions, alternatives, uncertainty, and reproduction are explicit. |
| Representation Control Auditor | pass | Raw records, transformed results, models, and provenance encodings receive no semantic credit by format alone. |
| Data Split & Leakage Auditor | pass | Evidence-set identity, exclusions, comparisons, and missingness remain visible; no favorable-result filtering is permitted. |
| Factorization Method Steward | pass after findings | The chain exposes stage boundaries without claiming one universal scientific method. |
| Evidence & Claims Editor | pass after findings | Evidence is claim-relative; provenance, confidence, and maturity cannot substitute for support. |
| Benchmark Numeracy Checker | pass | Measurement values require unit/reference and uncertainty; result denominators and comparison scope remain method-owned. |
| Reference Lexicographer | pass after findings | Observation, measurement, result, inference, evidence, confidence, uncertainty, limitation, and provenance are not synonyms. |
| Reference Architecture Editor | pass | The stable Claim and Evidence anchor is extended rather than duplicated; two Evidence views answer different lookup questions. |
| Research Integrity & Provenance | pass after findings | VIM, NIST, and W3C source authority is bounded; derivation and revision custody remain reconstructable. |
| Cross-Paradigm Mapping Auditor | defer | No mechanism crosswalk is introduced. |
| Domain Source Reviewer | pass for candidate | Metrology definitions remain scoped to quantity measurement; broader evidence organization is candidate synthesis. |
| Equation & Units Auditor | pass | Measurement requires measurand, values, reference/unit, conditions, and uncertainty; no formula is introduced. |
| Mapping Integrity Auditor | pass | Evidence implication direction is claim-relative and no inverse from citation to support is permitted. |
| Schema Implementer | pass after findings | Existing IDs remain stable; new senses and factors are appended and the new Evidence view is V0-compatible. |
| Benchmark Consumer | pass | Founding evidence custody is unchanged and the new chain clarifies its interpretation. |
| Reference Practitioner | pass after findings | The selection procedure distinguishes what was seen, measured, produced, inferred, and claimed. |

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| OMI-001 | critical | Every observation could be treated as a measurement. | Closed: measurement is the narrower quantity-valued process with measurand, procedure, system, conditions, value/reference, and uncertainty. |
| OMI-002 | critical | A method result could be relabeled as a conclusion or claim. | Closed: result, inference, and claim are separate senses and chain stages. |
| OMI-003 | critical | Evidence could be treated as an intrinsic property of a source artifact. | Closed: every support, contradiction, exclusion, or no-bearing disposition requires an explicit implication to an exact claim. |
| OMI-004 | critical | Provenance could be presented as proof of validity. | Closed: provenance reconstructs entities, activities, agents, use, generation, and derivation but is explicitly non-equivalent to evidence strength. |
| OMI-005 | major | Confidence could replace measurement uncertainty or the underlying evidence set. | Closed: uncertainty remains result-specific; confidence requires separate criteria, evidence identity, sensitivity, reviewer, and date. |
| OMI-006 | major | Raw observations, corrected values, summaries, and inferences could overwrite one another. | Closed: stages and identities remain separate, with transformation and revision custody. |
| OMI-007 | critical | Null, tied, contradictory, or excluded results could disappear from the evidence record. | Closed: the entry and row contract require their retention and disposition. |
| OMI-008 | major | Metrology definitions could be universalized to documents, events, testimony, or logs. | Closed: measurement remains quantity-scoped; observation is the broader candidate sense. |
| OMI-009 | major | Adding senses could break published interchange identity. | Closed: `claim-evidence` and all existing sense/factor IDs retain order and identity; additions are appended. |
| OMI-010 | major | The new view could duplicate the founding evidence matrix. | Closed: the founding view compares specific claims and artifacts; the new view owns the general stage and row contract. |

No critical or major finding remains open for candidate publication.

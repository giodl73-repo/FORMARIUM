# Motion Measure Cluster Review

Status: fixed point for candidate publication

## Scope

- `docs/research/2026-08-14-motion-measure-cluster.md`
- `tables/entries/motion-measure.md`
- `tables/formulas/kinematics-motion-measures.md`
- formula and anchor index updates

## Dispositions

| Role or lens | Result | Finding or rationale |
|---|---|---|
| Compositional Semantics Steward | pass after findings | Path, endpoints, frame, scalar/vector kind, interval/instant, and derivative order remain explicit. |
| Experimental Methodologist | defer | No experiment or performance claim is introduced. |
| Representation Control Auditor | defer | No encoding comparison is introduced. |
| Data Split & Leakage Auditor | defer | No dataset or split is introduced. |
| Factorization Method Steward | pass | The entry offers evidence-first selection rather than one undifferentiated motion hierarchy. |
| Evidence & Claims Editor | pass | Established physics distinctions and candidate Factorium organization are separate. |
| Benchmark Numeracy Checker | pass | Units, dimensions, signs, elapsed-time restrictions, and regimes remain visible. |
| Reference Lexicographer | pass after findings | Ordinary near-synonyms receive distinct technical senses and contrasts. |
| Reference Architecture Editor | pass | One anchor owns distinctions and one Formula Table owns relations. |
| Research Integrity & Provenance | pass | OpenStax and NIST sources and access scope are explicit. |
| Cross-Paradigm Mapping Auditor | defer | No mechanism mapping is introduced. |
| Domain Source Reviewer | pass for candidate | Established physics and metrology sources support candidate publication. |
| Equation & Units Auditor | pass after findings | Scalar/vector type, derivative order, dimensions, frame, and constant-acceleration conditions are explicit. |
| Mapping Integrity Auditor | defer | No new conversion mapping is defined. |
| Schema Implementer | defer | Frame and vector semantics remain Markdown-first. |
| Benchmark Consumer | defer | Existing evidence packets are unchanged. |
| Reference Practitioner | pass | Contrast and selection tables prevent common motion-formula mistakes. |

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| MMF-001 | critical | Position and derived motion quantities could be reported without a reference frame. | Closed: frame, origin, axes, and direction convention are required factors. |
| MMF-002 | critical | Distance and displacement could be collapsed because both use metres. | Closed: path evidence, scalar/vector kind, and round-trip examples distinguish them. |
| MMF-003 | critical | Speed and velocity could be collapsed because both use metres per second. | Closed: path rate and vector position rate are separate senses and formulas. |
| MMF-004 | major | Average and instantaneous quantities could share notation without interval semantics. | Closed: finite ratios and derivatives are separate rows and views. |
| MMF-005 | critical | Acceleration could be defined only as speeding up. | Closed: magnitude change, direction change, or both are valid velocity changes. |
| MMF-006 | major | Negative acceleration could be described as slowing in every frame. | Closed: the entry relates acceleration direction to velocity and the selected coordinates. |
| MMF-007 | critical | Constant-acceleration equations could be applied whenever values fit their symbols. | Closed: the constant regime is an explicit precondition. |
| MMF-008 | major | Linkage to force could collapse kinematics into dynamics. | Closed: motion measures describe change; force remains a separate physical-interaction and dynamics view. |

No critical or major finding remains open for candidate publication.


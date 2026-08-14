# Formula Relation-Kind Completion Review

Status: fixed point for candidate publication

## Scope

- `docs/research/2026-08-14-remaining-formula-relation-kinds.md`
- `tables/formulas/pythagorean-trigonometric-identity.md`
- `tables/formulas/general-accounting-balance.md`
- `tables/formulas/newtons-method.md`
- `tables/formulas/probability-range.md`
- updated formula catalog

## Dispositions

| Role or lens | Result | Finding or rationale |
|---|---|---|
| Compositional Semantics Steward | pass | Identity, balance, recurrence, and constraint claims retain distinct semantics. |
| Experimental Methodologist | pass after findings | Local convergence and probability interpretation are not generalized beyond stated conditions. |
| Representation Control Auditor | defer | No representation comparison is introduced. |
| Data Split & Leakage Auditor | defer | No dataset or evaluation split is introduced. |
| Factorization Method Steward | pass | Each formula-use table exposes domain, boundary, policy, or constraints omitted from compact notation. |
| Evidence & Claims Editor | pass | Familiar names do not erase relation kind or source limits. |
| Benchmark Numeracy Checker | pass | Units, dimensions, rate-versus-total distinctions, index domains, and bounds remain visible. |
| Reference Lexicographer | pass | Each headword names one scoped mathematical sense. |
| Reference Architecture Editor | pass | The catalog now covers all V0 relation kinds without duplicating rearrangements. |
| Research Integrity & Provenance | pass | All actionable claims cite reviewed sources and state confidence. |
| Cross-Paradigm Mapping Auditor | defer | No implementation mechanism mapping is added. |
| Domain Source Reviewer | pass for candidate | Mathematics, engineering, numerical analysis, and probability claims use established sources; specialist promotion remains pending. |
| Equation & Units Auditor | pass after findings | Domains, dimensions, derivative restrictions, balance signs, and probability bounds are explicit. |
| Schema Implementer | defer | Proof links, expression trees, and executable recurrences remain future schema work. |
| Benchmark Consumer | defer | Existing evidence packets are unchanged. |
| Reference Practitioner | pass | Four entries demonstrate materially different uses and failure modes. |

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| FRK-001 | major | A trigonometric identity could be treated as an equation true only for selected solutions. | Closed: the entry states equality for every real angle under the standard definitions. |
| FRK-002 | major | Derived tangent identities could omit division-domain restrictions. | Closed: zero-denominator restrictions accompany each derived form. |
| FRK-003 | critical | A balance with generation and consumption could be mislabeled strict conservation. | Closed: accounting and conserved special cases are explicitly distinct. |
| FRK-004 | major | Steady state could be confused with no flows or no system contents. | Closed: steady state is defined only as zero accumulation in the selected balance. |
| FRK-005 | critical | Newton's method could be advertised as unconditionally quadratically convergent. | Closed: smoothness, simple-root, proximity, derivative, and finite-precision conditions are visible. |
| FRK-006 | major | The recurrence could imply its own stopping decision. | Closed: stopping policy is an external factor with separate review. |
| FRK-007 | critical | Any score in `[0, 1]` could be called a probability. | Closed: event space, measure axioms, interpretation, and calibration remain explicit. |
| FRK-008 | major | Completing the relation-kind checklist could be mistaken for broad subject coverage. | Closed: the catalog says coverage is complete only at pilot relation-kind depth. |

No critical or major finding remains open for candidate publication.


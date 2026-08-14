# Probability, Risk, and Uncertainty Cluster Review

Status: fixed point for candidate publication

## Scope

- `docs/research/2026-08-14-probability-risk-uncertainty-cluster.md`
- `tables/entries/probability-risk-uncertainty.md`
- `tables/formulas/probability-risk-uncertainty.md`
- existing probability-range and risk cross-reference updates

## Dispositions

| Role or lens | Result | Finding or rationale |
|---|---|---|
| Compositional Semantics Steward | pass after findings | Event, model, condition, consequence, horizon, and uncertainty representation remain explicit. |
| Experimental Methodologist | defer | No new experiment or performance claim is introduced. |
| Representation Control Auditor | defer | Probability and odds are marked as equivalent representations, not competing evidence. |
| Data Split & Leakage Auditor | defer | No dataset or split is introduced. |
| Factorization Method Steward | pass | The cluster exposes model-measure, representation, exposure, and knowledge pivots. |
| Evidence & Claims Editor | pass | Established formulas, framework-scoped risk, and candidate organization remain separate. |
| Benchmark Numeracy Checker | pass after findings | Probability domains, endpoints, consequence units, coverage factors, and horizons remain visible. |
| Reference Lexicographer | pass | Chance, odds, risk, likelihood, and uncertainty receive explicit contrasts. |
| Reference Architecture Editor | pass | One anchor owns distinctions; sibling Formula views avoid probability-range duplication. |
| Research Integrity & Provenance | pass | OpenStax and NIST sources and scope are explicit. |
| Cross-Paradigm Mapping Auditor | defer | No implementation-mechanism mapping is introduced. |
| Domain Source Reviewer | pass for candidate | Statistics, risk-framework, and metrology sources support candidate publication. |
| Equation & Units Auditor | pass after findings | Denominators, probability ranges, consequence units, and uncertainty units are explicit. |
| Mapping Integrity Auditor | pass | Probability/odds direction, inverse, endpoints, and loss are declared. |
| Schema Implementer | defer | Typed risk and uncertainty records remain Markdown-first. |
| Benchmark Consumer | defer | Existing evidence packets are unchanged. |
| Reference Practitioner | pass | The selection procedure prevents score, conditional, risk, and interval misuse. |

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| PRUF-001 | critical | Any normalized score could be renamed probability. | Closed: event, sample space, and probability measure are required. |
| PRUF-002 | critical | Conditional probability direction could be reversed. | Closed: event and conditioning roles and `P(B) > 0` are explicit. |
| PRUF-003 | major | Odds could be displayed as probability without conversion. | Closed: forward, inverse, against, and endpoint mappings are declared. |
| PRUF-004 | critical | Probability could be treated as complete risk. | Closed: scenario, consequence, entity, horizon, and controls are required. |
| PRUF-005 | critical | Likelihood times impact could be universalized. | Closed: risk is a model family; product scoring is only one possible declared model. |
| PRUF-006 | major | Expected loss could be treated as complete risk preference. | Closed: tail, distribution, ambiguity, and preference exclusions are visible. |
| PRUF-007 | critical | Consequences with different units or perspectives could be averaged. | Closed: common unit, stakeholder perspective, and horizon are mandatory. |
| PRUF-008 | major | General uncertainty could be forced into probability. | Closed: intervals, sets, scenarios, distributions, and qualitative states remain available. |
| PRUF-009 | critical | Plus-minus measurement uncertainty could omit its coverage basis. | Closed: `u_c`, `k`, components, and interpretation must be reported. |
| PRUF-010 | major | `k = 2` could be claimed to guarantee exactly 95% coverage. | Closed: distributional and approximation conditions remain explicit. |

No critical or major finding remains open for candidate publication.


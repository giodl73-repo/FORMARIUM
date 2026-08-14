# Diverse Formula Pilots Review

Status: fixed point for candidate publication

## Scope

- `docs/research/2026-08-14-formula-pilot-selection.md`
- `tables/formulas/INDEX.md`
- `tables/formulas/density.md`
- `tables/formulas/ohms-law.md`
- `tables/formulas/arithmetic-mean.md`

## Dispositions

| Role or lens | Result | Finding or rationale |
|---|---|---|
| Compositional Semantics Steward | pass | Conceptual Factor Tables remain distinct from exact mathematical expressions. |
| Experimental Methodologist | pass after findings | Empirical and statistical relations state applicability rather than inferring universality from examples. |
| Representation Control Auditor | defer | No encoding comparison is introduced. |
| Data Split & Leakage Auditor | defer | The mean entry names sampling as an external inference contract; no dataset is introduced. |
| Factorization Method Steward | pass | Each pilot exposes boundaries, contexts, constraints, and derived outputs appropriate to its relation. |
| Evidence & Claims Editor | pass | Relation kind prevents familiar names from overstating what an equation claims. |
| Benchmark Numeracy Checker | pass after findings | Units, dimensions, counts, nonzero restrictions, and equal weighting remain visible. |
| Reference Lexicographer | pass | Average density, terminal Ohm relation, and sample arithmetic mean are scoped senses. |
| Reference Architecture Editor | pass | The formula catalog owns coverage projections while entries own definitions. |
| Research Integrity & Provenance | pass | Every actionable domain claim has a cited source and confidence. |
| Cross-Paradigm Mapping Auditor | defer | No software mechanism mapping is added. |
| Domain Source Reviewer | pass for candidate | Physics and statistics claims use established educational or standards sources; specialist promotion review remains pending. |
| Equation & Units Auditor | pass after findings | Relation kinds, symbol contracts, dimensions, domains, rearrangement restrictions, and failure regimes are explicit. |
| Schema Implementer | defer | Machine expressions and generated dimensional checks remain future work. |
| Benchmark Consumer | defer | Existing evidence packets are unchanged. |
| Reference Practitioner | pass | The pilots demonstrate fast comparison across three different formula purposes. |

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| FPF-001 | critical | Famous equations could all be flattened into an undifferentiated list of "laws." | Closed: the catalog facets definition, law, empirical constitutive relation, and statistic separately. |
| FPF-002 | major | `rho = m/V` could imply local uniformity. | Closed: the entry is explicitly average density over a selected finite boundary and defers local density. |
| FPF-003 | critical | Ohm's law could be presented as universal because of its name. | Closed: it is classified as empirical, limited to ohmic behavior and stated physical conditions. |
| FPF-004 | major | `R = V/I` at one operating point could be mistaken for proof of ohmic linearity. | Closed: the rearrangement and failure signs reject that inference. |
| FPF-005 | critical | The arithmetic mean could be recommended as representative for every distribution. | Closed: inclusion, equal weighting, heavy tails, Cauchy behavior, and robust alternatives remain visible. |
| FPF-006 | major | Statistic units could be lost because `n` is dimensionless. | Closed: the mean explicitly retains the observation unit and dimension. |
| FPF-007 | major | Formula growth could favor many familiar physics equations while leaving relation kinds untested. | Closed: the catalog tracks relation-kind coverage and prioritizes uncovered kinds. |

No critical or major finding remains open for candidate publication.


# Geometric Measure Cluster Review

Status: fixed point for candidate publication

## Scope

- `docs/research/2026-08-14-geometric-measure-cluster.md`
- `tables/entries/geometric-measure.md`
- `tables/formulas/common-geometric-measures.md`
- formula and anchor index updates

## Dispositions

| Role or lens | Result | Finding or rationale |
|---|---|---|
| Compositional Semantics Steward | pass | Boundary/interior, dimensionality, shape, parameters, and units have explicit interpretations. |
| Experimental Methodologist | defer | No empirical performance claim is made. |
| Representation Control Auditor | defer | No representation comparison is introduced. |
| Data Split & Leakage Auditor | defer | No dataset or split is introduced. |
| Factorization Method Steward | pass after findings | Measure kind precedes shape formula, avoiding one flat arbitrary catalog. |
| Evidence & Claims Editor | pass | Established formulas and candidate Factorium organization are separate claims. |
| Benchmark Numeracy Checker | pass | Linear, square, and cubic units; exactness; and compatible inputs remain visible. |
| Reference Lexicographer | pass | Perimeter, circumference, area, surface area, and volume are separated by measured subset and dimension. |
| Reference Architecture Editor | pass | One anchor owns conceptual distinctions and one linked Formula Table owns the common formula matrix. |
| Research Integrity & Provenance | pass | NIST and OpenStax sources are cited with scope and access date. |
| Cross-Paradigm Mapping Auditor | defer | No implementation-mechanism mapping is introduced. |
| Domain Source Reviewer | pass for candidate | Established educational and metrology sources support the formulas and units. |
| Equation & Units Auditor | pass after findings | Symbols, dimensions, exact forms, unit exponents, and formula restrictions are explicit. |
| Mapping Integrity Auditor | defer | Unit conversion is referenced but no new conversion mapping is defined. |
| Schema Implementer | defer | Shape and formula selection remain Markdown-first. |
| Benchmark Consumer | defer | Existing evidence packets are unchanged. |
| Reference Practitioner | pass | A reader can choose measure kind and shape before applying a formula. |

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| GMF-001 | critical | A flat formula list could encourage choosing by remembered symbols instead of the measured concept. | Closed: selection begins with boundary/interior and dimension, then shape. |
| GMF-002 | critical | Perimeter, area, surface area, and volume could be interchanged because they all describe "size." | Closed: each has a distinct measured subset, dimension, and unit exponent. |
| GMF-003 | major | Circumference could become a duplicate authority instead of a specialized perimeter. | Closed: it is explicitly a circle-specific perimeter sense. |
| GMF-004 | critical | Surface area formulas could silently include or exclude faces contrary to the problem. | Closed: the formula matrix assumes a closed exterior and flags open or omitted faces as another measured subset. |
| GMF-005 | major | Shared parameters such as radius could imply surface area and volume are interchangeable. | Closed: output dimensions and reader questions remain separate. |
| GMF-006 | major | Composite figures could double-count overlap or omit holes. | Closed: composition requires disjoint included pieces and explicit exclusions. |
| GMF-007 | major | Decimal use of `pi` could be labeled exact. | Closed: symbolic and approximate results are explicitly separated. |
| GMF-008 | major | A dimensionally valid formula could still use the wrong shape. | Closed: dimensional audit is necessary but shape and boundary selection remain separate checks. |

No critical or major finding remains open for candidate publication.


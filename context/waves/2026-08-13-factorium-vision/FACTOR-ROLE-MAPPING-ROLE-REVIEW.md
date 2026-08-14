# Factor Role Mechanism Mapping Review

Status: fixed point for candidate publication

## Scope

- `docs/research/2026-08-15-cross-paradigm-role-mappings.md`
- `tables/mappings/factor-role-mechanisms.md`
- `tables/foundations/FACTOR-ROLES.md`
- `specs/MAPPING-TABLE-ENTRY.md`
- canonical interchange registration and generated catalog

## Dispositions

| Role or lens | Result | Finding or rationale |
|---|---|---|
| Compositional Semantics Steward | pass after findings | Roles remain source semantics; mechanisms remain contextual assignments. |
| Experimental Methodologist | defer | Mapping rows need repeated real-project evidence before promotion. |
| Representation Control Auditor | pass | No performance or encoding superiority is claimed. |
| Data Split & Leakage Auditor | defer | No dataset or split is introduced. |
| Factorization Method Steward | pass after findings | Many-to-many assignment prevents one target mechanism from owning the decomposition. |
| Evidence & Claims Editor | pass | Authoritative mechanism definitions and candidate Factorium synthesis have separate status. |
| Benchmark Numeracy Checker | defer | No quantitative benchmark is claimed. |
| Reference Lexicographer | pass | Role names, mechanism names, and colloquial similarities remain distinct. |
| Reference Architecture Editor | pass after findings | Six slices share one Mapping view and one canonical `mechanism-assignment` sense. |
| Research Integrity & Provenance | pass | Every target slice cites an official or public primary source. |
| Cross-Paradigm Mapping Auditor | pass after findings | Direction, scope, cardinality, preservation, loss, and non-equivalence are explicit. |
| Domain Source Reviewer | pass for candidate | Source documents own target mechanism semantics; synthesis is not promoted beyond candidate. |
| Equation & Units Auditor | defer | No quantitative relation is introduced. |
| Mapping Integrity Auditor | pass after findings | The mapping is contextual, partial, many-to-many, and non-invertible without retained annotations. |
| Schema Implementer | pass | Rows can be consumed as candidate assignments without implying executable transformation. |
| Benchmark Consumer | defer | Existing evidence packets are unchanged. |
| Reference Practitioner | pass after findings | Conditions and failure signs support mechanism selection without requiring paradigm expertise first. |

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| FRM-001 | critical | Mapping roles directly to syntax could let paradigms redefine Factorium semantics. | Closed: every row starts from a governing question and labels mechanisms contextual candidates. |
| FRM-002 | critical | A one-to-one crosswalk would be false across all six paradigms. | Closed: cardinality is many-to-many and the inverse is invalid without retained context. |
| FRM-003 | major | Inheritance could become the default OO answer for pivot, variant, and capability. | Closed: separate composition, interface, association, strategy, state, and query mechanisms are listed with non-equivalences. |
| FRM-004 | major | Rust traits could be treated as classes or variants. | Closed: traits map conditionally to capability; structs, enums, ownership, references, and modules retain distinct rows. |
| FRM-005 | major | Functional programming could be reduced to algebraic data types. | Closed: products, sums, type classes, functions, modules, environments, and smart constructors remain separate. |
| FRM-006 | critical | Relational tables could collapse identity, relationship, constraint, policy, and projection. | Closed: keys, foreign keys, junctions, constraints, policy relations, histories, and views are distinct mechanisms. |
| FRM-007 | critical | Kubernetes could be presented as the definition of cloud architecture. | Closed: the slice is explicitly Kubernetes-shaped and target scoped. |
| FRM-008 | critical | Job titles could be treated as complete organizational responsibility models. | Closed: positions, teams, charters, delegations, relationships, policies, controls, and reports are separate candidates. |
| FRM-009 | major | Derived views could be mistaken for source facts in every paradigm. | Closed: each slice distinguishes queries, status, reports, or computed values from retained inputs. |
| FRM-010 | major | The table could imply automatic code generation readiness. | Closed: executable transformation is a non-goal pending repeated implementation evidence. |
| FRM-011 | major | Target-specific validity constraints could disappear in translation. | Closed: selection requires local target version, conditions, loss, expected change, and invalid-case tests. |

No critical or major finding remains open for candidate publication.

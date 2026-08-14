# Reference Table Families Review

Status: fixed point for candidate publication

## Scope

- `docs/research/2026-08-14-reference-table-families.md`
- `specs/REFERENCE-TABLE-FAMILIES.md`
- `specs/MAPPING-TABLE-ENTRY.md`
- `tables/foundations/REFERENCE-TABLE-FAMILIES.md`
- `tables/mappings/temperature-scales.md`
- `.roles/assurance/mapping-integrity-auditor.md`
- related vision and navigation updates

## Dispositions

| Role or lens | Result | Finding or rationale |
|---|---|---|
| Compositional Semantics Steward | pass after findings | Families are view kinds over one entry graph, not competing ontologies. |
| Experimental Methodologist | defer | The eleven-family taxonomy is a candidate awaiting pilot and lookup evidence. |
| Representation Control Auditor | defer | No representation-performance claim is made. |
| Data Split & Leakage Auditor | defer | No dataset or split is introduced. |
| Factorization Method Steward | pass | The architecture preserves Factor Tables rather than forcing every question into decomposition. |
| Evidence & Claims Editor | pass | Candidate taxonomy and established NIST mappings have separate maturity claims. |
| Benchmark Numeracy Checker | pass | Exact conversion constants, physical domains, and rounding limits remain visible. |
| Reference Lexicographer | pass after findings | Table family, subtype, entry, sense, and view remain separate editorial levels. |
| Reference Architecture Editor | pass after findings | Shared contracts and canonical ownership prevent eleven disconnected collections. |
| Research Integrity & Provenance | pass | Architecture claims cite standards or local contracts; the mapping cites NIST. |
| Cross-Paradigm Mapping Auditor | pass | Cross-paradigm assignments remain one Mapping Table subtype rather than defining all mappings. |
| Domain Source Reviewer | pass for candidate | NIST owns the temperature conversion authority; other families remain design candidates. |
| Equation & Units Auditor | pass | Point and interval conversions, units, physical domains, and exactness are explicit. |
| Mapping Integrity Auditor | pass after findings | Direction, affine form, inverse, round trip, loss, rounding, and domains are visible. |
| Schema Implementer | defer | Executable decision, transition, and mapping semantics await dedicated interchange contracts. |
| Benchmark Consumer | defer | Existing evidence packets are unchanged. |
| Reference Practitioner | pass | Governing questions make family selection scannable; temperature conversion is immediately usable. |

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| RTF-001 | critical | Expanding beyond factorization could turn Factorium into an arbitrary encyclopedia of tables. | Closed: eleven families are bounded by governing questions, shared contracts, and one canonical entry graph. |
| RTF-002 | critical | Each table family could create a duplicate headword authority. | Closed: family is a view kind; entry and sense identity remain canonical. |
| RTF-003 | major | Truth, conversion, classification, and troubleshooting could become unnecessary top-level families. | Closed: they are explicit subtypes of decision/constraint, mapping, decision, and diagnostic families. |
| RTF-004 | critical | Executable-looking decision or transition tables could imply semantics Factorium has not specified. | Closed: executable export is deferred until completeness, conflict, ordering, and side-effect contracts exist. |
| RTF-005 | critical | Point-temperature and interval conversion could be conflated. | Closed: the pilot supplies separate tables and explicitly forbids applying offsets to intervals. |
| RTF-006 | major | Exact mapping could be confused with exact displayed round trips after rounding. | Closed: mathematical exactness and finite-decimal rounding are separate. |
| RTF-007 | major | Formula and mapping views could duplicate one another. | Closed: formulas relate quantities within a model; mappings translate between systems with preservation and loss. |
| RTF-008 | major | A convenient conversion could accept physically invalid temperatures. | Closed: scale-specific absolute-zero domains remain visible. |

No critical or major finding remains open for candidate publication.


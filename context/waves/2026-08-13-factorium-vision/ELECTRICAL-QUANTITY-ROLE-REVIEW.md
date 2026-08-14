# Electrical Quantity Cluster Review

Status: fixed point for candidate publication

## Scope

- `docs/research/2026-08-14-electrical-quantity-cluster.md`
- `tables/entries/electrical-quantity.md`
- `tables/formulas/electrical-quantities.md`
- `tables/formulas/ohms-law.md`
- related index and cross-reference updates

## Dispositions

| Role or lens | Result | Finding or rationale |
|---|---|---|
| Compositional Semantics Steward | pass | Charge, crossing surface, terminals, directions, state, rate, and energy roles remain explicit. |
| Experimental Methodologist | defer | No new experiment or device-performance claim is introduced. |
| Representation Control Auditor | defer | No encoding comparison is introduced. |
| Data Split & Leakage Auditor | defer | No dataset or split is introduced. |
| Factorization Method Steward | pass | Quantity, rate, difference, response, transfer rate, and accumulated transfer form a clear ladder. |
| Evidence & Claims Editor | pass | Established electrical physics remains separate from candidate organization. |
| Benchmark Numeracy Checker | pass | Units, signs, integrals, and inherited restrictions remain visible. |
| Reference Lexicographer | pass after findings | Flow and pressure metaphors do not replace technical quantity senses. |
| Reference Architecture Editor | pass | One anchor links a general Formula view and the narrower Ohm constitutive view. |
| Research Integrity & Provenance | pass | OpenStax and NIST sources support actionable claims. |
| Cross-Paradigm Mapping Auditor | defer | No implementation-mechanism mapping is introduced. |
| Domain Source Reviewer | pass for candidate | Sources support introductory electrical pilot depth. |
| Equation & Units Auditor | pass after findings | Surfaces, terminals, signs, units, state, and model inheritance are explicit. |
| Mapping Integrity Auditor | defer | No separate conversion Mapping Table is introduced. |
| Schema Implementer | defer | Terminal semantics remain Markdown-first until R2. |
| Benchmark Consumer | defer | Founding packets remain unchanged. |
| Reference Practitioner | pass | Selection prevents common voltage/current/power substitutions. |

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| EQF-001 | critical | Charge and current could be collapsed. | Closed: quantity and oriented crossing-rate senses are separate. |
| EQF-002 | major | Conventional current could be equated with electron motion. | Closed: carrier and current directions are explicitly distinguished. |
| EQF-003 | critical | Voltage could omit its terminal pair. | Closed: ordered points, polarity, and energy-per-charge role are required. |
| EQF-004 | critical | Ohm's law could be treated as universal. | Closed: the existing empirical view retains operating-regime authority. |
| EQF-005 | major | Resistance could be treated as constant across state changes. | Closed: material state and temperature remain part of scope. |
| EQF-006 | critical | Power could be confused with energy. | Closed: rate, integration, duration, watt, and joule distinctions are explicit. |
| EQF-007 | critical | Power direction could be hidden by magnitudes. | Closed: the passive sign convention and reference directions are explicit. |
| EQF-008 | critical | Resistive power equations could escape Ohm scope. | Closed: derived forms explicitly inherit all Ohm restrictions. |

No critical or major finding remains open.


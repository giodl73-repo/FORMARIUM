# Formography Comparative Slice 02 Role Review

Date: 2026-08-18
Verdict: accept explicit domain extension; retain narrowed method claim

| Role | Findings | Disposition |
|---|---|---|
| Factorization Method Steward | The same core objects remain usable; total, concentration, fraction, and molar-mass lenses are explicit alternatives rather than one forced hierarchy. | Pass. |
| Equation & Units Auditor | Quantity identity, numerator, denominator, unit, conditions, uncertainty, and closure cannot be inferred from a formula label; the explicit extension is necessary. | Pass after extension. |
| Domain Source Reviewer | SI and IUPAC retain quantity authority; Factorium and Formography organize source-custodied comparisons only. | Pass. |
| Mapping Integrity Auditor | Equal units do not establish equal quantity kinds; relation qualifiers retain basis and scope; the generic graph again carries the full record. | Pass with representation claim blocked. |
| Schema Implementer | The core validator shape transfers and the domain extension fails deterministically on a missing denominator basis. | Pass for research fixture. |
| Research Integrity & Provenance | Entry and Formula view bytes match their fixed-point assurance records; no measurement or scientific-validation claim is introduced. | Pass. |
| Skeptical Simplicity Lens | An explicit domain extension avoids vacuous universal vocabulary, but accumulating many extensions could make Formography only a wrapper over domain schemas. | Open empirical challenge. |
| Reference Practitioner | The quantity ladder and basis contrasts support orientation, but no reader task has compared the three encodings. | Reader claim blocked. |

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| FGQ-001 | critical | Generic `factor` and `relation` fields could hide quantity kind and basis. | Closed: a named seven-field quantity extension is mandatory. |
| FGQ-002 | major | The core vocabulary could silently change meaning in science. | Closed for this case: the extension constrains domain content without redefining core objects. |
| FGQ-003 | major | The property graph might lose domain semantics. | Closed negatively: it retains the complete core and extension, so no graph-expressiveness claim survives. |
| FGQ-004 | major | A concentration could omit its denominator and remain apparently valid. | Closed: the invalid fixture fails with `FG-QUANTITY-BASIS-MISSING`. |
| FGQ-005 | major | Source authority could migrate from SI/IUPAC to Formography. | Closed: authority retention and non-validation boundaries are explicit. |
| FGQ-006 | major | Domain extensions could proliferate without a stopping rule. | Open gate: the third case must distinguish essential extension from case-specific schema. |

No critical finding remains open. FGQ-006 is the main design pressure carried
into case 03 and independent coding.

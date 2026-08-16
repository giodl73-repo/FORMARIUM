---
skill: roles-check
topic: quantity-value-unit-conversion
date: 2026-08-15
roles_used: 13
p1_count: 0
verdict: APPROVED
---

# Quantity Value and Unit Conversion Roles Check

## Artifact identification

Artifact type: canonical Factor Table anchor, Mapping view, evidence note, and
book/task integration. Domain signals: metrology, quantities, dimensions,
unit systems, affine scales, uncertainty, mapping integrity, and reference
architecture.

## Role selection

The review selected the Compositional Semantics Steward, Factorization Method
Steward, Experimental Methodologist, Evidence & Claims Editor, Benchmark
Numeracy Checker, Reference Lexicographer, Reference Architecture Editor,
Concept & Taxonomy Boundary Editor, Research Integrity & Provenance, Domain
Source Reviewer, Equation & Units Auditor, Mapping Integrity Auditor, and
Reference Practitioner. Together they cover semantic structure, claims,
counts, vocabulary, architecture, catalog boundaries, sources, equations,
mapping behavior, and practical lookup.

## Per-role findings

| Role | Finding | Severity | Closure |
|---|---|---:|---|
| Compositional Semantics Steward | Quantity, quantity value, numerical value, and unit could collapse. | P2 | Separate senses and contrasts now govern each role. |
| Compositional Semantics Steward | Point and interval values could share an invalid offset rule. | P2 | Affine point and interval contracts are separate. |
| Compositional Semantics Steward | Ordinal values could be forced into ordinary arithmetic. | P3 | Ordinal mappings require their owning procedure. |
| Factorization Method Steward | One familiar factor-label method could appear universal. | P2 | Multiplicative, compound, affine, level, and ordinal classes remain visible. |
| Factorization Method Steward | Unit relation direction could be an implicit dependent factor. | P2 | Direction and inverse domain are explicit factors. |
| Factorization Method Steward | Named unit families could drive subtype growth. | P3 | Units remain examples and external authority data. |
| Experimental Methodologist | A successful worked example could be called usability evidence. | P2 | Task AE remains simulation route coverage only. |
| Experimental Methodologist | Conversion success could be inferred from cancellation alone. | P2 | Inverse, quantity-kind, uncertainty, and rounding checks remain required. |
| Experimental Methodologist | The current rehearsal could close the external-reader gate. | P3 | Preview and Sieve claims remain explicitly excluded. |
| Evidence & Claims Editor | Exact factors could imply exact measured results. | P2 | Factor exactness and result uncertainty are contrasted. |
| Evidence & Claims Editor | Conversion could imply accuracy or physical validity. | P2 | Both are explicit non-results in anchor and Mapping. |
| Evidence & Claims Editor | Factorium could imply authority over unit relations. | P3 | BIPM, JCGM, and NIST retain authority. |
| Benchmark Numeracy Checker | New entry/view counts could drift across projections. | P2 | Reference and renderer derive the 19/25 delta mechanically. |
| Benchmark Numeracy Checker | Powers and denominators could hide the effective factor. | P2 | Compound formula and worked examples expose both. |
| Benchmark Numeracy Checker | Rounding could create an undeclared comparison score. | P3 | Information preservation is described without a scalar quality score. |
| Reference Lexicographer | Conversion factor and unit conversion could look synonymous. | P2 | Ratio relation and mapping operation are separate senses. |
| Reference Lexicographer | Unit and dimension could look interchangeable. | P2 | Concise taglines and a dedicated contrast row separate them. |
| Reference Lexicographer | The long headword could hinder lookup. | P3 | `unit conversion` remains a discoverable sense and view title. |
| Reference Architecture Editor | The anchor could duplicate thermal or measurement-quality authority. | P2 | General representation owns conversion; specialist views retain local detail. |
| Reference Architecture Editor | A Formula view could be chosen for a translation question. | P2 | Mapping is the declared primary family. |
| Reference Architecture Editor | New records could remain outside the book route. | P3 | Part XXIII and Task AE integrate both paths. |
| Concept & Taxonomy Boundary Editor | Named units could become canonical sibling senses. | P2 | Canonical senses are reusable roles only. |
| Concept & Taxonomy Boundary Editor | Unit systems could expand into an atlas. | P2 | Authority/version are factors; catalogs remain external. |
| Concept & Taxonomy Boundary Editor | Logarithmic and ordinal families could trigger enumeration. | P3 | They mark mapping boundaries, not new family lists. |
| Research Integrity & Provenance | Unit-factor status could lack source custody. | P2 | Source/target authorities and relation provenance are required. |
| Research Integrity & Provenance | Current SI version could be unstated. | P2 | The research names SI Brochure version 4.01 and access date. |
| Research Integrity & Provenance | Generated counts could lack a reproducible link. | P3 | Reference sync and renderer remain the canonical derivation path. |
| Domain Source Reviewer | Dimension could be presented as sufficient for kind. | P2 | JCGM's same-dimension counterexample is central. |
| Domain Source Reviewer | Affine conversion could be mislabeled a conversion factor. | P2 | Conversion factor is limited to multiplicative same-kind units. |
| Domain Source Reviewer | Logarithmic guidance could overreach its cited scope. | P3 | Only the need for a governed reference contract is asserted. |
| Equation & Units Auditor | Affine offsets could mix quantity and numerical-value equations. | P2 | `x_s`, `x_t`, and `b` are declared numerical values. |
| Equation & Units Auditor | Compound conversion could omit exponent action. | P2 | Powered factor products are explicit. |
| Equation & Units Auditor | Uncertainty formulas could assume exact coefficients silently. | P3 | Exact `c` or `a` is an explicit condition; approximate factors add uncertainty. |
| Mapping Integrity Auditor | Source/target direction and inverse could be underspecified. | P2 | Directed factor and inverse-domain contracts are explicit. |
| Mapping Integrity Auditor | Round-trip claims could ignore rounding. | P2 | Preservation/loss and final-boundary rounding qualify round trips. |
| Mapping Integrity Auditor | Partial or procedure-defined mappings could appear total. | P3 | Ordinal and logarithmic/reference cases are excluded from the generic factor rule. |
| Reference Practitioner | Readers could lack a fast selection sequence. | P2 | Eight-step selection procedure begins with quantity kind. |
| Reference Practitioner | Common power/denominator mistakes could remain abstract. | P2 | Area, speed, and density examples exercise them. |
| Reference Practitioner | Conversion quality claims could remain easy to misuse. | P3 | Failure signs and Task AE make the misuse testable. |

## Synthesis

Roles reviewed: 13

P1 blockers: 0 | P2 issues: 26 | P3 notes: 13

Verdict: APPROVED after amendments.

Top finding: conversion must preserve quantity kind and cannot be licensed by
dimension alone. Cross-role consensus: factor direction, affine/interval
scope, exactness, uncertainty, and taxonomy boundary are inseparable parts of
the mapping contract.

## Amendments

1. Limited `conversion-factor` to multiplicative units of the same quantity
   kind and treated affine conversion as a broader Mapping operation.
2. Added explicit same-dimension/not-same-kind, conversion/calibration, and
   exact-factor/exact-result contrasts.
3. Added Task AE plus compound, affine, uncertainty, inverse, and rounding
   checks while keeping named-unit catalogs outside canon.

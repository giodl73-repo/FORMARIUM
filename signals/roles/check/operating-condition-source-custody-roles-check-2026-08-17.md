---
skill: roles-check
topic: operating-condition-source-custody
date: 2026-08-17
roles_used: 6
p1_count: 0
verdict: APPROVED-WITH-CONDITIONS
---

# Operating-Condition Source-Custody Roles Check

Artifact: `docs/research/2026-08-17-operating-condition-risk-treatment-source-boundary.md`

Artifact type: canonical-view source-custody repair

Domain signals: operating environment, verification, validation, hazard,
exposure, treatment, response, recovery, provenance, publication boundary

## Role selection

| Role | Why selected |
|---|---|
| Domain Source Reviewer | audits whether each primary source supports the exact use claimed |
| Evidence & Claims Editor | prevents guidance examples from becoming causal, safety, or effectiveness claims |
| Reference Architecture Editor | preserves existing owners, paths, and fixed-point structure |
| Concept & Taxonomy Boundary Editor | prevents a bounded synthesis from becoming a universal taxonomy |
| Reference Practitioner | tests whether provenance improves use without obscuring the governing question |
| Product Owner | limits work to a valuable maintenance repair and enforces the stop decision |

## Findings

### Domain Source Reviewer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | NASA's V&V and intended-environment distinctions support operating-context checks, not the whole diagnostic. | P2 | Operating diagnostic | Attribute only the bounded distinctions and label the symptom table as synthesis. |
| 2 | NIST SP 800-160 is systems-security guidance for contested operational environments. | P2 | Operating diagnostic | Retain its security-specific scope and make no universal dependability claim. |
| 3 | NIOSH and FEMA govern different practical domains and do not jointly define one treatment taxonomy. | P2 | Risk procedure | Cite them as bounded examples and retain external authority. |

### Evidence & Claims Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | A source citation could make a candidate diagnostic appear validated. | P2 | Status | State that sources support distinctions, not diagnostic validity or cause. |
| 2 | A treatment role could be mistaken for evidence of implementation or effectiveness. | P2 | Treatment table | Preserve the design, implementation, operation, effect, outcome, and residual-risk separation. |
| 3 | Internal completeness cannot become reader, field, or safety evidence. | P2 | Result | Report source-heading coverage only. |

### Reference Architecture Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | The repair could reopen fixed-point ownership. | P2 | Scope | Change exactly two existing view files and their assurance bindings. |
| 2 | Source prose could alter the canonical summary or generated edition identity. | P3 | Integration | Leave the reference manifest and `sim-42` immutable. |
| 3 | Review custody must follow the changed bytes. | P2 | Assurance | Bind both new digests to the final repair review. |

### Concept & Taxonomy Boundary Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Six treatment roles can look like a universal exhaustive taxonomy. | P2 | Risk procedure | Call the table editorial routing and deny universality and exhaustiveness. |
| 2 | Detection is not one of FEMA's five mission areas. | P2 | Source boundary | Do not attribute the six-role structure to FEMA. |
| 3 | Seven diagnostic symptoms can invite an open incident-type catalog. | P3 | Operating diagnostic | Keep the existing closed candidate table and add no examples or members. |

### Reference Practitioner

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | “See the canonical entry” would not tell a reader what authority supports the view. | P2 | Provenance | Put compact, direct source links in each repaired view. |
| 2 | Long source commentary could bury the practical procedure. | P3 | Presentation | Add provenance after the existing boundary. |
| 3 | Practitioners need to know which authority controls action. | P2 | Boundary | State that domain professionals, regulation, and emergency procedures prevail. |

### Product Owner

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Source completeness is useful maintenance but not grounds for another edition. | P2 | Portfolio | Repair canonical custody and stop without `sim-43`. |
| 2 | Expanding the tables would add review cost without an independent reader trigger. | P2 | Scope | Preserve substantive content byte-for-byte outside the new provenance sections. |
| 3 | A mechanical “148 of 148” result could be overstated as product value. | P3 | Claims | Report it as repository completeness only. |

## Synthesis

Roles reviewed: 6

P1 blockers: 0 | P2 issues: 14 | P3 notes: 4

Verdict: APPROVED-WITH-CONDITIONS

Top finding: authoritative guidance can support exact distinctions and bounded
examples, but it cannot validate Factorium's cross-domain synthesis.

Cross-role consensus: repair only the two missing provenance sections,
preserve fixed-point architecture, refresh exact assurance custody, and stop
without a new preview edition or external-evidence claim.

## Amendments

1. Bind each source to an explicit supported use and domain boundary.
2. Label both cross-domain structures as Factorium editorial synthesis rather
   than universal taxonomies, diagnostics, or treatment guidance.
3. Prove 148-of-148 source-heading coverage, unchanged inventory and relation
   sidecar, and exact assurance migration.


---
skill: roles-check
topic: system-architecture-description
date: 2026-08-16
roles_used: 8
p1_count: 0
verdict: APPROVED
---

# System Architecture and Description — Roles Check

Artifact type: canonical anchor-entry revision, Constraint Table revision,
source-backed ownership note, and reference migration.

## Selected roles

Factorization Method Steward for pivots; Reference Lexicographer for senses;
Reference Architecture Editor for canonical ownership; Concept & Taxonomy
Boundary Editor for catalog restraint; Domain Source Reviewer for architecture
sources; Research Integrity & Provenance for custody; Reference Practitioner
for use; Schema Implementer for deterministic migration.

## Review

| # | Role | Finding | Severity | Section | Amendment |
|---|---|---|---|---|---|
| 1 | Factorization | Architecture could collapse into component structure. | P2 | Sense table | Require environment, concepts/properties, relationships, and principles. |
| 2 | Factorization | Description could collapse into architecture. | P2 | Contrast | Give each a separate governing question and role. |
| 3 | Factorization | Viewpoint, view, and model kind are dependent conventions, not free dimensions. | P3 | Factors | Group them as one description-custody factor. |
| 4 | Lexicography | `Architecture` needs a findable canonical sense. | P2 | Headword | Add architecture to the existing owner title and senses. |
| 5 | Lexicography | `Subsystem` could imply a permanent subtype. | P2 | Contrast | Define it as system identity plus containing-system role. |
| 6 | Lexicography | Architecture description and view need a quick distinction. | P3 | Contrast | Contrast whole declared work product with concern-framed representation. |
| 7 | Architecture editor | A new anchor would duplicate system ownership. | P2 | Ownership | Deepen `system-composition-dependency`. |
| 8 | Architecture editor | A new view would inflate the record graph without a distinct family question. | P2 | View | Extend the existing integrity Constraint Table. |
| 9 | Architecture editor | Existing software mapping must remain downstream. | P3 | Cross-reference | Do not let software mechanisms define architecture. |
| 10 | Taxonomy | Named architecture styles invite an open-ended catalog. | P2 | Boundary | Exclude styles, frameworks, and domains. |
| 11 | Taxonomy | Viewpoint and model-kind examples could become sibling senses. | P2 | Boundary | Keep them governed values under description custody. |
| 12 | Taxonomy | Subsystem levels could produce recursive subtype expansion. | P3 | Boundary | Use the same contextual role rule at every nesting level. |
| 13 | Domain source | ISO 42010 governs descriptions, not architectures themselves. | P2 | Sources | State the source-scope distinction explicitly. |
| 14 | Domain source | Architecture evaluation differs from description integrity. | P2 | Constraints | Add no quality, fitness, or conformance result. |
| 15 | Domain source | NASA examples must not universalize one engineering lifecycle. | P3 | Claim boundary | Use NASA only for system-level illustration and terminology. |
| 16 | Provenance | Current and superseded standard editions must not blur. | P2 | Sources | Cite the current 2022 ISO description standard exactly. |
| 17 | Provenance | Local synthesis needs separate custody. | P2 | Status | Retain candidate maturity and Factorium attribution. |
| 18 | Provenance | Reference changes invalidate dependent query identities. | P3 | Migration | Rehash corpus, assurance, queries, guides, specs, and checks. |
| 19 | Practitioner | The entry needs an operational subsystem test. | P2 | Procedure | Require both contained and containing views. |
| 20 | Practitioner | Readers need to know what one diagram proves. | P2 | Examples | Say it may express one view but not the architecture or complete description. |
| 21 | Practitioner | Cross-view disagreement needs an owner. | P3 | Constraint | Retain correspondence, issue, decision, and revision records. |
| 22 | Implementer | V0 needs exact stable IDs for new senses and factors. | P2 | Interchange | Add two sense and four factor records in the entry's declared semantic order. |
| 23 | Implementer | The linked view must declare the new senses. | P2 | View | Extend exact sense ownership and summary. |
| 24 | Implementer | Generated catalogs and unresolved candidates must agree. | P3 | Validation | Regenerate and verify all projections. |

Roles reviewed: 8

P1 blockers: 0 | P2 issues: 16 | P3 notes: 8

Verdict: APPROVED

Top finding: architecture belongs with the existing system owner only if the
entity's architecture stays distinct from every artifact describing it.

Cross-role consensus: subsystem is a contextual role, not a new taxonomy;
candidate maturity and an explicit named-framework stopping boundary are
required.

## Amendments applied

1. Add separate `architecture` and `architecture-description` senses to the
   existing system owner.
2. Resolve subsystem through system identity plus containing-view role and add
   fail-able integrity constraints.
3. Exclude named styles/frameworks and migrate every dependent identity.

---
skill: roles-check
topic: two-book-product-architecture
date: 2026-08-17
roles_used: 7
p1_count: 0
p2_count: 0
verdict: PASS
---

# Two-Book Product Architecture Roles Check

## Artifact identification

Type: product architecture, reference navigation, and generated-site proposal.

Domain signals: dictionary, thesaurus, encyclopedia, teaching companion,
guides, canonical authority, projection, navigation, search, and release
claims.

## Role selection

| Role | Why selected |
|---|---|
| Reference Lexicographer | Factorium Tables is explicitly a dictionary/thesaurus experience. |
| Reference Architecture Editor | The change separates books, navigation paths, and authority. |
| Evidence & Claims Editor | Product labels must not imply observed effectiveness or publication. |
| Mapping Integrity Auditor | Reader and Guide content are lossy projections of canonical Tables. |
| Reference Practitioner | The split must reduce lookup and learning friction. |
| Schema Implementer | The generated edition needs deterministic identity and compatibility. |
| Product Owner | The split must create product value without another content or software layer. |

## Review

### Reference Lexicographer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | A “Tables” label alone does not guarantee dictionary or thesaurus behavior. | P2 | Tables job | Name direct lookup, sense distinction, and broader/narrower/related/contrast/confused navigation explicitly. |
| 2 | Search that mixes Tables and Guides can obscure authority. | P2 | navigation | Retain kind labels and state that ranking never changes canonical ownership. |
| 3 | Alphabetical and concept-family projections may coexist without changing entry identity. | P3 | publication | Treat ordering as a reversible projection rather than ontology. |

### Reference Architecture Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Calling both outputs books could accidentally create two definition authorities. | P2 | authority | Define one canonical Table authority and one linked Reader projection. |
| 2 | The current mixed homepage does not expose the product boundary. | P2 | front door | Present Tables first and Reader second as two distinct starts. |
| 3 | Factor Guides need an explicit placement or they become an informal third book. | P3 | guides | Define Guides as bounded applications linked to both products. |

### Evidence & Claims Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | “Dictionary/thesaurus” describes intended form, not completeness or lookup success. | P2 | claims | State intended product behavior and defer quality claims to readers. |
| 2 | “Reader” can imply an effective curriculum without evidence. | P2 | Reader | Call it a candidate teaching companion and retain simulation boundaries. |
| 3 | A cleaner front door is publication mechanics, not preview admission. | P3 | result | Keep R4/R5P and `preview-01` open. |

### Mapping Integrity Auditor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | The 24-record Reader spine omits 151 canonical records. | P2 | projection | Make the loss and depth handoff explicit everywhere the Reader is introduced. |
| 2 | Worked explanations may silently copy definitions. | P2 | custody | Require exact links to owning Tables and treat copied authority as a defect. |
| 3 | Reader order must not imply universal dependency. | P3 | teaching order | Label the spine a selected teaching route with alternate search starts. |

### Reference Practitioner

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Lookup-oriented readers should not pass through method instruction first. | P2 | Tables start | Offer Search Tables and Browse Tables directly in the first choice. |
| 2 | Learners need a recognizable method start rather than repository language. | P2 | Reader start | Use “Read the Guide” or “Learn the method” and link the quickstart. |
| 3 | The same person may switch modes mid-task. | P3 | cross-navigation | Keep Tables and Reader links visible on all generated pages. |

### Schema Implementer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | A prose-only product split cannot be regression checked. | P2 | generated site | Add exact two-book counts, route targets, labels, and order assertions. |
| 2 | Reusing sim-30 assets would mutate its fixed identity. | P2 | compatibility | Add sim-31-specific style and conditional markup. |
| 3 | Product placement must not change canonical source counts. | P3 | manifest | Assert 175 canonical records and unchanged reference/relation identities. |

### Product Owner

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | The split earns value only if it makes two recognizable jobs immediately easier. | P2 | value | Bind each book to direct actions and defer decorative restructuring. |
| 2 | A third “Guide product” would recreate the original ambiguity. | P2 | portfolio | Keep Factor Guides subordinate, short, and bounded. |
| 3 | More entries or composition features do not validate the architecture. | P3 | scope | Freeze content and test only hierarchy, routing, labels, and mechanics. |

## Synthesis

Roles reviewed: 7

P1 blockers: 0 | P2 issues: 14 | P3 notes: 7

Verdict: APPROVED-WITH-CONDITIONS

Top finding: two books must not become two canonical authorities.

Cross-role consensus: Tables must be the direct primary reference path;
Reader and Guides must disclose their selection, loss, and subordinate
authority.

## Amendments

1. Define the two jobs, one-authority contract, and Guide placement in a
   durable product architecture spec.
2. Add a sim-31 front door with Tables first, Reader second, direct actions,
   persistent cross-navigation, and exact deterministic checks.
3. Preserve sim-30 and canonical counts; report only architecture and browser
   mechanics, not reader effectiveness or release readiness.

## Fixed-point result verification

All fourteen P2 recommendations were implemented and rerun; no P1/P2 finding
remains open.

| Role | Closure evidence |
|---|---|
| Reference Lexicographer | Tables are explicitly dictionary/thesaurus, direct Search/Browse starts, with kind-labelled mixed search and unchanged authority. |
| Reference Architecture Editor | One canonical Table authority serves two separately named books; Guides are subordinate applications. |
| Evidence & Claims Editor | Product labels describe intended form only; simulation, R4/R5P, and publication boundaries remain explicit. |
| Mapping Integrity Auditor | Reader selection discloses 24 included and 151 depth records, non-universal order, and exact Table handoff. |
| Reference Practitioner | Lookup requires no Reader preamble; learning has a plain-language Reader start; both links persist. |
| Schema Implementer | Sim-31 has exact book/route/count/order checks and its own CSS; sim-30 reproduces exactly. |
| Product Owner | The smallest hierarchy-and-routing slice makes two recognizable jobs explicit without content or feature expansion. |

Final verdict: **PASS**. Product decision: **continue the two-book model;
stop mixed-book naming**.

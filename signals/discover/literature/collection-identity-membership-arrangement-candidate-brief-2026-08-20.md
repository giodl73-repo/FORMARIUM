---
topic: collection-identity-membership-arrangement
date: 2026-08-20
status: candidate admission brief
canonical_admission: false
---

# Collection Identity, Membership, Arrangement, and Completeness

## Decision question

Does Lexicon need a collection-level owner for when an aggregate is separately
identified and for its membership, arrangement, and completeness,
without treating members as parts or universalizing archival and library models?

## Bounded thesis

Proceed if four independently answerable questions remain after the actual-owner
audit: identity of the governed aggregate, its membership criterion, its
arrangement, and scope-relative completeness. Members, boundaries, lifecycle,
and custody are factors or routes. A typed declared membership assertion must
not be admitted as unqualified `part-of`.

## Proposed senses

| Sense | Governing question |
|---|---|
| `named-collection` | Which separately identified aggregate is governed by which organizing principle and purpose, independently of its current extension? |
| `membership-rule` | Which declared criterion determines what belongs to this named collection independently of its current extension? |
| `collection-arrangement` | Under which scheme are the collection's members ordered, grouped, sequenced, or declared unordered? |
| `collection-completeness` | To what extent does the current membership satisfy the collection's declared scope, and which gaps are known? |

## Candidate contract

```text
collection-identity
  := collection identity and organizing principle
   x membership rule, declared scope, current members, and typed membership
   x arrangement
   x completeness gap
   x identity basis, lifecycle, custody, access, provenance, evidence, and revision
```

## Existing-owner audit

- System composition owns system elements and boundary-relative inclusion, but a
  collection does not require interacting elements or whole-level behavior.
- Identity/classification owns entity continuity, names, and scheme membership;
  it does not govern one collection's persistent membership rule or holdings.
- Decomposition owns completeness of a selected factorization, not completeness
  against a collection's declared scope.
- Organization already owns possession/control custody as well as stewardship
  and lifecycle decision authority. A collection's custodian, preservation
  obligations, and transfer chain therefore route there rather than defining a
  collection-specific sense.
- State/lifecycle owns collection lifecycle stage. Claim/evidence owns provenance
  claims. Abstract-work ownership remains separate from collection governance.
- No `part-of` relation is proposed: collection membership is typed, declared,
  and rule-bound.

## Source matrix

| Source | Contribution | Limitation |
|---|---|---|
| [IFLA LRM](https://repository.ifla.org/handle/20.500.14598/40) | aggregate-work and member-relation context | work ontology does not settle collection governance generally |
| [ICA RiC-CM](https://www.ica.org/ica-network/expert-groups/egad/records-in-contexts-ontology/) | record-set and custody context | archival provenance is one identity basis, not a universal rule |
| [DCAT 3](https://www.w3.org/TR/vocab-dcat-3/) | curated catalog and dataset-series examples | metadata vocabulary does not define completeness or custody for every domain |
| [PROV-O](https://www.w3.org/TR/prov-o/) | collections as entities with asserted members | explicitly agnostic about membership rules, order, completeness, and custody |
| [SEP Mereology](https://plato.stanford.edu/entries/mereology/) | boundary between parthood and group membership debate | philosophical overview does not define archival/data practices |

## Counterevidence and limits

- A transient query result, arbitrary folder, or bibliography may be an
  aggregate but lacks the persistent governed identity required here.
- A collection may be intentionally incomplete, complete only to an explicitly
  declared scope, or have no physical ordering; these are not failures of
  identity.
- An archival fonds can be provenance-based while a library collection can be
  selection-based; neither basis is universal.
- Custody can transfer without changing collection identity, and custody need
  not establish legal ownership or access rights.
- A mathematical set and a mereological sum remain outside this candidate.

## Admission gates

1. Preserve exactly the four proposed senses; retain member, boundary,
   lifecycle, and custody as factors/routes.
2. Require independent answers for identity, rule, arrangement, and
   completeness; do not collapse them into a single metadata record.
3. State identity basis and do not universalize archive/library practice.
4. Preserve the `part-of` rejection; no relation sidecar is created.
5. Remain noncanonical and defer abstract-work, classification, access,
   provenance, stewardship, and lifecycle questions to their owners.

## Disposition

**PROCEED TO NONCANONICAL CANDIDATE ENTRY DRAFT; DO NOT ADMIT CANONICALLY.**
The four questions survive the owner audit and remain mutually distinguishable
across archival, library, data, research, and museum contexts.

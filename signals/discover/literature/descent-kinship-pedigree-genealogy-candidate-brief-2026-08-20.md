---
topic: descent-kinship-pedigree-genealogy-candidate
date: 2026-08-20
status: candidate admission brief
canonical_admission: false
---

# Descent, Kinship, Pedigree, and Genealogy

## Decision question

Does Lexicon need an owner for the ancestor-to-descendant derivation relation,
the socially recognized category of relatedness, the recorded structure of
parent-offspring links, and the sourced reconstruction of ancestry for named
individuals?

## Scope decision: the requested family is split

The requested family — lineage, kinship, descent, inheritance, succession — was
examined as one unit and rejected as one unit. It carries two incompatible
governing questions:

- **Who comes from whom, and who counts as related?** This is a question about
  the structure of ancestry and recognized relatedness. It is answered with
  parent-offspring links, recognition rules, records, and proof standards. It is
  the family proposed here.
- **What passes from one holder to another, and by what rule?** This is a
  question about transfer of traits, holdings, roles, or states. It is answered
  with rules of derivation, transmission processes, ordering rules, and
  instruments. It is proposed separately as
  [Inheritance, Transmission, Succession, and Bequest](../candidates/inheritance-transmission-succession-bequest.md).

The two are routinely stated together in ordinary language but do not share a
contract. A complete descent structure implies nothing about what passes along
it: many kinship systems recognize descent lines that carry no property and
transfer property along lines they do not recognize as descent. Conversely, a
complete transfer rule implies nothing about ancestry: corporate succession,
epidemiological transmission, and class inheritance in software have transfer
rules with no descent relation at all. Forcing one entry to answer both
questions would make every factor optional, which is the failure the entry
grammar exists to prevent.

**"Lineage" is ambiguous routing language, not a sense.** The word is used for
at least five distinct things: a line of descent among organisms or persons
(this family), a line of transfer of a holding or office (the transfer family),
a data-derivation chain treated as change evidence by
[History, Revision, Provenance, Lineage, and Change Evidence](../../../tables/evidence/change-lineage.md),
a taxonomic branch in phylogenetics, and a corporate or brand ancestry claim.
**No canonical sense currently owns bare `lineage`.** The change-lineage
evidence view uses lineage as a *concept* — a directed source-to-derived chain
recorded as evidence — under the identity, naming, classification, and
versioning headword whose canonical senses are `entity-identity` and `version`;
it is a view over that headword, not an owner of the word. Neither candidate in
this split admits `lineage` as a sense either. Where other candidate drafts
already use lineage or inheritance inside *factor* names, those uses are
reconciliation inputs to a later fixed-point pass rather than competing
ownership claims, and nothing here overrides them. The word is retained as a
search and routing term that must be disambiguated to a stated sense before use.

## Bounded thesis

Proceed only within ancestry structure and recognized relatedness: derivation
between individuals or populations, the recognition rules of a kinship system,
the recorded parent-offspring graph, and the evidenced reconstruction of it.
Trait heritability, property transfer, office succession, data lineage, and
taxonomic ranking remain outside this candidate.

The thesis is falsified if the existing identity, provenance, evidence, and
evolutionary owners can already state derivation between individuals,
socially recognized relatedness, pedigree completeness and ascertainment, and
genealogical proof standards without importing ancestry semantics.

## Proposed senses

| Sense | Governing question |
|---|---|
| `descent` | Which ancestor-to-descendant derivation is asserted between which individuals or populations, over how many generations, and on what evidence? |
| `kinship` | Which socially or culturally recognized relatedness category connects which persons, under which system's recognition rules? |
| `pedigree` | Which recorded individuals and parent-offspring links, under which nomenclature, completeness, and ascertainment rule, are asserted? |
| `genealogy` | Which reconstructed and sourced account of ancestry or descent for named individuals is asserted, under which proof standard and confidence? |

## Candidate contract

```text
descent-kinship-record-use
  := subject individuals or populations, identity rule, and decision use
   x population delimitation rule and authority where the subject is a population
   x external evidence supplier for population-level claims (phylogenetic,
     coalescent, admixture, or population-genetic inference), cited not owned
   x generation depth, direction, and time span
   x parent-offspring link evidence and link type (biological, legal, social)
   x descent rule applied (unilineal, bilateral, cognatic, or stated other)
   x recognition system, its authority, and its own terms
   x relatedness measure, definition, and basis (identity by descent or other)
   x record structure, nomenclature standard, and exchange format
   x completeness, ascertainment, and non-paternity or misattribution allowance
   x source citation, conflict resolution, and proof standard
   x confidence, disputed links, and unresolved branches
   x privacy, consent, and third-party exposure of relatives
   x prohibited inferences: trait, entitlement, race, and character claims
   x model, data, uncertainty, and scope limits
```

## Existing-owner audit

- [Inheritance, Transmission, Succession, and Bequest](../candidates/inheritance-transmission-succession-bequest.md)
  is the companion candidate produced by the split above. **Separation adopted
  here:** this family answers who comes from whom and who counts as related;
  that family answers what passes and by what rule. A descent claim here carries
  no entitlement, trait, or office consequence, and a transfer claim there
  carries no ancestry claim. Neither admits `lineage` as a sense.
- [History, Revision, Provenance, Lineage, and Change Evidence](../../../tables/evidence/change-lineage.md)
  is an evidence view under the identity, naming, classification, and versioning
  headword. It treats lineage as a *concept* — a directed source-to-derived
  chain for records and artifacts — recorded as change evidence for
  `entity-identity` and `version`; it does not hold `lineage` as a canonical
  sense. This candidate still must not reuse the bare word, and data-derivation
  questions route to that view.
- [Identity, Naming, Classification, and Versioning](../../../tables/entries/identity-naming-classification-versioning.md)
  owns `entity-identity` and `identifier`. Every person or organism in a
  pedigree needs an identity rule from that owner before a link is asserted.
- [Claim and Evidence](../../../tables/entries/claim-evidence.md)
  owns `claim`, `evidence-item`, `provenance`, `confidence`, and `limitation`.
  A genealogical proof standard is an instance of that grammar with a
  discipline-specific bar, not a new evidence semantics.
- [Contribution, Credit, Priority, and Legacy Evidence](../../../tables/evidence/contribution-credit-priority-legacy.md)
  owns legacy and reputation claims about named subjects; ancestry is not a
  contribution claim.
- [Adaptation, Fitness, Selection, and Exaptation](../candidates/adaptation-fitness-selection-exaptation.md)
  owns heritable variation and selective persistence. **Read-only reconciliation
  audit (that draft was not edited here):** it currently uses "lineage" inside
  the governing question for `adaptation` ("in which lineage"), inside its root
  factorization ("lineage, population, and focal trait or variant"), and in an
  inheritance-basis factor ("trait grain, homology, and inheritance basis"), and
  repeats those factor names in its dependency and procedure text. Those are
  factor names, not sense claims, so no collision exists today. They are
  nonetheless reconciliation inputs: **admission of this candidate is
  conditional on a later reconciliation pass** that either points those factors
  at `descent` here, at the transfer candidate, or at an explicitly scoped local
  meaning. No claim is made here about which resolution is correct, and no claim
  is made that the adaptation draft uses relatedness coefficients — it does not.
  The derivation relation itself belongs here.
- [Association, Causal Effect, Influence, Mechanism, Intervention, and Attribution](../../../tables/entries/causal-reasoning.md)
  owns causal machinery; shared ancestry is a source of confounding to be
  handled there, not a causal claim here.
- [Organization, Role, Authority, and Accountability](../../../tables/entries/organization-role-authority.md)
  owns positions and roles; family offices and titles route there and to the
  transfer candidate.
- [Privacy, Confidentiality, Secrecy, Anonymity, and Disclosure](../candidates/privacy-confidentiality-secrecy-anonymity-disclosure.md)
  owns disclosure and identifiability; genetic genealogy exposes non-consenting
  relatives and must satisfy that candidate's requirements.
- [Sampling, Estimation, and Generalization](../../../tables/entries/sampling-generalization.md)
  owns ascertainment and coverage; pedigree ascertainment bias is stated in its
  terms.

## Source matrix

| Source | Contribution | Boundary or challenge |
|---|---|---|
| [Wright, Coefficients of Inbreeding and Relationship](https://doi.org/10.1086/279872) | the founding quantitative relatedness coefficients | a path-counting model assuming a known pedigree |
| [Thompson, Identity by Descent](https://doi.org/10.1534/genetics.112.148825) | modern identity-by-descent as the basis of realized relatedness | realized sharing varies around pedigree expectation |
| [Hamilton, The Genetical Evolution of Social Behaviour I](https://doi.org/10.1016/0022-5193(64)90038-4) | relatedness as an explanatory quantity | an evolutionary use, not a definition of kinship |
| [Bennett et al., Standardized Human Pedigree Nomenclature](https://doi.org/10.1007/s10897-008-9169-9) | the clinical standard for drawing and recording pedigrees | a clinical convention; adoption is uneven |
| [PLINK .fam pedigree format](https://www.cog-genomics.org/plink/1.9/formats#fam) | a machine-checkable parent-offspring record structure | a tool format, deliberately minimal |
| [FamilySearch GEDCOM 7 specification](https://gedcom.io/specifications/FamilySearchGEDCOMv7.html) | the interchange standard for genealogical records | encodes assertions, not verified facts |
| [Board for Certification of Genealogists, Ethics and Standards](https://bcgcertification.org/ethics-standards/) | the Genealogical Proof Standard: exhaustive search, citation, conflict resolution, written conclusion | a professional standard, not a legal or scientific one |
| [Morgan, Systems of Consanguinity and Affinity of the Human Family](https://archive.org/details/systemsofconsang00morgrich) | the founding comparative survey of kinship terminologies | nineteenth-century evolutionary framing is discredited |
| [Sahlins, What Kinship Is—And Is Not](https://doi.org/10.7208/chicago/9780226925134.001.0001) | kinship as culturally constituted "mutuality of being" | one theoretical position among several |
| [Maddison, Gene Trees in Species Trees](https://doi.org/10.1093/sysbio/46.3.523) | a gene genealogy is not the organismal genealogy | a phylogenetic result; bounds descent inference |
| [de Queiroz and Gauthier, Phylogenetic Taxonomy](https://doi.org/10.1146/annurev.es.23.110192.002313) | descent-based definitions of taxonomic groups | taxonomy is excluded here; cited as a boundary |
| [Chang, Recent Common Ancestors of All Present-Day Individuals](https://doi.org/10.1239/aap/1029955256) | mathematical recency of common ancestry | an idealized random-mating model |
| [Rohde, Olson, and Chang, Modelling the Recent Common Ancestry of All Living Humans](https://doi.org/10.1038/nature02842) | pedigree collapse under realistic migration | simulation-based, sensitive to assumptions |
| [Erlich et al., Identity Inference of Genomic Data Using Long-Range Familial Searches](https://doi.org/10.1126/science.aau4832) | genetic genealogy identifies non-participating relatives | raises consent problems this family must flag |
| [Yudell et al., Taking Race Out of Human Genetics](https://doi.org/10.1126/science.aac4951) | ancestry is not race and does not license typological claims | a position paper, contested in detail |

## Counterevidence and limits

- Kinship categories are not readable off biology; recognized relatedness
  includes adoption, fosterage, affinity, milk kinship, and ritual kinship, and
  varies by system (Morgan; Sahlins).
- Recorded parent-offspring links are legal or social assertions as often as
  biological ones; misattributed parentage is a standing possibility in any
  pedigree (Bennett et al.).
- Pedigree-expected relatedness and realized genomic sharing differ; the
  coefficient is an expectation, not a measurement (Wright; Thompson).
- Gene genealogies disagree with organismal genealogies, so a single locus does
  not establish descent (Maddison).
- Pedigrees are ascertained through clinics, archives, and testing services, so
  completeness and coverage are never neutral.
- Common ancestry is far more recent than intuition suggests, so unqualified
  descent claims carry little information without specificity (Chang; Rohde et
  al.).
- Genealogical proof is a documented professional standard rather than a
  formal-verification result, and conclusions remain revisable (BCG).
- Genetic genealogy discloses information about relatives who never consented
  (Erlich et al.).
- Ancestry inference does not license racial, typological, or character claims
  (Yudell et al.).

## Admission gates

1. Establish identity rules for every individual before asserting a link.
2. State link type for every parent-offspring link: biological, legal, or
   social, with its evidence.
3. State the descent rule in use and the recognition system whose terms are
   being applied, together with that system's authority.
4. Record completeness, ascertainment, and misattributed-parentage allowance for
   any pedigree.
5. Record nomenclature or exchange standard for any pedigree record.
6. Report relatedness coefficients with their definition and basis, and mark
   expectation versus realized sharing.
7. Apply a named proof standard to any genealogy, with citations, conflict
   resolution, and a written confidence statement.
8. Keep disputed links and unresolved branches visible rather than pruning them.
9. Do not admit `lineage` as a sense here. No canonical sense owns the bare
   word; the change-lineage evidence view holds it as a concept under the
   identity and version headword, and other candidate drafts' factor names that
   use it are reconciliation inputs rather than owners. Disambiguate every use
   to `descent`, to the transfer candidate, or to that evidence view.
10. Route entitlement, office, and property consequences to
    [Inheritance, Transmission, Succession, and Bequest](../candidates/inheritance-transmission-succession-bequest.md);
    a descent claim never asserts them.
11. Record privacy, consent, and third-party exposure for genetic genealogy.
12. Prohibit trait, character, racial, and typological inferences from ancestry.
13. Population-level descent claims are in scope and must name the population
    delimitation rule, its authority, and its time span, exactly as individual
    claims name an identity rule. What is excluded is the inference machinery
    itself: phylogenetic reconstruction, coalescent and admixture inference, and
    population-genetic estimation are cited as **external evidence suppliers**
    whose outputs enter as evidence for a descent claim, never as senses of this
    family.
14. Exclude phylogenetic taxonomy, taxonomic ranking, and data provenance.

## Disposition

**PROCEED TO CANDIDATE ENTRY DRAFT; DO NOT ADMIT CANONICALLY.** The ancestry
half of the requested family is coherent, standards-backed, and unowned.
Admission requires a fixed-point role review confirming the split against the
transfer candidate, confirming that no canonical sense claims bare `lineage`,
confirming that the change-lineage evidence view keeps its concept unchanged,
and completing the reconciliation pass over other candidate drafts' lineage and
inheritance factor names.

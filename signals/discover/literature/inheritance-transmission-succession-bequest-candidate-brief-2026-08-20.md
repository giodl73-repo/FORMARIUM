---
topic: inheritance-transmission-succession-bequest-candidate
date: 2026-08-20
status: candidate admission brief
canonical_admission: false
---

# Inheritance, Transmission, Succession, and Bequest

## Decision question

Does Lexicon need an owner for what passes to a successor by a standing rule,
the process and channel through which something passes from one bearer to
another, the ordered replacement of an occupant in a position or holding, and
the instrument-directed transfer of a specific holding at death?

## Scope decision: the requested family is split

The requested family — lineage, kinship, descent, inheritance, succession — was
examined as one unit and rejected as one unit. It carries two incompatible
governing questions:

- **Who comes from whom, and who counts as related?** Answered with
  parent-offspring links, recognition rules, records, and proof standards. It is
  proposed separately as
  [Descent, Kinship, Pedigree, and Genealogy](../candidates/descent-kinship-pedigree-genealogy.md).
- **What passes from one holder to another, and by what rule?** Answered with
  rules of derivation, transmission processes, ordering rules, triggers, and
  instruments. It is the family proposed here.

The two questions do not share a contract. Ancestry structure is neither
necessary nor sufficient for transfer: intestacy statutes, corporate succession
plans, pathogen transmission, cultural learning, and class inheritance in
software all specify transfer with no ancestry claim, while recognized descent
lines frequently carry no transfer at all. Merging them would make every factor
in the contract optional.

**"Lineage" is ambiguous routing language, not a sense.** It is used for a line
of descent among persons or organisms, for a line of transfer of a holding or
office, for a data-derivation chain treated as change evidence by
[History, Revision, Provenance, Lineage, and Change Evidence](../../../tables/evidence/change-lineage.md),
for a taxonomic branch, and for corporate ancestry claims. **No canonical sense
currently owns bare `lineage`.** That change-lineage view holds lineage as a
*concept* under the identity, naming, classification, and versioning headword,
whose canonical senses are `entity-identity` and `version`; it is a view over
that headword rather than an owner of the word. Neither this candidate nor the
ancestry candidate admits `lineage` as a sense. Where other candidate drafts
already use lineage or inheritance inside *factor* names, those uses are
reconciliation inputs to a later fixed-point pass rather than competing
ownership claims. The word stays a search and routing term that must be
disambiguated before use.

## Bounded thesis

Proceed only within rule-governed passing: what passes, through what process, to
which successor, under which rule, trigger, and instrument, and with what
fidelity. Ancestry structure, information-channel coding, mechanical power
transmission, ecological succession, and jurisdiction-specific probate procedure
remain outside this candidate.

The thesis is falsified if the existing identity, access, governance,
organization, information, and state-transition owners can already state
rule-governed passing, transfer channels, ordered replacement, and testamentary
direction without importing transfer semantics.

## Proposed senses

| Sense | Governing question |
|---|---|
| `inheritance` | What passes from a predecessor holder to a successor by virtue of a standing rule rather than a negotiated exchange, under which regime? |
| `transmission` | Through which process, channel, and event does something pass from one bearer to another, at what rate and with what fidelity? |
| `succession` | Who or what next occupies a position, office, role, or holding, under which ordering rule and which trigger? |
| `bequest` | Which item of personal property does which testator direct to which beneficiary, under which valid testamentary instrument? |

## Candidate contract

```text
transfer-succession-use
  := regime declaration: genetic, cultural, epidemiological, legal, organizational, or computational
   x transferred object: trait, holding, right, obligation, state, or definition
   x predecessor holder, successor, and identity rules for both
   x standing rule, its authority, and its default versus elective status
   x trigger event, effective time, and vesting or effect conditions
   x process, channel, contact or contact-equivalent, and fidelity
   x rate, probability, and loss or mutation during passing
   x instrument, formalities, validity conditions, and revocation
   x property class of a testamentary gift: personal property (bequest) or real
     property (devise), with the instrument's own wording recorded
   x ordering rule, eligibility, disqualification, and contest path
   x liabilities, obligations, and encumbrances passing with the object
   x acceptance, disclaimer, and refusal options
   x evidence, record, and dispute resolution
   x population-level versus individual-level claim status
   x model, data, uncertainty, and scope limits
```

## Existing-owner audit

- [Descent, Kinship, Pedigree, and Genealogy](../candidates/descent-kinship-pedigree-genealogy.md)
  is the companion candidate produced by the split above. **Separation adopted
  here:** that family answers who comes from whom; this one answers what passes
  and by what rule. A transfer rule here may reference a descent relation as an
  input but asserts none, and a descent claim there asserts no entitlement.
- [Access, Permission, Authorization, and Entitlement](../../../tables/entries/access-permission-authorization-entitlement.md)
  owns `entitlement` and `permission`. What a successor is entitled to do stays
  there; how the entitlement passes stays here.
- [Organization, Role, Authority, and Accountability](../../../tables/entries/organization-role-authority.md)
  owns `position`, `organizational-role`, `authority`, and `delegation`. A
  `succession` names who next occupies a position defined there; delegation is
  not succession because the delegator retains the position.
- [Governance, Obligation, and Compliance](../../../tables/entries/governance-obligation-compliance.md)
  owns `obligation` and `compliance`; inherited obligations use that grammar.
- [Identity, Naming, Classification, and Versioning](../../../tables/entries/identity-naming-classification-versioning.md)
  owns `entity-identity` and `version`; predecessor and successor identity rules
  come from there.
- [State, Event, Transition, Process, and Lifecycle](../../../tables/entries/state-event-transition-process-lifecycle.md)
  owns `event` and `transition`; the trigger event of a succession is an
  instance.
- [Information, Data, Signal, and Noise](../../../tables/entries/information-data-signal-noise.md)
  owns `channel`, `encoding`, and `channel-capacity`. **Signal transmission
  stays there.** `transmission` here is the passing of a trait, holding, state,
  or practice from bearer to bearer, and must not absorb coding-theoretic
  channel semantics.
- [Work, Energy, and Power](../../../tables/entries/work-energy-power.md)
  owns mechanical energy transfer; power transmission is excluded.
- [Software Type, Value, and Function](../../../tables/entries/software-type-value-function.md)
  owns `type`; class inheritance is admitted here only as a declared regime of
  rule-governed passing of definitions, and subtype behavior obligations stay
  with the type owner.
- [Tipping Point, Critical Transition, Cascade, Contagion, and Spillover](../candidates/tipping-point-critical-transition-cascade-contagion-spillover.md)
  owns `contagion` as a population-level spread claim with an identification
  burden. **Separation adopted here:** `transmission` is the per-event passing
  process and its channel; `contagion` is the claim that such events explain the
  observed population pattern. A transmission mechanism does not establish
  contagion, and a contagion claim without a stated transmission process is
  incomplete. **Consumption direction, stated identically in both drafts:** this
  family defines the mechanism, channel, contact or contact-equivalent, rate,
  and fidelity of a single passing event, and the tipping family consumes them;
  the tipping family defines susceptibility, network topology, the propagation
  pattern, and the identification burden, and this family consumes them when a
  transmission claim is generalized to a population.
- [Adaptation, Fitness, Selection, and Exaptation](../candidates/adaptation-fitness-selection-exaptation.md)
  owns heritable variation and selection. Heritability as a population
  variance-partition statistic stays an evolutionary and statistical quantity;
  it is not the inheritance of a trait by an individual.
- [Ecosystem, Habitat, Ecological Niche, Food Web, and Ecological Interdependence](../candidates/ecosystem-habitat-niche-food-web-interdependence.md)
  covers ecological community change; its admission brief is
  [the ecology candidate brief](ecology-habitat-niche-food-web-candidate-brief-2026-08-20.md).
  **Ecological succession is excluded from this family**: it is directional
  community change over time, not the ordered replacement of an occupant under a
  rule. It is equally important not to overstate the other side: **that
  candidate does not own ecological succession as a sense either.** Succession
  appears there only as a `succession stage` *factor* of the ecological
  community and food-web senses. Ecological succession is therefore **factor and
  routing residue** — real vocabulary with no canonical sense owner at present —
  and this brief records it as such rather than assigning it a false owner. A
  reader routing the phrase is sent to that candidate's factor, not to
  `succession` here.
- [Cost, Price, Value, and Return](../../../tables/entries/cost-price-value-return.md)
  owns valuation; estate valuation and inheritance taxation route there.

## Source matrix

| Source | Contribution | Boundary or challenge |
|---|---|---|
| [Mendel, Experiments in Plant Hybridization (translation)](http://www.esp.org/foundations/genetics/classical/gm-65.pdf) | the founding rule-governed account of trait transmission | particulate rules do not cover complex traits |
| [MedlinePlus Genetics, Inheritance Patterns](https://medlineplus.gov/genetics/understanding/inheritance/inheritancepatterns/) | current operational vocabulary for modes of inheritance | consumer health reference, not a research standard |
| [Heard and Martienssen, Transgenerational Epigenetic Inheritance: Myths and Mechanisms](https://doi.org/10.1016/j.cell.2014.02.045) | disciplined limits on non-genetic inheritance claims | evidence base is stronger in plants than in mammals |
| [Cavalli-Sforza and Feldman, Cultural Transmission and Evolution](https://doi.org/10.1515/9780691209357) | vertical, horizontal, and oblique cultural transmission | a formal model set, not an ethnography |
| [Diekmann, Heesterbeek, and Metz, On the Definition and Computation of R0](https://doi.org/10.1007/BF00178324) | transmission rate formalized per model and population | R0 is not a pathogen constant |
| [WHO, How COVID-19 Is Transmitted](https://www.who.int/news-room/questions-and-answers/item/coronavirus-disease-covid-19-how-is-it-transmitted) | operational transmission-mode vocabulary | agency guidance, revised as evidence changes |
| [Uniform Law Commission, Uniform Probate Code](https://www.uniformlaws.org/acts/probate) | model statutory architecture for intestacy, wills, and administration | a model act; adoption and amendment vary by state |
| [Cornell LII, Intestate Succession](https://www.law.cornell.edu/wex/intestate_succession) | default succession where no valid instrument exists | US-centric summary |
| [Cornell LII, Bequest](https://www.law.cornell.edu/wex/bequest) | a bequest is a gift of personal property made through a will | a will may nonetheless call a real-property gift a bequest where intent is clear |
| [Cornell LII, Devise](https://www.law.cornell.edu/wex/devise) | a devise is a will-made gift of an interest in real property | US terminology; several jurisdictions have merged the two terms |
| [Regulation (EU) No 650/2012 on succession](https://eur-lex.europa.eu/eli/reg/2012/650/oj) | cross-border succession, applicable law, and the European Certificate of Succession | a conflict-of-laws instrument, not substantive succession law |
| [HCCH Convention on the Law Applicable to Succession to the Estates of Deceased Persons](https://www.hcch.net/en/instruments/conventions/full-text/?cid=62) | treaty-level choice-of-law rules for succession | limited ratification |
| [3 U.S.C. § 19, Presidential Succession](https://www.law.cornell.edu/uscode/text/3/19) | statutory ordering rule for an office | one office in one jurisdiction |
| [ISO 30414, Human Resource Management — Human Capital Reporting](https://www.iso.org/standard/69338.html) | succession planning as a reported organizational practice | a reporting guideline, not a governance rule |
| [Liskov and Wing, A Behavioral Notion of Subtyping](https://doi.org/10.1145/197320.197383) | substitutability obligations under type inheritance | a formal criterion, widely violated in practice |
| [Snyder, Encapsulation and Inheritance in Object-Oriented Programming Languages](https://doi.org/10.1145/960112.28702) | inheritance versus encapsulation tension | language-design analysis, not a universal rule |
| [Java Language Specification, Classes](https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html) | a precise definition of class inheritance and overriding | one language's rules |
| [Piketty, On the Long-Run Evolution of Inheritance](https://doi.org/10.1093/qje/qjr020) | inherited wealth as a measurable aggregate flow | one country, contested modeling assumptions |
| [Connell and Slatyer, Mechanisms of Succession in Natural Communities](https://doi.org/10.1086/283241) | ecological succession as directional community change | cited as an exclusion boundary, not as an owner |

## Counterevidence and limits

- "Inheritance" spans at least four regimes — genetic, legal, organizational,
  and computational — that share only the rule-governed-passing shape; the
  regime must be declared to avoid equivocation.
- Trait heritability is a population variance-partition statistic and does not
  describe what any individual inherits (Heard and Martienssen; evolutionary
  candidate).
- Transgenerational epigenetic inheritance claims are frequently overstated and
  require mechanism evidence (Heard and Martienssen).
- Transmission rates and reproduction numbers are model- and
  population-specific (Diekmann et al.).
- A transmission process does not establish population-level contagion; that
  claim carries its own identification burden in the dynamical candidate.
- Legal succession is default rule plus instrument: intestacy applies precisely
  where no valid instrument governs, and formality failures void bequests
  (Uniform Probate Code; Cornell LII).
- Cross-border succession makes applicable law itself a factor rather than a
  background assumption (Regulation (EU) 650/2012; HCCH).
- Inheritance transfers liabilities and encumbrances as well as assets, and
  beneficiaries may disclaim.
- Class inheritance is not automatically behavioral subtyping; substitutability
  is an obligation that inheritance alone does not discharge (Liskov and Wing;
  Snyder).
- `bequest` and `devise` are distinct in the source-faithful reading: a bequest
  is a gift of personal property made through a will and a devise is a will-made
  gift of an interest in real property, though a will may label a real-property
  gift a bequest where the intent is clear, and several jurisdictions have
  merged the terms (Cornell LII, Bequest; Cornell LII, Devise). The narrow
  reading is adopted here and the merged usage is recorded as a factor.
- Ecological succession is a different concept entirely and is excluded here;
  it is also not owned as a sense by the ecology candidate, where it appears
  only as a `succession stage` factor, so it remains unowned routing residue
  (Connell and Slatyer).

## Admission gates

1. Declare the regime — genetic, cultural, epidemiological, legal,
   organizational, or computational — before any claim in this family.
2. Name the transferred object, the predecessor holder, the successor, and the
   identity rules for both.
3. Name the standing rule, its authority, and whether it is a default or an
   elective arrangement.
4. Record the trigger event, effective time, and any vesting or effect
   conditions.
5. Record process, channel, contact or contact-equivalent, rate, and fidelity
   for any `transmission`, and mark loss or mutation during passing.
6. Keep `transmission` distinct from signal transmission and from mechanical
   power transmission; those route to their existing owners.
7. Keep `transmission` distinct from `contagion`, and observe the consumption
   direction: define the per-event mechanism, channel, contact, rate, and
   fidelity here, and consume susceptibility, topology, propagation pattern, and
   identification burden from the dynamical candidate when a population-pattern
   claim is made. Never restate the other side's factors as if owned.
8. Record the ordering rule, eligibility, disqualification, and contest path for
   any `succession`, and distinguish it from delegation, which retains the
   position.
9. Record the instrument, formalities, validity conditions, and revocation
   status for any `bequest`, and identify the governing law where transfer is
   cross-border.
10. Record the property class of any testamentary gift: `bequest` covers
    personal property and `devise` covers an interest in real property. Where an
    instrument or a jurisdiction merges the terms, record that merged usage as a
    factor rather than silently widening `bequest`.
11. Record liabilities, encumbrances, acceptance, and disclaimer options with
    any transferred holding.
12. Mark whether a claim is individual-level or population-level; never present
    heritability as individual inheritance.
13. Do not admit `lineage` as a sense. No canonical sense owns the bare word;
    the change-lineage evidence view holds it as a concept under the identity
    and version headword, and other candidate drafts' factor names that use it
    are reconciliation inputs rather than owners. Disambiguate every use to this
    family's transfer senses, to the ancestry candidate, or to that view.
14. Exclude ecological succession — routing it to the ecology candidate's
    `succession stage` factor and recording it as unowned residue — along with
    jurisdiction-specific probate procedure, estate valuation and taxation, and
    coding-theoretic channel semantics.

## Disposition

**PROCEED TO CANDIDATE ENTRY DRAFT; DO NOT ADMIT CANONICALLY.** The transfer
half of the requested family is coherent across regimes and has strong statutory
and scientific authority, but it is also the most equivocation-prone material in
the set. Admission requires a fixed-point role review confirming the regime
declaration gate, the split against the ancestry candidate, the
`transmission`/`contagion` boundary, and the exclusion of signal transmission and
ecological succession.

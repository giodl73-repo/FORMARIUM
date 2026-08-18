# Epistemic Standing, Inquiry, and Warrant

Status: candidate Evidence Table

Primary family: Evidence Table

Canonical headword: [Claim and Evidence](../entries/claim-evidence.md)

Canonical senses: `claim`, `evidence-item`, `confidence`, `provenance`,
`inference`, `limitation`, `observation`, `measurement`, `result`

This view adds no canonical sense. Claim and Evidence remains its sole owner.

## Governing question

What does a named subject or community take to be the case, through which
inquiry and claimed warrant, against which alternatives and defeaters, and
with what scope and standing to make or transmit that claim?

## Evidence row contract

| Field | Required record |
|---|---|
| Proposition | exact content, subject matter, scope, version, and language |
| Epistemic subject | claimant, witness, inquirer, community, or system; never inferred from citation alone |
| Attitude/status | asserted, believed, doubted, suspended, accepted-for-use, claimed-known, assumed, inferred, or unresolved under a declared vocabulary |
| Inquiry | exact question, uncertainty, or issue being addressed |
| Method/activity | observation, testimony, inference, demonstration, experiment, interpretation, deliberation, or another source-declared route |
| Grounds | evidence, reasons, experience, testimony, authority, or practice invoked |
| Warrant rule | why those grounds are claimed to support this proposition for this subject and scope |
| Alternatives/defeaters | counterevidence, rebutters, undercutters, rival interpretations, and live objections |
| Standing/authority | competence, role, experience, community position, or institutional remit relevant to the claim |
| Confidence/limitation | criteria, sensitivity, unresolved issues, and excluded claims |
| Provenance/review | source, language, activity, custodian, reviewer, date, correction, and supersession |

## Constraints

- This view records epistemic claims; it does not certify knowledge or truth.
- Asserted, believed, claimed-known, observed, and inferred are not maturity
  levels and are not automatically ordered.
- Institutional authority, expertise, lived experience, testimony, community
  standing, evidential support, and confidence remain separate.
- Disagreement is not averaged into confidence.
- A source's own method and warrant remain source-local; the row records them
  rather than translating them into one universal epistemology.
- Standing identifies a relevant basis for making or transmitting a claim; it
  does not establish that the claim or interpretation is correct.
- Model output can have system and producer provenance, but no human belief or
  community standing by default.

## Worked rows

Valid:

```text
proposition: submitted artifact V satisfies declared contract C
epistemic subject: reviewer R acting in the review role for C
attitude/status: accepted-for-review-disposition
inquiry: does V satisfy every clause of C?
method: clause checks plus source inspection
grounds: exact check results and cited records
warrant: checks cover every declared clause for V
defeaters: missing coverage; stale digest; rival contract interpretation
standing: assigned reviewer role for C, not universal expertise
limitation: bounded to C and V; no broader quality claim
```

Invalid:

```text
proposition: this is true
epistemic subject: omitted
status: known
grounds: many citations
warrant: omitted
defeaters: omitted
standing: inferred from publication
```

The invalid row has no subject, scope, warrant, or defeaters and mistakes
publication for standing.

## Reading views

| Profile | Default projection |
|---|---|
| Compact | proposition, subject, attitude/status, grounds, unresolved flag |
| Abbreviated | Compact plus inquiry, warrant, strongest defeater, scope, confidence |
| Book | Abbreviated plus method, standing, alternatives, limitations, one worked row |
| Full | source terms, language, all grounds/defeaters, provenance, review, and supersession |

No profile may hide contradicting evidence, unresolved standing, a material
defeater, or the boundary between a recorded knowledge claim and truth.

## Failure signs

- the epistemic subject is omitted;
- “known” is assigned from source prestige or confidence;
- evidence and warrant share one unexplained field;
- testimony is reduced to a citation;
- authority is inferred from institutional custody;
- defeaters and rival interpretations disappear;
- one community member is made representative by default.

## Cross-references

- [Meaning, Reference, Interpretation, and Use](../entries/meaning-reference-interpretation-use.md)
- [Observation-to-Inference Evidence Chain](observation-inference-chain.md)
- [Source, Performance, and Research Custody](source-performance-research-custody.md)
- [Decomposition Modes and Combination Contracts](../entries/decomposition-modes-combination-contracts.md)
- [Context](../roots/context.md)

## Sources and provenance

1. Edmund Gettier, “Is Justified True Belief Knowledge?” (1963).
2. C. A. J. Coady, *Testimony: A Philosophical Study* (1992).
3. Miranda Fricker, *Epistemic Injustice* (2007).
4. Matthias Steup and Ram Neta, “Epistemology,” *Stanford Encyclopedia of
   Philosophy*, revised 2024: https://plato.stanford.edu/entries/epistemology/
5. Cailin O'Connor, Sanford Goldberg, and Alvin Goldman, “Social
   Epistemology,” revised 2024:
   https://plato.stanford.edu/entries/epistemology-social/
6. Robert Koons, “Defeasible Reasoning,” revised 2025:
   https://plato.stanford.edu/entries/reasoning-defeasible/
7. Nick Leonard, “Epistemological Problems of Testimony” (2021):
   https://plato.stanford.edu/entries/testimony-episprob/
8. [GPC-09 admission literature review](../../signals/discover/literature/gpc-09-boundary-custody-admission-literature-2026-08-18.md)

The vocabulary is a candidate recording contract, not a universal ordering of
ways of knowing and not a truth service.

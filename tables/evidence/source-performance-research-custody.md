# Source, Performance, and Research Custody

Status: candidate Evidence Table

Primary family: Evidence Table

Canonical headword: [Claim and Evidence](../entries/claim-evidence.md)

Canonical senses: `evidence-item`, `provenance`, `limitation`, `observation`,
`inference`, `claim`

This view adds no canonical sense. Claim and Evidence remains its sole owner.

## Governing question

Who produced, performed, transmitted, collected, translated, archived, and
interpreted this record; who may share it; and who must receive, correct, or
validate it for the stated audience, purpose, place, time, and restrictions?

## Custody row contract

| Field | Required record |
|---|---|
| Subject/knowledge scope | exact public record, performance, testimony, research material, or intentionally absent content |
| People/community | self-identified people, community, organization, or source scope; no inferred representative status |
| Producer roles | speaker, author, performer, participant, recorder, researcher, translator, editor, and archive separately |
| Event/context | place, time, occasion, form or genre, audience, purpose, and relevant social or political setting |
| Authority to share | authority source, holder, material scope, audience, purpose, duration, revocation, and unresolved authority |
| Consent/participation | process, participants, represented parties, scope, revision, and withdrawal; not a Boolean |
| Translation/mediation | source language/form, target, direction, mediator, choices, alternatives, and loss |
| Archive/access | custodian, identifier, access condition, restriction, retention, return, and deletion obligations |
| Research accountability | entry and relationship, benefit, return, participant or community validation, dispute, and correction path |
| Institutional relation | concrete colonial, state, corporate, scholarly, archival, or other mechanism and authority conflict when relevant |
| Publication/use status | public, restricted, embargoed, summarized, non-redistributable, intentionally uncollected, or unknown |
| Review/supersession | qualified reviewer, date, correction, superseding record, and preserved prior disposition |

## Constraints

- Public availability is not authority to share, translate, train on, extract,
  republish, prescribe, or generalize.
- Citation, copyright, ownership, stewardship, consent, confidentiality,
  cultural authority, legal permission, and access remain distinct.
- One community member, archive, researcher, state, or published interpreter
  does not automatically represent a people or control every use.
- Oral and performed variation is not corruption of a canonical transcript.
- Restricted, ceremonial, land-sensitive, sacred, personal, sovereign, and
  intentionally absent content remains absent; it is not a backlog field.
- Return and collective validation add accountability; they do not establish
  truth or remove internal disagreement.
- This view does not express customary law, spirituality, sovereignty, or
  decolonization as Factorium guidance.

## Worked rows

Valid:

```text
scope: public transcript excerpt T; protected material intentionally absent
people/community: exact self-identified source scope
roles: speaker S; recorder R; translator M; archive A
event: named place, occasion, audience, and public purpose
authority: public excerpt only; no training or protected reuse grant
consent: recorded process, represented parties, revision/withdrawal path
translation: source-to-target direction, mediator, alternatives, and loss
archive: identifier, custodian, access and retention conditions
return/validation: correction returned; validation unresolved
```

Invalid:

```text
scope: cultural knowledge
producer: community
authority: yes, because available online
consent: yes
translation: English
restriction: none found
```

The invalid row invents collective representation, converts unknown
restriction into permission, models consent as a Boolean, and erases mediation.

## Reading views

| Profile | Default projection |
|---|---|
| Compact | subject scope, speaker/producer, authority-to-share status, restriction or unknown flag |
| Abbreviated | Compact plus event, audience/purpose, translation direction, archive, intentional absence |
| Book | Abbreviated plus separated roles, consent process, accountability, dispute, and one worked row |
| Full | every authority source, represented party, institutional relation, obligation, review, and supersession |

No profile may hide a restriction, unknown authority, intentional absence,
active dispute, translation loss, or revocation condition.

## Failure signs

- “available online” becomes “authorized”;
- producer, performer, recorder, translator, researcher, and archive collapse;
- community scope or representative status is inferred;
- consent is a timeless yes/no field;
- absence is treated as incomplete ingestion;
- a transcript replaces the performance event;
- return or validation is recorded as endorsement or truth.

## Cross-references

- [Meaning, Reference, Interpretation, and Use](../entries/meaning-reference-interpretation-use.md)
- [Epistemic Standing, Inquiry, and Warrant](epistemic-standing-inquiry-warrant.md)
- [Observation-to-Inference Evidence Chain](observation-inference-chain.md)
- [Organization, Role, Responsibility, Authority, and Accountability](../entries/organization-role-authority.md)
- [Access, Permission, Authorization, and Entitlement](../entries/access-permission-authorization-entitlement.md)
- [Context](../roots/context.md)

## Sources and provenance

1. Linda Tuhiwai Smith, *Decolonizing Methodologies* (1999; third edition
   2021).
2. United Nations General Assembly, *United Nations Declaration on the Rights
   of Indigenous Peoples* (2007):
   https://www.un.org/development/desa/indigenouspeoples/declaration-on-the-rights-of-indigenous-peoples.html
3. Mark D. Wilkinson et al., “The FAIR Guiding Principles” (2016):
   https://doi.org/10.1038/sdata.2016.18
4. Stephanie Russo Carroll et al., “The CARE Principles for Indigenous Data
   Governance” (2020): https://doi.org/10.5334/dsj-2020-043
5. AIATSIS, *Code of Ethics for Aboriginal and Torres Strait Islander
   Research* (2020/2022):
   https://aiatsis.gov.au/sites/default/files/2022-02/aiatsis-code-ethics-jan22.pdf
6. First Nations Information Governance Centre, “The First Nations Principles
   of OCAP®”: https://fnigc.ca/ocap-training/
7. Local Contexts, “Traditional Knowledge and Biocultural Labels”:
   https://localcontexts.org/labels/about-the-labels/
8. [GPC-09 admission literature review](../../signals/discover/literature/gpc-09-boundary-custody-admission-literature-2026-08-18.md)

These sources preserve distinct authority models and must not be combined into
one universal cultural-governance rule. Factorium organization remains
`candidate`.

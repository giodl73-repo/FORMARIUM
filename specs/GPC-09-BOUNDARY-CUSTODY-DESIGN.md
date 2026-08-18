# GPC-09 Boundary and Custody Design Specification

Status: candidate design; no canonical content admitted

## 1. Intent

Turn the smallest recurring gaps from the completed global philosophy
counter-sample into implementable Factorium designs without importing any
tradition-specific doctrine. The batch owns one semantic boundary candidate
and two evidence-view candidates. Source-local GPC records remain provenance
and test cases, never canonical definitions.

## 2. Evidence and decision boundary

The design consumes the frozen GPC-09 reconciliation at
`fixtures/philosophy/gpc-09-reconciliation.json`. It may use its recurrence,
conflict, loss, and custody records to test boundaries. It may not claim that
the portfolio represents philosophy, establishes consensus, transfers
community authority, or supplies reader evidence.

An item may be admitted later only after its own source review, fixed-point
role review, canonical-reference integration, and graph validation. This
specification itself changes no Table inventory.

## 3. Existing-owner audit

| Need | Nearest current owner | What it already owns | Boundary still missing | Decision |
|---|---|---|---|---|
| epistemic standing and warrant | `claim-evidence`; `decomposition-modes-combination-contracts` | exact claims, evidence implications, confidence, provenance; factor status such as observed/asserted/inferred | subject's attitude or standing toward a proposition, inquiry method, grounds, defeaters, authority and warrant scope | design an Evidence Table under `claim-evidence`; do not create a knowledge anchor |
| semantic meaning and interpretation | `information-data-signal-noise`; `model-representation-simulation`; `identity-naming-classification-versioning` | semantic-information route, representation contracts, labels/languages/audiences | what an expression means or refers to in a use context, how an interpreter selects a sense, and how disagreement or translation loss remains visible | design one candidate anchor |
| source/performance/research custody | `claim-evidence`; `organization-role-authority` | provenance, evidence identity, ownership/stewardship and organizational authority | speaker/performer, community, audience, occasion, authority to share, consent, archive, translation, return, collective validation and restriction | design an Evidence Table under `claim-evidence`; do not create a universal cultural-custody anchor |

The audit rejects a separate `knowledge`, `truth`, `culture`, `tradition`,
`consent`, or `community authority` anchor in this batch.

## 4. Design A — Meaning, Reference, Interpretation, and Use

### 4.1 Candidate identity

- Proposed path: `tables/entries/meaning-reference-interpretation-use.md`
- Proposed canonical ID: `meaning-reference-interpretation-use`
- Family: reference
- Maturity on first admission: candidate

### 4.2 Governing boundary

Meaning concerns what an expression, sign, representation, action, or work is
understood to convey in a context. Reference concerns what an expression is
used to pick out or range over. Interpretation is an accountable act or result
that selects, constructs, or argues for meaning under evidence and convention.
Use is an occurrence of an expression or practice by an actor for a purpose in
a setting. These roles interact but are not identical.

### 4.3 Candidate senses

| Sense ID | Governing question | Exclusion |
|---|---|---|
| `semantic-meaning` | What content is this expression, sign, act, or work understood to convey here? | not Shannon information, importance, truth, or intent alone |
| `reference` | What entity, class, event, property, relation, or possibility is the expression used to pick out or range over? | not identifier equality or successful existence by default |
| `interpretation-act` | Who applies which language, convention, method, evidence, and purpose to understand the subject? | not an unowned automatic decode |
| `interpretation-result` | Which meaning or reading was reached, with what scope, alternatives, loss, and confidence? | not the source itself or final truth |
| `use-context` | How is the expression or practice actually used by which participants for which purpose and audience? | not universal meaning from one occurrence |
| `ambiguity` | Which materially different admissible senses or references remain unresolved? | not generic uncertainty or missing data |
| `translation` | How is content projected between languages or symbol systems, in which direction and with which loss? | not exact equivalence from a shared gloss |

### 4.4 Root factors

```text
meaning-interpretation-use
  := expression, sign, act, work, or practice identity
   x source form, language, version, and medium
   x candidate sense and reference domain
   x speaker, author, performer, or producer position
   x interpreter and interpretive activity
   x use context, participants, purpose, and audience
   x linguistic, social, disciplinary, legal, or practice convention
   x co-text, situation, genre, and historical context
   x evidence, inference, assumptions, and defeaters
   x ambiguity, alternatives, disagreement, and unresolved cases
   x translation direction, mediator, equivalence kind, and loss
   x authority, restriction, provenance, review, and revision
```

### 4.5 Dependencies and invalid combinations

- Meaning depends on a selected subject, context, language/convention, and
  interpretive scope; these are not independent filters.
- Reference can fail, shift, remain plural, or be disputed without making an
  expression meaningless.
- Speaker intent, conventional meaning, reader interpretation, practical use,
  and legal interpretation may disagree.
- Repeated English glosses never create exact translation.
- Statistical similarity, co-occurrence, embedding proximity, or mutual
  information never establishes semantic equivalence.
- Authority to interpret or publish is not inferred from access.
- Ambiguity is retained until a declared question and context resolve it; the
  system may not silently choose the most common sense.

### 4.6 Decisive neighboring-sense contrasts

| Pair | Shared feature | Decisive distinction |
|---|---|---|
| semantic meaning vs. semantic information | both concern content in context | what an expression/sign/act is understood to convey vs. that meaningful content considered as communicated, received, or known for a task |
| meaning vs. reference | expressions participate in both | conveyed/interpreted content vs. what is picked out or ranged over |
| meaning vs. speaker intent | intent can influence interpretation | interpretable content under language/use/context vs. one producer's purpose or intended effect |
| interpretation vs. decoding | both transform a source into an understood result | evidence- and convention-governed selection of meaning vs. application of a representation mapping |
| interpretation vs. inference | interpretation can be a premise or conclusion | assigning/arguing for meaning vs. connecting premises to a conclusion under a rule/model |
| ambiguity vs. uncertainty | both retain alternatives | multiple admissible senses/references vs. incomplete confidence more generally |
| translation vs. exact mapping | both relate source and target | contextual linguistic/symbolic projection with mediation and loss vs. a declared structure-preserving correspondence |

### 4.7 Required cross-links

- `information-data-signal-noise`: representation, encoding, Shannon and
  channel boundaries;
- `model-representation-simulation`: subject/representation/interpretation
  separation;
- `identity-naming-classification-versioning`: names, identifiers, language,
  classification and version;
- `claim-evidence`: evidence and confidence for an interpretation;
- `context` and `relation`: local frame and typed correspondence;
- proposed custody view: authority and restriction on interpretation/use.

## 5. Design B — Epistemic Standing, Inquiry, and Warrant Evidence Table

### 5.1 Candidate identity

- Proposed path: `tables/evidence/epistemic-standing-inquiry-warrant.md`
- Owner: `claim-evidence`
- Uses existing canonical senses: `claim`, `evidence-item`, `confidence`,
  `provenance`, `inference`, and `limitation`
- Adds no canonical sense by itself

### 5.2 Governing question

What does a named subject or community take to be the case, through which
inquiry or warrant, against which alternatives and defeaters, and with what
scope and standing to make that claim?

### 5.3 Evidence-row contract

| Field | Requirement |
|---|---|
| Proposition | exact content, subject matter, scope, version and language |
| Epistemic subject | claimant, knower, witness, inquirer, community or system; never inferred from citation alone |
| Attitude/status | asserted, believed, doubted, suspended, accepted-for-use, known-claim, assumed, inferred or unresolved under a declared vocabulary |
| Inquiry question | exact uncertainty or issue the activity addresses |
| Method/activity | observation, testimony, inference, demonstration, experiment, interpretation, deliberation or another source-declared route |
| Grounds | evidence, reasons, experience, testimony, authority or practice invoked |
| Warrant rule | why the grounds are claimed to support this proposition for this subject and scope |
| Alternatives/defeaters | counterevidence, undercutters, rival interpretations and live objections |
| Standing/authority | competence, role, experience, community position or institutional authority relevant to making or transmitting the claim |
| Confidence and limitation | criteria, sensitivity, unresolved issues and excluded claims |
| Provenance/review | source, language, activity, custodian, reviewer, date and supersession |

### 5.4 Constraints

- The view records epistemic claims; it does not certify knowledge or truth.
- `asserted`, `believed`, `known`, `observed`, and `inferred` are not maturity
  levels and may not be ordered automatically.
- Institutional authority, expertise, lived experience, testimony, community
  standing, and evidential support remain separate factors.
- Disagreement is not averaged into confidence.
- A source tradition's pramāṇa, demonstration, testimony, valid cognition, or
  inquiry practice remains source-local; the row records its declared method
  and warrant rather than translating it into one universal epistemology.
- Automated model output has producer/system provenance but no human belief or
  community standing by default.

### 5.5 Projection rule

Book view leads with proposition, subject, attitude, grounds, defeaters, and
scope. Full view additionally exposes source terms, language, warrant rule,
authority, provenance and review. Compact views may omit detail but may not
hide unresolved status or contradicting evidence.

### 5.6 Canonical fixture sketches

Valid row:

```text
proposition: "the submitted artifact satisfies contract C"
epistemic subject: reviewer R in review role
attitude/status: accepted-for-review-disposition
inquiry: does artifact version V satisfy contract C?
method: declared contract checks plus source inspection
grounds: exact check results and cited source records
warrant: checks cover every declared clause under version V
defeaters: missing clause coverage; stale source digest; rival interpretation
standing: assigned reviewer role for C, not universal expertise
confidence/limitation: bounded to C and V; no broader quality claim
```

Invalid row:

```text
proposition: "this is true"
epistemic subject: omitted
attitude/status: known
grounds: many citations
warrant: omitted
defeaters: omitted
standing: inferred from publication
```

The invalid row fails because subject, scope, warrant and defeaters are absent
and publication is treated as standing.

## 6. Design C — Source, Performance, and Research Custody Evidence Table

### 6.1 Candidate identity

- Proposed path: `tables/evidence/source-performance-research-custody.md`
- Owner: `claim-evidence`
- Uses existing canonical senses: `evidence-item`, `provenance`, `limitation`,
  `observation`, `inference`, and `claim`
- Adds no canonical sense by itself

### 6.2 Governing question

Who produced, performed, transmitted, collected, translated, archived,
interpreted, may share, and must receive or validate this record, for which
audience, purpose, place, time, and restrictions?

### 6.3 Custody-row contract

| Field | Requirement |
|---|---|
| Subject/knowledge scope | exact public record, performance, testimony, research material or intentionally absent content |
| People/community | self-identified people, community, organization or other source scope; no inferred representative status |
| Producer roles | speaker, author, performer, participant, recorder, researcher, translator, editor and archive separately |
| Event/context | place, time, occasion, genre/performance, audience, purpose and relevant social/political setting |
| Authority to share | authority source, holder, material scope, audience, purpose, duration, revocation and unresolved authority |
| Consent/participation | process, participants, represented parties, scope, revision and withdrawal; not a one-time Boolean |
| Translation/mediation | source language/form, target, direction, mediator, choices, alternatives and loss |
| Archive/access | custodian, identifier, access condition, restriction, retention, return and deletion obligations |
| Research accountability | entry/relationship, benefit, return, community or participant validation, dispute and correction path |
| Colonial/state/institutional relation | concrete institution, mechanism, coercion, appropriation or authority conflict when applicable |
| Publication/use status | public, restricted, embargoed, summarized, non-redistributable, intentionally uncollected or unknown |
| Review/supersession | qualified reviewer, date, correction, superseding record and preserved prior disposition |

### 6.4 Constraints

- Public availability is not authority to share, translate, train on, extract,
  republish, prescribe, or generalize.
- Citation, copyright, ownership, stewardship, consent, confidentiality,
  cultural authority and legal permission are not interchangeable.
- One community member, archive, researcher, state, or published interpreter
  does not automatically represent a people or control all uses.
- Oral/performed variation is not corruption of a canonical transcript.
- Restricted, ceremonial, land-sensitive, sacred, personal, sovereign and
  intentionally absent content remains absent; it is not a backlog field.
- Return and collective validation append accountability; they do not make a
  claim true or remove internal disagreement.
- This view never expresses customary law, sovereignty, spirituality or
  decolonization as Factorium guidance.

### 6.5 Projection rule

Book view shows who speaks, the form/event, authority-to-share status,
audience/purpose, translation and restrictions before explanatory content.
Compact views may summarize custody status but must never hide a restriction,
unknown authority, intentional absence, or active dispute.

### 6.6 Canonical fixture sketches

Valid row:

```text
scope: public transcript excerpt T; ceremonial material intentionally absent
people/community: self-identified scope named by source
producer roles: speaker S; recorder R; translator T; archive A
event: named place, occasion, audience and public purpose
authority to share: public excerpt only; no training or ceremonial reuse grant
consent: recorded process, represented parties, revision/withdrawal path
translation: source-to-target direction, mediator, alternatives and loss
archive/access: identifier, custodian, access and retention conditions
return/validation: correction returned; validation status unresolved
```

Invalid row:

```text
scope: culture knowledge
producer: community
authority to share: yes (available online)
consent: yes
translation: English
restriction: none found
```

The invalid row fails because it invents collective representation, treats
access as authority, models consent as a Boolean, omits mediation and converts
unknown restriction into permission.

## 7. Book, search, and composition behavior

The canonical Tables should expose three ordinary-language routes:

| Reader wording | Route |
|---|---|
| “How do we know?” / “Who says?” / “What would defeat this?” | epistemic-standing view |
| “What does this mean here?” / “Does this refer to the same thing?” | meaning anchor |
| “Who may share or interpret this?” / “What is missing on purpose?” | custody view |

Search aliases are navigation only and cannot become senses. Composition may
use these records as evaluative or provenance requirements, but they create no
new semantic edge, automatic authority, truth verdict, or closure completion.

## 8. Compatibility and migration

If admitted later, the batch adds at most one entry and two views. It requires
a new canonical-reference revision because the entry/view inventory changes;
it must not mutate the frozen `factorium-reference-v0` bytes. Existing
`semantic-information`, `epistemic-status`, `provenance`, and
`ownership-stewardship` senses remain stable and gain explicit cross-links,
not silent semantic expansion.

No proof edition, profile, search index, Reader spine, or Composition fixture
may claim coverage until generated from the admitted revision and validated
against exact source paths.

## 9. Acceptance tests

1. Each proposed path has one owner and a declared stopping boundary.
2. Removing every philosopher, tradition, community and proper-name example
   leaves each governing structure intact.
3. Meaning is separated from data, encoding, statistical information, truth,
   importance and intent.
4. Epistemic attitude, evidence, warrant, authority and confidence remain
   independently representable.
5. Custody separates producer, performer, researcher, translator, archive,
   authority-to-share, consent, access, return and validation.
6. Same-gloss, public-access, citation-equals-permission,
   transcript-equals-performance and confidence-equals-truth fixtures fail.
7. Restricted or intentionally absent knowledge remains representable without
   content extraction.
8. Compact, Abbreviated, Book and Full projections preserve unresolved,
   restriction and translation-loss states.
9. No artifact claims reader evidence, community endorsement, global
   completeness or normative guidance.
10. Relevant roles close all P1/P2 findings before any content admission.

## 10. Explicit non-goals

- a universal theory of knowledge, truth, meaning, culture or personhood;
- a taxonomy of philosophical schools or cultural traditions;
- community-specific definitions detached from their owners;
- automatic semantic alignment, translation or authority inference;
- legal, research-ethics or cultural-protocol advice;
- UI implementation or external-reader validation;
- changing Factorium V0 or reopening the global comparison campaign.

## 11. Batch disposition

The designs are structurally ready for source and role review. No item is
admitted by this specification. The admission review may admit the one-anchor,
two-view batch together, narrow it, or reject it; it may not substitute a
larger content batch.

## 12. Product-owner record

| Field | Required statement |
|---|---|
| Reader | A reader comparing claims or meanings across sources, fields, languages, or traditions. |
| Job | Decide what is claimed to be known, what an expression means here, and who may share or interpret the supporting material. |
| Current friction | Existing Tables separate evidence, information, identity and authority but require the reader to reconstruct epistemic warrant, interpretation and knowledge custody across several owners. |
| Product change | At most one discoverable anchor plus two evidence views, all inside the Tables and cross-linked to existing owners. |
| Evidence now | The 100-record reconciliation establishes recurring structural friction and non-equivalence; this specification establishes implementability only. |
| Evidence later | Established-source review, canonical integration checks, qualified community/domain review where applicable, and external reader findability/comprehension. |
| Cost and displacement | One possible anchor and two views add navigation, review and migration cost; no other GPC group or philosophy content proceeds concurrently. |
| Continue/merge/stop | Continue to source/admission review; merge no source-local records; stop if the meaning anchor duplicates semantic-information or custody cannot remain non-prescriptive. |

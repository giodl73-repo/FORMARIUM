# Role and Ambiguity Fixtures V1

Status: normative

## Purpose

These generated fixtures instantiate
`specs/ROLE-ANALYSIS-SETS.md` with two materially different families:

- ordered repeated-role slots and shared fillers;
- one surface with multiple valid attachment analyses.

They test custody and recombination. They are not a semantic role labeling or
general ambiguity-resolution benchmark.

## Transfer family

Schema: `fixtures/schemas/transfer.factor`

Cartesian factors:

| Factor | Values |
|---|---:|
| giver | 4 entities |
| theme | 2 objects |
| recipient-primary | 4 entities |
| recipient-secondary | 4 entities |
| tense | 2 |
| polarity | 2 |

The exhaustive corpus has `512` meanings. Equal fillers across giver and
recipient slots are valid. Each meaning has two singleton-candidate surfaces:

1. giver-first: giver, theme, primary recipient, secondary recipient;
2. recipients-first: primary recipient, secondary recipient, theme, giver.

The complete analysis family contains both surfaces, producing `512` families
and `1024` surfaces.

Frame roles:

- `giver/sole -> giver`;
- `theme/sole -> theme`;
- `recipient/primary -> recipient-primary`;
- `recipient/secondary -> recipient-secondary`.

## Attachment family

Schema: `fixtures/schemas/attachment.factor`

Factors:

| Factor | Values |
|---|---:|
| observer | 4 entities |
| predicate | 2 |
| patient | 4 entities |
| instrument | none, camera, telescope |
| patient-associated-object | none, camera, telescope |

The role frame applies:

```text
exactly-one-non-none instrument patient-associated-object
```

The constrained corpus has `128` meanings. Every observer, predicate, patient,
and non-none object combination produces one analysis family with:

1. one ambiguous surface whose candidate set contains the instrument and
   patient-associated-object meanings;
2. one explicit instrument surface;
3. one explicit patient-associated-object surface.

There are `64` families and `192` surfaces.

## Split manifests

### Transfer IID

Semantic FNV-1a 64-bit ordinal hash modulo four; bucket zero is test.

### Transfer slot recombination

Test meanings have:

```text
recipient-primary=scientist
recipient-secondary=child
tense=past
```

All givers, themes, and polarities remain represented.

### Transfer shared filler

Test meanings have equal giver, primary recipient, and secondary recipient with
negated polarity.

### Attachment IID

The stable semantic hash uses the first candidate meaning as the family
representative. The whole family remains grouped.

### Attachment object recombination

Test families combine:

```text
predicate=photographs
object=telescope
observer=patient
```

Both attachment readings and all three surfaces remain grouped.

### Surface disambiguation

Every family trains on its two explicit reading surfaces and tests on the
ambiguous surface. Candidate meaning overlap is complete and explicit. This is
not unseen-meaning generalization.

## Invariants

For ordinary splits:

- analysis families are disjoint across train and test;
- candidate meanings are disjoint across train and test;
- every test factor/value atom appears in training;
- every test factor/value pair appears together in training;
- all surfaces and candidate sets remain intact.

For surface disambiguation:

- train and test contain exactly the same family and candidate meaning sets;
- training surfaces have one candidate;
- test surfaces have two candidates;
- overlap is declared in canonical custody.

## Frozen identities

| Artifact | SHA-256 |
|---|---|
| Transfer schema | `f0e423d5edd701cc53deb28b2018008763edfb95226d50a95dee09806d65f0c3` |
| Transfer frame | `84dc96f04871dc217b6e9b53d28e9339748939e19fdfb2b23f9cea620c12c34b` |
| Transfer corpus | `1f4b68f1f5328ea56a875aed9a8c0faf0f0d3c8f6b34346b6a935a0b26cb70ae` |
| Transfer analysis | `9de41c2eb6a2c245482444a53df9543dc2470e728af77a8ce90ebd5f26d8abc8` |
| Attachment schema | `2ff4b23625d4e7f93f4d4c34fcd16a7465d5145e03237791bb79b9dbb9a58cc9` |
| Attachment frame | `9f6c4d824e29ec6b4dd172cfdde19e6e6e3ceaf2c24c5324a0339fbc00a7d6a8` |
| Attachment corpus | `ab39a250c0b2ede1194366a8cb789cad3f9917914941b386fbf9e35284d18f91` |
| Attachment analysis | `6f0f57c9e4d2286fd84241197e3f0c8a9bb8525d57ea23d60be325cda053a7d5` |
| Transfer IID | `63d4da23539fc9d7c2b0371b276da1c1f55ca6c2d4ac66d32619471749eb32cc` |
| Transfer slot recombination | `f60b0dae9e8f0bfa05e58006f5d2b6895cd0a4a839898ea4a6e88161ca43ffab` |
| Transfer shared filler | `2a77a59824a6edf6acf11abfc6945221e554dd39c008788ee0a04186c6de1418` |
| Attachment IID | `fc9274921331a18b8c569f7051dc4dce98331ed38ce40e7503891368ab08cffb` |
| Attachment object recombination | `3f04cd73af3c8aa9bdde3ee1e3cf82b1852dcad1b351f860691517fde65ffea0` |
| Attachment surface disambiguation | `f8b89f28e60352d326c0dd54fd5cd712894fd1af3a290f10050369a4816c02cd` |

## Reproduction

```powershell
cargo run --quiet -- role-fixtures
cargo test --test role_fixtures
```

## Boundaries

- Generated surfaces are bounded printable ASCII.
- Candidate sets are complete and unranked.
- No external corpus payload is copied.
- No claim is made about discourse, scope, open vocabulary, neural parsing,
  runtime, or hardware.

# Compositional Split Fixtures v1

Status: **implemented**

## Purpose

Freeze deterministic corpus and split custody for the first FACTOR benchmark.
Membership is computed from semantic ordinals before surfaces are rendered.

These fixtures test bounded systematic recombination and template transfer.
They are not evidence about open-vocabulary language, ambiguity, discourse, or
general NLP quality.

## Generator

- implementation: `src/corpus.rs`;
- generator identity: `exhaustive-cartesian-v1`;
- random seed: none;
- schema parser: Semantic Factor Schema v1 Rust owner;
- corpus identity: SHA-256 over canonical `factor-corpus-v1` custody text;
- split identity: SHA-256 over canonical `factor-split-v1` manifest text;
- surface identity: SHA-256 over template identifier, LF, exact UTF-8 text,
  and final LF.

No SCAN, COGS, CFQ, or other third-party corpus payload is copied. Those works
remain methodological comparators.

## Corpus families

### Navigation

Schema: `fixtures/schemas/navigation.factor`

Factors:

- action: `walk`, `jump`, `push`, `pull`;
- direction: `left`, `right`;
- manner: `slowly`, `quickly`;
- count: `once`, `twice`;
- polarity: `affirmative`, `negated`.

The Cartesian product contains 64 meanings and one canonical surface per
meaning.

### Event

Schema: `fixtures/schemas/event.factor`

Factors:

- agent: four entity values;
- predicate: `sees`, `helps`, `follows`, `avoids`;
- patient: the same four entity values in a distinct role;
- tense: `present`, `past`;
- polarity: `affirmative`, `negated`.

The Cartesian product contains 256 meanings. Agent and patient may contain the
same entity, preserving repeated-participant/reflexive cases. Every meaning has
an active and passive surface, for 512 surfaces total.

The event family is materially different from navigation because it contains
two ordered semantic roles, repeated entities, tense realization, and
paraphrastic template transfer.

## Split rules

### IID

The semantic ordinal vector is hashed by frozen 64-bit FNV-1a using each
ordinal plus one. Bucket zero modulo four is test; the other buckets are train.

This produces an exact 75/25 split in both V1 corpora. The hash is computed
before rendering and is independent of meaning or surface identifiers.

The rejected initial rule `semantic_ordinal % 4 == 0` is retained as a design
lesson: declaration order correlated with the final binary factors and removed
one complete `count × polarity` pair from training.

### Navigation lexical recombination

Test when:

```text
action=jump
direction=right
manner ordinal = count ordinal
```

All other meanings train. `jump`, `right`, both manners, both counts, and every
test pair remain present in training under other combinations.

### Event lexical recombination

Test when:

```text
predicate=helps
agent=patient
tense=past
```

Both polarities remain in test. Every atom and test pair remains familiar in
training.

### Navigation cross-feature

Test the higher-order conjunction:

```text
manner=quickly
count=twice
polarity=negated
```

Actions and directions vary. Every atom and pair remains in training; only the
three-way conjunction is absent.

### Event cross-feature

Test:

```text
agent=patient
tense=past
polarity=negated
```

All predicates and entities vary. Every atom and pair remains in training.

### Event template transfer

All 256 meanings train under the active surface and test under the passive
surface. Meaning overlap is intentional and declared. Surface identifiers and
templates are disjoint.

This is the only V1 split allowed to place the same semantic meaning on both
sides. It measures surface transfer, not unseen meaning recombination.

## Validation

For every non-transfer split:

- train and test are nonempty;
- examples are unique;
- meaning identifiers are disjoint;
- every surface of one meaning remains on the same side;
- every test factor/value atom appears in training;
- every test pair of factor/value atoms appears together in training;
- every reference resolves to the declared corpus.

For template transfer:

- train and test contain the same complete meaning set;
- train contains only active surfaces;
- test contains only passive surfaces;
- examples and surface identifiers remain disjoint.

## Frozen identities

### Corpora

| Family | Meanings | Surfaces | Schema SHA-256 | Corpus SHA-256 |
|---|---:|---:|---|---|
| navigation | 64 | 64 | `232366d68e94058537406887b36a913240a1cd0be2d0e385b2ab0d3a0da242ad` | `696791b9f97813a2aaaa82f13110b2f1f84f112eeab0ad81459aef6c40ac434d` |
| event | 256 | 512 | `e08e855f6b1ed694fae03869b9c6677183d35af22b04952a797ba684b8190f67` | `265c89401a76905ff59f7f5992e68e1169ed2c84784d8baea45b3820a4ecfbec` |

### Splits

| Family | Kind | Train surfaces | Test surfaces | Meaning overlap | Split SHA-256 |
|---|---|---:|---:|---|---|
| navigation | IID | 48 | 16 | no | `71b44d2019b82f77537bcef382c6b9d98fb7a40db0825552b439ab772df57fa0` |
| navigation | lexical | 60 | 4 | no | `e7d797a7b0dc816dbb1de01b33b2842e06d4b986113d6ba4a7f1ccc0550f6e5e` |
| navigation | cross-feature | 56 | 8 | no | `a193436f03780d13a8c521277a952e4d484b097cfd9985b151180a8dffd871da` |
| event | IID | 384 | 128 | no | `d827912287c5b039f0f9bb69866f223562c0e1d0e7ab77751bcaa4608edadd7d` |
| event | lexical | 496 | 16 | no | `ce2e826f349a0b1634cf37cea760fcc5eedd6c6e559c488ee237d5d29596e109` |
| event | cross-feature | 480 | 32 | no | `4a7fdca8f28bb2eda8ae014aecd985a662a0a887a6672ad7b32fcf48a9133661` |
| event | template-transfer | 256 | 256 | intentional | `2cf485f1de1f9c1ebba040f72b821934e2e76bcdb7dc0404e7b72b967f94b5d7` |

## Boundaries

V1 does not establish:

- realistic lexical frequency or linguistic diversity;
- ambiguity, synonymy, pragmatics, discourse, or open vocabulary;
- natural-language understanding;
- model quality or sample efficiency;
- representation-specific advantage;
- compression, runtime, or hardware benefit.

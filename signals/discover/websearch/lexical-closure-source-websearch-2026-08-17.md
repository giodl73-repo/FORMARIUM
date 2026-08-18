---
skill: discover-websearch
topic: lexical-closure-source
date: 2026-08-17
claims_checked: 4
confirmed: 4
---

# Lexical Closure Source Web Evidence

## Claims and evidence

| # | Claim | Evidence | Verdict |
|---|---|---|---|
| 1 | WordNet supports a reproducible lexical-neighborhood audit. | Princeton documents synsets and explicit semantic pointers including hypernymy and meronymy; OEWN publishes the same kind of lexical network in machine-readable form. | CONFIRMED |
| 2 | OEWN 2025 common words is the right boundary for this campaign. | The release separates the common-word edition from Plus and Namenet proper-name expansions and provides a versioned JSON archive. | CONFIRMED |
| 3 | The data can be retained with attribution. | OEWN states CC BY 4.0 and identifies its Princeton WordNet derivation. | CONFIRMED |
| 4 | Lexical neighbors cannot be admitted automatically as Factorium concepts. | OEWN describes quality differences from Princeton and requires manual validation for generated contributions; this supports a human disposition boundary. | CONFIRMED |

## Query record

### Claim 1

- `site:wordnet.princeton.edu synsets semantic relations hypernym meronym`
  - https://wordnet.princeton.edu/documentation/wngloss7wn — “A synonym set; a set of words that are interchangeable in some context.”
  - https://wordnet.princeton.edu/front — describes synonymy, hypernymy, hyponymy, and meronymy.
- `site:github.com/globalwordnet/english-wordnet lexical network format relations`
  - https://github.com/globalwordnet/english-wordnet
  - https://github.com/globalwordnet/english-wordnet/blob/main/FORMAT.md

### Claim 2

- `site:github.com/globalwordnet/english-wordnet 2025 common words proper nouns`
  - https://github.com/globalwordnet/english-wordnet — distinguishes common words, Plus, and Namenet.
- `site:github.com/globalwordnet/english-wordnet/releases 2025 Edition JSON`
  - https://github.com/globalwordnet/english-wordnet/releases — publishes the 2025 release and JSON asset.

### Claim 3

- `site:github.com/globalwordnet/english-wordnet LICENSE CC BY 4.0`
  - https://github.com/globalwordnet/english-wordnet/blob/main/LICENSE.md — “licensed under Creative Commons Attribution 4.0 International.”
- `site:wordnet.princeton.edu license commercial use WordNet`
  - https://wordnet.princeton.edu/license-and-commercial-use

### Claim 4

- `site:github.com/globalwordnet/english-wordnet manual validation quality veracity`
  - https://github.com/globalwordnet/english-wordnet — notes variation in quality and manual validation of contributions.
- `site:github.com/globalwordnet/english-wordnet NEW_SYNSETS automatic generated results`
  - https://github.com/globalwordnet/english-wordnet/blob/main/NEW_SYNSETS.md — requires significance, distinction, definition, links, and manual validation.

## Findings table

| # | Finding | Source |
|---|---|---|
| 1 | WordNet groups words by contextual synonymy rather than spelling alone. | [Princeton glossary](https://wordnet.princeton.edu/documentation/wngloss7wn) |
| 2 | Broader/narrower and part/whole pointers are explicit. | [Princeton WordNet](https://wordnet.princeton.edu/front) |
| 3 | OEWN is distributed in a documented machine-readable format. | [OEWN format](https://github.com/globalwordnet/english-wordnet/blob/main/FORMAT.md) |
| 4 | The 2025 common-word release is distinct from proper-name expansions. | [OEWN README](https://github.com/globalwordnet/english-wordnet) |
| 5 | A versioned 2025 JSON archive is published. | [OEWN releases](https://github.com/globalwordnet/english-wordnet/releases) |
| 6 | OEWN 2025 reports 107,519 common-word synsets. | [OEWN README](https://github.com/globalwordnet/english-wordnet) |
| 7 | OEWN uses CC BY 4.0 with attribution. | [OEWN license](https://github.com/globalwordnet/english-wordnet/blob/main/LICENSE.md) |
| 8 | OEWN derives from Princeton WordNet. | [OEWN license](https://github.com/globalwordnet/english-wordnet/blob/main/LICENSE.md) |
| 9 | OEWN warns that lexical quality can vary. | [OEWN README](https://github.com/globalwordnet/english-wordnet) |
| 10 | Proposed synsets require a usable lexical definition and links. | [OEWN contribution guide](https://github.com/globalwordnet/english-wordnet/blob/main/NEW_SYNSETS.md) |
| 11 | Noun proposals require a hypernym. | [OEWN contribution guide](https://github.com/globalwordnet/english-wordnet/blob/main/NEW_SYNSETS.md) |
| 12 | Automatically generated candidates require manual validation. | [OEWN contribution guide](https://github.com/globalwordnet/english-wordnet/blob/main/NEW_SYNSETS.md) |

Summary: 4 of 4 claims confirmed; 12 grounded findings; none contradicted.

## Ungrounded and amendments

No source establishes that a WordNet synset is a Factorium concept, that an
exact lemma selects the intended sense, or that lexical closure equals
Factorium structural closure. The campaign therefore preserves every ambiguous
source sense, treats recurrence only as a review priority, and admits no Table,
sense, relation, alias, or claim automatically.


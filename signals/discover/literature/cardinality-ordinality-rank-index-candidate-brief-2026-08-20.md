---
canonical_admission: false
---

# Cardinality, Ordinality, Rank, Index, Relationship Cardinality, and Ordinal Scale Value — Candidate Brief

## Decision question

Should Lexicon admit six distinct count/order/position senses while preserving
mathematical, evaluation, and database boundaries?

## Bounded thesis

Yes, provisionally. Existing quantity and evaluation owners do not answer
whether a claim concerns set size, order type, relative rank, positional
address, relation multiplicity, or an ordinal category.

## Proposed senses

| Sense ID | Governing question |
| --- | --- |
| `set-cardinality` | What size does a set have under the stated equivalence criterion? |
| `order-ordinality` | What order type or position-in-order relation is asserted under the stated ordering? |
| `relational-rank` | What relative place does an item hold within the declared ordering? |
| `positional-index` | Which position-address maps to which member in a declared sequence or structure? |
| `relationship-cardinality` | What multiplicity constraint relates instances across the stated relation? |
| `ordinal-scale-value` | Which ordered category value is reported under a declared ordinal scale? |

## Candidate contract

Record domain, equivalence or ordering relation, tie rule, index convention,
relation ends, multiplicity, scale, coding, and permitted operations.

## Existing-owner audit

`comparative-quantity` owns comparative magnitudes;
`evaluation-measure-scale-criterion` owns evaluation scales and scores;
quantity/unit conversion owns measured quantities; information/data owners own
storage structures. This family preserves those boundaries.

## Source matrix

| Source | Contribution | Limitation |
| --- | --- | --- |
| [SEP, Set Theory](https://plato.stanford.edu/entries/set-theory/) | Supports cardinal and ordinal mathematical distinctions. | It does not define database cardinality or applied ranking policy. |
| [VIM 1.26](https://jcgm.bipm.org/vim/en/1.26.html) | Defines ordinal quantity as an ordered-category comparison. | It does not license treating ordinal values as equal intervals. |
| [Stevens 1946 DOI](https://doi.org/10.1126/science.103.2684.677) | Provides the classic measurement-scale contrast. | The framework is debated and not a database schema standard. |

## Admission gates

Require counterexamples crossing each boundary and tests showing category
coding, indexing, and ranking do not become interchangeable.

## Counterevidence and limits

Mathematical ordinal, rank in practice, and database cardinality vary by
discipline. This candidate provides no schema design or evaluation advice.

## Disposition

Keep as noncanonical six-sense candidate with explicit domain boundaries.


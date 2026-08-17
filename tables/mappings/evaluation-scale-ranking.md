# Evaluation Scale and Ranking Mapping

Status: candidate Mapping Table

Primary family: Mapping Table

Canonical headword: [Evaluation Measure, Scale, Criterion, and Score](../entries/evaluation-measure-scale-criterion.md)

Canonical senses: `evaluation-scale`, `score`, `evaluation-result`

## Governing question

What comparisons and transformations does an evaluation scale permit, and
what information is lost when values become ratings, ranks, grades, or classes?

## Result-form mapping

| Form | Must declare | Comparisons retained | Information commonly lost |
|---|---|---|---|
| measured or calculated value | property, unit/scale, method, uncertainty, direction | only those licensed by quantity/scale semantics | source procedure and support if detached |
| rating | rating object, categories/values, rater/rule, anchors, direction | local category/value interpretation | raw evidence, rater disagreement, distance |
| rank | item set, ordering rule, ties, incomparable cases, direction | relative order within the declared set | magnitude, absolute quality, out-of-set meaning |
| grade | criteria, boundaries, authority, version, review policy | category meaning under one scheme | distance from boundary and alternate criteria |
| classification | object, class set, rule/model, exclusivity, open/closed status | declared membership or assignment | confidence, overlap, novelty, source distinctions |

## Transformation contract

| Field | Required question |
|---|---|
| source and target | Which exact scales, value domains, populations, and versions are mapped? |
| direction | Does larger mean more, better, worse, more urgent, or merely later in an ordering? |
| rule | Is the mapping unit conversion, recoding, normalization, binning, ranking, grading, or classification? |
| admissible operations | Which equality, order, difference, ratio, or arithmetic statements remain meaningful? |
| ties and gaps | How are equal, missing, censored, novel, or incomparable cases represented? |
| uncertainty | How can error or ambiguity change a mapped category or order? |
| inverse and loss | Can source values be reconstructed, over what domain, and with which distinctions lost? |

## Constraints

- Numerals do not guarantee equal intervals or meaningful ratios.
- Rank is relative to a declared item set and does not preserve distance.
- Classification remains purpose- and authority-specific; open classes do not
  silently become exhaustive.
- Normalization records its fitted reference population and version.
- A monotone display transformation may preserve order while changing
  differences; a binning or rank mapping is generally not invertible.

## Sources and provenance

See the canonical entry and the existing Scale family. Named rating and grade
systems remain external authorities rather than canonical members.

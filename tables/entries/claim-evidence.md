# Claim and Evidence

Status: candidate anchor entry

## Orientation

A claim states what is asserted; evidence records observations, artifacts, or
arguments relevant to it; a result reports an evaluated outcome; a limitation
bounds interpretation; confidence summarizes support without replacing the
evidence. Provenance is mandatory metadata, while an Evidence Table is a
specialized view whose lookup task is comparing support and contradiction.

## Sense table

| Sense | Governing question | Role |
|---|---|---|
| `claim` | What exactly is asserted, for which subject and scope? | proposition |
| `evidence-item` | What observation, artifact, source, or argument bears on the claim? | support or contradiction |
| `result` | What outcome did a specified method produce? | evaluated observation |
| `limitation` | What interpretation is excluded or remains unresolved? | scope boundary |
| `confidence` | How strong is current support under declared criteria? | evidence summary |
| `provenance` | Where did the evidence come from and how can it be reproduced? | custody metadata |

## Root factorization

```text
claim-evidence-use
  := exact claim
   x subject, population, and scope
   x method and comparison
   x evidence artifact and identity
   x observation or result
   x supporting and contradicting implications
   x limitations and excluded claims
   x confidence criteria
   x provenance and reproduction
   x reviewer and revision
```

## Specialized view

The linked [Founding FACTOR Evidence](../evidence/founding-factor-evidence.md)
compares the narrow claims supported and excluded by the two accepted
synthetic bakeoffs.

## Reference Delta

| Reference form | Typical contribution | Factorium delta |
|---|---|---|
| Citation list | Identifies sources | Does not necessarily map sources to exact claims |
| Experiment report | Explains method and results | Owns detailed evidence and reproduction |
| Evidence matrix | Compares claims and support | Matches this specialized family |
| Reference Delta | Compares Factorium with neighboring reference forms | Is mandatory comparative metadata, not claim evidence |
| Factorium | Links compact claim-evidence views to full artifacts | Keeps support, contradiction, limitation, and maturity separate |

## Constraints and failure signs

- Claims are specific enough to be contradicted.
- Evidence identity and method are reproducible.
- Support and contradiction are both retained.
- Null and tied results are not omitted.
- Limitations state what the result does not establish.
- Confidence criteria are visible.
- Provenance does not automatically create an Evidence Table.
- Evidence does not automatically upgrade editorial maturity.

## Cross-references

- [Factorium Entry Publication](factorium-entry-publication.md)
- [Probability, Risk, and Uncertainty](probability-risk-uncertainty.md)
- [Information, Data, Signal, and Noise](information-data-signal-noise.md)
- [Context](../roots/context.md)
- [Relation](../roots/relation.md)

## Sources and provenance

1. `docs/STRONG-CONTROL-BAKEOFF-RESULT.md`
2. `docs/ROLE-AMBIGUITY-RESULT.md`
3. `specs/REFERENCE-DELTA.md`

Factorium evidence organization remains `candidate`.


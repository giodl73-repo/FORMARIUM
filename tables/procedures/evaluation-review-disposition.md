# Evaluation Review and Disposition Procedure

Status: candidate Procedure Table

Primary family: Procedure Table

Canonical headword: [Evaluation Measure, Scale, Criterion, and Score](../entries/evaluation-measure-scale-criterion.md)

Canonical senses: `evaluation-result`, `evaluation-frame`, `criterion`, `score`

## Governing question

How should an evaluation be reconstructed, reviewed, explained, and given a
bounded disposition without erasing evidence gaps or decision authority?

## Procedure table

| Step | Review question | Required output |
|---|---|---|
| 1. Identify | Which exact evaluation record, subject, rule, implementation, data, and versions are under review? | immutable identity bundle |
| 2. Reconstruct | Can the reported result be reproduced from retained sources, transformations, weights, thresholds, and missing-data rules? | trace or explicit reconstruction gap |
| 3. Interpret | Are measure, scale, direction, comparator, criteria, uncertainty, and support clear? | component explanation |
| 4. Challenge | Which alternate frames, assumptions, interactions, or boundary cases materially change the result? | sensitivity and counterexample record |
| 5. Bound claims | What does the result support, and which validity, causality, safety, quality, value, or outcome claims remain separate? | claim/limitation statement |
| 6. Disposition | Under which authority and rule is the record accepted, rejected, conditional, unresolved, superseded, or out of scope? | scoped disposition with rationale |
| 7. Act or refer | Does the disposition inform, recommend, gate, escalate, or authorize anything? | separate action/decision record and owner |
| 8. Revisit | Which source, rule, threshold, context, time, or evidence change invalidates or reopens it? | monitoring and review trigger |

## Minimal disposition vocabulary

| Disposition | Meaning in this procedure |
|---|---|
| accepted-under-rule | the declared rule passes for the exact subject and version |
| rejected-under-rule | the declared rule fails for the exact subject and version |
| conditional | result depends on stated conditions that remain active and monitored |
| unresolved | evidence, semantics, reconstruction, or authority is insufficient |
| superseded | a later reviewed record replaces this use while preserving history |
| out-of-scope | the rule does not apply to the declared subject or use |

Local workflows may use other labels; map them with authority, version, and
loss rather than treating this small vocabulary as universal.

## Constraints

- Evaluation record, review record, recommendation, decision, and action are
  separate artifacts.
- Review preserves prior values and reasons; it does not overwrite history.
- Acceptance is scoped to the rule and does not imply truth, safety, legality,
  effectiveness, quality, or reader value.
- An unresolved result remains visible and cannot be normalized away.
- Appeals, exceptions, overrides, and authorizations retain actor, authority,
  rationale, time, scope, and expiration.

## Sources and provenance

See the canonical entry, Claim/Evidence, Policy/Decision, Assurance, and W3C
PROV-O. This procedure provides a reconstructable record boundary, not a
universal approval workflow.

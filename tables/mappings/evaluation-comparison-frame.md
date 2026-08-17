# Evaluation Comparison Frame Mapping

Status: candidate Mapping Table

Primary family: Mapping Table

Canonical headword: [Evaluation Measure, Scale, Criterion, and Score](../entries/evaluation-measure-scale-criterion.md)

Canonical senses: `evaluation-frame`, `baseline`, `comparator`, `target`,
`tolerance`

## Governing question

Which comparison role does each reference play, and how can results be moved
between frames without silently changing the evaluated question?

## Mapping table

| Role | Required record | Valid use | Common frame error |
|---|---|---|---|
| baseline | subject state/distribution, boundary, time, method, version | change from a declared starting condition | current value silently replaces historical baseline |
| comparator | counterpart, matching rule, eligibility, concurrent conditions | contrast with an alternative, control, benchmark, or prior result | unlike populations or periods compared directly |
| reference | source, authority, uncertainty, validity, traceability | interpret a value or error relative to a known basis | reference called true, target, or acceptable by default |
| target | objective, owner, value/range/trajectory, horizon, revision authority | express desired performance | aspiration reported as observed or feasible |
| tolerance | reference, allowed deviation, unit/scale, boundary policy, failure consequence | judge acceptable departure for one use | engineering tolerance generalized into measurement uncertainty |

## Frame-change record

```text
comparison-frame-change
  := source frame and target frame
   x subject and population correspondence
   x time, context, method, unit, scale, and direction correspondence
   x adjustment, matching, normalization, or translation rule
   x retained distinctions, exclusions, uncertainty, and loss
   x valid domain, counterexample, inverse, and revision
```

## Constraints

- Baseline, comparator, reference, target, and tolerance remain independently
  named even when one value plays several roles.
- Comparison requires compatible subject, population, context, time, method,
  unit/scale, and direction or an explicit loss-aware mapping.
- A benchmark is not automatically typical, best, causal, fair, current, or
  authoritative.
- Target attainment does not prove the target was appropriate or the outcome
  was valuable.
- Tolerance is an intended-use rule, not an estimate of uncertainty.

## Sources and provenance

See the canonical entry and existing Measurement Quality and Control owners.
This mapping records comparison roles; it does not certify comparability.

# Alternative Selection Decision Table

Status: candidate Decision Table

Canonical headword:
[Choice, Alternative, Criterion, Preference, Recommendation, and Selection](../entries/choice-alternative-selection.md)

Primary family: Decision Table

Purpose: compare a bounded feasible alternative set under declared states,
evidence, criteria, preferences, constraints, and uncertainty while keeping
recommendation separate from final selection.

## Input contract

- exact choice question, scope, decision owner, affected parties, and horizon;
- candidate alternatives and generation boundary;
- current-practice or no-action alternative when genuinely available;
- authoritative constraints, versions, applicability, and exception status;
- material states or scenarios and their controllability status;
- observed, estimated, missing, contested, or non-applicable outcome cells;
- evidence, population, provenance, limitation, and uncertainty per outcome;
- criteria with operational definitions, measurement bases, directions, and
  missing-value behavior;
- attributed preferences, priorities, weights, and noncompensatory gates;
- disclosed evaluation rule and sensitivity changes.

## Stage 1 - Alternative status

| Alternative | Origin | Hard constraints checked | Status | Exclusion or unresolved rationale |
|---|---|---|---|---|
| current practice / no action | local baseline | exact applicable set | `candidate` / `feasible` / `excluded` / `unresolved` | required |
| bounded alternative | named source | exact applicable set | `candidate` / `feasible` / `excluded` / `unresolved` | required |

Only `feasible` alternatives proceed to comparison. `Excluded` and
`unresolved` alternatives remain visible. An enhancing criterion is not a hard
constraint, and an exception applies only through its own authority, scope,
controls, and expiry.

## Stage 2 - Alternative-state outcome map

| Alternative | State or scenario | Controllable? | Outcome or consequence | Cell status | Evidence and uncertainty |
|---|---|---:|---|---|---|
| exact alternative | exact condition | yes / no / partly | exact scoped result | `observed` / `estimated` / `missing` / `contested` / `not-applicable` | source, applicability, limitation, representation |

No Cartesian product is presumed meaningful. Each cell records whether the
alternative-state combination is valid and whether its outcome is observed,
estimated, missing, contested, or not applicable.

## Stage 3 - Criteria comparison

| Criterion | Definition and direction | Measurement basis | Alternative records | Preference or gate | Comparison disposition |
|---|---|---|---|---|---|
| exact criterion | operational definition; higher/lower/target/range | quantity, category, ordinal judgement, or explicit mapping | one record per feasible alternative | attributed priority, weight, or noncompensatory rule | retained comparison, not an automatic verdict |

Unlike values are not summed unless a declared mapping creates a common scale
and states its loss. A weight is not evidence, a criterion value is not a
preference, and a total score is not the final decision.

## Stage 4 - Sensitivity and recommendation

| Test | Declared change | Result | Disposition |
|---|---|---|---|
| evidence | applicability, estimate, or uncertainty changes | name affected outcome and comparison | stable / changed / tied / unresolved |
| criterion | definition, direction, or missing-value rule changes | name affected alternatives | stable / changed / tied / unresolved |
| preference | priority, weight, or noncompensatory gate changes | name affected ordering | stable / changed / tied / unresolved |
| constraint | authority, version, applicability, or exception changes | recompute alternative statuses first | stable / changed / unresolved |

`Robust` means only that the disposition remained stable under the declared
tests. If plausible uncertainty reduction could reverse an ordering, retain
the close alternatives or defer recommendation.

## Output contract

The Decision view produces:

- exact feasible, excluded, and unresolved alternative sets;
- retained alternative-state outcome map;
- criteria and preference comparison record;
- failed and unresolved join checks;
- sensitivity and tie record;
- zero, one, or several recommended alternatives with rationale and limits;
- separately recorded final selection, authority, rationale, implementation,
  and reconsideration trigger.

Recommendation disposition is one of `recommended`, `retained-option`,
`not-recommended`, or `unresolved`. Final selection is independently
`selected`, `deferred`, or `not-recorded`.

## Failure signs

- Current practice is omitted because the proposed change is already favored.
- Alternatives are generated after the preferred criterion or score is known.
- Missing outcome cells receive zero, average, or favorable values silently.
- Association is treated as an intervention effect.
- Evidence from another population is used without an applicability record.
- Expected loss is treated as the complete preference model.
- Price, cost, value, and utility are collapsed into one criterion.
- Soft criteria exclude alternatives while hard constraints are traded away.
- Normalization hides unlike measurement bases or reverses criterion direction.
- A close or uncertain ranking is reported as a unique winner.
- Recommendation is copied into the final-decision field without authority.

## Sources and provenance

1. NASA, “6.8 Decision Analysis”:
   https://www.nasa.gov/reference/6-8-decision-analysis/
2. NASA, *Systems Engineering Handbook*, Rev. 2, section 6.8:
   https://www.nasa.gov/wp-content/uploads/2018/09/nasa_systems_engineering_handbook_0.pdf
3. HM Treasury, *The Green Book 2026*:
   https://www.gov.uk/government/publications/the-green-book-appraisal-and-evaluation-in-central-government/the-green-book-2026

This table is a reusable Factorium decision record, not a universal algorithm,
score, optimization method, or authority substitute. Maturity remains
`candidate`.

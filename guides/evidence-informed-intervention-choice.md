# Evidence-Informed Intervention Choice

Guide ID: `evidence-informed-intervention-choice-v0`

Status: candidate internally reviewed synthetic Factor Guide; not operational
advice or reader evidence

## Local problem and decision

A bounded service team is considering whether to change its incident-
escalation practice after a shadow-mode automation produced mixed evidence.
The choice owner must retain current practice, run a limited monitored trial,
or adopt automated escalation broadly.

The local decision is whether any alternative should be recommended now. The
authorized final selection is deliberately not made in this guide.

Intended reader: a service or operations lead practicing a traceable,
non-sensitive alternative comparison.

Scope: one synthetic service team, its escalation process, a twelve-week
decision horizon, and the three authored alternatives below.

Non-goals: establish causal benefit, estimate population-wide performance,
approve deployment, optimize staffing, supply legal or safety guidance, or
represent a real organization.

## Canonical sources used

- `entry:choice-alternative-selection`
- `view:decision-alternative-selection`
- `entry:claim-evidence`
- `entry:causal-reasoning`
- `entry:probability-risk-uncertainty`
- `entry:cost-price-value-return`
- `entry:policy-rule-constraint-decision-exception`

The evidence-to-evaluation and constraint-to-feasibility type relations are
canonical under their separate admission contracts. Three F27 bridge
relations remain candidates. None of the five is available through the current
Composition Lab.

## Canonical evidence-to-evaluation reading route

Governing question: **Which evidence qualification must be reviewed before
using a claim to evaluate an alternative?**

This is one of two canonical structural paths used by the guide. It remains
incomplete because graph membership cannot decide whether the synthetic
evidence applies to a particular alternative, population, outcome, horizon,
provenance, or limitation.

| Stage | Exact route | Reader meaning |
|---|---|---|
| Add | `factor:claim-evidence/supporting-and-contradicting-implications` | Start from what the declared evidence would imply, including contradiction. |
| Multiply | `f27-evidence-qualifies-evaluation` -> `factor:choice-alternative-selection/evidence-quality-applicability-and-uncertainty` -> `view:decision-alternative-selection` | Bring the evidence-quality factor into the Decision scope without copying the evidence artifact or declaring it applicable. |
| Evaluate | `f27-check-evidence-applicability` = `unresolved` | Local claim, population, outcome, horizon, provenance, and limitations still require explicit review. |
| Stop | state = `incomplete`; no frontier or conflict | The exact structural route is present, but its required substantive check is unsettled. |
| Flatten | three loss-declared rows | Retain the selected source, unresolved evaluation target, and Decision scope while omitting the full evidence artifact, local alternative bindings, and full Decision Table. |

The guide sections below contain additional synthetic authored analysis,
including evaluations of three relation candidates. Those records are not
canonical query outcomes and do not change this route's unresolved check or
incomplete state. The route is intentionally read-only in this edition and is
not a Composition Lab control or starter.

Exact trace file: `fixtures/composition/decision-evidence.factorium-query`

| Identity | SHA-256 |
|---|---|
| Factorium Reference V0 | `5a482db494fb415e3ce0e57e2669c460924756cdbd8d03fe979367cf478b9e8e` |
| Relation sidecar V0 | `9324d99f09b89b6c36a41d690e325cec9c243eca879cf9698bcbc9ea7d4bbd60` |
| Composition Query trace | `f0f9a3a2d600eac0d33d90f5e769c1b043998348ecd338da028c1ebdc8e69e51` |

See the
[relation admission contract](../specs/EVIDENCE-EVALUATION-RELATION-ADMISSION.md)
and [reader-route contract](../specs/DECISION-EVIDENCE-READING-ROUTE.md) for
direction, loss, identity, and claim boundaries.

## Synthetic local evidence ledger

All records below are author-created fixtures. They are not observations of a
person, organization, deployed system, or external reader.

| Evidence ID | Synthetic local fact | Scope and limitation |
|---|---|---|
| `SYN-01` | Current practice uses manual escalation with human review. | authored baseline; no performance claim |
| `SYN-02` | Shadow-mode automation would have notified earlier in 18 of 30 historical cases and would have produced four additional escalations. | one service group; retrospective; no intervention occurred; concurrent process changes are unmeasured |
| `SYN-03` | Outcome follow-up is complete for 24 of the 30 cases. | missingness may be selective; no causal attribution |
| `SYN-04` | A limited trial can preserve human approval and immediate rollback. | authored mechanism assumption; implementation not verified |
| `SYN-05` | Broad adoption would cover service groups absent from `SYN-02`. | no transport evidence for those groups |
| `SYN-06` | Cost estimates are comparable ranges for current practice and a limited trial; broad-adoption integration cost is incomplete. | synthetic planning ranges; not price, utility, or realized cost |
| `SYN-07` | Policy `ESC-04`, version 3, effective for the guide horizon, requires human approval before any high-impact escalation. | synthetic governing constraint; no exception is recorded |

Explicit unknowns:

- whether earlier notification improves the intended service outcome;
- whether the four additional escalations are beneficial, burdensome, or
  harmful in the relevant cases;
- whether the shadow-mode pattern transports to other service groups;
- broad-adoption integration cost and operational side effects;
- the choice owner's final preference over burden, delay, reversibility, and
  coverage.

## Narrowing record

| Alternative or sense | Canonical source | Local evidence | Disposition | Rationale |
|---|---|---|---|---|
| Rule-derived policy decision | `sense:policy-rule-constraint-decision-exception/decision` | `SYN-07` | `not-applicable` as the choice owner | the policy supplies a constraint but does not compare alternatives |
| Choice among alternatives | `sense:choice-alternative-selection/choice` | `SYN-01` through `SYN-07` | `selected` | the local task compares selectable courses under evidence and constraint |
| Continue current practice | `sense:choice-alternative-selection/alternative` | `SYN-01`, `SYN-06`, `SYN-07` | `retained-option` | feasible baseline with known process and unresolved performance |
| Limited monitored trial | `sense:choice-alternative-selection/alternative` | `SYN-02`, `SYN-04`, `SYN-06`, `SYN-07` | `selected` for recommendation analysis | preserves approval and rollback while producing prospective evidence |
| Broad adoption | `sense:choice-alternative-selection/alternative` | `SYN-05`, `SYN-06`, `SYN-07` | `unresolved` | transport, cost, side effects, and approval controls are incomplete |
| Event probability | `sense:probability-risk-uncertainty/event-probability` | none | `not-applicable` | no probability model is supplied |
| Expected loss | `sense:probability-risk-uncertainty/expected-loss` | none | `not-applicable` | exhaustive outcomes, probabilities, and common loss basis are absent |
| Utility | `sense:cost-price-value-return/utility` | none | `unresolved` | the decision owner's preferences are not elicited as utility |
| Recommendation | `sense:choice-alternative-selection/recommendation` | retained evaluation below | `selected` | the guide may advise without making the final choice |
| Final selection | `sense:choice-alternative-selection/selection` | no authority decision | `unresolved` | the authorized owner has not selected an alternative |

## Alternative status

| Alternative | Hard constraint | Status | Rationale |
|---|---|---|---|
| Continue current practice | human approval retained | `feasible` | no known applicable exclusion |
| Limited monitored trial | human approval and rollback retained by `SYN-04` | `feasible` | compatible with `ESC-04` as authored |
| Broad adoption | approval behavior and exception status incomplete | `unresolved` | feasibility cannot default from the limited-trial assumption |

## Canonical constraint-to-feasibility reading route

Governing question: **Which governing constraints must be checked before
treating an alternative as feasible?**

This canonical structural path remains incomplete because the relation cannot
decide authority, version, effective period, applicability, hard/soft status,
exception status, or whether a particular alternative satisfies the
constraint. An applicable hard constraint is noncompensatory: preference or a
favorable score cannot erase it. A soft criterion cannot silently become an
exclusion.

| Stage | Exact route | Reader meaning |
|---|---|---|
| Add | `factor:policy-rule-constraint-decision-exception/constraints-and-invariants` | Start from the governing constraint while retaining Policy/Rule authority. |
| Multiply | `f27-constraint-filters-feasibility` -> `factor:choice-alternative-selection/feasibility-constraints-and-exclusion-rationale` -> `view:decision-alternative-selection` | Bring the constraint into feasibility review without declaring it applicable, satisfied, violated, or enforced. |
| Evaluate | `f27-check-constraint-applicability` = `unresolved` | Authority, version, period, applicability, hard/soft status, exception status, and alternative satisfaction still require local review. |
| Stop | state = `incomplete`; no frontier or conflict | The exact structural route is present, but no canonical option status or exclusion follows. |
| Flatten | three loss-declared rows | Retain the governing source, unresolved feasibility target, and Decision scope while omitting the full policy/rule/exception/enforcement artifact, local option status, exclusion decision, and full Decision Table. |

The local bridge evaluation below records `pass` only for the limited trial
under authored `SYN-04` and `SYN-07`. Broad adoption remains unresolved. That
local result does not alter this canonical query's unresolved check or prove
compliance, enforcement, benefit, ranking, or final selection.

Exact trace file: `fixtures/composition/constraint-feasibility.factorium-query`

| Identity | SHA-256 |
|---|---|
| Factorium Reference V0 | `5a482db494fb415e3ce0e57e2669c460924756cdbd8d03fe979367cf478b9e8e` |
| Relation sidecar V0 | `9324d99f09b89b6c36a41d690e325cec9c243eca879cf9698bcbc9ea7d4bbd60` |
| Composition Query trace | `2c32158a2a51ea5ccf0f5a51fbdfaed55ea0053552fcd79814f8c6bda5758de1` |

See the
[constraint-to-feasibility admission contract](../specs/CONSTRAINT-FEASIBILITY-RELATION-ADMISSION.md)
for its exact direction, qualifiers, loss, and claim boundary.

## Alternative-state outcome map

| Alternative | State or scenario | Outcome claim | Cell status | Evidence and uncertainty |
|---|---|---|---|---|
| Continue current practice | guide horizon resembles historical cases | existing manual process continues | `estimated` | `SYN-01`; outcome performance not measured |
| Continue current practice | case mix changes | response and burden unknown | `missing` | no transport or sensitivity evidence |
| Limited monitored trial | shadow pattern approximately recurs | earlier notifications and additional escalations are observed prospectively under human approval | `estimated` | `SYN-02`, `SYN-04`; recurrence and benefit unresolved |
| Limited monitored trial | shadow pattern does not recur | trial can be stopped and current practice restored | `estimated` | rollback is an authored assumption, not verified implementation |
| Broad adoption | other groups match the observed group | broader earlier notification may occur | `contested` | `SYN-05`; no transport evidence |
| Broad adoption | other groups differ materially | benefit, burden, and missed-case behavior unknown | `missing` | no applicable observations |

## Bridge join evaluation

The two admitted relation checks and all three candidate-relation checks record
one of `pass`, `fail`, or `unresolved`; none is omitted. The first and last
rows are canonical relation checks.

| Check | Outcome | Evidence | Rationale |
|---|---|---|---|
| `f27-check-evidence-applicability` | `unresolved` | `SYN-02`, `SYN-03`, `SYN-05` | the one-group retrospective fixture does not establish applicability to all alternatives or groups |
| `f27-check-causal-outcome-scope` | `fail` | `SYN-02` | shadow-mode association is not an intervention effect and concurrent changes are unmeasured |
| `f27-check-consequence-alignment` | `unresolved` | `SYN-02`, explicit unknowns | additional escalations lack a complete benefit, burden, and affected-party consequence basis |
| `f27-check-value-basis` | `unresolved` | `SYN-06` | cost ranges are incomplete and do not supply utility or a common preference scale |
| `f27-check-constraint-applicability` | `pass` | `SYN-04`, `SYN-07` | the limited trial preserves the exact effective human-approval constraint; broad adoption remains separately unresolved |

A passing constraint join does not validate the intervention, its evidence, or
the recommendation.

## Criteria comparison

| Criterion | Direction and basis | Current practice | Limited trial | Broad adoption | Boundary |
|---|---|---|---|---|---|
| Human approval | mandatory constraint | retained | retained by assumption | unresolved | noncompensatory |
| Reversibility | prefer easier recovery within horizon | existing baseline | immediate rollback assumed | incomplete | ordinal local judgement, not a measured quantity |
| Evidence gain | prefer prospective, applicable outcome evidence | little new evidence | prospective bounded evidence possible | rollout confounds learning with expansion | evidence usefulness, not outcome benefit |
| Earlier notification | direction unresolved until linked to outcome | current baseline | plausible from shadow record | transport unknown | association only |
| Additional escalation burden | prefer lower burden if outcome benefit is equal | current baseline | four shadow cases require study | unknown | consequence basis incomplete |
| Cost | prefer lower scoped cost if other criteria are equal | comparable range | comparable range | incomplete | synthetic range; no aggregation |

No total score is calculated. Preference is incomplete, several cells are
missing, and the causal join fails.

## Role and mechanism assignment

| Canonical factor | Guide role | Local mechanism or record | Condition | Validation evidence |
|---|---|---|---|---|
| `factor:choice-alternative-selection/candidate-alternatives-and-generation-boundary` | preserve the option set | three-row alternative register | no late option deletion | status table contains all three alternatives |
| `factor:choice-alternative-selection/feasibility-constraints-and-exclusion-rationale` | keep policy separate from preference | constraint/status record | exact policy version and applicability | `SYN-07`; constraint check passes only for the limited trial |
| `factor:choice-alternative-selection/alternative-state-outcomes-and-consequences` | expose missing and contested outcomes | outcome map | no favorable default for absent cells | six cells retain status and evidence |
| `factor:choice-alternative-selection/evidence-quality-applicability-and-uncertainty` | bind local evidence | synthetic evidence ledger and join checks | every claim names scope and limitation | all five join checks recorded |
| `factor:choice-alternative-selection/criteria-definitions-measurement-bases-and-directions` | prevent accidental aggregation | criteria table | unlike values remain separate | no total score or normalization |
| `factor:choice-alternative-selection/recommendation-rationale-limitations-and-review-state` | state bounded advice | result section | failed/unresolved checks remain adjacent | recommendation is conditional and non-final |
| `factor:choice-alternative-selection/final-selection-authority-implementation-and-reconsideration-trigger` | preserve authority | final-selection record | no selection without owner action | status remains `not-recorded` |

## Result

Recommended disposition: **retain current practice and the limited monitored
trial as live options; recommend the limited trial only as a reversible
evidence-producing next step, subject to the exact human-approval constraint.**

Broad adoption is not recommended from this fixture because its feasibility,
transport, cost, consequences, and control behavior remain unresolved. This is
not a claim that the limited trial is optimal or beneficial. Its analytical
advantage is narrower: under the authored assumptions, it can preserve the
hard constraint and generate prospective evidence without committing to broad
adoption.

Final selection: `not-recorded`. The authorized choice owner may select,
defer, request revised alternatives, or reject the recommendation and must
record a separate rationale.

Required controls:

- human approval for high-impact escalations;
- bounded service group and time horizon;
- explicit rollback condition;
- prospective outcome and burden measures with missingness retained;
- separate record of concurrent process changes;
- review before any scope expansion.

## Change tests

| Test | Changed evidence | Expected guide change |
|---|---|---|
| Prospective replication | a monitored trial shows applicable outcome improvement with bounded burden across relevant cases | causal/evidence checks may be re-reviewed; broad adoption may become a retained option, not automatic selection |
| Invalid constraint case | the limited trial cannot preserve required human approval | limited trial becomes `excluded`; current practice remains feasible |
| Alternative-correct case | trial setup cost becomes disproportionate while current practice meets the declared outcome | current practice can become the recommended alternative |
| Adverse outcome case | prospective trial evidence indicates earlier notifications increase harmful or unnecessary escalation | limited trial becomes `not-recommended` or is stopped |
| Preference change | authority treats any additional escalation burden as noncompensatory | limited trial may cease to be recommended even if notification is earlier |
| Policy change | an authorized, effective exception permits a different approval mechanism | feasibility is recomputed; the exception does not prove value or benefit |

## Validation and claim boundary

- All local facts are synthetic and explicitly identified.
- Every recommendation traces to canonical sources and visible F27 bridge
  relation statuses.
- Alternatives, states, outcomes, constraints, criteria, and authority remain
  separate.
- Every evaluated bridge join has an explicit outcome, including one failure
  and three unresolved records; only the admitted relation participates in the
  canonical closure trace.
- Missing information does not default to success.
- No formula, probability, utility, total score, causal effect, or final
  decision is invented.

The guide is internal authored evidence that the book contract can retain a
bounded cross-entry decision. It is not operational advice, source
verification, decision quality, comprehension, task success, external-reader
evidence, or `preview-01` evidence.

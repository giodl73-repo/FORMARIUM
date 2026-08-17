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

All five evidence-to-evaluation, causal-scope-to-outcome,
risk-to-consequence, value-to-criterion, and constraint-to-feasibility type
relations are canonical under their separate admission contracts. The bounded
F27 packet is fully admitted. None is available through the current
Composition Lab.

## Canonical five-bridge decision closure

Governing question: **Which evidence, causal, consequence, value, and
constraint concepts must remain joined and unresolved when evaluating this
intervention choice?**

This is the guide's combined structural closure over all five admitted F27
relations. Five explicit source factors join four deduplicated Choice targets
and one Decision scope. The causal-scope and risk-consequence edges share one
canonical alternative-outcome node; both edges remain explicit, so node
deduplication does not collapse their meanings.

| Stage | Exact route | Reader meaning |
|---|---|---|
| Add | five exact source factors from Claim/Evidence, Causal Reasoning, Probability/Risk/Uncertainty, Cost/Price/Value/Return, and Policy/Rule | Begin with every independently owned source concept; prose does not discover or omit one. |
| Multiply | all five F27 edges -> four deduplicated Choice targets -> `view:decision-alternative-selection` | Form one bounded working graph while retaining every direction and sharing canonical targets by identity. |
| Evaluate | five canonical checks = `unresolved` | Canonical structure imports none of the authored guide's local pass, fail, or unresolved declarations. |
| Stop | state = `incomplete`; no frontier or conflict | The graph is structurally present, but substantive applicability, causality, consequence, value, and constraint work remains. |
| Flatten | ten loss-declared rows | Retain five sources, four unresolved Choice targets, and one Decision scope without manufacturing local bindings, truth, comparability, ranking, or selection. |

Exact closure: five seeds, five edges, ten nodes, five unresolved checks, ten
projection rows, and 35 work records. Removing the shared alternative-outcome
node invalidates both the causal and risk traversals. The proof homepage and
read-only Explorer expose this exact combined trace as one Decision journey.
It remains unavailable through the Composition Lab or a Compose starter.

Exact trace file: `fixtures/composition/decision-bridge-closure.factorium-query`

| Identity | SHA-256 |
|---|---|
| Factorium Reference V0 | `ac1468a1731290ccba842a11e976f352287046abb93caf3e59d176e251bcc445` |
| Relation sidecar V0 | `df69b50054258c34a3289ce8cae66ea41d68efd5b8dcdd8e66128f2111f52634` |
| Composition Query trace | `bcdd6eae3f7f555102f9dd9d7cf902fb03a482655d48f24b92dd8df1ebca3991` |

See the
[combined-closure contract](../specs/DECISION-BRIDGE-COMBINED-CLOSURE.md) for
node-sharing, loss, evaluation, and publication boundaries. The five component
routes below remain authoritative explanations of each individual edge.

## Canonical evidence-to-evaluation reading route

Governing question: **Which evidence qualification must be reviewed before
using a claim to evaluate an alternative?**

This is one of five canonical structural paths used by the guide. It remains
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
including local evaluations of all five admitted relation checks. Those records are not
canonical query outcomes and do not change this route's unresolved check or
incomplete state. The route is intentionally read-only in this edition and is
not a Composition Lab control or starter.

Exact trace file: `fixtures/composition/decision-evidence.factorium-query`

| Identity | SHA-256 |
|---|---|
| Factorium Reference V0 | `ac1468a1731290ccba842a11e976f352287046abb93caf3e59d176e251bcc445` |
| Relation sidecar V0 | `df69b50054258c34a3289ce8cae66ea41d68efd5b8dcdd8e66128f2111f52634` |
| Composition Query trace | `3800879aed228b506a52a64b621f09f7abf820cb14b4eaf346a771372ad1aeb8` |

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
| Factorium Reference V0 | `ac1468a1731290ccba842a11e976f352287046abb93caf3e59d176e251bcc445` |
| Relation sidecar V0 | `df69b50054258c34a3289ce8cae66ea41d68efd5b8dcdd8e66128f2111f52634` |
| Composition Query trace | `1b796005247f69c228be29ae1e528d6c6ca206967fe9a799a1fa0c78994687a6` |

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

## Canonical causal-scope-to-outcome reading route

Governing question: **Which causal scope must be checked before treating an
observed outcome as an alternative consequence?**

This canonical structural path remains incomplete because graph membership
cannot decide the causal status, relevant contrast, population, outcome,
horizon, identification, transport, estimate, or uncertainty. Association,
temporal order, and shadow-mode observation do not establish an intervention
effect.

| Stage | Exact route | Reader meaning |
|---|---|---|
| Add | `factor:causal-reasoning/outcome-measure-and-time-horizon` | Start from the declared outcome scope while retaining Causal Reasoning authority. |
| Multiply | `f27-causal-scope-qualifies-outcome` -> `factor:choice-alternative-selection/alternative-state-outcomes-and-consequences` -> `view:decision-alternative-selection` | Bring causal scope into the alternative outcome description without identifying an effect or transporting an estimate. |
| Evaluate | `f27-check-causal-outcome-scope` = `unresolved` | Causal status, contrast, population, outcome, horizon, identification, and transport still require local review. |
| Stop | state = `incomplete`; no frontier or conflict | The structural route exists, but no intervention effect, benefit, harm, or ranking follows. |
| Flatten | three loss-declared rows | Retain the selected causal scope, unresolved alternative-state binding, and Decision scope while omitting the causal design, assumptions, estimate, uncertainty, local binding, and full Decision Table. |

The local bridge evaluation records `fail` for `SYN-02` because it is a
retrospective shadow-mode association and no intervention occurred. That local
failure does not alter the canonical query's unresolved check or incomplete
state.

Exact trace file: `fixtures/composition/causal-outcome-scope.factorium-query`

| Identity | SHA-256 |
|---|---|
| Factorium Reference V0 | `ac1468a1731290ccba842a11e976f352287046abb93caf3e59d176e251bcc445` |
| Relation sidecar V0 | `df69b50054258c34a3289ce8cae66ea41d68efd5b8dcdd8e66128f2111f52634` |
| Composition Query trace | `f38d945973c756dc35bdac84b4adc460b76156c52829e72f30e4b78dd2381ef9` |

See the
[causal-scope-to-outcome admission contract](../specs/CAUSAL-OUTCOME-RELATION-ADMISSION.md)
for its exact direction, qualifiers, loss, and claim boundary.

## Canonical risk-to-consequence reading route

Governing question: **Which consequence basis must be aligned before using a
risk consequence in an alternative outcome?**

This canonical structural path remains incomplete because graph membership
cannot decide the affected entity, scenario, horizon, control state,
consequence basis, completeness, probability, expected loss, risk attitude,
or decision weight. Consequence severity does not supply likelihood, and
expected loss is not the complete preference model.

| Stage | Exact route | Reader meaning |
|---|---|---|
| Add | `factor:probability-risk-uncertainty/consequence-set` | Start from the declared consequence characterization while retaining Probability/Risk/Uncertainty authority. |
| Multiply | `f27-risk-characterizes-consequence` -> `factor:choice-alternative-selection/alternative-state-outcomes-and-consequences` -> `view:decision-alternative-selection` | Bring the consequence basis into the alternative cell without supplying probability, expected loss, acceptability, or decision weight. |
| Evaluate | `f27-check-consequence-alignment` = `unresolved` | Affected entity, scenario, horizon, control state, consequence basis, and completeness still require local review. |
| Stop | state = `incomplete`; no frontier or conflict | The structural route exists, but no likelihood, risk acceptance, ranking, or recommendation follows. |
| Flatten | three loss-declared rows | Retain the unresolved alternative consequence, selected source characterization, and Decision scope while omitting probabilities, expected loss, controls, risk attitude, local binding, decision weight, and the full Decision Table. |

The local bridge evaluation also remains `unresolved`: the additional
escalations lack a complete benefit, burden, and affected-party consequence
basis. That local record does not alter the canonical query state.

Exact trace file: `fixtures/composition/risk-consequence.factorium-query`

| Identity | SHA-256 |
|---|---|
| Factorium Reference V0 | `ac1468a1731290ccba842a11e976f352287046abb93caf3e59d176e251bcc445` |
| Relation sidecar V0 | `df69b50054258c34a3289ce8cae66ea41d68efd5b8dcdd8e66128f2111f52634` |
| Composition Query trace | `1e96bb3c67cb062568338b1cd02221deaaf60d0ec44ea51d9952fed01e451700` |

See the
[risk-to-consequence admission contract](../specs/RISK-CONSEQUENCE-RELATION-ADMISSION.md)
for its exact direction, qualifiers, loss, and claim boundary.

## Canonical value-to-criterion reading route

Governing question: **Which exact value sense and basis must be declared before
using it as a decision criterion?**

This canonical structural path remains incomplete because graph membership
cannot decide the local value sense, owner, basis, horizon, unit or scale,
desired direction, comparability, preference, or weight. Cost, price, value,
utility, and return remain distinct; unlike values cannot be added without an
explicit reviewed mapping.

| Stage | Exact route | Reader meaning |
|---|---|---|
| Add | `factor:cost-price-value-return/requested-cost-price-value-utility-or-return-sense` | Start from the exact requested value sense while retaining Cost/Price/Value/Return authority. |
| Multiply | `f27-value-contributes-criterion` -> `factor:choice-alternative-selection/criteria-definitions-measurement-bases-and-directions` -> `view:decision-alternative-selection` | Bring the declared value basis into criterion definition without manufacturing comparability, preference, weight, aggregation, or a universal objective. |
| Evaluate | `f27-check-value-basis` = `unresolved` | Value sense, owner, basis, horizon, scale, direction, comparability, and preference still require local review. |
| Stop | state = `incomplete`; no frontier or conflict | The structural route exists, but no normalized score, ranking, or recommendation follows. |
| Flatten | three loss-declared rows | Retain the unresolved criterion, selected value source, and Decision scope while omitting the full value artifact, mappings, date, uncertainty, local binding, comparability, weight, and full Decision Table. |

The local bridge evaluation also remains `unresolved`: the synthetic cost
ranges are incomplete and supply neither utility nor a common preference
scale. That local record does not alter the canonical query state.

Exact trace file: `fixtures/composition/value-criterion.factorium-query`

| Identity | SHA-256 |
|---|---|
| Factorium Reference V0 | `ac1468a1731290ccba842a11e976f352287046abb93caf3e59d176e251bcc445` |
| Relation sidecar V0 | `df69b50054258c34a3289ce8cae66ea41d68efd5b8dcdd8e66128f2111f52634` |
| Composition Query trace | `27fe73bf07bb1719be7eaa49d27dc7527395d2c6b0ad063dab71f7a0d550c156` |

See the
[value-to-criterion admission contract](../specs/VALUE-CRITERION-RELATION-ADMISSION.md)
for its exact direction, qualifiers, loss, and claim boundary.

## Bridge join evaluation

All five admitted relation checks record one of `pass`, `fail`, or
`unresolved`; none is omitted. Every row is a canonical relation check.

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
  and three unresolved records; all five admitted relations participate
  in their separate canonical closure traces.
- Missing information does not default to success.
- No formula, probability, utility, total score, causal effect, or final
  decision is invented.

The guide is internal authored evidence that the book contract can retain a
bounded cross-entry decision. It is not operational advice, source
verification, decision quality, comprehension, task success, external-reader
evidence, or `preview-01` evidence.

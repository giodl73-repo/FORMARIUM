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

The five F27 bridge relations remain candidates under
`specs/DECISION-EVIDENCE-BRIDGE.md`; they are not canonical sidecar relations
or available Composition Lab edges.

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

## Alternative-state outcome map

| Alternative | State or scenario | Outcome claim | Cell status | Evidence and uncertainty |
|---|---|---|---|---|
| Continue current practice | guide horizon resembles historical cases | existing manual process continues | `estimated` | `SYN-01`; outcome performance not measured |
| Continue current practice | case mix changes | response and burden unknown | `missing` | no transport or sensitivity evidence |
| Limited monitored trial | shadow pattern approximately recurs | earlier notifications and additional escalations are observed prospectively under human approval | `estimated` | `SYN-02`, `SYN-04`; recurrence and benefit unresolved |
| Limited monitored trial | shadow pattern does not recur | trial can be stopped and current practice restored | `estimated` | rollback is an authored assumption, not verified implementation |
| Broad adoption | other groups match the observed group | broader earlier notification may occur | `contested` | `SYN-05`; no transport evidence |
| Broad adoption | other groups differ materially | benefit, burden, and missed-case behavior unknown | `missing` | no applicable observations |

## Candidate join evaluation

Every admitted join records one of `pass`, `fail`, or `unresolved`; none is
omitted.

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
- Every recommendation traces to canonical candidate sources and visible F27
  relation candidates.
- Alternatives, states, outcomes, constraints, criteria, and authority remain
  separate.
- Every admitted join has an explicit outcome, including one failure and three
  unresolved records.
- Missing information does not default to success.
- No formula, probability, utility, total score, causal effect, or final
  decision is invented.

The guide is internal authored evidence that the book contract can retain a
bounded cross-entry decision. It is not operational advice, source
verification, decision quality, comprehension, task success, external-reader
evidence, or `preview-01` evidence.

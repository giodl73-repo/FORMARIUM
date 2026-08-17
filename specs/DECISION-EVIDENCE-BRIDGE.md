# Decision and Evidence Bridge Contract

Status: F27 bridge packet; three relations admitted by F29/F31/F32 and two remain
candidate-only

## Purpose

Define the smallest reviewable cross-entry packet needed by one authored guide
without promoting editorial links into semantics or expanding the six-relation
Composition Lab allowlist.

## Common relation record

Every candidate record declares:

- stable candidate ID and verb;
- exact canonical source and target factors;
- direction and cardinality;
- source and target version basis;
- qualifications and exclusions;
- inverse behavior;
- declared loss;
- one owner view and source path;
- one independently fail-able join check.

The packet is directional. Reading a record backward does not assert its
inverse. A passing join check establishes only compatibility for the stated
guide scope, not truth of either endpoint or correctness of a recommendation.

Each table row is one canonical type-to-type candidate. During authored guide
use, zero or more local source records may bind to zero or more local target
records only when each binding names the exact candidate ID and passes or
retains its own check. `Many-to-many` therefore permits reviewed local
instances; it does not permit endpoint discovery, transitive expansion, or an
unbounded Cartesian product.

## Bridge relations

`f27-evidence-qualifies-evaluation`,
`f27-causal-scope-qualifies-outcome`, and
`f27-constraint-filters-feasibility` are admitted to the canonical relation
sidecar under their separate admission contracts. The remaining two rows are
candidate-only.

| ID | Verb | Source -> target | Cardinality | Qualifications | Inverse | Declared loss | Join check |
|---|---|---|---|---|---|---|---|
| `f27-evidence-qualifies-evaluation` | `qualifies-evaluation-of` | `factor:claim-evidence/supporting-and-contradicting-implications` -> `factor:choice-alternative-selection/evidence-quality-applicability-and-uncertainty` | many-to-many, guide-scoped | exact claim, subject/population, outcome, horizon, provenance, limitation | none implied | does not carry full evidence artifacts or make support direction universal | `f27-check-evidence-applicability` |
| `f27-causal-scope-qualifies-outcome` | `qualifies-outcome-scope-of` | `factor:causal-reasoning/outcome-measure-and-time-horizon` -> `factor:choice-alternative-selection/alternative-state-outcomes-and-consequences` | many-to-many, guide-scoped | intervention/contrast, population, outcome measure, horizon, identification status | none implied | does not promote association to effect or transport an estimate | `f27-check-causal-outcome-scope` |
| `f27-risk-characterizes-consequence` | `characterizes-consequence-for` | `factor:probability-risk-uncertainty/consequence-set` -> `factor:choice-alternative-selection/alternative-state-outcomes-and-consequences` | many-to-many, guide-scoped | affected entity, scenario, horizon, control state, consequence basis | none implied | does not carry probability, expected loss, or risk appetite automatically | `f27-check-consequence-alignment` |
| `f27-value-contributes-criterion` | `contributes-criterion-to` | `factor:cost-price-value-return/requested-cost-price-value-utility-or-return-sense` -> `factor:choice-alternative-selection/criteria-definitions-measurement-bases-and-directions` | many-to-many, guide-scoped | exact value sense, owner, basis, date/horizon, unit or scale, desired direction | none implied | does not turn cost, price, value, utility, or return into one another or into a universal objective | `f27-check-value-basis` |
| `f27-constraint-filters-feasibility` | `constrains-feasibility-of` | `factor:policy-rule-constraint-decision-exception/constraints-and-invariants` -> `factor:choice-alternative-selection/feasibility-constraints-and-exclusion-rationale` | many-to-many, guide-scoped | authority, version, effective period, applicability, hard/soft status | none implied | does not carry policy intent, rule output, exception, or enforcement success | `f27-check-constraint-applicability` |

The reviewed endpoint basis is exact:

| Source | SHA-256 |
|---|---|
| `reference/factorium-reference-v0.factorium` | `5a482db494fb415e3ce0e57e2669c460924756cdbd8d03fe979367cf478b9e8e` |
| `reference/factorium-relations-v0.factorium` | `76ff0bb2215449b2b751a4052551bd1134a0e358e60f0af1c12ffb1ee9f8fbbb` |
| `tables/entries/choice-alternative-selection.md` | `16cbb3e9e022fd2eb70091409792b6c783c55422672211e0099d6f8727d631d1` |
| `tables/entries/claim-evidence.md` | `17875b0730df45b563261a670149d4c8312ecf6487f672028b96672fd19b39e5` |
| `tables/entries/causal-reasoning.md` | `665a33d595e85644f1c4df9b7968617cf26a15fa41c46b448e38cb84540f0383` |
| `tables/entries/probability-risk-uncertainty.md` | `7702916b84e7d33acb06a4ec0bf020ef9d97c958839abb34db9b4198b97b336f` |
| `tables/entries/cost-price-value-return.md` | `c7d2c4bb13e2c8e45e406aec5ef55e4e886949eaba124874f4aeb23b18c668dd` |
| `tables/entries/policy-rule-constraint-decision-exception.md` | `d0af3d9f10c13cfa1c78cf9a35270141d11d996b4b818bde8ba099eaf1681388` |

Any endpoint or relation-sidecar edit makes the candidate packet stale until
the exact basis is updated and re-reviewed.

## Join checks

| Check | Pass condition | Fail examples | Unresolved examples |
|---|---|---|---|
| `f27-check-evidence-applicability` | claim, population, outcome, horizon, provenance, and limitation match the local alternative evaluation | evidence concerns another population or another outcome | applicability or provenance is missing |
| `f27-check-causal-outcome-scope` | the local intervention/contrast, population, outcome, horizon, and causal status match | association or temporal order is used as intervention effect | transport or identification remains unreviewed |
| `f27-check-consequence-alignment` | affected entity, scenario, horizon, control state, and consequence basis align | expected loss is treated as the whole preference model | consequence basis or risk attitude remains undecided |
| `f27-check-value-basis` | exact value sense, basis, unit/scale, date, horizon, and desired direction are declared | price is treated as utility or unlike values are added without a mapping | a criterion is relevant but its scale is not comparable |
| `f27-check-constraint-applicability` | authoritative, effective, applicable hard constraints are separated from soft criteria | an expired policy or enhancing criterion excludes an option | authority, version, or exception status is unknown |

Every admitted relation requires exactly one matching check record. Outcome is
the closed enum `pass`, `fail`, or `unresolved`; missing, duplicate, unknown,
or differently spelled outcomes are invalid. `Pass` does not validate either
endpoint or any downstream recommendation.

## Closure policy

The authored guide may use only these five bridge relations and only in their stated
direction. It starts from explicitly selected entry factors, uses no inferred
edge, and retains every failed or unresolved join. Maximums are seven entries,
five bridge relations, fourteen admitted factor endpoints, depth two, and
forty work records. Reaching a bound returns `truncated`; it never widens the
allowlist.

## Negative fixtures

The F27 guide and checks must retain at least these cases:

1. evidence from a different population;
2. association presented as intervention effect;
3. expected loss presented as the complete preference model;
4. price or cost presented as utility without a value mapping;
5. an expired constraint or a soft criterion used as a hard exclusion;
6. uncertainty large enough to retain more than one alternative;
7. a recommendation that differs from the authority's final selection.

## Admission boundary

This packet can inform authored guide review. Each record requires independent
relation-kind grammar, parser fixtures, endpoint assurance, negative closure
behavior, identity, and fixed-point `.roles` review before canonical
admission. Canonical admission does not itself expose a record through the
interactive Composition Lab. The packet supplies no source verification,
decision recommendation, domain authority, or reader evidence.

## F28 grammar status

`specs/DECISION-EVIDENCE-RELATION-KINDS.md` now defines parser-visible kinds
and exact qualifier keys for all five kinds, with positive and
adversarial external fixtures. This completes relation-kind grammar and
endpoint-resolution preparation. F29 subsequently admits the
evidence-to-evaluation record and F31 admits the constraint-to-feasibility
record. F32 admits the causal-scope-to-outcome record. Two remain absent. The
Composition Lab remains limited to its
separate six-ID F1-F6 allowlist. The remaining admission conditions apply
independently to each future record.

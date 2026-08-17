# Latency Claim Evidence Composition Worksheet

Guide ID: `latency-evidence-composition-worksheet`

Status: candidate simulation Factor Guide

Trace ID: `latency-observation-inference`

Review: fixed point; see
[`cross-domain-composition-design-2026-08-16.md`](../context/waves/2026-08-13-factorium-vision/cross-domain-composition-design-2026-08-16.md)
and
[`cross-domain-composition-roles-check-2026-08-16.md`](../context/waves/2026-08-13-factorium-vision/cross-domain-composition-roles-check-2026-08-16.md)

## Local problem and decision

A software team sees dashboard median request latency change from `240 ms`
before a release to `180 ms` after it. The proposed claim is: “the release
reduced typical request latency.”

Decision: which records may be reported as observations or results, which
additional premises and assumptions are required for an inference, and whether
the supplied facts support the proposed release-effect claim.

Intended reader: an engineering, product, or analytical practitioner reviewing
an evidence statement before it enters a release report.

## Scope and non-goals

This synthetic worksheet rehearses the F3 `derived-from` relation between an
inference-rule factor and an observation-or-result factor. It does not analyze
real telemetry, estimate a causal effect, validate a monitoring system, or
recommend a statistical method.

The trace may be structurally `complete` while the proposed claim remains
`unresolved`. Graph state and claim disposition are deliberately different
outputs.

## Local evidence

Supplied synthetic facts:

- dashboard result before release: median request latency `240 ms`;
- dashboard result after release: median request latency `180 ms`;
- displayed unit: milliseconds;
- the dashboard labels both panels with the same metric name;
- the release occurred between the displayed windows.

Missing or unknown:

- exact request populations, routes, clients, regions, and exclusion rules;
- observation-window length and traffic volume;
- raw event or trace identities;
- aggregation implementation and monitoring configuration versions;
- uncertainty, distribution shape, and sensitivity to outliers;
- concurrent traffic, infrastructure, cache, dependency, or policy changes;
- comparison design capable of isolating a release effect.

The two dashboard values are inputs. The causal wording is not an observed
fact and must not be reused as one of its own premises.

## Local Context Profile declaration

Profile: `synthetic-evidence-review`

Status: candidate, worksheet-local

Applicability: one synthetic comparison of software monitoring results under a
declared request population, metric definition, method version, and time scope.

Exclusions: production performance approval, causal attribution, statistical
significance, service-level compliance, and any population or monitoring
configuration not explicitly selected.

Fixed defaults: none. Metric identity, population, windows, method, comparison,
and uncertainty do not receive silent values.

Convention: records flow from source and activity to observation/result, then
through an explicit inference rule to a scoped conclusion. Earlier/later order
does not itself mean cause/effect.

| Required selection | Worksheet value | Status |
|---|---|---|
| Population | `declared-request-set` | required but not supplied in enough detail |
| Reference frame | `not-applicable` | resolved; no physical coordinate frame is material |
| Metric and aggregation | dashboard median request latency | partially supplied; implementation/version missing |
| Comparison windows | before and after release | partially supplied; exact bounds missing |
| Inference target | effect of release on typical request latency | explicit but unsupported by current design |

Overrides must appear beside the affected evidence row. The profile is
invalidated when the population, metric, method, or windows differ without a
new record, or when a result is relabeled as a conclusion. Authority and
custody are synthetic author declarations; a real use must name source systems,
owners, versions, reviewers, and revision.

## Seed and sense narrowing

| Alternative | Canonical source | Local evidence | Disposition | Rationale |
|---|---|---|---|---|
| `result` | [Claim and Evidence](../tables/entries/claim-evidence.md) | The dashboard produced two aggregated values | selected | They are outputs of an unspecified monitoring method |
| `observation` | [Claim and Evidence](../tables/entries/claim-evidence.md) | Requests or telemetry events were encountered upstream | retained-option | Raw observation records are not supplied here |
| `measurement` | [Claim and Evidence](../tables/entries/claim-evidence.md) | A quantity-valued latency process may exist | unresolved | Measurand, procedure, system, conditions, and uncertainty are incomplete |
| `inference` | [Claim and Evidence](../tables/entries/claim-evidence.md) | Moving from two results to a release-effect conclusion requires a rule and assumptions | selected | The inference record is necessary even though its premises are incomplete |
| `claim` | [Claim and Evidence](../tables/entries/claim-evidence.md) | The proposed sentence asserts a scoped release effect | selected | It must be dispositioned separately from the trace state |
| temporal sequence | [Observation-to-Inference Chain](../tables/evidence/observation-inference-chain.md) | The result changed after the release | rejected as causal rule | Temporal ordering alone does not isolate the release effect |

## Declared composition

The operator labels are reading aids, not arithmetic.

| Step | Reader operation | Typed trace action | Result |
|---|---|---|---|
| 1 | Add | Admit `inference-rule-and-assumptions` as the required seed | The review cannot skip its reasoning contract |
| 2 | Multiply | Follow F3 `derived-from` forward to `observation-or-result` | The inference must name the result records it uses |
| 3 | Evaluate | Apply the Observation-to-Inference Evidence Chain as a completeness check | Missing population, method, alternatives, and uncertainty remain visible |
| 4 | Flatten | Project the trace into the evidence guide below | Preserve the unresolved claim disposition |

Closure Policy: follow required and evaluative nodes only, forward through F3,
stop on stable identity, and do not treat citations or lexical links as support.
Budgets are three nodes, one edge, depth one, and nine declared work units.

## Working graph

```text
[inference rule and assumptions]
  -- f3: derived-from / declared-inference-rule -->
[observation or result]
  -- evaluated in -->
[Observation-to-Inference Evidence Chain]
```

| Node | Class | Depth | Origin | Predecessor |
|---|---|---:|---|---|
| `factor:claim-evidence/inference-rule-and-assumptions` | required | 0 | seed | none |
| `factor:claim-evidence/observation-or-result` | required | 1 | `relation:f3-inference-observation` | inference factor |
| `view:evidence-observation-inference-chain` | evaluative | 1 | `scope:f3-inference-observation` | inference factor |

The graph is complete under this one-edge policy: it contains the exact
required nodes, Evaluation view, and no hidden frontier or conflict. That state
does not say the inference has adequate premises.

## Evaluation

Declared check: `evidence-chain-completeness`, kind `completeness`, target
[Observation-to-Inference Evidence Chain](../tables/evidence/observation-inference-chain.md).

| Required distinction | Supplied status | Guide consequence |
|---|---|---|
| Result identity | two displayed aggregates are described but stable underlying identities are missing | retain values as provisional reported results |
| Method and conditions | metric label supplied; computation, versions, population, and windows incomplete | do not compare as controlled like-for-like evidence |
| Inference rule | “after release, therefore because of release” is the only apparent rule | reject that shortcut |
| Assumptions and alternatives | concurrent changes and population stability unknown | causal implication remains unresolved |
| Limitation | dashboard comparison does not isolate release effect | state beside any report of the values |

Trace check outcome: `pass` because the worksheet explicitly records the
required stages and their missingness. Claim outcome: `unresolved` because the
supplied evidence does not support the proposed causal implication.

Summary: **complete trace; unresolved claim**.

## Flattened Factor Guide projection

### Result

Report only the bounded descriptive statement supported by supplied facts:

> The dashboard displayed median request latency of 240 ms in the earlier
> window and 180 ms in the later window.

Do not append “the release reduced latency” unless a later evidence record
supplies comparable populations and methods plus an inference design that
addresses plausible alternatives.

### Factor and record assignment

| Canonical factor | Local role | Candidate record | Required condition | Current status |
|---|---|---|---|---|
| `observation-or-result` | evidence input | two dashboard result records | stable identity, method, population, window, unit | incomplete |
| `inference-rule-and-assumptions` | reasoning | release-effect inference record | premises, rule/model, assumptions, alternatives, conclusion | unresolved |
| subject, population, and scope | context | request-set and window definition | same comparison basis or explicit adjustment | missing |
| limitations and excluded claims | constraint | report limitation | placed beside descriptive result | selected |
| provenance and reproduction | custody | dashboard/query/version record | enough identity to reconstruct both values | missing |

### Required controls

- Keep raw observations, aggregated results, inference, and claim in separate
  records.
- Preserve both result windows; do not overwrite the earlier record.
- Name population, route mix, method version, exclusions, and time bounds.
- Record concurrent changes and plausible alternative explanations.
- Keep quantity uncertainty and model/sampling uncertainty distinct when they
  become available.
- Never use the proposed conclusion as an input premise.

### Projection loss

| Projected item | Disposition | Declared loss |
|---|---|---|
| inference-rule factor | selected | retained |
| observation/result factor | selected | retained |
| Evidence Chain view | selected | omits full evidence-row detail |

## Change tests

| Scenario | Expected change | Must remain stable |
|---|---|---|
| Exact populations and method versions show like-for-like windows | comparison evidence becomes stronger | result and inference remain separate records |
| Route mix changed substantially | the aggregate difference may require stratification or lose bearing | displayed values remain historical results |
| A controlled comparison isolates the release change | a release-effect inference may become supportable under its design | causal conclusion still requires explicit assumptions |
| Metric implementation changed | results are not directly comparable without a mapping | time ordering remains factual |
| Values are copied without source identities | provenance and reproducibility checks fail | no default source is invented |
| The claim changes to “the dashboard value was lower later” | descriptive result may support it | broader release-causation claim remains separate |

## Rejected shortcuts and unresolved choices

Rejected: after-means-because-of, same-label-means-same-method,
dashboard-means-raw-observation, reproducible-means-valid, and
structurally-complete-means-claim-supported.

Unresolved: populations, windows, query and dashboard versions, raw record
identities, uncertainty, concurrent changes, comparison design, reviewer, and
the proposed release-effect claim.

## Exact trace manifest

Canonical trace file: `fixtures/composition/latency-evidence.factorium-query`

| Identity | SHA-256 |
|---|---|
| Factorium Reference V0 | `489c17a656b33582d848fe69a06d954da550a80fd9eec170c0ce8558b79f0324` |
| Relation sidecar V0 | `df69b50054258c34a3289ce8cae66ea41d68efd5b8dcdd8e66128f2111f52634` |
| Composition Query trace | `1053d34f921792d65868737d618802b98d4e307ee315fcda1e18c926d8c31d8d` |

Trace inventory: one seed, three nodes, one admitted edge, zero frontiers,
zero conflicts, one passed structural check, three projection rows, and state
`complete`.

## Canonical sources and custody

1. [Claim and Evidence](../tables/entries/claim-evidence.md)
2. [Observation-to-Inference Evidence Chain](../tables/evidence/observation-inference-chain.md)
3. Relation `f3-inference-observation` in
   `reference/factorium-relations-v0.factorium`
4. [Composition Query Trace V0](../specs/COMPOSITION-QUERY.md)
5. [Factor Guide Format V0](../specs/FACTOR-GUIDE.md)

The dashboard scenario and values are synthetic author material. No real
service, team, release, observation, or performance result is represented.

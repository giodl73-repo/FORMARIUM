# Decomposition Modes and Combination Contracts

Status: candidate anchor entry

## Orientation

A factorization identifies distinctions in a subject for a purpose. A
decomposition mode states how those distinctions relate to the subject and to
one another; a combination contract states how selected factors may be used
together. Neither the presence of separate factors nor a familiar symbol
proves independence, additivity, causation, completeness, or invertibility.

Root coordinates describe what a factor concerns. Factor roles describe the
job it performs in one view. Modes and contracts describe how the selected
factors divide, connect, transform, and recombine in that view.

## Sense table

| Sense | Governing question | Role |
|---|---|---|
| `decomposition-mode` | By what relation was the subject separated into these factors? | view-relative decomposition contract |
| `interaction` | Does the contribution or interpretation of one factor change with another factor's value or presence? | nonseparable joint behavior |
| `contribution` | Under which model, comparison, and basis is a factor assigned a signed, enabling, blocking, or residual part of a result? | scoped result allocation |
| `refinement` | How is one factor separated into lower-granularity factors, and how are they recombined? | level-to-level decomposition |
| `ordered-path` | How do order, duration, lag, memory, or intermediate state affect the result? | sequential decomposition |
| `projection` | Which source distinctions are retained, merged, omitted, or derived in a target view? | loss-declared view transformation |
| `basis-transformation` | How are components re-expressed under another basis while declared invariants and domain conditions are preserved? | coordinate or representation change |
| `epistemic-status` | Is a factor observed, measured, asserted, assumed, inferred, simulated, or derived, and by what activity or authority? | knowledge/provenance qualifier |
| `completeness-contract` | Is the selected decomposition exhaustive, purpose-complete, partial, open, truncated, or residual-bearing? | closure claim boundary |
| `combination-contract` | Which operation, dependency, domain, order, and failure behavior govern use of the factors together? | recombination rule |

## Three-layer grammar

```text
factorization view
  := root coordinates          # what the factors concern
   x factor roles              # jobs inside this view
   x decomposition mode        # how the subject was separated
   x combination contract      # how selected factors may recombine
   @ context and provenance
   ! dependencies, exclusions, and completeness boundary
   = declared projection or result
```

The layers are orthogonal annotations. A component may participate in an
additive accounting view, an interacting behavior view, and a lossy projection
without changing its canonical identity.

## Root factorization

```text
decomposition-and-combination-use
  := subject and reader question
   x root coordinates and factor roles
   x decomposition mode and selected pivot
   x factor identities, domains, and granularity
   x dependency and interaction contract
   x combination operator, order, and failure behavior
   x polarity, baseline, and common basis
   x source-target direction, cardinality, and invariants
   x epistemic status, source activity, and authority
   x completeness, coverage, remainder, and residual
   x constraints, invalid combinations, and unmapped cases
   x projection loss, inverse, and round-trip limits
   x counterexamples, alternate decompositions, and sensitivity
   x provenance, version, review, and revision
```

## Mode table

| Mode | Governing relation | Must retain | Does not imply |
|---|---|---|---|
| axis | factors vary along separately named coordinates | domains, dependence, constraints | statistical or semantic independence |
| partition | factors divide a declared whole | membership rule, overlap, exhaustiveness, remainder | equal importance or causal contribution |
| composition | factors are parts assembled into a whole | ownership, interfaces, aggregation rule | that every relation is part-whole |
| refinement | a factor is decomposed at another level | parent, child, level, coverage, roll-up rule | one uniquely correct hierarchy |
| sequence | factors are stages, events, or states in order | order, timing, intermediate state, failure behavior | causation from precedence |
| network | factors are participants and typed relations | direction, roles, multiplicity, boundary | a tree, ownership, or influence |
| mechanism | factors describe a proposed change-producing pathway | entities, activities, ordering, evidence, alternatives | identified causal effect |
| allocation | a bounded total or responsibility is assigned among factors | basis, signs, overlap, residual, reconciliation | physical cause or moral responsibility |
| projection | a target view selects or derives from a source | direction, retained fields, loss, inverse limits | faithful reconstruction |
| basis change | components are re-expressed under another coordinate/representation basis | domain, transformation, invariants, round-trip limits | universal exact invertibility |

## Combination contract

| Contract kind | Required declaration | Frequent misuse |
|---|---|---|
| additive contribution | common result basis, signs, overlap, residual | adding incomparable or double-counted terms |
| multiplicative interaction | exact model and joint term meaning | treating every semantic interaction as numeric multiplication |
| conditional | conditioning factor, admissible states, direction | hiding a dependency as a context note |
| exclusive alternative | alternative set, exclusivity, completeness | assuming open categories are exhaustive |
| ordered composition | sequence, intermediate state, failure/rollback | reordering steps without checking meaning |
| threshold or gate | measured subject, comparison rule, boundary behavior | turning a preference into a hard constraint |
| veto or blocker | authority or validity basis, scope, override rule | treating any negative contribution as prohibition |
| derived projection | source factors, rule, version, loss | storing the output as an independent observation |
| custom relation | exact semantics, domain, tests, unresolved cases | using an unexplained operator label |

## Dependency and completeness record

Every use should state:

```text
dependency
  := independent-for-declared-purpose
   | conditionally-dependent
   | interacting
   | structurally-coupled
   | derived
   | unknown

completeness
  := exhaustive-under-declared-rule
   | purpose-complete
   | partial
   | open
   | truncated
   | residual-present
   | unresolved
```

`Independent-for-declared-purpose` is a bounded working claim, not a universal
property. `Purpose-complete` records sufficiency for one question without
claiming ontology completeness.

## Candidate factorizations

| Lens | Factors | Pivot | Useful when | Failure sign |
|---|---|---|---|---|
| independent axes | coordinates x domains x constraints x dependence tests | variation axis | factors can be selected or varied separately enough for the task | separate columns are called independent without a test |
| contribution ledger | result x baseline x signed contributions x overlap x residual | reconciliation basis | explaining a bounded total under one model | residual is named as a cause without evidence |
| successive refinement | parent x children x levels x coverage x roll-up | selected level | moving between overview and detail | children from different pivots are mixed in one tree |
| path view | source x steps x state x lags x target | order | history or intermediate state changes interpretation | endpoints alone are treated as sufficient |
| projection view | source x selection/derivation rule x target x loss | reader question | producing a smaller reading or implementation view | omitted content becomes invisible |

## Selection procedure

1. State the subject, reader question, sense, and selected view.
2. Identify root coordinates and factor roles before choosing a mode.
3. Compare credible axis, partition, composition, sequence, network,
   mechanism, allocation, projection, or basis-change alternatives.
4. Declare the selected pivot, factor domains, dependencies, interactions,
   exclusions, and invalid combinations.
5. State the combination contract, including order, polarity, common basis,
   authority, threshold, or custom semantics where applicable.
6. Mark every factor's epistemic status and source activity separately from
   its semantic role.
7. Declare level and granularity; provide aggregation/disaggregation rules and
   loss when moving between levels.
8. State completeness, remainder, residual, open frontier, and stop reason.
9. Test a counterexample, alternate pivot, reordered path, interaction, and
   omitted-factor case.
10. Preserve source factors and losses when publishing a derived projection.

## Constraints and failure signs

- Separate factors do not imply independence.
- An interaction term does not prove a causal mechanism.
- Contribution retains its model, comparison, basis, sign convention, and
  uncertainty; it is not automatically responsibility or blame.
- Refinement records level and roll-up; one hierarchy is not universal.
- Temporal order and path membership do not establish causal effect.
- Projection loss and unmapped values remain visible.
- Basis transformations state domain, invariants, inverse, and round-trip
  conditions.
- Assumptions and simulations are not relabeled observations.
- Partial and truncated decompositions do not silently become exhaustive.
- Named analytical methods, notations, standards, and domain taxonomies remain
  examples or bounded external authorities.

## Specialized views

- [Factor Interaction Integrity Constraint Table](../constraints/factor-interaction-integrity.md)
- [Contribution and Reconciliation Procedure](../procedures/contribution-reconciliation.md)
- [Hierarchy and Granularity Mapping](../mappings/hierarchy-granularity.md)
- [Perspective and Projection Mapping](../mappings/perspective-projection.md)
- [Basis Transformation Mapping](../mappings/basis-transformation.md)
- [Factor Status and Completeness Evidence Table](../evidence/factor-status-completeness.md)

## Cross-references

- [Factorization Quality](factorization-quality.md)
- [Factor Role Table](../foundations/FACTOR-ROLES.md)
- [Model, Representation, and Simulation](model-representation-simulation.md)
- [Probability, Risk, and Uncertainty](probability-risk-uncertainty.md)
- [Stock, Flow, Accumulation, Balance, and Conservation](stock-flow-balance.md)
- [Association and Causal Reasoning](causal-reasoning.md)
- [Instant, Duration, Interval, Deadline, and Schedule](temporal-organization.md)

## Sources and provenance

1. [F51-F100 campaign research](../../docs/research/2026-08-16-f51-f100-factoring-evaluation-campaign.md)
2. NIST Engineering Statistics Handbook, interaction effects:
   https://www.itl.nist.gov/div898/handbook/pri/section6/pri623.htm
3. NASA Systems Engineering Handbook, recursive decomposition and product
   layers: https://www.nasa.gov/reference/2-0-fundamentals-of-systems-engineering/
4. JCGM 100:2008, expression of measurement uncertainty:
   https://www.bipm.org/en/doi/10.59161/jcgm100-2008e
5. W3C, PROV-O: https://www.w3.org/TR/prov-o/

Comparator access date: 2026-08-16. The general cross-domain organization is
a candidate Factorium synthesis, not a universal semantic algebra.

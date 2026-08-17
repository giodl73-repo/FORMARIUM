# Eligibility, Admissibility, Feasibility, and Sufficiency Constraint Table

Status: candidate Constraint Table

Primary family: Constraint Table

Canonical headword: [Assumption, Condition, Scenario, Case, and Feasibility](../entries/scenario-assumption-condition-case.md)

Canonical senses: `eligibility`, `admissibility`, `feasibility`, `sufficiency`,
`case`, `scenario`

## Governing question

Which invariants must hold before a case or option can be called eligible,
admissible, feasible, or sufficient for a declared purpose?

## Constraints

| ID | Requirement | Invalid when | Evidence to retain |
|---|---|---|---|
| `FS-01` | bind exact case/population, purpose, rule, authority, and version | a label substitutes for applicability | identity and applicability record |
| `FS-02` | evaluate eligibility as membership under an inclusion rule | membership, permission, and practicality collapse | inclusion evidence and exclusions |
| `FS-03` | evaluate admissibility under exact governing rules and effective time | “allowed” has no authority or rule | rule trace and exception/appeal state |
| `FS-04` | evaluate feasibility against exact requirements and scenario | desirability or high score substitutes | requirement-to-evidence matrix |
| `FS-05` | retain resource capacity, demand, allocation, timing, and shortages | planned or aggregate capacity proves availability | resource ledger and bottlenecks |
| `FS-06` | retain prerequisites, blockers, compatibility, and substitutions | dependency labels have no direction/consequence | dependency/compatibility tests |
| `FS-07` | evaluate sufficiency for one named purpose and stop rule | enough-for-one-use becomes complete | sufficiency criteria and known gaps |
| `FS-08` | preserve conditional, unresolved, and out-of-scope states | missing evidence defaults to pass/fail | unresolved frontier and owner |
| `FS-09` | bind result, reviewer, time, sensitivity, and invalidation | result survives changed scenario or version silently | disposition history |

## Status ladder

```text
candidate case/option
  -- inclusion rule --> eligible / ineligible / unresolved
  -- governing rule --> admissible / inadmissible / unresolved
  -- requirements + scenario + resources + dependencies -->
       feasible / infeasible / conditional / unresolved / out-of-scope
  -- purpose criteria --> sufficient / insufficient / unresolved
```

The ladder is not always monotone. A case may be eligible but inadmissible, or
admissible but infeasible. Sufficiency is evaluated only for an exact purpose.

## Sources and provenance

See the canonical entry and existing Policy/Decision, Choice, Requirements,
Operational Resource, and Evidence owners. This view audits the record; it
does not perform or authorize a real-world feasibility decision.

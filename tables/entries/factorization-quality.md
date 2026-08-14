# Factorization Quality

Status: candidate anchor entry

## Orientation

Factorization quality concerns whether a proposed decomposition makes
important variation, roles, constraints, and alternatives legible without
inventing false independence or letting one implementation mechanism define
the domain. Quality is diagnosed from observable failure signs and targeted
tests, not from the number of factors alone.

## Sense table

| Sense | Governing question | Role |
|---|---|---|
| `sense-quality` | Were materially different meanings separated first? | lexical/semantic diagnostic |
| `factor-independence` | Can factors vary independently enough to justify separate axes? | structural diagnostic |
| `pivot-quality` | Is the privileged organizing dimension explicit and appropriate? | hierarchy/identity diagnostic |
| `constraint-quality` | Are dependencies and invalid combinations visible? | validity diagnostic |
| `mechanism-assignment` | Are general roles separated from platform mechanisms? | mapping diagnostic |
| `change-quality` | Does expected change remain localized rather than causing exception growth? | maintenance diagnostic |

## Root factorization

```text
factorization-quality
  := observed symptom
   x candidate structural cause
   x affected sense and view
   x pivot and supporting roles
   x dependencies and constraints
   x mechanism assignment
   x counterexample or change scenario
   x diagnostic test
   x repair boundary
   x evidence and confidence
```

## Specialized view

The linked [Factorization Failure Diagnostic](../diagnostics/factorization-failures.md)
maps recurring observations to candidate causes, tests, and repairs.

## Selection procedure

1. State the subject, sense, reader question, and selected decomposition view.
2. Identify the proposed pivot and every supporting factor role.
3. Test whether candidate factors can vary independently in representative
   and adversarial examples.
4. Record dependencies, invalid combinations, derived outputs, and context.
5. Compare at least one credible alternate pivot, merge, split, or granularity.
6. Map factors to implementation mechanisms only after semantic roles are
   stable.
7. Test expected changes and look for exception, subtype, or naming growth.
8. Use observed symptoms to select discriminating tests rather than declaring
   one structural cause by inspection.
9. Preserve counterexamples, rejected alternatives, repair scope, and
   confidence.

## Reference Delta

| Reference form | Typical contribution | Factorium delta |
|---|---|---|
| Design heuristic | Offers general advice | Connects symptoms to explicit factor roles and tests |
| Code smell catalog | Names implementation symptoms | Traces smells back to semantic decomposition and mechanism assignment |
| Taxonomy quality guide | Evaluates classes and labels | Adds pivots, dependencies, derived outputs, and expected change |
| Factorium | Provides a diagnostic sibling view | Keeps candidate cause, test, and repair distinct from certainty |

## Constraints and failure signs

- More factors do not automatically improve quality.
- Independent axes require plausible independent variation.
- Derived outputs are not recounted as source factors.
- Constraints prevent misleading Cartesian products.
- Mechanism mappings do not define semantic factors.
- A familiar hierarchy is not automatically the right pivot.
- Diagnostic symptoms suggest tests; they do not prove one cause.
- Repairs preserve working distinctions and provenance.

## Cross-references

- [Factorium Entry Publication](factorium-entry-publication.md)
- [Identity, Naming, Classification, and Versioning](identity-naming-classification-versioning.md)
- [Policy, Rule, Constraint, Decision, and Exception](policy-rule-constraint-decision-exception.md)
- [Factor Role Table](../foundations/FACTOR-ROLES.md)

## Sources and provenance

1. `tables/foundations/FACTOR-ROLES.md`
2. `specs/FACTOR-TABLE-ENTRY.md`
3. reviewed pilot examples under `tables/examples/`.

Diagnostic organization remains `candidate`.

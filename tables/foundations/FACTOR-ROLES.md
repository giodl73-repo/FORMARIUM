# Factor Role Table

Status: candidate

## Orientation

Root coordinates describe what a factor concerns. Factor roles describe the
job a factor performs inside one decomposition view. The same canonical entry
can therefore be a context in one view, a pivot in another, and a derived
output in a third. Roles are view-relative annotations, not permanent types.

[Decomposition Modes and Combination Contracts](../entries/decomposition-modes-combination-contracts.md)
adds a separate layer: how the subject was divided and how selected factors
may recombine. A component role therefore does not imply an additive operator,
and separate factor roles do not imply independence or completeness.

## Structural roles

| Role | Governing question | Characteristic test |
|---|---|---|
| [Pivot](../roles/pivot.md) | Which factor organizes identity or navigation in this view? | Changing it commonly changes the branch or principal kind |
| [Component](../roles/component.md) | What constituent is owned or assembled into the whole? | It participates through a part-whole relation |
| [Capability](../roles/capability.md) | What can the subject do or support? | It can often vary independently of nominal kind |
| [Variant](../roles/variant.md) | Which alternative form is selected? | Alternatives are distinguished, often mutually exclusive |
| [State](../roots/state.md) | Which current condition affects behavior? | It can change while identity remains stable |
| [Policy](../roles/policy.md) | Which replaceable rule governs a decision? | Replacing the rule can change output without changing facts |
| [Relationship](../roots/relation.md) | Which connection between participants matters? | Meaning depends on two or more roles |
| [Boundary](../roots/boundary.md) | Which inclusion or interface limits the view? | Moving it changes scope or crossing rules |
| [Context](../roots/context.md) | Which circumstances qualify interpretation? | It changes applicability without necessarily changing identity |
| [Constraint](../roots/constraint.md) | Which combinations or transitions are invalid? | Removing it admits cases the view means to exclude |
| [Derived view](../roles/derived-view.md) | Which output is computed or projected from other factors? | It should change when its inputs or derivation rule change |

## Role assignment

```text
factorization-view
  := factors
   ^ optional-pivot
   @ contexts
   ! constraints
   = derived-views

factor-role => domain mechanism
```

Assignments are many-to-many:

- one factor may perform several roles in one view;
- several factors may share one role;
- a role may have no direct implementation mechanism;
- one mechanism may carry several roles;
- changing views may change role assignments without changing the canonical
  entries.

## Common role interactions

| Interaction | Useful distinction | Failure sign |
|---|---|---|
| Pivot and variant | Pivot organizes the view; variant names alternatives within it | Every independent variation becomes a subtype |
| Component and capability | Component is part of the whole; capability is supported behavior | Interfaces are mistaken for owned parts |
| State and identity | State changes while identity continues | Lifecycle stages become unrelated nominal kinds |
| Policy and constraint | Policy selects or evaluates; constraint limits validity | A preference is treated as an absolute prohibition |
| Context and factor | Context qualifies interpretation; a primary factor owns direct variation | Every environmental detail is promoted into identity |
| Relationship and component | Relationship connects participants; component asserts part-whole structure | Association is mistaken for ownership |
| Derived view and source factor | Derived output summarizes inputs; source factors preserve observations | A score or label replaces the facts that produced it |

## Cross-paradigm assignment example

| General role | Object-oriented | Rust | Relational data |
|---|---|---|---|
| Pivot | base type or aggregate identity | enum/type boundary or primary struct | primary entity/table |
| Capability | interface | trait | supported operation or joined relation |
| Component | composed object | owned field | owned/dependent row |
| Variant | sealed subtype or tagged union | enum variant | discriminator plus constrained rows |
| Policy | strategy object | generic parameter or trait object | versioned rule/configuration relation |
| State | state object or field | enum/field | status plus transition history |
| Relationship | association | reference/key/handle | foreign-key or association relation |
| Derived view | property/query | function or derived value | view or computed query |

These are candidate assignments, not equivalences or definitions.

## Constraints

- A role annotation belongs to a specific factorization view.
- Root coordinate, structural role, and mechanism assignment remain distinct.
- A pivot is optional; not every useful decomposition is hierarchical.
- A derived view is not counted as an independently observed input.
- Policies and constraints may interact but MUST NOT be silently collapsed.
- Mechanisms do not prove that the assigned factors are well chosen.
- Decomposition mode, combination operator, dependence, epistemic status, and
  completeness remain separate from role assignment.

## Maturity and provenance

- Maturity: `candidate`
- Scope: cross-domain factorization vocabulary
- Evidence: current Factorium pilots and cross-paradigm design recurrence
- Promotion gate: application across the 25-entry pilot and practitioner review


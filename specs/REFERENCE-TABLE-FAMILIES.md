# Factorium Reference Table Families V0

Status: draft

## Purpose

Factorium remains one canonical entry graph presented through specialized
table views. A table family answers a recurring kind of lookup question. It
does not create a separate headword identity or override the entry's senses,
sources, maturity, and typed relationships.

## Initial families

| Family | Governing question | Typical subtypes |
|---|---|---|
| Factor Table | What is this structured from? | decomposition, dimensions, pivots, roles |
| Formula Table | How do quantities or symbols relate? | definition, identity, law, balance, model, estimator, recurrence |
| Reference Value Table | What sourced value or property should I use? | constant, material property, standard datum, parameter |
| Mapping Table | How does this translate into another system? | conversion, equivalence, correspondence, encoding, crosswalk |
| Decision Table | Which conclusion or action follows? | rule table, classification matrix, truth table, policy table |
| Transition Table | How can state change? | state/event table, lifecycle, protocol transition |
| Constraint Table | What is valid, required, forbidden, or invariant? | compatibility matrix, range, invariant, grammar restriction |
| Procedure Table | What ordered work produces the result? | recipe, algorithm steps, checklist, runbook |
| Diagnostic Table | What observation suggests which cause or test? | troubleshooting, fault isolation, differential diagnosis |
| Scale Table | How are magnitudes, ranks, or bands interpreted? | severity scale, order of magnitude, maturity level, threshold bands |
| Evidence Table | What supports, contradicts, or qualifies the claim? | source matrix, comparison table, claim-evidence map |

## Selection rule

Choose the family by the reader's immediate question, not by the source
document's current layout.

```text
structure   -> Factor Table
relation    -> Formula Table
value       -> Reference Value Table
translation -> Mapping Table
choice      -> Decision Table
change      -> Transition Table
validity    -> Constraint Table
sequence    -> Procedure Table
diagnosis   -> Diagnostic Table
comparison  -> Scale Table
support     -> Evidence Table
```

One entry may own several view kinds. For example, temperature may have:

- a Factor Table for thermodynamic and measurement senses;
- a Formula Table for selected physical relations;
- a Reference Value Table for fixed points;
- a Mapping Table for scale conversion.

## Shared contract

Every specialized table view MUST retain:

- canonical entry and sense identity;
- view kind and one-line purpose;
- source and target reader question;
- domain and applicability;
- explicit inputs, outputs, conditions, and exclusions;
- source authority and version;
- Factorium maturity;
- typed cross-references;
- unresolved candidates rather than guessed joins.

## Subtype rules

- A truth table is a Decision Table when used to select an output and a
  Constraint Table when used to enumerate valid logical combinations.
- A conversion table is a Mapping Table.
- A classification matrix is a Decision Table unless it only describes a
  non-normative scale.
- A state table is a Transition Table only when events, guards, and resulting
  states are explicit.
- A constant or property table is a Reference Value Table, not a Formula Table.
- A troubleshooting guide is a Diagnostic Table; its repair steps may link to
  separate Procedure Tables.
- A proof outline may appear in Evidence, but a Formula Table does not become
  established merely because it has algebraic support.

## Avoiding duplicate authority

Specialized tables are projections or views. The canonical entry owns:

- sense definitions;
- canonical relationships;
- maturity;
- source custody;
- revisions.

Indices may project by table family, but they MUST NOT own copied definitions.

## Pilot gate

Before stabilizing a family:

1. publish at least three materially different examples;
2. review its ambiguity and overlap with neighboring families;
3. test practitioner lookup;
4. identify any executable or machine-validation boundary;
5. close all critical and major role findings.


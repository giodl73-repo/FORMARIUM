# Formula Table Pilot Catalog

Status: pilot

Formula Tables are indexed by the kind of claim they make, not only by subject
or fame.

## Current pilots

| Entry | Relation kind | Canonical expression | Scope lesson |
|---|---|---|---|
| [Force](force.md) | Physical law | `sum(F_external) = m a` | Boundary and net-vector aggregation are part of use |
| [Mass density](density.md) | Definition | `rho_avg = m / V` | Bulk averaging depends on one mass-volume boundary |
| [Ohm's law](ohms-law.md) | Empirical constitutive relation | `V = I R` | Famous laws may apply only in a bounded regime |
| [Sample arithmetic mean](arithmetic-mean.md) | Estimator or statistic | `x_bar = sum(x_i) / n` | Inclusion and distribution determine interpretation |

## Relation-kind coverage

| Relation kind | Pilot status |
|---|---|
| Definition | covered by mass density |
| Identity | pending |
| Law or principle | covered by force |
| Conservation or balance | pending |
| Constitutive model | covered empirically by Ohm's law |
| Empirical relation | covered by Ohm's law |
| Estimator or statistic | covered by sample arithmetic mean |
| Algorithm or recurrence | pending |
| Constraint | pending |

The next pilot selection should prefer uncovered relation kinds over adding
several more equations of one kind.

## Catalog rules

- One canonical scoped relation owns its algebraic rearrangements.
- Formula authority and Factorium entry maturity remain separate.
- Symbols are local unless explicitly joined to canonical quantity entries.
- Units, dimensions, domains, and failure signs remain visible.
- Formula Tables complement rather than replace domain instruction.


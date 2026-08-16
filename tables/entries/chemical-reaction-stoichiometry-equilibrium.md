# Chemical Reaction, Stoichiometry, Extent, Rate, Equilibrium, and Catalyst

Status: candidate anchor entry

## Orientation

A chemical reaction is a process that interconverts chemical species. A
reaction equation represents selected reactants, products, direction, and
stoichiometric numbers. Stoichiometry constrains related amount changes; extent
tracks progress for that declared equation; rate describes progress through
time. Equilibrium concerns balanced forward and reverse change under stated
conditions. A catalyst changes the pathway or rate without changing the
overall standard Gibbs-energy change. None of these alone proves a mechanism.

## Sense table

| Sense | Governing question | Role |
|---|---|---|
| `chemical-reaction` | What process interconverts the selected chemical species? | process |
| `reaction-equation` | What symbolic representation states selected sides, direction, and stoichiometric numbers? | representation |
| `reactant` | What substance is consumed under the selected reaction description? | input-side process role |
| `product` | What substance is formed under the selected reaction description? | output-side process role |
| `stoichiometric-number` | What signed coefficient assigns a species' amount-change direction and ratio? | accounting coefficient |
| `stoichiometry` | What amount relationships connect reactants and products for the selected reaction? | amount constraint |
| `reaction-extent` | How much progress has occurred relative to the declared stoichiometric equation? | extensive progress quantity |
| `reaction-rate` | How quickly does declared reaction progress or a named species amount change? | time-rate quantity |
| `rate-law` | What empirical relation connects rate with selected species quantities and parameters? | kinetic model |
| `chemical-equilibrium` | Under what conditions do forward and reverse processes balance with no net macroscopic change? | dynamic state/condition |
| `equilibrium-constant` | What convention-bound quantity characterizes equilibrium for the declared reaction and conditions? | thermodynamic relation parameter |
| `thermodynamic-activity` | What dimensionless effective quantity relates chemical potential to a standard state? | thermodynamic state quantity |
| `catalyst` | What substance increases reaction rate without changing the overall standard Gibbs-energy change? | kinetic pathway role |
| `reaction-mechanism` | What evidence-constrained account describes steps, intermediates, transition states, and energetic course? | explanatory model |
| `reaction-intermediate` | What formed entity persists long enough to be a local-energy-minimum species and reacts onward? | mechanism/process role |

## Four-view chain

```text
species interconversion -> chemical reaction
selected symbolic statement -> reaction equation
signed coefficients -> stoichiometry -> extent
extent or species change / time -> rate -> empirical rate law
forward and reverse processes + activities + conditions -> equilibrium -> K
alternative pathway with increased rate -> catalysis
steps + intermediates + transition states + evidence -> mechanism
```

## Root factorization

```text
chemical-reaction-use
  := system boundary and phase inventory
   x reaction identity, direction, and equation version
   x species identities and reactant, product, intermediate, or catalyst roles
   x signed stoichiometric numbers and balancing basis
   x amount changes, reaction extent, conversion basis, and completeness
   x time interval, volume, surface, or other rate normalization
   x rate law, parameters, regime, and observed species
   x temperature, pressure, composition, medium, and transport conditions
   x activity, standard state, equilibrium convention, and equilibrium constant
   x proposed steps, transition states, pathways, and competing mechanisms
   x measurements, uncertainty, provenance, model status, and claim scope
```

## Contrast table

| Pair | Shared feature | Decisive distinction |
|---|---|---|
| Reaction vs. reaction equation | both concern the same selected change | physical/chemical process vs. symbolic representation |
| Reactant vs. reagent | both may be added | consumed reaction role vs. test or inducing-use role |
| Product vs. intermediate | both may be formed | retained outcome role vs. reacts onward in a mechanism |
| Coefficient vs. stoichiometric number | same displayed magnitude may occur | unsigned written coefficient vs. signed species role |
| Stoichiometry vs. mechanism | both constrain a reaction account | amount relation vs. detailed pathway explanation |
| Extent vs. conversion | both track progress | equation-scaled amount of transformations vs. fraction of a selected feed consumed |
| Reaction rate vs. species rate | both measure change per time | coefficient-normalized reaction progress vs. one species' appearance/disappearance |
| Rate law vs. balanced equation | both contain species symbols | empirical kinetic relation vs. amount-conservation representation |
| Rate vs. equilibrium | both concern forward/reverse change | speed of change vs. balance condition and thermodynamic position |
| Equilibrium vs. static inactivity | both may show constant bulk composition | equal opposing rates vs. no process |
| Catalyst vs. reactant consumed overall | both participate in steps | regenerated kinetic role vs. net consumption |
| Catalyst vs. equilibrium shift | both can change observed composition over time | approach rate/pathway vs. final equilibrium under unchanged conditions |
| Mechanism vs. reaction sequence | both may list steps | evidence-constrained explanatory account vs. ordered proposal alone |

## Selection procedure

1. Freeze system, phases, species identities, conditions, direction, and equation version.
2. Separate the process from its equation, diagram, data series, and proposed mechanism.
3. Assign signed stoichiometric numbers: negative for reactants and positive for products.
4. Verify elemental and charge accounting, while treating balance as necessary rather than sufficient evidence.
5. Use one declared equation to define extent and state whether side reactions or intermediates invalidate a single-progress description.
6. Distinguish reaction rate from named-species appearance/disappearance and declare every time, volume, area, or mass normalization.
7. Treat a rate law as empirical unless mechanism-specific evidence supports a stronger claim.
8. For equilibrium, state temperature, pressure, phase, composition, standard states, activity convention, and reaction direction.
9. Compare catalyzed and uncatalyzed rates under otherwise comparable conditions; do not infer an equilibrium shift from faster approach.
10. Admit a mechanism only to the strength supported by stoichiometry, kinetics, intermediates, energetic, structural, and other evidence.
11. Keep named reaction and catalyst families in examples or scoped specialist views.

## Constraints and failure signs

- A balanced equation is not automatically an elementary step or mechanism.
- Stoichiometric numbers retain sign and equation scaling.
- Extent is tied to one declared reaction equation and amount basis.
- Rate retains observed species, derivative, interval, and normalization scope.
- Rate-law exponents are not inferred from stoichiometric coefficients without evidence.
- Constant composition does not prove absence of forward and reverse reaction.
- Equilibrium constants retain reaction direction, equation scaling, activity convention, standard states, and conditions.
- Activities are dimensionless relative quantities, not unqualified concentrations.
- Catalysis changes kinetics, not the overall standard Gibbs-energy change.
- Proposed mechanisms remain evidence-qualified and may have alternatives.
- Named reaction families do not expand into open-ended canonical sibling senses.

## Specialized views

- [Chemical Reaction Relations](../formulas/chemical-reaction-relations.md)
- [Chemical Reaction Failure Diagnostic](../diagnostics/chemical-reaction-failures.md)

## Cross-references

- [Chemical Entity, Substance, Compound Class, Mixture, and Solution](chemical-substance-classification.md)
- [Amount, Concentration, and Composition](amount-concentration-composition.md)
- [Stock, Flow, Accumulation, Balance, and Conservation](stock-flow-balance.md)
- [State, Event, Transition, Process, and Lifecycle](state-event-transition-process-lifecycle.md)
- [Thermal Quantity](thermal-quantity.md)
- [Work, Energy, and Power](work-energy-power.md)
- [Relation](../roots/relation.md)
- [Time](../roots/time.md)

## Sources and provenance

1. [Chemical reaction research note](../../docs/research/2026-08-15-chemical-reaction-stoichiometry-equilibrium.md)
2. IUPAC Gold Book, chemical reaction: https://goldbook.iupac.org/terms/view/C01033
3. IUPAC Gold Book, reaction equation: https://goldbook.iupac.org/terms/view/C01034
4. IUPAC Gold Book, extent of reaction: https://goldbook.iupac.org/terms/view/E02283
5. IUPAC Gold Book, rate of reaction: https://goldbook.iupac.org/terms/view/R05156
6. IUPAC Gold Book, chemical equilibrium: https://goldbook.iupac.org/terms/view/C01023
7. IUPAC Gold Book, catalyst: https://goldbook.iupac.org/terms/view/C00876
8. IUPAC Gold Book, reaction mechanism: https://goldbook.iupac.org/terms/view/M03804

Comparator access date: 2026-08-15. IUPAC and specialized kinetics,
thermodynamics, analytical, process, and safety authorities retain their scoped
authority; Factorium's organization remains `candidate`.


# Chemical Entity, Substance, Compound Class, Mixture, and Solution

Status: candidate anchor entry

## Orientation

Chemical descriptions move between levels. An entity is one distinguishable
chemical object; a species is an ensemble of chemically identical entities; a
substance is matter of characteristic constant composition. A compound class
groups compounds under a stated composition, structure, bonding, functional,
reaction-role, or use criterion. A mixture contains multiple substances, while
a solution assigns solvent and solute roles within a phase.

Named families such as halides and sugars are examples of classification, not
an invitation to enumerate every chemical family in the canonical senses.

## Sense table

| Sense | Governing question | Role |
|---|---|---|
| `chemical-element` | Which proton-number class, or corresponding elementary substance, is meant? | elemental identity/substance use |
| `chemical-entity` | What singular distinguishable chemical object is selected? | entity level |
| `atom` | What smallest particle still characterizes the selected element? | atomic entity |
| `molecule` | What electrically neutral entity contains more than one atom? | neutral multi-atom entity |
| `ion` | What atomic or molecular particle has net electric charge? | charged entity |
| `chemical-species` | What ensemble of chemically identical entities is selected on the experiment's time scale? | ensemble level |
| `chemical-substance` | What matter of characteristic constant composition is selected? | bulk material kind |
| `chemical-compound` | What substance combines atoms of more than one element in a definite chemical relation? | compound kind |
| `formula-unit` | What lowest-ratio representation is used for composition where a discrete molecule is not implied? | composition/counting representation |
| `compound-class` | Under what declared criterion are multiple compounds grouped? | classification result |
| `classification-criterion` | Which composition, structure, bonding, function, reaction role, origin, or reporting rule governs membership? | classification rule |
| `mixture` | What portion of matter contains two or more chemical substances as constituents? | multi-substance material |
| `chemical-solution` | What phase contains multiple substances with declared solvent and solute roles? | phase/constituent-role model |

## Level and classification view

```text
element identity
  -> atom / molecule / ion as entity kinds
  -> chemical species as ensemble
  -> chemical substance as bulk material kind
  -> chemical compound when multiple elements are chemically related

compound + declared criterion
  -> compound class
  -> named family or member as an example

multiple substances
  -> mixture
  -> chemical solution when phase and solvent/solute roles are declared
```

## Root factorization

```text
chemical-classification-use
  := named object or material
   x entity, species, substance, mixture, or phase level
   x element identity and isotope scope
   x composition, stoichiometric ratio, and net charge
   x connectivity, bonding, spatial structure, and material organization
   x classification criterion, hierarchy, and membership boundary
   x constituent, solvent, solute, and analyte roles
   x reaction, medium, state, and conditions where behavior defines class
   x amount, concentration, composition, unit, and reporting basis
   x name, formula, identifier, authority, and version
   x evidence, uncertainty, provenance, and claim scope
```

## Classification criteria

| Criterion | Governing distinction | Example only |
|---|---|---|
| Periodic family | element position or recurring electronic structure | halogen |
| Charge-derived family | entity identity plus signed charge | halide ion; chloride ion |
| Composition-derived family | included elements and stoichiometric relation | metal halide; oxide |
| Bonding/organization family | molecular, ionic, network, coordination, or metallic organization | ionic salt |
| Structural/functional family | connectivity or characteristic group | alcohol; amide |
| Reaction-role family | behavior under a named framework and reaction | Brønsted acid/base |
| Biochemical family | structure, biosynthetic, or functional convention | carbohydrate; sugar |
| Reporting family | analytical, nutritional, product, or regulatory rule | total sugars; added sugars |

Examples can overlap because the criteria answer different questions. None of
the example lists is a complete chemical taxonomy.

## Two teaching examples

### Halide pattern

```text
periodic family -> halogen
charge-derived family -> halide ion X-
composition-derived family -> metal halide MX_n for metal M^(n+)
member illustration -> chloride when X = Cl
```

This one example teaches family/member relations, charge, neutral
stoichiometric ratio, formula units, and why a class name does not identify one
particular compound.

### Sugar pattern

`Carbohydrate` is broader than common chemical use of `sugar`, while `total
sugars` and `added sugars` are scoped reporting categories. The durable lesson
is to retain the classification criterion and authority, not to make every
carbohydrate subtype a canonical Factorium sense.

## Contrast table

| Pair | Shared feature | Decisive distinction |
|---|---|---|
| Element vs. elementary substance | same proton-number identity | atom class vs. bulk pure-substance use |
| Entity vs. species | same chemical identity may be named | singular object vs. ensemble on a time scale |
| Molecule vs. ion | both are entity kinds | electrically neutral vs. net charge |
| Molecule vs. compound | both may involve multiple atoms | entity kind vs. multi-element substance; some compounds lack discrete molecules |
| Formula unit vs. molecule | both may be represented by a formula | composition ratio vs. discrete neutral entity |
| Compound vs. compound class | both concern chemical composition | one material kind vs. set grouped by a rule |
| Compound class vs. named member | both support classification | reusable membership criterion vs. one branch or member |
| Compound vs. mixture | both may contain multiple elements | chemical relation/characteristic composition vs. co-present substances |
| Mixture vs. solution | both contain multiple substances | general mixture vs. phase with solvent/solute roles |
| Chemical solution vs. mathematical solution | same word | material phase vs. object satisfying a relation |

## Selection procedure

1. Preserve the exact name, formula, identifier, source, and use context.
2. Select the level: entity, species, substance, compound, mixture, or phase.
3. State element identities, composition, charge, stoichiometry, and structural model.
4. State the classification criterion before naming a family or member.
5. Test whether the same criterion classifies several contrasting examples and
   whether swapping examples leaves the rule intact.
6. For ionic material, distinguish ion, compound, formula unit, lattice, and
   measured constituent; verify charge balance without treating it as identity proof.
7. For reaction-role classes, state framework, reaction partners, medium, and state.
8. For mixtures and solutions, state constituents, phases, solvent/solute or
   analyte roles, preparation, conditions, and boundary.
9. Attach quantities, units, purity, uncertainty, provenance, and reporting
   rules to the correct entity or constituent basis.
10. Keep named taxonomies in examples or bounded domain views unless a separate
    canonical concept passes the concept-taxonomy boundary review.

## Constraints and failure signs

- Entity, species, substance, compound, mixture, and phase remain explicit.
- A name or formula does not by itself prove identity, purity, or structure.
- Molecule and compound do not become universal synonyms.
- Charge balance constrains a neutral formula but does not certify identity.
- Every compound-class label retains a membership criterion and authority.
- Examples do not expand automatically into sibling canonical senses.
- Open-ended member lists trigger refactoring toward a rule or hierarchy.
- Chemical and mathematical senses of `solution` remain separate.
- Generic classification does not become safety, nutrition, or regulatory proof.

## Specialized view

The [Chemical Classification Failure Diagnostic](../diagnostics/chemical-substance-classification-failures.md)
maps level, charge, representation, class-criterion, mixture, solution, and
taxonomy-boundary defects to candidate causes and discriminating checks.

## Cross-references

- [Amount, Concentration, and Composition](amount-concentration-composition.md)
- [Identity, Naming, Classification, and Versioning](identity-naming-classification-versioning.md)
- [Mathematical Function, Variable, Equation, Identity, Solution, Root, Derivative, Iteration, and Convergence](mathematical-relation-solving.md)
- [Chemical Reaction, Stoichiometry, Extent, Rate, Equilibrium, and Catalyst](chemical-reaction-stoichiometry-equilibrium.md)
- [Thermodynamic System, Boundary, State, Process, Phase, and Transition](thermodynamic-system-state-phase.md)
- [Matter and Load Measure](matter-load-measure.md)
- [Boundary](../roots/boundary.md)
- [Context](../roots/context.md)
- [Identity](../roots/identity.md)
- [Relation](../roots/relation.md)

## Sources and provenance

1. [Chemical substance classification research note](../../docs/research/2026-08-15-chemical-substance-classification.md)
2. IUPAC Gold Book, chemical element: https://goldbook.iupac.org/terms/view/C01022
3. IUPAC Gold Book, molecular entity: https://goldbook.iupac.org/terms/view/M03986/html
4. IUPAC Gold Book, chemical species: https://goldbook.iupac.org/terms/view/CT01038
5. IUPAC Gold Book, chemical substance: https://goldbook.iupac.org/terms/view/C01039
6. IUPAC Gold Book, salt: https://goldbook.iupac.org/terms/view/S05447
7. IUPAC Gold Book, mixture: https://goldbook.iupac.org/terms/view/M03949
8. IUPAC Gold Book, solution: https://goldbook.iupac.org/terms/view/S05746
9. IUPAC carbohydrate nomenclature: https://iupac.qmul.ac.uk/2carb/00n01.html
10. FDA, added sugars: https://www.fda.gov/food/nutrition-facts-label/added-sugars-nutrition-facts-label

Comparator access date: 2026-08-15. IUPAC and specialized chemical,
analytical, nutritional, safety, and regulatory authorities retain their
scoped authority; Factorium's organization remains `candidate`.

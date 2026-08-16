# Amount, Concentration, and Composition

Status: candidate anchor entry

## Orientation

Count, amount of substance, concentration, and composition all answer "how
much" questions, but they use different quantity kinds and denominator roles.
A count enumerates specified entities; amount of substance scales that count
in moles; concentration normalizes a named component by mixture volume; a
composition fraction compares a component with a like-kind total.

## Sense table

| Sense | Governing question | Quantity role | SI unit |
|---|---|---|---|
| `entity-count` | How many specified discrete entities are present? | nonnegative integer count | one, `1` |
| `amount-of-substance` | What amount of specified entities is present on the mole scale? | SI base quantity | mole, `mol` |
| `amount-concentration` | How much substance amount of this component occurs per mixture volume? | component amount per volume | `mol m^-3` |
| `mass-concentration` | How much mass of this component occurs per mixture volume? | component mass per volume | `kg m^-3` |
| `amount-fraction` | What share of total substance amount belongs to this component? | like-kind part-whole ratio | one, `1` |
| `mass-fraction` | What share of total mass belongs to this component? | like-kind part-whole ratio | one, `1` |
| `volume-fraction` | What share of the declared component-volume total belongs to this component? | state-dependent like-kind ratio | one, `1` |

## Quantity ladder

```text
specified entity count
  -- divided by Avogadro constant --> amount of substance

component quantity
  -- divided by mixture volume --> concentration
  -- divided by total like-kind quantity --> composition fraction
```

The two denominator choices answer different questions. A concentration is
not a fraction, and a fraction does not determine concentration without
additional volume and total-quantity information.

## Root factorization

```text
amount-composition-use
  := system or sample boundary
   x specified entity or component
   x requested quantity kind
   x numerator basis
   x denominator basis
   x total-mixture definition
   x preparation and measurement state
   x temperature and pressure where volume matters
   x unit and display scale
   x uncertainty
```

## Contrast table

| Pair | Shared feature | Decisive distinction |
|---|---|---|
| Count vs. amount of substance | both concern specified entities | integer number in `1` vs. base quantity in `mol` |
| Amount concentration vs. mass concentration | same component and volume role | substance amount numerator vs. mass numerator |
| Mass concentration vs. mass density | both may use `kg m^-3` | named component per mixture volume vs. total selected material mass per occupied volume |
| Concentration vs. fraction | both compare a component to a basis | unlike-kind per-volume rate vs. like-kind part-whole ratio |
| Amount fraction vs. mass fraction | both are dimension one | mole basis vs. mass basis |
| Volume fraction vs. final-volume quotient | both involve volume | declared component-volume convention vs. potentially nonadditive final mixture volume |

## Diagnostic examples

- One mole of oxygen atoms and one mole of oxygen molecules contain the same
  number of specified entities but not the same number of atoms.
- A solute can have a small mass fraction and a different numerical amount
  fraction because molar masses differ.
- `5 g/L` is a mass concentration, not a mass fraction.
- A component mass concentration and a mixture mass density can share units
  while naming different numerators.
- Percent by mass, percent by amount, and percent by volume are incomplete
  unless the basis is stated.
- Volumes measured before mixing may not sum to the final solution volume.

## Formula view

The linked [Amount and Composition Formula Table](../formulas/amount-concentration-composition.md)
owns entity-count conversion, concentration, and composition-fraction
relations.

## Selection procedure

1. Select the sample or mixture boundary.
2. Name the entity or component.
3. Decide whether the target is a total, a per-volume quantity, or a
   part-whole share.
4. Select count, substance amount, mass, or volume as the quantity basis.
5. For concentration, use the declared mixture volume at stated conditions.
6. For a fraction, use the matching like-kind total.
7. State any before-mixing or after-mixing volume convention.
8. Label units, percent scaling, significant figures, and uncertainty.

## Reference Delta

| Reference form | Typical contribution | Factorium delta |
|---|---|---|
| Dictionary | Defines amount, count, concentration, composition, and fraction | Separates technical quantity senses from broad "how much" language |
| Thesaurus | Links quantity, number, strength, proportion, content, and mixture | Prevents lexical proximity from erasing numerator and denominator bases |
| Encyclopedia or textbook | Explains moles, mixtures, solutions, and conversions | Supplies a compact quantity-selection ladder and failure diagnostics |
| Formula sheet | Lists `n = N/N_A`, `c = n/V`, and fraction formulas | Adds entity identity, component role, mixture boundary, state, and unit contracts |
| SI/IUPAC reference | Owns quantity names, units, and chemical terminology | Connects authority to one navigable comparison across totals, concentrations, and fractions |

## Constraints and failure signs

- Amount of substance always names the elementary entities.
- Count and amount of substance are different quantity kinds.
- Unqualified concentration does not reveal its numerator basis.
- Component and mixture boundaries remain consistent.
- Concentration volume uses stated temperature, pressure, and preparation
  conditions when relevant.
- Composition fractions use like-kind numerator and denominator quantities.
- A percent value states a scale but not whether the basis is amount, mass, or
  volume.
- Shared units do not make component concentration identical to bulk density.
- Volume nonadditivity is not hidden by an informal fraction formula.

## Cross-references

- [Stock, Flow, Accumulation, Balance, and Conservation](stock-flow-balance.md)
- [Comparative Quantity](comparative-quantity.md)
- [Matter and Load Measure](matter-load-measure.md)
- [Geometric Measure](geometric-measure.md)
- [Measure](../roots/measure.md)
- [Boundary](../roots/boundary.md)
- [Relation](../roots/relation.md)
- [Chemical Entity, Substance, Compound Class, Mixture, and Solution](chemical-substance-classification.md)
- [Chemical Reaction, Stoichiometry, Extent, Rate, Equilibrium, and Catalyst](chemical-reaction-stoichiometry-equilibrium.md)
- molar mass - `unresolved-candidate`

## Sources and provenance

1. NIST, "SI Units - Amount of Substance":
   https://www.nist.gov/pml/owm/si-units-amount-substance
2. IUPAC Gold Book, "amount of substance":
   https://goldbook.iupac.org/terms/view/A00297
3. IUPAC, *Compendium of Analytical Nomenclature*, quantities and units:
   https://media.iupac.org/publications/analytical_compendium/Cha01sec37.pdf
4. BIPM, *SI Brochure*:
   https://www.bipm.org/en/publications/si-brochure

Comparator access date: 2026-08-14. SI and IUPAC quantity conventions are
established within source scope; Factorium organization remains `candidate`.


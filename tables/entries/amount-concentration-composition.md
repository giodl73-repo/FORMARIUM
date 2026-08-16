# Amount, Concentration, and Composition

Status: candidate anchor entry

## Orientation

Count, amount of substance, concentration, and composition all answer "how
much" questions, but they use different quantity kinds and denominator roles.
A count enumerates specified entities; amount of substance scales that count
in moles; concentration normalizes a named component by mixture volume; a
composition fraction compares a component with a like-kind total. Molar mass
connects a specified material's mass to its amount of substance; it is not a
dimensionless relative mass or a context-free property of an unnamed sample.

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
| `molar-mass` | What mass corresponds to one amount of substance for this specified material or entity definition? | mass-per-amount bridge | `kg mol^-1` |

## Quantity ladder

```text
specified entity count
  -- divided by Avogadro constant --> amount of substance

component quantity
  -- divided by mixture volume --> concentration
  -- divided by total like-kind quantity --> composition fraction

specified material mass and amount of substance
  -- related by molar mass --> mass/amount conversion

component fractions and component molar masses
  -- transformed with explicit weighting --> another composition basis
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
   x molar-mass subject, entity definition, formula, composition, and state
   x mass and amount values, units, and uncertainties
   x molar-mass source, value, unit, and validity scope
   x conversion direction, component set, and weighting basis
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
| Amount fraction vs. mass fraction | both are dimension one and can be converted with component molar masses | amount-weighted composition vs. mass-weighted composition |
| Volume fraction vs. final-volume quotient | both involve volume | declared component-volume convention vs. potentially nonadditive final mixture volume |
| Molar mass vs. mass | both use mass in their description | mass-per-amount property for a specified material vs. amount of mass in a sample |
| Molar mass vs. relative molecular mass | numerical values may coincide in `g mol^-1` | dimensioned mass per amount vs. dimension-one entity-mass ratio |
| Molar mass vs. mass concentration | both can connect mass and substance amount | `kg mol^-1` material bridge vs. `kg m^-3` component per mixture volume |

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
- Equal amount fractions do not imply equal mass fractions when component
  molar masses differ.
- A bare tabulated number does not identify whether it is molar mass in
  `g mol^-1` or relative molecular mass with unit one.

## Formula view

The linked [Amount and Composition Formula Table](../formulas/amount-concentration-composition.md)
owns entity-count conversion, concentration, composition-fraction, molar-mass,
and composition-basis conversion relations.

## Selection procedure

1. Select the sample or mixture boundary.
2. Name the entity or component.
3. Decide whether the target is a total, a per-volume quantity, or a
   part-whole share.
4. Select count, substance amount, mass, or volume as the quantity basis.
5. For concentration, use the declared mixture volume at stated conditions.
6. For a fraction, use the matching like-kind total.
7. State any before-mixing or after-mixing volume convention.
8. For molar mass, specify the material/entity definition, formula or
   composition model, state where relevant, value source, and unit.
9. For a composition-basis conversion, require one consistent exhaustive
   component set and component molar masses on the same identity basis.
10. Label units, percent scaling, significant figures, and uncertainty.

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
- Molar mass retains its specified material or entity identity and the unit
  `kg mol^-1` or an explicitly converted equivalent.
- Molar mass and relative molecular mass remain different quantity kinds even
  when their numerical values happen to match under one unit convention.
- Mass/amount and amount/mass conversions reject zero or invalid divisors and
  propagate input and molar-mass uncertainty.
- Composition-basis conversions preserve the component set, normalization,
  weighting direction, and remainder policy.

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

## Sources and provenance

1. NIST, "SI Units - Amount of Substance":
   https://www.nist.gov/pml/owm/si-units-amount-substance
2. IUPAC Gold Book, "amount of substance":
   https://goldbook.iupac.org/terms/view/A00297
3. IUPAC, *Compendium of Analytical Nomenclature*, quantities and units:
   https://media.iupac.org/publications/analytical_compendium/Cha01sec37.pdf
4. BIPM, *SI Brochure*:
   https://www.bipm.org/en/publications/si-brochure
5. IUPAC Gold Book, "molar mass":
   https://goldbook.iupac.org/terms/view/12214
6. IUPAC Gold Book, "fraction":
   https://goldbook.iupac.org/terms/view/F02494
7. IUPAC Gold Book, "relative molecular mass":
   https://goldbook.iupac.org/terms/view/M04000

Comparator access date: 2026-08-15. SI and IUPAC quantity conventions are
established within source scope; Factorium organization remains `candidate`.


# Amount, Concentration, and Composition Relations

Status: candidate Formula Table

Primary family: Formula Table

Canonical headword:
[Amount, Concentration, and Composition](../entries/amount-concentration-composition.md)

## Orientation

These relations connect a specified entity count to amount of substance and
separate component-per-volume concentrations from like-kind composition
fractions. They also connect mass and substance amount through molar mass and
convert between mass- and amount-fraction bases. Every use requires an entity
or component, a system boundary, and an explicit numerator and denominator
basis.

## Core relations

| Quantity | Canonical expression | Relation kind |
|---|---|---|
| Amount of substance | `n = N / N_A` | definition through the SI mole |
| Entity count | `N = n N_A` | equivalent form |
| Amount concentration | `c_i = n_i / V_mix` | definition |
| Mass concentration | `gamma_i = m_i / V_mix` | definition |
| Amount fraction | `x_i = n_i / sum_j(n_j)` | definition |
| Mass fraction | `w_i = m_i / sum_j(m_j)` | definition |
| Declared volume fraction | `phi_i = V_i / sum_j(V_j)` | definition under stated volume convention |
| Fraction closure | `sum_i(x_i) = 1`, `sum_i(w_i) = 1` | constraint for an exhaustive component set |
| Molar mass | `M_B = m_B / n_B` | definition for specified material or entities `B` |
| Amount from mass | `n_B = m_B / M_B` | equivalent form for nonzero `M_B` |
| Mass from amount | `m_B = n_B M_B` | equivalent form |
| Mixture mean molar mass | `M_mix = sum_i(x_i M_i)` | amount-fraction-weighted relation for an exhaustive component set |
| Mass fraction from amount fraction | `w_i = x_i M_i / sum_j(x_j M_j)` | normalized basis transformation |
| Amount fraction from mass fraction | `x_i = (w_i / M_i) / sum_j(w_j / M_j)` | normalized basis transformation for positive `M_i` |

## Symbol contract

| Symbol | Meaning | Kind | SI unit | Restriction |
|---|---|---|---|---|
| `N` | number of specified entities | nonnegative integer count | `1` | entity definition required |
| `n`, `n_i` | amount of substance, total or component `i` | scalar base quantity | `mol` | specified entities required |
| `N_A` | Avogadro constant | exact physical constant | `mol^-1` | exactly `6.02214076 x 10^23 mol^-1` |
| `m_i` | mass of component `i` | scalar | `kg` | same mixture boundary |
| `V_mix` | volume of the mixture or solution | scalar | `m^3` | state and preparation basis declared |
| `V_i` | declared component volume | scalar | `m^3` | before/after mixing convention declared |
| `c_i` | amount concentration of component `i` | scalar | `mol m^-3` | component per mixture volume |
| `gamma_i` | mass concentration of component `i` | scalar | `kg m^-3` | not automatically bulk density |
| `x_i`, `w_i`, `phi_i` | amount, mass, or volume fraction | scalar | `1` | matching numerator and total basis |
| `m_B` | mass of specified material or entities `B` | scalar | `kg` | same subject and boundary as `n_B` |
| `M_B`, `M_i` | molar mass of specified material or component | positive scalar | `kg mol^-1` | identity, composition/state model, source, and uncertainty declared |
| `M_mix` | mean molar mass of the mixture | positive scalar | `kg mol^-1` | exhaustive amount-fraction basis |

## Dimensional audit

```text
[N / N_A] = 1 / mol^-1 = mol
[n_i / V] = mol m^-3
[m_i / V] = kg m^-3
[n_i / sum(n_j)] = mol / mol = 1
[m_i / sum(m_j)] = kg / kg = 1
[m_B / n_B] = kg mol^-1
[m_B / M_B] = kg / (kg mol^-1) = mol
[x_i M_i / sum(x_j M_j)] = (1 kg mol^-1) / (kg mol^-1) = 1
```

## Basis contract

```text
concentration
  := named component quantity / mixture volume

composition fraction
  := named component quantity / total quantity of the same kind
```

For an exhaustive mutually exclusive component set, amount and mass fractions
sum to one. A partial list does not satisfy that closure condition.

## Molar-mass and basis contract

```text
molar mass
  := mass of specified material / amount of that same specified material

composition-basis transformation
  := component fraction x component molar mass
   / sum of all consistently weighted components
```

The specified entities, material identity, formula or composition model, and
component set must remain consistent. Molar mass carries `kg mol^-1`; relative
molecular mass carries unit one. Equal numerical values under a `g mol^-1`
convention do not make those quantity kinds identical.

## Volume-fraction scope

Volume can depend on temperature and pressure, and component volumes may not
be additive after mixing. A volume fraction therefore states:

- the component-volume definition;
- the measurement state;
- whether values refer to components before mixing or to another declared
  convention;
- whether the component set is exhaustive.

## Failure signs

- `mol` is treated as a count rather than an amount-of-substance unit.
- The elementary entity is omitted.
- The word concentration appears without amount, mass, number, or another
  numerator basis.
- Component mass concentration is substituted for mixture density merely
  because the units match.
- A percentage is reported without amount, mass, or volume basis.
- Fraction numerator and denominator use different quantity kinds.
- Fractions from a nonexhaustive component list are forced to sum to one.
- Molar mass is used without identifying the material, entity, or composition
  basis.
- Relative molecular mass is supplied as though it carried `g mol^-1` merely
  because its numerical value matches a molar-mass value in that unit.
- Mass and amount are converted with a molar mass for a different component or
  state model.
- Mass and amount fractions are interconverted with an incomplete, overlapping,
  or inconsistently ordered component set.
- Before-mixing volumes are equated with final mixture volume without a stated
  model.

## Reference Delta

The canonical
[Amount, Concentration, and Composition entry](../entries/amount-concentration-composition.md)
owns the full comparison. Relative to a formula sheet, this view adds entity,
component, mixture, basis, state, closure, and volume-additivity contracts.

## Sources and provenance

1. NIST, "SI Units - Amount of Substance":
   https://www.nist.gov/pml/owm/si-units-amount-substance
2. IUPAC Gold Book, "amount of substance":
   https://goldbook.iupac.org/terms/view/A00297
3. IUPAC, *Compendium of Analytical Nomenclature*, quantities and units:
   https://media.iupac.org/publications/analytical_compendium/Cha01sec37.pdf
4. IUPAC Gold Book, "molar mass":
   https://goldbook.iupac.org/terms/view/12214
5. IUPAC Gold Book, "fraction":
   https://goldbook.iupac.org/terms/view/F02494
6. IUPAC Gold Book, "amount fraction":
   https://goldbook.iupac.org/terms/view/M04003
7. IUPAC Gold Book, "mass fraction":
   https://goldbook.iupac.org/terms/view/M03722

Formula authority: SI and IUPAC definitions within stated scope. Factorium
presentation remains `candidate`.

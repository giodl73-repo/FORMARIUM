# Aqueous Solution Amount-Concentration Guide

Guide ID: `aqueous-solution-amount-concentration`

Status: candidate Factor Guide

Review: fixed point at
`context/waves/2026-08-13-factorium-vision/SOLUTION-CONCENTRATION-GUIDE-ROLE-REVIEW.md`

## Local problem and decision

Select and calculate the quantity needed to specify an aqueous sodium chloride
solution with target amount concentration `0.100 mol/L` and final solution
volume `500 mL` at a recorded laboratory temperature.

The decision is which canonical quantity sense and relation apply. This is not
a preparation procedure, safety instruction, or certified reference recipe.

Intended reader: laboratory analyst or technical writer checking quantity
language before a procedure is authored.

## Local evidence

- specified component: sodium chloride, with elementary entity definition to
  be recorded by the laboratory;
- requested report: amount concentration;
- target value: `0.100 mol/L`;
- mixture boundary: final prepared solution;
- target final volume: `500 mL = 0.500 L`;
- preparation and measurement temperature: required local record;
- component mass, purity correction, and molar mass are not supplied;
- uncertainty budget and volumetric-equipment class are not supplied.

## Canonical trace

| Guide concern | Canonical source |
|---|---|
| Quantity selection | [`amount-concentration-composition#amount-concentration`](../tables/entries/amount-concentration-composition.md) |
| Relation and units | [`formula-amount-concentration-composition`](../tables/formulas/amount-concentration-composition.md) |
| Ratio/rate denominator discipline | [`comparative-quantity#rate`](../tables/entries/comparative-quantity.md) |
| Final volume meaning | [`geometric-measure#volume`](../tables/entries/geometric-measure.md) |
| SI exact constants if entity count is later requested | [`reference-value-si-defining-constants`](../tables/values/si-defining-constants.md) |

## Narrowing record

| Alternative | Canonical source | Local evidence | Disposition | Rationale |
|---|---|---|---|---|
| `entity-count` | Amount and composition entry | No discrete entity count is requested | not-applicable | Would require entity conversion and Avogadro constant |
| `amount-of-substance` | Amount and composition entry | Component amount is needed as an intermediate total | retained-option | It is calculated but is not the requested report |
| `amount-concentration` | Amount and composition entry | Target is moles of component per final solution volume | selected | Numerator and denominator match exactly |
| `mass-concentration` | Amount and composition entry | Component mass and molar mass are not supplied | rejected | Different numerator quantity and unit |
| `amount-fraction` | Amount and composition entry | No total amount over all components is supplied | rejected | Part-whole denominator differs from final volume |
| `mass-fraction` | Amount and composition entry | No total mixture mass is supplied | rejected | Same percent surface could hide a different basis |
| `volume-fraction` | Amount and composition entry | Solute/solution volume convention is not requested | rejected | Component volumes may be nonadditive |

## Selected relation

```text
c_NaCl = n_NaCl / V_solution
n_NaCl = c_NaCl V_solution
```

Using the supplied values:

```text
n_NaCl
  = 0.100 mol/L x 0.500 L
  = 0.0500 mol
```

Equivalent SI-unit check:

```text
0.100 mol/L = 100 mol/m^3
500 mL = 5.00 x 10^-4 m^3
100 mol/m^3 x 5.00 x 10^-4 m^3 = 0.0500 mol
```

The calculation determines an amount of substance. It does not determine the
weighed mass until an authoritative molar mass, material identity, and purity
correction are supplied.

## Factor and record assignment

| Canonical factor | Role in this guide | Laboratory record field | Required condition |
|---|---|---|---|
| `system-or-sample-boundary` | boundary | final prepared solution | Denominator is final mixture volume, not initial solvent volume |
| `specified-entity-or-component` | identity/context | sodium chloride entity definition and material identifier | Formula unit, species, or another entity convention is explicit |
| `requested-quantity-kind` | pivot | `amount-concentration` | Report label and unit use the same quantity kind |
| `numerator-basis` | component quantity | amount of substance in `mol` | No silent substitution of mass |
| `denominator-basis` | rate denominator | final solution volume in `L` or `m^3` | Volume belongs to the stated mixture and state |
| `total-mixture-definition` | boundary/context | exhaustive final solution batch | Aliquot and stock-solution boundaries are not mixed |
| `preparation-and-measurement-state` | context | preparation state and observation time | Evaporation or incomplete dissolution is visible |
| `temperature-and-pressure-where-volume-matters` | context | recorded laboratory temperature; pressure if material | Volume condition accompanies reported concentration |
| `unit-and-display-scale` | constraint/display | `mol/L`, with conversion to SI available | Prefix and decimal scale are explicit |
| `uncertainty` | constraint/evidence | pending uncertainty budget | Candidate report is not promoted to certified value |

## Required controls

- The final solution volume, not solvent volume before mixing, owns the
  denominator.
- The component and elementary entity are explicit.
- Amount concentration is labeled `mol/L` or an equivalent unambiguous unit.
- Glassware calibration, temperature, purity, weighing, transfer loss, and
  uncertainty belong to the later procedure and measurement record.
- The value `0.0500 mol` is an intermediate derived amount, not a measured
  concentration result.
- Converting amount to mass requires a sourced molar mass and material-purity
  model.

## Change tests

| Scenario | Expected change | Must remain stable |
|---|---|---|
| Final solution volume becomes `1.000 L` at the same concentration | required amount becomes `0.100 mol` | selected amount-concentration sense |
| Requirement changes to `0.100%` by mass | select mass fraction and obtain total mixture mass | sodium chloride component identity |
| Requirement changes to `0.100 g/L` | select mass concentration | final-volume boundary |
| Only `500 mL` of solvent is measured before dissolution | guide fails denominator validation | requested quantity name |
| Solution loses volume by evaporation before reporting | state, volume, and resulting concentration must be reassessed | original preparation target |
| Reader requests number of formula units | entity-count view and exact Avogadro constant become applicable | amount result can remain an intermediate |

## Rejected shortcuts

- treating `0.100 mol/L` as a fraction or percentage;
- using `500 mL` of solvent as `V_solution`;
- reporting `0.0500 mol` as the concentration;
- converting to grams from an uncited remembered molar mass;
- omitting the specified entity;
- forcing volume fractions to close when component volumes are not additive;
- presenting this guide as a laboratory safety or preparation procedure.

## Unresolved choices

- authoritative sodium chloride molar mass and material form;
- purity and moisture correction;
- equipment class and calibration;
- preparation temperature and allowed tolerance;
- uncertainty budget;
- safety and disposal procedure.

## Sources

1. NIST, "SI Units - Amount of Substance":
   https://www.nist.gov/pml/owm/si-units-amount-substance
2. IUPAC Gold Book, "amount of substance":
   https://goldbook.iupac.org/terms/view/A00297
3. IUPAC, *Compendium of Analytical Nomenclature*, quantities and units:
   https://media.iupac.org/publications/analytical_compendium/Cha01sec37.pdf
4. Factorium canonical sources listed in the trace table.

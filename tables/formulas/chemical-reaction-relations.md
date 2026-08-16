# Chemical Reaction Relations

Status: candidate Formula Table

Primary family: Formula Table

Canonical headword: [Chemical Reaction, Stoichiometry, Extent, Rate, Equilibrium, and Catalyst](../entries/chemical-reaction-stoichiometry-equilibrium.md)

Canonical senses: `stoichiometric-number`, `stoichiometry`, `reaction-extent`,
`reaction-rate`, `chemical-equilibrium`, `equilibrium-constant`,
`thermodynamic-activity`

## Governing question

Which declared reaction equation, amount basis, time normalization, activity
convention, and condition set makes a stoichiometric, rate, or equilibrium
relation valid?

## Symbol contract

| Symbol | Meaning | Unit or status |
|---|---|---|
| `B` | selected reaction species | identity |
| `nu_B` | signed stoichiometric number for `B` | one; negative reactant, positive product |
| `n_B` | amount of substance of `B` | `mol` |
| `xi` | extent of reaction for the declared equation | `mol` |
| `t` | time | `s` |
| `V` | declared system volume when constant-volume normalization applies | `m^3` |
| `a_B` | relative thermodynamic activity of `B` | one, relative to declared standard state |
| `Q` | activity reaction quotient for current state | one |
| `K` | thermodynamic equilibrium constant for the declared reaction | one |
| `Delta_r G` | reaction Gibbs energy | `J mol^-1` under stated convention |
| `Delta_r G°` | standard reaction Gibbs energy | `J mol^-1` |
| `R` | molar gas constant | `J mol^-1 K^-1` |
| `T` | thermodynamic temperature | `K` |

## Relations

### Stoichiometric amount change and extent

```text
dn_B = nu_B dxi
dxi = dn_B / nu_B
```

Every participating species must give the same `dxi` for a valid single-reaction
description. Rescaling the whole equation rescales `nu_B` and the numerical
extent, so the equation version is part of the quantity contract.

### Rate of conversion and constant-volume reaction rate

```text
dot(xi) = dxi/dt = (1/nu_B) dn_B/dt
v = (1/V) dxi/dt
```

The second relation is restricted to the declared constant-volume treatment.
For complex reactions with accumulating intermediates or side products, report
the observed species' appearance or disappearance rate instead of forcing one `v`.

### Activity quotient and equilibrium

```text
Q = product over B of (a_B)^(nu_B)
Delta_r G = Delta_r G° + R T ln Q
at equilibrium: Delta_r G = 0 and Q = K
K = exp(-Delta_r G° / (R T))
```

All activities are dimensionless relative quantities under declared standard
states. Reversing or rescaling the reaction changes the corresponding `Q`, `K`,
and standard reaction quantity consistently.

## Formula-selection procedure

1. Freeze the balanced equation, direction, scaling, species, phases, and conditions.
2. Assign signed stoichiometric numbers and verify element and charge accounting.
3. Use extent only when one progress coordinate adequately describes the selected change.
4. State whether the rate is total conversion rate, volume-normalized reaction rate,
   or one species' appearance/disappearance rate.
5. For `Q` or `K`, state the activity model, standard states, phase convention,
   temperature, pressure, and any approximations replacing activity with another quantity.
6. Keep exact symbolic relations separate from measured values and uncertainty.
7. Treat catalytic effects as kinetic comparisons; do not alter `K` solely because a catalyst is present.

## Failure signs

- unsigned coefficients are substituted for signed `nu_B`;
- equation scaling changes but extent or `K` interpretation does not;
- concentration is inserted as activity without a stated approximation and standard state;
- a dimensional concentration product is called the thermodynamic `K` without normalization;
- species rate and reaction rate omit their coefficient relation;
- a variable-volume system uses constant-volume `v` silently;
- `Q = K` is asserted away from equilibrium;
- a catalyst is claimed to change `Delta_r G°` or `K` under unchanged conditions.

## Sources and provenance

1. IUPAC Gold Book, stoichiometric number: https://goldbook.iupac.org/terms/view/S06025
2. IUPAC Gold Book, extent of reaction: https://goldbook.iupac.org/terms/view/E02283
3. IUPAC Gold Book, rate of reaction: https://goldbook.iupac.org/terms/view/R05156
4. IUPAC Gold Book, thermodynamic activity: https://goldbook.iupac.org/terms/view/A00115
5. IUPAC Gold Book, equilibrium constant: https://goldbook.iupac.org/terms/view/E02177

These relations are compact scoped references, not a kinetic model,
equilibrium calculation certificate, mechanism proof, or safety analysis.


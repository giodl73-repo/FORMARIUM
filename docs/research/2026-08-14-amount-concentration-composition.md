# Amount, Concentration, and Composition Research

Status: candidate research basis

## Research question

How should Factorium separate discrete count, amount of substance,
concentration, and composition so readers do not interchange totals,
per-volume quantities, and part-whole fractions?

Decision supported: whether to publish one connected anchor with a Formula
Table while preserving separate quantity kinds, component identity, mixture
boundary, denominator basis, and preparation state.

## Local evidence

- `tables/entries/comparative-quantity.md` establishes ordered numerator and
  denominator roles, unit behavior, and denominator-domain checks.
- `tables/entries/matter-load-measure.md` separates total mass from mass per
  occupied volume.
- `tables/formulas/density.md` establishes boundary and averaging requirements
  for average mass density.
- `specs/FORMULA-TABLE-ENTRY.md` requires relation kind, symbols, units,
  dimensions, scope, assumptions, and provenance.

## Findings

### FACTORIUM-ACC-01 - Count and amount of substance are not the same quantity

Source:

- NIST, "SI Units - Amount of Substance":
  https://www.nist.gov/pml/owm/si-units-amount-substance
- IUPAC Gold Book, "amount of substance":
  https://goldbook.iupac.org/terms/view/A00297

Observed constraint: a number of specified entities is a count, while amount
of substance is an SI base quantity measured in moles. Their connection uses
the exactly fixed Avogadro constant.

Implication: Factorium must require the entity specification and preserve
`N`, `n`, and `N_A` as different concepts.

Confidence: high.

### FACTORIUM-ACC-02 - The entity must be specified

Source:

- NIST, "SI Units - Amount of Substance":
  https://www.nist.gov/pml/owm/si-units-amount-substance

Observed constraint: elementary entities may be atoms, molecules, ions,
electrons, other particles, or specified groups. A mole value without an
entity description is incomplete.

Implication: entity identity is a required semantic factor, not optional
notation.

Confidence: high.

### FACTORIUM-ACC-03 - Concentration requires both component and volume basis

Source:

- IUPAC analytical nomenclature, quantities and units:
  https://media.iupac.org/publications/analytical_compendium/Cha01sec37.pdf

Observed constraint: amount concentration and mass concentration divide a
component quantity by mixture or solution volume. They differ in numerator
quantity and unit.

Implication: the unqualified word `concentration` should not silently choose
amount, mass, number, or another numerator basis.

Confidence: high.

### FACTORIUM-ACC-04 - Density and mass concentration can share units

Source:

- IUPAC analytical nomenclature, quantities and units:
  https://media.iupac.org/publications/analytical_compendium/Cha01sec37.pdf
- `tables/entries/matter-load-measure.md`

Observed constraint: both may use `kg m^-3`, but bulk mass density concerns
the selected material or mixture, while component mass concentration concerns
a named component per mixture volume.

Implication: identical dimensions and units do not collapse subject role or
boundary.

Confidence: high.

### FACTORIUM-ACC-05 - Composition fractions require a declared basis

Source:

- IUPAC analytical nomenclature, quantities and units:
  https://media.iupac.org/publications/analytical_compendium/Cha01sec37.pdf

Observed constraint: amount fraction, mass fraction, and volume fraction are
different dimension-one quantities. The numerator and total must use the same
quantity basis.

Implication: `fraction` and `%` are representations only after the component,
whole, and amount/mass/volume basis are known.

Confidence: high.

### FACTORIUM-ACC-06 - Volume fractions require preparation-state care

Source:

- IUPAC analytical nomenclature, quantities and units:
  https://media.iupac.org/publications/analytical_compendium/Cha01sec37.pdf

Observed constraint: component volumes may not be simply additive after
mixing. A volume-fraction definition therefore needs the specified component
volume convention and state.

Implication: Factorium must expose temperature, pressure, and before/after
mixing conventions rather than treat volume fraction as universally
interchangeable with a measured final-volume quotient.

Confidence: high.

### FACTORIUM-ACC-07 - Fractions and concentrations answer different questions

Source:

- `tables/entries/comparative-quantity.md`
- IUPAC analytical nomenclature, quantities and units:
  https://media.iupac.org/publications/analytical_compendium/Cha01sec37.pdf

Observed constraint: a composition fraction is component quantity divided by
total like-kind quantity; a concentration is component quantity divided by
mixture volume and retains quotient units.

Implication: both are comparative quantities, but they require different
denominator roles and cannot be converted without additional mixture data.

Confidence: high.

## Recommendations

### Adopt now

- Publish one anchor separating count, amount of substance, concentration, and
  composition fraction.
- Require entity, component, total mixture, numerator basis, denominator basis,
  state conditions, and units.
- Link bulk density and general comparative-quantity entries rather than
  duplicate their authority.

Owner: Factorium.

Validation: Equation & Units Auditor, Domain Source Reviewer, Reference
Lexicographer, local link validation, and role-registry validation.

### Prototype behind a compatibility boundary

- Treat number concentration and other specialized concentration kinds as
  extensible views after the core numerator/denominator contract is stable.
- Defer machine-readable quantity-kind identifiers to roadmap R2.

### Reject or defer

- Reject unqualified `concentration = amount / volume` as a universal
  definition.
- Reject percentage alone as a complete composition specification.
- Defer detailed solution thermodynamics, activities, molality, and partial
  molar quantities to later chemistry entries.

## Non-goals

- teaching stoichiometry or analytical chemistry;
- defining every concentration convention;
- claiming that amount of substance is ordinary-language "amount";
- replacing IUPAC or SI authority.


# Electrical Quantity Cluster Research

Status: candidate research basis

## Research question

How should Factorium connect electric charge, current, potential difference,
resistance, electrical power, and electrical energy without treating voltage
as current, resistance as universal, or power as stored energy?

Decision supported: promotion of the existing Ohm's-law Formula pilot into a
full electrical anchor with a separate general electrical-quantity Formula
view.

## Local evidence

- `tables/formulas/ohms-law.md` already classifies `V = I R` as an empirical
  constitutive relation for ohmic behavior.
- `tables/entries/work-energy-power.md` separates energy state/accounting from
  transfer and power rate.
- `tables/entries/comparative-quantity.md` distinguishes a rate from its
  numerator quantity.
- `specs/FORMULA-TABLE-ENTRY.md` requires terminal, sign, unit, scope, and
  excluded-regime contracts.

## Findings

### FACTORIUM-EQ-01 - Charge and current are quantity and flow rate

Source:

- OpenStax, *University Physics Volume 2*, section 9.1:
  https://openstax.org/books/university-physics-volume-2/pages/9-1-electrical-current

Observed constraint: average current is charge crossing a selected surface per
time and instantaneous current is `dQ/dt`. Conventional current direction is
the direction positive charge would move, which may differ from electron
motion.

Implication: current requires surface, orientation, time basis, and direction
convention; it is not "amount of electricity."

Confidence: high.

### FACTORIUM-EQ-02 - Potential difference is energy change per charge

Source:

- OpenStax, *University Physics Volume 2*, electric potential:
  https://openstax.org/books/university-physics-volume-2/pages/7-1-electric-potential-energy
  https://openstax.org/books/university-physics-volume-2/pages/7-2-electric-potential-and-potential-difference

Observed constraint: electric potential difference relates a change in
potential energy to charge and is measured between two points.

Implication: "voltage" requires a terminal pair, ordering/polarity, and energy
per charge interpretation; it is not a flow.

Confidence: high.

### FACTORIUM-EQ-03 - Ohm's law is a bounded empirical relation

Source:

- OpenStax, *University Physics Volume 2*, section 9.4:
  https://openstax.org/books/university-physics-volume-2/pages/9-4-ohms-law
- `tables/formulas/ohms-law.md`

Observed constraint: many materials and devices are nonohmic, and resistance
can depend on temperature and operating state. A single `V/I` ratio does not
establish a constant linear relation.

Implication: resistance must remain a scoped component parameter or operating
point quantity rather than a universal opposition concept.

Confidence: high.

### FACTORIUM-EQ-04 - Electrical power is energy-transfer rate

Source:

- OpenStax, *University Physics Volume 2*, section 9.5:
  https://openstax.org/books/university-physics-volume-2/pages/9-5-electrical-energy-and-power
- `tables/entries/work-energy-power.md`

Observed constraint: electrical power is the time rate of energy transfer and
can be expressed as terminal voltage times current under a consistent sign
convention.

Implication: a watt rating is not an amount of energy; duration or integration
is needed to obtain energy.

Confidence: high.

### FACTORIUM-EQ-05 - Resistive power forms inherit Ohm's-law scope

Source:

- OpenStax, *University Physics Volume 2*, sections 9.4 and 9.5:
  https://openstax.org/books/university-physics-volume-2/pages/9-4-ohms-law
  https://openstax.org/books/university-physics-volume-2/pages/9-5-electrical-energy-and-power

Observed constraint: `P = I^2 R` and `P = V^2/R` result from combining
`P = V I` with an applicable Ohm relation. They are not unrestricted
definitions of power.

Implication: derived power forms must inherit component, terminal,
temperature, linearity, and nonzero-denominator restrictions.

Confidence: high.

### FACTORIUM-EQ-06 - Equal units do not reveal supplied or absorbed power

Source:

- OpenStax, *University Physics Volume 2*, section 9.5:
  https://openstax.org/books/university-physics-volume-2/pages/9-5-electrical-energy-and-power

Observed constraint: voltage polarity and current direction determine whether
a component absorbs or supplies energy under the chosen sign convention.

Implication: Factorium must expose reference directions and the passive sign
convention rather than report unsigned `VI` as a universal semantic result.

Confidence: high.

### FACTORIUM-EQ-07 - Electrical energy joins the general energy anchor

Source:

- OpenStax, *University Physics Volume 2*, section 9.5:
  https://openstax.org/books/university-physics-volume-2/pages/9-5-electrical-energy-and-power
- `tables/entries/work-energy-power.md`

Observed constraint: electrical energy may be transferred and converted into
thermal, mechanical, radiant, or stored forms. It remains energy measured in
joules, while kilowatt-hour is another energy unit.

Implication: the electrical cluster should specialize transfer channel and
terminal variables while deferring general energy semantics to the existing
anchor.

Confidence: high.

## Recommendations

### Adopt now

- Publish an Electrical Quantity anchor separating charge, current, potential
  difference, resistance, power, and transferred energy.
- Keep general electrical relations separate from the existing bounded
  Ohm's-law view.
- Link electrical power and energy to the general Work, Energy, and Power
  anchor.

Owner: Factorium.

Validation: Equation & Units Auditor, Domain Source Reviewer, role registry,
link validation, and fixed-point review.

### Prototype behind a compatibility boundary

- Leave capacitance, inductance, impedance, alternating-current RMS values,
  fields, and network laws to later anchors.
- Defer typed terminal and orientation records to R2.

### Reject or defer

- Reject voltage as "electrical pressure" when technical selection requires
  energy-per-charge and terminal polarity.
- Reject resistance as constant without an operating regime.
- Reject `P = I^2 R` and `P = V^2/R` outside inherited Ohm scope.

## Non-goals

- teaching circuit analysis or electromagnetism;
- defining every electrical quantity;
- replacing IEC, SI, or engineering standards;
- asserting one sign convention without declaring it.


# Work, Energy, and Power Cluster Research

Date: 2026-08-14

## Research question

How should Factorium organize physical work, energy, kinetic and potential
energy, and power so shared units do not collapse transfer, system state,
interaction configuration, and transfer rate?

Decision supported: publish one work-energy-power anchor and a linked
mechanical Formula Table.

## Sources

1. OpenStax, *University Physics Volume 1*, section 7.1, "Work":
   https://openstax.org/books/university-physics-volume-1/pages/7-1-work
2. OpenStax, *University Physics Volume 1*, section 7.3, "Work-Energy
   Theorem":
   https://openstax.org/books/university-physics-volume-1/pages/7-3-work-energy-theorem
3. OpenStax, *University Physics Volume 1*, section 7.4, "Power":
   https://openstax.org/books/university-physics-volume-1/pages/7-4-power
4. OpenStax, *University Physics Volume 1*, sections 8.1 through 8.3:
   https://openstax.org/books/university-physics-volume-1/pages/8-1-potential-energy-of-a-system
   https://openstax.org/books/university-physics-volume-1/pages/8-2-conservative-and-non-conservative-forces
   https://openstax.org/books/university-physics-volume-1/pages/8-3-conservation-of-energy
5. OpenStax, *University Physics Volume 1*, section 10.6, "Torque":
   https://openstax.org/books/university-physics-volume-1/pages/10-6-torque
6. NIST, *Guide for the Use of the International System of Units (SI)*,
   Special Publication 811:
   https://www.nist.gov/pml/special-publication-811

## Findings

### FACTORIUM-WEP-01 - Work is a transfer over a displacement

- Source: OpenStax section 7.1.
- Observation: infinitesimal mechanical work is the dot product of force and
  displacement, and finite work is accumulated along a path.
- Implication: force alone does not determine work. Path, displacement,
  direction, and the acting force must remain visible.
- Confidence: high within classical mechanics.

### FACTORIUM-WEP-02 - Work and energy share units but not semantic roles

- Sources: OpenStax sections 7.1 and 7.3; NIST SP 811.
- Observation: work and energy use joules and dimension `M L^2 T^-2`, while
  the work-energy theorem relates a transfer to a change in kinetic energy.
- Implication: a shared unit must not merge a process quantity with a system
  quantity.
- Confidence: high.

### FACTORIUM-WEP-03 - Kinetic energy is frame-dependent

- Source: OpenStax section 7.3.
- Observation: classical kinetic energy depends on speed, and speed depends on
  the selected reference frame.
- Implication: mass and speed are insufficient without a frame and model
  regime.
- Confidence: high within nonrelativistic mechanics.

### FACTORIUM-WEP-04 - Potential energy belongs to a system and reference

- Source: OpenStax section 8.1.
- Observation: potential energy describes interactions within a selected
  system. Its differences are physically meaningful, while the zero reference
  may be chosen for convenience.
- Implication: potential energy should not be assigned to an isolated object
  without naming the interacting system and zero convention.
- Confidence: high.

### FACTORIUM-WEP-05 - Power is a rate, not an amount

- Source: OpenStax section 7.4.
- Observation: average power divides transferred work or energy by elapsed
  time; instantaneous power is a time derivative and can equal a force-
  velocity dot product.
- Implication: equal energy transfers can have different power, and equal
  power ratings do not determine total energy without duration.
- Confidence: high.

### FACTORIUM-WEP-06 - Mechanical-energy conservation is conditional

- Sources: OpenStax sections 8.2 and 8.3.
- Observation: kinetic plus potential energy remains constant only under the
  stated system and work conditions. Nonconservative work changes mechanical
  energy, while broader total-energy accounting may include other forms.
- Implication: "energy is conserved" must name the system, included forms,
  boundary transfers, and whether the claim concerns mechanical or total
  energy.
- Confidence: high.

### FACTORIUM-WEP-07 - Work and torque can share `N m` without equivalence

- Sources: OpenStax sections 7.1 and 10.6.
- Observation: work uses a force-displacement dot product; torque uses a
  position-force cross product and has an axial direction.
- Implication: unit text alone cannot identify a quantity. Operators,
  orientation, and quantity kind are decisive.
- Confidence: high.

## Recommendations

### Adopt now

- Publish work, energy, kinetic energy, potential energy, and power as related
  but non-equivalent senses.
- Make transfer/state/rate role, system boundary, path, reference frame,
  potential zero, and time interval explicit.
- Include the work-energy theorem and a bounded mechanical-energy balance.

Owner: Factorium. Validation: operator, dimension, system-boundary, source,
role, and link review.

### Prototype behind a compatibility boundary

- Energy-flow diagrams generated from declared systems and boundaries.
- Unit-aware work and power calculators that preserve signed direction.
- Broader thermal, electrical, chemical, and radiative energy-family entries.

Owner: future Factorium Workbench. Validation: conservative and dissipative
fixtures, multiple frames, signed power, and energy-duration cases.

### Reject or defer

- Treating force as work without displacement.
- Treating joules as proof that two quantities have the same role.
- Reporting potential energy without a system or zero reference.
- Claiming mechanical energy is conserved while omitting nonconservative work.
- Inferring energy consumption from power without duration.

## Non-goals

- Relativistic energy.
- Full thermodynamics.
- Electrical-energy billing conventions.
- Rotational work and power beyond the torque contrast.


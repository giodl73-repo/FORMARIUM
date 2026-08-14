# Matter and Load Measure Cluster Research

Date: 2026-08-14

## Research question

How should Factorium organize mass, weight, mass density, and pressure so
ordinary language and shared formulas do not collapse a base quantity, a
gravitational force, a bulk ratio, and a distributed load?

Decision supported: publish one matter-and-load-measure anchor and a linked
Formula Table.

## Sources

1. NIST, "SI Units - Mass":
   https://www.nist.gov/pml/owm/si-units-mass
2. NIST, "SI Units":
   https://www.nist.gov/pml/owm/metric-si/si-units
3. OpenStax, *College Physics*, section 11.2, "Density":
   https://openstax.org/books/college-physics/pages/11-2-density
4. OpenStax, *College Physics*, section 11.3, "Pressure":
   https://openstax.org/books/college-physics/pages/11-3-pressure
5. OpenStax, *University Physics Volume 1*, section 5.3, "Newton's Second
   Law":
   https://openstax.org/books/university-physics-volume-1/pages/5-3-newtons-second-law

## Findings

### FACTORIUM-ML-01 - Mass and weight are different quantity kinds

- Source: NIST, "SI Units - Mass."
- Observation: mass is an inertial property measured in kilograms; weight is
  a force associated with local free-fall acceleration and is measured in
  newtons.
- Implication: ordinary uses of "weight" for mass must not control the
  technical sense graph.
- Confidence: high.

### FACTORIUM-ML-02 - Weight requires a gravitational context

- Sources: NIST mass guidance; OpenStax Newtonian mechanics.
- Observation: the Newtonian relation depends on mass and local gravitational
  acceleration. Its magnitude can change while mass remains the same.
- Implication: location, reference frame, and gravitational-field value are
  required factors for technical weight.
- Confidence: high within the stated Newtonian scope.

### FACTORIUM-ML-03 - Density is not mass or heaviness

- Source: OpenStax section 11.2.
- Observation: average mass density is mass divided by occupied volume.
  Equal masses can have different densities, and equal volumes can contain
  different masses.
- Implication: boundary, occupied volume, averaging scope, and material
  conditions must remain visible.
- Confidence: high.

### FACTORIUM-ML-04 - Pressure is distributed normal force

- Source: OpenStax section 11.3.
- Observation: pressure is force per area perpendicular to the force. Pressure
  is scalar, while the force exerted on a surface has a direction normal to
  that surface.
- Implication: total force, normal component, loaded area, and distribution
  cannot be collapsed into one number.
- Confidence: high for the introductory fluid-mechanics scope.

### FACTORIUM-ML-05 - Shared force does not make weight and pressure synonyms

- Sources: NIST SI guidance; OpenStax sections 11.2 and 11.3.
- Observation: weight has force dimension `M L T^-2`; pressure divides a
  normal force by area and has dimension `M L^-1 T^-2`.
- Implication: dimensional analysis provides an immediate distinction and
  catches missing-area errors.
- Confidence: high.

### FACTORIUM-ML-06 - A measuring instrument may report a derived quantity

- Source: NIST distinction between mass and weight.
- Observation: everyday "weighing" often means determining mass, even when an
  instrument responds to force and applies a calibration model.
- Implication: instrument response, inferred quantity, calibration context,
  and display label should be separate factors.
- Confidence: high for the distinction; instrument-specific behavior varies.

### FACTORIUM-ML-07 - Pressure is not the complete mechanics of a solid

- Source: scope of OpenStax section 11.3.
- Observation: the scalar pressure treatment is especially important for
  fluids and normal loading; broader solid mechanics uses stress descriptions
  that can include directional and shear components.
- Implication: Factorium should contrast pressure with stress and defer a
  complete stress-tensor treatment to a separate specialist entry.
- Confidence: high at the scope boundary.

## Recommendations

### Adopt now

- Publish mass, weight, average mass density, and pressure as distinct senses
  in one contrast cluster.
- Show quantity kind, dimension, SI unit, required context, and the operation
  that connects each measure to another.
- Reuse the existing force and density Formula Tables by linking them to the
  new canonical quantity anchor.

Owner: Factorium. Validation: dimensional audit, source review, fixed-point
role review, and local link validation.

### Prototype behind a compatibility boundary

- Instrument views separating sensor response from reported mass or force.
- Local-density fields and nonuniform pressure distributions.
- Hydrostatic pressure examples with explicit datum and sign conventions.

Owner: future Factorium Workbench. Validation: unit-aware fixtures,
nonuniform-load examples, and calibration metadata.

### Reject or defer

- Treating kilograms as units of force.
- Treating weight as invariant across gravitational contexts.
- Inferring density from mass alone.
- Computing pressure from total force without the perpendicular loaded area.
- Treating scalar pressure as a complete replacement for solid stress.

## Non-goals

- Relativistic definitions of mass.
- Full continuum mechanics or stress tensors.
- Legal metrology procedures for specific instruments.


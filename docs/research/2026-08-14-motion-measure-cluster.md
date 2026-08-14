# Motion Measure Cluster Research

Date: 2026-08-14

## Research question

How should Factorium organize position, distance, displacement, speed,
velocity, and acceleration so everyday synonymy does not erase path,
direction, reference-frame, or derivative distinctions?

Decision supported: publish one motion-measure anchor and a linked kinematics
Formula Table.

## Sources

1. OpenStax, *University Physics Volume 1*, section 3.1:
   https://openstax.org/books/university-physics-volume-1/pages/3-1-position-displacement-and-average-velocity
2. OpenStax, *University Physics Volume 1*, section 3.2:
   https://openstax.org/books/university-physics-volume-1/pages/3-2-instantaneous-velocity-and-speed
3. OpenStax, *University Physics Volume 1*, section 3.3:
   https://openstax.org/books/university-physics-volume-1/pages/3-3-average-and-instantaneous-acceleration
4. NIST, "SI Units - Length":
   https://www.nist.gov/pml/owm/si-units-length
5. NIST, "SI Units - Time":
   https://www.nist.gov/pml/owm/si-units-time

## Findings

### FACTORIUM-MM-01 - Position requires a reference frame

- Source: OpenStax section 3.1.
- Observation: position is stated relative to a chosen frame and coordinate
  system.
- Implication: no position, displacement, velocity, or acceleration entry is
  complete without frame and direction conventions.
- Confidence: high.

### FACTORIUM-MM-02 - Distance and displacement summarize different evidence

- Source: OpenStax section 3.1.
- Observation: displacement is final position minus initial position and is a
  vector; distance traveled is total path length and is scalar.
- Implication: path and endpoints must remain separate factors. A round trip
  can have zero displacement and nonzero distance.
- Confidence: high.

### FACTORIUM-MM-03 - Speed and velocity differ despite shared units

- Source: OpenStax section 3.2.
- Observation: average speed uses total distance; average velocity uses
  displacement. Instantaneous speed is the magnitude of instantaneous
  velocity.
- Implication: same dimension `L T^-1` and colloquial interchangeability do
  not establish semantic identity.
- Confidence: high.

### FACTORIUM-MM-04 - Acceleration tracks vector change

- Source: OpenStax section 3.3.
- Observation: acceleration occurs when velocity changes in magnitude,
  direction, or both. It need not point in the direction of motion.
- Implication: acceleration is not merely "speeding up," and negative
  acceleration does not universally mean slowing.
- Confidence: high.

### FACTORIUM-MM-05 - Average and instantaneous relations are different views

- Sources: OpenStax sections 3.1 through 3.3.
- Observation: average rates use finite changes over elapsed time;
  instantaneous velocity and acceleration use derivatives.
- Implication: formulas must classify average versus instantaneous and declare
  differentiability where derivatives are used.
- Confidence: high.

### FACTORIUM-MM-06 - Constant-acceleration equations need a visible regime

- Source: OpenStax kinematics treatment.
- Observation: familiar equations such as `v = v0 + a t` assume constant
  acceleration over the interval and compatible coordinates.
- Implication: they belong under a conditional formula family, not as
  unrestricted definitions of motion.
- Confidence: high.

## Recommendations

### Adopt now

- Publish six motion-measure senses.
- Preserve scalar/vector, path/endpoint, average/instantaneous, and
  frame-relative facets.
- Link acceleration to force without merging dynamics and kinematics.

Owner: Factorium. Validation: dimensional and vector audit, source review,
role review, and link validation.

### Prototype behind a compatibility boundary

- Motion-path examples that compute both distance and displacement.
- Graph-to-rate views for position, velocity, and acceleration.
- Unit-aware constant-acceleration calculators.

Owner: future Factorium Workbench. Validation: signed one-dimensional and
vector fixtures, round trips, and direction changes.

### Reject or defer

- Treating speed and velocity as synonyms in technical views.
- Calling every negative acceleration deceleration.
- Applying constant-acceleration formulas to variable acceleration.
- Reporting position without a reference frame.

## Non-goals

- Full multivariable kinematics.
- Relativistic motion.
- Numerical differentiation methods.


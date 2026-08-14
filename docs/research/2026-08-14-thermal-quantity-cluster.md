# Thermal Quantity Cluster Research

Date: 2026-08-14

## Research question

How should Factorium organize temperature, heat, internal energy, heat
capacity, specific heat, and entropy so state variables, transfers, material
response, and irreversibility remain distinct?

Decision supported: publish one thermal-quantity anchor and a linked
thermodynamic Formula Table.

## Sources

1. OpenStax, *University Physics Volume 2*, section 1.1:
   https://openstax.org/books/university-physics-volume-2/pages/1-1-temperature-and-thermal-equilibrium
2. OpenStax, *University Physics Volume 2*, section 1.4:
   https://openstax.org/books/university-physics-volume-2/pages/1-4-heat-transfer-specific-heat-and-calorimetry
3. OpenStax, *University Physics Volume 2*, sections 3.2 and 3.3:
   https://openstax.org/books/university-physics-volume-2/pages/3-2-work-heat-and-internal-energy
   https://openstax.org/books/university-physics-volume-2/pages/3-3-first-law-of-thermodynamics
4. OpenStax, *University Physics Volume 2*, section 4.6:
   https://openstax.org/books/university-physics-volume-2/pages/4-6-entropy
5. NIST, "SI Units - Temperature":
   https://www.nist.gov/pml/owm/si-units-temperature

## Findings

### FACTORIUM-TQ-01 - Temperature is not heat

- Sources: OpenStax sections 1.1 and 1.4.
- Observation: temperature is a measured state variable associated with
  thermal equilibrium; heat is energy transferred because of a temperature
  difference.
- Implication: kelvin and joule quantities require separate senses and roles.
- Confidence: high.

### FACTORIUM-TQ-02 - Heat is not stored content

- Sources: OpenStax sections 1.4 and 3.2.
- Observation: a system has internal energy, but heat and work describe
  path-dependent transfers across its boundary.
- Implication: Factorium should reject "heat content" as a technical synonym
  for internal energy.
- Confidence: high.

### FACTORIUM-TQ-03 - Internal energy is a system state quantity

- Sources: OpenStax sections 3.2 and 3.3.
- Observation: internal energy depends on the thermodynamic state, while heat
  and work depend on the path between states.
- Implication: system boundary, state variables, included microscopic forms,
  and transfer sign convention are mandatory.
- Confidence: high.

### FACTORIUM-TQ-04 - Heat capacity requires process conditions

- Source: OpenStax section 1.4.
- Observation: transferred heat may be approximately related to mass,
  specific heat, and temperature change when phase and work conditions permit;
  gas heat capacities differ under constant-volume and constant-pressure
  constraints.
- Implication: `Q = m c Delta T` is conditional, not a universal definition of
  heat or internal-energy change.
- Confidence: high.

### FACTORIUM-TQ-05 - Temperature can remain constant during transfer

- Sources: OpenStax sections 1.4 and 4.6.
- Observation: phase change can absorb or release heat without temperature
  change.
- Implication: zero `Delta T` does not prove zero heat transfer.
- Confidence: high.

### FACTORIUM-TQ-06 - First-law signs require a declared convention

- Source: OpenStax section 3.3.
- Observation: with heat into the system positive and work done by the system
  positive, `Delta U = Q - W_by`.
- Implication: equations using work-on-system conventions may look different
  while expressing the same balance; sign ownership must be explicit.
- Confidence: high.

### FACTORIUM-TQ-07 - Entropy is a state function, not heat divided by
temperature in every process

- Source: OpenStax section 4.6.
- Observation: entropy change is evaluated through a reversible path using
  `integral(delta Q_rev / T)`. The simple `Delta S = Q/T` requires a
  reversible isothermal path.
- Implication: reversibility, absolute temperature, system boundary, and
  actual-versus-evaluation path must remain visible.
- Confidence: high.

## Recommendations

### Adopt now

- Publish temperature, heat, internal energy, heat capacity, specific heat,
  entropy, and thermal equilibrium as distinct senses.
- Make state/transfer/response roles, boundary, path, phase, process
  constraint, sign convention, and reversible evaluation explicit.
- Link the existing temperature-scale Mapping Table to the new anchor.

Owner: Factorium. Validation: state/path, unit, sign, phase, reversible-path,
source, role, and link review.

### Prototype behind a compatibility boundary

- Calorimetry examples with phase-aware energy balances.
- Thermodynamic process diagrams carrying sign and path metadata.
- Entropy accounting across system and surroundings.

Owner: future Factorium Workbench. Validation: phase change, constant-pressure
and constant-volume, reversible and irreversible, and sign-convention fixtures.

### Reject or defer

- Treating temperature as stored heat.
- Calling internal energy heat content.
- Applying `Q = m c Delta T` through an unmodeled phase change.
- Mixing work-by and work-on sign conventions.
- Applying `Delta S = Q/T` to arbitrary irreversible processes.

## Non-goals

- Full equations of state.
- Statistical mechanics and microscopic entropy.
- Heat-engine efficiency.
- Detailed conduction, convection, and radiation models.


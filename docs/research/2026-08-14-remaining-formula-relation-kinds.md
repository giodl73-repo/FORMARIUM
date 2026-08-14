# Remaining Formula Relation Kinds Research

Date: 2026-08-14

## Research question

Which entries can test the Formula Table kinds not covered by the first pilot
suite: identity, conservation or balance, algorithm or recurrence, and
constraint?

Decision supported: add the Pythagorean trigonometric identity, a generic
engineering accounting balance, Newton's root-finding method, and the event
probability range.

## Sources

1. OpenStax, *Precalculus 2e*, section 7.1, "Simplifying and Verifying
   Trigonometric Identities":
   https://openstax.org/books/precalculus-2e/pages/7-1-simplifying-and-verifying-trigonometric-identities
2. Rice University, "Foundations of Conservation Principles":
   https://www.ruf.rice.edu/~bioewhit/foundations/bioe252/docs/Ch%5B1%5D.2.htm
3. APMonitor, "Balance Equations":
   https://apmonitor.com/pdc/index.php/Main/PhysicsBasedModels
4. *Encyclopedia of Mathematics*, "Newton method":
   https://encyclopediaofmath.org/wiki/Newton_method
5. OpenStax, *Introductory Statistics 2e*, chapter 3 key terms:
   https://openstax.org/books/introductory-statistics-2e/pages/3-key-terms

## Findings

### FACTORIUM-RK-01 - Identities depend on definitions and domain

- Source: OpenStax Precalculus section 7.1.
- Observation: `sin^2(theta) + cos^2(theta) = 1` is an identity, not an
  empirical fit or equation to solve for one special angle.
- Implication: identity entries must state the function definitions and domain
  over which equality holds; derived identities retain denominator
  restrictions.
- Confidence: high.

### FACTORIUM-RK-02 - Accounting and conservation are related but distinct

- Sources: Rice conservation principles; APMonitor balance equations.
- Observation: the generic accounting equation includes generation and
  consumption. For a conserved property, creation and destruction terms
  vanish, leaving input minus output equal to accumulation.
- Implication: the Formula Table must not label every accounting balance a
  strict conservation equation.
- Confidence: high.

### FACTORIUM-RK-03 - A balance is meaningless without a boundary and interval

- Source: Rice conservation principles.
- Observation: the source explicitly requires identifying system,
  surroundings, boundary, time period, and whether the system is open, closed,
  reacting, or dynamic.
- Implication: boundary, counted property, interval, and sign convention belong
  in the formula-use factors.
- Confidence: high.

### FACTORIUM-RK-04 - Newton's method is a recurrence with local guarantees

- Source: *Encyclopedia of Mathematics*, "Newton method".
- Observation: the recurrence divides by the derivative at each iterate.
  Quadratic convergence requires a twice continuously differentiable
  function, a simple root, and a sufficiently close starting point.
- Implication: the entry must reject unconditional "fast convergence" claims
  and expose zero derivative, poor starting value, cycling, and divergence.
- Confidence: high.

### FACTORIUM-RK-05 - Probability range is a model constraint

- Source: OpenStax Introductory Statistics chapter 3.
- Observation: an event probability lies between zero and one inclusive within
  a probability model, alongside normalization and additivity requirements.
- Implication: the entry must bind `P(A)` to an event and probability space;
  arbitrary scores between zero and one do not become probabilities.
- Confidence: high.

### FACTORIUM-RK-06 - Relation-kind coverage is now complete at pilot depth

- Source: `tables/formulas/INDEX.md`.
- Observation: the selected entries cover every V0 relation kind, with Ohm's
  law covering both constitutive and empirical categories.
- Implication: further growth should test domains, lookup behavior, and
  cross-linking rather than add relation kinds.
- Confidence: high.

## Recommendations

### Adopt now

- Publish the four entries as sourced candidates.
- Mark all V0 relation kinds covered in the pilot catalog.
- Preserve accounting versus strict conservation and local versus global
  convergence distinctions.

Owner: Factorium. Validation: formula role review, source links, dimensional
or domain audit, and practitioner lookup review.

### Prototype behind a compatibility boundary

- Symbolic domain restriction checks.
- Recurrence execution and convergence traces.
- Balance-equation unit propagation.
- Proof and derivation links as typed Formula Table relationships.

Owner: future Factorium schema and Workbench. Validation: executable fixtures
that do not redefine editorial authority.

### Reject or defer

- Treating every true equation as an identity.
- Calling source/sink accounting strict conservation.
- Presenting Newton's method as globally convergent.
- Treating any bounded score as a probability.

## Non-goals

- Reproducing full proofs or numerical-analysis courses.
- Choosing one universal notation for all engineering balances.


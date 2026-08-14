# Formula Table Architecture Research

Date: 2026-08-14

## Research question

How should Factorium include major equations such as Newton's second law
without confusing mathematical equality with semantic factorization or
stripping away scope, units, assumptions, and provenance?

Decision supported: adopt a distinct Formula Table entry form and test it with
the force relation `sum(F_external) = m a`.

## Local evidence

- `specs/FACTOR-TABLE-ENTRY.md` requires sense separation, candidate views,
  constraints, and provenance.
- `specs/FACTORIUM-ENTRY-GRAPH.md` makes `:=` a decomposition alias and `=` a
  derivation alias.
- `tables/foundations/ROOT-TABLE.md` supplies boundary, context, measure, time,
  and transformation coordinates.
- `tables/foundations/FACTOR-ROLES.md` distinguishes source factors, policies,
  constraints, contexts, and derived views.
- `tables/roots/measure.md` already requires method, scale, units, and
  uncertainty to remain visible.

## External sources

1. OpenStax, *University Physics Volume 1*, section 5.3, "Newton's Second
   Law": https://openstax.org/books/university-physics-volume-1/pages/5-3-newtons-second-law
2. NIST, "SI Units":
   https://www.nist.gov/pml/owm/metric-si/si-units
3. BIPM, *The International System of Units (SI Brochure)*:
   https://www.bipm.org/en/publications/si-brochure

## Findings

### FACTORIUM-FM-01 - Equations and factorizations use different operators

- Sources: `specs/FACTORIUM-ENTRY-GRAPH.md`; OpenStax section 5.3.
- Observation: Factorium's `x` means factors are jointly considered, while
  physical multiplication, summation, differentiation, equality, and vector
  operations have exact mathematical semantics.
- Implication: Formula Tables MUST render the original mathematical operators
  separately from any conceptual decomposition.
- Confidence: high.

### FACTORIUM-FM-02 - Formula kind changes what the equation claims

- Sources: `specs/FACTOR-TABLE-ENTRY.md`; OpenStax section 5.3.
- Observation: Newton's second law is an experimentally supported physical
  law, not a dictionary definition produced merely by rearranging terms.
  Other equations may be definitions, identities, conservation balances,
  constitutive models, empirical fits, estimators, or algorithms.
- Implication: Every Formula Table MUST classify the relation kind.
- Confidence: high.

### FACTORIUM-FM-03 - The system boundary is part of correct use

- Source: OpenStax section 5.3.
- Observation: OpenStax requires choosing the system of interest before
  deciding which forces are external; the law uses net external force.
- Implication: Formula scope MUST include the subject/system boundary and
  aggregation rule, not only a list of symbols.
- Confidence: high.

### FACTORIUM-FM-04 - Quantity kind, units, and dimensions are independent data

- Sources: NIST "SI Units"; BIPM SI Brochure.
- Observation: SI distinguishes quantities, units, base units, and derived
  units. NIST describes acceleration as a derived unit `m/s2`; the force unit
  newton is represented through SI-derived units.
- Implication: Each symbol row SHOULD expose quantity kind, SI unit, and
  dimensional signature separately. Equivalent units do not make concepts
  interchangeable.
- Confidence: high.

### FACTORIUM-FM-05 - Algebraic rearrangement does not create a new law

- Source: OpenStax section 5.3.
- Observation: `F_net = m a` and `a = F_net / m` express the same scoped
  relation when the rearrangement is valid.
- Implication: Rearrangements belong under equivalent forms, with denominator
  and domain restrictions visible, rather than as independent entries.
- Confidence: high.

### FACTORIUM-FM-06 - Formula maturity and entry maturity must remain separate

- Sources: `specs/FACTOR-TABLE-ENTRY.md`; `.roles/assurance/domain-source-reviewer.md`.
- Observation: An established scientific relation can be represented by a new
  and still experimental Factorium entry format.
- Implication: Formula authority/source status and Factorium editorial maturity
  MUST be recorded independently.
- Confidence: high.

### FACTORIUM-FM-07 - "All major formulas" requires bounded curation

- Sources: `VISION.md`; `docs/research/2026-08-13-reference-scale-and-entry-size.md`.
- Observation: Formula collections can expand without bound across pure
  mathematics, physics, engineering, statistics, finance, and computing.
- Implication: Begin with a cross-domain pilot selected for conceptual value,
  recurrence, source quality, and diversity of relation kinds. Do not promise
  exhaustive coverage before taxonomy and usability testing.
- Confidence: high.

## Recommendations

### Adopt now

- Add a Formula Table format with relation kind, canonical expression, symbol
  contract, scope, assumptions, dimensions, equivalent forms, conceptual
  factoring, failure signs, and sources.
- Add an Equation & Units Auditor to the assurance panel.
- Publish Newton's second law as the first sourced pilot.

Owner: Factorium. Validation: role review, link validation, source review, and
manual dimensional audit.

### Prototype behind a compatibility boundary

- Machine-readable expression trees and dimensional validation.
- Generated symbol, unit, dimension, and relation-kind indices.
- Formula search by known variables, desired output, or dimensional signature.

Owner: future Factorium schema/software work. Validation: interchange fixtures
and independent parsers.

### Reject or defer

- Treating `=` and Factorium `:=` as interchangeable.
- Publishing equations without scope or source.
- Calling every equation a definition.
- Claiming exhaustive formula coverage during the pilot.

## Non-goals

- Replacing textbooks, proofs, standards, or qualified domain instruction.
- Deriving scientific laws from Factorium structure.
- Endorsing one notation, unit system, or rearranged form for every context.


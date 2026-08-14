# Probability, Risk, and Uncertainty Cluster Research

Date: 2026-08-14

## Research question

How should Factorium organize probability, conditional probability, odds,
risk, expected loss, and measurement uncertainty so normalized model values,
alternative representations, consequences, and incomplete knowledge do not
collapse into one score?

Decision supported: publish one probability-risk-uncertainty anchor and a
linked Formula Table.

## Sources

1. OpenStax, *Introductory Statistics 2e*, section 3.1, "Terminology":
   https://openstax.org/books/introductory-statistics-2e/pages/3-1-terminology
2. OpenStax, *Introductory Statistics 2e*, section 3.3, "Two Basic Rules of
   Probability":
   https://openstax.org/books/introductory-statistics-2e/pages/3-3-two-basic-rules-of-probability
3. OpenStax, *Introductory Statistics 2e*, section 4.2, "Mean or Expected
   Value and Standard Deviation":
   https://openstax.org/books/introductory-statistics-2e/pages/4-2-mean-or-expected-value-and-standard-deviation
4. NIST CSRC Glossary, "risk":
   https://csrc.nist.gov/glossary/term/risk
5. NIST Technical Note 1297, "Guidelines for Evaluating and Expressing the
   Uncertainty of NIST Measurement Results":
   https://www.nist.gov/pml/nist-technical-note-1297

## Findings

### FACTORIUM-PRU-01 - Probability requires a model

- Source: OpenStax section 3.1.
- Observation: probability is assigned to an event within a declared sample
  space or probability model and lies between zero and one.
- Implication: a bounded score, confidence label, or subjective ranking is not
  automatically an event probability.
- Confidence: high.

### FACTORIUM-PRU-02 - Conditional probability changes the reference event

- Sources: OpenStax sections 3.1 and 3.3.
- Observation: `P(A|B)` evaluates `A` within the reduced condition `B` and
  requires `P(B) > 0`.
- Implication: conditioning event, direction, and denominator domain must
  remain visible; `P(A|B)` and `P(B|A)` are generally different.
- Confidence: high.

### FACTORIUM-PRU-03 - Odds are a representation, not probability itself

- Source: probability and complement relations in OpenStax section 3.1.
- Observation: odds in favor compare event probability with complement
  probability, `p/(1-p)`. They range from zero to unbounded and use a
  different scale from probability.
- Implication: odds, odds against, probability, and percentages need explicit
  conversion labels.
- Confidence: high.

### FACTORIUM-PRU-04 - Risk combines likelihood and adverse consequence

- Source: NIST CSRC risk glossary.
- Observation: NIST describes risk as a measure of threat extent and typically
  a function of adverse impacts and likelihood.
- Implication: probability alone is not risk. Scenario, affected entity,
  consequences, controls, time horizon, and aggregation policy are required.
- Confidence: high within the cited risk-management scope.

### FACTORIUM-PRU-05 - Risk is not universally likelihood times impact

- Source: NIST wording uses "function of," not one universal product.
- Observation: ordinal matrices, scenario models, expected-loss calculations,
  tail measures, and qualitative assessments encode likelihood and consequence
  differently.
- Implication: `likelihood x impact` may be one declared model but must not be
  presented as the definition of risk in every domain.
- Confidence: high.

### FACTORIUM-PRU-06 - Expected loss is a model output

- Source: OpenStax section 4.2.
- Observation: expected value is a probability-weighted long-run average.
  Applying it to losses produces an expected-loss measure.
- Implication: expected loss requires mutually accounted outcomes, assigned
  probabilities, consequence values, and a common value basis; it does not
  capture every risk preference or tail concern.
- Confidence: high.

### FACTORIUM-PRU-07 - Measurement uncertainty needs method and coverage

- Source: NIST Technical Note 1297, sections 6 and 7.
- Observation: expanded uncertainty is `U = k u_c`; reporting includes the
  coverage factor, component evaluations, and the basis for any probability
  interpretation.
- Implication: a bare plus-minus interval or confidence percentage is
  incomplete without measurand, method, components, factor, and interpretation.
- Confidence: high for NIST measurement reporting.

## Recommendations

### Adopt now

- Publish probability, conditional probability, odds, risk, expected loss,
  general uncertainty, and measurement uncertainty as distinct senses.
- Require event/model, condition, complement, scenario, consequence, horizon,
  control state, measurand, and coverage basis where applicable.
- Link the existing probability-range constraint as a specialized Formula
  view.

Owner: Factorium. Validation: probability-domain, conversion, consequence,
coverage, source, role, and link review.

### Prototype behind a compatibility boundary

- Probability/odds converters with endpoint handling.
- Scenario risk tables that preserve qualitative and quantitative models.
- Measurement-result records carrying uncertainty components and coverage.

Owner: future Factorium Workbench. Validation: reversed conditionals,
probability endpoints, non-product risk models, and uncertainty-reporting
fixtures.

### Reject or defer

- Renaming every score in `[0, 1]` as probability.
- Treating odds as a percentage without conversion.
- Defining risk as probability alone.
- Universalizing likelihood multiplied by impact.
- Treating expected loss as a complete risk preference.
- Reporting plus-minus uncertainty without its basis.

## Non-goals

- Bayesian inference and likelihood functions.
- Full decision theory or utility.
- Tail-risk measures such as value at risk.
- Complete measurement-uncertainty propagation.


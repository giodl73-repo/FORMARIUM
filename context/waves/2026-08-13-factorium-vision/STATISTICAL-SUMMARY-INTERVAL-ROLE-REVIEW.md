# Statistical Summary and Interval Role Review

Status: fixed point for candidate publication

## Scope

- `docs/research/2026-08-15-statistical-summary-interval.md`
- `tables/entries/statistical-summary-interval.md`
- `tables/formulas/arithmetic-mean.md`
- `tables/diagnostics/statistical-summary-interval-failures.md`
- probability/uncertainty confidence-interval cross-reference repair
- canonical interchange, assurance, Factor Forge, and book projections

## Dispositions

| Role | Result | Rationale |
|---|---|---|
| Factorization Method Steward | pass after findings | Seven lenses keep descriptive, estimator, interval, and decision targets distinct. |
| Experimental Methodologist | pass after findings | Analytic stages, independent units, dependence, assumptions, and coverage checks remain visible. |
| Evidence & Claims Editor | pass after findings | Narrowness, accuracy, bias, validity, transport, and posterior claims remain separate. |
| Benchmark Numeracy Checker | pass after findings | Weight, denominator, degrees of freedom, unit, sample-size, and interval fields are explicit. |
| Reference Lexicographer | pass after findings | Eight senses separate average, order, spread, sampling variability, and parameter coverage. |
| Reference Architecture Editor | pass after findings | Arithmetic mean gains a stable owner and confidence interval resolves without absorbing likelihood. |
| Domain Source Reviewer | pass for candidate | NIST and Census sources support the spine while native statistical methods retain authority. |
| Research Integrity & Provenance | pass after findings | Raw/analytic data, weights, conventions, software, exclusions, and revisions remain reconstructable. |
| Equation & Units Auditor | pass after findings | Mean, variance, SD, SE, weights, denominators, and interval procedures retain their contracts. |
| Reference Practitioner | pass after findings | A target-first selection path and symptom/test/owner diagnostic support rapid use. |

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| SSI-001 | major | `average` could collapse mean, median, and other location summaries. | Closed: exact senses and distribution-dependent selection remain explicit. |
| SSI-002 | major | Median could be described incorrectly for even samples. | Closed: it is a rank-based center under a stated convention. |
| SSI-003 | major | Weighted and ordinary means could collapse. | Closed: weight semantics, sum, provenance, normalization, and design effect are mandatory. |
| SSI-004 | major | Quantile results could drift silently across software defaults. | Closed: convention, ties, software, and version are recorded. |
| SSI-005 | major | Population and sample variance denominators could mix. | Closed: target, center, denominator, and degrees of freedom remain explicit. |
| SSI-006 | major | Variance, SD, and SE could share one label or unit. | Closed: squared, original, and estimator-sampling roles are separate. |
| SSI-007 | major | Record count could substitute for independent replication. | Closed: dependence, clusters, weights, design, and effective units are required. |
| SSI-008 | major | A narrow confidence interval could prove accuracy or validity. | Closed: bias, design, assumptions, and target evidence remain separate. |
| SSI-009 | major | Confidence could be interpreted as posterior probability for one interval. | Closed: frequentist procedure coverage is explicit and contrasted with credible intervals. |
| SSI-010 | major | Confidence, prediction, tolerance, and specification intervals could collapse. | Closed: target parameter, observation, population proportion, and acceptability are contrasted. |
| SSI-011 | major | Arithmetic mean could remain canonically unresolved. | Closed: the Formula view moves to the new anchor. |
| SSI-012 | major | Candidate guidance could become statistical certification. | Closed: claim limits retain method and domain authority. |

No critical or major actionable finding remains open for candidate publication.

---
skill: discover-websearch
topic: sampling-generalization
date: 2026-08-15
claims_checked: 4
confirmed: 4
---

# Sampling and Generalization Web Evidence

## Phase 1 - Claims to ground

| # | Claim | Source | Why it matters |
|---|---|---|---|
| 1 | Target population, sampling frame, invited/observed sample, and analytic sample are distinct sets. | proposed factorization | Collapsing them hides coverage, nonresponse, exclusion, and attrition. |
| 2 | Parameter or estimand, estimator, estimate, and sampling uncertainty are distinct roles. | proposed factorization | A computed number should not silently redefine the target quantity. |
| 3 | Random sampling and random assignment solve different inference problems. | proposed contrast | A randomized experiment may be internally credible without representing the intended target population. |
| 4 | Representativeness, generalizability, and transportability are claim- and target-specific; large size does not erase selection or measurement bias. | proposed claim boundary | Otherwise “large” or “representative” becomes an intrinsic quality badge. |

## Phase 2 - Web evidence

### Claim 1

- Query 1: `NIST populations and sampling target population sample inference`
  - Source: https://www.itl.nist.gov/div898/handbook/ppc/section1/ppc134.htm
  - Direct quote: “Facts about a sample are not necessarily facts about a population”
  - Relevance: the official handbook separates the observed group from the target of inference.
- Query 2: `Census sampling frame nonresponse coverage error sample survey`
  - Source: https://www.census.gov/about/policies/quality/standards/standardd3.html
  - Direct quote: “undercoverage, overcoverage, and mismatches between the frame”
  - Relevance: official quality standards distinguish frame coverage, response, processing, and measurement errors.
- Verdict: CONFIRMED

### Claim 2

- Query 1: `NIST estimate population parameter sample size precision`
  - Source: https://www.itl.nist.gov/div898/handbook/ppc/section3/ppc333.htm
  - Direct quote: “connects the desired precision of the estimate with the sample size”
  - Relevance: the target parameter, its estimate, precision, variability, and sample size have different roles.
- Query 2: `NIST estimating parameters of a distribution estimator estimate`
  - Source: https://www.itl.nist.gov/div898/handbook/eda/section3/eda365.htm
  - Direct quote: “Estimation of the parameters”
  - Relevance: observed data are used through an estimation procedure to target model parameters.
- Verdict: CONFIRMED

### Claim 3

- Query 1: `randomized trial generalizability representative target population`
  - Source: https://pmc.ncbi.nlm.nih.gov/articles/PMC4051511/
  - Direct quote: “randomized trials do not necessarily answer”
  - Relevance: random assignment supports trial comparison but not automatic target-population applicability.
- Query 2: `target validity randomized trial study sample target population`
  - Source: https://pmc.ncbi.nlm.nih.gov/articles/PMC6357801/
  - Direct quote: “not a simple random sample of the target population”
  - Relevance: trial selection and treatment assignment are separate processes.
- Verdict: CONFIRMED

### Claim 4

- Query 1: `defining representativeness target population assumptions`
  - Source: https://pmc.ncbi.nlm.nih.gov/articles/PMC10193086/
  - Direct quote: “the target population the results are being generalised to”
  - Relevance: representativeness statements require a result, target, mode of generalization, and assumptions.
- Query 2: `big data paradox data quality population inference Meng`
  - Source: https://statistics.fas.harvard.edu/sites/g/files/omnuum10116/files/statistics-2/files/statistical_paradises_and_paradoxes.pdf
  - Direct quote: “without taking data quality into account”
  - Relevance: increasing data quantity does not eliminate systematic data defects.
- Verdict: CONFIRMED

## Phase 3 - Findings table

| # | Finding | Verdict | Source |
|---|---|---|---|
| 1 | A target population is the group about which an inference is intended. | CONFIRMED | [NIST](https://www.itl.nist.gov/div898/handbook/ppc/section1/ppc134.htm) |
| 2 | A sample is the set of observational units or measurements actually selected or observed. | CONFIRMED | [NIST glossary](https://www.itl.nist.gov/div898/handbook/glossary.htm) |
| 3 | A sampling frame can omit eligible units, include ineligible units, duplicate units, or mismatch the target universe. | CONFIRMED | [Census D3](https://www.census.gov/about/policies/quality/standards/standardd3.html) |
| 4 | Nonresponse, processing, and measurement errors remain distinct from sampling error. | CONFIRMED | [Census D3](https://www.census.gov/about/policies/quality/standards/standardd3.html) |
| 5 | Attrition can make an analytic sample differ from the initially selected study sample. | CONFIRMED | [Revisiting representativeness](https://pmc.ncbi.nlm.nih.gov/articles/PMC12208074/) |
| 6 | A population parameter is a target property, while a statistic or estimate is calculated from observed data. | CONFIRMED | [NIST](https://www.itl.nist.gov/div898/handbook/eda/section3/eda365.htm) |
| 7 | Sample size affects precision through variability and the selected estimator/design, not quality in isolation. | CONFIRMED | [NIST](https://www.itl.nist.gov/div898/handbook/ppc/section3/ppc333.htm) |
| 8 | A sampling distribution describes repeated-sample variation of a statistic. | CONFIRMED | [NIST glossary](https://www.itl.nist.gov/div898/handbook/glossary.htm) |
| 9 | Random assignment supports treatment-group comparison inside the study under its execution assumptions. | CONFIRMED | [Generalizability of trials](https://pmc.ncbi.nlm.nih.gov/articles/PMC4359056/) |
| 10 | Random assignment does not make the recruited sample a random sample of a target population. | CONFIRMED | [Propensity scores and generalizability](https://pmc.ncbi.nlm.nih.gov/articles/PMC4051511/) |
| 11 | Internal validity and target validity answer different questions. | CONFIRMED | [Target validity](https://pmc.ncbi.nlm.nih.gov/articles/PMC6357801/) |
| 12 | Representativeness is ambiguous without the target population and result or interpretation being generalized. | CONFIRMED | [Defining representativeness](https://pmc.ncbi.nlm.nih.gov/articles/PMC10193086/) |
| 13 | Generalizability concerns a target population overlapping the source; transportability can concern a distinct target. | CONFIRMED | [Transporting results](https://pmc.ncbi.nlm.nih.gov/articles/PMC13038309/) |
| 14 | Transport analyses require assumptions about selection, effect modifiers, support overlap, and target data. | CONFIRMED | [Methods overview](https://pmc.ncbi.nlm.nih.gov/articles/PMC10392887/) |
| 15 | A very large but systematically selected dataset can yield precise-looking population inferences with substantial bias. | CONFIRMED | [Meng](https://statistics.fas.harvard.edu/sites/g/files/omnuum10116/files/statistics-2/files/statistical_paradises_and_paradoxes.pdf) |
| 16 | Selection bias is question- and estimand-dependent, so one data source is not representative for every analysis. | CONFIRMED | [Revisiting representativeness](https://pmc.ncbi.nlm.nih.gov/articles/PMC12208074/) |

Summary: 4 of 4 claims confirmed; 16 grounded findings; none contradicted or unconfirmed.

## Phase 4 - Ungrounded claims

No ungrounded claims. The sources do not support a universal binary test that
makes a sample intrinsically representative for all questions.

## Phase 5 - Amend

1. Model the population-to-analysis chain as explicit sets and transformations,
   not one `sample` field.
2. Keep target quantity, estimator, realized estimate, uncertainty, and claim
   interpretation separate.
3. Replace unqualified `representative` and `generalizable` labels with target,
   result, design, assumptions, coverage, and transport evidence.

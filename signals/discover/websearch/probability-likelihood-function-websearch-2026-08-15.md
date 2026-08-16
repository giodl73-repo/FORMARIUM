---
skill: discover-websearch
topic: probability-likelihood-function
date: 2026-08-15
claims_checked: 5
confirmed: 5
---

# Probability and Likelihood Function Web Evidence

## Claims to ground

| # | Claim | Why it matters |
|---:|---|---|
| 1 | Probability and likelihood use different fixed/variable roles. | Prevents inverse interpretation. |
| 2 | Independent data contribute a product; censoring changes contributions. | Prevents invalid factorization. |
| 3 | MLE is an optimizer, not a probability or adequacy certificate. | Prevents estimator overclaim. |
| 4 | Likelihood is not automatically a probability distribution over parameters. | Prevents likelihood/posterior collapse. |
| 5 | Continuous likelihood magnitudes depend on representation; ratios require common scope. | Prevents invalid raw comparisons. |

## Web evidence

### Claim 1

- Query: `site:itl.nist.gov likelihood sample data unknown model parameters`
  - NIST states that sample likelihood contains unknown model parameters and
    MLE selects values maximizing it.
  - https://www.itl.nist.gov/div898/handbook/apr/section4/apr412.htm
- Query: `site:ocw.mit.edu probability likelihood difference model parameter`
  - MIT explicitly teaches the probability/likelihood distinction and MLE for
    a model parameter.
  - https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/resources/mit18_05_s22_class10-prep-b_pdf/
- Query: `site:cam.ac.uk likelihood data fixed parameter function`
  - Cambridge describes `p(D|theta)` viewed as a function of `theta` as the
    likelihood.
  - https://mi.eng.cam.ac.uk/~mjfg/local/4F10/lect2_pres.pdf
- Verdict: CONFIRMED.

### Claim 2

- Query: `site:itl.nist.gov likelihood product densities observations`
  - NIST states that without censoring likelihood is a product of densities at
    observed failure times.
  - https://www.itl.nist.gov/div898/handbook/apr/section4/apr412.htm
- Query: `site:itl.nist.gov censored likelihood density survival contributions`
  - NIST shows density, interval-probability, and survival contributions for
    different observation outcomes.
  - https://www.itl.nist.gov/div898/handbook/apr/section4/apr412.htm
- Query: `site:ocw.mit.edu independent joint pdf product likelihood`
  - MIT forms the joint density as a product under independence.
  - https://live.ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_statistics.pdf
- Verdict: CONFIRMED.

### Claim 3

- Query: `site:itl.nist.gov maximum likelihood estimates values maximize`
  - NIST defines MLEs as parameter values maximizing sample likelihood.
  - https://www.itl.nist.gov/div898/handbook/apr/section4/apr412.htm
- Query: `site:itl.nist.gov maximum likelihood small samples biased`
  - NIST warns that small-sample MLEs can be heavily biased and large-sample
    properties may fail.
  - https://www.itl.nist.gov/div898/handbook/apr/section4/apr412.htm
- Query: `site:itl.nist.gov maximum likelihood outliers distribution assumption`
  - NIST notes sensitivity to outliers and reliance on the selected error
    distribution.
  - https://www.itl.nist.gov/div898/handbook/pmd/section4/pmd43.htm
- Verdict: CONFIRMED.

### Claim 4

- Query: `site:itl.nist.gov parameter fixed not random likelihood posterior prior`
  - NIST distinguishes fixed unknown parameters from Bayesian parameters with
    prior and posterior distributions.
  - https://www.itl.nist.gov/div898/handbook/apr/section2/apr1a.htm
- Query: `site:ocw.mit.edu likelihood posterior Bayesian updating`
  - MIT teaches likelihood/MLE separately from Bayesian posterior updating.
  - https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/pages/calendar/
- Query: `site:cam.ac.uk probability data function parameters likelihood`
  - Cambridge identifies probability of data as a parameter function as
    likelihood rather than a parameter distribution.
  - https://mlg.eng.cam.ac.uk/pub/pdf/Gha12.pdf
- Verdict: CONFIRMED.

### Claim 5

- Query: `likelihood units reference measure log likelihood technical report`
  - A UK government report states that measurement-unit changes introduce
    parameter-independent additive constants into log likelihood.
  - https://assets.publishing.service.gov.uk/media/5a7b8a2540f0b62826a043bc/sw6-064-tr2-e-e.pdf
- Query: `site:itl.nist.gov likelihood ratio L0 L1 same sample`
  - NIST defines likelihood ratios from restricted and unrestricted maxima for
    one scoped sample/model comparison.
  - https://www.itl.nist.gov/div898/handbook/apr/section2/apr233.htm
- Query: `site:itl.nist.gov constant plays no role likelihood MLE`
  - NIST states that a parameter-independent multiplier plays no role in
    solving for MLEs.
  - https://www.itl.nist.gov/div898/handbook/apr/section4/apr412.htm
- Query: `site:ocw.mit.edu continuous density define likelihood`
  - MIT defines continuous-distribution likelihood using density values.
  - https://live.ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_statistics.pdf
- Verdict: CONFIRMED.

## Findings table

| # | Finding | Verdict | Source |
|---:|---|---|---|
| 1 | Likelihood requires a declared sampling model. | confirmed | NIST |
| 2 | Observed data remain fixed while parameters vary. | confirmed | MIT/Cambridge |
| 3 | Probability varies possible data/events at fixed parameters. | confirmed | MIT |
| 4 | Independent contributions multiply. | confirmed | NIST/MIT |
| 5 | Censored and exact observations contribute differently. | confirmed | NIST |
| 6 | Observation mechanism belongs in the likelihood. | confirmed | NIST |
| 7 | MLE selects a likelihood maximizer. | confirmed | NIST |
| 8 | Computation may require nonlinear optimization. | confirmed | NIST |
| 9 | Small-sample performance is not automatic. | confirmed | NIST |
| 10 | Model assumptions affect estimator supportability. | confirmed | NIST |
| 11 | Classical parameters are fixed unknowns. | confirmed | NIST |
| 12 | A posterior adds prior and normalization. | confirmed | NIST |
| 13 | Likelihood alone is not posterior probability. | confirmed | NIST/MIT |
| 14 | Parameter-independent multipliers preserve MLEs. | confirmed | NIST |
| 15 | Likelihood ratios compare scoped likelihoods. | confirmed | NIST |
| 16 | Continuous likelihood uses densities. | confirmed | MIT/NIST |
| 17 | Representation changes can shift raw log likelihood by constants. | confirmed | UK report |
| 18 | Raw comparisons need common data and model scope. | confirmed | NIST |

Summary: 5 of 5 claims and 18 findings confirmed. No ungrounded claims.

## Amendments

1. Make fixed-data/variable-parameter direction the governing distinction.
2. Include observation mechanism, dependence, reference measure, and parameter
   domain in the canonical factorization.
3. Prefer dimensionless relative likelihood and log-likelihood differences for
   comparison while retaining raw-likelihood provenance.

# Probability and Likelihood Function Research

Date: 2026-08-15

## Question

How should Factorium distinguish event probability from a likelihood function
without turning the probability anchor into a catalog of distributions,
estimators, or tests?

## Findings

1. A statistical model is a family of probability distributions indexed by a
   parameter. Probability evaluates possible data or events at a fixed model;
   likelihood fixes the observed data and varies the parameter.
2. For discrete observations the likelihood can use probability masses. For
   continuous observations it uses densities with respect to a declared common
   reference measure; a density value is not an exact-point probability.
3. Independent-observation likelihoods factor as products. Dependence,
   censoring, truncation, selection, and observation mechanisms can change the
   contribution and cannot be silently ignored.
4. A maximum-likelihood estimate is an optimizer over the declared parameter
   space. Existence, uniqueness, boundaries, model adequacy, finite-sample
   behavior, and uncertainty remain separate questions.
5. Likelihood is not automatically a probability distribution over parameter
   values. A posterior additionally requires a prior and normalization.
6. Likelihood ratios and relative log likelihoods are safer comparison objects
   than raw continuous likelihood magnitudes because shared density units and
   parameter-independent factors cancel. Comparisons still require the same
   data, sampling model, representation, and reference measure.

## Architecture decision

Add `likelihood-function` as one sense of the existing
`probability-risk-uncertainty` anchor and revise its existing Formula view.
Retain probability, likelihood, maximum-likelihood estimate, posterior
probability, model fit, evidence, and decision as separate roles. Do not add a
new entry, view, chapter, distribution family, estimator catalog, test catalog,
or broad performance claim.

## Primary sources

- NIST/SEMATECH, “Maximum likelihood estimation”:
  https://www.itl.nist.gov/div898/handbook/apr/section4/apr412.htm
- NIST/SEMATECH, “Likelihood ratio tests”:
  https://www.itl.nist.gov/div898/handbook/apr/section2/apr233.htm
- NIST/SEMATECH, “Bayesian methodology for reliability evaluation”:
  https://www.itl.nist.gov/div898/handbook/apr/section2/apr1a.htm
- MIT OpenCourseWare 18.05, “Maximum Likelihood Estimates”:
  https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/resources/mit18_05_s22_class10-prep-b_pdf/
- UK Environment Agency likelihood technical report:
  https://assets.publishing.service.gov.uk/media/5a7b8a2540f0b62826a043bc/sw6-064-tr2-e-e.pdf

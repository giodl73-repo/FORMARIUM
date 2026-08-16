---
skill: roles-check
topic: probability-likelihood-function
date: 2026-08-15
roles_used: 13
p1_count: 0
verdict: APPROVED
---

# Probability and Likelihood Function Roles Check

## Artifact identification

Artifact type: revised Factor Table anchor, Formula view, evidence note, and
canonical projection. Domain signals: probability, statistical models,
likelihood, parameter estimation, density units, observation mechanisms, and
claim boundaries.

## Role selection

Selected roles cover semantic factorization, experimental assumptions, claims,
numeracy, lexicography, reference architecture, taxonomy boundary, provenance,
domain sourcing, equations and units, mapping direction, and practitioner use.

## Per-role findings

| Role | Finding | Severity | Closure |
|---|---|---:|---|
| Compositional Semantics Steward | Probability and likelihood could collapse because they reuse one model expression. | P2 | Fixed/variable roles are explicit. |
| Compositional Semantics Steward | Observation-mechanism factors are dependent on data status. | P2 | Exact, censored, selected, and dependent contributions remain conditional. |
| Compositional Semantics Steward | Parameter support could be read as parameter truth. | P3 | Evidence, posterior, and decision remain separate. |
| Factorization Method Steward | Independence could become the universal pivot. | P2 | Dependence and observation mechanisms precede product factorization. |
| Factorization Method Steward | Raw, relative, log-relative, and optimizing uses could collapse. | P2 | Selection procedure distinguishes each target. |
| Factorization Method Steward | Distribution families could drive subtype growth. | P3 | No named distribution becomes a sense. |
| Experimental Methodologist | MLE could inherit large-sample properties unconditionally. | P2 | Finite-sample behavior and assumptions remain separate checks. |
| Experimental Methodologist | Selection or censoring could be ignored after observing outcomes. | P2 | Observation process is frozen before likelihood construction. |
| Experimental Methodologist | An optimizer could be called model validation. | P3 | Model adequacy requires separate diagnostics. |
| Evidence & Claims Editor | Likelihood could be described as probability of a parameter. | P2 | Posterior probability requires prior and normalization. |
| Evidence & Claims Editor | Maximum likelihood could imply certainty or causation. | P2 | Both claims are expressly excluded. |
| Evidence & Claims Editor | Raw likelihood magnitude could be called absolute evidence. | P3 | Comparison scope and representation constants remain visible. |
| Benchmark Numeracy Checker | Likelihood ratios could omit their denominator. | P2 | Positive reference likelihood is required. |
| Benchmark Numeracy Checker | Product terms could hide changing denominators and sample counts. | P2 | Data, contribution type, and dependence are explicit. |
| Benchmark Numeracy Checker | One objective value could hide optimizer multiplicity. | P3 | Optimizer-set membership and uniqueness checks are retained. |
| Reference Lexicographer | Ordinary likelihood assessment and likelihood function could be confused. | P2 | The contrast table separates qualitative/model-specific assessment from the technical function. |
| Reference Lexicographer | Likelihood, MLE, and posterior could appear synonymous. | P2 | Each has a separate governing role. |
| Reference Lexicographer | The symbol direction could remain opaque to readers. | P3 | The fixed-data/variable-parameter ladder is included. |
| Reference Architecture Editor | Likelihood could become a disconnected new anchor. | P2 | It deepens the existing probability authority. |
| Reference Architecture Editor | A new view could duplicate the existing probability Formula view. | P2 | Current Formula view owns the added relations. |
| Reference Architecture Editor | The base-volume route could require a new chapter. | P3 | Existing record, chapter, task, and search destination are revised in place. |
| Concept & Taxonomy Boundary Editor | Named distributions could become canonical siblings. | P2 | Model family is a factor, not an enumerated taxonomy. |
| Concept & Taxonomy Boundary Editor | Estimators and tests could expand into catalogs. | P2 | Only reusable likelihood and optimizer roles enter scope. |
| Concept & Taxonomy Boundary Editor | Bayesian/frequentist schools could become a hierarchy. | P3 | Only the likelihood/posterior distinction needed to prevent misuse is retained. |
| Research Integrity & Provenance | Observation and model assumptions could be unreconstructable. | P2 | Sampling, selection, censoring, reference measure, and parameterization are required. |
| Research Integrity & Provenance | Source authority could rely on one tutorial. | P2 | NIST, MIT, Cambridge, and an official technical report triangulate the claims. |
| Research Integrity & Provenance | Continuous likelihood units could disappear in summary prose. | P3 | Reference-measure and representation scope are explicit. |
| Domain Source Reviewer | Density value could be called an exact-point probability. | P2 | Discrete mass and continuous density uses are separated. |
| Domain Source Reviewer | Likelihood comparisons across models/data could be universalized. | P2 | Same data, model scope, and reference measure are required. |
| Domain Source Reviewer | MLE properties could be presented without regularity/sample qualifications. | P3 | No efficiency or unbiasedness claim is promoted. |
| Equation & Units Auditor | Logarithm could receive a dimensionful raw density. | P2 | The canonical log comparison is `log` of a dimensionless likelihood ratio. |
| Equation & Units Auditor | Density likelihood and mass likelihood could share implied units. | P2 | Symbol contract distinguishes mass, density, and observation contribution. |
| Equation & Units Auditor | Likelihood ratio units might not cancel under mixed observation mechanisms. | P3 | Numerator and denominator must use the same observed data and contribution structure. |
| Mapping Integrity Auditor | Probability/likelihood direction could be reversed. | P2 | Fixed parameter versus fixed data is the primary direction contract. |
| Mapping Integrity Auditor | Likelihood-to-posterior could look like an identity mapping. | P2 | Prior and normalization are mandatory additional inputs. |
| Mapping Integrity Auditor | Log transformation could conceal zeros. | P3 | Positive reference and logged contributions are required. |
| Reference Practitioner | Readers could lack a quick discriminator. | P2 | The two-line direction ladder leads the Formula scope. |
| Reference Practitioner | Common data complications could remain too abstract. | P2 | Censoring, selection, dependence, missingness, and stopping are named. |
| Reference Practitioner | A computed maximum could remain easy to overinterpret. | P3 | Seven explicit non-results follow the optimizer relation. |

## Synthesis

Roles reviewed: 13

P1 blockers: 0 | P2 issues: 26 | P3 notes: 13

Verdict: APPROVED after amendments.

Top finding: probability and likelihood require opposite fixed/variable reading
directions despite sharing a sampling-model expression. Cross-role consensus:
observation mechanism, parameter domain, reference measure, ratio scope, and
optimizer claim boundaries must travel together.

## Amendments

1. Added the fixed-parameter/possible-data versus fixed-data/variable-parameter
   direction contract.
2. Added mass/density/reference-measure and dimensionless relative-likelihood
   contracts before logarithms.
3. Added explicit optimizer, posterior, adequacy, finite-sample, uncertainty,
   causal, and decision non-equivalences.

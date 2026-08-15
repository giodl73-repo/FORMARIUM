# Sampling and Generalization Failure Diagnostic

Status: candidate Diagnostic Table

Primary family: Diagnostic Table

Canonical headword: [Population, Sample, Estimand, Estimate, and Generalization](../entries/sampling-generalization.md)

Canonical senses: `target-population`, `sampling-frame`, `sample`,
`analytic-sample`, `estimand`, `estimator`, `estimate`, `generalization`,
`transport`

## Governing question

Which population, selection, analysis, estimation, or source-to-target defect
could explain why a result does not support its intended claim, and what test
would discriminate it?

## Diagnostic table

| Observation | Candidate causes | Discriminating test | Likely repair owner |
|---|---|---|---|
| Eligible target units could never enter the sample | frame undercoverage; access-channel exclusion; stale identity/version | compare target definition with frame construction and external counts by relevant strata | population and frame owner |
| Many sampled units never contribute observations | noncontact; refusal; ineligibility; instrument or channel failure | model response by known selection variables and outcome-related proxies; trace disposition codes | collection and nonresponse design |
| Analytic sample is much smaller or different from recruited sample | missingness; post-outcome exclusion; linkage failure; preprocessing or deduplication | produce a stage-by-stage inclusion flow and compare characteristics/outcomes at each transition | analysis and data pipeline |
| Estimate changes sharply after weighting | selection differs on weighted variables; extreme weights; sparse support; model instability | inspect inclusion/response probabilities, weight distribution, effective sample size, balance, and overlap | sampling and estimation design |
| Very narrow interval conflicts with external evidence | large biased sample; clustering/dependence ignored; nonsampling error absent; model too restrictive | recompute under design dependence and plausible coverage/measurement/selection bias | estimator and quality review |
| Randomized result does not replicate in deployment | participant selection; treatment/version drift; effect modification; adherence or context difference | compare source and target eligibility, versions, modifiers, support, implementation, and outcomes | study and target-deployment owners |
| Random test split performs well but future data fails | identity/template leakage; temporal or environment shift; target task differs; preprocessing learned globally | rerun grouped, temporal, cross-environment, and leakage-controlled splits tied to the target claim | benchmark and data-split owner |
| Two reports use the same data but disagree | different estimands; analytic samples; weights; missingness; outcome definitions; estimators | align target quantity, inclusion flow, transformations, code/version, and uncertainty contract | analysis owners and reviewer |
| “Representative” sample misses a decision-critical subgroup | target/criterion unstated; quotas ignore outcome modifiers; small or zero subgroup support | state the exact result to generalize and audit subgroup coverage, precision, measurement, and effect/behavior differences | study design and decision owner |
| Estimate is precise for the sample but unsupported for the target | random assignment without target sampling; selection model absent; source-target differences unmeasured | separate study-sample estimand from target estimand and test transport assumptions/support | inference and transport owner |

## Use contract

1. Freeze the exact claim, target population, unit, boundary, version, and time.
2. Preserve frame, selected, observed, and analytic sample identities plus every
   transition between them.
3. State estimand, estimator, estimate, uncertainty, and interpretation in
   separate fields.
4. List candidate failures across coverage, selection, response, measurement,
   processing, linkage, modeling, dependence, and transport.
5. Run the smallest discriminating audit without hiding nulls, unsupported
   strata, or extreme weights.
6. Repair the owning stage and re-evaluate both source-sample and target claims.

## Failure signs

- `population` means whoever happened to be in the database;
- frame, sample, and analytic sample share one overwritten identifier;
- exclusions and missingness are visible only as a final row count;
- estimate and estimand share one unlabeled metric name;
- random assignment is cited as proof of target representativeness;
- sample size substitutes for coverage, independence, or measurement quality;
- weighting is reported without target, probabilities/model, balance, overlap,
  extreme weights, or uncertainty;
- `representative`, `generalizable`, or `externally valid` appears without an
  exact target and result;
- unsupported subgroups disappear from the conclusion.

## Sources and provenance

1. [Sampling and generalization research note](../../docs/research/2026-08-15-sampling-generalization.md)
2. NIST/SEMATECH, “Populations and Sampling”:
   https://www.itl.nist.gov/div898/handbook/ppc/section1/ppc134.htm
3. U.S. Census Bureau, Statistical Quality Standard D3:
   https://www.census.gov/about/policies/quality/standards/standardd3.html
4. Westreich et al., “Target Validity and the Hierarchy of Study Designs”:
   https://pmc.ncbi.nlm.nih.gov/articles/PMC6357801/

This diagnostic organizes failure isolation; it does not certify statistical,
causal, survey, benchmark, or transport validity.

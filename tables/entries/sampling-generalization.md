# Population, Sample, Estimand, Estimate, and Generalization

Status: candidate anchor entry

## Orientation

A population is the bounded set or process about which a claim is intended; a
sampling frame operationalizes access to eligible units; a sample contains
selected or observed units; an analytic sample remains after response,
exclusion, linkage, missingness, and processing. An estimand is the target
quantity, an estimator is the rule used to estimate it, and an estimate is the
realized result. Generalization and transport extend a result or interpretation
to a target under explicit assumptions. None is guaranteed by sample size or a
`representative` label.

## Sense table

| Sense | Governing question | Role |
|---|---|---|
| `target-population` | Which bounded units, events, states, or process instances does the claim concern? | inference target |
| `sampling-frame` | Which operational list or mechanism provides access to candidate units, with what coverage? | selection basis |
| `sample` | Which units or measurements were selected, recruited, or observed? | observed subset |
| `analytic-sample` | Which observed records remain after exclusions, missingness, linkage, and preprocessing? | analysis input set |
| `estimand` | Which exact population or sample quantity is the analysis intended to learn? | target quantity |
| `estimator` | Which rule or procedure maps observed data to an estimate of the estimand? | estimation method |
| `estimate` | What value or structured result did the estimator produce for this data? | realized statistical result |
| `generalization` | Under what evidence and assumptions does a result extend from a sample to an overlapping target population? | source-to-containing-target inference |
| `transport` | Under what evidence and assumptions does a result extend to a partly or fully distinct target? | source-to-external-target inference |

## Chain view

```text
target population
  -- operationalized imperfectly by --> sampling frame
  -- selection/recruitment/response produces --> observed sample
  -- exclusion/linkage/missingness/processing produces --> analytic sample

target question
  -- formalized as --> estimand
analytic sample + estimator
  -- produces --> estimate + uncertainty + diagnostics

source result + target description + bridging assumptions/evidence
  -- supports or fails --> generalization / transport claim
```

## Root factorization

```text
sampling-generalization-use
  := exact claim and decision use
   x target population, unit, boundary, version, and time
   x sampling frame and coverage
   x selection mechanism and inclusion probabilities
   x invitation, participation, nonresponse, and attrition
   x observed and analytic sample construction
   x target quantity or estimand
   x estimator, weighting, adjustment, and model
   x estimate, sampling uncertainty, and diagnostics
   x measurement, processing, linkage, and missingness error
   x source-target differences, heterogeneity, and support overlap
   x generalization or transport assumptions and evidence
   x provenance, limitations, and revision
```

## Candidate factorizations

| Lens | Factorization | Pivot | Use when | Watch for |
|---|---|---|---|---|
| Finite-population survey | universe x frame x design x inclusion probability x response x weight x estimator | selection probability | estimating descriptive population quantities | convenience response treated as probability sampling |
| Process sampling | process boundary x time/order x operating regime x sampling plan x dependence | process regime | monitoring manufacturing, services, streams, or events | observations treated as independent or stationary without evidence |
| Study cohort | eligibility x recruitment x consent x follow-up x attrition x analysis set | participation path | experimental or observational studies | enrolled and analyzed populations silently equated |
| Estimation contract | target quantity x estimator x model/design x estimate x uncertainty x diagnostics | estimand | reviewing what a number means | estimator, estimate, and parameter sharing one label |
| Benchmark corpus | intended task population x corpus frame x selection x split x exclusions x metric aggregation | evaluation target | interpreting model or system results | dataset size or random split used as domain coverage proof |
| Generalization/transport | source population x target population x differences x modifiers x overlap x bridge evidence | source-target relation | applying results beyond the analytic sample | external validity asserted without a named target |

## Contrast table

| Pair | Shared feature | Decisive distinction |
|---|---|---|
| Population vs. frame | both enumerate or delimit possible units | inference target vs. operational access mechanism |
| Frame vs. sample | frame supports selection | candidate access set vs. selected/observed units |
| Study sample vs. analytic sample | both contain study units | observed/recruited set vs. records actually analyzed after transformations |
| Census vs. sample | both observe units | attempted complete enumeration of a defined population vs. subset |
| Parameter vs. estimand | both can name target quantities | model/population property vs. exact analysis target under conditions and intervention/aggregation choices |
| Statistic vs. estimate | both derive from data | any sample function vs. realized output interpreted relative to an estimand |
| Estimator vs. estimate | both concern estimation | rule across possible data vs. result for observed data |
| Sampling error vs. nonsampling error | both affect inference | repeated-selection variation vs. coverage, response, measurement, processing, linkage, or model defects |
| Random sampling vs. random assignment | both use random mechanisms | selects units for population inference vs. assigns conditions for comparison |
| Precision vs. accuracy | both describe result quality | repeated variability/resolution vs. closeness under bias and other errors |
| Generalization vs. transport | both extend inference | sample-to-overlapping target vs. source-to-partly or fully distinct target |
| Representativeness vs. generalizability | both concern source-target fit | ambiguous resemblance/property claim vs. explicit result, target, assumptions, and evidence |

## Diagnostic examples

- A customer list is a frame, not the population, when former customers remain
  and prospective or offline customers are absent.
- A randomly assigned trial can estimate a comparison for its participants yet
  leave applicability to older, excluded, or differently treated people open.
- A random train/test split estimates performance under that corpus and split
  process; it does not prove coverage of future environments or meanings.
- Ten million voluntary responses can produce narrow standard errors around a
  biased estimate when participation is related to the outcome.
- The sample arithmetic mean is a statistic. It becomes an estimate of a
  population mean only under a declared target and sampling/model contract.
- Weighting can align measured margins while leaving unmeasured selection,
  measurement error, and unsupported subgroups unresolved.
- A result may transport in direction but not magnitude when effect or behavior
  varies across settings.

## Selection procedure

1. State the exact descriptive, predictive, causal, benchmark, or decision
   claim and the target population, unit, boundary, version, and time.
2. Describe the sampling frame and quantify known undercoverage, overcoverage,
   duplication, ineligibility, and classification error.
3. Record selection, invitation, recruitment, consent, response, follow-up,
   attrition, and inclusion probabilities where applicable.
4. Preserve the observed sample and every rule that constructs the analytic
   sample, including exclusions, missingness, linkage, deduplication, and
   preprocessing.
5. State the estimand before selecting an estimator; name aggregation,
   conditioning, weighting, and treatment or measurement versions.
6. Record the estimator, design/model assumptions, estimate, sampling
   uncertainty, diagnostics, and sensitivity separately.
7. Audit nonsampling errors: coverage, nonresponse, measurement, processing,
   linkage, coding, and model misspecification.
8. Distinguish random sampling, random assignment, and random splitting and
   state what each random mechanism licenses.
9. For generalization or transport, compare source and target populations,
   settings, times, versions, effect/behavior modifiers, and support overlap.
10. State whether the estimate, direction, relation, mechanism, or
    interpretation is being extended and retain unsupported groups.
11. Replace `representative` with the exact target/result claim and evidence.

## Reference Delta

| Reference form | Typical contribution | Factorium delta |
|---|---|---|
| Dictionary | Defines population, sample, estimate, representative, and generalize | Separates selection sets, target quantity, method, result, and extension claim |
| Statistics text | Owns sampling designs, estimators, uncertainty, and inference theory | Supplies a cross-domain lookup spine without replacing technical methods |
| Survey methodology | Owns frame, response, weighting, coverage, and error practice | Connects those roles to experiments, benchmarks, and process samples |
| Study or benchmark report | Documents one population, sample, split, and analysis | Makes hidden source-to-target claims and transformations reviewable |
| Factorium | Links evidence, causal effects, uncertainty, measurement, and benchmarks | Adds a failure diagnostic and explicit generalization contract |

## Constraints and failure signs

- Population and sample identities include boundary, version, and time.
- Frame coverage and sample selection are reconstructable.
- Observed and analytic samples do not overwrite one another.
- Estimand, estimator, estimate, uncertainty, and interpretation remain distinct.
- Random sampling, assignment, and splitting retain separate purposes.
- Sample size is not used as a substitute for coverage, measurement, or bias.
- Weighting states target margins, source probabilities/models, extreme-weight
  handling, uncertainty, and remaining unsupported regions.
- `Representative` never appears without target, result, criterion, and evidence.
- Generalization and transport state source-target differences, assumptions,
  support, heterogeneity, and exclusions.
- A precise estimate is not called accurate without bias and error evidence.

## Specialized view

The [Sampling and Generalization Failure Diagnostic](../diagnostics/sampling-generalization-failures.md)
maps coverage, selection, attrition, estimation, precision, and transport
symptoms to candidate causes and discriminating tests.

## Cross-references

- [Claim and Evidence](claim-evidence.md)
- [Association and Causal Reasoning](causal-reasoning.md)
- [Probability, Risk, and Uncertainty](probability-risk-uncertainty.md)
- [Information, Data, Signal, and Noise](information-data-signal-noise.md)
- [Identity, Naming, Classification, and Versioning](identity-naming-classification-versioning.md)
- [Context](../roots/context.md)

## Sources and provenance

1. [Sampling and generalization research note](../../docs/research/2026-08-15-sampling-generalization.md)
2. NIST/SEMATECH, “Populations and Sampling”:
   https://www.itl.nist.gov/div898/handbook/ppc/section1/ppc134.htm
3. U.S. Census Bureau, Statistical Quality Standard D3:
   https://www.census.gov/about/policies/quality/standards/standardd3.html
4. Stuart et al., “Assessing the Generalizability of Randomized Trial Results”:
   https://pmc.ncbi.nlm.nih.gov/articles/PMC4359056/
5. Westreich et al., “Target Validity and the Hierarchy of Study Designs”:
   https://pmc.ncbi.nlm.nih.gov/articles/PMC6357801/
6. Meng, “Statistical Paradises and Paradoxes in Big Data”:
   https://statistics.fas.harvard.edu/sites/g/files/omnuum10116/files/statistics-2/files/statistical_paradises_and_paradoxes.pdf

Comparator access date: 2026-08-15. Statistical methods retain their source
conditions; this cross-domain organization remains `candidate`.

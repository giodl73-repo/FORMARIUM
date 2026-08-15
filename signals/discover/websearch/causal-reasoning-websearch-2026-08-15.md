---
skill: discover-websearch
topic: causal-reasoning
date: 2026-08-15
claims_checked: 4
confirmed: 4
---

# Causal Reasoning Web Evidence

## Phase 1 - Claims to ground

| # | Claim | Source of claim | Why it needs grounding |
|---|---|---|---|
| 1 | Association, temporal order, and predictive fit do not alone identify a causal effect. | proposed Factorium distinction | Otherwise ordinary correlations become causal claims. |
| 2 | A causal-effect claim needs an explicit contrast, population or units, outcome, and horizon plus identification assumptions. | proposed factor spine | Without these, “effect” has no stable target. |
| 3 | Evidence for a total causal effect and evidence for a causal mechanism are related but non-equivalent. | proposed mechanism sense | Otherwise a mediator label or successful intervention is treated as mechanism proof. |
| 4 | Effects of a cause across units and attribution of a cause for one realized outcome answer different questions. | proposed attribution sense | Otherwise population evidence automatically decides individual responsibility. |

## Phase 2 - Web evidence

### Claim 1

- Query 1: `Hernan Robins causal inference association causation counterfactual intervention`
  - Source: https://www.hsph.harvard.edu/miguel-hernan/wp-content/uploads/sites/1268/2024/04/hernanrobins_WhatIf_26apr24.pdf
  - Direct quote: “distinction between causation and association”
  - Relevance: the primary text organizes causal inference around a contrast association cannot supply alone.
- Query 2: `WHO causality association temporality alternative explanations Bradford Hill`
  - Source: https://iris.who.int/bitstream/handle/10665/381746/9789240112360-eng.pdf?sequence=1
  - Direct quote: “causal, rather than merely correlational and hence spurious”
  - Relevance: the official synthesis requires multiple lines of evidence when experiments are unavailable.
- Verdict: CONFIRMED

### Claim 2

- Query 1: `Rubin estimating causal effects randomized nonrandomized studies`
  - Source: https://files.eric.ed.gov/fulltext/ED069724.pdf
  - Direct quote: “randomization should be employed whenever possible”
  - Relevance: the original treatment-effect work centers design and controlled comparison.
- Query 2: `causal inference consistency positivity exchangeability assumptions`
  - Source: https://pmc.ncbi.nlm.nih.gov/articles/PMC11588567/
  - Direct quote: “Three fundamental identification assumptions must be satisfied”
  - Relevance: an observed contrast gains causal interpretation only under declared conditions.
- Verdict: CONFIRMED

### Claim 3

- Query 1: `causal mechanisms mediation effect evidence assumptions`
  - Source: https://pmc.ncbi.nlm.nih.gov/articles/PMC8974292/
  - Direct quote: “through a potential causal mechanism”
  - Relevance: mediation targets paths but the guideline separately requires assumptions and reporting.
- Query 2: `experimental mediation statistical evidence fails causal evidence mechanism`
  - Source: https://pmc.ncbi.nlm.nih.gov/articles/PMC4999253/
  - Direct quote: “fails to provide causal evidence of the mediation relationship”
  - Relevance: statistical mediation alone does not establish the proposed mechanism.
- Verdict: CONFIRMED

### Claim 4

- Query 1: `Pearl causes of effects effects of causes attribution`
  - Source: https://cris.technion.ac.il/en/publications/causes-of-effects-and-effects-of-causes/
  - Direct quote: “determining individual cases from statistical data”
  - Relevance: the paper explicitly separates attribution questions from effect estimation.
- Query 2: `Halpern Pearl actual cause structural equations counterfactuals`
  - Source: https://www.journals.uchicago.edu/doi/pdf/10.1093/bjps/axi147?download=true
  - Direct quote: “definition of actual causes, using structural equations”
  - Relevance: actual-cause analysis requires a model of the realized case, not only an average effect.
- Verdict: CONFIRMED

## Phase 3 - Findings table

| # | Finding | Verdict | Source |
|---|---|---|---|
| 1 | Causal inference is organized around counterfactual contrasts, not association alone. | CONFIRMED | [Hernán and Robins](https://www.hsph.harvard.edu/miguel-hernan/wp-content/uploads/sites/1268/2024/04/hernanrobins_WhatIf_26apr24.pdf) |
| 2 | Observational association can reflect chance, bias, or confounding. | CONFIRMED | [WHO](https://applications.emro.who.int/dsaf/dsa237.pdf) |
| 3 | Temporality is necessary but does not by itself establish cause. | CONFIRMED | [WHO](https://iris.who.int/bitstream/handle/10665/381746/9789240112360-eng.pdf?sequence=1) |
| 4 | Causal assumptions encoded in diagrams are not directly verified from the same data. | CONFIRMED | [Conceptual framework](https://pmc.ncbi.nlm.nih.gov/articles/PMC6162585/) |
| 5 | Randomization supports causal comparison by design, subject to execution and target-scope limits. | CONFIRMED | [Rubin](https://files.eric.ed.gov/fulltext/ED069724.pdf) |
| 6 | Causal consistency links the observed outcome to the specified treatment version. | CONFIRMED | [Methods in causal inference](https://pmc.ncbi.nlm.nih.gov/articles/PMC11588567/) |
| 7 | Positivity requires relevant treatment alternatives to be represented for the target comparison. | CONFIRMED | [Methods in causal inference](https://pmc.ncbi.nlm.nih.gov/articles/PMC11588567/) |
| 8 | Exchangeability addresses balance in causes of the potential outcomes. | CONFIRMED | [Methods in causal inference](https://pmc.ncbi.nlm.nih.gov/articles/PMC11588567/) |
| 9 | A causal query distinguishes effects of interventions, counterfactual probabilities, and mediated effects. | CONFIRMED | [Pearl introduction](https://escholarship.org/uc/item/5wk4j60p) |
| 10 | Mediation analysis targets possible paths through which an exposure affects an outcome. | CONFIRMED | [AGReMA](https://pmc.ncbi.nlm.nih.gov/articles/PMC8974292/) |
| 11 | Even randomized treatment does not automatically randomize the mediator. | CONFIRMED | [Mechanisms in RCTs](https://pmc.ncbi.nlm.nih.gov/articles/PMC6708183/) |
| 12 | Statistical mediation can satisfy covariation while missing temporal precedence and alternative-explanation control. | CONFIRMED | [Experimental mediation](https://pmc.ncbi.nlm.nih.gov/articles/PMC4999253/) |
| 13 | Total, direct, and indirect effects are distinct causal targets. | CONFIRMED | [Mechanisms and mediation](https://pmc.ncbi.nlm.nih.gov/articles/PMC4772586/) |
| 14 | Population effect estimation can be informative without fully identifying the underlying mechanism. | CONFIRMED | [Causal effects versus mechanisms](https://pmc.ncbi.nlm.nih.gov/articles/PMC12013535/) |
| 15 | Attribution asks whether an exposure caused a particular realized outcome. | CONFIRMED | [Pearl](https://cris.technion.ac.il/en/publications/causes-of-effects-and-effects-of-causes/) |
| 16 | Actual-cause accounts add case facts, structural relations, and counterfactual contingencies. | CONFIRMED | [Halpern and Pearl](https://www.journals.uchicago.edu/doi/pdf/10.1093/bjps/axi147?download=true) |

Summary: 4 of 4 claims confirmed; 16 grounded findings; none contradicted or unconfirmed.

## Phase 4 - Ungrounded claims

No ungrounded claims. The evidence does not establish one universal definition
of cause or mechanism across science, law, engineering, history, and ordinary
language; Factorium must retain model and domain scope.

## Phase 5 - Amend

1. Make the causal claim type and target contrast the first selection step.
2. Separate effect identification, effect estimation, mechanism evidence, and
   actual-case attribution rather than arranging them as automatic maturity
   levels.
3. Require assumptions, competing explanations, negative/null evidence,
   transport scope, and sensitivity; never award causal status to a diagram,
   regression, randomized label, or intervention outcome by mechanism alone.

---
skill: discover-websearch
topic: chemical-reaction-stoichiometry-equilibrium
date: 2026-08-15
claims_checked: 5
confirmed: 5
---

# Chemical Reaction, Stoichiometry, Rate, and Equilibrium Web Evidence

## Phase 1 - Claims to ground

| # | Claim | Source | Why it matters |
|---|---|---|---|
| 1 | Reaction process, reaction equation, and mechanism are distinct. | proposed anchor | A symbolic balance must not become pathway proof. |
| 2 | Signed stoichiometric numbers connect species amount changes through reaction extent. | proposed formula view | Progress accounting requires direction, scale, and units. |
| 3 | Reaction rate differs from individual species rates and from a rate law. | proposed anchor | Coefficients, normalization, and empirical status must remain visible. |
| 4 | Equilibrium is dynamic and its constant requires reaction and activity conventions. | proposed anchor | Constant composition and raw concentration products are insufficient. |
| 5 | A catalyst affects rate/pathway, not overall standard Gibbs-energy change. | proposed anchor | Faster approach must not be called an equilibrium shift. |

## Phase 2 - Web evidence

### Claim 1

- Query: `site:goldbook.iupac.org chemical reaction reaction equation definition`
  - https://goldbook.iupac.org/terms/view/C01033 — “A process that results in the interconversion of chemical species.”
  - https://goldbook.iupac.org/terms/view/C01034 — “Symbolic representation of a chemical reaction”
- Query: `site:goldbook.iupac.org reaction mechanism intermediate elementary reaction`
  - https://goldbook.iupac.org/terms/view/M03804 — “A detailed description of the process leading from the reactants to the products”
  - https://goldbook.iupac.org/terms/view/E02035 — an elementary reaction occurs in a single step.
- Verdict: CONFIRMED

### Claim 2

- Query: `site:goldbook.iupac.org stoichiometric number definition`
  - https://goldbook.iupac.org/terms/view/S06025 — “positive for products and negative for reactants”
- Query: `site:goldbook.iupac.org extent of reaction definition`
  - https://goldbook.iupac.org/terms/view/E02283 — `dξ = dn_B/ν_B`
- Verdict: CONFIRMED

### Claim 3

- Query: `site:goldbook.iupac.org rate of reaction appearance disappearance`
  - https://goldbook.iupac.org/terms/view/R05156 — species rates differ from reaction rate by stoichiometric factors.
- Query: `site:goldbook.iupac.org rate law definition`
  - https://goldbook.iupac.org/terms/view/R05141 — “An expression for the rate of reaction ... in terms of concentrations ... and constant parameters”
- Verdict: CONFIRMED

### Claim 4

- Query: `site:goldbook.iupac.org chemical equilibrium forward reverse rates`
  - https://goldbook.iupac.org/terms/view/C01023 — “the rates in both directions are identical”
- Query: `site:goldbook.iupac.org equilibrium constant activity stoichiometric number`
  - https://goldbook.iupac.org/terms/view/E02177 — defines `K` from convention-selected equilibrium quantities and signed stoichiometric numbers.
  - https://goldbook.iupac.org/terms/view/A00115 — activity is defined relative to standard chemical potential.
- Verdict: CONFIRMED

### Claim 5

- Query: `site:goldbook.iupac.org catalyst standard Gibbs energy change`
  - https://goldbook.iupac.org/terms/view/C00876 — “increases the rate ... without modifying the overall standard Gibbs energy change”
- Query: `site:goldbook.iupac.org catalysed rate absence added catalytic material`
  - https://goldbook.iupac.org/terms/view/C00873 — catalysed rate compares observed and spontaneous rates under otherwise similar conditions.
- Verdict: CONFIRMED

## Phase 3 - Findings table

| # | Finding | Verdict | Source |
|---|---|---|---|
| 1 | A chemical reaction is a species-interconversion process. | CONFIRMED | [IUPAC](https://goldbook.iupac.org/terms/view/C01033) |
| 2 | A reaction equation is a symbolic representation. | CONFIRMED | [IUPAC](https://goldbook.iupac.org/terms/view/C01034) |
| 3 | Equation connectors distinguish relation, direction, reversibility, and equilibrium. | CONFIRMED | [IUPAC](https://goldbook.iupac.org/terms/view/C01034) |
| 4 | Reactant and reagent are not preferred as universal synonyms. | CONFIRMED | [IUPAC](https://goldbook.iupac.org/terms/view/R05163) |
| 5 | Product denotes a substance formed during reaction. | CONFIRMED | [IUPAC](https://goldbook.iupac.org/terms/view/P04861) |
| 6 | Stoichiometry relates reacting and produced amounts. | CONFIRMED | [IUPAC](https://goldbook.iupac.org/terms/view/S06026) |
| 7 | Overall stoichiometry may be complex or time-dependent. | CONFIRMED | [IUPAC](https://goldbook.iupac.org/terms/view/S06026) |
| 8 | Stoichiometric numbers are signed by reactant/product role. | CONFIRMED | [IUPAC](https://goldbook.iupac.org/terms/view/S06025) |
| 9 | Extent is an extensive reaction-progress quantity. | CONFIRMED | [IUPAC](https://goldbook.iupac.org/terms/view/E02283) |
| 10 | Species amount change and extent are linked through the stoichiometric number. | CONFIRMED | [IUPAC](https://goldbook.iupac.org/terms/view/E02283) |
| 11 | Reaction rate and species appearance/disappearance rates require coefficient conversion. | CONFIRMED | [IUPAC](https://goldbook.iupac.org/terms/view/R05156) |
| 12 | A single reaction-rate treatment can fail with intermediates or side products. | CONFIRMED | [IUPAC](https://goldbook.iupac.org/terms/view/R05156) |
| 13 | A rate law is a kinetic expression, not the balanced equation. | CONFIRMED | [IUPAC](https://goldbook.iupac.org/terms/view/R05141) |
| 14 | Equilibrium can have equal opposing rates and apparently static composition. | CONFIRMED | [IUPAC](https://goldbook.iupac.org/terms/view/C01023) |
| 15 | Equilibrium constants retain reaction stoichiometry and quantity convention. | CONFIRMED | [IUPAC](https://goldbook.iupac.org/terms/view/E02177) |
| 16 | Thermodynamic activity is relative to a selected standard state. | CONFIRMED | [IUPAC](https://goldbook.iupac.org/terms/view/A00115) |
| 17 | Catalysts increase rate without modifying overall standard Gibbs-energy change. | CONFIRMED | [IUPAC](https://goldbook.iupac.org/terms/view/C00876) |
| 18 | Mechanisms remain evidence-constrained and alternatives may survive. | CONFIRMED | [IUPAC](https://goldbook.iupac.org/terms/view/M03804) |

Summary: 5 of 5 claims confirmed; 18 findings; none contradicted or unconfirmed.

## Phase 4 - Ungrounded claims

No ungrounded claims. The evidence does not support inferring a unique
mechanism, rate law, equilibrium state, or catalytic effect from a balanced
equation alone.

## Phase 5 - Amend

1. Separate process, representation, accounting, kinetics, thermodynamics, and mechanism.
2. Retain equation direction/scaling and activity/standard-state conventions.
3. Keep named reaction and catalyst families outside the canonical sense list.

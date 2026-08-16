---
skill: roles-check
topic: chemical-reaction-stoichiometry-equilibrium
date: 2026-08-15
roles_used: 13
p1_count: 0
verdict: APPROVED
---

# Chemical Reaction, Stoichiometry, Rate, and Equilibrium Roles Check

## Artifact identification

Artifact type: canonical Factor Table anchor, Formula Table, Diagnostic Table,
two cross-reference repairs, source review, and proposed book registration.

Domain signals: chemical process, representation, stoichiometric accounting,
kinetics, thermodynamics, catalysis, mechanism evidence, units, and pedagogy.

## Role selection

| Role | Why selected |
|---|---|
| Compositional Semantics Steward | Tests process roles and dependencies across reaction views. |
| Factorization Method Steward | Tests whether process, equation, kinetics, thermodynamics, and mechanism are genuine pivots. |
| Experimental Methodologist | Audits rate, equilibrium, catalyst, and mechanism comparisons. |
| Evidence & Claims Editor | Prevents balance, fit, or stasis from becoming proof. |
| Benchmark Numeracy Checker | Audits signs, coefficients, rates, normalizations, conditions, and uncertainty. |
| Reference Lexicographer | Separates reaction/equation/mechanism and nearby quantity terms. |
| Reference Architecture Editor | Connects the chemical, amount, stock-flow, thermal, and process entries. |
| Concept & Taxonomy Boundary Editor | Blocks named reaction and catalyst catalogs. |
| Domain Source Reviewer | Checks IUPAC terminology and specialist authority limits. |
| Research Integrity & Provenance | Preserves observations, equation versions, fits, and mechanism status. |
| Equation & Units Auditor | Audits extent, rate, activity, Gibbs-energy, and equilibrium formulas. |
| Mapping Integrity Auditor | Audits equation rescaling/reversal and species-to-reaction rate mappings. |
| Reference Practitioner | Tests quick use from a conflicting reaction claim. |

## Review

### Compositional Semantics Steward

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Reactant, product, intermediate, and catalyst roles could appear intrinsic to a substance. | P2 | Sense table | Bind roles to one selected reaction and boundary. Closed. |
| 2 | One extent coordinate could be imposed on simultaneous reactions. | P2 | Procedure | Require adequacy of the single-reaction description. Closed. |
| 3 | Kinetic and thermodynamic factors could be advertised as independent. | P2 | Root factors | Declare shared species, state, and condition dependencies. Closed. |

### Factorization Method Steward

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Reaction, equation, and mechanism could collapse. | P2 | Orientation | Preserve process, representation, and evidence model. Closed. |
| 2 | Rate and equilibrium could share one progress axis. | P2 | Contrasts | Separate speed from balance/position. Closed. |
| 3 | Named reactions could create a subtype explosion. | P2 | Boundary | Keep named families outside canonical senses. Closed. |

### Experimental Methodologist

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Catalyzed and control rates may differ in temperature or composition. | P2 | Diagnostic | Require otherwise comparable conditions. Closed. |
| 2 | Apparent equilibrium could be kinetic arrest or instrument floor. | P2 | Diagnostic | Add reversible perturbation and repeatability tests. Closed. |
| 3 | One fitted curve could favor a mechanism post hoc. | P2 | Mechanism | Require frozen alternatives and independent evidence. Closed. |

### Evidence & Claims Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Balanced equations could be called pathway evidence. | P2 | Constraints | State that balance is necessary, not sufficient. Closed. |
| 2 | A rate-law fit could prove a unique mechanism. | P2 | Diagnostic | Retain kinetically equivalent alternatives. Closed. |
| 3 | Candidate relations could become safe-operation guidance. | P2 | Claim limit | Exclude reaction and safety certification. Closed. |

### Benchmark Numeracy Checker

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Stoichiometric sign and equation scale may disappear. | P2 | Symbol contract | Require signed numbers and exact equation version. Closed. |
| 2 | Total, volume-, area-, and mass-normalized rates may mix. | P2 | Rate relation | Declare every normalization and unit. Closed. |
| 3 | Conditions and uncertainty may be omitted from `K`. | P2 | Equilibrium | Require temperature, phase, convention, and uncertainty. Closed. |

### Reference Lexicographer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Reactant and reagent could become universal synonyms. | P2 | Contrasts | Separate consumption role from test/addition use. Closed. |
| 2 | Product and intermediate could collapse. | P2 | Contrasts | Separate formed outcome from formed-and-reacts-onward role. Closed. |
| 3 | Species rate and reaction rate could share one label. | P2 | Sense table | Keep coefficient-normalized and observed-species quantities distinct. Closed. |

### Reference Architecture Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Amount and activity authority could be duplicated. | P2 | Cross-references | Link and resolve debt while leaving quantities with their owners. Closed. |
| 2 | Formula detail could swamp the anchor. | P2 | Specialized views | Move equations to one Formula Table. Closed. |
| 3 | Diagnostics need a direct route from the book. | P3 | Registration | Admit anchor, Formula, and Diagnostic together. Closed. |

### Concept & Taxonomy Boundary Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Familiar named reactions could be promoted as sibling senses. | P2 | Whole entry | Canonize process concepts only. Closed. |
| 2 | Catalyst types could become an open-ended catalog. | P2 | Catalyst | Keep pathway role general and specialist types external. Closed. |
| 3 | Examples might determine the factorization. | P3 | Procedure | Require the structure to survive example substitution. Closed. |

### Domain Source Reviewer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | IUPAC rate-of-reaction scope contains important limitations. | P2 | Rate | Preserve constant-volume and complex-reaction caveats. Closed. |
| 2 | Mechanism language may exceed available evidence. | P2 | Mechanism | Mark alternatives and incomplete evidence. Closed. |
| 3 | Thermodynamic activity approximations vary by domain. | P2 | Formula | Require declared activity model and standard state. Closed. |

### Research Integrity & Provenance

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Normalized rates could overwrite raw species observations. | P2 | Diagnostic contract | Preserve raw data and normalization metadata. Closed. |
| 2 | Equation reversal/rescaling could become invisible. | P2 | Provenance | Version the exact equation representation. Closed. |
| 3 | Proposed mechanisms could lose alternative/null history. | P2 | Mechanism | Retain model status and competing accounts. Closed. |

### Equation & Units Auditor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | `dn_B = nu_B dxi` needs sign, dimension, and scale contracts. | P2 | Formula | Define every symbol and rescaling behavior. Closed. |
| 2 | Concentration products could be called dimensionless thermodynamic `K`. | P2 | Formula | Use relative activities and state approximations. Closed. |
| 3 | `ln Q` must have a dimensionless argument. | P2 | Formula | Define `Q` from dimensionless activities. Closed. |

### Mapping Integrity Auditor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Species-rate to reaction-rate mapping could omit direction and coefficient. | P2 | Rate | Preserve signed `nu_B` and observed species. Closed. |
| 2 | Reversing a reaction could leave `K` unchanged incorrectly. | P2 | Equilibrium | Transform direction, exponents, and standard quantity consistently. Closed. |
| 3 | Rescaling equations could imply invariant numerical extent. | P2 | Extent | Bind extent to the exact equation scale. Closed. |

### Reference Practitioner

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Readers need a quick ladder before formulas. | P2 | Four-view chain | Lead with process/accounting/kinetics/thermodynamics. Closed. |
| 2 | Common misconceptions need recognizable symptoms. | P2 | Diagnostic | Include balance, rate factor, false equilibrium, and catalyst cases. Closed. |
| 3 | Mechanism evidence needs actionable escalation. | P3 | Procedure | Name independent evidence families without prescribing experiments. Closed. |

## Synthesis

```text
Roles reviewed: 13
P1 blockers: 0  |  P2 issues: 34  |  P3 notes: 5
Verdict: APPROVED
```

Top finding: a balanced equation constrains stoichiometry but does not prove a
rate law, elementary step, or mechanism. Cross-role consensus requires exact
equation direction/scale, species roles, conditions, normalization, activity
convention, uncertainty, and claim status.

## Amendments

1. Separated process, representation, accounting, kinetics, thermodynamics, and mechanism.
2. Added a symbol/units contract and equation reversal/rescaling warnings.
3. Kept named reactions and catalyst families outside the canonical sense list.


---
skill: roles-check
topic: thermodynamic-system-state-phase
date: 2026-08-15
roles_used: 13
p1_count: 0
verdict: APPROVED
---

# Thermodynamic System, State, Process, and Phase Roles Check

Artifact: canonical Factor Table, Diagnostic view, cross-reference repairs,
source review, and proposed book registration. Signals: thermodynamics,
boundaries, transfers, state, scaling, processes, phases, materials, and units.

## Reviews

### Compositional Semantics Steward

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | System, surroundings, and boundary could be treated as independent objects. | P2 | Chain | Declare complement/interface dependencies. Closed. |
| 2 | Exchange labels could combine invalidly. | P2 | Senses | Derive open/closed/isolated from a transfer contract. Closed. |
| 3 | Phase identity could ignore observation scale. | P2 | Procedure | Require spatial/time scale and evidence. Closed. |

### Factorization Method Steward

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | State and path could collapse. | P2 | Contrasts | Separate endpoint condition from route/history. Closed. |
| 2 | Phase and aggregation label could collapse. | P2 | Contrasts | Use uniformity as the pivot. Closed. |
| 3 | Named phases could create subtype explosion. | P2 | Boundary | Keep names as examples. Closed. |

### Experimental Methodologist

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Single-phase claims could rely on appearance. | P2 | Diagnostic | Require independent phase-sensitive tests. Closed. |
| 2 | Transition points could ignore history/rate. | P2 | Diagnostic | Test heating/cooling, hysteresis, and calibration. Closed. |
| 3 | Steady state could be selected as equilibrium post hoc. | P2 | Diagnostic | Add perturbation, gradient, and flux tests. Closed. |

### Evidence & Claims Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Container appearance could prove closed-system status. | P2 | Constraints | Require measured exchange evidence. Closed. |
| 2 | Equation-of-state fit could become universal law. | P2 | Model | Retain material, phase, and range. Closed. |
| 3 | Diagnostic could imply safety certification. | P2 | Claim boundary | Exclude safe-operation claims. Closed. |

### Benchmark Numeracy Checker

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Transfers may use mismatched intervals/signs. | P2 | Diagnostic | Reconcile one interval and convention. Closed. |
| 2 | Extensive additivity may omit overlap/interface terms. | P2 | Scaling | Require nonoverlap and interaction accounting. Closed. |
| 3 | Transition conditions may omit rate and uncertainty. | P2 | Procedure | Record history, rate, calibration, and uncertainty. Closed. |

### Reference Lexicographer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Boundary and wall could become synonyms. | P2 | Contrasts | Separate analytical interface and object. Closed. |
| 2 | State, steady state, and equilibrium could collapse. | P2 | Contrasts | Separate condition, time invariance, and balance. Closed. |
| 3 | Phase and state of aggregation could collapse. | P2 | Contrasts | Preserve uniformity criterion. Closed. |

### Reference Architecture Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Generic state/process authority could be duplicated. | P2 | Crossrefs | Keep this anchor thermodynamic and link general entry. Closed. |
| 2 | Thermal and chemical phase debt lacked one owner. | P2 | Registration | Assign stable thermodynamic owner. Closed. |
| 3 | Formula detail could distract. | P3 | Scope | Defer equations of state to later scoped views. Closed. |

### Concept & Taxonomy Boundary Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Solid/liquid/gas might become sibling canonical senses. | P2 | Procedure | Keep named aggregation states as examples. Closed. |
| 2 | Crystal/mesophase subclasses could expand without bound. | P2 | Constraints | Canonize uniformity and transition criteria. Closed. |
| 3 | Device types could define system classes. | P3 | Whole entry | Keep exchange contract primary. Closed. |

### Domain Source Reviewer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Phase definitions vary by specialized domain. | P2 | Sources | Use IUPAC spine and retain specialist authority. Closed. |
| 2 | Equilibrium concepts may be overgeneralized to nonequilibrium systems. | P2 | Root factors | Require equilibrium scope. Closed. |
| 3 | NIST synthesis should not become a universal axiom set. | P2 | Provenance | Keep candidate status and source scope. Closed. |

### Research Integrity & Provenance

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Boundary revisions could overwrite prior balances. | P2 | Use contract | Version boundary and preserve raw transfers. Closed. |
| 2 | Process normalization could overwrite raw time series. | P2 | Diagnostic | Preserve raw observations. Closed. |
| 3 | Phase classification could omit method/resolution. | P2 | Procedure | Record method, scale, conditions, uncertainty. Closed. |

### Equation & Units Auditor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Intensive/extensive could be inferred from units. | P2 | Constraints | Use independence/additivity tests. Closed. |
| 2 | Specific and molar quantities could be confused with totals. | P2 | Root factors | Preserve denominator basis. Closed. |
| 3 | Equation-of-state scope could omit variables/range. | P2 | Procedure | Require model contract and residual checks. Closed. |

### Mapping Integrity Auditor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Total-to-specific mapping could omit denominator. | P2 | Scaling | Preserve basis and direction. Closed. |
| 2 | Boundary changes could be treated as identity-preserving automatically. | P2 | Diagnostic | Reconcile old/new inventories explicitly. Closed. |
| 3 | Broad aggregation labels could map exactly to phases. | P2 | Contrasts | Mark the mapping contextual and many-to-many. Closed. |

### Reference Practitioner

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Readers need boundary first. | P2 | Procedure | Start with drawing and transfer contract. Closed. |
| 2 | Scaling tests need operational wording. | P2 | Procedure | Add duplicate/partition tests. Closed. |
| 3 | Phase disputes need direct checks. | P3 | Diagnostic | Pair symptoms with tests and owners. Closed. |

## Synthesis

```text
Roles reviewed: 13
P1 blockers: 0  |  P2 issues: 34  |  P3 notes: 5
Verdict: APPROVED
```

Top finding: system class must follow the boundary exchange contract, and phase
must follow a scale-bound uniformity criterion. All findings are closed.

## Amendments

1. Made boundary and exchange contract the entry point.
2. Separated state/path, equilibrium/steady state, and phase/aggregation label.
3. Excluded named phase and device catalogs from canonical senses.

---
skill: roles-check
topic: stock-flow-balance
date: 2026-08-15
roles_used: 9
p1_count: 0
verdict: APPROVED
---

# Stock, Flow, Balance, and Conservation Roles Check

## Phase 1 - Artifact identification

Artifact type: canonical Factor Table anchor, reassigned Formula Table view,
new Diagnostic Table view, source review, cross-reference repairs, and
proposed interchange registration.

Domain signals: accounting, conservation laws, control volumes, inventories,
energy storage, hydrology, populations, operational metrics, system models,
uncertainty, reference architecture, and practitioner lookup.

## Phase 2 - Role selection

| Role | Why selected |
|---|---|
| Factorization Method Steward | Tests whether one engineering stock-flow model becomes universal. |
| Evidence & Claims Editor | Prevents arithmetic closure from becoming physical or custody proof. |
| Benchmark Numeracy Checker | Audits units, intervals, netting, denominators, and residual uncertainty. |
| Reference Lexicographer | Five close terms and many domain synonyms require quick separation. |
| Reference Architecture Editor | The General Accounting Balance view changes canonical ownership. |
| Domain Source Reviewer | Accounting and conservation authority must stay with native domains. |
| Research Integrity & Provenance | Every term, correction, residual, and authority must be reconstructable. |
| Equation & Units Auditor | The inherited balance formula mixes stocks, rates, interval totals, and signs. |
| Reference Practitioner | The diagnostic must improve a real reconciliation quickly. |

## Phase 3 - Review

### Factorization Method Steward

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Control-volume engineering could appear to be the universal decomposition. | P2 | Candidate factorizations | Retain account, compartment, capacity, ledger, population, and residual pivots. Closed. |
| 2 | Boundary, property, interval, and sign are dependent contract fields rather than freely combinable tags. | P2 | Root factorization | Keep them ordered in the selection procedure and constrain incompatible units and scopes. Closed. |
| 3 | Software events, financial transactions, and physical flows could be treated as identical mechanisms. | P2 | Candidate factorizations | Present them as contextual lenses with separate completion, valuation, and conservation authority. Closed. |

### Evidence & Claims Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | A closing spreadsheet could be summarized as proof that every term is true. | P2 | Constraints | Deny that closure proves measurement, custody, causal explanation, or correctness. Closed. |
| 2 | A residual could be named leak, fraud, loss, or creation without discriminating evidence. | P2 | Diagnostic view | Keep omitted terms, timing, models, and measurement error as competing causes. Closed. |
| 3 | Zero stock change could be reported as inactivity or equilibrium. | P2 | Contrast table | Define steady state only as zero accumulation at the selected resolution and tolerance. Closed. |

### Benchmark Numeracy Checker

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Amounts, interval totals, and rates could be added directly. | P2 | Formula and constraints | Require compatible quantity kinds, units, and time bases before aggregation. Closed. |
| 2 | One net value could hide large opposing gross flows. | P2 | Selection procedure | Preserve gross directional terms before cancellation. Closed. |
| 3 | A residual magnitude could be interpreted without propagated component uncertainty. | P2 | Diagnostic view | Compare residual with uncertainty and independently estimated omitted terms. Closed. |

### Reference Lexicographer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Stock could silently mean contents, capacity, inventory class, or financial equity. | P2 | Contrast table | Orient the canonical sense as attributed amount/state quantity and contrast capacity; preserve domain terms. Closed. |
| 2 | Flow could collapse interval amount, rate, process, and cash-flow category. | P2 | Sense table | Require direction, property, interval, and rate-versus-total basis. Closed. |
| 3 | Balance and conservation could appear synonymous because both use equality. | P2 | Orientation | Define reconciliation grammar separately from a domain constraint on creation/destruction. Closed. |

### Reference Architecture Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | General Accounting Balance is cross-domain and is weakly owned by the energy-only sense. | P2 | Canonical ownership | Reassign it to all five stable senses of the new anchor. Closed in integration plan. |
| 2 | The new anchor could duplicate existing work/energy, electrical current, control, and population entries. | P2 | Cross-references | Own only the structural stock-flow contract and link domain quantities back to native anchors. Closed. |
| 3 | A long exposition could displace the book's table-first grammar. | P3 | Whole entry | Lead with orientation, sense, chain, factorization, contrast, and procedure tables. Closed. |

### Domain Source Reviewer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Generic balance language could claim the authority of physical conservation laws. | P2 | Limits | Keep mass, energy, charge, momentum, and other laws within their native assumptions and sources. Closed. |
| 2 | One accounting framework could be universalized across finance, national accounts, inventory, and populations. | P2 | Provenance | Use the UN material as one lens and keep recognition, valuation, and consolidation domain-specific. Closed. |
| 3 | The diagnostic could be mistaken for financial, hydrologic, or engineering certification. | P2 | Diagnostic boundary | Explicitly deny certification and retain candidate maturity. Closed. |

### Research Integrity & Provenance

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Corrections and reclassifications could overwrite the original observed terms. | P2 | Selection procedure | Preserve source terms, revisions, effective times, and supersession separately. Closed. |
| 2 | Netting could destroy the evidence needed to reconstruct gross movements. | P2 | Constraints | Preserve gross terms and record consolidation policy before net reporting. Closed. |
| 3 | Factorium synthesis could blur with established source statements. | P2 | Provenance | Bind 16 findings to URLs and label the five-sense organization candidate. Closed. |

### Equation & Units Auditor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Differential-rate and finite-interval forms could be treated as interchangeable without integration. | P2 | Formula special forms | State that interval terms are totals over one interval and rate terms share `D_Q T^-1`. Closed. |
| 2 | Signed rates could be subtracted twice. | P2 | Formula scope | Require either signed terms or nonnegative magnitudes with explicit subtraction. Closed. |
| 3 | Dimensional closure could be reported as scientific validity. | P2 | Formula limits | Keep domain authority, complete terms, measurement, and evidence separate from dimensional audit. Closed. |

### Reference Practitioner

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | A reader needs a first question before encountering conservation notation. | P2 | Selection procedure | Begin with the decision, property, boundary, and interval. Closed. |
| 2 | Abstract distinctions need recognizable examples outside physics. | P2 | Diagnostic examples | Include accounts, batteries, warehouses, compartments, populations, and data ledgers. Closed. |
| 3 | The diagnostic needs a discriminating next action and owner. | P2 | Diagnostic table | Pair every symptom with candidate causes, test, and repair owner. Closed. |

## Phase 4 - Synthesis

```text
Roles reviewed: 9
P1 blockers: 0  |  P2 issues: 26  |  P3 notes: 1

Verdict: APPROVED
Top finding: arithmetic balance closure and domain conservation authority must
never collapse into one validity claim.
Cross-role consensus: property, boundary, interval, units, gross terms,
internal changes, residual uncertainty, and source custody remain explicit.
```

All P2 and P3 findings were amended in the reviewed artifacts; no actionable
finding remains open.

## Phase 5 - Amend

1. Added separate balance and conservation senses plus seven alternative
   cross-domain pivots.
2. Added gross/net, rate/total, internal/external, residual/uncertainty, and
   steady-state constraints.
3. Reassigned the general balance formula and added a symptom/test/owner
   diagnostic without changing domain-law authority.

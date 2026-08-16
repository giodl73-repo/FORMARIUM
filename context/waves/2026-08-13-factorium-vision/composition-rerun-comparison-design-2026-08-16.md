---
skill: validate-design
topic: composition-rerun-comparison
date: 2026-08-16
reviewer_count: 3
p1_count: 0
p2_count: 0
p3_count: 6
domain_roles_active: none
---

# Composition Rerun Comparison Design Review

Mode: `--compact`; the bounded edition-local projection uses the required
Architect, Code-Quality, and Process reviewers.

## Architect

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | Retaining arbitrary result history would create undeclared work-product storage. | P3 | Runtime lifecycle | Keep exactly one pending source in memory, consume it on the next explicit run, and clear the comparison on later ordinary runs. |
| 2 | Treating all result deltas as caused by the button would hide intervening manual edits. | P3 | Request comparison | Attribute only exact target transitions and label every other atomic request change separately. |

## Code-Quality

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | Independently reconstructing a `sim-26` action can drift from its source projection. | P3 | Request comparison | Add pure parity tests over every covered continuation reason and reject unmatched clicked IDs. |
| 2 | Comparing raw arrays can make byte output depend on incidental result order. | P3 | Pure record | Validate uniqueness and sort identities before every set/record comparison. |

## Process

| # | Finding | Sev | Section | Recommendation |
|---|---|---|---|---|
| 1 | Terms such as “resolved” or “improved” would exceed structural evidence. | P3 | Result comparison | Use neutral before/after and added/removed/changed vocabulary with a permanent claim boundary. |
| 2 | A new shared asset could silently change the prior rehearsal. | P3 | Conformance | Gate all source, CSS, runtime, links, and manifest checks to `sim-27` and reproduce both `sim-26` identities. |

## Synthesis

Overall verdict: APPROVED

P1 blockers: None.

P2 conditions: None.

Cross-reviewer consensus: The comparison is admissible only as bounded
accounting over two exact results. It must preserve explicit execution,
separate recorded actions from other edits, avoid value judgments, and retain
prior-edition identity.

Strongest signal: Exact attribution must stop at the control transition; the
system cannot claim the action caused every graph difference when other edits
were possible.

## Amendments applied

1. The runtime lifecycle consumes one pending comparison and retains no
   general history.
2. Request comparison uses atomic exact attribution plus explicit additional
   edits and superseded-action disposition.
3. Conformance requires parity, order invariance, neutral language, no
   execution/storage, and `sim-26` identity regression.

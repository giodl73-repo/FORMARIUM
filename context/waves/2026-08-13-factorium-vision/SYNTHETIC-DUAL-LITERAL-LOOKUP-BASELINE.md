# Synthetic Dual Literal Lookup Baseline

Date: 2026-08-17

Campaign: `SUJ-06`

Decision: both admission gates pass; implement the smallest ephemeral dual
literal lookup candidate, then rerun the exact portfolio.

## Exact baseline

Twenty exact searches ran against the frozen `sim-44` index: both previously
frozen queries for each of ten question tasks, with ten ownership groups per
query and independent existing rankings.

| Gate | Result | Required | Decision |
|---|---:|---:|---|
| Tasks with at least two intended families across the union | 9/10 | 8/10 | Pass |
| Tasks where query two adds an intended family | 8/10 | 6/10 | Pass |

The sole union miss is the green-status/customer-checkout task, which exposes
only the Control/Monitoring family across both literal phrasings. The two
queries are redundant for that task and for the threshold/exception task, but
the latter already exposes three intended families from query one.

## Admitted batch

Implement two visibly independent literal Search panels and a deduplicated
canonical-family comparison. Preserve each query's exact ranking and source
label. The comparison may state only which family identities appear in the
first list, second list, or both. It must not merge rank, generate queries,
select concepts, infer relations, compute closure, or persist state.

This baseline is mechanical dependent evidence, not reader behavior or proof
that the visible families are relevant, understood, or useful. Exact custody
is `fixtures/synthetic-users/dual-lookup-baseline-06.json`.

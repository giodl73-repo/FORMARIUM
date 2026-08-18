# Synthetic Recognized-Foothold Connections Result

Date: 2026-08-17

Campaign: `SUJ-09`

Decision: preserve the structural near-miss, do not add a Search cue, and
retain `sim-45` unchanged.

Evidence class: deterministic dependent recognized-foothold navigation audit.
No reader participated.

## Exact result

The frozen first query exposed at least one analyst-scored intended foothold
for 9/10 tasks. Each recognized foothold was opened in exact `sim-45`, and only
the first six rendered authored connections were inspected at one hop.

| Gate | Result | Required | Decision |
|---|---:|---:|---|
| Tasks with a recognized foothold | 9/10 | exactly 9/10 | Pass |
| Deficient tasks gaining a second intended family | 5/8 | 6/8 | Fail |
| Tasks exposing two intended families after expansion | 7/10 | 8/10 | Fail |

Five routes do work mechanically: status/checkout, claim/evidence,
must/should/may authority, queue/capacity, and delegated accountability. The
three deficient tasks that do not reach a second family are:

- project slippage from **Coordinated Work**;
- dashboard-dot interpretation, which has no intended first-query foothold;
- blocked-file diagnosis from **Identity, Naming, Classification, and
  Versioning**.

The first and third are candidate cross-reference gap signals. The dashboard
case is a Search vocabulary gap and cannot be repaired by downstream links.
None is sufficient by itself to outcome-select a new canonical connection.

## Disposition

- Do not add the conditional Search cue and do not mint `sim-46`.
- Preserve all exact paths in
  `fixtures/synthetic-users/recognized-foothold-connections-baseline-09.json`.
- Keep existing Table-page authored connections visible and explicitly untyped.
- Carry the two possible editorial link gaps forward for recurrence testing;
  do not add them solely to pass this portfolio.
- Keep the dashboard-dot failure owned by literal search vocabulary, not the
  connection graph.

## Custody and claims boundary

The campaign was frozen at `a4920d8`. The exact baseline is clean `sim-45`,
rendered from `e54a36e7c119670b279ea48760795f33f4775d63`, with site identity
`e79e341036734b4f808fba9ac840eabed9a6c278c36f3cc05247af4b56553022`
and search-index SHA-256
`d12640ffba616fcb83d909466628c1d3b4df0cdf4a0c4b0df0554f4e66e5b1df`.

Recognition was assigned by the analyst from intended families. This result
does not establish that a reader would recognize, select, follow, understand,
or value any route. It also establishes no synonymy, hierarchy, dependency,
semantic relation, composition, or closure.

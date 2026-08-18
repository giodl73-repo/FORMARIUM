# Synthetic Dual Literal Lookup Result

Date: 2026-08-17

Campaign: `SUJ-06`

Decision: retain dual literal lookup in internal `sim-45`, preserve its strict
non-semantic boundary, and stop this slice.

Evidence class: deterministic dependent literal-lookup and browser rehearsal.
No reader participated.

## Baseline and implementation

The frozen control ran both SUJ-02 queries for each of the ten question tasks
against exact `sim-44`. Across two independent first-ten ownership-group lists,
9/10 tasks expose two intended canonical families and query two adds an intended
family for 8/10. Both predeclared gates—8/10 and 6/10—pass.

`sim-45` therefore adds one homepage comparison surface:

- two explicit literal query inputs;
- two independently ranked lists of at most ten canonical ownership groups;
- exact rank, family title, identity, and Table link within each list;
- an alphabetic identity comparison labelled Search 1, Search 2, or Both; and
- explicit Compare and Clear actions.

The comparison is not a merged rank or concept basket. It generates no query,
selects no concept, infers no synonym or relation, computes no closure, and
produces no recommendation or Factor Guide. It uses no URL task state, storage,
cookie, network, account, history, or canonical write.

## Exact browser rerun

The exact ten-task portfolio was rerun at 390 x 844 against clean `sim-45`.

| Mechanical observation | Result |
|---|---:|
| Two intended families visible across both lists | 9/10 |
| Query two adds an intended family | 8/10 |
| Independent rankings exactly match baseline | 10/10 |
| Non-merge boundary visible | 10/10 |
| URL state unchanged | 10/10 |
| Local and session storage empty | 10/10 |
| Mobile horizontal overflow | 0/10 |

The green-status/customer-checkout task remains the exact miss: both literal
phrasings expose only the Control/Monitoring family among the prior intended
families. Dual lookup does not solve that problem and supplies no hidden third
query.

## Custody

`sim-45` contains 217 selected sources, 185 indexed records, 239 HTML pages,
and zero missing local or search targets. It was rendered clean from commit
`e54a36e7c119670b279ea48760795f33f4775d63`. Site identity is
`e79e341036734b4f808fba9ac840eabed9a6c278c36f3cc05247af4b56553022`;
manifest SHA-256 is
`36f614e66f895edd888609609110c4ca5f892886845421e97f993b8978e189a4`.
Baseline and rerun custody live in
`fixtures/synthetic-users/dual-lookup-baseline-06.json` and
`dual-lookup-rerun-06-sim-45.json`.

## Product decision and claim boundary

Keep `sim-45` as the current internal artifact. Do not add a third query,
merged relevance, automatic decomposition, selection, or closure from this
result. If the remaining miss is reopened, it requires a separately owned
question-decomposition hypothesis or external reader finding.

The result establishes exact static interface behavior and coverage of prior
authored target families only. It does not establish that readers will supply
two phrasings, recognize the families, understand the comparison, complete a
task, prefer the interface, or return. R4E and `preview-01` remain open.

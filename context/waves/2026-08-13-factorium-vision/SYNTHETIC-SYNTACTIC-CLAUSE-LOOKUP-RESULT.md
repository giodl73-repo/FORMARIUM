# Synthetic Syntactic Clause Lookup Result

Date: 2026-08-17

Campaign: `SUJ-07`

Decision: reject the automatic syntactic clause helper and retain `sim-45`
unchanged.

Evidence class: deterministic dependent syntactic-splitting rehearsal. No
reader participated.

## Exact result

The frozen rule produced 26 clauses across all ten tasks and searched each
clause independently against the exact `sim-45` index. Rankings were capped at
ten canonical ownership groups and compared only by family identity.

| Gate | Result | Required | Decision |
|---|---:|---:|---|
| Tasks yielding two or three clauses | 10/10 | 10/10 | Pass |
| Tasks exposing at least two intended families | 4/10 | 10/10 | Fail |
| Tasks adding an intended family beyond SUJ-06 | 2/10 | 4/10 | Fail |
| Prior SUJ-06 passes regressing below two families | 6 | 0 | Fail |

The status/checkout task does recover a second intended family: the clause
`The status page is green` exposes Access/Permission as well as
Control/Monitoring. That isolated recovery is not enough. Six other tasks that
passed with two authored literal queries fall below the two-family threshold
when their original prose is split mechanically.

The failure explains the product boundary cleanly: grammatical contrast and
sentence boundaries are not reliable query boundaries. Short fragments often
discard the vocabulary that made the authored alternate phrasing useful, while
generic fragments such as `How can both be true` add broad unrelated rankings.

## Disposition

- Do not add an automatic split control or mint `sim-46`.
- Keep the explicit dual literal lookup in internal `sim-45`.
- Preserve the complete task-level lists in
  `fixtures/synthetic-users/syntactic-clause-lookup-baseline-07.json`.
- Do not tune delimiters, stopwords, fragment length, or task-specific rules
  after observing this result.
- A later question-to-concepts bridge needs a separately frozen mechanism and
  must beat the authored dual-query control before interface work.

## Custody and claim boundary

The campaign was frozen at commit `7dcc49a`. The exact baseline is clean
`sim-45`, rendered from
`e54a36e7c119670b279ea48760795f33f4775d63`, with site identity
`e79e341036734b4f808fba9ac840eabed9a6c278c36f3cc05247af4b56553022`.
The search index SHA-256 is
`d12640ffba616fcb83d909466628c1d3b4df0cdf4a0c4b0df0554f4e66e5b1df`.

This result does not establish reader behavior, relevance, comprehension,
usefulness, preference, demand, or language understanding. It establishes
only that this one frozen syntax rule is mechanically inferior to the existing
dual-query control on the ten dependent tasks.

Repository validation also exposed six stale checker constants left by the
earlier limiting-condition query repair. Their query files and Guides already
agreed on the replacement identities; this result batch updates only the six
test assertions to those existing identities. No query, Guide, relation,
reference, Table, or book source changes.

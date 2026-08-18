# Pointer Entry Expansion Plan

Date: 2026-08-18
Status: active internal simulation plan

## Objective

Continue the Pointer Entry concordance through one bounded successor batch
without changing the `sim-52` baseline. Add 20 high-reuse structural labels in
`sim-53`, bringing the explicit registry to 40 labels.

## Selection

The successor batch is selected from exact `code` expressions in the Tables
included by `sim-52`. Each admitted label appears in at least 16 owning Tables
and answers a recurring cross-domain lookup job:

`basis`, `convention`, `decision`, `direction`, `evidence`, `frame`, `model`,
`policy`, `provenance`, `rule`, `scale`, `scope`, `source`, `status`, `system`,
`target`, `time`, `uncertainty`, `unit`, and `version`.

The batch excludes `reference` because exact token matching would also turn
repository paths such as `reference/factorium-reference-v2.factorium` into
semantic-looking links.

## Product value

Reader: someone following a repeated structural label across materially
different Tables.

Job: compare exact uses while retaining each authored owner and expression.

Product change: a successor registry and 20 additional generated concordance
pages. No canonical entry, relation, search record, synonym, or inferred alias
is created.

## Scope and stop

Preserve `sim-52` at 20 labels. `sim-53` must contain exactly 40 labels, fail
closed on duplicate or unused rows, retain source backlinks, and remain outside
Tables A-Z, canonical-family search, chapters, Reader order, and interchange.

Stop before plural folding, stemming, alias inference, phrase extraction,
automatic registry growth, canonical promotion, or reader-value claims.

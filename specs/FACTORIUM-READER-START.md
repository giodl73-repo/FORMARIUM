# Factorium Reader Primary Start

Status: internal handoff contract under implementation

Reference implementation: `sim-38`

## Reader job

A reader choosing the primary action on The Factorium Reader should enter the
first record of its declared 24-step sequence. Optional orientation, method,
tasks, Tables browse, and all-contents routes must remain secondary and exact.

## Product change

`sim-38` changes one generated Reader-page action: the primary **Begin with
Purpose** link opens the exact first manifest record. The existing Quickstart
remains beside it as **Read the quickstart**. No source content, sequence
membership, global navigation, search order, or canonical identity changes.

## Custody and checks

- the primary destination derives from manifest record `01`, not a duplicated
  literal route;
- its selected title and destination derive from edition-local record custody;
- Quickstart, complete method, worked questions, and Tables A-Z remain visible;
- the primary action opens a page identified as Reader step 1 of 24;
- no auto-navigation, progress state, or prerequisite meaning is added;
- `sim-37` reproduces exactly.

## Claim boundary

This establishes deterministic start-route alignment only. It does not prove
that readers prefer the route, understand the sequence, complete it, learn from
it, or are ready for external preview.

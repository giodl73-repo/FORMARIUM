# Proof Set Simulation Preflight 30

Status: complete

Edition: `sim-29`

## Goal

Add a result-bound local evaluation worksheet that records explicit evidence
references, observations, `pass`/`fail`/`unresolved` declarations, and
rationales without changing the structural result or promoting a Guide
Skeleton.

## Plan review

`sim-28` makes every absent evaluation visible but intentionally accepts no
local evidence. `sim-29` will add a separate identified
`factorium-composition-evaluation-record-v0` after the skeleton. It will bind
only to admitted checks from the current identified result, derive immutable
check custody from exact payloads, require explicit inclusion and complete
fields, preserve unrecorded checks, and make edits visibly stale.

The slice is admissible only if it:

- never preselects `pass` or `fail`;
- labels every outcome user-declared and unreviewed;
- creates a separate evaluation identity without changing the result identity
  or state;
- treats evidence references as unverified text and performs no retrieval;
- retains partial, failed, and unresolved records without scoring;
- removes all evaluation state on a new Run or reload;
- writes no query, evidence, result, or record to URL, storage, network,
  clipboard, download, or publication;
- leaves all eight Guide Skeleton gaps open;
- retains `sim-28` byte-identically.

## Planned evidence

- pure normalization, canonicalization, identity, partial/full coverage,
  pass/fail/unresolved, unknown/duplicate/stale, length, and no-check cases;
- generated-site asset, contract, manifest, edition, and source-custody checks;
- live browser checks for explicit recording, stale edits, repeated identity,
  profile invariance, result-state invariance, new-Run clearing, no-check
  boundary, reload, and storage/network absence;
- full Rust, canonical query, reference, packet, site, browser, and `.roles`
  regressions.

## Claim boundary

This is local input and publication-mechanics evidence only. It is not source
verification, domain evaluation by Factorium, a reviewed check outcome,
recommendation, completed Factor Guide, comprehension, task success,
external-reader evidence, `preview-01`, or Workbench release evidence.

## Result review

`sim-29` adds the pure `factorium-composition-evaluation-record-v0`
builder and a Book-default worksheet immediately after the Factor Guide
Skeleton. A reader explicitly includes admitted checks and supplies an
outcome, evidence reference, observation, and rationale. Full and partial
receipts retain exact coverage, unrecorded checks, immutable
`user-declared-unverified` evidence status, source/result custody, and a
separate SHA-256 identity. Evaluation edits and closure-control drift mark the
receipt stale; a new Run or reload clears it. No record changes the result
state, result identity, Guide Skeleton gaps, or canonical reading route.

The six-role review closes with zero open P1/P2 findings. Pure tests cover
pass, fail, unresolved, mixed and partial records, normalization, structured
invalid inputs, stable identity, stale result rejection, no-check input, and
exact base-state invariance. Generated-site and live Edge checks cover default
unresolved controls, full/partial receipts, profile invariance, both stale
states, rerun clearing, reload, non-sensitive warnings, and absence of
evaluation storage or network behavior. The inherited guide and full reading
journey remain live-browser clean. Clippy, 66 Rust tests, five canonical query
fixtures, packet verifiers, canonical reference/sidecar checks, and `.roles`
validation pass.

The 157-source edition contains 129 indexed destinations, 171 site pages, and
zero missing local targets. `sim-29` has site identity
`a0d885837e2d2a791e466b43aca58051af3a84315021b386790a6882db6ddb96`
and standalone SHA-256
`0c767e714151698b28c0ca651b8b70f31b16c47aff315a56973538f7739df3bb`.
`sim-28` reproduces byte-identically with site identity
`8a1b62e85cc29468b117b9b6e2f13fe19d7977f82763a5e9b8f07bdc01bd7147`
and standalone SHA-256
`80cc59252843db0007170d5449c9602fc882d414eb481512db1652c550dd39c8`.

No evidence-verification, domain-evaluation, scoring, recommendation,
completed-guide, semantic-validity, comprehension, task-success, persistence,
publication, external-reader, `preview-01`, or Workbench-release claim is
admitted.

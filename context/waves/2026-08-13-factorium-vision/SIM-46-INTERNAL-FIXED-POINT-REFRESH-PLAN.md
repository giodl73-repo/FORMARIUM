# Sim-46 Internal Fixed-Point Refresh Plan

Date: 2026-08-17

Status: complete — current authority reconciled; see
`SIM-46-INTERNAL-FIXED-POINT-REFRESH-RESULT.md`

Campaign: `PS-FP-46`

## Maintenance trigger

The maintained proof artifact advanced through bounded, validated repairs from
`sim-41` to clean `sim-46`, but four current authority documents still identify
`sim-41` or `sim-42` as maintained. Historical preflight and result documents
correctly retain their original editions. The inconsistency is a provenance
and operator-routing defect, not permission for new content or features.

## Exact artifact

Bind the current-authority refresh to clean `sim-46` rendered from
`20139f9c6d2f75d231efbb9d1c35ab1fe2d17e03`: 217 selected sources, 185 search
records, 239 generated pages, 53 canonical entries, 95 specialized views, a
24-record Reader route, 403 authored untyped connections, and zero missing
local targets. Preserve the exact standalone, search-index, and site identities
in `fixtures/proof-set/internal-fixed-point-refresh-46.json`.

## Smallest batch

Refresh only the current maintained-edition statements and fixed-artifact
summary in:

1. `CONTEXT.md`;
2. `ROADMAP.md`;
3. `PROOF-SET-INTERNAL-FIXED-POINT-AUDIT.md`;
4. `R5P-PROOF-SET.md`.

Append the plan and result to the active wave. Do not rewrite historical
simulation records, render another edition, alter the books or Tables, modify
Search, create a tag, distribute an artifact, or populate reader evidence.

## Validation and stop

Mechanically verify exact manifest custody, the four authority statements,
the absence of stale maintained-edition claims in those files, all current
`sim-46` focused browser regressions, roles validation, reference closure,
release packets, and Rust gates. Stop after one documentation-only result
commit.

## Claims boundary

The refresh establishes which internal artifact maintainers should validate.
It does not admit `preview-01`, establish V1 or publication readiness, close
R4E/R5P, or supply reader, accessibility, usefulness, adoption, or return-use
evidence.

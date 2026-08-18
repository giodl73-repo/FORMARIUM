# GPC-09 V1 Reader Integration Plan

Date: 2026-08-18
Status: frozen before implementation

## Objective

Promote the admitted one-anchor/two-view GPC-09 batch into one versioned
current interchange and the next internal book/search website simulation.
Preserve V0 reference bytes and the clean `sim-48` result as historical
baselines. Claim mechanics and coverage only, never reader evidence.

## Exact migration

1. Add `factorium-reference-v1` as an ID-preserving successor to V0 with the
   same grammar plus exactly one entry and two views.
2. Add `factorium-assurance-v1` with complete coverage of 54 entries, 97
   views, and the unchanged eleven V0 relation records.
3. Keep `factorium-reference-v0`, `factorium-assurance-v0`, and
   `factorium-relations-v0` bytes unchanged.
4. Generate live `tables/CATALOG.md`, `tables/formulas/INDEX.md`, and
   `tables/UNRESOLVED.md` from V1.
5. Add a small V1 book-selection supplement and three neutral route tasks;
   do not rewrite the historical Factor Forge supplement or its tasks.
6. Render `sim-49` from V1 while leaving `sim-48` reproducible from V0.
7. Expose all three paths in search, site pages, and Book profile; preserve
   restrictions, unresolved standing, ambiguity, and translation loss.

## Compatibility contract

- all 53 V0 entry IDs, 95 V0 view IDs, sense order, factor order, titles,
  owners, source paths, and summaries remain byte-for-byte records inside V1;
- V1 adds no relation kind or relation record;
- V1 uses the existing V0 entry/view grammar under a new document header;
- V0 remains parseable and sidecar-valid independently of the live V1
  projections;
- Composition Query traces remain bound to V0 unless explicitly migrated;
- the website remains a projection over book/Table authority.

## Product boundary

Reader: someone asking what a term means here, who claims to know, or whether
a source may be reused.

Job: find the new anchor or view through ordinary wording, open its Book form,
and retain enough boundary metadata to avoid equivalence, truth, or permission
shortcuts.

Stop: after deterministic catalog, book, search, and page coverage. Do not add
new content, ranking behavior, typed relations, automatic authority decisions,
external sessions, or public-release claims.

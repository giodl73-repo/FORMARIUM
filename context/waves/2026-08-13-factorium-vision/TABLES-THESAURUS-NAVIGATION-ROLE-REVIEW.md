# Tables Thesaurus Navigation Role Review

Status: fixed-point result reviewed

Date: 2026-08-17

Skill review:
`signals/roles/check/tables-thesaurus-navigation-roles-check-2026-08-17.md`

## Product value contract

| Field | Decision |
|---|---|
| Reader | A practitioner who has opened one Factorium Table and wants the next relevant distinction or owning context |
| Job | Identify what kind of Table this is, reach its owner, compare authored contrasts, follow authored connections, or return to lookup |
| Current friction | Cross-references and Contrast tables are usually near the bottom; specialized views do not present their canonical owner as an immediate navigation choice |
| Product change | Add one generated Explore-this-Table navigator to selected Table pages in `sim-32` |
| Evidence now | Exact ownership, section extraction, local link integrity, coverage counts, regression, and responsive browser mechanics |
| Evidence later | Human findability, relation interpretation, thesaurus usefulness, comprehension, preference, and return use |
| Cost and displacement | One generated projection and CSS asset; no entry, relation, sidecar, schema, or content expansion |
| Continue/merge/stop | Proceed with untyped authored navigation; stop before inferred or typed semantic relations |

## Admission conditions

- every selected Table page gets one navigator without copying definitions;
- all specialized views link to exact canonical owners from reference data;
- Contrast and Cross-reference routes appear only when authored sections exist;
- displayed authored connections come only from the Cross-references section;
- untyped links explicitly disclaim synonym, hierarchy, and closure meaning;
- Search/Browse remain available on every Table;
- sim-31 reproduces exactly and sim-32 has zero missing targets;
- no human lookup or thesaurus-quality claim is admitted;
- fixed-point Product Owner decision.

## Result review

All fourteen P2 conditions are closed. `sim-32` adds one generated navigator
to each of the 175 selected Table pages: 53 canonical entries, 95 specialized
views, and 27 curated Table records. Every page has Search Tables and Browse
Tables actions. All 95 views expose their exact canonical Owning Table;
47 authored Contrast tables and 63 authored Cross-references sections receive
direct routes.

The 63 Cross-references sections contain 399 authored links. The navigator
previews at most six per page, for 345 preview links, and labels them
`Authored connections · untyped`. It expressly denies synonym, broader or
narrower, equivalence, dependency, and closure meaning. No relation kind,
canonical source, or authority was added.

Static checks verify exact coverage, extraction boundaries, ownership, local
targets, and representative entry and view behavior. Live Edge checks verify
the canonical-entry and exact-owner paths plus a 390-pixel layout without
horizontal overflow. The edition has 217 sources, 175 canonical records, 185
search records, 237 pages, and zero missing targets. `sim-31` reproduces
exactly with site identity
`f7d394ec438e34d2e4e5b23c2f82a1a4f277fb6b6f2761f6431c26eda2ec710e`
and standalone SHA-256
`3b624f39e0f5f6134196b40cecbc25fa19f8ff560b859b3172a7c3df87e97ebb`.

Product Owner decision: **continue with the untyped navigator and stop before
typed or inferred thesaurus relations**. Human findability and thesaurus
value remain future-reader questions.

# Proof Set Simulation Preflight 33

Status: complete

Edition: `sim-32`

## Goal

Make each Factorium Table behave more like a dictionary/thesaurus record by
exposing exact identity, ownership, authored comparison, authored connection,
and lookup routes without inventing semantic relation types.

## Plan review

Seven roles required exact canonical ownership, universal Search and Browse,
bounded section extraction, capped previews, visible non-inference language,
edition-specific rendering, `sim-31` regression, and no human-value claim.

## Result review

All 175 selected Table pages receive one Explore-this-Table navigator. It
distinguishes 53 canonical entries, 95 specialized views, and 27 curated Table
records. Every specialized view links to its exact owning canonical entry.
Authored content yields 47 direct Contrast-table routes and 63 direct Cross-
references routes containing 399 links; only 345 are previewed because each
page is capped at six.

Connections are visibly labelled authored and untyped. The interface denies
synonym, hierarchy, equivalence, dependency, and closure interpretation. It
does not infer relations from prose, lexical similarity, co-occurrence,
chapter adjacency, or Composition data.

## Verification

- 175 navigators with exact 53/95/27 class coverage;
- 95 exact owner links, 47 comparison routes, and 63 Cross-references routes;
- 399 authored connections with 345 bounded preview links;
- 217 sources, 175 canonical records, 185 indexed destinations, 237 pages,
  and zero missing rendered or local targets;
- representative canonical-entry and specialized-view checks;
- 390-pixel live Edge layout with no horizontal overflow;
- seven-role fixed point with zero open P1/P2 findings;
- sim-31 site identity
  `f7d394ec438e34d2e4e5b23c2f82a1a4f277fb6b6f2761f6431c26eda2ec710e`
  and standalone SHA-256
  `3b624f39e0f5f6134196b40cecbc25fa19f8ff560b859b3172a7c3df87e97ebb`.

Sim-32 site identity is
`e5f64a47752fee1e1ae829b889f9ca1ac434332ffc66220f32b144d0580a5270`;
standalone SHA-256 is
`eb726e0500c8df71f4234d0e4b0dab649cf836e1f8582767719d98b023179b1f`.

## Product decision and claim boundary

Continue with the untyped navigator and stop before typed or inferred
thesaurus relations. This simulation proves deterministic projection,
ownership, bounded authored traversal, responsive mechanics, and historical
compatibility. It does not establish thesaurus completeness, lookup success,
relation interpretation, comprehension, preference, external-preview
readiness, or publication readiness.

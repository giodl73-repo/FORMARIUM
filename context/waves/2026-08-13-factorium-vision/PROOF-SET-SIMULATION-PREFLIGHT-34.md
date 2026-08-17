# Proof Set Simulation Preflight 34

Status: complete

Edition: `sim-33`

## Goal

Let a reader understand the canonical concept that owns a specialized search
match before choosing which exact record to open, without adding semantic
relations or executing a Composition Query.

## Plan review

Seven roles required exact reference ownership, lossless grouping after
filtering and ranking, direct member identities, a flat alternative, bounded
URL state, accurate noncanonical labels, responsive behavior, `sim-32`
regression, and no human-value claim.

## Result review

Table families now default the search result view. The 185 edition-local
records partition into 90 groups: 53 canonical Table families containing 53
entries and 95 specialized views, plus 27 curated Table records, nine Factor
Guides, and one Reader record that remain standalone. Every specialized view
maps to its exact selected owner.

The existing query, kind, domain, stopword handling, scoring, and ranking are
unchanged. Grouping runs afterward over the bounded ranked window. All records
restores the prior flat projection exactly, and `view=records` is the only
nondefault URL state admitted.

## Verification

- 185 records partition losslessly into 90 ownership groups;
- exact 53 entry, 95 view, 27 curated, nine Guide, and one Reader classes;
- all 95 view owners resolve to selected entry destinations;
- representative query, kind, and domain rankings match `sim-32` exactly;
- filtered family headings introduce no nonmatching record;
- default family and alternate flat browser routes pass;
- four controls and no horizontal overflow at 390 pixels;
- 217 sources, 175 canonical records, 237 pages, and zero missing targets;
- seven-role fixed point with zero open P1/P2 findings;
- sim-32 site identity
  `e5f64a47752fee1e1ae829b889f9ca1ac434332ffc66220f32b144d0580a5270`
  and standalone SHA-256
  `eb726e0500c8df71f4234d0e4b0dab649cf836e1f8582767719d98b023179b1f`.

Sim-33 site identity is
`7af5ff58b9f62ceed1c2ef8f41bdebd844b87426742eb648fb917b185f08f113`;
standalone SHA-256 is
`d366023a2e44e30f9fe6a33622eabf43a582ce1991679b247451ff4e55a008c8`.

## Product decision and claim boundary

Continue with exact ownership-aware search and stop before semantic grouping,
query expansion, or Composition execution. This simulation proves
deterministic custody, lossless result projection, responsive mechanics, and
historical compatibility. It does not establish findability, preferred view,
time-to-choice, comprehension, relevance quality, external-preview readiness,
or publication readiness.

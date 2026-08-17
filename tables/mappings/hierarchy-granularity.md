# Hierarchy and Granularity Mapping

Status: candidate Mapping Table

Primary family: Mapping Table

Canonical headword: [Decomposition Modes and Combination Contracts](../entries/decomposition-modes-combination-contracts.md)

Canonical senses: `refinement`, `decomposition-mode`, `completeness-contract`

## Governing question

How can a decomposition move between levels of detail while preserving the
selected pivot, coverage, aggregation rule, and known loss?

## Mapping table

| Source relation | Target relation | Required bridge | Common loss or invalid inference |
|---|---|---|---|
| whole to parts | part to subparts | part-whole identity, level, coverage, ownership | association treated as composition |
| capability to functions | function to activities | purpose, inputs/outputs, performer, conditions | organizational task treated as system behavior |
| requirement to lower-level requirements | allocated requirement set | source identity, rationale, coverage, verification path | decomposition treated as proof of sufficiency |
| work outcome to tasks | task/deliverable hierarchy | completion condition, dependency, owner, roll-up | every child completion proves parent outcome |
| category to subcategories | classification refinement | criterion, exclusivity, exhaustiveness, remainder | mixed classification pivots in one tree |
| aggregate measure to components | component measures | common basis, weights, uncertainty, reconciliation | aggregate uniquely determines components |

## Level contract

| Field | Requirement |
|---|---|
| source level | selected subject and granularity |
| target level | refinement or aggregation destination |
| pivot | relation that organizes children |
| coverage | exhaustive, purpose-complete, partial, open, or unresolved |
| roll-up | aggregation rule and required conditions |
| drill-down | whether disaggregation is unique, estimated, or unavailable |
| cross-level identity | what remains the same entity or claim |
| loss | omitted detail, merged distinctions, uncertainty, and unmapped cases |

## Round-trip checks

1. Aggregate the target level and compare with the declared source result.
2. Attempt disaggregation and state nonuniqueness rather than inventing detail.
3. Swap the pivot and identify factors that move, merge, or disappear.
4. Test additions and removals without renumbering identity silently.
5. Preserve source and target versions plus every unresolved remainder.

## Sources and provenance

See the canonical entry and NASA Systems Engineering Handbook sources. Product,
work, requirement, functional, and organizational hierarchies remain distinct
views rather than one universal tree.


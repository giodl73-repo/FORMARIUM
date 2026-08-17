# Location, Region, Containment, Proximity, Route, and Network

Status: candidate anchor entry

## Orientation

Location places a subject relative to a declared reference system or named
place. A region is a bounded or rule-defined portion of space or another
declared domain. Containment relates a subject to a region under boundary
semantics. Proximity states nearness under a metric, topology, travel/cost
model, or qualitative rule. A route is an ordered path between locations under
constraints. A network is a selected set of nodes and typed connections;
geometric closeness does not by itself establish connectivity or reachability.

## Sense table

| Sense | Governing question | Role |
|---|---|---|
| `location` | Where is the subject relative to which reference system, place identity, resolution, and time? | spatial position/context |
| `region` | Which bounded or rule-defined portion of the selected domain is meant? | spatial/domain subset |
| `containment` | Is the subject inside, outside, crossing, touching, or indeterminate relative to the region boundary? | boundary-relative membership relation |
| `proximity` | How is nearness defined and measured under which metric, topology, cost, or qualitative rule? | scoped nearness relation |
| `route` | Which ordered path connects source and destination under constraints, direction, and time? | constrained traversal path |
| `network` | Which nodes and typed connections form the selected connectivity view? | connectivity structure |

## Root factorization

```text
spatial-operating-use
  := subject, purpose, and operating question
   x location identity, coordinates or place reference, resolution, and time
   x reference system, frame, datum, topology, and version
   x region identity, geometry/rule, boundary inclusion, and authority
   x containment relation, uncertainty, crossing, and invalid cases
   x proximity metric or cost model, threshold, direction, and scale
   x route source, destination, ordered segments, constraints, and alternatives
   x network nodes, edges, direction, capacity, state, and reachability
   x movement/change history, observation method, and provenance
   x projection, transformation, generalization, loss, and invalidation
```

## Contrast table

| Pair | Decisive distinction |
|---|---|
| Location vs. coordinate | spatial/place relation vs. one representation |
| Location vs. region | subject placement vs. bounded/rule-defined subset |
| Containment vs. overlap | subject membership relative to boundary vs. shared extent |
| Proximity vs. adjacency | nearness under rule/metric vs. direct topological connection |
| Route vs. distance | ordered constrained path vs. scalar separation/cost |
| Route vs. network | one traversal path vs. the connectivity structure offering paths |
| Connectivity vs. reachability | connection relation vs. path existence under direction/state/constraints |

## Constraints and failure signs

- Location always names reference, resolution, uncertainty, time, and version.
- Region boundaries state inclusion, authority, and change history.
- Containment preserves inside/outside/touching/crossing/indeterminate behavior.
- Proximity never omits its metric, topology, cost model, or threshold.
- Route preserves direction, order, constraints, intermediate state, and time.
- Network edges state type, direction, capacity/state, and validity.
- Named places, coordinate systems, map products, road classes, and network
  taxonomies remain examples or external authorities.

## Cross-references

- [Geometric Reference Structure](geometric-reference-structure.md)
- [Temporal Organization](temporal-organization.md)
- [System Composition and Dependency](system-composition-dependency.md)
- [Operational Resource and Capacity](operational-resource-capacity-demand.md)

## Sources and provenance

1. OGC Simple Feature Access standard: https://www.ogc.org/standard/sfa/
2. OGC GeoSPARQL standard: https://www.ogc.org/standard/geosparql/
3. Existing Factorium geometric reference, path, mapping, and network owners.

Comparator access date: 2026-08-16. Formal spatial semantics remain
source- and domain-owned; this organization remains `candidate`.

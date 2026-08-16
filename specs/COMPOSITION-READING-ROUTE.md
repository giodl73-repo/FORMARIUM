# Composition Reading Route Simulation Contract

Status: `sim-17` publication simulation; not canonical graph data, a generated
Factor Guide, reader evidence, or production Workbench navigation

## Purpose

A bounded Composition Lab result names working graph nodes, but an identifier
alone does not help a reader use the reference. A Composition Reading Route
projects the admitted closure into a short, deterministic sequence of existing
book pages. It starts with anchor entries that own selected seed factors,
continues with any additional required anchor entries, and ends with the
specialized views that own unresolved structural checks.

The route is navigation over existing pages. It does not copy their content,
change canonical order, discover another relation, expand the closure, decide
which check passes, or turn the local result into a reviewed guide.

## Exact bindings

The renderer derives one binding for every endpoint and scope in the six exact
reviewed F1-F6 relation records:

| Graph artifact | Binding authority | Destination |
|---|---|---|
| `factor:<entry>/<factor>` | exact entry and factor record in Factorium Reference Interchange V0 | generated page for the owning anchor entry |
| `view:<view>` | exact view record in Factorium Reference Interchange V0 and exact relation scope source | generated page for the specialized view |

Every binding carries the artifact ID, human label, owning page title, page
kind, and local destination. The reading payload repeats the exact reference
and relation SHA-256 digests used by the closure payload. Rendering fails on a
missing artifact, duplicate binding, digest mismatch, absent source page, or
destination outside the generated site.

## Projection algorithm

Given one identified Composition Lab result:

1. Consider only admitted `graph.nodes`; do not add frontiers, unresolved
   predecessors, inactive exclusions, or lexically related pages.
2. Bind each node to its exact reference page or fail closed.
3. Classify seed-owned anchor pages as `Start`, other required anchor pages as
   `Continue`, and evaluative specialized views as `Evaluate`.
4. Deduplicate nodes that resolve to the same page. Preserve every contributing
   graph artifact inside the page's disclosed binding list.
5. If one page contains both seed and derived factors, retain the earlier
   `Start` stage and both roles.
6. Sort by stage, then page title, destination, and artifact ID.
7. Retain `rejected` disposition beside any graph artifact involved in a
   subtraction conflict; the page remains available for conflict repair.

The result is a finite ordered list. For the current six relations, a
single-edge forward or reverse closure normally deduplicates its two endpoint
factors into one anchor entry and adds one evaluative view.

## Interface contract

After Flatten, the lab presents `Read the admitted closure` with:

- page count and admitted-node count;
- visible `Start`, `Continue`, or `Evaluate` stage on every destination;
- a human page title and ordinary link into the Book-default reading page;
- a short explanation of why that page is present;
- native disclosure containing all exact artifact bindings, graph roles, and
  selected/rejected dispositions;
- an explicit statement that the route is a local navigation projection, not
  evidence or a canonical guide.

Links use the current page and require no account, URL-state serialization,
storage, or network request. Reloading still deletes the Composition Lab
result and its route.

## Determinism and identity

The route records the exact local result SHA-256 plus the reference and
relation source digests. The identified graph result remains the work-product
identity; the route is a deterministic display projection of that result and
the digest-bound binding payload. It does not mint a competing canonical
identity.

The same identified result and binding payload must produce byte-equivalent
route data regardless of graph-node input order. A changed admitted node,
conflict disposition, reference digest, relation digest, label, title, or
destination changes the route data.

## Conformance cases

| Case | Expected reading route |
|---|---|
| Default forward F1 closure | System Composition anchor at `Start`; System Composition Integrity view at `Evaluate` |
| Reverse F1 closure | same two pages; reverse-selected endpoint is the seed binding |
| Both F1 endpoints admitted on one page | one deduplicated anchor destination with both exact bindings |
| Two unrelated admitted relations | stage-sorted anchors followed by their evaluative views |
| Reached required factor excluded | owning page remains; factor binding is marked `rejected` |
| Budget frontier not admitted | frontier target does not enter the route |
| Selected predecessor unreachable | predecessor does not enter the route unless it is already an admitted node |
| Graph nodes reordered | identical route data |
| Unknown admitted artifact | fail closed; do not fall back to search |

## Evolution boundary

Observed usefulness, recommended reading order, relevance ranking, alternative
page suggestions, saved work, collaborative annotation, canonical query
export, and guide publication remain outside this simulation. Those require
separate evidence and versioned contracts.

# Dual Literal Lookup

Status: simulation-only product projection

## Purpose

Let a reader compare two independently entered literal searches without
presenting alternate phrasing as semantic question decomposition.

## Contract

- Two explicit query inputs produce two independent existing-order lists.
- Each list shows at most ten canonical ownership groups.
- Every result retains its rank within its own query and exact Table-family
  identity and link.
- The comparison deduplicates by canonical family identity, sorts titles only
  for neutral display, and labels whether each family appeared in query one,
  query two, or both.
- The comparison is not a merged ranking.

## Boundaries

The component generates no query, selects no concept, infers no synonym or
relation, computes no closure, and produces no recommendation or Factor Guide.
It changes no Search ranking, reference record, publication ownership, or
authority. Query and result state stays in page memory only and disappears on
reload; no URL state, storage, cookie, network, account, history, or canonical
write is permitted.

## Accessibility

Both inputs and result panels have visible independent labels. Status changes
use a polite live region. Links and buttons remain native controls with visible
focus. The two-column layout becomes one column on narrow screens.

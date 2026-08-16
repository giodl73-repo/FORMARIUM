# Composition Factor Guide Skeleton Simulation Contract

Status: `sim-28` book-form display projection; not a completed Factor Guide,
recommendation, domain evaluation, canonical query, or publication workflow

## Purpose

The Composition Lab currently flattens an identified working graph into exact
artifact rows and then supplies a reading route. A Composition Factor Guide
Skeleton turns those same records into a recognizable book-form work product:
the declared problem and frame, canonical trace, structural working set,
unresolved evaluation ledger, closure boundary, and an explicit ledger of the
work still absent from a conforming Factor Guide.

The skeleton is a deterministic display projection of one identified local
result. It does not add a sense, relation, alternative, fact, mechanism,
check outcome, change test, recommendation, or source. It cannot be promoted
by display profile, graph state, or absence of a budget frontier.

## Exact inputs and identity

The builder accepts:

- one `factorium-composition-lab-result-v0` result;
- its lowercase SHA-256 identity;
- the digest-bound `factorium-composition-lab-payload-v0`;
- the digest-bound `factorium-composition-reading-payload-v0`.

The reference and relation digests MUST agree across all inputs. Every graph
artifact MUST have one exact reading binding. Unknown artifacts, duplicate
bindings, source mismatch, malformed state, non-unresolved check outcome, or
missing result identity fails closed.

The output schema is `factorium-composition-guide-skeleton-v0`. It inherits
the identified result SHA-256 and mints no second work-product identity.

## Book-form manifest

The pure manifest contains these ordered sections:

1. `brief`: local problem text, declared Context Profile and selections,
   structural state, and a declaration that no local decision is supplied;
2. `canonicalTrace`: one deduplicated book destination per admitted graph
   node, retaining every exact artifact, graph role, and disposition;
3. `workingSet`: selected seeds, admitted typed relations, and flattened
   structural rows without treating membership as sense narrowing;
4. `evaluationLedger`: every admitted check with `unresolved` outcome and its
   exact owning view;
5. `closureBoundary`: every budget frontier, unreachable/capacity-limited
   selected relation, conflict, and inactive exclusion;
6. `missingWork`: the Factor Guide requirements that the browser result does
   not provide;
7. `lossManifest`: exact information not carried from a completed Factor
   Guide and the projection claim boundary.

The required record shapes are:

| Section | Required fields |
|---|---|
| `brief` | `title`, `problem`, `status`, `decisionStatus`, `contextId`, sorted `contextSelections`, `state` |
| `canonicalTrace[]` | `href`, `pageTitle`, `kind`, `stage`, and sorted `bindings[]` containing `artifact`, `label`, `graphRole`, `disposition` |
| `workingSet` | sorted `seeds[]`, sorted `relations[]` containing `id`, `verb`, `source`, `target`, `scope`, and sorted `rows[]` containing `artifact`, `label`, `graphRole`, `disposition`, `loss` |
| `evaluationLedger[]` | `id`, `kind`, `target`, `targetLabel`, `href`, `outcome`, `requiredInput` |
| `closureBoundary` | sorted `frontiers[]`, `unresolvedRelations[]`, `conflicts[]`, and `inactiveExclusions[]`, retaining the exact base-result fields |
| `missingWork[]` | `code`, `label`, `status`, `reason` |
| `lossManifest` | sorted `retained[]`, sorted `absent[]`, and `boundary` |

The top-level manifest also carries `schema`, `resultSha256`,
`referenceSha256`, and `relationsSha256`. All artifact, relation, check,
frontier, conflict, exclusion, missing-work, and loss collections sort
lexically by their stable identifier; trace pages sort by stage, title, href,
then binding artifact. Input ordering therefore cannot privilege a factor.

The canonical trace is navigation, not copied canonical prose. Seed-owned
anchor pages precede other required anchors, which precede evaluative views.
Destinations deduplicate while exact contributing bindings remain visible.

## Required missing-work ledger

Every skeleton records all of the following as `missing`:

| Code | Requirement | Why it remains missing |
|---|---|---|
| `guide-brief` | Guide identity and intended reader | The lab supplies a problem statement, not a reviewed guide brief |
| `local-evidence` | Named local evidence | Problem and context controls are declarations, not sourced observations |
| `sense-narrowing` | Sense and alternative narrowing | Graph membership does not select or reject canonical senses |
| `mechanism-assignment` | Role and mechanism assignment | No target mechanism or mapping rationale is supplied |
| `check-outcomes` | Substantive check outcomes | The lab is authorized to emit unresolved checks only |
| `recommended-result` | Recommended result and controls | Structural closure is not a domain recommendation |
| `change-tests` | Change tests | No expected, invalid, or alternative-correct case is supplied |
| `review` | Domain and `.roles` review | Browser execution is not review evidence |

Every record has `status: missing`. The ledger remains present in every reader
profile. A future contract may allow explicit local inputs to satisfy
individual requirements; this simulation does not.

## Loss vocabulary

`lossManifest.retained` contains exactly these codes:

- `problem-declaration`;
- `context-declaration`;
- `structural-state`;
- `canonical-trace`;
- `graph-membership`;
- `typed-traversals`;
- `closure-boundaries`;
- `unresolved-checks`;
- `source-custody`.

`lossManifest.absent` contains the eight missing-work codes. The manifest
boundary states that retained structure is not local evidence, sense
narrowing, substantive evaluation, or recommendation. This exact vocabulary
prevents a profile or renderer from silently recasting loss.

## State-preserving presentation

The skeleton uses the identified result state without reinterpretation:

- `incomplete`: unresolved checks or selected relations remain unresolved;
- `truncated`: at least one reached traversal stopped at a finite boundary;
- `contradictory`: an exclusion conflicts with a reached required or
  evaluative node.

The interface MUST not render `complete`, `valid`, `recommended`, `repaired`,
or `successful`. A stable graph with no frontier remains incomplete because
substantive checks and Factor Guide requirements are missing.

## Reader profiles

All profiles operate over the same manifest and result identity.

| Profile | Guide presentation |
|---|---|
| Compact | brief, state, canonical destinations, all boundary conditions, an always-visible `8 requirements missing` summary, and all eight ledger records in a closed native disclosure |
| Abbreviated | Compact plus structural working set and evaluation summary |
| Book | default narrative order with human labels, trace, evaluation, boundary, and missing work |
| Full | Book plus exact artifact IDs, relation IDs, check IDs, source digests, and inherited result SHA-256 |

Profiles may fold explanation and exact custody strings. They MUST NOT hide a
conflict, frontier, unresolved requirement, unresolved check count, or missing
Factor Guide requirement. All eight missing-work records remain in the DOM in
every profile. Profile selection changes no manifest byte.

## Placement and fallback

After each explicit Run, the skeleton appears after the Closure Map and before
the page-by-page Reading Route. The map answers “what graph formed,” the
skeleton answers “what book-shaped work product exists and what is missing,”
and the route hands the reader to canonical sources.

Every rendering leads with `Factor Guide skeleton` and a visible statement
that eight required groups remain missing. Problem and Context Profile values
are labeled declarations rather than local evidence.

If the enhancement cannot build the skeleton, the exact stage audit, Closure
Map, and Reading Route remain available and an inline unavailable notice is
shown. No partial guide is rendered.

## Conformance cases

| Case | Required skeleton behavior |
|---|---|
| One admitted relation | trace contains its anchor and scope pages; check remains unresolved; all eight missing-work requirements remain |
| Reordered graph nodes | byte-equivalent skeleton manifest |
| Budget frontier | frontier is visible in Compact, Book, and Full; result remains `truncated` |
| Unreachable selected relation | exact predecessor requirement remains visible; no invented trace destination |
| Reached exclusion target | working row remains, disposition is `rejected`, conflict remains visible; no recommendation appears |
| Inactive exclusion | request remains visible without being called a conflict |
| Profile change | same manifest and inherited result SHA-256 |
| Unknown graph artifact or mismatched digest | fail closed and retain the base result surfaces |
| Any non-unresolved check outcome | fail closed; this simulation cannot import substantive evaluation |
| Reload | no skeleton, query, or result survives |

## Claim and evolution boundary

This simulation establishes a deterministic, loss-declared, book-form
projection. It does not establish that the selected concepts fit the problem,
that the reading order is useful, that a check passes, that a factorization is
valid, or that a reader can complete a task.

Sense selection and rejection, named evidence, mechanism assignment,
substantive evaluation inputs and outcomes, change tests, guide review,
persistence, export, and publication require separate versioned contracts.

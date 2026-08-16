# Composition Evaluation Record Simulation Contract

Status: `sim-29` local explicit-input simulation; not verified evidence,
canonical query evaluation, a completed Factor Guide, or a recommendation

## Purpose

The Composition Factor Guide Skeleton names unresolved checks but cannot
collect the local observations needed to disposition them. A Composition
Evaluation Record lets a reader explicitly record evidence references,
observation summaries, outcomes, and rationales for one or more checks bound
to one identified Composition Lab result.

The browser never selects an outcome, retrieves a source, verifies an
observation, evaluates a domain claim, or converts the structural result to
`complete`. Every recorded outcome is a local user declaration. The record is
a separate noncanonical work product; it does not mutate the Composition Lab
result, its SHA-256, graph, checks, state, Guide Skeleton, or canonical source.

## Inputs and binding

The builder accepts:

- one identified `factorium-composition-lab-result-v0`;
- the digest-bound Composition Lab and Reading payloads;
- one or more explicit check records selected by the reader.

Every selected check record contains:

| Field | Requirement |
|---|---|
| `checkId` | exact admitted check ID from the identified result |
| `outcome` | `pass`, `fail`, or `unresolved` |
| `evidenceReference` | 3–240 visible characters naming a source, local record, citation, or evidence handle |
| `observation` | 10–500 visible characters stating what the reader observed or received |
| `rationale` | 10–500 visible characters explaining why the declared outcome follows or remains unresolved |

Input is Unicode scalar text. Leading and trailing whitespace is removed and
every internal whitespace run, including line separators, collapses to one
ASCII space. Any remaining C0 or C1 control character (`U+0000–U+001F`,
`U+007F–U+009F`) is rejected. Length limits apply after normalization and count
Unicode code points. Inputs are plain declarations. An evidence reference is
not fetched, attached, copied, licensed, authenticated, or endorsed by
Factorium. A non-sensitive-input warning remains adjacent to the form in every
profile.

At least one admitted check must be selected. Check IDs are unique and sorted.
Unknown, duplicate, stale, or non-admitted check IDs fail closed. Every build
request repeats the exact bound result SHA-256 and must match the identified
result supplied to the builder. The target, kind, human label, and canonical
view destination are derived from the identified result and exact Reading
binding; a reader cannot edit them.

## Record manifest and identity

The output schema is `factorium-composition-evaluation-record-v0`:

```text
schema
resultSha256
referenceSha256
relationsSha256
status
coverage { recorded, total }
outcomes { pass, fail, unresolved }
records[] {
  checkId, kind, target, targetLabel, href,
  outcome, evidenceStatus, evidenceReference, observation, rationale
}
unrecordedCheckIds[]
boundary
```

`records` sort by `checkId`; `unrecordedCheckIds` sort lexically. Object keys
are recursively sorted for canonical JSON. The record identity is lowercase
SHA-256 over UTF-8 canonical JSON. It is separate from and subordinate to the
bound Composition Lab result identity.

`status` is:

- `partially-recorded` when at least one admitted check remains unrecorded;
- `fully-recorded` when every admitted check has an explicit record.

Neither status means reviewed, sufficient, valid, correct, or complete. A
`fully-recorded` set may contain `fail` or `unresolved` outcomes. Outcome counts
are descriptive and MUST NOT be combined into a score.

Every record has immutable
`evidenceStatus: user-declared-unverified`. Future qualified source or domain
review may reject or revise any recorded evidence interpretation or outcome.

## Interface and lifecycle

After an explicit closure Run, `Record local evaluation` appears after the
Factor Guide Skeleton and before the canonical Reading Route.

For every admitted check the interface shows:

- immutable human check label, kind, target view, and exact ID under Full;
- an `Include this check` control;
- outcome, evidence-reference, observation, and rationale controls;
- an adjacent link to the canonical view that owns the check.

No outcome is preselected as pass or fail; `unresolved` is the initial value.
The browser creates a record only after the reader activates `Record selected
evaluation`. Unselected checks remain explicit in the receipt.

After creation, the receipt shows coverage, all declared outcomes, every
evidence reference, observation, and rationale, the separate evaluation
SHA-256, and the bound result SHA-256. Editing any evaluation input marks the
receipt `inputs changed`; the previous receipt remains visible but stale until
the reader explicitly records again.

The worksheet snapshots every result-changing closure form control at the Run
that produced the bound result. If any problem, context, seed, relation,
direction, budget, or exclusion control changes, recording is disabled and
the section reports `result controls changed`. An existing receipt remains
visible but stale. Only an explicit closure rerun can create a newly bound
worksheet and re-enable recording; returning controls to their prior values
may clear the warning but never changes an existing receipt's identity.

A new closure Run removes the prior form and record and builds a fresh form
for the new identified result. Reload removes the query, result, form values,
and evaluation record. No evaluation input or record enters URL state,
storage, network traffic, analytics, clipboard, download, or publication.

If the identified result has no admitted checks, the interface explains that
the structural boundary must be addressed before evaluation and offers no
record action.

## Reader profiles

Outcome controls, evidence inputs, the record action, coverage, declared
outcomes, stale state, and the no-persistence boundary remain visible in every
profile. `Not reviewed or verified` and recorded/total coverage remain adjacent
to every receipt, with unrecorded check IDs present in every profile. Book
leads with human check labels. Full adds exact check/target IDs, source digests,
canonical JSON, and both identities. Profiles change no input value, record
byte, or identity.

## Claim boundary

The receipt uses `You recorded`, `user-declared`, and the explicit negative
qualification `not reviewed or verified`; it never presents `verified`,
`confirmed`, `proven`, `recommended`, `approved`, or `successful` as a positive
conclusion. A recorded
`pass` does not establish that the evidence is authentic, sufficient, current,
authoritative, or correctly interpreted. A recorded `fail` does not identify
the repair. Factorium performs no domain inference.

The Guide Skeleton continues to show all eight missing requirement groups.
This local record may become reviewed input to the `local-evidence` and
`check-outcomes` gaps under a future successor guide contract, but it does not
close either gap in `sim-29`.

## Conformance cases

| Case | Required behavior |
|---|---|
| One selected check with complete fields | identified `fully-recorded` record bound to the exact result |
| Two admitted checks, one selected | `partially-recorded`; unselected check ID remains visible |
| Recorded `pass` | displayed as `You recorded: pass`; base result state remains unchanged |
| Recorded `fail` | retained without a suggested repair or score |
| Recorded `unresolved` | evidence, observation, and rationale remain required |
| Input edited after recording | receipt remains visible and becomes `inputs changed` |
| Record action repeated without changes | byte-identical canonical JSON and SHA-256 |
| Profile changed | controls, record, canonical JSON, and identities remain unchanged |
| New closure Run | prior evaluation form and receipt are removed and rebound |
| No admitted checks | no record action; structural-boundary message visible |
| Unknown/duplicate/stale check ID | fail closed |
| Missing or over-length text | fail closed with field-specific error |
| Reload | no evaluation input or record survives |

## Evolution boundary

Evidence-file handling, source retrieval, authentication, reviewer identity,
signatures, source licensing, multi-reviewer agreement, outcome integration,
guide readiness, canonical trace export, persistence, sharing, and publication
require separate contracts and privacy review.

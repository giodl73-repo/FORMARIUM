# Entry Publication Procedure

Status: candidate Procedure Table

Canonical headword:
[Formarium Entry Publication](../entries/formarium-entry-publication.md)

Primary family: Procedure Table

Purpose: define the ordered work, gates, failure handling, and publication
record for a substantial Formarium entry or cluster.

## Procedure

| Step | Work | Required output | Gate | Failure recovery |
|---:|---|---|---|---|
| 1 | State research question and decision | scoped question, owner, non-goals | decision is actionable and bounded | narrow scope before research |
| 2 | Inventory local evidence | relevant entries, specs, examples, wave state | prior art and existing authority identified | search before adding concepts |
| 3 | Research external authority | cited findings with confidence | every actionable claim has support | defer unsupported claims |
| 4 | Select canonical headword and senses | anchor draft | polysemy separated | split senses or entries |
| 5 | Build specialized views | views with one primary family each | family governing questions do not overlap | split sibling views |
| 6 | Add constraints and failure signs | misuse-prevention contract | invalid combinations and exclusions visible | add missing guards |
| 7 | Resolve graph links | canonical links or visible unresolved candidates | no guessed duplicate authority | create candidate or retain unresolved |
| 8 | Add Reference Delta and provenance | comparison and source custody | no unsupported uniqueness claim | narrow contribution language |
| 9 | Run `.roles` review | dispositions and findings | all critical/major findings closed | revise and rereview |
| 10 | Validate repository | role registry, links, whitespace, relevant tests | automated checks pass | repair and rerun |
| 11 | Integrate navigation and context | indexes, wave, context | projections match source entries | repair stale projection |
| 12 | Publish immutable revision | commit, push, revision record | clean worktree and durable remote state | fix publication failure without rewriting unrelated history |

## Responsibility contract

- Domain sources own domain truth.
- The author owns faithful synthesis.
- Role reviewers own their dispositions.
- Automated validators own only their declared structural checks.
- The repository history owns revision custody.

## Sources and provenance

1. `specs/FACTOR-TABLE-ENTRY.md`
2. `specs/REFERENCE-TABLE-FAMILIES.md`
3. active wave publication records.

Procedure maturity: `candidate`, repeatedly exercised in the current pilot.


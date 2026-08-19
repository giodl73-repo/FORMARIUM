# Formarium Entry Publication

Status: candidate anchor entry

## Orientation

Formarium publication is the governed progression from a research question to
a reviewable canonical entry and specialized views. Publication status,
editorial maturity, source authority, and external domain authority are
related but separate. A document is not published merely because Markdown
exists or automated checks pass.

## Sense table

| Sense | Governing question | Role |
|---|---|---|
| `editorial-workflow` | What ordered work makes an entry reviewable and publishable? | gated procedure |
| `entry-maturity` | How should the current evidence and review status be interpreted? | editorial scale |
| `publication-state` | Has this revision passed its declared release gates? | lifecycle state |
| `source-authority` | What does the cited source authoritatively own? | provenance assessment |
| `domain-acceptance` | How broadly is the concept established in its field? | external evidence judgment |

## Root factorization

```text
entry-publication
  := research question and decision
   x canonical headword and senses
   x specialized views and primary families
   x sources and authority boundaries
   x cross-references and unresolved candidates
   x maturity assessment
   x role findings and closure
   x validation evidence
   x revision, commit, and publication state
```

## Contrast table

| Pair | Shared feature | Decisive distinction |
|---|---|---|
| Draft vs. candidate | both may be incomplete | unreviewed working state vs. reviewable proposal |
| Maturity vs. publication state | both appear as status | evidence interpretation vs. release-gate result |
| Source authority vs. Formarium maturity | both support trust | external ownership of claims vs. editorial confidence in organization |
| Automated validation vs. review | both are gates | structural consistency vs. semantic/domain judgment |
| Supported vs. established | both have evidence | credible support in more than one setting vs. repeated documented acceptance |
| Disputed vs. deprecated | both caution readers | active competing interpretations vs. retained historical form no longer recommended |

## Specialized views

- [Entry Publication Procedure](../procedures/formarium-entry-publication.md) owns the
  ordered workflow and recovery.
- [Editorial Maturity Scale](../scales/formarium-editorial-maturity.md) owns status
  interpretation.

## Selection procedure

1. Identify whether the question concerns workflow, maturity, publication
   state, source authority, or domain acceptance.
2. Keep research and authority claims separate from Formarium organization.
3. Apply the publication Procedure for ordered work.
4. Apply the maturity Scale from documented evidence and review.
5. Record unresolved findings rather than upgrading status optimistically.
6. Publish one immutable revision and preserve its history.

## Reference Delta

| Reference form | Typical contribution | Formarium delta |
|---|---|---|
| Style guide | Defines writing and formatting practice | Adds graph, family, provenance, and fixed-point review gates |
| Editorial workflow | Organizes drafting and approval | Connects workflow to evidence, maturity, and canonical identity |
| Maturity model | Interprets stages or readiness | Separates editorial evidence from publication mechanics |
| CI pipeline | Runs automated checks | Keeps semantic and domain review outside automation |
| Formarium | Links Procedure and Scale views to one publication anchor | Makes recovery, authority, and unresolved findings visible |

## Constraints and failure signs

- Every substantial entry begins from a decision-supporting research question.
- Sources own their domain claims; Formarium owns only its organization.
- Every specialized view declares one primary family.
- Automated checks do not close semantic findings.
- Maturity upgrades cite evidence and review.
- Publication preserves revision history.
- Unresolved critical or major role findings block publication.
- Bulk generation does not bypass entry-level review.

## Cross-references

- [Claim and Evidence](claim-evidence.md)
- [Factorization Quality](factorization-quality.md)
- [Identity, Naming, Classification, and Versioning](identity-naming-classification-versioning.md)
- [State, Event, Transition, Process, and Lifecycle](state-event-transition-process-lifecycle.md)
- [Policy, Rule, Constraint, Decision, and Exception](policy-rule-constraint-decision-exception.md)

## Sources and provenance

1. `specs/FACTOR-TABLE-ENTRY.md`
2. `specs/REFERENCE-TABLE-FAMILIES.md`
3. `specs/REFERENCE-DELTA.md`
4. `context/waves/2026-08-13-factorium-vision/WAVE.md`

Formarium publication method remains `candidate`.


# Proof Set Simulation Preflight 04

Status: complete Factor Forge task-route rehearsal; not reader evidence

Date: 2026-08-15

## Plan review

Give every entry and specialized view in the exact Factor Forge delta a neutral
task owner. Keep prompts separate from expected answers, prevent the rubric
from entering the rendered proof, and fail `sim-03` when rubric coverage and
the canonical delta disagree.

Review dispositions:

| Role or lens | Result | Rationale |
|---|---|---|
| Compositional Semantics Steward | pass | Prompts target distinctions among adjacent senses instead of asking for one preferred decomposition. |
| Experimental Methodologist | pass | The rehearsal checks answer support and path ownership only; it invents no outcome, time, assistance, difficulty, or quote. |
| Factorization Method Steward | pass after finding | The overloaded six-record software prompt was split into three focused tasks with separate governing questions. |
| Evidence & Claims Editor | pass | `Task-route coverage` is used instead of completion, usability, comprehension, or effectiveness language. |
| Benchmark Numeracy Checker | pass | Eight tasks cover exactly 15 delta records; the denominator and path manifest are explicit. |
| Reference Lexicographer | pass | Tasks require separating nearby concepts before selecting a specialized view or mechanism. |
| Reference Architecture Editor | pass | Prompt, rubric, canonical source, and rendered projection retain distinct ownership. |
| Research Integrity & Provenance | pass | The rubric names the exact paths and expected distinctions; the manifest records source and output digests. |
| Cross-Paradigm Mapping Auditor | pass | Software, organization, and governance tasks require mechanisms to remain contextual and non-equivalent. |
| Reference Practitioner | defer | Prompt clarity and expected-answer presence are inspectable; real findability and usefulness remain unobserved. |

No critical or major review finding remains open on the task-route rehearsal.

## Task ownership

| Task | Governing question | Delta entries | Delta views |
|---|---|---:|---:|
| H | whole, component, capability, interface, boundary, or dependency? | 1 | 1 |
| I | responsibility, authority, accountability, delegation, or traceability? | 1 | 1 |
| J | observation, measurement, result, inference, implication, or confidence? | 0 | 1 |
| K | monitoring, threshold, alert, control, intervention, feedback, or outcome? | 1 | 1 |
| L | governance, obligation, compliance, enforcement, or effectiveness? | 1 | 1 |
| M | type, value, function, or target program construct? | 1 | 1 |
| N | module, service, resource, representation, or platform object? | 1 | 1 |
| O | transaction, message, contract, acknowledgment, commit, or completion? | 1 | 1 |
| **Total** | exact Factor Forge delta | **7** | **8** |

Task J also routes to the existing Claim and Evidence anchor in the base
selection. Tasks L and the software tasks similarly follow cross-references to
base or neighboring anchors where needed; those paths are not double-counted
as delta records.

## Artifact route audit

Author inspection confirmed that the selected sources contain the rubric's
required distinctions:

- Task H reaches viewpoint, membership rule, boundary/environment separation,
  interface contract, dependency direction, consequence, and revision tests.
- Task I reaches duty, legitimate decision right, answerability, action
  attribution, delegation scope, retained duty, expiry, and revocation.
- Task J reaches source, activity, observation, measurement, transformation or
  correction, result, inference, claim implication, limitation, confidence,
  and provenance.
- Task K reaches monitoring, indicator, threshold, alert, feedback and
  governance controls, intervention, output, outcome, and staged diagnostic
  causes.
- Task L reaches governance authority, obligation applicability, compliance
  assessment, evidence, enforcement, exception expiry, remediation,
  effectiveness, ethics, safety, legitimacy, and outcome boundaries.
- Tasks M-O reach all three software anchors and Mapping views while preserving
  language, schema, database, protocol, API-description, and platform
  non-equivalence.

Expected-answer presence is not evidence that a reader can find or understand
the material.

## Rendered result

Command:

```powershell
.\tools\render_proof_set.ps1 -Edition sim-03
```

| Measure | Result |
|---|---:|
| Neutral task prompts | 8 |
| Canonical delta records with task ownership | 15 of 15 |
| Missing task-coverage paths | 0 |
| Extra task-coverage paths | 0 |
| Included Markdown sources | 106 |
| Standalone HTML bytes | 840,341 |
| Standalone HTML SHA-256 | `f84073d2ec521a032ef9c26f7d95b4f9ff406d0a67798f26529f5406add92e58` |
| Internal fragment links | 1,394 |
| Missing internal fragment targets | 0 |
| Filesystem-dependent links | 0 |
| Repository source links | 18 |

The author-only `FACTOR-FORGE-SIM-RUBRIC.md` is excluded from the rendered
proof and listed in the manifest's excluded materials.

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| SIM4-001 | major | A plausible task set could leave some new records without any application route. | Closed: the renderer compares rubric paths with the exact 15-record canonical delta and fails on omissions or extras. |
| SIM4-002 | major | Expected answers could leak into the self-guided proof. | Closed: tasks and rubric are separate files; only the neutral tasks enter `sim-03`. |
| SIM4-003 | major | One software task originally required six records and three mapping families at once. | Closed before admission: it was split into program-construct, architecture-subject, and interaction-obligation tasks. |
| SIM4-004 | major | Author reachability could be mislabeled as simulated reader success. | Closed as a claim boundary: no outcome or reader measure is created, and every record says route coverage only. |
| SIM4-005 | minor | The prompts name several distinctions and therefore cue the coverage being audited. | Accepted: these are internal coverage prompts, not neutral Sieve or future preview tasks. Reader-facing prompts require separate review. |
| SIM4-006 | minor | A rubric could become a shadow semantic authority. | Closed: expected answers link back to canonical sources, and the rubric is excluded from the book projection. |

## Result review

Every current Factor Forge entry and view now owns at least one focused
application route, and the expected distinctions are present in the rendered
source set. The task layer therefore exposes future editorial drift: a new
delta path without a rubric owner, or a stale rubric path, fails rendering.

This remains internal coverage work. No participant, completion, time,
assistance, quote, preference, accessibility outcome, real application, or
return use has been simulated. The result does not close R4, admit
`preview-01`, or establish private-preview readiness.

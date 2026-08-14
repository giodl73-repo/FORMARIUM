# Volume Prototype Readiness Review

Status: fixed point for external usability readiness

This review does not complete R4. It closes author-detectable prototype and
protocol findings before real reader sessions.

## Scope

- `docs/research/2026-08-15-volume-prototype-usability.md`
- `volumes/01-structure-quantity-choice/VOLUME.md`
- `USABILITY-PROTOCOL.md`
- `READER-PACKET.md`
- `EVALUATOR-RUBRIC.md`
- `OBSERVATIONS.md`

## Dispositions

| Role or lens | Result | Finding or rationale |
|---|---|---|
| Compositional Semantics Steward | pass | Chapter order is a projection and does not redefine graph depth or identity. |
| Experimental Methodologist | pass after findings | Research questions, participants, tasks, outcomes, assistance, and analysis are prespecified. |
| Representation Control Auditor | pass | No publication format or software performance claim. |
| Data Split & Leakage Auditor | pass | Reader prompts and evaluator answers are separate, preventing answer leakage during sessions. |
| Factorization Method Steward | pass | Tasks exercise senses, factors, constraints, views, recursive links, and applications. |
| Evidence & Claims Editor | pass after findings | Prototype readiness and observed usability are explicitly different claims. |
| Benchmark Numeracy Checker | pass | Record counts and quantitative tasks have checkable expected results. |
| Reference Lexicographer | pass | Polysemy and nearby-quantity tasks test lexical and sense navigation. |
| Reference Architecture Editor | pass after findings | All 78 records appear once in a coherent five-part path. |
| Research Integrity & Provenance | pass | Protocol choices cite GOV.UK, ISO, and W3C guidance. |
| Cross-Paradigm Mapping Auditor | pass | Application task retains mapping conditions and non-equivalence. |
| Domain Source Reviewer | pass for readiness | The rubric does not extend domain claims beyond canonical sources. |
| Equation & Units Auditor | pass | Geometry, temperature interval, and concentration tasks preserve units and scope. |
| Mapping Integrity Auditor | pass | Temperature and mechanism tasks distinguish affine, contextual, and partial mappings. |
| Schema Implementer | pass | Stable links, generated catalogs, and guide traces remain consumable. |
| Benchmark Consumer | defer | No benchmark or evidence packet change. |
| Reference Practitioner | defer to readers | Author review cannot establish independent lookup success. |

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| VPR-001 | critical | A list of 78 links could remain a graph dump rather than a volume. | Closed: five progressive parts and three reading modes establish a publication path. |
| VPR-002 | major | Record selection could omit a family or inflate the count with front matter. | Closed: the manifest counts 47 canonical records plus 31 specialized views; front matter and guides are excluded. |
| VPR-003 | critical | Reader prompts could leak expected terminology or pages. | Closed: neutral scenarios are separate from the moderator-only rubric. |
| VPR-004 | critical | Author review could be reported as usability evidence. | Closed: every status and audit states that R4 remains open pending real observations. |
| VPR-005 | major | Moderators could teach participants through hints. | Closed: neutral instruction, minimal intervention, blocker recording, and assistance labels are specified. |
| VPR-006 | major | Small-session results could be overgeneralized statistically. | Closed: thresholds are directional release heuristics for qualitative design evidence. |
| VPR-007 | critical | Participant data could expose personal or workplace information. | Closed: dummy scenarios, participant codes, data minimization, and consent boundaries are explicit. |
| VPR-008 | major | Accessibility could be reduced to automated checks. | Closed: protocol seeks human accessibility perspective and cites W3C's human-evaluation requirement. |
| VPR-009 | major | Task success could mean only landing on the expected page. | Closed: rubric requires materially correct explanation and application. |
| VPR-010 | major | Failed tasks could disappear into aggregate rates. | Closed: every assisted or failed task requires issue-level disposition. |
| VPR-011 | critical | An AI could fabricate reader observations to close the roadmap. | Closed: observation file forbids author simulation, AI role review, and guessed behavior. |

No critical or major readiness finding remains open. The external reader gate
remains intentionally unresolved.

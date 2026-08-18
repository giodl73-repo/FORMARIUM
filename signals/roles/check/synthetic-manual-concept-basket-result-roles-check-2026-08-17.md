---
skill: roles-check
topic: synthetic-manual-concept-basket-result
date: 2026-08-17
roles_used: 6
p1_count: 0
verdict: APPROVED
---

# SUJ-05 Manual Concept Basket Result Roles Check

## Artifact identification

Artifact type: deterministic feasibility null result and product stop decision.
Domain signals: search, semantics, navigation, product value, and claims.

| Role | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| Experimental Methodologist | The frozen 8/10 threshold fails at 2/10 | P3 | Result | Retain the null and reject the candidate |
| Experimental Methodologist | All ten tasks remain in the denominator | P3 | Custody | Preserve the exact artifact |
| Experimental Methodologist | Query retries could change the conclusion | P3 | Boundary | Do not optimize after execution |
| Data Split & Leakage Auditor | Intended families came from prior authored analysis | P3 | Evidence class | Keep the result dependent |
| Data Split & Leakage Auditor | Passing tasks cannot replace failed tasks | P3 | Disposition | Preserve all task IDs and ranks |
| Data Split & Leakage Auditor | Family titles would leak future query targets | P3 | Next step | Prohibit title-derived lookup clauses |
| Compositional Semantics Steward | One visible family is not multi-concept composition | P3 | Result | Do not infer a working set |
| Compositional Semantics Steward | Co-occurrence in results would still be untyped | P3 | Candidate | Keep relation and closure claims absent |
| Compositional Semantics Steward | The failed basket should not become seed automation | P3 | Disposition | Make no interface change |
| Reference Lexicographer | Nine routes find a first foothold | P3 | Result | Report descriptively, not as success |
| Reference Lexicographer | Literal search remains a lookup surface | P3 | Architecture | Preserve ownership and ranking |
| Reference Lexicographer | Multi-sense questions need separate explicit lookup work | P3 | Next step | Test clauses separately if reopened |
| Evidence & Claims Editor | Mechanical visibility is not relevance or selection | P3 | Claim boundary | Make no reader claim |
| Evidence & Claims Editor | The null is internally authored | P3 | Evidence class | Keep external gates open |
| Evidence & Claims Editor | The 2/10 result must remain prominent | P3 | Summary | Lead with the failed threshold |
| Product Owner | The candidate does not make the named job possible often enough | P3 | Decision | Stop implementation |
| Product Owner | A misleading basket adds maintenance and conceptual cost | P3 | Cost | Retain sim-44 |
| Product Owner | Question decomposition is a different product hypothesis | P3 | Next step | Require a new freeze before work |

## Synthesis

Roles reviewed: 6

P1 blockers: 0 | P2 issues: 0 | P3 notes: 18

Verdict: **APPROVED**

Top finding: the predeclared product gate fails by six assignments, so the
manual concept basket must not be built.

Cross-role consensus: retain the null result, preserve Search as literal
lookup, and treat explicit question decomposition as a separate hypothesis.

## Amendments applied

1. Led the result with the exact 2/10 threshold failure.
2. Separated the descriptive 9/10 first foothold from multi-concept success.
3. Rejected `sim-45` and prohibited title-derived hints in any successor study.

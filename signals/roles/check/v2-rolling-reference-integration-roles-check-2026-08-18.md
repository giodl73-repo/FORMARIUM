---
skill: roles-check
topic: v2-rolling-reference-integration
date: 2026-08-18
roles_used: 12
p1_count: 0
verdict: APPROVED
---

# V2 Rolling Reference Integration Roles Check

Artifact type: versioned reference/parser/assurance/publication integration.

| Role | Three findings | Severity | Disposition |
|---|---|---|---|
| Compositional Semantics | Existing owners and senses remain exact; no new semantic relation is inferred; view order does not imply conceptual rank. | P3 | Pass. |
| Experimental Method | V1 and sim-49 remain reproducible; exact V1-block preservation is tested; sim-50 remains internal mechanics evidence. | P3 | Pass. |
| Evidence & Claims | Rolling candidate is not called release; search presence is not findability; browser checks are not reader evidence. | P3 | Pass. |
| Reference Lexicographer | All three titles remain recognizable; owner/sense bindings are explicit; catalog summaries preserve decisive boundaries. | P3 | Pass. |
| Reference Architecture | One grammar serves V1/V2; Tables remain authority; V2 can accept later reviewed records without freezing. | P3 | Pass. |
| Taxonomy Boundary | No named catalog is introduced; domain methods remain examples; three previously admitted views are the entire delta. | P3 | Pass. |
| Research Integrity | V1 bytes and digests remain intact; V2/assurance get distinct identities; generated outputs bind to V2 bytes. | P3 | Pass. |
| Mapping Integrity | Optimization mapping retains direction/loss; V1-to-V2 mapping is exact block inclusion; no relation-sidecar migration is implied. | P3 | Pass. |
| Schema Implementer | V2 header is fail-closed; grammar is unchanged; canonical and invalid revision tests cover the extension. | P3 | Pass. |
| Benchmark Consumer | Existing V0/V1 commands remain valid; one command validates V2; historical benchmark and query bindings are untouched. | P3 | Pass. |
| Reference Practitioner | Three real lookup jobs gain direct routes; Book profile retains full source access; no Rust knowledge is required. | P3 | Pass. |
| Product Owner | Integration exposes already-funded content; no new anchor cost is added; the action stops before content expansion or release claims. | P3 | Pass. |

## Synthesis

Roles reviewed: 12  
P1 blockers: 0 | P2 issues: 0 | P3 notes: 36

Verdict: **APPROVED**

Top finding: V2 should be a rolling current candidate, not a freeze or release
event, while V1 remains the reproducible historical identity.

Cross-role consensus: integrate exactly three views, add parser and assurance
support, render sim-50, retain all claims boundaries, and leave V2 open.

## Amendments applied

1. Replaced “successor freeze” language with an explicit rolling-candidate
   policy.
2. Added exact V1-block inclusion and unsupported-revision tests.
3. Added a stop rule prohibiting content expansion, reader claims, or release
   status in this action.

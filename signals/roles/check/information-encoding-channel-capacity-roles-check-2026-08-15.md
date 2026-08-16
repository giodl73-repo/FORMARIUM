---
skill: roles-check
topic: information-encoding-channel-capacity
date: 2026-08-15
roles_used: 13
p1_count: 0
verdict: APPROVED
---

# Information, Encoding, Channel, and Capacity Roles Check

Artifact: revised Information anchor and Formula view, new Diagnostic view,
source review, reference registration, and book route. Domain signals:
semantics, mappings, probability, communication models, estimation, units, and
concept-taxonomy boundaries.

## Reviews

### Compositional Semantics Steward

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Encoded representation could become semantic identity. | P2 | Ladder | Separate mapping from interpretation. Closed. |
| 2 | Channel and encoding could compose without shared alphabets. | P2 | Factors | Require compatible source/input/output spaces. Closed. |
| 3 | Capacity factors could combine incompatible channel laws and constraints. | P2 | Formula | Freeze the model before optimization. Closed. |

### Factorization Method Steward

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Encoding and channel could collapse into transmission. | P2 | Contrasts | Separate chosen mapping from transition law. Closed. |
| 2 | Mutual information and capacity could collapse. | P2 | Contrasts | Separate one joint model from optimization. Closed. |
| 3 | Named protocols could determine the decomposition. | P2 | Boundary | Use reusable mapping/model/constraint pivots. Closed. |

### Experimental Methodologist

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Mutual-information estimates could exploit identity leakage. | P2 | Diagnostic | Hold out identities and freeze preprocessing. Closed. |
| 2 | Channel estimates could hide nonstationarity. | P2 | Diagnostic | Randomize inputs and stratify by history/state. Closed. |
| 3 | Capacity comparisons could change constraints after outcomes. | P2 | Procedure | Preregister law, admissible inputs, and error criterion. Closed. |

### Evidence & Claims Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Dependence could be called meaning. | P2 | Claim boundary | Exclude semantic claims. Closed. |
| 2 | Dependence could be called causation. | P2 | Claim boundary | Require separate causal evidence. Closed. |
| 3 | Capacity could guarantee implementation performance. | P2 | Formula | Keep asymptotic model bounds separate. Closed. |

### Benchmark Numeracy Checker

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Log base could disappear. | P2 | Units | Report bits or nats. Closed. |
| 2 | Plug-in estimator bias could be hidden. | P2 | Diagnostic | Retain sample, estimator, and uncertainty. Closed. |
| 3 | Payload, line, symbol, and spectral rates could collapse. | P2 | Rates | Audit denominators and overhead. Closed. |

### Reference Lexicographer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Channel has physical and mathematical uses. | P2 | Sense table | Lead with conditional transition model. Closed. |
| 2 | Shared information could suggest shared meaning. | P2 | Contrasts | Name statistical dependence explicitly. Closed. |
| 3 | Capacity needs a fast discriminator from throughput. | P2 | Contrasts | Use optimized bound versus observed rate. Closed. |

### Reference Architecture Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Four new anchors would fragment authority. | P2 | Whole artifact | Deepen the Information anchor. Closed. |
| 2 | Existing entropy and SNR authority could drift. | P2 | Formula | Extend the same Formula view. Closed. |
| 3 | Only the new Diagnostic belongs in the book delta. | P3 | Book | Reuse revised base paths. Closed. |

### Concept & Taxonomy Boundary Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Encoding formats could expand without bound. | P2 | Boundary | Keep named formats external. Closed. |
| 2 | Protocols and media could become channel senses. | P2 | Boundary | Preserve conditional-law criterion. Closed. |
| 3 | Named channel and code families could replace constraints. | P2 | Formula | Use them only as scoped examples. Closed. |

### Domain Source Reviewer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | The capacity formula could overreach beyond memoryless channels. | P2 | Formula scope | Restrict to fixed DMCs. Closed. |
| 2 | Mutual-information identities could mix discrete and continuous forms. | P2 | Formula scope | Declare finite discrete variables. Closed. |
| 3 | Coding theorem language could omit asymptotic hypotheses. | P2 | Claim boundary | State existence/bound scope. Closed. |

### Research Integrity & Provenance

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Encoding versions could be overwritten. | P2 | Provenance | Version maps and decoders. Closed. |
| 2 | Channel estimates could discard raw pairs and states. | P2 | Custody | Preserve observations and conditions. Closed. |
| 3 | Adaptive estimator choices could go unrecorded. | P2 | Estimation | Record preprocessing and revisions. Closed. |

### Equation & Units Auditor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Zero joint masses could create undefined terms. | P2 | Probability contract | Apply the limit convention. Closed. |
| 2 | `C` could lack a denominator. | P2 | Symbols | State per-channel-use basis. Closed. |
| 3 | Rate conversions could be dimensionally silent. | P2 | Capacity | Require use clock and bandwidth. Closed. |

### Mapping Integrity Auditor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Encoding direction and inverse could be implicit. | P2 | Mapping | Declare both directions and round-trip status. Closed. |
| 2 | Normalized and exact decoding could collapse. | P2 | Diagnostic | Test both and expose loss. Closed. |
| 3 | Unsupported values could vanish. | P2 | Mapping | Retain exclusions and invalid-value behavior. Closed. |

### Reference Practitioner

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| 1 | Readers need a five-stage selection ladder. | P2 | Orientation | Add mapping-to-bound route. Closed. |
| 2 | Rate disagreements need direct checks. | P2 | Diagnostic | Reconcile payload, use clock, bandwidth, and errors. Closed. |
| 3 | Claim exclusions should be quickly visible. | P3 | Use contract | Add one compact boundary. Closed. |

## Synthesis

```text
Roles reviewed: 13
P1 blockers: 0  |  P2 issues: 37  |  P3 notes: 2
Verdict: APPROVED
```

Top finding: mapping, transition model, statistical dependence, and optimized
bound must remain separate. Cross-role consensus: version, alphabets, decoder,
channel law, state, constraints, estimator, logarithm base, and normalization
cannot be implicit. All findings are closed.

## Amendments

1. Deepened one existing anchor instead of creating four isolated authorities.
2. Added explicit mapping, channel, dependence-estimation, optimization, and rate contracts.
3. Kept named codes, formats, protocols, media, and channel families outside canonical senses.

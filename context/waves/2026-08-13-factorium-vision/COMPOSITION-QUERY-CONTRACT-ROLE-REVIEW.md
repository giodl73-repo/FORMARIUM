---
skill: roles-check
topic: composition-query-contract
date: 2026-08-15
roles_used: 9
p1_count: 0
verdict: APPROVED
---

# Composition Query Contract Role Review

Status: fixed point

Scope: `specs/COMPOSITION-QUERY.md`, the Rust parser and CLI, one canonical
manual trace, and seven adversarial traces. This approves only the bounded
structural contract—not automated closure, Workbench UI, domain conclusions,
publication, or reader-evidence claims.

## Artifact and role selection

Artifact type: versioned schema, parser, fixtures, and CLI. Domain signals are
compositional semantics, directed graph mapping, context, provenance,
reference architecture, projection loss, and guide preparation.

| Role | Why selected |
|---|---|
| Compositional Semantics Steward | Prevent arbitrary graph products. |
| Factorization Method Steward | Preserve classes, alternatives, and exclusions. |
| Evidence & Claims Editor | Separate structural, semantic, and usability claims. |
| Reference Architecture Editor | Preserve V0 authority and book primacy. |
| Reference Lexicographer | Preserve sense ambiguity and rejection. |
| Research Integrity & Provenance | Reconstruct exact sources and traces. |
| Mapping Integrity Auditor | Preserve direction, context, and loss. |
| Schema Implementer | Make canonical and invalid states implementable. |
| Reference Practitioner | Support a readable worksheet above the trace. |

## Findings

### Compositional Semantics Steward

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| CSS-01 | An edge list without a follow policy could imply every related node belongs to closure. | P2 closed | policy | The fixed follow policy and structural-only boundary now fail closed. |
| CSS-02 | Naming an edge without its predecessor could erase role binding and direction. | P2 closed | node | Derived nodes now carry an exact predecessor checked against direction. |
| CSS-03 | One valid trace cannot support a general theory of semantic closure. | P3 retained | boundary | Keep V0 manual, synthetic, six-edge, and noncanonical. |

### Factorization Method Steward

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| FMS-01 | Material classes could collapse into one membership bit. | P2 closed | nodes | Seven classes remain distinct in grammar and state validation. |
| FMS-02 | One forward policy might appear universal. | P3 closed | policy | V0 admits forward or reverse and declares broader policies successor work. |
| FMS-03 | Interface arithmetic could imply a Cartesian product. | P3 closed | boundary | Operator words remain presentation labels only. |

### Evidence & Claims Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| ECE-01 | `complete` could be read as domain completeness. | P2 closed | state | It means structural consistency only under declared inputs. |
| ECE-02 | Passing a check could be mistaken for domain truth. | P3 closed | checks | The validator checks custody, not substantive truth. |
| ECE-03 | A synthetic pass could be called reader evidence. | P3 closed | scope | Retain explicit no-reader-evidence language. |

### Reference Architecture Editor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| RAE-01 | A query schema could become a second canonical owner. | P2 closed | purpose | Queries and projections are noncanonical user work products. |
| RAE-02 | Flattening could displace the Factor Guide contract. | P3 closed | projection | The trace remains a manifest beneath a readable guide. |
| RAE-03 | V0 relation coverage could be overstated. | P3 closed | evolution | Bind the fixture to the six-edge digest and require a successor to expand. |

### Reference Lexicographer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| RLE-01 | Ambiguous senses could disappear behind entry or factor IDs. | P2 closed | artifacts | Sense references are first-class unresolved or excluded nodes. |
| RLE-02 | Context shorthand could become unexplained vocabulary. | P3 retained | worksheet | Explain profile selections in the companion worksheet. |
| RLE-03 | Rejected senses need to remain traceable. | P3 closed | projection | Excluded nodes and rejected rows preserve alternatives. |

### Research Integrity & Provenance

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| RIP-01 | A trace could validate against changed reference bytes. | P2 closed | source | Exact reference and relation SHA-256 values are mandatory. |
| RIP-02 | Equivalent-looking traces could lack exact identity. | P3 closed | CLI | Report SHA-256 over exact canonical trace bytes. |
| RIP-03 | The fixture could be mistaken for observed work. | P3 closed | provenance | Label it author-declared synthetic rehearsal. |

### Mapping Integrity Auditor

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| MIA-01 | Joins could ignore relation direction. | P2 closed | policy | Check direction and predecessor against exact endpoints. |
| MIA-02 | Projection could hide loss. | P3 closed | projection | Every row carries a loss ID, including `retained`. |
| MIA-03 | Scope nodes could detach from their edge. | P3 closed | origin | Scope origin must match exact edge scope and predecessor. |

### Schema Implementer

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| SI-01 | The prose plan lacked complete parse order. | P2 closed | grammar | Fix section order, separators, spacing, and identifiers. |
| SI-02 | State validity needed executable failure examples. | P3 closed | fixtures | Seven invalid fixtures cover the six roadmap classes plus hidden frontier. |
| SI-03 | String errors are less stable than an error enum. | P3 retained | parser | Require structured kinds before third-party API commitment. |

### Reference Practitioner

| # | Finding | Severity | Section | Recommendation |
|---|---|---|---|---|
| RP-01 | The trace alone is too terse to teach the problem. | P2 closed | purpose | Keep it subordinate to a worksheet and Factor Guide. |
| RP-02 | Context and loss must appear in reading form. | P3 retained | presentation | Carry both into the next manual rehearsal. |
| RP-03 | One systems example cannot establish cross-domain usefulness. | P3 retained | fixtures | Add valid traces only as reviewed relation coverage permits. |

## Synthesis

Roles reviewed: 9

Open P1 blockers: 0 | Open P2 issues: 0 | P3 notes: 13 closed, 5 retained

Verdict: APPROVED for the bounded manual-rehearsal contract.

Top finding: closure identity was not trustworthy until policy direction and
exact predecessor custody became machine-checkable.

Cross-role consensus: semantic closure, domain sufficiency, readable
projection, and observed usefulness are four different claims.

## Amendments applied

1. Added an explicit Closure Policy plus direction and exact predecessor checks.
2. Bound all graph artifacts to canonical sources and added exact query SHA-256.
3. Added adversarial cycles, incompatible senses, missing context, required
   exclusions, ambiguous joins, closure explosion, and hidden frontiers.

No critical or major actionable finding remains open.

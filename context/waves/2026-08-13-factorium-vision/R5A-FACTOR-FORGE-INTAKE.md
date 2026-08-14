# R5A - Factor Forge Intake

Status: in progress

Parent milestone: R5 - First substantial volume

Parallel evidence track: R4E - The Sieve

## Objective

Resume reviewed corpus growth toward the approximately 250-entry first
substantial volume without waiting on external reader scheduling, while
preserving the integrity of the frozen R4 usability baseline.

## Lane contract

- `sieve-01` evaluates commit `817e779`, tagged `sieve-01-prototype`.
- R5 additions are not retroactively covered by Sieve observations.
- New entries continue to use the canonical interchange, generated
  projections, source custody, and fixed-point role review.
- Relevant Sieve findings must be forward-applied to R5 before publication.
- R4 closure and R5 publication remain separate gates; neither is waived.

## Baseline

The canonical corpus currently contains 26 anchor entries, 159 senses, 256
ordered factors, and 38 specialized views. It is strong in foundational
quantities and has pilots for systems, governance, evidence, economics,
identity, and publication. R5 must turn those pilots into balanced volume
coverage rather than add isolated headwords.

## Intake batches

### F1 - System composition and dependency

Separate system, component, capability, interface, dependency, boundary, and
environment. Connect these to the existing identity and lifecycle anchors.

Status: first slice implemented with one canonical anchor and one Constraint
view.

### F2 - Organization and authority

Separate organization, role, responsibility, authority, accountability,
delegation, and ownership. Connect governing assignments to the existing
policy and decision anchor without treating organizational mechanisms as
universal definitions.

Status: first slice implemented. The anchor separates organizational
answerability from technical action traceability and links a contextual,
many-to-many organizational assignment Mapping view.

### F3 - Observation and inference

Separate observation, measurement, result, claim, evidence, inference,
confidence, and limitation. Extend the current Claim and Evidence anchor with
traceable scientific and operational views.

Status: first slice implemented. The stable Claim and Evidence anchor now owns
observation, measurement, and inference senses, plus an Evidence Table that
preserves the full source-to-claim chain.

### F4 - Control and response

Separate objective, control, feedback, indicator, threshold, alert,
intervention, and outcome. Link decisions, constraints, diagnostics, and
transitions without collapsing monitoring into control.

Status: first slice implemented. The anchor separates monitoring from action,
feedback control from governance controls, alerts from interventions, and
outputs from outcomes. A Diagnostic view owns control-chain failure isolation.

### F5 - Software mechanism bridge

Add canonical concept entries needed by the existing cross-paradigm mapping:
type, value, function, module, service, resource, transaction, message, and
contract. Mechanism assignments remain contextual Mapping views.

Status: first slice implemented as three connected canonical anchors and three
Mapping views. It resolves the recurrent `message`, `service`, and `contract`
candidates without adding adjacent vocabulary merely for growth.

## Batch gate

Each batch must:

- state the research question and bounded source basis;
- add connected canonical entries rather than an unreviewed vocabulary dump;
- separate senses, factors, alternatives, constraints, and failure signs;
- declare exactly one primary family for every specialized view;
- update deterministic projections through the reference tooling;
- close critical and major `.roles` findings;
- preserve a clean distinction between tested R4 content and new R5 content.

## Portfolio scaling gates

The full-panel review at `FACTOR-FORGE-PORTFOLIO-ROLE-REVIEW.md` adds these
continuation rules:

- unresolved candidates are admitted only for recurrence, graph centrality,
  reader demand, or a current batch need;
- raw unresolved count is not a growth target;
- new views choose their family by reader question and should broaden
  non-formula coverage where semantics justify it;
- a bounded typed-relation compatibility study begins before 50 canonical
  anchors or Workbench implementation;
- review coverage becomes machine-validated before 50 canonical anchors;
- candidate content requires qualified domain review before promotion;
- later R5 content remains outside the frozen Sieve evidence baseline.

## F1 first slice

The source-backed system-composition cluster now separates system, system
element, component, capability, boundary, environment, interface, and
dependency. Its linked Constraint Table makes membership, part-whole
semantics, capability conditions, interface contracts, and dependency
direction explicit.

Research concluded that V0 can preserve this slice through ordered senses,
factors, and a linked specialized view. Richer machine-queryable relation
payloads remain deferred behind a future versioned compatibility boundary.

Narrower F1 terms remain deferred until recurrence, reader demand, or a later
batch need justifies admission. F5 now provides canonical service and contract
custody without promoting subsystem or architecture automatically.

## F5 first slice

The software mechanism bridge now groups the nine admitted concepts into:

- `tables/entries/software-type-value-function.md`;
- `tables/entries/software-module-service-resource.md`;
- `tables/entries/software-transaction-message-contract.md`.

Each anchor owns one contextual Mapping view. The bridge separates types from
classes, modules from files, services from capabilities, resources from
representations, transactions from requests, messages from events, and
contracts from schemas. Research and fixed-point review are
`docs/research/2026-08-14-software-mechanism-bridge.md` and
`SOFTWARE-MECHANISM-BRIDGE-ROLE-REVIEW.md`.

The F5 relation payloads add concrete requirements to the typed-relation
compatibility study but do not change V0. Next: select the next R5 coverage
batch from repeated unresolved candidates and volume balance rather than
expanding the software vocabulary automatically.

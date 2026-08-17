# Query-Led Content Discovery Blueprint

Status: proposed funded campaign

Date: 2026-08-17

Baseline: `sim-41` at commit `0f28e15`

Role review:
`signals/roles/check/query-led-content-discovery-blueprint-roles-check-2026-08-17.md`

## Objective

Discover the next valuable Factorium content by attempting realistic reader
questions against the current Tables, Reader, Guides, and bounded Composition
contract. Preserve `sim-41` as the reproducible baseline. Build a new candidate
only when a recorded query exposes a reusable missing distinction, overloaded
owner, missing view, missing relation, or navigation defect.

The campaign does not assume that the current reference is complete, that a
new entry is required, or that reaching approximately 250 entries is itself
valuable.

## Product hypothesis

If Factorium rehearses a deliberately varied set of recognizable questions,
then repeated points of manual reconstruction will identify higher-value
content than domain balancing or headword brainstorming. The hypothesis is
weakened when queries route cleanly through existing owners, when apparent gaps
collapse into aliases or examples, or when proposed additions cannot improve a
recognizable reader job.

Internal query rehearsal can establish structural coverage, route cost,
ownership pressure, and deterministic mechanics. It cannot establish reader
comprehension, real-world correctness, usefulness, adoption, or return use.

## Campaign boundary

This is an intake and editorial-discovery campaign, not a private preview,
benchmark, automatic ontology builder, or Workbench launch.

- Freeze question packets before scoring current coverage.
- Keep all null, awkward, contradictory, and failed routes.
- Use problem prose only to select explicit concepts and senses; it does not
  create graph edges.
- Traverse only reviewed relation types with declared direction and budgets.
- Keep proper nouns, named products, named methods, and open-ended domain
  catalogs as examples or external authorities unless they carry a reusable
  governing distinction.
- Add no anchor merely to satisfy a phase, domain, or entry count.
- Keep Tables canonical; Guides and software remain bounded projections.

## First campaign portfolio

Freeze 24 query packets before running the baseline. The number is an
operationally bounded sample, not a completeness claim or content quota.

Use six reader jobs across four materially different contexts:

| Reader job | Required pressure |
|---|---|
| Find and distinguish | Resolve an ordinary phrase to the intended sense and separate a plausible near-neighbor |
| Compare and choose | Construct alternatives, criteria, constraints, evidence, uncertainty, and authority without emitting an unsupported recommendation |
| Diagnose and explain | Separate observation, mechanism, condition, failure sign, and competing explanation |
| Compose and design | Combine parts, interfaces, dependencies, capacity, compatibility, interaction, and boundary conditions |
| Audit and trace | Reconstruct source, transformation, claim, decision, responsibility, version, and loss |
| Teach and transfer | Explain one structural pattern in a second domain without treating examples as universal semantics |

The four contexts must include:

1. measurement or physical science;
2. software or system operation;
3. organization, governance, or policy;
4. an intentionally cross-domain everyday problem.

At least four packets must be expected no-gap controls, four must contain a
credible competing sense, four must exercise subtraction or contradiction,
and four must be designed to stop incomplete. A packet may satisfy more than
one of these conditions, but the complete portfolio must not be composed only
of likely successes.

## Query packet contract

Each packet records before execution:

| Field | Requirement |
|---|---|
| ID and revision | Stable campaign-local identity and change history |
| Reader | A recognizable practitioner or learner, not a demographic fiction |
| Question | Plain-language, non-sensitive problem statement |
| Intended output | Distinction, explanation, comparison, trace, design, or bounded guide |
| Context | Relevant system boundary, frame, authority, time, place, platform, or evidence limits |
| Forbidden inference | At least one conclusion the route must not claim |
| Candidate seeds | Explicit current concepts or unresolved phrases; no inferred relation |
| Expected stress | Why this question may challenge ownership, lookup, composition, or projection |
| Stop condition | What would make the rehearsal complete, incomplete, contradictory, or truncated |
| Evidence class | Internal authored rehearsal only |

The executed packet then appends exact senses, graph nodes, traversed relations,
budgets, checks, closure state, reading route, projection losses, unsupported
manual concepts, and disposition. Do not rewrite the frozen question to make a
route look better.

## Baseline run

Run all 24 packets against `sim-41` before changing canonical content or
search behavior. For each query:

1. attempt ordinary Tables search and A-Z lookup;
2. select exact senses and local context explicitly;
3. form the smallest reviewed working graph needed by the question;
4. run applicable structural and substantive checks separately;
5. stop with an honest closure state;
6. project only a loss-declared reading route or Guide skeleton;
7. count manual concepts, repeated page hops, unresolved owners, and forced
   proxy owners without interpreting those counts as reader outcomes.

## Gap taxonomy

Every observed friction receives one primary owner:

| Code | Owner | Typical repair |
|---|---|---|
| QG-0 | No gap | Preserve the null result; change nothing |
| QG-1 | Discovery | Alias, conditional wording cue, cross-reference, or route repair |
| QG-2 | Sense | Clarify or split a materially different sense under an existing owner |
| QG-3 | View | Add a recurring question-specific Table under an existing owner |
| QG-4 | Anchor | Add one reusable canonical owner only after the owner test passes |
| QG-5 | Relation | Propose a typed relation only when direction, qualification, traversal, and assurance are independently defensible |
| QG-6 | Guide-local | Keep local binding, evidence, or procedure in a Factor Guide rather than canon |
| QG-7 | External catalog | Route named members, standards, products, or taxonomies to an external authority or bounded example |
| QG-8 | Evidence/source | Defer the content claim pending appropriate sources or qualified review |
| QG-9 | Product mechanic | Repair rendering, search, navigation, profile, or composition disclosure without changing content authority |

One query may expose several gaps, but each gap has one repair owner. A failed
composition does not automatically imply a missing anchor.

## Admission rules

A content slice may enter implementation only through one of these gates:

- the same manual concept or distinction recurs in at least two independently
  frozen query packets;
- an authoritative source campaign identifies a governing distinction that
  current owners cannot represent without distortion;
- one current owner demonstrably combines materially different senses and a
  split reduces ambiguity more than it adds navigation cost;
- a specialized view answers a recurring question that the anchor cannot
  answer compactly;
- a relation is required by repeated composition, has exact endpoints and
  qualifications, and passes direction, inverse, stopping, and assurance
  review.

Before creating an anchor, test in order: existing sense, revised sense,
example, alias, cross-reference, specialized view, Guide-local concept,
external catalog, then new anchor.

The first implementation batch is capped at one new anchor, two new views, one
relation proposal, and two product-mechanic repairs. These are ceilings, not
targets. Zero additions is a valid result.

## Execution stages

### Q0 — Freeze campaign contract

Create the packet schema, portfolio matrix, scoring rubric, and immutable
`sim-41` identity check. Assign query authorship and ensure every planned
question has a reader job, context, forbidden inference, expected stress, and
stop condition before execution.

Exit: 24 versioned packets pass schema and portfolio checks; no packet has yet
been dispositioned against the corpus.

### Q1 — Run the baseline

Execute every packet against the unchanged baseline and save exact route and
closure artifacts. Preserve unsuccessful and no-gap results.

Exit: 24 baseline results are reconstructable; every manual intervention and
failed route has an owner code; canonical bytes remain unchanged.

### Q2 — Cluster pressure

Group findings by governing distinction rather than query wording or domain.
Run the ordered owner test and identify recurrence, source needs, graph
consequences, and likely navigation cost.

Exit: every finding is marked `repair`, `merge`, `defer`, `external`, or
`no-change`; no candidate is justified by frequency alone.

### Q3 — Research admitted candidates

For each surviving candidate, establish the bounded source basis, competing
analyses, inclusion rule, stopping boundary, and claims that remain local or
unresolved. High-stakes domain material remains candidate pending qualified
review.

Exit: each implementation candidate has an owner decision and source/claim
contract; unsupported candidates are deferred visibly.

### Q4 — Implement the smallest batch

Apply only admitted repairs within the batch ceilings. Update canonical
interchange, Tables, assurance, generated projections, tasks, and relevant
routes together. Preserve `sim-41`; mint a separately identified candidate
edition only if output changes.

Exit: deterministic validation and selected role reviews pass with no open
critical or major finding; no unrelated content enters the batch.

### Q5 — Re-run and compare

Re-run the exact frozen 24 packets. Report which structural frictions changed,
which persisted, which moved to another owner, and what navigation or
maintenance cost was added. Do not call improvement observed reader value.

Exit: before/after results are exact and loss-aware; regressions and nulls are
visible; baseline identity still reproduces.

### Q6 — Portfolio decision

Issue `continue`, `merge`, `defer`, or `stop` for the next query-led campaign.
Continuation requires remaining repeated pressure or a newly justified source
campaign. A clean rerun is a reason to stop and seek a more varied portfolio,
not to manufacture content.

Exit: the active wave records the decision, evidence level, next permitted
investment, and external questions reserved for real readers.

## Mechanical measures

Report these as descriptive artifacts, never as usability metrics:

- query packets executed and reconstructable;
- exact owners and senses selected;
- closure states by declared stop reason;
- manual concepts and their recurrence across frozen packets;
- proxy-owner and overloaded-owner findings;
- route hops and unresolved destinations;
- gap dispositions by QG code;
- content proposed, admitted, merged, deferred, and rejected;
- canonical, relation, assurance, site, and standalone identities;
- regressions in the unchanged no-gap controls.

Do not report simulated success rates, reader time, comprehension, confidence,
preference, usefulness, or return intent.

## Funded-goal completion contract

The first funded campaign is complete when:

1. all 24 packets were frozen before baseline execution;
2. every packet has a reconstructable `sim-41` result;
3. every gap has one primary QG owner and explicit disposition;
4. every proposed content change passed the ordered owner test and source
   boundary;
5. the smallest admitted batch, including a valid zero-change batch, was
   implemented and reviewed;
6. the exact packet set was rerun and compared without changing the baseline;
7. all repository, reference, relation, assurance, render, link, and relevant
   browser checks pass;
8. the Product Owner records continue/merge/defer/stop and the active wave
   records plan and result reviews;
9. no internal result is promoted into reader evidence or a preview claim.

## Suggested goal objective

Run the first Factorium query-led content discovery campaign defined in
`QUERY-LED-CONTENT-DISCOVERY-BLUEPRINT.md`: freeze and execute 24 varied query
packets against `sim-41`, classify and disposition every gap, research and
implement only the smallest admitted content or product batch, rerun the exact
portfolio, preserve baseline custody, pass role and repository validation, and
record the final portfolio decision without claiming reader evidence.

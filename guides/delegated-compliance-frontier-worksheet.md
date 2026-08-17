# Delegated Compliance Frontier Composition Worksheet

Guide ID: `delegated-compliance-frontier-worksheet`

Status: candidate simulation Factor Guide

Trace ID: `delegated-compliance-frontier`

Review: fixed point; see
[`truncated-frontier-design-2026-08-16.md`](../context/waves/2026-08-13-factorium-vision/truncated-frontier-design-2026-08-16.md)
and
[`truncated-frontier-roles-check-2026-08-16.md`](../context/waves/2026-08-13-factorium-vision/truncated-frontier-roles-check-2026-08-16.md).

## Local problem and decision

A synthetic manager delegates a limited approval decision to a reviewer. An
evidence packet is also offered as support for an applicable obligation. The
query may traverse only one typed relation.

Decision: which authority concepts can be resolved within that budget, and
which obligation concepts must remain visibly beyond the traversal frontier?

Intended reader: an assurance, governance, or operations practitioner scoping
a review before deciding whether more graph work is warranted.

## Scope and non-goals

The manager, reviewer, approval, evidence packet, and obligation are invented.
This worksheet does not establish legitimate delegation, obligation
applicability, evidence sufficiency, compliance, or approval validity.

It rehearses a genuine finite-budget `truncated` state. Truncation means the
declared work budget was reached while a known next target remains visible. It
does not mean the missing target was forgotten, unavailable, or judged
irrelevant.

## Local evidence

| Local item | Supplied | Missing or deliberately withheld |
|---|---|---|
| Delegation | a manager is said to grant limited approval authority | legitimate source, recipient identity, exact scope, limits, expiry, revocation, and retained duties |
| Decision right | a reviewer may make some approval decision | resource authority, conflicts, effective time, and governing instrument |
| Evidence packet | a packet is presented for review | stable identity, provenance, criteria, assessment method, coverage, time, and limitations |
| Obligation | described only as applicable | source, subject, required conduct, jurisdiction, version, precedence, exceptions, and effective time |
| Outcome | none supplied | delegation validity, obligation satisfaction, compliance result, and approval decision |

These facts define a query shape only. They do not warrant a governance or
compliance conclusion.

## Local Context Profile declaration

Profile ID: `synthetic-delegated-compliance-review`

Status: candidate, worksheet-local; not a repository-global default

| Context field | Declaration |
|---|---|
| Applicability predicate | this invented delegated-approval review only |
| Inherited default | none for authority legitimacy, obligation applicability, or evidence sufficiency |
| Supplied selection | jurisdiction = declared policy domain; reference frame = not applicable |
| Required selection | actors, authority source, grant scope and limits, obligation source/version, evidence identity, criteria, and review time |
| Allowed override | change the traversal budget or seed set only by producing a new trace identity |
| Prohibited override | do not infer compliance from the F2 authority branch or hide the untraversed F6 target |
| Invalidation | actor, policy domain, obligation version, delegation instrument, evidence packet, or traversal policy changes without rebinding |
| Custody | synthetic author-declared context; no observed decision or organization data |

## Seed and sense narrowing

The query has two independent seeds because the review begins with both a
delegation assertion and an evidence assertion.

| Candidate sense | Disposition | Reason |
|---|---|---|
| `delegation` | selected | the authority branch begins from a claimed transfer |
| `authority` | required target | F2 connects delegation source, scope, and limits to decision rights and resource authority |
| `evidence` | selected | the obligation branch begins from the supplied packet and assessment claim |
| `obligation` | known frontier | F6 would connect evidence criteria to obligation source and required conduct, but is not traversed |
| `compliance` | rejected as an inferred result | neither a packet nor a completed authority branch establishes compliance |
| responsibility | retained qualification | F2 explicitly preserves delegator oversight rather than transferring all responsibility |

The two seeds are combined for one review question; they are not merged into a
new universal concept.

## Declared composition

| Step | Reader operation | Exact typed action | Guardrail |
|---:|---|---|---|
| 1 | Add | admit delegation-source and evidence-monitoring seeds | keep their source identities distinct |
| 2 | Multiply | follow F2 `delegates-authority-to` forward to decision rights and its Mapping scope | retain delegated rights and delegator oversight qualifications |
| 3 | Evaluate | check organizational assignment completeness | a pass means the required trace records are present, not that delegation is valid |
| 4 | Stop | reach the declared one-edge budget before F6 | record the obligation target and stop reason as a frontier |
| 5 | Flatten | project the admitted nodes and visible frontier into this guide | report truncation, not compliance or approval |

Policy: direction `forward`; follow set `evaluative-required`; stop at stable
identity. Budgets: depth 1, edges 1, nodes 4, total work 13.

## Working graph

```text
[delegation source, scope, and limits]
  -- f2: delegates-authority-to -->
[decision rights and resource authority]
  -- evaluated in --> [Organizational Assignment Semantics]

[evidence, monitoring, and assessment criteria]
  .. edge budget reached before f6 ..>
[obligation sources and required conduct]  FRONTIER
```

| Artifact | Class | Depth | Origin | Predecessor |
|---|---|---:|---|---|
| evidence, monitoring, and assessment criteria | required seed | 0 | seed | none |
| decision rights and resource authority | required | 1 | F2 | delegation source, scope, and limits |
| delegation source, scope, and limits | required seed | 0 | seed | none |
| Organizational Assignment Semantics | evaluative | 1 | scope of F2 | delegation source, scope, and limits |

Traversed edge: F2 delegation **delegates authority to** decision rights,
qualified by `authority=delegated-decision-rights` and
`retained-responsibility=delegator-oversight`.

Visible frontier: the F6 target `obligation-sources-and-required-conduct`, with
reason `edge-budget-before-f6-evidence-obligation`. F6 would require
`applicability=selected-obligation-set` and
`obligation-version=effective-version`.

The frontier is author-declared in V0; the checker validates its visibility and
budget consistency but does not automatically discover or bind its reason text
to F6. The prose and exact manifest therefore retain that custody limitation.

Closure state: `truncated`. The edge budget is exactly reached, the frontier is
nonempty, and there is no conflict. Increasing the budget would create a new
trace identity rather than alter this historical result.

## Evaluation

Declared check: `delegation-authority-mapping`, kind `completeness`, target
[Organizational Assignment Semantics](../tables/mappings/organizational-assignment-semantics.md).

| Check | Supplied status | Guide consequence |
|---|---|---|
| Delegation source and recipient | roles described, identities and instrument absent | do not assert a legitimate grant |
| Scope, limits, expiry, revocation | described only as limited | decision-right record remains locally incomplete |
| Retained responsibility | F2 qualification is retained | delegation does not erase delegator oversight |
| Obligation applicability and version | beyond the current edge budget | do not evaluate evidence against an obligation |
| Evidence sufficiency | packet merely presented | do not infer satisfaction or compliance |

The structural check passes because the F2 branch, qualifiers, Mapping view,
budget stop, and frontier are explicitly represented. The substantive review
remains unresolved.

Summary: **truncated trace; obligation evaluation not reached**.

## Flattened Factor Guide projection

### Result

The bounded result is:

> The query resolved the declared delegation-to-authority branch within its
> one-edge budget. Obligation source and required conduct remain a visible
> frontier, so the evidence packet cannot yet be evaluated for satisfaction.

Do not issue a compliance result or approval recommendation from this trace.

### Factor and record assignment

| Canonical factor or view | Local role | Disposition | Declared loss |
|---|---|---|---|
| evidence, monitoring, and assessment criteria | second seed | selected | awaits the obligation frontier; packet details omitted |
| delegation source, scope, and limits | first seed | selected | exact instrument and limits omitted |
| decision rights and resource authority | joined target | selected | validity and resource details unresolved |
| Organizational Assignment Semantics | Evaluation | selected | full mapping detail omitted |
| obligation sources and required conduct | frontier | not projected as reached | no applicability or satisfaction evaluation performed |

### Required next records

- Name the delegation instrument, delegator, recipient, scope, limits, time,
  revocation, and retained duties.
- Name the obligation source, obligated subject, conduct, applicability,
  jurisdiction, effective version, and precedence.
- Bind evidence identity, method, criteria, coverage, assessor, time,
  uncertainty, exceptions, and limitations.
- If more traversal is authorized, rerun with a larger budget and preserve both
  trace identities.

## Change tests

| Scenario | Expected change | Must remain stable |
|---|---|---|
| Edge budget increases to two | F6 may be admitted in a new trace | this one-edge trace remains recoverable and truncated |
| Obligation seed is removed | frontier and work count change | authority completion still does not imply compliance |
| Delegation scope changes | F2 records and trace identity change | responsibility and authority remain distinct |
| Evidence packet changes | evidence identity and later F6 evaluation must be rebound | no packet proves its own sufficiency |
| Obligation version changes | applicability and evidence evaluation must be rerun | old evidence remains historically attributable |
| A reader hides the frontier | projection becomes invalid against the trace | untraversed work does not become complete |

## Rejected shortcuts and unresolved choices

Rejected: delegated-means-unlimited-authority, permission-means-legitimate-
authority, evidence-means-satisfaction, compliance-follows-from-approval,
frontier-means-irrelevant, truncated-means-incomplete, and budget-increase-
mutates-history.

Unresolved: identities, governing instruments, delegation validity, exact
rights and limits, obligation source and version, applicability, evidence
criteria and sufficiency, assessor, exceptions, compliance, and approval.

## Exact trace manifest

Canonical trace file:
`fixtures/composition/delegated-compliance-frontier.factorium-query`

| Identity | SHA-256 |
|---|---|
| Factorium Reference V0 | `7f0ae1879dfba6148fdc3b31d0fc30a9a5140c406bb8341e62bf19db07bf1218` |
| Typed Relations V0 | `df69b50054258c34a3289ce8cae66ea41d68efd5b8dcdd8e66128f2111f52634` |
| Composition Query trace | `3006b831acbfc74f5f1837866e7f617fe6a7df5a0e0684e45380c6f3346c7fd6` |

Trace manifest: two seeds, four nodes, one F2 edge, one declared F6 target
frontier, zero conflicts, one passed completeness check, four projection rows,
and state `truncated`. Work is 13: 2 seeds + 4 nodes + 1 edge + 1 frontier +
0 conflicts + 1 check + 4 projections.

## Canonical sources and custody

1. [Organization, Role, Responsibility, Authority, and Accountability](../tables/entries/organization-role-authority.md)
2. [Organizational Assignment Semantics](../tables/mappings/organizational-assignment-semantics.md)
3. [Governance, Obligation, and Compliance](../tables/entries/governance-obligation-compliance.md)
4. [Governance and Compliance Mechanisms](../tables/mappings/governance-compliance-mechanisms.md)
5. [Composition Query Trace V0](../specs/COMPOSITION-QUERY.md)
6. [Factor Guide Format V0](../specs/FACTOR-GUIDE.md)

Canonical factors, F2/F6 relation records, and source digests come from the
reference corpus and relation sidecar. The scenario, context, seed combination,
budget choice, frontier declaration, and projection are synthetic author work.
No real organization, delegation, obligation, evidence packet, review outcome,
external-reader observation, or compliance claim is represented.

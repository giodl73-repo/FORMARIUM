# Query-Led Limiting-Condition Owner Test

Status: bounded source review for one candidate existing-view repair

Date: 2026-08-17

## Research question

How should Factorium help a reader distinguish the condition that limits a
selected flow, completion result, feasible option, or justified claim without
turning `bottleneck` into a universal factor, new anchor, or inferred relation?

## Trigger

QLD-01 packets 09, 12, 20, 22, and 24 independently required a manual owner
test among capacity, queue/service order, dependency, critical path, binding
constraint, and evidence limitation. The existing
`tables/diagnostics/dependency-critical-path.md` already owns bottleneck,
blocker, and critical-path diagnosis. Literal `bottleneck` search already
ranks that view first. The source question is therefore whether a bounded
contrast can safely deepen that view.

## Source findings

### Schedule path

The U.S. Government Accountability Office's *Schedule Assessment Guide*
separates the driving or longest path from labels produced by low-float
thresholds and date constraints. It requires a valid schedule model with
complete activities, correct dependency logic, lags, calendars, resource
assumptions, status, and version. The path is relative to a selected milestone
or finish result; hard date constraints can create apparent critical sequences
that do not drive that result.

Source: GAO-16-89G, especially Best Practices 6 and 7:
https://www.gao.gov/products/gao-16-89g

### Capacity bottleneck

IETF RFC 5136 defines link and path capacity for an exact layer, source,
destination, time, and interval. It distinguishes the smallest-capacity
`narrow` link from the smallest-available-capacity `tight` link and notes that
the smallest-capacity link need not be the active bottleneck when it is lightly
loaded relative to the rest of the path. This supports treating bottleneck as
condition-, path-, and load-relative rather than a permanent identity.

Source: IETF RFC 5136, *Defining Network Capacity*:
https://www.rfc-editor.org/info/rfc5136/

A NIST-hosted 2019 supply-chain ontology paper provides a bounded
manufacturing example in which factory capacity depends directly on a
bottleneck resource and indirectly on other capability conditions. Its draft
domain ontology is useful as an example, not a universal definition.

Source: Ameri and Kulvatunyou, *Modeling a Supply Chain Reference Ontology
Based on a Top-Level Ontology*:
https://tsapps.nist.gov/publication/get_pdf.cfm?pub_id=928051

### Evidence limitation and provenance

W3C PROV-O distinguishes entities, activities, agents, usage, generation,
derivation, influence, plans, revisions, and qualified relations. A provenance
chain can show how evidence or a result was produced and transformed, but it
does not itself establish that the evidence is sufficient for a claim. The
existing Claim and Evidence owner separately retains observation, result,
inference, implication, limitation, confidence, and provenance.

Source: W3C Recommendation, *PROV-O: The PROV Ontology*:
https://www.w3.org/TR/prov-o/

### Existing Factorium owners

- Operational Resource owns resource, capacity, demand, load, utilization,
  allocation, and shortage.
- Queue/Service Order owns admission, backlog, priority, scheduling, waiting,
  service, abandonment, and reconciliation.
- System Composition owns directional dependency; Coordinated Work and
  Temporal Organization own activities, precedence, timing, and schedules.
- Scenario/Feasibility and Policy/Constraint own eligibility, admissibility,
  feasibility, sufficiency, validity, requirement, prohibition, and authority.
- Claim/Evidence owns observation, inference, limitation, confidence, and
  provenance.

These owners should remain separate. The diagnostic may route among them but
must not create a super-sense that collapses them.

## Candidate owner test

| Limiting role | Discriminating question | Required record | Existing owner | Not equivalent to |
|---|---|---|---|---|
| capacity bottleneck | Where does demand or load exceed effective compatible capacity for this flow/result under these conditions? | boundary/path, resource, capacity, demand/load, interval, conditions, utilization/shortage, result sensitivity | Operational Resource | smallest nominal capacity in every state |
| service-order delay | Is waiting determined by admission, priority, scheduling, setup, service, retry, abandonment, or starvation? | queue population, arrivals, backlog, order rule, service record, delay distribution | Queue/Service Order | capacity shortage alone |
| dependency blocker | Which directed prerequisite is unsatisfied and prevents the declared transition or result? | source, target, direction, condition, state, consequence, alternate path | System Composition plus existing Diagnostic | any slow activity or undesirable condition |
| critical/driving path | Which exact path controls the selected completion measure in the current schedule model? | graph, activities, dependencies, lags, calendars, durations, resources, float/driving analysis, version | Diagnostic, Coordinated Work, Temporal Organization | permanent critical activity or generic bottleneck |
| binding constraint | Which applicable requirement, rule, invariant, or safety boundary makes a case invalid or option infeasible? | subject/case, authority, version, effective time, hard/soft status, applicability, result | Policy/Constraint and Scenario/Feasibility | flow-capacity relation or schedule path |
| evidence limitation | Which missing, weak, inapplicable, or contradictory support prevents a stated inference or claim? | exact claim, evidence, method, implication, scope, limitation, provenance, next test | Claim and Evidence | operational blocker or proof of falsity |

## Editorial synthesis

The shared structure is a selected result plus a condition whose change may
alter that result. That is not enough for a new canonical sense or relation.
The decisive distinctions are the type of result, the mechanism or rule by
which it is limited, and the record that would discriminate the candidate
owner.

The existing diagnostic can carry this as a compact **Limit owner test**:

1. name the selected flow, transition, completion measure, feasible option, or
   claim;
2. identify whether the observed limit concerns effective capacity,
   service-order policy, directed prerequisite, schedule path, applicable
   validity/feasibility rule, or support for an inference;
3. test a change under the same declared conditions;
4. route the record to its existing owner;
5. retain alternate limits, ties, sensitivity, and unresolved evidence.

## Proposed reference repair

Change only `tables/diagnostics/dependency-critical-path.md`:

- add the six-row owner-test table above in compact form;
- add explicit constraints that bottleneck is result- and condition-relative,
  and that an evidence limitation limits a claim rather than operational flow;
- add authored Cross-references to Queue/Service Order, Policy Constraints,
  Feasibility/Sufficiency, Claim/Evidence, and Factor Status/Completeness;
- add RFC 5136, W3C PROV-O, and the existing owner paths to sources while
  retaining GAO as the critical-path authority.

Preserve title, status, family, canonical owner, canonical senses, existing
diagnostic rows, reference identity, relation sidecar, and search mechanics.
Do not add a typed edge, optimization procedure, bottleneck catalog, or
universal completeness claim.

## Evidence boundary

The sources support bounded domain distinctions and the need to retain exact
path, load, rule, evidence, and version context. The six-role cross-domain
owner test is a candidate Factorium editorial synthesis. It is not a standard
ontology, algorithm, field-valid diagnosis, or reader-validated result.

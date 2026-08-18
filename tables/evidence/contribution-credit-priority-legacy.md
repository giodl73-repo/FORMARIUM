# Contribution, Credit, Priority, and Legacy Evidence

Status: candidate Evidence Table

Primary family: Evidence Table

Canonical headword: [Claim and Evidence](../entries/claim-evidence.md)

Canonical senses: `claim`, `evidence-item`, `result`, `limitation`,
`confidence`, `provenance`, `observation`, `measurement`, `inference`

This view adds no canonical sense. Claim and Evidence remains its sole owner.

## Governing question

What exactly did a named subject contribute; what evidence supports a priority,
credit, recognition, or legacy claim; how does that differ from causal
attribution and responsibility; and what remains disputed or unresolved?

## Evidence row contract

| Field | Required record |
|---|---|
| Claim | exact contribution, priority, credit, recognition, causal, reputation, or legacy proposition; claimant; version; purpose; and scope |
| Subject identity | person, group, office, organization, or other subject; identity rule; name/version history; and role at the relevant time |
| Claimed object or outcome | work, evidence, idea, decision, artifact, practice, event, or outcome to which the claim refers |
| Activity and contribution | exact activity, produced or changed object, contribution role under a declared vocabulary, time, place/context, and dependency |
| Prior and parallel work | predecessors, collaborators, independent work, inherited resources, institutions, structural conditions, and known alternatives |
| Evidence chain | source entity, observation or record, producing activity, agent/custodian, access and use, interpretation, derivation, and provenance |
| Disclosure and priority | conceived, recorded, communicated, deposited, published, implemented, or independently corroborated time; comparison set; priority rule; and uncertainty |
| Credit rule and authority | rule or convention used, eligible subjects, assigning body or community, evidence threshold, exclusions, dispute path, and version |
| Causal boundary | separate influence, mechanism, effect, or actual-case attribution claim; alternatives; counterfactual or process evidence; and explicit responsibility separation |
| Counterclaims and omissions | contradictory evidence, omitted contributors, rival interpretation, source perspective, unavailable records, and no-bearing evidence |
| Reception and legacy | evaluator or community, subject, criterion, comparison, time horizon, later use or outcome, reputation evidence, and prohibited inference |
| Disposition | supports, contradicts, qualifies, disputed, unresolved, untested, or no bearing, with rationale and confidence criteria |
| Review and revision | reviewer, date, correction, supersession, changed evidence or rule, affected claims, and retained prior disposition |

## Decisive contrasts

| Pair | Shared surface | Decisive distinction |
|---|---|---|
| participation vs. contribution | involvement in the same undertaking | presence or membership vs. a specified activity linked to a changed or produced object |
| contribution vs. contribution role | both describe work | source-supported activity vs. classification under a declared vocabulary |
| contribution vs. credit | both may name a subject | evidenced activity vs. recognition assigned under a rule and authority |
| authorship or office vs. contribution | both may confer a label | governed status vs. the activity actually evidenced |
| priority vs. importance | both may affect recognition | first under a declared event and comparison rule vs. assessed significance under criteria |
| credit vs. causal attribution | both connect a subject to an outcome | recognition under a social/institutional rule vs. a causal claim requiring its own model and evidence |
| recognition vs. responsibility | both may be assigned | acknowledgment or award vs. answerability, obligation, blame, or liability under a separate rule |
| outcome vs. legacy | both concern later states | realized result under a boundary vs. later evaluation, use, reputation, or attributed significance |
| provenance vs. truth | both bear on evaluation | reconstructable source/activity custody vs. correctness of the claim |
| revised credit vs. erased history | both change the current account | new disposition retaining earlier records vs. overwriting prior claims and evidence |

## Review procedure

1. Freeze the exact proposition and classify it as contribution, priority,
   credit, recognition, causal attribution, reputation, or legacy.
2. Resolve subject, role, object/outcome, time, comparison set, and claim use.
3. Trace source entities, activities, agents, access, use, interpretation,
   derivation, and custody without inferring truth from provenance.
4. Record the activity and produced or changed object before assigning any
   contribution-role label.
5. Add prior, parallel, collective, institutional, and structural work; retain
   absent and inaccessible records.
6. For priority, state exactly which event is claimed first and under which
   population, communication, publication, or corroboration rule.
7. For credit, state the assigning rule, authority/community, exclusions,
   threshold, and dispute path. Do not infer deservingness from a role label.
8. Route influence, mechanism, effect, and actual-case attribution to the
   Causal Claim Evidence Table; route responsibility and accountability to
   their existing owners.
9. Record counterclaims, omissions, contradictory/no-bearing evidence, and
   changes in interpretation.
10. For legacy, state evaluator, criterion, comparison, horizon, later use or
    outcome, and why the evidence bears on that exact claim.
11. Issue a bounded disposition. Preserve `disputed` or `unresolved` when the
    evidence or governing rule does not settle the claim.
12. On revision, retain the prior claim, evidence, rule, and disposition.

## Worked skeleton

```text
claim: subject S deserves sole credit for outcome O
classification: credit claim plus an implied causal-attribution claim
subject/role: S acting in role R during interval T
claimed object/outcome: O, exact identity and boundary
activity/contribution: recorded activity A produced or changed object E
prior/parallel work: P1, P2, collaborators C, institution I, conditions K
priority rule: first public disclosure within comparison set D
credit rule/authority: rule G applied by body B, version V
causal boundary: effect or actual-case attribution remains separately unresolved
counterclaims: contributor C2 omitted; source X contradicts timing
legacy: not evaluated; later reputation is not the outcome
disposition: qualified and disputed
```

The skeleton does not establish sole credit, deservingness, causal effect,
responsibility, or historical truth.

## Failure signs

- a biography, title, office, author line, award, or familiar story substitutes
  for activity-level evidence;
- a named contribution taxonomy is treated as complete or as an authorship or
  credit decision;
- “first” omits the event, comparison set, date uncertainty, or priority rule;
- credit is inferred from causal influence, or causation from credit;
- collaborators, prior work, institutional support, structural conditions, or
  inaccessible records disappear;
- source custody is treated as neutral perspective or truth;
- reputation, outcome, importance, and legacy collapse into one score;
- a revised account overwrites the prior claim or dispute;
- the Table allocates credit, ranks people, or endorses a historical conclusion.

## Reading views

| Profile | Default projection |
|---|---|
| Compact | exact claim, subject, claimed object/outcome, classification, disposition, unresolved flag |
| Abbreviated | Compact plus activity/contribution, priority or credit rule, strongest counterclaim, and causal boundary |
| Book | Abbreviated plus prior/parallel work, evidence chain, reception/legacy frame, and one worked skeleton |
| Full | all source identities, activities, agents, dates, rules, alternatives, omissions, revisions, and superseded dispositions |

No profile may hide a material omitted contributor, contradictory source,
unresolved causal implication, or the rule behind priority or credit.

## Cross-references

- [Causal Claim Evidence Table](causal-claim-evidence.md)
- [History, Revision, Provenance, Lineage, and Change Evidence](change-lineage.md)
- [Epistemic Standing, Inquiry, and Warrant](epistemic-standing-inquiry-warrant.md)
- [Organization, Position, Role, Competency, Responsibility, Authority, and Accountability](../entries/organization-role-authority.md)
- [State, Event, Transition, Process, and Lifecycle](../entries/state-event-transition-process-lifecycle.md)

## Sources and provenance

1. NISO, CRediT Contributor Role Taxonomy: https://credit.niso.org/
2. NISO, CRediT role descriptions:
   https://credit.niso.org/contributor-roles-defined/
3. W3C, PROV Model Primer: https://www.w3.org/TR/prov-primer/
4. W3C, PROV-O: https://www.w3.org/TR/prov-o/
5. Library of Congress, Getting Started with Primary Sources:
   https://www.loc.gov/programs/teachers/getting-started-with-primary-sources
6. [BTC-01 source review](../../signals/discover/websearch/btc-01-contribution-credit-view-research-2026-08-18.md)

This view organizes evidence. It does not determine authorship, allocate
credit, rank subjects, establish priority, estimate causal effects, assign
responsibility, settle history, or measure reader value.

# Organizational Assignment Semantics

Status: candidate Mapping Table

Primary family: Mapping Table

Canonical headword:
[Organization, Role, Responsibility, Authority, and Accountability](../entries/organization-role-authority.md)

Canonical senses: `organization`, `organizational-role`, `responsibility`,
`authority`, `accountability-answerability`, `action-accountability`,
`delegation`, `ownership-stewardship`

## Mapping identity

| Field | Value |
|---|---|
| Source system | Factorium organizational assignment concepts |
| Target system | common organizational records and mechanisms |
| Direction | canonical concept to candidate representation |
| Mapping kind | contextual and partial assignment |
| Cardinality | many-to-many |
| Authority | candidate Factorium synthesis from cited public guidance |
| Factorium maturity | `candidate` |

No target record proves the source concept by itself. A title, matrix cell,
permission, audit event, or owner field must retain source, scope, time, and
governing semantics.

## Assignment mappings

| Source concept | Candidate records or mechanisms | Required condition | Not equivalent to |
|---|---|---|---|
| organization | charter, legal entity record, unit/service boundary, membership relation, operating model | purpose, boundary, membership, resources, processes, and interfaces are visible | org chart alone |
| organizational role | role profile, work-role catalog, committee office, service function | expected functions and context are independent of current assignee | person, title, job, or permission set |
| responsibility | responsibility assignment, objective, duty statement, service obligation, control ownership | subject, expected result, conditions, resources, and period are stated | authority or task activity alone |
| authority | decision-right register, approval limit, mandate, authorization policy, budget/resource control | legitimate source, permitted action/decision, scope, limits, and revocation are stated | influence, expertise, or responsibility |
| accountability-answerability | accountable-owner record, review cadence, escalation path, performance agreement, risk acceptance | actor, subject, review forum, evidence, consequence, and period are stated | audit logging |
| action-accountability | authenticated identity, signed approval, immutable audit event, attributable change record | attribution strength, event scope, time, and integrity are sufficient | organizational answerability |
| delegation | delegation instrument, temporary acting assignment, power-of-attorney record, scoped approval transfer | delegator, recipient, transferred scope, retained duties, expiry, and revocation are stated | informal handoff |
| ownership-stewardship | system owner, information owner, product owner, custodian/steward register | governing scheme, subject, lifecycle rights, duties, authority, and operator relation are stated | legal title, possession, or doing all work |

## Cardinality and preservation

| Property | Treatment |
|---|---|
| One actor, many roles | allowed with conflict and capacity review |
| One role, many actors | allowed with partition, concurrency, and escalation rules |
| One responsibility, many contributors | allowed when accountable review and result integration remain explicit |
| One authority, several delegates | allowed only under the grant's delegation and conflict rules |
| Responsibility-to-authority equality | not assumed |
| Accountability-to-responsibility equality | not assumed |
| Ownership-to-operation equality | not assumed |
| Reverse inference from title or permission | invalid without retained source semantics |

## Change tests

| Change | Required review |
|---|---|
| Assignee changes | identity, competence/eligibility, conflicts, access, and effective time |
| Role definition changes | all responsibility, authority, and training mappings |
| Authority limit changes | dependent decisions, delegations, controls, and audit rules |
| Owner changes | lifecycle custody, open risks, obligations, and transition evidence |
| Organization boundary changes | membership, interfaces, escalation, policy applicability, and accountability forums |
| Emergency mode begins | temporary authority, separation exceptions, expiry, and after-action review |

## Failure signs

- a role matrix has cells but no assignment semantics;
- a job title is treated as proof of authority;
- a system permission is treated as organizational legitimacy;
- responsibility is assigned without resources or decision rights;
- one actor approves, executes, and reviews a sensitive action without a
  justified control;
- audit identity is treated as complete answerability;
- delegated authority has no expiry or revocation;
- ownership fields omit the governed subject or lifecycle scope.

## Sources and provenance

1. [Organization and authority research](../../docs/research/2026-08-14-organization-role-authority.md)
2. NIST SP 800-181 Rev. 1:
   https://csrc.nist.gov/pubs/sp/800/181/r1/final
3. NIST CSRC Glossary, "authorization":
   https://csrc.nist.gov/glossary/term/authorization
4. NIST CSRC Glossary, "accountability":
   https://csrc.nist.gov/glossary/term/accountability
5. NIST CSRC Glossary, "information owner":
   https://csrc.nist.gov/glossary/term/information_owner
6. OPM, "Oversight and Effectiveness":
   https://www.opm.gov/policy-data-oversight/oversight-and-effectiveness/

Target records remain domain-specific mechanisms. Factorium's source
distinctions and mapping are `candidate`.

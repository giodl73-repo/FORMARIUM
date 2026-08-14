# Organization, Role, and Authority Research

Status: complete

Decision supported: define Factor Forge F2 so organization, role,
responsibility, authority, accountability, delegation, and ownership remain
separate and can be mapped to organizational records without adopting one
management framework as universal.

## Findings

### FACTORIUM-ORG-01 - The root grammar already separates organization inputs

Source: `tables/foundations/ROOT-TABLE.md`, "Reusable root factorizations."

Observed constraint: the Organization grammar combines purpose, agents,
roles, authority, resources, processes, and interfaces. It does not make one
factor the definition of all others.

Implication: F2 should refine the existing grammar and preserve organization
as a coordinated whole rather than a synonym for hierarchy or employer.

Confidence: high.

### FACTORIUM-ORG-02 - Organizational mechanisms are contextual assignments

Source: `tables/mappings/factor-role-mechanisms.md`, "Organizational
assignment."

Observed constraint: positions, units, charters, delegations, relationships,
policies, controls, and reports can carry different Factorium roles. Job
titles and org-chart boxes are explicitly insufficient.

Implication: F2 needs canonical concepts first and a separate Mapping view for
candidate records and mechanisms.

Confidence: high.

### FACTORIUM-ORG-03 - Policy authority and enforcement already require owners

Source: `tables/entries/policy-rule-constraint-decision-exception.md`,
"Selection procedure" and "Constraints and failure signs."

Observed constraint: policy evaluation requires authority, owner, version,
enforcement, exception approver, audit, and review.

Implication: the new cluster should provide those ownership and answerability
concepts without moving policy logic into organizational titles.

Confidence: high.

### FACTORIUM-ORG-04 - Work role is not the same as job, person, or organization

Sources:

1. NIST, NICE Framework Resource Center:
   https://www.nist.gov/itl/applied-cybersecurity/nice/nice-framework-resource-center
2. NIST, NICE Framework current versions:
   https://www.nist.gov/itl/applied-cybersecurity/nice/nice-framework-resource-center/nice-framework-current-versions
3. NIST SP 800-181 Rev. 1:
   https://csrc.nist.gov/pubs/sp/800/181/r1/final

Observed constraint: NICE maintains Work Roles separately from tasks,
knowledge, skills, competency areas, jobs, and workforce uses.

Implication: define role as a context-specific bundle of expected functions.
Record assignment to actors separately and do not treat a role label as proof
of competence, authority, or accountability.

Confidence: high.

### FACTORIUM-ORG-05 - Authority must identify its granting basis and scope

Sources:

1. NIST CSRC Glossary, "authorization":
   https://csrc.nist.gov/glossary/term/authorization
2. NIST CSRC Glossary, "privilege":
   https://csrc.nist.gov/glossary/term/privilege
3. NIST CSRC Glossary, "authorizing official":
   https://csrc.nist.gov/glossary/term/authorizing_official

Observed constraint: NIST definitions connect authorization and privilege to
rights or permissions granted by an authority, and authorizing officials to a
bounded formal decision and accepted risk.

Implication: authority requires source, subject, permitted decision/action,
scope, constraints, and effective period. Responsibility alone does not grant
authority.

Confidence: high.

### FACTORIUM-ORG-06 - Accountability has at least two material senses

Sources:

1. NIST CSRC Glossary, "accountability":
   https://csrc.nist.gov/glossary/term/accountability
2. OPM, "Oversight and Effectiveness":
   https://www.opm.gov/policy-data-oversight/oversight-and-effectiveness/

Observed constraint: NIST uses accountability for unique traceability of
actions and, in some contexts, answerability to authority. OPM uses HRM
accountability for shared responsibility, measured outcomes, documentation,
problem correction, and mission support.

Implication: Factorium must separate organizational answerability from
technical action traceability. Both may support governance, but one cannot
substitute for the other.

Confidence: high.

### FACTORIUM-ORG-07 - Delegation does not erase the delegator's governance

Source: GAO Green Book 2025, Principle 3, "Establish Structure,
Responsibility, and Authority":
https://guides.gaoinnovations.gov/greenbook/2025/principle-3-establish-structure-responsibility-and-authority/

Observed constraint: public-sector internal-control guidance links assigned
responsibility, delegated authority, oversight, and achievement of objectives.

Implication: delegation needs source, recipient, delegated powers, retained
duties, limits, controls, expiry, and revocation. A handoff of work is not
automatically a delegation of authority.

Confidence: medium-high.

### FACTORIUM-ORG-08 - Ownership is a governed stewardship assignment

Source: NIST CSRC Glossary, "information owner":
https://csrc.nist.gov/glossary/term/information_owner

Observed constraint: NIST ties information ownership to statutory or
operational authority and responsibility for lifecycle controls, while
distinguishing owner from steward.

Implication: Factorium should use `ownership-stewardship` for a scoped
governance assignment, not silently imply legal title, physical possession,
exclusive control, or performance of every task.

Confidence: high for the cited information-governance domain; medium for
cross-domain generalization.

### FACTORIUM-ORG-09 - Controls require limits on combined authority

Sources:

1. NIST CSRC Glossary, "least privilege":
   https://csrc.nist.gov/glossary/term/least_privilege
2. NIST CSRC Glossary, "separation of duty":
   https://csrc.nist.gov/glossary/term/separation_of_duty

Observed constraint: least privilege limits authorization to assigned
functions, while separation of duty prevents one actor from holding enough
combined privilege to misuse a process alone.

Implication: organizational assignments need constraints, conflict rules,
review, escalation, and revocation; clarity alone does not make an assignment
safe.

Confidence: high within access-control and internal-control applications.

## Recommendations

### Adopt now

- Add one canonical cluster with separate organization, role, responsibility,
  authority, two accountability senses, delegation, and stewardship
  ownership.
- Add a contextual Mapping Table from concepts to common organizational
  assignment records.
- Require source, scope, actor, subject, effective time, evidence, and review
  for every assignment.
- Make responsibility-without-authority and authority-without-accountability
  visible failure signs.

Owner: Factorium.

Validation: reference round trip, generated projections, role review, and
repository-wide link checks.

### Prototype behind a compatibility boundary

- Keep assignment cardinality, delegation chains, conflict sets, and
  revocation bodies in Markdown under V0.
- Consider typed assignment edges only after multiple organizational and
  policy clusters need machine validation.

Owner: a future Factorium interchange successor.

Validation: preserve published entry and sense IDs through migration.

### Reject or defer

- Reject universalizing RACI, one org-chart notation, or one security model.
- Reject equating role with person, job title, position, or permission set.
- Reject treating action traceability as complete organizational
  accountability.
- Defer legal property ownership, corporate governance doctrine, and detailed
  workforce competency taxonomies.

Non-goal: prescribe an operating model or organization design.

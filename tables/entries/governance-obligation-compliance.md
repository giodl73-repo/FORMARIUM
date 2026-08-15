# Governance, Obligation, and Compliance

Status: candidate anchor entry

## Orientation

Governance is the system by which a bounded organization or undertaking is
directed, overseen, and held accountable toward purpose. An obligation is a
required act, restraint, condition, or result binding a subject from a stated
source. Compliance is an evaluated relationship between applicable
obligations and observed or evidenced conduct. Governance establishes
direction and oversight; obligations state what is required; compliance
assessment tests conformity. None alone proves effectiveness, ethics, good
outcomes, or legitimacy outside its authority and scope.

## Sense table

| Sense | Governing question | Role |
|---|---|---|
| `governance` | How is this organization or undertaking directed, overseen, and held accountable toward purpose? | direction and oversight system |
| `obligation` | Which subject must do, avoid, maintain, or achieve what, from which source, under which conditions? | binding requirement |
| `compliance` | To what extent does evidenced conduct or state satisfy the applicable obligations under the selected assessment basis? | conformity assessment |

## Root factorization

```text
governance-obligation-compliance-use
  := governed subject, purpose, and boundary
   x stakeholders and operating context
   x governing body, authority, and accountability
   x obligation sources and required conduct
   x applicability, jurisdiction, scope, and effective time
   x policies, rules, controls, and enforcement
   x assigned responsibilities and resources
   x evidence, monitoring, and assessment criteria
   x noncompliance, escalation, remediation, and consequences
   x review, learning, revision, and supersession
```

## Contrast table

| Pair | Shared feature | Decisive distinction |
|---|---|---|
| Governance vs. management | both influence organizational activity | direction, oversight, and accountability vs. execution and coordination within that direction |
| Governance vs. policy | policy expresses governing intent | whole direction/oversight system vs. one governing instrument |
| Obligation vs. responsibility | both assign expected action | binding requirement from a source vs. organizational duty or expected result |
| Obligation vs. rule | rules can operationalize obligations | normative requirement vs. condition-output logic |
| Obligation vs. control | controls can support obligations | what must hold vs. mechanism intended to influence risk or behavior |
| Compliance vs. enforcement | enforcement may produce compliance | assessed conformity vs. mechanism making a decision effective |
| Compliance vs. effectiveness | effective controls may support compliance | meeting specified obligations vs. achieving intended outcomes |
| Compliance vs. ethics | obligations may encode ethical commitments | assessed adherence to selected requirements vs. broader moral evaluation |

## Diagnostic examples

- A board-approved risk strategy is a governance instrument, not the whole
  governance system.
- A statute, contract term, internal policy, and delegated duty can all create
  obligations under different authorities and scopes.
- An XACML obligation is a narrow operation accompanying an authorization
  decision; it does not define every legal or organizational obligation.
- Passing a control checklist can support compliance evidence without proving
  that the control reduces the intended risk.
- A compliant action can still produce a poor outcome when the governing
  obligation is incomplete, outdated, or mis-scoped.
- Noncompliance can result from an inapplicable requirement being selected, an
  unperformed duty, failed enforcement, missing evidence, or a true violation.

## Specialized view

The linked
[Governance and Compliance Mechanisms](../mappings/governance-compliance-mechanisms.md)
maps the canonical concepts to charters, policies, obligation registers,
controls, enforcement points, assessments, and attestations without making
those records equivalent to governance or compliance.

## Selection procedure

1. Name the governed subject, purpose, boundary, stakeholders, and operating
   context.
2. Identify the governing body, legitimate authority, decision rights,
   oversight forums, and accountability relationships.
3. Inventory obligation sources separately: law, regulation, contract,
   standard, policy, role, or voluntary commitment.
4. State each obligated subject, required conduct or state, scope,
   jurisdiction, conditions, effective period, and precedence.
5. Map policies, rules, controls, and enforcement mechanisms without treating
   them as the obligation itself.
6. Assign responsibilities, authority, resources, escalation, and evidence
   custody.
7. Define compliance criteria, sampling, evidence, assessment time, assessor,
   uncertainty, and exceptions.
8. Record noncompliance, remediation, consequences, review, and supersession.
9. Evaluate effectiveness, ethics, and outcomes separately from compliance.

## Reference Delta

| Reference form | Typical contribution | Factorium delta |
|---|---|---|
| Dictionary | Defines governance, obligation, compliance, oversight, and enforcement | Places direction, binding requirement, and assessed conformity under separate questions |
| Governance standard | Defines principles, governing bodies, accountability, and oversight | Connects governance to obligation sources, evidence, and review without replacing the standard |
| Compliance-management standard | Defines a management system for compliance obligations | Separates obligation identity, applicability, assessment, enforcement, and effectiveness |
| Policy or access-control language | Represents rules, decisions, obligations, and enforcement points | Keeps technical mechanisms scoped and non-equivalent to organizational governance |
| Factorium | Links organization, policy, evidence, control, and compliance concepts | Provides one selection path while preserving source authority and candidate maturity |

## Constraints and failure signs

- Governance states subject, purpose, boundary, authority, stakeholders,
  oversight, and accountability.
- Obligations retain source, obligated subject, required conduct, scope,
  conditions, jurisdiction, effective time, and precedence.
- Policies, rules, controls, and enforcement points are not treated as the
  obligation itself.
- Compliance criteria and evidence are tied to the applicable obligation
  version.
- Missing evidence is not silently treated as either compliance or
  noncompliance.
- Exceptions and waivers retain authority, scope, controls, expiry, and
  review.
- Compliance does not prove effectiveness, safety, ethics, legitimacy, or
  desirable outcomes.
- Assessment results retain sampling limits, uncertainty, assessor, and date.
- Remediation changes future state without rewriting historical findings.

## Cross-references

- [Organization, Role, Responsibility, Authority, and Accountability](organization-role-authority.md)
- [Policy, Rule, Constraint, Decision, and Exception](policy-rule-constraint-decision-exception.md)
- [Objective, Control, Monitoring, and Response](control-monitoring-response.md)
- [Claim and Evidence](claim-evidence.md)
- [Identity, Naming, Classification, and Versioning](identity-naming-classification-versioning.md)
- [Factorium Entry Publication](factorium-entry-publication.md)
- [Organizational Assignment Semantics](../mappings/organizational-assignment-semantics.md)

## Sources and provenance

1. ISO 37000:2021, *Governance of organizations - Guidance*:
   https://www.iso.org/standard/65036.html
2. ISO 37301:2021, *Compliance management systems*:
   https://www.iso.org/standard/75080.html
3. NIST, *Cybersecurity Framework 2.0*:
   https://www.nist.gov/publications/nist-cybersecurity-framework-csf-20
4. RFC 3198, *Terminology for Policy-Based Management*:
   https://www.rfc-editor.org/rfc/rfc3198
5. OASIS, *XACML Version 3.0 Core Specification*:
   https://docs.oasis-open.org/xacml/3.0/xacml-3.0-core-spec-os-en.html

Comparator access date: 2026-08-14. Standards own their exact governance,
compliance-management, cybersecurity, policy, and authorization scopes.
Factorium's cross-domain synthesis remains `candidate`.

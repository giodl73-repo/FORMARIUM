# Governed Organization Context Profile

Profile ID: `governed-organization-v0`

Status: candidate

Summary: Shared governance-record conventions for a bounded organization while authority source, jurisdiction, applicable obligations, effective time, and review forum remain required local choices.

Defaults: `organization-view = explicitly bounded`; `time-status = effective-dated`; `evidence-status = provenance required`

Requires: `organization boundary`; `authority source`; `jurisdiction`; `applicable obligation set`; `effective time`; `accountable actor and review forum`

## Applicability

Use this profile for explicitly bound organizational governance, authority,
obligation, compliance, and assignment records. It supplies record discipline,
not a universal governance system or legal interpretation.

## Fixed defaults and conventions

| Field | Inherited value | Kind | Authority boundary |
|---|---|---|---|
| Organization view | explicitly bounded | convention | the actual boundary remains required |
| Time status | effective-dated | convention | the relevant effective time remains required |
| Evidence status | provenance required | convention | evidence existence does not establish sufficiency or effectiveness |
| Assignment semantics | actor, role, duty, right, and answerability remain distinct | fixed structural convention | titles and permissions do not become canonical meanings |

## Required selections

| Selection | Why no profile-wide value is safe |
|---|---|
| Organization boundary | Governance and responsibility change with the governed undertaking |
| Authority source | A title or capability does not establish legitimate authority |
| Jurisdiction | Obligations and decision rights vary across legal and institutional scopes |
| Applicable obligation set | Publication or existence does not prove applicability |
| Effective time | Adoption, activation, expiry, supersession, and revocation differ |
| Accountable actor and review forum | Traceability alone does not establish organizational answerability |

## Overrides and conflicts

Local entries may narrow organization, policy system, jurisdiction, or review
scheme. Overrides must state authority, scope, effective time, and
supersession. Conflicting authority systems remain parallel explicit contexts;
one MUST NOT silently overwrite another.

## Sources and provenance

- NIST Cybersecurity Framework 2.0 governance guidance.
- GAO Green Book 2025, organizational structure and authority principles.
- NIST NICE and CSRC terminology for roles, authorization, and accountability.

Profile revision: V0 simulation candidate, 2026-08-15. Legal and governance
specialist review remains a promotion gate.

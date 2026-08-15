# Governance Ledger Research

Status: complete

Research question: which next Factor Forge batch best improves graph closure
and domain balance after F5, and how should governance, obligation, and
compliance be separated without collapsing authority, policy, enforcement,
evidence, effectiveness, or ethics?

Decision supported: execute F6 as **Governance Ledger**, one connected
canonical anchor plus one contextual Mapping view, while repairing stale
unresolved declarations already owned by existing entries.

## Findings

### FACTORIUM-GOV-01 - Governance Ledger wins measured queue triage

Sources:

- `tables/UNRESOLVED.md`
- `reference/factorium-reference-v0.factorium`
- measured commands:
  - literal occurrence count across canonical table bodies;
  - canonical domain count grouped from `entry` records.

Observed constraint: before F6, `obligation` appeared 34 times and
`governance` 23 times across table bodies. Governance and organizations each
had only one canonical domain entry, compared with seven science, four
reference, four systems, three quantities, and three software entries.

Implication: governance/obligation has both recurrence and domain-balance
priority. It outranks adding adjacent software terms or another scientific
quantity cluster.

Confidence: high.

### FACTORIUM-GOV-02 - Several queue items already have canonical owners

Sources:

- `tables/entries/identity-naming-classification-versioning.md`
- `tables/entries/force.md`
- `tables/formulas/probability-range.md`
- `tables/entries/organization-role-authority.md`
- `tables/entries/state-event-transition-process-lifecycle.md`
- `tables/entries/policy-rule-constraint-decision-exception.md`

Observed constraint: `authority`, `organization`, and `event` exactly match
existing canonical senses. Compatibility is already owned as
`compatibility-level`, and enforcement is already a canonical policy sense.
Their unresolved declarations are stale graph links, not entry demand.

Implication: F6 should close those declarations through links or explicit
same-entry ownership. Queue count must not be used as a proxy for missing
headwords.

Confidence: high.

### FACTORIUM-GOV-03 - Governance is direction and oversight, not management

Sources:

1. ISO 37000:2021:
   https://www.iso.org/standard/65036.html
2. ISO, "First ever international benchmark for good governance":
   https://www.iso.org/news/ref2717.html

Observed constraint: ISO 37000 defines governance of organizations through
the system by which an organization is directed, overseen, and held
accountable toward purpose in an ethical and responsible manner. It
distinguishes governing-body and management roles.

Implication: the governance sense requires governed subject, purpose,
boundary, stakeholders, governing authority, direction, oversight, and
accountability. A board, policy, org chart, meeting, or management activity is
only a mechanism or participant.

Confidence: high within organizational governance; medium-high for the
cross-domain synthesis.

### FACTORIUM-GOV-04 - Cybersecurity governance links context, roles, policy, and oversight

Source: NIST, *Cybersecurity Framework 2.0*:
https://www.nist.gov/publications/nist-cybersecurity-framework-csf-20

Observed constraint: the CSF 2.0 Govern function establishes and monitors
cybersecurity risk strategy, expectations, and policy. Its outcomes include
organizational context, roles/responsibilities/authorities, policy, and
oversight, while the framework does not prescribe one implementation.

Implication: Factorium should link governance to the existing organization,
policy, control, evidence, and outcome anchors rather than duplicate them.
Mechanisms and outcome evidence remain separately owned.

Confidence: high for cybersecurity; medium-high cross-domain.

### FACTORIUM-GOV-05 - Compliance systems center applicable obligations

Sources:

1. ISO 37301:2021:
   https://www.iso.org/standard/75080.html
2. ISO 37301 project page:
   https://committee.iso.org/sites/tc309/home/projects/published/iso-37301-compliance-management.html

Observed constraint: ISO 37301 covers establishing, implementing, evaluating,
maintaining, and improving a compliance management system. Compliance
obligations can arise from legal, regulatory, contractual, internal, and
voluntary sources.

Implication: obligation source, obligated subject, required conduct,
applicability, jurisdiction, effective period, and precedence must remain
visible. Compliance is assessed against selected obligations and cannot be a
free-floating status.

Confidence: high.

### FACTORIUM-GOV-06 - Policy decision and enforcement are separate stages

Sources:

1. RFC 3198:
   https://www.rfc-editor.org/rfc/rfc3198
2. OASIS XACML 3.0:
   https://docs.oasis-open.org/xacml/3.0/xacml-3.0-core-spec-os-en.html
3. `tables/entries/policy-rule-constraint-decision-exception.md`

Observed constraint: RFC 3198 and XACML distinguish policy administration,
information, decision, and enforcement points. XACML defines an obligation
narrowly as an operation to be performed by a policy enforcement point with
an authorization decision.

Implication: an enforcement point is a mechanism under the existing
`enforcement` sense. XACML obligation is one bounded target mechanism and must
not define legal, contractual, or organizational obligation generally.

Confidence: high.

### FACTORIUM-GOV-07 - Compliance, evidence, and effectiveness need separate custody

Sources:

- `tables/entries/claim-evidence.md`
- `tables/entries/control-monitoring-response.md`
- ISO 37301:
  https://www.iso.org/standard/75080.html
- NIST CSF 2.0:
  https://www.nist.gov/publications/nist-cybersecurity-framework-csf-20

Observed constraint: compliance assessment requires evidence and criteria,
while control effectiveness and outcomes ask whether mechanisms achieve
intended effects. Evidence existence, conformity, effectiveness, ethics, and
good outcomes are different judgments.

Implication: the compliance sense requires obligation version, assessment
basis, evidence, assessor, time, uncertainty, and result. Factorium must reject
`control present = compliant = effective`.

Confidence: high.

### FACTORIUM-GOV-08 - V0 can register F6 but not obligation trace edges

Sources:

- `specs/FACTORIUM-REFERENCE-INTERCHANGE.md`
- `context/waves/2026-08-13-factorium-vision/FACTOR-FORGE-PORTFOLIO-ROLE-REVIEW.md`
- `docs/research/2026-08-14-software-mechanism-bridge.md`

Observed constraint: V0 preserves entry, sense, factor, and view identity but
cannot machine-check obligation-source, obligation-control, control-evidence,
or finding-remediation edges.

Implication: preserve those relations textually in the Mapping view and add
them to the existing typed-relation successor requirements. Do not expand V0
without a compatibility design.

Confidence: high.

## Recommendations

### Adopt now

- Add one governance/obligation/compliance anchor.
- Add one contextual Mapping view for governance and compliance records.
- Repair stale unresolved declarations for authority, compatibility,
  organization, event, governance, obligation, and enforcement point.
- Preserve compliance, effectiveness, ethics, and outcome as separate claims.

Owner: Factorium.

Validation: exact reference round trip and projections, all entry-contract
headings, Mapping family requirements, links, role registry, tests, and
fixed-point review.

### Prototype behind a compatibility boundary

- obligation-source and applicability edges;
- obligation-to-policy/control mappings;
- control-to-evidence and finding-to-remediation traces;
- version-aware impact queries when an obligation changes.

Owner: future Factorium interchange successor.

Expected validation: answer F2, F4, F5, and F6 relation queries without
changing published V0 identities.

### Reject or defer

- reject governance as a synonym for management, board, policy, or control;
- reject obligation as a synonym for task, responsibility, rule, or control;
- reject compliance as proof of effectiveness, safety, ethics, or good
  outcomes;
- defer appeal/recourse, certification, audit, assurance, and legal remedy as
  standalone senses until source breadth or reader demand supports them.

Non-goal: prescribe one jurisdiction, governance model, compliance framework,
control catalog, audit method, or enforcement technology.

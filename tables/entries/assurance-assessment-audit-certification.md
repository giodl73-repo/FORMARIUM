# Assurance, Assessment, Audit, Certification, and Accreditation

Status: candidate anchor entry

## Orientation

Assurance is a confidence-oriented claim supported by evidence and activities
for a purpose. Assessment evaluates a subject against criteria. An audit is a
systematic evidence-gathering and evaluation process under an audit mandate.
Certification is a scoped third-party attestation under a certification
scheme. Accreditation recognizes the competence and impartiality of a
conformity-assessment body for a scope. None is universal proof of quality,
safety, ethics, effectiveness, or future performance.

## Sense table

| Sense | Governing question | Role |
|---|---|---|
| `assurance` | What confidence is sought in which claim or property for which use, based on what evidence and argument? | purpose-bound confidence case |
| `assessment` | How does this identified subject compare with these criteria under this method, evidence, and scope? | criteria-based evaluation |
| `audit` | Which authorized systematic examination collected and evaluated evidence against which criteria? | governed examination process |
| `attestation` | Which party issues which conclusion about a subject based on performed assessment activities? | conclusion-bearing statement |
| `certification` | Which third party attests conformity of which subject to which scheme requirements for what scope and period? | scheme-governed third-party attestation |
| `accreditation` | Which authoritative body recognizes a conformity-assessment body's competence and impartiality for which activities and scope? | competence-recognition decision |

## Layer ladder

```text
subject + criteria + evidence + method
  -- evaluate --> assessment finding
audit mandate + systematic process
  -- gathers/evaluates --> audit findings
assessment activities + authorized party
  -- conclude --> attestation
certification scheme + third-party decision
  -- issue --> scoped certification
accreditation criteria + accreditation body
  -- recognize --> scoped competence of assessment body
```

## Root factorization

```text
assurance-use
  := assurance question, users, decisions, and confidence target
   x subject identity, boundary, configuration, and period
   x criteria, scheme, authority, version, and applicability
   x independence, competence, impartiality, and conflicts
   x evidence sources, sampling, methods, uncertainty, and limitations
   x findings, nonconformities, severity, and disposition
   x review, decision, attestation, scope, issue, expiry, and surveillance
   x corrective action, appeal, suspension, withdrawal, and supersession
   x provenance, custody, confidentiality, and public representation
```

## Contrast table

| Pair | Shared feature | Decisive distinction |
|---|---|---|
| Assurance vs. evidence | evidence supports assurance | confidence-oriented case/claim vs. individual supporting or contradicting item |
| Assessment vs. audit | audits are assessment activities | generic criteria comparison vs. mandate-governed systematic examination |
| Audit vs. monitoring | both observe controls/processes | bounded examination vs. continuing observation |
| Attestation vs. certification | certification issues attestation | conclusion statement generally vs. third-party scheme-governed process/status |
| Certification vs. accreditation | both are conformity-assessment decisions | attestation about product/process/system/person vs. recognition of assessment-body competence |
| Conformity vs. effectiveness | conformity can enable outcomes | criteria fulfillment vs. actual causal performance or benefit |

## Specialized view

[Assurance and Conformity Evidence Table](../evidence/assurance-conformity.md)
keeps subject, criteria, evidence, party, result, and excluded claims together.

## Selection procedure

1. State confidence question, users, decision, subject, boundary, and period.
2. Identify applicable criteria/scheme, authority, version, and exclusions.
3. Establish assessor competence, independence/impartiality, and conflicts.
4. Plan evidence, sampling, methods, uncertainty, confidentiality, and custody.
5. Record findings and nonconformities separately from causes and remediation.
6. Identify reviewer and decision authority; issue only the scoped conclusion.
7. Record surveillance, expiry, appeal, corrective action, suspension,
   withdrawal, and supersession without rewriting history.

## Constraints and failure signs

- Every conclusion names subject, scope, criteria/scheme, version, party, and time.
- First-, second-, and third-party assessments remain distinguishable.
- Sampling and unexamined areas remain visible.
- Certification does not imply accreditation of the certified subject.
- Accreditation scope does not guarantee every future assessment result.
- Corrective-action completion does not erase the original finding.
- Named certificates, audit frameworks, standards, and bodies remain examples.

## Cross-references

- [Claim and Evidence](claim-evidence.md)
- [Governance, Obligation, and Compliance](governance-obligation-compliance.md)
- [Requirement, Specification, Verification, and Validation](requirement-specification-verification-validation.md)
- [Organization, Position, Role, Competency, Responsibility, Authority, and Accountability](organization-role-authority.md)
- [Factorium Entry Publication](factorium-entry-publication.md)

## Sources and provenance

1. ISO/IEC 17000:2020, *Conformity assessment — Vocabulary and general principles*:
   https://www.iso.org/standard/73029.html
2. ISO, “Certification”: https://committee.iso.org/certification.html
3. U.S. GAO, *Government Auditing Standards*, 2024 Revision:
   https://www.gao.gov/yellowbook

Comparator access date: 2026-08-16. Formal schemes and jurisdictions retain
their authority; the cross-domain selection contract remains `candidate`.

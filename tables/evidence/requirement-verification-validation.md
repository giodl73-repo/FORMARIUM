# Requirement Verification and Validation Evidence Table

Status: candidate Evidence Table

Primary family: Evidence Table

Canonical headword: [Requirement, Specification, Verification, and Validation](../entries/requirement-specification-verification-validation.md)

Canonical senses: `stakeholder-need`, `requirement`, `specification`,
`verification`, `validation`, `nonconformity`

## Governing question

What exact evidence supports or contradicts a requirement, verification, or
validation result, under which versions and limits?

## Evidence table

| Claim level | Required binding | Supporting or contradicting evidence | Does not establish |
|---|---|---|---|
| Requirement is well formed | identity, authority, subject, condition, outcome, measure, trace, version | structured review, ambiguity/conflict analysis, stakeholder record | implementation conformity or usefulness |
| Product verifies | product configuration, requirement set, criteria, method, environment, result | inspection, analysis, demonstration, test, trace, anomaly record | suitability for unintended uses |
| Subject validates | intended use, users, environment, scenarios, success criteria, limitations | representative evaluation, stakeholder evidence, operational comparison | conformity to every requirement |
| Nonconformity exists | exact criterion, subject/version, observed evidence, uncertainty | reproducible comparison and independent review | root cause, blame, or corrective-action success |
| Waiver or exception applies | authority, scope, rationale, controls, expiry, review | approved immutable record | changed evidence or universal acceptability |

## Minimum record

1. Preserve claim, subject, requirement/specification, and evidence identities.
2. State method, article/configuration, environment, operator, and time.
3. Retain raw observations, calculations, uncertainty, anomalies, and exclusions.
4. Separate criterion satisfaction from intended-use judgement.
5. Record reviewer, disposition, nonconformity, corrective action, and retest.

## Failure signs

- one `passed` flag covers requirement review, verification, and validation;
- changed configurations inherit old results without impact review;
- missing evidence is treated as passing;
- an exception rewrites the original criterion or observation;
- a certificate or test report is cited without scope and version.

## Sources and provenance

See the canonical entry. This view structures evidence custody; it does not
declare any product conforming, suitable, accepted, or certified.

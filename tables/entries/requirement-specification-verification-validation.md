# Requirement, Specification, Verification, and Validation

Status: candidate anchor entry

## Orientation

A need or obligation motivates what is wanted or required; a requirement is a
governed statement that can be traced and evaluated; a specification organizes
such statements and related definitions for a subject. Verification asks
whether a selected work product satisfies specified requirements. Validation
asks whether the selected subject is suitable for intended use and stakeholder
needs in its intended environment. Passing one does not imply the other.

## Sense table

| Sense | Governing question | Role |
|---|---|---|
| `stakeholder-need` | What outcome, capability, or condition is sought by which stakeholder in which context? | source expectation |
| `requirement` | What necessary condition or capability is stated under an authority so it can be traced and evaluated? | governed evaluable statement |
| `specification` | Which controlled set of requirements, definitions, interfaces, and conditions describes a subject? | governed statement collection |
| `verification` | Does this work product conform to these specified requirements under this method and evidence? | specification-relative evaluation |
| `validation` | Is this subject suitable for these intended uses and stakeholder needs in this environment? | use-relative evaluation |
| `nonconformity` | Which specified criterion is not fulfilled by which subject and evidence? | scoped negative finding |

## Root factorization

```text
requirements-use
  := stakeholder, need, outcome, and operational context
   x requirement identity, statement, rationale, and source authority
   x subject, boundary, level, allocation, and interfaces
   x conditions, thresholds, units, tolerances, and exceptions
   x parent-child trace, dependencies, conflicts, and version
   x verification criterion, method, article, environment, and evidence
   x validation use, user, environment, scenario, and evidence
   x result, nonconformity, waiver, limitation, and disposition
```

## Contrast table

| Pair | Shared feature | Decisive distinction |
|---|---|---|
| Need vs. requirement | need can motivate requirement | stakeholder outcome/context vs. governed evaluable statement |
| Requirement vs. specification | specifications contain requirements | one obligation/condition vs. controlled statement set |
| Requirement vs. design | design responds to requirements | required outcome/condition vs. chosen realization |
| Verification vs. validation | both evaluate with evidence | specified-requirement conformity vs. intended-use suitability |
| Test vs. verification | test can supply evidence | method/activity vs. scoped evaluation conclusion |
| Nonconformity vs. defect | both report problems | failure against stated criterion vs. domain-specific fault concept |

## Specialized view

[Requirement Verification and Validation Evidence Table](../evidence/requirement-verification-validation.md)
keeps claim, method, evidence, result, and limitation together.

## Selection procedure

1. Identify stakeholders, needs, intended environment, and authority.
2. Write atomic requirements with subject, condition, required outcome,
   measure, threshold/tolerance, and applicability.
3. Record rationale, source, allocation, dependencies, and bidirectional trace.
4. Baseline a specification without erasing superseded versions or conflicts.
5. Define verification criteria and methods while requirements are developed.
6. Define validation uses, users, scenarios, and acceptance evidence separately.
7. Record actual article/configuration, environment, evidence, uncertainty,
   exceptions, nonconformities, and disposition.

## Constraints and failure signs

- “Shall” wording alone does not establish authority, clarity, or verifiability.
- Requirements do not prescribe design unless the constraint is intentional.
- Verification results name exact requirement and subject versions.
- Validation results name intended use, users, environment, and limitations.
- A test pass is not a universal verification or validation result.
- Waiver, deviation, exception, and requirement change remain distinct records.
- Named methods, document templates, and standards remain contextual mechanisms.

## Cross-references

- [Policy, Rule, Constraint, Decision, Review, Appeal, and Exception](policy-rule-constraint-decision-exception.md)
- [Claim and Evidence](claim-evidence.md)
- [Model, Representation, and Simulation](model-representation-simulation.md)
- [System Composition, Architecture, Capability, Interface, and Dependency](system-composition-dependency.md)

## Sources and provenance

1. NASA, “Product Realization”: https://www.nasa.gov/reference/5-0-product-realization/
2. NASA, *Systems Engineering Handbook*, Appendix D/E:
   https://www.nasa.gov/reference/system-engineering-handbook-appendix/
3. NASA Software Engineering Handbook, SWE-050:
   https://swehb.nasa.gov/spaces/7150/pages/16449651/SWE-050+-+Software+Requirements

Comparator access date: 2026-08-16. NASA usage is authoritative for NASA;
Factorium's cross-domain organization remains `candidate`.

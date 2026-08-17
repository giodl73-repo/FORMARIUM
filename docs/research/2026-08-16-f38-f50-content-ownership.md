# F38-F50 Content Ownership

Status: source-backed campaign plan; candidate reference content, not a
standard, legal interpretation, certification, or performance result

Date: 2026-08-16

## Question

Which recurring concepts should close the seven unresolved candidates and
which missing anchors can extend the private-preview book without turning the
reference into a catalog of names?

## Existing-owner decisions

| Phase | Terms | Owner decision | Stopping boundary |
|---|---|---|---|
| F38 | namespace | deepen Identity/Naming; a namespace supplies the scope and authority under which an identifier is interpreted | no registry, URI scheme, DNS, package, or vendor catalog |
| F39 | position, competency | deepen Organization/Role; a position is an organization-defined work assignment and competency is a person/work capability criterion | no occupation, title, grade, skill, or credential catalog |
| F40 | legal ownership | keep the existing ownership/stewardship sense and separate title/rights, stewardship, and custody by authority and jurisdiction | no jurisdiction-neutral legal conclusion or asset taxonomy |
| F41 | appeal | deepen Policy/Decision; appeal is an authority-governed request for review or change of a decision | no court, tribunal, deadline, remedy, or jurisdiction catalog |
| F42 | force homonyms | close coercion and validity through the existing Force polysemy owner | no doctrine of coercion, enforceability, or legal advice |
| F47 | data, record, schema, field | deepen Information/Data; data remains the representation owner while record, schema, and field are structural roles | no database-product, format, or vocabulary catalog |
| F49 | plan, task, milestone, resource | deepen Coordinated Work; planning and scheduling roles specialize the existing work graph | software resource remains with Software Module/Service/Resource; no project-method catalog |

## New-owner decisions

Six candidates pass the independent-owner test because no current entry owns
their governing comparison:

| Phase | Anchor | Governing comparison | Specialized view |
|---|---|---|---|
| F43 | model, representation, simulation | subject, purpose, abstraction, representation, execution, and result | Diagnostic |
| F44 | requirement, specification, verification, validation | need/obligation, governed statement set, conformity evidence, and intended-use evidence | Evidence |
| F45 | reliability, availability, maintainability, resilience, recovery | continuity probability, usable-state proportion, restoration support, adverse-condition capability, and restoration process | Diagnostic |
| F46 | instant, duration, interval, deadline, schedule | temporal point, extent, bounded span, required boundary, and planned temporal arrangement | Mapping |
| F48 | access, permission, authorization, entitlement | attempted interaction, allowed operation, decision, and governed grant | Constraint |
| F50 | assurance, assessment, audit, certification, accreditation | confidence-building activity, criteria-based evaluation, audit process, third-party attestation, and competence recognition | Evidence |

The campaign therefore ends with 46 canonical entries rather than forcing an
arbitrary 48-entry target. F47 and F49 add views but not duplicate anchors.

## Cross-campaign factorization

Every slice retains:

```text
subject and boundary
  x governing purpose or question
  x authority and applicable source
  x representation or procedure
  x conditions and effective time
  x evidence and result
  x uncertainty, exception, and limitation
  x revision, provenance, and review
```

The dimensions are dependent. An authorization depends on a request context;
a validation result depends on intended use; a schedule depends on activities
and calendars; certification depends on scheme and scope; and a namespace
only scopes identifiers under its governing contract.

## Source boundary

- W3C namespace policy supports explicit namespace authority, persistence,
  and version semantics without making XML or URIs universal.
- OPM material separates a position's assigned work from a person's
  qualifications and defines competency as a measurable work-related pattern;
  those definitions are used only as a concrete public-administration source.
- NIST information-steward material supports separating authority and control
  duties from physical or technical custody.
- NASA systems-engineering material separates requirements, specifications,
  verification against requirements, and validation for intended use.
- NIST modeling material distinguishes computational-model verification from
  intended-use validation; Factorium generalizes only the selection questions.
- NIST reliability and resilience sources show that reliability,
  availability, maintainability, resilience, and recovery are related but
  non-equivalent and domain-scoped.
- BIPM supplies the SI time and duration quantity boundary. Calendar,
  timezone, deadline, and schedule semantics remain explicit external inputs.
- NIST access-control sources distinguish authentication, authorization,
  permission relations, subjects, objects, operations, and constraints.
- GAO schedule guidance separates activities from zero-duration milestones and
  requires dependencies, calendars, resources, and scope for credible dates.
- ISO/IEC 17000 and ISO CASCO material distinguishes conformity assessment,
  certification, and accreditation and prevents a certificate from becoming
  universal proof.

## Alternatives rejected

| Alternative | Disposition | Reason |
|---|---|---|
| One entry per unresolved word | reject | duplicates existing semantic owners and rewards lexical accidents |
| Data-record and project-plan anchors | reject | current Information and Coordinated Work entries already own the decisive pivots |
| Named methods, schemas, standards, job families, access models, or certificates as senses | reject | open-ended member lists do not explain the reusable concept |
| Universal definitions across law, security, engineering, and conformity assessment | reject | authority, jurisdiction, purpose, and domain alter the contracts |
| Promote any slice beyond candidate | reject | source review supports orientation, not external acceptance or outcome evidence |

## Sources

1. W3C, *URIs for W3C Namespaces*: https://www.w3.org/guide/editor/namespaces
2. U.S. OPM, “Classification and qualifications”: https://www.opm.gov/frequently-asked-questions/classification-faq/general/are-classification-and-qualifications-the-same-thing/
3. U.S. OPM, *General Schedule Qualification Policies*: https://www.opm.gov/policy-data-oversight/classification-qualifications/general-schedule-qualification-policies/
4. NIST CSRC Glossary, “information steward”: https://csrc.nist.gov/glossary/term/information_steward
5. NASA, *Systems Engineering Handbook*: https://www.nasa.gov/reference/systems-engineering-handbook/
6. NASA, “Product Realization”: https://www.nasa.gov/reference/5-0-product-realization/
7. NIST IR 8298, *Validation Methods for Energy Models*: https://nvlpubs.nist.gov/nistpubs/ir/2020/NIST.IR.8298.pdf
8. NIST CSRC Glossary, “resilience”: https://csrc.nist.gov/glossary/term/resilience
9. NIST CSRC Glossary, “Reliability, Maintainability, Availability”: https://csrc.nist.gov/glossary/term/reliability_maintainability_availability
10. BIPM, *The International System of Units*, 9th ed., updated 2026: https://www.bipm.org/en/publications/si-brochure/
11. NIST IR 7316, *Assessment of Access Control Systems*: https://doi.org/10.6028/NIST.IR.7316
12. NIST SP 800-63C-4 Glossary: https://pages.nist.gov/800-63-4/sp800-63c/glossary/
13. U.S. GAO, *Schedule Assessment Guide*, GAO-16-89G: https://www.gao.gov/assets/gao-16-89g.pdf
14. ISO/IEC 17000:2020, *Conformity assessment — Vocabulary and general principles*: https://www.iso.org/standard/73029.html
15. ISO, “Certification”: https://committee.iso.org/certification.html

Source access date: 2026-08-16.

## Claim boundary

The sources support candidate distinctions and ownership choices. The campaign
does not establish legal ownership, access entitlement, requirements
conformance, model credibility, system dependability, schedule feasibility,
audit sufficiency, certification validity, reader success, or external
acceptance.

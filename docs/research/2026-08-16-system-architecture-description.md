# System Architecture and Description Ownership

Status: source-backed F37 ownership note; candidate reference content, not an
architecture standard or conformance result

Date: 2026-08-16

## Question

Should the unresolved `architecture` and `subsystem` terms become new
canonical entries, new senses under System Composition, or remain examples?

## Source boundary

ISO/IEC/IEEE 42010:2022 explicitly distinguishes an entity's architecture from
an architecture description expressing it. The standard governs description
structure and expression across software, systems, enterprises, products, and
other entities; it does not prescribe an architecture, method, notation, tool,
or recording format. NIST's SP 800-160-derived glossary treats an architecture
viewpoint as conventions for constructing, interpreting, and using views to
frame system concerns. ISO/IEC/IEEE 42030 separately distinguishes evaluation
of an architecture from evaluation of an architecture description. NASA's
systems-engineering material supplies the system-in-environment architecture
definition and uses `subsystem` as a contextual level within larger system
integration and verification accounts.

These sources support a compact reusable distinction. They do not authorize a
catalog of architecture styles, frameworks, languages, model kinds, methods,
tools, domains, or maturity schemes.

## Existing-owner test

The existing `system-composition-dependency` entry already owns system of
interest, elements, component roles, boundary, environment, viewpoint,
interfaces, dependencies, behavior, authority, and effective time. A separate
architecture anchor would repeat those authorities and force circular links
for its decisive inputs. The existing entry can own two additional senses
without distortion:

- `architecture`: the entity-in-environment organization expressed through
  fundamental concepts/properties, elements, relationships, and principles;
- `architecture-description`: a versioned work product expressing an
  architecture for declared stakeholders, concerns, viewpoints, and uses.

`Subsystem` does not pass the independent-owner test. The same entity can be a
system of interest in one view and a system element or component of a
containing system in another. Its reusable content is the conjunction of an
existing system identity and a declared containing-system role, not a new
intrinsic entity class.

## Chosen factorization

The entry keeps its original system-composition factors and adds four
architecture-description dimensions:

1. stakeholder concerns and intended decision use;
2. fundamental concepts, properties, and organizing principles;
3. architecture-description viewpoints, views, and model kinds;
4. assumptions, decisions, rationale, consistency, and version.

The existing Constraint Table gains five fail-able invariants for subsystem
role, architecture claim, architecture-description identity, viewpoint/view
coverage, and cross-view consistency. The table does not evaluate whether an
architecture is good, compliant, safe, secure, or fit for purpose.

## Alternatives rejected

| Alternative | Disposition | Reason |
|---|---|---|
| New `architecture` anchor | reject | Duplicates system, environment, elements, relationships, viewpoint, and lifecycle ownership. |
| Canonical `subsystem` sense | reject | Contextual role is adequately expressed by existing system plus containing-view component/element semantics. |
| Architecture-style senses | reject | Named styles are open-ended members and examples, not the governing concept. |
| One generic `model` sense here | reject | Model and representation recur beyond architecture and need a separate owner test before admission. |
| Architecture evaluation result | defer | Requires declared purpose, criteria, evidence, and evaluation custody beyond description integrity. |

## Stopping boundary

F37 stops after the two senses, contextual subsystem rule, four added factors,
and five description-integrity constraints. It adds no named style, framework,
language, viewpoint catalog, notation, method, tool, platform, domain
architecture, evaluation score, or conformance assertion.

## Sources

1. ISO/IEC/IEEE 42010:2022, *Software, systems and enterprise — Architecture
   description*: https://www.iso.org/standard/74393.html
2. NIST CSRC Glossary, “architecture viewpoint,” sourced to NIST SP
   800-160v1r1: https://csrc.nist.gov/glossary/term/architecture_viewpoint
3. ISO/IEC/IEEE 42030:2019, *Software, systems and enterprise — Architecture
   evaluation framework*: https://www.iso.org/standard/73436.html
4. NASA, *Systems Engineering Handbook*: https://www.nasa.gov/reference/systems-engineering-handbook/
5. NASA, *Systems Engineering Handbook*, Appendix, “Architecture”:
   https://www.nasa.gov/reference/system-engineering-handbook-appendix/

Source access date: 2026-08-16.

## Claim boundary

This note supports candidate editorial distinctions and an ownership decision.
It is not an ISO/NIST/NASA interpretation ruling, architecture-description
conformance assessment, architecture evaluation, systems-engineering method,
or evidence that the factorization improves reader or project outcomes.

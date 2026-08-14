# System Composition and Dependency Research

Status: complete

Decision supported: define the first Factor Forge cluster for system,
system element, component, capability, interface, dependency, boundary, and
environment, and decide whether Factorium Reference Interchange V0 needs a
schema change before admitting it.

## Local evidence

### FACTORIUM-01 - The root grammar already reserves the required coordinates

Source:
`tables/foundations/ROOT-TABLE.md`, "Reusable root factorizations" and "Root
coordinates."

Observed constraint: the candidate System grammar already combines purpose,
boundary, components, relations, behavior, and environment. Boundary,
relation, purpose, and context are existing root coordinates.

Implication: the new cluster should refine existing coordinates rather than
introduce a competing root ontology.

Confidence: high.

### FACTORIUM-02 - Structural roles are not canonical concept definitions

Source:
`tables/foundations/FACTOR-ROLES.md`, "Structural roles" and "Common role
interactions."

Observed constraint: `component`, `capability`, `relationship`, and `boundary`
are view-relative jobs. The role table explicitly warns that interfaces can
be mistaken for owned parts and associations for ownership.

Implication: the canonical entry may explain these concepts, but must preserve
the distinction between a concept sense and a role assignment in one selected
factorization.

Confidence: high.

### FACTORIUM-03 - V0 can preserve the cluster without pretending to type it

Source:
`specs/FACTORIUM-REFERENCE-INTERCHANGE.md`, "Canonical hierarchy," "Grammar,"
and "Compatibility boundary."

Observed constraint: V0 owns stable entry, sense, factor, and specialized-view
identity. It deliberately leaves family-specific bodies and richer relation
payloads in linked Markdown.

Implication: V0 can admit one entry with ordered senses and factors plus a
Constraint Table view. Dependency direction, interface contracts, and
part-whole semantics remain explicit in Markdown. Machine-queryable typed
edges should wait for a versioned successor instead of being improvised.

Confidence: high.

### FACTORIUM-04 - Existing mappings already require non-equivalence

Source:
`tables/mappings/factor-role-mechanisms.md`, "Shared interpretation,"
"Preservation and loss," and the six target-system assignments.

Observed constraint: an interface, trait, foreign key, service, or reporting
line can carry several roles, and no mechanism proves a source concept.

Implication: the new entry should help readers choose semantic relations
before selecting implementation mechanisms.

Confidence: high.

## External evidence

### FACTORIUM-05 - A system is organized through elements and relationships

Sources:

1. NASA, *Systems Engineering Handbook*, "2.0 Fundamentals of Systems
   Engineering":
   https://www.nasa.gov/reference/2-0-fundamentals-of-systems-engineering/
2. NIST CSRC Glossary, "system":
   https://csrc.nist.gov/glossary/term/system

Observed constraint: NASA describes a system as elements functioning together
to produce a required capability and emphasizes that system-level results
arise primarily from relationships among parts. NIST includes the
ISO/IEC/IEEE 15288 formulation of interacting elements organized for stated
purposes.

Implication: elements, relationships, behavior or meaning, and the selected
view are necessary. Purpose is central for engineered and organizational
systems but should not be universalized to every natural or conceptual system.

Confidence: high.

### FACTORIUM-06 - Element and component are not universally interchangeable

Sources:

1. NIST CSRC Glossary, "system element":
   https://csrc.nist.gov/glossary/term/system_element
2. NIST CSRC Glossary, "system component":
   https://csrc.nist.gov/glossary/term/system_component
3. NASA, *Systems Engineering Handbook*, "2.0 Fundamentals of Systems
   Engineering":
   https://www.nasa.gov/reference/2-0-fundamentals-of-systems-engineering/

Observed constraint: the ISO-derived system-element definition is a member of
the set constituting a system. NIST component definitions are often narrower,
especially for identifiable information-technology assets. NASA's elements
can include hardware, software, facilities, people, processes, and
procedures.

Implication: use `system-element` for membership in the selected system view.
Use `component` only when the view asserts a constituent or assembly relation,
and do not make the IT-asset definition universal.

Confidence: high.

### FACTORIUM-07 - Boundary, environment, and interface answer different questions

Sources:

1. SEBoK, "Introduction to Systems Engineering Fundamentals":
   https://sebokwiki.org/wiki/Introduction_to_Systems_Engineering_Fundamentals
2. NIST CSRC Glossary, "interface":
   https://csrc.nist.gov/glossary/term/interface
3. NIST CSRC Glossary, "operational environment":
   https://csrc.nist.gov/glossary/term/operational_environment

Observed constraint: SEBoK treats boundary selection as establishing what is
inside the system and how an open system interacts with its environment.
NIST defines an interface as where logical or physical elements meet and
interact, and defines operational environment as the circumstances influencing
a delivered system.

Implication: boundary owns inclusion; environment owns external context and
actors; interface owns a specified interaction locus or contract. An
interface can be internal or cross the selected system boundary.

Confidence: high.

### FACTORIUM-08 - Capability must retain conditions and beneficiary

Sources:

1. NASA, *Systems Engineering Handbook*, "2.0 Fundamentals of Systems
   Engineering":
   https://www.nasa.gov/reference/2-0-fundamentals-of-systems-engineering/
2. NIST CSRC Glossary, "capability":
   https://csrc.nist.gov/glossary/term/capability

Observed constraint: NASA connects capability to meeting a need through the
system as a whole. NIST shows that `capability` is domain-sensitive, ranging
from a feature or function to a combination of controls serving a purpose.

Implication: Factorium should ask what outcome can be produced, for whom, and
under which conditions. It should not define capability as a component,
interface, or implementation mechanism.

Confidence: medium-high.

### FACTORIUM-09 - Dependency needs an explicitly candidate cross-domain form

Sources:

1. NASA, *Systems Engineering Handbook*, "2.0 Fundamentals of Systems
   Engineering":
   https://www.nasa.gov/reference/2-0-fundamentals-of-systems-engineering/
2. SEBoK, "Introduction to Systems Engineering Fundamentals":
   https://sebokwiki.org/wiki/Introduction_to_Systems_Engineering_Fundamentals

Observed constraint: both sources emphasize interconnection, interaction,
environmental influence, and reliance among elements, but the reviewed public
sources do not supply one sufficiently precise cross-domain dependency
contract covering software, organizations, and physical systems.

Implication: admit dependency as a candidate directional reliance relation
with source, target, required property, condition, consequence, and time
scope. Defer domain-specific dependency taxonomies.

Confidence: medium.

## Recommendations

### Adopt now

- Add one canonical cluster with eight separated senses.
- Preserve boundary, environment, and interface as distinct.
- Distinguish system-element membership from component part-whole semantics.
- Model dependency as directional and condition-bound.
- Add a Constraint Table that makes invalid collapses visible.

Owner: Factorium.

Validation: interchange round trip, generated projections, repository links,
and fixed-point role review.

### Prototype behind a compatibility boundary

- Keep richer relation payloads in Markdown under V0.
- Evaluate typed relation kinds and edge direction only when at least three R5
  clusters require machine queries that current generated projections cannot
  provide.

Owner: a future Factorium interchange successor.

Validation: migration design preserving published entry and sense IDs.

### Reject or defer

- Reject equating a system with a collection of components.
- Reject treating every external influence as an interface.
- Reject using an implementation mechanism to infer capability or ownership.
- Defer exhaustive taxonomies of dependency, interface type, architecture,
  service, and subsystem.

Non-goal: define one universal systems-engineering ontology.

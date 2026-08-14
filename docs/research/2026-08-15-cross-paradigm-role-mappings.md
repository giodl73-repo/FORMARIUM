# Cross-Paradigm Factor Role Mapping Research

Date: 2026-08-15

Status: decision support for R3

## Research question

How can Factorium map its eleven general factor roles into object-oriented,
Rust, functional, relational, cloud-native, and organizational mechanisms
without asserting equivalence or allowing one paradigm to redefine the role?

Decision supported: publish one contextual Mapping Table with six bounded
target-system slices, explicit non-equivalences, and many-to-many cardinality.

## Local evidence inventory

- `tables/foundations/FACTOR-ROLES.md`
- `tables/roles/*.md`
- `tables/roots/{state,relation,boundary,context,constraint}.md`
- `specs/MAPPING-TABLE-ENTRY.md`
- `specs/FACTORIUM-ENTRY-GRAPH.md`
- `tables/mappings/version-scheme-semantics.md`
- `context/waves/2026-08-13-factorium-vision/REFERENCE-TABLE-FAMILIES-ROLE-REVIEW.md`

## Findings

### FACTORIUM-MAP-01 - General roles are questions, not syntax categories

**Source:** `tables/foundations/FACTOR-ROLES.md`, "Structural roles" and "Role
assignment."

**Observed constraint:** Pivot, component, capability, variant, state, policy,
relationship, boundary, context, constraint, and derived view describe jobs in
a selected decomposition. They are view-relative and may overlap.

**Implication:** Every mapping row starts from the role's governing question.
Target mechanisms are candidates under conditions, never definitions.

**Confidence:** high.

### FACTORIUM-MAP-02 - UML offers several non-interchangeable structural mechanisms

**Source:** OMG, UML 2.5.1 specification,
<https://www.omg.org/spec/UML/2.5.1>.

**Observed constraint:** UML distinguishes classifiers, classes, interfaces,
associations, generalization, properties, packages, state machines, and other
model elements. A class or generalization cannot stand in for every kind of
variation or relation.

**Implication:** Object-oriented mappings include composition, interfaces,
associations, fields, strategies, queries, and state mechanisms. Inheritance
is only one conditional pivot or variant mechanism.

**Confidence:** high.

### FACTORIUM-MAP-03 - Rust separates data shape, alternatives, behavior, and ownership

**Source:** The Rust Reference, types and traits,
<https://doc.rust-lang.org/reference/types.html> and
<https://doc.rust-lang.org/reference/items/traits.html>.

**Observed constraint:** Structs, enums, references, modules, traits,
implementations, and generic bounds have different semantics. Traits define
shared behavior; enums own closed alternatives; fields and ownership express
data structure.

**Implication:** Rust mappings must not translate every capability into an
enum, every variant into a trait, or every component into an owned field.
Borrowed references, handles, IDs, and modules remain separate options.

**Confidence:** high.

### FACTORIUM-MAP-04 - Functional mechanisms separate algebraic shape from capability

**Source:** Haskell 2010 Language Report, Chapter 4,
<https://www.haskell.org/onlinereport/haskell2010/haskellch4.html>.

**Observed constraint:** Data and newtype declarations define data
constructors, while type classes and instances introduce overloaded
operations. Functions, modules, and values remain separate mechanisms.

**Implication:** Algebraic data types are strong candidates for variants and
state; records/tuples for components; functions for derivation; and type
classes for capability. None is a universal pivot.

**Confidence:** high.

### FACTORIUM-MAP-05 - Relational mechanisms distinguish identity, relation, validity, and projection

**Source:** PostgreSQL documentation, constraints and views,
<https://www.postgresql.org/docs/current/ddl-constraints.html> and
<https://www.postgresql.org/docs/current/rules-views.html>.

**Observed constraint:** Primary/unique keys, foreign keys, check constraints,
tables, junction relations, and views preserve different invariants. A view is
a projection/query mechanism rather than stored source authority.

**Implication:** Relational mappings keep entity identity, relationships,
constraints, policy data, history, and derived views separate. A discriminator
column alone does not create a valid variant model.

**Confidence:** high.

### FACTORIUM-MAP-06 - Cloud-native mechanisms are platform-scoped

**Source:** NIST SP 800-190, *Application Container Security Guide*,
<https://csrc.nist.gov/pubs/sp/800/190/final>; Kubernetes documentation,
<https://kubernetes.io/docs/concepts/> and
<https://kubernetes.io/docs/reference/access-authn-authz/rbac/>.

**Observed constraint:** Images, containers, registries, orchestrators,
resources, labels, selectors, controllers, configuration, policies, and role
bindings address different concerns. Kubernetes mechanisms do not define all
cloud architectures.

**Implication:** The cloud slice is explicitly cloud-native/Kubernetes-shaped
and contextual. It maps roles to resources, controllers, policies, bindings,
configuration, and observed status without claiming universal cloud
equivalence.

**Confidence:** high.

### FACTORIUM-MAP-07 - Organizational roles cannot be reduced to job titles

**Source:** U.S. Office of Personnel Management, position classification
guidance,
<https://www.opm.gov/policy-data-oversight/classification-qualifications/classifying-general-schedule-positions/>.

**Observed constraint:** Position classification groups work for a particular
employment system. Authority, accountability, process ownership, membership,
policy, reporting lines, and temporary assignments may cross titles and
positions.

**Implication:** The organizational slice uses positions, teams, charters,
delegations, reporting relationships, policies, controls, workflows, and
reports as candidate mechanisms. OPM classification is evidence for
distinguishing assigned work from a universal ontology.

**Confidence:** medium-high.

### FACTORIUM-MAP-08 - The mapping is contextual, partial, and many-to-many

**Source:** `specs/MAPPING-TABLE-ENTRY.md`; findings FACTORIUM-MAP-01 through
FACTORIUM-MAP-07.

**Observed constraint:** One role may require several target mechanisms, one
mechanism may carry several roles, and reverse inference loses the selected
view and governing question.

**Implication:** Direction is Factorium role to candidate mechanism.
Cardinality is many-to-many. There is no general inverse. Round trip requires
retaining the source role annotation and mapping context.

**Confidence:** high.

## Recommendations

### Adopt now

- Publish one Mapping Table with six target-system slices.
- Keep the eleven source roles in canonical order.
- State conditions and non-equivalences in every row.
- Mark the mapping contextual, partial, many-to-many, and non-invertible
  without retained annotations.
- Use the mapping in two Factor Guides and record where no direct mechanism is
  appropriate.

Owner: Factorium R3.

Validation: Mapping Table contract, local-link validation, source citations,
fixed-point role review, canonical manifest registration, and guide trace
tables.

### Prototype behind a compatibility boundary

- Machine-readable row payloads.
- Paradigm-specific subviews and executable lint rules.
- Search facets for role, target mechanism, condition, and loss.

Validation: at least two real implementations per target paradigm before
promoting any row beyond candidate.

### Reject or defer

- one-to-one role translation;
- reverse inference from syntax to semantic role;
- inheritance as the default decomposition mechanism;
- Kubernetes mechanisms as universal cloud definitions;
- job titles as complete organizational responsibility models;
- automatic code or schema generation from candidate mapping rows.

## Non-goals

- no best-practice ranking among paradigms;
- no claim that the target mechanism vocabulary is complete;
- no executable transformation;
- no replacement of domain architecture review;
- no claim that matching mechanism names preserve semantics.

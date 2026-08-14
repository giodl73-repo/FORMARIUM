# Factor Role to Mechanism Crosswalk

Status: candidate Mapping Table

Primary family: Mapping Table

Canonical headword:
[Factorization Quality](../entries/factorization-quality.md)

Canonical sense: `mechanism-assignment`

## Orientation

Factor roles describe the job a factor performs inside one selected
decomposition. Object-oriented, Rust, functional, relational, cloud-native,
and organizational mechanisms provide ways to represent some of those jobs.
They do not define the roles and do not map one-to-one.

## Mapping identity

| Field | Value |
|---|---|
| Source system | Factorium Factor Role Table V0 |
| Target systems | UML-shaped object-oriented design; Rust; Haskell-shaped functional design; relational databases; Kubernetes-shaped cloud-native systems; organizational design |
| Direction | Factorium role to candidate target mechanism |
| Mapping kind | contextual and partial mechanism assignment |
| Cardinality | many-to-many |
| Authority | candidate Factorium synthesis from cited target-system references |
| Factorium maturity | `candidate` |

The mapping has no general inverse. A target mechanism does not reveal which
Factorium role it serves unless the selected view and governing question are
retained.

## Shared interpretation

| Source role | Governing question |
|---|---|
| `pivot` | Which factor organizes identity or navigation in this view? |
| `component` | What constituent is owned or assembled into the whole? |
| `capability` | What can the subject do or support? |
| `variant` | Which alternative form is selected? |
| `state` | Which current condition affects behavior? |
| `policy` | Which replaceable rule governs a decision? |
| `relationship` | Which connection between participants matters? |
| `boundary` | Which inclusion or interface limits the view? |
| `context` | Which circumstances qualify interpretation? |
| `constraint` | Which combinations or transitions are invalid? |
| `derived-view` | Which output is computed or projected from other factors? |

## Object-oriented assignment

| Role | Candidate mechanisms | Condition | Not equivalent to |
|---|---|---|---|
| Pivot | aggregate root, principal class, package/module boundary | Use when one identity genuinely organizes navigation or lifecycle | every base class |
| Component | composition property, owned object, contained collection | Ownership and lifecycle are part-whole | any association |
| Capability | interface, protocol, provided operation | Behavior varies independently of nominal class | inheritance hierarchy |
| Variant | sealed subtype set, tagged union, strategy selection | Alternatives are explicit and bounded or selected by policy | arbitrary subclass |
| State | field set, state object, state-machine state | Identity continues while condition changes | a new class for every status |
| Policy | strategy object, rule object, injected evaluator | Rules are replaceable and versioned | hard-coded validation |
| Relationship | association, association class, reference | Participants remain distinct | composition |
| Boundary | public interface, module, aggregate, adapter | Crossing rules and ownership scope are explicit | any file or namespace |
| Context | parameter object, request context, ambient service | Circumstance qualifies behavior without owning identity | global mutable state |
| Constraint | invariant, validator, pre/postcondition, type restriction | Invalid combinations are rejected at the right boundary | policy preference |
| Derived view | query method, projection object, computed property | Output is reproducible from retained inputs | stored source fact |

## Rust assignment

| Role | Candidate mechanisms | Condition | Not equivalent to |
|---|---|---|---|
| Pivot | primary struct/newtype, enum boundary, module API | A stable type or API boundary owns navigation | every trait |
| Component | owned field, collection, smart pointer | Ownership and drop/lifecycle semantics fit part-whole | borrowed reference or ID |
| Capability | trait, trait bound, callable function set | Shared behavior is the lookup target | enum variant |
| Variant | enum variant, sealed implementation set, generic choice | Alternatives are explicit; openness is documented | trait implementation in general |
| State | enum or field in a continuing identity, typestate where justified | Transition validity benefits from representation | unrelated nominal types by default |
| Policy | policy value, trait object, generic parameter, evaluator function | Rule replacement and version are explicit | compile-time type alone |
| Relationship | reference, ID, key, handle, lifetime-bound borrow | Connection semantics and ownership are separate | owned component |
| Boundary | module visibility, crate API, trait boundary, service adapter | The crossing surface is intentionally controlled | arbitrary module split |
| Context | explicit context struct, function parameter, scoped guard | Dependencies and lifetime are visible | process-global singleton |
| Constraint | type invariant, constructor validation, trait bound, runtime guard | Static and runtime validity scopes are distinguished | policy decision |
| Derived view | pure function, method, iterator/query result, cached projection | Inputs and invalidation rules are retained | independent mutable field |

## Functional assignment

| Role | Candidate mechanisms | Condition | Not equivalent to |
|---|---|---|---|
| Pivot | principal algebraic type, module abstraction, indexed key | One type or key genuinely organizes the view | every type constructor |
| Component | product field, tuple member, nested value | Product composition represents part-whole | arbitrary function argument |
| Capability | type class, function parameter, module signature | Required operations vary across implementations | data constructor |
| Variant | sum-type constructor, `Either`, explicit tagged case | Alternatives are semantically disjoint | Boolean flag collection |
| State | immutable state value threaded through transitions, state ADT | Change is modeled as value transformation | hidden mutation |
| Policy | higher-order function, rules value, interpreter | Decision logic is supplied separately from facts | pattern match embedded everywhere |
| Relationship | keyed pair, relation value, graph edge, reference ID | Participants and cardinality stay explicit | nested ownership by default |
| Boundary | module export list, abstract type, effect boundary | Construction or effects are intentionally hidden | file boundary alone |
| Context | explicit environment value, reader-style parameter | Circumstance is threaded visibly | implicit global |
| Constraint | smart constructor, refined/validated type, predicate | Invalid construction or transition is blocked at a named boundary | policy ranking |
| Derived view | pure function, fold, query, lens projection | Output is reproducible from source values | duplicated stored truth |

## Relational assignment

| Role | Candidate mechanisms | Condition | Not equivalent to |
|---|---|---|---|
| Pivot | entity table plus primary/unique key | Stable row identity organizes joins and lifecycle | every table |
| Component | dependent table, owned row set, embedded columns | Ownership and deletion/update rules are explicit | any foreign key |
| Capability | operation table, permission relation, supported-feature relation | Capability is data to query or govern | table method |
| Variant | discriminator plus checks, subtype tables, exclusive foreign keys | Completeness and exclusivity are enforced | free-text type column |
| State | status column plus transition history/event relation | Current condition and history are both needed | identity key |
| Policy | versioned rule/configuration tables, policy relation | Rule data changes independently of observed facts | check constraint alone |
| Relationship | foreign key, junction table, relationship entity | Cardinality and attributes are explicit | denormalized label |
| Boundary | schema, ownership boundary, transaction/API surface | Scope and crossing semantics are governed | table namespace alone |
| Context | tenant, effective-time, locale, request facts | Context participates explicitly in keys or evaluation | session-global default |
| Constraint | `NOT NULL`, `UNIQUE`, `CHECK`, foreign key, exclusion constraint | Database can own the invariant within its semantic limits | workflow policy |
| Derived view | view, materialized view, computed query | Source relations and refresh semantics are explicit | authoritative base table |

## Cloud-native assignment

This slice is Kubernetes-shaped and does not define every cloud platform.

| Role | Candidate mechanisms | Condition | Not equivalent to |
|---|---|---|---|
| Pivot | API resource kind/name, workload or service identity | A resource boundary owns reconciliation or navigation | every container |
| Component | pod template, mounted resource, owned dependent resource | Owner references and lifecycle fit part-whole | any selected resource |
| Capability | service/API, declared port, controller behavior, permission | Supported operation is explicit and discoverable | image identity |
| Variant | resource kind, strategy field, workload class | Alternatives are bounded and compatibility is known | arbitrary label |
| State | spec/status split, condition, observed generation | Desired and observed state remain distinct | event history alone |
| Policy | admission policy, network policy, RBAC rule, controller policy | Policy authority and enforcement point are named | configuration value |
| Relationship | selector, service binding, owner reference, role binding | Direction, cardinality, and freshness are understood | matching label text alone |
| Boundary | namespace, cluster, network boundary, API/admission boundary | Scope or crossing behavior is enforced | naming convention |
| Context | namespace, node/zone, identity, request attributes | Placement or evaluation depends on stated circumstance | hidden platform default |
| Constraint | schema validation, admission rule, quota, topology rule | Invalid resources or placements fail at a defined layer | desired policy outcome |
| Derived view | status, condition, metrics/query, controller projection | Controller/source and freshness are visible | user-authored desired state |

## Organizational assignment

| Role | Candidate mechanisms | Condition | Not equivalent to |
|---|---|---|---|
| Pivot | accountable product/service, position, unit, program | One identity organizes work and escalation for this view | every manager title |
| Component | team, subunit, owned work package, staffed function | Membership and ownership are part-whole | stakeholder relationship |
| Capability | competency, service function, delegated authority | Ability can vary independently of reporting line | job title |
| Variant | operating model, service tier, approved procedure path | Alternatives are explicit and governed | informal preference |
| State | lifecycle/status record, readiness condition, staffing state | Identity persists while condition changes | reorganization identity |
| Policy | approved policy, decision right, delegated rule | Authority, version, and applicability are visible | unwritten habit |
| Relationship | reporting line, partnership, supplier/customer link, committee membership | Participants and responsibility are explicit | organizational ownership |
| Boundary | charter, mandate, jurisdiction, budget or service boundary | Inclusion and escalation rules are stated | org-chart box alone |
| Context | location, regulation, incident mode, customer segment | Circumstance changes applicability | permanent role |
| Constraint | law, control, separation of duties, capacity limit | Prohibition or invariant is distinguished from preference | prioritization policy |
| Derived view | report, scorecard, classification, recommendation | Source facts and decision method remain inspectable | raw observation |

## Preservation and loss

| Property | Treatment |
|---|---|
| Source role identity | Preserved only when the Factorium role annotation is retained |
| Governing question | Preserved as the condition for selecting a mechanism |
| Mechanism semantics | Preserved only within the cited target system and version |
| One-to-one correspondence | Not claimed |
| Completeness | Not claimed; each slice is a candidate mechanism vocabulary |
| Reverse mapping | Invalid without the source view, role annotation, and context |
| Target-specific constraints | Introduced by the selected paradigm and must be reviewed locally |
| Domain semantics | Not generated by this mapping |

## Selection procedure

1. Select the canonical entry, sense, and factorization view.
2. Assign source roles by their governing questions.
3. Select the target paradigm and its exact version or platform scope.
4. Choose a candidate mechanism only when its condition holds.
5. Record additional mechanisms needed for ownership, validity, policy, or
   lifecycle.
6. Record non-equivalence and information loss.
7. Test at least one expected change and one invalid case.
8. Keep unresolved choices visible in the resulting Factor Guide.

## Failure signs

- every factor becomes a subtype, trait, table, resource, or job title;
- target syntax is used to infer source semantics;
- one mechanism silently carries identity, policy, state, and constraint;
- a derived label replaces its source facts;
- a cloud or organizational convention is presented as universal;
- changing paradigms changes the claimed domain factorization;
- reverse mapping is assumed to be exact.

## Sources and provenance

1. Factorium, [Factor Role Table](../foundations/FACTOR-ROLES.md).
2. OMG, *Unified Modeling Language 2.5.1*:
   https://www.omg.org/spec/UML/2.5.1
3. The Rust Reference, types and traits:
   https://doc.rust-lang.org/reference/types.html
   https://doc.rust-lang.org/reference/items/traits.html
4. Haskell 2010 Language Report, Chapter 4:
   https://www.haskell.org/onlinereport/haskell2010/haskellch4.html
5. PostgreSQL, constraints and views:
   https://www.postgresql.org/docs/current/ddl-constraints.html
   https://www.postgresql.org/docs/current/rules-views.html
6. NIST SP 800-190, *Application Container Security Guide*:
   https://csrc.nist.gov/pubs/sp/800/190/final
7. Kubernetes documentation:
   https://kubernetes.io/docs/concepts/
   https://kubernetes.io/docs/reference/access-authn-authz/rbac/
8. U.S. Office of Personnel Management, position classification:
   https://www.opm.gov/policy-data-oversight/classification-qualifications/classifying-general-schedule-positions/

Target-system descriptions use the cited sources. Factorium assignments,
conditions, and non-equivalences remain `candidate`.

# Software Mechanism Bridge Research

Status: complete

Research question: how should Factorium canonically separate type, value,
function, module, service, resource, transaction, message, and contract while
mapping them across software paradigms without letting one language,
protocol, database, or architecture define the general concepts?

Decision supported: define Factor Forge F5 as three connected canonical
anchors with three contextual Mapping views. Keep executable relation edges
and richer contract payloads behind the already-triggered interchange
compatibility boundary.

## Findings

### FACTORIUM-SWB-01 - The existing map uses mechanism words without canonical custody

Sources:

- `tables/mappings/factor-role-mechanisms.md`
- `tables/UNRESOLVED.md`
- measured command:
  `rg -n -i "\b(type|value|function|module|service|resource|transaction|message|contract)\b" tables reference`

Observed constraint: the six-paradigm role mapping repeatedly uses all nine
terms. `message`, `service`, and `contract` were visible unresolved
candidates, while the other terms appeared as overloaded mechanism labels.

Implication: F5 has recurrence, graph centrality, and direct batch need under
the portfolio admission rule. The terms should be admitted as connected
clusters, not as nine isolated glossary pages.

Confidence: high.

### FACTORIUM-SWB-02 - Type, value, and function remain distinct even in one language

Sources:

1. The Rust Reference, "Types":
   https://doc.rust-lang.org/reference/types.html
2. The Rust Reference, "Functions":
   https://doc.rust-lang.org/reference/items/functions.html

Observed constraint: Rust states that every value has a type and that the type
defines interpretation and permitted operations. A function has parameters,
an output type, and a body, while reference to a function yields a first-class
value with a function-item type.

Implication: one anchor can connect the three concepts while preserving their
different governing questions. `Type` must not become `class`; `value` must
not become variable or bytes; `function` must not imply mathematical totality
or purity.

Confidence: high for Rust; medium-high for the cross-language synthesis.

### FACTORIUM-SWB-03 - Module boundaries are language-specific

Sources:

1. The Rust Reference, "Modules":
   https://doc.rust-lang.org/reference/items/modules.html
2. Haskell 2010 Language Report, Chapter 5:
   https://www.haskell.org/onlinereport/haskell2010/haskellch5.html

Observed constraint: Rust defines a module as a named container in a module
tree and separately specifies source-file loading. Haskell defines modules
through declarations, imports, exports, and namespace control and states that
modules are not first-class values.

Implication: Factorium should define the module question through namespace,
declarations, imports/exports, visibility, initialization, and build/version
scope. A file, directory, package, component, or deployment is only a
candidate mechanism.

Confidence: high.

### FACTORIUM-SWB-04 - Service is access to capability, not capability itself

Source: OASIS, *Reference Model for Service Oriented Architecture 1.0*,
Sections 3.1-3.3:
https://docs.oasis-open.org/soa-rm/v1.0/soa-rm.html

Observed constraint: OASIS defines a service as a mechanism enabling access
to capabilities through a prescribed interface consistent with constraints
and policies in a service description. It explicitly distinguishes the
underlying capability from the access point.

Implication: the canonical service sense requires provider, consumer,
capability, interface, description, policy, reachability, and expected
effects. Component, process, endpoint, and server remain non-equivalent.

Confidence: high within SOA scope; medium-high as a general software bridge.

### FACTORIUM-SWB-05 - Resource semantics are target-system relative

Sources:

1. RFC 9110, Sections 3.1-3.4:
   https://www.rfc-editor.org/rfc/rfc9110.html
2. Kubernetes, "Objects In Kubernetes":
   https://kubernetes.io/docs/concepts/overview/working-with-objects/

Observed constraint: HTTP calls the target of a request a resource and keeps
the resource separate from transferable representations and request/response
messages. Kubernetes objects are persistent records of intent with identity,
desired state, and observed current state under an API lifecycle.

Implication: Factorium can ask which identified subject is exposed or managed,
but every use must retain the target system's identifier, operation,
representation, state, lifecycle, and authority model. A representation,
manifest, message, cache entry, or runtime object is not universally the
resource.

Confidence: high for the cited target systems; medium for the synthesized
umbrella sense.

### FACTORIUM-SWB-06 - Transaction guarantees must be declared

Sources:

1. PostgreSQL, "Transactions":
   https://www.postgresql.org/docs/current/tutorial-transactions.html
2. PostgreSQL, "Transaction Isolation":
   https://www.postgresql.org/docs/current/transaction-iso.html

Observed constraint: PostgreSQL transaction blocks group work under atomic
commit/rollback, durability, and visibility rules. Isolation levels allow or
prevent different concurrency phenomena, and some operations have documented
special behavior.

Implication: the general transaction sense should require begin/end,
commit/abort, visibility, isolation, durability, retry, and compensation
semantics. The word `transaction` alone does not establish ACID, distributed
atomicity, or business completion.

Confidence: high for PostgreSQL; medium-high for the generalized contract.

### FACTORIUM-SWB-07 - Messages are not resources, representations, or events

Sources:

1. RFC 9110, Sections 3.1-3.4 and 6:
   https://www.rfc-editor.org/rfc/rfc9110.html
2. OASIS SOA-RM 1.0, Section 3.2.2:
   https://docs.oasis-open.org/soa-rm/v1.0/soa-rm.html
3. `tables/entries/state-event-transition-process-lifecycle.md`
4. `tables/entries/information-data-signal-noise.md`

Observed constraint: HTTP exchanges request and response messages about
target resources and may transfer representations. OASIS treats message
exchange as one service-interaction mode while allowing other modes. The
existing Factorium event sense owns occurrences independently of transport.

Implication: a message requires sender, recipient, protocol, identity,
correlation, payload, ordering, delivery, acknowledgment, and duplicate
semantics. An event can be reported by zero, one, or many messages.

Confidence: high.

### FACTORIUM-SWB-08 - Contract has structural, behavioral, and operational mechanisms

Sources:

1. ECMA-367, *Eiffel: Analysis, Design and Programming Language*:
   https://ecma-international.org/publications-and-standards/standards/ecma-367/
2. Eiffel Design by Contract tutorial:
   https://archive.eiffel.com/doc/online/eiffel50/intro/language/tutorial-09.html
3. OASIS SOA-RM 1.0, Section 3.3.2:
   https://docs.oasis-open.org/soa-rm/v1.0/soa-rm.html
4. OpenAPI Specification 3.2.0:
   https://spec.openapis.org/oas/v3.2.0.html

Observed constraint: Eiffel contracts assign client preconditions, supplier
postconditions, and class invariants. OASIS contracts express agreement on
service policies and conditions. OpenAPI normatively describes API paths,
operations, schemas, security mechanisms, and related description objects.

Implication: the canonical contract sense must ask for parties, scope,
assumptions, obligations, guarantees, constraints, errors, security, and
compatibility. Assertion clauses, service agreements, schemas, and API
documents are partial mechanisms, not definitions of the whole concept.

Confidence: high for target mechanisms; medium-high for the synthesized
contract.

### FACTORIUM-SWB-09 - Mechanism mappings must remain many-to-many

Sources:

- `tables/mappings/factor-role-mechanisms.md`
- `specs/MAPPING-TABLE-ENTRY.md`
- `context/waves/2026-08-13-factorium-vision/FACTOR-FORGE-PORTFOLIO-ROLE-REVIEW.md`

Observed constraint: one construct can serve several roles, and one canonical
concept can be realized by several constructs. Reverse inference from syntax
or platform labels is invalid without the selected view and target version.

Implication: add three Mapping views with source/target scope, direction,
cardinality, preservation/loss, conditions, and non-equivalence. Also link the
new canonical vocabulary from the existing factor-role crosswalk.

Confidence: high.

### FACTORIUM-SWB-10 - V0 can preserve this slice but not its relation payloads

Sources:

- `specs/FACTORIUM-REFERENCE-INTERCHANGE.md`
- `reference/factorium-reference-v0.factorium`
- `context/waves/2026-08-13-factorium-vision/FACTOR-FORGE-PORTFOLIO-ROLE-REVIEW.md`

Observed constraint: V0 can register stable entry, sense, factor, and view
identities and validate linked Markdown. It cannot machine-check service
provider/consumer edges, message sender/recipient edges, transaction
boundaries, or contract obligation/guarantee edges.

Implication: admit F5 in V0 and keep relation details in the Mapping bodies.
Use F5 as another requirement source for the bounded typed-relation successor
study before 50 anchors.

Confidence: high.

## Recommendations

### Adopt now

- Add three canonical anchors:
  - software type, value, and function;
  - software module, service, and resource;
  - software transaction, message, and contract.
- Add one Mapping view per anchor.
- Replace the three directly covered unresolved candidates.
- Link the new concepts from the existing cross-paradigm role mapping.

Owner: Factorium.

Validation: canonical round trip, exact generated projections, all entry
contract headings, Mapping family validation, `.roles` fixed point, tests,
links, and whitespace.

### Prototype behind a compatibility boundary

- typed provider/consumer, sender/recipient, input/output, obligation/
  guarantee, and commit/visibility edges;
- executable compatibility checks across API, message, and transaction
  versions;
- independent interchange consumer after the successor shape is bounded.

Owner: future Factorium interchange successor.

Expected validation: preserve all V0 IDs and exact Markdown authority while
proving at least F1-F5 relation queries.

### Reject or defer

- reject `type = class`, `module = file`, `service = component`,
  `resource = representation`, `message = event`, or `contract = schema`;
- reject assuming ACID, exactly-once effects, purity, or compatibility from
  labels;
- defer package, object, closure, actor, event-stream, saga, API, and schema
  as standalone anchors until recurrence or reader demand justifies them.

Non-goal: prescribe one language, architecture style, database, protocol,
broker, API format, or distributed transaction mechanism.

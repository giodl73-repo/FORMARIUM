---
skill: discover-websearch
topic: typed-relation-compatibility
date: 2026-08-14
claims_checked: 3
confirmed: 3
---

# Typed Relation Compatibility Web Evidence

## Claims to ground

| # | Claim | Source of claim | Why it needs grounding |
|---:|---|---|---|
| 1 | A small directed edge core can preserve relation identity without absorbing every domain payload. | Factorium F1-F6 pressure | A wrong core would force unrelated domains into one false schema. |
| 2 | Qualified relations and separate validation constraints are established ways to add context without changing the base graph assertion. | Candidate architecture | This determines whether qualifiers belong in the edge core or a family payload. |
| 3 | Review coverage should bind responsibility and integrity to exact artifacts rather than merely link a review filename. | FFP-008 | A stale review link must not pass after the reviewed source changes. |

## Web evidence

### Claim 1 - A small directed edge core is sufficient

- Query: `site:w3.org/TR RDF 1.2 Concepts triple subject predicate object official`
  - Source: https://www.w3.org/TR/rdf12-concepts/
  - Direct quote: "The three components ... are respectively called the subject, predicate and object."
  - Relevance: the standard graph core makes direction and relationship identity explicit.
- Query: `site:w3.org/TR json-ld11 named graph node object official`
  - Source: https://www.w3.org/TR/json-ld11/
  - Direct quote: "A graph object is much like a node object, except that it defines a named graph."
  - Relevance: an exchange serialization may project graphs without becoming the domain model.
- Verdict: **CONFIRMED**.

### Claim 2 - Qualifications and constraints can remain separate

- Query: `site:w3.org/TR prov-o derivation entity activity agent official`
  - Source: https://www.w3.org/TR/prov-o/
  - Direct quote: "Qualified classes and properties provide elaborated information about binary relations."
  - Relevance: qualification is an additive pattern for role, activity, time, and other context.
- Query: `site:w3.org/TR shacl validation graph constraints official`
  - Source: https://www.w3.org/TR/shacl12-core/
  - Direct quote: "SHACL ... is a language for describing the structure of RDF graphs."
  - Relevance: graph statements and their conformance rules can have separate owners.
- Verdict: **CONFIRMED**.

### Claim 3 - Review coverage needs attribution and integrity binding

- Query: `site:w3.org/TR prov-o qualified attribution agent responsibility official`
  - Source: https://www.w3.org/TR/prov-o/
  - Direct quote: "An Attribution is the ascribing of an entity to an agent."
  - Relevance: responsibility for a reviewed artifact is distinct from the artifact itself.
- Query: `site:spdx.github.io SPDX 3.0 external map element verified using official`
  - Source: https://spdx.github.io/spdx-spec/v3.0.1/model/Core/Classes/ExternalMap/
  - Direct quote: "The external map provides details ... how to verify its integrity."
  - Relevance: a digest-backed link prevents an external record from silently floating across revisions.
- Verdict: **CONFIRMED**.

## Findings

| # | Finding | Verdict | Source |
|---:|---|---|---|
| 1 | The base graph statement has source, relation, and target positions. | confirmed | https://www.w3.org/TR/rdf12-concepts/ |
| 2 | The predicate names the relationship rather than a display label. | confirmed | https://www.w3.org/TR/rdf12-concepts/ |
| 3 | A graph statement is directed from subject to object. | confirmed | https://www.w3.org/TR/rdf12-concepts/ |
| 4 | Graph exchange does not require Factorium to adopt an external canonical syntax. | confirmed | https://www.w3.org/TR/json-ld11/ |
| 5 | Named graph projection is available if a future consumer needs grouped edges. | confirmed | https://www.w3.org/TR/json-ld11/ |
| 6 | Direct binary relations may be elaborated through qualified relations. | confirmed | https://www.w3.org/TR/prov-o/ |
| 7 | Role is a legitimate relation qualification. | confirmed | https://www.w3.org/TR/prov-o/ |
| 8 | Activity and time may be required to make derivation precise. | confirmed | https://www.w3.org/TR/prov-dm/ |
| 9 | Entity, activity, and agent identities should not be collapsed. | confirmed | https://www.w3.org/TR/prov-o/ |
| 10 | Validation consumes a data graph and a separately owned shapes graph. | confirmed | https://www.w3.org/TR/shacl/ |
| 11 | Conformance can be reported independently of the source graph. | confirmed | https://www.w3.org/TR/shacl/ |
| 12 | Validation need not mutate the graph being checked. | confirmed | https://www.w3.org/TR/shacl/ |
| 13 | Attribution identifies responsibility for an entity. | confirmed | https://www.w3.org/TR/prov-o/ |
| 14 | External identifier mappings may carry integrity verification. | confirmed | https://spdx.github.io/spdx-spec/v3.0.1/model/Core/Classes/ExternalMap/ |
| 15 | Integrity binding is separate from a human-readable location hint. | confirmed | https://spdx.github.io/spdx-spec/v3.0.1/model/Core/Classes/ExternalMap/ |

Summary: 3 of 3 claims confirmed; 0 contradicted; 0 unconfirmed.

## Ungrounded claims

No ungrounded claims. The Factorium-specific choice of exact record grammar
remains a design decision to test locally, not a fact established by these
standards.

## Amendments

1. Test the proposed minimal edge shape against concrete F1-F6 queries before
   naming a V1 grammar.
2. Compare an exact-line sidecar with JSON and JSON-LD only as projections;
   serialization popularity is not an editorial requirement.
3. Treat a review-path-only manifest as insufficient: the prototype must bind
   canonical artifact identity, exact source digest, disposition, and review
   record.

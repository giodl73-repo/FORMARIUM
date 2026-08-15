# Typed Relation and Review Coverage Compatibility Study

Status: bounded design and representative implementation prototype complete

## Question

What is the smallest compatibility-safe addition that can answer the repeated
F1-F6 relation queries and machine-bind fixed-point reviews before Factorium
reaches 50 canonical anchors?

## Decision

Keep `factorium-reference-v0` unchanged. Prototype two deterministic sidecars:

1. a relation manifest for stable directed edges; and
2. an assurance manifest binding canonical artifacts and exact source bytes to
   fixed-point review records.

Only after both sidecars answer the acceptance queries should Factorium decide
whether to merge them into a `factorium-reference-v1` successor. JSON, JSON-LD,
RDF, and other distributions remain projections, not new canonical owners.

## Evidence basis

The local requirement sources are the F1-F6 research and reviews. External
architecture controls are recorded in
`signals/discover/websearch/typed-relation-compatibility-websearch-2026-08-14.md`:
RDF supports a minimal directed statement core, PROV demonstrates qualified
binary relations, SHACL separates graph assertions from validation shapes,
and SPDX demonstrates integrity-bound external references.

These standards inform the compatibility properties. Factorium does not claim
conformance to them and should not copy their full models.

## Concrete pressure from F1-F6

| Batch | Required machine question | Minimum edge information |
|---|---|---|
| F1 systems | What depends on a changed element, under which condition? | source, `DEPENDS-ON`, target, condition/scope |
| F2 organization | Who delegates which authority to whom, and what is retained? | source, `DELEGATES-TO`, target, authority/scope/time |
| F3 evidence | Which observation or result supports an inference or claim? | source, `DERIVED-FROM` or `SUPPORTS`, target, method/scope |
| F4 control | Which indicator, decision, intervention, and feedback path form a loop? | directed stage edges, condition, delay/sign where applicable |
| F5 software | Who provides/consumes, sends/receives, or owes/guarantees what? | directed endpoints, relation kind, target-system scope |
| F6 governance | Which source creates an obligation and which control/evidence discharges it? | directed trace edges, applicability/version/time |

## Candidate relation sidecar

The prototype should test this conceptual record, without freezing its textual
grammar yet:

| Field | Requirement |
|---|---|
| edge ID | stable identifier so qualifications and review can target the edge |
| kind | controlled Factorium relationship identifier |
| source | qualified canonical entry, sense, factor, or view ID |
| target | qualified canonical ID, versioned external reference, or visible unresolved candidate |
| scope | bounded domain, target system, jurisdiction, or view in which the edge holds |
| qualifiers | ordered typed values only where the relation kind requires them |
| source path | Markdown owner of meaning, limitations, and provenance |

The shared core must not pretend that condition, authority, time, delay,
confidence, applicability, cardinality, and compatibility mean the same thing.
Each relation kind therefore owns a small qualifier contract. Unknown or
irrelevant qualifiers are absent, not empty universal columns.

## Candidate assurance sidecar

Each admitted R5 entry, view, and relation edge should bind:

- canonical artifact kind and ID;
- exact SHA-256 of the artifact's Markdown source bytes;
- fixed-point review record path;
- review status and date;
- explicit applicability when one review covers several IDs.

Validation must fail when an artifact has no applicable fixed-point review,
the source digest changes, the review path is missing, or the review record
does not declare closure of critical and major findings. A digest mismatch
means “review required,” not “content invalid.” Founding immutable evidence
packets retain their existing custody and are outside this manifest.

## Compatibility rules

1. All published V0 entry, sense, factor, and view IDs remain byte-for-byte
   stable.
2. V0 parsing, serialization, catalogs, and unresolved reports remain green.
3. Sidecars reference V0 IDs; they do not duplicate titles, summaries, or
   publication prose.
4. Deleting or reversing a relation is a reviewed semantic change.
5. A relation kind has one declared inverse policy: exact inverse, distinct
   inverse kind, or no safe inverse.
6. Cycles are allowed only where the relation contract permits them; no global
   DAG claim is introduced.
7. External serializations are deterministic projections from the canonical
   manifests.

## Acceptance queries

The prototype is successful only if it can answer all of these without
parsing Markdown prose:

1. list transitive or immediate dependents of a selected F1 element while
   preserving edge direction and scope;
2. trace an F2 delegation without losing retained responsibility;
3. trace an F3 claim to source, method, observation, measurement result, and
   inference;
4. walk an F4 control chain and distinguish feedback from outcome;
5. list F5 provider/consumer, sender/recipient, and obligation/guarantee edges
   without inferring equivalence from mechanism names;
6. identify F6 controls and evidence affected by an obligation-version change;
7. report every R5 canonical ID whose review is absent or stale.

## Rejected alternatives

- **Expand V0 in place:** rejected because existing canonical bytes and parser
  identity would change without a migration boundary.
- **One generic `RELATED-TO` edge:** rejected because it cannot answer the
  directional impact and trace queries that triggered the study.
- **One universal qualifier table:** rejected because domain-specific fields
  would acquire false cross-domain semantics.
- **Review filenames without digests:** rejected because edits after review
  would remain machine-indistinguishable from reviewed content.
- **Adopt RDF or JSON-LD as authority now:** rejected because external graph
  exchange does not justify displacing the compact reference owner.

## Prototype result

The deterministic prototype is specified at
`specs/FACTORIUM-REFERENCE-SIDECARS.md`. It implements one relation template
per F1-F6 batch, eighteen review bindings, canonical round trips, referential
integrity, exact-source digest checks, stale-review rejection, and seven
representative checks through `reference-sidecar-check`.

The result supports continuing the sidecar experiment. It does not close
full-corpus typed-relation or review-coverage gates. Do not migrate the full
corpus or name V1 until broader fixtures prove that the relation kinds and
qualifiers remain stable.

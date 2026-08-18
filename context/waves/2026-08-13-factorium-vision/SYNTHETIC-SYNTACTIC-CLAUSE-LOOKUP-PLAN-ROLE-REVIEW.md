# Synthetic Syntactic Clause Lookup Plan — Role Review

Date: 2026-08-17

Artifact: `SYNTHETIC-SYNTACTIC-CLAUSE-LOOKUP-PLAN.md`

Decision: approve the frozen experiment; implementation remains conditional
on every admission gate.

## Experimental Methodologist

- P3: Rules, tasks, intended paths, comparison, and thresholds are frozen before scoring.
- P3: Unsplittable or weak fragments remain failures; there is no authored fallback.
- P3: The exact SUJ-06 dual-query result is retained as the conventional control.

## Data-Split and Leakage Auditor

- P3: The splitter cannot read intended titles, search results, or prior task outcomes.
- P3: Delimiters and stopwords are fixed across all ten assignments, not tuned per task.
- P3: All ten assignments are retained, including the known status/checkout miss.

## Compositional Semantics Steward

- P3: A clause is explicitly a text fragment, not a factor, sense, or graph node.
- P3: Identity union is untyped and makes no claim about how results compose.
- P3: Semantic decomposition, relation selection, closure, and evaluation remain prohibited.

## Representation-Control Auditor

- P3: The control uses unchanged literal token search and existing ownership grouping.
- P3: No learned representation, ontology expansion, synonym list, or proprietary model is introduced.
- P3: Incremental value is measured against the frozen dual-query union, not an easier control.

## Reference Lexicographer

- P3: Each clause preserves source wording and visible provenance.
- P3: Canonical family ownership still supplies deduplication; the helper creates no headword.
- P3: A match is exposure only and cannot be reported as lexical equivalence or relevance.

## Reference Architecture Editor

- P3: Tables and books remain primary; the candidate is optional navigation only.
- P3: No canonical source, schema, relation vocabulary, or authority boundary changes.
- P3: Failure stops interface work and therefore cannot create an unsupported edition fork.

## Evidence and Claims Editor

- P3: Report counts as deterministic dependent evidence, never participant behavior.
- P3: Do not use “understands,” “extracts concepts,” or “decomposes meaning” in claims.
- P3: Preserve task-level failures and exact custody alongside aggregate counts.

## Reference Practitioner

- P3: The helper earns interface cost only if it fixes the actual remaining miss.
- P3: If admitted, clauses must be visible and editable before search.
- P3: Separate rankings and an explicit non-merge label are required to avoid false precision.

## Product Owner

- P3: Perfect two-family coverage plus four repeated gains is a deliberately high value gate.
- P3: One clever recovery without recurrence does not justify another homepage control.
- P3: Stop on any failed gate; external-reader questions stay deferred until readers exist.

## Verdict

PASS for execution, with zero P1/P2 findings. This is permission to run the
frozen test, not permission to ship the candidate or claim semantic behavior.

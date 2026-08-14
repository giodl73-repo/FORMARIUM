# Factorium Vision

## North star

Factorium exists to leave behind a new kind of reference work: an encyclopedia
of ways to decompose problems.

Its primary deliverable is not software, a model, or a benchmark. It is a
book—or family of books—that a practitioner can consult like a dictionary,
thesaurus, engineering handbook, or table of logarithms. A reader should be
able to look up a concept, recognize the relevant sense, compare several
plausible factorizations, and carry a useful structure back into their work.

> **Factorium: tables for the structure of things.**

## Deliverable hierarchy

1. **Factorium books and Factor Tables** are the enduring product.
2. **Factor Guides** narrow the tables for a particular problem or domain.
3. **Evidence and reviews** explain provenance, limitations, and maturity.
4. **Software** helps construct, search, compare, and publish the reference.
5. **Experiments and code** test methods and preserve reproducible examples.

Lower layers support the layers above them. They must not displace the
reference work as the reason Factorium exists.

## What belongs in the reference

Factorium collects reusable decomposition knowledge:

- candidate factors and dimensions;
- competing pivots and organizing axes;
- structural roles such as capability, component, variant, state, policy,
  relationship, boundary, context, constraint, and derived view;
- alternative senses of a word or problem;
- alternative factorizations of the same sense;
- mappings from general factor roles into particular mechanisms such as OO
  inheritance, Rust traits and enums, database keys and relations, cloud
  boundaries, or organizational structures;
- characteristic dependencies, invalid combinations, and failure patterns;
- major sourced formulas, identities, laws, balances, models, estimators, and
  algorithms with symbols, units, dimensions, assumptions, and validity
  boundaries;
- examples, counterexamples, cross-references, provenance, and maturity.

The reference does not promise one universal factorization. It makes the
choice space legible.

Formula Tables are specialized Factor Tables. They preserve mathematical
operator semantics and distinguish definitions, identities, laws, empirical
relations, estimators, and algorithms. Factorium adds conceptual navigation
around an equation; it does not derive or supersede the equation's domain
authority.

Factorium also supports a bounded family of specialized table views:
Reference Value, Mapping, Decision, Transition, Constraint, Procedure,
Diagnostic, Scale, and Evidence Tables. These answer different lookup
questions while retaining one canonical entry, sense, source, maturity, and
relationship graph. Specialized views extend Factorium's utility; they do not
turn it into an arbitrary collection of tables.

## Editorial form

Factorium is table-first, not essay-first.

Each entry uses a hybrid form:

1. a headword;
2. a short orientation paragraph;
3. one or more senses, each with a one-line tagline;
4. a table of competing factorizations;
5. compact constraints, failure signs, and cross-references;
6. provenance and maturity.

The orientation explains only enough to select the right table. Extended
theory, history, and argument belong in linked essays or appendices.

This preserves the scanability of a dictionary while retaining enough
exposition to prevent lists from becoming arbitrary or misleading.

## The Factorium distinction

A thesaurus usually offers alternative words. Factorium offers alternative
structures.

A dictionary separates meanings. Factorium also separates:

- different senses of one headword;
- different decompositions of the same sense;
- different assignments of the same factors to available mechanisms.

For example, a software design may identify mechanism, jurisdiction, state,
policy, and ownership as factors. Classical OO may privilege mechanism in a
single-inheritance hierarchy; Rust may express capabilities as traits, closed
variants as enums, policies as generics, and state through composition. The
factor roles remain comparable even when their implementation assignments
differ.

## Reader promise

A useful entry should let a reader:

- find a relevant sense quickly;
- see several credible factorizations rather than one unexplained answer;
- identify the primary pivot and the supporting factor roles;
- understand when each alternative is useful;
- notice coupling, missing dimensions, invalid combinations, or subclass-like
  explosions;
- follow cross-references into nearby patterns;
- distinguish established practice from a candidate or disputed analysis.

## Books and volumes

The exact volume structure will evolve, but likely families include:

- structural roles and decomposition methods;
- software and information systems;
- organizations, governance, and operations;
- language, concepts, and semantic analysis;
- scientific and engineering models;
- diagnostics, anti-patterns, and factor-quality tests.

Entries may appear in more than one reading path through cross-references, but
each canonical entry has one stable identity and revision history.

Every word or phrase used as a factor in a published table resolves to another
entry, an external versioned reference, or a visible unresolved candidate.
Books show convenient hierarchies, while the maintained reference is a typed
graph: shared factors can participate in many composites, and readers can move
from broad fields to senses, decompositions, mechanisms, or instances.

The provisional scale is:

- 25–50 entries for the editorial pilot;
- about 250 entries for the first substantial volume;
- about 1,000 canonical headwords for the core multi-volume reference;
- 3,000–5,000 only as a mature reviewed collection.

Factorium is therefore smaller than a general dictionary or encyclopedia. Its
headwords are reusable decomposition-bearing concepts and situations, not
every word or named entity.

## Software's role

Software may:

- search Factor Tables;
- ingest examples, names, constraints, and expected changes;
- propose candidate dimensions and competing pivots;
- narrow general tables into a Factor Guide;
- compare merges, splits, and mechanism assignments;
- detect dependencies, invalid combinations, and unexplained exceptions;
- manage citations, reviews, maturity, and publication.

Software must expose alternatives and uncertainty. It must not turn a plausible
AI suggestion into an authoritative factorization without review.

## Founding evidence

The repository began as FACTOR, a semantic-representation research project.
Its Rust schemas, generated corpora, controls, role/ambiguity experiments, and
portable packets remain valuable founding evidence. They demonstrate the
discipline of explicit factors, constraints, competing representations,
counterexamples, and reproducible custody.

They do not prove the broader encyclopedia. Factorium preserves them as one
tested domain and as methodological infrastructure.

## Success

Factorium succeeds when its books become a practical reference: something
people consult while naming systems, designing class hierarchies, choosing
database keys, defining cloud boundaries, structuring organizations, modeling
domains, or clarifying concepts.

The durable measure is not how much software exists. It is whether the
reference helps people see better decompositions than they could see before.

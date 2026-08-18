# Pointer Entries

Status: internal simulation contract
Date: 2026-08-18

## Purpose

A Pointer Entry is a generated concordance for a reviewed structural label that
appears inside selected Factorium factorizations. It lets a reader click a leaf
such as `actor`, inspect every admitted structural occurrence, and return to
the authored owning records without pretending that the leaf already has a
canonical definition.

## Identity and authority

Pointer routes use `pointers/<slug>.html`. Their identities are edition-local
and must not be used as canonical entry IDs, sense IDs, factor IDs, relation
endpoints, or interchange references. Repository Markdown and versioned
Factorium reference records remain authoritative.

The four publication classes are:

1. canonical entry — authored senses and primary factorizations;
2. specialized view — authored question-specific projection owned by an entry;
3. pointer entry — generated concordance over explicitly admitted labels; and
4. unresolved term — text without enough reviewed identity for a pointer.

## Admission

A label is clickable only when it appears once in the edition's explicit
pointer registry. Registry labels are lowercase reusable concepts, not proper
names, examples, products, people, places, standards, or open-ended taxa. Each
row supplies a stable slug, display label, and bounded orientation cue.

Occurrence collection is fail-closed:

- scan only selected Table records;
- inspect rendered `code` elements, where structural labels are declared;
- match the registry label as an exact case-insensitive token sequence;
- retain every distinct matching code expression and owning source page;
- do not stem, singularize, expand aliases, infer synonyms, or search prose;
- require at least one occurrence for every registered label; and
- preserve the original expression and link back to the owning record.

## Registry composition

A full registry uses the `factorium-pointer-registry-v0` envelope. A bounded
successor may instead use `factorium-pointer-registry-delta-v0`, followed by
one `extends proof-set-pointer-registry-vN.factorium` row and additional
pointer rows. Extension is restricted to a registry file in the same
directory. Missing bases, inheritance cycles, duplicate slugs or labels, an
unexpected final count, and zero-use rows fail the render.

Delta registries are publication-edition composition only. They do not create
inheritance among concepts or canonical identities.

## Page contract

Every Pointer Entry shows its status, orientation cue, occurrence and owner
counts, exact structural expressions grouped by owning record, source path,
and links back to those records. It must state that frequency is not
importance, one spelling is not one sense, and co-occurrence is not a semantic
relation.

`terms.html` lists every admitted pointer and its counts. Pointer pages do not
join the canonical Tables A-Z count, chapter sequence, Factorium interchange,
or canonical-family search grouping.

## Promotion

A pointer may be proposed for canonical promotion only through ordinary entry
research and role review. Repetition alone is insufficient. Promotion requires
stable senses, governing distinctions, a defensible owner, source support, and
a reason the canonical page reduces recurring reader work.

# Two-Book Product Architecture Role Review

Status: fixed-point result reviewed

Date: 2026-08-17

Skill review:
`signals/roles/check/two-book-product-architecture-roles-check-2026-08-17.md`

## Product value contract

| Field | Decision |
|---|---|
| Reader | A lookup-oriented practitioner and a method-learning practitioner, which may be the same person at different moments |
| Job | Either find and distinguish a concept directly, or learn how to apply several concepts to a bounded question |
| Current friction | `sim-30` places a Reader-like route in front of a site whose canonical Tables, thesaurus behavior, and worked guides are mixed together |
| Product change | Name Factorium Tables and The Factorium Reader as separate books over one authority; make the site offer both starts explicitly |
| Evidence now | Architecture consistency, exact routing, authority labels, generated counts, identity regression, and browser mechanics |
| Evidence later | Human lookup success, thesaurus usefulness, teaching comprehension, preference, application value, accessibility, and return use |
| Cost and displacement | One product spec and one new front-door projection; no content, relation, schema, builder, or release-gate expansion |
| Continue/merge/stop | Proceed with `sim-31`; stop if the split duplicates authority or buries direct lookup |

## Admission conditions

- Tables appear first and are explicitly the primary dictionary/thesaurus;
- Reader is explicitly a companion teaching projection, not canonical source;
- Guides remain bounded applications rather than a third authority;
- search and browse are direct Tables starts; the 24-record route remains a
  Reader start with all 151 depth records available;
- canonical counts and source selection do not change;
- `sim-30` reproduces exactly;
- desktop and narrow-screen routes expose both books without overflow;
- no external-reader or publication claim is admitted;
- fixed-point Product Owner decision.

## Result review

All fourteen P2 conditions are closed. `sim-31` presents two equal-sized but
hierarchically explicit book cards: Factorium Tables appears first as the
primary dictionary/thesaurus, with direct Search and Browse actions; The
Factorium Reader appears second as a selected teaching companion, with direct
Reader and worked-question actions. The authority statement places Factor
Guides beneath both as bounded applications.

The Reader introduction retains the 24-record teaching spine, 151-record depth
handoff, six-field brief, non-universal order, and exact links. Its quickstart
is projected under the Reader name in sim-31 without changing the frozen
sim-30 source artifact. Tables/Reader navigation persists on generated pages.

Static and live Edge checks verify two books, Tables-first DOM and visual
order, two direct actions per book, six Reader fields, two-column desktop and
stacked 390-pixel layouts, no horizontal overflow, 175 canonical records, 185
search records, 217 sources, 237 pages, and zero missing targets. `sim-30`
reproduces exactly with site identity
`651ce6faf5bd95ce00da918e6d917c3e305e654ccd76e03fd68f7ba55dead820`
and standalone SHA-256
`c965a8d608ddbceca8559258f4e65c0c6f9c08218dea3cdb6a5f94c00626fd28`.

Product Owner decision: **continue with the two-book model and stop mixed-book
naming**. The next investment belongs to the Tables' dictionary/thesaurus
projection or the Reader's separately owned teaching flow only when a concrete
reader job warrants it. No completeness, lookup-success, teaching-
effectiveness, external-preview, or publication claim is admitted.

# Two-Book Product Architecture Role Review

Status: plan reviewed; implementation pending

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

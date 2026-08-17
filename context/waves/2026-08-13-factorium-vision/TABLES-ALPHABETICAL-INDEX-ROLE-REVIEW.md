# Tables Alphabetical Index Role Review

Status: fixed-point result reviewed

Date: 2026-08-17

Skill review:
`signals/roles/check/tables-alphabetical-index-roles-check-2026-08-17.md`

## Product value contract

| Field | Decision |
|---|---|
| Reader | A practitioner browsing Factorium Tables with an approximate headword in mind |
| Job | Scan canonical concepts by title and open the owning Table without traversing the Reader sequence |
| Current friction | Browse the Tables currently exposes 18 ordered book parts containing entries, views, Guides, and Reader material |
| Product change | Add a dedicated canonical-first Tables A-Z page in `sim-35`; retain book parts as Contents |
| Evidence now | Exact class coverage, sort, owner counts, route integrity, responsive mechanics, and regression |
| Evidence later | Findability, preferred ordering, scan speed, comprehension, accessibility, and return use |
| Cost and displacement | One generated index page and route labels; no canonical, relation, content, search, or builder expansion |
| Continue/merge/stop | Proceed with exact A-Z browse; stop before semantic clusters, facets, or recommendations |

## Admission conditions

- 53 canonical entry families appear once under 17 occupied letters;
- their exact owned-view counts sum to 95;
- 27 curated records appear once in a separate section;
- nine Guides, one Reader record, and all specialized views are excluded as
  top-level index rows;
- normalized title order, letter anchors, and local links are deterministic;
- Browse Tables targets the new route while Contents keeps the chapter route;
- no alphabetical semantic or completeness claim is admitted;
- `sim-34` reproduces exactly and `sim-35` has zero missing targets;
- fixed-point Product Owner decision.

## Result review

All fourteen P2 conditions are closed. `sim-35` adds one dedicated
`tables.html` route. Its primary A-Z index contains all 53 canonical entry
families exactly once under 17 occupied letters. Each row links the selected
entry and gives its domain and exact owned-view count; those counts sum to all
95 specialized views without promoting views to headwords.

A separate section contains all 27 curated Table records. Static checks prove
that 95 specialized views, nine Factor Guides, and one Reader record do not
enter either top-level index class. Browse Tables now targets the A-Z route;
Index persists in navigation; Contents retains the existing eighteen-part
Reader and guided-use route.

Static and live Edge checks verify normalized title order, exact membership,
letter anchors, owned-view counts, route separation, local destinations,
two-column desktop presentation, and a one-column 390-pixel layout without
overflow. The edition retains 217 sources, 175 canonical records, 185 search
records, eighteen chapters, and adds one page for 238 total with zero missing
targets. `sim-34` reproduces exactly with site identity
`dce87b6cfb93cc74a33b24f577a84307d02ced97a01b9c3347c1b8579b484d8e`
and standalone SHA-256
`60d3bb5396969f025f99e64d13d377793f9a0c93510276797c3c81304a209392`.

Product Owner decision: **continue with canonical-first A-Z browse and stop
before semantic clusters, facets, or recommendations**. Human findability and
preferred ordering remain untested.

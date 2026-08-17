# Tables Canonical-Family Search Role Review

Status: plan reviewed; implementation pending

Date: 2026-08-17

Skill review:
`signals/roles/check/tables-canonical-family-search-roles-check-2026-08-17.md`

## Product value contract

| Field | Decision |
|---|---|
| Reader | A practitioner searching Factorium Tables who encounters canonical entries and specialized views together |
| Job | Understand which canonical concept owns a matching specialized distinction before choosing what to open |
| Current friction | Search returns an undifferentiated ranked list; ownership appears only after opening a specialized page |
| Product change | Default to exact canonical-family result groups in `sim-33`, with an All records alternative |
| Evidence now | Exact ownership, lossless grouping, filter/ranking preservation, URL state, regression, and responsive mechanics |
| Evidence later | Findability, preferred mode, time-to-choice, comprehension, relevance quality, and return use |
| Cost and displacement | One edition-local search projection and style extension; no canonical, relation, content, or builder change |
| Continue/merge/stop | Proceed with exact ownership grouping; stop before semantic grouping, query expansion, or Composition execution |

## Admission conditions

- all 95 specialized views map to exact selected owners;
- family mode partitions matched records without loss or duplication;
- query, kind, and domain filters execute before grouping;
- owner headings are context and do not inflate matched-record counts;
- curated records and Guides remain labelled standalone groups;
- All records preserves the existing flat ranking;
- URL state admits only `families` and `records`;
- no hierarchy, relatedness, equivalence, closure, or query-expansion claim;
- `sim-32` reproduces exactly and `sim-33` has zero missing targets;
- fixed-point Product Owner decision.

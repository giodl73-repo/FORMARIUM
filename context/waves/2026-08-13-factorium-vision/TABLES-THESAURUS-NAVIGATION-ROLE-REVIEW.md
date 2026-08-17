# Tables Thesaurus Navigation Role Review

Status: plan reviewed; implementation pending

Date: 2026-08-17

Skill review:
`signals/roles/check/tables-thesaurus-navigation-roles-check-2026-08-17.md`

## Product value contract

| Field | Decision |
|---|---|
| Reader | A practitioner who has opened one Factorium Table and wants the next relevant distinction or owning context |
| Job | Identify what kind of Table this is, reach its owner, compare authored contrasts, follow authored connections, or return to lookup |
| Current friction | Cross-references and Contrast tables are usually near the bottom; specialized views do not present their canonical owner as an immediate navigation choice |
| Product change | Add one generated Explore-this-Table navigator to selected Table pages in `sim-32` |
| Evidence now | Exact ownership, section extraction, local link integrity, coverage counts, regression, and responsive browser mechanics |
| Evidence later | Human findability, relation interpretation, thesaurus usefulness, comprehension, preference, and return use |
| Cost and displacement | One generated projection and CSS asset; no entry, relation, sidecar, schema, or content expansion |
| Continue/merge/stop | Proceed with untyped authored navigation; stop before inferred or typed semantic relations |

## Admission conditions

- every selected Table page gets one navigator without copying definitions;
- all specialized views link to exact canonical owners from reference data;
- Contrast and Cross-reference routes appear only when authored sections exist;
- displayed authored connections come only from the Cross-references section;
- untyped links explicitly disclaim synonym, hierarchy, and closure meaning;
- Search/Browse remain available on every Table;
- sim-31 reproduces exactly and sim-32 has zero missing targets;
- no human lookup or thesaurus-quality claim is admitted;
- fixed-point Product Owner decision.

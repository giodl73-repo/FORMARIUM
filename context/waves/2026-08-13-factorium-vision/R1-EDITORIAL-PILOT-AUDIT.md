# R1 Editorial Pilot Gate Audit

Status: passed

Audit date: 2026-08-14

## Gate result

Roadmap milestone R1 is complete. The editorial pilot now has enough
cross-domain and table-family variation to expose the required fields for R2
interchange design.

## Measured corpus

Canonical entry records:

| Entry class | Count |
|---|---:|
| Anchor entries | 20 |
| Root coordinates | 12 |
| Factor-role entries | 6 |
| Prime entries | 8 |
| Composite entries | 1 |
| **Total canonical records** | **47** |

Supporting views:

| View class | Count |
|---|---:|
| Formula | 20 |
| Mapping | 2 |
| Decision | 1 |
| Transition | 1 |
| Constraint | 1 |
| Procedure | 1 |
| Diagnostic | 1 |
| Scale | 1 |
| Reference Value | 1 |
| Evidence | 1 |
| **Total specialized views** | **30** |

All 30 specialized views explicitly declare exactly one primary family.
Factor Tables are represented by canonical anchors, foundations, examples,
primes, and composites rather than a separate sibling directory.

## Domain balance

The 20 anchor entries include:

- thirteen quantity, science, information, and economic clusters;
- three direct structural breadth anchors:
  identity/versioning, state/lifecycle, and policy/decision;
- four editorial/reference-method anchors:
  publication, factorization quality, physical constants, and claim/evidence.

The canonical graph also contains software, security, deployment, retention,
incident, prioritization, root-coordinate, factor-role, and access-control
entries. The pilot is no longer confined to one scientific or software
domain.

## Gate matrix

| R1 requirement | Evidence | Result |
|---|---|---|
| 25-50 reviewed canonical entries | 47 anchor/root/role/prime/composite records | pass |
| No concentration in one domain | scientific, economic, information, identity, process, policy, editorial, software, security, and governance coverage | pass |
| Stable headword and separated senses | all 20 anchor entries have explicit status and sense/selection structure | pass |
| Provenance and maturity | all anchors retain status and source custody | pass |
| Failure signs | all substantial anchors include constraints/failure signs | pass |
| Graph-resolving cross-references | repository-wide local Markdown-link validation | pass |
| One primary family per specialized view | 30 declarations across 30 views | pass |
| Three non-scientific structural anchors | identity/versioning, state/lifecycle, policy/decision | pass |
| All eleven table families piloted | Factor, Formula, Value, Mapping, Decision, Transition, Constraint, Procedure, Diagnostic, Scale, Evidence | pass |
| No open critical or major role findings | fixed-point reviews for every new cluster and family checkpoint | pass |

## Validation commands

```powershell
python C:\src\tracker\repos\standards-protocols\roles\tools\check_roles.py .
git diff --check

Get-ChildItem tables -Recurse -File -Filter *.md |
  Select-String -Pattern '^Primary family:'
```

A repository-wide local Markdown-link walk checks every relative target.

## R2 input

The pilots expose these common interchange requirements:

- stable entry, sense, and view identifiers;
- one primary family per view;
- headwords, aliases, maturity, and status;
- governing question, purpose, scope, and exclusions;
- typed symbols, factors, relations, and cross-references;
- source identity, authority, version, access date, and confidence;
- unresolved candidates;
- family-specific rows without duplicating canonical definitions;
- deterministic projections and integrity reports.

R2 should encode the smallest shared core and retain family-specific payloads
behind typed view records. It should not attempt to normalize all prose or
replace Markdown as the publication form.


# Control Target, Actuation, and Service Objective Role Review

Status: fixed point for candidate publication

## Scope

- `docs/research/2026-08-15-control-target-actuation-service-objective.md`
- `tables/entries/control-monitoring-response.md`
- `tables/diagnostics/control-response-failures.md`
- canonical interchange, assurance, existing Factor Forge task, and book projection

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| CTA-001 | major | Objective, set point, threshold, and observation could collapse into one target field. | Closed: their desired-result, loop-reference, classification-boundary, and measured-state roles remain distinct. |
| CTA-002 | major | Controller output could be treated as actuator or process success. | Closed: command, actuator response, manipulated influence, and process response remain traceable. |
| CTA-003 | major | Actuator catalogs could displace the reusable mechanism role. | Closed: named devices remain examples under interface, limits, dynamics, and failure factors. |
| CTA-004 | major | An SLO could omit its service, eligible population, SLI, or window. | Closed: the complete measurement and objective contract is required. |
| CTA-005 | major | SLO target and observed service level could collapse. | Closed: desired and achieved values remain separate. |
| CTA-006 | major | An SLO could be treated as an SLA or breach determination. | Closed: agreements retain parties, authority, obligations, and consequences. |
| CTA-007 | major | Aggregate compliance could certify every user outcome. | Closed: segment, journey, tail, correctness, safety, and other outcome gaps remain visible. |
| CTA-008 | major | Raw loop and service evidence could be replaced by status summaries. | Closed: commands, telemetry, events, counts, versions, and exclusions are preserved. |
| CTA-009 | major | The revision could create a duplicate view or chapter. | Closed: it deepens the existing anchor, Diagnostic view, Task K, and Part VI route. |
| CTA-010 | major | Source vocabulary could be promoted into safety or contractual guidance. | Closed: NIST and Google scopes and the candidate claim boundary remain explicit. |

All 13 selected roles pass after amendments; no critical or major actionable
finding remains open for candidate publication.

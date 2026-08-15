# Stock-Flow Balance Failure Diagnostic

Status: candidate Diagnostic Table

Primary family: Diagnostic Table

Canonical headword: [Stock, Flow, Accumulation, Balance, and Conservation](../entries/stock-flow-balance.md)

Canonical senses: `stock`, `flow`, `accumulation`, `balance`, `conservation`

## Governing question

Which property, boundary, timing, classification, unit, netting, uncertainty,
or conservation defect could explain a balance that does not reconcile—or
reconciles for the wrong reason—and what test would discriminate it?

## Diagnostic table

| Observation | Candidate causes | Discriminating test | Likely repair owner |
|---|---|---|---|
| Opening plus recorded changes does not equal closing stock | omitted path; timing mismatch; wrong opening/closing snapshot; correction absent; component error | align property, boundary, instants, interval, signs, and units; compute each component residual with uncertainty | account or system owner |
| Balance closes only after adding an unexplained plug | omitted physical/operational term; accumulated measurement error; model mismatch; deliberate balancing entry | compare plug with propagated uncertainty and independently estimate candidate omitted terms | evidence and reconciliation owner |
| Stock appears to change without any flow | reclassification; valuation; correction; observation coverage change; hidden generation/consumption | compare physical identity and quantity with classification, valuation, and data-pipeline revisions | domain and data owners |
| High throughput is reported as high inventory or capacity | amount/rate confusion; interval omitted; capacity substituted for contents | audit dimensions and compare stock at an instant, interval total, rate, and maximum capacity | metric owner |
| Summed compartments exceed the whole | internal transfers counted as external; overlapping membership; duplicate identity; inconsistent consolidation | construct the compartment membership and transfer matrix before consolidation | model and identity owners |
| Net flow is near zero while operations are intense | large opposing gross flows cancelled; reporting interval too coarse | expose gross inflows/outflows and inspect shorter intervals and directional paths | reporting owner |
| “Steady state” system drifts over longer periods | tolerance too loose; interval too short; slow storage omitted; periodic behavior averaged away | test accumulation across multiple windows and include slow or hidden stocks | system and monitoring owners |
| Conserved quantity appears to be created or destroyed | boundary transfer omitted; wrong property; transformation misunderstood; approximation fails; measurement error | restate conservation domain, enumerate surface transfers and transformations, and test independent measurements | domain method owner |
| Balanced account conflicts with observed reality | fabricated or imputed term; common-mode measurement bias; wrong boundary; circular derivation | trace independent custody for every term and compare against external observations | evidence and assurance owners |
| Two valid reports show different balances | different boundary, interval, valuation, gross/net, consolidation, or correction policy | normalize contracts without overwriting either source report | report owners and reviewer |

## Use contract

1. Freeze the exact counted property, system, compartments, boundary,
   endpoints, interval, and version.
2. Preserve opening and closing stocks plus gross directional changes before
   calculating net values.
3. Separate transfers, generation/consumption, transformation,
   reclassification, valuation, correction, and observation change.
4. Verify quantity kinds, units, time bases, directions, and sign convention.
5. Compute the residual and its component uncertainty without naming the
   residual as a physical mechanism.
6. Test the smallest competing explanation: missing path, timing, identity,
   unit, consolidation, model, or measurement defect.
7. Repair the owning term or contract, then rerun both closure and independent
   reality checks.

## Failure signs

- `balance` means whatever number makes the equation close;
- opening and closing stocks use different inclusion or valuation rules;
- rates and interval totals are added directly;
- the same internal transfer is counted as an external inflow and outflow;
- gross opposing flows disappear behind one net number;
- steady state is used to mean empty, inactive, closed, or at equilibrium;
- an accounting identity is cited as proof of physical conservation;
- a nonzero residual is automatically labeled loss, leak, fraud, or creation;
- zero residual is treated as proof that every term is true;
- uncertainty and unsupported components disappear from the conclusion.

## Sources and provenance

1. [Stock-flow-balance research note](../../docs/research/2026-08-15-stock-flow-balance.md)
2. U.S. Geological Survey, “Water-budget methods”:
   https://www.usgs.gov/publications/water-budget-methods
3. U.S. Geological Survey, Water-Budget Residual:
   https://pubs.usgs.gov/sir/2009/5004/section5.html
4. NASA, GFSSP Version 6 User Manual:
   https://www.nasa.gov/wp-content/uploads/2024/04/gfssp-v6-usermanual.pdf

This diagnostic organizes failure isolation; it does not certify accounting,
physical conservation, hydrologic closure, financial custody, inventory
accuracy, or control effectiveness.

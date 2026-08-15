# Stock, Flow, Accumulation, Balance, and Conservation

Status: candidate anchor entry

## Orientation

A stock is an amount or state quantity attributed to a bounded subject at a
specified instant. A flow is a transfer across a boundary or a change assigned
to a period; it may be reported as an interval total or a rate. Accumulation is
the change in stock produced by net flows and other admitted changes. A balance
reconciles opening stock, categorized changes, and closing stock. Conservation
adds a domain constraint that a named property cannot be created or destroyed
under the stated model. Equal arithmetic does not by itself establish that
constraint.

## Sense table

| Sense | Governing question | Role |
|---|---|---|
| `stock` | How much of the named property is attributed inside the selected boundary at this instant? | point-in-time amount or state quantity |
| `flow` | What transfer crosses the boundary, or what change is assigned to the interval, with which direction and time basis? | boundary transfer or period change |
| `accumulation` | How did the stock change over the interval or per unit time? | stock change or change rate |
| `balance` | Do opening stock and classified changes reconcile with closing stock under one basis? | accounting or continuity relation |
| `conservation` | Which named property is constrained against creation or destruction, under what domain and transformations? | domain law or invariant constraint |

## Chain view

```text
opening stock at t_0
  + inbound transfers
  - outbound transfers
  + admitted internal generation or other additions
  - admitted internal consumption or other removals
  +/- reclassification, valuation, correction, or modeled changes
  = closing stock at t_1

net admitted change = accumulation over [t_0, t_1]

conservation constraint
  -- when applicable to the named property --> forbids internal creation/destruction
  -- but still permits --> boundary transfer, storage change, and transformation
```

## Root factorization

```text
stock-flow-balance-use
  := exact question and decision use
   x counted property, entity class, or state quantity
   x system, subject, compartments, and boundary
   x opening instant, closing instant, interval, and resolution
   x stock identity, measurement basis, and unit
   x flow path, source, destination, direction, and sign
   x interval total, average rate, or instantaneous rate
   x internal generation, consumption, transformation, and reclassification
   x gross, net, consolidated, and internal-transfer policy
   x accumulation and steady-state criterion
   x conservation law, invariant, or accounting authority
   x residual, uncertainty, omissions, and reconciliation status
   x provenance, version, revision, and supersession
```

## Candidate factorizations

| Lens | Factorization | Pivot | Use when | Watch for |
|---|---|---|---|---|
| Control-volume conservation | property x control volume x surface transfers x internal sources/sinks x accumulation | selected property and boundary | mass, charge, momentum, or energy accounting | declaring a nonconserved component conserved |
| Opening-change-closing account | opening stock x transactions x other changes x corrections x closing stock | reconciliation interval | finance, inventory, assets, populations, or records | mixing valuation change with physical transfer |
| Compartment network | compartments x directed transfers x internal transformation x external source/sink | compartment graph | ecology, epidemiology, logistics, or process systems | counting an internal transfer as external gain and loss |
| Capacity and throughput | stored amount/capacity x inflow rate x outflow rate x conversion loss x service constraint | amount-versus-rate | batteries, reservoirs, queues, warehouses, or channels | treating capacity and throughput as the same quantity |
| Event ledger | subject x opening state x admitted events x effective time x correction x closing state | event custody | software and operational reconciliation | event receipt treated as completed effect |
| Population accounting | population boundary x entries x exits x status changes x observation process | membership transition | people, organisms, customers, devices, or cases | database presence treated as population truth |
| Residual method | measured terms x estimated terms x unknown term x propagated uncertainty x residual | closure gap | estimating an otherwise unavailable component | naming the residual as a physical flow without discrimination |

## Contrast table

| Pair | Shared feature | Decisive distinction |
|---|---|---|
| Stock vs. flow | both concern one property and boundary | level at an instant vs. transfer/change over an interval or rate |
| Stock vs. capacity | both may use amount units | actual attributed contents vs. permitted or design maximum |
| Flow total vs. flow rate | both describe transfer | amount over one interval vs. amount per unit time |
| Flow vs. process | a process may carry or produce flows | property transfer/change vs. organized activities and behavior |
| Accumulation vs. inflow | inflow can increase stock | net stock change vs. one directional contribution |
| Gross vs. net flow | both summarize changes | separately retained opposing changes vs. algebraic remainder |
| Internal vs. external transfer | both move the property | between selected compartments vs. across the outer boundary |
| Balance vs. conservation | both can use equalities | reconciliation grammar vs. domain constraint on creation/destruction |
| Conservation vs. constancy | both may yield unchanged totals | invariant under allowed transformations vs. observed no change in one case |
| Steady state vs. equilibrium | both can show zero selected change | zero accumulation at chosen resolution vs. stronger balance of relevant tendencies or forces |
| Closed system vs. zero flow | closure restricts exchanges | declared boundary condition vs. observed rate value |
| Residual vs. loss | both may appear as nonclosure | unexplained algebraic difference vs. supported physical removal mechanism |

## Diagnostic examples

- A bank balance is a stock at a date; deposits and withdrawals are flows over
  a period. A high account balance is not a high deposit rate.
- A battery can have large energy capacity and limited power, or high power and
  limited stored energy. Kilowatt-hours and kilowatts answer different
  questions.
- A warehouse with equal daily receipts and shipments can be at steady stock
  while substantial goods flow through it.
- Moving material from tank A to tank B changes both compartment stocks but is
  not an external gain or loss for the two-tank system.
- Revenue, cash receipts, orders, and inventory movement are different flows;
  one cannot close another's balance without a mapping contract.
- A population count can change through entry, exit, reclassification,
  correction, and observation changes; not every database change is migration.
- A water-budget residual may indicate omitted groundwater exchange, storage,
  timing mismatch, or measurement error rather than one certain leak.
- A balanced spreadsheet can contain fabricated values. Arithmetic closure is
  not evidence that every term or conservation assumption is correct.

## Selection procedure

1. State the exact decision or claim and name the property being counted.
2. Select system, subject, compartments, outer boundary, and viewpoint.
3. Freeze opening and closing instants, interval, time zone/calendar, and
   observation resolution.
4. Define stock identity, inclusion, valuation or measurement basis, unit,
   precision, and version at both endpoints.
5. Enumerate every path crossing the outer boundary and every admitted change
   inside it; record source, destination, direction, and sign once.
6. Distinguish interval totals from rates and reconcile units before addition.
7. State gross/net and consolidation policy; cancel internal transfers only
   after preserving the detail needed for the selected question.
8. Separate physical transfer, transformation, generation/consumption,
   reclassification, valuation, correction, and observation change.
9. Compute or inspect accumulation and state the steady-state resolution; do
   not infer equilibrium or inactivity from zero net change.
10. Invoke conservation only with a named property, applicable law or
    authority, boundary, admitted transformations, and approximation regime.
11. Reconcile residuals against component uncertainty and competing omitted-
    term hypotheses before assigning a cause.

## Reference Delta

| Reference form | Typical contribution | Factorium delta |
|---|---|---|
| Dictionary | Defines stock, flow, balance, conservation, and accumulation | Adds time, boundary, property, unit, and authority contracts |
| Accounting standard | Owns domain accounts, recognition, valuation, and consolidation | Supplies a cross-domain orientation without replacing those rules |
| Conservation text | Derives domain laws and control-volume equations | Separates physical authority from generic reconciliation grammar |
| System-dynamics model | Represents stocks, flows, feedback, and simulation | Keeps model constructs distinct from measured or governed domain quantities |
| Operational dashboard | Displays balances, rates, and deltas | Exposes hidden interval, denominator, netting, and residual choices |
| Factorium | Links quantities, systems, evidence, control, and accounting | Adds a selection procedure and failure diagnostic across domains |

## Constraints and failure signs

- The counted property and stock inclusion rule are stable across endpoints.
- System and compartment boundaries are explicit and versioned.
- Stock units, interval-flow units, and rate units are not mixed.
- Directions and signs are applied once under a declared convention.
- Internal transfers are visible before any consolidation.
- Gross and net reports name what was cancelled or retained.
- Generation, consumption, transformation, reclassification, valuation, and
  correction are not disguised as boundary flows.
- Steady state states its interval and tolerance and does not imply zero flow.
- Conservation names the conserved property and applicable domain conditions.
- Residuals retain uncertainty and are not automatically labeled loss, fraud,
  leakage, or violation.
- Arithmetic closure does not substitute for measurement, provenance, causal
  explanation, sustainability, or control effectiveness.

## Specialized views

- [General Accounting Balance](../formulas/general-accounting-balance.md)
- [Stock-Flow Balance Failure Diagnostic](../diagnostics/stock-flow-balance-failures.md)

## Cross-references

- [System Composition, Capability, Interface, and Dependency](system-composition-dependency.md)
- [State, Event, Transition, Process, and Lifecycle](state-event-transition-process-lifecycle.md)
- [Objective, Control, Monitoring, and Response](control-monitoring-response.md)
- [Population, Sample, Estimand, Estimate, and Generalization](sampling-generalization.md)
- [Work, Energy, and Power](work-energy-power.md)
- [Electrical Quantity](electrical-quantity.md)
- [Amount, Concentration, and Composition](amount-concentration-composition.md)
- [Claim and Evidence](claim-evidence.md)
- [Boundary](../roots/boundary.md)
- [Time](../roots/time.md)

## Sources and provenance

1. [Stock-flow-balance research note](../../docs/research/2026-08-15-stock-flow-balance.md)
2. United Nations Statistics Division, SNA stock classification:
   https://unstats.un.org/unsd/classifications/Family/Detail/2011
3. U.S. Geological Survey, “Water-budget methods”:
   https://www.usgs.gov/publications/water-budget-methods
4. U.S. Geological Survey, *Water Budgets*:
   https://pubs.usgs.gov/publication/cir1308
5. U.S. EPA, *Green Bay/Fox River Mass Balance Study*:
   https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=20009PPL.txt
6. NASA Glenn Research Center, “Conservation of Mass”:
   https://www.grc.nasa.gov/WWW/BGH/mass.html
7. U.S. Department of Energy, “Solar Energy and Storage Basics”:
   https://www.energy.gov/cmei/systems/solar-integration-solar-energy-and-storage-basics

Comparator access date: 2026-08-15. Domain laws and accounting rules retain
their native authority; this cross-domain organization remains `candidate`.

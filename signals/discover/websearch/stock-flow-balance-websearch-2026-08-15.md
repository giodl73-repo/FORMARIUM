---
skill: discover-websearch
topic: stock-flow-balance
date: 2026-08-15
claims_checked: 4
confirmed: 4
---

# Stock, Flow, Balance, and Conservation Web Evidence

## Phase 1 - Claims to ground

| # | Claim | Source of claim | Why it needs grounding |
|---|---|---|---|
| 1 | Stocks/storage and flows require different time and unit contracts. | Factorium candidate | Collapsing amount and rate makes cross-domain balances invalid. |
| 2 | A reusable balance needs an exact property, boundary, interval, transfers, internal changes, and accumulation term. | Existing formula pilot | Omitting any one can make apparent closure meaningless. |
| 3 | Conservation is a domain constraint on a named property, not a synonym for every accounting balance. | Factorium candidate | Generic arithmetic must not claim physical or legal conservation authority. |
| 4 | Steady state means zero accumulation under the chosen resolution, while residuals can mix omitted terms and error. | Existing formula pilot | Zero net change and unexplained imbalance are commonly overinterpreted. |

## Phase 2 - Web evidence

### Claim 1 - Stocks/storage and flows have different contracts

- Query 1: `site:unstats.un.org stock flow point in time opening closing`
  - Source: https://unstats.un.org/unsd/classifications/Family/Detail/2011
  - Direct quote: “stock levels at the start ... and end ... of a period”
  - Relevance: Official national-account classifications distinguish levels from changes during a period.
- Query 2: `site:energy.gov storage energy capacity power capacity`
  - Source: https://www.energy.gov/cmei/systems/solar-integration-solar-energy-and-storage-basics
  - Direct quote: “energy capacity ... and power capacity ... can be used to manage different tasks”
  - Relevance: Stored amount and release rate use different quantities and units.
- Corroboration: https://unstats.un.org/unsd/nationalaccount/sna.asp
  - Evidence: The SNA is an internationally agreed accounting framework for integrated stocks and flows.
- Corroboration: https://www.energy.gov/cmei/buildings/thermal-energy-storage
  - Evidence: Storage moves availability across time rather than naming a rate.
- Verdict: CONFIRMED

### Claim 2 - A balance needs property, boundary, interval, and terms

- Query 1: `site:usgs.gov water budget control volume storage change inflow outflow`
  - Source: https://www.usgs.gov/publications/water-budget-methods
  - Direct quote: “movement into and out of, and storage change within, some control volume”
  - Relevance: The official method binds flows and storage change to a selected control volume.
- Query 2: `site:epa.gov mass balance input generation consumption accumulation output`
  - Source: https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=20009PPL.txt
  - Direct quote: “INPUT + GENERATION - CONSUMPTION - ACCUMULATION = OUTPUT”
  - Relevance: The EPA pattern retains boundary transfers, internal production/removal, and accumulation.
- Corroboration: https://pubs.usgs.gov/publication/cir1308
  - Evidence: USGS states stored-water change is balanced by rates into and out of a defined area.
- Corroboration: https://pubs.usgs.gov/publication/ofr20241021/full
  - Evidence: A reservoir model defines storage in volume and flows in volume per time.
- Verdict: CONFIRMED

### Claim 3 - Conservation is narrower than generic balance

- Query 1: `site:nasa.gov conservation mass control volume creation destruction`
  - Source: https://www.grc.nasa.gov/WWW/BGH/mass.html
  - Direct quote: “mass is neither created nor destroyed”
  - Relevance: Conservation refers to a named quantity and problem domain.
- Query 2: `site:ntrs.nasa.gov continuity equation generation term conserved quantity`
  - Source: https://ntrs.nasa.gov/api/citations/19930006454/downloads/19930006454.pdf
  - Direct quote: “It is assumed that there is no creation or destruction of mass.”
  - Relevance: A conservation form excludes source/sink terms only under an explicit domain assumption.
- Corroboration: https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=20009PPL.txt
  - Evidence: EPA keeps generation and consumption visible in the generic mass-balance pattern.
- Corroboration: https://pubs.usgs.gov/publication/cir1308
  - Evidence: Conservation is applied through a bounded water budget rather than as an unscoped equality label.
- Verdict: CONFIRMED

### Claim 4 - Steady state and residuals need cautious interpretation

- Query 1: `site:nasa.gov steady state accumulation inflow equals outflow mass`
  - Source: https://www.nasa.gov/wp-content/uploads/2024/04/gfssp-v6-usermanual.pdf
  - Direct quote: “the left side of the equation is zero”
  - Relevance: The manual derives equal total in/out flow from zero stored-mass change at steady state.
- Query 2: `site:usgs.gov water budget residual omitted components uncertainty`
  - Source: https://pubs.usgs.gov/sir/2009/5004/section5.html
  - Direct quote: “errors in estimation or lack of inclusion of additional water-budget components”
  - Relevance: A residual is not automatically a physical loss or conservation violation.
- Corroboration: https://pubs.usgs.gov/sir/2022/5054/sir20225054.pdf
  - Evidence: USGS compares residual magnitude with propagated component uncertainty.
- Corroboration: https://pubs.usgs.gov/publication/sir20265118/full
  - Evidence: A practical budget residual includes storage change plus assumption, data, temporal, and omission errors.
- Verdict: CONFIRMED

## Phase 3 - Findings table

| # | Claim | Evidence summary | Verdict | Source |
|---|---|---|---|---|
| 1 | Stock timing | Opening and closing stock levels are distinct records. | CONFIRMED | https://unstats.un.org/unsd/classifications/Family/Detail/2011 |
| 2 | Stock timing | A balance sheet is drawn for a particular point in time. | CONFIRMED | https://unstats.un.org/unsd/classifications/Family/Detail/2011 |
| 3 | Storage units | Energy capacity and power capacity answer different questions. | CONFIRMED | https://www.energy.gov/cmei/systems/solar-integration-solar-energy-and-storage-basics |
| 4 | Storage time | Storage captures energy for release at a different time. | CONFIRMED | https://www.energy.gov/cmei/buildings/thermal-energy-storage |
| 5 | Boundary | A water budget is defined over a control volume. | CONFIRMED | https://www.usgs.gov/publications/water-budget-methods |
| 6 | Balance terms | Inputs, outputs, internal changes, and accumulation remain explicit. | CONFIRMED | https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=20009PPL.txt |
| 7 | Interval | Flow rates and changes in storage share a declared time basis. | CONFIRMED | https://pubs.usgs.gov/publication/ofr20241021/full |
| 8 | Compartments | Storage compartments and exchanges must be selected before modeling. | CONFIRMED | https://pubs.usgs.gov/wri/wri03-4217/ |
| 9 | Conserved property | Mass conservation is scoped to mass in a problem domain. | CONFIRMED | https://www.grc.nasa.gov/WWW/BGH/mass.html |
| 10 | Source terms | No-creation/destruction is an assumption of the conservation form. | CONFIRMED | https://ntrs.nasa.gov/api/citations/19930006454/downloads/19930006454.pdf |
| 11 | Generic balance | Generation and consumption can remain in a general accounting balance. | CONFIRMED | https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=20009PPL.txt |
| 12 | Scope | Water conservation becomes operational through a selected boundary and components. | CONFIRMED | https://pubs.usgs.gov/publication/cir1308 |
| 13 | Steady state | Zero accumulation permits nonzero, balanced through-flow. | CONFIRMED | https://www.nasa.gov/wp-content/uploads/2024/04/gfssp-v6-usermanual.pdf |
| 14 | Residual ambiguity | Omitted storage and estimation error can produce residuals. | CONFIRMED | https://pubs.usgs.gov/sir/2009/5004/section5.html |
| 15 | Residual uncertainty | Residuals should be compared with propagated component uncertainty. | CONFIRMED | https://pubs.usgs.gov/sir/2022/5054/sir20225054.pdf |
| 16 | Practical closure | Assumptions, data, timing, and omissions can all contribute to nonclosure. | CONFIRMED | https://pubs.usgs.gov/publication/sir20265118/full |

Summary: 4 of 4 claims confirmed; 16 findings retained. None contradicted or
unconfirmed.

## Phase 4 - Ungrounded claims

No ungrounded claims.

## Phase 5 - Amend

1. Use `stock or stored amount`, `interval flow`, and `flow rate` separately;
   do not force every domain to use one stock-flow vocabulary.
2. Treat a general balance as an accounting grammar and conservation as a
   property- and domain-specific constraint.
3. Make residual disposition and uncertainty a first-class diagnostic rather
   than calling every nonzero residual a leak or violation.

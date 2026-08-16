# Thermodynamic System and Phase Failure Diagnostic

Status: candidate Diagnostic Table

Primary family: Diagnostic Table

Canonical headword: [Thermodynamic System, Boundary, State, Process, Phase, and Transition](../entries/thermodynamic-system-state-phase.md)

Canonical senses: `thermodynamic-system`, `thermodynamic-surroundings`,
`thermodynamic-boundary`, `open-system`, `closed-system`, `isolated-system`,
`thermodynamic-state`, `state-variable`, `intensive-quantity`,
`extensive-quantity`, `equation-of-state`, `thermodynamic-process`,
`process-path`, `phase`, `phase-transition`

## Diagnostic table

| Observation | Candidate causes | Discriminating test | Repair owner |
|---|---|---|---|
| Mass or energy balance fails | moved boundary, omitted stream, hidden accumulation, mismatched intervals | redraw boundary and reconcile every stock/transfer on one basis | process owner |
| “Closed” system loses matter | leak, sampling, vent, or appearance-based label | inventory every crossing with uncertainty | system owner |
| Same endpoints give different heat/work | different paths or constraints | preserve path data and reconcile transfers independently | thermodynamics owner |
| Intensive value changes after joining identical subsystems | states differed, mixing/nonuniformity, equilibration omitted | duplicate a controlled subsystem and test after equilibration | metrology owner |
| Extensive value is nonadditive | overlap, interface term, inconsistent basis, loss | partition without overlap and account for interfaces | model owner |
| Equation of state misses data | wrong phase/material, range exceeded, nonequilibrium | test residuals by phase, range, composition, and competing model | model owner |
| Sample called single-phase from appearance | scale mismatch, gradient, limited resolution | test uniformity independently at declared scale | materials owner |
| Phase count differs | conditions, composition, history, resolution, metastability differ | reproduce history and compare phase-sensitive measurements | phase owner |
| Transition depends on direction/rate | hysteresis, metastability, lag, calibration | controlled heating/cooling with calibrated conditions | experimental owner |
| Steady readings called equilibrium | maintained flows, gradients, arrest, sensor floor | perturb forcing and test relaxation, gradients, and fluxes | thermodynamics owner |
| Transition called reaction | species identity and phase structure confused | compare identity and phase-sensitive structure before/after | chemistry owner |
| Named phases multiply as senses | examples replace criteria | remove names and verify the general structure remains | concept-taxonomy editor |

## Use contract and failure signs

Preserve raw transfers, properties, phase observations, times, conditions,
calibration, and uncertainty. Freeze boundary, exchange rules, state model, and
resolution. Test balance, scaling, path dependence, model validity, phase
uniformity, and transition history separately. Failure signs include treating
system as container, state as path, heat as stored content, steady state as
equilibrium, or named phases as the governing concepts.

## Sources and provenance

1. [Research note](../../docs/research/2026-08-15-thermodynamic-system-state-phase.md)
2. NIST: https://tsapps.nist.gov/publication/get_pdf.cfm?pub_id=918377
3. IUPAC phase: https://goldbook.iupac.org/terms/view/P04528
4. IUPAC phase transition: https://goldbook.iupac.org/terms/view/P04537

This diagnostic does not certify a state, phase, transition, model, or safe process.

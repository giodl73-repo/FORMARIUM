# Chemical Reaction Failure Diagnostic

Status: candidate Diagnostic Table

Primary family: Diagnostic Table

Canonical headword: [Chemical Reaction, Stoichiometry, Extent, Rate, Equilibrium, and Catalyst](../entries/chemical-reaction-stoichiometry-equilibrium.md)

Canonical senses: `chemical-reaction`, `reaction-equation`, `reactant`,
`product`, `stoichiometric-number`, `stoichiometry`, `reaction-extent`,
`reaction-rate`, `rate-law`, `chemical-equilibrium`, `equilibrium-constant`,
`thermodynamic-activity`, `catalyst`, `reaction-mechanism`, `reaction-intermediate`

## Governing question

Which process/representation, role, stoichiometric, progress, rate,
equilibrium, catalyst, or mechanism defect could explain a conflicting reaction
claim, and what check would discriminate it?

## Diagnostic table

| Observation | Candidate causes | Discriminating test | Likely repair owner |
|---|---|---|---|
| Equation balances but prediction fails | side reactions, phase omission, wrong species identity, incomplete conversion, or equation mistaken for mechanism | close element/charge balance, identify phases and products, and compare measured species through time | chemistry owner |
| Different species imply different extents | wrong signs/coefficients; more than one reaction; intermediate or side-product accumulation; measurement bias | compute `dn_B/nu_B` independently with uncertainty and inspect residual structure | stoichiometry/metrology owner |
| Reactant and reagent labels conflict | consumption role confused with test/addition use; catalyst or solvent mislabeled | compare initial/final amounts and step-level participation under the selected boundary | chemistry owner |
| Rate differs by a stoichiometric factor | species rate reported as reaction rate; coefficient sign or normalization omitted | reconstruct rate from each species using signed `nu_B` and common units | kinetics owner |
| Rate changes when vessel volume changes | total conversion rate and per-volume rate mixed; variable volume ignored | compare `dxi/dt` and normalized rate with recorded volume history | kinetics/process owner |
| Rate law exponents equal equation coefficients without evidence | elementary-step assumption; empirical fit omitted; mechanism overclaim | fit alternative rate laws on frozen data and test elementary-step evidence independently | kinetics owner |
| Composition stops changing and is called equilibrium | reactant exhausted; kinetic arrest; transport limit; instrument floor; true dynamic equilibrium | perturb composition/conditions reversibly and test forward/reverse response and repeatability | thermodynamics/experimental owner |
| Equilibrium constants disagree | reaction reversed/rescaled; activity convention or standard state differs; temperature/phase omitted | transform to one equation direction/scale and common activity convention and conditions | thermodynamics owner |
| Concentration quotient is called dimensionless `K` | activities replaced without normalization; units or standard states omitted | reconstruct dimensionless activities and document the approximation | thermodynamics/units owner |
| Catalyst appears to change equilibrium | comparison stopped before equilibrium; temperature or composition changed; catalyst reacts irreversibly | extend to equilibrium and compare under matched conditions with catalyst recovery/accounting | kinetics owner |
| Proposed mechanism fits one curve and is called proven | kinetically equivalent alternatives; intermediates unobserved; transport confounding | seek independent stoichiometric, intermediate, isotope, energetic, and perturbation evidence | mechanism owner |
| Named reactions begin multiplying as senses | examples substituted for process concepts; no inclusion boundary | remove names and verify the reaction/stoichiometry/rate/equilibrium structure remains | concept-taxonomy editor |

## Use contract

1. Preserve raw species measurements, times, conditions, equation version, units,
   calibration, and uncertainty before normalization or fitting.
2. Freeze system boundary, phases, candidate reactions, and observation schedule.
3. Test balance, extent consistency, rates, equilibrium, catalytic comparison,
   and mechanism evidence separately.
4. Compare competing equations and mechanisms on the same held-out observations.
5. Repair the owning process, representation, measurement, or model contract;
   then recheck claim scope and provenance.

## Failure signs

- reaction, equation, and mechanism share one identity;
- balanced coefficients are treated as a rate law;
- extent is reported without equation direction and scaling;
- rates omit species, time, and normalization bases;
- equilibrium means only “nothing visibly changed”;
- `K` omits activities, standard states, equation convention, or temperature;
- catalyst means any additive or is claimed to change equilibrium position;
- one fitted curve proves a unique mechanism;
- named reaction families replace the reusable concepts.

## Sources and provenance

1. [Chemical reaction research note](../../docs/research/2026-08-15-chemical-reaction-stoichiometry-equilibrium.md)
2. IUPAC Gold Book, stoichiometry: https://goldbook.iupac.org/terms/view/S06026
3. IUPAC Gold Book, rate of reaction: https://goldbook.iupac.org/terms/view/R05156
4. IUPAC Gold Book, chemical equilibrium: https://goldbook.iupac.org/terms/view/C01023
5. IUPAC Gold Book, mechanism: https://goldbook.iupac.org/terms/view/M03804

This diagnostic isolates candidate causes; it does not certify a reaction,
mechanism, kinetic model, equilibrium state, catalyst, or safe operating condition.


---
topic: tipping-point-critical-transition-cascade-candidate
date: 2026-08-20
status: candidate admission brief
canonical_admission: false
---

# Tipping Point, Critical Transition, Cascade, Contagion, and Spillover

## Decision question

Does Lexicon need an owner for the control-variable level at which a system
commits to a different regime, the abrupt dynamical transition itself, the
ordered propagation of failures or activations through structural couplings, the
unit-to-unit spread of a state through a population, and the effect landing on
units outside the originating set?

## Bounded thesis

Proceed only within regime change and propagation as descriptions of system
dynamics and structure: what changes qualitatively, through which coupling, in
what order, and with what identification evidence. Decision cut-offs, alert
levels, hazard acceptability, marketing "tipping points," and metaphorical
"viral" language remain outside this candidate.

The thesis is falsified if the existing control, state-transition, causal,
dependability, and hazard owners can already state hysteresis, bifurcation,
propagation order, transmission versus shared exposure, and interference
effects without importing dynamical semantics.

## Proposed senses

| Sense | Governing question |
|---|---|
| `tipping-point` | At which level of which control variable does a small further change commit the system to a qualitatively different state? |
| `critical-transition` | Which abrupt change of regime occurs, through which feedback, bifurcation, or hysteresis structure, and on what evidence? |
| `cascade` | Which ordered sequence of dependent failures or activations propagates through which structural couplings, and where does it stop? |
| `contagion` | Which unit-to-unit transmission process spreads a state through a population, and how is it separated from shared exposure, homophily, and simultaneity? |
| `spillover` | Which effect lands on units outside the treated, exposed, or originating set, through which channel, and at what magnitude? |

## Candidate contract

```text
regime-change-propagation-use
  := system, unit set, boundary, and decision use
   x state variable, control variable, and observation window
   x baseline regime, alternative regime, and qualitative difference
   x feedback structure, nonlinearity, and bifurcation type
   x hysteresis, reversibility, and recovery path
   x commitment point, uncertainty in its location, and irreversibility horizon
   x coupling structure, dependency direction, and network topology
   x propagation order, timing, amplification, and stopping condition
   x transmission mechanism, contact or exposure definition, and rate
     (consumed from the transfer candidate, not defined here)
   x unit activation or reinforcement rule and its model source
   x population, susceptibility, and reproduction-number basis
   x exposure set, non-exposed set, and interference structure
   x channel of outside effect and affected-unit identification
   x identification strategy, confounding, homophily, and simultaneity handling
   x early-warning indicator, detection method, and false-signal rate
   x model, data, uncertainty, and scope limits
```

## Existing-owner audit

- [Objective, Control, Monitoring, and Response](../../../tables/entries/control-monitoring-response.md)
  owns `threshold` as the comparison boundary that changes classification,
  attention, or action, plus `indicator`, `alert`, `feedback`, and
  `intervention`. **This candidate does not claim threshold.** A threshold is
  chosen by an owner and can be moved by decision; a `tipping-point` is a
  property of the system's dynamics and is not set by anyone. Early-warning
  indicators remain `indicator` and `alert` there; only their dynamical basis
  belongs here.
- [State, Event, Transition, Process, and Lifecycle](../../../tables/entries/state-event-transition-process-lifecycle.md)
  owns `state`, `event`, and `transition` generically. A `critical-transition`
  is a dynamical kind of transition that adds nonlinearity, feedback, and
  hysteresis; the generic transition grammar is reused, not duplicated.
- [Association, Causal Effect, Influence, Mechanism, Intervention, and Attribution](../../../tables/entries/causal-reasoning.md)
  owns causal machinery, mechanism, and attribution. `contagion` and `spillover`
  are causal claims of specific shapes and must satisfy that owner's evidence
  requirements; they add propagation structure, not a new causal semantics.
- [Reliability, Availability, Maintainability, Resilience, and Recovery](../../../tables/entries/dependability-reliability-availability-resilience.md)
  owns `failure`, `resilience`, and `recovery`. A `cascade` is a propagation
  pattern over coupled components; common-cause failure stays there and must be
  excluded before a cascade is claimed.
- [System Composition, Architecture, Capability, Interface, and Dependency](../../../tables/entries/system-composition-dependency.md)
  owns components, interfaces, and directional dependency; a cascade rides on
  that structure and does not redefine it.
- [Hazard, Exposure, Harm, Vulnerability, and Safety](../../../tables/entries/hazard-exposure-harm-safety.md)
  owns `hazard`, `exposure`, `vulnerability`, and acceptability. Epidemiological
  exposure and harm stay there; `contagion` owns only the unit-to-unit spread
  claim.
- [Probability, Risk, and Uncertainty](../../../tables/entries/probability-risk-uncertainty.md)
  owns `risk` and `expected-loss`; systemic-risk quantification is an
  application of those.
- [Sampling, Estimation, and Generalization](../../../tables/entries/sampling-generalization.md)
  owns `target-population`, `estimand`, and `transport`; interference and
  spillover break its stable-unit assumption, which must be declared rather than
  silently relaxed.
- [Cost, Price, Value, and Return](../../../tables/entries/cost-price-value-return.md)
  owns valuation; economic externality valuation stays there while `spillover`
  owns only the effect-on-outside-units claim.
- [Location, Region, Containment, Proximity, Route, and Network](../../../tables/entries/spatial-operating-context.md)
  owns generic typed networks and reachability; a contact network is an instance.
- [Inheritance, Transmission, Succession, and Bequest](../candidates/inheritance-transmission-succession-bequest.md)
  owns `transmission`. **Separation adopted here:** that candidate owns the
  per-event passing process — mechanism, channel, contact or contact-equivalent,
  rate, and fidelity — while this candidate owns `contagion` as the
  population- or network-level propagation pattern claimed to result from many
  such events. **Consumption direction:** contact definition, channel, rate, and
  fidelity factors are *defined* in the transfer candidate and *consumed* here;
  susceptibility structure, network topology, propagation pattern, and the
  identification burden are defined here and consumed there. A stated
  transmission process is not evidence of contagion, and a contagion claim
  without a stated transmission process is incomplete.
- [Model, Representation, and Simulation](../../../tables/entries/model-representation-simulation.md)
  owns models and runs; bifurcation and epidemic models are instances. **Unit
  activation and reinforcement rules** — the individual adoption rules of
  threshold and complex-contagion models — are model constructs routed to this
  owner. They are recorded here as a factor and are never described as decision
  thresholds.

## Identification and confounding limits

This family's four propagation senses are the most easily overclaimed material
in the analytical set, so identification requirements are part of the contract
rather than an appendix.

- **Reflection problem.** Endogenous social effects, contextual effects, and
  correlated effects are not separately identified from observed group means
  without exclusion restrictions (Manski).
- **Homophily.** Contagion and homophily are generically confounded in
  observational network data; latent trait similarity reproduces
  contagion-shaped diffusion patterns (Shalizi and Thomas).
- **Implausible-effect checks.** Network "spread" estimators have produced
  significant spread of non-transmissible attributes such as height, which is a
  standing falsification test for the method (Cohen-Cole and Fletcher, replying
  to Christakis and Fowler).
- **Peer-effect fragility.** Mechanical artifacts of group construction and
  instrument choice generate spurious peer effects (Angrist).
- **Comovement is not contagion.** Correlation between markets rises
  mechanically with volatility; corrected tests convert most "contagion"
  findings into ordinary interdependence (Forbes and Rigobon).
- **Interference.** Spillover requires an explicit interference structure and a
  redefined estimand; the stable-unit-treatment-value assumption cannot be left
  implicit (Rubin; Hudgens and Halloran).
- **Early-warning limits.** Rising variance and autocorrelation are neither
  necessary nor sufficient for an approaching transition: shifts can occur with
  no warning, and warning signals occur without shifts (Hastings and Wysham;
  Boettiger and Hastings).
- **Regime-shift attribution.** Abrupt observed change may reflect a shifting
  driver, noise, or observation artifact rather than a bifurcation (Scheffer et
  al.; Dakos et al.).
- **Catastrophe-theory precedent.** Qualitative bifurcation vocabulary was
  widely misapplied to social and biological data in the 1970s; the critique
  remains applicable to today's tipping-point language (Sussmann and Zahler).

## Shared boundary with the neighboring analytical candidates

`tail` and `extreme-value` are **distributional** and belong to
[Distribution, Shape, Skewness, Tail, Outlier, and Extreme Value](../candidates/distribution-shape-skewness-tail-outlier-extreme-value.md):
a region of a stated distribution and the limit-law treatment of maxima and
exceedances. Rare-event anticipation and rare-event verification are
**temporal-evaluative** and belong to
[Prediction, Forecast, Conditional Projection, Backtest, and Forecast Skill](../candidates/prediction-forecast-conditional-projection-backtest-skill.md).
`tipping-point` and `critical-transition` here are **dynamical-structural**: a
control-variable level and feedback structure at which the system commits to a
different regime. Decision boundaries that trigger classification, attention, or
action remain `threshold`, owned by Objective, Control, Monitoring, and
Response. A large observation is not a tipping point; a decision cut-off is not
a tipping point; and a tipping point need not produce an extreme observation.

## Source matrix

| Source | Contribution | Boundary or challenge |
|---|---|---|
| [Scheffer et al., Catastrophic Shifts in Ecosystems](https://doi.org/10.1038/35098000) | alternative stable states, hysteresis, and abrupt shifts | alternative-state evidence is hard to establish in the field |
| [Scheffer et al., Early-Warning Signals for Critical Transitions](https://doi.org/10.1038/nature08227) | critical slowing down as a generic indicator | indicators are generic in theory, weak in practice |
| [Dakos et al., Methods for Detecting Early Warnings of Critical Transitions](https://doi.org/10.1371/journal.pone.0041010) | comparative evaluation of detection methods | method choice and detrending drive results |
| [Boettiger and Hastings, Early Warning Signals and the Prosecutor's Fallacy](https://doi.org/10.1098/rspb.2012.2085) | the inferential error in reading warning signals | signal presence does not imply an imminent transition |
| [Hastings and Wysham, Regime Shifts Can Occur With No Warning](https://doi.org/10.1111/j.1461-0248.2010.01439.x) | shifts driven by chaotic or stochastic structure show no precursors | absence of warning is not absence of risk |
| [Lenton et al., Tipping Elements in the Earth's Climate System](https://doi.org/10.1073/pnas.0705414105) | the tipping-element framing and commitment horizons | element list and thresholds are expert-elicited |
| [Armstrong McKay et al., Exceeding 1.5 °C Could Trigger Multiple Climate Tipping Points](https://doi.org/10.1126/science.abn7950) | updated thresholds, timescales, and confidence levels | central estimates carry wide uncertainty ranges |
| [IPCC AR6 WG1 Annex VII, Glossary](https://www.ipcc.ch/report/ar6/wg1/chapter/annex-vii-glossary/) | assessed definitions of tipping point, abrupt change, irreversibility | an assessment glossary, not a general systems theory |
| [Sussmann and Zahler, Catastrophe Theory as Applied to the Social and Biological Sciences](https://doi.org/10.1007/BF00869575) | the classic critique of qualitative bifurcation claims | polemical, but its methodological point stands |
| [Buldyrev et al., Catastrophic Cascade of Failures in Interdependent Networks](https://doi.org/10.1038/nature08932) | interdependence produces abrupt cascading collapse | stylized model; empirical coupling is rarely so clean |
| [Watts, A Simple Model of Global Cascades on Random Networks](https://doi.org/10.1073/pnas.082090499) | cascade windows depend on connectivity and thresholds | model thresholds are individual rules, not decision cut-offs |
| [Granovetter, Threshold Models of Collective Behavior](https://doi.org/10.1086/226707) | individual thresholds aggregate into discontinuous outcomes | an individual threshold is not a system tipping point |
| [Schelling, Dynamic Models of Segregation](https://doi.org/10.1080/0022250X.1971.9989794) | micro-motives producing macro regime change | an abstraction, not an empirical mechanism |
| [Centola and Macy, Complex Contagions and the Weakness of Long Ties](https://doi.org/10.1086/521848) | simple versus complex contagion; reinforcement requirements | contagion type must be stated, not assumed |
| [Diekmann, Heesterbeek, and Metz, On the Definition and Computation of R0](https://doi.org/10.1007/BF00178324) | the reproduction number's precise definition | R0 is model- and population-specific, not a constant |
| [WHO, How COVID-19 Is Transmitted](https://www.who.int/news-room/questions-and-answers/item/coronavirus-disease-covid-19-how-is-it-transmitted) | operational transmission-mode vocabulary | agency guidance, revised as evidence changes |
| [Christakis and Fowler, The Spread of Obesity in a Large Social Network](https://doi.org/10.1056/NEJMsa066082) | the reference network-contagion claim | the design cannot separate contagion from homophily |
| [Cohen-Cole and Fletcher, Detecting Implausible Social Network Effects](https://doi.org/10.1136/bmj.a2533) | falsification test using non-transmissible traits | a critique of method, not of all social influence |
| [Shalizi and Thomas, Homophily and Contagion Are Generically Confounded](https://doi.org/10.1177/0049124111404820) | formal nonidentification result | the result constrains observational designs, not experiments |
| [Manski, Identification of Endogenous Social Effects](https://doi.org/10.2307/2298123) | the reflection problem | applies to linear-in-means specifications specifically |
| [Angrist, The Perils of Peer Effects](https://doi.org/10.1016/j.labeco.2014.05.008) | mechanical artifacts in peer-effect estimates | econometric focus; not a denial of social effects |
| [Forbes and Rigobon, No Contagion, Only Interdependence](https://doi.org/10.1111/0022-1082.00494) | heteroskedasticity-corrected contagion tests | correction assumptions are themselves debated |
| [Diebold and Yilmaz, Measuring Return and Volatility Spillovers](https://doi.org/10.1111/j.1468-0297.2008.02208.x) | a measured spillover index over connected markets | variance-decomposition ordering affects results |
| [BIS/FSB/IMF, Guidance to Assess the Systemic Importance of Financial Institutions](https://www.bis.org/publ/othp07.htm) | official framing of systemic spillover and interconnectedness | policy guidance, not a causal method |
| [Rubin, Comment on Randomization Analysis of Experimental Data](https://doi.org/10.2307/2287653) | the stable-unit-treatment-value assumption | stated as an assumption, routinely violated |
| [Hudgens and Halloran, Toward Causal Inference With Interference](https://doi.org/10.1198/016214508000000292) | direct, indirect, total, and overall effects under interference | requires partial-interference structure to be credible |

## Counterevidence and limits

- Tipping-point language is used for decision cut-offs, thresholds of concern,
  and marketing claims; only the dynamical reading is admitted here (IPCC
  glossary; Granovetter).
- Early-warning indicators are neither necessary nor sufficient, and reading
  them as evidence of an imminent transition is a known inferential error
  (Boettiger and Hastings; Hastings and Wysham).
- Alternative stable states are difficult to demonstrate outside controlled
  systems; abrupt change alone does not establish a bifurcation (Scheffer et
  al.).
- Cascade models are structurally stylized; real coupling is heterogeneous, and
  common-cause failure imitates cascades (Buldyrev et al.; Watts).
- Contagion claims from observational network data are generically confounded
  with homophily and shared exposure (Shalizi and Thomas; Cohen-Cole and
  Fletcher).
- Financial "contagion" often survives only as ordinary interdependence after
  heteroskedasticity correction (Forbes and Rigobon).
- Spillover estimates depend on the interference structure assumed and the
  identification design used, not only on the data (Hudgens and Halloran).
- R0 is a model- and population-specific quantity, not an invariant property of
  a pathogen (Diekmann et al.).
- Qualitative dynamical vocabulary has a documented history of overapplication
  to social data (Sussmann and Zahler).

## Admission gates

1. Name the system, unit set, boundary, state variable, control variable, and
   observation window before any claim in this family.
2. `tipping-point` requires a named control variable, a stated commitment
   consequence, and explicit uncertainty about the point's location; never use
   it for a chosen decision cut-off.
3. `critical-transition` requires the regime difference, the feedback or
   bifurcation structure claimed, hysteresis and reversibility status, and the
   evidence distinguishing it from a shifting driver or noise.
4. Early-warning indicators are reported with the detection method, detrending
   choice, and false-signal behavior, and never as proof of an approaching
   transition.
5. `cascade` requires the coupling structure, propagation order and timing, the
   stopping condition, and explicit exclusion of common-cause failure.
6. `contagion` requires the transmission mechanism, contact or exposure
   definition, contagion type (simple or complex), and an identification
   strategy that addresses homophily, shared exposure, simultaneity, and the
   reflection problem.
7. Consume, do not redefine, the transfer candidate's per-event factors: the
   mechanism, channel, contact definition, rate, and fidelity of a single
   passing event are cited from
   [Inheritance, Transmission, Succession, and Bequest](../candidates/inheritance-transmission-succession-bequest.md);
   only the population- or network-level propagation pattern and its
   identification burden are asserted here.
8. Record any unit activation or reinforcement rule as a model construct,
   attributed to the model owner, and never as a decision threshold.
9. Any reproduction-number claim states the model and population it belongs to.
10. `spillover` requires the exposed and non-exposed sets, the channel, the
    interference structure, and the redefined estimand; the stable-unit
    assumption is declared, never assumed.
11. Observational propagation claims report a falsification check on an
    implausible outcome where one is available.
12. Do not import decision thresholds, alert levels, hazard acceptability,
    valuation of externalities, or generic causal machinery.
13. Exclude metaphorical "viral", "domino", and "tipping" language, and
    exclude popular-press tipping-point usage.
14. Route rare large observations to the distributional family and rare-event
    anticipation to the forecast family; neither is a tipping point.

## Disposition

**PROCEED TO CANDIDATE ENTRY DRAFT; DO NOT ADMIT CANONICALLY.** The dynamical
and propagation senses are unowned and carry strong literature authority, but
they are also the most overclaimed vocabulary in the set. Admission requires a
fixed-point role review confirming that `tipping-point` never absorbs
`threshold`, that `contagion` and `spillover` inherit the causal owner's
evidence burden, that the `transmission`/`contagion` consumption direction holds
against the transfer candidate, and that the identification limits above survive
as contract factors rather than prose.

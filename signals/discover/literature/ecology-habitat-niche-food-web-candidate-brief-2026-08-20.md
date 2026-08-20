---
topic: ecology-habitat-niche-food-web-candidate
date: 2026-08-20
status: candidate admission brief
canonical_admission: false
---

# Ecosystem, Habitat, Ecological Niche, Food Web, and Ecological Interdependence

## Decision question

Does Lexicon need an ecological owner for the bounded biotic-abiotic functional
unit, the organism-referenced place that supports occurrence, the environmental
role and resource space a population occupies, the sampled network of feeding
links, and the perturbation-relative mutual reliance among populations?

## Bounded thesis

Proceed only within ecology as a description of environmental units, places,
roles, and interaction structure. Organizational ecosystems, market niches,
supply-chain food chains, and metaphorical interdependence remain outside this
candidate. "Ecology" names the discipline and is used here only as a domain
tag; `ecosystem` is the anchor sense.

The thesis is falsified if the existing system, spatial, stock-flow, causal,
sampling, dependability, and evolutionary owners, together with the
tipping-point candidate, can already state ecosystem delimitation, habitat as
an organism-referenced site type, environmental role and resource space,
trophic link identity with sampling effort, and removal-tested mutual reliance
without importing ecological semantics.

## Proposed senses

| Sense | Governing question |
|---|---|
| `ecosystem` | Which biotic community and its abiotic environment are treated as one interacting functional unit, over what extent and period? |
| `habitat` | Which physical or environmental place or site type supports the occurrence of which organism or population? |
| `ecological-niche` | Which environmental conditions, resource space, and functional role does a population occupy or affect, along which stated axes? |
| `ecological-community` | Which co-occurring populations in the delimited area and period are treated as the assemblage of interest? |
| `food-web` | Which feeding (trophic) links among which nodes, at what aggregation and sampling effort, are asserted? |
| `trophic-level` | Which position in the energy or material transfer chain is assigned, under what assignment rule? |
| `biological-species-interaction` | Which directional effect of one population on another (predation, competition, mutualism, facilitation, parasitism) is claimed, with which sign, strength, and evidence? |
| `ecological-interdependence` | Which measured or modeled mutual reliance among populations, or between populations and abiotic processes, holds under which perturbation, and with what expected consequence of removal? |

## Candidate contract

```text
ecosystem-community-use
  := ecosystem or community identity, purpose, and decision use
   x spatial extent, boundary rule, and habitat or ecotope delimitation
   x temporal window, seasonality, succession stage, and disturbance history
   x taxonomic and functional resolution and node aggregation rule
   x populations, occurrence evidence, abundance, and detectability
   x survey design, sampling frame, analytic sample, and field practice
   x abiotic conditions, resources, and limiting factors
   x niche axes, requirement and impact components, and measurement basis
   x interaction kind, sign, direction, strength, and context dependence
   x trophic link evidence, diet resolution, and sampling effort
   x energy and material transfer, efficiency, and accounting basis
   x network structure, connectance, keystone and higher-order effects
   x perturbation, removal, response, and recovery evidence
   x disturbance absorption, regime persistence, and observed state change
   x human use, ecosystem services, and accounting classification
   x model, data, uncertainty, scale dependence, and scope limits
```

## Existing-owner audit

- [Adaptation, Fitness, Selection, and Exaptation](../candidates/adaptation-fitness-selection-exaptation.md)
  is the nearest candidate neighbor and was the one live ownership conflict.
  **Admission dependency (D1):** this family may not be admitted while the
  evolutionary candidate also claims a niche sense. **Status: resolved on
  2026-08-20 in this family's favour.** The first attempt was a reciprocal
  split — `ecological-niche` here, an evolutionary niche sense there — but
  fixed-point review found the evolutionary side was not disjoint from
  `natural-selection` plus a stated environment, so that sense was removed and
  the evolutionary family was renamed
  *Adaptation, Fitness, Selection, and Exaptation*. This
  family is therefore the **sole owner of the niche**: `ecological-niche` is an
  environmental role and resource-space description of a population — which
  conditions and resources it requires and which it consumes or alters — and
  organism-driven environmental modification, including niche construction as
  an environmental process, is described here. The evolutionary family consumes
  that description as selection context and states no niche claim of its own;
  the bare identifier `niche` is owned by no entry. Hutchinson and Soberon are
  cited by both entries, and are retained there as the record of the declined
  question; Leibold is cited only by this family. The
  [2026-08-19 evolutionary admission brief](adaptation-selection-candidate-brief-2026-08-19.md)
  was amended and renamed on 2026-08-20 to match. No residual conflict remains.
- [Tipping Point, Critical Transition, Cascade, Contagion, and Spillover](../candidates/tipping-point-critical-transition-cascade-contagion-spillover.md)
  is the sibling candidate for `tipping-point`, `critical-transition`, and
  `cascade`. Ecological regime shifts are described here only as observed state
  changes of a delimited unit; control-variable thresholds, bifurcation and
  hysteresis structure, early-warning signals, and cascade propagation stay
  with that family. If both candidates advance, the tipping-point family must
  record this boundary reciprocally before either is admitted.
- [Reliability, Availability, Maintainability, Resilience, and Recovery](../../../tables/entries/dependability-reliability-availability-resilience.md)
  owns `resilience` and `recovery` as service- and capability-relative claims.
  Ecological resilience in the Holling sense is a disturbance-absorption claim
  about regime persistence and is neither a dependability measure nor
  comparable with one; this family borrows no availability, recovery-time, or
  recovery-point semantics.
- [Population, Sample, Estimand, Estimate, and Generalization](../../../tables/entries/sampling-generalization.md)
  owns `target-population`, `sampling-frame`, `sample`, `analytic-sample`,
  `estimand`, and `generalization`. An ecological population is the biological
  population of the delimited unit, not the inference target of a sampling
  claim; survey design, effort, detectability, and exclusions are recorded here
  as practice factors and cited to that owner rather than redefined.
- [System Composition, Architecture, Capability, Interface, and Dependency](../../../tables/entries/system-composition-dependency.md)
  owns generic system, boundary, environment, and directional dependency; an
  ecosystem is a domain instance that must state its own delimitation rule.
- [Stock, Flow, Accumulation, Balance, and Conservation](../../../tables/entries/stock-flow-balance.md)
  owns compartment accounting and energy or nutrient budget arithmetic; this
  family owns only trophic link identity, direction, and aggregation.
- [Location, Region, Containment, Proximity, Route, and Network](../../../tables/entries/spatial-operating-context.md)
  owns reference systems, regions, containment, and generic typed networks; a
  habitat is not a region and a food web is not a generic network.
- [Association, Causal Effect, Influence, Mechanism, Intervention, and Attribution](../../../tables/entries/causal-reasoning.md)
  owns causal machinery; removal and exclusion experiments are evidence here,
  not a new causal semantics.
- [Objective, Control, Monitoring, and Response](../../../tables/entries/control-monitoring-response.md)
  owns `feedback` as a general loop relation; ecological feedback stays an
  instance of it.
- [Hazard, Exposure, Harm, Vulnerability, and Safety](../../../tables/entries/hazard-exposure-harm-safety.md)
  owns exposure pathways, harm, and risk acceptability; ecotoxicology and
  environmental risk assessment stay there.
- [Chemical Entity, Substance, Compound Class, Mixture, and Solution](../../../tables/entries/chemical-substance-classification.md)
  already owns `chemical-species`. Biological species must be written
  `biological-species` in factor names to avoid an identifier collision.
- [Cost, Price, Value, and Return](../../../tables/entries/cost-price-value-return.md)
  owns valuation; ecosystem-service valuation is deferred to it and to SEEA as
  an external authority.

## Source matrix

| Source | Contribution | Boundary or challenge |
|---|---|---|
| [Tansley, The Use and Abuse of Vegetational Concepts and Terms](https://doi.org/10.2307/1930070) | coins ecosystem as a biotic plus abiotic interacting unit | unit boundaries are analyst-selected, not natural |
| [Elton, Animal Ecology](https://archive.org/details/animalecology00elto) | food chain and food cycle; niche as functional role | pre-quantitative; role-niche is not place-niche |
| [Grinnell, The Niche-Relationships of the California Thrasher](https://doi.org/10.2307/4072271) | place-based origin of the niche concept | conflates habitat and niche by modern standards |
| [Hutchinson, Concluding Remarks](https://doi.org/10.1101/SQB.1957.022.01.039) | n-dimensional hypervolume; fundamental and realized niche | one formalization; axes must be stated to be usable |
| [Whittaker, Levin, and Root, Niche, Habitat, and Ecotope](https://doi.org/10.1086/282837) | the decisive habitat, niche, and ecotope separation | the proposed terminology never became universal |
| [Leibold, The Niche Concept Revisited](https://doi.org/10.2307/1938141) | separates requirement niche from impact niche | mechanistic models carry their own assumptions |
| [Soberon, Grinnellian and Eltonian Niches](https://doi.org/10.1111/j.1461-0248.2007.01107.x) | scenopoetic and bionomic niche axes | observed distribution is not the niche |
| [Lindeman, The Trophic-Dynamic Aspect of Ecology](https://doi.org/10.2307/1930126) | trophic levels and energy transfer | level assignment is an abstraction; omnivory breaks it |
| [Paine, Food Web Complexity and Species Diversity](https://doi.org/10.1086/282400) | removal experiment; keystone effect | keystone status is site- and context-specific |
| [Dunne, Williams, and Martinez, Food-web structure and network theory](https://doi.org/10.1073/pnas.192407699) | food-web network metrics and their sensitivity | aggregation, sampling effort, and web selection drive conclusions |
| [Bascompte and Jordano, Plant-Animal Mutualistic Networks](https://doi.org/10.1146/annurev.ecolsys.38.091206.095818) | direct authority for networks of interdependence | mutualistic structure is not trophic structure |
| [Levine, Bascompte, Adler, and Allesina, Beyond pairwise mechanisms of species coexistence](https://doi.org/10.1038/nature22898) | higher-order interactions beyond pairwise reliance | magnitude of higher-order effects remains contested |
| [Convention on Biological Diversity, Article 2, Use of Terms](https://www.cbd.int/convention/articles?a=cbd-02) | treaty definitions of ecosystem and habitat | a legal instrument, not a scientific settlement |
| [UN System of Environmental-Economic Accounting, Ecosystem Accounting](https://seea.un.org/en/methodology/ecosystem-accounting) | ecosystem asset, extent, condition, and accounting area | accounting classes are not ecological explanations |
| [Keith et al., A function-based typology for Earth's ecosystems](https://doi.org/10.1038/s41586-022-05318-4) | IUCN Global Ecosystem Typology and functional criteria | remains an external example set, not a Lexicon taxonomy |
| [Krausman and Morrison, Another plea for standard terminology](https://doi.org/10.1002/jwmg.21121) | habitat versus habitat type, use, and quality | a discipline-specific plea; usage remains inconsistent |
| [Millennium Ecosystem Assessment, Framework for Assessment](https://www.millenniumassessment.org/en/Framework.html) | ecosystem services and human coupling | policy assessment, superseded in parts by IPBES |
| [IPBES Glossary](https://www.ipbes.net/glossary) | current intergovernmental terminology | definitions are edited per report for consistency |
| [Holling, Resilience and Stability of Ecological Systems](https://doi.org/10.1146/annurev.es.04.110173.000245) | separates disturbance absorption and regime persistence from return to equilibrium | ecological resilience is not a dependability measure and is itself contested |

## Counterevidence and limits

- No universal ecosystem or community boundary exists; extent, period, and
  delimitation rule are analyst choices (Tansley).
- Habitat, niche, and ecotope are still used interchangeably in practice; the
  separation adopted here is a defensible convention, not settled usage
  (Whittaker et al.; Krausman and Morrison).
- Niche has at least three live readings — place, functional role, and
  hypervolume — and requirement and impact components can diverge (Grinnell;
  Elton; Hutchinson; Leibold).
- Food-web structure is an artifact of aggregation and sampling effort as much
  as of nature (Dunne et al.).
- Trophic level is frequently fractional; omnivory defeats integer assignment
  (Lindeman).
- Keystone and interdependence claims are perturbation- and site-relative and
  may not survive higher-order interactions (Paine; Levine et al.).
- Treaty and accounting definitions bind their own instruments only; they do
  not settle ecological science (CBD; SEEA).
- Resilience has at least two incompatible ecological readings — absorption of
  disturbance while persisting in a regime, and speed of return to equilibrium
  — and neither is the dependability sense (Holling).
- Ecological population counts and occurrence records are sampling products;
  effort, detectability, and exclusions can drive apparent structure as much as
  ecology does (Dunne et al.), which is why the sampling owner's vocabulary is
  cited rather than restated.

## Admission gates

1. Name the unit, spatial extent, boundary rule, temporal window, and decision
   use before any ecosystem or community claim.
2. State taxonomic or functional resolution and the node aggregation rule for
   any community or food-web claim.
3. Record sampling effort, diet resolution, and detectability with any trophic
   link or network metric.
4. State niche axes explicitly and mark whether the claim is a requirement or
   an impact component; never present an observed distribution as the niche.
5. Keep `ecological-niche` restricted to environmental role and resource space;
   route any heritability, differential-reproduction, or selected-origin claim
   to the evolutionary candidate, which owns no niche sense and consumes the
   description recorded here.
6. Require perturbation, removal, or exclusion evidence for interdependence and
   keystone claims, and state the expected consequence of removal.
7. Do not import energy or nutrient budget arithmetic, spatial reference
   systems, generic network reachability, or generic causal machinery.
8. Write biological species as `biological-species` and pairwise effects as
   `biological-species-interaction` in sense and factor names.
9. Distinguish the ecological population of the delimited unit from the target
   population of a sampling claim, and record survey design, effort,
   detectability, and exclusions as practice factors owned elsewhere.
10. Keep ecological resilience separate from dependability resilience and
    recovery, and keep regime-shift description free of tipping-point,
    bifurcation, early-warning, and cascade machinery.
11. Exclude conservation policy designations, biome taxonomies, and
    ecosystem-service valuation; cite them as external authorities only.
12. Exclude organizational, market, and metaphorical uses of ecosystem,
    habitat, niche, food chain, and interdependence.

## Disposition

**PROCEED TO CANDIDATE ENTRY DRAFT; DO NOT ADMIT CANONICALLY.** The family is
almost entirely unowned in Lexicon and carries standards-grade and
classic-literature authority. Admission dependency D1 (the niche separation) is
discharged: the fixed-point role review of 2026-08-20 removed the evolutionary
niche sense entirely rather than splitting the word, leaving this family as the
sole niche owner and the evolutionary family as a consumer of ecological
description. The evolutionary brief and draft were amended and renamed to
match.

---
topic: adaptation-selection-candidate
date: 2026-08-19
status: candidate admission brief
canonical_admission: false
---

# Adaptation, Fitness, Selection, and Exaptation

> **Amendment, 2026-08-20 (niche sense removed).** This brief is retained at its
> original 2026-08-19 date and noncanonical status, with its sources, source
> matrix findings, provenance, and disposition unchanged. After a fixed-point
> role review on 2026-08-20, the proposed `niche` sense — briefly renamed
> `evolutionary-niche` earlier the same day — was **removed**, not rescoped: it
> was found not to be disjoint from `natural-selection` plus a stated
> environment, and the brief's own falsifier required dropping it in that case
> rather than retaining a near-duplicate. The family is now
> *Adaptation, Fitness, Selection, and Exaptation*, and the file was renamed
> accordingly. The qualified `ecological-niche` sense, along with habitat,
> assemblage, trophic structure, and niche construction as an environmental
> process, is owned solely by the ecology candidate reviewed on 2026-08-20;
> bare `niche` is proposed by neither family.
> Selective environment, its axes, and lineage context survive here only as
> factors of `natural-selection` and `adaptation`, consumed from the ecological
> description. The original Formarium framing of the record is preserved.

## Decision question

Does Formarium need a biological owner for historical selected effects,
environment-relative reproductive fitness, natural selection, and co-opted
function?

*(As originally written this line also asked about "ecological niche"; the
2026-08-20 amendment removes that clause, because the ecological niche is owned
by the ecology candidate and no niche sense is proposed here.)*

## Bounded thesis

Proceed only within evolutionary biology. Generic adjustment, engineering
fitness for use, decision selection, optimization fitness functions, social or
market niches, and ecological niche, habitat, assemblage, and food-web
description remain outside this candidate.

The thesis is falsified if current system, lifecycle, causal, and model entries
can express heritable variation, differential reproduction, selected origin,
organism-environment fit, and exaptation without importing biological semantics.
The niche sense was falsified on exactly this test: once ecological role and
resource space were assigned to the ecology candidate, nothing remained that
`natural-selection` over a stated environment did not already carry, so the
sense was dropped.

## Proposed senses

| Sense | Governing question |
|---|---|
| `adaptation` | Which trait in which lineage was built by natural selection for which function in which environment? |
| `fitness` | Under which explicit fitness definition does this variant differ from alternatives in a stated population, environment, and time? |
| `natural-selection` | Which differential survival or reproduction among heritable variants occurs through interaction with the environment? |
| `exaptation` | Which currently useful trait was co-opted rather than selected for its current role? |

No niche sense is proposed. `ecological-niche` — environmental role, resource
space, and the position a population occupies in a community — is proposed by
the ecology candidate alone, and the bare identifier `niche` is proposed by no
family. Where a selection or adaptation claim needs an environment, the
selective environment, its axes, and the lineage context are recorded as
factors of `natural-selection` and `adaptation` and are consumed from the
ecological description rather than restated.

## Candidate contract

```text
adaptation-selection-use
  := lineage, population, and focal trait or variant
   x trait grain, homology, and inheritance basis
   x current function or performance claim
   x selective environment, its axes, and their change across generations,
     consumed as selection context from the ecological description and not
     restated here
   x fitness definition, measure, reference class, and time
   x selection regime, strength, direction, and frequency dependence
   x mutation, migration, recombination, and drift alternatives
   x developmental production bias and constraint
   x historical origin and current utility evidence
   x exaptation or co-option history
   x organism-driven environmental modification as an input to selection, with
     the environmental description held by the ecological owner
   x model, data, uncertainty, and scope limits
```

## Existing-owner audit

- [Choice, Alternative, Criterion, Preference, Recommendation, and Selection](../../../tables/entries/choice-alternative-selection.md)
  owns authorized choice, not evolutionary sorting.
- [Reliability, Availability, Maintainability, Resilience, and Recovery](../../../tables/entries/dependability-reliability-availability-resilience.md)
  owns engineering adaptation and recovery, not selected historical origin.
- [System Composition, Architecture, Capability, Interface, and Dependency](../../../tables/entries/system-composition-dependency.md)
  owns structural environment and capability.
- [State, Event, Transition, Process, and Lifecycle](../../../tables/entries/state-event-transition-process-lifecycle.md)
  owns general process and lifecycle.
- [Association, Causal Effect, Influence, Mechanism, Intervention, and Attribution](../../../tables/entries/causal-reasoning.md)
  owns general causal claims.
- [Ecosystem, Habitat, Ecological Niche, Food Web, and Ecological Interdependence](../candidates/ecosystem-habitat-niche-food-web-interdependence.md)
  is the sibling candidate and the **sole owner of the niche**. It owns
  `ecosystem`, `habitat`, `ecological-niche`, `ecological-community`,
  `food-web`, `trophic-level`, `biological-species-interaction`, and
  `ecological-interdependence`. **Resolution recorded 2026-08-20:** an earlier
  reciprocal split — `evolutionary-niche` here, `ecological-niche` there — did
  not survive fixed-point review, because the evolutionary side was not disjoint
  from `natural-selection` plus a stated environment. This family therefore
  proposes no niche sense at all, consumes ecological role, resource-space
  description, assemblage membership, trophic structure, and niche construction
  from that candidate, and leaves the bare identifier `niche` unowned. See the
  [ecology admission brief](ecology-habitat-niche-food-web-candidate-brief-2026-08-20.md).

## Source matrix

| Source | Contribution | Boundary or challenge |
|---|---|---|
| [Darwin, On the Origin of Species](https://darwin-online.org.uk/content/frameset?itemID=F373&viewtype=text&pageseq=1) | natural selection and descent | historical foundation predates modern genetics |
| [Fisher, Genetical Theory of Natural Selection](https://doi.org/10.5962/bhl.title.27468) | population-genetic foundation | one synthesis tradition |
| [Wright, Evolution in Mendelian Populations](https://doi.org/10.1093/genetics/16.2.97) | population structure and fitness landscape | models require scoped assumptions |
| [Williams, Adaptation and Natural Selection](https://doi.org/10.1515/9780691185507) | selected-effect discipline | does not settle every adaptation dispute |
| [Gould and Lewontin, Spandrels](https://doi.org/10.1098/rspb.1979.0086) | adaptationism critique | current usefulness does not prove adaptation |
| [Gould and Vrba, Exaptation](https://doi.org/10.1017/S0094837300004310) | co-option and current function | origin and present role must be separated |
| [Hutchinson, Concluding Remarks](https://doi.org/10.1101/SQB.1957.022.01.039) | multidimensional niche | niche theories vary; retained as the record of the niche question this family examined and declined to own, and cited substantively by the ecology candidate |
| [Soberon, Grinnellian and Eltonian Niches](https://doi.org/10.1111/j.1461-0248.2007.01107.x) | niche distinctions and distributions | geography alone is insufficient; the Grinnellian and Eltonian readings are ecological and are owned solely by the ecology candidate |
| [SEP, Natural Selection](https://plato.stanford.edu/entries/natural-selection/) | current conceptual survey | selection need not imply directional improvement |
| [SEP, Fitness](https://plato.stanford.edu/entries/fitness/) | propensity, realized success, and reference-class disputes | fitness definitions remain contested |
| [SEP, Adaptationism](https://plato.stanford.edu/entries/adaptationism/) | empirical, explanatory, and methodological adaptationism | blocks universal adaptation stories |
| [Laland et al., Extended Evolutionary Synthesis](https://doi.org/10.1098/rspb.2015.1019) | niche construction and feedback | contested extension of synthesis; the construction process is described by the ecology candidate, and only its consequence for selection is recorded here, as a factor rather than a sense |
| [Uller et al., Developmental Bias and Evolution](https://doi.org/10.1534/genetics.118.300995) | variation-production bias | selection is not the only shaping process |

## Counterevidence and limits

- Trait presence or current utility does not prove adaptation.
- Drift, mutation, migration, developmental constraint, and phylogenetic history
  remain live alternatives.
- Fitness can reverse across environments, frequencies, reference classes, and
  time horizons.
- Selection need not produce monotonic improvement or directional change.
- The selective environment is more than a location, and organisms may modify
  the environment that selects them; the modified environment is described by
  the ecological owner, while only its consequence for selection is recorded
  here, as a factor of `natural-selection` and `adaptation`.
- The niche sense did not survive this limit. Once ecological role and resource
  space were assigned to the ecology candidate, the residue added nothing to
  `natural-selection` plus a stated environment, so the fixed-point review of
  2026-08-20 dropped the sense rather than reclaiming ecological semantics.

## Admission gates

1. Name the biological unit, population or lineage, trait, and environment.
2. State the fitness definition, reference class, and whether the claim uses
   realized reproductive success, a propensity, or another scoped model-specific
   measure; do not canonize one account.
3. Make heredity and differential reproduction explicit for selection claims.
4. Preserve non-selective alternatives.
5. Separate current utility from selected historical origin.
6. Require historical evidence before classifying exaptation.
7. Record the selective environment, its axes, and the lineage context only as
   factors of `natural-selection` and `adaptation`, citing the ecological
   description; do not reintroduce a niche sense under any identifier.
8. Exclude non-biological adaptation, fitness, selection, and niche uses, and
   exclude ecological niche, habitat, community, and food-web description,
   which belong to the ecology candidate.

## Disposition

**PROCEED TO CANDIDATE ENTRY DRAFT; DO NOT ADMIT CANONICALLY.** The literature
supports the family when tightly scoped to evolutionary biology and reviewed
against adaptationist overreach.

*Amendment note, 2026-08-20.* The disposition is unchanged. The niche boundary
is no longer a two-sided dependency: the ecology candidate is the sole niche
owner, this family proposes no niche sense, and `niche` is owned by no entry.
Admission review should confirm that the four remaining senses still stand
without it.

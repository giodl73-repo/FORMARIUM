# Observation-to-Inference Evidence Chain

Status: candidate Evidence Table

Primary family: Evidence Table

Canonical headword: [Claim and Evidence](../entries/claim-evidence.md)

Canonical senses: `claim`, `evidence-item`, `result`, `limitation`,
`confidence`, `provenance`, `observation`, `measurement`, `inference`

## Governing question

What exact source, observation or measurement, result, and inference bears on
a claim, with which contradictions, uncertainty, limitations, and confidence?

## Chain table

| Stage | Governing question | Required record | Not equivalent to |
|---|---|---|---|
| source | Which entity or prior record was encountered or used? | stable identity, version, authority, retrieval/custody | evidence strength |
| activity | What observing, measuring, transforming, or evaluating activity occurred? | method, actor/system, inputs, conditions, start/end, software/instrument version | result |
| observation | What was encountered or detected? | raw record, subject, observer/system, context, time, method | measurement by default |
| measurement | Which quantity values were obtained? | measurand, model, procedure, measuring system, conditions, values, unit/reference, uncertainty | bare number |
| result | What output did the stated method produce? | output identity, transformation/correction, parameters, uncertainty or error treatment | conclusion |
| inference | How were premises connected to a conclusion? | premises, rule/model, assumptions, alternatives, conclusion | observation or result |
| claim implication | How does the item bear on this exact claim? | support, contradiction, exclusion, or no-bearing rationale | intrinsic property of artifact |
| limitation | What scope or interpretation is excluded? | affected claim, cause, consequence, mitigation or needed evidence | hidden footnote |
| confidence | How is current support summarized? | criteria, scale/model, evidence set, sensitivity, reviewer, date | evidence or measurement uncertainty |
| provenance | Can the chain be reconstructed? | entities, activities, agents, use, generation, derivation, attribution, revision | proof of validity |

## Evidence row contract

| Field | Requirement |
|---|---|
| Claim identity | exact proposition, subject/population, scope, and version |
| Evidence identity | stable artifact or record identity |
| Stage | observation, measurement, result, inference, source, or argument |
| Method | named procedure/model and version |
| Conditions | relevant environment, controls, comparison, and time |
| Implication | supported, contradicted, excluded, untested, or no bearing |
| Uncertainty | quantity uncertainty, sampling/model uncertainty, or explicit not applicable |
| Alternatives | plausible competing explanations or interpretations |
| Limitation | what the item does not establish |
| Provenance | source entity, generating activity, responsible agent/system, derivation |
| Review | reviewer, decision, date, and supersession |

## Worked distinctions

| Record | Correct classification | Incorrect shortcut |
|---|---|---|
| Sensor voltage at a timestamp | observation or indication | complete measurement result |
| Calibrated temperature with uncertainty | measurement result | exact true temperature |
| Test suite exit code | result | proof that all behavior is correct |
| Statistical model conclusion | inference | raw observation |
| Paper citation | source/provenance | automatic supporting evidence |
| Reproducible artifact chain | provenance | proof that the claim is valid |

## Failure signs

- raw data, transformed results, and conclusions share one field;
- a measurement omits measurand, conditions, unit/reference, or uncertainty;
- an inference omits assumptions or alternative explanations;
- every cited source is marked supporting without an implication;
- null, tied, contradictory, or excluded results disappear;
- confidence is reported without criteria or evidence-set identity;
- provenance is used as a maturity or truth score;
- revisions overwrite prior evidence dispositions.

## Sources and provenance

1. [Observation and inference research](../../docs/research/2026-08-14-observation-measurement-inference.md)
2. JCGM VIM, "measurement":
   https://jcgm.bipm.org/vim/en/2.1.html
3. JCGM VIM, "measurement result":
   https://jcgm.bipm.org/vim/en/2.9.html
4. W3C, PROV-O:
   https://www.w3.org/TR/prov-o/
5. NIST, "Measurement Uncertainty":
   https://www.nist.gov/itl/sed/topic-areas/measurement-uncertainty

Metrology definitions remain scoped to quantity measurement. The broader
observation and inference organization is candidate Factorium synthesis.

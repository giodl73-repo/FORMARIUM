# Operating-Condition Composition Failure Diagnostic

Status: candidate Diagnostic Table

Primary family: Diagnostic Table

Canonical headword: [Assumption, Condition, Scenario, Case, and Feasibility](../entries/scenario-assumption-condition-case.md)

Canonical senses: `condition`, `scenario`, `case`, `feasibility`

## Governing question

Why did an option that appeared feasible in a static frame fail, degrade, or
remain unresolved in operation?

## Diagnostic table

| Symptom | Candidate operating-condition gap | Discriminating test |
|---|---|---|
| request sent, work absent | routing/correlation, acknowledgment-level, queue, authority, or recipient gap | reconstruct interaction and queue history |
| commitment exists, capacity absent | obligation/guarantee scope, condition, dependency, or nonperformance | compare terms, allocation, and actual resource events |
| adequate aggregate capacity, local shortage | location, route, network, compatibility, timing, or bottleneck | inspect spatial/resource vector and substitute limits |
| no detected events, later harm | exposure opportunity, coverage/sensitivity, delayed signal, or untracked pathway | reconstruct hazard-exposure-detection timeline |
| response active, harm persists | wrong pathway, delay, insufficient resource, interaction, side effect, or vulnerability | map treatment mechanism and residual risk |
| same label, changed behavior | version, configuration, authority, topology, agreement, or lineage drift | compare exact history/provenance |
| outcome differs across cases | scenario, population, spatial, queue, dependency, or vulnerability heterogeneity | stratify by declared operating factors |

## Review procedure

1. Freeze exact case, scenario, version, expected result, observed state, and
   evidence status.
2. Reconstruct interaction, commitments, queues, resources, spatial relations,
   hazard/exposure, treatments, actors, and history without assuming one cause.
3. Test alternate decompositions and interactions; preserve unmatched events,
   unresolved frontiers, and residual harm/obligation/shortage.
4. Bound the supported explanation and prohibited causal, safety, and outcome
   claims.

## Boundary

This diagnostic organizes investigation questions. It does not diagnose a
real incident, establish cause, certify safety, or prescribe response.

## Sources and provenance

- NASA, [*NASA Systems Engineering Handbook*](https://www.nasa.gov/reference/system-engineering-handbook-appendix/),
  supports distinguishing verification against requirements from validation
  in an intended environment, and checking integrated interfaces and
  configuration.
- NIST, [SP 800-160 Vol. 1 Rev. 1, *Engineering Trustworthy Secure
  Systems*](https://csrc.nist.gov/pubs/sp/800/160/v1/r1/final), supplies a
  security-engineering example in which lifecycle, operational environment,
  integration, verification, and validation matter together.

These sources support bounded distinctions, not this table as a universal
diagnostic. The seven symptom groupings are Factorium editorial synthesis;
they do not establish cause, safety, or outcome.

# Factorization Failure Diagnostic

Status: candidate Diagnostic Table

Canonical headword:
[Factorization Quality](../entries/factorization-quality.md)

Primary family: Diagnostic Table

Purpose: map observed structural symptoms to candidate causes and next tests;
it does not claim that one symptom proves one diagnosis.

## Diagnostic table

| Observation | Candidate cause | Discriminating test | Likely repair |
|---|---|---|---|
| Subclass or category explosion | several independent axes forced into one hierarchy | vary each candidate axis independently across examples | select one pivot; move other roles to composition, traits, relations, or metadata |
| Opaque names accumulate suffixes | names are carrying hidden identity factors | remove/rename one suffix and test whether identity changes | store canonical factors; generate names as projections |
| Many unexplained exceptions | missing context, constraint, or competing sense | cluster exceptions by repeated condition | add factor/constraint or split sense |
| Invalid combinations proliferate | Cartesian product assumed where factors depend | enumerate pairwise and higher-order incompatibilities | add constraints or replace independent axes with a structured relation |
| Output appears among inputs | derived decision counted as source fact | recompute output from remaining facts and policy | mark derived view; remove circular input |
| One platform primitive appears everywhere | mechanism mistaken for semantic role | express same domain in a second paradigm | restore general role; map mechanisms separately |
| Status field gains dozens of values | state, event, lifecycle, and process collapsed | classify each value as condition, occurrence, transition, or projection | build state/transition model and derive status |
| Version number does not predict compatibility | scheme or versioned subject is undefined | identify public contract and compare actual changes | declare scheme or stop claiming semantic compatibility |

## Use contract

1. Record the observation without assuming a cause.
2. Select all plausible candidate causes.
3. Run the discriminating test on representative and adversarial examples.
4. Preserve counterevidence.
5. Apply the smallest semantic repair before changing mechanisms.
6. Review whether the repair creates new invalid combinations.

## Sources and provenance

1. `tables/foundations/FACTOR-ROLES.md`
2. `specs/FACTOR-TABLE-ENTRY.md`
3. current reviewed pilot examples.

Diagnostic maturity: `candidate`.


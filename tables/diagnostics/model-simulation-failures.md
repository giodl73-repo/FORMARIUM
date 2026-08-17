# Model and Simulation Failure Diagnostic

Status: candidate Diagnostic Table

Primary family: Diagnostic Table

Canonical headword: [Model, Representation, and Simulation](../entries/model-representation-simulation.md)

Canonical senses: `model`, `representation`, `simulation`, `simulation-run`,
`simulation-result`

## Governing question

Which layer could explain a model or simulation discrepancy, and what bounded
test would distinguish it?

## Diagnostic table

| Observation | Candidate causes | Discriminating test | Repair owner |
|---|---|---|---|
| Stakeholders disagree about what the model says | purpose, subject, variables, semantics, or view differs | restate one frozen claim from model content through each representation | model owner |
| Same model yields different output | code/configuration, solver, seed, platform, data, or conditions differ | replay with frozen identities and vary one mechanism at a time | implementation/run owner |
| Code matches equations but observations disagree | assumptions, boundary, parameterization, measurement, or validity domain fails | compare residuals by regime and test competing model structures | model/evidence owner |
| Aggregate matches while important cases fail | cancellation, segmentation, tail behavior, or omitted mechanism | stratify discrepancies by subject, regime, and outcome | validation owner |
| More detail worsens decisions | uncertain inputs, overfit, numerical instability, or irrelevant fidelity | compare simpler and richer models on held-out intended-use criteria | decision/model owner |
| Result cannot be reproduced | missing version, input, seed, environment, or post-processing | reconstruct the exact run manifest and hash every dependency | provenance owner |
| A picture is treated as proof | visual representation hides assumptions, scale, or quantitative mismatch | compare claims against explicit variables, equations/rules, and evidence | claims owner |

## Use contract

1. Freeze the disputed claim, intended use, subject, regime, and evidence.
2. Preserve model, representation, implementation, data, run, and result IDs.
3. List candidates across layers before tuning parameters.
4. Change one layer or assumption at a time and retain contradictory results.
5. Repair the owning layer and rerun the intended-use evaluation.

## Failure signs

- every discrepancy is called model error;
- verification and validation share one unlabeled status;
- calibration is performed on the only evaluation data;
- failed runs or regimes disappear from the report;
- named tools or methods become canonical senses.

## Sources and provenance

See the canonical entry. This diagnostic is a candidate synthesis, not a
universal V&V procedure or model-credibility result.

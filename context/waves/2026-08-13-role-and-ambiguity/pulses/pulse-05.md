# Pulse 05: Role/Ambiguity Bakeoff

## Goal

Measure candidate-set preservation and role/filler binding under a frozen
decision rule.

## Planned changes

- Exact candidate-set match with explicit denominator.
- Candidate precision and recall as separate counts.
- Per-role filler accuracy on unambiguous examples.
- Binding and unbinding accuracy for every representation owner.
- Role-swap and shared-filler locality.
- Separate semantic and cost classifications.
- Retained HRR dimension diagnostics with `256` as the decision owner.

## Status

Complete.

## Outcome

- Scored all six splits across seven binding owners and two whole lookup
  deletion targets.
- Reported train/test exact candidate sets, candidate counts, meaning
  reconstruction, and role accuracy.
- Distinguished familiar complete meanings from unseen complete candidate
  sets on disambiguation transfer.
- Preserved HRR-64 failures and HRR-128 diagnostics while keeping HRR-256 as
  decision owner.
- Added separate role addressability, edit locality, storage, metadata,
  parameters, and temporary-memory fields.
- Classified role factorization and ambiguity composition as useful.
- Classified representation specificity as false because exact conventional
  controls tie.
- Froze canonical evidence, result interpretation, tests, CLI output, and role
  review.

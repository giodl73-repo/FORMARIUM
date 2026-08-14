# Pulse 03: Role and Ambiguity Fixtures

## Goal

Generate the ordered-transfer and attachment-ambiguity families with
leakage-resistant analysis-family splits.

## Planned changes

- Generate complete meanings before analysis sets and surfaces.
- Admit equal fillers across distinct roles and slots.
- Add ambiguous surfaces plus reading-specific paraphrases.
- Group complete analysis families before ordinary split membership.
- Add explicit surface-disambiguation transfer.
- Freeze schema, corpus, analysis-set, surface, and split identities.

## Status

Complete.

## Outcome

- Added canonical transfer and attachment schemas.
- Generated 512 ordered-transfer meanings with 512 families and 1024 surfaces.
- Generated 128 constrained attachment meanings with 64 two-reading families
  and 192 surfaces.
- Preserved equal fillers across distinct giver and recipient bindings.
- Preserved exact ambiguous and reading-specific candidate sets.
- Added family-hash IID, slot, shared-filler, object, and disambiguation splits.
- Enforced ordinary family/candidate disjointness and atom/pair coverage.
- Declared complete candidate overlap only for surface disambiguation.
- Froze schema, frame, corpus, analysis, and split identities.
- Added `factor role-fixtures`, focused tests, specification, and role review.

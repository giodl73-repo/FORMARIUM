# Factorium Reader Terminal Handoff

Status: internal handoff contract under implementation

Reference implementation: `sim-39`

## Reader job and change

At exact Reader step 24, a reader should see that the selected editorial route
has ended and reach the Reader's existing bounded next paths. `sim-39` replaces
the terminal empty next slot with one static **End of selected route** link to
the existing after-route section on `reader.html`.

The link derives its position from the frozen manifest. It does not mark
completion, mastery, success, outcome, or canonical closure. Previous Reader
navigation and the all-contents sequence remain unchanged.

## Checks and boundary

- exactly one finish link exists, on manifest record 24 only;
- it targets the existing after-route section with zero missing fragments;
- steps 1-23 have no finish link and retain 23 next links;
- step 24 retains its exact previous link and has no next link;
- no state, storage, progress, or outcome language is added;
- `sim-38` reproduces exactly.

This proves deterministic route termination only, not completion, learning,
preference, external-preview readiness, or publication value.

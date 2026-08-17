# Factorium Reader Terminal Handoff Role Review

Status: plan reviewed; implementation pending

Date: 2026-08-17

Skill review: `signals/roles/check/factorium-reader-end-roles-check-2026-08-17.md`

## Product value contract

| Field | Decision |
|---|---|
| Reader | A practitioner arriving at exact Reader step 24 |
| Job | Recognize the selected route boundary and choose an existing bounded onward path |
| Current friction | The terminal panel contains an empty next slot and no book-owned handoff |
| Product change | Add one static end-of-selected-route link to the existing after-route section |
| Evidence now | Exact terminal membership, destination, exclusions, live handoff, and regression |
| Evidence later | Completion, comprehension, learning, preference, and return use |
| Cost and displacement | One generated link; no page, content, relation, state, or route expansion |
| Continue/merge/stop | Close the terminal break; stop further Reader mechanics absent new evidence |

## Admission conditions

- only manifest record 24 receives one finish link;
- steps 1-23 retain exact next links and receive no finish link;
- the finish target is the existing Reader after-route section;
- wording says selected route ended, not completed, mastered, or succeeded;
- no state or canonical-closure implication is admitted;
- `sim-38` reproduces exactly and `sim-39` has zero missing targets.

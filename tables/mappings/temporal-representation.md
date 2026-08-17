# Temporal Representation Mapping

Status: candidate Mapping Table

Primary family: Mapping Table

Canonical headword: [Instant, Duration, Interval, Deadline, and Schedule](../entries/temporal-organization.md)

Canonical senses: `time-instant`, `duration`, `time-interval`, `deadline`,
`schedule`, `milestone`

## Governing question

Which record shape preserves the selected temporal meaning and what remains
outside the representation?

## Mapping table

| Semantic role | Candidate fields | Must preserve | Common loss |
|---|---|---|---|
| instant | timestamp, time-scale, offset/zone, precision, uncertainty | event identity and scale | string implies universal instant |
| duration | numeric value, unit, measurement basis, uncertainty | endpoints or procedure where material | calendar amount treated as fixed seconds |
| interval | start, end, bound inclusivity, scale/zone | open and unknown bounds | end date silently included/excluded |
| deadline | boundary, required condition, authority, grace/exception, consequence | governed source and version | forecast stored as obligation |
| schedule activity | identity, duration, predecessors, calendar, resources, baseline/current dates | scope, logic, status, uncertainty | dates without dependency logic |
| milestone | identity, instant, completion criterion, authority | zero-duration event meaning | milestone used as hidden work package |

## Round-trip checks

1. Normalize only with a declared scale, zone database/version, and rule.
2. Preserve the submitted representation when legal or human meaning matters.
3. Test daylight-saving gaps/overlaps, leap handling, open bounds, precision,
   unknown values, and calendar arithmetic.
4. Recompute schedule dates after dependency, calendar, or resource changes.
5. Reject representations that cannot distinguish required senses.

## Failure signs

- one `time` column alternates among instant, duration, and deadline;
- timezone conversion loses the source zone or ambiguity choice;
- inclusive bounds depend on undocumented convention;
- milestone duration is nonzero without reclassification;
- baseline changes overwrite history.

## Sources and provenance

See the canonical entry. This mapping is not a complete time standard,
calendar library contract, or schedule feasibility result.

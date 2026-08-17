# Instant, Duration, Interval, Deadline, and Schedule

Status: candidate anchor entry

## Orientation

Temporal records distinguish a point on a declared time scale from elapsed
duration, a bounded interval, an authority-defined deadline, and a schedule
that arranges activities and milestones. A date-time string does not supply a
time scale, timezone, calendar, uncertainty, inclusivity rule, or governing
authority by itself.

## Sense table

| Sense | Governing question | Role |
|---|---|---|
| `time-instant` | At which point on which time scale is an event or state located? | temporal point |
| `duration` | What elapsed temporal extent separates selected events under which measurement basis? | temporal quantity |
| `time-interval` | Which set of instants lies between declared bounds with which inclusivity? | bounded temporal region |
| `deadline` | By which governed temporal boundary must a condition hold or action occur? | authority-backed time constraint |
| `schedule` | How are planned activities, dependencies, milestones, calendars, and resources arranged over time? | planned temporal work model |
| `milestone` | Which zero-duration planned point denotes a defined event or accomplishment? | schedule marker |

## Root factorization

```text
temporal-use
  := event/state/activity identity
   x instant, duration, interval, deadline, schedule, or milestone sense
   x clock and time scale
   x calendar, timezone, locale, and offset rules
   x start/end bounds and inclusivity
   x precision, resolution, uncertainty, and synchronization
   x activity dependencies, calendars, resources, and progress basis
   x authority, effective version, exceptions, and provenance
```

## Contrast table

| Pair | Shared feature | Decisive distinction |
|---|---|---|
| Instant vs. duration | both can use time units/display | location on scale vs. elapsed extent |
| Duration vs. interval | interval has duration | quantity of elapsed time vs. bounded set of instants |
| Deadline vs. forecast date | both name future boundaries | governed required boundary vs. evidence-based prediction |
| Deadline vs. target | both may guide work | enforceable/authoritative temporal constraint vs. desired aim |
| Schedule vs. calendar | schedules use calendars | activity/dependency/resource model vs. working-time/date convention |
| Milestone vs. activity | both appear in schedule | zero-duration event marker vs. work consuming time/resources |

## Specialized view

[Temporal Representation Mapping](../mappings/temporal-representation.md)
maps semantic roles to common record fields without treating one format as
universal.

## Selection procedure

1. Identify event, state, or activity and select the temporal sense.
2. State clock/time scale, calendar, timezone, locale, and synchronization.
3. For intervals, state both bounds, inclusivity, and open/unknown behavior.
4. For durations, state measurement basis, units, precision, and uncertainty.
5. For deadlines, name source authority, condition, grace/exception rules, and
   consequence; do not substitute a forecast.
6. For schedules, record scope, activities, dependencies, calendars,
   milestones, resources, baseline, status date, uncertainty, and version.
7. Preserve original and normalized representations and conversion rules.

## Constraints and failure signs

- Instants and durations do not share an unlabeled numeric field.
- Local date-times retain timezone and ambiguity/nonexistence handling.
- Interval inclusivity is explicit.
- Calendar duration is not silently treated as fixed SI seconds.
- Deadline authority and exception rules remain visible.
- Milestones have completion criteria and do not consume duration/resources.
- Named calendars, formats, scheduling methods, and software remain examples.

## Cross-references

- [Time](../roots/time.md)
- [Quantity, Value, Unit, and Conversion](quantity-value-unit-conversion.md)
- [Coordinated Work](coordinated-work.md)
- [State, Event, Transition, Process, and Lifecycle](state-event-transition-process-lifecycle.md)

## Sources and provenance

1. BIPM, *The International System of Units*, 9th ed., updated 2026:
   https://www.bipm.org/en/publications/si-brochure/
2. IETF RFC 3339, *Date and Time on the Internet: Timestamps*:
   https://www.rfc-editor.org/rfc/rfc3339
3. U.S. GAO, *Schedule Assessment Guide*, GAO-16-89G:
   https://www.gao.gov/assets/gao-16-89g.pdf

Comparator access date: 2026-08-16. Timekeeping, legal, contractual, and
project authorities retain their scopes; this synthesis remains `candidate`.

# Newtonian Mechanics Context Profile

Profile ID: `newtonian-mechanics-v0`

Status: candidate

Summary: Shared Newtonian model and SI presentation conventions for bounded mechanics records; the represented system and actual reference frame remain required local choices.

Defaults: `model-family = Newtonian mechanics`; `unit-system = SI`; `time-basis = seconds`

Requires: `system boundary`; `reference frame`; `origin and axes`; `positive directions`; `interaction or path scope`; `regime exclusions`

## Applicability

Use this profile only for records explicitly bound to a Newtonian mechanics
sense or formula view. It covers ordinary nonrelativistic mechanics using SI
presentation. It does not establish that one frame, system, origin, force set,
path, or potential zero is correct for a particular problem.

## Fixed defaults and conventions

| Field | Inherited value | Kind | Authority boundary |
|---|---|---|---|
| Model family | Newtonian mechanics | fixed default | only explicitly bound mechanics senses and views |
| Unit system | SI | presentation convention | values may be converted when the local use declares the conversion |
| Time basis | seconds | presentation convention | does not choose an observation interval |
| Vector comparison | one declared coordinate system per calculation | convention | axes and positive directions remain local selections |

## Required selections

| Selection | Why no profile-wide value is safe |
|---|---|
| System boundary | Changes which interactions are external and which energy terms belong to the system |
| Reference frame | Changes position, velocity, acceleration components, and kinetic energy |
| Origin and axes | Changes coordinates and signed components |
| Interaction or path scope | Changes aggregation, work, and transfer claims |
| Regime exclusions | Newtonian treatment may be invalid for changing-mass, relativistic, or other specialized cases |

## Overrides and conflicts

A local record or guide may declare another unit display, coordinate system, or
narrower Newtonian model. The override must remain visible and must preserve
conversion, sign, boundary, and frame consistency. A relativistic or
non-Newtonian model conflicts with this profile and requires a different
profile rather than a local cosmetic override.

## Sources and provenance

- OpenStax, *University Physics Volume 1*, Newtonian mechanics treatment.
- BIPM, *The International System of Units (SI Brochure)*.
- NIST, SI unit guidance.

Profile revision: V0 simulation candidate, 2026-08-15. Domain-specialist
review remains a promotion gate.

# Context Profile V0

Status: candidate simulation contract

## Purpose

A Context Profile names circumstances, conventions, and requirements shared by
multiple Factorium records or one bounded application. It reduces repeated
boilerplate without turning an unstated assumption into a universal default.

Context Profiles are auxiliary reusable contracts, not a twelfth Reference
Table family and not canonical entry authorities. Canonical entries retain
their sense, factor, constraint, and source ownership.

## Governing distinctions

| Kind | Meaning | May be inherited? | May be omitted at use time? |
|---|---|---:|---:|
| Fixed default | A value selected for every use inside the declared applicability scope | yes | yes, while the profile binding remains visible |
| Convention | A shared representation, notation, direction, or display rule | yes | yes, while the profile binding remains visible |
| Required selection | A field whose value changes the represented result or validity | requirement only | no |
| Applicability condition | A condition under which the profile is allowed to govern | yes | no |
| Local override | A more specific value that deliberately replaces an inherited default | yes | no; the override must be visible |
| Exclusion | A case the profile does not cover | yes | no |

Reference frame, system boundary, jurisdiction, authority source, target
version, and trust boundary are usually required selections rather than safe
global values. A profile may inherit the requirement to choose them; it MUST
NOT silently invent their values.

## Resolution order

```text
record or guide override
  -> chapter or domain profile
  -> volume profile
  -> unresolved requirement
```

The first applicable declaration wins. There is no repository-global semantic
fallback. Failure to resolve a required selection is visible and invalidates
uses that depend on it.

## Profile contract

Every profile MUST declare:

1. stable profile ID and display name;
2. candidate/supported/established/disputed/deprecated status;
3. bounded applicability and exclusions;
4. fixed defaults, each with scope and authority;
5. conventions, each with scope;
6. required selections and why no default is safe;
7. permitted local overrides and their visibility rule;
8. invalidation and conflict conditions;
9. sources and revision custody.

Simulation profile documents additionally expose compact `Defaults` and
`Requires` lines so a deterministic renderer can present their inheritance
contract without interpreting prose.

## Binding contract

A binding joins one selected record path to one profile ID and declares the
sense or view to which it applies. Bindings are contextual and many-to-many:
one record may use different profiles for different senses, and one profile
may govern many records.

A binding MUST fail validation when:

- its profile ID is unknown;
- its record is not present in the selected publication;
- the same record/profile/applicability tuple is duplicated;
- the profile does not declare Defaults or Requires;
- an override conflicts with an applicability condition;
- a required selection is represented as an inherited fixed value without
  explicit profile authority.

## Presentation contract

Reader projections SHOULD show a compact profile chip near the record title.
Expanding it reveals applicability, inherited defaults, required selections,
and a link to the complete profile. Compact presentation does not erase the
underlying profile or record text. Full presentation retains every bound
profile source.

## Non-goals

- one universal context decomposition;
- treating reference frame as the name for every domain qualifier;
- silent assumptions chosen for reader convenience;
- removing operational warnings where a contextual choice changes a result;
- changing the frozen Factorium Reference Interchange V0 in this prototype;
- claiming that readers understand inheritance without observation.

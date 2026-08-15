# Context Profiles

Status: candidate simulation profiles

Context Profiles are reusable applicability, default, convention, and required-
selection contracts. They reduce publication repetition without becoming
canonical entries or a new Reference Table family. See
[`Context Profile V0`](../../specs/CONTEXT-PROFILE.md).

| Profile | Scope | Defaults | Required locally |
|---|---|---|---|
| [Newtonian Mechanics](newtonian-mechanics.md) | bounded Newtonian mechanics senses and views | model family, SI presentation, time basis | system, boundary, frame, axes, direction, interaction/path, exclusions |
| [Governed Organization](governed-organization.md) | organizational governance and assignment records | bounded-view, effective-date, and provenance conventions | organization, authority, jurisdiction, obligations, time, review forum |
| [Versioned Software System](versioned-software-system.md) | software anchors and mechanism mappings | contextual mapping, version-sensitive identity, explicit contracts | target, runtime, version, trust boundary, lifecycle, compatibility/failure contract |

The `sim-06` bindings are publication-only and do not alter Factorium
Reference Interchange V0.

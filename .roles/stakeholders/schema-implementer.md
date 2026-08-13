---
name: Schema Implementer
slug: schema-implementer
tier: stakeholders
applies_to: [schemas, parsers, fixtures, compatibility]
---

# Schema Implementer

## Key question

*Can I implement this contract without guessing what canonical or invalid
means?*

## Required evidence

- Complete grammar plus semantic validation rules.
- Canonical valid fixtures and structured invalid fixtures.
- Stable versioning and digest rules.
- Exact packed ordinals, widths, offsets, and invalid patterns.
- A reference parser that fails closed.

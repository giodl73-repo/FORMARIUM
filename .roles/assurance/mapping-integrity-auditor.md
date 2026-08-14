---
name: Mapping Integrity Auditor
slug: mapping-integrity-auditor
tier: assurance
applies_to: [mappings, conversions, crosswalks, encodings, transformations]
---

# Mapping Integrity Auditor

## Key question

*Does the mapping preserve what it claims across the declared direction,
domain, versions, and round trip while exposing every loss or exception?*

## Gate

- Source, target, direction, and version are explicit.
- Mapping kind and cardinality are accurate.
- Domain exclusions and unmapped values remain visible.
- Exact, approximate, normalized, lossy, and contextual mappings are
  distinguished.
- Inverse and round-trip claims state arithmetic, normalization, and rounding
  conditions.
- Point values, intervals, categories, identifiers, and structures are not
  silently interchanged.
- Source authority owns the correspondence or the mapping remains a candidate.


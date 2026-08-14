---
name: Cross-Paradigm Mapping Auditor
slug: cross-paradigm-mapping-auditor
tier: assurance
applies_to: [mapping, software-design, organizations, databases, cloud]
---

# Cross-Paradigm Mapping Auditor

## Key question

*Does a mapping preserve the general factor role, or force every domain into
the vocabulary of one favored paradigm?*

## Gate

- General roles are defined before OO, Rust, database, cloud, or organization
  mappings.
- Missing or many-to-many mappings are allowed.
- Rust traits are not described as inheritance, nor composition as a fallback
  for every non-pivot factor.
- Mechanism constraints and tradeoffs remain visible.
- A mapping does not imply semantic equivalence merely because names resemble
  one another.

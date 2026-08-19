# Formarium Canonical Naming Role Review

Date: 2026-08-19
Verdict: pass

## Findings

| Lens | Finding | Disposition |
|---|---|---|
| Product Owner | A permanent public/internal split would make every future example explain two names. | Formarium is canonical across product, CLI, contracts, and generated UX. |
| Schema Implementer | A blind in-place rename would make existing packets unreadable. | Parsers accept frozen legacy envelopes; writers, fixtures, and current examples use Formarium. |
| Research Integrity & Provenance | Renaming the archived wave or reviewed source paths would invalidate custody claims. | Historical paths remain immutable imports; the new active wave records the migration. |
| Simplicity | Maintaining hand-authored duplicate contracts would drift. | One deterministic builder derives and checks the initial Formarium set. |
| Security and failure posture | Silent fallback between namespaces could hide malformed current files. | Each accepted header is explicit; unknown revisions still fail closed. |

## Fixed-point conditions

- no semantic entry, sense, factor, view, relation, review, or pointer count
  changes;
- all current examples use Formarium files;
- the legacy parser path is covered by retained tests;
- the canonical parser path, renderer, and mobile browser path are covered by
  new tests;
- `sim-65` remains a reproducible historical snapshot.

No critical or major finding remains open.

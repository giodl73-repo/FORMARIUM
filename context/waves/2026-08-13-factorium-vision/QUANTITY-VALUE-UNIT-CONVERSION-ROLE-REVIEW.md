# Quantity Value, Unit, Dimension, and Conversion Role Review

Status: fixed point for candidate publication

## Scope

- `docs/research/2026-08-15-quantity-value-unit-conversion.md`
- `tables/entries/quantity-value-unit-conversion.md`
- `tables/mappings/unit-conversion.md`
- `tables/mappings/temperature-scales.md`
- `signals/discover/websearch/quantity-value-unit-conversion-websearch-2026-08-15.md`
- `signals/roles/check/quantity-value-unit-conversion-roles-check-2026-08-15.md`
- `signals/validate/dimensional/quantity-value-unit-conversion-dimensional-2026-08-15.md`
- canonical interchange, assurance, Factor Forge selection, Task AE, and
  current-source book projection

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| QUC-001 | major | Quantity value, numerical value, and unit could collapse. | Closed: separate senses, symbols, and contrasts govern them. |
| QUC-002 | major | Dimension matching could license invalid semantic substitution. | Closed: same quantity kind is required; dimension is only a rejection check. |
| QUC-003 | major | Conversion factor could incorrectly include affine offsets. | Closed: factors are multiplicative ratios; affine conversion is a broader Mapping kind. |
| QUC-004 | major | Compound units could lose powers or denominator direction. | Closed: powered constituent factors and examples retain both. |
| QUC-005 | major | Point and interval temperatures could share an offset. | Closed: point and interval contracts are separate. |
| QUC-006 | major | Exact unit relations could imply exact measured results. | Closed: factor status, uncertainty, precision, and rounding remain distinct. |
| QUC-007 | major | Conversion could imply calibration, correction, or validity. | Closed: these operations and claims remain explicitly separate. |
| QUC-008 | major | Named units and systems could expand into a catalog. | Closed: reusable roles are canonical; unit data remain authority-owned examples. |
| QUC-009 | major | Ordinal or logarithmic values could be forced into factor cancellation. | Closed: they require separately governed procedures or reference relations. |
| QUC-010 | major | New records could remain disconnected from the book and search route. | Closed: Part XXIII, Task AE, and exact route coverage own both paths. |

The dimensional audit checks 46 equations with zero P1 errors. All 13 selected
roles pass after amendments; no critical or major actionable finding remains
open for candidate publication.

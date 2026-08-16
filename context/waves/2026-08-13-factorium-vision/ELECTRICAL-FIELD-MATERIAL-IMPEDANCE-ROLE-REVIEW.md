# Electrical Field, Material, Storage, and Impedance Role Review

Status: fixed point for candidate publication

## Scope

- `docs/research/2026-08-15-electrical-field-material-impedance.md`
- `tables/entries/electrical-quantity.md`
- `tables/formulas/electrical-quantities.md`
- `tables/diagnostics/electrical-field-material-impedance-failures.md`
- canonical interchange, assurance, Factor Forge, and book projections

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| EFMI-001 | major | Field and potential difference could collapse. | Closed: local vector and point-pair difference are distinct. |
| EFMI-002 | major | Resistivity and resistance could collapse. | Closed: material and specimen/geometry levels are distinct. |
| EFMI-003 | major | Capacitance and charge could collapse. | Closed: property and state are distinct. |
| EFMI-004 | major | Impedance could equal resistance magnitude. | Closed: complex phase and frequency remain explicit. |
| EFMI-005 | major | Ideal formulas could escape their regimes. | Closed: electrostatic, uniform, linear, and sinusoidal scopes are explicit. |
| EFMI-006 | major | Fixture effects could become device properties. | Closed: calibration plane and parasitics are required. |
| EFMI-007 | major | Equivalent circuits could prove mechanism. | Closed: representation and physical evidence remain separate. |
| EFMI-008 | major | Symbol `i` could have two meanings. | Closed: imaginary unit is `j`; current retains `i`. |
| EFMI-009 | major | Field values could imply exposure safety. | Closed: safety and exposure claims are excluded. |
| EFMI-010 | major | Named component/material catalogs could expand without bound. | Closed: examples remain external. |

All 13 selected roles pass after amendments; no critical or major actionable
finding remains open for candidate publication.

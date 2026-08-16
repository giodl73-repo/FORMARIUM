# Information, Encoding, Channel, and Capacity Role Review

Status: fixed point for candidate publication

## Scope

- `docs/research/2026-08-15-information-encoding-channel-capacity.md`
- `tables/entries/information-data-signal-noise.md`
- `tables/formulas/information-signal-measures.md`
- `tables/diagnostics/information-encoding-channel-failures.md`
- canonical interchange, assurance, Factor Forge, and book projections

## Findings and closure

| ID | Severity | Finding | Closure |
|---|---|---|---|
| IECC-001 | major | Encoding could collapse representation into meaning. | Closed: mapping and interpretation remain separate. |
| IECC-002 | major | Decoder direction, version, and loss could disappear. | Closed: exact, normalized, and lossy round trips are explicit. |
| IECC-003 | major | A physical medium or protocol could become the channel definition. | Closed: the input-output transition model owns the sense. |
| IECC-004 | major | Mutual information could be presented as causation. | Closed: symmetric dependence and causal claims remain distinct. |
| IECC-005 | major | Mutual information could be presented as semantic agreement. | Closed: modeled dependence and interpreted meaning remain distinct. |
| IECC-006 | major | A biased or leaked estimate could appear authoritative. | Closed: sample, estimator, preprocessing, uncertainty, and leakage checks are required. |
| IECC-007 | major | One input distribution could be called capacity. | Closed: optimization over the fixed admissible class is explicit. |
| IECC-008 | major | Observed throughput could be called capacity. | Closed: model bound and operating result remain separate. |
| IECC-009 | major | Bits/use, bits/s, and bits/s/Hz could collapse. | Closed: use clock and bandwidth normalization are explicit. |
| IECC-010 | major | Named codes, formats, protocols, and media could expand without bound. | Closed: named families remain examples or external taxonomies. |

All 13 selected roles pass after amendments; no critical or major actionable
finding remains open for candidate publication.

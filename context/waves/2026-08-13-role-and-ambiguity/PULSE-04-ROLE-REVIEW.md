# Pulse 04 Binding Controls Review

Date: 2026-08-13

Artifacts reviewed: `src/binding.rs`, `tests/binding.rs`, CLI tests, and
`specs/BINDING-CONTROLS.md`.

## Disposition

| Role or lens | Result | Finding or rationale |
|---|---|---|
| Compositional Semantics Steward | pass | Shared fillers use one identity while every role and ordered slot retains a distinct binding. |
| Experimental Methodologist | pass after findings | Exact controls and all predeclared HRR dimensions are retained; 64-dimensional failures remain visible and 256 stays the decision owner. |
| Representation Control Auditor | pass after findings | Typed records, sparse exact TPR, factored one-hot, factored dense, and HRR compile one binding frame with separate costs. |
| Data Split & Leakage Auditor | pass | Controls run over complete generated corpora before split scoring and cannot influence membership. |
| Evidence & Claims Editor | pass | Exact reconstruction, approximate cleanup, parameters, storage, runtime, and later semantic decisions remain separate. |
| Benchmark Numeracy Checker | pass | Meaning and per-role denominators, dimensions, bytes, metadata, parameters, and temporary memory reconcile explicitly. |
| Research Integrity & Provenance | pass | Seed, dimensions, decision owner, binding, unbinding, cleanup, FFT behavior, failures, and evidence identity are frozen. |
| Schema Implementer | pass | Both role frames compile through one typed binding model without schema-specific encoding shortcuts. |
| Benchmark Consumer | pass | `factor binding-controls` emits all owners and retained diagnostics in canonical text. |

## Finding ledger

| ID | Severity | Finding | Resolution |
|---|---|---|---|
| BND-001 | critical | A named role encoding could be compared without an exact conventional distributed control. | Closed: sparse orthogonal TPR provides exact binding and contraction for every role/filler pair. |
| BND-002 | major | Equal fillers could receive different bases in different roles and erase shared identity. | Closed: filler bases are keyed by shared domain and value; role bases remain separate. |
| BND-003 | major | HRR dimension could be selected after observing perfect reconstruction. | Closed: all `64/128/256` records are retained and `256` remains the predeclared owner even though `128` is perfect. |
| BND-004 | major | Approximate HRR failures could be hidden by reporting only per-role accuracy. | Closed: both exact complete-meaning and per-role counts are canonical. |
| BND-005 | major | Dense or TPR zeros could disappear from cost accounting. | Closed: declared dimensions, sparse/container bytes, metadata, parameters, and temporary memory are separate fields. |
| BND-006 | major | Circular convolution implementation errors could look like semantic failures. | Closed: radix-2 FFT convolution has a direct hand-worked correctness test. |
| BND-007 | major | Runtime noise could influence control admission. | Closed: runtime is explicitly descriptive and excluded from Pulse 04 evidence. |
| BND-008 | major | The exact controls could use family-specific decode paths. | Closed: one binding-frame compiler drives every representation; only role/domain declarations differ. |

## Fixed point

Pulse 04 is complete. All exact controls reconstruct perfectly; bounded HRR
retains its 64-dimensional failures and perfect 128/256 diagnostics. Pulse 05
may score the frozen splits and ambiguity targets. No critical or major
finding remains open.

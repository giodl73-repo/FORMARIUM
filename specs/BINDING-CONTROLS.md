# Role/Filler Binding Controls V1

Status: normative

## Purpose

Compile every Wave 2 role meaning into exact structured controls and a bounded
approximate holographic control before any split outcome is scored.

All owners consume the same role slots and shared filler domains from
`specs/ROLE-ANALYSIS-SETS.md`.

## Binding frames

### Transfer

Role order:

1. `giver/sole`;
2. `recipient/primary`;
3. `recipient/secondary`;
4. `theme/sole`.

Shared fillers: four entity values plus two theme values.

### Attachment

Role order:

1. `instrument/sole`;
2. `observer/sole`;
3. `patient/sole`;
4. `patient-associated-object/sole`.

Shared fillers: four entity values plus three object values, including `none`.

Equal filler keys across roles use one shared filler basis. Role and slot
identity remain distinct.

## Exact owners

### Typed record

An ordered vector of one filler ordinal per role slot. Decoding is exact and
requires no learned parameters.

### Sparse tensor-product representation

Roles and shared fillers use orthogonal one-hot bases. Binding is their outer
product. A meaning stores one nonzero role/filler coordinate per role slot.
Contraction by a role basis exactly recovers its filler.

The declared dense coordinate spaces are:

- transfer: `4 roles × 6 fillers = 24`;
- attachment: `4 roles × 7 fillers = 28`.

The canonical sparse container stores four `(role, filler)` pairs rather than
materializing every zero.

### Factored one-hot

One concatenated filler segment per role:

- transfer: `4 + 4 + 4 + 2 = 14` coordinates;
- attachment: `3 + 4 + 4 + 3 = 14` coordinates.

### Factored dense

Four role-specific four-coordinate signed code segments produce one
16-coordinate `i8` container. The codebook is explicit and exactly decodable.
It is a conventional factored dense control, not a neural model.

## HRR owner

The holographic reduced representation is frozen before scoring:

| Field | Value |
|---|---|
| Seed | `0x464143544f522d32` |
| Dimensions | `64`, `128`, `256` |
| Decision owner | `256` |
| Basis | deterministic normalized bipolar vectors |
| Binding | circular convolution |
| Superposition | vector addition |
| Unbinding | role-vector involution followed by circular convolution |
| Cleanup | nearest cosine within the role's declared filler domain |

Circular convolution is implemented through deterministic radix-2 FFTs. The
FFT is an implementation detail; canonical evidence contains reconstruction
counts and configuration, not floating-point vectors.

HRR is not an alias of the exact controls. Fixed dimensionality introduces
interference, so imperfect smaller-dimension results are retained.

## Metrics

For every family and owner:

- exact complete-meaning reconstruction;
- correct role fillers over explicit denominator;
- logical semantic payload bits;
- representation dimensions;
- canonical container bytes;
- frame/layout metadata bytes;
- codebook or basis parameter bits;
- temporary bytes.

Runtime is descriptive and excluded because no runtime decision is made in
Pulse 04.

## Frozen result

Every exact owner reconstructs all `512` transfer and `128` attachment
meanings.

HRR results:

| Family | Dimension | Exact meanings | Role fillers |
|---|---:|---:|---:|
| transfer | 64 | 452/512 | 1988/2048 |
| transfer | 128 | 512/512 | 2048/2048 |
| transfer | 256 | 512/512 | 2048/2048 |
| attachment | 64 | 120/128 | 504/512 |
| attachment | 128 | 128/128 | 512/512 |
| attachment | 256 | 128/128 | 512/512 |

The 64-coordinate failures are retained evidence of the fixed-size
interference tradeoff. The decision owner remains 256 even though 128 is also
perfect; no post-hoc dimension reduction is admitted.

Canonical evidence identity:

```text
a6c19ea8a47c5de0b343b5de6800b62e1471195833898ba3444131740eb62137
```

## Reproduction

```powershell
cargo run --quiet -- binding-controls
cargo test --test binding
```

## Boundaries

- This pulse measures representation reconstruction, not surface parsing.
- Exact TPR is established prior art and a control, not a FACTOR invention.
- HRR outcomes do not establish neural, runtime, storage, or hardware
  superiority.
- Smaller dimensions remain diagnostics and cannot replace the frozen decision
  owner after results are known.

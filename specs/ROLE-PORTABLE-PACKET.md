# Portable Role and Ambiguity Packet V1

Status: normative

## Purpose

The `factor-role-v1` packet lets an independent consumer validate Wave 2
custody, split structure, declared control evidence, denominators, and the
accepted `semantic-only` decision without importing the Rust crate.

Candidate meanings are supplied by the canonical analysis-set documents. The
packet does not perform surface parsing or ambiguity resolution.

## Closed-world layout

```text
MANIFEST.factor
LICENSE.txt
README.txt
verify_role_packet.py
schemas/
frames/
corpora/
analyses/
splits/
results/
```

Every regular file except `MANIFEST.factor` is listed exactly once with its
slash-separated path, byte count, and SHA-256. Extra files, missing files,
unsafe paths, carriage returns, byte differences, or digest differences fail
validation.

## Identity chain

The manifest records:

- packet format and producer version;
- producer source identity over the lock file and every semantic, result, CLI,
  shared packet, and Wave 2 packet owner;
- model and accepted classification;
- schema declaration identities;
- role-frame identities chained to schemas;
- constrained corpus identities chained to schemas and frames;
- analysis-set identities chained to frames and corpora;
- split identities chained to corpora and analyses;
- binding-control and role-bakeoff result identities;
- exact file identities.

The packet identity is SHA-256 over exact `MANIFEST.factor` bytes. The manifest
does not list itself.

## Independent verifier

`verify_role_packet.py` uses only the Python standard library. It:

1. enforces the closed-world file set, ASCII/LF bytes, sizes, and hashes;
2. recomputes schema, frame, corpus, analysis, split, result, and packet
   identities;
3. checks every schema-to-frame-to-corpus-to-analysis-to-split custody edge;
4. checks candidate existence, ordering, uniqueness, surface references,
   family grouping, and declared candidate overlap;
5. verifies the frozen HRR seed, dimensions, binding, unbinding, cleanup, and
   decision owner;
6. checks the complete exact-control, HRR, whole-meaning, and
   whole-analysis-set owner matrices;
7. recomputes every set, candidate, meaning, and role denominator from packet
   analysis and split files;
8. checks systematic deletion targets, familiar-meaning disambiguation
   transfer, exact-control ties, and the final decision fields.

The verifier validates the declared deterministic evidence and its
relationships. It does not reimplement the FFT or regenerate HRR vectors.

## Canonical identity

```text
99deb8e8276df63a368dac85e1cbc90095f20936eeb8126eb9100f8a825e441d
```

The foundation packet at `artifacts/factor-v1` remains unchanged at
`70190b6e53e8482b37a036f0945b095ac92235bb78333c27f42455c2b27010a9`.

## Commands

Generate into a missing or empty directory:

```powershell
cargo run --quiet -- role-packet OUTPUT_DIR
```

Validate file identities with Rust:

```powershell
cargo run --quiet -- role-packet-check OUTPUT_DIR
```

Validate independently:

```powershell
python OUTPUT_DIR\verify_role_packet.py OUTPUT_DIR
```

## Boundaries

- candidate analyses are inputs, not predictions from text;
- no preferred reading or probability is produced;
- no open-vocabulary NLP, runtime, compression, hardware, or
  representation-specific advantage is established;
- exact typed records and sparse TPR remain authoritative conventional
  controls;
- HRR-64 failures and the frozen HRR-256 decision owner remain visible.

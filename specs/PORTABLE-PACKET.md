# Portable Evidence Packet V1

Status: normative

## Purpose

The V1 packet lets an independent consumer validate FACTOR's synthetic
semantic-only result without importing the Rust crate or accepting a preferred
representation.

## Closed-world layout

```text
MANIFEST.factor
LICENSE.txt
README.txt
verify_packet.py
schemas/
corpora/
splits/
results/
```

Every regular file except `MANIFEST.factor` is listed exactly once in the
manifest with its canonical slash-separated path, byte count, and SHA-256.
Extra files, missing files, unsafe paths, carriage returns, byte differences,
or digest differences fail validation.

## Identity chain

The manifest records:

- packet format and producer version;
- producer source identity over `Cargo.lock` and the Rust schema, corpus,
  bakeoff, packet, library, and CLI owners;
- model identity;
- accepted classification;
- schema declaration identities;
- corpus identities chained to schemas;
- split identities chained to schemas and corpora;
- result identity;
- exact file identities.

The packet identity is SHA-256 over exact `MANIFEST.factor` bytes. The manifest
does not list or hash itself, avoiding a recursive identity definition.

## Independent verifier

`verify_packet.py` uses only the Python standard library. It:

1. enforces the closed-world file set and exact hashes;
2. recomputes schema declaration identities;
3. verifies corpus-to-schema and split-to-corpus custody chains;
4. checks every split example reference;
5. independently checks product/packed alias equality;
6. verifies systematic factor-control success and whole-symbol failure;
7. verifies template transfer as a shared-meaning negative control;
8. recomputes the decision fields and packet identity.

The verifier does not import FACTOR, invoke Cargo, or use a third-party
package.

## Canonical V1 identity

```text
70190b6e53e8482b37a036f0945b095ac92235bb78333c27f42455c2b27010a9
```

## Commands

Generate a new packet into a missing or empty directory:

```powershell
cargo run --quiet -- packet OUTPUT_DIR
```

Validate file identities with the Rust checker:

```powershell
cargo run --quiet -- packet-check OUTPUT_DIR
```

Validate independently from inside the packet:

```powershell
python verify_packet.py .
```

## Boundaries

The packet carries a synthetic semantic-only result. It does not establish
open-vocabulary NLP, neural-model quality, compression, runtime, hardware, or
representation-specific advantage.

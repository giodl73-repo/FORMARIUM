# Independent Packet Onboarding

FACTOR V1 ships a self-contained packet at `artifacts/factor-v1`.

## Minimum consumer path

The consumer needs Python 3 with no additional packages:

```powershell
cd artifacts\factor-v1
python verify_packet.py .
```

Expected output:

```text
packet_sha256=70190b6e53e8482b37a036f0945b095ac92235bb78333c27f42455c2b27010a9
classification=semantic-only
verification=independent-pass
```

The verifier reads only packet files. It does not import the FACTOR crate,
invoke Cargo, access the network, or assume product-state semantics are
preferred over ordinary packed fields.

## What a consumer receives

- two canonical schemas;
- two complete generated corpus custody records;
- seven frozen split manifests;
- all 49 representation/split result records;
- exact alias and strong-control evidence;
- license and interpretation boundaries;
- source, model, artifact, and packet identities.

## Interpretation

`semantic-only` means that explicit factor reuse succeeds on these synthetic
systematic holdouts, while complete-meaning lookup does not. Product state,
ordinary packed fields, typed feature structures, factored one-hot, and the
factored dense control tie. No representation-specific, broad language,
runtime, or hardware advantage is claimed.

## Regeneration

From the repository root, generate and cross-check a fresh packet:

```powershell
cargo run --quiet -- packet target\factor-v1
cargo run --quiet -- packet-check target\factor-v1
cd target\factor-v1
python verify_packet.py .
```

The export command rejects nonempty targets so stale or unlisted files cannot
silently survive regeneration.

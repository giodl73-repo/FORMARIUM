# Independent Role Packet Onboarding

FACTOR Wave 2 ships a self-contained packet at
`artifacts/factor-role-v1`.

## Minimum consumer path

The consumer needs Python 3 with no additional packages:

```powershell
cd artifacts\factor-role-v1
python verify_role_packet.py .
```

Expected output:

```text
packet_sha256=99deb8e8276df63a368dac85e1cbc90095f20936eeb8126eb9100f8a825e441d
classification=semantic-only
verification=independent-pass
```

The verifier reads only packet files. It does not import FACTOR, invoke Cargo,
access the network, regenerate vectors, or infer candidate meanings from
surface text.

## What a consumer receives

- two canonical semantic schemas;
- two role frames with shared filler domains and ordered slots;
- two constrained complete-meaning corpora;
- two explicit candidate analysis-set documents;
- six leakage-checked split manifests;
- all 14 full-family binding-control records;
- all 54 split/representation bakeoff records;
- license, interpretation boundaries, and chained identities.

## Interpretation

`semantic-only` means reusable role/filler structure and explicit composition
of familiar candidate meanings succeed on these bounded synthetic artifacts.
Typed records, exact sparse TPR, factored one-hot, factored dense, and HRR-256
tie on the decision metrics. HRR-64 interference failures remain included.

This does not mean the system discovered ambiguity from words, selected a
preferred reading, or demonstrated a unique HRR, broad NLP, runtime, or
hardware advantage.

## Regeneration

From the repository root:

```powershell
cargo run --quiet -- role-packet target\factor-role-v1
cargo run --quiet -- role-packet-check target\factor-role-v1
python target\factor-role-v1\verify_role_packet.py target\factor-role-v1
```

Export rejects nonempty targets so stale files cannot survive regeneration. A
later producer revision receives a new identity; the committed packet remains
immutable.

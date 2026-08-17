# Query-Led Campaign 02 Lexical Baseline

Date: 2026-08-17

Status: complete; exact lexical baseline and manual route analysis frozen

## Custody

The 24-packet campaign and result contract were committed at `d5f1a01` before
execution. The exact 48 literal queries then ran against the retained
`target/proof-set-sim-42/search-index.json` without changing the campaign,
reference, search code, or artifact.

| Field | Value |
|---|---|
| edition | `sim-42` |
| source commit | `531dea50dafeaf47e4909dbf8b7be93dac3d3021` |
| site identity | `a447c29d06b5a182fbfca4e57ba2d88ab0e2fb5fa6edbfbec3258109bfa0c0c4` |
| search index | `0812f44f42d833ac97587a2ed76007e8a900a7e20402956149f9f9003747874a` |
| records | 185 |
| packets / queries | 24 / 48 |
| lookup artifact | `92d058de1b8e2bb0809b96d381b80cdddfaf2cecfae3de6664f09f67798294cb` |

The raw result is
`fixtures/query-led-discovery/baseline-lookups-02.json`. It records exact
match counts and first-five results only. It contains no manual route,
closure, gap, disposition, score, or reader measure.

## Preliminary routing observations

These observations identify where manual analysis should look; they are not
gap dispositions:

- amount/concentration/composition, statistical summaries, thermal concepts,
  measurement quality, assurance, governance decisions, safety, and economic
  contrasts generally expose their existing owners in the first results;
- “exactly once” does not surface the interaction/message owners in its first
  literal query, while the evidence-focused query does;
- “natural/green” surfaces evidence owners but not classification or policy
  owners in the first literal query;
- service availability/usability and cross-domain capacity queries split
  across several plausible current owners, as the frozen stress intended.

These are deterministic lexical observations, not findability or reader
evidence.

## Manual route result

Exact analysis is retained in
`fixtures/query-led-discovery/baseline-analysis-02.json`; the generated
16-field results are in
`fixtures/query-led-discovery/baseline-results-02.json`.

| Measure | Result |
|---|---:|
| packets / literal queries | 24 / 48 |
| structurally complete / incomplete | 10 / 14 |
| contradictory / truncated | 0 / 0 |
| QG-0 / QG-1 / QG-3 | 20 / 1 / 2 |
| QG-6 / QG-7 | 1 / 1 |
| manual concepts | 4 |
| route hops | 113 |

Twenty packets propose no change. Named failure-handling mechanisms remain
Guide-local. One packet each exposes a manual availability/usability boundary
and an exactly-once guarantee-scope distinction; neither recurs within the
frozen portfolio. The environmental-label packet records separate discovery
friction and an external scheme boundary. These classifications are internal
authored analysis, not reader behavior or content-admission decisions.

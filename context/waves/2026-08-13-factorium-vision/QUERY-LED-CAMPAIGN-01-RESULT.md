# Query-Led Campaign 01 Result

Status: complete; sim-42 bounded repair accepted; campaign stopped

Date: 2026-08-17

Evidence class: internal authored query rehearsal. No external reader
participated, and this result contains no reader-success, comprehension,
preference, usefulness, or return-intent evidence.

Final role review:
`signals/roles/check/query-led-campaign-01-final-roles-check-2026-08-17.md`

## Frozen campaign and baseline custody

QLD-01 froze 24 revision-1 packets before baseline: six reader jobs crossed
with four context classes. The execution used 48 exact literal query strings
against the 185-record sim-41 search index. The packet order, packet text,
query text, result contract, gap rubric, and prohibited reader measures stayed
unchanged through rerun.

| Artifact | Frozen identity |
|---|---|
| sim-41 source commit | `0f28e15df31b14f1ded7ea4ba2584f4bc4da4879` |
| sim-41 site identity | `b4daf02a7b16140ebd4608a0d9703a7868da92cd63e71750dbedd3b1f7f675c9` |
| sim-41 standalone | `fcab6402c50c5b29420599666d624e63f43041ee2ba1cc919d15dbb70857e005` |
| sim-41 search index | `0d40926f828605265960987d85f023f6704092b5b1afac5696de0b449f8b51f1` |
| campaign JSON | `63e05a00a57be147313dae4b0cc6b7fab4b4cf40af309c677193f2c1f6353a6f` |
| result contract | `0b67bf61a468ee2b6748f78b0a7b96f575b58bc0ef530980134a794cb82da31f` |
| baseline results | `9e768d1a43cf247f4a6718eead1d868283581bfb72bbe5fe2b6b86f8b46d61a7` |

The original `target/proof-set-sim-41` artifact remains untouched. A render
from later canonical sources is not treated as the baseline; reproduction is
bound to the frozen source commit and identities above.

## Baseline result

| Measure | sim-41 baseline |
|---|---:|
| packets | 24 |
| literal queries | 48 |
| complete / incomplete / contradictory / truncated | 9 / 15 / 0 / 0 |
| manual concepts | 9 |
| route hops | 106 |
| QG-0 / QG-1 / QG-3 / QG-6 / QG-7 | 12 / 5 / 5 / 1 / 3 |
| QG-4 anchors / QG-5 relations / QG-9 mechanics | 0 / 0 / 0 |

The baseline produced 26 gap records. Every record received a final clustered
disposition before implementation:

| Final disposition | Gap records |
|---|---:|
| no-change | 13 |
| defer | 4 |
| external | 3 |
| merge | 1 |
| repair | 5 |

Five QG-3 records in packets 09, 12, 20, 22, and 24 shared the recurrence key
`limiting-factor-bottleneck`. One QG-1 compound-lookup record in packet 24 was
merged into that same owner test because literal `bottleneck` already ranked
the existing diagnostic first. No other cluster passed the admission gate.

## Smallest admitted batch

The campaign changed one existing view:
`tables/diagnostics/dependency-critical-path.md`.

It added a six-row Limit owner test for capacity bottleneck, service-order
delay, dependency blocker, critical or driving path, binding constraint, and
evidence limitation; a five-step owner procedure; condition/result-relative
boundaries; and untyped routes to existing owners.

The batch added:

- 0 anchors;
- 0 views;
- 0 senses;
- 0 typed relations;
- 0 aliases, cues, filters, ranking rules, or product mechanics;
- 0 domain-specific catalogs or optimization procedures.

Canonical totals remain 53 entries, 412 senses, 627 factors, 95 views, and 11
typed relation records. The bounded source review retained GAO schedule scope,
used RFC 5136 only as a network capacity/path example, and used PROV-O only
for provenance structure rather than evidence sufficiency.

## Exact sim-42 rerun

Sim-42 was rendered from clean implementation commit
`531dea50dafeaf47e4909dbf8b7be93dac3d3021`.

| Candidate identity | Value |
|---|---|
| site | `a447c29d06b5a182fbfca4e57ba2d88ab0e2fb5fa6edbfbec3258109bfa0c0c4` |
| standalone | `f1f6bb2d26eaa97979afdede39064f321e822e7a961d7d68ae8deb41174111c7` |
| search index | `0812f44f42d833ac97587a2ed76007e8a900a7e20402956149f9f9003747874a` |
| search records / site pages | 185 / 239 |
| missing search / site targets | 0 / 0 |

All 24 packets and all 48 query strings reran in their original order. No
packet revision, question, context, stop condition, design flag, or query text
changed.

| Measure | sim-41 | sim-42 | Decision-relevant change |
|---|---:|---:|---|
| complete / incomplete | 9 / 15 | 9 / 15 | none; unresolved work was not promoted |
| routed | 6 | 11 | five repaired packets lose manual routing friction |
| routed-with-friction | 9 | 4 | five fewer |
| manual concepts | 9 | 4 | five limiting-condition proxies removed |
| QG-3 view gaps | 5 | 0 | recurrent admitted pressure resolved |
| QG-1 discovery gaps | 5 | 4 | merged compound bottleneck lookup resolved |
| QG-4 / QG-5 / QG-9 | 0 / 0 / 0 | 0 / 0 / 0 | no scope expansion |
| route hops | 106 | 107 | packet 20 now records the existing owner explicitly |

Only 2 of 48 first-five lexical rankings changed:

1. packet 09, `latency dependency measurement`, now includes the repaired
   diagnostic at rank 4;
2. packet 24, `capacity precedence limitation`, now includes it at rank 3.

These are deterministic ranking effects of revised indexed content. No search
code or search mechanic changed, and the result is not evidence that readers
will recognize or use the route.

## Validation

Passed:

- campaign freeze and baseline identity checks;
- all 26 clustered gap disposition checks;
- canonical reference check and catalog synchronization;
- reference/relation/assurance sidecar validation: 159 review bindings;
- 23 core tests plus all repository test groups;
- all valid Composition Query fixtures after exact source-identity migration;
- clean sim-42 render with zero missing targets;
- limiting-condition implementation/custody checker;
- exact portfolio rerun checker;
- final eight-role fixed-point review with zero open P1 or P2 findings.

## Final portfolio decision

**ACCEPT** sim-42 as the bounded internal candidate for the one repaired
existing diagnostic, and **STOP** QLD-01.

The smallest admitted batch resolved the only recurrent content pressure that
passed the owner and product-value gates. The remaining gap records retain
their no-change, defer, external, or guide-local dispositions; none earns a
second content or product batch from this campaign. The next campaign, if
funded, must freeze a new portfolio or obtain actual reader evidence rather
than reinterpreting QLD-01 as reader validation.

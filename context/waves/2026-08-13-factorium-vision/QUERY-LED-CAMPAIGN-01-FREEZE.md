# Query-Led Campaign 01 Freeze

Status: plan; packets frozen before baseline execution

Date: 2026-08-17

Blueprint: `QUERY-LED-CONTENT-DISCOVERY-BLUEPRINT.md`

Packet corpus: `fixtures/query-led-discovery/campaign-01.json`

Result contract: `fixtures/query-led-discovery/result-contract-01.json`

Validator: `tools/check_query_led_campaign.js`

Role review:
`signals/roles/check/query-led-campaign-01-freeze-roles-check-2026-08-17.md`

## Plan review

QLD-01 contains exactly 24 versioned question packets: one cell for each of
six reader jobs across four contexts. Questions are plain-language and
non-sensitive. Each packet declares its reader, intended output, context,
forbidden inference, candidate seeds, expected stress, stop condition, and
internal-authored evidence class before any baseline route is executed.

The frozen portfolio includes deliberate no-gap controls, competing senses,
subtraction or contradiction pressure, and incomplete stops. Candidate seeds
are starting hypotheses only; they neither select canonical senses nor create
graph edges. Design flags balance the challenge portfolio and are not expected
result labels. The portfolio contains no baseline result, closure state, gap
code, route, score, or disposition field.

`QLD-RC-01` freezes the separate baseline-result grammar before execution. It
requires lookup, exact senses, local context, graph, checks, closure, reading
route, projection loss, manual concepts, mechanical observations, gaps,
disposition, and claim boundary. It fixes QG-0 through QG-9, all four closure
states, and allowed dispositions while explicitly prohibiting simulated
success, timing, comprehension, preference, usefulness, and return metrics.

The baseline is the maintained `sim-41` edition sourced from commit `0f28e15`.
No canonical file, relation, Guide, search route, or generated edition changes
in Q0.

## Execution boundary

After this freeze is committed, Q1 may render or reproduce `sim-41`, attempt
ordinary lookup, select exact senses, construct the smallest reviewed graph,
and append results in a separate result artifact. Frozen packet wording and
design flags must not change in response to the baseline. Corrections require
a new packet revision and cannot silently replace QLD-01 revision 1.

Internal execution will establish only route and artifact facts. It will not
produce reader success, comprehension, timing, confidence, usefulness, or
preview evidence.

---
skill: discover-hypothesis
topic: route-choice-inertia
date: 2026-08-17
confidence: 56
verdict: OPEN
---

# Route Choice and Inertia Hypothesis

## Hypothesis

**Claim:** When a problem is phrased in ordinary language without Factorium
headwords, `sim-42` can still expose a relevant first move and a credible
reason to switch from an incumbent lookup chain for multi-concept work, while
simple lookup properly remains with the incumbent.

**Falsification condition:** The internal mechanism is falsified if fewer than
15 of 25 frozen prompts expose at least one relevant selected destination in
the exact first five results of either frozen query, or if more than 10 of 25
authored routes require canonical-term injection not present in the prompt or
queries.

**Confidence:** 56/100.

**Hypothesis class:** Technical/product-mechanism. Real route choice remains a
future behavioral hypothesis.

## Prior

The team believes Factorium can be entered both through concept lookup and
problem-led composition. That belief comes from authored internal simulations,
not observations of how people naturally phrase problems.

| Evidence type | Threshold to shift belief |
|---|---|
| Frozen ordinary-language lookup | Fewer than 15/25 prompts with a relevant first-five destination weakens entrance readiness |
| Canonical vocabulary dependence | More than 10/25 routes needing injected canonical terms weakens the term-blind claim |
| Future R4E route choice | Repeated inability to choose an entrance or repeated retreat to external tools blocks the behavioral claim |

**Confirmation-bias check:** The team may describe any multi-page route as a
switch trigger. SUJ-02 therefore requires an explicit incumbent advantage,
switch condition, stopping rule, and outward handoff for every proxy journey.

## Tests

### Test 1 — Ordinary-language first landing

- Method: exact `sim-42` search over 50 frozen queries.
- Measure: prompts with at least one selected route destination in either
  query's first five results.
- Falsification threshold: fewer than 15 of 25.
- Timeframe: SUJ-02.

### Test 2 — Vocabulary injection

- Method: compare selected routes with frozen prompt and query vocabulary.
- Measure: routes that require an additional canonical search term before any
  relevant landing appears.
- Falsification threshold: more than 10 of 25.
- Timeframe: SUJ-02.

### Test 3 — Behavioral route choice

- Method: future real-reader observation.
- Measure: first entrance, tool switching, stopping, outward handoff, and
  voluntary return.
- Falsification threshold: repeated failure to recognize or use the problem-led
  route.
- Timeframe: R4E and Proof Set.

The null is that ordinary tool chains remain easier and Factorium's distinct
job is visible only when authors supply its own vocabulary.

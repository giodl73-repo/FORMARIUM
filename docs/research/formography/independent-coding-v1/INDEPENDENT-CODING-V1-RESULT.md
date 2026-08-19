# Formography Independent Coding V1 Result

Date: 2026-08-18
Status: promotion threshold not met; no immediate V2

## What V1 fixed

V1 separated owner reference from authority class and pre-registered extension
and failure taxonomies.

Majority extension categories now exist:

| Case | Majority | Agreement |
|---|---|---:|
| Access Authorization | constraint and closure | 2/3 |
| Amount and Composition | identity and kind | 2/3 |
| Choice and Selection | recommendation and authority | 2/3 |

Majority failure categories also exist:

| Case | Majority | Agreement |
|---|---|---:|
| Access Authorization | authority bypass | 3/3 |
| Amount and Composition | basis or kind collapse | 3/3 |
| Choice and Selection | authority bypass | 2/3 |

## What still failed

V1C2 did not conform to the registered output contract:

- used `authority-and-recommendation`, which is outside the registered
  extension vocabulary.

The original response envelope was not retained, so its format and raw length
are not independently adjudicated.

V1C1 marked quantitative unresolved state ambiguous and set
`unresolved_state_retained` to false. The predeclared universal unresolved-state
gate therefore fails.

Graph sufficiency is no longer unanimous:

- V1C1 and V1C3: sufficient in 6/6 records;
- V1C2: insufficient in 3/3 records.

## Terminology result

`governed property graph` wins the bounded model-coder comparison:

- preference: 2/3 versus 1/3;
- median explanation length: 41 words versus 44.

This is an internal model signal, not observed human comprehension. It provides
no basis to promote Formography as a simpler name.

## Verdict

`PAUSE_FIELD_PROMOTION_V1_PROTOCOL_CONFORMANCE_AND_UNRESOLVED_GATE_FAILED`

The governed-method-profile hypothesis remains researchable. Field
establishment, novelty, naming advantage, and product rename remain blocked.
Do not run V2 immediately; require a human or practitioner protocol decision.

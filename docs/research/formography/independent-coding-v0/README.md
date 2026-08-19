# Formography Independent Coding V0

Date: 2026-08-18
Status: V0 complete; promotion threshold not met

## Purpose

Test whether independent coders can apply the proposed Formography contract to
three source cases without seeing the authored comparison outputs.

## Source firewall

Coders may read only:

- this directory;
- `docs/research/formography/formography-foundation-research-module-v0.md`,
  lines defining the object model, V0 boundaries, and disproof conditions;
- the six canonical source files named in `coding-protocol-v0.json`;
- `reference/factorium-reference-v2.factorium`;
- `reference/factorium-relations-v0.factorium`;
- `reference/factorium-assurance-v2.factorium`.

Coders must not read:

- `docs/research/formography/comparative-slice-v0/`;
- Formography comparative-slice plans, results, or role reviews under
  `context/waves/`;
- another coder's output.

This firewall prevents authored formographs and expected failures from becoming
answer keys.

## Assignment

Each coder independently:

1. identifies form, frame, primary and alternative factorizations, typed
   relations, boundaries, projections, unresolved state, and source custody;
2. proposes only essential domain-extension fields;
3. names one most consequential structured failure;
4. states whether a generic property graph can represent the complete result;
5. compares explanation cost under `Formography` and `governed property
   graph`;
6. returns one JSON record matching `coding-output-schema-v0.json`.

No consensus discussion occurs before all records are frozen.

## Promotion thresholds

The packet passes only if:

- all coders identify the same canonical form owner in every case;
- at least two of three agree on every required core category;
- every coder preserves source authority and declares projection loss;
- every coder says whether graph representation is sufficient;
- domain extensions have a majority-supported essential core rather than
  unconstrained case-specific fields;
- terminology comparison retains disagreements and does not average ordinal
  judgments into a false score.

Failure to meet a threshold is a result, not an invitation to edit coder
records.

## Result

The packet fails the unanimous owner and majority-supported extension gates.
All coders find generic property graphs sufficient. Terminology preferences
split 1-1-1. See `INDEPENDENT-CODING-RESULT.md` and
`independent-coding-adjudication-v0.json`.

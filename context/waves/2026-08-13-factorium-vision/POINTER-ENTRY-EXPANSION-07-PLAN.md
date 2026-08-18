# Pointer Entry Expansion 07 Plan

Date: 2026-08-18
Status: active internal simulation plan

## Objective

Add `sim-59` with a 20-row delta over V6, expanding the effective Pointer Entry
registry from 140 to 160 labels.

## Selection

Admit 20 exact labels used by 5-10 owning Tables:

`allocation`, `assessment`, `compensation`, `correlation`, `disposition`,
`energy`, `estimator`, `force`, `function`, `information`, `lifecycle`, `loss`,
`period`, `range`, `record`, `requirement`, `semantics`, `shortage`,
`transport`, and `variable`.

Defer generic `order`, `message`, and `property` despite similar reuse. Retain
all prior exclusions.

## Product value

The batch adds direct routes for allocation and shortage, evidence assessment,
association, lifecycle, requirements, semantics, physical quantities, and
transport while preserving exact owner contexts.

## Scope and stop

Require 160 effective rows, one exact V6 base, 20 additions, nonzero use,
unchanged search, and reconstructable predecessors. Stop before automatic
admission, morphology, synonyms, canonical promotion, or reader claims.

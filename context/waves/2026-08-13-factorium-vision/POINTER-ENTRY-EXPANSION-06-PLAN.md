# Pointer Entry Expansion 06 Plan

Date: 2026-08-18
Status: active internal simulation plan

## Objective

Add `sim-58` with 140 Pointer Entries while preserving all predecessor
editions. Introduce a fail-closed delta registry so future bounded additions do
not copy the full prior registry.

## Selection

Admit 20 exact labels used by 4-7 owning Tables:

`baseline`, `channel`, `compatibility`, `concurrency`, `feasibility`, `field`,
`frequency`, `intervention`, `membership`, `monitoring`, `obligation`,
`position`, `response`, `score`, `selection`, `service`, `transition`,
`trigger`, `validation`, and `verification`.

Continue to defer generic, status, syntax, morphological, path-colliding, and
domain-specific labels.

## Registry change

`proof-set-pointer-registry-v6.factorium` explicitly extends the retained V5
registry and contributes exactly 20 rows. The renderer restricts extension to
the same directory and fails on missing bases, cycles, duplicate identities,
unexpected counts, and zero-use rows.

## Scope and stop

Require 140 effective rows, unchanged search, source custody, and independently
renderable predecessors. Delta composition must not imply concept inheritance.
Stop before automatic admission, morphology, synonyms, canonical promotion, or
reader claims.

---
name: Data Split & Leakage Auditor
slug: data-split-leakage-auditor
tier: parliament
applies_to: [corpora, splits, surfaces, evaluation]
---

# Data Split & Leakage Auditor

## Key question

*Is the holdout genuinely an unseen semantic combination?*

## Lens

- Split membership is computed from semantic assignments before rendering.
- Every required atom is familiar in systematic holdouts.
- Pairwise or higher-order coverage rules are explicit.
- Surface templates, identifiers, ordering, and metadata cannot reveal labels.
- Duplicate meanings and paraphrases remain in one declared split group.

## Blocking findings

- train and test contain surface variants of the same held meaning without a
  declared transfer task;
- a meaning or template identifier leaks split membership;
- corpus generation resamples until a favorable result appears;
- denominators exclude hard or invalid cases after scoring.

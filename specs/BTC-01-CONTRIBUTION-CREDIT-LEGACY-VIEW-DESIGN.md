# BTC-01 Contribution, Credit, Priority, and Legacy View Design

Status: approved candidate design

## Intent and owner test

Answer one recurring BTC-01 reader question: what exactly did a named subject
contribute, what supports priority or credit, how does that differ from causal
attribution, and how did later interpretation change?

The view adds no anchor or sense. `claim-evidence` owns the evidence record;
`causal-reasoning`, `identity-naming-classification-versioning`, and the Change
Lineage view remain linked supporting owners. A new anchor would duplicate
these concepts while increasing navigation cost.

## Candidate identity

- path: `tables/evidence/contribution-credit-priority-legacy.md`
- proposed view ID: `evidence-contribution-credit-priority-legacy`
- family: Evidence Table
- owner: `claim-evidence`
- existing senses: `claim`, `evidence-item`, `result`, `limitation`,
  `confidence`, `provenance`, `observation`, `measurement`, `inference`
- new anchors, senses, and relations: zero

## Required contrasts

The view must distinguish participation, contribution, contribution role,
authorship or office, priority, credit, recognition, causal attribution,
responsibility, outcome, reputation, and legacy. It must expose the rule and
authority behind a credit or priority claim, retain prior work and
collaborators, and permit `unresolved` without computing a verdict.

## Stop boundary

Do not enumerate people, works, discoveries, offices, awards, movements,
historical events, domain taxonomies, or universal contributor roles. Named
taxonomies may supply source-declared values in scoped rows only.

## Acceptance

1. One view, one existing owner, and only existing sense IDs.
2. Contribution and credit remain separate.
3. Credit and causal attribution remain separate.
4. Priority states “first at what” and its evidence rule.
5. Legacy states evaluator, subject, horizon, comparison, and evidence.
6. Prior work, collaborators, omissions, contradictions, and revisions remain
   visible.
7. The disposition supports unresolved and no-bearing evidence.
8. No ranking, deservingness, historical-truth, endorsement, or reader-value
   claim.
9. V1 and `sim-49` remain frozen; formal interchange and generated edition
   exposure await a supported successor reference integration.

# MUNDUS Curriculum Closure 01 Portfolio Freeze

Status: complete; vocabulary extraction and closure comparison not yet run

## Decision

Freeze 48 course packets before systematic vocabulary extraction or Factorium
closure comparison. The portfolio contains six courses in each of eight lanes,
one declared expected no-gap control per lane, and an exact balance of 24
individual course records and 24 homepage-metadata probes.

The balance is a review design, not an assertion that both evidence tiers are
equivalent. A metadata-only packet can establish course-surface existence,
domain pressure, and priority for later source review. It cannot emit a concept
admission candidate.

## Composition

| Lane | Packets | Record depth | Metadata probes |
|---|---:|---:|---:|
| Mathematics | 6 | 4 | 2 |
| Physical science | 6 | 4 | 2 |
| Life and health science | 6 | 1 | 5 |
| Computing and software | 6 | 4 | 2 |
| AI, data, and inference | 6 | 4 | 2 |
| Engineering, systems, and control | 6 | 4 | 2 |
| Social science and humanities | 6 | 2 | 4 |
| Economics and organizations | 6 | 1 | 5 |
| **Total** | **48** | **24** | **24** |

The low record depth in life/health and economics/organizations is retained as
a result about this registry snapshot. It is not repaired by treating course
titles as instructional evidence.

## Processing contract

1. Process packets in frozen `MCC-01-01` through `MCC-01-48` order.
2. For individual records, inspect only child surfaces whose FONTES policy
   permits the intended derived use.
3. For metadata-only packets, record curriculum pressure and a source-review
   disposition only; extract no admission candidate.
4. Filter named people, named methods, institutions, products, software,
   standards, course codes, and domain instances before owner comparison.
5. Compare every retained reusable candidate with the exact V1 closure.
6. Preserve covered, compositional, duplicate, proper-noun, specialized,
   insufficient-evidence, and no-gap outcomes.
7. Apply the campaign-wide admission ceiling only after all packets are
   dispositioned.

## Product-owner record

| Field | Decision |
|---|---|
| Reader | A reader who recognizes a term in one field but needs its reusable governing distinctions across fields. |
| Job | Discover whether Factorium already explains the concept directly or compositionally, and find a missing owner only when necessary. |
| Current friction | Course vocabularies are siloed, differently named, and mixed with proper nouns, tools, and specializations. |
| Product change | A source-custodied candidate ledger that can repair Factorium Tables or discovery with the smallest justified batch. |
| Evidence now | Selection balance, source custody, rights boundaries, deterministic membership, and later structural closure coverage. |
| Evidence later | Reader comprehension, lookup improvement, pedagogical value, professional usefulness, and demand. |
| Cost and displacement | Forty-eight packet reviews plus source handling; defer all relation mechanics and any broad curriculum catalog. |
| Continue/merge/stop | Continue to extraction for 24 record-depth packets; stop metadata packets at source-review priority; merge duplicates before admission. |

## Frozen artifacts

- `fixtures/coverage/mundus-curriculum-depth-portfolio-01.json`
- `tools/build_mundus_curriculum_depth_portfolio_01.js`
- `tools/check_mundus_curriculum_depth_portfolio_01_freeze.js`

## Claims boundary

This freeze establishes a balanced internal review portfolio over the
registered FONTES snapshot. It does not establish curriculum completeness,
source-family equivalence, concept gaps, teaching effectiveness, reader value,
or market demand.

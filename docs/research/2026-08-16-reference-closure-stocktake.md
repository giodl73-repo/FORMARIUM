# Current Reference Closure Stocktake

Status: reviewed internal architecture stocktake; not a semantic-relation
expansion or reader-evidence result

Date: 2026-08-16

## Question

What does a closure over the current canonical entries actually recover, and
what is absent before Factorium can construct a bounded multi-entry guide from
the reference rather than from six hand-selected relation fixtures?

## Method

`tools/check_reference_closure_coverage.js` reads the canonical interchange,
the reviewed relation sidecar, and Markdown links between canonical entry
sources. It reports two deliberately non-equivalent graphs:

1. **Reviewed semantic graph:** directed, typed factor-to-factor relations in
   `reference/factorium-relations-v0.factorium`. These are admissible inputs to
   Composition Query closure.
2. **Editorial navigation graph:** entry-to-entry Markdown links, treated as
   undirected only for connectivity and radius diagnostics. These links mean
   “read nearby,” not “traverse this semantic relation.”

The stocktake does not infer a semantic edge from a link, repeated word,
chapter proximity, formula, or view ownership. Exact repeated labels are
reported only as ambiguity and ownership-review candidates.

The checker assumes the interchange and sidecars have first passed their
canonical validators. It additionally requires exact file headers and
terminators, unique entry and relation IDs, existing view owners, and valid
factor endpoints. Editorial links are resolved only from canonical entry
source Markdown to another canonical entry source; fragments do not create
distinct identities.

## Observed inventory

| Measure | Current value |
|---|---:|
| Canonical entries | 39 |
| Canonical senses | 297 |
| Canonical factors | 466 |
| Specialized views | 56 |
| Exact assurance bindings | 101 |
| Reviewed typed relations | 6 |
| Unique typed-relation endpoint factors | 12 |
| Entries touched by typed relations | 6 |
| Reviewed cross-entry relations | 0 |

The reviewed relation sidecar therefore touches 2.58% of canonical factors
and 15.38% of entries. Each relation connects two factors owned by the same
entry. A machine closure cannot presently cross from one canonical entry to
another.

The editorial graph is connected: 185 directed Markdown links form 140 unique
entry pairs. Forty-five pairs are reciprocal and 95 appear in only one
direction. If every link is incorrectly treated as a symmetric semantic edge,
an average seed reaches 8.2 entries at radius one, 26.2 at radius two, 37.5 at
radius three, and all 39 at radius four. That closure is exhaustive but not
selective; it demonstrates why ordinary cross-references cannot become graph
semantics by default.

## What is already present

The proposed evidence-to-decision region is not missing its major source
concepts. The reference already distinguishes:

- claim, evidence, observation, result, inference, limitation, confidence,
  and provenance;
- population, sample, estimand, estimator, estimate, generalization, and
  transport;
- probability, likelihood function, risk, expected loss, and uncertainty;
- cost, opportunity cost, value, utility, return, and decision policy;
- policy, rule, constraint, derived decision, exception, and enforcement;
- association, causal effect, intervention, mechanism, and attribution;
- objective, indicator, threshold, intervention, and outcome.

Starting from claim/evidence, probability/risk, policy/decision, causal
reasoning, sampling, and cost/value reaches 18 of 39 entries in one editorial
hop. The content neighborhood exists. Its semantics are not yet joined.

## Missing layers

### 1. Cross-entry relation custody

This is the largest structural gap. No reviewed relation says how an artifact
owned by one entry can become an input, constraint, qualification, or outcome
for another entry. F27 should review a small relation packet, not convert all
140 editorial pairs. Every candidate edge needs exact source and target
factors, direction, kind, cardinality, version, qualifications, exclusions,
inverse behavior, declared loss, owner view, and review custody.

### 2. Choice as distinct from rule-derived decision

The current decision sense is a conclusion derived from facts and governing
logic. The reference does not yet cleanly own choice among feasible
alternatives under objectives, preferences, uncertain outcomes, and competing
criteria. Relevant pieces occur as factors elsewhere, but the following
governing distinctions are not canonicalized as one usable selection route:

- candidate alternative versus feasible alternative;
- objective or constraint versus decision criterion;
- consequence description versus value, utility, or loss assignment;
- preference or priority versus measured quantity;
- decision rule versus realized decision;
- trade-off versus accidental aggregation;
- sensitivity or robustness versus proof that one option is best.

This is a bounded concept gap, not permission to import named decision methods,
risk frameworks, scoring products, or an exhaustive decision-science taxonomy.
The research admits a concept only when it is necessary to distinguish
choosing among two or more feasible alternatives from deriving a rule-bound
case conclusion, and when its contract cannot be owned without distortion by
an existing sense or factor. It stops before named methods, preference scales,
optimization families, application-domain option classes, or catalogs of
decision criteria. The proposal is falsified if existing entries can express
the full choice contract with one clear canonical owner and no duplicated or
contradictory authority.

### 3. Sense and role binding across entries

Exact labels such as `boundary`, `system`, `reference frame`, `phase`,
`intervention`, and `uncertainty` recur under different owners. Equality of
text does not prove shared identity. A cross-entry closure needs an explicit
binding disposition for each endpoint: exact shared concept, narrowed sense,
contextual mapping, qualified compatibility, or rejected homonym.

### 4. Traversal policy

The four-hop editorial explosion shows that graph reachability alone is not a
useful guide boundary. Cross-entry closure needs relation allowlists,
direction, seed-relative purpose, context/profile compatibility, finite node,
edge, depth, and work bounds, cycle accounting, and a visible frontier. The
existing Composition Query controls provide the mechanical boundary but not a
reviewed cross-entry relation set.

### 5. Join-owned evaluation

Current checks are owned by the six fixture relations and their local views.
Every admitted cross-entry join needs a check that can fail independently of
its endpoint entries—for example, population applicability, common outcome
scope, aligned time horizon, compatible consequence basis, or authority and
version. Endpoint review cannot silently verify the join.

### 6. A complete authored guide route

The site can project a skeleton and record local declarations, but the
reference has not yet demonstrated a reviewed multi-entry guide that narrows
senses, assigns mechanisms, tests changes, resolves or retains evaluation,
and states a bounded recommendation. That proof should be authored from the
book and then exercised through the software, not generated by expanding the
graph until it looks complete.

## Recommended F27 boundary

F27 should be a **Decision and Evidence Bridge** research-and-content batch:

1. determine whether choice among alternatives warrants a new anchor or a
   deliberately separate sense/view adjacent to the policy-decision entry;
2. select only three to five high-value cross-entry relation candidates among
   claim/evidence, sampling, probability/risk, causal reasoning, cost/value,
   control/outcome, and decision;
3. specify one independent check per candidate join and include negative and
   ambiguous cases;
4. author one bounded synthetic guide for the question “Should a bounded
   organization adopt a proposed intervention given mixed evidence, uncertain
   outcomes, explicit costs, and a governing constraint?”;
5. validate that its closure remains selective under the existing finite
   controls and that the book form remains useful without the software.

Named techniques and domain-specific catalogs remain examples or specialized
views. Raw graph degree, repeated labels, and unresolved-candidate counts are
not admission criteria.

## Claim boundary

This stocktake establishes current structural coverage and navigation-graph
behavior only. It does not show semantic completeness, useful automatic
selection, comprehension, decision quality, domain validity, external-reader
success, or preview readiness.

## Reproduction

```powershell
node tools\check_reference_closure_coverage.js
node tools\check_reference_closure_coverage.js --json
cargo run --quiet -- reference-check reference\factorium-reference-v0.factorium .
cargo run --quiet -- reference-sidecar-check reference\factorium-reference-v0.factorium reference\factorium-relations-v0.factorium reference\factorium-assurance-v0.factorium .
```

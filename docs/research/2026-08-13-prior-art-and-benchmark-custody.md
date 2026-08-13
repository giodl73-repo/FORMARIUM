# Prior Art and Benchmark Custody

Date: 2026-08-13

## Research question

Which parts of Factor-Preserving Semantic Encoding are established prior art,
which parts should FACTOR standardize, and which benchmark sources or controls
must govern the first implementation?

## Decision supported

This research governs the transition from the Semantic Factor Schema v1
specification to the reference parser, compositional fixtures, and
strong-control bakeoff.

## Local evidence

- `README.md` defines FACTOR as hardware-neutral factor-preserving semantics.
- `specs/SEMANTIC-FACTOR-SCHEMA.md` freezes a flat closed categorical schema,
  canonical interchange, and exact packed/product aliases.
- `fixtures/schemas/navigation.factor` and `event.factor` instantiate the
  contract.
- `context/waves/2026-08-13-method-foundation/ROLE-REVIEW.md` requires prior
  art and source custody before parser or benchmark promotion.
- Squarebit's source result remains external evidence, not imported code or
  corpus payload:
  https://github.com/giodl73-repo/squarebit

## Sources

1. NLTK, *Natural Language Processing with Python*, Chapter 9, feature-based
   grammars:
   https://www.nltk.org/book/ch09.html
2. Lake and Baroni, *Generalization without systematicity*, ICML 2018:
   https://arxiv.org/abs/1711.00350
3. Kim and Linzen, *COGS: A Compositional Generalization Challenge Based on
   Semantic Interpretation*, EMNLP 2020:
   https://aclanthology.org/2020.emnlp-main.731/
4. Keysers et al., *Measuring Compositional Generalization: A Comprehensive
   Method on Realistic Data*, ICLR 2020:
   https://arxiv.org/abs/1912.09713
5. Smolensky, *Tensor product variable binding and the representation of
   symbolic structures in connectionist systems*, Artificial Intelligence
   46(1-2), 1990:
   https://doi.org/10.1016/0004-3702(90)90007-M
6. Plate, *Holographic Reduced Representations*, IEEE Transactions on Neural
   Networks 6(3), 1995:
   https://doi.org/10.1109/72.377968
7. Kleyko et al., *Vector Symbolic Architectures as a Computing Framework for
   Emerging Hardware*, Proceedings of the IEEE 2022:
   https://arxiv.org/abs/2106.05268
8. Locatello et al., *Challenging Common Assumptions in the Unsupervised
   Learning of Disentangled Representations*, ICML 2019:
   https://arxiv.org/abs/1811.12359
9. Abbott and Zardini, *Weaves, Wires, and Morphisms: Formalizing and
   Implementing the Algebra of Deep Learning*, arXiv v3, 2026:
   https://arxiv.org/abs/2604.07242v3

## Findings

### FACTOR-01 - Explicit feature structures are established

**Sources:** NLTK Chapter 9; established unification-based grammar literature.

**Observation:** Attribute/value features, nested agreement information,
variables, valency, and unification are established computational-linguistic
techniques. NLTK's documented examples use features for tense, number, case,
gender, subcategorization, and shared constraints.

**Implication:** FACTOR must not claim invention of representing language with
named factors. Typed feature structures and ordinary records are mandatory
controls. Semantic Factor Schema v1 is intentionally a smaller portable closed
subset, not a replacement for unification grammars.

**Confidence:** high.

### FACTOR-02 - Synthetic systematic splits are established

**Sources:** Lake and Baroni 2018; Kim and Linzen 2020.

**Observation:** SCAN tests recombination of familiar commands and operators.
COGS tests familiar lexical and structural components in systematically novel
combinations and reports a large gap between in-distribution and generalization
accuracy.

**Implication:** Navigation recombination and semantic holdouts are prior art.
FACTOR's contribution can be canonical custody, strong representation aliases,
portable controls, and reproducible decision rules—not the existence of
compositional splits.

**Confidence:** high.

### FACTOR-03 - Split difficulty needs quantitative custody

**Source:** Keysers et al. 2020.

**Observation:** The CFQ methodology constructs splits by keeping atom
divergence small while increasing compound divergence, and reports a strong
negative relationship between compound divergence and model accuracy.

**Implication:** FACTOR should record atom and compound coverage rather than
labeling a split “compositional” from intuition alone. Pulse 05 should include
deterministic coverage tables and a declared divergence measure appropriate to
the bounded schema.

**Confidence:** high.

### FACTOR-04 - Role/filler binding has strong distributed controls

**Sources:** Smolensky 1990; Plate 1995; Kleyko et al. 2022.

**Observation:** Tensor-product representations and vector-symbolic
architectures bind fillers to roles and support compositional structures in
distributed vectors. VSA work provides algebraic binding, superposition, and
unbinding controls rather than arbitrary whole-symbol embeddings.

**Implication:** Any FACTOR role-binding experiment must include at least one
TPR or VSA-style control in addition to explicit feature structures and
factored dense embeddings. FACTOR cannot treat role/filler decomposition as a
new mechanism.

**Confidence:** high for the control requirement; medium for which bounded VSA
implementation should own the first comparison.

### FACTOR-05 - Factors are inductive bias, not automatically discovered truth

**Source:** Locatello et al. 2019.

**Observation:** Unsupervised disentanglement is impossible without inductive
biases on models and data, and measured disentanglement does not automatically
reduce downstream sample complexity.

**Implication:** FACTOR v1 should use declared supervised semantic factors and
state who chose them. It must not claim that a schema discovers the unique
causal or natural decomposition of meaning. Learned factor discovery is
deferred until its supervision and concrete benefit are separately specified.

**Confidence:** high.

### FACTOR-06 - Formal axes can be representation-independent

**Source:** Abbott and Zardini 2026.

**Observation:** The paper formalizes deep-learning computation through
categorical composition, named array axes, broadcasting, and machine-readable
constructed terms. Its implementations support Python/TypeScript interchange,
diagram generation, graph conversion, configuration, and PyTorch compilation,
and represent DeepSeek-V3.

**Implication:** FACTOR should preserve one semantic object that can compile to
packed fields, typed records, product states, one-hot features, or learned
inputs. The paper is prior art for layered formal objects and multiple
representations, but its axes describe tensor computation rather than semantic
roles.

**Confidence:** high.

### FACTOR-07 - Category theory is optional infrastructure, not a foundation gate

**Source:** Abbott and Zardini 2026.

**Observation:** Their categorical framework earns its complexity by supporting
composition, broadcasting, algebraic manipulation, graph conversion, and
compilation across a full deep-learning architecture.

**Implication:** FACTOR should not introduce category-theoretic machinery while
its first contract is a flat closed schema. A morphism layer becomes justified
only when multiple schema transformations, composition laws, or compilers need
shared formal proofs.

**Confidence:** medium-high.

### FACTOR-08 - The first corpus should be generated, not copied

**Sources:** local schema fixtures; SCAN, COGS, and CFQ papers.

**Observation:** FACTOR's first wave needs controlled semantic and split
behavior, not compatibility with a third-party dataset payload. Importing an
external corpus would add license, revision, preprocessing, and redistribution
questions before the parser exists.

**Implication:** Pulse 05 should generate small deterministic FACTOR-owned
fixtures from versioned schemas. SCAN, COGS, and CFQ remain methodological
comparators. Any later payload import requires an exact upstream revision,
license record, transformation manifest, and digest.

**Confidence:** high.

### FACTOR-09 - FACTOR's credible contribution is protocol discipline

**Sources:** all above; local role review.

**Observation:** Factored records, compositional splits, role binding,
distributed compositional representations, and formal axes all predate FACTOR.
The recurring weakness across a new benchmark is not absence of factor ideas,
but inconsistent custody, weak controls, representation conflation, and broad
claims from narrow fixtures.

**Implication:** FACTOR should position itself as a portable method and evidence
contract:

```text
declared semantic schema
  -> canonical identity
  -> semantic-first split custody
  -> exact alias controls
  -> strong structured and distributed controls
  -> separate decision classes
  -> portable result packet
```

**Confidence:** high.

## Benchmark custody decision

### V1 owned artifacts

FACTOR will own and version:

- canonical schema fixtures;
- deterministic generated meanings and surfaces;
- split algorithms and manifests;
- coverage and divergence summaries;
- representation/control configuration;
- result and provenance packets.

Every canonical artifact will use SHA-256 over exact bytes. Generated corpora
will record generator version, schema digest, seed, row count, and surface
template identity.

### External material

SCAN, COGS, CFQ, TPR, VSA, feature-structure, disentanglement, and categorical
architecture sources are methodological references and controls. Their dataset
or code payloads are not copied during the foundation wave.

Later external adoption must record:

- upstream URL and immutable revision;
- authorship and citation;
- license and redistribution status;
- acquired-file digest;
- transformation command and output digest;
- retained versus excluded records;
- whether results remain comparable to the upstream benchmark.

## Recommendations

### Adopt now

1. Treat typed feature structures and packed records as authoritative explicit
   controls.
2. Compute splits from semantic assignments before surfaces.
3. Report atom coverage and compound divergence or a bounded declared analogue.
4. Keep role/filler VSA or TPR controls mandatory for the later ambiguity wave.
5. State factor choice as supervised inductive bias.
6. Compile one canonical semantic object into every representation.
7. Use FACTOR-owned generated V1 fixtures with exact digest custody.

### Prototype behind a compatibility boundary

1. Nested and reentrant feature structures after the flat parser stabilizes.
2. One bounded VSA/TPR role-binding control in Wave 2.
3. Schema morphisms and algebraic composition only after two concrete
   transformation consumers exist.
4. External COGS or CFQ adapters without vendoring their payloads.

### Reject or defer

1. Novelty claims for factored semantic representation.
2. Claims that one schema is the uniquely correct decomposition.
3. Unsupervised factor discovery in the foundation wave.
4. Category-theory infrastructure before transformation requirements exist.
5. Hardware, compression, or runtime claims from semantic accuracy.
6. Third-party corpus imports without immutable source and license custody.

## Role disposition

| Role | Result | Rationale |
|---|---|---|
| Compositional Semantics Steward | pass | Established feature structures and alternative analyses remain visible; V1 is a declared bounded schema. |
| Experimental Methodologist | pass | SCAN, COGS, and CFQ inform distinct split and divergence controls; generated V1 fixtures avoid uncontrolled imports. |
| Representation Control Auditor | pass | Typed records, packed aliases, factored learned models, and VSA/TPR controls are mandatory at the relevant stage. |
| Data Split & Leakage Auditor | pass | Semantic-first grouping, atom coverage, compound divergence, and paraphrase grouping are required. |
| Evidence & Claims Editor | pass | FACTOR is positioned as protocol discipline rather than invention of factorization. |
| Benchmark Numeracy Checker | pass | Corpus counts, divergence, storage, parameters, and runtime remain separate. |
| Research Integrity & Provenance | pass | Source identities, later license custody, transformations, and digests are explicit. |
| Schema Implementer | pass | Prior art does not expand V1 before the fail-closed parser exists. |
| Benchmark Consumer | pass | Portable artifacts and external adapters remain independent of FACTOR internals. |

No critical or major finding remains open.

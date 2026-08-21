# Contributing to Lexicon

Lexicon welcomes reader observations, corrections, missing-concept proposals,
source recommendations, candidate entries, and software improvements.

You do not need to master the full editorial system before contributing. The
best starting point is often one concrete question that Lexicon did not answer
clearly.

## Choose a submission route

### 1. Share reader feedback

Use a
[Reader feedback issue](https://github.com/giodl73-repo/LEXICON/issues/new?template=reader-feedback.yml)
when you could not find a concept, could not choose the right sense, found an
entry confusing, or reached a dead end while following links.

Please include:

- the question you were trying to answer;
- the word or concept you tried;
- what you expected to find;
- what happened instead;
- enough non-sensitive context to understand the lookup.

Reader feedback is valuable even when you do not know the solution. Genuine
lookup records are also the evidence required before a candidate can become
canonical. Do not include confidential, personal, or identifying information.
Classify the report as personal use, an observation of another reader, or a
hypothetical test. Hypothetical and authored tests can improve the product but
have zero canonical reader-demand weight.

### 2. Suggest a concept

Use a
[Concept proposal issue](https://github.com/giodl73-repo/LEXICON/issues/new?template=concept-proposal.yml)
when you can state a potentially missing governing question.

A strong proposal identifies:

- the concept or working headword;
- the question a reader needs answered;
- one or more real contexts where the question occurs;
- the nearest existing Lexicon entries and why they are insufficient;
- credible sources or domain authorities;
- distinctions, counterexamples, or limitations that must be preserved.

A proposal does not need a finished taxonomy. Named subtypes, frameworks,
mechanisms, and examples often become factors rather than separate senses.

### 3. Submit a correction

Open a
[Correction issue](https://github.com/giodl73-repo/LEXICON/issues/new?template=correction.yml)
or pull request for a factual, terminological, source, link, or boundary
correction. Name the affected passage, provide evidence, and explain the
smallest change that resolves it. Corrections must preserve source scope and
must not silently broaden a claim.

### 4. Prepare a candidate packet

Use this route when source and owner research already support a complete
noncanonical proposal. A candidate packet contains:

1. one draft under `signals/discover/candidates/`;
2. one matching admission brief under `signals/discover/literature/`;
3. an entry in `signals/discover/candidates/README.md`.

Start from a recent candidate pair rather than a canonical Table. Run:

```powershell
node tools\check_candidate_entries.js
```

The validator requires a one-to-one draft/brief pair, matching sense IDs,
unique ownership, resolved links, noncanonical status, and the standard
sections described below. It also matches several contract markers literally:

- the draft contains `Status: noncanonical candidate entry draft`;
- the draft links its pair as
  `[Admission brief](../literature/<brief-file>.md)`;
- the brief front matter contains `canonical_admission: false`;
- the brief contains `## Counterevidence and limits`;
- sense IDs and their order are identical in the draft's **Sense table** and
  the brief's **Proposed senses**.

## Candidate standards

### Draft entry

A candidate draft must contain:

1. **Orientation** — the concept and its nearest boundaries;
2. **Sense table** — independently answerable governing questions;
3. **Root factorization** — the dimensions needed to use the concept;
4. **Decisive distinctions** — how easily confused concepts differ;
5. **Dependencies and stopping boundary** — what this entry does not own;
6. **Selection procedure** — how a reader chooses and uses a sense;
7. **Reference Delta** — what a dictionary, thesaurus, ontology, standard, or
   domain handbook already contributes, and what structured question the
   candidate adds without displacing those references;
8. **Failure signs** — observable misuse or overreach;
9. **Cross-references** — existing owners and the matching brief;
10. **Sources and provenance** — contribution and limitation of each source.

### Admission brief

The matching brief must contain:

- a decision question and bounded thesis;
- proposed senses matching the draft exactly;
- a compact candidate contract;
- an audit of existing owners;
- a source matrix;
- counterevidence and limits;
- explicit admission gates;
- a noncanonical disposition.

## Editorial rules

Every submission is reviewed against the same principles:

- **Separate senses from factors.** A sense answers a materially different
  governing question. A subtype, mechanism, stage, example, or parameter is
  usually a factor.
- **Search existing owners first.** Prefer routing or extending an existing
  entry over creating a near-duplicate.
- **Preserve alternatives.** Do not present one familiar decomposition,
  framework, taxonomy, or implementation as universal.
- **State the boundary.** Name what the proposal does not decide and where
  adjacent questions route.
- **Keep source scope.** A standard, discipline, jurisdiction, culture, or
  named theory remains evidence within its own scope, not universal authority.
- **Include counterevidence.** Record disagreement, failure cases, uncertainty,
  and conditions under which the proposal does not apply.
- **Separate description from recommendation.** A structural distinction does
  not by itself prescribe a policy, diagnosis, treatment, legal conclusion, or
  safety action.
- **Keep evidence classes distinct.** Authored examples, synthetic tests, and
  AI-generated analysis do not count as external-reader demand.
- **Disclose assistance.** Identify material AI assistance and independently
  verify every source, quotation, identifier, and substantive claim it helped
  produce.
- **Minimize the claim.** Prefer the narrowest useful contribution that remains
  true.

## What review can decide

A submission may be:

- **route** — an existing entry already owns the question;
- **merge** — the contribution improves an existing proposal;
- **narrow** — part survives after labels, factors, or unsupported scope are
  removed;
- **candidate** — a complete noncanonical entry and brief are warranted;
- **defer** — the idea is coherent but evidence or boundaries are incomplete;
- **reject** — the proposal cannot meet the source, ownership, or safety bar.

Routing, narrowing, merging, or deferral are normal editorial outcomes, not a
judgment on the contributor. Reviews should name the reason and the evidence
that could reopen the decision.

## Canonical admission

Candidate completion is not canonical admission. A candidate may enter the
canonical reference only after all of these gates pass:

1. the same unmet governing lookup need appears in at least two genuine
   external-reader records;
2. existing canonical owners cannot answer it without semantic loss;
3. source and domain review support stable distinctions and explicit limits;
4. fixed-point review leaves no unresolved critical or major finding;
5. graph, catalog, assurance, search, and publication checks pass;
6. publication review accepts the maintenance cost and reader value.

Authored audits and synthetic simulations have zero reader-demand weight.
Maintainers own the final canonical admission decision and may request a
separate admission change after the candidate gates pass.

## Pull requests

Keep a pull request focused on one coherent contribution. Explain:

- the reader problem or defect;
- the proposed disposition;
- sources and limitations;
- affected owners and boundaries;
- checks run;
- unresolved questions.

Do not directly edit generated catalogs or admit a candidate into canonical
Tables unless the pull request is explicitly authorized as a canonical
admission change. Generated artifacts must be produced by their owning tools.

Before changing Tables, schemas, reference contracts, or claims, also read
`CONTEXT.md`, `AGENTS.md`, `.roles/ROLE.md`, and the relevant specification.

## Licensing

By submitting a contribution, you agree that it may be distributed under the
license applicable to its location: original book and reference content under
[CC BY-NC 4.0](LICENSE-CONTENT.md), and software under the [MIT License](LICENSE).

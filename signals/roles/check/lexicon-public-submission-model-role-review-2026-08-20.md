---
topic: lexicon-public-submission-model
date: 2026-08-20
roles_used: 8
verdict: PASS
canonical_admission: false
---

# Lexicon Public Submission Model Role Review

## Scope

This review covers the public README, contributor guide, reader-feedback,
concept-proposal, and correction forms, pull-request template, applicable
licenses, active candidate validator, and the entry-format specification
contributors are asked to follow.

## Roles

- Reference Lexicographer;
- Reference Architecture Editor;
- Concept & Taxonomy Boundary Editor;
- Evidence & Claims Editor;
- Research Integrity & Provenance;
- Domain Source Reviewer;
- Reference Practitioner;
- Product Owner.

## Product value statement

| Field | Result |
|---|---|
| Reader | A practitioner, domain expert, editor, or developer who finds a gap or defect in Lexicon. |
| Job | Report a failed lookup, propose a governing question, correct an entry, or prepare a complete candidate packet. |
| Current friction | Admission rules existed across validators, role files, specifications, and wave records without one public route. |
| Product change | One contributor guide, three issue forms, and one pull-request template now expose progressively stricter paths. |
| Evidence now | Structural review and validation establish consistency and usable routing, not contributor adoption or reader value. |
| Evidence later | Real submissions must establish findability, completion rate, review burden, and return contribution. |
| Cost and displacement | The model adds one maintained guide and four contributor-facing GitHub templates; it does not create another content authority. |
| Continue/merge/stop | Continue with this single model; merge future procedural rules into it rather than creating parallel guides. |

## Findings and closure

| Role | Severity | Finding | Closure condition | Result |
|---|---|---|---|---|
| Reference Architecture Editor / Reference Lexicographer | major | Active role text and the linked Factor Table specification retained former product names, and the specification pointed to the nonexistent `FACTORIUM-ENTRY-GRAPH.md`. | Use Lexicon terminology in active rules and point to `LEXICON-ENTRY-GRAPH.md`. | Closed in the three affected roles and the entry-format specification. |
| Evidence & Claims Editor / Research Integrity & Provenance | major | The reader-feedback form did not distinguish genuine use or observation from a hypothetical authored test, allowing evidence classes to be pooled accidentally. | Require an evidence-class selection and state that hypothetical/authored tests have zero canonical reader-demand weight. | Closed in the issue form and contributor guide. |
| Reference Practitioner | minor | A newcomer could miss literal validator markers while following only prose. | Name the exact status, brief link, front-matter flag, limits heading, and sense-order requirements. | Closed in `CONTRIBUTING.md`. |
| Reference Practitioner | minor | The guide welcomed factual and boundary corrections but the issue chooser offered no structured correction route. | Add a correction form requiring location, narrow repair, evidence, and scope limits. | Closed; correction intake now matches the documented route. |
| Concept & Taxonomy Boundary Editor | major | Open concept intake could encourage lists of labels or named frameworks rather than reusable governing distinctions. | Require a governing question, existing-owner audit, distinctions, counterexamples, and source limits; retain route, merge, narrow, defer, and reject outcomes. | Pass; the concept form and guide already enforce the boundary. |
| Domain Source Reviewer | major | Domain proposals could universalize one authority or omit contrary scope. | Require stable sources, each source's contribution and limitation, competing frameworks, and explicit non-advice boundaries. | Pass; the guide, form, and candidate packet require these controls. |
| Product Owner | major | Contribution machinery could become a second authority or create process without a reader job. | Keep canonical content in the reference, candidate content in discovery, and the public model focused on four recognizable contributor tasks. | Pass; no parallel content authority was introduced. |
| Research Integrity & Provenance | major | Submission licensing and material AI assistance could remain implicit. | State applicable inbound licensing, require material-assistance disclosure, and require independent claim and source verification. | Pass; both are explicit. |

## Live path verification

- GitHub Issues are enabled on the public repository.
- GitHub's community profile recognizes `CONTRIBUTING.md` and the pull-request
  template.
- The repository contents API exposes all three issue forms and their chooser
  configuration.
- Reader-feedback and concept-proposal labels exist; correction intake uses its
  own matching label.
- The public repository README exposes the contributor guide in its first link
  row.

## Fixed-point verdict

**PASS.** No critical, major, minor, or actionable findings remain after
repair. The model welcomes incomplete but genuine reader observations while
increasing requirements in proportion to the authority requested.

Canonical admission remains separate. It still requires recurring genuine
reader need, an existing-owner gap, source and domain review, fixed-point role
review, downstream graph and publication validation, and maintainer approval.

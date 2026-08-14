# Volume Prototype and Usability Research

Date: 2026-08-15

Status: decision support for R4 prototype readiness

## Research question

How should Factorium assemble its current reference into a coherent
table-first volume and test whether readers can find, distinguish, navigate,
and apply entries without author assistance?

Decision supported: publish a 78-record linked volume prototype, a neutral
reader packet, a separate evaluator rubric, and a moderated usability
protocol. Do not mark R4 complete until real reader observations exist.

## Local evidence inventory

- `ROADMAP.md`, R4 gate
- `tables/CATALOG.md`
- `tables/INDEX.md`
- `tables/formulas/INDEX.md`
- `guides/INDEX.md`
- `docs/research/2026-08-13-reference-scale-and-entry-size.md`
- R1, R2, and R3 gate audits

## Findings

### FACTORIUM-VOL-01 - The current corpus exactly fits the prototype range

**Source:** R1 audit; current canonical catalog; R3 audit.

**Observed constraint:** Factorium has 47 canonical records when roots, roles,
primes, composites, and anchors are counted, plus 31 specialized views.

**Implication:** A first prototype can curate all 78 records, landing inside
the roadmap's 75-125 target without inventing filler or dropping family
coverage.

**Confidence:** high.

### FACTORIUM-VOL-02 - A volume needs a reading path, not a copied graph dump

**Source:** `VISION.md`; `ROADMAP.md`; FTRM-04 in
`docs/research/2026-08-13-reference-scale-and-entry-size.md`.

**Observed constraint:** The graph supports many navigation orders, while a
book needs progressive orientation. Britannica's tiered architecture was
already identified as a useful analogy for concise lookup linked to deeper
anchors.

**Implication:** The prototype groups records into foundations, structural
systems, quantities, information/economics, and a recursive security example,
then closes with applied guides. Links remain canonical; chapter order is a
publication projection.

**Confidence:** high.

### FACTORIUM-VOL-03 - Reader tasks must be believable and non-leading

**Source:** GOV.UK Service Manual, "Using moderated usability testing,"
<https://www.gov.uk/service-manual/user-research/using-moderated-usability-testing>.

**Observed constraint:** Good tasks have clear believable goals, are
challenging enough to expose issues, and do not reveal the answer. Moderators
should use neutral instructions, encourage think-aloud, and mostly observe.

**Implication:** Reader prompts contain scenarios and goals only. Expected
pages, distinctions, and scoring remain in a separate evaluator rubric.

**Confidence:** high.

### FACTORIUM-VOL-04 - Usability is an outcome of actual use

**Source:** ISO 9241-11:2018 overview,
<https://www.iso.org/standard/63500.html>.

**Observed constraint:** ISO describes usability as an outcome of use in a
specified context. Author inspection can improve a prototype but cannot
establish reader effectiveness, efficiency, or satisfaction.

**Implication:** R4 remains active after prototype readiness. At least one
moderated round with real target readers is an external gate.

**Confidence:** high.

### FACTORIUM-VOL-05 - Automated checks do not replace human accessibility evaluation

**Source:** W3C WAI, "Test and Evaluate,"
<https://www.w3.org/WAI/test-evaluate/>.

**Observed constraint:** W3C states that tools help but no tool alone
determines accessibility; knowledgeable human evaluation and involvement of
users with disabilities improve evaluation.

**Implication:** Link and structure checks are necessary but insufficient.
The protocol asks about device/assistive-technology context and seeks an
accessibility perspective without collecting unnecessary personal data.

**Confidence:** high.

### FACTORIUM-VOL-06 - Small qualitative rounds require observation custody, not statistical claims

**Source:** GOV.UK moderated usability guidance; roadmap's reader task gate.

**Observed constraint:** Moderated sessions reveal language, layout, and task
completion problems through behavior and think-aloud. A small round is not a
population estimate.

**Implication:** The protocol records completion, time, path, errors, quotes,
and assistance. Thresholds are release heuristics, not statistical
generalization.

**Confidence:** high.

### FACTORIUM-VOL-07 - Privacy improves when the prototype uses dummy scenarios

**Source:** GOV.UK moderated usability guidance, "Testing with personal data"
and "Using dummy data."

**Observed constraint:** Real data may increase engagement but creates
security and privacy obligations. The Factorium tasks do not require personal
data.

**Implication:** Use participant codes and supplied scenarios. Do not collect
names, employer secrets, credentials, health data, or production documents in
observation records.

**Confidence:** high.

## Recommendations

### Adopt now

- Curate all 78 current records into one five-part reading path.
- Include the two R3 guides as applications outside the 78-record count.
- Publish a reader packet with seven neutral tasks.
- Keep expected answers and scoring in a separate evaluator rubric.
- Use 45-60 minute moderated sessions with think-aloud and minimal
  intervention.
- Record anonymous participant code, task outcome, time, path, errors,
  assistance, and observed language/layout issues.
- Keep R4 active until external observations are captured and revisions are
  dispositioned.

Owner: Factorium R4.

Validation: manifest count, link walk, role review, colleague dry run of task
wording, and observed reader sessions.

### Prototype behind a publication boundary

- compiled HTML/PDF/EPUB book output;
- generated chapter manifests;
- accessibility conformance evaluation;
- remote unmoderated task instrumentation;
- cross-reader navigation analytics.

### Reject or defer

- declaring usability from author review;
- giving expected terminology in reader prompts;
- collecting unnecessary personal or workplace data;
- treating a small qualitative round as a statistical benchmark;
- proceeding to R5 without dispositioning repeated blockers.

## Non-goals

- no claim that 78 records form the first substantial volume;
- no statistical population inference;
- no accessibility conformance claim;
- no substitution of AI role review for reader behavior;
- no R4 completion without external observations.

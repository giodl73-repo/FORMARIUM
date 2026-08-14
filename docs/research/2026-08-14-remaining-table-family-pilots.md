# Remaining Reference Table Family Pilot Research

Status: candidate research basis

## Research question

What minimum strong pilots can test Procedure, Diagnostic, Scale, Reference
Value, and Evidence Tables without turning Factorium into an arbitrary table
collection or creating duplicate authority?

Decision supported: closure of R1 table-family coverage before freezing the
R2 interchange schema.

## Local evidence

- `specs/REFERENCE-TABLE-FAMILIES.md` defines one governing question and one
  primary family for every view.
- `specs/FACTOR-TABLE-ENTRY.md` defines editorial maturity labels and required
  entry sections.
- `specs/REFERENCE-DELTA.md` distinguishes mandatory provenance/comparison
  metadata from an Evidence Table lookup task.
- `docs/STRONG-CONTROL-BAKEOFF-RESULT.md` and
  `docs/ROLE-AMBIGUITY-RESULT.md` preserve narrow accepted claims, controls,
  identities, limitations, and reproduction commands.
- Existing role reviews provide repeated evidence for a publication
  procedure and factorization-quality diagnostics.

## Findings

### FACTORIUM-RTF-01 - Procedure owns ordered work and recovery

Source:

- `specs/REFERENCE-TABLE-FAMILIES.md`
- `specs/FACTOR-TABLE-ENTRY.md`
- current cluster publication history in
  `context/waves/2026-08-13-factorium-vision/WAVE.md`

Observed constraint: publishing a substantial entry repeatedly requires
research, sense selection, specialized views, provenance, cross-references,
role review, validation, and index integration. The steps have gates and
failure recovery, not merely a mathematical recurrence.

Implication: the first Procedure Table should own the editorial publication
workflow.

Confidence: high.

### FACTORIUM-RTF-02 - Scale owns interpretation, not source values

Source:

- `specs/FACTOR-TABLE-ENTRY.md`
- `specs/REFERENCE-TABLE-FAMILIES.md`

Observed constraint: `candidate`, `supported`, `established`, `disputed`, and
`deprecated` interpret evidence and editorial status. They do not supply
scientific constants or select publication actions by themselves.

Implication: maturity belongs in a Scale Table linked to, but distinct from,
the publication Procedure.

Confidence: high.

### FACTORIUM-RTF-03 - Diagnostics start from observations

Source:

- role-review findings across
  `context/waves/2026-08-13-factorium-vision/`
- `tables/foundations/FACTOR-ROLES.md`
- `specs/FACTOR-TABLE-ENTRY.md`

Observed constraint: repeated observable symptoms—subclass explosion, opaque
names, unexplained exceptions, derived inputs, invalid Cartesian products,
and mechanism-defined factors—suggest different structural causes and tests.

Implication: a Diagnostic Table should map symptom to candidate cause, next
test, and repair boundary without claiming certainty.

Confidence: high.

### FACTORIUM-RTF-04 - Reference values require source and status

Source:

- BIPM, "SI defining constants":
  https://www.bipm.org/en/measurement-units/si-defining-constants

Observed constraint: SI defines its unit system through seven constants whose
numerical values in stated units are exact and have no uncertainty. This is
different from a measured material property or recommended nominal value.

Implication: a Reference Value Table must expose quantity, value, unit,
exact/measured status, authority, version, and intended use.

Confidence: high.

### FACTORIUM-RTF-05 - Exact does not mean universally interchangeable

Source:

- BIPM, "SI defining constants":
  https://www.bipm.org/en/measurement-units/si-defining-constants

Observed constraint: fixed numerical values define SI units. Their exactness
does not make them dimensionless, optional in unit conversion, or a complete
physical model.

Implication: the pilot must preserve symbols, units, roles, and scope rather
than present a bare number list.

Confidence: high.

### FACTORIUM-RTF-06 - Evidence Tables compare support for claims

Source:

- `docs/STRONG-CONTROL-BAKEOFF-RESULT.md`
- `docs/ROLE-AMBIGUITY-RESULT.md`
- `specs/REFERENCE-DELTA.md`

Observed constraint: the founding evidence supports factor reuse and explicit
candidate-set composition in frozen synthetic settings while strong
conventional controls tie. It does not support representation-specific,
open-vocabulary NLP, runtime, or universal decomposition claims.

Implication: an Evidence Table should place supported, contradicted, excluded,
and untested claims beside exact artifacts and commands.

Confidence: high.

### FACTORIUM-RTF-07 - Evidence and maturity remain separate

Source:

- `specs/REFERENCE-TABLE-FAMILIES.md`
- `specs/FACTOR-TABLE-ENTRY.md`

Observed constraint: evidence is claim-specific, while maturity is an
editorial assessment across sources, settings, disputes, and review.

Implication: an Evidence Table must not automatically set an entry to
`established`, and a Scale Table must not hide the underlying evidence.

Confidence: high.

## Recommendations

### Adopt now

- Add canonical anchors for Factorium entry publication, factorization
  quality, physical constants, and claim/evidence.
- Add one Procedure, Scale, Diagnostic, Reference Value, and Evidence pilot.
- Use existing accepted founding results as the first Evidence Table because
  their custody and limitations are already explicit.

Owner: Factorium.

Validation: family selection, source custody, role review, link validation,
role registry, and R1 gate audit.

### Prototype behind a compatibility boundary

- Keep workflow, diagnostic, maturity, value, and evidence rows Markdown-first
  until R2.
- Treat the seven SI constants as a reference-value pilot, not broad
  scientific-property coverage.

### Reject or defer

- Reject Reference Delta metadata as an Evidence Table substitute.
- Reject maturity as an automatic score.
- Reject diagnostic symptoms as proven causes.
- Reject exact constants as unlabeled numbers.

## Non-goals

- automating publication approval;
- defining universal maturity or quality scores;
- replacing BIPM reference authority;
- broadening founding FACTOR claims.


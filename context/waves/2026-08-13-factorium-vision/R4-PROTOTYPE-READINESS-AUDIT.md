# R4 Volume Prototype Readiness Audit

Status: ready for external usability; R4 not complete

Date: 2026-08-15

## Readiness decision

The autonomous R4 work is complete. The volume, task packet, rubric,
observation schema, research, and role review are ready. The roadmap gate
cannot pass until real readers use the prototype without author assistance.

## Prototype

Volume:

- `volumes/01-structure-quantity-choice/VOLUME.md`

Title:

- *Structure, Quantity, and Choice*

Measured selection:

| Record group | Count |
|---|---:|
| Root coordinates | 12 |
| Structural role entries | 6 |
| Canonical anchor entries | 20 |
| Specialized views | 31 |
| Prime entries | 8 |
| Composite entries | 1 |
| Total selected records and views | 78 |
| Application guides, excluded from count | 2 |

The 78-record selection is the complete current corpus, curated into five
parts rather than ordered by repository path.

## Reader-evidence package

- `USABILITY-PROTOCOL.md`
- `READER-PACKET.md`
- `EVALUATOR-RUBRIC.md`
- `OBSERVATIONS.md`

The packet tests all six roadmap behaviors:

- locate a sense;
- distinguish nearby concepts;
- select a specialized view;
- identify invalid cases;
- follow a factor deeper;
- apply the reference.

## Validation

Prototype readiness requires:

```text
volume numbered-record count = 78
all 78 numbered links resolve
reader tasks = 7
reader prompts and evaluator rubric are separate
observation participant count = 0 before external sessions
repository-wide relative Markdown link walk
role registry validation
git diff --check
```

Research:

- `docs/research/2026-08-15-volume-prototype-usability.md`

Fixed-point readiness review:

- `VOLUME-PROTOTYPE-ROLE-REVIEW.md`

## External gate

R4 remains active until:

- 3-5 target-reader sessions are completed;
- at least two practitioner backgrounds are represented;
- task observations are de-identified and recorded;
- repeated critical blockers are closed;
- failed and assisted tasks are dispositioned;
- affected entries, guides, navigation, or protocol are revised;
- the gate is rerun against observed evidence.

No autonomous or AI-generated substitute is valid for these observations.

The external execution milestone is
[`R4E - The Sieve`](R4E-THE-SIEVE.md). R5 follows under the codename
**Factor Forge** only after The Sieve closes this gate.

## Execution addendum - 2026-08-14

The readiness decision and R4 closure gate above remain unchanged. A later
roadmap policy separated milestone closure from forward-work eligibility:

- `sieve-01` remains frozen at commit `817e779` and tag
  `sieve-01-prototype`;
- R5 Factor Forge editorial batches may proceed in parallel;
- later R5 content is not covered by Sieve observations;
- R5 publication still requires relevant Sieve findings to be dispositioned.

See `R4E-THE-SIEVE.md` and `R5A-FACTOR-FORGE-INTAKE.md`.

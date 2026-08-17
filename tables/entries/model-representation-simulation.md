# Model, Representation, and Simulation

Status: candidate anchor entry

## Orientation

A model selects aspects of a subject for a purpose. A representation expresses
content in a form under an interpretation contract. A simulation executes or
evolves a model to produce a run result. The subject, model, representation,
implementation, run, and result can disagree independently; a realistic image
or precise number does not collapse those layers.

## Sense table

| Sense | Governing question | Role |
|---|---|---|
| `model` | Which selected aspects and relations of a subject are represented for this purpose? | purpose-bounded abstraction |
| `representation` | In which form is content expressed, under what syntax and interpretation? | expression and interpretation contract |
| `simulation` | Which model is executed or evolved under which inputs, state, and rules? | model-execution process |
| `simulation-run` | Which particular execution occurred with which configuration, seed, environment, and time? | reproducible execution instance |
| `simulation-result` | Which output did that run produce and how is it interpreted? | run-bound result artifact |

## Layer ladder

```text
subject and purpose
  -- select and abstract --> model
model content
  -- express under conventions --> representation
model + implementation + inputs + initial/boundary conditions
  -- execute --> simulation run
run observations
  -- process and interpret --> simulation result
```

## Root factorization

```text
model-simulation-use
  := subject, boundary, purpose, and users
   x selected entities, variables, relations, and omitted aspects
   x assumptions, idealizations, resolution, and validity domain
   x representation syntax, semantics, notation, and version
   x implementation, solver, platform, and numerical settings
   x inputs, parameters, initial/boundary conditions, and scenarios
   x run identity, seed, environment, time, and provenance
   x outputs, post-processing, uncertainty, and comparison evidence
   x verification, validation, sensitivity, and intended-use limits
```

## Contrast table

| Pair | Shared feature | Decisive distinction |
|---|---|---|
| Subject vs. model | model concerns subject | entity or process of interest vs. selected abstraction |
| Model vs. representation | models require expression | selected content/relations vs. form carrying that content |
| Model vs. implementation | implementation realizes model operations | conceptual/mathematical contract vs. executable mechanism |
| Simulation vs. run | a run instantiates simulation | repeatable process kind vs. one execution identity |
| Output vs. result | output can support result | emitted value/artifact vs. interpreted run-bound finding |
| Fidelity vs. validity | both concern adequacy | represented detail/resemblance vs. support for an intended use |

## Diagnostic examples

- Two diagrams can represent the same model while emphasizing different views.
- Equal source equations can yield different run results because solvers,
  tolerances, discretizations, seeds, or environments differ.
- A high-detail model may be less useful than a simpler one when its inputs are
  unavailable or its assumptions do not fit the decision.
- Agreement with one dataset does not validate every variable, regime, or use.

## Specialized view

[Model and Simulation Failure Diagnostic](../diagnostics/model-simulation-failures.md)
localizes disagreement across subject, model, representation, implementation,
run, and interpretation layers.

## Selection procedure

1. State subject, boundary, purpose, users, decision, and required outputs.
2. Name included and omitted aspects, assumptions, validity domain, and scale.
3. Identify the model independently of each representation and implementation.
4. Version syntax, semantics, equations/rules, data, code, and configuration.
5. Record inputs, parameters, conditions, scenarios, seed, and environment.
6. Give every run and result a stable identity and preserve raw outputs.
7. Test implementation against model, then model against intended-use evidence.
8. Report sensitivity, uncertainty, discrepancies, and invalid uses.

## Constraints and failure signs

- Purpose and intended use precede claims of adequacy.
- A diagram, file, equation set, or program is not automatically the model.
- Verification of implementation is not validation of the model for use.
- Run identity retains all settings capable of changing output.
- Calibration data and validation evidence are distinguished.
- Visual realism and numerical precision do not prove fidelity or validity.
- Named model types, languages, solvers, and platforms remain examples.

## Cross-references

- [System Composition, Architecture, Capability, Interface, and Dependency](system-composition-dependency.md)
- [Claim and Evidence](claim-evidence.md)
- [Measurement Quality](measurement-quality.md)
- [Identity, Namespace, Naming, Classification, and Versioning](identity-naming-classification-versioning.md)
- [Information, Data, Signal, and Noise](information-data-signal-noise.md)

## Sources and provenance

1. NIST IR 8298, *Validation Methods for Energy Models*:
   https://nvlpubs.nist.gov/nistpubs/ir/2020/NIST.IR.8298.pdf
2. NASA-HDBK-1009A, *Systems Modeling Handbook for Systems Engineering*:
   https://standards.nasa.gov/standard/NASA/NASA-HDBK-1009
3. NASA, *Systems Engineering Handbook*:
   https://www.nasa.gov/reference/systems-engineering-handbook/

Comparator access date: 2026-08-16. Domain methods retain their own authority;
the cross-domain selection contract remains `candidate`.

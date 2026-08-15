# Mathematical Relation and Solver Failure Diagnostic

Status: candidate Diagnostic Table

Primary family: Diagnostic Table

Canonical headword: [Mathematical Function, Variable, Equation, Identity, Solution, Root, Derivative, Iteration, and Convergence](../entries/mathematical-relation-solving.md)

Canonical senses: `mathematical-function`, `variable`, `equation`, `identity`,
`solution`, `root`, `derivative`, `iteration`, `convergence`

## Governing question

Which object, symbol-role, domain, equality, solution-set, derivative,
iteration, stopping, or convergence defect could explain an invalid symbolic
or numerical result, and what check would discriminate it?

## Diagnostic table

| Observation | Candidate causes | Discriminating test | Likely repair owner |
|---|---|---|---|
| Same formula gives conflicting behavior | domains/codomains differ; branch convention; excluded point; units differ | write the full function contracts and evaluate a boundary/branch fixture | model and domain owner |
| A symbol changes meaning mid-derivation | free/bound capture; parameter treated as unknown; index collision; unstated reassignment | annotate every occurrence by role and scope, then alpha-rename bound symbols | derivation owner |
| “Identity” fails for one value | actually conditional; domain mismatch; illegal cancellation; branch restriction | substitute the counterexample and audit each equivalence transformation and domain | algebra owner |
| Solver returns only some solutions | search basin; lost branch; division by zero; squaring/extraneous roots; multiplicity | compare original and transformed equations and verify every candidate in the original | solving-method owner |
| Reported root does not make `f(x)` small | wrong function/version; root/output confusion; premature stop; scaling | evaluate the exact bound function and normalized residual at the returned input | numerical owner |
| Derivative result disagrees near a point | nondifferentiability; wrong variable; symbolic simplification changed domain; finite-difference step error | check the limit/domain and compare analytic, automatic, and step-refined finite differences | analysis/tool owner |
| Newton update is undefined or enormous | zero/small derivative; domain exit; singular scaling; arithmetic overflow | log `f`, `f'`, update, domain, and precision at each iterate | numerical owner |
| Iterates cycle or diverge | poor start; wrong basin; recurrence error; discontinuity; insufficient precision | trace the sequence from multiple controlled starts and compare with method conditions | numerical-analysis owner |
| Solver stops but answer is wrong | step-only stop; loose tolerance; iteration cap; stagnation; wrong target root | inspect residual, step, forward-error bound, target identity, and termination reason separately | implementation and model owner |
| Claimed convergence rate is not observed | not in local regime; multiple root; wrong norm; roundoff floor; insufficient iterations | estimate errors/residual ratios over a controlled tail and test assumptions | analysis owner |

## Use contract

1. Freeze the original object, equations, symbol table, domains, target, method,
   implementation/version, arithmetic, initial state, and expected result.
2. Preserve the original and every transformed relation with its domain and
   solution-set implication.
3. Reproduce a minimal failing symbolic substitution or numerical trace.
4. Separate object-definition, derivation, implementation, stopping, and
   convergence hypotheses before choosing a repair.
5. Verify repaired candidates in the original relation and report residual,
   error, completeness, and proof status independently.

## Failure signs

- `f`, `x`, or `=` appears without a declared role or domain where it matters;
- a formula, graph, software function, and mathematical function are aliases;
- an equality is called an identity after checking examples only;
- transformed equations silently gain or lose solutions;
- a root is reported without its function or solution domain;
- differentiability is assumed from visual smoothness or a symbolic command;
- iteration count or small step is the sole correctness test;
- convergence, termination, residual, and forward error share one status;
- local quadratic convergence becomes a universal Newton guarantee.

## Sources and provenance

1. [Mathematical relation and solving research note](../../docs/research/2026-08-15-mathematical-relation-solving.md)
2. NIST DLMF, “Calculus of One Variable”: https://dlmf.nist.gov/1.4
3. NIST DLMF, “Nonlinear Equations”: https://dlmf.nist.gov/3.8
4. OpenStax, “Newton's Method”:
   https://openstax.org/books/calculus-volume-1/pages/4-9-newtons-method

This diagnostic isolates candidate failures; it does not prove an identity,
certify a solver, establish differentiability, or guarantee convergence.

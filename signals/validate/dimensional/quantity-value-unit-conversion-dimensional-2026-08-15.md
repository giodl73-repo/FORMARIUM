---
skill: validate-dimensional
topic: quantity-value-unit-conversion
date: 2026-08-15
equations_checked: 46
p1_errors: 0
dimensionless_paper: false
---

# Quantity Value and Unit Conversion Dimensional Audit

## Scope

- `tables/entries/quantity-value-unit-conversion.md`
- `tables/mappings/unit-conversion.md`
- `tables/mappings/temperature-scales.md`

## Dimension inventory

| Symbol | Meaning | Dimension/unit contract |
|---|---|---|
| `Q` | particular quantity value | dimension `[D]` determined by quantity kind |
| `u_s`, `u_t` | source and target units | `[D]`, same quantity kind required |
| `x_s`, `x_t` | numerical values in selected units/scales | number; unit dependence retained by subscript |
| `c_(s->t)` | directed multiplicative conversion factor | dimension one |
| `a` | affine scale coefficient | numerical scale ratio, dimension one |
| `b` | target-scale numerical offset | number in the declared target numerical-value equation |
| `Delta x` | numerical interval | number under the selected scale |
| `u(x)` | standard uncertainty of numerical value | same numerical-value scale as `x` |
| `a_i` | compound-unit exponent | dimension one, normally integer or rational by unit definition |
| `C`, `K`, `F` | temperature numerical values | numbers tied to their named point scales |

## Equation checks

| Equations | Check | Result |
|---|---|---|
| 1-3: `Q = x_s u_s = x_t u_t` | each product has `[D]` | yes |
| 4: `c_(s->t) = u_s/u_t` | `[D]/[D] = 1`; same kind required | yes, conditional on kind |
| 5-6: forward and reciprocal factors | number maps to number; nonzero factor | yes |
| 7-10: compound-unit products | each unit factor receives exponent `a_i`; products match `[D]` | yes |
| 11-13: affine point and inverse | all terms are numerical values; `a != 0` | yes |
| 14: `Delta x_t = a Delta x_s` | interval numbers scale without offset | yes |
| 15-16: uncertainty scaling | output uncertainty has target numerical scale | yes for exact coefficient |
| 17: kilogram-to-gram example | `kg x g/kg = g` | yes |
| 18-19: kilometre/hour-to-metre/second | distance and time units both cancel | yes |
| 20-21: gram/cubic-centimetre-to-kilogram/cubic-metre | length factor is cubed | yes |
| 22-30: nine point-temperature mappings | each result is a number on its target scale | yes |
| 31-39: nine temperature-interval mappings | scale only; no offset | yes |
| 40-42: physical point-temperature domains | comparisons use numbers on one declared scale | yes |
| 43-46: Celsius/kelvin and Celsius/Fahrenheit round trips | inverse functions recover input in exact arithmetic | yes |

The affine relations are numerical-value equations, not quantity equations.
Writing `b` as a bare quantity offset would be ambiguous; its role as a target
scale number is therefore part of the symbol contract.

## Dimensional fault register

| ID | Potential fault | Severity | Disposition |
|---|---|---:|---|
| QUC-D01 | Same dimension treated as sufficient evidence of same kind | P2 | Blocked by kind gate and energy/torque counterexample. |
| QUC-D02 | Affine offset applied to an interval | P2 | Separate interval equation has scale only. |
| QUC-D03 | Length factor reused for area or volume | P2 | Compound equation applies exponents to complete factors. |
| QUC-D04 | Denominator conversion direction reversed | P2 | Signed exponents and speed example expose direction. |
| QUC-D05 | Approximate factor treated as exact in uncertainty propagation | P2 | Approximate-factor uncertainty must be included when material. |
| QUC-D06 | `x`, `Q`, and `u` notation conflated | P3 | Inventory and anchor contrast keep them separate. |

No P1 dimensional inconsistency remains.

## Amendments

1. State explicitly that affine variables are unit-indexed numerical values.
2. Retain quantity-kind checking in addition to dimensional checking.
3. Qualify simple uncertainty scaling by exact coefficient status and preserve
   extra factor uncertainty otherwise.

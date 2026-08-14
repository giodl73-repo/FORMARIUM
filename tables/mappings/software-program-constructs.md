# Software Program Construct Mechanisms

Status: candidate Mapping Table

Primary family: Mapping Table

Canonical headword:
[Software Type, Value, and Function](../entries/software-type-value-function.md)

Canonical senses: `type`, `value`, `function`

## Mapping identity

| Field | Value |
|---|---|
| Source system | Factorium software type, value, and function concepts |
| Target systems | Rust Reference; Haskell 2010; PostgreSQL current |
| Direction | canonical concept to candidate target mechanism |
| Mapping kind | contextual and partial mechanism assignment |
| Cardinality | many-to-many |
| Authority | cited target-system specifications plus candidate Factorium comparison |
| Factorium maturity | `candidate` |

No target construct proves the canonical concept by name alone. Exact
semantics remain owned by the selected language, runtime, or database version.

## Construct mappings

| Source concept | Rust mechanisms | Haskell mechanisms | Relational/PostgreSQL mechanisms | Required condition | Not equivalent to |
|---|---|---|---|---|---|
| type | primitive, tuple, array, reference, struct, enum, union, function, closure, pointer, trait-object, `impl Trait` types | algebraic datatype, type synonym, class-constrained type, function type | scalar, composite, domain, array, range, enum, row type | interpretation, operations, construction, and validity are taken from the target specification | class, schema, or storage layout in general |
| value | literal or evaluated value, struct/enum instance, reference, function item, closure | evaluated expression, constructor application, function value, computation | scalar value, row value, array value, `NULL` under SQL semantics | type, equality, identity, representation, mutability, and lifetime rules are retained | variable, identifier, bytes, or database row in general |
| function | function item, method, closure, function pointer, async function | function binding, operator, higher-order function, type-class method | SQL function, aggregate, window function, query expression | inputs, outputs, effects, errors, evaluation, and calling context are stated | mathematical total function or pure computation by default |

## Preservation and loss

| Property | Treatment |
|---|---|
| Canonical concept identity | preserved only with the Factorium annotation |
| Target language semantics | preserved only within the cited target version |
| Type/value distinction | required |
| Callable/value distinction | target-specific; functions can themselves be values |
| Purity, totality, determinism | not inferred |
| Representation equivalence | not inferred from equal bytes or schema shape |
| Reverse mapping | invalid without language, declaration kind, and use context |

## Change tests

| Change | Required review |
|---|---|
| Type representation changes | ABI/storage, construction, equality, serialization, and compatibility |
| Function signature changes | callers, generic constraints, effects, errors, dispatch, and version policy |
| Value becomes mutable or shared | ownership, concurrency, identity, observation, and invalidation |
| Language or database version changes | target-specification semantics and mapping conditions |
| Function becomes remote | service, message, contract, timeout, retry, and partial-failure semantics |

## Failure signs

- every type is called a class;
- a value is confused with its variable or serialization;
- signature equality is treated as behavioral compatibility;
- SQL `NULL`, language optional values, and missing fields are merged;
- a function is assumed pure, deterministic, total, or terminating;
- target syntax is used to infer the source concept without context.

## Sources and provenance

1. [Software mechanism bridge research](../../docs/research/2026-08-14-software-mechanism-bridge.md)
2. The Rust Reference:
   https://doc.rust-lang.org/reference/types.html
   https://doc.rust-lang.org/reference/items/functions.html
3. Haskell 2010 Language Report:
   https://www.haskell.org/onlinereport/haskell2010/haskellch3.html
   https://www.haskell.org/onlinereport/haskell2010/haskellch4.html
4. PostgreSQL:
   https://www.postgresql.org/docs/current/datatype.html
   https://www.postgresql.org/docs/current/xfunc.html

The target specifications own exact semantics. Factorium's comparison is
contextual, partial, many-to-many, and `candidate`.

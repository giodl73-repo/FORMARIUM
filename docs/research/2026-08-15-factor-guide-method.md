# Factor Guide Method Research

Date: 2026-08-15

Status: decision support for R3

## Research question

How should Factorium narrow general entries, formulas, constraints, and
cross-paradigm mappings into a problem-specific recommendation without
creating duplicate authority or hiding rejected alternatives?

Decision supported: adopt Factor Guide V0 and test it with one software
security guide and one laboratory quantity guide.

## Local evidence inventory

- `ROADMAP.md`, R3 gate
- `specs/FACTORIUM-ENTRY-GRAPH.md`
- `specs/FACTOR-TABLE-ENTRY.md`
- `specs/MAPPING-TABLE-ENTRY.md`
- `tables/foundations/FACTOR-ROLES.md`
- `tables/mappings/factor-role-mechanisms.md`
- `tables/composites/access-control-request.md`
- `tables/entries/amount-concentration-composition.md`
- `tables/formulas/amount-concentration-composition.md`

## Findings

### FACTORIUM-GUIDE-01 - Canonical meaning and local recommendation need separate custody

**Source:** `specs/FACTORIUM-ENTRY-GRAPH.md`; R2 canonical interchange.

**Observed constraint:** Entries own stable meanings and views. A local
problem contributes facts, constraints, target mechanisms, and preferences
that should not rewrite those meanings.

**Implication:** A guide references stable canonical IDs and records local
evidence separately. It is a recommendation layer, not a new headword owner.

**Confidence:** high.

### FACTORIUM-GUIDE-02 - Narrowing must retain credible rejected alternatives

**Source:** `specs/FACTOR-TABLE-ENTRY.md`, alternative factorizations and
failure signs; `tables/entries/amount-concentration-composition.md`, contrast
and selection tables.

**Observed constraint:** The reader often begins with several plausible senses
or decompositions. Hiding rejected options makes the result look arbitrary and
prevents reuse when evidence changes.

**Implication:** Every guide carries selected, retained, rejected,
not-applicable, and unresolved dispositions with local rationale.

**Confidence:** high.

### FACTORIUM-GUIDE-03 - Mechanism assignment must retain source roles

**Source:** `tables/mappings/factor-role-mechanisms.md`.

**Observed constraint:** Role-to-mechanism mapping is contextual,
many-to-many, and non-invertible. A Rust enum, database table, or organization
position does not reveal its semantic role.

**Implication:** Guides record factor, role, mechanism, mapping condition, and
non-equivalence together.

**Confidence:** high.

### FACTORIUM-GUIDE-04 - Authorization needs facts, policy, decision, and enforcement separation

**Source:** NIST SP 800-162 Rev. 2,
<https://csrc.nist.gov/pubs/sp/800/162/upd2/final>;
`tables/composites/access-control-request.md`;
`tables/decisions/policy-decision.md`;
`tables/constraints/policy-constraints.md`.

**Observed constraint:** Attribute-based access control evaluates subject,
object, operation, and environment attributes against policy. Factorium also
separates the derived decision from enforcement and evidence custody.

**Implication:** The software guide keeps request facts, immutable policy
version, decision output, and enforcement result distinct.

**Confidence:** high.

### FACTORIUM-GUIDE-05 - Quantity selection must precede calculation

**Source:** `tables/entries/amount-concentration-composition.md`;
`tables/formulas/amount-concentration-composition.md`; NIST amount-of-substance
guidance, <https://www.nist.gov/pml/owm/si-units-amount-substance>.

**Observed constraint:** Count, amount, concentration, and fraction can share
surface language while requiring different numerators, denominators, units,
boundaries, and state.

**Implication:** The laboratory guide selects `amount-concentration` from
local evidence before applying `c_i = n_i / V_mix`.

**Confidence:** high.

### FACTORIUM-GUIDE-06 - Change and invalid-case tests expose hidden coupling

**Source:** `tables/foundations/FACTOR-ROLES.md`, characteristic tests and
failure signs; existing pilot constraints.

**Observed constraint:** A plausible guide can still hide identity/state,
policy/constraint, or source/derived coupling.

**Implication:** Every guide tests an expected change, an invalid case, and an
alternative that becomes correct under changed evidence.

**Confidence:** high.

## Recommendations

### Adopt now

- Publish Factor Guide V0.
- Require local evidence, narrowing dispositions, role/mechanism assignment,
  rejected alternatives, unresolved choices, and change tests.
- Review two guides independently in materially different domains.
- Keep guides outside the canonical entry/view hierarchy until repeated use
  establishes whether they need their own interchange records.

Owner: Factorium R3.

Validation: guide-format checklist, domain-appropriate fixed-point review,
canonical link validation, formula basis audit, and mapping trace audit.

### Prototype behind a compatibility boundary

- machine-readable guide records;
- generated guide comparison;
- executable target-specific checks;
- guide recommendation diffing across canonical revisions.

### Reject or defer

- copying canonical definitions into guides as new authority;
- omitting rejected alternatives;
- mechanism-first design without source roles;
- silent defaults for missing facts;
- derived decision or measurement outputs reused as source facts;
- promotion based only on author review.

## Non-goals

- no universal software architecture;
- no laboratory procedure or safety protocol;
- no automatic code generation;
- no replacement of domain experts;
- no claim that two pilots establish broad usability.

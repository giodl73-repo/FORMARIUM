# Formography Independent Coding V1

Date: 2026-08-18
Status: V1 complete; promotion threshold not met

## Why V1 exists

V0 failed two promotion gates and split terminology preference 1-1-1. V1 does
not repair those records. It addresses three protocol defects:

1. `form_owner` conflated exact canonical reference with authority class;
2. free-text domain extensions had no pre-registered equivalence taxonomy;
3. terminology preference had no bounded explanation-cost measure.

## Source firewall

V1 coders may read only:

- this directory;
- the object-model, V0-boundary, and disproof sections of
  `formography-foundation-research-module-v0.md`;
- the six canonical case source files;
- current reference, relation, and assurance records.

They must not read:

- `comparative-slice-v0/`;
- `independent-coding-v0/`;
- any Formography comparative or independent-coding wave result;
- another V1 coder record.

## Non-circular boundaries

The protocol supplies canonical reference IDs so custody can be checked
mechanically. This does **not** test whether coders can discover owner IDs.
It tests whether they preserve those owners while assigning a separate
authority class.

The protocol supplies extension and failure category vocabularies but not a
correct category for any case. Coders may choose `other` and explain why.

## Promotion thresholds

- exact supplied owner reference retained by all coders;
- at least two coders mark every core category codable in every case;
- at least two coders select the same primary extension category per case;
- at least two coders select the same primary failure category per case;
- all coders preserve authority, projection loss, and unresolved state;
- all coders explicitly judge graph sufficiency;
- terminology advantage requires both a 2/3 preference and no greater median
  word count for the preferred explanation.

Model-agent agreement remains internal repeatability evidence, not human or
practitioner validation.

## Result

Extension and failure majorities pass, and governed property graph wins the
bounded model terminology comparison. Protocol conformance and universal
unresolved-state custody fail. See `INDEPENDENT-CODING-V1-RESULT.md`.

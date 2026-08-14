# Volume 01 Evaluator Rubric

Status: moderator-only

Do not show this file to participants before or during tasks.

## Outcome scale

| Outcome | Definition |
|---|---|
| `unassisted` | Reaches a materially correct answer without moderator hints |
| `assisted` | Reaches a materially correct answer after a recorded hint |
| `failed` | Finishes with a materially wrong selection or cannot recover |
| `abandoned` | Stops the task by choice or session limit |

## Task A expected evidence

Expected navigation:

- `Force` anchor;
- `physical-interaction` versus `operative-validity`;
- Formula Table applies only to the Newtonian physical view.

Critical error:

- applies `F = ma` to the policy-validity statement or claims one universal
  force decomposition.

## Task B expected evidence

Expected navigation:

- `Geometric Measure`;
- boundary versus interior;
- perimeter/circumference for fencing, area for ground cover, volume for soil
  capacity;
- shape and sufficient parameters before formula.

Critical error:

- selects one formula before identifying measured subset and dimension.

## Task C expected evidence

Expected navigation:

- `Amount, Concentration, and Composition`;
- possible amount, mass, or volume fraction and possibly concentration if the
  percent scaling is attached to a different declared quantity;
- numerator/denominator basis and mixture boundary are missing.

Major error:

- treats percent as a complete quantity kind.

## Task D expected evidence

Expected navigation:

- `Temperature Scale Conversion`;
- point temperatures use affine conversions;
- intervals/differences use scale only;
- `18 F` as an interval corresponds to `10 C` or `10 K`, so the resulting
  point is `30 C` when that is the intended reading.

Critical error:

- applies the Fahrenheit point offset to the interval.

## Task E expected evidence

Expected navigation:

- `Policy Decision Table`;
- applicable policy plus incomplete required facts yields
  `needs-information`;
- result retains policy version, facts/evidence, timestamp/evaluator, required
  action, and review/appeal path.

Critical error:

- defaults missing facts to approval.

## Task F expected evidence

Expected navigation:

- Access-Control Request;
- `subject-object-relationship`;
- deeper prime entry;
- relationship is between subject and object and can change independently of
  stable subject identity.

Major error:

- stores ownership/sharing only as a permanent subject role.

## Task G expected evidence

Rust option:

- eight-factor request or a justified local subset;
- one rejected shortcut such as role-only model, Boolean decision, global
  context, or middleware-only enforcement;
- one control such as immutable policy version, missing-fact handling, or
  all-path enforcement;
- one unresolved local choice.

Laboratory option:

- `amount-concentration` and `c = n/V`;
- `0.0500 mol` intermediate amount;
- final solution volume rather than solvent volume;
- rejected mass/fraction shortcut;
- one unresolved procedure, molar-mass, purity, equipment, safety, or
  uncertainty choice.

Critical error:

- Rust: treats compile-time privacy as complete runtime authorization.
- Laboratory: treats the guide as a preparation procedure or uses initial
  solvent volume as final solution volume.

## Severity guide

| Severity | Meaning |
|---|---|
| critical | Prevents completion or leads to materially unsafe/wrong application |
| major | Repeated wrong selection, hidden constraint, or severe delay with a recoverable path |
| minor | Local wording, scanning, or navigation friction |
| observation | Preference or isolated behavior needing more evidence |

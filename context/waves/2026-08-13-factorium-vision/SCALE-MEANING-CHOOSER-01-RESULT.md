# Scale Meaning Chooser 01 Result

Date: 2026-08-17

Decision: maintain clean `sim-48` with the exact `scale` meaning chooser and
stop before general disambiguation infrastructure.

## Result

The exact normalized query `scale` now exposes three labelled routes:

- Evaluation or rating scale;
- Unit, numerical, or temperature scale;
- Geometric scaling or size.

Each route resolves once to an existing Table owner. The geometric route uses
Geometric Reference Structure, correcting the future navigation target without
rewriting the frozen THS-01 expectation or its 19/20 result. The chooser states
that it is a choice among existing meanings, not classification or equivalence.

Empty, plural, extended, and nearby queries do not activate the chooser. The
185-record search index is byte-identical to `sim-47`, and complete literal
rankings for `scale` and the frozen nearby controls are unchanged.

`sim-48` contains 217 selected sources, 185 search records, 239 generated pages,
53 canonical entries, 95 specialized views, and zero missing targets. Its exact
identities are:

- source commit: `95fdeda1e2ef68a748feab06fefd34b844bf0bbf`;
- standalone SHA-256: `1ca6be76242687fd73dcf8dd9a688c1615adc7cfd7e338985124461ac42222a8`;
- search-index SHA-256: `03d37ea27f06a11d60c7ace38b74114505c076ab9830e7d2bffd680967f13186`;
- site identity: `bcff813a8011ac86666abec442a139da11d912e1c982a19554f2f5f668bc2ee1`.

## Validation and custody

Focused static checks verify exact activation, the three frozen destinations,
unchanged complete rankings, byte-identical search custody, and clean manifest
custody. Live Edge verifies all routes, the extended-query negative control,
and a 390-pixel presentation without horizontal overflow. LXA-01, THS-01,
reference closure, and the full Rust suite remain green.

No canonical entry, sense, view, relation, Table, Guide, Reader record, search
record, or ranking changed. `sim-47` remains exact historical custody.
`sim-48` is internal simulation, not `preview-01`, and provides no reader or
competitive evidence.

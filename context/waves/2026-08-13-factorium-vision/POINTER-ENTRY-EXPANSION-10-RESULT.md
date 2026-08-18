# Pointer Entry Expansion 10 Result

Date: 2026-08-18
Status: internally validated simulation; no canonical promotion

## Result

`sim-62` composes a 20-row delta over V9 and expands the effective registry to
220 Pointer Entries. The generated layer covers 2,547 distinct exact
expressions and 2,018 label-to-owner bindings.

The added labels are:

`accumulation`, `average`, `causal-attribution`, `combination-contract`,
`completeness-contract`, `convergence`, `deadline`, `decomposition-mode`,
`derivative`, `enforcement`, `evaluation-frame`, `evidence-item`,
`generalization`, `integral`, `operational-resource`, `product`, `region`,
`schedule`, `signal`, and `test`.

Every added label appears in 3-7 owning Tables. Product and Average have the
greatest added owner count at seven. Causal-attribution remains oriented as an
evidence-governed claim structure, not causal proof.

Generic `order`, `point`, and `type`, status or syntax artifacts, and
morphological duplicates such as `criterion` beside admitted `criteria`
remain excluded. Actor remains unchanged at three owners and three
expressions. Search remains at 191 non-pointer destinations.

## Boundaries

The V10 delta composes registry rows only. It creates no concept inheritance,
definitions, canonical records, inferred relations, morphology, aliases,
search integration, or reader evidence.

All predecessor editions remain independently renderable.

## Validation

```powershell
pwsh -NoProfile -File tools\render_proof_set.ps1 -Edition sim-62
node tools\check_pointer_entry_concordance.js
node tools\check_pointer_entry_expansion.js
node tools\check_pointer_entry_expansion_02.js
node tools\check_pointer_entry_expansion_03.js
node tools\check_pointer_entry_expansion_04.js
node tools\check_pointer_entry_expansion_05.js
node tools\check_pointer_entry_expansion_06.js
node tools\check_pointer_entry_expansion_07.js
node tools\check_pointer_entry_expansion_08.js
node tools\check_pointer_entry_expansion_09.js
node tools\check_pointer_entry_expansion_10.js
node tools\check_pointer_entry_concordance_browser.js target\proof-set-sim-62 target\sim62-actor-pointer.png sim-62
node tools\check_tabula_facta_identity_preview.js
node tools\check_v2_rolling_reference_integration.js
python C:\src\tracker\repos\standards-protocols\roles\tools\check_roles.py .
git diff --check
```

The generated site has 473 HTML pages including 220 Pointer Entry pages and
one Terms index, 191 unchanged search records, and zero missing local targets.
Edge verifies the Agency-to-Actor route at 390 pixels without overflow.

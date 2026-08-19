# Formarium Public Identity Result

Date: 2026-08-19
Status: feedback identity implemented; external response pending

## Result

`sim-65` inherits the complete `sim-64` content, Reader, search, Composition,
and 250-label Pointer Entry projection while rendering the public identity as:

- **Formarium** for the project and site;
- **Formarium Tables** for the primary dictionary/thesaurus reference;
- **The Formarium Reader** for the teaching companion.

The identity appears across all 502 generated site HTML pages, including home,
Tables A-Z, Reader, chapters, entries, Composition, Pointer Entries, and the
ephemeral handoff surface. Every page displays the feedback-stage identity
notice.

The public docs and two-book product contract now use Formarium. Formography
remains the proposed method/research track.

## Compatibility boundary

The rename does not change:

- 227 selected source documents;
- 181 selected publication records and 191 indexed destinations;
- 54 canonical entries, 100 specialized views, or 27 curated records;
- 20 chapters or the 24-record Reader route;
- 250 Pointer Entries, 2,681 exact expressions, or 2,118 owner bindings;
- `.factorium` extensions, `factorium-*` schemas, commands, canonical IDs,
  source paths, digests, or historical editions.

`sim-64` remains the exact pre-rename content fixed point. No reader preference,
field-establishment, novelty, trademark, uniqueness, or commercial-clearance
claim follows.

## Validation

```powershell
pwsh -NoProfile -File tools\render_proof_set.ps1 -Edition sim-65
node tools\check_formarium_identity_preview.js
node tools\check_formarium_identity_preview_browser.js target\proof-set-sim-65 target\sim65-formarium-reader.png
node tools\check_pointer_entry_expansion_12.js
cargo test --all-targets
git diff --check
```

The generated site has zero missing local targets. Site identity:
`3127966b569b62c25993ba59130071412c7721adc143322239a1f183e3094471`.

## Verdict

`FORMARIUM_FEEDBACK_IDENTITY_READY`

External response now determines whether the name remains, changes, or is
reverted. The rename is operationally complete but not evidence-complete.

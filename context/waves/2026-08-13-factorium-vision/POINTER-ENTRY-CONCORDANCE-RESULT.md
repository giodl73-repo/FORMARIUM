# Pointer Entry Concordance Result

Date: 2026-08-18
Status: internally validated simulation; no canonical promotion

## Result

`sim-52` adds a generated Pointer Entry layer for 20 explicitly admitted
structural labels. It produces 383 distinct expression occurrences across 313
label-to-owner bindings, one Terms index, and 20 pointer pages. Exact labels in
selected Table `code` expressions are clickable; prose is not auto-linked.

`Actor` resolves to three owning Tables and three exact expressions:

1. Force;
2. Resource Allocation, Reservation, and Shortage Procedure; and
3. Agency.

Each occurrence returns to its exact authored source page. The Reader's context
folding initially removed links from expressions containing `@ context`; a
post-projection enhancer now reapplies only exact registry links after Reader
transformation. Static HTML and live DOM therefore preserve the same routes.

## Boundaries

Pointer pages are generated concordances, not canonical entries, lightweight
definitions, senses, relations, or a third book. They remain outside Tables
A-Z, canonical-family search, chapters, the Reader sequence, and Factorium
interchange. Repetition does not trigger promotion.

The name experiment is paused: `sim-52` returns to Factorium UI identity while
`sim-51` remains the reversible Tabula Facta snapshot.

## Validation

```powershell
.\tools\render_proof_set.ps1 -Edition sim-52
node tools\check_pointer_entry_concordance.js
node tools\check_pointer_entry_concordance_browser.js
node tools\check_tabula_facta_identity_preview.js
node tools\check_v2_rolling_reference_integration.js
python C:\src\tracker\repos\standards-protocols\roles\tools\check_roles.py .
git diff --check
```

The generated site has 272 HTML pages including 21 pointer-layer pages, 191
unchanged search records, 54 canonical Tables, and zero missing local targets.
Edge verifies Agency -> Actor at 390 pixels without horizontal overflow. These
are deterministic publication-mechanics results, not reader findability,
comprehension, preference, or value evidence.


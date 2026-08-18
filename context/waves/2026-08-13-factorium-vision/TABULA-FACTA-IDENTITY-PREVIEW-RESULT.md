# Tabula Facta Identity Preview Result

Date: 2026-08-18
Status: internally validated reversible preview; name not locked

## Result

`sim-51` renders `Tabula Facta` as the candidate publication name for the
Tables across the home, alphabetical Tables index, Reader, chapter, entry, and
Composition chrome. `The Factorium Reader` remains the companion name. A
visible candidate badge and identity-preview notice state that this is not a
locked rename.

The Reader boundary states that Factor Tables remain authoritative and that
Factorium identities and source records are unchanged. `sim-50`, canonical
reference files, schemas, source headings, and repository filenames were not
renamed.

## Validation

```powershell
.\tools\render_proof_set.ps1 -Edition sim-51
node tools\check_tabula_facta_identity_preview.js
node tools\check_tabula_facta_identity_preview_browser.js
node tools\check_v2_rolling_reference_integration.js
python C:\src\tracker\repos\standards-protocols\roles\tools\check_roles.py .
git diff --check
```

The generated site retains 181 selected records, 191 indexed destinations, 20
chapters, 251 pages, and zero missing local targets. The browser check verifies
the Reader identity and authority boundary at 390 pixels without horizontal
overflow. This establishes rendering and navigation mechanics only. It does
not establish reader preference, comprehension, findability, market fit,
distinctiveness, or release readiness.


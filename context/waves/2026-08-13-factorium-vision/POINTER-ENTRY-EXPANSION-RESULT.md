# Pointer Entry Expansion Result

Date: 2026-08-18
Status: internally validated simulation; no canonical promotion

## Result

`sim-53` preserves the 20-entry `sim-52` registry and adds 20 reviewed
high-reuse labels. The 40 generated Pointer Entries cover 964 distinct exact
expressions and 785 label-to-owner bindings.

The added batch is:

`basis`, `convention`, `decision`, `direction`, `evidence`, `frame`, `model`,
`policy`, `provenance`, `rule`, `scale`, `scope`, `source`, `status`, `system`,
`target`, `time`, `uncertainty`, `unit`, and `version`.

Every added pointer appears in at least 16 owning Tables. Provenance has the
widest added reach at 39 owners and 42 expressions; uncertainty has 36 owners
and 43 expressions. The exact label `reference` remains excluded because it
would also match repository paths rather than only structural use.

Actor remains unchanged at three owning Tables and three expressions. Search
still contains 191 canonical and specialized-view destinations and no Pointer
Entry records.

## Boundaries

The expansion does not add definitions, senses, aliases, stems, plural
folding, relations, canonical identities, reference records, or search
ranking. Owner and occurrence counts are publication-mechanics facts, not
importance, comprehension, findability, or reader-value evidence.

`sim-52` remains independently renderable and validated at 20 entries, 383
expressions, and 313 owner bindings.

## Validation

```powershell
.\tools\render_proof_set.ps1 -Edition sim-52
.\tools\render_proof_set.ps1 -Edition sim-53
node tools\check_pointer_entry_concordance.js
node tools\check_pointer_entry_expansion.js
node tools\check_pointer_entry_concordance_browser.js target\proof-set-sim-53 target\sim53-actor-pointer.png sim-53
node tools\check_tabula_facta_identity_preview.js
node tools\check_v2_rolling_reference_integration.js
python C:\src\tracker\repos\standards-protocols\roles\tools\check_roles.py .
git diff --check
```

The generated `sim-53` site has 293 HTML pages including 40 Pointer Entry
pages and one Terms index, with zero missing local targets. Edge verifies the
Agency-to-Actor route at 390 pixels without horizontal overflow.

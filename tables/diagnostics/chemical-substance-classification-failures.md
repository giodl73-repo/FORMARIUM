# Chemical Classification Failure Diagnostic

Status: candidate Diagnostic Table

Primary family: Diagnostic Table

Canonical headword: [Chemical Entity, Substance, Compound Class, Mixture, and Solution](../entries/chemical-substance-classification.md)

Canonical senses: `chemical-element`, `chemical-entity`, `atom`, `molecule`,
`ion`, `chemical-species`, `chemical-substance`, `chemical-compound`,
`formula-unit`, `compound-class`, `classification-criterion`, `mixture`,
`chemical-solution`

## Governing question

Which level, composition, charge, representation, classification-rule,
constituent, phase, or taxonomy-boundary defect could explain a conflicting
chemical label or quantity, and what check would discriminate it?

## Diagnostic table

| Observation | Candidate causes | Discriminating test | Likely repair owner |
|---|---|---|---|
| One name or formula denotes different things | entity/species/substance levels mixed; phase or form omitted | freeze identifier, level, phase, conditions, and source vocabulary | chemistry/data owner |
| Formula arithmetic balances but identity is uncertain | balance mistaken for identification; connectivity, structure, oxidation state, or evidence missing | compare authoritative identity and structural evidence; treat balance as one constraint | chemistry owner |
| Ionic solid is counted as discrete molecules | formula-unit/lattice model collapsed with molecular entity | inspect organization and state whether the count refers to entities or formula units | chemistry/metrology owner |
| One class label gives incompatible members | composition, structure, function, reaction, or reporting criteria mixed | state one criterion and apply it to boundary cases before admitting members | classification owner |
| `Chloride` values conflict | free ion, analyte basis, compound class, or quantity basis differs | state level, measured constituent, conversion basis, quantity kind, method, and units | analytical owner |
| A metal-halide formula has the wrong ratio | ion charges or oxidation state omitted; charge convention wrong | write cation/anion charges and verify the smallest neutral ratio | chemistry owner |
| Acid/base labels reverse | framework, reaction partner, direction, medium, or state differs | write the reaction and apply one declared acid/base framework | chemistry owner |
| `Sugar` totals disagree | chemical inclusion, total/added reporting scope, or denominator differs | compare criterion, constituent list, basis, units, authority, and version | nutrition/analytical owner |
| Mixture and solution are treated identically | phase count or solvent/solute roles omitted | inspect phases at declared scale and name constituent roles and conditions | formulation owner |
| `Solution` search mixes mathematics and chemistry | domain sense absent from metadata or query | bind the chemical sense to substance/phase facets and mathematical sense to relation/domain facets | reference/search owner |
| Entry keeps gaining parallel family names | named members substituted for a generative criterion; no stopping boundary | remove examples and test whether a reusable rule remains; refactor siblings into examples or a bounded view | concept-taxonomy editor |

## Use contract

1. Preserve the original label, formula, quantity, method, sample, and source.
2. Freeze entity/species/substance/compound/mixture/phase level.
3. Test composition, charge, structure, class rule, constituent basis, and
   reporting definition separately.
4. Use contrasting fixtures, but do not promote each fixture into a canonical sense.
5. Apply the swap test: replacing halide/chloride or carbohydrate/sugar with
   another valid example must leave the governing classification method intact.
6. Repair the owning vocabulary or data contract and recheck identity, units,
   uncertainty, provenance, and domain authority.

## Failure signs

- one field alternates among entity, species, substance, and mixture;
- molecule and compound are universal synonyms;
- neutral charge arithmetic is treated as compound identification;
- a class lacks an explicit membership criterion;
- examples create an open-ended list of sibling canonical senses;
- mixture and solution omit phase and solvent/solute roles;
- chemical and mathematical solutions share one unqualified search facet;
- a generic class is used as proof of safety, nutrition, or regulation.

## Sources and provenance

1. [Chemical substance classification research note](../../docs/research/2026-08-15-chemical-substance-classification.md)
2. IUPAC Gold Book: https://goldbook.iupac.org/
3. IUPAC carbohydrate nomenclature: https://iupac.qmul.ac.uk/2carb/00n01.html
4. FDA, added sugars: https://www.fda.gov/food/nutrition-facts-label/added-sugars-nutrition-facts-label

This diagnostic isolates candidate classification failures; it does not
identify a material or certify a formulation, analysis, safety, nutrition,
clinical effect, or regulatory classification.

# Reference Scale and Factorium Entry Size

Date: 2026-08-13

## Research question

How large are dictionaries, thesauri, encyclopedias, and curated pattern
references, and what staged headword count and entry-size budget should
Factorium adopt?

Decision supported: provisional editorial scale for the first Factorium
volume, the core reference, mature expansion, and individual Factor Table
entries.

## Local baseline

Factorium is explicitly table-first and separates headwords, senses, candidate
factorizations, constraints, mappings, cross-references, and maturity
(`VISION.md`, “Editorial form”; `specs/FACTOR-TABLE-ENTRY.md`, “Required
structure”).

The first example currently measures:

```text
environment_entry words=423 lines=56 bytes=3676
```

Measured with:

```powershell
$text = Get-Content tables\examples\environment.md -Raw
([regex]::Matches($text, '\b[\p{L}\p{N}][\p{L}\p{N}-]*\b')).Count
```

It contains two senses and twelve candidate factorization rows.

## Comparator table

The units below are intentionally not treated as interchangeable.

| Reference | Unit | Reported scale | Factorium relevance |
|---|---|---:|---|
| Oxford English Dictionary | words and phrases | over 500,000 | Upper bound for comprehensive lexical coverage, not a realistic Factorium target |
| Princeton WordNet 3.0 | synsets | 117,659 | Demonstrates the difference between strings, concepts, and word senses |
| Princeton WordNet 3.0 | word-sense pairs | 206,941 | Shows why Factorium must count senses separately from headwords |
| Historical Thesaurus of English | semantic categories | 235,249 | Extremely deep historical semantic coverage produced over decades |
| Historical Thesaurus of English | entries/word forms | 804,830 | Forms attached to categories, not independent conceptual entries |
| Roget's Thesaurus | semantic heads | approximately 1,000 | Strong analogue for a compact concept-organized reference |
| Encyclopaedia Britannica, 15th edition | volumes | 32 | Useful model for short ready-reference entries plus deeper anchor articles |
| English Wikipedia | articles | 7,224,435 on 2026-08-13 | Breadth ceiling dominated by encyclopedic topics and named entities, not a Factorium target |
| Design Patterns | patterns | 23 | Small, memorable curated technical catalog |
| Enterprise Integration Patterns | patterns | 65 | Domain catalog; the official site states 65 patterns and a book over 700 pages |
| TRIZ | inventive principles | 40 | Compact cross-problem method reference |
| A Pattern Language | patterns | 253 | Strong first-volume analogue: a substantial interconnected pattern language |

## Findings

### FTRM-01 — Counts describe different editorial units

**Sources:** [OED/Oxford University Press](https://global.oup.com/academic/product/oxford-english-dictionary-online-9780195216813);
[Princeton WordNet statistics](https://wordnet.princeton.edu/documentation/wnstats7wn);
[Historical Thesaurus facts and figures](https://ht.ac.uk/facts-and-figures/).

**Observed:** OED reports words and phrases; WordNet reports unique strings,
synsets, and word-sense pairs; the Historical Thesaurus reports entries and
semantic categories. WordNet 3.0 contains 155,287 part-of-speech-specific
unique strings, 117,659 synsets, and 206,941 word-sense pairs. The Historical
Thesaurus contains 804,830 entries arranged into 235,249 semantic categories.

**Implication:** Factorium MUST publish separate counts for canonical
headwords, senses, and candidate factorization rows. A single “entries” count
would hide material differences in coverage.

**Confidence:** high.

### FTRM-02 — General dictionaries are the wrong scale target

**Sources:** [OED/Oxford University Press](https://global.oup.com/academic/product/oxford-english-dictionary-online-9780195216813);
[Princeton WordNet statistics](https://wordnet.princeton.edu/documentation/wnstats7wn).

**Observed:** Comprehensive lexical references operate at hundreds of
thousands of words, phrases, concepts, or senses because they attempt broad
language coverage.

**Implication:** Factorium should not target 100,000-plus headwords. It admits
only concepts and situations with useful decomposition choices.

**Confidence:** high.

### FTRM-03 — Roget and pattern catalogs are closer analogues

**Sources:** [Roget 1911 hierarchy](https://www.roget.org/hierarchy.htm);
[Project Gutenberg Roget](https://www.gutenberg.org/ebooks/22);
[A Pattern Language, Oxford University Press](https://global.oup.com/academic/product/a-pattern-language-9780195019193);
[Enterprise Integration Patterns](https://www.enterpriseintegrationpatterns.com/patterns/messaging/);
[Design Patterns, Pearson](https://www.pearson.com/en-us/subject-catalog/p/design-patterns-elements-of-reusable-object-oriented-software/P200000009480/9780321700698);
[TRIZ 40 Principles](https://triz.org/principles/).

**Observed:** Curated pattern references range from 23 GoF patterns, 40 TRIZ
principles, and 65 Enterprise Integration Patterns to 253 patterns in
_A Pattern Language_. Roget organizes a very large synonym vocabulary under
roughly 1,000 semantic heads.

**Implication:** A few hundred entries can form a serious first book, while
roughly 1,000 canonical headwords can form a substantial core reference.

**Confidence:** high for catalog sizes; medium for the exact Roget head count
across editions.

### FTRM-04 — Encyclopedia article counts are inflated for Factorium's purpose

**Sources:** [Britannica on the 15th edition](https://www.britannica.com/topic/Encyclopaedia-Britannica-English-language-reference-work/Fifteenth-edition);
[English Wikipedia statistics API](https://en.wikipedia.org/w/api.php?action=query&meta=siteinfo&siprop=statistics&format=json).

**Observed:** Britannica's final print architecture used 32 volumes and
deliberately separated short, specific _Micropædia_ entries from longer
_Macropædia_ articles. English Wikipedia reported 7,224,435 articles on the
research date. Encyclopedias include people, places, institutions, works,
events, and other named entities in addition to reusable concepts.

**Implication:** Factorium should borrow tiered entry depth from encyclopedias,
not their article counts. Proper nouns normally belong in provenance,
examples, aliases, or mechanism indexes rather than as canonical Factor Table
headwords.

**Confidence:** high for architecture and API count; high for the editorial
implication.

### FTRM-05 — Factorium is not limited to common nouns

**Sources:** `VISION.md`, “What belongs in the reference”;
`specs/FACTOR-TABLE-ENTRY.md`, “Headword”;
[Princeton WordNet statistics](https://wordnet.princeton.edu/documentation/wnstats7wn).

**Observed:** Decomposition-bearing lookup terms include common nouns
(`environment`, `boundary`), processes and verbs (`authorize`, `deploy`,
`classify`), decisions (`pivot selection`), and multiword situations
(`organizational domain name`, `single-inheritance hierarchy`).

**Implication:** The inclusion rule should be “reusable decomposition-bearing
concept or situation,” not “common noun.” Proper nouns are exceptional;
verbs, process nouns, and multiword headwords are first-class.

**Confidence:** high.

### FTRM-06 — The current example is a good standard entry

**Sources:** measured command above; `tables/examples/environment.md`.

**Observed:** At 423 words, two senses, and twelve candidate rows, the
environment entry is compact enough to scan while carrying materially more
structure than a dictionary definition.

**Implication:** Standard entries should target 250–600 words. Factorium
entries will often be longer than ordinary dictionary definitions because
they expose alternatives, pivots, constraints, use conditions, and failure
signs, but much shorter than pattern-book chapters or encyclopedia essays.

**Confidence:** medium until a larger pilot set is measured with readers.

### FTRM-07 — Scholarly scale grows expensive quickly

**Source:** [Historical Thesaurus facts and figures](https://ht.ac.uk/facts-and-figures/).

**Observed:** The Historical Thesaurus reports approximately 330,000
person-hours across more than 230 contributors. Its scale and historical depth
are far beyond an initial Factorium edition.

**Implication:** Factorium should optimize for editorial leverage and
cross-reference quality, not raw headword count. Bulk AI generation without
review would create apparent scale but undermine the reference.

**Confidence:** high.

## Provisional scale targets

### Collection targets

| Stage | Canonical headwords | Likely form | Purpose |
|---|---:|---|---|
| Pilot | 25–50 | working set | Test vocabulary, entry grammar, review, and lookup |
| First volume | about 250 | one substantial book | Reach _A Pattern Language_-class breadth across selected domains |
| Core Factorium | about 1,000 | several volumes | Roget-head-class reference with strong cross-references |
| Mature reference | 3,000–5,000 | multi-volume and digital | Broad engineering and conceptual coverage without lexical or named-entity sprawl |

Counts beyond 5,000 require evidence that new headwords add reusable
decomposition value rather than synonyms, examples, products, people, or local
terminology.

### Entry targets

| Entry class | Words | Senses | Candidate rows | Intended use |
|---|---:|---:|---:|---|
| Brief | 120–250 | 1 | 3–6 | Narrow or supporting concept |
| Standard | 250–600 | 1–3 | 6–15 total | Default Factor Table |
| Anchor | 600–1,500 | 2–6 | 12–30 total | Major concept with several recurring lenses |

Additional editorial budgets:

- orientation: 40–120 words;
- sense tagline: one sentence;
- constraints: normally 3–7 bullets;
- cross-references: normally 3–10;
- anchor entries: no more than roughly 10% of a volume;
- one canonical entry may appear in many indexes but is not duplicated.

### Volume target

A first volume of roughly 250 entries at a median 350–450 words produces about
90,000–110,000 entry words before front matter and indexes. Table layout will
make page counts larger than prose-only estimates; a practical target is
approximately 350–550 pages.

The core 1,000-headword reference should therefore be planned as several
volumes or a digital reference, not one oversized book.

## Recommendations

### Adopt now

- Count headwords, senses, and candidate rows separately.
- Use the brief/standard/anchor entry classes.
- Target 25–50 pilot entries, about 250 entries for the first volume, and about
  1,000 for the core reference.
- Admit common nouns, verbs/processes, decisions, and multiword situations.
- Keep proper nouns primarily in examples, provenance, aliases, and indexes.
- Measure median entry length and reader lookup time after each pilot batch.

Owner: Factorium reference architecture and lexicography roles.

Validation: a 25-entry pilot with size statistics, cross-reference checks, and
practitioner lookup sessions.

### Prototype behind an editorial boundary

- Test whether brief entries remain useful without losing constraints.
- Test two-tier navigation inspired by Britannica: concise ready-reference
  tables linked to deeper anchor entries.
- Test whether one headword should support multiple domain-qualified entry
  variants without duplicating authority.

Owner: Factorium Wave 3.

Validation: compare lookup success and revision drift across pilot layouts.

### Reject or defer

- A dictionary-scale target of 100,000-plus headwords.
- Wikipedia-style proper-noun and named-entity coverage.
- One undifferentiated entry count.
- Automatically publishing AI-generated tables to achieve apparent scale.
- Freezing a 3,000–5,000-entry mature target before the first 250 entries
  establish stable editorial economics.

## Non-goals

- estimating the total number of possible factorizations;
- claiming completeness over language or human knowledge;
- treating comparator counts as equivalent units;
- selecting entries solely by word frequency;
- replacing source disciplines or named frameworks with Factorium summaries.

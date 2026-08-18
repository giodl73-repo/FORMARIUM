# Thesaurus Job Test 01 Plan

Date: 2026-08-17

Status: frozen before execution

THS-01 tests whether maintained `sim-47` supports four bounded thesaurus jobs:
variant routing, near-neighbor distinction, broader/narrower grouping, and
ambiguity preservation. The 20 queries are frozen as five tasks per class.

Search is scored by unique canonical Table family, not by specialized records.
It preserves the existing product mechanic: group the first 20 ranked records,
then inspect at most the first five visible families. Alias tasks require
the exact frozen owner set. Passing destinations must expose an authored
Contrast table or Cross-references section. Complete literal rankings must
remain identical to `sim-46`.

The category gates are 5/5 aliases, 4/5 near-neighbor tasks, 4/5 broader/
narrower tasks, and 3/5 ambiguous words. Any missed gate falsifies the current
technical hypothesis. No task may be removed, reworded, or rescored after
execution.

Pre-execution revision 2 makes the inherited 20-record UI window explicit.
No query, intended family, threshold, or outcome changed.

This test can identify search, authored-navigation, vocabulary, or content
pressure, but cannot admit a repair automatically. A miss is not automatically
a missing concept; a pass is not reader evidence or proof that Factorium is
better than a dictionary or thesaurus.

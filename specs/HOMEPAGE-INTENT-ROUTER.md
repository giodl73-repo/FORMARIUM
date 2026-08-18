# Homepage Intent Router

Status: simulation-only product projection

## Purpose

Let a visitor choose a task before requiring them to understand Factorium's
two-book architecture.

## Contract

The homepage presents exactly three task-shaped routes before the existing
two-book explanation:

1. `know-term` links to Search the Tables;
2. `have-question` links to Compose;
3. `learn-or-explore` links to the Reader.

The router preserves ordinary links and a linear reading order. Its cards
collapse to one column on narrow viewports. Link meaning is carried by text,
not color, position, hover, or icons.

## Authority and behavior boundaries

- Factorium Tables remain canonical.
- The Reader remains a teaching companion.
- Compose retains explicit controls and does not parse or execute the card's
  prose.
- Search ranking, query handling, family grouping, and indexed records do not
  change.
- The router stores no preference, query, task, profile, or history.
- The router does not recommend a substantive answer.

## Evidence boundary

The job split is supported by repeated internal product rehearsals. Card
wording is an authored UX hypothesis. The router does not establish
findability, comprehension, accessibility success, preference, adoption, or
return use.

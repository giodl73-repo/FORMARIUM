# Ephemeral Handoff Note

Status: simulation-only product projection

## Purpose

Make stopping and outward handoff an explicit part of every Factorium page
without retaining the original task or creating an account, history, or
canonical record.

## Fields

1. question or situation — user-entered;
2. current Factorium page — generated from page title and URL;
3. what remains unresolved — user-entered;
4. next authoritative source — user-entered.

The copied payload labels user content unverified and includes the boundary
that Factorium does not store it.

## Actions

- Copy the bounded handoff as plain text.
- Print through the browser.
- Clear all user-entered fields.

## Privacy and authority

- No local storage, session storage, cookie, URL parameter, network request,
  account, history, analytics event, or canonical write is permitted.
- Reload clears the note.
- The note does not recover or infer a prior question.
- User-entered sources and unresolved claims are not verified.
- The component changes no Table, Reader, Guide, search, closure, profile, or
  authority semantics.

## Accessibility

Fields retain visible labels. Status changes use a polite live region. Actions
are keyboard controls, focus is visible, the form becomes one column on narrow
screens, and print hides interactive controls while retaining the note.

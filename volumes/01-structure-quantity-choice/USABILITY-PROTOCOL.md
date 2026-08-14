# Volume 01 Usability Protocol

Status: ready for external sessions

## Research questions

Can readers, without author help:

1. locate the intended sense within minutes;
2. distinguish nearby concepts and competing decompositions;
3. choose a specialized table from its scope;
4. identify invalid combinations and failure signs;
5. follow a factor into deeper entries;
6. apply an entry or guide to a realistic problem?

## Participants

Target one small qualitative round:

- 3-5 completed sessions;
- at least two practitioner backgrounds represented;
- at least one participant comfortable with software/system design;
- at least one participant comfortable with scientific or quantitative
  material;
- seek an accessibility or assistive-technology perspective when feasible.

This is not a statistically representative sample. Findings are design
evidence for the prototype.

## Session shape

- 45-60 minutes;
- introduction and consent: 5 minutes;
- background/context: 5 minutes;
- 4-5 rotated tasks: 30-40 minutes;
- follow-up and debrief: 5-10 minutes.

Use the participant's normal reading device when practical. Supply repository
or rendered-document access before the first task.

## Privacy and data handling

- Assign a code such as `P01`; do not record names in committed files.
- Use supplied dummy scenarios.
- Do not collect employer secrets, credentials, health data, production
  documents, or other unnecessary personal information.
- Record device and assistive-technology context only when the participant
  chooses to share it and it affects the observation.
- Do not audio/video record without explicit consent and an approved secure
  storage plan.
- Commit only de-identified observations and short quotes.

## Moderator introduction

Read:

> We are testing the reference, not you. Some wording or navigation may be
> confusing, and finding those problems is the purpose of the session. Please
> work as you normally would and say what you are looking for, expecting, or
> finding confusing. I will mostly observe. You may stop at any time.

Do not show the evaluator rubric.

## Moderation rules

- Present one task at a time from `READER-PACKET.md`.
- Use the exact neutral prompt before personalizing irrelevant details.
- Do not name the expected entry, sense, family, or formula.
- Ask open follow-ups such as "What are you looking for?" or "What makes you
  say that?"
- Stay quiet while the participant can continue.
- If fully blocked for two minutes, record the blocker before offering the
  smallest hint needed to continue.
- Mark all assistance in the observation record.
- Do not correct an answer during the task.

## Task rotation

Every session should include:

- one polysemy or nearby-concept task;
- one specialized-view selection task;
- one graph-navigation task;
- one application task.

Use no more than five tasks in one session. Rotate tasks across participants
so all seven receive evidence.

## Observation fields

For each task record:

- start and end time;
- completion: `unassisted`, `assisted`, `failed`, or `abandoned`;
- pages and links visited;
- first selected sense or view;
- backtracks and dead ends;
- substantive errors;
- moderator assistance;
- observed language/layout issue;
- short de-identified quote when useful;
- post-task difficulty from 1 (easy) to 5 (very difficult).

## Release heuristics

These are directional gates, not statistical claims:

- median successful sense-location time is 3 minutes or less;
- at least 80% of attempted core tasks complete unassisted;
- no repeated critical blocker affects two or more participants;
- readers can explain why the selected sense/view fits, not only land on the
  expected page;
- every failed or assisted task has a documented disposition;
- accessibility observations have an owner and planned response.

A critical blocker prevents task completion or causes a materially unsafe or
wrong interpretation. A major issue causes repeated delay, wrong table
selection, or hidden constraints but has a recoverable path.

## Analysis

After the round:

1. group observations by task and issue;
2. separate content, terminology, navigation, layout, and accessibility
   causes;
3. assign critical, major, minor, or observation severity;
4. connect each issue to the affected canonical entry, generated projection,
   guide, or volume page;
5. choose fix, defer, reject, or needs-more-evidence;
6. rerun affected tasks after critical or major revisions;
7. update `OBSERVATIONS.md` and the R4 audit.

## Gate

Author dry runs may improve wording but do not satisfy R4. Completion requires
de-identified observations from real target readers and closure or explicit
deferral of every critical and major issue.

## Sources

1. GOV.UK Service Manual, "Using moderated usability testing":
   https://www.gov.uk/service-manual/user-research/using-moderated-usability-testing
2. ISO 9241-11:2018 overview:
   https://www.iso.org/standard/63500.html
3. W3C WAI, "Test and Evaluate":
   https://www.w3.org/WAI/test-evaluate/

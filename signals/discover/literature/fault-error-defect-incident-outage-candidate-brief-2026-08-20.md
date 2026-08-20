---
topic: fault-error-defect-incident-outage-candidate
date: 2026-08-20
status: candidate admission brief
canonical_admission: false
---

# Fault, Defect, Error, Failure, Incident, and Outage

## Decision question

Does Lexicon need one owner for the propagation chain that runs from a latent
fault, through an erroneous internal state, to a service failure, and then to a
source-qualified incident and a measured outage interval — given that `failure` is
already canonically owned and `nonconformity` already belongs to the
requirements entry?

## Bounded thesis

Proceed only if fault, dependability-error, defect, incident, and outage remain
non-equivalent and remain separable from the dependability measures that consume
them. `failure` is referenced, not re-owned, and `problem` is not proposed as a
sense.

No universal cross-domain definition is claimed for any of these terms, and the
Avizienis fault-error-failure chain is treated as one community's taxonomy
rather than as the definition of the family. The evidence shows the opposite of
convergence: SEVOCAB returns two competing definitions of `fault` — a
cause condition that can produce errors (attributed to ISO/IEC 10746-2:2009,
13.6.3) and an inability state due to an internal condition (attributed to
ISO/IEC/IEEE 15026-1:2025, 3.4.8) — plus several readings of `defect`, five of
`problem`, and no entry at all for `outage`; ISO/IEC/IEEE 24765 aggregates
conflicting definitions rather than resolving them; the NIST glossary carries
several sourced definitions of `incident` on one page; and 47 CFR 4.5 makes
`outage` a regulator-defined threshold rather than a physical fact. The family's
job is to force the governing standard and edition, declaration rule, or
measurement contract to be named — not to canonize one wording.

The thesis is falsified if the dependability, requirements, state/event,
control, hazard, causal, measurement-quality, and statistical-summary entries
can already express dormant faults, masked errors, use-relative defects,
declaration authority, planned and forced outage intervals, and outage interval
determination without importing these senses.

## Proposed senses

| Sense | Governing question |
|---|---|
| `fault-cause-condition` | Which adjudged or hypothesized cause, present in or affecting the item, could produce an error under which activation conditions, per which named source and edition? |
| `fault-inability-state` | Which internal state makes the item unable to perform as required after which failure, per which named source and edition? |
| `dependability-error` | Which part of the item's state deviates from the correct state, and is it detected, latent, or masked? |
| `defect` | Which nonconformity relative to an intended or specified use is attributed to which work product and criterion, per which named source? |
| `incident` | Which occurrence meets which named source's incident criterion and, where declaration applies, under which rule and authority, with what impact and response? |
| `outage` | Over which interval was which service or component unavailable or significantly degraded for which population, under which measurement contract, and was it planned or forced? |

`error` is deliberately not proposed bare. The identifier is qualified to
`dependability-error` because `measurement-error` is owned by the measurement
quality entry, `standard-error` by the statistical summary entry, and the
human-action reading of "error" is commonly attributed to the software anomaly
standard; an unqualified `error` would collide with all three.

`fault` is also not proposed bare. `fault-cause-condition` preserves the
activation-conditioned dependability reading, while `fault-inability-state`
preserves the incompatible post-failure state reading used by other standards.

`failure` is **not** proposed as a sense. It remains canonically owned by the
dependability entry; this family may reference it but supplies no local
governing question, role, or criterion. It stays in the title only because the
decision question is precisely how failure differs from its neighbours.

`problem` is **not** proposed as a sense. SEVOCAB returns five competing
standards definitions, and the ITIL problem-management and known-error
vocabulary has no stable free normative glossary. Problem and known-error
vocabulary is retained as contract factors and scoped notes attributed to their
external sources, and the title scope is not silently extended to cover them.

## Candidate contract

```text
fault-incident-outage-use
  := subject, item boundary, required service, and stakeholders
   x governing source, edition, and definitional reading selected for each of
     fault, error, defect, incident, and outage
   x cause-condition fault identity, class (design, production, operational,
     human, environmental), persistence, dormancy, and activation condition
   x inability-state fault, failed function, criterion, and onset
   x workload and exposure
   x error state, detection status, latency, masking, and propagation path
   x defect criterion, intended versus specified use, work product, and
     lifecycle phase of introduction
   x failure criterion, mode, severity, and boundary of manifestation
     (referenced from the dependability entry, not defined here)
   x fault tolerance, redundancy, containment, and error-handling barriers
   x incident criterion and class (safety, security, service, occupational
     health and safety, aviation)
   x declaration rule, authority, and declaration time where applicable
   x impact population, function lost, geographic and data or security exposure
   x outage cause class: planned or scheduled, forced or unanticipated, and
     externally imposed
   x outage start and end determination, measurement contract, exclusions, and
     eligible time or requests
   x detection, triage, mitigation, workaround, resolution, and closure states
   x problem record, contributing causes, known error, and corrective action,
     each held under its named external vocabulary
   x reporting obligation, regulator, threshold, and deadline
   x evidence, uncertainty, revision, and blame or learning posture
```

## Existing-owner audit

- [Reliability, Availability, Maintainability, Resilience, and Recovery](../../../tables/entries/dependability-reliability-availability-resilience.md)
  owns `failure` canonically and owns every reliability, availability,
  maintainability, resilience, and recovery measure. **Hardest boundary:**
  `outage` may name and bound the unavailability interval but must never define
  availability; the percentage, numerator, denominator, and observation window
  stay with the dependability entry. That entry also owns dependability
  resilience and recovery. This candidate therefore proposes **no** `failure`
  sense and no local failure criterion.
- [Requirement, Specification, Verification, and Validation](../../../tables/entries/requirement-specification-verification-validation.md)
  owns `nonconformity` and explicitly defers "defect" to a domain-specific
  fault concept. This candidate takes up that invitation: `defect` is defined
  *as* that domain concept (nonconformity related to an intended or specified
  use) and cross-links back rather than redefining nonconformity.
- [State, Event, Transition, Process, and Lifecycle](../../../tables/entries/state-event-transition-process-lifecycle.md)
  owns `event`, `state`, and `transition`; an incident is a source-qualified
  operational record, optionally declared where its governing vocabulary
  requires it, not a generic occurrence.
- [Objective, Control, Monitoring, and Response](../../../tables/entries/control-monitoring-response.md)
  owns indicator, threshold, alert, and service-level objective. A breached
  service-level objective is not an incident unless a declaration rule says so.
- [Association, Causal Effect, Influence, Mechanism, Intervention, and Attribution](../../../tables/entries/causal-reasoning.md)
  owns attribution; "root cause" stays an attribution claim and does not become
  a sense here.
- [Hazard, Exposure, Harm, Vulnerability, and Safety](../../../tables/entries/hazard-exposure-harm-safety.md)
  owns hazard, harm, vulnerability, and safety acceptability; incidents and
  near misses feed that entry as inputs only.
- [Error, Bias, Accuracy, Trueness, Precision, Resolution, and Calibration](../../../tables/entries/measurement-quality.md)
  owns `measurement-error` and `measurement-bias`. **Hardest boundary:** the
  numeric "error" of a measurement result never enters the item-state sense,
  which is why the proposed identifier is `dependability-error`.
- [Mean, Median, Quantile, Variance, Standard Deviation, Standard Error, and Confidence Interval](../../../tables/entries/statistical-summary-interval.md)
  owns `standard-error`; a sampling-variability quantity is not an item state.
- [Tipping Point, Critical Transition, Cascade, Contagion, and Spillover](../candidates/tipping-point-critical-transition-cascade-contagion-spillover.md)
  is a sibling candidate owning `cascade`, `contagion`, and `spillover`. A
  "cascading outage" is recorded here only as successive outage intervals with
  an attribution claim; propagation dynamics and threshold behaviour stay with
  that candidate. If both are admitted, this boundary must be restated in both.
- [Incident Severity](../../../tables/examples/incident-severity.md)
  owns derived severity classification and its versioned policy; this family
  owns declaration and record identity, not severity assignment.
- [Assurance, Assessment, Audit, Certification, and Accreditation](../../../tables/entries/assurance-assessment-audit-certification.md)
  owns audit findings and dispositions.
- [Probability, Risk, and Uncertainty](../../../tables/entries/probability-risk-uncertainty.md)
  owns risk quantification; incident counts are not risk estimates.
- [Dependability Failure Diagnostic](../../../tables/diagnostics/dependability-failures.md)
  owns dependability measurement disputes; any diagnostic for this family would
  concern fault, error, defect, and declaration classification instead.
- No canonical table owns `fault`, `defect`, `incident`, `outage`, or
  `dependability-error`; a sense-identifier scan of `tables/entries` on
  2026-08-20 found no collision for any proposed identifier.

## Source matrix

| Source | Contribution | Boundary or challenge |
|---|---|---|
| [Avizienis, Laprie, Randell, and Landwehr, Basic Concepts and Taxonomy of Dependable and Secure Computing](https://doi.org/10.1109/TDSC.2004.2) | the fault to error to failure chain; dormant and active faults; latent, detected, and masked errors | one community's taxonomy, non-normative under IEC and ISO vocabularies; defines neither incident nor outage |
| [IEEE Std 1044-2009, Standard Classification for Software Anomalies](https://doi.org/10.1109/IEEESTD.2010.5399061) | normative software senses of anomaly, defect, error, failure, fault, and problem; the human-action reading of error is commonly attributed here | software-scoped; supersedes IEEE 1044-1993; its clause text was not directly retrievable, so the attribution is reported, not verified |
| [ISO/IEC/IEEE 24765:2017, Systems and software engineering — Vocabulary](https://www.iso.org/standard/71952.html) | consolidated fault, failure, defect, and error definitions across standards | aggregates conflicting definitions rather than resolving them |
| [SEVOCAB, Software and Systems Engineering Vocabulary](https://sevocab.computer.org/) | free, retrievable lookup with source-standard attribution; verified the competing `fault` readings, three `defect` readings, five `problem` readings, `known error`, and the absence of `outage` | shows multiple competing definitions per term; it reports standards rather than adjudicating them |
| [IEC 60050-192:2015, IEV Part 192: Dependability](https://www.electropedia.org/iev/iev.nsf/index?openform&part=192) | electrotechnical definitions of failure, fault, item, down state, and down time | electrotechnical scope differs from software usage; the fault is a post-failure state, and down time is not the outage sense; the page returns no machine-readable text, so it is cited by identifier only |
| [IEC 61508-4:2010, Functional safety — Definitions and abbreviations](https://webstore.iec.ch/en/publication/22273) | systematic versus random failure; dangerous failure | functional-safety scope only |
| [ISO 26262-1, Road vehicles — Functional safety — Vocabulary](https://www.iso.org/standard/68383.html) | latent, single-point, and residual fault; malfunctioning behaviour | automotive electrical and electronic scope |
| [ISO 9000:2026, Quality management systems — Fundamentals and vocabulary](https://www.iso.org/standard/9000) | the use-relative reading of defect, as distinct from generic nonconformity | catalogue page only; the clause text is paywalled and is not quoted or claimed as verified. The ISO catalogue page for ISO 9000:2015 (https://www.iso.org/standard/45481.html) records the supersession by the 2026 edition; SEVOCAB does **not** return this wording, so the attribution rests on the catalogue record and secondary usage |
| [ISO/IEC 20000-1:2018, Service management system requirements](https://www.iso.org/standard/70636.html) | service-management senses of incident, problem, and service request | management-system scope; catalogue page only; ITIL is a commercial parallel with no free normative glossary, so problem and known error are not owned here |
| [NIST SP 800-61 Rev. 3, Incident Response Recommendations](https://csrc.nist.gov/pubs/sp/800/61/r3/final) | current cybersecurity incident-handling authority; supersedes Rev. 2 | security-scoped and framework-aligned |
| [NIST CSRC Glossary, incident](https://csrc.nist.gov/glossary/term/incident) | several sourced definitions on one page | direct evidence that incident criteria are source-relative and not always declaration-dependent |
| [ISO 22300:2021, Security and resilience — Vocabulary](https://www.iso.org/standard/77008.html) | incident versus disruption, crisis, and emergency | continuity and resilience scope |
| [47 CFR 4.5, FCC outage reporting definitions](https://www.law.cornell.edu/cfr/text/47/4.5) | outage as loss or significant degradation against user-minute and duration thresholds | US telecommunications thresholds; shows outage is threshold-defined |
| [IEEE Std 1366, Guide for Electric Power Distribution Reliability Indices](https://standards.ieee.org/ieee/1366/12323) | outage (component out of service) versus interruption (loss of service to the customer); sustained versus momentary | electricity-distribution scope |
| [Google SRE Book, Managing Incidents](https://sre.google/sre-book/managing-incidents/) | incident command roles and declaration criteria | one company's practice, not a standard |
| [Google SRE Book, Postmortem Culture](https://sre.google/sre-book/postmortem-culture/) | postmortem as the written record of an incident, impact, mitigation, causes, and follow-up | the blameless norm is cultural, not normative |
| [Google SRE Book, Service Level Objectives](https://sre.google/sre-book/service-level-objectives/) | indicator, objective, and agreement separation; availability as a fraction | needed to keep outage from silently becoming availability |
| [Reason, Human error: models and management](https://doi.org/10.1136/bmj.320.7237.768) | active failures versus latent conditions; person versus system approach | human-factors framing; the barrier model is a metaphor |
| [Regulation (EU) No 996/2010, Article 2](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32010R0996) | legally distinct accident, serious incident, and incident, separated by death or serious injury, aircraft damage, and accessibility of wreckage; investigation without apportioning blame | aviation-specific and treaty-derived; the accident threshold does not transfer to service or security incidents |
| [ISO 45001:2018, Occupational health and safety management systems](https://www.iso.org/standard/63787.html) | occupational sense of incident, including near misses | workplace scope only; catalogue page only |
| [U.S. Energy Information Administration Glossary, Forced outage and Scheduled outage](https://www.eia.gov/tools/glossary/index.php?id=F) | a free, retrievable authority separating a forced outage (emergency or unanticipated breakdown) from a scheduled outage (inspection or maintenance on an advance schedule) | US energy-statistics scope; generation and transmission framing, not service-level or telecommunications framing |

## Counterevidence and limits

- a fault that never activates and therefore produces no error;
- a "fault" that is a post-failure state of inability rather than a cause
  condition, as in the electrotechnical vocabulary and in one of the two
  SEVOCAB readings — the cause reading is not universal;
- an "error" that is a human action rather than an item state, the reading
  commonly attributed to the software anomaly standard;
- a measurement error, bias, or standard error, which are numeric quantities
  owned elsewhere and are never item states;
- an error that is masked or corrected and therefore produces no failure;
- a failure with no declared incident, because no declaration rule was met;
- a declared incident with no failure, such as a security incident or a near
  miss under ISO 45001;
- an occurrence that meets the aviation accident threshold — death or serious
  injury, or aircraft damage affecting structural strength or performance — and
  is therefore an accident rather than an incident, or a serious incident that
  is neither;
- an incident whose account stops at individual human error, where the latent
  conditions and defeated barriers are the reportable content;
- a planned or scheduled outage taken for maintenance, with no fault, no error,
  and no failure anywhere in the record;
- an outage that is a degradation rather than a loss, because the regulator or
  contract says so;
- an outage interval that is not the electrotechnical "down time" of the item,
  because the exclusions and eligible-time basis differ;
- an outage of a component with no interruption of customer service, per the
  distribution-reliability convention;
- an incident resolved by a workaround while its problem remains open, where
  "problem" and "known error" are read under an external service-management
  vocabulary rather than owned here;
- a defect that violates no specified requirement but defeats the intended use;
- a nonconformity that is not a defect because intended use is unaffected;
- a breached service-level objective that is not an incident;
- successive outages narrated as a cascade, where the propagation dynamics
  belong to the tipping-point candidate rather than to this family.

## Admission gates

1. Preserve every counterexample above.
2. Name the governing standard and its edition, or the declaration rule or
   measurement contract, for every fault, error, defect, incident, and outage
   claim, including the definitional reading selected where a term has
   competing readings.
3. Never assert a universal definition, and never present the Avizienis
   propagation chain as normative. Where standards disagree, record the
   disagreement and the selected source.
4. Keep `failure` unowned here: link to the dependability entry, and carry no
   local governing question, role, criterion, or measure for it.
5. Keep `problem` and `known error` unowned here: hold them as contract factors
   and scoped notes attributed to their external vocabulary, and do not extend
   the title scope to cover them.
6. Keep the error identifier qualified as `dependability-error`, and route
   measurement error, bias, and standard error to their owning entries.
7. Where the selected source uses the cause-condition reading, keep fault,
   error, and failure ordered by activation and propagation. Where the source
   defines `fault` as a post-failure inability state, record that ordering
   instead. In both cases, record detection, latency, and masking for errors.
8. Define `defect` as the use-relative concept the requirements entry defers,
   and cross-link `nonconformity` rather than redefining it.
9. Record declaration authority, declaration time, and impact population for
   every incident; do not derive severity here; and keep incident distinct from
   the legally defined accident where an accident regime applies.
10. Record for every outage whether it was planned or forced, together with
    start and end determination, exclusions, and eligible time or requests. Do
    not require a fault, error, or failure, do not compute availability, and do
    not equate the interval with electrotechnical down time.
11. Keep root cause as an attribution claim owned by the causal entry, and keep
    cascade and contagion with the tipping-point candidate.
12. Exclude incident-response procedures, named severity scales, fault-tolerance
    architecture catalogs, regulator-specific reporting thresholds as canonical
    values, and blame or liability semantics.

## Disposition

**PROCEED TO CANDIDATE ENTRY DRAFT; DO NOT ADMIT CANONICALLY.** The propagation
and declaration structure is unowned and well-attested, but admission requires
an owner-boundary review against the dependability entry (which keeps `failure`
and every measure), the requirements entry, the measurement-quality and
statistical-summary entries (which keep the other readings of "error"), the
incident-severity example, and the tipping-point sibling candidate. Admission
also requires confirmation that dropping `failure` and `problem` from the sense
set leaves the family coherent, and that the governing-source-and-edition
requirement is enforceable in practice rather than aspirational.

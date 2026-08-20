---
canonical_admission: false
---

# Clinical Sign, Symptom, Syndrome, Diagnosis, Differential Diagnosis, and Prognosis — Candidate Brief

## Decision question

Should Lexicon describe the six clinical reasoning concepts with authority and
version requirements, without giving medical advice?

## Bounded thesis

Yes, provisionally. The senses distinguish observations, reports, patterns,
classification conclusions, alternatives, and forecasts, while existing
prediction, causal, and evaluation owners retain their general questions.

## Proposed senses

| Sense ID | Governing question |
| --- | --- |
| `clinical-sign` | Which observer-detectable finding is documented under what method and context? |
| `clinical-symptom` | Which subject-reported experience is documented under what wording and context? |
| `clinical-syndrome` | Which co-occurring pattern is named under which classification or clinical account? |
| `clinical-diagnosis` | Which classification conclusion is asserted under which authority, version, criteria, and evidence? |
| `clinical-differential-diagnosis` | Which alternative classification hypotheses are compared under which evidence and criteria? |
| `clinical-prognosis` | Which future course or outcome estimate is asserted for which population, condition, horizon, and evidence? |

## Candidate contract

Record authority/version, encounter context, source, method, report versus
observation, criteria, evidence, alternatives, uncertainty, population, and
horizon. The contract is descriptive and never instructive.

## Existing-owner audit

Prediction/forecast owns generic future estimates, causal reasoning owns
mechanisms, and evaluation owns criteria and results. This candidate owns no
treatment decision, risk score, causal diagnosis, or personalized advice.

## Source matrix

| Source | Contribution | Limitation |
| --- | --- | --- |
| [WHO ICD-11 browser](https://icd.who.int/browse/2024-01/mms/en) | Demonstrates authority- and release-specific classification context. | It is a classification system, not a diagnostic instruction. |
| [SNOMED CT browser](https://browser.ihtsdotools.org/) | Supports terminology distinctions and provenance expectations. | Availability and edition depend on jurisdiction and licensing. |
| [NCBI Bookshelf: Clinical Methods](https://www.ncbi.nlm.nih.gov/books/NBK201/) | Provides descriptive sign/symptom and clinical-method context. | It cannot replace clinician judgment or current local guidance. |

## Admission gates

Require clinical-domain review, explicit version fields, safety review, and
tests that no example performs diagnosis or treatment.

## Counterevidence and limits

Classifications change, jurisdictions differ, and signs/symptoms can be
ambiguous. This candidate is not medical advice and must not support decisions
about an individual.

## Disposition

Keep as a guarded noncanonical descriptive candidate.


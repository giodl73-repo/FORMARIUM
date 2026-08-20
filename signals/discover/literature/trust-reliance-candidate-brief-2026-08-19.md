---
topic: trust-reliance-candidate
date: 2026-08-19
status: candidate admission brief
canonical_admission: false
---

# Trust, Credibility, Reputation, Legitimacy, and Reliance

## Decision question

Does Formarium need one owner for accepted vulnerability, aptness for that
vulnerability, source believability, socially accumulated evaluation,
rightfulness, and action based on expected performance?

## Bounded thesis

Proceed only if trust, trustworthiness, credibility, reputation, descriptive
legitimacy, normative legitimacy, and reliance remain non-equivalent.

The thesis is falsified if evidence, formal authority, certification,
compliance, and technical dependency already express these distinctions
without losing vulnerability, audience, social history, or normative standing.

## Proposed senses

| Sense | Governing question |
|---|---|
| `trust` | Who accepts vulnerability to whom, for what task or domain, on what expectation? |
| `trustworthiness` | Which ability, reliability, motive, benevolence, or integrity makes trust apt? |
| `credibility` | Why should this audience believe this source or message now? |
| `reputation` | Which historically accumulated evaluation circulates in a community? |
| `legitimacy-descriptive` | Which audience treats this actor, institution, or procedure as rightful or acceptable? |
| `legitimacy-normative` | By which standards or reasons is that rightfulness justified? |
| `reliance` | What action or dependence is undertaken on expected performance, with what consequence if it fails? |

## Candidate contract

```text
trust-reliance-use
  := trustor, audience, evaluator, or community
   x trustee, source, institution, system, or subject
   x task, claim, domain, procedure, or role
   x vulnerability, stakes, downside, alternative, and fallback
   x competence, reliability, motive, benevolence, integrity, and alignment
   x evidence, signal, provenance, and communication channel
   x reputation history, third-party reports, memory, and update
   x legitimacy audience, procedure, authority source, and justification
   x discretion, monitoring, dependence, action, and outcome
   x disappointment, betrayal, deception, abuse, repair, and contestation
```

## Existing-owner audit

- [Claim and Evidence](../../../tables/entries/claim-evidence.md) owns support,
  contradiction, confidence, and provenance.
- [Organization, Role, Responsibility, Authority, and Accountability](../../../tables/entries/organization-role-authority.md)
  owns decision rights and delegation.
- [Governance, Obligation, and Compliance](../../../tables/entries/governance-obligation-compliance.md)
  owns requirements and conformity.
- [Assurance, Assessment, Audit, Certification, and Accreditation](../../../tables/entries/assurance-assessment-audit-certification.md)
  owns formal attestation and scope.
- [System Composition, Architecture, Capability, Interface, and Dependency](../../../tables/entries/system-composition-dependency.md)
  owns pure directional dependency.

## Source matrix

| Source | Contribution | Boundary or challenge |
|---|---|---|
| [SEP, Trust](https://plato.stanford.edu/entries/trust/) | trust, trustworthiness, reliance, vulnerability | multiple theories remain live |
| [Hardin, Trust and Trustworthiness](https://www.russellsage.org/publications/book/trust-and-trustworthiness) | encapsulated-interest account | not a universal theory |
| [Mayer, Davis, and Schoorman](https://doi.org/10.5465/AMR.1995.9508080335) | ability, benevolence, integrity, risk-taking | organizational model has bounded scope |
| [Colquitt, Scott, and LePine](https://doi.org/10.1037/0021-9010.92.4.909) | meta-analysis of trust antecedents and outcomes | aggregate findings do not settle philosophy |
| [Hovland and Weiss](https://doi.org/10.1086/266350) | source credibility effects | credibility does not guarantee truth |
| [Weigelt and Camerer](https://doi.org/10.1002/smj.4250090505) | reputation from attributed past actions | corporate strategy is one domain |
| [Resnick et al., Reputation Systems](https://doi.org/10.1145/355112.355122) | distributed reputation mechanisms | scores can be manipulated or incomplete |
| [Suchman, Managing Legitimacy](https://doi.org/10.5465/AMR.1995.9508080331) | pragmatic, moral, and cognitive legitimacy | strategic account is not full normative theory |
| [SEP, Political Legitimacy](https://plato.stanford.edu/entries/legitimacy/) | descriptive and normative legitimacy | political cases do not exhaust legitimacy |
| [NIST AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1) | risk-bounded trustworthy-system characteristics | trustworthiness is not a universal guarantee |
| [NIST SP 800-160 v1r1](https://csrc.nist.gov/pubs/sp/800/160/v1/r1/final) | engineered trustworthiness and assurance | system properties do not create social legitimacy |
| [OECD Trust in Government](https://www.oecd.org/en/topics/trust-in-government.html) | institutional trust drivers | survey constructs remain context-dependent |

## Counterexamples that must survive

- trust without trustworthiness;
- trustworthiness without being trusted;
- reliance without trust;
- credibility without truth;
- reputation without current credibility;
- descriptive legitimacy without normative justification;
- legitimate office or procedure without trust in its current holder.

## Admission gates

1. Preserve every counterexample above.
2. Require an explicit trustor/audience, trustee/source, task/domain, stakes, and
   action.
3. Do not redefine evidence quality, authority, compliance, certification, or
   dependency.
4. Keep descriptive and normative legitimacy separate.
5. Treat trustworthy-system claims as scoped risk judgments, not guarantees.
6. Include philosophy, social science, institutional, and systems sources.

## Disposition

**PROCEED TO CANDIDATE ENTRY DRAFT; DO NOT ADMIT CANONICALLY.** The gap is real,
but admission requires theory pluralism and a strong owner-boundary review.

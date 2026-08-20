---
topic: consent-withdrawal-candidate
date: 2026-08-20
status: candidate admission brief
canonical_admission: false
---

# Consent, Assent, Refusal, Withdrawal, and Revocation

## Decision question

Does Lexicon need an owner for the normative act by which an affected party may
make another party's act permissible, including who may perform that act, what
was disclosed, what was declined, how participation is exited, and how a
standing consent is cancelled?

## Bounded thesis

Consent is not permission itself, not a request-time authorization decision, and
not a policy grant. It is a normative act performed by the affected party over a
described act, and, when its validity conditions are met and the applicable
basis so provides, it may make that act permissible. Permission is the resulting
status, owned elsewhere; consent is the act that can produce it. Consent has a
lifecycle that includes refusal, dissent, withdrawal, and revocation.

Admit a candidate only if consent, assent, proxy consent, refusal, dissent,
withdrawal, and revocation remain non-equivalent, and only if capacity,
disclosure, voluntariness, jurisdiction, culture, and effective time remain
explicit factors rather than implied defaults.

The thesis is falsified if permission, authorization decision, entitlement,
obligation, and custody records already express every case below without losing
conferral by the affected party, capacity, voluntariness, participation exit, or
non-retroactive cancellation.

## Proposed senses

| Sense | Governing question |
|---|---|
| `consent` | Which capacitated, informed, voluntary agent performs the normative act that may make which described act permissible, by whom, within what scope and time? |
| `assent` | Which affirmative agreement is given by a person who cannot by themselves authorize the act, where that agreement may still be required, and how is mere failure to object excluded? |
| `proxy-consent` | Who is authorized to consent on another's behalf, under which standard and instrument? |
| `refusal` | Which described act, intervention, offer, or processing is itself declined by a capacitated agent, on which disclosure, with what stated consequences? |
| `dissent` | Which objection is expressed by a person unable to give effective consent, and does it bind? |
| `withdrawal` | Who exits an ongoing participation or relationship, when, with what prospective effect on already-collected data or already-performed acts? |
| `revocation` | Which standing consent is cancelled, by which party, effective when, propagating where, with what non-retroactivity? |

Terminology note: 45 CFR 46.402(c) uses "parental permission" for what this
entry calls proxy consent. That is a jurisdiction-specific regulatory term for
the same conferring act by an authorized representative, not the canonical
`permission` status.

## Candidate contract

```text
consent-withdrawal-use
  := consenting party, capacity, and representative
   x requesting or acting party and authority
   x act description, scope, granularity, and alternatives
   x disclosure to the consenting party, comprehension, deliberation, and language
   x voluntariness, pressure, dependence, inducement, and alternatives
   x basis, jurisdiction, domain norms, and effective time
   x culture, community, family, and collective decision expectations
   x expression, record, receipt, and evidence
   x refusal, dissent, non-response, and default treatment
   x withdrawal from participation, revocation of consent, effective moment,
     propagation, and non-retroactivity
   x consequences, remedy, re-consent, review, and supersession
```

## Existing-owner audit

- [Access, Permission, Authorization, and Entitlement](../../../tables/entries/access-permission-authorization-entitlement.md)
  owns permission as a held status, the request-time allow-or-deny decision,
  entitlement grants from an authority source, and credential or token
  revocation mechanics.
- [Governance, Obligation, and Compliance](../../../tables/entries/governance-obligation-compliance.md)
  owns obligation as a binding duty, waiver of an obligation, and conformity
  assessment.
- [Requirement, Specification, Verification, and Validation](../../../tables/entries/requirement-specification-verification-validation.md)
  owns requirement and specification statements, including stated consent
  requirements.
- [Agreement, Commitment, Obligation, Guarantee, and Contract Integrity](../../../tables/constraints/agreement-commitment-integrity.md)
  owns offer, acceptance, mutual assent in the contract sense, effective time,
  termination, and supersession.
- [Source, Performance, and Research Custody](../../../tables/evidence/source-performance-research-custody.md)
  owns provenance, custody, and the consent record as an evidence field.
- [Population, Sample, Estimand, Estimate, and Generalization](../../../tables/entries/sampling-generalization.md)
  owns recruitment, participation, and attrition in study design.
- [Organization, Position, Role, Competency, Responsibility, Authority, and Accountability](../../../tables/entries/organization-role-authority.md)
  owns decision rights and delegation of authority.
- [Privacy, Confidentiality, Secrecy, Anonymity, and Disclosure](../candidates/privacy-confidentiality-secrecy-anonymity-disclosure.md)
  (noncanonical candidate) owns person-related flow appropriateness and
  disclosure as the act of making information available to a recipient.

## Source matrix

| Source | Contribution | Boundary or challenge |
|---|---|---|
| [SEP, Informed Consent](https://plato.stanford.edu/entries/informed-consent/) | consent as *A* consents to *B*'s φ-ing under a description; legitimacy requirement rather than preference report | competing accounts of validity remain live |
| [Hurd, The Moral Magic of Consent](https://doi.org/10.1017/S1352325200000434) | consent as a normative power that creates or extinguishes rights | philosophical account, not an operational test |
| Faden and Beauchamp, *A History and Theory of Informed Consent*, Oxford University Press, 1986, ISBN 978-0-19-503686-3 | autonomous authorization vs. institutionally effective consent | two senses can diverge in the same case |
| Beauchamp and Childress, *Principles of Biomedical Ethics*, 8th ed., Oxford University Press, 2019, ISBN 978-0-19-064087-3 | capacity, disclosure, understanding, voluntariness | biomedical framing is one domain |
| [WMA Declaration of Helsinki](https://www.wma.net/policies-post/wma-declaration-of-helsinki/) | withdrawal from participation without reprisal; standing of dissent by those unable to consent | professional policy, not binding law everywhere |
| [The Belmont Report](https://www.hhs.gov/ohrp/regulations-and-policy/belmont-report/index.html) | respect for persons as information, comprehension, voluntariness | United States research-ethics context |
| [45 CFR 46 (Common Rule)](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-A/part-46) | §46.116 requirements and waiver, §46.117 documentation, §46.402(b) assent excludes mere failure to object, §46.402(c) parental permission | jurisdiction-specific regulation; its "permission" term is proxy consent here |
| [GDPR, Regulation (EU) 2016/679](https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng) | Art. 4(11) definition, Art. 7 conditions, Art. 7(3) right to withdraw consent as easily as it was given, without affecting prior lawfulness | its "withdrawal of consent" is this entry's `revocation`; consent is one lawful basis among several |
| [EDPB Guidelines 05/2020 on consent](https://www.edpb.europa.eu/documents/guideline/guidelines-052020-on-consent-under-regulation-2016679_en) | freely given, specific, informed, unambiguous; imbalance and bundling | regulator guidance for one legal regime |
| [ISO/IEC 29184:2020](https://www.iso.org/standard/70331.html) | online privacy notice and consent requirements | notice practice is not a theory of consent |
| [ISO/IEC TS 27560:2023](https://www.iso.org/standard/80392.html) | consent record and withdrawal record structure | a record is evidence of consent, not consent |
| [RFC 5280](https://www.rfc-editor.org/info/rfc5280) and [RFC 7009](https://www.rfc-editor.org/info/rfc7009) | certificate and token revocation | homonym anchor: technical revocation is not consent revocation |
| Restatement (Second) of Contracts §§ 17-19, 42-43, American Law Institute, 1981 | manifestation of mutual assent; revocation of an offer | homonym anchor: contract assent and offer revocation stay with agreement |

## Counterevidence and limits

- consent that is expressed but invalid because capacity, disclosure, or
  voluntariness failed, so no permission results;
- valid consent that no record captured, and a consent record whose underlying
  consent was invalid;
- consent that is valid and still produces no permission because the applicable
  basis, authority, or policy withholds it;
- assent that cannot authorize the act by itself yet is legally required before
  the act may proceed;
- proxy consent that is effective while the affected person's dissent still
  carries weight;
- silence or non-response that is not assent;
- refusal of a described act that is not withdrawal from a participation, and
  withdrawal from a participation that refuses nothing further;
- revocation of standing consent while participation continues, and withdrawal
  from participation while some consents remain in force;
- withdrawal or revocation that does not invalidate acts lawfully performed
  before it;
- revocation that has not yet propagated to every downstream recipient;
- authorization granted by a system without any consent by the affected party;
- consent by the affected party that an authorization decision still denies;
- settings in which family, community, or collective involvement is expected
  alongside the individual's consent, and settings in which it is not.

## Admission gates

1. Define consent as the normative act that may make an act permissible, and
   keep it separate from permission, the authorization decision, and
   entitlement.
2. Keep assent separate from consent and from contractual mutual assent, and
   record that assent may be required even though it cannot authorize alone.
3. Require an affirmative act for assent; never derive it from silence.
4. Name the proxy sense `proxy-consent` and record any jurisdiction-specific
   term, such as parental permission, as a term note rather than as the
   canonical `permission` status.
5. Distinguish refusal by its object, the described act, from withdrawal by its
   object, the ongoing participation.
6. Map regulatory "withdrawal of consent" to `revocation` and keep `withdrawal`
   for participation exit.
7. Require effective time, propagation, and non-retroactivity on every
   withdrawal and revocation row.
8. Treat capacity, disclosure, comprehension, voluntariness, granularity,
   record, culture, community, family, and collective expectation as factors
   rather than senses.
9. Keep consent disclosure, what was told to the consenting party, separate from
   privacy disclosure, information made available to a recipient.
10. Disambiguate revocation against credential, token, and offer revocation in
    the orientation text, not only in a contrast table.
11. Carry jurisdiction, domain norms, culture, affected party, consequence, and
    remedy.
12. Stop before jurisdiction-specific legal advice, capacity-assessment
    instruments, ethics-committee procedure catalogs, consent-management product
    patterns, sexual-offence doctrine, and public-key or token revocation
    mechanics.

## Disposition

**PROCEED TO CANDIDATE ENTRY DRAFT; DO NOT ADMIT CANONICALLY.** The conferral
boundary is well supported, but revocation is a triple homonym, regulatory
vocabulary crosses this entry's withdrawal and revocation senses, and legal,
clinical, and cultural review is mandatory before admission. This brief is not
legal, clinical, or regulatory advice.

---
topic: privacy-disclosure-candidate
date: 2026-08-19
status: candidate admission brief
canonical_admission: false
---

# Privacy, Confidentiality, Secrecy, Anonymity, and Disclosure

## Decision question

Does Formarium need a person-centered owner for the appropriateness of
information collection, use, inference, identification, linkage, retention,
disclosure, and onward transfer?

## Bounded thesis

Privacy is not reducible to confidentiality or access control. Admit a candidate
only if it keeps privacy, confidentiality, secrecy, anonymity, pseudonymity,
identifiability, linkability, and disclosure distinct and makes jurisdiction,
context, and culture explicit.

The thesis is falsified if privacy can be represented completely as
authorization plus confidentiality without losing purpose, inference,
linkability, contextual expectation, or downstream disclosure.

## Proposed senses

| Sense | Governing question |
|---|---|
| `privacy` | Which person-related flows, uses, inferences, and disclosures are appropriate in this context? |
| `confidentiality` | Which authorized restrictions limit access to or disclosure of information? |
| `secrecy` | What is intentionally withheld from which audience under which duty or authority? |
| `anonymity` | Can the person avoid identification within the relevant anonymity set? |
| `pseudonymity` | Is a substitute identifier used while preserving bounded continuity? |
| `identifiability` | By what reasonably likely means can information be attributed to a person? |
| `linkability` | Can records or interactions be related as concerning the same person? |
| `disclosure` | Who made what information available to whom, by what authority, with what downstream consequence? |

## Candidate contract

```text
privacy-disclosure-use
  := affected person or group
   x actor, role, authority, and relationship
   x information item, category, and sensitivity
   x identifiability, pseudonymity, anonymity set, and linkability
   x context, norms, expectation, jurisdiction, culture, and time
   x collection, use, inference, disclosure, retention, deletion, and transfer
   x purpose and applicable basis
   x recipient, audience, and onward-transfer chain
   x confidentiality restrictions and secrecy obligations
   x transparency, participation, safeguards, risk, remedy, and review
```

## Existing-owner audit

- [Access, Permission, Authorization, and Entitlement](../../../tables/entries/access-permission-authorization-entitlement.md)
  owns request-time permission and enforcement, not privacy appropriateness.
- [Information, Data, Signal, and Noise](../../../tables/entries/information-data-signal-noise.md)
  owns data, records, fields, and representation.
- [Governance, Obligation, and Compliance](../../../tables/entries/governance-obligation-compliance.md)
  owns binding requirements and conformity.
- [Policy, Rule, Constraint, Decision, and Exception](../../../tables/entries/policy-rule-constraint-decision-exception.md)
  owns applicable rule logic and exceptions.
- [Identity, Naming, Classification, and Versioning](../../../tables/entries/identity-naming-classification-versioning.md)
  owns identity and identifier semantics.

## Source matrix

| Source | Contribution | Boundary or challenge |
|---|---|---|
| [NIST Privacy Framework](https://www.nist.gov/privacy-framework) | privacy risk management | framework scope does not define one universal privacy theory |
| [NISTIR 8062](https://doi.org/10.6028/NIST.IR.8062) | predictability, manageability, disassociability | privacy engineering is broader than secrecy |
| [NIST SP 800-122](https://doi.org/10.6028/NIST.SP.800-122) | inappropriate access, use, and disclosure of PII | confidentiality is only one safeguard |
| [NIST confidentiality glossary](https://csrc.nist.gov/glossary/term/confidentiality) | authorized restrictions on access and disclosure | confidentiality does not exhaust privacy |
| [GDPR official text](https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng) | personal data, pseudonymisation, identifiability, processing, transfer | jurisdiction-specific law, not universal semantics |
| [NIST SP 800-53 Rev. 5](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final) | integrated security and privacy controls | controls do not by themselves establish appropriateness |
| [OECD Privacy Guidelines](https://doi.org/10.1787/9789264196391-en) | purpose, use, safeguards, and transborder flow | requires local legal interpretation |
| [ISO/IEC 27701](https://www.iso.org/standard/71670.html) | privacy information management scope | public abstract is not sufficient definitional authority |
| [Nissenbaum, Privacy as Contextual Integrity](https://digitalcommons.law.uw.edu/wlr/vol79/iss1/10/) | context-relative norms of information flow | not the only privacy theory |
| [RFC 6973](https://www.rfc-editor.org/rfc/rfc6973.html) | anonymity, pseudonymity, identifiability, unlinkability, disclosure | protocol guidance does not settle legal rights |

## Counterevidence and limits

- Pseudonymized information can remain identifiable; pseudonymity is not
  anonymity.
- Lawful or appropriate disclosure exists; privacy is not zero disclosure.
- Journalistic, artistic, public-interest, health, and official-record contexts
  can alter applicable duties and safeguards.
- Privacy concepts and legal rights differ across jurisdictions and cultures.
- This brief does not provide legal advice or grant permission to collect,
  process, disclose, or retain information.

## Admission gates

1. Keep privacy separate from authorization and generic confidentiality.
2. Keep confidentiality separate from secrecy.
3. Keep anonymity, pseudonymity, identifiability, and linkability distinct.
4. Treat purpose, retention, and onward transfer as explicit factors.
5. Retain lawful or appropriate disclosure cases.
6. Carry jurisdiction, context, culture, affected person, and remedy.
7. Stop before trade secrecy, military secrecy, generic ACLs, and generic data
   modeling.

## Disposition

**PROCEED TO CANDIDATE ENTRY DRAFT; DO NOT ADMIT CANONICALLY.** The boundary is
well supported, but legal and cultural review is mandatory before admission.

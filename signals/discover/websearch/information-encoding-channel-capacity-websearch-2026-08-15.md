---
skill: discover-websearch
topic: information-encoding-channel-capacity
date: 2026-08-15
claims_checked: 5
confirmed: 5
---

# Information, Encoding, Channel, and Capacity Web Evidence

## Claims and query evidence

### Claim 1: encoding is a mapping contract distinct from meaning

- Query 1: `site:itu.int encoding decoding representation code alphabet definition recommendation PDF`
  - Source: https://www.itu.int/rec/T-REC-X.209-198811-W/en
  - Direct quote: “encoding rules ... also to be used for decoding”
- Query 2: `site:itu.int ASN.1 encoding decoding physical representation`
  - Source: https://www.itu.int/en/ITU-T/asn1/Pages/introduction.aspx
  - Direct quote: “regardless of language implementation and physical representation”
- Verdict: CONFIRMED

### Claim 2: a channel requires modeled input-output transition behavior

- Query 1: `site:people.math.harvard.edu Shannon channel transition probabilities PDF`
  - Source: https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf
  - Direct quote: “the channel is described by a set of transition probabilities”
- Query 2: `site:itu.int probabilistically modelled channel capacity handbook PDF`
  - Source: https://www.itu.int/dms_pub/itu-r/opb/hdb/R-HDB-42-2002-PDF-E.pdf
  - Direct quote: “via a probabilistically modelled channel”
- Verdict: CONFIRMED

### Claim 3: mutual information measures statistical dependence, not causation or meaning

- Query 1: `site:nvlpubs.nist.gov mutual information source destination dependency PDF`
  - Source: https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.1136.pdf
  - Direct quote: “degree of source and destination dependency”
- Query 2: `site:itl.nist.gov independence joint probability product marginals`
  - Source: https://itl.nist.gov/div898/software/dataplot/refman1/auxillar/chistest.htm
  - Direct quote: “P(row i, column j) = P(row i)*P(column j)”
- Verdict: CONFIRMED; the causal and semantic exclusions are scoped inferences.

### Claim 4: capacity optimizes information over admissible inputs for a fixed channel

- Query 1: `site:people.math.harvard.edu Shannon maximum input ensembles channel capacity PDF`
  - Source: https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf
  - Direct quote: “capacity C is defined as the maximum of R”
- Query 2: `site:itu.int channel capacity maximum information probabilistically modelled channel`
  - Source: https://www.itu.int/dms_pub/itu-r/opb/hdb/R-HDB-42-2002-PDF-E.pdf
  - Direct quote: “maximum information quantity ... without error”
- Verdict: CONFIRMED

### Claim 5: capacity and operating rate retain units, coding scope, and achievability distinctions

- Query 1: `site:people.math.harvard.edu Shannon capacity bits per second arbitrarily small error PDF`
  - Source: https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf
  - Direct quote: “capacity C (bits per second)”
- Query 2: `site:itu.int practical channel capacity maximum generally not realized PDF`
  - Source: https://www.itu.int/dms_pub/itu-r/opb/rep/R-REP-M.2197-2010-PDF-E.pdf
  - Direct quote: “maximum channel capacity ... is not realized”
- Verdict: CONFIRMED

## Findings

| # | Finding | Verdict | Source |
|---|---|---|---|
| 1 | Encoding rules map typed or source values into transfer representations. | CONFIRMED | ITU-T X.209 |
| 2 | Decoding scope belongs to the encoding contract. | CONFIRMED | ITU-T X.209 |
| 3 | Multiple encodings can represent the same abstract structure. | CONFIRMED | ITU ASN.1 |
| 4 | Representation identity does not establish semantic identity. | CONFIRMED | inference from ITU separation |
| 5 | A discrete noisy channel is described through conditional transitions. | CONFIRMED | Shannon |
| 6 | A physical medium or protocol name alone does not specify that law. | CONFIRMED | inference from Shannon/ITU model scope |
| 7 | Channel memory and state affect the appropriate model. | CONFIRMED | Shannon |
| 8 | Mutual information compares joint dependence with independent marginals. | CONFIRMED | Shannon/NIST |
| 9 | Mutual information is symmetric under exchange of the variables. | CONFIRMED | Shannon formula |
| 10 | Statistical dependence alone does not identify causal direction. | CONFIRMED | scoped inference from symmetry |
| 11 | Statistical dependence alone does not establish semantic agreement. | CONFIRMED | scoped inference from model definition |
| 12 | Discrete memoryless capacity varies the input ensemble, not the fixed channel law. | CONFIRMED | Shannon |
| 13 | Constraints determine which input distributions are admissible. | CONFIRMED | Shannon constrained systems |
| 14 | One input distribution's mutual information need not equal capacity. | CONFIRMED | inference from maximization |
| 15 | Logarithm base determines bit or nat units. | CONFIRMED | Shannon |
| 16 | Per-use capacity needs a time basis before conversion to bits per second. | CONFIRMED | dimensional inference |
| 17 | Maximum capacity and practical realized rate are distinct. | CONFIRMED | ITU-R M.2197 |
| 18 | Named codes, formats, protocols, and media are unnecessary to define the ladder. | CONFIRMED | inference from reusable criteria |

Summary: 5 of 5 claims confirmed; 18 findings; none contradicted or ungrounded.

## Amendments

1. Separate meaning, representation mapping, channel transition, dependence measure, and optimized bound.
2. Preserve mapping version, channel law, admissible inputs, estimator, logarithm base, and normalization.
3. Keep named codes, formats, protocols, media, and channel families outside canonical senses.

No ungrounded claims.

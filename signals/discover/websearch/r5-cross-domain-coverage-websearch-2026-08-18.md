---
skill: discover-websearch
topic: r5-cross-domain-coverage
date: 2026-08-18
claims_checked: 4
confirmed: 4
---

# R5 Cross-Domain Coverage Web Evidence

## Claims to ground

| # | Claim | Why it matters |
|---|---|---|
| 1 | Organization sources distinguish governance, management, oversight, delegation, and accountability. | Otherwise an organization campaign would merely expand vocabulary. |
| 2 | Operations sources distinguish capacity/resource planning, scheduling, inventory, readiness, verification, and validation. | Otherwise operational pressure would collapse into generic process language. |
| 3 | Information sources distinguish entity, activity, agent, derivation, attribution, provenance, and responsibility. | Otherwise data lineage would be treated as a synonym list. |
| 4 | Economic accounting sources distinguish stocks, flows, transactions, positions, price, valuation, income, consumption, saving, and investment. | Otherwise an economics batch would be driven by domain count. |

## Web evidence

### Claim 1 — organizations

- Query: `site:oecd.org G20 OECD Principles corporate governance responsibilities board accountability management PDF 2023`
  - Source: [G20/OECD Principles, board responsibilities](https://www.oecd.org/en/publications/g20-oecd-principles-of-corporate-governance-2023_ed750b30-en/full-report/component-8.html)
  - Direct quote: “strategic guidance ... effective monitoring of management ... board’s accountability”
  - Relevance: Separates direction, monitoring, management, and accountability.
- Query: `site:iso.org ISO 37000 governance organizations definition governance management accountability`
  - Source: [ISO 37000 overview](https://committee.iso.org/ISO_37000_Governance)
  - Direct quote: “Accountability at all levels is another principle at the heart of good governance”
  - Relevance: Retains accountability after delegation and distinguishes governing-body responsibilities.
- Verdict: CONFIRMED.

### Claim 2 — operations

- Query: `site:nist.gov manufacturing operations capacity utilization throughput inventory scheduling official PDF`
  - Source: [NIST, Monitoring and Controlling Operations](https://tsapps.nist.gov/publication/get_pdf.cfm?pub_id=821207)
  - Direct quote: “capacity planning, plant production scheduling, materials requirements planning”
  - Relevance: Separates resource planning, scheduling, inventory, dispatch, and control layers.
- Query: `site:nasa.gov systems engineering handbook concept of operations verification validation operations maintenance PDF`
  - Source: [NASA Systems Engineering Handbook](https://www.nasa.gov/reference/2-0-fundamentals-of-systems-engineering/)
  - Direct quote: “Verification ... compliance with requirements” and “Validation ... intended purpose”
  - Relevance: Separates specification conformance from suitability in an operational context.
- Verdict: CONFIRMED.

### Claim 3 — information

- Query: `site:w3.org/TR/prov-o provenance entities activities agents derivation attribution official recommendation`
  - Source: [W3C PROV-O](https://www.w3.org/TR/prov-o/)
  - Direct quote: “An Entity ... An Activity ... An Agent”
  - Relevance: Provides distinct nodes and qualified responsibility/derivation relations.
- Query: `site:nist.gov data quality information quality provenance metadata glossary official`
  - Source: [NIST data provenance glossary](https://csrc.nist.gov/glossary/term/data_provenance)
  - Direct quote: “generation, transmission and storage ... trace the origin”
  - Relevance: Grounds provenance as a trace with context, not a generic confidence label.
- Verdict: CONFIRMED.

### Claim 4 — economics

- Query: `site:unstats.un.org SNA 2025 stocks flows assets income consumption definitions PDF`
  - Source: [UN System of National Accounts](https://unstats.un.org/unsd/Nationalaccount/sna.asp)
  - Direct quote: “income ... consumption, saving and investment”
  - Relevance: Establishes integrated but non-equivalent economic flows and allocations.
- Query: `site:imf.org Balance of Payments seventh edition stocks flows positions transactions`
  - Source: [IMF BPM7 chapters](https://www.imf.org/en/data/statistics/bpm/bpm7-chapters)
  - Direct quote: “Flows, Stocks, and Accounting Rules”
  - Relevance: Confirms stock/flow/position/transaction distinctions as current official accounting structure.
- Verdict: CONFIRMED.

## Findings

| # | Finding | Source |
|---:|---|---|
| 1 | Governing bodies direct and oversee rather than simply perform management. | OECD |
| 2 | Board accountability persists alongside management accountability. | OECD |
| 3 | Stakeholder interests and shareholder accountability are not identical scopes. | OECD |
| 4 | Delegation does not erase governing-body accountability. | ISO |
| 5 | Purpose, strategy, oversight, accountability, and stakeholder engagement are separate governance questions. | ISO |
| 6 | Capacity planning and production scheduling are distinct operational activities. | NIST |
| 7 | Inventory, resource allocation, dispatch, maintenance, and performance analysis require separate records. | NIST |
| 8 | Verification addresses requirements while validation addresses intended use. | NASA |
| 9 | Operational readiness includes products, people, procedures, resources, and environment. | NASA |
| 10 | Provenance distinguishes entities, activities, and agents. | W3C |
| 11 | Derivation, quotation, revision, attribution, association, and delegation are not interchangeable. | W3C |
| 12 | A provenance trace may include generation, transmission, storage, and origin. | NIST |
| 13 | Economic stocks are point-in-time levels while flows occur over periods. | UN SNA |
| 14 | Production, income, consumption, saving, and investment occupy different accounts. | UN SNA |
| 15 | Transactions and other changes reconcile positions rather than acting as synonyms for them. | IMF BPM7 |
| 16 | A transaction price is scoped to an exchange and is not every generalized market-price concept. | IMF BPM7 |

Summary: four of four claims confirmed; none contradicted or unconfirmed.

## Ungrounded claims

No ungrounded claims. The evidence does not establish that Factorium lacks any
of these distinctions; that remains the frozen corpus-comparison question.

## Amendments

1. Use source concepts as pressure terms while preserving each framework’s
   scope, version, and authority.
2. Require at least two independent packets or frameworks before admission.
3. Escalate any apparent specialized or normative gap to source review rather
   than turning it directly into guidance.

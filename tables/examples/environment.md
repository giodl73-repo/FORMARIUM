# Environment

An environment is a bounded setting in which work, software, data, or policy
operates. The correct factorization depends on whether the reader is
identifying deployments, governing isolation, organizing ownership, or naming
domains.

## Sense `governed-deployment`

**Tagline:** A deployable boundary whose identity reflects why it must exist
separately.

| Lens | Factorization | Pivot | Supporting roles | Use when | Watch for |
|---|---|---|---|---|---|
| Governance-first | customer x compliance-boundary x geography x lifecycle | compliance boundary | customer, residency boundary, stage | Isolation and auditability dominate | Business ownership becomes an overloaded label |
| Organization-first | company x business-unit x capability x owner | organizational capability | company, unit, owner | Environments follow stable operating responsibilities | Reorganizations rename or relocate everything |
| Product-first | product x service x stage x release-ring | product or service | stage, ring, tenant | Delivery topology and release management dominate | Compliance differences become exceptions |
| Data-first | data-domain x sensitivity x residency x retention-class | data domain | sensitivity, geography, retention | Data governance determines boundaries | Shared services duplicate across data domains |
| Operations-first | support-owner x criticality x SLA x recovery-tier | service responsibility | criticality, availability, recovery | Support and resilience drive isolation | Semantic purpose becomes difficult to discover |

### Common constraints

- Compliance and residency may constrain valid geographies.
- Lifecycle stage should not silently encode customer or business ownership.
- Ownership may change without changing the governed identity.
- One environment name should not be the only custody record for all factors.

## Sense `organizational-domain-name`

**Tagline:** A name that signals which kind of organizational concept the
domain represents.

| Lens | Factorization | Pivot | Use when | Example | Watch for |
|---|---|---|---|---|---|
| Capability | actor x durable ability | ability | Naming what the organization can do | customer-support | Capabilities are confused with departments |
| Business area | organization x responsibility area | organizational area | Navigation and accountability follow the org chart | sales | Names become unstable during reorganization |
| Bounded context | model x vocabulary x consistency boundary | semantic model | Software and data require one coherent language | case-management | A context is treated as merely a team name |
| Value stream | trigger x stages x delivered value | end-to-end flow | Work is organized around value movement | lead-to-cash | Shared capabilities are duplicated per stream |
| Product or service | audience x outcome x managed offering | offering | The domain is operated as a product | service-hub | Internal capabilities disappear behind branding |
| Ownership | team x mandate x operational boundary | owner | Discoverability depends primarily on who runs it | revenue-operations | Ownership changes invalidate durable identities |
| Data domain | subject x stewardship x policy boundary | governed information | Data ownership and quality are primary | customer-data | Process and capability differences are hidden |

### Cross-references

- boundary
- capability
- context
- ownership
- pivot selection
- product
- value stream

### Maturity

`candidate` — grounded in recurring architecture practice and the motivating
Power Platform example; broader examples and source review are required.

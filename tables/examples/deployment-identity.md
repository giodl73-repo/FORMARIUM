# Deployment Identity

**Resolution status:** Unlinked factor terms are `unresolved-candidate` pending
pilot graph review.

Deployment identity distinguishes one operated instance or release boundary
from another. It is narrower than the broader
[environment](environment.md#sense-governed-deployment) entry and focuses on
software delivery and operation.

## Sense `operated-deployment`

**Tagline:** Identify the independently deployed and operated realization of a
product or service.

```text
deployment
  := tenant-or-customer
   x product
   x service
   x geography
   x compliance-boundary
   x lifecycle-stage
   x release-ring
   x isolation-class
   x operational-owner
```

| Lens | Pivot | Supporting factors | Use when | Watch for |
|---|---|---|---|---|
| Tenant-first | tenant/customer | product, geography, stage | Customer isolation dominates | Thousands of tenants create operational fragmentation |
| Product-first | product/service | tenant, ring, stage | Product delivery is standardized across customers | Compliance exceptions become hidden suffixes |
| Boundary-first | compliance boundary | geography, tenant, isolation | Audit and residency determine topology | Business capability becomes difficult to discover |
| Release-first | release ring | version, stage, cohort | Progressive delivery is the main distinction | Temporary release state becomes permanent identity |
| Operations-first | owner | criticality, support model, region | Teams own clear deployment units | Reorganizations invalidate names and keys |

### Constraints

- Geography must satisfy residency and service-availability rules.
- Release ring and lifecycle stage are distinct.
- Operational owner may change without changing deployment identity.
- A shared deployment may serve many tenants only when isolation policy allows
  it.
- Naming is a projection of identity factors, not the sole custody record.

### Failure signs

- Names accumulate opaque suffixes for every newly discovered factor.
- Stage, ring, version, and geography are conflated.
- Team ownership is embedded in immutable resource identifiers.
- Compliance is represented only in documentation.

### Relations

- `NARROWER-THAN`: environment/governed-deployment
- `RELATED-TO`: tenancy boundary, release strategy, service instance

### Maturity

`candidate` — extends the motivating Power Platform environment decomposition
into a more specific software-deployment view.

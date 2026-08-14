# Security

**Resolution status:** Unlinked factor terms are `unresolved-candidate` pending
source and graph review.

Security is a broad concern rather than one decomposition. Readers should
first choose whether they mean access control, system protection, risk
management, operational assurance, or another narrower sense.

## Sense `access-control`

**Tagline:** Determine and enforce whether a subject may perform an action on a
protected object.

The canonical [access-control request](../composites/access-control-request.md)
view uses eight factors. It is one composite level whose factors each resolve
to entries and can be recursively opened.

## Sense `system-protection`

**Tagline:** Preserve desired properties of a system despite faults or hostile
action.

| Lens | Factorization | Pivot | Watch for |
|---|---|---|---|
| Security properties | confidentiality x integrity x availability x authenticity x accountability | protected property | Treating the properties as implementation controls |
| Resilience | anticipate x withstand x recover x adapt | service continuity | Ignoring confidentiality or authorization failures |
| Attack surface | assets x interfaces x trust-boundaries x privileges x dependencies | exposed interface | Counting surfaces without threat or impact context |

## Sense `risk-management`

**Tagline:** Decide which security exposures warrant treatment.

| Lens | Factorization | Pivot | Watch for |
|---|---|---|---|
| Risk scenario | asset x threat x vulnerability x likelihood x impact x control | risk scenario | Treating likelihood and impact labels as objective measurements |
| Control portfolio | objective x preventive-control x detective-control x corrective-control x assurance | security objective | Counting controls without testing effectiveness |

### Cross-references

- [access-control request](../composites/access-control-request.md)
- `boundary` — unresolved-candidate
- `identity` — unresolved-candidate
- `policy` — unresolved-candidate
- `risk` — unresolved-candidate
- `trust` — unresolved-candidate

### Maturity

`candidate` — the access-control view is grounded in recurring security
architecture practice; the full entry needs cited source review before
promotion.

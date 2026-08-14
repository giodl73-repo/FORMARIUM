# Authorization Policy

**Resolution status:** Unlinked subfactors are `unresolved-candidate`.

**Tagline:** A rule set that derives an access decision from request factors.

| Lens | Factors | Watch for |
|---|---|---|
| Role-based | subject-role x permission x scope | Role explosion and contextual exceptions |
| Attribute-based | subject-attributes x object-attributes x action x context | Hidden dependencies and difficult explanation |
| Relationship-based | relationship-graph x action x object | Stale or unexpectedly transitive relationships |
| Capability-based | possessed-capability x action x object | Delegation and revocation complexity |

Policy is evaluated; it is not equivalent to the resulting permission or
enforcement.

**Maturity:** `candidate`

# Enforcement Point

**Resolution status:** Unlinked subfactors are `unresolved-candidate`.

**Tagline:** The boundary or mechanism that applies an authorization decision
to an attempted operation.

| Candidate factors | Use when | Watch for |
|---|---|---|
| location x authority x coverage x fail-mode | Mapping decision to execution | Assuming a correct decision guarantees enforcement |
| gateway x service x datastore x client | Locating control boundaries | Relying on a bypassable client-only check |

Decision and enforcement remain separate so bypass, stale policy, and partial
coverage can be represented.

**Maturity:** `candidate`

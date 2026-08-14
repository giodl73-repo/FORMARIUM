# Subject Identity

**Resolution status:** Unlinked subfactors are `unresolved-candidate`.

**Tagline:** The stable reference used to distinguish the principal making or
receiving a request.

| Candidate sense | Factors | Use when | Watch for |
|---|---|---|---|
| Account identity | issuer x namespace x account-id | Human or service accounts are governed by an identity system | Treating credentials as the identity itself |
| Workload identity | platform x tenant x workload-id x instance-scope | Software acts without a human account | Coupling identity to an ephemeral machine |
| Contextual principal | base-identity x assumed-role x delegation-chain | Authority changes by session or delegation | Losing the original actor |

Prime status is relative: access-control views may treat subject identity as a
leaf, while identity-focused entries decompose it further.

**Maturity:** `candidate`

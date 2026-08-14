# Object-Oriented Type Design

**Resolution status:** Unlinked factor terms are `unresolved-candidate` pending
pilot graph review.

Object-oriented type design decides which differences define nominal identity
and which belong in interfaces, composition, policies, relationships, state,
or data. Single inheritance makes pivot selection especially consequential.

## Sense `class-hierarchy-pivot`

**Tagline:** Choose the one variation axis that receives nominal inheritance.

```text
type-family
  := semantic-identity
   x variant-closure
   x substitutability-contract
   x capability-set
   x owned-state
   x lifecycle
   x policy-set
   x relationships
```

| Lens | Pivot | Supporting assignments | Use when | Watch for |
|---|---|---|---|---|
| Kind-first | semantic kind | capabilities as interfaces; state by composition | Subtypes preserve one stable meaning and contract | Subclass explosion from unrelated dimensions |
| Variant-first | closed alternative | tagged subclasses or discriminated union | The alternatives are finite and exhaustively handled | Open extension becomes awkward |
| Lifecycle-first | state | state classes and transitions | Behavior changes radically by lifecycle stage | Identity changes accidentally during transitions |
| Capability-first | none or minimal base | interfaces/mixins own behavior | Capabilities vary independently | Conflicting defaults and fragmented invariants |
| Composition-first | aggregate root | components own varying state and behavior | Parts vary independently and can be replaced | Excessive delegation hides the conceptual model |

### Pivot tests

- A subtype must remain substitutable for its parent.
- Adding an independent capability should not require multiplying subclasses.
- Lifecycle changes should not usually change nominal identity.
- Policy changes should not require a new semantic kind.
- Relationships to other objects should not become inheritance merely for
  reuse.

## Sense `mechanism-assignment`

**Tagline:** Assign discovered factors to mechanisms after choosing the pivot.

| General role | Typical OO mechanism | Common mistake |
|---|---|---|
| Stable semantic identity | abstract base or aggregate root | Choosing a storage format as the base type |
| Independent capability | interface | Treating every interface as a taxonomic kind |
| Owned constituent | composition | Exposing internal parts as subclasses |
| Closed variant | tagged union or sealed hierarchy | Using an open hierarchy when exhaustiveness matters |
| Replaceable policy | strategy | Encoding policy names into class names |
| Lifecycle state | state object or state field | Creating a subclass for every status combination |
| Relationship | association | Using inheritance for “has access to” or “belongs to” |
| Derived view | query/property | Persisting a value that should be calculated |

### Cross-references

- capability
- composition
- pivot selection
- policy
- state
- variant

### Maturity

`candidate` — grounded in recurring OO design practice; source review and
language-specific comparisons remain pending.

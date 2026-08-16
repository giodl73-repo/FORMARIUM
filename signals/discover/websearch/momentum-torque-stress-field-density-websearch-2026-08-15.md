---
skill: discover-websearch
topic: momentum-torque-stress-field-density
date: 2026-08-15
claims_checked: 5
confirmed: 5
---

# Momentum, Torque, Stress, Field, and Density Web Evidence

## Claims

| # | Claim | Why it matters | Verdict |
|---|---|---|---|
| 1 | Linear momentum is mass times velocity, and net external impulse produces momentum change. | Separates motion state from interaction and interval. | CONFIRMED |
| 2 | Torque is the moment of force about a reference and uses `N m` without becoming work or energy. | Preserves cross-product geometry and quantity kind. | CONFIRMED |
| 3 | Stress is a tensor relating oriented-surface traction, while pressure is a narrower scalar loading quantity. | Prevents pascal-unit collapse. | CONFIRMED |
| 4 | A Newtonian gravitational field is force per test mass at a location and shares acceleration dimensions. | Separates field role, body force, and kinematics. | CONFIRMED |
| 5 | Average mass density is mass/volume, while local density is a field whose volume integral reconstructs mass. | Separates bulk quotient from spatial distribution. | CONFIRMED |

## Query record

| Claim | Query 1 | Query 2 |
|---|---|---|
| 1 | `site:nasa.gov momentum mass velocity impulse force time educational` | `site:nasa.gov Newton second law momentum change per time` |
| 2 | `site:nasa.gov torque cross product force lever arm educational` | `site:bipm.org SI brochure moment of force newton metre` |
| 3 | `site:nist.gov stress tensor traction pressure pascal mechanics` | `site:nist.gov continuum mechanics stress tensor traction vector PDF` |
| 4 | `site:nasa.gov gravitational field force per unit mass acceleration` | `site:nasa.gov gravitational acceleration field vector location force mass` |
| 5 | `site:nist.gov mass density local density field volume integral` | `site:nasa.gov local mass density volume integral density` |

## Direct evidence

**Claim 1**

- NASA defines linear momentum as mass multiplied by velocity.
- NASA describes impulse as force applied over time resulting in momentum change.
- Verdict: CONFIRMED.

**Claim 2**

- NASA defines torque from force and perpendicular distance to the reference.
- BIPM identifies moment of force with unit newton metre and warns that shared
  unit expressions do not identify quantities by themselves.
- Verdict: CONFIRMED.

**Claim 3**

- NIST-hosted continuum references relate the traction vector on an oriented
  surface to the Cauchy stress tensor.
- NIST SI guidance groups pressure and stress under force per area while
  retaining different quantity names.
- Verdict: CONFIRMED.

**Claim 4**

- NASA states that multiplying gravitational field by test mass gives local force.
- NASA field documentation treats gravitational acceleration as location-dependent.
- Verdict: CONFIRMED within the stated Newtonian model.

**Claim 5**

- NIST defines mass density as mass divided by volume.
- NASA continuum references express distributed mass through density and volume elements.
- Verdict: CONFIRMED.

## Findings

| # | Finding | Source |
|---|---|---|
| 1 | Linear momentum is mass multiplied by velocity. | [NASA](https://www.nasa.gov/wp-content/uploads/2024/05/momentum-and-impulse-classroom-connection-508.pdf) |
| 2 | Momentum is a vector quantity. | [NASA](https://www.grc.nasa.gov/www/k-12/BGP/newton2.html) |
| 3 | Net force is the time rate of momentum change in Newtonian mechanics. | [NASA](https://www.grc.nasa.gov/www/k-12/BGP/newton2.html) |
| 4 | Impulse is force accumulated over time and changes momentum. | [NASA](https://www.nasa.gov/wp-content/uploads/2024/05/momentum-and-impulse-classroom-connection-508.pdf) |
| 5 | Momentum conservation requires a closed system/no outside force scope. | [NASA](https://www.nasa.gov/wp-content/uploads/2024/05/momentum-and-impulse-classroom-connection-508.pdf) |
| 6 | Torque depends on force and perpendicular moment arm. | [NASA](https://www.grc.nasa.gov/WWW/K-12/airplane/torque.html) |
| 7 | A force through the pivot has zero torque about that pivot. | [NASA](https://www.grc.nasa.gov/WWW/K-12/airplane/torque.html) |
| 8 | Moment of force uses the coherent unit newton metre. | [BIPM](https://www.bipm.org/documents/20126/41483022/si_brochure_8.pdf) |
| 9 | Unit expression alone must not specify a quantity. | [BIPM](https://www.bipm.org/documents/20126/41483022/si_brochure_8.pdf) |
| 10 | Surface traction depends on the oriented surface normal. | [NIST-hosted reference](https://nehrpsearch.nist.gov/static/files/NSF/PB87234308.pdf) |
| 11 | The Cauchy stress tensor maps that normal to traction components. | [NIST-hosted reference](https://nehrpsearch.nist.gov/static/files/NSF/PB87234308.pdf) |
| 12 | Pressure and stress both use force-per-area units. | [NIST](https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b9) |
| 13 | Gravitational field times test mass gives local gravitational force. | [NASA](https://www.grc.nasa.gov/www/k-12/Numbers/Math/Mathematical_Thinking/possible_scalar_terms.htm) |
| 14 | A Newtonian field value is a vector directed with the gravitational force. | [NASA](https://www.grc.nasa.gov/www/k-12/Numbers/Math/Mathematical_Thinking/possible_scalar_terms.htm) |
| 15 | Gravity-field variation reflects mass distribution and location. | [NASA JPL](https://podaac.jpl.nasa.gov/gravity) |
| 16 | Mass density has unit `kg m^-3` and is mass divided by volume. | [NIST](https://www.nist.gov/pml/special-publication-811/nist-guide-si-chapter-8) |
| 17 | Distributed mass models use density with volume elements. | [NASA](https://ntrs.nasa.gov/api/citations/19760004132/downloads/19760004132.pdf) |
| 18 | A bulk density relation does not itself supply the spatial distribution. | [NIST](https://www.nist.gov/pml/special-publication-811/nist-guide-si-chapter-8) |

Summary: 5 of 5 claims confirmed; 18 findings; none contradicted or unconfirmed.

## Ungrounded claims

No ungrounded claim remains. The exact local-density limit and integration
notation are standard continuum representations of the cited mass/volume and
distributed-mass relations; Factorium keeps their continuum and resolution
assumptions explicit.

## Amendments

1. Bound momentum and impulse to one system, frame, force set, and interval.
2. Bound torque and stress to reference geometry and surface orientation.
3. Keep field/local quantities separate from body forces and bulk averages.

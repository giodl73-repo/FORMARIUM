# Motion Measure

Status: candidate anchor entry

## Orientation

Motion measures describe where a subject is, how its position changes, how
much path it traverses, and how those quantities change with time. Everyday
speech often merges distance with displacement and speed with velocity;
Factorium separates them by evidence, direction, and mathematical role.

## Sense table

| Sense | Governing question | Kind | Dimension | Defining evidence |
|---|---|---|---|---|
| `position` | Where is it in the chosen frame? | vector or coordinate | `L` | location relative to origin and axes |
| `distance-traveled` | How much path length accumulated? | scalar | `L` | complete path |
| `displacement` | How did final position differ from initial position? | vector | `L` | endpoints and frame |
| `speed` | How fast is path length accumulating? | scalar | `L T^-1` | distance and elapsed time |
| `velocity` | How fast and in what direction is position changing? | vector | `L T^-1` | displacement or position derivative |
| `acceleration` | How is velocity changing? | vector | `L T^-2` | velocity change or derivative |

## Root factorization

```text
motion-measure-use
  := subject
   x reference frame
   x coordinate and direction convention
   x path-or-endpoint evidence
   x scalar-or-vector kind
   x average-or-instantaneous view
   x time interval or instant
   x unit system
```

## Contrast table

| Pair | Shared feature | Decisive distinction |
|---|---|---|
| Distance vs. displacement | unit and dimension `L` | path length vs. endpoint change with direction |
| Speed vs. velocity | unit and dimension `L T^-1` | scalar path rate vs. vector position rate |
| Velocity vs. acceleration | both may be vectors | first vs. second time derivative of position |
| Average vs. instantaneous | describe the same quantity family | finite interval ratio vs. limiting derivative |

## Diagnostic examples

- Returning to the starting point gives zero displacement but positive distance
  if a path was traveled.
- Equal speeds in opposite directions give different velocities.
- Turning at constant speed still produces acceleration because velocity
  direction changes.
- Negative acceleration can speed up an object moving in the negative
  direction.

## Formula view

The linked [Kinematics Formula Table](../formulas/kinematics-motion-measures.md)
contains average, instantaneous, and constant-acceleration relations.

## Reference Delta

| Reference form | Typical contribution | Factorium delta |
|---|---|---|
| Dictionary | Defines motion terms and records ordinary usage | Separates technical senses by path, endpoints, vector kind, and derivative order |
| Thesaurus | Groups near words such as speed, pace, motion, movement, and acceleration | Prevents lexical proximity from creating technical equivalence |
| Encyclopedia or textbook | Explains kinematics with graphs, calculus, examples, and derivations | Provides a compact contrast table, selection schema, assumptions, and failure signs |
| Formula sheet | Lists rate and constant-acceleration equations | Adds reference frame, evidence type, vector status, and regime selection |
| NIST/SI reference | Owns metre and second unit definitions | Connects authoritative units to `L`, `L T^-1`, and `L T^-2` quantities |

## Constraints and failure signs

- All compared positions use one declared reference frame.
- Elapsed time is positive for average-rate division.
- Distance cannot be negative, while signed displacement components can be.
- Instantaneous speed is the magnitude of velocity, not generally the
  magnitude of average velocity.
- Acceleration can result from direction change with constant speed.
- Constant-acceleration formulas require constant acceleration over the
  interval.

## Cross-references

- [Force](force.md)
- [Matter and Load Measure](matter-load-measure.md)
- [Work, Energy, and Power](work-energy-power.md)
- [Comparative Quantity](comparative-quantity.md)
- [Periodic and Wave Quantity](periodic-wave-quantity.md)
- [Time](../roots/time.md)
- [Transformation](../roots/transformation.md)
- path — `unresolved-candidate`
- frame of reference — `unresolved-candidate`

## Sources and provenance

1. OpenStax, *University Physics Volume 1*, sections 3.1 through 3.3:
   https://openstax.org/books/university-physics-volume-1/pages/3-1-position-displacement-and-average-velocity
   https://openstax.org/books/university-physics-volume-1/pages/3-2-instantaneous-velocity-and-speed
   https://openstax.org/books/university-physics-volume-1/pages/3-3-average-and-instantaneous-acceleration
2. NIST, "SI Units - Length" and "SI Units - Time":
   https://www.nist.gov/pml/owm/si-units-length
   https://www.nist.gov/pml/owm/si-units-time

Comparator access date: 2026-08-14. Physics distinctions are established
within source scope; Factorium organization remains `candidate`.

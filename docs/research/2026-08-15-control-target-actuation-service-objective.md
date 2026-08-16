# Control Target, Actuation, and Service Objective Research Note

Date: 2026-08-15
Status: source-grounded candidate synthesis

## Finding

The reusable control structure is:

```text
objective and operating mode
  -> set point for one controlled variable
  -> controller command
  -> actuator influence on the process
  -> observed response and wider outcome
```

A set point is the reference the loop seeks to track, not the broad objective,
an alert threshold, the observed value, or evidence that the objective was met.
An actuator accepts a command and converts it into physical or logical action;
command receipt alone does not establish that the process was influenced.

The reusable service-performance structure is:

```text
service and eligible population
  -> service-level indicator definition and measurement
  -> target plus compliance window
  -> SLO status and error-budget policy
  -> separately governed agreement and wider user outcomes
```

An SLO therefore requires an SLI, a target, and a period. It is not the
observed service level, an alert threshold, an SLA, or proof of every user
outcome. Named controller families, actuator types, monitoring products, and
service commitments remain examples or scoped authorities rather than
canonical senses.

## Sources

1. NIST, controlled variable: https://csrc.nist.gov/glossary/term/controlled_variable
2. NIST, process controllers: https://www.nist.gov/ncnr/nice-help/devices/process-controllers-temperature-pressure-etc
3. NIST, actuator definition: https://www.nist.gov/el/intelligent-systems-division-73500/definitions
4. NIST SP 800-82 Rev. 3: https://csrc.nist.gov/pubs/sp/800/82/r3/final
5. Google SRE, *Service Level Objectives*: https://sre.google/sre-book/service-level-objectives/
6. Google Cloud, service-monitoring concepts: https://docs.cloud.google.com/stackdriver/docs/solutions/slo-monitoring
7. Google Cloud Monitoring API, ServiceLevelObjective: https://docs.cloud.google.com/monitoring/api/ref_v3/rest/v3/services.serviceLevelObjectives

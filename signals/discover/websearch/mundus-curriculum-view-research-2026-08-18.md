# MUNDUS Curriculum View Research

Date: 2026-08-18

Status: established-source gate passed for two candidate view designs; no
Factor Table admission

## Question A

Which distinctions must an Optimization Problem Structure view preserve so a
mathematical result is not mistaken for a substantive recommendation or
authorized decision?

## Optimization findings

1. Boyd and Vandenberghe's official Stanford book site provides the stable
   source identity for *Convex Optimization* and its course materials:
   <https://stanford.edu/~boyd/cvxbook/>.
2. Stanford EE364A Lecture 5 distinguishes feasibility, local and global
   optima, optimality criteria, equivalent problems, and problem families:
   <https://see.stanford.edu/Course/EE364A/78>.
3. Stanford EE364A Lecture 9 separately treats optimality conditions,
   complementary slackness, sensitivity, duality, reformulation, new
   variables, and implicit constraints:
   <https://see.stanford.edu/Course/EE364A/83>.
4. IBM's optimization glossary makes the decisive feasible-versus-optimal
   contrast explicit: a feasible assignment satisfies constraints without
   necessarily satisfying the objective:
   <https://www.ibm.com/docs/en/icos/22.1.2?topic=appendixes-glossary>.
5. IBM's decision-variable documentation records that decision variables are
   unknown model quantities with declared domains and constraints; they are
   not ordinary program variables or automatically authorized actions:
   <https://www.ibm.com/docs/en/icos/22.1.2?topic=model-decision-variables>.

These sources support one structural contract: question and application
boundary; variables and domains; parameters/data; objective and direction;
constraints and feasible set; candidate solution; optimality claim and
certificate/tolerance; algorithm/run status; perturbation and sensitivity; and
translation back to a recommendation or decision. Named solver families,
convex subclasses, and algorithms remain examples.

## Question B

Which distinctions must a Prototype, Test, and Iteration Procedure preserve so
an internal artifact, user session, standards check, and production decision
are not collapsed?

## Prototype and iteration findings

1. ISO 9241-210:2019 is the current published human-centred-design standard
   identity. Only its official abstract/metadata is used here; the copyrighted
   standard body is not copied:
   <https://www.iso.org/standard/77520.html>.
2. NIST's official HCD summary separates understanding context of use,
   specifying requirements, producing designs, and evaluating them; it also
   states that the process is iterative and user-centred evaluation refines
   design:
   <https://www.nist.gov/itl/iad/human-centered-technologies/human-factors-human-centered-design>.
3. ISO 9241-11:2018 describes usability as an outcome of use and explicitly
   does not prescribe a particular design or evaluation process. This prevents
   usability from being treated as a method name or artifact property without
   users, goals, and context:
   <https://www.iso.org/standard/63500.html>.
4. W3C WAI distinguishes evaluation with users from standards conformance,
   varies evaluation by project stage, and warns against generalizing from a
   small or narrow participant set:
   <https://www.w3.org/WAI/test-evaluate/involving-users/>.
5. GOV.UK distinguishes prototype fidelity and purpose from production
   readiness: paper and code prototypes answer different questions, and
   prototype code must not be assumed secure, scalable, or production quality:
   <https://www.gov.uk/service-manual/design/making-prototypes>.
6. GOV.UK moderated-testing guidance requires a declared research question,
   participant type, prototype scope, neutral task, observation process, and
   data handling; it explicitly says the service rather than the participant is
   being tested:
   <https://www.gov.uk/service-manual/user-research/using-moderated-usability-testing>.

These sources support a bounded procedure contract: learning question or risky
assumption; prototype identity/version and fidelity; target users, goals,
tasks, and context; evaluation method and participant boundary; criteria and
standards; observations and evidence custody; findings and limitations; change
decision; next version; and stop/escalation rule. User evaluation, standards
conformance, verification, validation, experiment, pilot, simulation, and
production readiness remain distinct.

## Contrary and limiting evidence

- Convex-optimization sources establish a powerful subclass; they do not make
  every real-world choice convex or mathematically optimizable.
- Vendor optimization documentation supplies useful concrete distinctions but
  cannot define the universal view or its solver taxonomy.
- NIST labels its HCD page as no longer updated, so it is used as an official
  explanatory summary alongside current ISO identities, not as the sole
  authority.
- User sessions cannot establish accessibility conformance or generalize to
  every user; standards checks cannot replace observation of real use.
- A successful prototype test does not establish production security,
  performance, reliability, market demand, or outcome effectiveness.

## Decision

Both questions pass established-source research for candidate design as
no-new-anchor views. Neither passes canonical admission merely from this
research. Each still requires a fixed owner, enumeration stop, invalid
fixtures, role review, and repository admission checks.

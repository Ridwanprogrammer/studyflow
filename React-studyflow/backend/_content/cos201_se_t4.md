# Requirements Engineering

## Find the real problem before building a solution

If a student says, “I need an app,” that describes a possible solution, not necessarily the problem. Perhaps they need a reliable way to see deadlines; perhaps the real issue is that course announcements are scattered. Building the wrong solution efficiently still fails the user.

**Requirements engineering** is the work of discovering, analyzing, documenting, validating, and managing what a system must do and the qualities it must have.

## Functional requirements describe behaviour

A **functional requirement** states a service or response the system must provide. For example: “When a student selects a course, the system shall display its current topics.” A good requirement names the trigger, expected behaviour, and relevant conditions.

Functional requirements can be expressed as use cases, user stories, or detailed statements. A user story might say: “As a student, I want to see upcoming deadlines so I can plan my study time.” The story explains who needs the capability and why; acceptance criteria make completion testable.

## Non-functional requirements describe quality

A **non-functional requirement** constrains or describes qualities such as performance, security, availability, usability, accessibility, and maintainability. For example: “For 95% of requests, the course list shall load within two seconds under the expected peak load.”

“The system should be fast” is too vague to verify. State a measurable condition, context, and threshold where possible. Quality goals can conflict: stronger security may add interaction steps; higher availability may increase cost.

## Elicit requirements from the people affected

**Elicitation** means drawing out information from stakeholders. Techniques include interviews, observation, workshops, surveys, document analysis, and prototypes. Each reveals different things: interviews surface goals, observation shows actual workarounds, and prototypes help people react to concrete examples.

Stakeholders include users, customers, operators, regulators, and anyone affected by the system. Their goals may conflict, so recording only the loudest request can miss important needs.

## Analyze, validate, and manage change

Analysis checks whether requirements are feasible, consistent, prioritized, and complete enough to guide design. Validation asks whether they describe the system people actually need. Reviews, scenarios, acceptance tests, and prototypes can expose misunderstandings early.

Requirements change as users learn and the environment changes. **Requirements management** records versions, decisions, dependencies, and change impact. It does not mean refusing change; it means understanding its consequences before committing to it.

### Turn a vague request into a testable requirement

Vague: “Students can quickly find a topic.”

Clarify who searches, what fields can be searched, what results look like, and how speed is measured. A testable version might be: “When an authenticated student submits a course code or topic title, the system shall show matching accessible topics; under the expected course catalog and load, 95% of searches shall return within two seconds.”

The details should come from stakeholder needs, not invented assumptions. The example shows the questions that make a requirement verifiable.

**Practice:** Rewrite “the app is secure” into one specific requirement. State the protected action, the threat or condition, and the observable expected behaviour.

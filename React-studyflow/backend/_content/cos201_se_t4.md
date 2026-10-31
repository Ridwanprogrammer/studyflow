# COS 201 Track A: Software Engineering Theory — Topic 4
# Requirements Engineering

## The Central Idea

**Requirements Engineering (RE)** is the process of discovering, documenting, and maintaining what a software system must do. It's the foundation — if requirements are wrong, the software will be wrong no matter how well it's coded.

> "The hardest single part of building a software system is deciding precisely what to build." — Fred Brooks

---

## Why It Matters — Past Exam Coverage

| Past Exam Question | This Topic Covers |
|--------------------|-------------------|
| Often asked implicitly in SE exams | Requirements types, SRS, elicitation |

---

## Section 1 — Types of Requirements

### Functional Requirements
What the system **must do**.
- "The system shall allow users to send messages"
- "The system shall calculate CGPA from grades"
- Input → Processing → Output

### Non-Functional Requirements (Quality Attributes)
How the system **must be**.
- **Performance:** "Response time < 200ms"
- **Security:** "All data encrypted at rest"
- **Usability:** "New user can send message in < 3 clicks"
- **Reliability:** "99.9% uptime"
- **Maintainability:** "Code coverage > 80%"

### Domain Requirements
From the application domain (e.g., banking regulations, medical standards).

---

## Section 2 — Requirements Engineering Process

```
Elicitation → Analysis → Specification → Validation → Management
     ▲                                                          │
     └──────────────────────────────────────────────────────────┘
                    (Iterative, with feedback)
```

### 1. Elicitation — "Discovering"
Techniques:
- **Interviews** — stakeholders, users
- **Workshops** — group sessions
- **Observation** — watch current work
- **Document analysis** — existing manuals, reports
- **Prototyping** — mockups to clarify needs
- **Questionnaires** — large user base

### 2. Analysis — "Understanding"
- **Categorize** (functional/non-functional, priority)
- **Model** (use cases, user stories, data flow)
- **Detect conflicts** — ambiguous, contradictory, impossible

### 3. Specification — "Documenting"
**Software Requirements Specification (SRS)** — the contract.

**IEEE 830 SRS Structure:**
1. Introduction (purpose, scope, definitions)
2. Overall description (product perspective, user characteristics, constraints)
3. Specific requirements (functional, non-functional, interfaces)
4. Appendices

### 4. Validation — "Checking"
- **Reviews** — walkthroughs, inspections
- **Prototypes** — executable models
- **Test cases** — derive from requirements
- **Customer sign-off**

### 5. Management — "Controlling Changes"
- **Traceability** — link req → design → code → test
- **Version control** — baseline, change requests
- **Impact analysis** — what breaks if this changes?

---

## Section 3 — Use Cases & User Stories

### Use Case (UML)

**Actors** (external entities) → **Use Cases** (goals)

```
┌─────────┐
│ Student │
└────┬────┘
     │
     ▼
┌───────────────┐
│ Register for  │
│   Courses     │
└───────────────┘
```

**Use Case Description:**
- **Name:** Register for Courses
- **Actor:** Student
- **Precondition:** Student logged in, registration open
- **Main Flow:** 1. Select term → 2. Browse courses → 3. Add to cart → 4. Submit → 5. Confirm
- **Alternate Flow:** Course full → waitlist option
- **Postcondition:** Enrollment recorded, confirmation sent

### User Story (Agile)

**Format:** As a \<role\>, I want \<goal\>, so that \<benefit\>.

> "As a **Student**, I want to **register for courses online**, so that **I don't have to queue at the admin office**."

**INVEST Criteria:**
- **I**ndependent
- **N**egotiable
- **V**aluable
- **E**stimable
- **S**mall
- **T**estable

---

## Section 5 — Requirements Quality (What Makes Good Requirements)

| Attribute | Check |
|-----------|-------|
| **Correct** | Accurately reflects stakeholder need |
| **Unambiguous** | Only one interpretation |
| **Complete** | Nothing missing |
| **Consistent** | No conflicts with other reqs |
| **Verifiable** | Can be tested (pass/fail) |
| **Feasible** | Technically & economically possible |
| **Necessary** | Truly needed, not gold-plating |
| **Prioritized** | MoSCoW: Must, Should, Could, Won't |
| **Traceable** | Linked to source & downstream artifacts |

---

## Section 6 — Common Problems

| Problem | Symptom | Solution |
|---------|---------|----------|
| **Scope creep** | Features keep growing | Change control, prioritization |
| **Gold-plating** | Devs add "cool" features | Strict scope, MVP focus |
| **Ambiguity** | "Fast", "user-friendly" | Quantify: "<200ms", "3 clicks" |
| **Conflict** | "Secure" vs "Usable" | Negotiate, document trade-offs |
| **Volatility** | Requirements keep changing | Agile, iterative, baseline |

---

## Section 7 — Conceptual Model

**Requirements = The "What", Not the "How"**

- **Requirements** = Destination (where we're going)
- **Design** = Route (how we get there)
- **Code** = Vehicle (what carries us)

**Mental Hook:** "If you don't know where you're going, any road will take you there." — Lewis Carroll (via Cheshire Cat)

---

## Section 8 — Self-Check Questions

1. Difference between functional and non-functional requirements?
2. What does SRS stand for?
3. Name 4 elicitation techniques.
4. What is a use case?
5. What is the INVEST acronym for user stories?
4. What does "verifiable" mean for a requirement?
5. What is MoSCoW prioritization?

---

## Solutions

1. Functional = what system does. Non-functional = how system behaves (quality).
2. Software Requirements Specification.
3. Interviews, workshops, observation, document analysis, prototyping, questionnaires.
4. A goal an actor achieves using the system; describes interactions.
5. Independent, Negotiable, Valuable, Estimable, Small, Testable.
6. Can write a test that passes/fails objectively (e.g., "response < 200ms").
7. Must have, Should have, Could have, Won't have (this release).

---

## Glossary Terms

[[requirements-engineering]], [[functional-requirement]], [[non-functional-requirement]], [[quality-attribute]], [[srs]], [[software-requirements-specification]], [[elicitation]], [[analysis]], [[specification]], [[validation]], [[management]], [[use-case]], [[actor]], [[user-story]], [[invest]], [[moscow]], [[traceability]], [[scope-creep]], [[gold-plating]], [[ambiguity]], [[verifiability]], [[feasibility]], [[prototype]], [[baseline]], [[change-control]], [[ieee-830]], [[acceptance-criteria]]
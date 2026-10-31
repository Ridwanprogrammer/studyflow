# COS 201 Track A: Software Engineering Theory — Topic 2
# Software Process Models

## The Central Idea

A **software process model** is an abstract representation of the sequence of activities for building software. No single model fits all projects — the choice depends on requirements stability, team size, risk, and organizational culture.

---

## Why It Matters — Past Exam Coverage

| Past Exam Question | This Topic Covers |
|--------------------|-------------------|
| "List and explain the three types of class relationships in UML" | UML (Topic 3), but process models often asked |
| "With aid of diagram, list and explain three types of class relationships in UML" | UML relationships |

---

## Section 1 — What is a Process Model?

**Definition:** A framework describing the phases, activities, and workflows for software development.

**Purpose:**
- Provides structure and predictability
- Enables planning, tracking, and management
- Defines deliverables and milestones
- Supports quality assurance

---

## Section 2 — Prescriptive vs. Agile

| Prescriptive (Plan-Driven) | Agile (Adaptive) |
|----------------------------|------------------|
| Requirements fixed upfront | Requirements evolve |
| Detailed planning early | Incremental planning |
| Documentation heavy | Working software over docs |
| Change controlled | Change embraced |
| Examples: Waterfall, V-Model, Spiral | Examples: Scrum, XP, Kanban |

---

## Section 3 — Waterfall Model (Classic)

### Phases (Sequential)

```
Requirements → Design → Implementation → Verification → Maintenance
     ↓            ↓           ↓              ↓             ↓
  SRS Doc    Design Doc   Source Code    Test Cases    Updates
```

### Characteristics

- **Linear, sequential** — each phase completes before next starts
- **Document-driven** — heavy documentation at each stage
- **Milestone-based** — reviews at phase boundaries
- **Best for:** Well-understood requirements, stable domain, regulated environments

### Advantages

- Simple, easy to understand
- Clear milestones and deliverables
- Good for contractual projects
- Discipline enforced

### Disadvantages

- **No working software until late** — high risk
- **Inflexible** — changes expensive after requirements phase
- **Assumes perfect requirements** — rarely true
- **Poor for large, complex systems**

---

## Section 4 — V-Model (Verification & Validation)

### Structure

```
Requirements ──────────────────────────────────► Acceptance Testing
     │                                                   ▲
     ▼                                                   │
System Design ──────────────────────────────► System Testing
     │                                                   ▲
     ▼                                                   │
Architectural Design ─────────────────────► Integration Testing
     │                                                   ▲
     ▼                                                   │
Module Design ───────────────────────────► Unit Testing
     │                                                   ▲
     ▼                                                   │
Coding ◄─────────────────────────────────────────────────┘
```

**Left side:** Verification (building right product)
**Right side:** Validation (built product right)

### Key Idea

Each development phase has a corresponding test phase. Testing planned early.

---

## Section 5 — Incremental & Iterative Models

### Incremental Model

Build system in **increments** (subsets of functionality).
- Each increment = working subset
- First increment = core features
- Later increments add features

**Example:** WhatsApp v1: text only → v2: voice → v3: video → v4: payments

### Iterative Model

Refine **whole system** through repeated cycles.
- Each iteration = full cycle (req → design → code → test)
- Each iteration improves quality/functionality

### Spiral Model (Boehm, 1986) — Risk-Driven

```
        ┌─────────────────┐
        │  Determine      │
        │  Objectives     │
        └────────┬────────┘
                 ▼
        ┌─────────────────┐
        │  Identify &     │
        │  Resolve Risks  │
        └────────┬────────┘
                 ▼
        ┌─────────────────┐
        │  Develop &      │
        │  Test           │
        └────────┬────────┘
                 ▼
        ┌─────────────────┐
        │  Plan Next      │
        │  Iteration      │
        └─────────────────┘
```

**Four Quadrants per Cycle:**
1. **Objective Setting** — What to do?
2. **Risk Assessment** — What can go wrong? Prototype high-risk parts.
3. **Development & Test** — Build based on risk.
4. **Planning** — Next cycle or finish.

**Best for:** Large, high-risk, mission-critical systems.

---

## Section 6 — Agile Models

### Agile Manifesto (2001)

| Value | Over |
|-------|------|
| Individuals & interactions | Processes & tools |
| Working software | Comprehensive documentation |
| Customer collaboration | Contract negotiation |
| Responding to change | Following a plan |

### Scrum (Most Popular Agile)

**Roles:**
- **Product Owner** — owns backlog, prioritizes
- **Scrum Master** — facilitates, removes blockers
- **Development Team** — self-organizing, cross-functional

**Artifacts:**
- **Product Backlog** — prioritized features
- **Sprint Backlog** — committed work for sprint
- **Increment** — potentially shippable product

**Events (Time-boxed):**
- **Sprint** (2-4 weeks) — fixed duration
- **Sprint Planning** — what + how
- **Daily Scrum** (15 min) — sync
- **Sprint Review** — demo to stakeholders
- **Sprint Retrospective** — improve process

### Extreme Programming (XP)

**Practices:**
- Pair programming
- Test-Driven Development (TDD)
- Continuous integration
- Small releases
- Simple design
- Refactoring

---

## Section 7 — DevOps (Modern Evolution)

**DevOps = Development + Operations**

**Goal:** Shorten cycle time from code commit to production.

**Key Practices:**
- **CI/CD** — Continuous Integration / Continuous Deployment
- **Infrastructure as Code** — provision via scripts
- **Monitoring & Logging** — observability
- **Automation** — build, test, deploy, rollback

**Pipeline:**
```
Code → Build → Test → Staging → Deploy → Monitor
  ↑_____________________________________________|
              (Feedback loops)
```

---

## Section 8 — Choosing a Model

| Situation | Recommended Model |
|-----------|-------------------|
| Requirements fixed, well-known | Waterfall / V-Model |
| Requirements evolving, user feedback needed | Scrum / Agile |
| High risk, large, novel tech | Spiral |
| Need early working product | Incremental |
| Small team, rapid delivery | XP / Kanban |
| Regulated (medical, aviation) | Waterfall / V-Model + rigorous docs |
| Cloud/SaaS, frequent releases | DevOps + Agile |

---

## Section 9 — Conceptual Model

**Process Model = Map for the Journey**

- **Waterfall** = Highway: fast if straight, disastrous if wrong turn
- **Spiral** = Mountain climbing: careful, check ropes (risks) each step
- **Agile** = Hiking with GPS: adjust path as you learn terrain
- **DevOps** = Conveyor belt: automated, continuous flow

---

## Section 10 — Self-Check Questions

1. What are the 5 phases of the Waterfall model?
2. What is the key difference between Verification and Validation?
3. In V-Model, what test phase corresponds to Architectural Design?
4. What are the 4 quadrants of the Spiral Model?
5. Name 3 Agile Manifesto values.
6. What are the 3 Scrum roles?
7. What is a Sprint?
8. What does CI/CD stand for?

---

## Solutions

1. Requirements, Design, Implementation, Verification, Maintenance
2. Verification: "Are we building the product right?" (meets spec). Validation: "Are we building the right product?" (meets user needs).
3. Integration Testing
4. Objective setting, Risk assessment, Development & test, Planning
5. Individuals/interactions over processes/tools; Working software over docs; Customer collaboration over contract; Responding to change over plan.
6. Product Owner, Scrum Master, Development Team
7. Time-boxed iteration (2-4 weeks) producing potentially shippable increment.
8. Continuous Integration / Continuous Deployment (or Delivery)

---

## Glossary Terms

[[process-model]], [[waterfall-model]], [[v-model]], [[incremental-model]], [[iterative-model]], [[spiral-model]], [[boehm]], [[risk-driven]], [[agile]], [[agile-manifesto]], [[scrum]], [[product-owner]], [[scrum-master]], [[sprint]], [[sprint-backlog]], [[product-backlog]], [[daily-scrum]], [[sprint-review]], [[retrospective]], [[extreme-programming]], [[xp]], [[pair-programming]], [[tdd]], [[test-driven-development]], [[continuous-integration]], [[continuous-deployment]], [[ci-cd]], [[devops]], [[infrastructure-as-code]], [[pipeline]], [[verification]], [[validation]], [[acceptance-testing]], [[system-testing]], [[integration-testing]], [[unit-testing]]
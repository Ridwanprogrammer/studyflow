# COS 201 Track A: Software Engineering Theory — Topic 6
# Software Testing & Quality Assurance

## The Central Idea

**Testing** reveals the presence of defects, not their absence. **Quality Assurance (QA)** is the process of preventing defects through standards, reviews, and process improvement. Together, they ensure software meets requirements and user expectations.

---

## Why It Matters — Past Exam Coverage

| Past Exam Question | This Topic Covers |
|--------------------|-------------------|
| "Testing & QA: unit, integration, system, acceptance" | Testing levels |
| "Black/white box, TDD, mock" | Testing techniques |

---

## Section 1 — Testing Fundamentals

### Definitions

| Term | Definition |
|------|------------|
| **Error** | Human mistake (typo, misunderstanding) |
| **Defect/Bug** | Error in code (manifestation of error) |
| **Failure** | Observable incorrect behavior (defect executes) |
| **Test Case** | Inputs, preconditions, expected outputs |
| **Test Suite** | Collection of test cases |
| **Test Oracle** | Mechanism to determine pass/fail |

### Testing Principles

1. **Testing shows presence, not absence** of defects
2. **Exhaustive testing impossible** — infinite inputs
3. **Early testing** — cheaper to fix early
4. **Defect clustering** — 80% defects in 20% modules
5. **Pesticide paradox** — same tests stop finding new bugs
6. **Testing is context-dependent** — medical vs game
7. **Absence-of-errors fallacy** — bug-free ≠ useful

---

## Section 2 — Testing Levels (V-Model)

| Level | Scope | Who | When |
|-------|-------|-----|------|
| **Unit** | Single function/class | Developer | During coding |
| **Integration** | Module interactions | Developer/QA | After unit |
| **System** | Complete system | QA | After integration |
| **Acceptance** | User requirements | Customer/User | Before delivery |

### Unit Testing
- Test individual functions/methods in isolation
- **Mock** external dependencies (DB, API, time)
- **Fast, deterministic, isolated**
- Tools: JUnit, Mockito, pytest, Jest

### Integration Testing
- Test module interactions
- **Approaches:**
  - **Big Bang** — all at once (hard to debug)
  - **Top-Down** — stub lower modules
  - **Bottom-Up** — drivers for lower modules
  - **Sandwich** — hybrid

### System Testing
- **End-to-end** — full workflows
- **Non-functional:** Performance, security, usability
- **Environment:** Production-like

### Acceptance Testing
- **Alpha** — internal users
- **Beta** — real users in real environment
- **UAT (User Acceptance Testing)** — customer signs off

---

## Section 3 — Testing Techniques

### Black-Box (Specification-Based)
Test **without** seeing code. Based on requirements.

| Technique | Description |
|-----------|-------------|
| **Equivalence Partitioning** | Divide inputs into valid/invalid classes; test one per class |
| **Boundary Value Analysis** | Test edges (min, max, min-1, max+1) |
| **Decision Table** | Input combinations → expected outputs |
| **State Transition** | Valid/invalid state transitions |
| **Use Case Testing** | End-to-end scenarios |

**Example: Age Input (18-65)**
- Valid partition: 18-65 → test 30
- Invalid low: <18 → test 17, 0, -1
- Invalid high: >65 → test 66, 100
- Boundaries: 17, 18, 19, 64, 65, 66

---

### White-Box (Structure-Based)
Test **with** code visibility.

| Technique | Coverage Target |
|-----------|-----------------|
| **Statement** | Every line executed |
| **Branch/Decision** | Every true/false branch |
| **Path** | Every possible path |
| **Condition** | Every boolean sub-expression |
| **MC/DC** | Modified Condition/Decision (avionics) |

**Example:**
```java
if (age >= 18 && hasLicense) { ... }
```
- Statement: run once with both true
- Branch: 4 combos (TT, TF, FT, FF)
- Path: 2 paths (if taken, if not)

---

### Experience-Based
- **Error Guessing** — "What would break?" (null, empty, overflow)
- **Exploratory Testing** — simultaneous learning, design, execution
- **Checklist-Based** — common defects list

---

## Section 4 — Test-Driven Development (TDD)

### Red-Green-Refactor Cycle

```
RED:   Write failing test  ──►
GREEN: Write minimal code to pass ──►
REFACTOR: Improve code (tests still pass)
   ▲______________________________|
```

### TDD Rules
1. **No production code** without failing test
2. **Write only enough** test to fail
3. **Write only enough** code to pass
4. **Refactor** with tests green

### Benefits
- Living documentation
- Regression safety net
- Designs for testability (loose coupling)
- Confidence to refactor

---

## Section 5 — Test Doubles (Mocks, Stubs, Fakes)

| Double | Behavior | Use Case |
|--------|----------|----------|
| **Dummy** | Passed around, never used | Fill parameter list |
| **Stub** | Returns canned responses | Simulate DB/API |
| **Spy** | Records calls for verification | Verify interactions |
| **Mock** | Pre-programmed expectations | Behavior verification |
| **Fake** | Working but simplified impl | In-memory DB for tests |

**Example (Mockito):**
```java
@Mock UserRepository repo;
@InjectMocks UserService service;

@Test void testFindUser() {
    when(repo.findById(1)).thenReturn(new User("Alice"));
    User u = service.getUser(1);
    assertEquals("Alice", u.getName());
    verify(repo).findById(1);
}
```

---

## Section 6 — Test Quality Metrics

| Metric | Meaning | Target |
|--------|---------|--------|
| **Code Coverage** | % code exercised by tests | >80% (line), >70% (branch) |
| **Mutation Score** | % mutants killed by tests | >80% |
| **Defect Density** | Defects/KLOC | Decreasing trend |
| **Test Execution Time** | Fast feedback | Unit < 10 min total |
| **Flaky Rate** | % tests non-deterministic | 0% |

---

## Section 7 — Quality Assurance (Process)

### QA vs QC
| QA (Prevention) | QC (Detection) |
|-----------------|----------------|
| Process-oriented | Product-oriented |
| Prevent defects | Find defects |
| Standards, reviews, training | Testing, inspections |
| "Do it right first time" | "Check the result" |

### Static Analysis
- **Code Reviews** — human inspection
- **Static Analysis Tools** — SonarQube, Checkstyle, ESLint
- **Formal Inspections** — structured, roles (moderator, reader, recorder)

### Continuous Integration (CI)
- Automated build + test on every commit
- Fast feedback (<10 min)
- Quality gates (coverage, static analysis, no failures)

---

## Section 8 — Conceptual Model

**Testing = Scientific Method for Software**

| Science | Testing |
|---------|---------|
| Hypothesis | "This function works" |
| Experiment | Run test case |
| Observation | Pass/Fail |
| Theory | "Module is correct" |
| Peer Review | Code review |

**Mental Hook:** "If you don't test it, it doesn't work. If you do test it, it might work."

---

## Section 9 — Self-Check Questions

1. Difference between error, defect, failure?
2. What are the 4 testing levels in V-Model?
3. What is equivalence partitioning?
4. What boundary values for age 18-65?
5. What is TDD cycle?
6. Difference between stub and mock?
7. What is code coverage?
8. QA vs QC?

---

## Solutions

1. Error = mistake; Defect = bug in code; Failure = observable wrong behavior
2. Unit, Integration, System, Acceptance
3. Divide inputs into classes where behavior should be same; test one per class
4. 17, 18, 19, 64, 65, 66
5. Red (fail) → Green (pass) → Refactor
6. Stub = canned response; Mock = verifies interactions
7. % of code executed by tests
8. QA = prevention (process); QC = detection (testing)

---

## Glossary Terms

[[testing]], [[unit-testing]], [[integration-testing]], [[system-testing]], [[acceptance-testing]], [[uat]], [[black-box]], [[white-box]], [[gray-box]], [[equivalence-partitioning]], [[boundary-value-analysis]], [[decision-table]], [[state-transition]], [[statement-coverage]], [[branch-coverage]], [[path-coverage]], [[mc-dc]], [[mutation-testing]], [[tdd]], [[test-driven-development]], [[red-green-refactor]], [[test-double]], [[dummy]], [[stub]], [[spy]], [[mock]], [[fake]], [[mockito]], [[junit]], [[code-coverage]], [[mutation-score]], [[defect-density]], [[flaky-test]], [[qa]], [[qc]], [[quality-assurance]], [[quality-control]], [[static-analysis]], [[code-review]], [[inspection]], [[continuous-integration]], [[ci]], [[quality-gate]]
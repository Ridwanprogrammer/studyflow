# COS 201 Track A: Software Engineering Theory — Topic 1
# Software Crisis, NATO 1968 & The Birth of Software Engineering

## The Central Idea

**Software Engineering** was born from a crisis. In the 1960s, software projects were routinely late, over budget, and unreliable. The 1968 NATO Software Engineering Conference in Garmisch, Germany, coined the term "Software Engineering" and established it as a discipline applying engineering principles to software development.

This topic covers the history, the crisis, and what Software Engineering actually *is* — not just programming, but a systematic approach to building reliable software systems.

---

## Why It Matters — Past Exam Coverage

| Past Exam Question | This Topic Covers |
|--------------------|-------------------|
| "What was the brain behind NATO Software Engineering Conference in 1968 and explicitly explain the concept behind Software Engineering?" | NATO 1968, software crisis, SE definition |
| "Characteristics of good software with WhatsApp example" | Software quality attributes |

---

## Section 1 — The Software Crisis (1960s)

### What Was Happening?

| Symptom | Example |
|---------|---------|
| **Projects late** | OS/360 at IBM — years behind schedule |
| **Over budget** | Typical overruns 200-500% |
| **Unreliable** | Systems crashed frequently, hard to maintain |
| **Unmaintainable** | "Spaghetti code" — changes broke unrelated parts |
| **No standards** | Every project invented its own process |

### Famous Quote

> "The major cause of the software crisis is that the machines have become several orders of magnitude more powerful. To put it quite bluntly: as long as there were no machines, programming was no problem at all; when we had a few weak computers, programming became a mild problem, and now we have gigantic computers, programming has become an equally gigantic problem." — **Edsger Dijkstra, 1972**

---

## Section 2 — NATO 1968 Conference (Garmisch, Germany)

### Key Facts

- **Date:** October 7-11, 1968
- **Location:** Garmisch-Partenkirchen, Germany
- **Sponsored by:** NATO Science Committee
- **Chair:** Friedrich L. Bauer
- **Participants:** ~50 leading computer scientists (Dijkstra, Naur, Floyd, Parnas, etc.)

### The "Brain" Behind It

**Friedrich L. Bauer** (German computer scientist) proposed the conference. **Peter Naur** (Danish, later Turing Award) edited the report.

The conference **coined the term "Software Engineering"** deliberately to imply:
- Software development should be based on **engineering principles**
- Not just "coding" or "hacking"
- Requires **systematic, disciplined, quantifiable approaches**

### Conference Report (1969)

The report defined Software Engineering as:

> **"The establishment and use of sound engineering principles in order to obtain economically software that is reliable and works efficiently on real machines."** — Fritz Bauer

---

## Section 3 — What is Software Engineering?

### IEEE Definition

> **Software Engineering:** "The application of a systematic, disciplined, quantifiable approach to the development, operation, and maintenance of software." — IEEE Std 610.12

### Three Key Pillars

| Pillar | Meaning |
|--------|---------|
| **Systematic** | Follow a defined process, not ad-hoc |
| **Disciplined** | Rigor, standards, reviews, testing |
| **Quantifiable** | Metrics, measurement, estimation |

### Software Engineering vs. Programming

| Programming | Software Engineering |
|-------------|---------------------|
| Write code | Build systems |
| Individual | Team-based |
| Ad-hoc | Process-driven |
| "Does it run?" | "Does it meet requirements? Is it maintainable? Scalable? Testable?" |
| Short-term | Full lifecycle |

---

## Section 4 — Software Engineering Concepts

### The Software Lifecycle

```
Requirements → Design → Implementation → Testing → Deployment → Maintenance
     ↑_____________________________________________________________________|
                          (Feedback loops at every stage)
```

### Key Principles (From NATO Report & Later)

1. **Modularity** — Divide system into independent modules
2. **Abstraction** — Hide complexity behind interfaces
3. **Information Hiding** — Parnas (1972): modules should hide design decisions
4. **Separation of Concerns** — Dijkstra: focus on one aspect at a time
5. **Verification & Validation** — "Are we building the right product?" (Validation) + "Are we building the product right?" (Verification)

---

## Section 5 — Software Quality Characteristics (McCall/ISO 25010)

### McCall's Quality Model (1977) — Classic Exam Topic

| Factor | Sub-characteristics | What It Means |
|--------|---------------------|---------------|
| **Correctness** | Traceability, Completeness, Consistency | Does it do what spec says? |
| **Reliability** | Maturity, Fault tolerance, Recoverability | Does it run without failure? |
| **Efficiency** | Time behavior, Resource utilization | Fast, memory-efficient? |
| **Integrity** | Security, Access control | Protected from unauthorized access? |
| **Usability** | Understandability, Learnability, Operability | Easy for users? |
| **Maintainability** | Analyzability, Changeability, Stability, Testability | Easy to fix/modify? |
| **Portability** | Adaptability, Installability, Replaceability | Runs on different platforms? |
| **Reusability** | — | Components reusable? |

### ISO/IEC 25010 (Modern Standard)

8 Quality Characteristics:
1. **Functional Suitability** — Functional completeness, correctness, appropriateness
2. **Performance Efficiency** — Time behavior, resource utilization, capacity
3. **Compatibility** — Co-existence, interoperability
4. **Usability** — Appropriateness recognizability, learnability, operability, user error protection, accessibility
5. **Reliability** — Maturity, availability, fault tolerance, recoverability
6. **Security** — Confidentiality, integrity, non-repudiation, accountability, authenticity
7. **Maintainability** — Modularity, reusability, analyzability, modifiability, testability
8. **Portability** — Adaptability, installability, replaceability

---

## Section 6 — WhatsApp Case Study (Exam Example)

> **Past Exam:** "In tabular form, outline the characteristics of a good software giving example with WhatsApp Application."

### Answer Table

| Quality Characteristic | WhatsApp Example |
|------------------------|------------------|
| **Correctness** | Messages delivered exactly as sent; no corruption |
| **Reliability** | 99.9% uptime; works on 2G/3G/4G/WiFi; auto-reconnect |
| **Efficiency** | Low battery drain; small app size (~100MB); fast startup |
| **Integrity/Security** | End-to-end encryption (Signal protocol); 2FA; disappearing messages |
| **Usability** | Simple UI; works for non-tech users; voice notes; status |
| **Maintainability** | Modular architecture; frequent updates; backward compatible |
| **Portability** | iOS, Android, Web, Desktop (Windows/Mac); same account |
| **Reusability** | Shared libraries for crypto, networking, UI components |

---

## Section 7 — Conceptual Model

**Software Engineering = Building Cathedrals, Not Huts**

- **Hut (Programming):** One person, simple tools, quick, temporary
- **Cathedral (SE):** Team, blueprints, foundations, lasts centuries, maintained by generations

**Mental Hook:** NATO 1968 = "Let's build cathedrals with engineering, not huts with guesswork."

---

## Section 8 — Self-Check Questions

1. What year and location was the NATO Software Engineering Conference?
2. Who chaired the conference?
3. Define Software Engineering (IEEE definition).
4. List 3 differences between programming and software engineering.
5. Name McCall's 8 quality factors.
6. For WhatsApp: give one example each of Reliability and Security.
7. What does "quantifiable" mean in SE context?
8. What was the "software crisis"? Give 3 symptoms.

---

## Solutions

1. **1968, Garmisch, Germany**
2. **Friedrich L. Bauer**
3. "The application of a systematic, disciplined, quantifiable approach to the development, operation, and maintenance of software."
4. Programming: individual, ad-hoc, code-focused. SE: team, process-driven, lifecycle-focused.
5. Correctness, Reliability, Efficiency, Integrity, Usability, Maintainability, Portability, Reusability.
6. Reliability: works on poor networks. Security: end-to-end encryption.
7. Using metrics/measurements (effort, defects, size) not gut feeling.
8. Projects late, over budget, unreliable, unmaintainable.

---

## Glossary Terms

[[software-engineering]], [[software-crisis]], [[nato-1968]], [[fritz-bauer]], [[peter-naur]], [[ieee-definition]], [[systematic]], [[disciplined]], [[quantifiable]], [[software-lifecycle]], [[modularity]], [[abstraction]], [[information-hiding]], [[separation-of-concerns]], [[verification]], [[validation]], [[mccall-quality-model]], [[iso-25010]], [[correctness]], [[reliability]], [[efficiency]], [[integrity]], [[usability]], [[maintainability]], [[portability]], [[reusability]], [[functional-suitability]], [[performance-efficiency]], [[compatibility]], [[security]], [[end-to-end-encryption]]
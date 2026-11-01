# COS 201 Track A: Software Engineering Theory — Topic 5
# Design Principles: SOLID, Coupling, Cohesion, GRASP

## The Central Idea

**Good design** isn't about aesthetics — it's about **managing change**. Principles like SOLID, low coupling, high cohesion, and GRASP patterns guide you to create systems that are easy to understand, modify, and extend.

---

## Why It Matters — Past Exam Coverage

| Past Exam Question | This Topic Covers |
|--------------------|-------------------|
| "Design Principles: SOLID, GRASP, coupling/cohesion" | Core SE design theory |
| Often asked as "explain SOLID" or "difference between coupling and cohesion" | |

---

## Section 1 — Coupling & Cohesion (Fundamental)

### Coupling
**Degree of interdependence between modules.**

| Level | Type | Example | Good/Bad |
|-------|------|---------|----------|
| **Low (Good)** | **Data coupling** | Pass simple data (int, String) | ✓ |
| | **Stamp coupling** | Pass data structure, use only part | △ |
| | **Control coupling** | Pass flag to control logic | ✗ |
| **High (Bad)** | **Common coupling** | Shared global data | ✗✗ |
| | **Content coupling** | Directly modify another's internals | ✗✗✗ |

**Goal:** **Low coupling** — modules independent, change in one doesn't ripple.

### Cohesion
**How closely related are responsibilities within a module.**

| Level | Type | Example | Good/Bad |
|-------|------|---------|----------|
| **High (Good)** | **Functional** | Single well-defined task | ✓✓✓ |
| | **Sequential** | Output of one = input to next | ✓✓ |
| | **Communicational** | Operate on same data | ✓ |
| **Low (Bad)** | **Procedural** | Steps in sequence, unrelated | △ |
| | **Temporal** | Done at same time (init) | △ |
| | **Logical** | Similar operations (all I/O) | ✗ |
| | **Coincidental** | Random grouping | ✗✗✗ |

**Goal:** **High cohesion** — each module does ONE thing well.

---

## Section 2 — SOLID Principles

### S — Single Responsibility Principle (SRP)

> **A class should have only one reason to change.**

**Violation:**
```java
class UserManager {
    void saveUser(User u) { /* DB logic */ }
    void sendEmail(User u) { /* Email logic */ }
    void generateReport(User u) { /* Report logic */ }
}
```
Three reasons to change: DB schema, email format, report format.

**Fix:** Separate classes:
```java
class UserRepository { void save(User u) { /* DB */ } }
class EmailService { void send(User u) { /* Email */ } }
class ReportGenerator { void generate(User u) { /* Report */ } }
```

---

### O — Open/Closed Principle (OCP)

> **Open for extension, closed for modification.**

**Violation:**
```java
class PaymentProcessor {
    void process(Payment p) {
        if (p.type == "CREDIT") { /* credit logic */ }
        else if (p.type == "PAYPAL") { /* paypal logic */ }
        // Adding new payment = modify this class
    }
}
```

**Fix:** Polymorphism
```java
interface PaymentStrategy { void process(Payment p); }
class CreditCardStrategy implements PaymentStrategy { ... }
class PayPalStrategy implements PaymentStrategy { ... }

class PaymentProcessor {
    void process(Payment p, PaymentStrategy strategy) {
        strategy.process(p);
    }
}
```

---

### L — Liskov Substitution Principle (LSP)

> **Subtypes must be substitutable for their base types.**

**Violation:** Square extends Rectangle (classic)
```java
class Rectangle {
    void setWidth(int w) { width = w; }
    void setHeight(int h) { height = h; }
}
class Square extends Rectangle {
    void setWidth(int w) { width = height = w; } // Breaks Rectangle contract
    void setHeight(int h) { width = height = h; }
}
```
`Rectangle r = new Square(); r.setWidth(5); r.setHeight(10);` — width becomes 10! Not a rectangle.

**Fix:** Don't model Square as Rectangle. Use composition or separate.

---

### I — Interface Segregation Principle (ISP)

> **Clients should not depend on interfaces they don't use.**

**Violation:**
```java
interface Worker {
    void work();
    void eat();
    void sleep();
}
class Robot implements Worker {
    void work() { ... }
    void eat() { throw new UnsupportedOperationException(); } // Robot doesn't eat!
    void sleep() { throw new UnsupportedOperationException(); }
}
```

**Fix:** Split interfaces
```java
interface Workable { void work(); }
interface Eatable { void eat(); }
interface Sleepable { void sleep(); }

class Human implements Workable, Eatable, Sleepable { ... }
class Robot implements Workable { ... }
```

---

### D — Dependency Inversion Principle (DIP)

> **Depend on abstractions, not concretions.**
> - High-level modules should not depend on low-level modules. Both should depend on abstractions.
> - Abstractions should not depend on details. Details should depend on abstractions.

**Violation:**
```java
class UserService {
    private MySQLDatabase db = new MySQLDatabase(); // Depends on concrete
    void save(User u) { db.save(u); }
}
```

**Fix:**
```java
interface Database { void save(User u); }
class MySQLDatabase implements Database { ... }
class PostgreSQLDatabase implements Database { ... }

class UserService {
    private Database db; // Depends on abstraction
    UserService(Database db) { this.db = db; } // Injected
    void save(User u) { db.save(u); }
}
```

---

## Section 3 — GRASP Patterns (General Responsibility Assignment)

| Pattern | Principle | Example |
|---------|-----------|---------|
| **Information Expert** | Assign responsibility to class with needed info | `Order` calculates total (has items) |
| **Creator** | Class B creates A if B contains/aggregates A | `Order` creates `OrderItem` |
| **Controller** | Delegate system events to non-UI class | `OrderController` handles `placeOrder()` |
| **Low Coupling** | Minimize dependencies | Use interfaces, DI |
| **High Cohesion** | Keep related responsibilities together | `PaymentService` only does payments |
| **Polymorphism** | Vary behavior by type | `PaymentStrategy` |
| **Pure Fabrication** | Create convenience class for low coupling | `PaymentProcessor` (not domain concept) |
| **Indirection** | Use intermediary to decouple | `Mediator` between UI and domain |
| **Protected Variations** | Wrap unstable parts with stable interface | `PaymentGateway` interface |

---

## Section 4 — Design Patterns (GoF — Brief)

### Creational
- **Singleton** — One instance globally
- **Factory Method** — Delegate instantiation to subclass
- **Abstract Factory** — Families of related objects
- **Builder** — Complex object construction
- **Prototype** — Clone existing object

### Structural
- **Adapter** — Convert interface
- **Decorator** — Add behavior dynamically
- **Facade** — Simplify complex subsystem
- **Composite** — Tree structures
- **Proxy** — Placeholder for another object

### Behavioral
- **Strategy** — Interchangeable algorithms
- **Observer** — Publish/subscribe
- **Command** — Encapsulate request as object
- **Template Method** — Skeleton algorithm
- **State** — Change behavior with state

---

## Section 5 — Conceptual Model

**Design Principles = Guardrails for Change**

| Principle | Prevents |
|-----------|----------|
| **SRP** | God classes, tangled changes |
| **OCP** | Fragile base class, modification cascades |
| **LSP** | Broken inheritance hierarchies |
| **ISP** | Fat interfaces, dummy implementations |
| **DIP** | Rigid dependencies, hard to test |
| **Low Coupling** | Ripple effects |
| **High Cohesion** | Scattered logic, hard to find |

---

## Section 6 — Self-Check Questions

1. What does "high cohesion, low coupling" mean?
2. SRP: "A class should have one reason to..." what?
3. OCP: "Open for extension, closed for..." what?
4. LSP: Subtypes must be... what?
5. ISP: Clients should not depend on... what?
6. DIP: High-level modules should not depend on... what?
7. What GRASP pattern says "assign to class with the info"?
8. Difference between coupling and cohesion?

---

## Solutions

1. High cohesion = module does one thing well. Low coupling = modules independent.
2. Change
3. Modification
4. Substitutable for base types
5. Interfaces they don't use
6. Low-level modules (both depend on abstractions)
7. Information Expert
8. Coupling = between modules; Cohesion = within module

---

## Glossary Terms

[[coupling]], [[cohesion]], [[data-coupling]], [[stamp-coupling]], [[control-coupling]], [[common-coupling]], [[content-coupling]], [[functional-cohesion]], [[sequential-cohesion]], [[communicational-cohesion]], [[procedural-cohesion]], [[temporal-cohesion]], [[logical-cohesion]], [[coincidental-cohesion]], [[solid]], [[srp]], [[single-responsibility]], [[ocp]], [[open-closed]], [[lsp]], [[liskov-substitution]], [[isp]], [[interface-segregation]], [[dip]], [[dependency-inversion]], [[grasp]], [[information-expert]], [[creator]], [[controller]], [[low-coupling]], [[high-cohesion]], [[polymorphism]], [[pure-fabrication]], [[indirection]], [[protected-variations]], [[design-patterns]], [[gof]], [[singleton]], [[factory-method]], [[abstract-factory]], [[builder]], [[adapter]], [[decorator]], [[facade]], [[composite]], [[proxy]], [[strategy]], [[observer]], [[command]], [[template-method]], [[state]]
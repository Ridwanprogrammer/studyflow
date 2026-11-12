# Design Principles: SOLID, Coupling, Cohesion, and GRASP

## Good design makes change safer

Software changes because users' needs, rules, and environments change. A design is valuable when a small, expected change can be made without breaking unrelated parts of the system.

Two useful questions are: **How many other parts must know about this component?** That is coupling. **Does this component's work belong together?** That is cohesion. Lower coupling and stronger cohesion generally make systems easier to understand and change.

### Coupling and cohesion

**Coupling** describes how dependent modules are on one another. If changing a database detail forces edits across every page, the design is tightly coupled. Interfaces and clear boundaries reduce knowledge that must be shared.

**Cohesion** describes how closely a module's responsibilities fit together. A class that validates an order, formats reports, sends email, and reads files has unrelated reasons to change and low cohesion. Separating responsibilities can make each part clearer.

## SOLID: five guidelines for object-oriented design

### Single Responsibility Principle

A class should have one coherent responsibility, or one main reason to change. This does not mean every method needs its own class; it means unrelated policies should not be bundled together.

### Open-Closed Principle

Software components should be open to extension but closed to repeated modification of stable code. For example, a payment workflow that uses a `PaymentMethod` interface can support a new method by adding an implementation, rather than rewriting the workflow's conditional logic each time.

### Liskov Substitution Principle

A subtype should be usable wherever its parent type is expected without breaking promised behaviour. If a `SavingsAccount` overrides withdrawal so that ordinary withdrawals fail unexpectedly, code expecting an `Account` may break. Inheritance must preserve the contract, not just reuse fields.

### Interface Segregation Principle

Clients should not depend on methods they do not use. Several small, focused interfaces are often better than one large interface forcing every implementation to provide irrelevant operations.

### Dependency Inversion Principle

High-level policy should depend on abstractions rather than concrete low-level details. A report service can depend on a `Repository` interface instead of constructing a specific database connection. Dependency injection supplies the implementation.

## GRASP: assign responsibilities deliberately

GRASP (General Responsibility Assignment Software Patterns) offers principles for deciding which class should do what. **Information Expert** assigns a responsibility to the object with the necessary information. **Controller** gives a system operation to a suitable coordinator. **Low Coupling** and **High Cohesion** guide boundaries. **Polymorphism** lets behaviour vary by type without a growing chain of conditionals.

For example, a `Course` object knows its own enrolled students, so it can answer a question about its enrollment count. A central application service may coordinate registration across course and student objects without owning every detail.

## Apply principles without turning them into slogans

Each principle is a tool, not a command to create maximum abstraction. For a small stable feature, an extra interface may add more complexity than it removes. Ask which likely change or testing problem the design is addressing.

**Practice:** If a class sends email, writes audit logs, and calculates a student's grade, identify a cohesion problem and propose a separation. A reasonable design gives grade calculation, notification, and auditing clear owners, while a coordinator connects the steps.

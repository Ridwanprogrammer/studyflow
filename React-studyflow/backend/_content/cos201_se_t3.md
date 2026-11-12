# UML Class Diagrams and Relationships

## Draw a map of a program's important concepts

Before constructing a building, an architect sketches rooms and how they connect. Software designers use diagrams for a similar purpose: to make important structure visible before or alongside implementation.

The **Unified Modeling Language (UML)** is a standard notation for describing software systems. A UML class diagram shows static structure: classes, their data and operations, and relationships between classes. It does not show the full sequence of events during program execution.

## Read a class box

A class box commonly has three compartments: class name, attributes, and operations.

```text
-------------------------
Course
-------------------------
- code: String
- title: String
-------------------------
+ enroll(student): void
-------------------------
```

The minus sign indicates private visibility; plus indicates public. `title: String` says the attribute is named `title` and has type `String`. `enroll(student): void` is an operation that takes a parameter and returns no value.

A class describes a kind of object; an object is one particular instance. The class `Course` is the plan, while `CSC215` is one object created from that plan.

## Distinguish the three common relationships

### Association: objects communicate or are linked

An association is a structural connection. A `Student` may enroll in courses. Multiplicity labels describe how many objects may participate: `1`, `0..1`, `*`, or `1..*`.

If one student can take many courses and each course has many students, the association is many-to-many. Multiplicities describe the domain rule; they are not merely decorative labels.

### Aggregation and composition: whole-part relationships

Aggregation is a weak “has-a” relationship: the part can exist independently of the whole. A department may group courses that still exist if the department's organization changes.

Composition is stronger ownership: the part's lifecycle is tied to the whole. If a `Question` exists only as part of one particular `ExamAttempt`, composition may be appropriate. UML uses a hollow diamond for aggregation and a filled diamond for composition, placed at the whole.

These meanings depend on the modeled domain; do not choose composition only because one class contains a field referencing another.

### Generalization: a specialized kind of class

Generalization represents inheritance, an “is-a” relationship. For example, `SavingsAccount` may specialize `Account` and inherit common account behavior. UML uses a hollow triangle arrow pointing toward the more general parent class.

## Interpret a small design

Suppose `Student` and `Course` are connected by enrollment. If enrollment has its own data—such as date or grade—it is often modeled as an association class or a separate `Enrollment` class. This avoids hiding important information in a relationship that has no place to store it.

**Pause and decide:** A `House` has `Room` objects that cannot meaningfully exist in this model after the house is demolished. Composition may fit. A `Team` has `Player` objects who remain people and can join another team, so a plain association is usually more appropriate.

## Keep a diagram consistent with the system

1. Name classes after domain concepts, not arbitrary database tables.
2. Show only attributes and operations that clarify the design.
3. Add multiplicities to express important constraints.
4. Choose association, aggregation, composition, or inheritance based on actual lifecycle and meaning.
5. Check that the diagram and implementation describe the same relationships.

A class diagram is a communication tool and a design model. It can reveal missing concepts and ambiguous requirements, but it does not prove that the system behaves correctly.

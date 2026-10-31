# COS 201 Track A: Software Engineering Theory — Topic 3
# UML Class Diagrams & Relationships

## The Central Idea

**UML (Unified Modeling Language)** is the standard visual language for software design. **Class diagrams** show the static structure: classes, attributes, operations, and relationships. The **three key relationships** — Association, Aggregation, Composition — define how objects connect and who owns whom.

---

## Why It Matters — Past Exam Coverage

| Past Exam Question | This Topic Covers |
|--------------------|-------------------|
| "With aid of diagram, list and explain the three types of class relationships in UML" | Association, Aggregation, Composition |
| "Distinguish between aggregation and composition with diagrammatic example" | Aggregation vs Composition |

---

## Section 1 — UML Class Diagram Basics

### Class Notation

```
┌─────────────────────┐
│      ClassName      │  ← Class name (bold, centered)
├─────────────────────┤
│ - attribute: Type   │  ← Attributes (visibility, name, type)
│ + method(): Return  │  ← Operations (visibility, name, params, return)
└─────────────────────┘
```

**Visibility:**
- `+` public
- `-` private
- `#` protected
- `~` package (default)

---

## Section 2 — The Three Key Relationships

### Overview

| Relationship | Symbol | Ownership | Lifetime | Strength |
|--------------|--------|-----------|----------|----------|
| **Association** | ──────► | None | Independent | Weak |
| **Aggregation** | ◇──────► | Has-a (weak) | Independent | Medium |
| **Composition** | ◆──────► | Has-a (strong) | Dependent | Strong |

---

### 1. Association (General Relationship)

**Definition:** A structural relationship between two classes where objects of one class **know about** or **use** objects of the other.

**Notation:** Solid line, optional arrow for navigation.

```
┌─────────┐        ┌─────────┐
│ Student │────────►│ Course  │
└─────────┘  takes  └─────────┘
```

**Characteristics:**
- **Bidirectional** (default) or unidirectional (with arrow)
- **Multiplicity** at each end (0..1, 1, 0..*, 1..*, etc.)
- **No ownership** — both exist independently
- **No lifetime dependency** — destroying one doesn't affect the other

**Code Example:**
```java
public class Student {
    private List<Course> courses;  // Association
}

public class Course {
    private List<Student> students; // Bidirectional
}
```

---

### 2. Aggregation (Weak "Has-A")

**Definition:** A **part-of** relationship where the part can exist **independently** of the whole. The whole "has a" part, but doesn't own its lifecycle.

**Notation:** Hollow diamond (◇) at the whole end.

```
┌─────────┐       ◇────────►┌─────────┐
│Department        │        │Professor │
└─────────┘  has a       └─────────┘
```

**Characteristics:**
- **Whole/Part** — Department has Professors
- **Shared ownership** — Professor can belong to multiple departments
- **Independent lifetimes** — Deleting Department doesn't delete Professors
- **Weak "has-a"**

**Code Example:**
```java
public class Department {
    private List<Professor> professors; // Aggregation
    // Professors exist independently
}
```

---

### 3. Composition (Strong "Has-A")

**Definition:** A **part-of** relationship where the part **cannot exist** without the whole. The whole **owns** the part and controls its lifecycle.

**Notation:** Filled diamond (◆) at the whole end.

```
┌─────────┐       ◆────────►┌─────────┐
│  House  │       │         │  Room   │
└─────────┘       │         └─────────┘
```

**Characteristics:**
- **Whole/Part** — House has Rooms
- **Exclusive ownership** — Room belongs to exactly one House
- **Dependent lifetime** — Deleting House deletes all Rooms
- **Strong "has-a"** — "part dies with whole"

**Code Example:**
```java
public class House {
    private List<Room> rooms; // Composition
    
    public House() {
        rooms = new ArrayList<>();
        rooms.add(new Room("Kitchen")); // Created with House
        rooms.add(new Room("Bedroom"));
    }
    
    // Rooms destroyed when House is garbage collected
}
```

---

## Section 4 — Comparison Table

| Aspect | Association | Aggregation | Composition |
|--------|-------------|-------------|-------------|
| **Symbol** | ──────► | ◇──────► | ◆──────► |
| **Relationship** | Uses / Knows | Has-a (weak) | Has-a (strong) |
| **Ownership** | None | Shared | Exclusive |
| **Part Lifetime** | Independent | Independent | Dependent on whole |
| **Multiplicity** | Any | Usually 0..* or 1..* | Usually 1..* |
| **Delete Whole** | Parts unaffected | Parts survive | Parts destroyed |
| **Example** | Student ↔ Course | Department ↔ Professor | House ↔ Room |
| **Code** | Reference field | Reference field | Instantiate in constructor |

---

## Section 5 — Multiplicity (Cardinality)

| Notation | Meaning |
|----------|---------|
| `1` | Exactly one |
| `0..1` | Zero or one (optional) |
| `*` or `0..*` | Zero or more |
| `1..*` | One or more |
| `n..m` | Between n and m |
| `3` | Exactly three |

**Example:** A `Course` has **1..*** `Student`s. A `Student` takes **0..*** `Course`s.

---

## Section 6 — Diagrammatic Examples

### Example 1: University System

```
┌─────────────┐      1..*      ┌─────────────┐
│  Student    │◆──────────────►│  Transcript │
└─────────────┘  owns          └─────────────┘
      │
      │ 0..*
      ▼
┌─────────────┐      0..*      ┌─────────────┐
│  Student    │───────────────►│   Course    │
└─────────────┘  enrolls in    └─────────────┘
                    ▲
                    │ 1
                    │
             ┌─────────────┐
             │  Professor  │
             └─────────────┘
                    ▲
                    │ 1..*
                    │
             ┌─────────────┐
             │ Department  │◇──────► Professor (aggregation)
             └─────────────┘
```

**Relationships:**
- Student **◆** Transcript (Composition — transcript dies with student)
- Student **──** Course (Association — enrollment)
- Department **◇** Professor (Aggregation — professor can move departments)
- Professor **──** Course (Association — teaches)

---

### Example 2: E-Commerce Order

```
┌─────────┐      1..*       ┌─────────────┐
│ Customer│◇───────────────►│   Order     │
└─────────┘  places          └─────────────┘
                                    │
                                    │ 1..*
                                    ▼
                              ┌─────────────┐
                              │ OrderItem   │◆──────► Product
                              └─────────────┘  composition
```

**Relationships:**
- Customer **◇** Order (Aggregation — orders exist independently)
- Order **◆** OrderItem (Composition — items part of order)
- OrderItem **◆** Product (Composition? No — Association usually, product exists independently)

---

## Section 7 — Code Mapping

### Association
```java
public class Student {
    private List<Course> courses = new ArrayList<>();
    
    public void enroll(Course c) {
        courses.add(c);
        c.getStudents().add(this); // Maintain both sides
    }
}
```

### Aggregation
```java
public class Department {
    private List<Professor> professors = new ArrayList<>();
    
    public void addProfessor(Professor p) {
        professors.add(p); // Professor created elsewhere
    }
}
```

### Composition
```java
public class House {
    private List<Room> rooms = new ArrayList<>();
    
    public House() {
        rooms.add(new Room("Kitchen", this)); // Room created HERE
        rooms.add(new Room("Bedroom", this));
    }
}

public class Room {
    private House house; // Back-reference optional
    
    public Room(String name, House h) {
        this.house = h;
    }
}
```

---

## Section 8 — Common Exam Questions

### Q: "Distinguish between aggregation and composition with diagrammatic example"

**Answer Structure:**
1. **Definitions** (weak vs strong has-a)
2. **Symbols** (hollow vs filled diamond)
3. **Lifetime** (independent vs dependent)
4. **Code difference** (external creation vs constructor creation)
5. **Diagram** showing both

### Q: "Three types of class relationships in UML"

**Answer:**
1. **Association** — general binary relationship, no ownership
2. **Aggregation** — weak has-a, shared ownership, independent lifetimes
3. **Composition** — strong has-a, exclusive ownership, dependent lifetimes

---

## Section 9 — Self-Check Questions

1. What symbol represents composition in UML?
2. If a `Car` has an `Engine`, and destroying the `Car` destroys the `Engine`, what relationship?
3. A `Library` has `Books`. Books can exist without the library. What relationship?
4. A `Professor` teaches multiple `Course`s. A `Course` has one `Professor`. What relationship?
5. In code, how do you implement composition vs aggregation?

---

## Solutions

1. **Filled diamond (◆)**
2. **Composition** (◆)
3. **Aggregation** (◇) — books shared/independent
4. **Association** (1..* on Course side, 1 on Professor side)
5. Composition: instantiate part in whole's constructor. Aggregation: part passed in or created elsewhere.

---

## Glossary Terms

[[uml]], [[class-diagram]], [[association]], [[aggregation]], [[composition]], [[multiplicity]], [[cardinality]], [[navigation]], [[visibility]], [[attribute]], [[operation]], [[hollow-diamond]], [[filled-diamond]], [[whole-part]], [[has-a]], [[is-a]], [[generalization]], [[inheritance]], [[realization]], [[dependency]], [[interface]], [[abstract-class]], [[lifecycle]], [[ownership]], [[shared-ownership]], [[exclusive-ownership]], [[back-reference]], [[constructor-injection]], [[setter-injection]]
# COS 201 Track B: Java OOP — Topic 4
# Aggregation vs Composition in Code

## The Central Idea

**Aggregation** and **Composition** are both "has-a" relationships, but differ in **ownership** and **lifetime dependency**. This topic shows the exact code patterns for each, matching the exam requirement to distinguish them with diagrammatic examples.

---

## Why It Matters — Past Exam Coverage

| Past Exam Question | This Topic Covers |
|--------------------|-------------------|
| "With aid of diagrammatic example, distinguish between aggregation and composition." | Code + UML for both |

---

## Section 1 — Core Difference

| Aspect | Aggregation | Composition |
|--------|-------------|-------------|
| **Relationship** | Weak "has-a" | Strong "has-a" |
| **Ownership** | Shared | Exclusive |
| **Lifetime** | Independent | Dependent |
| **UML** | Hollow diamond (◇) | Filled diamond (◆) |
| **Code** | Part passed in / created elsewhere | Part created in constructor |

---

## Section 2 — Aggregation Code Pattern

### Characteristics
- Part exists **independently** of whole
- Part can belong to **multiple wholes**
- Whole **does not create** part
- Part passed via **constructor/setter**

### Code Example: Department & Professor

```java
// Part: Exists independently
public class Professor {
    private String id;
    private String name;
    private String email;
    
    public Professor(String id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
    
    public String getName() { return name; }
    // ... getters/setters
}

// Whole: Aggregates professors
public class Department {
    private String name;
    private List<Professor> professors;  // Aggregation
    
    public Department(String name) {
        this.name = name;
        this.professors = new ArrayList<>();
    }
    
    // Professor created OUTSIDE, passed in
    public void addProfessor(Professor prof) {
        professors.add(prof);
    }
    
    public void removeProfessor(Professor prof) {
        professors.remove(prof);
    }
    
    public void listProfessors() {
        System.out.println("Department: " + name);
        for (Professor p : professors) {
            System.out.println("  - " + p.getName());
        }
    }
}

// Usage: Professor exists independently
Professor prof1 = new Professor("P001", "Dr. Smith", "smith@uni.edu");
Professor prof2 = new Professor("P002", "Dr. Jones", "jones@uni.edu");

Department cs = new Department("Computer Science");
Department math = new Department("Mathematics");

// Same professor can belong to MULTIPLE departments
cs.addProfessor(prof1);
math.addProfessor(prof1);  // Shared!

cs.addProfessor(prof2);

// Deleting department does NOT delete professors
// prof1 and prof2 still exist
```

### UML for Aggregation
```
┌──────────────┐       ◇──────────►┌─────────────┐
│  Department  │                   │  Professor  │
└──────────────┘  has a (weak)     └─────────────┘
```

---

## Section 3 — Composition Code Pattern

### Characteristics
- Part **cannot exist** without whole
- Part belongs to **exactly one whole**
- Whole **creates** part in constructor
- Part **destroyed** when whole is destroyed

### Code Example: House & Room

```java
// Part: Cannot exist without House
public class Room {
    private String name;
    private double area;  // sq meters
    private House house;  // Back-reference (optional)
    
    // Room created BY House, not externally
    Room(String name, double area, House house) {
        this.name = name;
        this.area = area;
        this.house = house;
    }
    
    public String getName() { return name; }
    public double getArea() { return area; }
}

// Whole: Composes rooms
public class House {
    private String address;
    private List<Room> rooms;  // Composition
    
    public House(String address) {
        this.address = address;
        this.rooms = new ArrayList<>();
        // House CREATES its rooms
        rooms.add(new Room("Living Room", 25.0, this));
        rooms.add(new Room("Kitchen", 15.0, this));
        rooms.add(new Room("Bedroom 1", 20.0, this));
        rooms.add(new Room("Bedroom 2", 18.0, this));
        rooms.add(new Room("Bathroom", 8.0, this));
    }
    
    // No public addRoom — rooms created internally
    // (or private method for extensibility)
    
    public double totalArea() {
        double total = 0;
        for (Room r : rooms) {
            total += r.getArea();
        }
        return total;
    }
    
    public void listRooms() {
        System.out.println("House at " + address);
        for (Room r : rooms) {
            System.out.println("  - " + r.getName() + ": " + r.getArea() + " sqm");
        }
    }
}

// Usage
House myHouse = new House("123 University Ave");
myHouse.listRooms();
System.out.println("Total area: " + myHouse.totalArea() + " sqm");

// When myHouse is garbage collected, all Rooms are too
// Rooms cannot exist without a House
// Rooms cannot be shared between houses
```

### UML for Composition
```
┌─────────┐       ◆──────────►┌─────────┐
│  House  │                   │  Room   │
└─────────┘  has a (strong)   └─────────┘
```

---

## Section 4 — Quick Comparison Code

### Aggregation (Shared, Independent)
```java
// Part
public class Engine {
    private String serialNumber;
    public Engine(String sn) { this.serialNumber = sn; }
    public void start() { System.out.println("Engine " + serialNumber + " started"); }
}

// Whole
public class Car {
    private Engine engine;  // Aggregation
    
    public Car(Engine engine) {  // Engine passed in
        this.engine = engine;
    }
    
    public void start() { engine.start(); }
}

// Usage
Engine v8 = new Engine("V8-001");
Car car1 = new Car(v8);
Car car2 = new Car(v8);  // Same engine in two cars!
v8.start();  // Works independently
```

### Composition (Exclusive, Dependent)
```java
// Part
public class Heart {
    private int beatsPerMinute;
    Heart() { this.beatsPerMinute = 70; }
    public void beat() { System.out.println("Heart beating: " + beatsPerMinute + " bpm"); }
}

// Whole
public class Human {
    private Heart heart;  // Composition
    
    public Human() {
        this.heart = new Heart();  // Human CREATES heart
    }
    
    public void live() { heart.beat(); }
}

// Usage
Human person = new Human();
person.live();  // Heart beats
// Heart cannot exist without Human
// Heart cannot be transplanted to another Human in this model
```

---

## Section 5 — Decision Guide

| Question | Aggregation | Composition |
|----------|-------------|-------------|
| Can part exist without whole? | Yes | No |
| Can part belong to multiple wholes? | Yes | No |
| Who creates the part? | External code | Whole's constructor |
| Should deleting whole delete part? | No | Yes |
| Is part shared? | Often | Never |

---

## Section 5 — UML Diagram Examples

### Aggregation Example: University
```
┌─────────────┐      ◇──────────►┌──────────────┐
│  University │                  │  Professor   │
└─────────────┘                  └──────────────┘
       │
       │ 1..*
       ▼
┌─────────────┐      ◇──────────►┌──────────────┐
│ Department  │                  │  Professor   │
└─────────────┘                  └──────────────┘
```

### Composition Example: Order System
```
┌─────────┐      ◆──────────►┌──────────────┐
│  Order  │                  │  OrderItem   │
└─────────┘                  └──────────────┘
       │
       │ 1..*
       ▼
┌─────────┐      ◆──────────►┌──────────────┐
│  Cart   │                  │  CartItem    │
└─────────┘                  └──────────────┘
```

---

## Section 6 — Past Exam Answer Format

> **With aid of diagrammatic example, distinguish between aggregation and composition.**

**Answer Structure:**

1. **Definitions** (2-3 sentences each)
2. **UML Symbols** (◇ vs ◆)
3. **Key Differences Table** (ownership, lifetime, creation)
4. **Code Example** (Aggregation: Department-Professor; Composition: House-Room)
5. **UML Diagrams** for both

---

## Section 7 — Self-Check Questions

1. In aggregation, who creates the part?
2. In composition, can a Room exist without a House?
3. What UML symbol for aggregation? For composition?
4. Can a Professor belong to two Departments in aggregation?
5. Can a Room belong to two Houses in composition?
6. In code, how do you distinguish them?

---

## Solutions

1. External code (passed in)
2. No — dependent lifetime
3. Aggregation: ◇ (hollow diamond); Composition: ◆ (filled diamond)
4. Yes — shared ownership
5. No — exclusive ownership
6. Aggregation: part passed to constructor/setter. Composition: part created with `new` in whole's constructor.

---

## Glossary Terms

[[aggregation]], [[composition]], [[has-a]], [[weak-has-a]], [[strong-has-a]], [[hollow-diamond]], [[filled-diamond]], [[ownership]], [[shared-ownership]], [[exclusive-ownership]], [[lifetime-dependency]], [[independent-lifetime]], [[dependent-lifetime]], [[part-of]], [[whole-part]], [[code-pattern]], [[uml-diagram]], [[back-reference]], [[constructor-injection]], [[setter-injection]], [[factory-method]], [[dependency-injection]], [[aggregation-vs-composition]]
# COS 201 Track B: Java OOP — Topic 3
# Inheritance & Polymorphism

## The Central Idea

**Inheritance** lets a class acquire fields and methods from another class — "is-a" relationship. **Polymorphism** lets objects of different types be treated uniformly through a common interface. Together, they enable code reuse and flexible design.

---

## Why It Matters — Past Exam Coverage

| Past Exam Question | This Topic Covers |
|--------------------|-------------------|
| "Create a User base class, and Create Student, Lecturer, and Admin classes that inherit from User base class. Demonstrate how an object of each derived class can use: Methods from the parent class, Its own specific methods." | Inheritance, polymorphism, method overriding |
| "With aid of diagram, list and explain the three types of class relationships in UML" | UML relationships (association, aggregation, composition) |

---

## Section 1 — Inheritance Basics

### Syntax
```java
class ChildClass extends ParentClass {
    // Inherits all non-private members
    // Can add new fields/methods
    // Can override methods
}
```

### Key Points
- **Single inheritance** — Java: one parent only (`extends` one class)
- **`super` keyword** — access parent's members
- **Constructors not inherited** — but child constructor must call parent constructor (implicitly or explicitly)
- **`private` members** — not inherited (but exist in object)

### Example: Base Class
```java
public class User {
    // Common fields
    protected String userId;
    protected String name;
    protected String email;
    
    public User(String userId, String name, String email) {
        this.userId = userId;
        this.name = name;
        this.email = email;
    }
    
    // Common methods
    public void login() {
        System.out.println(name + " logged in.");
    }
    
    public void logout() {
        System.out.println(name + " logged out.");
    }
    
    public void displayInfo() {
        System.out.println("ID: " + userId + ", Name: " + name + ", Email: " + email);
    }
}
```

---

## Section 2 — Derived Classes (Student, Lecturer, Admin)

### Student
```java
public class Student extends User {
    private String matricNumber;
    private String program;
    private int year;
    
    public Student(String userId, String name, String email, 
                   String matricNumber, String program, int year) {
        super(userId, name, email);  // Call parent constructor
        this.matricNumber = matricNumber;
        this.program = program;
        this.year = year;
    }
    
    // Student-specific methods
    public void registerCourse(String courseCode) {
        System.out.println(name + " registered for " + courseCode);
    }
    
    public void viewGrades() {
        System.out.println(name + " viewing grades...");
    }
    
    // Override parent method
    @Override
    public void displayInfo() {
        super.displayInfo();  // Call parent version
        System.out.println("Matric: " + matricNumber + ", Program: " + program + ", Year: " + year);
    }
}
```

### Lecturer
```java
public class Lecturer extends User {
    private String staffId;
    private String department;
    private String rank;  // e.g., "Assistant Professor"
    
    public Lecturer(String userId, String name, String email,
                    String staffId, String department, String rank) {
        super(userId, name, email);
        this.staffId = staffId;
        this.department = department;
        this.rank = rank;
    }
    
    // Lecturer-specific methods
    public void uploadMaterial(String courseCode, String material) {
        System.out.println(name + " uploaded material for " + courseCode);
    }
    
    public void gradeSubmission(String studentId, String assignment, double grade) {
        System.out.println(name + " graded " + assignment + " for " + studentId + ": " + grade);
    }
    
    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Staff ID: " + staffId + ", Dept: " + department + ", Rank: " + rank);
    }
}
```

### Admin
```java
public class Admin extends User {
    private String adminId;
    private String role;  // e.g., "System Admin", "Registrar"
    private String[] permissions;
    
    public Admin(String userId, String name, String email,
                 String adminId, String role, String[] permissions) {
        super(userId, name, email);
        this.adminId = adminId;
        this.role = role;
        this.permissions = permissions;
    }
    
    // Admin-specific methods
    public void createUser(User user) {
        System.out.println(name + " created user: " + user.name);
    }
    
    public void generateReport(String reportType) {
        System.out.println(name + " generated " + reportType + " report");
    }
    
    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Admin ID: " + adminId + ", Role: " + role);
    }
}
```

---

## Section 3 — Polymorphism

### Definition
> **Polymorphism** = "Many forms." A single interface, multiple implementations.

### Types

| Type | Mechanism | Example |
|------|-----------|---------|
| **Compile-time (Static)** | Method overloading | `print(int)`, `print(String)` |
| **Runtime (Dynamic)** | Method overriding | `user.displayInfo()` calls child's version |

### Runtime Polymorphism Example

```java
public class TestInheritance {
    public static void main(String[] args) {
        // Create objects of each type
        User student = new Student("S001", "Alice", "alice@uni.edu", 
                                   "MAT2023", "Computer Science", 2);
        User lecturer = new Lecturer("L001", "Dr. Smith", "smith@uni.edu",
                                     "STF001", "Computer Science", "Senior Lecturer");
        User admin = new Admin("A001", "Admin User", "admin@uni.edu",
                               "ADM001", "Registrar", new String[]{"manage_users", "reports"});
        
        // Polymorphic array
        User[] users = {student, lecturer, admin};
        
        // Runtime polymorphism: calls overridden method
        for (User u : users) {
            u.displayInfo();  // Calls STUDENT's, LECTURER's, ADMIN's version
            u.login();        // Inherited from User
            System.out.println("---");
        }
        
        // Downcasting to access specific methods
        if (users[0] instanceof Student) {
            Student s = (Student) users[0];
            s.registerCourse("CSC201");  // Student-specific
        }
    }
}
```

**Output:**
```
ID: S001, Name: Alice, Email: alice@uni.edu
Matric: MAT2023, Program: Computer Science, Year: 2
Alice logged in.
---
ID: L001, Name: Dr. Smith, Email: smith@uni.edu
Staff ID: STF001, Dept: Computer Science, Rank: Senior Lecturer
Dr. Smith logged in.
---
ID: A001, Name: Admin User, Email: admin@uni.edu
Admin ID: ADM001, Role: Registrar
Admin User logged in.
---
Alice registered for CSC201
```

---

## Section 4 — Method Overriding Rules

| Rule | Description |
|------|-------------|
| **Same signature** | Same name, same parameter types |
| **Same return type** | Or covariant (subclass of parent's return) |
| **Access modifier** | Cannot be more restrictive (`public` → `protected` ✗) |
| **Exceptions** | Can throw fewer/ narrower checked exceptions |
| **`final` methods** | Cannot be overridden |
| **`static` methods** | Hidden, not overridden |
| **`private` methods** | Not inherited, cannot be overridden |

### `@Override` Annotation
- **Optional but recommended**
- Compiler checks you're actually overriding
- Catches typos: `@Override public void displayinfo()` → error

---

## Section 5 — `super` Keyword

| Usage | Example |
|-------|---------|
| **Call parent constructor** | `super(userId, name, email);` |
| **Call parent method** | `super.displayInfo();` |
| **Access parent field** | `super.userId` (if hidden by child field) |

---

## Section 6 — Abstract Classes & Methods

### Abstract Class
- Cannot be instantiated
- May have abstract methods (no body)
- Can have concrete methods

```java
public abstract class Shape {
    protected String color;
    
    public Shape(String color) { this.color = color; }
    
    // Abstract method — MUST be implemented by subclass
    public abstract double area();
    
    // Concrete method — inherited as-is
    public String getColor() { return color; }
}

public class Circle extends Shape {
    private double radius;
    
    public Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }
    
    @Override
    public double area() {
        return Math.PI * radius * radius;
    }
}
```

---

## Section 7 — `final` Keyword

| Applied To | Effect |
|------------|--------|
| **Variable** | Constant (assign once) |
| **Method** | Cannot be overridden |
| **Class** | Cannot be extended |

```java
public class Constants {
    public static final double PI = 3.14159;  // Constant
}

public class Security {
    public final void encrypt() { ... }  // Cannot override
}

public final class Immutable {  // Cannot extend
    private final String value;
    public Immutable(String v) { this.value = v; }
}
```

---

## Section 8 — Past Exam Problem

### Problem: UML to Java Inheritance
> **Create a User base class, and Create Student, Lecturer, and Admin classes that inherit from User base class. Demonstrate how an object of each derived class can use: Methods from the parent class, Its own specific methods.**

**Solution:** (See Sections 1-3 — Complete implementation with `TestInheritance` class demonstrating both inherited and specific methods)

---

## Section 9 — Self-Check Questions

1. Can a class extend multiple classes in Java?
2. What does `super()` do in a constructor?
3. Can you override a `private` method?
4. Can you override a `static` method?
5. What is dynamic method dispatch?
6. Can an abstract class have a constructor?
7. What happens if you don't implement an abstract method?

---

## Solutions

1. No — single inheritance only (but can implement multiple interfaces)
2. Calls parent constructor (must be first line)
3. No — not inherited
4. No — static methods are hidden, not overridden
5. JVM determines actual method at runtime based on object type
6. Yes — called by subclass constructors via `super()`
7. Compiler error — class must also be abstract

---

## Glossary Terms

[[inheritance]], [[extends]], [[superclass]], [[subclass]], [[parent-class]], [[child-class]], [[is-a]], [[polymorphism]], [[method-overriding]], [[method-overloading]], [[dynamic-dispatch]], [[static-dispatch]], [[super]], [[super-constructor]], [[super-method]], [[abstract-class]], [[abstract-method]], [[final]], [[final-variable]], [[final-method]], [[final-class]], [[instanceof]], [[downcasting]], [[upcasting]], [[covariant-return]], [[method-hiding]], [[virtual-method]], [[concrete-class]], [[concrete-method]], [[inheritance-hierarchy]], [[single-inheritance]], [[multiple-inheritance]], [[interface]], [[implements]]
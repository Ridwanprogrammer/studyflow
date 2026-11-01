# COS 201 Track B: Java OOP — Topic 2
# Classes, Objects, Encapsulation, Constructors

## The Central Idea

**Classes** are blueprints. **Objects** are instances. **Encapsulation** hides internal state behind a public interface. This topic covers the mechanics of defining classes, creating objects, controlling access, and initializing state.

---

## Why It Matters — Past Exam Coverage

| Past Exam Question | This Topic Covers |
|--------------------|-------------------|
| "Explain how encapsulation is achieved in object-oriented programming, and write a program to support your explanation." | Encapsulation + code |
| "Properties of Java Classes" | Class structure |
| "Write a java program that creates a java class named 'Dog'..." | Class definition, methods |
| "UML to Java: User → Student/Lecturer/Admin" | Class design |

---

## Section 1 — Class Anatomy

### Class Declaration
```java
[modifiers] class ClassName [extends SuperClass] [implements Interfaces] {
    // Fields (attributes/state)
    // Constructors
    // Methods (behavior)
    // Nested classes
}
```

### Components

| Component | Purpose | Example |
|-----------|---------|---------|
| **Fields** | State (data) | `private String name;` |
| **Constructors** | Initialize new objects | `public Dog(String name) { ... }` |
| **Methods** | Behavior | `public void bark() { ... }` |
| **Blocks** | Initialization code | `{ System.out.println("Loading..."); }` |

---

## Section 2 — Fields & Encapsulation

### Encapsulation Definition
> **Bundling data (fields) and methods that operate on that data within a single unit (class), and restricting direct access to some of the object's components.**

### Access Modifiers

| Modifier | Class | Package | Subclass | World |
|----------|-------|---------|----------|-------|
| `private` | ✓ | ✗ | ✗ | ✗ |
| (default) | ✓ | ✓ | ✗ | ✗ |
| `protected` | ✓ | ✓ | ✓ | ✗ |
| `public` | ✓ | ✓ | ✓ | ✓ |

### Encapsulation Pattern

```java
public class Student {
    // Private fields — hidden from outside
    private String name;
    private int age;
    private double gpa;
    
    // Public getters (read access)
    public String getName() { return name; }
    public int getAge() { return age; }
    public double getGpa() { return gpa; }
    
    // Public setters (controlled write access)
    public void setName(String name) {
        if (name != null && !name.isBlank()) {
            this.name = name;
        }
    }
    public void setAge(int age) {
        if (age >= 16 && age <= 100) {
            this.age = age;
        }
    }
    public void setGpa(double gpa) {
        if (gpa >= 0.0 && gpa <= 5.0) {
            this.gpa = gpa;
        }
    }
}
```

### Why Encapsulation?
1. **Control** — validate before setting
2. **Flexibility** — change internal representation without breaking clients
3. **Security** — prevent invalid state
4. **Maintainability** — single point of control

---

## Section 3 — Constructors

### Purpose
Initialize object state when `new` is called.

### Types

| Type | Syntax | When Called |
|--------|--------|-------------|
| **No-arg (default)** | `public Dog() { }` | `new Dog()` |
| **Parameterized** | `public Dog(String name) { ... }` | `new Dog("Rex")` |
| **Copy** | `public Dog(Dog other) { ... }` | `new Dog(existingDog)` |

### Constructor Rules
- **Same name as class**
- **No return type** (not even `void`)
- **Can be overloaded** (different parameters)
- **If none defined**, Java provides default no-arg constructor
- **If ANY defined**, default is NOT provided

### `this()` — Constructor Chaining
```java
public class Dog {
    private String name;
    private int age;
    private String breed;
    
    public Dog() {
        this("Unknown", 0, "Mixed");  // Calls 3-arg constructor
    }
    
    public Dog(String name) {
        this(name, 0, "Mixed");
    }
    
    public Dog(String name, int age, String breed) {
        this.name = name;
        this.age = age;
        this.breed = breed;
    }
}
```

### `this` Keyword
- `this.field` — refers to instance field (vs parameter)
- `this()` — calls another constructor (must be first line)
- `this` — reference to current object

---

## Section 4 — Methods

### Method Signature
```java
[modifiers] returnType methodName(parameterList) [throws Exceptions] {
    // body
    return value; // if not void
}
```

### Method Overloading
Same name, different parameter list (type, number, order).
```java
public void setName(String name) { ... }
public void setName(String first, String last) { ... }
```

### Varargs (Variable Arguments)
```java
public void addScores(int... scores) {
    for (int s : scores) { total += s; }
}
// Call: addScores(80, 90, 85); or addScores(new int[]{80,90});
```

---

## Section 5 — Static Members

### Static Fields (Class Variables)
- Shared by ALL instances
- One copy per class, not per object
- Accessed via `ClassName.fieldName`

```java
public class Student {
    private static int studentCount = 0;  // Class variable
    private String name;                  // Instance variable
    
    public Student(String name) {
        this.name = name;
        studentCount++;  // Increment on each creation
    }
    
    public static int getStudentCount() {
        return studentCount;
    }
}

// Usage:
Student s1 = new Student("Alice");
Student s2 = new Student("Bob");
System.out.println(Student.getStudentCount());  // 2
```

### Static Methods
- Belong to class, not instance
- **Cannot** use `this` or access instance members directly
- Utility methods, factories

```java
public class MathUtils {
    public static int max(int a, int b) {
        return (a > b) ? a : b;
    }
}
// Call: MathUtils.max(5, 10);
```

---

## Section 6 — Past Exam Problems

### Problem 1: Encapsulation Explanation + Program
> **Explain how encapsulation is achieved in OOP, and write a program to support your explanation.**

**Answer Structure:**
1. **Definition** — bundling data + methods, restricting access
2. **Mechanism** — private fields + public getters/setters
3. **Benefits** — validation, flexibility, security
4. **Code Example** — (See `Student` class in Section 2)

---

### Problem 2: Dog Class
> **Write a java program that creates a java class named "Dog". Where, the class attributes are breed, age, and color. The class methods are `setBreed()`, `setColor()`, and `printDetails()` to assign values of the dog breed, age, color and display these attributes respectively. Create another class named "TestDog", and create an object named `obj` of Dog class to access its methods.**

**Solution:**
```java
// Dog.java
public class Dog {
    // Attributes (private = encapsulation)
    private String breed;
    private int age;
    private String color;
    
    // Setters
    public void setBreed(String breed) {
        this.breed = breed;
    }
    
    public void setAge(int age) {
        if (age > 0) this.age = age;
    }
    
    public void setColor(String color) {
        this.color = color;
    }
    
    // Print details
    public void printDetails() {
        System.out.println("Breed: " + breed);
        System.out.println("Age: " + age);
        System.out.println("Color: " + color);
    }
}

// TestDog.java
public class TestDog {
    public static void main(String[] args) {
        Dog obj = new Dog();  // Create object
        obj.setBreed("Labrador");
        obj.setAge(3);
        obj.setColor("Golden");
        obj.printDetails();  // Display
    }
}
```

**Output:**
```
Breed: Labrador
Age: 3
Color: Golden
```

---

### Problem 3: Properties of Java Classes
> **What are the properties of Java Classes?**

**Answer:**
1. **Encapsulation** — data hiding via access modifiers
2. **Inheritance** — reuse via `extends`
3. **Polymorphism** — one interface, multiple implementations
4. **Abstraction** — hide complexity, show essentials
5. **Instantiation** — create objects with `new`
6. **Members** — fields, methods, constructors, nested classes
7. **Modifiers** — `public`, `abstract`, `final`, `strictfp`
8. **Interfaces** — `implements` multiple interfaces

---

## Section 7 — Self-Check Questions

1. What is the default access modifier (package-private)?
2. Can a class have multiple constructors?
3. What happens if you define a constructor but want the default no-arg too?
4. What does `this()` do in a constructor?
5. Difference between static field and instance field?
6. Why make fields `private`?

---

## Solutions

1. Package-private (no keyword) — accessible within same package
2. Yes — constructor overloading
3. Must explicitly define it — Java won't provide default if any constructor exists
4. Calls another constructor of same class (must be first statement)
5. Static = one per class (shared); Instance = one per object
6. Encapsulation — control access, validate, hide implementation

---

## Glossary Terms

[[class]], [[object]], [[field]], [[attribute]], [[constructor]], [[method]], [[encapsulation]], [[access-modifier]], [[private]], [[public]], [[protected]], [[package-private]], [[getter]], [[setter]], [[this]], [[constructor-chaining]], [[constructor-overloading]], [[default-constructor]], [[parameterized-constructor]], [[copy-constructor]], [[static-field]], [[static-method]], [[instance-field]], [[instance-method]], [[method-overloading]], [[varargs]], [[encapsulation-benefits]], [[information-hiding]], [[data-hiding]]
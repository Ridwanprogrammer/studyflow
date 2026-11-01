# COS 201 Track B: Java OOP — Topic 8
# Exam Problem Workshop — Java OOP

## The Central Idea

This topic provides **complete, runnable solutions** to every Java OOP question type from past CSC 201/COS 201 exams. Each problem is solved with full code, explanations, and expected output.

---

## Past Exam Questions & Solutions

---

### Problem 1: Dog Class
> **Write a java program that creates a java class named "Dog". Where, the class attributes are breed, age, and color. The class methods are `setBreed()`, `setColor()`, and `printDetails()` to assign values of the dog breed, age, color and display these attributes respectively. Create another class named "TestDog", and create an object named `obj` of Dog class to access its methods.**

**Solution:**
```java
// Dog.java
public class Dog {
    private String breed;
    private int age;
    private String color;
    
    public void setBreed(String breed) {
        this.breed = breed;
    }
    
    public void setAge(int age) {
        if (age > 0) this.age = age;
    }
    
    public void setColor(String color) {
        this.color = color;
    }
    
    public void printDetails() {
        System.out.println("Breed: " + breed);
        System.out.println("Age: " + age);
        System.out.println("Color: " + color);
    }
}

// TestDog.java
public class TestDog {
    public static void main(String[] args) {
        Dog obj = new Dog();
        obj.setBreed("Labrador");
        obj.setAge(3);
        obj.setColor("Golden");
        obj.printDetails();
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

### Problem 2: Encapsulation Explanation + Program
> **Explain how encapsulation is achieved in object-oriented programming, and write a program to support your explanation.**

**Explanation:**
Encapsulation is achieved by:
1. Making fields **private** — hidden from outside
2. Providing **public getters/setters** — controlled access
3. **Validating** in setters — prevent invalid state

**Program:**
```java
public class Student {
    private String name;
    private int age;
    private double gpa;
    
    public String getName() { return name; }
    public void setName(String name) {
        if (name != null && !name.isBlank()) this.name = name;
    }
    
    public int getAge() { return age; }
    public void setAge(int age) {
        if (age >= 16 && age <= 100) this.age = age;
    }
    
    public double getGpa() { return gpa; }
    public void setGpa(double gpa) {
        if (gpa >= 0.0 && gpa <= 5.0) this.gpa = gpa;
    }
}

public class TestEncapsulation {
    public static void main(String[] args) {
        Student s = new Student();
        s.setName("Alice");
        s.setAge(20);
        s.setGpa(4.5);
        System.out.println(s.getName() + ", " + s.getAge() + ", " + s.getGpa());
        
        s.setAge(-5);  // Ignored (validation)
        s.setGpa(6.0); // Ignored (validation)
        System.out.println(s.getAge() + ", " + s.getGpa());  // 20, 4.5
    }
}
```

---

### Problem 3: Java Identifiers & Keywords
> **What are Identifiers in JAVA, and what are the several points to remember about identifiers?**
> **What would happen if you used Java keywords as a variable or identifier in your Java program?**

**Answer:**
**Identifiers** are names for classes, methods, variables, packages.

**Rules:**
1. Start with letter, `_`, or `$`
2. Subsequent: letters, digits, `_`, `$`
3. Case-sensitive
4. Cannot be a **keyword** (reserved word)
5. No length limit (practical)

**If keyword used as identifier:** **Compile-time error** — "`class` expected" or "not a statement"

```java
int class = 5;  // ERROR: class is keyword
int for = 10;   // ERROR: for is keyword
```

---

### Problem 4: Loop Syntax
> **Write and explain the syntax of while-loop and do-while loop.**

**While Loop:**
```java
while (condition) {
    // body - executes while condition is true
}
```
- Pre-test, zero or more iterations

**Do-While Loop:**
```java
do {
    // body - executes AT LEAST ONCE
} while (condition);
```
- Post-test, one or more iterations

**Example:**
```java
// while: sum 1 to 10
int sum = 0, i = 1;
while (i <= 10) { sum += i; i++; }

// do-while: menu
int choice;
do {
    System.out.println("1. Add\n2. Exit");
    choice = scanner.nextInt();
} while (choice != 2);
```

---

### Problem 5: Factorial of 1000
> **Write a java program that will compute factorial of 1000 using for... loop.**

**Key:** 1000! = 2568 digits — use `BigInteger`

```java
import java.math.BigInteger;

public class Factorial1000 {
    public static void main(String[] args) {
        BigInteger fact = BigInteger.ONE;
        for (int i = 2; i <= 1000; i++) {
            fact = fact.multiply(BigInteger.valueOf(i));
        }
        System.out.println("1000! = " + fact);
        System.out.println("Digits: " + fact.toString().length());
    }
}
```

**Output:** 2568 digits

---

### Problem 6: Grade Computation Program
> **Write a java program that reads your registration number, name, examination scores, test scores and compute total marks. The program should test and assign appropriate grade points based on the table. Print registration number, name, and grade points.**

| Total Marks | Grade | Points |
|-------------|-------|--------|
| 0-39        | F     | 0.0    |
| 40-44       | E     | 1.0    |
| 45-49       | D     | 2.0    |
| 50-59       | C     | 3.0    |
| 60-69       | B     | 4.0    |
| 70-100      | A     | 5.0    |

**Solution:**
```java
import java.util.Scanner;

public class GradeCalculator {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Registration Number: ");
        String regNo = sc.nextLine();
        
        System.out.print("Name: ");
        String name = sc.nextLine();
        
        System.out.print("Exam Score: ");
        int exam = sc.nextInt();
        
        System.out.print("Test Score: ");
        int test = sc.nextInt();
        
        int total = exam + test;
        String grade;
        double points;
        
        if (total >= 70) { grade = "A"; points = 5.0; }
        else if (total >= 60) { grade = "B"; points = 4.0; }
        else if (total >= 50) { grade = "C"; points = 3.0; }
        else if (total >= 45) { grade = "D"; points = 2.0; }
        else if (total >= 40) { grade = "E"; points = 1.0; }
        else { grade = "F"; points = 0.0; }
        
        System.out.println("Registration Number: " + regNo);
        System.out.println("Name: " + name);
        System.out.println("Grade Points: " + points);
        System.out.println("Grade: " + grade);
    }
}
```

---

### Problem 7: Max of Two Numbers
> **Write a java program that reads two integer numbers from the user. The program should test and print the maximum of the two numbers.**

```java
import java.util.Scanner;

public class MaxOfTwo {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter first number: ");
        int a = sc.nextInt();
        System.out.print("Enter second number: ");
        int b = sc.nextInt();
        
        int max = (a > b) ? a : b;
        // OR: int max = Math.max(a, b);
        
        System.out.println("Maximum: " + max);
    }
}
```

---

### Problem 8: UML to Java — User Hierarchy
> **Create a User base class, and Create Student, Lecturer, and Admin classes that inherit from User base class. Demonstrate how an object of each derived class can use: Methods from the parent class, Its own specific methods.**

**Solution:** (See Topic 3 — Complete implementation)

---

### Problem 9: Aggregation vs Composition
> **With aid of diagrammatic example, distinguish between aggregation and composition.**

**Answer:** (See Topic 4 — Code + UML)

---

### Problem 10: Properties of Java Classes
> **What are the properties of Java Classes?**

**Answer:**
1. **Encapsulation** — private fields, public methods
2. **Inheritance** — `extends`, reuse
3. **Polymorphism** — override, dynamic dispatch
4. **Abstraction** — abstract classes/interfaces
5. **Instantiation** — `new` creates objects
6. **Members** — fields, methods, constructors
7. **Modifiers** — public, abstract, final, etc.
8. **Interfaces** — `implements` multiple

---

### Problem 11: Exception Handling Code
> **Write a program demonstrating try-catch-finally, throws, and custom exception.**

```java
class InsufficientFundsException extends Exception {
    public InsufficientFundsException(String msg) { super(msg); }
}

class Account {
    private double balance;
    
    public void withdraw(double amount) throws InsufficientFundsException {
        if (amount > balance) {
            throw new InsufficientFundsException("Balance: " + balance + ", Requested: " + amount);
        }
        balance -= amount;
    }
}

public class ExceptionDemo {
    public static void main(String[] args) {
        Account acc = new Account();
        try {
            acc.withdraw(1000);
        } catch (InsufficientFundsException e) {
            System.out.println("Error: " + e.getMessage());
        } finally {
            System.out.println("Transaction processed");
        }
    }
}
```

---

### Problem 12: Collections & Generics
> **Write a program using ArrayList, HashMap, and generics.**

```java
import java.util.*;

public class CollectionsDemo {
    public static void main(String[] args) {
        // ArrayList with generics
        List<String> names = new ArrayList<>();
        names.add("Alice");
        names.add("Bob");
        names.add("Charlie");
        
        // HashMap with generics
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Alice", 95);
        scores.put("Bob", 87);
        
        // Iterate
        for (String name : names) {
            System.out.println(name + ": " + scores.getOrDefault(name, 0));
        }
        
        // Sort with Comparator
        names.sort((a, b) -> b.compareTo(a));  // Descending
        System.out.println("Sorted: " + names);
    }
}
```

---

### Problem 13: File I/O
> **Write a program to write student data to file and read it back.**

```java
import java.io.*;
import java.util.*;

public class StudentFileIO {
    public static void main(String[] args) {
        List<Student> students = List.of(
            new Student("Alice", 20, 4.5),
            new Student("Bob", 22, 3.8)
        );
        
        // Write
        try (PrintWriter pw = new PrintWriter("students.txt")) {
            for (Student s : students) {
                pw.println(s.getName() + "," + s.getAge() + "," + s.getGpa());
            }
        } catch (IOException e) { e.printStackTrace(); }
        
        // Read
        try (BufferedReader br = new BufferedReader(new FileReader("students.txt"))) {
            String line;
            while ((line = br.readLine()) != null) {
                String[] parts = line.split(",");
                System.out.println(parts[0] + " - Age: " + parts[1] + " - GPA: " + parts[2]);
            }
        } catch (IOException e) { e.printStackTrace(); }
    }
}

class Student {
    private String name; private int age; private double gpa;
    public Student(String n, int a, double g) { name=n; age=a; gpa=g; }
    public String getName() { return name; }
    public int getAge() { return age; }
    public double getGpa() { return gpa; }
}
```

---

### Problem 14: Interface vs Abstract Class
> **Write a program showing interface and abstract class usage.**

```java
interface Drawable {
    void draw();
    default void info() { System.out.println("Drawable object"); }
}

abstract class Shape {
    protected String color;
    public Shape(String color) { this.color = color; }
    public abstract double area();
    public String getColor() { return color; }
}

class Circle extends Shape implements Drawable {
    private double radius;
    public Circle(String color, double r) { super(color); radius = r; }
    public double area() { return Math.PI * radius * radius; }
    public void draw() { System.out.println("Drawing circle: " + color); }
}

public class InterfaceAbstractDemo {
    public static void main(String[] args) {
        Circle c = new Circle("Red", 5);
        c.draw();
        c.info();  // Default method from interface
        System.out.println("Area: " + c.area());
    }
}
```

---

## Section: Quick Reference — Exam Code Templates

| Problem Type | Template |
|--------------|----------|
| **Class with encapsulation** | Private fields + public getters/setters + validation |
| **Inheritance demo** | Base class + 3 derived + test array with polymorphic calls |
| **Aggregation vs Composition** | Aggregation: part passed in; Composition: `new Part()` in constructor |
| **Grade calculator** | Input → compute total → if-else chain → output |
| **Factorial big** | `BigInteger` + `for` loop + `multiply()` |
| **Max of two** | Ternary `(a>b)?a:b` or `Math.max()` |
| **Exception handling** | try-catch-finally + throws + custom Exception subclass |
| **Collections** | `List<String>`, `Map<String,Integer>`, `Collections.sort()` |
| **File I/O** | try-with-resources + `BufferedReader`/`PrintWriter` |

---

## Glossary Terms — Exam Reference

[[dog-class]], [[encapsulation]], [[identifier]], [[keyword]], [[while-loop]], [[do-while-loop]], [[factorial]], [[biginteger]], [[grade-calculator]], [[max-function]], [[inheritance]], [[polymorphism]], [[aggregation]], [[composition]], [[java-class-properties]], [[exception-handling]], [[custom-exception]], [[collections]], [[generics]], [[file-io]], [[interface]], [[abstract-class]], [[try-catch-finally]], [[throws]], [[throw]], [[serializable]], [[bufferedreader]], [[printwriter]]
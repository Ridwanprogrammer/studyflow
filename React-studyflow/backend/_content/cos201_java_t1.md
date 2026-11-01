# COS 201 Track B: Java OOP — Topic 1
# Java Fundamentals: Identifiers, Keywords, Primitives, Control Flow

## The Central Idea

Before diving into OOP, you need solid **Java syntax fundamentals**. The exam tests: valid identifiers, reserved keywords, primitive types, operators, and control structures (while, do-while, for). These are the building blocks for every Java program.

---

## Why It Matters — Past Exam Coverage

| Past Exam Question | This Topic Covers |
|--------------------|-------------------|
| "What are Identifiers in JAVA, and what are the several points to remember about identifiers?" | Identifiers rules |
| "What would happen if you used Java keywords as a variable or identifier?" | Keywords |
| "Write and explain the syntax of the followings java iteration constructs: while-loop, do-while loop" | Control flow |
| "Write a java program that will compute factorial of 1000 using for... loop" | Loops + BigInteger |

---

## Section 1 — Identifiers

### Definition
An **identifier** is a name given to a program element: class, interface, method, variable, package, constant.

### Rules (Must Follow)

| Rule | Example |
|------|---------|
| **Start with** letter (A-Z, a-z), `_`, or `$` | `score`, `_count`, `$price` |
| **Subsequent chars** can be letters, digits, `_`, `$` | `score1`, `total_2` |
| **Case-sensitive** | `Score` ≠ `score` |
| **No length limit** (practical: <64 chars) | `thisIsAVeryLongIdentifierName` |
| **Cannot be a keyword** | `class`, `int`, `if` — illegal |
| **Unicode allowed** | `résumé`, `π`, `变量` (but avoid) |

### Naming Conventions (Not Enforced, But Standard)

| Element | Convention | Example |
|---------|------------|---------|
| **Class/Interface** | PascalCase | `Student`, `Comparable` |
| **Method/Variable** | camelCase | `getName()`, `studentCount` |
| **Constant** | UPPER_SNAKE_CASE | `MAX_SIZE`, `DEFAULT_PORT` |
| **Package** | lowercase, reverse domain | `com.university.cs` |

### Invalid Identifiers
```java
2score      // Starts with digit
class       // Keyword
my-variable // Hyphen not allowed
@email      // @ not allowed
```

---

## Section 2 — Keywords (Reserved Words)

### Definition
**Keywords** are reserved words with predefined meaning in Java. **Cannot be used as identifiers.**

### Complete List (Java 17)

| Category | Keywords |
|----------|----------|
| **Access** | `public`, `protected`, `private` |
| **Class/Interface** | `class`, `interface`, `enum`, `record`, `extends`, `implements`, `abstract`, `final` |
| **Primitive Types** | `byte`, `short`, `int`, `long`, `float`, `double`, `boolean`, `char`, `void` |
| **Control Flow** | `if`, `else`, `switch`, `case`, `default`, `for`, `while`, `do`, `break`, `continue`, `return`, `throw`, `try`, `catch`, `finally`, `assert` |
| **Modifiers** | `static`, `synchronized`, `volatile`, `transient`, `native`, `strictfp` |
| **Object** | `new`, `this`, `super`, `instanceof` |
| **Package** | `package`, `import` |
| **Unused (Reserved)** | `goto`, `const` |
| **Contextual** | `var`, `yield`, `sealed`, `non-sealed`, `permits`, `module`, `exports`, `opens`, `requires`, `transitive`, `provides`, `uses`, `to` |

### What Happens If You Use a Keyword as Identifier?

```java
int class = 5;  // COMPILE ERROR: "class" is a keyword
int int = 10;   // COMPILE ERROR
```

**Compiler Error:** "`<identifier>` expected" or "not a statement"

---

## Section 3 — Primitive Types

| Type | Size | Range | Default | Wrapper |
|------|------|-------|---------|---------|
| `byte` | 8-bit | -128 to 127 | 0 | `Byte` |
| `short` | 16-bit | -32,768 to 32,767 | 0 | `Short` |
| `int` | 32-bit | -2³¹ to 2³¹-1 | 0 | `Integer` |
| `long` | 64-bit | -2⁶³ to 2⁶³-1 | 0L | `Long` |
| `float` | 32-bit | ~±3.4×10³⁸ (7 digits) | 0.0f | `Float` |
| `double` | 64-bit | ~±1.7×10³⁰⁸ (15 digits) | 0.0 | `Double` |
| `boolean` | 1-bit (JVM) | `true` / `false` | `false` | `Boolean` |
| `char` | 16-bit | Unicode 0 to 65,535 | `'\u0000'` | `Character` |

### Literals
```java
int i = 42;
long l = 42L;          // L suffix
float f = 3.14f;       // f suffix
double d = 3.14;       // default
char c = 'A';          // single quotes
boolean b = true;      // lowercase
```

### Type Promotion (Widening)
`byte → short → int → long → float → double`

```java
int i = 10;
double d = i;  // Implicit: int → double
```

### Narrowing (Explicit Cast)
```java
double d = 10.5;
int i = (int) d;  // i = 10 (truncates)
```

---

## Section 4 — Control Flow Statements

### if-else
```java
if (condition) {
    // block
} else if (otherCondition) {
    // block
} else {
    // block
}
```

### switch (Enhanced Java 12+)
```java
String day = switch (dayNum) {
    case 1 -> "Monday";
    case 2 -> "Tuesday";
    default -> "Invalid";
};
```

### while Loop
**Syntax:**
```java
while (condition) {
    // body
}
```
- **Pre-test** — condition checked BEFORE each iteration
- Zero or more iterations
- Use when iterations unknown

**Example:**
```java
int sum = 0, i = 1;
while (i <= 10) {
    sum += i;
    i++;
}
```

### do-while Loop
**Syntax:**
```java
do {
    // body
} while (condition);
```
- **Post-test** — body executes AT LEAST ONCE
- Condition checked AFTER iteration
- Use when at least one iteration needed (e.g., menus)

**Example:**
```java
int choice;
do {
    System.out.println("1. Add\n2. Exit");
    choice = scanner.nextInt();
} while (choice != 2);
```

### for Loop
**Syntax:**
```java
for (init; condition; update) {
    // body
}
```

**Enhanced for (for-each):**
```java
for (String name : names) {
    System.out.println(name);
}
```

---

## Section 5 — Operators

### Arithmetic
| Op | Name | Example |
|----|------|---------|
| `+` | Add | `a + b` |
| `-` | Subtract | `a - b` |
| `*` | Multiply | `a * b` |
| `/` | Divide | `a / b` |
| `%` | Modulo (remainder) | `a % b` |

### Relational
`==`, `!=`, `>`, `<`, `>=`, `<=`

### Logical
| Op | Name | Short-circuit? |
|----|------|----------------|
| `&&` | AND | Yes |
| `||` | OR | Yes |
| `!` | NOT | — |

### Bitwise
`&`, `|`, `^`, `~`, `<<`, `>>`, `>>>`

### Ternary
```java
int max = (a > b) ? a : b;
```

---

## Section 6 — Past Exam Problems

### Problem 1: Identifiers & Keywords
> **What are Identifiers in JAVA, and what are the several points to remember about identifiers?**

**Answer:** (See Section 1 — Rules + Conventions)

> **What would happen if you used Java keywords as a variable or identifier in your Java program?**

**Answer:** Compile-time error. Keywords are reserved; cannot be used as names.

---

### Problem 2: Loop Syntax
> **Write and explain the syntax of while-loop and do-while loop.**

**While Loop:**
```java
while (condition) {
    // body executes while condition is true
}
```
- Pre-test, zero+ iterations

**Do-While Loop:**
```java
do {
    // body executes at least once
} while (condition);
```
- Post-test, one+ iterations

---

### Problem 3: Factorial of 1000
> **Write a java program that will compute factorial of 1000 using for... loop.**

**Key Insight:** 1000! has 2568 digits — **does not fit in `long`** (max 20!). Must use `BigInteger`.

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

## Section 7 — Self-Check Questions

1. Is `myVariable` a valid identifier? What about `2ndPlace`?
2. What error occurs if you write `int for = 5;`?
3. What is the default value of `boolean`?
4. Which loop guarantees at least one execution?
5. How do you compute 1000! in Java?
6. What is the difference between `while` and `do-while`?

---

## Solutions

1. `myVariable` ✓ valid; `2ndPlace` ✗ starts with digit
2. Compile error: "`for` is a keyword"
3. `false`
4. `do-while`
5. Use `BigInteger` with `multiply()` in a loop
6. `while` checks before; `do-while` checks after (runs once minimum)

---

## Glossary Terms

[[identifier]], [[keyword]], [[reserved-word]], [[primitive-type]], [[wrapper-class]], [[type-promotion]], [[narrowing-cast]], [[control-flow]], [[while-loop]], [[do-while-loop]], [[for-loop]], [[enhanced-for]], [[if-else]], [[switch-expression]], [[operator]], [[arithmetic-operator]], [[relational-operator]], [[logical-operator]], [[bitwise-operator]], [[ternary-operator]], [[biginteger]], [[factorial]], [[compile-error]], [[naming-convention]], [[pascalcase]], [[camelcase]], [[snake-case]]
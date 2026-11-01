# COS 201 Track B: Java OOP — Topic 5
# Exception Handling

## The Central Idea

**Exceptions** are objects representing errors or exceptional conditions. Java's exception handling mechanism (`try-catch-finally`, `throw`, `throws`) lets you separate error-handling code from normal logic, making programs more robust and maintainable.

---

## Why It Matters — Past Exam Coverage

| Past Exam Question | This Topic Covers |
|--------------------|-------------------|
| "Exception Handling: try/catch/finally, throws, custom exceptions" | Core Java exception handling |

---

## Section 1 — Exception Hierarchy

```
java.lang.Throwable
├── java.lang.Error (Unchecked) — Serious, usually unrecoverable
│   ├── OutOfMemoryError
│   ├── StackOverflowError
│   └── ...
└── java.lang.Exception
    ├── java.lang.RuntimeException (Unchecked) — Programming errors
    │   ├── NullPointerException
    │   ├── ArrayIndexOutOfBoundsException
    │   ├── IllegalArgumentException
    │   ├── ArithmeticException
    │   └── ...
    └── Checked Exceptions — Must be caught or declared
        ├── IOException
        ├── FileNotFoundException
        ├── SQLException
        ├── ClassNotFoundException
        └── ...
```

**Key Distinction:**
- **Checked** — Compiler enforces handling (catch or throws). Extends `Exception` but not `RuntimeException`.
- **Unchecked** — Compiler doesn't enforce. Extends `RuntimeException` or `Error`.

---

## Section 2 — try-catch-finally

### Syntax
```java
try {
    // Risky code
} catch (ExceptionType1 e) {
    // Handle ExceptionType1
} catch (ExceptionType2 e) {
    // Handle ExceptionType2
} finally {
    // Always executes (cleanup)
}
```

### Rules
- **At least one** `catch` or `finally` required
- `catch` blocks ordered **specific → general**
- `finally` runs **always** (even with `return` in try/catch)
- `finally` **does not run** if `System.exit()` called

### Example
```java
public double divide(double a, double b) {
    try {
        if (b == 0) {
            throw new ArithmeticException("Division by zero");
        }
        return a / b;
    } catch (ArithmeticException e) {
        System.err.println("Error: " + e.getMessage());
        return Double.NaN;
    } finally {
        System.out.println("Division operation completed");
    }
}
```

---

## Section 3 — throws Clause

### Purpose
Declare that a method **may throw** checked exceptions. Caller must handle.

```java
public void readFile(String path) throws IOException, FileNotFoundException {
    FileReader reader = new FileReader(path);
    // ... read
    reader.close();
}
```

### Rules
- **Checked exceptions** must be caught or declared
- **Unchecked** (`RuntimeException`, `Error`) optional
- Overriding method: can throw **same or narrower** checked exceptions

---

## Section 4 — throw Statement

### Explicitly Throw Exception
```java
public void setAge(int age) {
    if (age < 0 || age > 150) {
        throw new IllegalArgumentException("Invalid age: " + age);
    }
    this.age = age;
}
```

### Re-throwing
```java
try {
    // ...
} catch (IOException e) {
    // Log, then re-throw
    throw new RuntimeException("File error", e);  // Wrap
    // OR: throw e;  // Re-throw same
}
```

---

## Section 5 — try-with-resources (Java 7+)

### Auto-close Resources
```java
// Before: manual close in finally
FileReader reader = null;
try {
    reader = new FileReader("file.txt");
    // read
} finally {
    if (reader != null) reader.close();
}

// After: try-with-resources (AutoCloseable)
try (FileReader reader = new FileReader("file.txt");
     BufferedReader br = new BufferedReader(reader)) {
    String line = br.readLine();
    // ...
} // Auto-closed!
```

### Multiple Resources
```java
try (Connection conn = DriverManager.getConnection(url);
     Statement stmt = conn.createStatement();
     ResultSet rs = stmt.executeQuery(sql)) {
    // use resources
} // Closed in reverse order
```

---

## Section 6 — Custom Exceptions

### Checked Custom Exception
```java
public class InsufficientFundsException extends Exception {
    private double balance;
    private double requested;
    
    public InsufficientFundsException(String message, double balance, double requested) {
        super(message);
        this.balance = balance;
        this.requested = requested;
    }
    
    public double getBalance() { return balance; }
    public double getRequested() { return requested; }
}
```

### Unchecked Custom Exception
```java
public class InvalidTransactionException extends RuntimeException {
    public InvalidTransactionException(String message) {
        super(message);
    }
    
    public InvalidTransactionException(String message, Throwable cause) {
        super(message, cause);
    }
}
```

### Usage
```java
public void withdraw(double amount) throws InsufficientFundsException {
    if (amount > balance) {
        throw new InsufficientFundsException(
            "Cannot withdraw " + amount, balance, amount);
    }
    balance -= amount;
}
```

---

## Section 7 — Multi-catch (Java 7+)

```java
try {
    // ...
} catch (IOException | SQLException e) {
    // Handle both
    e.printStackTrace();
}
```

---

## Section 8 — Best Practices

| Practice | Reason |
|----------|--------|
| **Catch specific** | Avoid catching `Exception` broadly |
| **Don't swallow** | Log or re-throw; empty catch hides bugs |
| **Use finally/try-with-resources** | Prevent resource leaks |
| **Custom exceptions** | Domain-specific, carry context |
| **Fail fast** | Validate early, throw descriptive exceptions |
| **Document** | Javadoc `@throws` for checked exceptions |

---

## Section 9 — Past Exam Answer

> **Explain try/catch/finally, throws, custom exceptions.**

**Answer Structure:**
1. **try-catch-finally** — syntax, rules, finally always runs
2. **throws** — declare checked exceptions, caller responsibility
3. **throw** — explicitly throw exception objects
4. **try-with-resources** — auto-close `AutoCloseable`
5. **Custom exceptions** — extend `Exception` (checked) or `RuntimeException` (unchecked), add context fields
6. **Code example** showing all

---

## Section 10 — Self-Check Questions

1. Difference between checked and unchecked?
2. Can finally run after return?
3. What happens if you don't catch a checked exception?
4. How to auto-close a resource?
5. When to create checked vs unchecked custom exception?
6. Order of catch blocks?

---

## Solutions

1. Checked = compiler enforces; Unchecked = RuntimeException/Error
2. Yes, finally runs even after return
3. Compile error
4. `try (Resource r = ...) { }`
5. Checked for recoverable conditions caller should handle; Unchecked for programming errors
6. Most specific first, general last

---

## Glossary Terms

[[exception]], [[throwable]], [[error]], [[runtime-exception]], [[checked-exception]], [[unchecked-exception]], [[try-catch]], [[finally]], [[throws]], [[throw]], [[try-with-resources]], [[autocloseable]], [[custom-exception]], [[exception-hierarchy]], [[null-pointer-exception]], [[array-index-out-of-bounds]], [[illegal-argument-exception]], [[io-exception]], [[file-not-found]], [[sql-exception]], [[multi-catch]], [[exception-chaining]], [[fail-fast]], [[resource-leak]], [[stack-trace]], [[print-stack-trace]]
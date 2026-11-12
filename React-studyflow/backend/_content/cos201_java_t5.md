# Exception Handling

## An exceptional situation needs a visible path

A file may be missing, a network may be unavailable, or a user may enter text where a number is required. If a method cannot complete its normal task, it needs a way to report the problem to the code that can respond.

An **exception** is an object describing an abnormal condition or failure. Throwing an exception interrupts the normal path and searches outward for a matching handler.

## The exception hierarchy

At the top is `Throwable`, with two main branches:

- `Error` represents serious conditions applications usually should not try to recover from.
- `Exception` represents conditions an application may handle.

`RuntimeException` and its subclasses are unchecked exceptions. Other exceptions are checked: a method must catch them or declare them with `throws`, allowing the compiler to require that callers consider the condition.

## Handle an exception with try and catch

```java
try {
    int value = Integer.parseInt(input);
    System.out.println(value);
} catch (NumberFormatException exception) {
    System.out.println("Enter a whole number.");
}
```

The `try` contains code that may fail; `catch` handles a matching exception. Catch the most specific expected condition, and provide useful recovery or a clear message. Catching `Exception` broadly and doing nothing hides failures.

## Use finally and try-with-resources appropriately

A `finally` block runs whether the `try` succeeds or throws, and is traditionally used for cleanup. For resources implementing `AutoCloseable`, **try-with-resources** closes them automatically:

```java
try (BufferedReader reader = Files.newBufferedReader(path)) {
    return reader.readLine();
}
```

This is safer than manually closing in multiple paths. If cleanup itself can fail, Java's try-with-resources defines how those exceptions are reported.

## Throw or declare an exception

Use `throw` to signal a failure at the point it is detected. Use `throws` in a method declaration to state that a checked exception may be passed to its caller.

```java
static int divide(int numerator, int denominator) {
    if (denominator == 0) {
        throw new IllegalArgumentException("Denominator must not be zero");
    }
    return numerator / denominator;
}
```

Validate a method's own preconditions with an appropriate exception. Do not use exceptions as routine control flow when an ordinary condition is expected.

## Choose a recovery boundary

The code closest to a failure may know that a file is missing, but a user-facing layer may know how to offer a retry. Handle an exception where there is enough context to recover meaningfully; otherwise propagate it with relevant information.

**Practice:** If parsing user input fails, should the application pretend the number was zero? No. That success-shaped fallback can corrupt later results. Report the invalid input or ask the user to correct it.

# Java Fundamentals: Names, Types, Expressions, and Control Flow

## A program handles values by giving them names and rules

Think of a program as a sequence of instructions operating on stored values. A variable gives a value a name; a type describes what kind of value it is and which operations make sense; control flow decides which instruction runs next.

Java is statically typed: the compiler checks declared types before the program runs. This catches many mismatches early, though it cannot prove the whole program is correct.

## Identifiers and keywords

An **identifier** is a name chosen for a variable, method, class, or package. It may contain letters, digits, `_`, and `$`, but cannot start with a digit. Java is case-sensitive: `score` and `Score` are different names.

A **keyword** is reserved by the language and cannot be used as an identifier. Examples include `class`, `int`, `if`, `return`, and `new`. Choose names that reveal purpose, such as `totalCredits` rather than `x`.

## Primitive values and variables

Java primitive types include integer types (`byte`, `short`, `int`, `long`), floating-point types (`float`, `double`), `char`, and `boolean`. A declaration gives the type and name:

```java
int credits = 18;
double average = 4.25;
boolean passed = true;
char grade = 'A';
```

An assignment stores a value in a variable. `credits = credits + 1;` reads the old value, adds one, and stores the result back. A variable's type restricts which values it can store; assigning an incompatible value requires a valid conversion or produces a compile-time error.

`String` is not a primitive; it is a class representing text. Text literals use double quotes, while a `char` literal uses single quotes.

## Expressions and operators

Arithmetic operators include `+`, `-`, `*`, `/`, and `%` (remainder). If both operands of integer division are integers, the result is an integer: `7 / 2` gives `3`, while `7.0 / 2` gives `3.5`.

Comparison operators (`==`, `!=`, `<`, `<=`, `>`, `>=`) produce a boolean. Logical operators `&&`, `||`, and `!` combine or reverse boolean conditions. `&&` and `||` short-circuit: the second condition is not evaluated when the first already determines the result.

Use parentheses when precedence is not obvious. For object values such as strings, `==` compares references, not text contents; use `.equals()` to compare string contents.

## Let conditions choose a path

An `if` statement runs a branch when its condition is true:

```java
if (score >= 50) {
    System.out.println("Pass");
} else {
    System.out.println("Try again");
}
```

The condition must be boolean. For several exclusive cases, `else if` or `switch` may make the choices clearer.

## Repeat work with loops

A `while` loop repeats while its condition remains true; use it when the number of repetitions depends on a condition. A `for` loop places initialization, continuation condition, and update together; use it for a count-controlled repetition.

```java
int sum = 0;
for (int i = 1; i <= 5; i++) {
    sum += i;
}
```

The loop adds 1 through 5. The update `i++` moves toward the stopping condition. If no state change can make the condition false, the loop may run forever.

**Pause and trace:** Starting at `i = 1`, the body runs when `i <= 5`; the update increases `i` after each run. The final sum is 15, and when `i` reaches 6 the condition fails.

## Build a small program and check it

```java
public class GradeCheck {
    public static void main(String[] args) {
        int score = 72;
        if (score >= 50) {
            System.out.println("Pass");
        } else {
            System.out.println("Try again");
        }
    }
}
```

The class contains the program; `main` is its entry point; execution checks the condition and prints one branch. Compile-time errors, runtime errors, and incorrect logic are different problems, so compilation alone does not establish correctness.

**Practice:** Write a loop that adds the integers from 1 through 10, then predict the result before running it. The sum is 55.

# Exam Problem Workshop: Java Object-Oriented Programming

## Explain what the code does before writing syntax

In an exam, first identify the requested concept: state, visibility, inheritance, polymorphism, exception handling, collections, or file I/O. Then choose a small design that demonstrates that concept and trace the result. Correct reasoning makes the code easier to write and debug.

## Model an object with a class

Suppose a `Dog` has a name and can bark. The class describes common structure; an object is one particular dog.

```java
class Dog {
    private final String name;

    Dog(String name) {
        this.name = name;
    }

    public void bark() {
        System.out.println(name + " says woof");
    }
}
```

The field is private so outside code cannot change it directly. The constructor gives the object its initial name; `final` prevents reassignment after construction.

## Explain encapsulation by protecting a rule

For a bank account, a balance should not become negative through arbitrary assignment. Keep the field private and provide operations that preserve the invariant:

```java
class Account {
    private double balance;

    public void deposit(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Amount must be positive");
        }
        balance += amount;
    }

    public double getBalance() {
        return balance;
    }
}
```

Encapsulation is not merely writing getters and setters; it gives the object control over valid state transitions.

## Trace inheritance and dynamic dispatch

```java
class Animal {
    public String sound() {
        return "sound";
    }
}

class Cat extends Animal {
    @Override
    public String sound() {
        return "meow";
    }
}

Animal pet = new Cat();
System.out.println(pet.sound());
```

The output is `meow`. The variable is declared as `Animal`, but the object is a `Cat`; the overridden instance method is selected at runtime. That is polymorphism.

## Use exceptions to report invalid input

If a method receives a negative deposit, silently accepting it creates invalid state. Throw a specific exception or return a clearly documented failure result. Catch an exception only where the program can respond, such as asking the user to enter a valid amount again.

## Pick a collection for its behaviour

Use a `List` when order and duplicates matter, a `Set` when values must be unique, and a `Map` for key-to-value lookup. Generics such as `List<String>` let the compiler enforce the element type.

## File-I/O question checklist

When asked to read or write a file, name the path, choose text or byte streams, state the intended overwrite/append behaviour, close the resource with try-with-resources, and account for `IOException`.

**Final self-check:** Before submitting code, identify which class owns each field, whether a method should be public or private, which object implementation runs, and what happens for invalid input. Compile mentally for braces, types, constructor names, and method signatures, then trace one normal and one boundary case.

# Inheritance and Polymorphism

## Reuse a common contract without treating every object as identical

Several kinds of account may share an account number and a balance, while applying different rules to withdrawals. Inheritance can represent the shared “is-a” relationship; polymorphism lets code use a common type while the actual object chooses its specialized behavior.

## Inheritance creates a subtype

If `SavingsAccount` extends `Account`, every savings account is an account. The subclass can reuse accessible fields and methods, add new behavior, or override an inherited method.

```java
class Account {
    public void withdraw(double amount) {
        // common withdrawal behaviour
    }
}

class SavingsAccount extends Account {
    @Override
    public void withdraw(double amount) {
        // apply savings-account rules
    }
}
```

`@Override` asks the compiler to check that a matching superclass method exists. In Java, a class has one direct superclass, though it can implement multiple interfaces.

Private superclass fields are not directly accessible in subclasses; use a controlled method or suitable protected design. Avoid making fields protected merely for convenience because it couples subclasses to internal representation.

## Polymorphism selects behaviour at runtime

```java
Account account = new SavingsAccount();
account.withdraw(100);
```

The variable's declared type is `Account`, but the object is a `SavingsAccount`. For an overridden instance method, Java dispatches to the implementation belonging to the actual object. This is **dynamic dispatch**.

A collection can therefore hold different subtypes and call their common operations without a long chain of type checks. Polymorphism makes extension easier when the common contract is well designed.

## An inheritance contract must remain valid

The Liskov Substitution Principle says a subtype should be usable wherever its parent is expected without breaking promised behaviour. If `Account.withdraw` promises that a valid withdrawal reduces the balance, a subtype that silently does something unrelated violates the contract even if it compiles.

Use inheritance for a true subtype relationship. If one object merely owns or uses another object, composition may be more accurate.

## Abstract classes and interfaces

An **abstract class** can provide shared state and implementation while leaving some methods for subclasses. It cannot be instantiated directly.

An **interface** defines a contract that unrelated classes can implement. A class can implement multiple interfaces, which is useful when different types share a capability but not a common parent implementation.

```java
interface Payable {
    double amountDue();
}
```

Code that depends on `Payable` can work with any implementation that provides `amountDue()`.

**Practice:** A list of `Shape` objects calls `area()` on each. If `Circle` and `Rectangle` override `area()`, each object's implementation runs through the common `Shape` reference. This is polymorphism; the loop does not need to ask the object's class first.

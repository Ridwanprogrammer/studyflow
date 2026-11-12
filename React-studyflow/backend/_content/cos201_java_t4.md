# Aggregation and Composition in Code

## “Has a” can mean different kinds of ownership

A university has students, and a student's record may include enrollments. But if a department is reorganized, students do not cease to exist. By contrast, a line item may exist only as part of one particular order in a simple order model.

Both are **has-a** relationships, but their lifecycle meanings differ:

- **Aggregation** is a weak whole-part relationship: the part can exist independently of the whole.
- **Composition** is strong ownership: the part's lifecycle is controlled by its whole.

These are domain-model decisions, not merely syntax choices.

## Aggregation in Java

Java does not have a special aggregation keyword. A class holds a reference to another object, and the ownership policy is expressed through how objects are created and managed.

```java
class Team {
    private final List<Player> players;

    Team(List<Player> players) {
        this.players = new ArrayList<>(players);
    }
}
```

Players can exist and move between teams independently. Copying the list protects the collection structure, though the `Player` objects are still shared references.

## Composition in Java

```java
class Order {
    private final List<LineItem> items = new ArrayList<>();

    public void addItem(String name, int quantity) {
        items.add(new LineItem(name, quantity));
    }

    private static class LineItem {
        private final String name;
        private final int quantity;

        private LineItem(String name, int quantity) {
            this.name = name;
            this.quantity = quantity;
        }
    }
}
```

Here, the order controls creation and access to its line items. The model communicates that a line item belongs to that order. Java's garbage collector manages memory; composition is about domain ownership and lifecycle, not manually freeing memory.

## Choose the relationship from the rules

Ask:

1. Can the part be created or used without this whole?
2. Can it be shared among several wholes?
3. If the whole is removed, should the part remain meaningful?
4. Who is responsible for constructing and changing the part?

A `Car` and `Engine` may be modeled as composition when the engine is treated as part of that car in the system. A `Library` and `Book` are often an association or aggregation because books can exist independently and move between libraries.

## Avoid confusing composition with inheritance

Inheritance means “is a”; composition means “has a.” A `SavingsAccount` is an `Account`. A `Car` has an `Engine`. Choosing inheritance only to reuse code can create a false model and make future changes difficult.

**Practice:** In a university system, should `Department` compose `Student`? Usually not: a student can transfer or remain in the system if a department changes. A department may associate with students, but it does not own their existence.

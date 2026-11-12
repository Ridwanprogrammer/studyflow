# Collections and Generics

## Choose a container based on how you use the data

Programs often need more than one value: a list of courses, a unique set of student IDs, or a mapping from a course code to a course. Java's Collections Framework provides interfaces and implementations for these common structures.

- A `List` keeps elements in sequence and allows duplicates.
- A `Set` keeps unique elements according to equality.
- A `Map` associates keys with values; keys are unique.
- A `Queue` represents items awaiting processing.

The interface describes behaviour; the implementation determines details such as performance and ordering.

## Lists: ArrayList and LinkedList

`ArrayList` stores elements in a resizable array. It provides fast indexed access and is a common default. Inserting or removing near the beginning may shift many elements.

`LinkedList` stores elements as linked nodes. It can insert or remove efficiently when the relevant position is already known, but accessing an arbitrary index requires traversal. Choosing it by habit does not automatically make a program faster.

```java
List<String> courses = new ArrayList<>();
courses.add("CSC215");
courses.add("MTH201");
System.out.println(courses.get(0));
```

Declare variables using the interface when possible; this reduces dependence on the implementation.

## Sets and maps use equality and hashing

A `HashSet` and `HashMap` use hash codes to locate candidates and equality to distinguish keys. If two objects are equal according to `equals`, they must return the same `hashCode`. Overriding one without the other can make lookups behave incorrectly.

```java
Map<String, Integer> creditsByCourse = new HashMap<>();
creditsByCourse.put("CSC215", 3);
int credits = creditsByCourse.get("CSC215");
```

Use `containsKey` or `getOrDefault` when a key may be absent. A `TreeSet` or `TreeMap` keeps elements ordered according to natural order or a supplied comparator, with different performance trade-offs.

## Generics make the element type explicit

Generics let a collection declare what type it stores:

```java
List<String> names = new ArrayList<>();
```

The compiler rejects adding an `Integer` to this list and returns `String` values without a cast. The type parameter `<String>` turns a runtime surprise into a compile-time check.

Generic types work with reference types, not primitive types; use wrappers such as `Integer` instead of `int`. Java's autoboxing converts between them in many contexts.

## Iterate safely

An enhanced for loop visits each element:

```java
for (String course : courses) {
    System.out.println(course);
}
```

Use an `Iterator` when removing elements during traversal. Modifying many standard collections structurally during an enhanced for loop can trigger `ConcurrentModificationException`.

**Practice:** Choose a structure for (1) ordered exam questions that may repeat, (2) unique course codes, and (3) looking up a course by code. Reasonable choices are `List`, `Set`, and `Map`, respectively.

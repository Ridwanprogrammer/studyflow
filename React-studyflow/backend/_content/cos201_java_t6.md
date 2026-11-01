# COS 201 Track B: Java OOP — Topic 6
# Collections & Generics

## The Central Idea

The **Collections Framework** provides ready-to-use data structures (List, Set, Map, Queue). **Generics** add type safety to collections, eliminating casts and catching errors at compile time.

---

## Why It Matters — Past Exam Coverage

| Past Exam Question | This Topic Covers |
|--------------------|-------------------|
| "Collections & Generics: List, Set, Map, Iterator, generics syntax" | Core collections usage |

---

## Section 1 — Collections Hierarchy

```
java.util.Collection (interface)
├── List (ordered, duplicates allowed)
│   ├── ArrayList (dynamic array, fast random access)
│   ├── LinkedList (doubly-linked, fast insert/delete)
│   └── Vector (synchronized, legacy)
├── Set (no duplicates)
│   ├── HashSet (hash table, no order)
│   ├── LinkedHashSet (insertion order)
│   └── TreeSet (sorted, Red-Black tree)
└── Queue (FIFO/ordered)
    ├── PriorityQueue (heap, priority order)
    ├── ArrayDeque (double-ended queue)
    └── LinkedList (also implements Queue)

Map (interface) — not a Collection
├── HashMap (hash table, no order)
├── LinkedHashMap (insertion order)
├── TreeMap (sorted keys)
├── Hashtable (synchronized, legacy)
└── Properties (String key/value, legacy)
```

---

## Section 2 — List

### ArrayList vs LinkedList
| Operation | ArrayList | LinkedList |
|-----------|-----------|------------|
| `get(index)` | O(1) | O(n) |
| `add/remove end` | O(1)* | O(1) |
| `add/remove middle` | O(n) | O(1)† |
| Memory | Less overhead | More (node objects) |

*Amortized. †If you have the node reference.

### Common Operations
```java
List<String> names = new ArrayList<>();
names.add("Alice");           // Add to end
names.add(0, "Bob");          // Insert at index
names.get(1);                 // Access
names.set(1, "Charlie");      // Replace
names.remove(0);              // Remove by index
names.remove("Bob");          // Remove by object
names.size();                 // Count
names.contains("Alice");      // Search
names.isEmpty();
names.clear();
```

---

## Section 3 — Set

### No Duplicates, No Guaranteed Order (HashSet)
```java
Set<Integer> unique = new HashSet<>();
unique.add(1);
unique.add(2);
unique.add(1);  // Ignored
// unique = [1, 2] (order not guaranteed)
```

### LinkedHashSet — Insertion Order
```java
Set<String> ordered = new LinkedHashSet<>();
ordered.add("C");
ordered.add("A");
ordered.add("B");
// Iteration: C, A, B
```

### TreeSet — Sorted
```java
Set<Integer> sorted = new TreeSet<>();
sorted.add(3);
sorted.add(1);
sorted.add(2);
// Iteration: 1, 2, 3
```

---

## Section 4 — Map

### Key-Value Pairs, Unique Keys
```java
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 95);
scores.put("Bob", 87);
scores.get("Alice");        // 95
scores.get("Charlie");      // null
scores.put("Alice", 98);    // Replace
scores.remove("Bob");
scores.containsKey("Alice");
scores.containsValue(95);
scores.keySet();            // Set of keys
scores.values();            // Collection of values
scores.entrySet();          // Set of Map.Entry
```

### Iterating Map
```java
// 1. Keys
for (String name : scores.keySet()) {
    System.out.println(name + ": " + scores.get(name));
}

// 2. Entries (preferred)
for (Map.Entry<String, Integer> e : scores.entrySet()) {
    System.out.println(e.getKey() + " = " + e.getValue());
}

// 3. Java 8+ forEach
scores.forEach((k, v) -> System.out.println(k + " = " + v));
```

---

## Section 5 — Generics

### Why Generics?
- **Type safety** — compile-time checking
- **No casts** — cleaner code
- **Reusability** — one class, many types

### Generic Class
```java
public class Box<T> {
    private T content;
    
    public void set(T item) { content = item; }
    public T get() { return content; }
}

// Usage
Box<String> stringBox = new Box<>();
stringBox.set("Hello");
String s = stringBox.get();  // No cast needed

Box<Integer> intBox = new Box<>();
intBox.set(42);
```

### Generic Method
```java
public <T> void printArray(T[] array) {
    for (T item : array) {
        System.out.println(item);
    }
}

// Usage
printArray(new String[]{"A", "B"});
printArray(new Integer[]{1, 2, 3});
```

### Bounded Type Parameters
```java
// T must be Number or subclass
public <T extends Number> double sum(T[] nums) {
    double total = 0;
    for (T n : nums) total += n.doubleValue();
    return total;
}

// Usage: sum(new Integer[]{1,2,3}) OK
// sum(new String[]{"a"}) COMPILE ERROR
```

### Wildcards
| Syntax | Meaning |
|--------|---------|
| `?` | Any type |
| `? extends T` | T or subtype (upper bound) |
| `? super T` | T or supertype (lower bound) |

```java
// Upper bound: read-only (can't add except null)
public void printNumbers(List<? extends Number> list) {
    for (Number n : list) System.out.println(n);
}

// Lower bound: write-only (can't read as specific type)
public void addIntegers(List<? super Integer> list) {
    list.add(42);  // OK
    // Integer i = list.get(0);  // ERROR
}
```

---

## Section 6 — Iterator & for-each

### Iterator
```java
List<String> list = new ArrayList<>(List.of("A", "B", "C"));
Iterator<String> it = list.iterator();
while (it.hasNext()) {
    String s = it.next();
    if (s.equals("B")) it.remove();  // Safe removal during iteration
}
```

### for-each (Enhanced for)
```java
for (String s : list) {
    System.out.println(s);
}
// Cannot remove during iteration
```

---

## Section 7 — Collections Utility Class

```java
List<Integer> nums = new ArrayList<>(List.of(3, 1, 4, 1, 5));

Collections.sort(nums);           // [1, 1, 3, 4, 5]
Collections.reverse(nums);        // [5, 4, 3, 1, 1]
Collections.shuffle(nums);        // Random order
Collections.max(nums);            // 5
Collections.min(nums);            // 1
Collections.frequency(nums, 1);   // 2
Collections.binarySearch(nums, 3); // Index (must be sorted)
Collections.swap(nums, 0, 1);     // Swap elements
Collections.fill(list, 0);        // All 0
Collections.nCopies(3, "x");      // ["x", "x", "x"]
```

---

## Section 8 — Comparable & Comparator

### Comparable (Natural Order)
```java
public class Student implements Comparable<Student> {
    private String name;
    private int score;
    
    @Override
    public int compareTo(Student other) {
        return Integer.compare(this.score, other.score);  // Ascending
    }
}
```

### Comparator (Custom Order)
```java
// By name descending
Comparator<Student> byNameDesc = (s1, s2) -> 
    s2.getName().compareTo(s1.getName());

// Multiple criteria
Comparator<Student> byScoreThenName = Comparator
    .comparingInt(Student::getScore)
    .thenComparing(Student::getName);
```

### Usage
```java
List<Student> students = ...;
students.sort(byNameDesc);  // List.sort(Comparator)
Collections.sort(students, byScoreThenName);
```

---

## Section 9 — Streams (Java 8+) — Brief

```java
List<String> names = List.of("Alice", "Bob", "Charlie", "David");

names.stream()
    .filter(n -> n.length() > 4)
    .map(String::toUpperCase)
    .sorted()
    .forEach(System.out::println);

// Output: ALICE, CHARLIE, DAVID
```

---

## Section 10 — Self-Check Questions

1. Difference between List and Set?
2. When to use ArrayList vs LinkedList?
3. How to iterate a Map?
3. What is a generic type parameter?
4. Difference between `extends` and `super` in wildcards?
5. How to sort a list with custom order?

---

## Solutions

1. List = ordered, allows duplicates. Set = no duplicates, no guaranteed order.
2. ArrayList for random access; LinkedList for frequent middle insert/delete.
3. `entrySet()` for keys+values, `keySet()` for keys only.
4. `? extends T` = upper bound (read); `? super T` = lower bound (write).
5. `list.sort(comparator)` or `Collections.sort(list, comparator)`.

---

## Glossary Terms

[[collections-framework]], [[collection]], [[list]], [[set]], [[map]], [[queue]], [[arraylist]], [[linkedlist]], [[hashset]], [[linkedhashset]], [[treeset]], [[hashmap]], [[linkedhashmap]], [[treemap]], [[generics]], [[type-parameter]], [[bounded-type]], [[wildcard]], [[upper-bound]], [[lower-bound]], [[type-erasure]], [[iterator]], [[comparable]], [[comparator]], [[collections-utility]], [[stream]], [[for-each]], [[enhanced-for]], [[diamond-operator]], [[raw-type]], [[generic-method]], [[generic-class]], [[type-safety]], [[cast]]
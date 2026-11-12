# Sets & Cartesian Products

## The Central Idea

Before jumping into formal definitions, let us ask a simple question: **What is a collection?**

Imagine you have a bag containing three distinct items: a red ball, a blue ball, and a green ball. In mathematics, we call this bag a **set**. The items inside are called **elements**. The bag doesn't care about order — {red, blue, green} is the same bag as {green, red, blue}. It also doesn't care about duplicates — {red, red, blue} is just {red, blue}.

Now, what if you need to pair items from two different bags? Say Bag A has {2, 3, 5} and Bag B has {0, 1}. How many ways can you pick one from A *and* one from B? That's a **Cartesian product** — the set of all ordered pairs where the first entry comes from A and the second from B.

This topic builds the foundation for everything in discrete mathematics: counting, relations, functions, and logic.

---

## Why It Matters

Past exams ask you to:
- Count ordered pairs from two sets (CSC 203 CA Test Q1)
- Count arrangements with restrictions (CSC 203 CA Test Q2 — flag with 3 blocks from 6 colours)
- List relations as sets of ordered pairs (CSC 203 CA Test Q3)
- Prove combinatorial identities (CSC 203 CA Test Q4)

All of these reduce to understanding sets, their sizes, and how to combine them.

---

## How the Idea Develops

The main ideas develop in this order:

**Section 1 — Conceptual Introduction** → What is a Set? → **Section 2 — Required Terminology** → **Section 3 — Intuitive Explanation** → **Section 4 — Formal Definitions** → **Section 5 — Operations on Sets** → **Section 6 — Cartesian Products & Ordered Pairs** → **Section 7 — Counting Principles** → **Section 8 — Worked Exam Problems**

Each later idea adds a capability, condition, or consequence to the earlier one.

---

## Section 1 — Conceptual Introduction

### What is a Set?

A **set** is an unordered collection of distinct objects, considered as an object in its own right. The objects are called **elements** or **members** of the set.

Think of a set as a **bag** (not a list, not a sequence) — it has no order, no duplicates, just membership.

```text
A = {2, 3, 5}          ← Bag containing three numbers
B = {0, 1}             ← Bag containing two numbers
C = {red, blue, green} ← Bag containing three colours
```

**Key insight:** {2, 3, 5} = {5, 2, 3} = {2, 2, 3, 5}. Order and repetition don't matter.

### What is an Element?

If object `x` belongs to set `A`, we write `x ∈ A` (read: "x is an element of A" or "x belongs to A"). If not, `x ∉ A`.

```text
2 ∈ {2, 3, 5}    ✓ True
4 ∉ {2, 3, 5}    ✓ True
```

### The Empty Set

The set with no elements is called the **empty set** or **null set**, denoted `∅` or `{}`. It's the bag with nothing in it.

```text
∅ = {}
|∅| = 0
```

---

## Section 2 — Required Terminology

To successfully master this topic, you must become familiar with its foundational vocabulary. Hover or tap on any [[term|term]] below to view its definition:

| Term | Role in This Topic |
|------|-------------------|
| [[set]] | The central object — an unordered collection of distinct elements |
| [[element]] | An individual member of a set |
| [[subset]] | A set whose every element is also in another set |
| [[cardinality]] | The number of elements in a set (denoted \|A\|) |
| [[empty-set]] | The unique set with no elements |
| [[union]] | Combining elements from two sets |
| [[intersection]] | Elements common to two sets |
| [[complement]] | Elements not in a given set (relative to a universe) |
| [[disjoint]] | Sets with no common elements |
| [[partition]] | Dividing a set into non-overlapping subsets |
| [[cartesian-product]] | The set of all ordered pairs from two sets |
| [[ordered-pair]] | A pair (a, b) where order matters: (a, b) ≠ (b, a) unless a = b |
| [[product-rule]] | If task 1 has m ways and task 2 has n ways, doing both has m×n ways |
| [[sum-rule]] | If task 1 has m ways and task 2 has n ways, doing one OR the other has m+n ways |
| [[factorial]] | n! = n × (n-1) × ... × 1, the number of ways to order n distinct items |
| [[permutation]] | An ordered arrangement of k items from n distinct items |
| [[combination]] | An unordered selection of k items from n distinct items |

---

## Section 3 — Intuitive Explanation

### The Bag Metaphor

Think of every set as a **transparent bag** holding distinct items.

- **Subset** (A ⊆ B): Every item in bag A is also in bag B. Bag A fits entirely inside bag B.
- **Proper Subset** (A ⊂ B): A ⊆ B but A ≠ B — bag A fits inside B but B has extra items.
- **Union** (A ∪ B): Dump both bags into a bigger bag. Remove duplicates.
- **Intersection** (A ∩ B): Keep only items that appear in *both* bags.
- **Complement** (Aᶜ or U \ A): Start with a "universe" bag U. Remove everything in A. What's left is the complement.
- **Disjoint**: Two bags with zero overlap. A ∩ B = ∅.
- **Partition**: Split one bag into several smaller bags with no overlap, such that every original item ends up in exactly one smaller bag.

### Ordered Pairs — When Order Matters

An **ordered pair** (a, b) is like a **two-slot container** where slot 1 holds `a` and slot 2 holds `b`. Swapping them gives a different container: (a, b) ≠ (b, a) unless a = b.

This is fundamentally different from a set {a, b} where {a, b} = {b, a}.

### Cartesian Product — All Possible Pairings

The **Cartesian product** A × B is the set of *all possible ordered pairs* where the first entry comes from A and the second from B.

```text
A = {2, 3, 5}
B = {0, 1}

A × B = {
  (2, 0), (2, 1),
  (3, 0), (3, 1),
  (5, 0), (5, 1)
}
|A × B| = |A| × |B| = 3 × 2 = 6
```

This is the **Product Rule** in action: for each of the 3 choices from A, you have 2 choices from B → 3 × 2 = 6 total pairs.

---

## Section 4 — Formal Definitions

### Set
A **set** A is a well-defined collection of distinct objects. We write `x ∈ A` if x is an element of A.

$$
 A = \{ x \mid P(x) \} \quad \text{(set-builder notation: the set of all x such that P(x) holds)} 
$$

### Subset
A is a **subset** of B (A ⊆ B) iff every element of A is also an element of B.

$$
 A \subseteq B \iff \forall x (x \in A \implies x \in B) 
$$

### Cardinality
The **cardinality** of a finite set A, denoted |A|, is the number of distinct elements in A.

$$
 |A| = n \iff \text{there exists a bijection between A and } \{1, 2, \dots, n\} 
$$

### Cartesian Product
The **Cartesian product** of sets A and B is:

$$
 A \times B = \{ (a, b) \mid a \in A \land b \in B \} 
$$

For finite sets: |A × B| = |A| · |B|.

### Ordered Pair (Kuratowski Definition)
An ordered pair (a, b) can be formally defined as the set {{a}, {a, b}}. This captures the property that (a, b) = (c, d) iff a = c and b = d.

---

## Section 5 — Operations on Sets

Let A, B be subsets of a universal set U.

| Operation | Notation | Definition | Example |
|-----------|----------|------------|---------|
| **Union** | A ∪ B | {x \| x ∈ A ∨ x ∈ B} | {1,2} ∪ {2,3} = {1,2,3} |
| **Intersection** | A ∩ B | {x \| x ∈ A ∧ x ∈ B} | {1,2} ∩ {2,3} = {2} |
| **Difference** | A \ B | {x \| x ∈ A ∧ x ∉ B} | {1,2,3} \ {2} = {1,3} |
| **Complement** | Aᶜ or U\A | {x ∈ U \| x ∉ A} | U={1,2,3,4}, A={1,2} → Aᶜ={3,4} |
| **Symmetric Difference** | A Δ B | (A\B) ∪ (B\A) | {1,2} Δ {2,3} = {1,3} |
| **Power Set** | 𝒫(A) | {X \| X ⊆ A} | 𝒫({1,2}) = {∅, {1}, {2}, {1,2}} |

**Power Set Cardinality:** |𝒫(A)| = 2^|A|

---

## Section 6 — Cartesian Products & Counting

### Product Rule (Fundamental Counting Principle)

If a process can be broken into two steps, where step 1 can be done in m ways and step 2 can be done in n ways (independently), then the whole process can be done in **m × n** ways.

This generalizes: k steps with n₁, n₂, ..., nₖ ways → n₁ × n₂ × ... × nₖ total ways.

### Example: Flag Design (Past Exam Q2)

> *The flag of a newly formed forum will be in the form of three blocks, each coloured differently. If there are six different colours to choose from, how many such designs are possible?*

**Analysis:**
- 3 positions (blocks), each gets a different colour
- Position 1: 6 choices
- Position 2: 5 remaining choices
- Position 3: 4 remaining choices
- Total: 6 × 5 × 4 = **120 designs**

This is a **permutation**: P(6, 3) = 6! / (6-3)! = 6 × 5 × 4 = 120.

### Permutations

A **permutation** of k items from n distinct items is an ordered arrangement.

$$
 P(n, k) = \frac{n!}{(n-k)!} = n(n-1)\cdots(n-k+1) 
$$

### Combinations

A **combination** of k items from n distinct items is an unordered selection.

$$
 C(n, k) = \binom{n}{k} = \frac{n!}{k!(n-k)!} 
$$

**Key distinction:** Permutation = order matters; Combination = order doesn't matter.

---

## Section 7 — Worked Exam Problems

### Problem 1: Ordered Pairs Count (CSC 203 CA Test Q1)

> *Given that A = {2, 3, 5} and B = {0, 1}, find the number of different ordered pairs in which the first entry is an element of A and the second is an element of B.*

**Solution:**

**Method 1 — List them all:**
A × B = {(2,0), (2,1), (3,0), (3,1), (5,0), (5,1)}
Count = 6

**Method 2 — Product Rule:**
|A| = 3, |B| = 2
|A × B| = |A| × |B| = 3 × 2 = **6**

**Answer: 6 ordered pairs**

---

### Problem 2: Flag Design (CSC 203 CA Test Q2)

> *It has been decided that the flag of a newly formed forum will be in the form of three blocks, each coloured differently. If there are six different colours on the whole to choose from, how many such designs are possible?*

**Solution:**

We need to choose 3 different colours from 6 and arrange them in 3 positions (order matters — top/middle/bottom blocks are distinct).

This is P(6, 3) = 6 × 5 × 4 = **120 designs**

Alternatively: Choose 3 colours from 6 (C(6,3) = 20), then arrange them (3! = 6). Total = 20 × 6 = 120.

**Answer: 120 designs**

---

### Problem 3: Relation as Ordered Pairs (CSC 203 CA Test Q3)

> *Let A = {2, 3, 4, 5, 6} and R = {(x, y) | x, y are relatively prime} be a relation in A. Write down R as the set of ordered pairs in roster form.*

**Solution:**

Two numbers are **relatively prime** (coprime) if their greatest common divisor is 1.

We need all ordered pairs (x, y) with x, y ∈ A such that gcd(x, y) = 1.

A = {2, 3, 4, 5, 6}

Check each pair:

| x | y | gcd(x,y) | Relatively Prime? |
|---|---|----------|-------------------|
| 2 | 2 | 2 | No |
| 2 | 3 | 1 | **Yes** → (2,3) |
| 2 | 4 | 2 | No |
| 2 | 5 | 1 | **Yes** → (2,5) |
| 2 | 6 | 2 | No |
| 3 | 2 | 1 | **Yes** → (3,2) |
| 3 | 3 | 3 | No |
| 3 | 4 | 1 | **Yes** → (3,4) |
| 3 | 5 | 1 | **Yes** → (3,5) |
| 3 | 6 | 3 | No |
| 4 | 2 | 2 | No |
| 4 | 3 | 1 | **Yes** → (4,3) |
| 4 | 4 | 4 | No |
| 4 | 5 | 1 | **Yes** → (4,5) |
| 4 | 6 | 2 | No |
| 5 | 2 | 1 | **Yes** → (5,2) |
| 5 | 3 | 1 | **Yes** → (5,3) |
| 5 | 4 | 1 | **Yes** → (5,4) |
| 5 | 5 | 5 | No |
| 5 | 6 | 1 | **Yes** → (5,6) |
| 6 | 2 | 2 | No |
| 6 | 3 | 3 | No |
| 6 | 4 | 2 | No |
| 6 | 5 | 1 | **Yes** → (6,5) |
| 6 | 6 | 6 | No |

**R = {(2,3), (2,5), (3,2), (3,4), (3,5), (4,3), (4,5), (5,2), (5,3), (5,4), (5,6), (6,5)}**

**Answer: 12 ordered pairs**

---

### Problem 4: Combinatorial Identity Proof (CSC 203 CA Test Q4)

> *Prove that (n - r) · C(n, r) = (r + 1) · C(n, r + 1).*

**Proof:**

Start with the right-hand side:

$$
 (r+1) \cdot C(n, r+1) = (r+1) \cdot \frac{n!}{(r+1)!(n-r-1)!} 
$$

Since (r+1)! = (r+1) · r!:

$$
 = (r+1) \cdot \frac{n!}{(r+1) \cdot r! \cdot (n-r-1)!} 
$$

$$
 = \frac{n!}{r! \cdot (n-r-1)!} 
$$

Now multiply numerator and denominator by (n-r):

$$
 = \frac{n! \cdot (n-r)}{r! \cdot (n-r-1)! \cdot (n-r)} 
$$

Since (n-r)! = (n-r) · (n-r-1)!:

$$
 = (n-r) \cdot \frac{n!}{r! \cdot (n-r)!} 
$$

$$
 = (n-r) \cdot C(n, r) 
$$

**QED.**

**Alternative combinatorial proof:**
- LHS: Choose r people from n for a committee, then choose a chair from the remaining n-r people
- RHS: Choose r+1 people from n, then choose a chair from those r+1 (the rest r form the committee)
- Both count the same thing: a committee of r with a chair from the non-members

---

### Problem 5: Logic Equivalence (CSC 203 CA Test Q5)

> *Show that (p → q) → r and p → (q → r) are not equivalent.*

**Solution:**

Build truth tables:

| p | q | r | p→q | (p→q)→r | q→r | p→(q→r) |
|---|---|---|-----|---------|-----|---------|
| T | T | T | T   | T       | T   | T       |
| T | T | F | T   | **F**   | F   | **F**   |
| T | F | T | F   | T       | T   | T       |
| T | F | F | F   | T       | T   | T       |
| F | T | T | T   | T       | T   | T       |
| F | T | F | T   | **F**   | F   | **T** ← DIFFERENCE |
| F | F | T | T   | T       | T   | T       |
| F | F | F | T   | **F**   | T   | **T** ← DIFFERENCE |

When p=F, q=T, r=F: (p→q)→r = F but p→(q→r) = T
When p=F, q=F, r=F: (p→q)→r = F but p→(q→r) = T

Since the truth tables differ, the statements are **not logically equivalent**.

---

## Section 8 — Common Pitfalls & Counterexamples

| Misconception | Correction |
|---------------|------------|
| {a, b} = (a, b) | Sets are unordered; ordered pairs are ordered. {a,b} = {b,a} but (a,b) ≠ (b,a) |
| A × B = B × A | Cartesian product is not commutative. (a,b) ∈ A×B but (a,b) ∉ B×A unless A=B |
| |A ∪ B| = |A| + |B| | Only true if A ∩ B = ∅. General formula: \|A ∪ B\| = \|A\| + \|B\| - \|A ∩ B\| |
| C(n, r) = P(n, r) | Combinations ignore order; permutations count order. P(n,r) = C(n,r) × r! |
| "Relatively prime" means both are prime | No: 8 and 15 are relatively prime (gcd=1) but neither is prime |
| (p→q)→r = p→(q→r) | Implication is not associative. Truth tables differ. |

---

## Section 9 — Conceptual Model

Think of sets as **bags**, ordered pairs as **two-slot trays**, and Cartesian products as **all possible tray configurations**.

- **Bag A** has 3 balls. **Bag B** has 2 balls.
- **Tray** has slot 1 (for A's ball) and slot 2 (for B's ball).
- **Cartesian product** = all 3 × 2 = 6 possible filled trays.
- **Relation** = a subset of those trays — you pick some trays and say "these satisfy my condition."

Counting principles:
- **Product rule** = choose for slot 1, then slot 2, multiply.
- **Sum rule** = choose scenario A OR scenario B, add.
- **Permutation** = ordered line-up.
- **Combination** = handful (order doesn't matter).

---

## Section 10 — Related Terminology Summary

| Term | Symbol | Meaning |
|------|--------|---------|
| Set membership | x ∈ A | x is an element of A |
| Not an element | x ∉ A | x is not an element of A |
| Subset | A ⊆ B | Every element of A is in B |
| Proper subset | A ⊂ B | A ⊆ B and A ≠ B |
| Empty set | ∅ | Set with no elements |
| Union | A ∪ B | Elements in A or B (or both) |
| Intersection | A ∩ B | Elements in both A and B |
| Difference | A \ B | Elements in A but not B |
| Complement | Aᶜ | Elements not in A (relative to U) |
| Cartesian product | A × B | Set of all ordered pairs (a,b) |
| Cardinality | \|A\| | Number of elements in A |
| Power set | 𝒫(A) | Set of all subsets of A |
| Permutation | P(n,k) | Ordered arrangements of k from n |
| Combination | C(n,k) | Unordered selections of k from n |
| Relatively prime | gcd(a,b)=1 | a and b share no prime factors |

---

## Section 11 — Self-Check Questions

1. If A = {1, 2, 3} and B = {2, 3, 4}, what is A × B? What is |A × B|?
2. How many ordered pairs (x, y) with x ∈ {a, b, c} and y ∈ {1, 2}?
3. A flag has 4 horizontal stripes. Each stripe gets a different colour from 7 available. How many flags?
4. Let A = {1, 2, 3, 4, 5}. Write the relation "x < y" as a set of ordered pairs.
5. True or false: C(n, r) = C(n, n-r). Explain why.
6. What is the difference between {∅} and ∅?

---

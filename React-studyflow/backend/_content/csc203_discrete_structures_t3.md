# Relations

## The Central Idea

A **relation** is a way to describe connections between elements of sets. You already know functions — a special kind of relation where each input connects to exactly one output. But relations are more general: an element can relate to zero, one, or many elements.

Think of a **relation** as a **set of ordered pairs** (x, y) where x comes from set A and y comes from set B. If (x, y) is in the relation, we say "x is related to y" and write x R y.

This topic covers:
- What relations are and how to represent them
- Key properties: reflexive, symmetric, transitive, antisymmetric
- **Equivalence relations** (reflexive + symmetric + transitive) → partition sets into equivalence classes
- **Partial orders** (reflexive + antisymmetric + transitive) → hierarchies, rankings
- Operations on relations: composition, inverse, closure

---

## Why It Matters

Past exam questions:
- "Let A = {2, 3, 4, 5, 6} and R = {(x, y) | x, y are relatively prime}. Write R as ordered pairs." (CSC 203 CA Test Q3) → This is a **relation on a set**
- "Prove (n-r)C(n,r) = (r+1)C(n,r+1)" → Uses properties of binomial coefficients, which come from combinatorial relations
- Database design, graph algorithms, compiler design, and formal verification all rely on relation theory

---

## How the Idea Develops

**Section 1 — Conceptual Introduction** → **Section 2 — Terminology** → **Section 3 — Formal Definition** → **Section 4 — Representing Relations** → **Section 5 — Properties of Relations** → **Section 6 — Equivalence Relations & Partitions** → **Section 7 — Partial Orders & Hasse Diagrams** → **Section 8 — Operations on Relations** → **Section 9 — Closures** → **Section 10 — Worked Problems** → **Section 11 — Self-Check**

---

## Section 1 — Conceptual Introduction

### What is a Relation?

Imagine a classroom with students and courses. Some students take some courses. The statement "Student S takes Course C" is a **relation** between the set of Students and the set of Courses.

More formally: A relation connects elements from one set (or the same set) according to some rule or condition.

**Examples of relations:**
- "x is less than y" on integers: x < y
- "x divides y" on positive integers: x | y
- "x is congruent to y modulo n": x ≡ y (mod n)
- "x and y are relatively prime": gcd(x, y) = 1
- "x is a parent of y" on people
- "x is connected to y by an edge" in a graph

### Relation vs. Function

| Function | General Relation |
|----------|------------------|
| Each input → exactly one output | Input can relate to 0, 1, or many outputs |
| Subset of A × B with unique first coordinates | Any subset of A × B |
| Vertical line test passes | Vertical line test may fail |

Every function is a relation. Not every relation is a function.

---

## Section 2 — Required Terminology

| Term | Meaning |
|------|---------|
| [[relation]] | A subset of A × B; set of ordered pairs (a, b) |
| [[binary-relation]] | A relation from A to A (on a single set) |
| [[domain-of-relation]] | Set of all first elements in the pairs |
| [[range-of-relation]] | Set of all second elements in the pairs |
| [[reflexive]] | Every element relates to itself: ∀a, a R a |
| [[symmetric]] | If a R b then b R a |
| [[antisymmetric]] | If a R b and b R a then a = b |
| [[transitive]] | If a R b and b R c then a R c |
| [[equivalence-relation]] | Reflexive + Symmetric + Transitive |
| [[equivalence-class]] | Set of all elements related to a given element |
| [[partition]] | Division of a set into disjoint equivalence classes |
| [[partial-order]] | Reflexive + Antisymmetric + Transitive |
| [[total-order]] | Partial order where any two elements are comparable |
| [[hasse-diagram]] | Visual representation of a partial order |
| [[composition]] | R ∘ S = {(a, c) | ∃b: a R b ∧ b S c} |
| [[inverse-relation]] | R⁻¹ = {(b, a) | (a, b) ∈ R} |
| [[reflexive-closure]] | Smallest reflexive relation containing R |
| [[symmetric-closure]] | Smallest symmetric relation containing R |
| [[transitive-closure]] | Smallest transitive relation containing R |

---

## Section 3 — Formal Definition

### Binary Relation

Let A be a set. A **binary relation** R on A is a subset of the Cartesian product A × A.

\\[ R \\subseteq A \\times A = \\{ (a, b) \\mid a \\in A, b \\in A \\} \\]

We write **a R b** (or (a, b) ∈ R) to mean "a is related to b under R".

### Relation from A to B

More generally, a relation from set A to set B is R ⊆ A × B.

---

## Section 4 — Representing Relations

### 1. Roster Form (Set of Ordered Pairs)

List all pairs explicitly.

**Example:** A = {1, 2, 3}, R = {(1,1), (1,2), (2,3), (3,1)}

### 2. Set-Builder Notation

Describe the condition.

**Example:** R = {(x, y) ∈ ℤ × ℤ | x < y}

### 3. Matrix Representation (for finite sets)

If A = {a₁, a₂, ..., aₙ}, create n×n matrix M where:
\\[ M_{ij} = \\begin{cases} 1 & \\text{if } a_i R a_j \\\\ 0 & \\text{otherwise} \\end{cases} \\]

**Example:** A = {1, 2, 3}, R = {(1,2), (2,3), (3,1)}
```
    1 2 3
1   0 1 0
2   0 0 1
3   1 0 0
```

### 4. Directed Graph (Digraph)

Vertices = elements of A. Directed edge from a to b iff a R b.

**Example:** R = {(1,2), (2,3), (3,1)} on {1,2,3}
```
1 → 2
↑   ↓
3 ← (no edge 3→2)
```

### 5. Hasse Diagram (for partial orders only)

Special simplified digraph for partial orders (see Section 7).

---

## Section 5 — Properties of Relations

Let R be a relation on set A.

### 1. Reflexive

**∀a ∈ A, a R a**

Every element is related to itself.

**Matrix:** All diagonal entries are 1.
**Digraph:** Every vertex has a self-loop.

**Example:** ≤ on ℝ (x ≤ x always true).
**Example:** "x divides y" on ℕ (x | x true).

**Counterexample:** < on ℝ (x < x is false).

---

### 2. Irreflexive

**∀a ∈ A, a R a is false**

No element relates to itself.

**Example:** < on ℝ.
**Example:** "x is a proper subset of y".

---

### 3. Symmetric

**∀a,b ∈ A, a R b ⟹ b R a**

If a relates to b, then b relates to a.

**Matrix:** Symmetric across diagonal (M = Mᵀ).
**Digraph:** Every edge a→b has matching b→a (or single undirected edge).

**Example:** "x = y" (equality).
**Example:** "x is a sibling of y" (usually).
**Example:** "x and y are relatively prime" — if gcd(x,y)=1 then gcd(y,x)=1.

---

### 4. Antisymmetric

**∀a,b ∈ A, (a R b ∧ b R a) ⟹ a = b**

The only way both directions hold is if they're the same element.

**Note:** Antisymmetric ≠ "not symmetric". A relation can be both symmetric and antisymmetric (e.g., equality). It can be neither.

**Matrix:** If Mᵢⱼ = 1 and Mⱼᵢ = 1, then i = j.
**Digraph:** No two distinct vertices have edges in both directions.

**Example:** ≤ on ℝ (if x ≤ y and y ≤ x then x = y).
**Example:** "x divides y" on ℕ (if x|y and y|x then x=y).
**Example:** ⊆ on sets.

---

### 5. Asymmetric

**∀a,b ∈ A, a R b ⟹ ¬(b R a)**

If a relates to b, b CANNOT relate to a. Stronger than antisymmetric.

**Example:** < on ℝ.

---

### 6. Transitive

**∀a,b,c ∈ A, (a R b ∧ b R c) ⟹ a R c**

If a relates to b and b relates to c, then a relates to c.

**Matrix:** If Mᵢⱼ = 1 and Mⱼₖ = 1, then Mᵢₖ = 1.
**Digraph:** Path a→b→c implies direct edge a→c.

**Example:** ≤ on ℝ (if x ≤ y and y ≤ z then x ≤ z).
**Example:** "x divides y" on ℕ (if x|y and y|z then x|z).
**Example:** "x is an ancestor of y".

**Counterexample:** "x is a friend of y" — not necessarily transitive.

---

### 7. Summary Table

| Property | Condition | Matrix | Digraph |
|----------|-----------|--------|---------|
| Reflexive | a R a | Diagonal all 1s | Self-loops everywhere |
| Irreflexive | ¬(a R a) | Diagonal all 0s | No self-loops |
| Symmetric | a R b ⇒ b R a | M = Mᵀ | Edges come in pairs |
| Antisymmetric | a R b ∧ b R a ⇒ a=b | No symmetric 1s off-diagonal | No bidirectional edges between distinct vertices |
| Asymmetric | a R b ⇒ ¬(b R a) | Mᵢⱼ=1 ⇒ Mⱼᵢ=0 | No bidirectional edges at all |
| Transitive | a R b ∧ b R c ⇒ a R c | M² ≤ M (boolean) | Paths imply direct edges |

---

## Section 6 — Equivalence Relations & Partitions

### Definition

An **equivalence relation** is a relation that is:
1. **Reflexive**: ∀a, a R a
2. **Symmetric**: a R b ⇒ b R a
3. **Transitive**: a R b ∧ b R c ⇒ a R c

### Equivalence Class

For an equivalence relation R on A and an element a ∈ A, the **equivalence class** of a is:

\\[ [a]_R = \\{ x \\in A \\mid x R a \\} \\]

**Key Properties:**
- Every element belongs to exactly one equivalence class: a ∈ [a]
- Two classes are either identical or disjoint: [a] = [b] or [a] ∩ [b] = ∅
- The set of all equivalence classes forms a **partition** of A

### Partition

A **partition** of A is a collection of non-empty, pairwise disjoint subsets whose union is A.

**Theorem:** Every equivalence relation on A induces a partition of A (its equivalence classes). Conversely, every partition of A defines an equivalence relation (x R y iff x and y are in the same block).

### Example: Congruence Modulo n

R = {(x, y) | x ≡ y (mod n)} on ℤ.

- Reflexive: x ≡ x (mod n) ✓
- Symmetric: x ≡ y ⇒ y ≡ x ✓
- Transitive: x ≡ y ∧ y ≡ z ⇒ x ≡ z ✓

Equivalence classes: [0], [1], ..., [n-1] — the **residue classes modulo n**.

ℤ is partitioned into n classes: ..., {-2n, -n, 0, n, 2n, ...}, {-2n+1, -n+1, 1, n+1, ...}, etc.

---

## Section 7 — Partial Orders & Hasse Diagrams

### Definition

A **partial order** (or poset) is a relation that is:
1. **Reflexive**: ∀a, a R a
2. **Antisymmetric**: a R b ∧ b R a ⇒ a = b
3. **Transitive**: a R b ∧ b R c ⇒ a R c

Notation: (A, ≤) or (A, ≼)

### Total Order (Linear Order)

A partial order where **every pair is comparable**: ∀a,b ∈ A, a R b ∨ b R a.

**Example:** ≤ on ℝ is a total order.
**Example:** ⊆ on ℘({1,2}) is a partial order but NOT total ({1} and {2} are incomparable).

### Hasse Diagram

A simplified graph for a finite poset:
1. Draw vertices for elements
2. Draw edge a → b (b above a) if a < b and **no element c with a < c < b** (covering relation)
3. Omit self-loops (reflexive)
4. Omit transitive edges (implied by transitivity)
5. Direction implied by vertical position (up = greater)

**Example:** (℘({1,2}), ⊆)
```
      {1,2}
     /     \
  {1}       {2}
     \     /
       ∅
```

### Minimal / Maximal / Least / Greatest

In a poset (A, ≤):
- **Minimal**: a ∈ A such that no x ∈ A has x < a
- **Maximal**: a ∈ A such that no x ∈ A has a < x
- **Least**: a ∈ A such that ∀x ∈ A, a ≤ x (unique if exists)
- **Greatest**: a ∈ A such that ∀x ∈ A, x ≤ a (unique if exists)

**Note:** Least ⇒ Minimal, but Minimal ⇏ Least (multiple minimals possible).

---

## Section 8 — Operations on Relations

### Composition

If R ⊆ A × B and S ⊆ B × C, the **composition** S ∘ R ⊆ A × C is:

\\[ S \\circ R = \\{ (a, c) \\mid \\exists b \\in B: (a, b) \\in R \\land (b, c) \\in S \\} \\]

**Note order:** S ∘ R means "apply R first, then S" (like function composition).

### Inverse

\\[ R^{-1} = \\{ (b, a) \\mid (a, b) \\in R \\} \\]

### Powers

R¹ = R
R² = R ∘ R
Rⁿ = R ∘ Rⁿ⁻¹

### Example: Parent Relation

P = {(x, y) | x is a parent of y}
P² = {(x, z) | x is a grandparent of z} = "grandparent relation"
P⁻¹ = {(y, x) | x is a parent of y} = "child relation"

---

## Section 9 — Closures

Given a relation R on A and a property P (reflexive, symmetric, transitive), the **P-closure** of R is the smallest relation containing R that has property P.

### Reflexive Closure

\\[ r(R) = R \\cup \\{ (a, a) \\mid a \\in A \\} = R \\cup \\Delta_A \\]

Add all missing self-pairs (Δ_A = diagonal).

### Symmetric Closure

\\[ s(R) = R \\cup R^{-1} \\]

Add reverse of every pair.

### Transitive Closure

\\[ t(R) = \\bigcup_{n=1}^\\infty R^n = R \\cup R^2 \\cup R^3 \\cup \\cdots \\]

Add all pairs reachable by paths of any length.

**Warshall's Algorithm:** Efficient O(n³) computation of transitive closure using matrix.

### Reflexive-Transitive Closure

R* = r(t(R)) = t(r(R)) — the "reachability" relation.

---

## Section 10 — Worked Exam Problems

### Problem 1: Past Exam — Relatively Prime Relation (CSC 203 CA Test Q3)

> *Let A = {2, 3, 4, 5, 6} and R = {(x, y) | x, y are relatively prime} be a relation in A. Write down R as the set of ordered pairs in roster form.*

**Solution:**

Two integers are **relatively prime** (coprime) if gcd(x, y) = 1.

We check all 25 pairs (x, y) ∈ A × A:

| x \ y | 2 | 3 | 4 | 5 | 6 |
|-------|---|---|---|---|---|
| **2** | gcd=2 ✗ | **1** ✓ | 2 ✗ | **1** ✓ | 2 ✗ |
| **3** | **1** ✓ | 3 ✗ | **1** ✓ | **1** ✓ | 3 ✗ |
| **4** | 2 ✗ | **1** ✓ | 4 ✗ | **1** ✓ | 2 ✗ |
| **5** | **1** ✓ | **1** ✓ | **1** ✓ | 5 ✗ | **1** ✓ |
| **6** | 2 ✗ | 3 ✗ | 2 ✗ | **1** ✓ | 6 ✗ |

R = {(2,3), (2,5), (3,2), (3,4), (3,5), (4,3), (4,5), (5,2), (5,3), (5,4), (5,6), (6,5)}

**Properties check:**
- Reflexive? No — (2,2) ∉ R, etc.
- Symmetric? Yes — gcd(x,y)=gcd(y,x) so (x,y)∈R ⇔ (y,x)∈R ✓
- Transitive? No — (2,3)∈R and (3,4)∈R but (2,4)∉R (gcd=2) ✗
- Antisymmetric? No — (2,3) and (3,2) both in R but 2≠3 ✗

**Conclusion:** R is symmetric only. Not an equivalence relation, not a partial order.

---

### Problem 2: Equivalence Relation on Integers

> *Let R be the relation on ℤ defined by: a R b iff a - b is divisible by 3. Prove R is an equivalence relation and describe its equivalence classes.*

**Solution:**

**Reflexive:** a - a = 0, divisible by 3. ✓

**Symmetric:** If a - b = 3k, then b - a = -3k = 3(-k), divisible by 3. ✓

**Transitive:** If a - b = 3k and b - c = 3m, then a - c = (a - b) + (b - c) = 3k + 3m = 3(k+m), divisible by 3. ✓

**Equivalence classes:**
- [0] = {..., -6, -3, 0, 3, 6, ...} = multiples of 3
- [1] = {..., -5, -2, 1, 4, 7, ...} = numbers ≡ 1 (mod 3)
- [2] = {..., -4, -1, 2, 5, 8, ...} = numbers ≡ 2 (mod 3)

These three classes partition ℤ.

---

### Problem 3: Partial Order — Divisibility

> *Consider the relation R = {(x, y) | x divides y} on the set A = {1, 2, 3, 4, 6, 12}. Draw the Hasse diagram and identify minimal/maximal elements.*

**Solution:**

**Check partial order:**
- Reflexive: x|x ✓
- Antisymmetric: x|y and y|x ⇒ x=y ✓
- Transitive: x|y and y|z ⇒ x|z ✓

**Hasse Diagram** (edges = covering relations):
```
        12
       /  \
      4    6
     / \  / \
    2   3    (1 connects to 2 and 3)
     \ /
      1
```

Wait, let's be careful. Covering: a is covered by b if a < b and no c with a < c < b.

Divisibility order on {1,2,3,4,6,12}:
- 1 divides everything → bottom
- 12 divisible by everything → top
- 2 divides 4, 6, 12; covered by 4 and 6
- 3 divides 6, 12; covered by 6
- 4 divides 12; covered by 12
- 6 divides 12; covered by 12

```
        12
       /  \
      4    6
      |  / |
      2    3
       \  /
        1
```

**Minimal elements:** {1} (also the least element)
**Maximal elements:** {12} (also the greatest element)

---

### Problem 4: Composition & Inverse

> *Let R = {(1,2), (2,3), (3,1)} and S = {(1,3), (2,1), (3,2)} on A = {1,2,3}. Find S ∘ R, R ∘ S, R⁻¹.*

**Solution:**

S ∘ R = {(a,c) | ∃b: (a,b)∈R and (b,c)∈S}

- (1,2)∈R, (2,1)∈S → (1,1) ∈ S∘R
- (2,3)∈R, (3,2)∈S → (2,2) ∈ S∘R
- (3,1)∈R, (1,3)∈S → (3,3) ∈ S∘R

S ∘ R = {(1,1), (2,2), (3,3)} = identity relation

R ∘ S = {(a,c) | ∃b: (a,b)∈S and (b,c)∈R}

- (1,3)∈S, (3,1)∈R → (1,1)
- (2,1)∈S, (1,2)∈R → (2,2)
- (3,2)∈S, (2,3)∈R → (3,3)

R ∘ S = {(1,1), (2,2), (3,3)} = identity

R⁻¹ = {(2,1), (3,2), (1,3)}

**Notice:** R and S are inverses of each other! R ∘ S = S ∘ R = identity.

---

### Problem 5: Transitive Closure

> *Find the transitive closure of R = {(1,2), (2,3), (3,4)} on {1,2,3,4}.*

**Solution:**

R¹ = {(1,2), (2,3), (3,4)}
R² = R∘R = {(1,3), (2,4)}
R³ = R∘R² = {(1,4)}
R⁴ = ∅ (no paths of length 4)

Transitive closure t(R) = R¹ ∪ R² ∪ R³
= {(1,2), (2,3), (3,4), (1,3), (2,4), (1,4)}

**Matrix check:** Warshall's algorithm would compute this systematically.

---

## Section 11 — Common Pitfalls

| Pitfall | Correction |
|---------|------------|
| Confusing symmetric with antisymmetric | Symmetric: aRb⇒bRa. Antisymmetric: aRb∧bRa⇒a=b. Equality is both. |
| Thinking "not symmetric" = antisymmetric | A relation can be neither (e.g., {(1,2), (2,3)}). |
| Assuming equivalence class = element | [a] is a SET containing a and all elements related to a. |
| Drawing all edges in Hasse diagram | Only draw covering relations (immediate successors). |
| Composition order: R∘S means R then S | S∘R means apply R first, then S (like functions). |
| Transitive closure = R² only | Need all powers R ∪ R² ∪ R³ ∪ ... until stable. |

---

## Section 12 — Conceptual Model

**Relations = Connections**

- **Reflexive** = "Every dot has a loop to itself"
- **Symmetric** = "Every arrow has a reverse arrow"
- **Antisymmetric** = "No two distinct dots have arrows both ways"
- **Transitive** = "If you can walk A→B→C, there's a direct shortcut A→C"
- **Equivalence** = "Clumps the set into disjoint bubbles (classes)"
- **Partial Order** = "Arranges elements in a hierarchy (some may be incomparable)"
- **Composition** = "Follow one relation, then another"
- **Closure** = "Add the minimum needed to get a property"

---

## Section 13 — Glossary Terms Used in This Topic

[[relation]], [[binary-relation]], [[domain-of-relation]], [[range-of-relation]], [[reflexive]], [[irreflexive]], [[symmetric]], [[antisymmetric]], [[asymmetric]], [[transitive]], [[equivalence-relation]], [[equivalence-class]], [[partition]], [[partial-order]], [[total-order]], [[poset]], [[hasse-diagram]], [[minimal-element]], [[maximal-element]], [[least-element]], [[greatest-element]], [[composition]], [[inverse-relation]], [[reflexive-closure]], [[symmetric-closure]], [[transitive-closure]], [[warshall-algorithm]], [[congruence-modulo]], [[divisibility-relation]], [[covering-relation]], [[comparable]], [[incomparable]]
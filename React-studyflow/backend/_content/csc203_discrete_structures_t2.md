# Combinatorics & Counting Principles

## The Central Idea

**How many?** This is the central question of combinatorics. Whether you're counting possible passwords, ways to seat students, paths through a network, or outcomes of an experiment — the core skill is breaking a complex counting problem into simple, independent choices and then combining them correctly.

We already met the **Product Rule** (choose for step 1, then step 2, multiply) and **Sum Rule** (choose scenario A or scenario B, add). This topic deepens those tools and adds the **Pigeonhole Principle** — a surprisingly powerful idea that says: if you put more pigeons than holes, at least one hole gets multiple pigeons.

---

## Why It Matters

Past exams and real problems ask:
- "How many 8-bit strings have exactly three 1s?" → Combinations
- "In how many ways can 5 men and 5 women sit alternately?" → Permutations with constraints
- "Prove that among any 13 people, at least two share a birth month" → Pigeonhole Principle
- "How many ways to distribute 10 identical candies to 3 children?" → Stars and Bars
- "Prove C(n, r) = C(n, n-r)" → Combinatorial identities

These all reduce to the same few principles, applied carefully.

---

## How the Idea Develops

**Section 1 — Review: Product & Sum Rules** → **Section 2 — Permutations (Ordered Arrangements)** → **Section 3 — Combinations (Unordered Selections)** → **Section 4 — Circular Permutations** → **Section 5 — Permutations with Repetition** → **Section 6 — Combinations with Repetition (Stars & Bars)** → **Section 7 — The Pigeonhole Principle** → **Section 8 — Inclusion-Exclusion Principle** → **Section 9 — Worked Exam Problems** → **Section 10 — Self-Check**

---

## Section 1 — Review: Product & Sum Rules

### Product Rule (Fundamental Counting Principle)

If a task consists of a sequence of **k** steps, where:
- Step 1 can be done in n₁ ways
- Step 2 can be done in n₂ ways (regardless of step 1's choice)
- ...
- Step k can be done in nₖ ways

Then the total number of ways to complete the task is:

$$
 n_1 \times n_2 \times \cdots \times n_k 
$$

**Example:** A password has 2 letters (A-Z) followed by 3 digits (0-9).
- Step 1: 26 choices
- Step 2: 26 choices
- Step 3: 10 choices
- Step 4: 10 choices
- Step 5: 10 choices
Total: 26 × 26 × 10 × 10 × 10 = **676,000**

### Sum Rule

If a task can be done in **either** of two **mutually exclusive** ways:
- Way 1: n₁ ways
- Way 2: n₂ ways

Then total ways = n₁ + n₂.

**Example:** A student can choose a project from {5 math topics} OR {8 CS topics}. Total choices = 5 + 8 = 13.

**Warning:** The ways must be **disjoint** (no overlap). If some topics appear in both lists, use Inclusion-Exclusion (Section 8).

---

## Section 2 — Permutations (Ordered Arrangements)

### Definition

A **permutation** of **k** objects chosen from **n** distinct objects is an **ordered arrangement** of those k objects.

Notation: P(n, k) or ⁿPₖ or (n)ₖ

$$
 P(n, k) = \frac{n!}{(n-k)!} = n(n-1)(n-2)\cdots(n-k+1) 
$$

**Key:** Order matters. (A, B, C) ≠ (C, B, A).

### Special Case: Permutations of All n Objects

P(n, n) = n! — the number of ways to arrange n distinct items in a line.

### Example: Arranging Books

How many ways to arrange 5 different books on a shelf?
P(5, 5) = 5! = 120

How many ways to choose and arrange 3 of the 5 books?
P(5, 3) = 5 × 4 × 3 = 60

---

## Section 3 — Combinations (Unordered Selections)

### Definition

A **combination** of **k** objects chosen from **n** distinct objects is an **unordered selection** (a subset of size k).

Notation: C(n, k) or ⁿCₖ or $\binom{n}{k}$

$$
 C(n, k) = \binom{n}{k} = \frac{n!}{k!(n-k)!} = \frac{P(n,k)}{k!} 
$$

**Key:** Order does NOT matter. {A, B, C} = {C, B, A}.

### Relationship Between Permutations and Combinations

Every combination of k items corresponds to k! permutations (all orderings of those k items).

$$
 P(n, k) = C(n, k) \times k! 
$$
$$
 C(n, k) = \frac{P(n, k)}{k!} 
$$

### Symmetry Property

$$
 C(n, k) = C(n, n-k) 
$$

**Intuition:** Choosing k items to *include* is the same as choosing n-k items to *exclude*.

**Example:** C(10, 3) = C(10, 7) = 120

### Pascal's Identity (Recursive Formula)

$$
 C(n, k) = C(n-1, k-1) + C(n-1, k) 
$$

**Proof:** Consider a specific element x. Either x is in the k-subset (choose k-1 from remaining n-1) or x is not (choose k from remaining n-1).

This builds **Pascal's Triangle**:
```
        1
      1   1
    1   2   1
  1   3   3   1
1   4   6   4   1
```

---

## Section 4 — Circular Permutations

When arranging n distinct objects **around a circle**, rotations are considered the same arrangement.

Number of circular permutations = (n-1)!

**Reasoning:** Fix one object as reference (breaks rotational symmetry). Arrange remaining n-1 objects in a line relative to it.

**Example:** 6 people at a round table.
- Linear: 6! = 720
- Circular: (6-1)! = 5! = **120**

**If reflections are also considered identical** (e.g., necklace that can be flipped): (n-1)!/2 for n > 2.

---

## Section 5 — Permutations with Repetition

### Case 1: Multiset Permutations (Some Items Identical)

If we have n total items where:
- n₁ are identical of type 1
- n₂ are identical of type 2
- ...
- nₖ are identical of type k
with n₁ + n₂ + ... + nₖ = n

Number of distinct permutations:

$$
 \frac{n!}{n_1! \, n_2! \, \cdots \, n_k!} 
$$

**Example:** Arrange the letters of "MISSISSIPPI"
- M: 1, I: 4, S: 4, P: 2
- Total: 11! / (1! × 4! × 4! × 2!) = 34,650

### Case 2: Unlimited Repetition (Sampling with Replacement)

If we choose k items from n types, **repetition allowed**, **order matters**:

$$
 n^k 
$$

**Example:** 3-digit PIN from digits 0-9: 10³ = 1,000 possibilities.

---

## Section 6 — Combinations with Repetition (Stars and Bars)

### The Problem

Choose k items from n types, **repetition allowed**, **order does NOT matter**.

Equivalently: Number of non-negative integer solutions to:
$$
 x_1 + x_2 + \cdots + x_n = k 
$$

### Stars and Bars Method

Represent k identical items as **stars** (★). Separate into n types using n-1 **bars** (│).

Total symbols: k stars + (n-1) bars = k + n - 1 positions.
Choose which n-1 positions hold bars: $\binom{k+n-1}{n-1}$

$$
 C(n+k-1, k) = C(n+k-1, n-1) = \binom{n+k-1}{k} 
$$

**Example:** Distribute 10 identical candies to 3 children (each can get 0).
- x₁ + x₂ + x₃ = 10
- C(3+10-1, 10) = C(12, 10) = C(12, 2) = 66 ways

**Example with constraints:** Each child gets at least 1 candy.
Give 1 to each first → 7 left to distribute freely.
x₁ + x₂ + x₃ = 7 → C(3+7-1, 7) = C(9, 7) = 36 ways

---

## Section 7 — The Pigeonhole Principle

### Simple Form

If **n+1** objects are placed into **n** boxes, then at least one box contains **at least 2** objects.

### Generalized Form

If **N** objects are placed into **n** boxes, then at least one box contains at least $\lceil N/n \rceil$ objects.

### Why "Pigeonhole"?

Imagine n pigeonholes and n+1 pigeons. Each pigeon must go in a hole. With more pigeons than holes, at least one hole gets ≥ 2 pigeons.

### Classic Examples

**Example 1:** Among any 13 people, at least 2 share a birth month.
- 13 people (pigeons), 12 months (holes) → 13 > 12 → at least one month has ≥ 2 people.

**Example 2:** In a group of 5 people, at least 2 have the same number of friends within the group.
- Possible friend counts: 0, 1, 2, 3, 4 (5 values)
- But if someone has 4 friends, no one can have 0 friends (mutual).
- So at most 4 distinct values among 5 people → collision.

**Example 3:** Any sequence of n²+1 distinct real numbers contains an increasing or decreasing subsequence of length n+1.
(Erdős–Szekeres theorem — advanced application)

---

## Section 8 — Inclusion-Exclusion Principle

### Two Sets

$$
 |A \cup B| = |A| + |B| - |A \cap B| 
$$

### Three Sets

$$
 |A \cup B \cup C| = |A| + |B| + |C| - |A \cap B| - |A \cap C| - |B \cap C| + |A \cap B \cap C| 
$$

### General Form

$$
 \left| \bigcup_{i=1}^n A_i \right| = \sum |A_i| - \sum |A_i \cap A_j| + \sum |A_i \cap A_j \cap A_k| - \cdots + (-1)^{n+1} |A_1 \cap \cdots \cap A_n| 
$$

### Example: Numbers ≤ 100 Divisible by 2, 3, or 5

Let A = divisible by 2, B = by 3, C = by 5.
- |A| = 50, |B| = 33, |C| = 20
- |A∩B| = divisible by 6 = 16
- |A∩C| = divisible by 10 = 10
- |B∩C| = divisible by 15 = 6
- |A∩B∩C| = divisible by 30 = 3

Total = 50+33+20 - 16-10-6 + 3 = **74**

---

## Section 9 — Worked Exam Problems

### Problem 1: Committee Selection

> *A committee of 4 is to be chosen from 7 men and 5 women. How many committees contain at least 2 women?*

**Solution:**

Cases:
- 2 women, 2 men: C(5,2) × C(7,2) = 10 × 21 = 210
- 3 women, 1 man: C(5,3) × C(7,1) = 10 × 7 = 70
- 4 women, 0 men: C(5,4) × C(7,0) = 5 × 1 = 5

Total = 210 + 70 + 5 = **285**

**Alternative (complement):** Total committees = C(12,4) = 495. Subtract 0 women (C(7,4)=35) and 1 woman (C(5,1)×C(7,3)=5×35=175). 495 - 35 - 175 = 285.

---

### Problem 2: Bit Strings

> *How many 8-bit strings contain exactly three 1s?*

**Solution:**
Choose 3 positions for the 1s out of 8. The rest are 0s.
C(8, 3) = 56 strings.

---

### Problem 3: Alternating Seating

> *In how many ways can 5 men and 5 women sit in a row if no two men sit together and no two women sit together?*

**Solution:**
Must alternate: M W M W M W M W M W or W M W M W M W M W M

Pattern 1: Arrange 5 men in 5! ways, 5 women in 5! ways → 5! × 5!
Pattern 2: Same count → 5! × 5!

Total = 2 × 5! × 5! = 2 × 120 × 120 = **28,800**

---

### Problem 4: Pigeonhole — Socks

> *A drawer contains 10 black socks and 10 blue socks. How many socks must you pull out (blindly) to guarantee a matching pair?*

**Solution:**
Worst case: first 2 socks are different colours (1 black, 1 blue).
The 3rd sock must match one of them.
**Answer: 3 socks**

---

### Problem 5: Pigeonhole — Subset Sums

> *Given any 10 integers, prove there exist two distinct subsets with the same sum.*

**Solution:**
10 integers → 2¹⁰ = 1024 subsets (including empty set).
Possible sums range from sum of negatives to sum of positives.
But maximum absolute sum ≤ 10 × max|aᵢ|.
If max|aᵢ| = M, sums range from -10M to 10M → at most 20M+1 distinct sums.
If M < 51, then 1024 > 20M+1 → pigeonhole applies.
(More generally: 1024 subsets, sum range much smaller → collision guaranteed)

---

### Problem 6: Stars and Bars — Equation Solutions

> *How many non-negative integer solutions to x₁ + x₂ + x₃ + x₄ = 12?*

**Solution:**
C(4+12-1, 12) = C(15, 12) = C(15, 3) = **455**

---

### Problem 7: Inclusion-Exclusion — Derangements

> *How many permutations of {1,2,3,4} have no element in its original position? (Derangements)*

**Solution:**
Let Aᵢ = set of permutations where element i is fixed.
Want total permutations - |A₁ ∪ A₂ ∪ A₃ ∪ A₄|

|Aᵢ| = 3! = 6 (fix one, permute rest)
|Aᵢ∩Aⱼ| = 2! = 2
|Aᵢ∩Aⱼ∩Aₖ| = 1! = 1
|A₁∩A₂∩A₃∩A₄| = 0! = 1

By Inclusion-Exclusion:
|A₁∪A₂∪A₃∪A₄| = 4×6 - 6×2 + 4×1 - 1 = 24 - 12 + 4 - 1 = 15

Total permutations = 4! = 24
Derangements = 24 - 15 = **9**

Formula: !n = n! × Σ(-1)ᵏ/k! from k=0 to n

---

## Section 10 — Common Pitfalls

| Pitfall | Correct Approach |
|---------|------------------|
| Using P(n,k) when order doesn't matter | Use C(n,k) = P(n,k)/k! |
| Using C(n,k) when order matters | Use P(n,k) = C(n,k) × k! |
| Forgetting cases are disjoint in Sum Rule | Check overlap; use Inclusion-Exclusion if needed |
| Treating circular as linear | Divide by n (or n/2 if reflection symmetric) |
| Stars & Bars with positive constraints | Give 1 to each first, then distribute remainder |
| Pigeonhole: identifying wrong pigeons/holes | Pigeons = objects being placed; Holes = categories |

---

## Section 11 — Conceptual Model

**Counting is about structure, not arithmetic.**

- **Product Rule** = independent choices in sequence → multiply
- **Sum Rule** = mutually exclusive alternatives → add
- **Permutation** = ordered line → n! / (n-k)!
- **Combination** = unordered handful → divide by k! to forget order
- **Circular** = fix one as reference → (n-1)!
- **Repetition allowed, order matters** → nᵏ
- **Repetition allowed, order irrelevant** → stars & bars → C(n+k-1, k)
- **Pigeonhole** = more items than categories → collision guaranteed
- **Inclusion-Exclusion** = add singles, subtract pairs, add triples...

---

## Section 12 — Quick Reference Formulas

| Scenario | Formula |
|----------|---------|
| Permute n distinct | n! |
| Permute k from n | P(n,k) = n!/(n-k)! |
| Choose k from n | C(n,k) = n!/(k!(n-k)!) |
| Circular permute n | (n-1)! |
| Permute multiset | n!/(n₁!n₂!...nₖ!) |
| Choose k from n, with replacement, order matters | nᵏ |
| Choose k from n, with replacement, order irrelevant | C(n+k-1, k) |
| Derangements | !n = n! Σ(-1)ᵏ/k! |

---

## Glossary Terms Used in This Topic

[[permutation]], [[combination]], [[product-rule]], [[sum-rule]], [[factorial]], [[circular-permutation]], [[multiset-permutation]], [[stars-and-bars]], [[pigeonhole-principle]], [[inclusion-exclusion]], [[derangement]], [[pascal-identity]], [[binomial-coefficient]], [[combinatorial-proof]], [[combinatorial-identity]], [[binomial-theorem]], [[multinomial-coefficient]], [[generating-function]]
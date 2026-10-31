# Exam Problem Workshop — CSC 203 Discrete Structures

## The Central Idea

This topic is a **comprehensive practice session** covering all question types from past CSC 203 exams. Each problem is solved step-by-step with multiple approaches where applicable, highlighting the key insights and common pitfalls.

**Use this topic to:** Test your understanding, practice exam technique, and identify gaps before the real exam.

---

## Problem Set 1: Sets & Counting (CA Test Q1, Q2)

### Problem 1.1: Ordered Pairs from Cartesian Product

> **Past Exam (CSC 203 CA Test Q1):** Given A = {2, 3, 5} and B = {0, 1}, find the number of different ordered pairs in which the first entry is an element of A and the second is an element of B.

**Solution:**

**Method 1 — Direct enumeration:**
A × B = {(2,0), (2,1), (3,0), (3,1), (5,0), (5,1)}
Count = 6

**Method 2 — Product Rule:**
|A| = 3, |B| = 2
|A × B| = |A| × |B| = 3 × 2 = **6**

**Key insight:** This is exactly the definition of Cartesian product cardinality.

---

### Problem 1.2: Flag Design — Permutations with Restrictions

> **Past Exam (CSC 203 CA Test Q2):** A flag has three horizontal blocks, each coloured differently. Six colours available. How many designs?

**Solution:**

**Analysis:** 3 positions, all different colours. Order matters (top/middle/bottom distinct).

**Method 1 — Direct:**
- Top: 6 choices
- Middle: 5 remaining
- Bottom: 4 remaining
Total = 6 × 5 × 4 = **120**

**Method 2 — Permutations:** P(6, 3) = 6! / 3! = 720 / 6 = 120

**Method 3 — Choose then arrange:** C(6, 3) × 3! = 20 × 6 = 120

**Answer: 120 designs**

---

### Problem 1.3: Variations on Flag Problem

> *How many flags if:*
> a) Blocks can repeat colours?
> b) Flag is vertical (3 vertical stripes)?
> c) 4 blocks, 6 colours, no adjacent same colour?

**Solutions:**

a) **With repetition:** 6 × 6 × 6 = **216**

b) **Vertical stripes:** Same as horizontal — **120** (just rotation)

c) **4 blocks, no adjacent same:**
- Block 1: 6 choices
- Block 2: 5 (≠ block 1)
- Block 3: 5 (≠ block 2)
- Block 4: 5 (≠ block 3)
Total = 6 × 5³ = **750**

---

## Problem Set 2: Relations (CA Test Q3)

### Problem 2.1: Relatively Prime Relation

> **Past Exam (CSC 203 CA Test Q3):** Let A = {2, 3, 4, 5, 6} and R = {(x, y) | x, y are relatively prime}. Write R in roster form.

**Solution:**

Two numbers are **relatively prime** (coprime) if gcd(x, y) = 1.

Compute gcd for all 25 pairs:

| x\y | 2 | 3 | 4 | 5 | 6 |
|-----|---|---|---|---|---|
| **2** | 2 | **1** | 2 | **1** | 2 |
| **3** | **1** | 3 | **1** | **1** | 3 |
| **4** | 2 | **1** | 4 | **1** | 2 |
| **5** | **1** | **1** | **1** | 5 | **1** |
| **6** | 2 | 3 | 2 | **1** | 6 |

**R = {(2,3), (2,5), (3,2), (3,4), (3,5), (4,3), (4,5), (5,2), (5,3), (5,4), (5,6), (6,5)}**

**Properties check:**
- Reflexive? No (no (x,x) pairs since gcd(x,x)=x>1 for x>1)
- Symmetric? Yes (gcd(x,y)=gcd(y,x))
- Transitive? No ((2,3)∈R, (3,4)∈R but (2,4)∉R)
- Antisymmetric? No ((2,3) and (3,2) both in R but 2≠3)

---

### Problem 2.2: Congruence Relation

> *Let A = {0, 1, 2, 3, 4, 5, 6}. Define R by: x R y iff x ≡ y (mod 3). Write R as ordered pairs and find equivalence classes.*

**Solution:**

Residue classes mod 3:
- [0] = {0, 3, 6}
- [1] = {1, 4}
- [2] = {2, 5}

R = all pairs within same class:
{(0,0),(0,3),(0,6),(3,0),(3,3),(3,6),(6,0),(6,3),(6,6),
 (1,1),(1,4),(4,1),(4,4),
 (2,2),(2,5),(5,2),(5,5)}

**Properties:** Reflexive ✓, Symmetric ✓, Transitive ✓ → **Equivalence relation**

---

## Problem Set 3: Combinatorial Identities (CA Test Q4)

### Problem 3.1: Past Exam Identity

> **Past Exam (CSC 203 CA Test Q4):** Prove (n - r) · C(n, r) = (r + 1) · C(n, r + 1).

**Algebraic Proof:**

RHS = (r+1) · n! / ((r+1)!(n-r-1)!)
    = n! / (r!(n-r-1)!)
    = (n-r) · n! / (r!(n-r)!)
    = (n-r) · C(n, r) = LHS ∎

**Combinatorial Proof (Double Counting):**

Count ways to: **Choose a committee of r people from n, then choose a chair from the remaining n-r people.**

- **LHS:** Choose committee C(n,r), then chair from n-r non-members → (n-r)C(n,r)
- **RHS:** Choose r+1 people to be "committee ∪ {chair}" in C(n,r+1) ways, then choose which is chair (r+1 ways) → (r+1)C(n,r+1)

Both count same thing → equal. ∎

---

### Problem 3.2: Related Identities

> *Prove: C(n, r) = C(n, n-r)*

**Combinatorial Proof:** Choosing r to INCLUDE = choosing n-r to EXCLUDE. ∎

> *Prove: C(n, r) = C(n-1, r-1) + C(n-1, r) (Pascal's Rule)*

**Combinatorial Proof:** Fix element x. Subsets of size r either contain x (choose r-1 from remaining n-1) or don't (choose r from remaining n-1). ∎

> *Prove: ∑_{k=0}^n C(n,k) = 2ⁿ*

**Combinatorial Proof:** Count all subsets of n-set. Group by size k. Or: each element in/out → 2ⁿ total. ∎

> *Prove: ∑_{k=r}^n C(k,r) = C(n+1, r+1) (Hockey-Stick)*

**Combinatorial Proof:** Choose r+1 from {1..n+1}. Let largest element be k+1 (r ≤ k ≤ n). Choose remaining r from {1..k} → C(k,r). Sum over k. ∎

---

## Problem Set 4: Logic & Proof (CA Test Q5)

### Problem 4.1: Non-Equivalence of Implications

> **Past Exam (CSC 203 CA Test Q5):** Show (p → q) → r and p → (q → r) are not equivalent.

**Truth Table:**

| p | q | r | p→q | (p→q)→r | q→r | p→(q→r) |
|---|---|---|-----|---------|-----|---------|
| T | T | T | T   | T       | T   | T       |
| T | T | F | T   | F       | F   | F       |
| T | F | T | F   | T       | T   | T       |
| T | F | F | F   | T       | T   | T       |
| F | T | T | T   | T       | T   | T       |
| F | T | F | T   | **F**   | F   | **T** ← |
| F | F | T | T   | T       | T   | T       |
| F | F | F | T   | **F**   | T   | **T** ← |

Rows 6 & 8 differ → **Not equivalent**.

**Intuition:** (p→q)→r means "if (p implies q) then r". p→(q→r) means "if p then (q implies r)". Different grouping!

---

### Problem 4.2: Prove Logical Equivalences

> *Prove: p → q ≡ ¬p ∨ q*

**Truth table:** Both false only when p=T, q=F. Otherwise true. ∎

> *Prove: ¬(p → q) ≡ p ∧ ¬q*

**Proof:** ¬(p→q) ≡ ¬(¬p ∨ q) ≡ p ∧ ¬q (De Morgan). ∎

> *Prove: (p → q) ∧ (q → r) → (p → r) is a tautology (Hypothetical Syllogism)*

**Proof:** Assume p→q and q→r true. If p true, then q true (by p→q), then r true (by q→r). So p→r true. ∎

---

## Problem Set 5: Comprehensive Mixed Problems

### Problem 5.1: Counting with Inclusion-Exclusion

> *How many integers from 1 to 1000 are divisible by 3, 5, or 7?*

**Solution:**
Let A = multiples of 3, B = multiples of 5, C = multiples of 7.
|A| = ⌊1000/3⌋ = 333
|B| = ⌊1000/5⌋ = 200
|C| = ⌊1000/7⌋ = 142
|A∩B| = ⌊1000/15⌋ = 66
|A∩C| = ⌊1000/21⌋ = 47
|B∩C| = ⌊1000/35⌋ = 28
|A∩B∩C| = ⌊1000/105⌋ = 9

By Inclusion-Exclusion:
|A ∪ B ∪ C| = 333 + 200 + 142 - 66 - 47 - 28 + 9 = **543**

---

### Problem 5.2: Pigeonhole Principle

> *Prove: In any set of 5 integers, there exist two whose sum or difference is divisible by 7.*

**Solution:** Consider residues mod 7: {0, ±1, ±2, ±3}.
If any residue appears twice, their difference ≡ 0 (mod 7).
If 0 appears, done.
Otherwise we have 5 non-zero residues from {±1, ±2, ±3} (6 possibilities).
By pigeonhole, either:
- Some residue appears twice → difference divisible by 7
- Or both +k and -k appear for some k → sum = k + (-k) = 0 ≡ 0 (mod 7)

In either case, sum or difference divisible by 7. ∎

---

### Problem 5.3: Recurrence Relation

> *Let aₙ = number of bit strings of length n with no consecutive 0s. Find recurrence and solve.*

**Solution:**
Recurrence: aₙ = aₙ₋₁ + aₙ₋₂ (strings ending in 1 + strings ending in 10)
Base: a₁ = 2 (0,1), a₂ = 3 (01,10,11)
This is Fibonacci shifted: aₙ = Fₙ₊₂
Closed form: aₙ = (φⁿ⁺² - ψⁿ⁺²)/√5 where φ = (1+√5)/2

---

### Problem 5.4: Graph Theory

> *Prove: A simple graph with n vertices and more than n(n-2)/2 edges must be connected.*

**Proof by contrapositive:**
Assume disconnected. Then it has at least 2 components.
Max edges in disconnected graph: put 1 vertex alone, n-1 in complete graph.
Edges = C(n-1, 2) = (n-1)(n-2)/2 = n(n-2)/2 - (n-2)/2 < n(n-2)/2 for n>2.
So if edges > n(n-2)/2, cannot be disconnected. ∎

---

### Problem 5.5: Modular Arithmetic

> *Find all solutions to: x² ≡ 1 (mod 24)*

**Solution:**
Factor 24 = 8 × 3, solve separately:
mod 8: x² ≡ 1. Residues: 0²=0, 1²=1, 2²=4, 3²=1, 4²=0, 5²=1, 6²=4, 7²=1
Solutions: x ≡ 1, 3, 5, 7 (mod 8)

mod 3: x² ≡ 1. Solutions: x ≡ 1, 2 (mod 3)

Combine via CRT (8 and 3 coprime):
4 × 2 = 8 solutions mod 24.
By inspection: 1, 5, 7, 11, 13, 17, 19, 23
**Answer: x ≡ 1, 5, 7, 11, 13, 17, 19, 23 (mod 24)**

---

## Problem Set 6: Proof Techniques Practice

### Problem 6.1: Direct Proof

> *Prove: If n is odd, then n² is odd.*

**Proof:** n odd ⇒ n = 2k+1. n² = 4k² + 4k + 1 = 2(2k²+2k) + 1. Odd. ∎

---

### Problem 6.2: Contrapositive Proof

> *Prove: If n² is even, then n is even.*

**Proof (contrapositive):** If n is odd, then n² is odd (by 6.1). So n² even ⇒ n not odd ⇒ n even. ∎

---

### Problem 6.3: Contradiction Proof

> *Prove: √3 is irrational.*

**Proof:** Assume √3 = a/b in lowest terms. 3 = a²/b² ⇒ a² = 3b².
So 3|a² ⇒ 3|a (prime). a = 3k. 9k² = 3b² ⇒ 3k² = b² ⇒ 3|b.
Both divisible by 3, contradicts lowest terms. ∎

---

### Problem 6.4: Induction Proof

> *Prove: 1 + 2 + 3 + ... + n = n(n+1)/2 for all n ≥ 1.*

**Base (n=1):** 1 = 1(2)/2 = 1 ✓
**Inductive:** Assume true for k. 
1+...+k+(k+1) = k(k+1)/2 + (k+1) = (k+1)(k/2+1) = (k+1)(k+2)/2. ✓

---

### Problem 6.5: Strong Induction

> *Prove: Every integer n ≥ 2 is a product of primes.*

**Base:** 2 is prime. ✓
**Inductive:** Assume true for all 2..k. Consider k+1.
- If prime, done.
- If k+1 = ab with 2 ≤ a,b ≤ k, then a and b are products of primes by hypothesis, so k+1 is too. ✓

---

## Problem Set 7: Exam Strategy — Common Patterns

### Pattern 1: "Find the number of..."
→ Identify: Product rule? Sum rule? Permutations? Combinations? Inclusion-Exclusion? Stars & Bars?

### Pattern 2: "Prove that..."
→ Identify: Direct? Contrapositive? Contradiction? Induction? Combinatorial (double counting)?

### Pattern 3: "Write the relation as ordered pairs..."
→ Enumerate systematically. Check properties if asked.

### Pattern 4: "Solve the recurrence..."
→ Find characteristic equation. Check for repeated roots. Add particular solution if non-homogeneous.

### Pattern 5: "Find x such that..."
→ Modular arithmetic. Use extended Euclid for inverses. CRT for systems.

---

## Problem Set 8: Timed Practice Set (Simulate Exam)

**Time limit: 60 minutes**

1. **Sets:** A = {1,2,3,4}, B = {3,4,5,6}. Find |A ∪ B|, |A ∩ B|, |A \ B|, |A × B|.
2. **Counting:** 8 people, choose president, vice-president, secretary. How many ways?
3. **Counting:** 8 people, choose 3-person committee. How many ways?
4. **Relations:** On {1,2,3,4}, R = {(x,y) | x+y is even}. List R. Is it equivalence?
5. **Identity:** Prove C(n,k) = n/k · C(n-1,k-1).
6. **Logic:** Truth table for (p ∨ q) → (p ∧ q). Is it tautology?
7. **Recurrence:** Solve aₙ = 3aₙ₋₁ - 2aₙ₋₂, a₀=1, a₁=3.
8. **Graphs:** K₅ has how many edges? Is it planar?
9. **Modular:** Solve 7x ≡ 5 (mod 12).
10. **CRT:** x ≡ 2 (mod 3), x ≡ 3 (mod 5), x ≡ 2 (mod 7).

---

## Solutions to Timed Practice

1. |A∪B|=6, |A∩B|=2, |A\B|=2, |A×B|=16
2. P(8,3) = 8×7×6 = 336
3. C(8,3) = 56
4. R = {(1,1),(1,3),(2,2),(2,4),(3,1),(3,3),(4,2),(4,4)}. Reflexive? No (2,2) yes but (1,1) yes... wait all self-pairs? (1,1): 1+1=2 even ✓. Actually all (x,x) have 2x even. Yes reflexive. Symmetric: x+y=y+x ✓. Transitive: if x+y even and y+z even, then x+z = (x+y)+(y+z)-2y even. Yes! Equivalence relation.
5. C(n,k) = n!/k!(n-k)! = n/k · (n-1)!/(k-1)!(n-k)! = n/k · C(n-1,k-1)
6. | p | q | p∨q | p∧q | (p∨q)→(p∧q) |
   | T | T | T | T | T |
   | T | F | T | F | F |
   | F | T | T | F | F |
   | F | F | F | F | T |
   Not tautology (false when exactly one of p,q is true)
7. r² - 3r + 2 = 0 → r=1,2. aₙ = A·1ⁿ + B·2ⁿ = A + B·2ⁿ. a₀=1: A+B=1. a₁=3: A+2B=3. B=2, A=-1. aₙ = 2ⁿ⁺¹ - 1.
8. C(5,2) = 10 edges. Not planar (m=10 > 3n-6=9).
9. 7⁻¹ mod 12: 7×7=49≡1. x ≡ 7×5 = 35 ≡ 11 (mod 12).
10. From earlier: **x ≡ 23 (mod 105)**.

---

## Final Exam Tips

| Tip | Explanation |
|-----|-------------|
| **Read carefully** | "At least", "exactly", "at most", "different", "distinct" change everything |
| **Draw pictures** | For relations, graphs, counting — diagrams prevent errors |
| **Check small cases** | Test formula with n=1,2,3 before generalizing |
| **Multiple methods** | If time, solve combinatorial identity both algebraically and combinatorially |
| **Units in modular** | Always reduce mod n after each operation |
| **State theorems** | "By Fermat's Little Theorem..." "By CRT..." shows you know the tools |
| **Time management** | Don't get stuck. Move on, return if time. |

---

## Glossary Terms for Quick Review

[[set]], [[cartesian-product]], [[product-rule]], [[permutation]], [[combination]], [[relation]], [[equivalence-relation]], [[equivalence-class]], [[partition]], [[relatively-prime]], [[gcd]], [[combinatorial-identity]], [[pascal-rule]], [[hockey-stick]], [[vandermonde]], [[binomial-coefficient]], [[implication]], [[logical-equivalence]], [[truth-table]], [[direct-proof]], [[contrapositive-proof]], [[contradiction-proof]], [[mathematical-induction]], [[strong-induction]], [[recurrence-relation]], [[characteristic-equation]], [[fibonacci-sequence]], [[graph]], [[euler-circuit]], [[hamiltonian-cycle]], [[planar-graph]], [[modular-arithmetic]], [[modular-inverse]], [[chinese-remainder-theorem]], [[fermat-little-theorem]], [[euler-theorem]], [[euler-totient]], [[inclusion-exclusion]], [[pigeonhole-principle]], [[stars-and-bars]], [[double-counting]]
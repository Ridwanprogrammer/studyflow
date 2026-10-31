# Combinatorial Identities & Binomial Theorem

## The Central Idea

**Combinatorial identities** are equations that hold true for all valid values of their parameters — they're not just arithmetic coincidences, but expressions of the same counting process done in two different ways.

The **Binomial Theorem** is the crown jewel:
\\[ (x + y)^n = \\sum_{k=0}^n \\binom{n}{k} x^{n-k} y^k \\]

Every coefficient \\(\\binom{n}{k}\\) counts something (subsets of size k). The identities we prove — Pascal's Rule, Vandermonde's Identity, Hockey-Stick — all emerge from counting the same thing differently.

---

## Why It Matters

Past exam:
- "Prove (n-r)C(n,r) = (r+1)C(n,r+1)" (CSC 203 CA Test Q4) → Combinatorial identity
- Binomial coefficients appear everywhere: probability, algorithm analysis, polynomial expansion, combinatorics

---

## How the Idea Develops

**Section 1 — Review: Binomial Coefficients** → **Section 2 — Pascal's Rule & Pascal's Triangle** → **Section 3 — Binomial Theorem** → **Section 4 — Combinatorial Proofs (Double Counting)** → **Section 5 — Vandermonde's Identity** → **Section 6 — Hockey-Stick Identity** → **Section 7 — More Identities** → **Section 8 — Worked Problems** → **Section 9 — Self-Check**

---

## Section 1 — Review: Binomial Coefficients

### Definition

\\[ \\binom{n}{k} = \\frac{n!}{k!(n-k)!} \\quad \\text{for } 0 \\le k \\le n \\]

**Interpretation:** Number of k-element subsets of an n-element set.

### Properties

1. **Symmetry:** \\(\\binom{n}{k} = \\binom{n}{n-k}\\)
2. **Boundary:** \\(\\binom{n}{0} = \\binom{n}{n} = 1\\)
3. **Recursive:** \\(\\binom{n}{k} = \\binom{n-1}{k-1} + \\binom{n-1}{k}\\) (Pascal's Rule)

---

## Section 2 — Pascal's Rule & Pascal's Triangle

### Pascal's Rule (Recursive Identity)

\\[ \\binom{n}{k} = \\binom{n-1}{k-1} + \\binom{n-1}{k} \\quad \\text{for } 1 \\le k \\le n-1 \\]

**Combinatorial Proof:** Choose k from n.
- Fix one element x.
- Either x is in the chosen set: choose remaining k-1 from other n-1 → \\(\\binom{n-1}{k-1}\\)
- Or x is not in the chosen set: choose all k from other n-1 → \\(\\binom{n-1}{k}\\)
- These are disjoint, cover all cases.

### Pascal's Triangle

```
n=0:                    1
n=1:                  1   1
n=2:                1   2   1
n=3:              1   3   3   1
n=4:            1   4   6   4   1
n=5:          1   5  10  10   5   1
n=6:        1   6  15  20  15   6   1
```

Each entry = sum of two above it. Row n contains \\(\\binom{n}{0}, \\binom{n}{1}, ..., \\binom{n}{n}\\).

---

## Section 3 — Binomial Theorem

### Statement

For any real numbers x, y and non-negative integer n:

\\[ (x + y)^n = \\sum_{k=0}^n \\binom{n}{k} x^{n-k} y^k \\]

### Proof (Combinatorial)

Expand (x+y)ⁿ = (x+y)(x+y)...(x+y) (n factors).
To get term xⁿ⁻ᵏyᵏ, choose which k factors contribute y (the rest contribute x).
Number of ways = \\(\\binom{n}{k}\\).

### Special Cases

- x=1, y=1: \\(2^n = \\sum_{k=0}^n \\binom{n}{k}\\) — total subsets of n-set
- x=1, y=-1: \\(0^n = \\sum_{k=0}^n \\binom{n}{k} (-1)^k\\) — alternating sum
- x=1, y=2: \\(3^n = \\sum_{k=0}^n \\binom{n}{k} 2^k\\)

---

## Section 4 — Combinatorial Proofs (Double Counting)

### The Method

To prove identity A = B:
1. Find a set S that can be counted in two different ways
2. Show one way gives A, the other gives B
3. Conclude A = B

This is often more intuitive and illuminating than algebraic manipulation.

### Example: \\(\\sum_{k=0}^n \\binom{n}{k} = 2^n\\)

**LHS:** Sum over all subset sizes k of number of k-subsets.
**RHS:** Each of n elements independently chosen to be in or out → 2ⁿ total subsets.
Both count all subsets of an n-element set.

---

## Section 5 — Vandermonde's Identity

### Statement

\\[ \\binom{m+n}{r} = \\sum_{k=0}^r \\binom{m}{k} \\binom{n}{r-k} \\]

### Combinatorial Proof

Choose r people from a group of m men and n women.
- LHS: Directly choose r from m+n total.
- RHS: Condition on number k of men chosen (0 ≤ k ≤ r).
  - Choose k men: \\(\\binom{m}{k}\\)
  - Choose r-k women: \\(\\binom{n}{r-k}\\)
  - Sum over all possible k.

---

## Section 6 — Hockey-Stick Identity

### Statement

\\[ \\sum_{i=r}^n \\binom{i}{r} = \\binom{n+1}{r+1} \\]

### Visual in Pascal's Triangle

```
          1
        1   1
      1   2   1
    1   3   3   1
  1   4   6   4   1   ← Sum of 4 (diagonal) = 10 (next row, next column)
1   5  10  10   5   1   ← Sum of 10 = 20
```

### Combinatorial Proof

Choose r+1 from {1, 2, ..., n+1}.
Let the largest chosen element be i+1 (where r ≤ i ≤ n).
- Then we must choose r elements from {1, ..., i}.
- Number of ways: \\(\\binom{i}{r}\\)
- Sum over all possible i: \\(\\sum_{i=r}^n \\binom{i}{r}\\)
- Total ways to choose r+1 from n+1: \\(\\binom{n+1}{r+1}\\)

---

## Section 7 — More Useful Identities

| Identity | Name |
|----------|------|
| \\(\\sum_{k=0}^n \\binom{n}{k} = 2^n\\) | Subset count |
| \\(\\sum_{k=0}^n (-1)^k \\binom{n}{k} = 0\\) (n>0) | Alternating sum |
| \\(\\sum_{k=0}^n k\\binom{n}{k} = n2^{n-1}\\) | Expected size |
| \\(\\sum_{k=0}^n k^2\\binom{n}{k} = n(n+1)2^{n-2}\\) | Second moment |
| \\(\\sum_{k=0}^n \\binom{r+k}{k} = \\binom{r+n+1}{n}\\) | Extended hockey-stick |
| \\(\\binom{n}{k} = \\frac{n}{k}\\binom{n-1}{k-1}\\) | Absorption |
| \\(\\sum_{k} \\binom{r}{k}\\binom{s}{n-k} = \\binom{r+s}{n}\\) | Vandermonde (general) |

---

## Section 8 — Worked Exam Problems

### Problem 1: Past Exam Identity (CSC 203 CA Test Q4)

> *Prove that (n - r) · C(n, r) = (r + 1) · C(n, r + 1).*

**Algebraic Proof:**

RHS = (r+1) · \\(\\frac{n!}{(r+1)!(n-r-1)!}\\)
= (r+1) · \\(\\frac{n!}{(r+1)r!(n-r-1)!}\\)
= \\(\\frac{n!}{r!(n-r-1)!}\\)
= \\(\\frac{(n-r)n!}{r!(n-r)!}\\)
= (n-r) · C(n, r) = LHS. ∎

**Combinatorial Proof (Double Counting):**

Count ways to form a committee of r people from n, then choose a **chairperson** from the **non-members**.

- **LHS:** Choose committee first: C(n, r). Then choose chair from n-r non-members: (n-r) ways. Total: (n-r)C(n,r).
- **RHS:** Choose chair+committee as a block: choose r+1 people to be "committee ∪ {chair}" in C(n, r+1) ways, then choose which of these r+1 is the chair: (r+1) ways. Total: (r+1)C(n, r+1).

Both count the same thing → equal. ∎

---

### Problem 2: Evaluate \\(\\sum_{k=0}^n k\\binom{n}{k}\\)

**Solution 1 (Algebraic):**
k\\(\\binom{n}{k}\\) = k · \\(\\frac{n!}{k!(n-k)!}\\) = n · \\(\\frac{(n-1)!}{(k-1)!(n-k)!}\\) = n\\(\\binom{n-1}{k-1}\\)

Sum: \\(\\sum_{k=1}^n n\\binom{n-1}{k-1}\\) = n \\(\\sum_{j=0}^{n-1} \\binom{n-1}{j}\\) = n · 2ⁿ⁻¹

**Solution 2 (Combinatorial):**
Count ways to choose a committee from n people AND choose a chair from the committee.
- Choose chair first (n ways), then choose any subset of remaining n-1 to join: n · 2ⁿ⁻¹
- Or: choose committee size k (C(n,k)), then choose chair from k members (k ways). Sum: \\(\\sum k\\binom{n}{k}\\)

---

### Problem 3: Evaluate \\(\\sum_{k=0}^n \\binom{n}{k}^2\\)

**Solution (Vandermonde):**
\\(\\sum_{k=0}^n \\binom{n}{k}\\binom{n}{n-k}\\) = \\(\\binom{2n}{n}\\) by Vandermonde with m=n, r=n.
Since \\(\\binom{n}{n-k} = \\binom{n}{k}\\), sum = \\(\\binom{2n}{n}\\).

---

### Problem 4: Hockey-Stick Application

> *Prove: \\(\\binom{n}{0} + \\binom{n+1}{1} + \\binom{n+2}{2} + ... + \\binom{n+r}{r} = \\binom{n+r+1}{r}\\).*

**Proof:** Rewrite using symmetry \\(\\binom{n+k}{k} = \\binom{n+k}{n}\\). Then sum = \\(\\sum_{k=0}^r \\binom{n+k}{n}\\). Let i = n+k, runs from n to n+r. Sum = \\(\\sum_{i=n}^{n+r} \\binom{i}{n}\\) = \\(\\binom{n+r+1}{n+1}\\) = \\(\\binom{n+r+1}{r}\\) by hockey-stick.

---

### Problem 5: Binomial Theorem Application

> *Find the coefficient of x⁵ in (2x - 3)⁷.*

**Solution:**
(2x - 3)⁷ = \\(\\sum_{k=0}^7 \\binom{7}{k} (2x)^{7-k} (-3)^k\\)
Term with x⁵: 7-k = 5 ⇒ k = 2.
Coefficient = \\(\\binom{7}{2} (2)^5 (-3)^2\\) = 21 × 32 × 9 = **6048**

---

### Problem 6: Sum of Binomial Coefficients with Weights

> *Evaluate: \\(\\sum_{k=0}^n (k+1)\\binom{n}{k}\\).*

**Solution:**
\\(\\sum (k+1)\\binom{n}{k}\\) = \\(\\sum k\\binom{n}{k}\\) + \\(\\sum \\binom{n}{k}\\) = n2ⁿ⁻¹ + 2ⁿ = (n+2)2ⁿ⁻¹

---

### Problem 7: Proving an Identity by Induction

> *Prove: \\(\\sum_{k=0}^n \\binom{k}{m} = \\binom{n+1}{m+1}\\) for fixed m ≤ n.*

**Base (n=m):** LHS = \\(\\binom{m}{m}\\) = 1. RHS = \\(\\binom{m+1}{m+1}\\) = 1. ✓

**Inductive:** Assume true for n. For n+1:
\\(\\sum_{k=0}^{n+1} \\binom{k}{m}\\) = \\(\\binom{n+1}{m+1}\\) + \\(\\binom{n+1}{m}\\)
= \\(\\binom{n+2}{m+1}\\) by Pascal's Rule. ✓

(Note: This is exactly the hockey-stick identity.)

---

### Problem 8: Multinomial Coefficient

> *How many ways to arrange the letters of "BANANA"?*

**Solution:** 6 letters: B(1), A(3), N(2).
Multinomial: \\(\\frac{6!}{1!3!2!}\\) = 720 / 12 = **60**

General: \\(\\frac{n!}{n_1! n_2! \\cdots n_k!}\\) where \\(\\sum n_i = n\\).

---

## Section 9 — Common Pitfalls

| Pitfall | Correction |
|---------|------------|
| Forgetting boundary conditions | \\(\\binom{n}{k} = 0\\) if k < 0 or k > n |
| Misapplying hockey-stick | Sum must be along a diagonal: \\(\\binom{r}{r} + \\binom{r+1}{r} + ...\\) |
| Confusing Vandermonde indices | \\(\\sum_k \\binom{m}{k}\\binom{n}{r-k} = \\binom{m+n}{r}\\) — upper indices add to m+n |
| Forgetting (-1)ᵏ in alternating sum | \\(\\sum (-1)^k \\binom{n}{k} = 0\\) only for n > 0 |
| Algebraic errors in factorial manipulation | Write out factorials explicitly; cancel carefully |

---

## Section 10 — Conceptual Model

**Binomial Coefficients = Subset Counters**

Every identity is a different way of counting subsets:
- **Pascal's Rule** = fix one element, in/out
- **Vandermonde** = split set into two parts (men/women)
- **Hockey-Stick** = condition on largest element
- **Binomial Theorem** = expand (1+1)ⁿ, (1-1)ⁿ, etc.
- **Sum kC(n,k)** = choose committee + chair

**Double Counting Mantra:** "Count the same thing two ways. They must be equal."

---

## Section 11 — Glossary Terms Used in This Topic

[[binomial-coefficient]], [[pascal-rule]], [[pascal-triangle]], [[binomial-theorem]], [[combinatorial-proof]], [[double-counting]], [[vandermonde-identity]], [[hockey-stick-identity]], [[combinatorial-identity]], [[multinomial-coefficient]], [[absorption-identity]], [[alternating-sum]], [[subset-counting]], [[committee-chair]], [[double-counting-proof]], [[algebraic-proof]], [[induction-proof]], [[symmetry-property]], [[boundary-conditions]]
# Recurrence Relations

## The Central Idea

A **recurrence relation** defines a sequence by expressing each term as a function of previous terms. Instead of a direct formula for the nth term, you get a **rule** like:

\\[ a_n = a_{n-1} + a_{n-2} \\quad \\text{(Fibonacci)} \\]

Solving a recurrence means finding a **closed-form** (explicit) formula for aₙ.

This topic covers:
- Defining sequences recursively
- Linear homogeneous recurrences with constant coefficients
- Characteristic equation method
- Particular solutions for non-homogeneous recurrences
- Generating functions (intro)
- Applications: algorithm analysis, counting problems

---

## Why It Matters

- **Algorithm analysis:** Merge sort T(n) = 2T(n/2) + n, Binary search T(n) = T(n/2) + 1
- **Counting problems:** Number of bit strings without consecutive 0s, ways to tile a board
- **Dynamic programming:** Recurrence is the DP state transition
- **Financial math:** Compound interest, annuities, loan amortization

---

## How the Idea Develops

**Section 1 — Conceptual Introduction** → **Section 2 — Terminology** → **Section 3 — First-Order Linear Recurrences** → **Section 4 — Second-Order Linear Homogeneous** → **Section 5 — Characteristic Equation Method** → **Section 6 — Non-Homogeneous Recurrences** → **Section 7 — Divide-and-Conquer Recurrences (Master Theorem)** → **Section 8 — Generating Functions** → **Section 9 — Worked Problems** → **Section 10 — Self-Check**

---

## Section 1 — Conceptual Introduction

### What is a Recurrence Relation?

A **recurrence relation** for a sequence {aₙ} is an equation that expresses aₙ in terms of one or more previous terms a₀, a₁, ..., aₙ₋₁.

**Examples:**
- Arithmetic: aₙ = aₙ₋₁ + d, a₀ = A
- Geometric: aₙ = r · aₙ₋₁, a₀ = A
- Fibonacci: Fₙ = Fₙ₋₁ + Fₙ₋₂, F₀ = 0, F₁ = 1
- Factorial: n! = n · (n-1)!, 0! = 1
- Tower of Hanoi: Hₙ = 2Hₙ₋₁ + 1, H₁ = 1

A recurrence needs **initial conditions** (base cases) to uniquely determine the sequence.

### Recurrence vs. Closed Form

| Recurrence | Closed Form |
|------------|-------------|
| aₙ = aₙ₋₁ + 2, a₀ = 1 | aₙ = 2n + 1 |
| aₙ = 2aₙ₋₁, a₀ = 3 | aₙ = 3 · 2ⁿ |
| Fₙ = Fₙ₋₁ + Fₙ₋₂, F₀=0, F₁=1 | Fₙ = (φⁿ - ψⁿ)/√5 |

---

## Section 2 — Required Terminology

| Term | Meaning |
|------|---------|
| [[recurrence-relation]] | Equation expressing aₙ in terms of previous terms |
| [[initial-conditions]] | Base values (e.g., a₀, a₁) that anchor the sequence |
| [[closed-form]] | Explicit formula for aₙ without recursion |
| [[linear-recurrence]] | aₙ = c₁aₙ₋₁ + c₂aₙ₋₂ + ... + cₖaₙ₋ₖ + f(n) |
| [[homogeneous]] | f(n) = 0 (no forcing term) |
| [[non-homogeneous]] | f(n) ≠ 0 (has forcing term) |
| [[constant-coefficients]] | c₁, c₂, ... are constants (not functions of n) |
| [[order]] | Number of previous terms used (k for aₙ₋ₖ) |
| [[characteristic-equation]] | rᵏ - c₁rᵏ⁻¹ - ... - cₖ = 0 |
| [[characteristic-root]] | Root of the characteristic equation |
| [[particular-solution]] | Any solution to the non-homogeneous recurrence |
| [[general-solution]] | Homogeneous solution + particular solution |
| [[master-theorem]] | Solves T(n) = aT(n/b) + f(n) |
| [[generating-function]] | Formal power series G(x) = ∑ aₙxⁿ |
| [[convolution]] | (a * b)ₙ = ∑ aₖbₙ₋ₖ |
| [[catalan-numbers]] | Cₙ = (1/(n+1))\\(\\binom{2n}{n}\\) — many combinatorial recurrences |

---

## Section 3 — First-Order Linear Recurrences

### General Form

\\[ a_n = c a_{n-1} + f(n), \\quad a_0 = A \\]

### Homogeneous Case (f(n) = 0)

\\[ a_n = c a_{n-1} \\]
Solution: \\(a_n = A c^n\\)

**Example:** aₙ = 3aₙ₋₁, a₀ = 5 → aₙ = 5 · 3ⁿ

### Non-Homogeneous: Constant Forcing (f(n) = K)

\\[ a_n = c a_{n-1} + K \\]

**Method:** Find particular solution p (constant). Try p = K/(1-c) if c ≠ 1.
General: aₙ = A cⁿ + K/(1-c)

**Example:** aₙ = 2aₙ₋₁ + 5, a₀ = 1
Particular: p = 5/(1-2) = -5
General: aₙ = A·2ⁿ - 5
Use a₀ = 1: 1 = A - 5 ⇒ A = 6
Solution: **aₙ = 6·2ⁿ - 5**

### Non-Homogeneous: Polynomial Forcing

If f(n) is polynomial of degree d, try particular solution of degree d (or d+1 if c=1).

**Example:** aₙ = 2aₙ₋₁ + n, a₀ = 0
Try pₙ = An + B.
A n + B = 2(A(n-1) + B) + n
= 2An - 2A + 2B + n
Match coefficients: A = 2A + 1 ⇒ A = -1. B = -2A + 2B ⇒ B = 2A = -2.
Particular: -n - 2
General: aₙ = C·2ⁿ - n - 2
a₀ = 0 ⇒ C - 2 = 0 ⇒ C = 2
Solution: **aₙ = 2ⁿ⁺¹ - n - 2**

---

## Section 4 — Second-Order Linear Homogeneous

### General Form

\\[ a_n = c_1 a_{n-1} + c_2 a_{n-2} \\]

### Characteristic Equation

Assume solution of form aₙ = rⁿ. Substitute:
\\[ r^n = c_1 r^{n-1} + c_2 r^{n-2} \\]
Divide by rⁿ⁻²:
\\[ r^2 - c_1 r - c_2 = 0 \\]

This is the **characteristic equation**.

### Case 1: Distinct Real Roots r₁, r₂

General solution: \\(a_n = \\alpha r_1^n + \\beta r_2^n\\)

**Example:** aₙ = 5aₙ₋₁ - 6aₙ₋₂, a₀ = 1, a₁ = 4
Characteristic: r² - 5r + 6 = 0 → (r-2)(r-3) = 0 → r = 2, 3
aₙ = α·2ⁿ + β·3ⁿ
a₀ = α + β = 1
a₁ = 2α + 3β = 4
Solve: α = -1, β = 2
**aₙ = -2ⁿ + 2·3ⁿ**

---

### Case 2: Repeated Root r (Multiplicity 2)

General solution: \\(a_n = (\\alpha + \\beta n) r^n\\)

**Example:** aₙ = 4aₙ₋₁ - 4aₙ₋₂, a₀ = 1, a₁ = 4
Characteristic: r² - 4r + 4 = 0 → (r-2)² = 0 → r = 2 (double)
aₙ = (α + βn)2ⁿ
a₀ = α = 1
a₁ = (1+β)2 = 4 ⇒ 1+β = 2 ⇒ β = 1
**aₙ = (n+1)2ⁿ**

---

### Case 3: Complex Roots

If roots are complex conjugates: r = ρe^{±iθ}
Solution: \\(a_n = \\rho^n (A \\cos n\\theta + B \\sin n\\theta)\\)
Often written using trigonometric form or kept as complex exponentials.

---

## Section 5 — Characteristic Equation Method (General)

For order k:
\\[ a_n = c_1 a_{n-1} + c_2 a_{n-2} + \\cdots + c_k a_{n-k} \\]

**Characteristic equation:**
\\[ r^k - c_1 r^{k-1} - c_2 r^{k-2} - \\cdots - c_k = 0 \\]

If roots are r₁, r₂, ..., rₖ with multiplicities m₁, m₂, ..., mₖ:
General solution = sum over roots of (polynomial of degree mᵢ-1 in n) × rᵢⁿ.

**Example:** Order 3, roots 2 (mult 2), -1 (mult 1)
aₙ = (α + βn)2ⁿ + γ(-1)ⁿ

---

## Section 6 — Non-Homogeneous Linear Recurrences

### General Form

\\[ a_n = c_1 a_{n-1} + \\cdots + c_k a_{n-k} + f(n) \\]

**General solution = Homogeneous solution + Particular solution**

### Finding Particular Solution (Method of Undetermined Coefficients)

| f(n) | Try Particular Solution |
|------|-------------------------|
| Constant K | A |
| Polynomial nᵈ | A_d nᵈ + ... + A₀ |
| rⁿ (exponential) | A rⁿ |
| nᵈ rⁿ | (A_d nᵈ + ... + A₀) rⁿ |
| Sum of above | Sum of corresponding forms |

**Crucial:** If the trial form matches a homogeneous solution, multiply by n (or nˢ where s is multiplicity of matching root).

**Example:** aₙ = 3aₙ₋₁ + 2ⁿ
Homogeneous: aₙʰ = α·3ⁿ
Try particular: A·2ⁿ
A·2ⁿ = 3A·2ⁿ⁻¹ + 2ⁿ = (3A/2)·2ⁿ + 2ⁿ
A = 3A/2 + 1 ⇒ -A/2 = 1 ⇒ A = -2
Particular: -2·2ⁿ = -2ⁿ⁺¹
General: aₙ = α·3ⁿ - 2ⁿ⁺¹

---

## Section 7 — Divide-and-Conquer Recurrences & Master Theorem

### Form

\\[ T(n) = a T(n/b) + f(n) \\quad (a \\ge 1, b > 1) \\]

### Master Theorem

Let T(n) = a T(n/b) + f(n). Compare f(n) with n^{log_b a}.

**Case 1:** f(n) = O(n^{log_b a - ε}) for some ε > 0
→ T(n) = Θ(n^{log_b a})

**Case 2:** f(n) = Θ(n^{log_b a} logᵏ n) for k ≥ 0
→ T(n) = Θ(n^{log_b a} log^{k+1} n)

**Case 3:** f(n) = Ω(n^{log_b a + ε}) and a f(n/b) ≤ c f(n) for some c < 1
→ T(n) = Θ(f(n))

### Examples

| Recurrence | a | b | log_b a | f(n) | Case | Solution |
|------------|---|---|---------|------|------|----------|
| T(n) = 2T(n/2) + n | 2 | 2 | 1 | n | 2 (k=0) | Θ(n log n) |
| T(n) = 2T(n/2) + n² | 2 | 2 | 1 | n² | 3 | Θ(n²) |
| T(n) = 4T(n/2) + n | 4 | 2 | 2 | n | 1 | Θ(n²) |
| T(n) = T(n/2) + 1 | 1 | 2 | 0 | 1 | 2 (k=0) | Θ(log n) |
| T(n) = 2T(n/2) + n log n | 2 | 2 | 1 | n log n | 2 (k=1) | Θ(n log² n) |

---

## Section 8 — Generating Functions (Introduction)

### Definition

The **ordinary generating function** for sequence {aₙ} is:

\\[ G(x) = \\sum_{n=0}^\\infty a_n x^n = a_0 + a_1 x + a_2 x^2 + \\cdots \\]

### Key Properties

- **Shift:** ∑ aₙ₊₁ xⁿ = (G(x) - a₀)/x
- **Multiply by n:** ∑ n aₙ xⁿ = x G'(x)
- **Convolution:** If cₙ = ∑_{k=0}^n aₖ bₙ₋ₖ, then C(x) = A(x) B(x)

### Solving Recurrences with Generating Functions

1. Multiply recurrence by xⁿ and sum over n
2. Express sums in terms of G(x)
3. Solve for G(x)
4. Expand G(x) as power series to read off aₙ

**Example:** Fibonacci Fₙ = Fₙ₋₁ + Fₙ₋₂, F₀=0, F₁=1
G(x) = ∑ Fₙ xⁿ
∑ Fₙ xⁿ = ∑ Fₙ₋₁ xⁿ + ∑ Fₙ₋₂ xⁿ
G(x) = x G(x) + x² G(x) + x (adjusting for initial conditions)
G(x) = x / (1 - x - x²)
Partial fractions → Binet's formula.

---

## Section 9 — Worked Problems

### Problem 1: First-Order Non-Homogeneous

> *Solve: aₙ = 2aₙ₋₁ + 3, a₀ = 1.*

**Solution:**
Homogeneous: aₙʰ = α·2ⁿ
Particular: try constant p. p = 2p + 3 ⇒ p = -3
General: aₙ = α·2ⁿ - 3
a₀ = 1 ⇒ α - 3 = 1 ⇒ α = 4
**aₙ = 4·2ⁿ - 3 = 2ⁿ⁺² - 3**

---

### Problem 2: Fibonacci (Second-Order)

> *Solve: Fₙ = Fₙ₋₁ + Fₙ₋₂, F₀ = 0, F₁ = 1.*

**Solution:**
Characteristic: r² - r - 1 = 0
Roots: r = (1 ± √5)/2 = φ, ψ
φ = (1+√5)/2 ≈ 1.618 (golden ratio)
ψ = (1-√5)/2 ≈ -0.618

General: Fₙ = A φⁿ + B ψⁿ
F₀ = 0: A + B = 0 ⇒ B = -A
F₁ = 1: A φ - A ψ = 1 ⇒ A(φ - ψ) = 1 ⇒ A = 1/√5

**Fₙ = (φⁿ - ψⁿ)/√5** (Binet's Formula)

---

### Problem 3: Repeated Root

> *Solve: aₙ = 6aₙ₋₁ - 9aₙ₋₂, a₀ = 1, a₁ = 6.*

**Solution:**
Characteristic: r² - 6r + 9 = 0 → (r-3)² = 0, r = 3 (double)
General: aₙ = (α + βn)3ⁿ
a₀ = 1: α = 1
a₁ = 6: (1+β)3 = 6 ⇒ 1+β = 2 ⇒ β = 1
**aₙ = (n+1)3ⁿ**

---

### Problem 4: Non-Homogeneous with Exponential Forcing

> *Solve: aₙ = 4aₙ₋₁ + 3ⁿ, a₀ = 2.*

**Solution:**
Homogeneous: aₙʰ = α·4ⁿ
Particular: Try A·3ⁿ (3 ≠ 4, so no conflict)
A·3ⁿ = 4A·3ⁿ⁻¹ + 3ⁿ = (4A/3)·3ⁿ + 3ⁿ
A = 4A/3 + 1 ⇒ -A/3 = 1 ⇒ A = -3
Particular: -3·3ⁿ = -3ⁿ⁺¹
General: aₙ = α·4ⁿ - 3ⁿ⁺¹
a₀ = 2: α - 3 = 2 ⇒ α = 5
**aₙ = 5·4ⁿ - 3ⁿ⁺¹**

---

### Problem 5: Resonance (Forcing Matches Homogeneous Root)

> *Solve: aₙ = 2aₙ₋₁ + 2ⁿ, a₀ = 1.*

**Solution:**
Homogeneous: aₙʰ = α·2ⁿ
Forcing is 2ⁿ — matches homogeneous root r=2!
Try A·n·2ⁿ (multiply by n)
A n 2ⁿ = 2·A(n-1)·2ⁿ⁻¹ + 2ⁿ = A(n-1)2ⁿ + 2ⁿ
Divide by 2ⁿ: A n = A(n-1) + 1 = A n - A + 1
A = 1
Particular: n·2ⁿ
General: aₙ = α·2ⁿ + n·2ⁿ = (α + n)2ⁿ
a₀ = 1: α = 1
**aₙ = (n+1)2ⁿ**

---

### Problem 6: Master Theorem

> *Solve: T(n) = 3T(n/4) + n log n*

**Solution:**
a = 3, b = 4
log_b a = log₄ 3 ≈ 0.792
f(n) = n log n = n¹ log n

Compare n¹ with n⁰·⁷⁹²: f(n) is larger.
Check Case 3: f(n) = Ω(n^{0.792+ε}) for ε = 0.2? Yes, n¹ = Ω(n⁰·⁹⁹²).
Regularity: a f(n/b) = 3(n/4)log(n/4) = (3/4)n(log n - log 4) ≤ c n log n for c = 3/4 < 1.
Case 3 applies: **T(n) = Θ(n log n)**

---

### Problem 7: Counting with Recurrence

> *Let aₙ = number of bit strings of length n with no consecutive 0s. Find recurrence and solve.*

**Solution:**
Consider last bit:
- Ends in 1: prepend any valid string of length n-1 → aₙ₋₁
- Ends in 0: must be preceded by 1, so string ends in "10". Prepend any valid string of length n-2 → aₙ₋₂

Recurrence: **aₙ = aₙ₋₁ + aₙ₋₂**
Initial: a₁ = 2 (0, 1), a₂ = 3 (01, 10, 11)
This is Fibonacci shifted: aₙ = Fₙ₊₂

Closed form: **aₙ = (φⁿ⁺² - ψⁿ⁺²)/√5**

---

### Problem 8: Tower of Hanoi

> *Hₙ = minimum moves to transfer n disks. Recurrence: Hₙ = 2Hₙ₋₁ + 1, H₁ = 1.*

**Solution:**
Homogeneous: Hₙʰ = α·2ⁿ
Particular: try constant p. p = 2p + 1 ⇒ p = -1
General: Hₙ = α·2ⁿ - 1
H₁ = 1: 2α - 1 = 1 ⇒ α = 1
**Hₙ = 2ⁿ - 1**

---

### Problem 9: Generating Function for Fibonacci

> *Find generating function for Fibonacci and derive Binet's formula.*

**Solution:**
G(x) = ∑ Fₙ xⁿ
Fₙ = Fₙ₋₁ + Fₙ₋₂ for n ≥ 2
∑_{n≥2} Fₙ xⁿ = ∑_{n≥2} Fₙ₋₁ xⁿ + ∑_{n≥2} Fₙ₋₂ xⁿ
G(x) - F₀ - F₁x = x(G(x) - F₀) + x²G(x)
G(x) - x = x G(x) + x² G(x)
G(x)(1 - x - x²) = x
**G(x) = x / (1 - x - x²)**

Partial fractions:
1 - x - x² = (1 - φx)(1 - ψx) where φ, ψ = (1±√5)/2
G(x) = x / ((1-φx)(1-ψx)) = (1/√5)[1/(1-φx) - 1/(1-ψx)]
= (1/√5) ∑ (φⁿ - ψⁿ) xⁿ
Fₙ = (φⁿ - ψⁿ)/√5. ∎

---

## Section 10 — Common Pitfalls

| Pitfall | Correction |
|---------|------------|
| Forgetting initial conditions | Recurrence alone doesn't determine sequence; need base cases |
| Wrong characteristic equation | For aₙ = c₁aₙ₋₁ + c₂aₙ₋₂, it's r² - c₁r - c₂ = 0 (minus signs!) |
| Not multiplying by n for resonance | If forcing term matches homogeneous root, multiply trial by n |
| Misapplying Master Theorem | Check regularity condition for Case 3; log base matters |
| Off-by-one in indexing | Be careful: is recurrence for n≥1 or n≥2? Adjust base cases |
| Confusing O/Θ/Ω in Master Theorem | Case 1: O(smaller), Case 3: Ω(larger) + regularity |

---

## Section 11 — Conceptual Model

**Recurrence = Recipe for Sequence**

- **Homogeneous** = "pure" growth/decay determined by characteristic roots
- **Particular** = "response" to external forcing f(n)
- **General** = natural behavior + forced response
- **Characteristic roots** = "frequencies" of the system
  - Real > 1: exponential growth
  - Real between 0 and 1: exponential decay
  - Negative: alternating sign
  - Complex: oscillation
- **Master Theorem** = divide problem, conquer pieces, combine cost
- **Generating Function** = encode entire sequence in one algebraic object

---

## Section 12 — Glossary Terms Used in This Topic

[[recurrence-relation]], [[initial-conditions]], [[closed-form]], [[linear-recurrence]], [[homogeneous]], [[non-homogeneous]], [[constant-coefficients]], [[order]], [[characteristic-equation]], [[characteristic-root]], [[particular-solution]], [[general-solution]], [[master-theorem]], [[generating-function]], [[convolution]], [[catalan-numbers]], [[fibonacci-sequence]], [[binet-formula]], [[golden-ratio]], [[repeated-root]], [[resonance]], [[method-undetermined-coefficients]], [[divide-and-conquer]], [[recursion-tree]], [[akrabazzi-method]], [[ordinary-generating-function]], [[exponential-generating-function]]
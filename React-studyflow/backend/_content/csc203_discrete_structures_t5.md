# Logic & Proof Techniques

## The Central Idea

**Logic** is the study of valid reasoning. A **proof** is a sequence of statements, each justified by axioms, definitions, or previously established results, that demonstrates the truth of a conclusion.

In discrete mathematics, we work with **propositional logic** (statements that are true or false) and **predicate logic** (statements with variables and quantifiers). We also learn standard **proof techniques**: direct proof, contrapositive, contradiction, induction, and case analysis.

This topic covers:
- Propositions, connectives, truth tables
- Logical equivalence, tautologies, contradictions
- Quantifiers (∀, ∃) and negation
- Proof strategies with worked examples
- Mathematical induction (weak and strong)
- Common logical fallacies

---

## Why It Matters

Past exam questions:
- "Show that (p → q) → r and p → (q → r) are not equivalent." (CSC 203 CA Test Q5) → Truth tables, logical equivalence
- "Prove (n-r)C(n,r) = (r+1)C(n,r+1)" (CSC 203 CA Test Q4) → Algebraic manipulation, combinatorial proof
- All of computer science (algorithms, verification, AI, databases) rests on logical foundations

---

## How the Idea Develops

**Section 1 — Conceptual Introduction** → **Section 2 — Terminology** → **Section 3 — Propositional Logic** → **Section 4 — Logical Equivalence** → **Section 5 — Predicate Logic & Quantifiers** → **Section 6 — Proof Techniques** → **Section 7 — Mathematical Induction** → **Section 8 — Worked Problems** → **Section 9 — Self-Check**

---

## Section 1 — Conceptual Introduction

### What is a Proposition?

A **proposition** is a declarative sentence that is either **true** or **false** (but not both).

**Examples of propositions:**
- "2 + 2 = 4" (True)
- "The moon is made of cheese" (False)
- "Every even integer > 2 is the sum of two primes" (Unknown, but still a proposition — it has a truth value)

**Not propositions:**
- "What time is it?" (Question)
- "Please close the door" (Command)
- "x > 5" (Predicate — truth depends on x)
- "This statement is false" (Paradox — not a well-defined proposition)

### Logical Connectives

We build compound propositions from simple ones using **connectives**:

| Connective | Symbol | Name | Meaning |
|------------|--------|------|---------|
| NOT | ¬p or ~p | Negation | "not p" |
| AND | p ∧ q | Conjunction | "p and q" |
| OR | p ∨ q | Disjunction | "p or q" (inclusive) |
| IMPLIES | p → q | Implication | "if p then q" |
| IFF | p ↔ q | Biconditional | "p if and only if q" |

---

## Section 2 — Required Terminology

| Term | Meaning |
|------|---------|
| [[proposition]] | A statement that is true or false |
| [[connective]] | Operator combining propositions (¬, ∧, ∨, →, ↔) |
| [[truth-table]] | Table showing truth value of compound for all input combinations |
| [[tautology]] | Proposition true for all truth assignments (e.g., p ∨ ¬p) |
| [[contradiction]] | Proposition false for all truth assignments (e.g., p ∧ ¬p) |
| [[contingency]] | Proposition sometimes true, sometimes false |
| [[logical-equivalence]] | p ≡ q: p and q have identical truth tables |
| [[implication]] | p → q: "if p then q" |
| [[converse]] | q → p (not equivalent to p → q) |
| [[inverse]] | ¬p → ¬q (not equivalent to p → q) |
| [[contrapositive]] | ¬q → ¬p (EQUIVALENT to p → q) |
| [[quantifier]] | ∀ (for all), ∃ (there exists) |
| [[predicate]] | Statement with variables, becomes proposition when variables bound |
| [[universal-quantifier]] | ∀x P(x): "for all x, P(x) holds" |
| [[existential-quantifier]] | ∃x P(x): "there exists x such that P(x) holds" |
| [[direct-proof]] | Assume hypothesis, deduce conclusion |
| [[contrapositive-proof]] | Prove ¬q → ¬p instead of p → q |
| [[contradiction-proof]] | Assume ¬(conclusion), derive contradiction |
| [[induction]] | Prove base case, then inductive step |
| [[strong-induction]] | Assume true for all < n, prove for n |
| [[counterexample]] | Single case disproving a universal claim |

---

## Section 3 — Propositional Logic

### Truth Tables

| p | q | ¬p | p ∧ q | p ∨ q | p → q | p ↔ q |
|---|---|----|-------|-------|-------|-------|
| T | T | F  | T     | T     | T     | T     |
| T | F | F  | F     | T     | F     | F     |
| F | T | T  | F     | T     | T     | F     |
| F | F | T  | F     | F     | T     | T     |

**Key insight for implication:** p → q is **false only when p is true and q is false**. Otherwise true.

This captures: "If you get an A, I'll give you $100."
- You get A, I give $100 → True (promise kept)
- You get A, I don't give → False (promise broken)
- You don't get A, I give $100 → True (promise not triggered, but I'm generous)
- You don't get A, I don't give → True (promise not triggered)

---

## Section 4 — Logical Equivalence

Two propositions p and q are **logically equivalent** (p ≡ q) iff they have the same truth value in every row of the truth table.

### Important Equivalences

| Name | Equivalence |
|------|-------------|
| **Double Negation** | ¬(¬p) ≡ p |
| **De Morgan's Laws** | ¬(p ∧ q) ≡ ¬p ∨ ¬q  <br> ¬(p ∨ q) ≡ ¬p ∧ ¬q |
| **Commutative** | p ∧ q ≡ q ∧ p  <br> p ∨ q ≡ q ∨ p |
| **Associative** | (p ∧ q) ∧ r ≡ p ∧ (q ∧ r)  <br> (p ∨ q) ∨ r ≡ p ∨ (q ∨ r) |
| **Distributive** | p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r)  <br> p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r) |
| **Idempotent** | p ∧ p ≡ p  <br> p ∨ p ≡ p |
| **Absorption** | p ∧ (p ∨ q) ≡ p  <br> p ∨ (p ∧ q) ≡ p |
| **Implication** | p → q ≡ ¬p ∨ q |
| **Contrapositive** | p → q ≡ ¬q → ¬p |
| **Biconditional** | p ↔ q ≡ (p → q) ∧ (q → p) ≡ (p ∧ q) ∨ (¬p ∧ ¬q) |

### Proving Equivalence

Two methods:
1. **Truth table** — mechanical, works for small number of variables
2. **Algebraic manipulation** — use known equivalences to transform one into the other

---

## Section 5 — Predicate Logic & Quantifiers

### Predicates

A **predicate** P(x) is a statement with a free variable x. It becomes a proposition when x is assigned a value.

**Example:** P(x) = "x is prime"
- P(2) = True
- P(4) = False

### Universal Quantifier (∀)

**∀x P(x)** means "For all x in the domain, P(x) is true."

**Negation:** ¬(∀x P(x)) ≡ ∃x ¬P(x)

**Example:** "All primes are odd" = ∀x (Prime(x) → Odd(x))
Negation: "There exists a prime that is not odd" = ∃x (Prime(x) ∧ ¬Odd(x))

### Existential Quantifier (∃)

**∃x P(x)** means "There exists at least one x in the domain such that P(x) is true."

**Negation:** ¬(∃x P(x)) ≡ ∀x ¬P(x)

**Example:** "There is an even prime" = ∃x (Even(x) ∧ Prime(x))
Negation: "No even prime exists" = ∀x ¬(Even(x) ∧ Prime(x)) ≡ ∀x (Even(x) → ¬Prime(x))

### Nested Quantifiers

Order matters!

- ∀x ∃y P(x,y): "For every x, there is some y (possibly depending on x) such that P(x,y)"
- ∃y ∀x P(x,y): "There is a single y that works for all x"

**Example:** L(x,y) = "x loves y"
- ∀x ∃y L(x,y): Everyone loves someone
- ∃y ∀x L(x,y): Someone is loved by everyone (much stronger!)

---

## Section 6 — Proof Techniques

### 1. Direct Proof

To prove **p → q**: Assume p is true. Use definitions, axioms, and logic to deduce q.

**Example:** Prove: If n is even, then n² is even.
*Proof:* Assume n is even. Then n = 2k for some integer k. n² = (2k)² = 4k² = 2(2k²). Since 2k² is an integer, n² is even. ∎

---

### 2. Proof by Contrapositive

To prove **p → q**: Instead prove **¬q → ¬p** (logically equivalent).

**Example:** Prove: If n² is odd, then n is odd.
*Proof (contrapositive):* Assume n is not odd (i.e., n is even). Then n = 2k. n² = 4k² = 2(2k²) is even, so n² is not odd. ∎

---

### 3. Proof by Contradiction

To prove **p**: Assume **¬p** and derive a **contradiction** (a statement and its negation, or a known falsehood).

**Example:** Prove: √2 is irrational.
*Proof:* Assume √2 is rational. Then √2 = a/b in lowest terms (a,b integers, gcd=1). 2 = a²/b² ⇒ a² = 2b². So a² is even ⇒ a is even ⇒ a = 2k. Then (2k)² = 2b² ⇒ 4k² = 2b² ⇒ b² = 2k² ⇒ b is even. But then both a and b are even, contradicting gcd(a,b)=1. ∎

---

### 4. Proof by Cases

To prove **p**: Break into exhaustive cases c₁, c₂, ..., cₖ. Prove p in each case.

**Example:** Prove: For any integer n, n² ≡ 0 or 1 (mod 4).
*Proof:* Any integer n is either even (n=2k) or odd (n=2k+1).
- Case 1: n=2k. n² = 4k² ≡ 0 (mod 4).
- Case 2: n=2k+1. n² = 4k²+4k+1 = 4(k²+k)+1 ≡ 1 (mod 4).
In both cases, n² ≡ 0 or 1 (mod 4). ∎

---

### 5. Proof by Counterexample

To **disprove** ∀x P(x): Find one x where P(x) is false.

**Example:** Disprove: "All primes are odd."
Counterexample: 2 is prime and even. ∎

---

### 6. Existence Proofs

- **Constructive:** Exhibit an explicit example.
- **Non-constructive:** Prove existence without finding it (e.g., using Intermediate Value Theorem, Pigeonhole Principle).

---

## Section 7 — Mathematical Induction

### Weak Induction (Standard)

To prove **∀n ≥ n₀, P(n)**:

1. **Base Case:** Prove P(n₀) is true.
2. **Inductive Step:** Assume P(k) is true for some arbitrary k ≥ n₀ (inductive hypothesis). Prove P(k+1) is true.

Then P(n) is true for all n ≥ n₀.

**Example:** Prove 1 + 2 + ... + n = n(n+1)/2 for all n ≥ 1.
*Base (n=1):* 1 = 1(2)/2 = 1 ✓
*Inductive:* Assume 1+...+k = k(k+1)/2. Then 1+...+k+(k+1) = k(k+1)/2 + (k+1) = (k+1)(k/2 + 1) = (k+1)(k+2)/2. ✓

---

### Strong Induction

To prove **∀n ≥ n₀, P(n)**:

1. **Base Case(s):** Prove P(n₀), P(n₀+1), ... as needed.
2. **Inductive Step:** Assume P(j) is true for **all** j with n₀ ≤ j ≤ k. Prove P(k+1).

**Example:** Prove every integer n ≥ 2 is a product of primes.
*Base:* 2 is prime (product of one prime). ✓
*Inductive:* Assume true for all 2 ≤ j ≤ k. Consider k+1.
- If k+1 is prime, done.
- If k+1 = ab with 2 ≤ a,b ≤ k, then by hypothesis a and b are products of primes, so k+1 is too. ✓

---

### Induction Variants

- **Structural induction:** On recursively defined structures (trees, formulas, strings)
- **Transfinite induction:** On well-ordered sets (ordinals)
- **Backwards induction:** Prove P(n) for all n ≤ N by going downwards

---

## Section 8 — Worked Exam Problems

### Problem 1: Logical Non-Equivalence (CSC 203 CA Test Q5)

> *Show that (p → q) → r and p → (q → r) are not equivalent.*

**Solution via Truth Table:**

| p | q | r | p→q | (p→q)→r | q→r | p→(q→r) |
|---|---|---|-----|---------|-----|---------|
| T | T | T | T   | T       | T   | T       |
| T | T | F | T   | **F**   | F   | **F**   |
| T | F | T | F   | T       | T   | T       |
| T | F | F | F   | T       | T   | T       |
| F | T | T | T   | T       | T   | T       |
| F | T | F | T   | **F**   | F   | **T** ← DIFFER |
| F | F | T | T   | T       | T   | T       |
| F | F | F | T   | **F**   | T   | **T** ← DIFFER |

Rows 6 and 8 differ → **Not equivalent**.

**Intuition:** (p → q) → r says "if (p implies q) then r". p → (q → r) says "if p then (q implies r)". These group differently.

---

### Problem 2: Combinatorial Identity Proof (CSC 203 CA Test Q4)

> *Prove that (n - r) · C(n, r) = (r + 1) · C(n, r + 1).*

**Algebraic Proof:**

RHS = (r+1) · C(n, r+1) = (r+1) · n! / ((r+1)!(n-r-1)!)
= (r+1) · n! / ((r+1)·r!·(n-r-1)!)
= n! / (r!·(n-r-1)!)
= (n-r) · n! / (r!·(n-r)·(n-r-1)!)
= (n-r) · n! / (r!·(n-r)!)
= (n-r) · C(n, r) = LHS. ∎

**Combinatorial Proof (Double Counting):**

Count the number of ways to choose a **committee of r people** from n, **then choose a chair** from the remaining n-r people.

- LHS: Choose committee first: C(n,r). Then choose chair from remaining: (n-r) ways. Total: (n-r)C(n,r).
- RHS: Choose chair+committee together: choose r+1 people (C(n,r+1)), then choose chair from them (r+1 ways). Total: (r+1)C(n,r+1).

Both count the same thing → equal. ∎

---

### Problem 3: Direct Proof

> *Prove: If a and b are odd integers, then a + b is even.*

**Proof:** Let a = 2k+1, b = 2m+1 for integers k,m. Then a+b = 2k+1+2m+1 = 2(k+m+1). Since k+m+1 is an integer, a+b is even. ∎

---

### Problem 4: Proof by Contradiction

> *Prove: There is no largest prime number.*

**Proof:** Assume there is a largest prime p. Consider N = (2 × 3 × 5 × ... × p) + 1. N > p. N is not divisible by any prime ≤ p (remainder 1). So N is either prime > p (contradiction) or has a prime factor > p (contradiction). ∎

---

### Problem 5: Mathematical Induction

> *Prove: 1 + 3 + 5 + ... + (2n-1) = n² for all n ≥ 1.*

**Base (n=1):** 1 = 1² ✓

**Inductive:** Assume 1+3+...+(2k-1) = k².
Then 1+3+...+(2k-1)+(2(k+1)-1) = k² + (2k+1) = k² + 2k + 1 = (k+1)². ∎

---

### Problem 6: Induction with Inequality

> *Prove: 2ⁿ > n² for all n ≥ 5.*

**Base (n=5):** 2⁵ = 32, 5² = 25. 32 > 25 ✓

**Inductive:** Assume 2ᵏ > k² for k ≥ 5.
2ᵏ⁺¹ = 2·2ᵏ > 2·k².
Need 2k² ≥ (k+1)² = k² + 2k + 1 for k ≥ 5.
2k² - (k² + 2k + 1) = k² - 2k - 1 = (k-1)² - 2.
For k ≥ 5: (k-1)² ≥ 16, so (k-1)² - 2 ≥ 14 > 0.
Thus 2ᵏ⁺¹ > (k+1)². ∎

---

### Problem 7: Strong Induction

> *Prove: Every integer n ≥ 2 can be written as a product of primes.*

**Base:** 2 = 2 (prime). ✓

**Inductive:** Assume true for all 2 ≤ j ≤ k. Consider k+1.
- If k+1 is prime, done.
- If k+1 = a·b with 2 ≤ a,b ≤ k, then by hypothesis a = p₁...pᵢ, b = q₁...qⱼ (products of primes). Then k+1 = p₁...pᵢ·q₁...qⱼ is a product of primes. ✓

---

### Problem 8: Quantifier Negation

> *Negate: "For every ε > 0, there exists δ > 0 such that for all x, if |x-a| < δ then |f(x)-L| < ε."*

**Solution:**
Original: ∀ε>0 ∃δ>0 ∀x (|x-a|<δ → |f(x)-L|<ε)

Negation: ∃ε>0 ∀δ>0 ∃x (|x-a|<δ ∧ |f(x)-L|≥ε)

**In English:** "There exists ε > 0 such that for every δ > 0, there is some x with |x-a| < δ but |f(x)-L| ≥ ε."

---

## Section 9 — Common Logical Fallacies

| Fallacy | Form | Why It's Wrong |
|---------|------|----------------|
| **Affirming the Consequent** | p→q, q ∴ p | q true doesn't mean p caused it |
| **Denying the Antecedent** | p→q, ¬p ∴ ¬q | p false doesn't mean q false |
| **Begging the Question** | Assume conclusion in premises | Circular reasoning |
| **False Dichotomy** | p ∨ q, ¬p ∴ q | May be other options |
| **Hasty Generalization** | Few examples → universal claim | Insufficient evidence |
| **Post Hoc** | A before B ∴ A caused B | Correlation ≠ causation |

---

## Section 10 — Conceptual Model

**Logic = The Rules of the Game**

- **Propositions** = game pieces (true/false)
- **Connectives** = moves that combine pieces
- **Truth tables** = rulebook showing all possible outcomes
- **Equivalence** = different move sequences that end in same position
- **Quantifiers** = "for all pieces" vs "there exists a piece"
- **Proof** = a legal sequence of moves from premises to conclusion
- **Direct** = walk forward
- **Contrapositive** = walk backward from flipped goal
- **Contradiction** = assume opposite, show game breaks
- **Induction** = dominoes: knock first, each knocks next

---

## Section 11 — Glossary Terms Used in This Topic

[[proposition]], [[connective]], [[truth-table]], [[tautology]], [[contradiction]], [[contingency]], [[logical-equivalence]], [[implication]], [[converse]], [[inverse]], [[contrapositive]], [[biconditional]], [[quantifier]], [[predicate]], [[universal-quantifier]], [[existential-quantifier]], [[direct-proof]], [[contrapositive-proof]], [[contradiction-proof]], [[induction]], [[strong-induction]], [[counterexample]], [[constructive-proof]], [[non-constructive-proof]], [[mathematical-induction]], [[base-case]], [[inductive-hypothesis]], [[inductive-step]], [[well-ordering-principle]], [[de-morgans-laws]], [[distributive-law]], [[absorption-law]], [[logical-fallacy]], [[affirming-consequent]], [[denying-antecedent]]
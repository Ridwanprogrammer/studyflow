# Functions (Discrete Mathematics)

## The Central Idea

A **function** is a special kind of relation — a "well-behaved" relation where every input has **exactly one** output. You've seen functions in calculus (f(x) = x²), but in discrete mathematics, we study functions as **abstract mappings between sets** — not just formulas, but any rule that assigns each element of a domain to a unique element of a codomain.

This topic covers:
- Formal definition of a function
- **Injective** (one-to-one), **Surjective** (onto), **Bijective** (both)
- **Composition** of functions
- **Inverse** functions
- **Pigeonhole Principle** revisited through functions
- Cardinality of infinite sets (countable vs uncountable)

---

## Why It Matters

- **Cryptography**: Bijections are permutations used in encryption
- **Hashing**: Functions from large domains to small codomains (collisions = non-injective)
- **Combinatorics**: Counting functions between finite sets
- **Database theory**: Keys = injective functions
- **Algorithm analysis**: Growth rates, big-O notation uses function properties

---

## How the Idea Develops

**Section 1 — Conceptual Introduction** → **Section 2 — Terminology** → **Section 3 — Formal Definition** → **Section 4 — Types of Functions** → **Section 5 — Composition** → **Section 6 — Inverse Functions** → **Section 7 — Cardinality & Counting Functions** → **Section 8 — Functions on Finite Sets** → **Section 9 — Worked Problems** → **Section 10 — Self-Check**

---

## Section 1 — Conceptual Introduction

### What is a Function? (Revisited)

Think of a function as a **machine** or a **vending machine**:

```
INPUT → [ FUNCTION ] → OUTPUT
   x       f(x) = y        y
```

- You put in an input `x` (from the **domain**)
- The machine processes it according to a fixed rule
- Out comes **exactly one** output `y` (in the **codomain**)

**Key constraint:** Same input → always same output. No randomness, no multiple outputs.

### Function vs. General Relation

| Relation | Function |
|----------|----------|
| {(1,2), (1,3), (2,4)} | ✗ Not a function (1 maps to 2 AND 3) |
| {(1,2), (2,3), (3,4)} | ✓ Function |
| {(1,2), (2,2), (3,2)} | ✓ Function (multiple inputs → same output OK) |

**Vertical Line Test:** A relation is a function iff no vertical line intersects its graph more than once.

---

## Section 2 — Required Terminology

| Term | Meaning |
|------|---------|
| [[function]] | A relation f ⊆ A × B where ∀a ∈ A, ∃! b ∈ B such that (a, b) ∈ f |
| [[domain]] | The set A of all inputs |
| [[codomain]] | The set B of all possible outputs |
| [[range]] | The set {f(a) | a ∈ A} of actual outputs (range ⊆ codomain) |
| [[injective]] | One-to-one: different inputs → different outputs |
| [[surjective]] | Onto: every codomain element is hit |
| [[bijective]] | Both injective and surjective (perfect pairing) |
| [[composition]] | (g ∘ f)(x) = g(f(x)) — apply f, then g |
| [[inverse-function]] | f⁻¹ such that f⁻¹(f(x)) = x and f(f⁻¹(y)) = y |
| [[identity-function]] | id_A(a) = a for all a ∈ A |
| [[preimage]] | f⁻¹({y}) = {x ∈ A | f(x) = y} — set of inputs mapping to y |
| [[restriction]] | f|_S: S → B where S ⊆ A |
| [[extension]] | Function on larger domain agreeing on original |
| [[pigeonhole-principle]] | If |A| > |B|, no function A → B can be injective |
| [[countable]] | Set with same cardinality as ℕ (or finite) |
| [[uncountable]] | Infinite set not countable (e.g., ℝ) |

---

## Section 3 — Formal Definition

### Function

Let A and B be sets. A **function** f from A to B, written f: A → B, is a subset f ⊆ A × B such that:

\\[ \\forall a \\in A, \\quad \\exists! b \\in B \\quad \\text{such that} \\quad (a, b) \\in f \\]

We write **f(a) = b** instead of (a, b) ∈ f.

### Image and Preimage

For S ⊆ A:
- **Image**: f(S) = {f(x) | x ∈ S} ⊆ B
- **Preimage**: f⁻¹(T) = {x ∈ A | f(x) ∈ T} for T ⊆ B

Note: f⁻¹ here is the **preimage operator** on subsets, not the inverse function (which may not exist).

---

## Section 4 — Types of Functions

### 1. Injective (One-to-One)

**Definition:** f: A → B is injective iff different inputs give different outputs.

\\[ \\forall x_1, x_2 \\in A, \\quad f(x_1) = f(x_2) \\implies x_1 = x_2 \\]

Equivalently: x₁ ≠ x₂ ⟹ f(x₁) ≠ f(x₂).

**Visual:** No horizontal line hits the graph more than once.

**Examples:**
- f: ℝ → ℝ, f(x) = 2x + 1 (injective)
- f: ℕ → ℕ, f(n) = n² (injective)
- f: ℝ → ℝ, f(x) = x² (NOT injective: f(2) = f(-2) = 4)
- f: {1,2,3} → {a,b,c,d}, f(1)=a, f(2)=b, f(3)=c (injective)

**Key Fact:** If f: A → B is injective, then |A| ≤ |B|.

---

### 2. Surjective (Onto)

**Definition:** f: A → B is surjective iff every element of B is hit.

\\[ \\forall y \\in B, \\quad \\exists x \\in A \\text{ such that } f(x) = y \\]

Equivalently: Range(f) = Codomain(B).

**Examples:**
- f: ℝ → ℝ, f(x) = x³ (surjective — every real has a real cube root)
- f: ℤ → ℤ, f(x) = 2x (NOT surjective — odd numbers missed)
- f: {1,2,3} → {a,b}, f(1)=a, f(2)=b, f(3)=a (surjective)

**Key Fact:** If f: A → B is surjective, then |A| ≥ |B|.

---

### 3. Bijective (One-to-One Correspondence)

**Definition:** f is bijective iff it is both injective and surjective.

\\[ f \\text{ is bijective } \\iff f \\text{ is injective } \\land f \\text{ is surjective } \\]

**Consequence:** There is a perfect pairing between A and B. |A| = |B|.

**Examples:**
- f: ℝ → ℝ, f(x) = 2x + 1 (bijective)
- f: {1,2,3} → {a,b,c}, any permutation (bijective)
- f: ℕ → ℤ, f(n) = n/2 if n even, -(n+1)/2 if n odd (bijective — ℕ and ℤ have same cardinality!)

---

### 4. Summary Table

| Property | Condition | |A| vs |B| |
|----------|-----------|-----------|
| Injective | f(x₁)=f(x₂) ⇒ x₁=x₂ | |A| ≤ |B| |
| Surjective | ∀y∈B, ∃x∈A: f(x)=y | |A| ≥ |B| |
| Bijective | Both injective & surjective | |A| = |B| |

---

## Section 5 — Composition of Functions

### Definition

Let f: A → B and g: B → C. The **composition** g ∘ f: A → C is:

\\[ (g \\circ f)(x) = g(f(x)) \\]

**Order matters:** g ∘ f means "apply f first, then g" — read right to left.

### Properties

1. **Associative:** h ∘ (g ∘ f) = (h ∘ g) ∘ f
2. **Identity:** f ∘ id_A = f = id_B ∘ f
3. **Injectivity:** If f and g are injective, then g ∘ f is injective
4. **Surjectivity:** If f and g are surjective, then g ∘ f is surjective
5. **Bijectivity:** If f and g are bijective, then g ∘ f is bijective

**Crucial:** If g ∘ f is injective, then f is injective (but g may not be).
If g ∘ f is surjective, then g is surjective (but f may not be).

---

## Section 6 — Inverse Functions

### Definition

f: A → B has an **inverse** f⁻¹: B → A iff:

\\[ f^{-1}(f(x)) = x \\quad \\forall x \\in A \\quad \\text{and} \\quad f(f^{-1}(y)) = y \\quad \\forall y \\in B \\]

### Theorem

A function has an inverse **iff it is bijective**.

**Proof:**
- (⇒) If f⁻¹ exists, f must be injective (f(x₁)=f(x₂) ⇒ x₁ = f⁻¹(f(x₁)) = f⁻¹(f(x₂)) = x₂) and surjective (∀y, x = f⁻¹(y) gives f(x)=y).
- (⇐) If f is bijective, define f⁻¹(y) = the unique x with f(x)=y. This is well-defined by bijectivity.

### Finding Inverse

For a bijective function given by formula y = f(x):
1. Swap x and y: x = f(y)
2. Solve for y
3. Result is f⁻¹(x)

**Example:** f: ℝ → ℝ, f(x) = 2x + 1
1. y = 2x + 1
2. x = 2y + 1 ⇒ 2y = x - 1 ⇒ y = (x - 1)/2
3. f⁻¹(x) = (x - 1)/2

---

## Section 7 — Cardinality & Counting Functions

### Functions Between Finite Sets

Let |A| = m, |B| = n.

| Type | Count |
|------|-------|
| All functions A → B | nᵐ |
| Injective functions A → B | P(n, m) = n!/(n-m)! (if m ≤ n, else 0) |
| Surjective functions A → B | n! × S(m, n) where S = Stirling numbers of 2nd kind |
| Bijective functions A → B | n! (if m = n, else 0) |

**Example:** A = {1,2}, B = {a,b,c}
- Total: 3² = 9 functions
- Injective: P(3,2) = 6
- Surjective: 0 (|A| < |B|)
- Bijective: 0

---

### Infinite Cardinalities

**Definition:** Sets A and B have the **same cardinality** (|A| = |B|) iff there exists a bijection f: A → B.

**Countable Sets** (|A| = |ℕ| = ℵ₀):
- ℕ, ℤ, ℚ — all countable
- Any subset of a countable set is countable
- Countable union of countable sets is countable

**Uncountable Sets:**
- ℝ is uncountable (Cantor's diagonal argument)
- ℘(ℕ) is uncountable
- (0,1) has same cardinality as ℝ

**Cantor's Theorem:** For any set A, |A| < |℘(A)|. There is no largest cardinality.

---

## Section 8 — Functions on Finite Sets (Practical)

### Representing Functions

For finite sets, a function f: A → B can be represented as:
- **Table:** Input | Output
- **Mapping diagram:** Arrows from A to B
- **Array:** If A = {1,2,...,m}, store [f(1), f(2), ..., f(m)]
- **Graph:** Subset of A × B

### Checking Properties Algorithmically

Given f: A → B as array of size m:

```python
def is_injective(f):
    return len(set(f)) == len(f)

def is_surjective(f, B):
    return set(f) == set(B)

def is_bijective(f, B):
    return is_injective(f) and is_surjective(f, B)
```

---

## Section 9 — Worked Exam Problems

### Problem 1: Injective/Surjective/Bijective Classification

> *Determine whether each function is injective, surjective, bijective, or none.*
> 1. f: ℝ → ℝ, f(x) = x³ - x
> 2. f: ℤ → ℤ, f(n) = n²
> 3. f: ℕ → ℕ, f(n) = n + 1
> 4. f: ℝ → (0, ∞), f(x) = eˣ

**Solution:**

1. **f(x) = x³ - x = x(x-1)(x+1)**
   - f(0) = f(1) = f(-1) = 0 → NOT injective
   - As x → ±∞, f(x) → ±∞; continuous → hits all values → Surjective
   - **Surjective only**

2. **f(n) = n² on ℤ**
   - f(2) = f(-2) = 4 → NOT injective
   - Negative integers never hit → NOT surjective
   - **Neither**

3. **f(n) = n + 1 on ℕ**
   - f(a) = f(b) ⇒ a+1 = b+1 ⇒ a = b → Injective ✓
   - 0 ∈ ℕ (assuming 0 ∈ ℕ) or 1 ∈ ℕ — but f(n) ≥ 1 (or 2), so 0 (or 1) not hit → NOT surjective
   - **Injective only**

4. **f(x) = eˣ, ℝ → (0, ∞)**
   - Strictly increasing → Injective ✓
   - Range = (0, ∞) = Codomain → Surjective ✓
   - **Bijective**

---

### Problem 2: Inverse Function

> *Find the inverse of f: ℝ \ {2} → ℝ \ {1}, f(x) = (x+1)/(x-2).*

**Solution:**

Check bijective first (given domain/codomain suggest it is).

y = (x+1)/(x-2)
x = (y+1)/(y-2)
x(y-2) = y+1
xy - 2x = y + 1
xy - y = 2x + 1
y(x - 1) = 2x + 1
y = (2x + 1)/(x - 1)

f⁻¹(x) = (2x + 1)/(x - 1), domain ℝ \ {1}, codomain ℝ \ {2}

---

### Problem 3: Composition

> *Let f: ℝ → ℝ, f(x) = 2x + 1 and g: ℝ → ℝ, g(x) = x². Find (g ∘ f)(x) and (f ∘ g)(x). Are they equal?*

**Solution:**

(g ∘ f)(x) = g(f(x)) = g(2x + 1) = (2x + 1)² = 4x² + 4x + 1

(f ∘ g)(x) = f(g(x)) = f(x²) = 2x² + 1

**Not equal** (unless 4x² + 4x + 1 = 2x² + 1 ⇒ 2x² + 4x = 0 ⇒ x=0 or x=-2).

**Composition is not commutative.**

---

### Problem 4: Counting Functions

> *How many functions f: {1,2,3,4} → {a,b,c} are surjective?*

**Solution:**

Use Inclusion-Exclusion or Stirling numbers.

Total functions: 3⁴ = 81

Subtract those missing at least one element:
- Missing a: 2⁴ = 16
- Missing b: 16
- Missing c: 16
- Add back missing a&b: 1⁴ = 1
- Add back missing a&c: 1
- Add back missing b&c: 1
- Subtract missing all three: 0

Surjective = 81 - 3×16 + 3×1 = 81 - 48 + 3 = **36**

**Alternative:** Stirling number S(4,3) = 6. Surjective = 3! × 6 = 6 × 6 = 36. ✓

---

### Problem 5: Pigeonhole via Functions

> *Prove: If 11 integers are chosen from {1, 2, ..., 20}, at least two differ by exactly 1.*

**Solution:**

Partition {1, ..., 20} into 10 pairs: {1,2}, {3,4}, {5,6}, ..., {19,20}.

Define function f: chosen numbers → {1,2,...,10} where f(x) = the pair containing x.

11 numbers (pigeons) → 10 pairs (holes). By Pigeonhole Principle, two numbers map to same pair.

Those two numbers are consecutive → differ by 1.

---

### Problem 6: Bijection Proves Equal Cardinality

> *Prove that the set of even integers 2ℤ = {..., -4, -2, 0, 2, 4, ...} has the same cardinality as ℤ.*

**Solution:**

Define f: ℤ → 2ℤ by f(n) = 2n.

- Injective: 2a = 2b ⇒ a = b ✓
- Surjective: For any even integer 2k ∈ 2ℤ, f(k) = 2k ✓

f is bijective → |ℤ| = |2ℤ|.

**Note:** A proper subset can have the same cardinality as the whole set (infinite sets behave differently from finite ones!).

---

## Section 10 — Common Pitfalls

| Pitfall | Correction |
|---------|------------|
| Confusing codomain with range | Codomain = declared target set; Range = actual outputs. f: ℝ → ℝ, f(x)=x² has codomain ℝ, range [0,∞). |
| Assuming injective ⇒ surjective (or vice versa) | Only true for finite sets of same size. For infinite sets, neither implies the other. |
| Thinking f⁻¹(y) is a number | f⁻¹({y}) is a SET (preimage). f⁻¹(y) as a number only exists if f is bijective. |
| Composition order: (f ∘ g)(x) = f(g(x)) | Rightmost function applied FIRST. |
| Inverse of g ∘ f is f⁻¹ ∘ g⁻¹ (reversed!) | (g ∘ f)⁻¹ = f⁻¹ ∘ g⁻¹. "Shoes and socks" — remove in reverse order. |

---

## Section 11 — Conceptual Model

**Functions as Matchings**

- **Injective** = Each input gets a unique parking spot. No sharing.
- **Surjective** = Every parking spot is taken. No empty spots.
- **Bijective** = Perfect matching — every input has a spot, every spot has an input.
- **Composition** = Relay race: f runs first, passes baton to g.
- **Inverse** = Running the race backwards — only possible if everyone had a unique lane (bijective).
- **Pigeonhole** = More runners than lanes → collision inevitable.

---

## Section 12 — Glossary Terms Used in This Topic

[[function]], [[domain]], [[codomain]], [[range]], [[injective]], [[surjective]], [[bijective]], [[composition]], [[inverse-function]], [[identity-function]], [[preimage]], [[restriction]], [[extension]], [[pigeonhole-principle]], [[countable]], [[uncountable]], [[cardinality]], [[stirling-numbers]], [[cantor-theorem]], [[cantor-diagonal-argument]], [[aleph-null]], [[bijection]], [[one-to-one]], [[onto]], [[perfect-matching]], [[horizontal-line-test]], [[vertical-line-test]]
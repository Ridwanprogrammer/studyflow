# MTH 201 Topic 1: Real-valued Functions of a Real Variable — Enhanced

## The Central Idea

Before jumping into formal definitions, let us ask a simple question: **What is a function?**

In plain terms, a function is a predictable machine or rule that takes an input, processes it according to a fixed formula, and returns a single, unambiguous output.

---

## Why It Matters — Past Exam Coverage

| Past Exam Question | This Topic Covers |
|--------------------|-------------------|
| "Define: Real valued function, Differentiation" | Definition of real-valued function |
| "If f(x) = 2^x, show that f(x+3) - f(x-1) = (15/2) f(x)" | Exponential function properties |

---

## Section 1 — Conceptual Introduction

### What is a Function?

Think of a function as a **machine**:
```
INPUT → [ FUNCTION ] → OUTPUT
   x       f(x) = 2x+1      y
```

**Key Properties:**
1. **Single-valued** — each input gives exactly one output
2. **Deterministic** — same input always gives same output
3. **Defined by a rule** — formula, table, graph, or description

### Real-Valued Function
A **real-valued function** f: ℝ → ℝ maps real numbers to real numbers.
- Domain ⊆ ℝ (inputs are real)
- Range ⊆ ℝ (outputs are real)

---

## Section 2 — Required Terminology

| Term | Meaning |
|------|---------|
| **Function** | Rule assigning each input exactly one output |
| **Domain** | Set of all allowed inputs |
| **Range** | Set of all actual outputs |
| **Independent variable** | Input (usually x) |
| **Dependent variable** | Output (usually y or f(x)) |
| **Real-valued** | Outputs are real numbers |
| **Differentiation** | Process of finding the derivative (rate of change) |

---

## Section 3 — Intuitive Explanation

### Mental Model: The Vending Machine

```
Select item (input) → Machine processes → Item dispensed (output)
```

- Same selection → same item (deterministic)
- Invalid selection → no item (outside domain)
- Each selection gives exactly one item (single-valued)

### Function Notation

| Notation | Meaning |
|----------|---------|
| f: A → B | Function f from set A to set B |
| y = f(x) | y is the output for input x |
| f(x) = 2x + 1 | Rule: multiply by 2, add 1 |
| f(3) = 7 | Input 3 gives output 7 |

---

## Section 4 — Formal Definition

A **function** f from a set A to a set B is a relation such that:

\\[ \\forall x \\in A, \\quad \\exists! y \\in B \\text{ such that } (x, y) \\in f \\]

- ∀ = "for all"
- ∃! = "there exists exactly one"
- A = domain, B = codomain
- Range = {f(x) | x ∈ A} ⊆ B

---

## Section 5 — Worked Exam Problems

### Problem 1: Definition of Real-Valued Function
> **Define: Real valued function**

**Answer:**
A **real-valued function** f is a function whose outputs are real numbers. Formally, f: D → ℝ where D ⊆ ℝ (or D ⊆ ℝⁿ). For each x ∈ D, f(x) ∈ ℝ.

**Example:** f(x) = x² + 3x - 5 maps real numbers to real numbers.

---

### Problem 2: Exponential Function Identity
> **If f(x) = 2ˣ, show that f(x+3) - f(x-1) = (15/2) f(x)**

**Solution:**

**LHS:** f(x+3) - f(x-1)
= 2ˣ⁺³ - 2ˣ⁻¹
= 2ˣ · 2³ - 2ˣ · 2⁻¹
= 2ˣ · 8 - 2ˣ · ½
= 2ˣ (8 - ½)
= 2ˣ (16/2 - 1/2)
= 2ˣ (15/2)
= (15/2) · 2ˣ
= (15/2) f(x)

**RHS:** (15/2) f(x) = (15/2) · 2ˣ

**LHS = RHS** ✓

---

### Problem 3: Domain and Range

**Example 1:** f(x) = 3x + 1
- Domain: ℝ (all real numbers)
- Range: ℝ

**Example 2:** f(x) = x² - 4x + 3
- Domain: ℝ
- Range: [-1, ∞) (minimum at vertex x=2, f(2)=-1)

**Example 3:** f(x) = √(x-2)
- Domain: [2, ∞) (radicand ≥ 0)
- Range: [0, ∞)

**Example 4:** f(x) = 1/(x-3)
- Domain: ℝ \ {3} (denominator ≠ 0)
- Range: ℝ \ {0}

---

### Problem 4: Function Operations

**Given f(x) = x², g(x) = x + 1**

| Operation | Formula | Example |
|-----------|---------|---------|
| (f+g)(x) | f(x)+g(x) | x²+x+1 |
| (f-g)(x) | f(x)-g(x) | x²-x-1 |
| (fg)(x) | f(x)g(x) | x³+x² |
| (f/g)(x) | f(x)/g(x) | x²/(x+1), x≠-1 |
| (f∘g)(x) | f(g(x)) | (x+1)² |

---

## Section 6 — Types of Functions

| Type | Form | Example |
|------|------|---------|
| **Linear** | f(x) = ax + b | f(x) = 3x + 1 |
| **Quadratic** | f(x) = ax² + bx + c | f(x) = x² - 4x + 3 |
| **Polynomial** | aₙxⁿ + ... + a₁x + a₀ | f(x) = 2x³ - 5x + 1 |
| **Rational** | P(x)/Q(x) | f(x) = (x²+1)/(x-2) |
| **Exponential** | f(x) = aˣ | f(x) = 2ˣ |
| **Logarithmic** | f(x) = logₐ(x) | f(x) = ln(x) |
| **Trigonometric** | sin, cos, tan | f(x) = sin(x) |

---

## Section 7 — Self-Check Problems

1. If f(x) = 3ˣ, find f(x+2)/f(x).
2. Find domain of f(x) = √(4-x²).
3. If f(x) = x³, show f(2x) = 8f(x).
4. Find f(g(x)) where f(x)=2x+1, g(x)=x².
5. Is f(x) = ±√x a function? Why/why not?

---

## Solutions

1. f(x+2)/f(x) = 3ˣ⁺²/3ˣ = 3² = 9
2. 4-x² ≥ 0 → x² ≤ 4 → [-2, 2]
3. f(2x) = (2x)³ = 8x³ = 8f(x) ✓
4. f(g(x)) = 2(x²) + 1 = 2x² + 1
5. No — single input x gives two outputs (√x and -√x). Violates single-valued property.

---

## Glossary Terms

[[function]], [[domain]], [[range]], [[real-valued-function]], [[independent-variable]], [[dependent-variable]], [[function-notation]], [[composition]], [[linear-function]], [[quadratic-function]], [[polynomial-function]], [[rational-function]], [[exponential-function]], [[logarithmic-function]], [[trigonometric-function]], [[domain]], [[codomain]], [[image]], [[preimage]], [[injective]], [[surjective]], [[bijective]], [[inverse-function]], [[differentiation]], [[derivative]], [[limit]], [[continuity]]
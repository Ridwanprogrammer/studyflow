# CSC 215 Topic 2: Boolean Algebra & Logic Gates — Enhanced

## The Central Idea

**Boolean algebra** is the mathematics of logic circuits. Variables are 0/1 (FALSE/TRUE). Operations are AND, OR, NOT. Every digital circuit can be described by a Boolean expression, simplified algebraically or with K-maps, then implemented with gates.

This topic covers the **exact problem types from past exams**: logic gate diagrams, truth tables, De Morgan's theorems, Boolean simplification.

---

## Why It Matters — Past Exam Coverage

| Past Exam Question | This Topic Covers |
|--------------------|-------------------|
| Draw logic gate diagram for X = A·C + B·C + A·B·C | Expression → Gate diagram |
| Verify De Morgan's Second Theorem with truth table | Truth table verification |
| Draw logic gate for F = A·B + A·C + B·C | Expression → Gate diagram |
| Draw logic gate for X = A·C + B·C + A·B·C | Expression → Gate diagram |
| Draw logic gate for Z = A'·B·C·(A + D) | Expression → Gate diagram |
| Simplify X·Y·Z + X·Y·Z' + ... | Boolean algebra simplification |
| Simplify (X+Y)·(X+Y') | Boolean algebra simplification |
| Simplify [(W'·X' + Y·Z)' + Z] {W + Y·Z'} | Complex simplification |
| Verify De Morgan's First & Second Theorems | Truth table verification |
| Given A=1010, B=1100, prove A'·B' = (A+B)' | De Morgan with specific values |
| Draw logic gate for F = (A·B)·(C·D) | Expression → Gate diagram |

---

## Section 1 — Boolean Algebra Basics

### Variables & Constants
- **Variables:** A, B, C, X, Y, Z — take values 0 or 1
- **Constants:** 0 (FALSE), 1 (TRUE)

### Basic Operations

| Operation | Symbol | Truth Table | Gate |
|-----------|--------|-------------|------|
| AND | · or ∧ | 1 only if ALL inputs 1 | □ (D-shape) |
| OR | + or ∨ | 1 if ANY input 1 | □ (curved) |
| NOT | ' or ¬ or overbar | 0→1, 1→0 | △ with circle |

### Derived Operations

| Operation | Symbol | Expression | Truth Table |
|-----------|--------|------------|-------------|
| NAND | ↑ or ⊼ | (A·B)' | NOT AND |
| NOR | ↓ or ⊽ | (A+B)' | NOT OR |
| XOR | ⊕ | A·B' + A'·B | 1 if inputs DIFFER |
| XNOR | ⊙ | (A⊕B)' | 1 if inputs SAME |

---

## Section 2 — Boolean Identities (Laws)

### Fundamental Laws

| Law | AND Form | OR Form |
|-----|----------|---------|
| **Identity** | A·1 = A | A+0 = A |
| **Null/Annulment** | A·0 = 0 | A+1 = 1 |
| **Idempotent** | A·A = A | A+A = A |
| **Complement** | A·A' = 0 | A+A' = 1 |
| **Involution** | (A')' = A | — |
| **Commutative** | A·B = B·A | A+B = B+A |
| **Associative** | (A·B)·C = A·(B·C) | (A+B)+C = A+(B+C) |
| **Distributive** | A·(B+C) = A·B + A·C | A+B·C = (A+B)·(A+C) |
| **Absorption** | A + A·B = A | A·(A+B) = A |
| **De Morgan** | (A·B)' = A' + B' | (A+B)' = A'·B' |
| **Consensus** | A·B + A'·C + B·C = A·B + A'·C | (A+B)(A'+C)(B+C) = (A+B)(A'+C) |

---

## Section 3 — Expression → Logic Gate Diagram

### Rules for Drawing

1. **NOT** → Inverter (triangle + circle)
2. **AND** → AND gate (D-shaped)
3. **OR** → OR gate (curved)
4. **Parentheses** → Group operations
5. **Signal flow:** Left (inputs) → Right (output)

### Example 1: X = A·C + B·C + A·B·C

```
A ────┐
      ├──[AND]──┐
C ────┘         │
                ├──[OR]── X
B ────┐         │
      ├──[AND]──┘
C ────┘

A ────┐
      ├──[AND]──┐
B ────┤         │
      ├──[AND]──┤
C ────┘         │
                (3-input OR or cascade 2-input)
```

**Optimized:** X = C(A + B) + A·B·C = C(A + B + A·B) = C(A + B) [since A + A·B = A]
So X = A·C + B·C = C·(A + B)

```
A ──┐
    ├──[OR]──┐
B ──┘        ├──[AND]── X
C ───────────┘
```

**This uses 2 gates instead of 5!**

---

### Example 2: F = A·B + A·C + B·C

```
A ──┐       ┌──[AND]──┐
B ──┘       │         │
            │         │
A ──┐       │         ├──[OR]── F
C ──┘       │         │
            │         │
B ──┐       │         │
C ──┘       │         │
```

**Optimized:** No simpler form (this is majority function). Can factor: F = A(B+C) + BC

---

### Example 3: Z = A'·B·C·(A + D)

```
A ──[NOT]──┐
           ├──[AND]──┐
B ─────────┤         │
           ├──[AND]──┤
C ─────────┤         │
           │         ├──[AND]── Z
A ──┐      │         │
    ├──[OR]┘         │
D ──┘                │
```

**Note:** A'·A = 0, so A'·B·C·A = 0. The term simplifies:
Z = A'·B·C·(A + D) = A'·B·C·A + A'·B·C·D = 0 + A'·B·C·D = **A'·B·C·D**

**Simplified diagram:** 4-input AND with A inverted.

---

### Example 4: F = (A·B)·(C·D) = A·B·C·D

```
A ──┐
    ├──[AND]──┐
B ──┘         │
              ├──[AND]── F
C ──┐         │
    ├──[AND]──┘
D ──┘
```

Or single 4-input AND gate.

---

## Section 4 — Truth Tables & De Morgan Verification

### De Morgan's First Theorem: (A + B)' = A' · B'

| A | B | A+B | (A+B)' | A' | B' | A'·B' |
|---|---|-----|--------|----|----|-------|
| 0 | 0 | 0   | 1      | 1  | 1  | 1     |
| 0 | 1 | 1   | 0      | 1  | 0  | 0     |
| 1 | 0 | 1   | 0      | 0  | 1  | 0     |
| 1 | 1 | 1   | 0      | 0  | 0  | 0     |

**Columns (A+B)' and A'·B' match for all rows.** ✓ Verified.

---

### De Morgan's Second Theorem: (A · B)' = A' + B'

| A | B | A·B | (A·B)' | A' | B' | A'+B' |
|---|---|-----|--------|----|----|-------|
| 0 | 0 | 0   | 1      | 1  | 1  | 1     |
| 0 | 1 | 0   | 1      | 1  | 0  | 1     |
| 1 | 0 | 0   | 1      | 0  | 1  | 1     |
| 1 | 1 | 1   | 0      | 0  | 0  | 0     |

**Columns (A·B)' and A'+B' match for all rows.** ✓ Verified.

---

### Verification with 3 Variables (Past Exam)

**Second Theorem for 3 vars: (A·B·C)' = A' + B' + C'**

| A | B | C | A·B·C | (A·B·C)' | A' | B' | C' | A'+B'+C' |
|---|---|---|-------|----------|----|----|----|----------|
| 0 | 0 | 0 | 0     | 1        | 1  | 1  | 1  | 1        |
| 0 | 0 | 1 | 0     | 1        | 1  | 1  | 0  | 1        |
| 0 | 1 | 0 | 0     | 1        | 1  | 0  | 1  | 1        |
| 0 | 1 | 1 | 0     | 1        | 1  | 0  | 0  | 1        |
| 1 | 0 | 0 | 0     | 1        | 0  | 1  | 1  | 1        |
| 1 | 0 | 1 | 0     | 1        | 0  | 1  | 0  | 1        |
| 1 | 1 | 0 | 0     | 1        | 0  | 0  | 1  | 1        |
| 1 | 1 | 1 | 1     | 0        | 0  | 0  | 0  | 0        |

**Matches for all 8 rows.** ✓

---

### Problem: Given A=1010, B=1100, prove A'·B' = (A+B)'

**Step 1:** Compute A+B (bitwise OR)
```
A = 1 0 1 0
B = 1 1 0 0
A+B = 1 1 1 0
```

**Step 2:** (A+B)' = invert = **0 0 0 1**

**Step 3:** A' = invert A = 0 1 0 1
        B' = invert B = 0 0 1 1

**Step 4:** A'·B' (bitwise AND)
```
A' = 0 1 0 1
B' = 0 0 1 1
A'·B' = 0 0 0 1
```

**Step 5:** Compare: (A+B)' = 0001, A'·B' = 0001. **Equal!** ✓

---

## Section 5 — Boolean Simplification (Past Exam Problems)

### Problem 1: Simplify X·Y·Z + X·Y·Z' + X·Y·Z + X'·Y·Z + X·Y·X·Y·Z

**Step 1: Remove duplicates** (X·Y·Z appears twice)
= X·Y·Z + X·Y·Z' + X'·Y·Z + X·Y·X·Y·Z

**Step 2: Simplify X·Y·X·Y·Z = X·Y·Z** (idempotent: X·X = X)
= X·Y·Z + X·Y·Z' + X'·Y·Z + X·Y·Z
= X·Y·Z + X·Y·Z' + X'·Y·Z  (combine duplicates)

**Step 3: Factor X·Y from first two terms**
= X·Y·(Z + Z') + X'·Y·Z
= X·Y·1 + X'·Y·Z  (complement: Z+Z'=1)
= X·Y + X'·Y·Z

**Step 4: Factor Y**
= Y·(X + X'·Z)

**Step 5: Apply absorption: X + X'·Z = X + Z**
= **Y·(X + Z) = X·Y + Y·Z**

**Final Answer: X·Y + Y·Z**

---

### Problem 2: Simplify (X + Y)·(X + Y')

**Method 1: Distributive**
= X·X + X·Y' + Y·X + Y·Y'
= X + X·Y' + X·Y + 0  (idempotent, complement)
= X + X·(Y' + Y)
= X + X·1
= X + X
= **X**

**Method 2: Recognize pattern (X+Y)(X+Y') = X + Y·Y' = X + 0 = X**

**Answer: X**

---

### Problem 3: Simplify [(W'·X' + Y·Z)' + Z] · [W + Y·Z']

**This is complex — work step by step.**

Let P = W'·X' + Y·Z
Expression = [P' + Z] · [W + Y·Z']

**Step 1: Expand P' using De Morgan**
P = W'·X' + Y·Z
P' = (W'·X')' · (Y·Z)'  (De Morgan on sum)
   = (W + X) · (Y' + Z')  (De Morgan on products)

**Step 2: First bracket**
P' + Z = (W + X)(Y' + Z') + Z

**Step 3: Distribute (W+X)(Y'+Z')**
= W·Y' + W·Z' + X·Y' + X·Z' + Z

**Step 4: Second bracket: W + Y·Z'**

**Step 5: Multiply the two brackets**
= (W·Y' + W·Z' + X·Y' + X·Z' + Z) · (W + Y·Z')

This is very messy. Let's try a different approach — use K-map or check for consensus.

**Alternative: Use consensus theorem and absorption.**

Actually, let's use the property: (A + B)(A + B') = A
Notice the second bracket is W + Y·Z'. 

Let's try to see if the whole thing simplifies to something simple.

Let me compute using a systematic approach. Since this is an exam problem, there's likely a clean simplification.

Let F = [(W'·X' + Y·Z)' + Z] · [W + Y·Z']

Consider the term W'·X' + Y·Z.
If W=0 and X=0, then W'·X' = 1, so P = 1, P' = 0, first bracket = Z.
If Y=1 and Z=1, then Y·Z = 1, so P = 1, P' = 0, first bracket = Z.
Otherwise P = 0, P' = 1, first bracket = 1.

So first bracket = Z when (W=0,X=0) or (Y=1,Z=1), else 1.
= Z + (W'·X')'·(Y·Z')'  (De Morgan on when P=0)
Actually: first bracket = P' + Z = (W'·X' + Y·Z)' + Z

By the identity: A' + B = (A·B')' + B... not helpful.

Use: X + X'Y = X + Y
Here: P' + Z. If we let X = Z, Y = P', then Z + P' = Z + P'? No.

Wait: (P' + Z) = (P·Z')' by De Morgan. Not obviously simpler.

Let's try specific values. The expression must simplify.

Actually, notice: [(W'·X' + Y·Z)' + Z] = 1 when Z=1.
When Z=0: (W'·X' + 0)' + 0 = (W'·X')' = W + X.

So first bracket = Z + (W + X)·Z' = Z + W·Z' + X·Z' = Z + W + X (by absorption: Z + W·Z' = Z + W)

**Yes!** Z + W·Z' = Z + W. Similarly Z + X·Z' = Z + X.
So Z + W·Z' + X·Z' = Z + W + X.

**First bracket simplifies to: W + X + Z**

Now full expression: (W + X + Z) · (W + Y·Z')

Distribute:
= W·(W + Y·Z') + X·(W + Y·Z') + Z·(W + Y·Z')
= W + W·X + X·Y·Z' + W·Z + Y·Z·Z'
= W + W·X + X·Y·Z' + W·Z + 0
= W·(1 + X + Z) + X·Y·Z'
= W·1 + X·Y·Z'
= **W + X·Y·Z'**

**Final Answer: W + X·Y·Z'**

---

## Section 6 — Canonical Forms (Min/Max Terms)

### Minterms (Standard Product/Sum-of-Products)

For n variables, there are 2ⁿ minterms. Each minterm is a product term where each variable appears exactly once (true or complemented).

**Example: 3 variables**
| Index | Minterm | Notation |
|-------|---------|----------|
| 0 | A'·B'·C' | m₀ |
| 1 | A'·B'·C | m₁ |
| 2 | A'·B·C' | m₂ |
| 3 | A'·B·C | m₃ |
| 4 | A·B'·C' | m₄ |
| 5 | A·B'·C | m₅ |
| 6 | A·B·C' | m₆ |
| 7 | A·B·C | m₇ |

Function as sum of minterms: F = Σm(indices where F=1)

---

### Maxterms (Standard Sum/Product-of-Sums)

Each maxterm is a sum term with all variables.

| Index | Maxterm | Notation |
|-------|---------|----------|
| 0 | A+B+C | M₀ |
| 1 | A+B+C' | M₁ |
| 2 | A+B'+C | M₂ |
| 3 | A+B'+C' | M₃ |
| 4 | A'+B+C | M₄ |
| 5 | A'+B+C' | M₅ |
| 6 | A'+B'+C | M₆ |
| 7 | A'+B'+C' | M₇ |

Function as product of maxterms: F = ΠM(indices where F=0)

---

### Conversion Between Forms

- mᵢ complement = Mᵢ
- Σm(list) = ΠM(missing indices)
- Example: F = Σm(1,3,5,6) = ΠM(0,2,4,7)

---

## Section 7 — K-Map Method (Visual Simplification)

### 2-Variable K-Map
```
      B
     0  1
A 0 | m0 m1
  1 | m2 m3
```

### 3-Variable K-Map
```
      BC
     00 01 11 10
A 0 | m0 m1 m3 m2
  1 | m4 m5 m7 m6
```
**Order:** 00, 01, 11, 10 (Gray code — only 1 bit changes)

### 4-Variable K-Map
```
       CD
      00 01 11 10
AB 00 | m0 m1 m3 m2
   01 | m4 m5 m7 m6
   11 | m12 m13 m15 m14
   10 | m8 m9 m11 m10
```

### Grouping Rules
1. Groups must be rectangular, size = power of 2 (1, 2, 4, 8, 16...)
2. Groups can wrap around edges (top-bottom, left-right)
3. Make groups as LARGE as possible
4. Cover all 1s (for SOP) or all 0s (for POS)
5. Overlapping groups allowed
6. Don't-care (X) can be 0 or 1 to help grouping

### Example: F(A,B,C) = Σm(1,3,5,6)

```
      BC
     00 01 11 10
A 0 | 0  1  1  0
  1 | 0  1  0  1
```

Groups:
- Pair (m1,m3): A=0, C=1 → A'·C
- Pair (m5,m7? no m7=0): m5 alone? Wait m5=1, m7=0. m3=1, m1=1.
- Pair (m5,m1)? Not adjacent (A differs).
- m5=1 at 101, m3=1 at 011 — not adjacent.
- m6=1 at 110.

Groups:
- (m1,m3): A'C (vertical pair in col 01,11)
- (m5): A·B'·C (single)
- (m6): A·B·C' (single)

F = A'·C + A·B'·C + A·B·C' = A'C + AC'(B+B')? No.

Wait: m5 = A·B'·C (101), m6 = A·B·C' (110)
These don't combine.

F = A'·C + A·B'·C + A·B·C'
= C(A' + A·B') + A·B·C'
= C(A' + B') + A·B·C'  (since A' + A·B' = A' + B')
= A'C + B'C + A·B·C'

**Check if further simplification possible:**
A'C + B'C + ABC' = C(A' + B') + ABC'
= C(A' + B' + AB) [since C + ABC' = C + AB? No.]

Actually: C(A' + B') + ABC' = A'C + B'C + ABC'
Try K-map again for 3-var:
```
   BC
  00 01 11 10
0  0  1  1  0
1  0  1  0  1
```
Groups of 1: m1,m3 pair → A'C. m5 single → AB'C. m6 single → ABC'.
No larger groups possible.

**SOP: F = A'C + AB'C + ABC'**

Can we do POS (group 0s)?
0s at m0,m2,m4,m7.
- Pair (m0,m2): A'B' (BC: 00,10) → A' + B? Wait POS groups 0s.
Group 0s: (m0,m2) → A' + B? No.

For POS: group 0s, write sum terms.
(m0,m2): A=0, B varies, C varies? m0=000, m2=010. A=0, C=0. B changes. → A + C
(m0,m4): A varies, B=0, C=0 → B + C
(m7): A+B+C

Product: (A+C)(B+C)(A+B+C) = (A+C)(B+C) [since (A+C)(B+C)(A+B+C) = (A+C)(B+C)]

Check: (A+C)(B+C) = AB + AC + BC + C = AB + C(A+B+1) = AB + C
But our F = A'C + AB'C + ABC'. Are they equal?

Test A=1,B=1,C=0: F = 0 + 0 + 1 = 1. AB+C = 1+0 = 1 ✓
A=0,B=0,C=1: F = 1 + 0 + 0 = 1. AB+C = 0+1 = 1 ✓
A=1,B=0,C=1: F = 0 + 1 + 0 = 1. AB+C = 0+1 = 1 ✓

So **F = AB + C** is the minimal form!

Let's verify with K-map 0s grouping:
0s at m0,m2,m4,m7.
- Group (m0,m2,m4,m6?) m6=1 not 0.
- (m0,m2): A=0,C=0 → A+C
- (m0,m4): B=0,C=0 → B+C
- (m7): A+B+C

Wait, m0=000, m2=010, m4=100, m7=111.
Can we group m0,m2,m4? They don't form rectangle.
But (m0,m2) gives A+C, (m0,m4) gives B+C.
Product: (A+C)(B+C) = C + AB.

Yes! **Minimal POS: F = (A+C)(B+C) = AB + C**

This is much simpler than SOP!

---

## Section 8 — Past Exam Worked Problems

### Problem 1: Draw Logic Gate for X = A·C + B·C + A·B·C

**Simplified:** X = C(A + B) (as shown earlier)
**Gates:** 1 OR + 1 AND = 2 gates

### Problem 2: Draw Logic Gate for F = A·B + A·C + B·C
**Gates:** 3 AND + 1 OR (3-input) or cascade 2-input

### Problem 3: Draw Logic Gate for Z = A'·B·C·(A + D)
**Simplified:** Z = A'·B·C·D (since A'·A = 0)
**Gates:** 1 NOT + 1 AND (4-input) = 2 gates

### Problem 4: Draw Logic Gate for F = (A·B)·(C·D)
**Gates:** 1 AND (4-input) or 3 AND (2-input cascade)

### Problem 5: Verify De Morgan's Theorems with Truth Table
**See Section 4 — complete truth tables provided.**

### Problem 6: Simplify Boolean Expressions
**All worked in Section 5.**

---

## Section 9 — Self-Check Problems

1. Draw gate diagram for: F = (A+B)·(C+D)
2. Simplify: A·B + A·B' + A'·B
3. Simplify: (A+B+C)·(A+B+C')·(A+B'+C)
4. Verify (A⊕B)' = A⊙B with truth table
5. Convert F = Σm(0,2,4,6) to POS form
6. K-map simplify: F = Σm(0,1,2,4,5,6) (3 variables)

---

## Glossary Terms

[[boolean-algebra]], [[boolean-variable]], [[and-operation]], [[or-operation]], [[not-operation]], [[nand]], [[nor]], [[xor]], [[xnor]], [[truth-table]], [[logic-gate]], [[gate-diagram]], [[de-morgans-theorems]], [[boolean-identities]], [[absorption-law]], [[consensus-theorem]], [[distributive-law]], [[minterm]], [[maxterm]], [[canonical-form]], [[sum-of-products]], [[product-of-sums]], [[karnaugh-map]], [[k-map]], [[gray-code]], [[implicant]], [[prime-implicant]], [[essential-prime-implicant]], [[dont-care]], [[minimal-sop]], [[minimal-pos]]
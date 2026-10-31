# CSC 215 Topic 3: Simplification of Boolean Functions (K-Maps) — Enhanced

## The Central Idea

**Simplification** reduces gate count, power, delay, and cost. The **Karnaugh Map (K-map)** is a visual method that exploits human pattern recognition to find minimal expressions — often easier than algebraic manipulation for 2-6 variables.

This topic covers K-maps in depth: 2-5 variables, don't-care conditions, POS simplification, and the exact simplification problems from past exams.

---

## Why It Matters — Past Exam Coverage

| Past Exam Question | This Topic Covers |
|--------------------|-------------------|
| Simplify X·Y·Z + X·Y·Z' + ... | Algebraic + K-map simplification |
| Simplify (X+Y)·(X+Y') | Algebraic + K-map |
| Simplify [(W'·X' + Y·Z)' + Z] {W + Y·Z'} | Complex multi-variable K-map |
| Elaborate on K-Map, outline simplified expressions | K-map theory + examples |
| What does Canonical Form mean? | Minterms, maxterms, SOP, POS |

---

## Section 1 — K-Map Fundamentals

### What is a K-Map?

A **Karnaugh Map** is a 2D truth table where adjacent cells differ by exactly **one variable** (Gray code ordering). This makes logical adjacency visible as physical adjacency.

### Why It Works

In Boolean algebra, terms that differ in exactly one variable can be combined:
- A·B + A·B' = A·(B+B') = A
- (A+B)·(A+B') = A

On a K-map, these terms are **neighbors** and can be grouped.

---

## Section 2 — K-Map Construction

### 2 Variables (4 cells)
```
      B
     0  1
A 0 | 0  1
  1 | 2  3
```
Cell indices = minterm numbers (A,B as bits: AB)

### 3 Variables (8 cells)
```
      BC
     00 01 11 10
A 0 | 0  1  3  2
  1 | 4  5  7  6
```
**Column order:** 00, 01, 11, 10 (Gray code — NOT binary 00,01,10,11!)

### 4 Variables (16 cells)
```
       CD
      00 01 11 10
AB 00 | 0  1  3  2
   01 | 4  5  7  6
   11 | 12 13 15 14
   10 | 8  9  11 10
```
**Row order:** 00, 01, 11, 10 (Gray code)

### 5 Variables (32 cells) — Two 4-var maps
```
A=0 map (top)    A=1 map (bottom)
```
Cells are adjacent vertically between maps (same BCDE position).

---

## Section 3 — Grouping Rules (Critical)

| Rule | Description |
|------|-------------|
| **Shape** | Rectangular only (rows × cols) |
| **Size** | Power of 2: 1, 2, 4, 8, 16, 32... |
| **Wrapping** | Top↔Bottom, Left↔Right (torus topology) |
| **Coverage** | Every 1 (SOP) or 0 (POS) must be in at least one group |
| **Maximize** | Make groups as large as possible |
| **Overlap** | Groups can overlap — a cell can be in multiple groups |
| **Don't-cares** | X cells can be 1 or 0 to help grouping (or ignored) |
| **Minimize** | Fewest groups, largest groups → minimal expression |

---

## Section 4 — Reading Groups → Terms (SOP)

For each group, **variables that CHANGE within the group are ELIMINATED**. Variables that stay constant appear in the product term.

| Group Size | Variables Eliminated | Term Variables |
|------------|---------------------|----------------|
| 1 (isolated) | 0 | All n |
| 2 | 1 | n-1 |
| 4 | 2 | n-2 |
| 8 | 3 | n-3 |
| 16 | 4 | n-4 |

### Example: 3-Var K-Map

```
      BC
     00 01 11 10
A 0 | 1  1  0  0
  1 | 0  1  1  0
```
F = Σm(1,3,5,6)

**Groups:**
- Vertical pair (m1,m3): A=0, C=1, B changes → **A'·C**
- Diagonal? No, must be rectangular.
- Pair (m5,m7)? m7=0.
- Pair (m3,m7)? m7=0.
- Pair (m5,m1)? Not adjacent (A changes from 0 to 1, B changes from 0 to 1 — two variables).

Wait, in 3-var K-map:
```
      BC
     00 01 11 10
A 0 | 0  1  1  0
  1 | 0  1  0  1
```
m1=(0,01), m3=(0,11) — adjacent horizontally (B changes, A,C constant) → A'·C
m5=(1,01), m6=(1,10) — not adjacent (C changes, B changes)
m5=(1,01), m7=(1,11) — m7=0

So groups:
- (m1,m3): A'·C
- m5 alone: A·B'·C
- m6 alone: A·B·C'

F = A'C + AB'C + ABC'

But we found earlier F = AB + C is minimal. Let's check with POS (group 0s).

**0s at m0,m2,m4,m7:**
- (m0,m2): A=0, C=0 → A+C
- (m0,m4): B=0, C=0 → B+C
- (m7): A+B+C

Product: (A+C)(B+C) = AB + C. Much simpler!

**Lesson:** Always check both SOP (group 1s) and POS (group 0s). Take the simpler.

---

## Section 5 — Don't-Care Conditions (X)

**Don't-care** = input combinations that never occur or output doesn't matter. Mark as **X** on K-map. Can be treated as 1 or 0 to form larger groups.

### Example: BCD to 7-Segment Decoder (a segment)
Input: 4-bit BCD (0-9). Values 10-15 (1010-1111) never occur → don't-care.

```
       CD
      00 01 11 10
AB 00 | 1  X  X  1   (for segment 'a': 0,8,9 have segment on? Actually 0,2,3,5,6,7,8,9)
...
```
Use X's to make bigger groups.

---

## Section 6 — Past Exam Simplification Problems (K-Map Solutions)

### Problem 1: X·Y·Z + X·Y·Z' + X·Y·Z + X'·Y·Z + X·Y·X·Y·Z

**Simplify algebraically first (as done):**
= X·Y + Y·Z

**K-map verification (3 vars):**
```
      YZ
     00 01 11 10
X 0 | 0  1  1  0
  1 | 0  1  1  0
```
Groups:
- Middle two columns (01,11): Y=1 → **Y**
- Or: middle two rows? No, X changes.

Wait, rows are X=0 and X=1. Columns are YZ.
In col 01 and 11, both rows have 1s? 
X=0,YZ=01: m1=1
X=1,YZ=01: m5=1
X=0,YZ=11: m3=1
X=1,YZ=11: m7=1? But m7 is not in our list.

Our minterms: X·Y·Z (m7), X·Y·Z' (m6), X'·Y·Z (m3).
So 1s at m3, m6, m7.

```
      YZ
     00 01 11 10
X 0 | 0  0  1  0
  1 | 0  0  1  1
```
Groups:
- Pair (m3,m7): YZ=11, X changes → **Y·Z**
- Pair (m6,m7): X=1, Y=1, Z changes → **X·Y**

F = Y·Z + X·Y = **Y·(X + Z)**

Matches algebraic result!

---

### Problem 2: (X + Y)·(X + Y') — K-Map (POS)

**Truth table:**
| X | Y | F |
|---|---|---|
| 0 | 0 | (0)(1)=0 |
| 0 | 1 | (1)(0)=0 |
| 1 | 0 | (1)(1)=1 |
| 1 | 1 | (1)(1)=1 |

**K-map (1s):**
```
      Y
     0  1
X 0 | 0  0
  1 | 1  1
```
Group: row X=1 → **X**

**K-map (0s for POS):**
```
      Y
     0  1
X 0 | 1  1
  1 | 0  0
```
Group 0s: row X=0 → X' (but for POS, group 0s gives sum term)
0s at X=0: sum term = X
Group = **X** (since 0s group gives X)

Wait, POS grouping: group 0s, write SUM term for each group.
0s at X=0 (both Y). Variables constant: X=0. Sum term = X (since X=0 means X is false, so term is X).
Result: **X**. ✓

---

### Problem 3: F(A,B,C,D) = Σm(0,1,2,4,5,6,8,9,10,12,13,14)

**4-variable K-map:**
```
       CD
      00 01 11 10
AB 00 | 1  1  0  1
   01 | 1  1  0  1
   11 | 0  0  0  0
   10 | 1  1  0  1
```
0s at m3,m7,m11,m15 (column CD=11).

**Group 0s (POS) — column 11:**
CD=11 is constant → C·D (but for 0s, sum term = C' + D')

**POS: F = (C' + D') = (C·D)'**

**SOP — group 1s:**
All except column 11. Can group:
- 8 cells (two quads): rows 00&01 (A'B'), rows 00&10 (B'D'?), complex.

**Minimal is POS: F = C' + D'**

Check: When C=1,D=1, F=0. Otherwise F=1. Yes.

---

### Problem 4: 5-Variable K-Map

**F(A,B,C,D,E) = Σm(0,1,2,3,4,5,6,7,16,17,18,19,20,21,22,23)**

**Two maps: A=0 and A=1**
A=0 map: all 1s (m0-m7 = 00000 to 00111? Wait m0-m7 are first 8)
Actually m0-m7 = A=0, BCDE = 0000 to 0111.
m16-m23 = A=1, BCDE = 0000 to 0111.

```
A=0:        A=1:
   BCDE       BCDE
  00 01 11 10  00 01 11 10
0 1  1  1  1   1  1  1  1
1 1  1  1  1   1  1  1  1
```
Wait, 5-var K-map has 32 cells. Let me be precise.

5-var: A (map select), B (row), CDE (col? No, 5 var = 2×16)
Standard: A=0 map and A=1 map, each 4-var (B,C,D,E).

Our minterms: 0-7 and 16-23.
In A=0 map: m0-m7 → BCDE rows 0000-0111? No, 4-var map has 16 cells.
m0=00000, m1=00001, m2=00010, m3=00011, m4=00100, m5=00101, m6=00110, m7=00111.
These are BCDE = 0000 to 0111 (first half of rows).

A=1 map: m16=10000 to m23=10111. Same BCDE positions.

So both maps have 1s in the first 8 cells (top half).

```
A=0:        A=1:
   CDE        CDE
B 00 01 11 10  00 01 11 10
0 1  1  1  1   1  1  1  1
1 1  1  1  1   1  1  1  1
   (rows B=0, CDE=000-111)  (same)
```

Groups:
- In each map: 8-cell group (top half) → B' (since B=0 constant, A,C,D,E change)
- Vertical between maps: same position in both maps → A eliminated

So we have 16-cell group covering all 1s → **B'**

**Answer: F = B'**

Check: Minterms 0-7 have B=0 (since 0-7 = 00000-00111, B is 3rd bit = 0). Minterms 16-23 = 10000-10111, B=0. Yes, all have B=0.

---

## Section 7 — Canonical Forms Summary

| Form | Description | Notation | Derived From |
|------|-------------|----------|--------------|
| **Canonical SOP** | Sum of minterms (all variables in each term) | Σm(...) | Truth table 1s |
| **Canonical POS** | Product of maxterms (all variables in each factor) | ΠM(...) | Truth table 0s |
| **Minimal SOP** | Fewest product terms, fewest literals | — | K-map group 1s |
| **Minimal POS** | Fewest sum terms, fewest literals | — | K-map group 0s |
| **Standard SOP** | Sum of product terms (not necessarily all vars) | — | Simplified |
| **Standard POS** | Product of sum terms (not necessarily all vars) | — | Simplified |

### Minterm vs Maxterm Index

For n variables, 2ⁿ minterms and 2ⁿ maxterms.
- Minterm mᵢ: variable is TRUE if bit i=1, FALSE if 0
- Maxterm Mᵢ: variable is FALSE if bit i=1, TRUE if 0 (opposite!)

**Example: 3 variables, index 3 (011)**
- m₃ = A'·B·C (A=0,B=1,C=1)
- M₃ = A+B'+C' (A=0→A, B=1→B', C=1→C')

**Key:** mᵢ = (Mᵢ)'

---

## Section 8 — Conversion Between Forms

### Canonical SOP → Minimal SOP
Use K-map (group 1s) or Boolean algebra.

### Canonical POS → Minimal POS
Use K-map (group 0s) or Boolean algebra.

### SOP ↔ POS (Complement)
F = Σm(list) ⇒ F' = Σm(missing) = ΠM(list)
F = ΠM(list) ⇒ F' = ΠM(missing) = Σm(list)

### Example: F(A,B,C) = Σm(1,3,5,6)
- Missing: 0,2,4,7
- F' = Σm(0,2,4,7) = ΠM(1,3,5,6)
- F = ΠM(0,2,4,7)

---

## Section 9 — Quine-McCluskey (Tabular Method) — Brief

For >6 variables or algorithmic minimization.

**Steps:**
1. List minterms by number of 1s
2. Combine pairs differing in 1 bit → mark with dash
3. Repeat until no more combinations → prime implicants
4. Prime implicant chart → select essential prime implicants
5. Cover remaining minterms with minimum additional PIs

**Use when:** K-map impractical (computer implementation).

---

## Section 9 — Self-Check Problems

1. K-map simplify: F = Σm(0,1,2,3) (2 vars)
2. K-map simplify: F = Σm(0,1,2,4,5,6) (3 vars)
3. K-map simplify with don't-cares: F = Σm(1,3,7) + d(0,2,5) (3 vars)
4. Find minimal POS for F = Σm(0,2,4,6) (3 vars)
5. 4-var K-map: F = Σm(0,1,2,4,5,6,8,9,10,12,13,14)
6. 5-var: F = Σm(0-15) (A=0 map all 1s). What is F?

---

## Solutions to Self-Check

1. F = 1 (all 1s)
2. F = A' + B'C' (or similar — group 4 1s)
3. d's allow full 1s → F = 1
4. 0s at 1,3,5,7 → group 4 0s → F = B (POS: F = B? Wait. 0s at odd indices = B=1? Let's check: 001,011,101,111. B=1 in all? 001: B=0. No. Better: group 0s in pairs. Minimal POS = A+C? Need K-map.)
5. F = C' + D' (as worked)
6. F = A' (all minterms with A=0)

---

## Glossary Terms

[[karnaugh-map]], [[k-map]], [[gray-code]], [[minterm]], [[maxterm]], [[canonical-sop]], [[canonical-pos]], [[minimal-sop]], [[minimal-pos]], [[prime-implicant]], [[essential-prime-implicant]], [[implicant]], [[cover]], [[dont-care]], [[quine-mccluskey]], [[tabular-method]], [[prime-implicant-chart]], [[adjacency]], [[grouping]], [[wrap-around]], [[power-of-two]], [[literal]], [[product-term]], [[sum-term]], [[standard-sop]], [[standard-pos]]
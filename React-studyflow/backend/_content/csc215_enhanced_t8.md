# CSC 215 Topic 8: Canonical Forms & Standard Representations — Enhanced

## The Central Idea

**Canonical forms** are unique, standardized representations of Boolean functions. They allow systematic comparison, simplification, and conversion between forms. Every Boolean function has exactly one canonical SOP and one canonical POS.

---

## Section 1 — Minterms (Canonical SOP)

### Definition
A **minterm** is a product term containing **all variables** exactly once (either true or complemented). For n variables, there are 2ⁿ minterms.

### Minterm Notation
- mᵢ: minterm for row i of truth table (i = decimal value of binary input)
- Variable is TRUE (uncomplemented) if bit=1, FALSE (complemented) if bit=0

### 3-Variable Minterms

| i | A | B | C | Minterm | Notation |
|---|---|---|---|---------|----------|
| 0 | 0 | 0 | 0 | A'·B'·C' | m₀ |
| 1 | 0 | 0 | 1 | A'·B'·C | m₁ |
| 2 | 0 | 1 | 0 | A'·B·C' | m₂ |
| 3 | 0 | 1 | 1 | A'·B·C | m₃ |
| 4 | 1 | 0 | 0 | A·B'·C' | m₄ |
| 5 | 1 | 0 | 1 | A·B'·C | m₅ |
| 6 | 1 | 1 | 0 | A·B·C' | m₆ |
| 7 | 1 | 1 | 1 | A·B·C | m₇ |

### Canonical SOP (Sum of Minterms)
F = Σm(list of indices where F=1)

**Example:** F(A,B,C) = Σm(1,3,5,6)
= A'B'C + A'BC + AB'C + ABC'

---

## Section 2 — Maxterms (Canonical POS)

### Definition
A **maxterm** is a sum term containing **all variables** exactly once. For n variables, 2ⁿ maxterms.

### Maxterm Notation
- Mᵢ: maxterm for row i
- Variable is FALSE (uncomplemented) if bit=1, TRUE (complemented) if bit=0
- **Opposite of minterm!**

### 3-Variable Maxterms

| i | A | B | C | Maxterm | Notation |
|---|---|---|---|---------|----------|
| 0 | 0 | 0 | 0 | A+B+C | M₀ |
| 1 | 0 | 0 | 1 | A+B+C' | M₁ |
| 2 | 0 | 1 | 0 | A+B'+C | M₂ |
| 3 | 0 | 1 | 1 | A+B'+C' | M₃ |
| 4 | 1 | 0 | 0 | A'+B+C | M₄ |
| 5 | 1 | 0 | 1 | A'+B+C' | M₅ |
| 6 | 1 | 1 | 0 | A'+B'+C | M₆ |
| 7 | 1 | 1 | 1 | A'+B'+C' | M₇ |

### Canonical POS (Product of Maxterms)
F = ΠM(list of indices where F=0)

**Example:** F = ΠM(0,2,4,7)
= (A+B+C)(A+B'+C)(A'+B+C)(A'+B'+C')

---

## Section 3 — Conversions

### Minterm ↔ Maxterm
- mᵢ = (Mᵢ)' (complements)
- Σm(list) = ΠM(missing indices)
- ΠM(list) = Σm(missing indices)

**Example:** F = Σm(1,3,5,6) = ΠM(0,2,4,7)

### Canonical → Minimal
Use K-map or Boolean algebra to reduce.

**Example:** F = Σm(1,3,5,6) = ΠM(0,2,4,7)
- Minimal SOP: A'C + AB'C + ABC' (or AB + C from POS)
- Minimal POS: (A+C)(B+C) = AB + C

### Truth Table ↔ Canonical
- Rows with 1 → minterms (SOP)
- Rows with 0 → maxterms (POS)

---

## Section 4 — Standard Forms (Non-Canonical)

### Standard SOP (Sum of Products)
Sum of product terms, **not necessarily all variables**.
**Example:** F = A'B + BC + A'C'D

### Standard POS (Product of Sums)
Product of sum terms, **not necessarily all variables**.
**Example:** F = (A+B)(A'+C)(B+C+D)

### Conversion: Canonical → Standard
Just simplify using Boolean algebra or K-map.

**Example:** F = Σm(1,3,5,6)
= A'B'C + A'BC + AB'C + ABC'
= A'C(B'+B) + AC'(B+B')  (group 1,3 and 5,6? No, 5,6 not adjacent)
Actually: m1+m3 = A'C, m5+m6 don't share.
Better: Use K-map.

---

## Section 5 — Other Standard Forms

### NAND-NAND Implementation
Any SOP → NAND-NAND (double complement)
1. Draw SOP with AND-OR
2. Add bubbles on AND outputs and OR inputs
3. Replace bubbled OR with NAND
3. Replace bubbled AND with NAND
4. Add inverter for single literals

### NOR-NOR Implementation
Any POS → NOR-NOR
1. Draw POS with OR-AND
2. Add bubbles
3. Replace bubbled OR with NOR
4. Replace bubbled AND with NOR
5. Add inverter for single literals

### AND-OR-INVERT (AOI)
SOP with final inverter: F = (Σ products)'

### OR-AND-INVERT (OAI)
POS with final inverter: F = (Π sums)'

---

## Section 6 — Incomplete Specification (Don't-Cares)

### Don't-Care Conditions
Input combinations that never occur or output doesn't matter.
Denoted: d(indices) or X on K-map.

### Using Don't-Cares
- Can be 0 or 1 to form larger groups
- Not required to cover all don't-cares
- Different choices → different minimal forms

**Example:** F(A,B,C) = Σm(1,3) + d(0,2,5)
- d's at 0,2,5 can help group m1,m3
- With d's: group all 4 (0,1,2,3) → A' (if 0,1,2,3 are 1)
- Or group (1,3,5,7) → C? Need to check.

---

## Section 7 — Past Exam Canonical Form Problems

### Problem: Define Canonical Form

> *What does the term "Canonical form" mean in Boolean function?*

**Answer:** A canonical form is a **unique, standardized representation** where every term contains **all variables** exactly once. Two types:
- **Canonical SOP (Minterm expansion):** Sum of minterms, each with all variables
- **Canonical POS (Maxterm expansion):** Product of maxterms, each with all variables

### Problem: Convert to Canonical Forms

> *Convert F(A,B,C) = A·B + B'·C to canonical SOP and POS.*

**Solution:**

**Canonical SOP:**
A·B = A·B·(C+C') = ABC + ABC'
B'·C = B'·C·(A+A') = AB'C + A'B'C
F = ABC + ABC' + AB'C + A'B'C
= Σm(7,6,5,1) = Σm(1,5,6,7)

**Canonical POS:**
F = (A+B)(B'+C) ... use K-map or complement method.
F' = Σm(0,2,3,4) = ΠM(1,5,6,7)
F = ΠM(0,2,3,4)

---

### Problem: Simplify from Canonical

> *F = Σm(0,1,2,3,4,5,6,7). Simplify.*

**Solution:** All minterms = 1. **F = 1**

> *F = Σm(0,2,4,6). Simplify.*

**Solution:** K-map 3-var, 1s at even indices (C=0).
F = C'

> *F = Σm(1,3,5,7). Simplify.*

**Solution:** 1s at odd indices (C=1).
F = C

---

### Problem: Canonical from Truth Table

| A | B | C | F |
|---|---|---|---|
| 0 | 0 | 0 | 1 |
| 0 | 0 | 1 | 0 |
| 0 | 1 | 0 | 1 |
| 0 | 1 | 1 | 1 |
| 1 | 0 | 0 | 0 |
| 1 | 0 | 1 | 1 |
| 1 | 1 | 0 | 1 |
| 1 | 1 | 1 | 0 |

**Canonical SOP:** F = Σm(0,2,3,5,6)
**Canonical POS:** F = ΠM(1,4,7)

**Minimal SOP:** K-map → A'B'C' + A'BC' + A'BC + AB'C + ABC'
= A'C'(B'+B) + A'B(C'+C) + A(B'C+BC')? Let's K-map.

---

## Section 8 — Self-Check Problems

1. Convert F = A + B'C to canonical SOP (3 vars)
2. Convert F = (A+B)(A'+C) to canonical POS (3 vars)
3. F = Σm(0,1,3,7). Find minimal SOP and POS.
4. F = ΠM(0,2,4,6). Find minimal SOP.
5. Given truth table, write canonical SOP and POS.
6. Implement F = Σm(1,2,4,7) using only NAND gates.

---

## Solutions

1. **F = A + B'C**
   = A(B+B')(C+C') + B'C(A+A')
   = ABC + ABC' + AB'C + AB'C' + AB'C + A'B'C
   = Σm(4,5,6,7,3,1) = Σm(1,3,4,5,6,7)

2. **F = (A+B)(A'+C)**
   POS: Already sum terms. Expand each to maxterms.
   (A+B) = (A+B+C)(A+B+C')
   (A'+C) = (A'+B+C)(A'+B'+C)
   F = ΠM(0,1,2,3)? Wait.
   (A+B) = 0 when A=0,B=0 → C=0,1 → M₀,M₁
   (A'+C) = 0 when A=1,C=0 → B=0,1 → M₄,M₆
   F = ΠM(0,1,4,6) = Σm(2,3,5,7)

3. **F = Σm(0,1,3,7)**
   K-map:
   ```
      BC
     00 01 11 10
   0  1  1  1  0
   1  0  0  1  0
   ```
   Groups: (0,1)→A'B', (1,3)→A'C, (3,7)→BC
   SOP: A'B' + A'C + BC
   POS (group 0s): 0s at 2,4,5,6
   (2,6)→B, (4,5)→A+C'? 
   Minimal POS: (A'+B)(B'+C) = A'B' + A'C + BC ✓

4. **F = ΠM(0,2,4,6)** = Σm(1,3,5,7) = C

5. Truth table → read 1s for SOP, 0s for POS.

6. **NAND-only for Σm(1,2,4,7):**
   Minimal SOP: A'B'C + A'BC' + AB'C' + ABC
   Double complement: F = (F')' = [(A'B'C)'(A'BC')'(AB'C')'(ABC)']'
   Each product term → NAND, then NAND outputs.

---

## Glossary Terms

[[canonical-form]], [[minterm]], [[maxterm]], [[canonical-sop]], [[canonical-pos]], [[sum-of-minterms]], [[product-of-maxterms]], [[standard-sop]], [[standard-pos]], [[minterm-expansion]], [[maxterm-expansion]], [[minterm-index]], [[maxterm-index]], [[complement]], [[k-map]], [[don't-care]], [[incomplete-specification]], [[nand-nand]], [[nor-nor]], [[aoi]], [[oai]], [[two-level-logic]], [[multi-level-logic]], [[universal-gate]], [[nand-universal]], [[nor-universal]]
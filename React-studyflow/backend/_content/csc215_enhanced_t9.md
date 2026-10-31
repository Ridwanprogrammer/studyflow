# CSC 215 Topic 9: Exam Problem Workshop — Comprehensive Practice

## The Central Idea

This topic is a **full past-exam simulation** with every question type from CSC 215 Digital Logic Design exams, solved step-by-step with multiple approaches.

---

## Past Exam Paper — Section A

### Question 1: Logic Gate Diagrams

#### 1(i) Draw logic gate diagram for X = A·C + B·C + A·B·C

**Solution:**

**Method 1 — Direct Implementation:**
```
A ──┐       ┌──[AND]──┐
C ──┘       │         │
            │         ├──[OR]── X
B ──┐       │         │
C ──┘       │         │
            │         │
A ──┐       │         │
B ──┤       │         │
C ──┘       └──[AND]──┘
```
3 AND gates + 1 OR gate (3-input) = 4 gates

**Method 2 — Simplified (Recommended):**
X = C(A + B) + A·B·C = C(A + B + A·B) = C(A + B)  [Absorption: A + A·B = A]
```
A ──┐
    ├──[OR]──┐
B ──┘        ├──[AND]── X
C ───────────┘
```
**2 gates only!** (1 OR + 1 AND)

---

#### 1(ii) Verify De Morgan's Second Theorem using Truth Table

**Theorem:** (A·B)' = A' + B'

**Truth Table:**

| A | B | A·B | (A·B)' | A' | B' | A'+B' |
|---|---|-----|--------|----|----|-------|
| 0 | 0 | 0   | 1      | 1  | 1  | 1     |
| 0 | 1 | 0   | 1      | 1  | 0  | 1     |
| 1 | 0 | 0   | 1      | 0  | 1  | 1     |
| 1 | 1 | 1   | 0      | 0  | 0  | 0     |

**Columns (A·B)' and A'+B' are identical for all 4 rows.** ✓ Verified.

---

### Question 2: Number Conversions

#### 2(i) 73₁₀ → Binary

```
73 ÷ 2 = 36 rem 1
36 ÷ 2 = 18 rem 0
18 ÷ 2 = 9  rem 0
9  ÷ 2 = 4  rem 1
4  ÷ 2 = 2  rem 0
2  ÷ 2 = 1  rem 0
1  ÷ 2 = 0  rem 1
```
Read bottom-up: **1001001₂**

**Check:** 64 + 8 + 1 = 73 ✓

#### 2(ii) 0.125₁₀ → Binary

```
0.125 × 2 = 0.25  → 0
0.25  × 2 = 0.5   → 0
0.5   × 2 = 1.0   → 1
```
Read top-down: **0.001₂**

**Check:** 0×½ + 0×¼ + 1×⅛ = 0.125 ✓

---

### Question 3: Output Expression from Logic Diagram

**Given:** Diagram with A,B,C,D inputs and gate network.

**Method:** Label each gate output from inputs toward output.

**Example Solution:**
```
A ──[NOT]──┐
           ├──[AND]──┐
B ─────────┤         ├──[OR]── F
           │         │
C ─────────┤         │
           └──[AND]──┘
D ─────────┘
```

Gate outputs:
- G1 = A'
- G2 = A'·B
- G3 = C·D
- G4 (Output) = A'·B + C·D

**Answer: F = A'·B + C·D**

---

## Past Exam Paper — Section B

### Question 1a: Four Areas of Digital Systems Application

1. **Computers & Microprocessors** — CPUs, memory, I/O
2. **Communications** — Modems, routers, digital signal processing
3. **Consumer Electronics** — Phones, TVs, appliances, automotive
4. **Industrial Control** — PLCs, robotics, process automation
5. **Medical Systems** — Imaging, monitoring, diagnostics
6. **Military/Aerospace** — Radar, guidance, avionics

*(Any four acceptable)*

---

### Question 1b: Logic Gate Diagrams

#### i) F = A·B + A·C + B·C

**Direct:**
```
A ──┐
    ├──[AND]──┐
B ──┘         │
              ├──[OR]── F
A ──┐         │
    ├──[AND]──┤
C ──┘         │
              │
B ──┐         │
    ├──[AND]──┘
C ──┘
```
3 AND + 1 OR (3-input)

**Can also use majority gate symbol.**

#### ii) X = A·C + B·C + A·B·C

**Simplified: X = C(A + B)** (as shown in 1(i))
```
A ──┐
    ├──[OR]──┐
B ──┘        ├──[AND]── X
C ───────────┘
```

#### iii) Z = A'·B·C·(A + D)

**Simplify first:** A'·B·C·(A + D) = A'·B·C·A + A'·B·C·D = 0 + A'·B·C·D = **A'·B·C·D**

**Diagram:**
```
A ──[NOT]──┐
           │
B ─────────┤
           ├──[AND]── Z
C ─────────┤
           │
D ─────────┘
```
1 NOT + 1 AND (4-input)

---

### Question 1c: 2's Complement

**Algorithm:** Invert all bits, add 1. OR: Copy from right until first 1, then invert rest.

#### i) 11010₂

**Method 1:** Invert → 00101, Add 1 → **00110**

**Method 2:** Right to left: 0 (copy), 1 (copy), then invert 010 → 101. Result: **00110**

#### ii) 1001010₂

**Invert:** 0110101, Add 1 → **0110110**

**Check:** 1001010 = 74. -74 in 7-bit 2's comp: 128-74=54=0110110 ✓

#### iii) 1010010₂

**Invert:** 0101101, Add 1 → **0101110**

**Check:** 1010010 = 82. -82 in 7-bit: 128-82=46=0101110 ✓

---

### Question 2a: Five-Input AND Gate

> *What is the only input combination that will produce a "HIGH" at the output of a five-input AND gate?*

**Answer:** **All five inputs must be HIGH (1).**
A=1, B=1, C=1, D=1, E=1 → Output = 1.
Any other combination (any 0) → Output = 0.

---

### Question 2b: Hexadecimal to Decimal

#### i) 2B6₁₆

2×16² + 11×16¹ + 6×16⁰ = 2×256 + 11×16 + 6 = 512 + 176 + 6 = **694**

#### ii) A4B1₁₆

10×16³ + 4×16² + 11×16¹ + 1 = 10×4096 + 4×256 + 176 + 1 = 40960 + 1024 + 176 + 1 = **42161**

#### iii) 2C5₁₆

2×256 + 12×16 + 5 = 512 + 192 + 5 = **709**

---

### Question 2c: Boolean Simplification

#### i) X·Y·Z + X·Y·Z' + X·Y·Z + X'·Y·Z + X·Y·X·Y·Z

**Step 1:** Remove duplicate X·Y·Z (appears twice)
= X·Y·Z + X·Y·Z' + X'·Y·Z + X·Y·X·Y·Z

**Step 2:** X·Y·X·Y·Z = X·Y·Z (idempotent)
= X·Y·Z + X·Y·Z' + X'·Y·Z + X·Y·Z
= X·Y·Z + X·Y·Z' + X'·Y·Z

**Step 3:** Factor X·Y from first two
= X·Y(Z + Z') + X'·Y·Z
= X·Y·1 + X'·Y·Z
= X·Y + X'·Y·Z

**Step 4:** Factor Y
= Y(X + X'·Z)
= Y(X + Z)  [Absorption: X + X'Z = X + Z]

**Final: X·Y + Y·Z**

---

#### ii) (X + Y)·(X + Y')

**Method 1 — Distributive:**
= X·X + X·Y' + Y·X + Y·Y'
= X + X·Y' + X·Y + 0
= X + X·(Y' + Y)
= X + X·1
= X + X
= **X**

**Method 2 — Recognize pattern:** (X+Y)(X+Y') = X + Y·Y' = X + 0 = X

**Answer: X**

---

#### iii) [(W'·X' + Y·Z)' + Z] · [W + Y·Z']

**Step 1:** Let P = W'·X' + Y·Z
Expression = (P' + Z) · (W + Y·Z')

**Step 2:** Simplify P' + Z
P' + Z = (P·Z')' by De Morgan
But better: Use P' + Z = 1 when Z=1. When Z=0, P' + 0 = P' = (W'·X' + 0)' = (W'·X')' = W + X
So P' + Z = Z + (W + X)·Z' = Z + W + X  [Absorption]

**First bracket = W + X + Z**

**Step 3:** Full expression = (W + X + Z) · (W + Y·Z')

**Step 4:** Distribute
= W·(W + Y·Z') + X·(W + Y·Z') + Z·(W + Y·Z')
= W + W·X + X·Y·Z' + W·Z + Y·Z·Z'
= W + W·X + X·Y·Z' + W·Z + 0
= W·(1 + X + Z) + X·Y·Z'
= W·1 + X·Y·Z'
= **W + X·Y·Z'**

**Final Answer: W + X·Y·Z'**

---

### Question 3a: Verify De Morgan's First & Second Theorems

**First Theorem:** (A + B)' = A'·B'

| A | B | A+B | (A+B)' | A' | B' | A'·B' |
|---|---|-----|--------|----|----|-------|
| 0 | 0 | 0   | 1      | 1  | 1  | 1     |
| 0 | 1 | 1   | 0      | 1  | 0  | 0     |
| 1 | 0 | 1   | 0      | 0  | 1  | 0     |
| 1 | 1 | 1   | 0      | 0  | 0  | 0     |

**Second Theorem:** (A·B)' = A' + B'

| A | B | A·B | (A·B)' | A' | B' | A'+B' |
|---|---|-----|--------|----|----|-------|
| 0 | 0 | 0   | 1      | 1  | 1  | 1     |
| 0 | 1 | 0   | 1      | 1  | 0  | 1     |
| 1 | 0 | 0   | 1      | 0  | 1  | 1     |
| 1 | 1 | 1   | 0      | 0  | 0  | 0     |

**Both verified:** Columns match for all rows.

---

### Question 3b: Binary Arithmetic

#### i) 101.1011₂ + 1100.001₂

```
  101.1011
+1100.0010
----------
 10001.1101
```

Align binary points. Add column by column with carry.

**Check:** 5.6875 + 12.125 = 17.8125
10001.1101₂ = 16 + 1 + 0.5 + 0.25 + 0.0625 = 17.8125 ✓

#### ii) 1011.011₂ - 1001.110₂

```
  1011.011
- 1001.110
----------
    1.101
```

**Check:** 11.375 - 9.875 = 1.5 = 1.101₂ ✓

#### iii) 1100001₂ + 10011101₂

```
  01100001  (97)
+ 10011101  (157)
----------
 11111110  (254)
```
As unsigned: 97+157=254.
As signed 8-bit: 10011101 = -99, 97+(-99)=-2.
254 in 8-bit unsigned = 11111110 ✓

---

### Question 3c: Prove A'·B' = (A+B)' for A=1010, B=1100

**Step 1:** A + B (bitwise OR)
```
A = 1 0 1 0
B = 1 1 0 0
A+B = 1 1 1 0
```

**Step 2:** (A+B)' = invert = **0 0 0 1**

**Step 3:** A' = 0 1 0 1
        B' = 0 0 1 1

**Step 4:** A'·B' (bitwise AND)
```
A' = 0 1 0 1
B' = 0 0 1 1
A'·B' = 0 0 0 1
```

**Step 5:** (A+B)' = 0001, A'·B' = 0001. **Equal.** ✓

---

### Question 4: Circuit Analysis

> *Given A and A' are the same from circuit diagram, determine Boolean functions F1 and F2 in terms of T1-T8.*

**Note:** This requires a specific circuit diagram. General method:

1. Label all gate outputs with intermediate expressions
2. Work from inputs (T1-T8) toward outputs (F1, F2)
3. Substitute and simplify
4. Express F1, F2 solely in terms of T1...T8

**Without diagram:** Cannot solve specifically. But the method is universal.

---

### Question 4b: Decimal to Binary

#### i) 41.6875₁₀
**Integer part:** 41
41÷2=20r1, 20÷2=10r0, 10÷2=5r0, 5÷2=2r1, 2÷2=1r0, 1÷2=0r1
→ **101001**

**Fraction:** 0.6875
0.6875×2=1.375→1, 0.375×2=0.75→0, 0.75×2=1.5→1, 0.5×2=1.0→1
→ **0.1011**

**Answer: 101001.1011₂**

#### ii) 51₁₀
51÷2=25r1, 25÷2=12r1, 12÷2=6r0, 6÷2=3r0, 3÷2=1r1, 1÷2=0r1
→ **110011₂**

#### iii) 73₁₀
→ **1001001₂** (from Q2)

#### iv) 23₁₀
23÷2=11r1, 11÷2=5r1, 5÷2=2r1, 2÷2=1r0, 1÷2=0r1
→ **10111₂**

#### v) 0.125₁₀
→ **0.001₂** (from Q2)

---

### Question 5: Output Expressions

#### 5a: Logic Gate Diagram and Switching Circuit
*Requires diagram — general method: trace from inputs to output, write expression at each gate.*

#### 5b: Draw Logic Gate for F = (A·B)·(C·D)

**Simplified:** F = A·B·C·D
```
A ──┐
    ├──[AND]──┐
B ──┘         ├──[AND]── F
              │
C ──┐         │
    ├──[AND]──┘
D ──┘
```
Or single 4-input AND gate.

#### 5c: Convert to Octal

##### i) 47₁₀
47÷8=5r7, 5÷8=0r5 → **57₈**

##### ii) 151₁₀
151÷8=18r7, 18÷8=2r2, 2÷8=0r2 → **227₈**

##### iii) 302₁₀
302÷8=37r6, 37÷8=4r5, 4÷8=0r4 → **456₈**

##### iv) 1010100101₂ → Octal
Group by 3 from right: 001 010 100 101
→ **1245₈**

##### v) 101100110₂ → Octal
Group by 3: 101 100 110
→ **546₈**

---

### Question 6: K-Map & Canonical Forms

#### 6a: Elaborate on K-Map, Outline Simplified Expressions

**Karnaugh Map (K-Map):**
- Graphical method for simplifying Boolean functions
- 2D truth table with Gray code ordering
- Adjacent cells differ by 1 variable → can be combined
- Groups must be rectangular, size = power of 2
- Wrap around edges allowed
- Make groups as large as possible
- Overlapping groups allowed

**Simplified Expressions Produced:**
- **Minimal SOP:** Group 1s, read product terms (variables that stay constant)
- **Minimal POS:** Group 0s, read sum terms
- **Don't-cares:** Can be 0 or 1 to enlarge groups

**Example:** F(A,B,C,D) = Σm(0,1,2,4,5,6,8,9,10,12,13,14)
- 0s at column CD=11 only
- Minimal POS: F = (C' + D') = (C·D)'
- Minimal SOP: more complex, but POS is simpler

---

#### 6b: Canonical Form Meaning

**Canonical Form:** A unique, standardized representation where **every term contains all variables** exactly once.

**Two Types:**
1. **Canonical SOP (Sum of Minterms):** F = Σm(...) — sum of minterms (each minterm = product of all vars)
2. **Canonical POS (Product of Maxterms):** F = ΠM(...) — product of maxterms (each maxterm = sum of all vars)

**Key Properties:**
- Unique for a given function
- Derived directly from truth table
- Min terms from rows where F=1, Max terms from rows where F=0
- Σm(list) = ΠM(complement of list)

---

#### 6c: Simplify F = A·B + A'·C + B·C + A·C to Minimum, Prove with Truth Table

**Algebraic Simplification:**
F = AB + A'C + BC + AC
= AB + A'C + C(B + A)  [Factor C from last two]
= AB + A'C + C(A + B)  [Commutative]
= AB + C(A + B + A')   [Factor C? Not directly]

**Consensus Theorem:** AB + A'C + BC = AB + A'C (BC is consensus of AB and A'C)
So BC is redundant!
F = AB + A'C + AC

Now: AB + AC = A(B+C)
F = A(B+C) + A'C
= AB + AC + A'C
= AB + C(A + A')
= AB + C·1
= **AB + C**

**Verification:** F = AB + C

**Truth Table Proof:**

| A | B | C | AB | AB+C | A·B | A'·C | B·C | A·C | Orig |
|---|---|---|----|------|-----|------|-----|-----|------|
| 0 | 0 | 0 | 0  | 0    | 0   | 0    | 0   | 0   | 0    |
| 0 | 0 | 1 | 0  | 1    | 0   | 1    | 0   | 0   | 1    |
| 0 | 1 | 0 | 0  | 0    | 0   | 0    | 0   | 0   | 0    |
| 0 | 1 | 1 | 0  | 1    | 0   | 1    | 1   | 0   | 1    |
| 1 | 0 | 0 | 0  | 0    | 0   | 0    | 0   | 0   | 0    |
| 1 | 0 | 1 | 0  | 1    | 0   | 0    | 0   | 1   | 1    |
| 1 | 1 | 0 | 1  | 1    | 1   | 0    | 0   | 0   | 1    |
| 1 | 1 | 1 | 1  | 1    | 1   | 0    | 1   | 1   | 1    |

**Columns AB+C and Original match for all 8 rows.** ✓ Proven.

**Minimal Expression: AB + C**

---

## Section: Quick Reference — All Key Formulas

| Topic | Key Formula |
|-------|-------------|
| **2's Complement** | Invert + 1, or copy to first 1 then invert |
| **De Morgan** | (A+B)' = A'B', (AB)' = A'+B' |
| **Consensus** | AB + A'C + BC = AB + A'C |
| **Absorption** | X + XY = X, X(X+Y) = X |
| **K-map Group** | Size 2ᵏ eliminates k variables |
| **Mod-N Counter** | N states, reset at N |
| **Cache AMAT** | h·t_cache + (1-h)·t_mem |
| **DRAM Refresh** | 64ms / #rows |
| **Virtual Addr** | VPN | Offset (page size = 2^offset) |

---

## Final Exam Tips

| Tip | Details |
|-----|---------|
| **Simplify FIRST** | Always simplify Boolean expressions before drawing circuits |
| **Show work** | Truth tables for verification, K-map groupings circled |
| **Units** | ns for time, MHz/GHz for frequency, bits/bytes for memory |
| **Check arithmetic** | Binary addition/subtraction, hex conversions |
| **State assumptions** | "Assuming positive-edge triggered D FFs..." |
| **Label diagrams** | Gate types, signal names, active-low bubbles |
| **Time management** | Don't get stuck — move on, return later |

---

## Glossary Terms — Complete CSC 215

[[digital-logic]], [[boolean-algebra]], [[logic-gate]], [[truth-table]], [[karnaugh-map]], [[minterm]], [[maxterm]], [[canonical-form]], [[simplification]], [[de-morgans-theorems]], [[consensus-theorem]], [[absorption-law]], [[half-adder]], [[full-adder]], [[ripple-carry]], [[carry-lookahead]], [[multiplexer]], [[demultiplexer]], [[decoder]], [[encoder]], [[comparator]], [[latch]], [[flip-flop]], [[sr-latch]], [[d-latch]], [[d-flip-flop]], [[jk-flip-flop]], [[t-flip-flop]], [[edge-triggered]], [[level-sensitive]], [[setup-time]], [[hold-time]], [[clock-skew]], [[metastability]], [[register]], [[shift-register]], [[universal-shift-register]], [[counter]], [[ripple-counter]], [[synchronous-counter]], [[mod-n-counter]], [[decade-counter]], [[johnson-counter]], [[ring-counter]], [[memory-hierarchy]], [[sram]], [[dram]], [[rom]], [[cache]], [[virtual-memory]], [[paging]], [[tlb]], [[hamming-code]], [[error-correction]], [[number-system]], [[binary]], [[octal]], [[hexadecimal]], [[bcd]], [[twos-complement]], [[signed-integer]], [[floating-point]], [[ieee-754]]
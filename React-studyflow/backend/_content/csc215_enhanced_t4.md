# CSC 215 Topic 4: Combinational Logic Circuits — Enhanced

## The Central Idea

**Combinational circuits** have no memory — outputs depend **only on current inputs**. They are the building blocks of all digital computation: arithmetic, data routing, code conversion, comparison.

This topic covers the standard combinational blocks with **complete worked examples** matching past exam expectations.

---

## Why It Matters — Past Exam Coverage

| Past Exam Question | This Topic Covers |
|--------------------|-------------------|
| Draw logic gate for F = A·B + A·C + B·C | Combinational design from expression |
| Draw logic gate for Z = A'·B·C·(A+D) | Expression → circuit |
| Half adder / Full adder design | Adder circuits |
| Multiplexer / Decoder / Encoder | Standard MSI blocks |
| Output expression from logic diagram | Circuit → expression analysis |

---

## Section 1 — Design Flow

1. **Specification** → Truth table
2. **Truth table** → Boolean expressions (SOP/POS)
3. **Simplify** (K-map/algebra)
4. **Implement** with gates (AND/OR/NOT, NAND-only, NOR-only)
5. **Verify** (timing, fan-out, power)

---

## Section 2 — Arithmetic Circuits

### Half Adder (HA)

Adds two 1-bit numbers: A + B

| A | B | Sum | Carry |
|---|---|-----|-------|
| 0 | 0 | 0   | 0     |
| 0 | 1 | 1   | 0     |
| 1 | 0 | 1   | 0     |
| 1 | 1 | 0   | 1     |

**Expressions:**
- Sum = A ⊕ B = A'B + AB'
- Carry = A·B

**Gate Diagram:**
```
A ──┬──[XOR]── Sum
    │
B ──┴──[AND]── Carry
```

---

### Full Adder (FA)

Adds three 1-bit numbers: A + B + C_in

| A | B | C_in | Sum | C_out |
|---|---|------|-----|-------|
| 0 | 0 | 0    | 0   | 0     |
| 0 | 0 | 1    | 1   | 0     |
| 0 | 1 | 0    | 1   | 0     |
| 0 | 1 | 1    | 0   | 1     |
| 1 | 0 | 0    | 1   | 0     |
| 1 | 0 | 1    | 0   | 1     |
| 1 | 1 | 0    | 0   | 1     |
| 1 | 1 | 1    | 1   | 1     |

**Expressions:**
- Sum = A ⊕ B ⊕ C_in
- C_out = A·B + B·C_in + A·C_in = (A⊕B)·C_in + A·B

**Gate Diagram (using two half adders):**
```
A ──┬──[HA1]── Sum1 ──┬──[HA2]── Sum
    │                 │
B ──┴──[HA1]── C1 ────┤
                      │
C_in ─────────────────┴──[HA2]── C2
                                    │
C_out = C1 + C2 ────────────────────┘
```

**Alternative (direct):**
```
Sum = A ⊕ B ⊕ C_in  (two XORs)
C_out = AB + BC_in + AC_in  (three ANDs + one OR)
```

---

### 4-Bit Ripple Carry Adder

Chain 4 full adders: C_out of stage i → C_in of stage i+1.

**Delay:** C_out propagates through all stages. Total delay ≈ 4 × t_FA.

### Carry Lookahead Adder (CLA) — Faster

Compute carries in parallel:
- Generate: G_i = A_i·B_i
- Propagate: P_i = A_i ⊕ B_i
- C_{i+1} = G_i + P_i·C_i

Expands to:
- C_1 = G_0 + P_0·C_0
- C_2 = G_1 + P_1·G_0 + P_1·P_0·C_0
- C_3 = G_2 + P_2·G_1 + P_2·P_1·G_0 + P_2·P_1·P_0·C_0
- C_4 = ...

All carries computed in ~2-3 gate delays regardless of width.

---

### Subtractor

A - B = A + (-B) = A + (2's complement of B) = A + B' + 1

**Full Subtractor (FS):**
| A | B | B_in | Diff | B_out |
|---|---|------|------|-------|
| 0 | 0 | 0    | 0    | 0     |
| 0 | 0 | 1    | 1    | 1     |
| 0 | 1 | 0    | 1    | 1     |
| 0 | 1 | 1    | 0    | 1     |
| 1 | 0 | 0    | 1    | 0     |
| 1 | 0 | 1    | 0    | 0     |
| 1 | 1 | 0    | 0    | 0     |
| 1 | 1 | 1    | 1    | 1     |

Diff = A ⊕ B ⊕ B_in
B_out = A'B + A'B_in + B·B_in

**4-Bit Subtractor:** Use adder with B inverted and C_in = 1.

---

## Section 3 — Data Routing Circuits

### Multiplexer (MUX) — "Data Selector"

Selects one of 2ⁿ inputs based on n select lines.

**2-to-1 MUX:**
| S | Output |
|---|--------|
| 0 | D₀     |
| 1 | D₁     |

Y = S'·D₀ + S·D₁

**4-to-1 MUX:**
| S₁ | S₀ | Output |
|----|----|--------|
| 0  | 0  | D₀     |
| 0  | 1  | D₁     |
| 1  | 0  | D₂     |
| 1  | 1  | D₃     |

Y = S₁'S₀'D₀ + S₁'S₀D₁ + S₁S₀'D₂ + S₁S₀D₃

**8-to-1 MUX:** 3 select lines, 8 inputs.

**Implementing Boolean Functions with MUX:**
- Use select lines for some variables
- Connect data inputs to 0, 1, variable, or variable'
- Example: F(A,B,C) with 4-to-1 MUX (S₁=A, S₀=B):
  - D₀ = F(0,0,C) = C
  - D₁ = F(0,1,C) = C'
  - D₂ = F(1,0,C) = 1
  - D₃ = F(1,1,C) = 0

---

### Demultiplexer (DEMUX) — "Data Distributor"

Opposite of MUX: 1 input → 2ⁿ outputs based on select.

**1-to-4 DEMUX:**
| S₁ | S₀ | Outputs (Y₀,Y₁,Y₂,Y₃) |
|----|----|----------------------|
| 0  | 0  | D, 0, 0, 0          |
| 0  | 1  | 0, D, 0, 0          |
| 1  | 0  | 0, 0, D, 0          |
| 1  | 1  | 0, 0, 0, D          |

---

### Decoder

n inputs → 2ⁿ outputs. Exactly one output active (HIGH) for each input code.

**2-to-4 Decoder:**
| A | B | Y₀ | Y₁ | Y₂ | Y₃ |
|---|---|----|----|----|----|
| 0 | 0 | 1  | 0  | 0  | 0  |
| 0 | 1 | 0  | 1  | 0  | 0  |
| 1 | 0 | 0  | 0  | 1  | 0  |
| 1 | 1 | 0  | 0  | 0  | 1  |

**Expressions:**
- Y₀ = A'B'
- Y₁ = A'B
- Y₂ = AB'
- Y₃ = AB

**Decoder with Enable (E):**
All outputs 0 when E=0. Normal operation when E=1.

**Build larger decoders:** 3-to-8 from two 2-to-4 + enable.

---

### Encoder

2ⁿ inputs → n outputs. Output = binary code of active input.

**4-to-2 Encoder:**
| Y₀ | Y₁ | Y₂ | Y₃ | A | B |
|----|----|----|----|---|---|
| 1  | 0  | 0  | 0  | 0 | 0 |
| 0  | 1  | 0  | 0  | 0 | 1 |
| 0  | 0  | 1  | 0  | 1 | 0 |
| 0  | 0  | 0  | 1  | 1 | 1 |

**Priority Encoder:** If multiple inputs active, highest priority wins.

---

## Section 4 — Code Converters

### Binary to Gray Code

Gray code: adjacent values differ by 1 bit.

**Conversion:** G_i = B_i ⊕ B_{i+1} (with B_n = 0)
| Binary | Gray |
|--------|------|
| 0000   | 0000 |
| 0001   | 0001 |
| 0010   | 0011 |
| 0011   | 0010 |
| 0100   | 0110 |

**Circuit:** XOR chain.

### Gray to Binary

B_i = G_i ⊕ B_{i+1} (with B_n = 0)

---

### BCD to Excess-3

Excess-3 = BCD + 3.

**Example:** 5 (0101) + 3 = 8 (1000) → Excess-3 = 1000

---

## Section 5 — Comparators

### 1-Bit Magnitude Comparator

| A | B | A>B | A=B | A<B |
|---|---|-----|-----|-----|
| 0 | 0 | 0   | 1   | 0   |
| 0 | 1 | 0   | 0   | 1   |
| 1 | 0 | 1   | 0   | 0   |
| 1 | 1 | 0   | 1   | 0   |

A>B = A·B'
A=B = A⊙B = (A⊕B)'
A<B = A'·B

---

### 4-Bit Comparator (74LS85)

Cascade: compare MSB first, if equal go to next bit.

**Logic:**
- (A>B)_out = A₃>B₃ + (A₃=B₃)·(A>B)_in
- (A=B)_out = (A₃=B₃)·(A=B)_in
- (A<B)_out = A₃<B₃ + (A₃=B₃)·(A<B)_in

---

## Section 6 — Parity Generators/Checkers

### Even Parity Generator

Output = 1 if odd number of 1s in input (makes total even).

**3-bit:** P = A ⊕ B ⊕ C

### Even Parity Checker

Input + parity bit. Output = 1 if error (odd total 1s).

**4-bit (3 data + 1 parity):** Error = A ⊕ B ⊕ C ⊕ P

---

## Section 7 — Past Exam Circuit Analysis

### Problem: Find Output Expression from Logic Diagram

**Given:** Diagram with inputs A,B,C,D and gate network.

**Method:**
1. Label each gate output with expression
2. Work from inputs to output
3. Simplify if needed

**Example:** 
```
A ──[NOT]──┐
           ├──[AND]──┐
B ─────────┤         ├──[OR]── F
           │         │
C ─────────┤         │
           └──[AND]──┘
D ─────────┘
```

Outputs:
- Gate 1 (NOT A): A'
- Gate 2 (AND): A'·B
- Gate 3 (AND): C·D
- Gate 4 (OR): F = A'·B + C·D

---

### Problem: Circuit with Feedback (Not Combinational!)

**If output feeds back to input:** Sequential circuit!
**Exam trick:** "What is the output expression?" → If feedback, answer: "Not combinational — has memory/state."

---

## Section 7 — Hazard Analysis

### Static-1 Hazard

Output should stay 1 but momentarily goes 0 during input transition.

**Cause:** Two paths with different delays converge.
**Fix:** Add redundant term (consensus).

**Example:** F = A'B + AC
Transition A=1,B=1,C=1 → A=0.
- Path 1: A'B = 1 (A' goes 0→1, B=1)
- Path 2: AC = 1→0 (A goes 1→0)
If path 2 faster, momentary 0.

**Fix:** Add consensus term BC.
F = A'B + AC + BC (hazard-free)

---

## Section 8 — Self-Check Problems

1. Design a 4-bit adder-subtractor with mode control (M=0: add, M=1: subtract)
2. Implement F(A,B,C) = Σm(1,2,4,7) using 8-to-1 MUX
3. Implement same function using 4-to-1 MUX (S₁=A, S₀=B)
4. Design 2-to-4 decoder with enable using NAND gates only
5. Draw circuit for 4-to-2 priority encoder
6. Find output of: A,B → XOR → AND with C → OR with D
7. Binary-to-Gray converter for 3 bits

---

## Solutions

1. **Adder-Subtractor:** XOR each B bit with mode M. C_in = M. (B⊕0=B, B⊕1=B'. Add 1 when M=1 via C_in).
2. **8-to-1 MUX:** S₂=A, S₁=B, S₀=C. D₁=D₂=D₄=D₇=1, others 0.
3. **4-to-1 MUX:** S₁=A, S₀=B. D₀=F(0,0,C)=C, D₁=F(0,1,C)=C', D₂=F(1,0,C)=C', D₃=F(1,1,C)=C. (Check: m1=001→C, m2=010→C', m4=100→C', m7=111→C)
4. **2-to-4 Decoder (NAND):** Y_i = (A'... )' = NAND of complemented inputs. With enable: NAND(E, inputs).
5. **Priority Encoder:** Y₁ = D₃+D₂, Y₀ = D₃+D₁·D₂'. Valid = D₃+D₂+D₁+D₀.
6. **F = (A⊕B)·C + D = (A'B+AB')C + D = A'BC + ABC' + D**
7. **3-bit Gray:** G₂=B₂, G₁=B₂⊕B₁, G₀=B₁⊕B₀

---

## Glossary Terms

[[combinational-circuit]], [[half-adder]], [[full-adder]], [[ripple-carry-adder]], [[carry-lookahead-adder]], [[subtractor]], [[multiplexer]], [[mux]], [[demultiplexer]], [[demux]], [[decoder]], [[encoder]], [[priority-encoder]], [[comparator]], [[magnitude-comparator]], [[parity-generator]], [[parity-checker]], [[gray-code]], [[excess-3]], [[bcd]], [[code-converter]], [[hazard]], [[static-hazard]], [[dynamic-hazard]], [[consensus-term]], [[glitch]], [[fan-out]], [[propagation-delay]], [[critical-path]], [[msi]], [[lsi]], [[vlsi]]
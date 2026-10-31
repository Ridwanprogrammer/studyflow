# CSC 215 Topic 5: Sequential Logic Circuits — Enhanced

## The Central Idea

**Sequential circuits** have **memory** — outputs depend on current inputs **AND** stored state. The state changes at specific times (clock edges for synchronous, level changes for asynchronous).

This topic covers latches, flip-flops, timing, state diagrams, and analysis/design of sequential circuits.

---

## Why It Matters — Past Exam Coverage

| Past Exam Question | This Topic Covers |
|--------------------|-------------------|
| Latch vs flip-flop timing | Level-sensitive vs edge-triggered |
| D flip-flop operation | Setup/hold, characteristic equation |
| State diagram / table | Sequential circuit analysis |
| Counter design | Flip-flop applications |
| Setup/hold time | Timing parameters |

---

## Section 1 — Latches (Level-Sensitive)

### SR Latch (NOR)

```
S ──┬──[NOR]──── Q
    │          │
R ──┴──[NOR]──── Q'
```

| S | R | Q | Q' | Action |
|---|---|---|----|--------|
| 0 | 0 | Q | Q' | Hold (memory) |
| 0 | 1 | 0 | 1  | Reset |
| 1 | 0 | 1 | 0  | Set |
| 1 | 1 | 0 | 0  | **Invalid** (both 0) |

**Characteristic:** Q⁺ = S + R'·Q (with SR=0 constraint)

---

### SR Latch (NAND) — Active Low

```
S' ──┬──[NAND]──── Q
     │           │
R' ──┴──[NAND]──── Q'
```

| S' | R' | Q | Q' |
|----|----|---|----|
| 1  | 1  | Q | Q' | Hold |
| 0  | 1  | 1 | 0  | Set (S'=0) |
| 1  | 0  | 0 | 1  | Reset (R'=0) |
| 0  | 0  | 1 | 1  | **Invalid** |

---

### D Latch (Gated D Latch)

Add enable (E) to prevent invalid state.

```
D ──┬──[AND]──┐
    │         │
E ──┤         ├──[NOR]── Q
    │         │
E'──┤         ├──[NOR]── Q'
    │         │
D'──┴──[AND]──┘
```

| E | D | Q⁺ |
|---|---|----|
| 0 | X | Q  | Hold (transparent when E=0? No, when E=1) |
| 1 | 0 | 0  | Reset |
| 1 | 1 | 1  | Set |

**When E=1:** Transparent (Q follows D)
**When E=0:** Latched (Q holds last value)

**Characteristic:** Q⁺ = E·D + E'·Q

---

## Section 2 — Flip-Flops (Edge-Triggered)

### Key Difference: Latch vs Flip-Flop

| Property | Latch | Flip-Flop |
|----------|-------|-----------|
| **Sensitivity** | Level | Edge |
| **Transparency** | When enabled | Never (samples at edge) |
| **Timing** | Setup/hold during entire pulse | Setup/hold around clock edge |
| **Speed** | Faster | Slightly slower |
| **Use** | Async, simple storage | Sync, reliable state |

---

### D Flip-Flop (Positive Edge-Triggered)

**Symbol:** Triangle (clock) → D input, Q output

**Characteristic Table:**
| D | Q⁺ |
|---|----|
| 0 | 0  |
| 1 | 1  |

**Characteristic Equation:** Q⁺ = D

**Timing Diagram:**
```
CLK:  __/¯¯\__/¯¯\__/¯¯\__
D:    _______/¯¯¯¯¯¯\____
Q:    _______/¯¯¯¯¯¯\____   (Q changes at ↑ CLK)
```

**Setup Time (t_setup):** D must be stable BEFORE clock edge
**Hold Time (t_hold):** D must be stable AFTER clock edge
**Propagation Delay (t_pd):** CLK-to-Q delay

---

### JK Flip-Flop

**Universal** — can implement D, T, SR behavior.

| J | K | Q⁺ |
|---|---|----|
| 0 | 0 | Q  | Hold |
| 0 | 1 | 0  | Reset |
| 1 | 0 | 1  | Set |
| 1 | 1 | Q' | Toggle |

**Characteristic Equation:** Q⁺ = J·Q' + K'·Q

**From D FF:** J = D, K = D'
**From T FF:** J = T, K = T

---

### T Flip-Flop (Toggle)

| T | Q⁺ |
|---|----|
| 0 | Q  | Hold |
| 1 | Q' | Toggle |

**Characteristic:** Q⁺ = T ⊕ Q

**From JK:** J = T, K = T
**From D:** D = T ⊕ Q

---

## Section 3 — Timing Parameters (Critical for Exams)

| Parameter | Symbol | Definition |
|-----------|--------|------------|
| **Setup Time** | t_su | Min time data stable BEFORE clock edge |
| **Hold Time** | t_h | Min time data stable AFTER clock edge |
| **Clock-to-Q Delay** | t_pd | Max delay from clock edge to Q change |
| **Clock Period** | T_clk | Must satisfy: T_clk ≥ t_pd + t_su + t_comb |
| **Max Frequency** | f_max | 1 / T_clk_min |

**Metastability:** If setup/hold violated, FF may enter intermediate voltage level. Resolve with synchronizers (two FF chain).

---

## Section 4 — Flip-Flop Excitation Tables

**Used for design:** Given current Q and desired Q⁺, what inputs needed?

| Q | Q⁺ | S | R | D | J | K | T |
|---|----|---|---|---|---|---|---|
| 0 | 0  | 0 | X | 0 | 0 | X | 0 |
| 0 | 1  | 1 | 0 | 1 | 1 | X | 1 |
| 1 | 0  | 0 | 1 | 0 | X | 1 | 1 |
| 1 | 1  | X | 0 | 1 | X | 0 | 0 |

(X = don't care)

---

## Section 5 — Sequential Circuit Analysis

### Steps:
1. **Identify flip-flops** and their types
2. **Write excitation equations** for each FF input
3. **Substitute into characteristic equations** to get next-state equations
4. **Derive state table** (present state, input → next state, output)
5. **Draw state diagram**

### Example: Circuit with 2 D-FFs

```
A ──┬──[XOR]── D₁
    │
Q₁──┤
    │
Q₂──┴──[AND]── D₂

CLK → FF1, FF2
Output Z = Q₁ ⊕ Q₂
```

**Excitation:**
- D₁ = A ⊕ Q₁
- D₂ = Q₁ · Q₂

**Next-State:**
- Q₁⁺ = A ⊕ Q₁
- Q₂⁺ = Q₁ · Q₂

**State Table (Q₁Q₂ as state):**

| Present | Input A | Next State | Output Z |
|---------|---------|------------|----------|
| 00      | 0       | 00         | 0        |
| 00      | 1       | 10         | 0        |
| 01      | 0       | 01         | 1        |
| 01      | 1       | 11         | 1        |
| 10      | 0       | 10         | 1        |
| 10      | 1       | 00         | 1        |
| 11      | 0       | 10         | 0        |
| 11      | 1       | 01         | 0        |

---

## Section 6 — Sequential Circuit Design

### Steps:
1. **State diagram** from specification
2. **State table** (assign binary codes to states)
3. **Choose FF type** (D, JK, T)
4. **Excitation table** for chosen FFs
5. **K-map simplify** FF input equations
6. **Output equations**
7. **Draw logic diagram**

### Example: Sequence Detector (101)

**State Diagram:**
```
S0 --0/0--> S0
S0 --1/0--> S1
S1 --0/0--> S2
S1 --1/0--> S1
S2 --0/0--> S0
S2 --1/1--> S1  (detected 101!)
```

**State Assignment:** S0=00, S1=01, S2=10 (3 states, 2 FFs)

**State Table:**
| Present | Input | Next | Output |
|---------|-------|------|--------|
| 00      | 0     | 00   | 0      |
| 00      | 1     | 01   | 0      |
| 01      | 0     | 10   | 0      |
| 01      | 1     | 01   | 0      |
| 10      | 0     | 00   | 0      |
| 10      | 1     | 01   | 1      |

**Use D FFs:**
- D₁ = Q₁'·Q₂'·X + Q₁·Q₂'·X + Q₁'·Q₂·X'
- D₂ = Q₁'·Q₂·X'
- Z = Q₁·Q₂'·X

Simplify with K-maps, implement.

---

## Section 7 — Counters (Sequential Circuit Application)

### Asynchronous (Ripple) Counter

FF clock inputs cascaded: Q₀ → CLK₁ → CLK₂ → CLK₃
**Problem:** Ripple delay accumulates. Not good for high speed.

### Synchronous Counter

All FFs share common clock. Control logic determines next state.

**4-Bit Binary Up Counter (JK FFs):**
- FF0: J=K=1 (toggles every clock)
- FF1: J=K=Q₀ (toggles when Q₀=1)
- FF2: J=K=Q₀·Q₁
- FF3: J=K=Q₀·Q₁·Q₂

**Mod-N Counter:** Reset when count = N.
- Detect N, assert synchronous reset (or asynchronous clear).

### Decade Counter (Mod-10)

Count 0-9, reset to 0.
States: 0000 to 1001. Skip 1010-1111.
Can use 74LS90 or design with JK FFs + decode 1010 for reset.

### Johnson Counter (Twisted Ring)

```
Q₀ ──┐
Q₁ ──┤
Q₂ ──┤──[Shift Register]── Q₃ ──┐
Q₃'─┘                           │
                                 └──→ Q₀ (feedback)
```
Sequence for 4-bit: 0000 → 1000 → 1100 → 1110 → 1111 → 0111 → 0011 → 0001 → 0000
**8 states** (2n for n bits).

### Ring Counter

```
Q₀ ──┐
Q₁ ──┤
Q₂ ──┤──[Shift Register]── Q₃ ──┘
Q₃──┘   (feedback Q₃ → Q₀)
```
One hot: 1000 → 0100 → 0010 → 0001 → 1000
**n states** for n bits.

---

## Section 8 — Finite State Machines (FSM)

### Mealy Machine
Output depends on **state AND input**.
```
State ──[Next State Logic]── State⁺
  │                              │
  └──[Output Logic (state, in)]── Output
```

### Moore Machine
Output depends **only on state**.
```
State ──[Next State Logic]── State⁺
  │
  └──[Output Logic (state)]── Output
```

**Comparison:**
- Mealy: Fewer states, output can change mid-cycle
- Moore: More states, synchronous output, safer for timing

---

## Section 9 — Past Exam Sequential Problems

### Problem: D Flip-Fop with A=1010, B=1100

> *Given A=1010, B=1100, prove A'·B' = (A+B)'*

This is De Morgan verification with bitwise operations (covered in Topic 2).

---

### Problem: Analyze Given Sequential Circuit

**Typical exam question:** Circuit diagram with FFs and gates. Find:
1. Type of FFs
2. Next-state equations
3. State table
4. State diagram
5. What sequence does it generate?

**Method:** Label all signals, write equations, build table.

---

### Problem: Design Mod-6 Counter

Count 0,1,2,3,4,5, repeat.

**States:** 000,001,010,011,100,101 (3 FFs)
**Unused:** 110, 111 → don't-cares or self-correcting.

**JK Excitation for Mod-6:**
| Present | Next | J₂ K₂ | J₁ K₁ | J₀ K₀ |
|---------|------|-------|-------|-------|
| 000     | 001  | 0 X   | 0 X   | 1 X   |
| 001     | 010  | 0 X   | 1 X   | X 1   |
| 010     | 011  | 0 X   | X 0   | 1 X   |
| 011     | 100  | 1 X   | X 1   | X 1   |
| 100     | 101  | X 0   | 0 X   | 1 X   |
| 101     | 000  | X 1   | X 1   | X 1   |
| 110     | X    | X X   | X X   | X X   |
| 111     | X    | X X   | X X   | X X   |

K-map simplify each J/K.

---

## Section 10 — Self-Check Problems

1. Draw timing diagram for D latch vs D FF with same D, CLK
2. Derive characteristic eqn for JK FF: Q⁺ = JQ' + K'Q
3. Design T FF from D FF
4. Design D FF from JK FF
5. Analyze: 2 JK FFs, J₁=K₁=1, J₂=K₂=Q₁. What sequence?
6. Setup time = 2ns, hold = 1ns, clk-to-Q = 3ns, combo delay = 5ns. Max freq?
7. Design Mod-5 counter with JK FFs
8. Draw state diagram for sequence detector "110"

---

## Solutions

1. **D Latch:** Q follows D when E=1. **D FF:** Q changes only at ↑CLK.
2. From table: Q⁺ = JQ' + K'Q. Verify all 4 rows.
3. T FF from D: D = T ⊕ Q
4. D FF from JK: J=D, K=D'
5. Q₁ toggles always. Q₂ toggles when Q₁=1.
   Sequence: Q₂Q₁: 00→01→10→11→00... (binary up counter)
6. T_min = 3+5+2 = 10ns. f_max = 100 MHz.
7. Mod-5: 3 FFs (000-100). Detect 101 for reset.
8. States: S0(0)→S1(1)→S2(11)→S0 on 0. Output 1 at S2 with input 0.

---

## Glossary Terms

[[sequential-circuit]], [[latch]], [[flip-flop]], [[sr-latch]], [[d-latch]], [[d-flip-flop]], [[jk-flip-flop]], [[t-flip-flop]], [[level-sensitive]], [[edge-triggered]], [[positive-edge]], [[negative-edge]], [[setup-time]], [[hold-time]], [[propagation-delay]], [[clock-to-q]], [[metastability]], [[synchronizer]], [[excitation-table]], [[characteristic-equation]], [[state-table]], [[state-diagram]], [[state-assignment]], [[mealy-machine]], [[moore-machine]], [[finite-state-machine]], [[fsm]], [[counter]], [[ripple-counter]], [[synchronous-counter]], [[mod-n-counter]], [[decade-counter]], [[johnson-counter]], [[ring-counter]], [[shift-register]], [[self-correcting-counter]], [[unused-states]], [[don't-care-states]]
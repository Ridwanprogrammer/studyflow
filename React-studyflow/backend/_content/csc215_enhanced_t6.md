# CSC 215 Topic 6: Registers and Counters — Enhanced

## The Central Idea

**Registers** hold multi-bit values. **Counters** are registers with built-in sequencing logic. Both are built from flip-flops and form the backbone of CPU datapaths, control units, and timing circuits.

---

## Section 1 — Registers

### Definition
A **register** is a group of flip-flops sharing a common clock, used to store a binary word.

### Register Types

| Type | Function | Control Signals |
|------|----------|-----------------|
| **Parallel-in, Parallel-out (PIPO)** | Load all bits simultaneously | Load, CLK |
| **Serial-in, Serial-out (SISO)** | Shift in/out 1 bit per clock | CLK |
| **Serial-in, Parallel-out (SIPO)** | Shift in, read all at once | CLK |
| **Parallel-in, Serial-out (PISO)** | Load all, shift out | Load/Shift, CLK |
| **Universal Shift Register** | All of the above | Mode select (S1,S0), CLK |

---

### 4-Bit PIPO Register (D FFs)

```
D₃ ──[D FF]── Q₃
D₂ ──[D FF]── Q₂
D₁ ──[D FF]── Q₁
D₀ ──[D FF]── Q₀
     CLK (common)
     Load (enable) — if Load=1, load new data; else hold
```

**With Load Enable:**
```
D ──[MUX]──┬──[D FF]── Q
           │
Q ─────────┘
     Load
```
When Load=1: D→FF. When Load=0: Q→FF (hold).

---

### Shift Registers

**Right Shift (SIPO):**
```
Serial In ──[FF0]──[FF1]──[FF2]──[FF3]── Serial Out
             Q₀     Q₁     Q₂     Q₃
                   ↑ Parallel Out
```

**Left Shift:** Reverse connections.

**Bidirectional Shift Register:**
Mode control selects direction.

---

### Universal Shift Register (74LS194)

| S₁ | S₀ | Operation |
|----|----|-----------|
| 0  | 0  | Hold (inhibit clock) |
| 0  | 1  | Shift Right |
| 1  | 0  | Shift Left |
| 1  | 1  | Parallel Load |

---

### CPU Registers (Special Purpose)

| Register | Purpose | Width |
|----------|---------|-------|
| **PC** (Program Counter) | Address of next instruction | 16/32/64-bit |
| **IR** (Instruction Register) | Current instruction | 16/32-bit |
| **MAR** (Memory Address Register) | Address for memory access | Address width |
| **MDR** (Memory Data Register) | Data to/from memory | Data width |
| **ACC** (Accumulator) | ALU results | Data width |
| **SP** (Stack Pointer) | Top of stack | Address width |
| **PSR** (Processor Status) | Flags (Z,N,C,V) | 8+ bits |
| **GPRs** (General Purpose) | Data, addresses | Data width |

---

## Section 2 — Counters

### Counter = Register + Next-State Logic

### Asynchronous (Ripple) Counter

```
CLK ──[T FF]── Q₀ ──┐
                    ├──[T FF]── Q₁ ──┐
                              Q₁ ────┤
                                     ├──[T FF]── Q₂ ──┐
                                              Q₂ ────┤
                                                     ├──[T FF]── Q₃
```

- Q₀ toggles every clock
- Q₁ toggles when Q₀ falls (1→0) — negative edge
- Q₂ toggles when Q₁ falls
- **Delay accumulates** — not good for high frequency

### Synchronous Counter

All FFs clocked together. Next-state logic computes J/K or D inputs.

**4-Bit Binary Up Counter (JK):**
| FF | J | K | Toggles When |
|----|---|---|--------------|
| FF0 | 1 | 1 | Every clock |
| FF1 | Q₀ | Q₀ | Q₀=1 |
| FF2 | Q₀·Q₁ | Q₀·Q₁ | Q₀=Q₁=1 |
| FF3 | Q₀·Q₁·Q₂ | Q₀·Q₁·Q₂ | Q₀=Q₁=Q₂=1 |

**4-Bit Binary Up Counter (D FFs):**
- D₀ = Q₀'
- D₁ = Q₁ ⊕ Q₀
- D₂ = Q₂ ⊕ (Q₁·Q₀)
- D₃ = Q₃ ⊕ (Q₂·Q₁·Q₀)

---

### Mod-N Counter

Count 0 to N-1, then reset to 0.

**Mod-6 Counter (0-5):**
3 FFs (000 to 101). Detect 110 (6) → synchronous reset.

**Synchronous Reset (preferred):**
```
Reset = Q₂·Q₁·Q₀'  (detect 110? Wait, 6=110. Reset at 6.)
Actually: count 0,1,2,3,4,5. Next should be 0.
At 5 (101), next is 110. Detect 110 → reset to 000.
Reset = Q₂·Q₁·Q₀'  (110)
```

**Asynchronous Reset (faster but glitchy):**
Connect Reset to CLR inputs. Risk: reset pulse too short.

---

### Decade Counter (Mod-10, BCD)

Count 0-9 (0000 to 1001). 4 FFs.
Reset at 1010 (10).

**74LS90 Decade Counter:**
- Internal: Mod-2 + Mod-5
- Can cascade for multi-digit BCD counting

---

### Counter with Parallel Load

```
Load ──┐
       ├──[MUX]──[D FF]── Q
Count ─┤
       │
Q ─────┘
```

When Load=1: parallel data loaded.
When Count=1: increment (Q+1).
When both 0: hold.

---

### Up/Down Counter

Direction control (UP/DOWN):
- UP=1: Q⁺ = Q + 1
- DOWN=1: Q⁺ = Q - 1

**Logic:** Use adder/subtractor or separate next-state logic.

---

### Presettable Counter

Can be loaded with any starting value (asynchronous or synchronous preset).

---

## Section 3 — Counter Applications

### Frequency Division
- Divide by 2ⁿ: n-bit counter, use MSB
- Divide by N: mod-N counter, use terminal count

### Event Counting
Count pulses from sensor. Read register periodically.

### Timing Generation
- Generate specific delays: count clock cycles
- PWM: compare counter with duty cycle register

### Address Generation
Program counter, stack pointer, DMA address counter.

---

## Section 4 — Counter Design Examples

### Example 1: Mod-6 Up Counter (JK FFs)

**State Sequence:** 000→001→010→011→100→101→000...

**Excitation Table:**
| Present Q₂Q₁Q₀ | Next | J₂ K₂ | J₁ K₁ | J₀ K₀ |
|----------------|------|-------|-------|-------|
| 000            | 001  | 0 X   | 0 X   | 1 X   |
| 001            | 010  | 0 X   | 1 X   | X 1   |
| 010            | 011  | 0 X   | X 0   | 1 X   |
| 011            | 100  | 1 X   | X 1   | X 1   |
| 100            | 101  | X 0   | 0 X   | 1 X   |
| 101            | 000  | X 1   | X 1   | X 1   |
| 110            | X    | X X   | X X   | X X   |
| 111            | X    | X X   | X X   | X X   |

**K-map Simplification:**
- J₀ = K₀ = 1 (always toggle)
- J₁ = K₁ = Q₀
- J₂ = K₂ = Q₁·Q₀
- Reset: when Q₂·Q₁·Q₀' = 1 (state 110), force to 000

**Implementation:**
- Add AND gate detecting 110, connect to asynchronous CLR of all FFs
- Or synchronous: modify J/K for state 101 to go to 000

---

### Example 2: 3-Bit Gray Code Counter

Sequence: 000→001→011→010→110→111→101→100→000...

**Excitation for JK:**
| Present | Next | J₂ K₂ | J₁ K₁ | J₀ K₀ |
|---------|------|-------|-------|-------|
| 000     | 001  | 0 X   | 0 X   | 1 X   |
| 001     | 011  | 0 X   | 1 X   | X 0   |
| 011     | 010  | 0 X   | X 1   | X 1   |
| 010     | 110  | 1 X   | X 0   | 0 X   |
| 110     | 111  | X 0   | X 0   | 1 X   |
| 111     | 101  | X 0   | 0 X   | X 1   |
| 101     | 100  | X 1   | 1 X   | X 0   |
| 100     | 000  | X 1   | X 1   | X 1   |

**Simplify each J/K with K-maps.**

---

### Example 3: Johnson Counter (4-bit)

**Sequence:** 0000→1000→1100→1110→1111→0111→0011→0001→0000

**Implementation:** 4-bit shift register with Q₃' fed back to D₀.

**Mod-8** (2n states for n bits).

---

### Example 4: Ring Counter (4-bit)

**Sequence:** 1000→0100→0010→0001→1000

**Implementation:** 4-bit shift register with Q₃ fed back to D₀. Initialize with 1000.

**Mod-4** (n states for n bits).

---

## Section 5 — Register/Counter Timing

### Critical Path
- **Register:** t_pd (CLK-to-Q) + t_setup (next stage)
- **Synchronous Counter:** t_pd + t_comb (next-state logic) + t_setup
- **Ripple Counter:** n × t_pd (accumulated)

### Maximum Frequency
f_max = 1 / (t_pd + t_comb + t_setup)

**Example:** t_pd=3ns, t_comb=5ns, t_setup=2ns → T_min=10ns → f_max=100MHz

---

## Section 6 — Past Exam Counter Problems

### Problem: 4-Bit Binary Counter Sequence

> *A 4-bit binary counter cycles: 0000→0001→0010→...→1111→0000. How many states?*

**Answer:** 16 states (0-15). Mod-16.

### Problem: Counter Modulus

> *A 4-bit counter with modulus 16. What happens after 1111?*

**Answer:** Wraps to 0000. Modulo-16 behavior.

### Problem: Ripple vs Synchronous

> *Difference between asynchronous and synchronous counter?*

**Answer:**
- Asynchronous: FFs clocked sequentially, delay accumulates, simpler hardware
- Synchronous: All FFs clocked together, faster, needs next-state logic

### Problem: Counter with Load

> *Design 4-bit counter with parallel load, count enable, and synchronous reset.*

**Signals:** CLK, Load, Count, Reset, D[3:0], Q[3:0]
**Logic:**
- If Reset: Q⁺ = 0
- Else if Load: Q⁺ = D
- Else if Count: Q⁺ = Q + 1
- Else: Q⁺ = Q

---

## Section 7 — Self-Check Problems

1. Design 4-bit shift register with parallel load (74LS194 style)
2. Design 4-bit synchronous up/down counter with D FFs
3. What is the modulus of a 5-bit Johnson counter?
4. Design a counter that counts: 0,2,4,6,1,3,5,7,0... (even then odd)
5. Maximum frequency for 8-bit ripple counter if t_pd=5ns per FF?
6. Draw state diagram for Mod-5 counter (0-4)

---

## Solutions

1. **Universal Shift Register:** 4 D-FFs, 2:1 muxes per FF for mode select (S1,S0). Modes: 00=hold, 01=right, 10=left, 11=load.
2. **Up/Down Counter:** D = Q ⊕ (Count·(Up⊕Down))? Better: D = Up'·(Q-1) + Up·(Q+1) with mux.
3. **5-bit Johnson:** 2n = 10 states. Mod-10.
4. **Even-Odd Counter:** 4-bit counter where LSB toggles every other count? Sequence: 000,010,100,110,001,011,101,111. Use 3-bit counter for sequence 0-7, map to output: {Q₂,Q₁,Q₀'} or similar.
5. **8-bit Ripple:** 8 × 5ns = 40ns period. f_max = 25MHz.
6. **Mod-5 State Diagram:** 5 states (000,001,010,011,100), 3 FFs. Transitions: 000→001→010→011→100→000. Unused 101,110,111 → don't-care or self-correct to 000.

---

## Glossary Terms

[[register]], [[parallel-in-parallel-out]], [[serial-in-serial-out]], [[serial-in-parallel-out]], [[parallel-in-serial-out]], [[universal-shift-register]], [[mode-select]], [[cpu-registers]], [[program-counter]], [[instruction-register]], [[memory-address-register]], [[memory-data-register]], [[accumulator]], [[stack-pointer]], [[processor-status-register]], [[general-purpose-register]], [[counter]], [[ripple-counter]], [[synchronous-counter]], [[asynchronous-counter]], [[mod-n-counter]], [[decade-counter]], [[bcd-counter]], [[up-down-counter]], [[presettable-counter]], [[johnson-counter]], [[ring-counter]], [[twisted-ring-counter]], [[shift-register-counter]], [[terminal-count]], [[synchronous-reset]], [[asynchronous-reset]], [[maximum-frequency]], [[critical-path]], [[propagation-delay]], [[setup-time]], [[hold-time]], [[clock-skew]]
# Registers and Counters

## Store several bits and update them in a coordinated way

A flip-flop stores one bit. A group of flip-flops sharing a clock and control signals forms a **register**, which stores a multi-bit value. A **counter** is a register with logic that updates its value in a prescribed sequence.

Registers and counters are the small state-holding building blocks inside processors, timers, communication interfaces, and digital controllers.

## Register types describe how data moves

A register has two useful characteristics: how bits enter or leave, and whether the register can shift or load in parallel.

| Type | Input | Output | Typical use |
|---|---|---|---|
| SISO | Serial | Serial | Delay a stream of bits |
| SIPO | Serial | Parallel | Convert incoming bits to a word |
| PISO | Parallel | Serial | Send a word over one data line |
| PIPO | Parallel | Parallel | Hold or transfer a word |

“Serial” means one bit at a time; “parallel” means several bits at once. A 4-bit PIPO register loads four inputs together and exposes four outputs.

### Shift registers

A shift register moves stored bits one position on each active clock event. For a right-shift register with serial input $d$, the next state may be

$$Q_3^+=d,\quad Q_2^+=Q_3,\quad Q_1^+=Q_2,\quad Q_0^+=Q_1.$$

The superscript plus means next state, not arithmetic addition. After a clock edge, each old bit has shifted one position. Shift registers can provide delays, serialize data, or temporarily hold data during conversion.

**Pause and predict:** If a 4-bit right-shift register contains `1011` and serial input is 0, after one shift its state is `0101` under the convention above.

## Counters follow a state sequence

An $n$-bit binary up-counter cycles through $2^n$ states, from 0 to $2^n-1$, then returns to zero. A 3-bit up-counter follows

```text
000 → 001 → 010 → 011 → 100 → 101 → 110 → 111 → 000
```

The sequence results from adding 1 at each active clock edge. A down-counter subtracts 1. An **asynchronous ripple counter** lets one flip-flop's output trigger the next, which is simple but accumulates propagation delay. A **synchronous counter** clocks all flip-flops together and uses combinational logic to determine which bits toggle.

A modulo-$N$ counter has $N$ states before repeating. The smallest number of flip-flops that can represent at least $N$ states is the smallest $n$ satisfying $2^n\ge N$. Unused binary states require a defined recovery behaviour if the design must be robust.

## Control and timing matter

Registers commonly include clear, preset, enable, and load controls. A synchronous clear takes effect on a clock edge; an asynchronous clear can take effect independently of the clock. The circuit symbol and specification determine which is intended.

Propagation delay limits how quickly state can update. In a ripple counter, the worst-case delay may pass through multiple stages; in a synchronous design, the critical path is through its next-state logic. The clock period must allow the slowest relevant path to settle.

## Practice

1. How many states can a 5-bit binary counter represent?
2. How many flip-flops are needed for a modulo-10 counter?
3. What is the distinction between SIPO and PISO?

**Check:** 1. $2^5=32$. 2. Four, since $2^3<10\le2^4$. 3. SIPO accepts bits serially and presents a parallel word; PISO accepts a parallel word and sends bits serially.

# Sequential Logic Circuits

## Some circuits must remember what happened before

A combinational circuit reacts only to its current inputs. A room light with an ordinary switch is different: after the brief act of switching, the light remains in its new state. A sequential circuit needs this kind of memory. Its output depends on present inputs and stored state.

The basic memory element is a **latch** or **flip-flop**. A latch is level-sensitive: it can respond while an enable signal is at a specified level. A flip-flop is edge-triggered: it captures inputs at a clock transition. The clock coordinates when a digital system changes state.

## The SR latch: set, reset, and hold

An SR latch has a Set input and a Reset input and stores one bit. In a NOR-based active-high latch:

| S | R | Next state $Q$ |
|---:|---:|---|
| 0 | 0 | Hold previous value |
| 1 | 0 | Set to 1 |
| 0 | 1 | Reset to 0 |
| 1 | 1 | Invalid/forbidden |

The hold row is the memory: with neither command active, feedback keeps the previous state. The simultaneous set/reset row is forbidden for the basic NOR latch because it drives both outputs low and can leave the result unpredictable when released.

NAND-based SR latches use active-low inputs, often written $\overline S$ and $\overline R$. Their inactive condition is 1, not 0. Always check the circuit's bubbles and signal labels before using a truth table.

## A gated D latch avoids the forbidden input pair

A D latch has a Data input and an Enable input. When enabled, it follows D; when disabled, it holds its previous value:

| Enable | D | Next state |
|---:|---:|---|
| 0 | X | Hold |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

The symbol X means either value is acceptable in that row. The D latch is useful because it stores a single clean data value rather than requiring separate set and reset commands.

## A D flip-flop samples only at a clock edge

A positive-edge-triggered D flip-flop captures D when the clock changes from 0 to 1. Between edges, Q holds its value even if D changes. This distinction makes synchronous systems easier to coordinate: many state elements update at the same clock edge.

The characteristic equation is $Q_{next}=D$ at the active edge. Setup time and hold time specify how long D must remain stable around the edge; violating them can cause metastability, where the output takes an unpredictable time to settle.

**Pause and compare:** A latch is transparent during an active level; a flip-flop samples at an edge. If two flip-flops share a clock, their state transitions are coordinated to clock edges.

## JK and T flip-flops

A JK flip-flop improves on the SR behaviour: when both J and K are 1, it toggles rather than entering the forbidden state.

| J | K | Next state |
|---:|---:|---|
| 0 | 0 | Hold |
| 0 | 1 | Reset |
| 1 | 0 | Set |
| 1 | 1 | Toggle |

A T flip-flop toggles when $T=1$ and holds when $T=0$. Toggle behaviour is useful in counters because a bit can change state at regular events.

## Design and analyze a synchronous sequence

To design a sequential circuit, identify the states the system must remember, assign a binary code to each state, derive next-state logic from inputs and current state, then verify every transition. A **state table** lists present state, inputs, next state, and outputs.

For example, a two-state controller may have states “idle” and “busy.” An input `start` moves idle to busy; a `done` input moves busy to idle. The state bit is the memory; combinational logic determines its next value.

**Practice:** A positive-edge D flip-flop has $D=1$ before a rising edge and $D=0$ afterward. What is Q between the first and second rising edges? It remains 1 until the next active edge, then captures 0.

## Common design cautions

- Distinguish active-high from active-low controls.
- Mark the clock edge explicitly.
- Include a reset or initial-state assumption when the sequence requires one.
- Avoid unintended latches in combinational logic; assign outputs in every branch.
- Do not infer the next state from D after the edge; the flip-flop captures the value at the edge.

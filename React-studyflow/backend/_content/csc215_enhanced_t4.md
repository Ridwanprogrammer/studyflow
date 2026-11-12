# Combinational Logic Circuits

## The output depends on what is happening now

A light controlled by a switch illustrates a simple digital system: the output is determined by the current switch position. A **combinational circuit** has this property—its outputs depend only on the current input values. It has no stored history.

This differs from a sequential circuit, whose output may also depend on a stored state from earlier input changes. Deciding whether a problem needs memory is the first design choice.

## Translate a specification into logic

To design a combinational circuit:

1. List and name the inputs and outputs.
2. Write a truth table covering every input combination.
3. Derive a Boolean expression for each output.
4. Simplify the expressions.
5. Draw the gates and verify that the circuit matches the table.

For $n$ binary inputs there are $2^n$ rows. A truth table is therefore a complete, checkable description of the circuit.

## Adders combine binary digits

### Half adder

A half adder adds two one-bit inputs $A$ and $B$. The sum is 1 when they differ, so $S=A\oplus B$. The carry is 1 only when both are 1, so $C=AB$.

| $A$ | $B$ | $S$ | $C$ |
|---:|---:|---:|---:|
| 0 | 0 | 0 | 0 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 1 |

It cannot accept a carry from a previous bit position, which is why it is called “half.”

### Full adder

A full adder adds $A$, $B$, and an incoming carry $C_{in}$. The sum is odd when an odd number of inputs are 1:

$$S=A\oplus B\oplus C_{in}.$$

The outgoing carry is 1 when at least two inputs are 1:

$$C_{out}=AB+AC_{in}+BC_{in}.$$

Full adders can be chained to add multi-bit numbers. The carry from each position becomes the input carry for the next position.

## Select or decode information

A **multiplexer** (MUX) selects one of several data inputs and routes it to one output. A 2-to-1 MUX with select $S$ gives

$$Y=S'D_0+SD_1.$$

When $S=0$, the output is $D_0$; when $S=1$, it is $D_1$. With $n$ select bits, a MUX can choose among $2^n$ inputs.

A **decoder** does the reverse style of job: an $n$-bit input code activates one of up to $2^n$ output lines. A 2-to-4 decoder, for example, maps each two-bit input to one active output. Decoders are used for address selection and instruction decoding.

A **demultiplexer** routes one input to one of several outputs, selected by control bits. An **encoder** converts one active input among several into a binary code. State the active-high or active-low convention before interpreting outputs.

## Build and check a small selector

Suppose a device can display either sensor $D_0$ or sensor $D_1$. A switch $S$ selects the desired reading. The MUX expression $Y=S'D_0+SD_1$ directly encodes the requirement. Check the two cases: at $S=0$, $Y=D_0$; at $S=1$, $Y=D_1$.

**Practice:** A one-bit comparator outputs 1 when inputs differ. Its truth table matches XOR: $A\oplus B$. A one-bit equality detector is XNOR: $(A\oplus B)'$.

## Read a circuit by following signals

When analyzing a diagram, label each gate output with an intermediate expression, then substitute those expressions into the final output. Compare the resulting truth table with the specification. This catches common mistakes such as swapping MUX data inputs, forgetting an inversion bubble, or using a half adder where a carry-in is required.

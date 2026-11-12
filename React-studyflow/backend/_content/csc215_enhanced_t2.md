# Boolean Algebra and Logic Gates

## A circuit can make a decision using two voltage states

A digital input is interpreted as one of two states: 0 or 1. We can think of 0 as false/off and 1 as true/on. A logic circuit combines these states to make decisions: for example, an alarm might turn on only when a sensor is active and the system is armed.

**Boolean algebra** is the mathematics of these two-valued decisions. A Boolean variable takes only 0 or 1. A Boolean function maps one or more such inputs to a single 0 or 1 output. A **logic gate** is the physical circuit that performs one of the Boolean operations.

## Start with the three basic operations

### NOT: reverse one state

NOT flips the input: a 0 becomes 1, and a 1 becomes 0. If the input is $A$, its complement is written $A'$ or $\overline A$.

| $A$ | $A'$ |
|---:|---:|
| 0 | 1 |
| 1 | 0 |

### AND: require all conditions

The output $AB$ is 1 only when both inputs are 1. Think of two switches in series: current flows only if both are closed.

### OR: accept either condition

The output $A+B$ is 1 when at least one input is 1, including when both are 1. Parallel switches illustrate this: either path can complete the circuit.

| $A$ | $B$ | $AB$ | $A+B$ |
|---:|---:|---:|---:|
| 0 | 0 | 0 | 0 |
| 0 | 1 | 0 | 1 |
| 1 | 0 | 0 | 1 |
| 1 | 1 | 1 | 1 |

Read $+$ as logical OR, not ordinary addition, and $AB$ as AND, not multiplication of numeric quantities. The symbols resemble arithmetic but obey Boolean rules.

**Pause and decide:** An indicator should turn on when a user is logged in and either an assignment is due or a reminder is enabled. If $L$ means logged in, $D$ means assignment due, and $R$ means reminder enabled, the condition is $L(D+R)$. The brackets say that either notification condition is enough, but login is required as well.

## Derived gates and their behaviour

The basic operations can be combined to make other gates.

| Gate | Boolean expression | When output is 1 |
|---|---|---|
| NAND | $(AB)'$ | Any input is 0 |
| NOR | $(A+B)'$ | Both inputs are 0 |
| XOR | $A\oplus B=A'B+AB'$ | Inputs differ |
| XNOR | $(A\oplus B)'$ | Inputs agree |

NAND and NOR are **universal gates**: any Boolean function can be built using only NAND gates or only NOR gates. XOR is useful for detecting difference and adding bits; XNOR detects equality.

## Read and build a truth table

A **truth table** lists the output for every possible input combination. With $n$ binary inputs there are $2^n$ rows, because each input can be 0 or 1.

For $F=A'B+AC$, evaluate one row at a time:

| $A$ | $B$ | $C$ | $A'B$ | $AC$ | $F$ |
|---:|---:|---:|---:|---:|---:|
| 0 | 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 0 | 0 | 0 |
| 0 | 1 | 0 | 1 | 0 | 1 |
| 0 | 1 | 1 | 1 | 0 | 1 |
| 1 | 0 | 0 | 0 | 0 | 0 |
| 1 | 0 | 1 | 0 | 1 | 1 |
| 1 | 1 | 0 | 0 | 0 | 0 |
| 1 | 1 | 1 | 0 | 1 | 1 |

This table is a complete specification of the circuit, independent of how it is drawn.

## Use Boolean laws to simplify a circuit

Boolean algebra has identities that help reduce the number of gates:

| Law | Identity |
|---|---|
| Identity | $A+0=A,\quad A\cdot1=A$ |
| Domination | $A+1=1,\quad A\cdot0=0$ |
| Idempotent | $A+A=A,\quad AA=A$ |
| Complement | $A+A'=1,\quad AA'=0$ |
| Commutative | $A+B=B+A,\quad AB=BA$ |
| Distributive | $A(B+C)=AB+AC$ |
| De Morgan | $(AB)'=A'+B',\quad (A+B)'=A'B'$ |

For example, $AB+AB'=A(B+B')=A$. The input $B$ does not affect the result, so the two product terms reduce to one wire from $A$.

De Morgan's laws explain how inversion moves across a gate: complementing an AND is equivalent to OR-ing complemented inputs, and vice versa. A small bubble on a gate symbol represents an inversion and can help redraw circuits using NAND or NOR gates.

## Translate an English condition into a circuit

To translate a requirement, name each input, write the condition in words, and combine it with AND/OR/NOT. For “the motor runs when the system is enabled and either the start button is pressed or automatic mode is active,” let $E$, $S$, and $A$ represent those conditions. Then $M=E(S+A)$.

Make a truth table to test all cases, simplify the expression if possible, and then choose a gate implementation. This separates the meaning of the requirement from the hardware used to implement it.

**Practice:** Build the truth table for $F=(A+B')C$. The output is 1 only when $C=1$ and either $A=1$ or $B=0$. Then compare it with $AC+B'C$ using distribution; they are the same function.

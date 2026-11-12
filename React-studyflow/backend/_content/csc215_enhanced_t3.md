# Simplification of Boolean Functions with Karnaugh Maps

## Simplifying a circuit means removing unnecessary hardware

Two Boolean expressions can produce the same output for every input combination yet use different numbers of gates. A simpler expression can mean fewer gates, less wiring, lower delay, and lower cost. A Karnaugh map (K-map) gives a visual method for finding such simplifications.

A K-map is not an ordinary table: its cells are arranged so neighbouring cells differ in exactly one input bit. That arrangement lets us combine terms that differ in one variable, because that variable can be eliminated.

## Build the map from minterms

A **minterm** is an AND term containing every input once, either complemented or uncomplemented. It represents exactly one input row. For example, with inputs $A,B,C$, the row $A=0,B=1,C=0$ corresponds to $A'BC'$.

For three variables, arrange the columns in Gray-code order $BC=00,01,11,10$, not ordinary binary order. Neighbouring columns then change only one bit, including the wraparound pair at the edges:

| $A\backslash BC$ | 00 | 01 | 11 | 10 |
|---|---:|---:|---:|---:|
| 0 | $m_0$ | $m_1$ | $m_3$ | $m_2$ |
| 1 | $m_4$ | $m_5$ | $m_7$ | $m_6$ |

Place a 1 in the cell for each minterm where the function is 1. If given a truth table, transfer its output column into the map.

## Why grouping removes variables

Two adjacent minterms differ in one literal. If $B$ changes but $A$ and $C$ stay fixed, then

$$AB'C+ABC=AC(B'+B)=AC.$$

The changing variable disappears because $B'+B=1$. K-map grouping repeats this cancellation visually.

Groups must contain $1,2,4,8,\ldots$ cells and be rectangular on the map. Groups may wrap across opposite edges, overlap when useful, and must cover every 1 at least once. Prefer the largest groups and use as few groups as possible.

## Work a three-variable example

Let $F(A,B,C)=\Sigma m(1,3,5,7)$, meaning the output is 1 at minterms 1, 3, 5, and 7. These are precisely the cells where $C=1$:

| $A\backslash BC$ | 00 | 01 | 11 | 10 |
|---|---:|---:|---:|---:|
| 0 | 0 | 1 | 1 | 0 |
| 1 | 0 | 1 | 1 | 0 |

All four 1s form one group of four. Throughout that group, $C$ remains 1 while $A$ and $B$ vary, so $F=C$.

**Pause and check:** A group of two cells differs in one input; one variable disappears. A group of four lets two variables change; two disappear. A group of eight in a three-variable map simplifies to 1.

## A systematic grouping routine

1. Label variables and place minterms in Gray-code order.
2. Fill 1s and any don't-care entries.
3. Make the largest power-of-two groups that cover all 1s.
4. Allow edge wraparound; the map's edges are adjacent.
5. For each group, keep only the literals that remain constant.
6. OR the resulting product terms and verify the expression against the truth table.

For a group, a variable fixed at 1 appears uncomplemented; fixed at 0 appears complemented. A variable that changes is omitted.

## Don't-care conditions

A don't-care input combination is one that cannot occur or whose output is irrelevant for the design. Mark it $X$. You may treat it as either 0 or 1 to create larger groups, but you do not have to include it in any group. Use don't-cares only when the specification truly allows either output.

## From a simplified expression to gates

A simplified sum-of-products expression such as $F=A'B+CD$ maps directly to AND gates feeding an OR gate, with inverters for complemented inputs. De Morgan's laws can convert this structure to NAND-only or NOR-only designs. The best Boolean expression may depend on the gates available and hardware constraints, but K-map minimization gives a simpler logical starting point.

**Practice:** Simplify $F(A,B,C)=\Sigma m(0,2,4,6)$. The minterms are all rows with $C=0$, so one group of four gives $F=C'$.

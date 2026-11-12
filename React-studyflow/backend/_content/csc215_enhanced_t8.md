# Canonical Forms and Standard Representations

## A truth table can be written as an algebraic expression

A truth table specifies a Boolean function completely, but it can be long. Algebraic forms provide a compact way to describe or implement the same behaviour. **Canonical forms** give a systematic expression directly from the rows of the truth table.

For $n$ variables there are $2^n$ input rows. A canonical term includes every variable exactly once, either complemented or uncomplemented. This guarantees each term corresponds to exactly one row.

## Minterms build a canonical sum of products

A **minterm** is an AND of all variables that is 1 on exactly one row. For row $A=0,B=1,C=0$, the minterm is $A'BC'$. A variable is complemented when its row bit is 0 and uncomplemented when it is 1.

For three variables, rows are indexed by the binary value $ABC$:

| Index | $ABC$ | Minterm |
|---:|:---:|---|
| 0 | 000 | $A'B'C'$ |
| 1 | 001 | $A'B'C$ |
| 2 | 010 | $A'BC'$ |
| 3 | 011 | $A'BC$ |
| 4 | 100 | $AB'C'$ |
| 5 | 101 | $AB'C$ |
| 6 | 110 | $ABC'$ |
| 7 | 111 | $ABC$ |

OR together the minterms for rows where $F=1$. This is the **canonical sum of products (SOP)**:

$$F=\Sigma m(\text{indices where }F=1).$$

For example, $F=\Sigma m(1,3,5,6)=A'B'C+A'BC+AB'C+ABC'$.

## Maxterms build a canonical product of sums

A **maxterm** is an OR of all variables that is 0 on exactly one row. For a row bit of 0, write the variable uncomplemented; for a row bit of 1, complement it. This opposite convention makes the OR expression evaluate to 0 at the indexed row.

Multiply the maxterms for rows where $F=0$ to obtain the **canonical product of sums (POS)**:

$$F=\Pi M(\text{indices where }F=0).$$

If a three-variable function is 1 at rows 1, 3, 5, and 6, it is 0 at rows 0, 2, 4, and 7. Therefore it can be written as $\Pi M(0,2,4,7)$ as well as $\Sigma m(1,3,5,6)$.

**Pause and check:** SOP lists the 1-rows; POS lists the 0-rows. The indices in the two lists are complementary subsets of all row indices.

## Convert between canonical and minimal forms

Canonical expressions are systematic but may have many terms. A **standard SOP** is an OR of product terms and a **standard POS** is an AND of sum terms; their terms need not contain every variable. Boolean algebra or a Karnaugh map can simplify a canonical expression.

For example,

$$F=AB+B'C.$$

Expand each term to include the missing variables:

$$AB=AB(C+C')=ABC+ABC',$$

$$B'C=B'C(A+A')=AB'C+A'B'C.$$

Thus $F=\Sigma m(1,5,6,7)$, and it is zero at rows $0,2,3,4$, so $F=\Pi M(0,2,3,4)$. A minimized expression may use fewer literals but is no longer canonical.

## Map the form to gates

An SOP expression maps naturally to AND gates feeding an OR gate. A POS expression maps to OR gates feeding an AND gate. By applying De Morgan's laws and double negation, either can be implemented with NAND-only or NOR-only structures. AOI and OAI gates combine these operations with an inversion in a single device.

Do not assume the shortest written expression always means the fastest physical circuit; gate availability, fan-in, loading, and timing can matter. The algebraic form is a design tool, not the complete electrical analysis.

## Use don't-cares only when the specification allows it

Some input combinations never occur or their output is irrelevant. Mark these as don't-cares. For simplification, each may be treated as 0 or 1, whichever helps form larger groups; it is not necessary to use every don't-care.

For $F(A,B,C)=\Sigma m(1,3)+d(0,2)$, treating rows 0 and 2 as 1 allows rows 0,1,2,3 to group and simplify to $A'$. If the don't-cares are not used, rows 1 and 3 give $A'C$. Both expressions agree on required 1-rows; their outputs at don't-care rows are unspecified.

## Practice

1. Convert $F(A,B,C)=AB+B'C$ to minterm indices.
2. If a truth table has output 1 on rows 0, 2, 4, and 6, what is the simplified function?
3. Why must the variable order be fixed when assigning minterm indices?

**Check:** 1. Rows 1, 5, 6, and 7, so $\Sigma m(1,5,6,7)$. 2. These are all rows with $C=0$, so $F=C'$. 3. Indices encode the binary input tuple; changing the order changes which row each index names.

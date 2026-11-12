# Relations

## A relation records which things are connected

Suppose a university has a set of students and a set of courses. We can record which students are enrolled in which courses. A student may be connected to several courses, and some courses may have no students yet. This kind of connection is more general than a function, which must assign exactly one output to every allowed input.

Mathematically, a relation from a set $A$ to a set $B$ is a set of ordered pairs:

$$R\subseteq A\times B.$$

The Cartesian product $A\times B$ contains every possible ordered pair $(a,b)$ with $a\in A$ and $b\in B$. A relation selects the pairs that satisfy the connection being described. If $(a,b)\in R$, we may say “$a$ is related to $b$” and write $aRb$.

For example, let $A=\{\text{Ada},\text{Bola}\}$ and $B=\{\text{Math},\text{Logic}\}$. The relation “is enrolled in” might be

$$R=\{(\text{Ada},\text{Math}),(\text{Ada},\text{Logic}),(\text{Bola},\text{Logic})\}.$$

Ada is related to two courses, so this is not a function from students to courses. It is still a valid relation. A relation may connect an input to no outputs, one output, or several outputs.

## Relations on one set describe properties among its elements

When both sides come from the same set $A$, we call $R\subseteq A\times A$ a relation **on** $A$. Examples include “is less than” on numbers, “divides” on positive integers, or “is a subset of” on a collection of sets.

Properties such as reflexive, symmetric, and transitive describe how the pairs in a relation behave. They are easiest to understand by asking what the relation means in a familiar example.

### Reflexive: everything relates to itself

A relation is **reflexive** if every element is related to itself:

$$\text{for every }a\in A,\quad aRa.$$

For $\le$ on real numbers, $x\le x$ is always true, so the relation is reflexive. The relation $<$ is not reflexive, because no real number is less than itself. **Irreflexive** means no element relates to itself.

### Symmetric: a connection works both ways

A relation is **symmetric** if reversing any pair keeps it in the relation:

$$aRb\implies bRa.$$

“Has the same birthday as” is symmetric: if Ada has the same birthday as Bola, then Bola has the same birthday as Ada. “Is a sibling of” is usually symmetric as well.

### Antisymmetric: two-way connection forces equality

A relation is **antisymmetric** if the only way two distinct elements can relate in both directions is for them to be equal:

$$aRb\text{ and }bRa\implies a=b.$$

The relation $\le$ is antisymmetric: if $a\le b$ and $b\le a$, then $a=b$. Do not read “antisymmetric” as “not symmetric.” Equality is both symmetric and antisymmetric; the two properties ask different questions.

### Transitive: a chain can be shortened

A relation is **transitive** if a two-step connection implies a direct one:

$$aRb\text{ and }bRc\implies aRc.$$

If $a\le b$ and $b\le c$, then $a\le c$, so $\le$ is transitive. “Is a friend of” does not have to be transitive: two friends of the same person need not be friends with each other.

**Pause and decide:** Is “divides” reflexive on positive integers? Yes: each positive integer divides itself. Is it symmetric? No: 2 divides 4, but 4 does not divide 2. Is it transitive? Yes: if $a$ divides $b$ and $b$ divides $c$, then $a$ divides $c$.

## Two important combinations of properties

### Equivalence relations group things that count as the same

An **equivalence relation** is reflexive, symmetric, and transitive. These properties make “equivalent to” behave like a consistent notion of sameness: every item matches itself, matching works both ways, and matching can be chained.

Congruence modulo $n$ is a useful example. Integers $a$ and $b$ are congruent modulo $n$ when their difference is divisible by $n$:

$$a\equiv b\pmod n\quad\text{if and only if}\quad n\text{ divides }(a-b).$$

For modulo 3, the integers split into three groups according to their remainders: those with remainder 0, remainder 1, and remainder 2. The group containing 1 is its **equivalence class**, written $[1]$; it contains every integer congruent to 1 modulo 3.

An **equivalence class** is the set of all elements equivalent to a chosen element. The classes are either identical or disjoint, and together they cover the original set. Such a division into non-overlapping, non-empty groups is called a **partition**.

### Partial orders describe hierarchy or containment

A **partial order** is reflexive, antisymmetric, and transitive. It describes an ordering where some pairs may not be comparable. For example, set containment $\subseteq$ is a partial order: every set contains itself, mutual containment means equality, and containment is transitive.

Within the set $\{\varnothing,\{1\},\{2\},\{1,2\}\}$, neither $\{1\}\subseteq\{2\}$ nor $\{2\}\subseteq\{1\}$. They are incomparable, so this partial order is not a total order. In a **total order**, every pair can be compared.

A **Hasse diagram** draws a finite partial order as a simplified hierarchy. Put larger elements higher, omit self-loops, and omit arrows already implied by a chain. For set containment, the diagram is:

```text
       {1,2}
       /   \
     {1}   {2}
       \   /
         ∅
```

In a partially ordered set, a **least** element is below every element, while a **minimal** element has nothing strictly below it. There may be several minimal elements, but there can be at most one least element. In the diagram, $\varnothing$ is both minimal and least; $\{1\}$ and $\{2\}$ are minimal but not least.

## Represent a finite relation in different ways

For a finite set, the same relation can be shown as:

- **A list of ordered pairs:** write every pair in the relation.
- **A matrix:** put 1 in position $(i,j)$ when $a_iRa_j$, and 0 otherwise.
- **A directed graph:** draw an arrow $a_i\to a_j$ when $a_iRa_j$.

For example, on $A=\{1,2,3\}$, let $R=\{(1,2),(2,3)\}$. Its matrix, with rows and columns ordered as $1,2,3$, is

$$\begin{pmatrix}0&1&0\\0&0&1\\0&0&0\end{pmatrix}.$$

The arrows show a path $1\to2\to3$. If we add $(1,3)$, that path has a direct connection too. This illustrates transitivity: whenever a relation includes $aRb$ and $bRc$, it must include $aRc$.

## Build new relations from old ones

The **inverse relation** reverses every pair:

$$R^{-1}=\{(b,a):(a,b)\in R\}.$$

For instance, reversing “is a parent of” gives “is a child of.”

If $R$ connects $A$ to $B$ and $S$ connects $B$ to $C$, their **composition** connects $A$ to $C$ whenever a two-step route exists:

$$S\circ R=\{(a,c):\text{there is some }b\in B\text{ with }aRb\text{ and }bSc\}.$$

The order is like function composition: use $R$ first, then $S$.

A **closure** adds the fewest pairs needed to make a relation have a property:

- The reflexive closure adds any missing pairs $(a,a)$.
- The symmetric closure adds the reverse of each pair.
- The transitive closure adds pairs implied by paths.

For the relation $\{(1,2),(2,3)\}$, transitivity requires adding $(1,3)$. This is the basic idea behind reachability in a directed graph and algorithms such as Warshall’s algorithm.

## A reliable way to analyze a relation

Given a relation on a finite set, first write down what each pair means. Then check properties one at a time:

1. **Reflexive:** are all self-pairs present?
2. **Symmetric:** does every pair have its reverse?
3. **Antisymmetric:** do any two distinct elements relate both ways?
4. **Transitive:** whenever two arrows form a path of length two, is the direct pair present?

Use the definition, not just the diagram’s appearance. For example, a relation can be both symmetric and antisymmetric, and a relation that is not symmetric is not automatically antisymmetric.

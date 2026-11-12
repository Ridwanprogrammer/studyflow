# Functions

## A function pairs every allowed input with one output

Imagine assigning each student in a class an exam seat. Every student must receive a seat, and no student can be assigned two different seats. Two students may share a seat if the rules allow it, but then some properties of the assignment change. This simple input-to-output picture is the starting point for functions.

A function is a rule that gives **exactly one output** to each allowed input. The rule need not be a formula: it can be a table, a diagram of arrows, a computer procedure, or any unambiguous assignment.

For example, the table below describes a function. Every input in the left column appears once, and each is paired with one output:

| Input $x$ | Output $f(x)$ |
|---:|---:|
| 1 | $a$ |
| 2 | $b$ |
| 3 | $b$ |

It is fine that inputs 2 and 3 share output $b$. The rule would fail to be a function if input 2 were assigned both $a$ and $b$, or if an allowed input were left without any output.

## Name the sets before classifying a function

Let $A$ be the set of inputs and $B$ the set in which outputs must lie. We write

$$f:A\to B.$$

The set $A$ is the **domain**; the set $B$ is the **codomain**. For a particular input $a\in A$, its assigned output is written $f(a)$. The **range** (also called the image of the whole domain) is the set of outputs that actually occur:

$$f(A)=\{f(a):a\in A\}\subseteq B.$$

The codomain is part of how a function is specified. The same formula can have different properties when its codomain changes. For example, $f(x)=x^2$ is not onto if it maps $\mathbb R$ to $\mathbb R$, because negative real numbers are not outputs. But with codomain $[0,\infty)$, every codomain value is reached.

**Pause and classify:** For $f:\{1,2,3\}\to\{a,b,c\}$ with $f(1)=a$, $f(2)=b$, and $f(3)=b$, list the range. It is $\{a,b\}$: the codomain element $c$ is allowed but never produced.

## Three ways inputs can cover outputs

These properties describe how the pairing behaves. Their names are easier to remember when connected to the mapping:

### Injective: no two inputs collide

A function is **injective** (one-to-one) when different inputs always have different outputs. In terms of equations,

$$f(x_1)=f(x_2)\implies x_1=x_2.$$

For the table above, the function is not injective because inputs 2 and 3 both map to $b$. Injectivity is useful when an output identifies its input uniquely. For finite sets, an injective function $A\to B$ requires $|A|\le |B|$.

### Surjective: every codomain value is reached

A function is **surjective** (onto) when every element of the codomain is an output:

$$\text{for every }y\in B,\text{ there is some }x\in A\text{ with }f(x)=y.$$

The table's function is not onto its stated codomain $\{a,b,c\}$ because nothing maps to $c$. If we changed the codomain to $\{a,b\}$, it would be onto. For finite sets, an onto function $A\to B$ requires $|A|\ge |B|$.

### Bijective: a perfect pairing

A function is **bijective** when it is both injective and surjective. Every input is paired with a different output, and every codomain value is paired with an input. This is a one-to-one correspondence, so for finite sets the two sets have the same number of elements.

**Try it:** Let $f:\{1,2,3\}\to\{a,b,c\}$ send $1\mapsto b$, $2\mapsto c$, and $3\mapsto a$. No two inputs collide, and no output is missed, so the function is bijective.

For a formula, test these properties against the stated domain and codomain. For example, $f:\mathbb R\to\mathbb R$ given by $f(x)=x^2$ is not injective because $f(2)=f(-2)$, and it is not onto because no input produces $-1$. Restricting its domain to $[0,\infty)$ makes it injective, but it is still not onto $\mathbb R$.

## Composition means using one rule after another

Suppose $f:A\to B$ and $g:B\to C$. The output of $f$ is a valid input for $g$, so we can feed the first result into the second:

$$ (g\circ f)(x)=g(f(x)).$$

The order is read from the inside outward: apply $f$ first, then $g$. If $f(x)=x+1$ and $g(x)=2x$, then

$$ (g\circ f)(x)=2(x+1)=2x+2,$$

whereas $(f\circ g)(x)=2x+1$. The order matters because the intermediate result changes.

Composition is associative: $h\circ(g\circ f)=(h\circ g)\circ f$, because both sides apply $f$, then $g$, then $h$. An identity function leaves its input unchanged: $\operatorname{id}_A(x)=x$ for $x\in A$, so composing with it does not change a compatible function.

## An inverse reverses a bijection

If a function has a unique input for every output in its codomain, we can reverse the arrows. The resulting rule is the **inverse function** $f^{-1}:B\to A$:

$$f^{-1}(f(x))=x\quad\text{and}\quad f(f^{-1}(y))=y.$$

An inverse exists exactly when $f$ is bijective. If two inputs collide, the reverse would not know which input to return; if a codomain value is never reached, the reverse would have no input to assign to it.

For $f:\mathbb R\to\mathbb R$ given by $f(x)=2x+1$, solve $y=2x+1$ for $x$ to reverse the rule. The inverse is

$$f^{-1}(y)=\frac{y-1}{2}.$$

Check the reversal: $f^{-1}(f(x))=((2x+1)-1)/2=x$. When finding an inverse from a formula, the domain and codomain still matter; for example, $x^2$ on all of $\mathbb R$ has no inverse function, but restricting it to $[0,\infty)$ makes its inverse $\sqrt{x}$ with codomain $[0,\infty)$.

## A function can be used to compare set sizes

For finite sets, an injective map from $A$ to $B$ shows that $A$ has no more elements than $B$; a bijection shows they have the same size. This idea extends to infinite sets, where “same size” means that a bijection exists.

The natural numbers and even natural numbers are both infinite, yet they can be paired:

$$n\longmapsto 2n.$$

This is a bijection from $\mathbb N=\{0,1,2,\ldots\}$ to the even nonnegative integers. The evens may look like only part of the natural numbers, but the pairing proves the two sets have the same cardinality.

A set is **countable** if it is finite or can be paired with the natural numbers. The real numbers are **uncountable**: no list indexed by the natural numbers can contain every real number in an interval. This is a deeper consequence of comparing sets through functions, not a claim that one interval contains fewer points than another in the everyday sense.

## Use the definition to solve mapping questions

When checking a function $f:A\to B$, ask these in order:

1. Does every element of $A$ have exactly one assigned output in $B$? If not, it is not a function.
2. Can two different inputs produce the same output? If yes, it is not injective.
3. Is every element of $B$ produced? If no, it is not surjective.
4. It has an inverse exactly when both answers show it is bijective.

**Final check:** A relation can assign several outputs to one input and still be a relation, but not a function. Multiple inputs may share one output in a function; that simply means it is not injective. Keeping these two directions separate prevents a common classification mistake.

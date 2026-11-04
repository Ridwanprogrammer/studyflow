# Real-valued Functions of a Real Variable

## One input, one output

A [[function|function]] is a rule that assigns exactly one output to each allowed input. Think of it as a dependable measuring instrument: give it the same input under the same conditions, and it returns the same value.

Formally, a real-valued function on a domain $D \subseteq \mathbb{R}$ is a mapping
$$f:D\to\mathbb{R}, \qquad x\mapsto f(x).$$
The input set $D$ is the [[domain|domain]]; the codomain is $\mathbb{R}$; the [[range|range]] is the set of outputs the rule actually produces:
$$f(D)=\{f(x):x\in D\}\subseteq\mathbb{R}.$$

The phrase “exactly one” is essential. The rule $y=\sqrt{x}$ assigns one nonnegative output to every $x\ge 0$, so it defines a function. The rule $y=\pm\sqrt{x}$ assigns two outputs to most positive inputs, so it does not define a function of $x$.

## Find the inputs before using the rule

An algebraic formula may not accept every real input. For $f(x)=\sqrt{4-x^2}$, the radicand must be nonnegative:
$$4-x^2\ge 0 \quad\Longrightarrow\quad -2\le x\le 2.$$
Thus the natural domain is $[-2,2]$. Since the square root ranges from $0$ to $2$, the range is $[0,2]$.

Check restrictions in this order:
- A denominator must not be zero.
- An even root must have a nonnegative radicand.
- A real logarithm must have a positive argument.
- If restrictions overlap, take their intersection.

For example, $g(x)=\frac{\ln x}{x-2}$ requires both $x>0$ and $x\ne2$, so its domain is $(0,2)\cup(2,\infty)$.

## Reading and combining function rules

If $f(x)=2x+1$, then $f(3)=7$. Composition means feed one function’s output into another: if $g(x)=x^2$, then
$$ (f\circ g)(x)=f(g(x))=2x^2+1.$$
Order matters: $(g\circ f)(x)=(2x+1)^2$, which is a different rule.

Functions can also be added, multiplied, or divided pointwise:
$$ (f+g)(x)=f(x)+g(x), \qquad (fg)(x)=f(x)g(x).$$
For a quotient, exclude inputs where the denominator function is zero.

### A useful test for an identity

Let $f(x)=2^x$. Then
$$f(x+3)-f(x-1)=2^{x+3}-2^{x-1}=2^x\left(8-\frac12\right)=\frac{15}{2}f(x).$$
Factoring out $2^x$ exposes the shared input and makes the identity easier to see.

## Before moving on

1. Find the domain and range of $h(x)=\sqrt{9-(x-1)^2}$.
2. If $f(x)=x+4$ and $g(x)=x^2$, find $f\circ g$ and $g\circ f$.
3. Explain why $x=\sqrt{y-1}$ defines $x$ as a function of $y$, while $y=\pm\sqrt{x}$ does not define $y$ as a function of $x$.

**Answers:** 1. Domain $[-2,4]$, range $[0,3]$. 2. $x^2+4$ and $(x+4)^2$. 3. Each allowed $y$ gives one $x$ in the first relation; a positive $x$ generally gives two $y$ values in the second.

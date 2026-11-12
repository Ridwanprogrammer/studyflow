# Real-valued Functions of a Real Variable

## A function is a dependable input-output rule

Think of a function as a machine. You choose an allowed input, the machine follows one fixed rule, and it returns exactly one output. For example, the rule “square the input, then add 3” sends 2 to 7:

$$2\longrightarrow 2^2+3=7.$$

The same input and same rule always give the same output. That is the central idea; the notation gives names to the machine, its allowed inputs, and its outputs.

## Understand the words before the full name

A **real number** is a number that can be placed on the continuous number line: for example, $-2$, $0$, $\frac12$, or $\sqrt{2}$. A **variable** is a symbol, such as $x$, used to stand for a number that may change. The input is the number we give the rule; the output is the number the rule returns.

Now let $f(x)=x^2+3$. Here $f$ names the rule, $x$ is the input, and the expression $x^2+3$ tells the machine what to do. Substituting 2 gives

$$f(2)=2^2+3=7.$$

Read $f(2)$ as “the output of $f$ when the input is 2,” not as $f$ multiplied by 2.

## From the machine to the formal definition

A **function** is a rule that assigns exactly one output to every allowed input. If the allowed inputs form a set $D$ of real numbers and every output is real, we write

$$f:D\to\mathbb R,\qquad x\mapsto f(x).$$

The notation says that $f$ takes each $x$ in $D$ and assigns it the value $f(x)$. The set $D$ is the **domain**: the inputs the machine is allowed to receive. The set named after the arrow is the **codomain**: the set in which outputs are required to lie. The **range** is the set of outputs the rule actually produces:

$$f(D)=\{f(x):x\in D\}\subseteq\mathbb R.$$

The range can be smaller than the codomain. For $f(x)=x^2$ with domain and codomain both $\mathbb R$, negative numbers are allowed inputs, but no output is negative. Its range is $[0,\infty)$, not all of $\mathbb R$.

**Pause and decide:** Does the rule $y=\pm\sqrt{x}$ define $y$ as a function of $x$? For a positive input such as $x=4$, it gives both $y=2$ and $y=-2$. Since one input has two outputs, it is not a function of $x$. By contrast, $y=\sqrt{x}$ uses the nonnegative root and gives one output for each $x\ge0$.

## Find which inputs the rule accepts

The formula alone may not reveal the whole domain. For a real-valued function, inputs must make the rule produce a real output. For example, an even root cannot have a negative radicand. With

$$g(x)=\sqrt{4-x^2},$$

we need $4-x^2\ge0$, so $-2\le x\le2$. Thus the natural real domain is $[-2,2]$. On this interval, the square root is at least 0 and at most 2, so the range is also $[0,2]$.

Other common restrictions follow from the same question—“Can this input go through the rule and still produce a real number?”

- A denominator cannot be zero. For $h(x)=\frac{1}{x-3}$, exclude $x=3$.
- The argument of a real logarithm must be positive. For $\ln x$, require $x>0$.
- An even root requires a nonnegative radicand. For $\sqrt{x+1}$, require $x\ge-1$.

When a formula has several restrictions, the domain must satisfy all of them at once. For example, $q(x)=\frac{\ln x}{x-2}$ requires both $x>0$ and $x\ne2$, giving domain $(0,2)\cup(2,\infty)$.

## Read a graph as a picture of the machine

Each input-output pair $(x,f(x))$ becomes a point on the graph. The horizontal coordinate is the input; the vertical coordinate is its output. A vertical line represents one fixed input, so a graph is a function precisely when no vertical line meets it at more than one point. This is the **vertical line test**—a visual way to check the “one output per input” rule.

For $f(x)=x^2$, the points $(2,4)$ and $(-2,4)$ are both on the graph. That is allowed: different inputs may share an output. What is not allowed is one input appearing with two different output values.

## Combine rules by feeding one machine into another

If $f(x)=2x+1$ and $g(x)=x^2$, then applying $g$ first and feeding its output into $f$ gives

$$ (f\circ g)(x)=f(g(x))=2x^2+1.$$

Reversing the order gives

$$ (g\circ f)(x)=g(f(x))=(2x+1)^2.$$

These are different because composition means “do the inside rule first.” When combining rules, keep track of which inputs each rule accepts; a composition only works where the output of the first rule is an allowed input for the next one.

**Try it:** For the two rules above, use input $x=2$ to compare the compositions. First, $g(2)=4$ and then $f(4)=9$, so $(f\circ g)(2)=9$. In the other order, $f(2)=5$ and then $g(5)=25$, so $(g\circ f)(2)=25$. The input-output machine makes the order visible.

## The phrase “real-valued function of a real variable”

The title now describes familiar pieces: **real variable** means the input $x$ is real; **real-valued** means the output $f(x)$ is real; and **function** means each allowed input gets exactly one output. In full, it is a rule $f:D\to\mathbb R$ where $D\subseteq\mathbb R$.

Keep the distinction clear: understanding what a function does is different from calculating with its formula. First identify the input, rule, allowed domain, and output; then simplify, solve, or graph as the question requires.

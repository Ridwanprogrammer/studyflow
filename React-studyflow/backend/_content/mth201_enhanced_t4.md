# Taylor Series: Building a Polynomial One Piece at a Time

## The idea: imitate a function near one useful point

Suppose you need the value of a difficult function near a point where its value is easy to calculate. You can build a nearby polynomial that behaves like the function at that point. A straight line matches the function's value and slope; a quadratic can also match its bending; a cubic can match one further change in its shape.

This is the idea behind a **Taylor polynomial**. It is not a mysterious formula to memorize first. It is a recipe for asking:

1. What is the function doing at the centre point?
2. What is its slope there?
3. How is that slope changing there?
4. How are those changes themselves changing?

Each answer becomes one piece of the approximating polynomial.

## Start with the tangent-line approximation

Let $f(x)$ be a function and choose a centre $a$. The function's value at that point is $f(a)$. Its slope is the derivative $f'(a)$. A line with that value and slope is

$$
P_1(x)=f(a)+f'(a)(x-a).
$$

Read this in parts:

- $x-a$ is the distance from the centre to the input we want.
- $f'(a)$ says how much the output changes per unit of input near $a$.
- $f'(a)(x-a)$ is therefore the estimated output change.
- Adding that change to $f(a)$ gives the estimated output.

For example, estimate $\sqrt{4.1}$. Let $f(x)=\sqrt{x}$ and use the easy nearby point $a=4$:

$$
f(4)=2,\qquad
f'(x)=\frac{1}{2\sqrt{x}},\qquad
f'(4)=\frac14.
$$

The tangent estimate is

$$
\sqrt{4.1}\approx P_1(4.1)
=2+\frac14(4.1-4)
=2.025.
$$

The actual value is about $2.024845$. The tangent is close because $4.1$ is near 4, but it does not account for the curve's bending.

## Improve the estimate by matching the bend

To improve the line, add a quadratic term:

$$
P_2(x)=f(a)+f'(a)(x-a)+c_2(x-a)^2.
$$

The new term is zero at $x=a$, so it does not change the value there. Its first derivative is also zero at $a$, so it does not change the slope there. But its second derivative is $2c_2$, so we can choose it to match the function's second derivative:

$$
P_2''(a)=2c_2=f''(a)
\quad\Longrightarrow\quad
c_2=\frac{f''(a)}{2}.
$$

Thus

$$
P_2(x)=f(a)+f'(a)(x-a)+\frac{f''(a)}{2}(x-a)^2.
$$

For the square-root example,

$$
f''(x)=-\frac{1}{4x^{3/2}},
\qquad
f''(4)=-\frac{1}{32}.
$$

So the quadratic approximation is

$$
P_2(x)=2+\frac14(x-4)-\frac{1}{64}(x-4)^2.
$$

At $x=4.1$:

$$
\sqrt{4.1}\approx P_2(4.1)
=2+\frac14(0.1)-\frac{1}{64}(0.1)^2
=2.02484375.
$$

This is closer to the actual value. The negative quadratic term corrects the tangent's overestimate because the square-root graph bends downward near 4.

## Build the general formula from the matching conditions

Now suppose the approximating polynomial has degree $n$ and is written using powers of the distance from the centre:

$$
P_n(x)=c_0+c_1(x-a)+c_2(x-a)^2+\cdots+c_n(x-a)^n.
$$

Using powers of $(x-a)$ is useful because all terms after the first vanish at the centre.

- Set $x=a$: every positive power of $(x-a)$ is zero, so $P_n(a)=c_0$. To match the function's value, choose $c_0=f(a)$.
- Differentiate once and set $x=a$: only the linear term contributes, so $P_n'(a)=c_1$. Choose $c_1=f'(a)$ to match the slope.
- Differentiate twice and set $x=a$: the quadratic term contributes $2c_2$. Choose $c_2=f''(a)/2$.
- Differentiate three times and set $x=a$: the cubic term contributes $3\cdot2\cdot1\,c_3=3!c_3$. Thus $c_3=f'''(a)/3!$.

The same pattern continues. The $k$th derivative of $(x-a)^k$ is $k!$, while after evaluating at $a$, every other power contributes zero. Therefore the coefficient of $(x-a)^k$ must be $f^{(k)}(a)/k!$. Putting those coefficients together gives

$$
P_n(x)=\sum_{k=0}^{n}\frac{f^{(k)}(a)}{k!}(x-a)^k.
$$

Here is the notation unpacked:

- $a$ is the chosen centre; $x$ is the input being approximated.
- $k$ is an index that runs through $0,1,\ldots,n$.
- $f^{(0)}(a)$ means $f(a)$; $f^{(1)}(a)=f'(a)$; $f^{(2)}(a)=f''(a)$; and so on.
- $k!=k(k-1)\cdots2\cdot1$ is the factorial, with $0!=1$.
- $(x-a)^k$ makes higher-order corrections shrink quickly when $x$ is close to $a$.

## See every term in a concrete expansion

Take $f(x)=e^x$ and centre at $a=0$. The function and all its derivatives are $e^x$, so each derivative at 0 equals 1. Substituting these values gives

$$
P_n(x)
=1+x+\frac{x^2}{2!}+\frac{x^3}{3!}+\cdots+\frac{x^n}{n!}.
$$

At $x=0.2$, the degree-3 approximation is

$$
e^{0.2}\approx
1+0.2+\frac{0.2^2}{2}+\frac{0.2^3}{6}
=1.221333\ldots
$$

The actual value is about 1.221403. Notice why the terms become small: powers of 0.2 shrink, and factorials in the denominators grow.

At $a=0$, a Taylor polynomial is called a **Maclaurin polynomial**. When the infinite sequence of Taylor terms is used, it is called a **Taylor series**. A finite polynomial and an infinite series are related, but they are not the same object.

## Another example: where the alternating signs come from

Let $f(x)=\ln(1+x)$ and centre at 0. Its first few derivatives are

$$
f(x)=\ln(1+x),\quad
f'(x)=\frac{1}{1+x},\quad
f''(x)=-\frac{1}{(1+x)^2},\quad
f'''(x)=\frac{2}{(1+x)^3}.
$$

At 0, these values are $0,1,-1,2$. Dividing them by the corresponding factorials produces the terms

$$
\ln(1+x)\approx x-\frac{x^2}{2}+\frac{x^3}{3}-\frac{x^4}{4}+\cdots.
$$

For $x=0.1$, the degree-3 estimate is

$$
0.1-\frac{0.1^2}{2}+\frac{0.1^3}{3}
=0.095333\ldots,
$$

while $\ln(1.1)\approx0.095310$. Alternating signs arise because successive derivatives at 0 alternate in sign.

## Approximation has an error; the remainder measures it

The error after using degree $n$ is

$$
R_n(x)=f(x)-P_n(x).
$$

Taylor's theorem says that, when the required derivatives are continuous between $a$ and $x$, there is some point $c$ between them such that

$$
R_n(x)=\frac{f^{(n+1)}(c)}{(n+1)!}(x-a)^{n+1}.
$$

This explains the next correction: it depends on the next derivative, on the distance to the centre raised to the next power, and on a factorial. If $|f^{(n+1)}(t)|\le M$ all along that interval, then

$$
|R_n(x)|\le\frac{M|x-a|^{n+1}}{(n+1)!}.
$$

For $e^{0.2}$ using $P_3$, the fourth derivative is $e^t$. Between 0 and 0.2 it is at most $e^{0.2}<1.222$. Therefore

$$
|R_3(0.2)|
\le\frac{1.222(0.2)^4}{4!}
<0.000082.
$$

The actual difference is about $0.000069$. The bound is not the exact error; it guarantees the error is no larger than the stated amount.

## When does the infinite series equal the function?

The polynomial $P_n$ is a finite approximation and can be evaluated at any input, but its accuracy may be poor far from the centre. An infinite Taylor series represents the original function only where it converges to that function.

For example,

$$
e^x=1+x+\frac{x^2}{2!}+\frac{x^3}{3!}+\cdots
$$

converges to $e^x$ for every real $x$. In contrast,

$$
\ln(1+x)=x-\frac{x^2}{2}+\frac{x^3}{3}-\cdots
$$

represents $\ln(1+x)$ for $-1<x\le1$; the series is not valid for every real input. Always separate the question “What is the polynomial approximation?” from “Where does the infinite series equal the function?”

## A reliable routine for Taylor questions

1. Identify the function, target input, and convenient nearby centre.
2. Differentiate enough times for the requested degree.
3. Evaluate each derivative at the centre.
4. Divide the $k$th derivative value by $k!$.
5. Multiply that coefficient by $(x-a)^k$ and add the terms.
6. If accuracy is requested, bound the next derivative to estimate the remainder.
7. Check the interval where an infinite series is claimed to represent the function.

## Practice before checking the results

1. Write the degree-2 Taylor polynomial for $\cos x$ centred at 0.
2. Use the degree-2 Taylor polynomial for $e^x$ at 0 to estimate $e^{0.1}$.
3. In the general formula, why is the coefficient of $(x-a)^2$ $f''(a)/2$ rather than simply $f''(a)$?

**Check:** 1. $1-x^2/2$. 2. $1+0.1+0.1^2/2=1.105$. 3. Differentiating $c_2(x-a)^2$ twice gives $2c_2$, so matching $f''(a)$ requires $c_2=f''(a)/2!=f''(a)/2$.

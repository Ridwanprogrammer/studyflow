# Taylor Series

## Build a local polynomial from a function

Near a point $a$, a smooth curve can often be approximated by a polynomial that matches the curve’s value, slope, curvature, and further [[derivative|derivatives]] at $a$. The more derivative information we match, the more accurately the polynomial can follow the function nearby.

The degree-$n$ Taylor polynomial centered at $a$ is

$$
P_n(x)=\sum_{k=0}^{n}\frac{f^{(k)}(a)}{k!}(x-a)^k
$$

At $a=0$, it is called a Maclaurin polynomial. The Taylor series extends this pattern indefinitely, but a formal infinite series represents $f$ only where it converges to $f$.

## Constructing an approximation

To estimate $\ln(1.03)$, write $f(x)=\ln(1+x)$ and expand about $0$. Its derivatives at zero give

$$
\ln(1+x)=x-\frac{x^2}{2}+\frac{x^3}{3}-\frac{x^4}{4}+\cdots,\qquad -1<x\le1
$$

Using the fourth-degree polynomial at $x=0.03$:

$$
P_4(0.03)=0.03-\frac{0.03^2}{2}+\frac{0.03^3}{3}-\frac{0.03^4}{4}\approx0.029559
$$

This is close to $\ln(1.03)\approx0.0295588$.

The center is a strategic choice: choose $a$ near the input you want to approximate, where the derivatives are manageable.

## Approximation comes with an error

Taylor’s theorem writes

$$
f(x)=P_n(x)+R_n(x),\qquad R_n(x)=\frac{f^{(n+1)}(c)}{(n+1)!}(x-a)^{n+1}
$$

for some $c$ between $a$ and $x$. To turn this into a bound, find $M$ such that $|f^{(n+1)}(t)|\le M$ between those points. Then

$$
|R_n(x)|\le \frac{M|x-a|^{n+1}}{(n+1)!}
$$

The factor $|x-a|^{n+1}$ explains why a nearby center and a higher degree usually improve a local approximation.

## Familiar series, used with care

$$
\begin{aligned}
e^x &= \sum_{k=0}^\infty\frac{x^k}{k!} \\
\sin x &= x-\frac{x^3}{3!}+\frac{x^5}{5!}-\cdots \\
\cos x &= 1-\frac{x^2}{2!}+\frac{x^4}{4!}-\cdots
\end{aligned}
$$

For $\ln(1+x)$, the expansion does not converge for every real $x$; its interval of convergence is $(-1,1]$. Always distinguish the polynomial approximation from the infinite series and check where the series is valid.

## Check your understanding

1. Write the degree-3 Maclaurin polynomial for $e^x$.
2. Why is expanding $\ln x$ near $a=1$ more useful than using a Maclaurin series for inputs near $1$?
3. What information is needed to turn the Lagrange remainder into a numerical error bound?

**Answers:** 1. $1+x+x^2/2+x^3/6$. 2. The center should be near the input; $\ln x$ is also undefined at the Maclaurin center $0$. 3. A bound on the magnitude of the next derivative throughout the interval between the center and the target.

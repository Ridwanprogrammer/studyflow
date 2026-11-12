# Taylor Series

## Approximate a complicated curve with a familiar one

Near a point, a smooth curve can look almost like a straight line. If we want a better local picture, we can use a curved polynomial. The idea is to build a polynomial that agrees with the function's value, slope, curvature, and further changes at a chosen centre.

The centre is called $a$. The polynomial through degree $n$ is

$$P_n(x)=\sum_{k=0}^{n}\frac{f^{(k)}(a)}{k!}(x-a)^k.$$

Here $f^{(k)}(a)$ is the $k$th derivative at the centre, $k!$ is factorial, and $(x-a)^k$ measures how far the input is from the centre. The zeroth derivative is the function itself. At $a=0$, this is called a **Maclaurin polynomial**.

Why these coefficients? The constant term makes the polynomial match the value at $a$; the linear term makes its slope match; the quadratic term matches curvature; each higher term matches another derivative. The result is a local model, not automatically a globally correct replacement.

## Build and use an approximation

To estimate $\ln(1.03)$, let $f(x)=\ln(1+x)$ and expand about $a=0$. Its derivatives at zero give

$$\ln(1+x)=x-\frac{x^2}{2}+\frac{x^3}{3}-\frac{x^4}{4}+\cdots,\qquad -1<x\le1.$$

Using the first four terms,

$$P_4(0.03)=0.03-\frac{0.03^2}{2}+\frac{0.03^3}{3}-\frac{0.03^4}{4}\approx0.029559.$$

The actual value is approximately $0.0295588$. The input is close to the centre, so the approximation is accurate. In general, choose a centre near the input you care about and where the function and its derivatives are manageable.

**Pause and predict:** Why not expand $\ln x$ at $x=0$ to estimate $\ln(1.03)$? The logarithm is not defined at 0. Rewriting it as $\ln(1+x)$ puts the centre at a valid, convenient point.

## A polynomial has an error, and we can bound it

Taylor's theorem describes the difference between the function and its degree-$n$ polynomial:

$$f(x)=P_n(x)+R_n(x),\qquad R_n(x)=\frac{f^{(n+1)}(c)}{(n+1)!}(x-a)^{n+1},$$

for some $c$ between $a$ and $x$. The remainder $R_n$ is the error. If $|f^{(n+1)}(t)|\le M$ between the centre and the target, then

$$|R_n(x)|\le\frac{M|x-a|^{n+1}}{(n+1)!}.$$

This explains two practical facts: moving the target closer to the centre reduces the error, and adding terms often improves the approximation. “Often” matters—the bound and convergence conditions should be checked when accuracy is important.

## Familiar series and where they work

Several useful Maclaurin series are

$$
e^x=\sum_{k=0}^{\infty}\frac{x^k}{k!},\qquad
\sin x=x-\frac{x^3}{3!}+\frac{x^5}{5!}-\cdots,\qquad
\cos x=1-\frac{x^2}{2!}+\frac{x^4}{4!}-\cdots.
$$

The function and its infinite series agree only where the series converges to that function. For $\ln(1+x)$, the series converges for $-1<x\le1$; it does not represent $\ln(1+x)$ for every real input. A finite Taylor polynomial can still be evaluated outside the interval where the infinite series converges, but it may be a poor approximation there.

## Check your understanding

1. Write the degree-3 Maclaurin polynomial for $e^x$.
2. What information is needed to turn Taylor's remainder formula into an error bound?
3. If an input is near 5, why might a Taylor polynomial centred at 5 be more useful than one centred at 0?

**Check:** 1. $1+x+x^2/2+x^3/6$. 2. A bound on the next derivative throughout the interval between centre and target. 3. The powers of $x-5$ are small near the target, typically producing a more accurate local approximation.

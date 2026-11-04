# Mean Value Theorem and Its Applications

## When does an average slope happen instantaneously?

Travel 100 km in 2 hours and your average speed is 50 km/h. If your motion is continuous and has no abrupt velocity breaks, then at some moment your instantaneous speed must have been 50 km/h. The Mean Value Theorem makes this intuition precise: at some interior point, the instantaneous [[derivative|derivative]] matches the interval’s average rate.

If $f$ is continuous on $[a,b]$ and differentiable on $(a,b)$, then there exists at least one $c\in(a,b)$ such that
$$f'(c)=\frac{f(b)-f(a)}{b-a}.$$
The right side is the slope of the secant joining the endpoints; $f'(c)$ is the slope of a tangent parallel to that secant.

Continuity on the closed interval prevents a break in the overall journey. Differentiability inside the interval rules out a sharp corner where the needed tangent may not exist. Both hypotheses matter.

## Find the point promised by the theorem

For $f(x)=x^2$ on $[1,4]$:
$$\frac{f(4)-f(1)}{4-1}=\frac{16-1}{3}=5.$$
Since $f'(x)=2x$, solve $2c=5$, giving $c=5/2$. This lies inside $(1,4)$, as required.

The theorem guarantees **at least one** such point, not necessarily a unique one.

### Rolle’s theorem is the zero-slope case

If $f(a)=f(b)$, the secant slope is zero. Under the same continuity and differentiability conditions, some interior point satisfies $f'(c)=0$. This is Rolle’s theorem, a special case of the Mean Value Theorem.

## What the theorem lets us prove

- **A bound on change:** if $|f'(x)|\le M$ throughout an interval, then $|f(b)-f(a)|\le M|b-a|$.
- **Monotonicity:** if $f'(x)>0$ throughout an interval, then the function is strictly increasing there.
- **Uniqueness:** if $f'(x)$ never vanishes, a differentiable function cannot take the same value at two distinct points.

For example, to show $\ln(1+x)<x$ for $x>0$, apply the theorem to $f(t)=\ln(1+t)$ on $[0,x]$. For some $c\in(0,x)$,
$$\ln(1+x)=f'(c)x=\frac{x}{1+c}<x.$$

## A hypothesis can fail

For $f(x)=|x|$ on $[-1,1]$, the endpoint values agree, so the secant slope is zero. But $f$ has a corner at $0$ and is not differentiable there; elsewhere its derivative is $1$ or $-1$. There is no point with derivative zero. The failure of the differentiability condition explains why the theorem cannot be applied.

## Try it

1. Apply the theorem to $f(x)=x^3$ on $[0,2]$ and find all possible $c$.
2. Can the theorem be used for $f(x)=1/x$ on $[-1,1]$? Identify the failed condition.

**Answers:** 1. The average slope is $4$, so $3c^2=4$ and $c=2/\sqrt3\in(0,2)$. 2. No; $f$ is not continuous on the closed interval because it is undefined at $0$.

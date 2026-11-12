# Mean Value Theorem and Its Applications

## An average rate must occur somewhere

Suppose a bus travels 100 km in 2 hours. Its average speed is 50 km/h. If its motion changes smoothly, it must have travelled at exactly 50 km/h at least once. The bus may have gone faster or slower at other times, but it cannot move continuously from one side of the average to the other without passing through it.

The Mean Value Theorem (MVT) makes this idea precise for a function. Between two points, the average rate of change is

$$
\frac{f(b)-f(a)}{b-a}.
$$

If $f$ is continuous on the whole closed interval $[a,b]$ and differentiable at every interior point $(a,b)$, then at least one $c\in(a,b)$ satisfies

$$
f'(c)=\frac{f(b)-f(a)}{b-a}.
$$

The right side is the slope of the straight secant joining $(a,f(a))$ and $(b,f(b))$. The derivative $f'(c)$ is the slope of the tangent at an interior point. The theorem says some tangent is parallel to that secant.

**Why both conditions?** Continuity prevents a gap or jump on the journey from one endpoint to the other. Differentiability prevents a sharp corner inside where the tangent slope may not exist. Without the conditions, the guaranteed point may not exist.

### Why the formula follows from Rolle's theorem

Draw the secant line through the endpoints:

$$
L(x)=f(a)+\frac{f(b)-f(a)}{b-a}(x-a).
$$

Now subtract that straight line from the curve: $h(x)=f(x)-L(x)$. At both endpoints, the curve and the secant meet, so $h(a)=h(b)=0$. Rolle's theorem says that a continuous, differentiable curve with equal endpoint heights has some interior point $c$ with $h'(c)=0$. But

$$
h'(c)=f'(c)-\frac{f(b)-f(a)}{b-a}.
$$

Setting this equal to zero gives the Mean Value Theorem formula. In other words, the theorem is the zero-endpoint-change case applied after removing the average slope.

## Find the point the theorem guarantees

Let $f(x)=x^2$ on $[1,4]$. The average slope is

$$
\frac{f(4)-f(1)}{4-1}=\frac{16-1}{3}=5.
$$

The instantaneous slope is $f'(x)=2x$. Equating it to 5 gives $2c=5$, so $c=5/2$. This lies inside $(1,4)$, as the theorem promises.

There may be more than one such point for a different function; the theorem promises at least one, not a unique point.

## Rolle's theorem is the level-endpoint case

If $f(a)=f(b)$, the average slope is zero. Under the same continuity and differentiability conditions, some interior point has $f'(c)=0$. This special case is **Rolle's theorem**.

For example, $f(x)=x^2-1$ on $[-1,1]$ has equal endpoint values, both 0. Its derivative is $2x$, which is zero at $c=0$.

## Use the theorem to reason about change

The MVT is useful even when we do not need to find the point $c$ itself.

- If $|f'(x)|\le M$ throughout $[a,b]$, the theorem implies $|f(b)-f(a)|\le M|b-a|$. A bounded slope limits how far the output can move.
- If $f'(x)>0$ throughout an interval, the function is strictly increasing there; if $f'(x)<0$, it is strictly decreasing.
- If $f'(x)$ never vanishes and the theorem applies, $f$ cannot take the same value at two distinct points. Otherwise the MVT on those points would force a zero derivative.

### Worked inequality: $\ln(1+x)<x$

For $x>0$, set $g(t)=\ln(1+t)$ on $[0,x]$. It is continuous on this interval and differentiable inside, so for some $c\in(0,x)$,

$$
\ln(1+x)-\ln(1)=g'(c)x=\frac{x}{1+c}.
$$

Since $c>0$, the denominator is greater than 1, so $x/(1+c)<x$. Therefore $\ln(1+x)<x$. The theorem turns a statement about total change into a statement about a derivative at some intermediate point.

### Check a real journey with units

If a runner's position changes from 0 km to 6 km over 30 minutes, the average speed is

$$
\frac{6\text{ km}}{0.5\text{ h}}=12\text{ km/h}.
$$

If position changes continuously and is differentiable during the run, the theorem says the runner's instantaneous speed was 12 km/h at least once. The theorem does not say when, and it does not say the speed stayed constant.

## A failed hypothesis blocks the conclusion

Consider $f(x)=|x|$ on $[-1,1]$. The endpoint values agree, so the secant slope is 0. But there is a corner at 0: the derivative is $-1$ to the left and $1$ to the right, and does not exist at 0. No point has derivative 0. This does not contradict Rolle's theorem because its differentiability condition fails.

## Try it

1. For $f(x)=x^3$ on $[0,2]$, find every $c$ that satisfies the theorem.
2. Can the theorem be applied to $f(x)=1/x$ on $[-1,1]$? Name the failed condition.
3. If $f'(x)\ge 3$ throughout $[a,b]$, what lower bound does the MVT give for $f(b)-f(a)$ when $a<b$?
4. What role does subtracting the secant line play in the proof?

**Check:** 1. The average slope is 4; $3c^2=4$, so $c=2/\sqrt3$. 2. No; $f$ is not continuous on the interval and is undefined at 0. 3. $f(b)-f(a)\ge3(b-a)$. 4. It makes a new function with equal endpoint values, so Rolle's theorem applies.

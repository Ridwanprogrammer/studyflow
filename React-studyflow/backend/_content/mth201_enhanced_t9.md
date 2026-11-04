# Evaluation of Line and Multiple Integrals

## What is being accumulated?

A single [[integral|integral]] accumulates a quantity along an interval. A line integral accumulates along a curve; a double or triple integral accumulates over a region or volume. The limits and the integration element tell you what is being traversed.

## Follow a curve one parameter at a time

Let a smooth curve be parametrized by $\mathbf r(t)$, $a\le t\le b$.

For a scalar field $f$, the arc-length line integral is
$$\int_C f\,ds=\int_a^b f(\mathbf r(t))\,\|\mathbf r'(t)\|\,dt.$$
The speed factor $\|\mathbf r'(t)\|$ converts a small parameter step $dt$ into a length step $ds$. Omitting it changes what is accumulated.

For a vector field $\mathbf F$, the work integral is
$$\int_C\mathbf F\cdot d\mathbf r
=\int_a^b\mathbf F(\mathbf r(t))\cdot\mathbf r'(t)\,dt.$$
The dot product keeps only the component of the field along the direction of travel, so reversing the curve orientation can change the sign.

### Example: scalar accumulation on a quarter circle

For $x=\cos t$, $y=\sin t$, $0\le t\le\pi/2$, the speed is $1$ and $xy=\cos t\sin t$. Thus
$$\int_Cxy\,ds=\int_0^{\pi/2}\cos t\sin t\,dt=\frac12.$$

## Cover a region with thin slices

For a rectangle $R=[a,b]\times[c,d]$,
$$\iint_R f(x,y)\,dA
=\int_a^b\int_c^d f(x,y)\,dy\,dx,$$
when the integrand is suitably integrable. The inner integral accumulates across one direction; the outer integral sweeps those results across the other.

For a nonrectangular region, sketch the region first and derive bounds that describe it without gaps or overlap. Reversing the integration order can turn complicated bounds into simple ones.

For a solid $E$,
$$\iiint_E f(x,y,z)\,dV$$
accumulates throughout its volume. Setting $f=1$ gives the volume of $E$.

## A reliable evaluation routine

1. Identify the object: curve, planar region, or solid.
2. Write a parametrization or bounds that cover it exactly once.
3. Choose the correct element: $ds$, $d\mathbf r$, $dA$, or $dV$.
4. Substitute the parametrization/bounds before integrating.
5. Evaluate from the inside outward and check signs, units, and orientation.

### Double-integral example

$$\int_1^3\int_1^3(2x-4y^3)\,dy\,dx
=\int_1^3(4x-80)\,dx=-144.$$
The negative result is valid: the integrand is mostly negative over this rectangle. A double integral is signed accumulation, not automatically a positive area or volume.

Volumes formed by rotation are another application of ordinary integration. Rotating $y=f(x)\ge0$ around the $x$-axis gives the disk formula
$$V=\pi\int_a^b[f(x)]^2\,dx,$$
provided the region and axis match those assumptions.

## Try a setup before calculating

1. Parametrize the quarter-circle arc from $(1,0)$ to $(0,1)$ and identify $ds$.
2. Set up, but do not evaluate, $\iint_R(x+y)\,dA$ over $0\le x\le2$, $0\le y\le1$.
3. What does $\iiint_E1\,dV$ represent?

**Answers:** 1. $\mathbf r(t)=(\cos t,\sin t)$, $0\le t\le\pi/2$, and $ds=dt$. 2. $\int_0^2\int_0^1(x+y)\,dy\,dx$. 3. The volume of $E$.

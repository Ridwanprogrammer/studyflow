# Evaluation of Line and Multiple Integrals

## From adding along a path to adding over a region

Imagine measuring rain collected while walking along a winding path. You would add the rain encountered at each tiny piece of the path. If instead you wanted the total rain over a field, you would divide the field into tiny patches and add their contributions. Integrals extend this familiar idea of accumulation:

- An ordinary integral adds along an interval.
- A **line integral** adds along a curve.
- A **double integral** adds over a two-dimensional region.
- A **triple integral** adds throughout a three-dimensional volume.

The symbol after the integral tells you what is being traversed: $ds$ is a small length, $dA$ a small area, and $dV$ a small volume. The integrand tells you how much quantity is contributed at each location.

## Adding a scalar quantity along a curve

Suppose a curve $C$ is traced by a position vector $\mathbf r(t)$ for $a\le t\le b$. The parameter $t$ is a way to move along the curve; it need not represent time. At each parameter value, $\mathbf r(t)$ gives the point on the curve.

For a scalar field $f$—a rule assigning one number to each point—the line integral with respect to arc length is

$$\int_C f\,ds=\int_a^b f(\mathbf r(t))\,\|\mathbf r'(t)\|\,dt.$$

Here, $f(\mathbf r(t))$ is the value at the current point. The derivative $\mathbf r'(t)$ points along the curve, and its magnitude $\|\mathbf r'(t)\|$ is the speed at which the parametrization moves. Thus $\|\mathbf r'(t)\|dt$ is a tiny piece of actual distance, $ds$. This factor matters: without it, the calculation would weight parameter steps rather than lengths.

### Worked example: accumulate along a quarter-circle

Let $C$ be the quarter-circle $x=\cos t$, $y=\sin t$, $0\le t\le\pi/2$, and let $f(x,y)=xy$. This models adding the value of $xy$ at every tiny piece of the arc.

The position is $\mathbf r(t)=(\cos t,\sin t)$, so $\mathbf r'(t)=(-\sin t,\cos t)$ and $\|\mathbf r'(t)\|=1$. The curve is traversed at unit speed, so $ds=dt$. Also, $f(\mathbf r(t))=\cos t\sin t$. Therefore

$$\int_C xy\,ds=\int_0^{\pi/2}\cos t\sin t\,dt=\frac12.$$

**Pause and check:** If the same circle were parametrized with a different speed, would the value of this scalar line integral change? No. The speed factor converts each parameter step into the corresponding physical arc length, so the curve and integrand—not the choice of parameter speed—determine the result.

## Work done by a vector field

A vector field assigns a vector to each point. For example, wind has both strength and direction at every location. If an object moves through that field, only the part of the field pointing along the motion contributes to the field's work.

For a vector field $\mathbf F$ along a parametrized curve,

$$\int_C\mathbf F\cdot d\mathbf r=\int_a^b\mathbf F(\mathbf r(t))\cdot\mathbf r'(t)\,dt.$$

The dot product $\mathbf F(\mathbf r(t))\cdot\mathbf r'(t)$ measures the field's contribution in the direction of travel. A field pushing with the motion contributes positively; one pushing against it contributes negatively; a perpendicular field contributes zero.

### Worked example: direction changes the sign

Take the constant field $\mathbf F=(1,0)$ and move along the straight path $\mathbf r(t)=(t,t)$, $0\le t\le1$. Then $\mathbf r'(t)=(1,1)$, so

$$\int_C\mathbf F\cdot d\mathbf r=\int_0^1(1,0)\cdot(1,1)\,dt=\int_0^1 1\,dt=1.$$

The field points right, and the path moves partly right, so the work is positive. Traversing the same path in reverse changes $\mathbf r'(t)$ to its opposite and changes the sign of the work integral. In contrast, the scalar arc-length integral $\int_C f\,ds$ does not change when the path is reversed.

## Adding over a region: double integrals

Picture a rectangle covered by many tiny tiles. If the tile at $(x,y)$ has area $dA$ and the quantity per unit area there is $f(x,y)$, then that tile contributes approximately $f(x,y)dA$. Adding all the tiles and taking the limit gives a double integral.

For a rectangle $R=[a,b]\times[c,d]$,

$$\iint_R f(x,y)\,dA=\int_a^b\int_c^d f(x,y)\,dy\,dx.$$

The inner integral first accumulates across $y$ while $x$ is held fixed. The outer integral then sweeps those accumulated values across $x$. Reversing the order is possible when the region and integrand allow it, but the bounds must still describe the same region exactly once.

### Worked example: a signed total can be negative

Evaluate the accumulation of $2x-4y^3$ over the square $1\le x\le3$, $1\le y\le3$:

$$\int_1^3\int_1^3(2x-4y^3)\,dy\,dx=\int_1^3(4x-80)\,dx=-144.$$

For each fixed $x$, integrating with respect to $y$ gives $2x(3-1)-(3^4-1^4)=4x-80$. The result is negative because the integrand is negative across this square. A double integral is a **signed** total; it represents area or volume only for particular integrands and setups.

**Try before reading on:** For $R=[0,2]\times[0,1]$, set up the total of $x+y$ over the region. The $y$-slice is accumulated first, then swept across $x$:

$$\iint_R(x+y)\,dA=\int_0^2\int_0^1(x+y)\,dy\,dx.$$

## Adding throughout a solid: triple integrals

The same idea extends to a three-dimensional region $E$. Each tiny box contributes approximately $f(x,y,z)dV$, so

$$\iiint_E f(x,y,z)\,dV$$

adds the field throughout the volume. If $f=1$, every tiny box contributes only its volume, and $\iiint_E1\,dV$ is the volume of $E$. If $f$ is a density, the integral gives total mass.

## A dependable setup routine

Before calculating, identify what is being accumulated and what shape is being covered:

1. Decide whether the object is a curve, a planar region, or a solid.
2. Describe it once: use a parametrization for a curve or bounds for a region.
3. Choose the correct element: $ds$ for arc length, $d\mathbf r$ for directed motion, $dA$ for area, or $dV$ for volume.
4. Substitute the parametrization or bounds into the integrand.
5. Integrate in the stated order, then check signs, units, and—when using $d\mathbf r$—orientation.

The disk method for a solid of revolution is one application of area accumulation: rotating the region under $y=f(x)\ge0$ about the $x$-axis creates circular cross-sections of area $\pi[f(x)]^2$, so

$$V=\pi\int_a^b[f(x)]^2\,dx,$$

provided the region and axis match those assumptions.

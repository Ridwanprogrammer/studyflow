# Evaluation of Line and Multiple Integrals

## The core idea: add tiny contributions over the object

An ordinary integral adds contributions along an interval. The same idea works when the thing being covered is a curve, a flat region, or a solid:

- A **line integral** adds along a curve.
- A **double integral** adds over a two-dimensional region.
- A **triple integral** adds throughout a three-dimensional volume.

The small element tells you what you are covering: $ds$ is a small length, $dA$ a small area, and $dV$ a small volume. The function inside the integral tells how much quantity there is at each location.

## Scalar line integrals: add a value along a path

Imagine walking along a winding path where the ground has a varying density of fallen leaves. A scalar field $f(x,y)$ assigns a number to each point. To find the total weighted amount along the path, multiply each tiny length by the field value there and add.

### Why the speed factor appears

Describe the curve using a parameter $t$:

$$
\mathbf r(t)=(x(t),y(t)),\qquad a\le t\le b.
$$

A tiny change $dt$ moves the point by approximately $\mathbf r'(t)dt$. Its length is approximately the magnitude of that movement:

$$
ds=\|\mathbf r'(t)\|\,dt.
$$

So each tiny contribution is field value times tiny length, $f(\mathbf r(t))\|\mathbf r'(t)\|dt$. Adding these contributions gives

$$
\int_C f\,ds
=\int_a^b f(\mathbf r(t))\,\|\mathbf r'(t)\|\,dt.
$$

The norm $\|\mathbf r'(t)\|$ is the speed along the curve. It converts a parameter step into a physical distance. Without it, changing how quickly the parameter traces the path would change the answer.

### Worked example: quarter-circle path

Take the quarter-circle $x=\cos t$, $y=\sin t$, $0\le t\le\pi/2$, and the scalar field $f(x,y)=xy$.

1. Position: $\mathbf r(t)=(\cos t,\sin t)$.
2. Velocity along the parameter: $\mathbf r'(t)=(-\sin t,\cos t)$.
3. Speed: $\|\mathbf r'(t)\|=\sqrt{\sin^2t+\cos^2t}=1$.
4. Field on the path: $f(\mathbf r(t))=\cos t\sin t$.

Therefore

$$
\int_Cxy\,ds
=\int_0^{\pi/2}\cos t\sin t\,dt
=\left[-\frac12\cos^2t\right]_0^{\pi/2}
=\frac12.
$$

If we traversed the same arc in reverse, the scalar line integral would remain $\frac12$: length has no direction.

## Vector line integrals: add the part of a force along motion

A vector field $\mathbf F$ assigns a direction and magnitude to each point, like wind or force. During a small displacement $d\mathbf r$, only the component of the force along the displacement does work. The dot product selects that component:

$$
dW=\mathbf F\cdot d\mathbf r.
$$

Along $\mathbf r(t)$, the displacement is $d\mathbf r=\mathbf r'(t)dt$, so adding the small work contributions gives

$$
\int_C\mathbf F\cdot d\mathbf r
=\int_a^b\mathbf F(\mathbf r(t))\cdot\mathbf r'(t)\,dt.
$$

Unlike the scalar length integral, this depends on orientation: reversing direction reverses $d\mathbf r$ and changes the sign.

### Worked example: a constant force along a diagonal

Let $\mathbf F=(1,0)$ and move along $\mathbf r(t)=(t,t)$, $0\le t\le1$. Then $\mathbf r'(t)=(1,1)$, and

$$
\int_C\mathbf F\cdot d\mathbf r
=\int_0^1(1,0)\cdot(1,1)\,dt
=\int_0^1 1\,dt
=1.
$$

The force points right; the path has a rightward component, so the work is positive. Reversing the path gives work $-1$. A perpendicular force would contribute zero because its dot product with the direction of motion is zero.

## Double integrals: add over tiny area patches

Picture a field spread over a flat region, such as a varying mass density on a sheet. Divide the region into tiny patches. A patch with area $\Delta A$ near $(x_{ij},y_{ij})$ contributes approximately $f(x_{ij},y_{ij})\Delta A$. Summing all patches and taking the limit gives

$$
\iint_R f(x,y)\,dA.
$$

This is the two-dimensional version of a Riemann sum. For a rectangle $R=[a,b]\times[c,d]$, the patches can be arranged in rows and columns. Accumulate along $y$ first, holding $x$ fixed, then sweep across $x$:

$$
\iint_R f(x,y)\,dA
=\int_a^b\left(\int_c^d f(x,y)\,dy\right)dx.
$$

The inner integral produces a value for each fixed $x$. The outer integral adds those values across the rectangle. Under the usual integrability conditions, the order may be reversed if the limits are changed to describe the same region.

### Worked example: evaluate an iterated integral

Find the total of $f(x,y)=x+2y$ over $0\le x\le1$, $0\le y\le2$:

$$
\begin{aligned}
\iint_R(x+2y)\,dA
&=\int_0^1\int_0^2(x+2y)\,dy\,dx\\
&=\int_0^1[xy+y^2]_{y=0}^{y=2}\,dx\\
&=\int_0^1(2x+4)\,dx\\
&=[x^2+4x]_0^1=5.
\end{aligned}
$$

Inside the inner integral, $x$ is fixed, so the antiderivative with respect to $y$ is $xy+y^2$. The outer integral then adds these slice totals.

### Bounds describe the region, not just the integrand

For a nonrectangular region, sketch it and determine which variable runs between which curves. For the triangular region $0\le x\le1$, $0\le y\le x$, one valid setup is

$$
\iint_R 1\,dA=\int_0^1\int_0^x1\,dy\,dx.
$$

It gives $\int_0^1x\,dx=1/2$, the triangle's area. Reversing the order describes the same triangle as $0\le y\le1$, $y\le x\le1$:

$$
\int_0^1\int_y^1 1\,dx\,dy=\frac12.
$$

Correct bounds cover the region once, with no gaps or overlap.

## Triple integrals: add over tiny volume pieces

In a solid $E$, a tiny box has volume $dV$. If $f(x,y,z)$ is density, its contribution is approximately $f(x,y,z)dV$, so the total is

$$
\iiint_E f(x,y,z)\,dV.
$$

When $f=1$, the integral is just the volume. For example, a unit cube has

$$
\iiint_{[0,1]^3}1\,dV
=\int_0^1\int_0^1\int_0^1 1\,dz\,dy\,dx
=1.
$$

If $f$ is mass per unit volume, the integral gives total mass. The meaning depends on what the integrand measures.

## Volumes from rotating a curve

Suppose the region under $y=f(x)\ge0$ is rotated around the $x$-axis. At position $x$, a thin slice becomes a disk with radius $f(x)$ and area $\pi[f(x)]^2$. A thin disk of thickness $dx$ has volume approximately its area times its thickness. Add all the disks:

$$
V=\int_a^b\pi[f(x)]^2\,dx
=\pi\int_a^b[f(x)]^2\,dx.
$$

For example, rotating $y=x$ from $x=0$ to $x=1$ gives

$$
V=\pi\int_0^1x^2\,dx
=\pi\left[\frac{x^3}{3}\right]_0^1
=\frac{\pi}{3}.
$$

The radius must be measured from the axis of rotation. If the region has a hole, washer or shell methods may be needed instead of this disk formula.

## A dependable setup routine

1. Identify the object: curve, planar region, or solid.
2. Decide what the integrand represents (density, work, area, volume, or another quantity).
3. Describe the path or region exactly once using a parametrization or bounds.
4. Choose the correct small element: $ds$, $d\mathbf r$, $dA$, or $dV$.
5. Substitute the parametrization or bounds before integrating.
6. Check units, signs, orientation, and whether the bounds cover the intended object.

## Practice before checking

1. For the quarter-circle $x=\cos t$, $y=\sin t$, find the speed and $ds$.
2. Set up $\iint_R(x+y)\,dA$ for $0\le x\le2$, $0\le y\le1$, integrating $y$ first.
3. What does $\iiint_E1\,dV$ represent?

**Check:** 1. Speed is 1, so $ds=dt$. 2. $\int_0^2\int_0^1(x+y)\,dy\,dx$. 3. The volume of $E$.

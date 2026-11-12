# Chain Rule, Extrema, and Lagrange Multipliers

## Chain rule: track how a change travels through dependent quantities

Suppose a temperature $z=f(x,y)$ depends on location, while your location changes with time: $x=x(t)$ and $y=y(t)$. Time changes $z$ indirectly along two routes:

$$
t\longrightarrow x\longrightarrow z,
\qquad
t\longrightarrow y\longrightarrow z.
$$

A small time change $dt$ produces approximate input changes

$$
dx=\frac{dx}{dt}dt,\qquad dy=\frac{dy}{dt}dt.
$$

The local change in the surface value is

$$
dz\approx f_x\,dx+f_y\,dy.
$$

Divide by $dt$ and take the limit to get the multivariable chain rule:

$$
\frac{dz}{dt}=f_x\frac{dx}{dt}+f_y\frac{dy}{dt}.
$$

Each term is “rate along one route”: the effect of changing one input times how fast that input changes. Add the routes because both contribute to the output's change.

### Worked example with two paths of change

Let

$$
z=x^2y,\qquad x=t^2,\qquad y=\sin t.
$$

First find the coordinate slopes: $f_x=2xy$ and $f_y=x^2$. The input rates are $dx/dt=2t$ and $dy/dt=\cos t$. Substituting into the chain rule gives

$$
\frac{dz}{dt}
=(2xy)(2t)+(x^2)(\cos t).
$$

Now replace $x$ and $y$ with their expressions in $t$:

$$
\frac{dz}{dt}=4t^3\sin t+t^4\cos t.
$$

The two terms are separate contributions: one from the change in $x$, the other from the change in $y$.

## Find peaks and valleys by first finding flat points

For a one-variable graph, a smooth interior maximum or minimum must have horizontal tangent, so $f'(a)=0$. For a surface, an interior smooth peak or valley must be flat in both coordinate directions:

$$
f_x(a,b)=0,\qquad f_y(a,b)=0.
$$

Equivalently, $\nabla f(a,b)=(0,0)$. These points are called **critical points**. They are candidates, not automatically extrema: a saddle also has zero slope in every coordinate direction at the point.

For example,

$$
f(x,y)=x^2+y^2-4x+6y
=(x-2)^2+(y+3)^2-13.
$$

The squared terms are smallest together at $(2,-3)$, so this is a minimum with value $-13$. This completing-the-square view gives the answer and explains why it is a minimum.

By contrast, $g(x,y)=x^2-y^2$ has zero gradient at $(0,0)$, but values are positive along the $x$-axis and negative along the $y$-axis. So the point is a **saddle**, not a maximum or minimum.

## How the second-derivative test classifies a critical point

Near a critical point, the first-order (slope) terms vanish. The leading change is approximately a quadratic expression:

$$
\Delta f\approx
\frac12 f_{xx}(\Delta x)^2
+f_{xy}\Delta x\Delta y
+\frac12 f_{yy}(\Delta y)^2.
$$

The second derivatives describe how the surface bends in different directions. To summarize their combined effect, compute

$$
D=f_{xx}f_{yy}-(f_{xy})^2.
$$

At a critical point:

- If $D>0$ and $f_{xx}>0$, the surface bends upward in every direction: a local minimum.
- If $D>0$ and $f_{xx}<0$, it bends downward in every direction: a local maximum.
- If $D<0$, the curvature has opposite signs in different directions: a saddle.
- If $D=0$, this test cannot decide.

For $x^2-y^2$, $f_{xx}=2$, $f_{yy}=-2$, $f_{xy}=0$, so $D=-4<0$: a saddle. The test classifies a local shape; it does not by itself prove a global maximum or minimum. On a closed bounded region, also check the boundary.

## Constraints: find the best point along an allowed path

Suppose a factory wants to maximize output $f(x,y)$ but must use a fixed amount of material, described by $g(x,y)=c$. We can no longer move freely in every direction; we must stay on the constraint curve.

At a constrained optimum, small movement along the constraint cannot improve $f$. Thus the objective's level curve just touches the constraint instead of crossing it. Their normal directions align, which gives

$$
\nabla f=\lambda\nabla g,\qquad g(x,y)=c.
$$

The vector $\nabla g$ is perpendicular to the constraint curve, and at the touching point $\nabla f$ points in that same or opposite direction. The number $\lambda$ is the **Lagrange multiplier**. Under suitable conditions, it measures how the optimal objective value changes if the constraint value changes slightly.

### Worked example: maximize a product with a fixed sum

Maximize $f(x,y)=xy$ subject to $x+y=10$, with $x,y>0$. The constraint is $g(x,y)=x+y$. Its gradient is $(1,1)$, while $\nabla f=(y,x)$. The multiplier equations are

$$
(y,x)=\lambda(1,1),\qquad x+y=10.
$$

Thus $y=\lambda$ and $x=\lambda$, so $x=y=5$ and $f=25$. To verify it really is the maximum, substitute $y=10-x$:

$$
f(x,10-x)=x(10-x)=25-(x-5)^2\le25.
$$

The squared term can never be negative, so no allowed point gives a larger product.

### Worked example: closest point on a line

Find the point on $x+2y=5$ closest to the origin. Distance is

$$
d=\sqrt{x^2+y^2}.
$$

Because the square root is increasing, minimizing distance is equivalent to minimizing its square $f=x^2+y^2$. The constraint is $g=x+2y=5$. The multiplier equation is

$$
(2x,2y)=\lambda(1,2),\qquad x+2y=5.
$$

From $2x=\lambda$ and $2y=2\lambda$, we get $x=\lambda/2$ and $y=\lambda$. Substitute into the constraint:

$$
\frac{\lambda}{2}+2\lambda=5
\quad\Longrightarrow\quad
\lambda=2.
$$

Thus $(x,y)=(1,2)$, and the minimum distance is $\sqrt{1^2+2^2}=\sqrt5$.

## A dependable routine

1. For a chain rule question, draw or list which variables depend on which others.
2. Multiply the rate along each dependency path and add the contributions.
3. For unconstrained extrema, solve $\nabla f=0$, then classify every critical point.
4. For constrained extrema, solve $\nabla f=\lambda\nabla g$ together with the constraint.
5. Evaluate candidates and check boundaries or endpoints when a global answer is required.

## Practice

1. If $z=x^2+y^2$, $x=t$, and $y=2t$, find $dz/dt$ in terms of $t$.
2. Classify the critical point of $f=x^2+4y^2$ at the origin.
3. Find the minimum of $x^2+y^2$ subject to $x+y=4$.

**Check:** 1. $dz/dt=2x(1)+2y(2)=2t+8t=10t$. 2. A minimum, since $x^2+4y^2\ge0$ with equality only at the origin. 3. The multiplier equations give $x=y=2$ and minimum value $8$.

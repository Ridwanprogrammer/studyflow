# Chain Rule, Extrema, and Lagrange Multipliers

## Changes travel along dependency paths

Suppose $z=f(x,y)$, but $x$ and $y$ both depend on time $t$. A change in $t$ affects $z$ through both routes, so the multivariable chain rule adds their [[derivative|rates of change]]:
$$\frac{dz}{dt}=f_x\frac{dx}{dt}+f_y\frac{dy}{dt}.$$
If $x=x(u,v)$ and $y=y(u,v)$, then
$$\frac{\partial z}{\partial u}=f_x\frac{\partial x}{\partial u}+f_y\frac{\partial y}{\partial u}.$$
The pattern is “rate along each route, multiplied and added.”

For $z=x^2y$, $x=t^2$, $y=\sin t$:
$$\frac{dz}{dt}=2xy(2t)+x^2\cos t=4t^3\sin t+t^4\cos t.$$

## Unconstrained peaks, valleys, and saddles

At an interior local maximum or minimum of a differentiable function, the gradient is zero: $\nabla f=0$. Such points are candidates, not automatic extrema. A saddle can also have zero gradient.

For two variables, use
$$D=f_{xx}f_{yy}-(f_{xy})^2.$$
At a critical point: if $D>0$ and $f_{xx}>0$, there is a local minimum; if $D>0$ and $f_{xx}<0$, a local maximum; if $D<0$, a saddle; if $D=0$, the test is inconclusive. For a global extremum on a closed bounded region, also check its boundary.

## When movement is restricted: the multiplier idea

Imagine walking on a contour line of a constraint $g(x,y)=c$. You may move only along that contour. At a constrained optimum, the objective’s level curve just touches the constraint; their gradients point in the same or opposite direction:
$$\nabla f=\lambda\nabla g,\qquad g(x,y)=c.$$
The multiplier $\lambda$ measures the rate at which the optimal objective value changes when the constraint value changes, under suitable regularity conditions.

### A complete example

Maximize $f(x,y)=xy$ subject to $x+y=10$, with $x,y>0$. Let $g=x+y$:
$$\nabla f=(y,x),\qquad \nabla g=(1,1).$$
The multiplier equations and constraint are
$$y=\lambda,\quad x=\lambda,\quad x+y=10.$$
Thus $x=y=5$ and $f=25$. To confirm it is a maximum, substitute $y=10-x$:
$$f(x,10-x)=x(10-x)=25-(x-5)^2\le25.$$
This last check establishes the global maximum on the allowed interval, not merely a candidate.

## A reliable solving routine

1. Name the objective $f$ and write the constraint as $g=c$.
2. Compute both gradients carefully.
3. Solve $\nabla f=\lambda\nabla g$ together with the constraint.
4. Evaluate $f$ at every candidate.
5. Check endpoints, boundaries, and whether the candidates are maxima, minima, or neither.

For three independent variables, the same equation uses gradients in $\mathbb{R}^3$: $\nabla f=\lambda\nabla g$.

## Practice

1. Find the critical point of $f=x^2+y^2-4x+6y$ and classify it.
2. Find the minimum of $x^2+y^2$ subject to $x+2y=5$.

**Answers:** 1. $(2,-3)$; the Hessian is positive definite, so it is a minimum, with value $-13$. 2. The multiplier equations give $(x,y)=(1,2)$ and minimum $5$.

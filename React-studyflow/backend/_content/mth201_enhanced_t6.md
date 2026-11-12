# Partial Derivatives

## Change one input while freezing the rest

For a landscape $z=f(x,y)$, changing $x$ while holding $y$ fixed traces a cross-section through the surface. The slope of that cross-section is a partial [[derivative|derivative]] with respect to $x$.

At $(a,b)$, the partial derivatives are
$$f_x(a,b)=\lim_{h\to0}\frac{f(a+h,b)-f(a,b)}{h},\qquad f_y(a,b)=\lim_{h\to0}\frac{f(a,b+h)-f(a,b)}{h},$$
when the limits exist. In the first limit, $y$ is frozen; in the second, $x$ is frozen.

For $f(x,y)=x^2y+3y^2$, differentiate with respect to $x$ as though $y$ were a constant:
$$f_x=2xy.$$
With respect to $y$, treat $x$ as constant:
$$f_y=x^2+6y.$$
At $(1,2)$, the two slopes are $f_x=4$ and $f_y=13$.

## A surface’s local direction map

For three variables $F(x,y,z)$, there are three first partial derivatives:
$$F_x,\qquad F_y,\qquad F_z.$$
They measure change in each coordinate direction with the other two held fixed. The gradient collects them:
$$\nabla F=(F_x,F_y,F_z).$$
For $F=x^2+y^2+z^2$, $\nabla F=(2x,2y,2z)$, which points in the direction of steepest increase.

## Repeated differentiation

Differentiate a partial derivative again to get second partials such as $f_{xx}$ and mixed partials such as $f_{xy}$. For a sufficiently smooth function, Clairaut’s theorem says $f_{xy}=f_{yx}$.

For $f=7x^2-x^3y^4+5x^4y^3$:
$$f_x=14x-3x^2y^4+20x^3y^3,\qquad f_y=-4x^3y^3+15x^4y^2,$$
and
$$f_{xy}=f_{yx}=-12x^2y^3+60x^3y^2.$$

## Common traps

- “Hold constant” applies only to the variables you are not differentiating with respect to.
- A partial derivative is a local rate of change, not the function’s value.
- Equality of mixed partials requires appropriate smoothness near the point; it is not automatic for every function.

## Try these

1. Find $f_x$ and $f_y$ for $f(x,y)=x^3y+2y$.
2. Find $\nabla F$ for $F(x,y,z)=xy+z^2$.

**Answers:** 1. $f_x=3x^2y$, $f_y=x^3+2$. 2. $\nabla F=(y,x,2z)$.

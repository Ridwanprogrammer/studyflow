# Partial Derivatives

## A surface has a different slope in different directions

Imagine standing on a hill. Walking east may take you uphill, while walking north may take you downhill. A surface's height depends on two coordinates, so its rate of change can differ depending on which coordinate you change.

Let $z=f(x,y)$ describe the height of a surface. To find the slope in the $x$ direction at $(a,b)$, hold $y=b$ fixed and move only $x$. This creates a cross-section through the surface. Its slope is the **partial derivative with respect to $x$**.

## Form the definition by freezing one coordinate

Start at $(a,b)$, change $x$ by a small amount $h$, and do not change $y$. The height changes from $f(a,b)$ to $f(a+h,b)$. The average rate of height-change per unit $x$-change is

$$
\frac{f(a+h,b)-f(a,b)}{h}.
$$

Letting $h$ approach zero gives

$$
f_x(a,b)=\lim_{h\to0}\frac{f(a+h,b)-f(a,b)}{h}.
$$

For the slope in the $y$ direction, freeze $x=a$ and move only $y$:

$$
f_y(a,b)=\lim_{h\to0}\frac{f(a,b+h)-f(a,b)}{h}.
$$

The small change $h$ is used in each direction separately. These limits are ordinary one-variable derivatives of the cross-sections.

## Work a partial derivative from its definition

Take

$$
f(x,y)=x^2y+3y^2.
$$

To find $f_x$, freeze $y$ and replace $x$ by $x+h$:

$$
\begin{aligned}
f_x(x,y)
&=\lim_{h\to0}\frac{f(x+h,y)-f(x,y)}{h}\\
&=\lim_{h\to0}
\frac{(x+h)^2y+3y^2-(x^2y+3y^2)}{h}\\
&=\lim_{h\to0}\frac{(2xh+h^2)y}{h}\\
&=\lim_{h\to0}(2xy+hy)=2xy.
\end{aligned}
$$

Notice why $3y^2$ disappears: while differentiating with respect to $x$, $y$ is a fixed number, so that whole term does not change.

To find $f_y$, freeze $x$. Now differentiate each term as a function of $y$:

$$
f_y(x,y)=x^2+6y.
$$

At $(1,2)$, the surface has slope $f_x=4$ in the $x$ direction and slope $f_y=13$ in the $y$ direction. These are two cross-section slopes at the same point.

**Pause and calculate:** For $g(x,y)=x^2+xy+y^2$, the $x$-partial is $2x+y$ because $y$ is fixed, and the $y$-partial is $x+2y$ because $x$ is fixed. At $(1,2)$ they are 4 and 5.

## A practical differentiation rule

When calculating a partial derivative, differentiate as usual with respect to the chosen variable and temporarily treat all other variables as constants.

For example, if

$$
q(x,y)=5x^3y-2xy^2+7y,
$$

then

$$
q_x=15x^2y-2y^2,
\qquad
q_y=5x^3-4xy+7.
$$

The rule “hold the other variables constant” is not a trick; it follows from the definition because the difference quotient changes only one coordinate.

## More than two inputs: gradient as a direction summary

For $F(x,y,z)$ there are three coordinate slopes:

$$
F_x,\qquad F_y,\qquad F_z.
$$

Collect them into the **gradient**:

$$
\nabla F=(F_x,F_y,F_z).
$$

Why collect these values? If a small movement has components $(dx,dy,dz)$, its first-order effect on the output is

$$
dF\approx F_x\,dx+F_y\,dy+F_z\,dz
=\nabla F\cdot(dx,dy,dz).
$$

The dot product combines the movement direction with the coordinate slopes. The gradient points in the direction of steepest increase, and its length gives the largest rate of increase per unit distance.

For $F=x^2+y^2+z^2$,

$$
\nabla F=(2x,2y,2z).
$$

At $(1,0,0)$, this is $(2,0,0)$: the function increases fastest in the positive $x$ direction there.

## Second partial derivatives describe how slopes change

Differentiate a first partial derivative again. For example, $f_{xx}$ says how the $x$-slope changes as $x$ changes; $f_{xy}$ says how the $x$-slope changes as $y$ changes.

For

$$
f(x,y)=7x^2-x^3y^4+5x^4y^3,
$$

the first partial derivatives are

$$
f_x=14x-3x^2y^4+20x^3y^3,
\qquad
f_y=-4x^3y^3+15x^4y^2.
$$

Now differentiate $f_x$ with respect to $y$:

$$
f_{xy}=-12x^2y^3+60x^3y^2.
$$

For functions whose second partial derivatives are continuous near a point, Clairaut's theorem gives $f_{xy}=f_{yx}$. The smoothness condition matters; equality is not automatic for every function.

## Common traps and practice

- When finding $f_x$, keep every $y$ fixed; when finding $f_y$, keep every $x$ fixed.
- A partial derivative is a slope or rate, not the height $f(x,y)$ itself.
- Evaluate at a point only after finding the derivative formula, unless the definition directly asks for the point.

1. For $r(x,y)=x^3y+2y$, find $r_x$ and $r_y$.
2. Find $\nabla F$ for $F(x,y,z)=xy+z^2$.
3. If $f_x(a,b)=0$, does that alone prove $(a,b)$ is a maximum or minimum?

**Check:** 1. $r_x=3x^2y$, $r_y=x^3+2$. 2. $\nabla F=(y,x,2z)$. 3. No; it only says the slope in the $x$ direction is zero. Other directions must also be considered.

# Differentials and Linear Approximations

## Use the tangent to predict a nearby output

Look at a curved road over a very short stretch: it is hard to distinguish from a straight road. A tangent line is that local straight-line model. It predicts what a function will do after a small input change.

The prediction is useful because straight-line change is easy to calculate. It is not exact because the real graph curves away from its tangent.

## Separate the exact change from the tangent's estimate

Start at input $x=a$. Change the input by $\Delta x$, so the new input is $a+\Delta x$. The exact output change is

$$
\Delta y=f(a+\Delta x)-f(a).
$$

Near $a$, the graph's slope is approximately $f'(a)$. A straight line with slope $f'(a)$ predicts a change equal to slope times horizontal change:

$$
dy=f'(a)\,dx,\qquad dx=\Delta x.
$$

Here $\Delta y$ is the actual finite change, while $dy$ is the linear estimate. The symbol $dx$ is the input step used in the tangent model.

### Work out both changes for a parabola

Let $f(x)=x^2$, start at $a=3$, and change the input by $\Delta x=0.1$. The exact change is

$$
\Delta y=f(3.1)-f(3)=3.1^2-3^2=9.61-9=0.61.
$$

The derivative is $f'(x)=2x$, so the tangent slope at 3 is 6. Its prediction is

$$
dy=6(0.1)=0.6.
$$

The difference is $0.01$. In fact, for this example

$$
\Delta y=(a+\Delta x)^2-a^2
=2a\Delta x+(\Delta x)^2,
\qquad
dy=2a\Delta x.
$$

The tangent keeps the term proportional to the small step and ignores the smaller squared term. That is why the estimate improves as the input step shrinks.

## Derive the tangent-plane formula for two inputs

For a surface $z=f(x,y)$, change both inputs from $(a,b)$ to $(a+\Delta x,b+\Delta y)$. The exact output change is

$$
\Delta z=f(a+\Delta x,b+\Delta y)-f(a,b).
$$

For small changes, first move along $x$ while holding $y=b$:

$$
\text{change from }x\approx f_x(a,b)\Delta x.
$$

Then move along $y$ near the same point:

$$
\text{change from }y\approx f_y(a,b)\Delta y.
$$

Add these first-order contributions:

$$
dz=f_x(a,b)\,dx+f_y(a,b)\,dy,
\qquad
dx=\Delta x,\quad dy=\Delta y.
$$

This is the **total differential**. It is the change predicted by the tangent plane. The matching linear approximation for the output itself is

$$
f(a+\Delta x,b+\Delta y)
\approx
f(a,b)+f_x(a,b)\Delta x+f_y(a,b)\Delta y.
$$

The point $(a,b)$ is the base point; $f(a,b)$ is the known starting output; each partial derivative converts one coordinate change into its predicted output contribution.

### Example: estimate the change in a product

Let $f(x,y)=xy$ near $(2,3)$. The starting value is 6. The partial derivatives are $f_x=y$ and $f_y=x$, so at $(2,3)$ they equal 3 and 2. If $dx=0.1$ and $dy=-0.05$, then

$$
dz=3(0.1)+2(-0.05)=0.2.
$$

Thus the tangent plane estimates the new value as $6+0.2=6.2$. The exact value is

$$
f(2.1,2.95)=2.1(2.95)=6.195.
$$

The error is $0.005$. Expanding the product shows exactly what the linear estimate omitted:

$$
(2+dx)(3+dy)=6+3dx+2dy+dx\,dy.
$$

The differential includes the first two change terms; the product $dx\,dy$ is a smaller second-order term.

## Estimate a square root without a calculator

Estimate $\sqrt{100.1}$. Let $f(x)=\sqrt{x}$ and use the nearby value $a=100$, where $f(100)=10$. The slope is

$$
f'(x)=\frac{1}{2\sqrt{x}},\qquad f'(100)=\frac1{20}.
$$

The input increases by $dx=0.1$, so

$$
\sqrt{100.1}
\approx10+\frac1{20}(0.1)
=10.005.
$$

This is close because 100.1 is near 100 and the square-root curve changes only slightly over that short interval.

## More inputs and measurement uncertainty

For a function $F$ of $n$ inputs, add the predicted contribution from each input:

$$
dF=\sum_{i=1}^{n}F_{x_i}\,dx_i.
$$

This also helps estimate how measurement errors affect a result. If the input errors are small, then $dF$ estimates the signed output error. For a conservative bound, the triangle inequality gives

$$
|dF|\le\sum_{i=1}^{n}|F_{x_i}|\,|dx_i|.
$$

The partial derivative tells how sensitive the output is to that input near the chosen point. A small input uncertainty can still matter if the corresponding partial derivative is large.

## What this estimate does not say

The differential is a first-order estimate. It is not automatically an exact change, and it may be poor for a large input step or a function that bends sharply near the base point. If high accuracy matters, compare with the exact change when possible, use a smaller step, or include higher-order Taylor terms.

## Check the distinction

1. For $f(x)=x^2$ at $a=2$, calculate $\Delta y$ and $dy$ when $\Delta x=0.05$.
2. Estimate $f(1.1,1.9)$ for $f(x,y)=x^2+y^2$ near $(1,2)$ using the total differential.
3. If a measurement $x$ is uncertain by at most 0.02 and $f'(x)=5$ near the measurement, approximately how large could the output error be?

**Check:** 1. $\Delta y=2.05^2-2^2=0.2025$; $dy=4(0.05)=0.2$. 2. Base value is 5, and $dz=2(0.1)+4(-0.1)=-0.2$, giving estimate 4.8. 3. About $5(0.02)=0.1$ output units.

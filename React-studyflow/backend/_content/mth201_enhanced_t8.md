# Differentials and Linear Approximations

## Use a tangent to estimate a small change

If a curved road is viewed over a very short stretch, it looks nearly straight. A tangent line uses that local straightness to estimate what happens after a small input change. The estimate is not generally exact, because the curve bends away from the tangent.

For $y=f(x)$, starting at $x=a$ and changing the input by $\Delta x$ gives the exact output increment

$$\Delta y=f(a+\Delta x)-f(a).$$

The tangent's slope at $a$ is $f'(a)$. The **differential** records the tangent's predicted change:

$$dx=\Delta x,\qquad dy=f'(a)\,dx.$$

The increment $\Delta y$ is the actual finite change; $dy$ is its linear estimate.

For $f(x)=x^2$ at $a=3$, let $\Delta x=0.1$. The exact change is

$$\Delta y=3.1^2-3^2=0.61,$$

while the tangent predicts

$$dy=f'(3)(0.1)=6(0.1)=0.6.$$

The difference, 0.01, is small because the input change is small, but the two quantities are not identical.

## Extend the estimate to several inputs

For a surface $z=f(x,y)$, small changes in both coordinates give the exact increment

$$\Delta z=f(x+\Delta x,y+\Delta y)-f(x,y).$$

Near a point $(a,b)$, the tangent plane predicts the change by

$$dz=f_x(a,b)\,dx+f_y(a,b)\,dy,\qquad dx=\Delta x,\quad dy=\Delta y.$$

Each partial derivative measures how the output changes in one coordinate direction while the other input is held fixed. The total differential adds the two predicted contributions.

### Worked estimate for a product

Let $f(x,y)=xy$ near $(2,3)$. The base output is 6, and the partial derivatives there are $f_x=3$ and $f_y=2$. For $dx=0.1$ and $dy=-0.05$,

$$dz=3(0.1)+2(-0.05)=0.2.$$

So the tangent-plane estimate is $f(2.1,2.95)\approx6.2$. The exact product is 6.195. The difference is caused by the nonlinear term $dx\,dy$, which a first-order linear model omits.

For $n$ inputs, the same idea is

$$dF=\sum_{i=1}^{n}F_{x_i}\,dx_i.$$

## Estimate a value and understand measurement error

For $f(x)=\sqrt{x}$ near $a=100$, the known value is 10 and the derivative is $f'(100)=1/20$. Thus

$$\sqrt{100.1}\approx10+\frac{0.1}{20}=10.005.$$

This works because the function is nearly linear over such a small interval.

The same calculation estimates how uncertainty in a measurement affects an output. If the input uncertainty is small, then $|dy|\approx|f'(a)|\,|dx|$. For multiple inputs, each partial derivative measures sensitivity to one input. When estimating signed change, keep the signs: effects may reinforce or cancel each other.

## Check the distinction

1. For $f(x)=x^2$ at $a=2$, calculate the exact increment and differential when $\Delta x=0.05$.
2. Use a linear approximation to estimate $f(1.1,1.9)$ for $f(x,y)=x^2+y^2$ near $(1,2)$.
3. In one sentence, distinguish an increment from a differential.

**Check:** 1. $\Delta y=0.2025$ and $dy=0.2$. 2. The base value is 5 and $dz=2(0.1)+4(-0.1)=-0.2$, so the estimate is 4.8. 3. The increment is the exact finite output change; the differential is the first-order tangent estimate.

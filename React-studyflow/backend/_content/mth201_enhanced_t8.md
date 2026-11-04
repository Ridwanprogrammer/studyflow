# Differentials and Linear Approximations

## A small input change has two related descriptions

For $y=f(x)$, changing the input from $a$ to $a+\Delta x$ produces the **actual increment**; the tangent’s slope comes from the [[derivative|derivative]] at the base point:
$$\Delta y=f(a+\Delta x)-f(a).$$
The differential describes the change predicted by the tangent line:
$$dx=\Delta x,\qquad dy=f'(a)\,dx.$$
The increment is the exact finite change; the differential is its linear estimate. For small $\Delta x$, they are close, but not generally equal.

For $f(x)=x^2$ at $a=3$, let $\Delta x=0.1$. Then
$$\Delta y=3.1^2-3^2=0.61,\qquad dy=f'(3)(0.1)=6(0.1)=0.6.$$
The tangent prediction misses by $0.01$ because the curve bends away from its tangent.

## Extend the idea to several inputs

For $z=f(x,y)$, small input increments $\Delta x,\Delta y$ produce
$$\Delta z=f(x+\Delta x,y+\Delta y)-f(x,y).$$
The total differential is the first-order prediction:
$$dz=f_x\,dx+f_y\,dy,\qquad dx=\Delta x,\quad dy=\Delta y.$$
For $n$ inputs, $dF=\sum_{i=1}^{n}F_{x_i}\,dx_i$. This applies in particular to a function of three independent variables.

The corresponding linear approximation near $(a,b)$ is
$$f(x,y)\approx f(a,b)+f_x(a,b)(x-a)+f_y(a,b)(y-b).$$
It is the tangent plane’s output, and $dz$ estimates the change from the base value.

### Estimate a product near a known point

Take $f(x,y)=xy$ near $(2,3)$. Here $f=6$, $f_x=3$, and $f_y=2$. For $dx=0.1$ and $dy=-0.05$:
$$dz=3(0.1)+2(-0.05)=0.2.$$
So $f(2.1,2.95)\approx6.2$. The exact value is $6.195$; the difference is the higher-order effect omitted by the linear model.

## Turn a tangent into a numerical estimate

For $f(x)=\sqrt{x}$ near $a=100$, $f(100)=10$ and $f'(100)=1/20$. Therefore
$$\sqrt{100.1}\approx10+\frac{0.1}{20}=10.005.$$
Choose a nearby input whose function value and derivative are easy to calculate.

The differential also estimates propagated measurement error: if input errors are small, $|dy|\approx|f'(a)|\,|dx|$. For several inputs, $|dz|$ is estimated from the contributions $f_xdx$ and $f_ydy$; signs matter when estimating the signed change.

## Check the distinction

1. For $f(x)=x^2$ at $a=2$, compute $\Delta y$ and $dy$ when $\Delta x=0.05$.
2. For $f(x,y)=x^2+y^2$ near $(1,2)$, estimate $f(1.1,1.9)$ using the total differential.
3. In one sentence, distinguish an increment from a differential.

**Answers:** 1. $\Delta y=0.2025$, $dy=0.2$. 2. Base value $5$, with $dz=2(0.1)+4(-0.1)=-0.2$, so estimate $4.8$. 3. The increment is the exact finite change; the differential is its first-order linear estimate.

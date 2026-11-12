# Revision of Differentiation and Integration

## Two questions about change

Imagine watching a car. Its position tells you where it is. Its speedometer tells you how quickly its position is changing now. Its trip meter tells you how much distance has accumulated over a period.

Calculus gives names to these two kinds of questions:

- **Differentiation** asks for an instantaneous rate of change.
- **Integration** adds up many small contributions over an interval.

The connection between them is powerful, but first understand each operation on its own.

## Derivatives: build an instantaneous slope from nearby averages

For a straight line, slope is change in height divided by change across. On a curve, that ratio between two distinct points is an **average** slope. To find the slope at one particular point, move the second point closer and closer until the average slope approaches the tangent slope.

Let the starting input be $a$ and move it by a small amount $h$. The output changes from $f(a)$ to $f(a+h)$. The average rate of change over this small step is

$$
\frac{f(a+h)-f(a)}{h}.
$$

Letting $h$ approach zero produces the **derivative**:

$$
f'(a)=\lim_{h\to0}\frac{f(a+h)-f(a)}{h}.
$$

The numerator is output change; the denominator is input change; their ratio is change per unit input. The limit asks what that ratio approaches as the input step becomes arbitrarily small. If the limit exists, it is the instantaneous rate at $a$.

### Derive a derivative from the definition

Take $f(x)=x^2$. At input $a$, increase the input by $h$. Then

$$
\frac{f(a+h)-f(a)}{h}
=\frac{(a+h)^2-a^2}{h}
=\frac{a^2+2ah+h^2-a^2}{h}
=2a+h.
$$

As $h$ approaches zero, $2a+h$ approaches $2a$. Therefore

$$
f'(a)=2a,\qquad\text{so}\qquad \frac{d}{dx}(x^2)=2x.
$$

The derivative is another function: it tells us the slope at every input. At $x=3$, the slope is 6. If $s(t)=t^2$ describes position in metres after $t$ seconds, then $s'(3)=6$ metres per second. Units help interpret the answer: output-units divided by input-units.

## Why the main differentiation rules work

The familiar rules are shortcuts that follow from the limit definition.

### Constant and sum rules

A constant does not change when $x$ changes, so its slope is zero:

$$
\frac{d}{dx}(c)=0.
$$

For a sum, the total output change is the sum of the changes of its parts. Limits preserve that sum, giving

$$
(f+g)'=f'+g'.
$$

### Power rule

For a positive integer $n$, start with the definition for $x^n$:

$$
\frac{(x+h)^n-x^n}{h}.
$$

Expanding $(x+h)^n$ gives $x^n+n x^{n-1}h+\text{terms containing }h^2\text{ or higher powers}$. After subtracting $x^n$ and dividing by $h$, the first term is $n x^{n-1}$; all remaining terms still contain a factor of $h$ and vanish as $h\to0$. Thus

$$
\frac{d}{dx}(x^n)=n x^{n-1}.
$$

For example,

$$
\frac{d}{dx}(3x^4-2x+7)=12x^3-2.
$$

The constant term disappears, and each power is differentiated separately.

### Product rule

The product of two changing quantities has two sources of change: the first factor can change, or the second can change. Over a small input step, write

$$
f(x+h)g(x+h)-f(x)g(x)
=\big(f(x+h)-f(x)\big)g(x+h)
+f(x)\big(g(x+h)-g(x)\big).
$$

Divide by $h$ and let $h\to0$. The two average rates approach $f'$ and $g'$, giving

$$
(fg)'=f'g+fg'.
$$

For $y=x^2e^x$, take $f=x^2$ and $g=e^x$:

$$
y'=2xe^x+x^2e^x=e^x(x^2+2x).
$$

Do not differentiate both factors and multiply their derivatives; that would ignore the two separate sources of change.

### Chain rule: account for an inside input changing first

Suppose $y=F(u)$ and $u=g(x)$. A small change in $x$ first changes $u$, which then changes $y$. Multiplying these two rates gives

$$
\frac{dy}{dx}=\frac{dy}{du}\frac{du}{dx}=F'(g(x))g'(x).
$$

For $y=\sin(3x)$, the outside rule is sine and the inside rule is $3x$:

$$
y'=\cos(3x)\cdot3=3\cos(3x).
$$

The factor 3 is the rate at which the inside angle changes. Leaving it out gives the wrong rate.

### Quotient rule

For $y=f/g$, the quotient rule is

$$
\left(\frac{f}{g}\right)'=\frac{f'g-fg'}{g^2},\qquad g\ne0.
$$

The denominator is squared, and the numerator order is “derivative of top times bottom minus top times derivative of bottom.” For

$$
y=\frac{\sin(3x)}{x+1},
$$

combine chain and quotient rules:

$$
y'=\frac{3(x+1)\cos(3x)-\sin(3x)}{(x+1)^2},\qquad x\ne-1.
$$

The restriction $x\ne-1$ is inherited from the original function.

## Integrals: build a total from many tiny contributions

Suppose a car moves at velocity $v(t)$. Over a short time step $\Delta t$, its change in position is approximately $v(t)\Delta t$. Add these changes over many intervals:

$$
\text{total change}\approx
v(t_1)\Delta t+v(t_2)\Delta t+\cdots+v(t_n)\Delta t.
$$

As the intervals become thinner, this sum approaches the **definite integral**:

$$
\int_a^b v(t)\,dt.
$$

The integral adds signed changes. Forward motion is positive; backward motion is negative. Therefore it gives net displacement. Total distance instead adds the magnitude of velocity:

$$
\text{distance}=\int_a^b |v(t)|\,dt.
$$

For a graph of $f(x)$ above the horizontal axis, $\int_a^b f(x)\,dx$ is the area under the curve. If the graph dips below the axis, those parts count negatively. The integral is a signed accumulation, not automatically a geometric area.

### Begin with a constant rate

If a tap pours water at a constant rate $r$ litres per minute for $T$ minutes, then it contributes approximately $r\Delta t$ in each short time interval. There are about $T/\Delta t$ intervals, so the total is

$$
\frac{T}{\Delta t}(r\Delta t)=rT.
$$

This is the rectangle area “height times width.” In integral notation,

$$
\int_0^T r\,dt=rT.
$$

When the rate varies, the thin rectangles have different heights; the integral adds them all.

## Why integration and differentiation undo one another

If $F'(x)=f(x)$, then $f$ is the rate of change of $F$. Adding that rate from $a$ to $b$ recovers the total change in $F$. This is the Fundamental Theorem of Calculus:

$$
\int_a^b f(x)\,dx=F(b)-F(a).
$$

An **antiderivative** $F$ is any function whose derivative is $f$. For example, since

$$
\frac{d}{dx}\left(\frac{x^3}{3}\right)=x^2,
$$

one antiderivative of $x^2$ is $x^3/3$. Every function $x^3/3+C$ is also an antiderivative because the derivative of a constant is zero. Hence

$$
\int x^2\,dx=\frac{x^3}{3}+C.
$$

The symbol $C$ is needed for an indefinite integral, which describes all antiderivatives. A definite integral has bounds and gives one accumulated value:

$$
\int_0^2 x^2\,dx
=\left[\frac{x^3}{3}\right]_0^2
=\frac83.
$$

The brackets mean “evaluate at the upper bound, then subtract the lower-bound value.”

## Choose an integration method by recognizing a reverse derivative

### Substitution reverses the chain rule

If part of an integrand is an inside function and another factor is its derivative, set $u$ equal to the inside expression. For example:

$$
\int 2x\cos(x^2)\,dx.
$$

Choose $u=x^2$, so $du=2x\,dx$. The integral becomes

$$
\int\cos u\,du=\sin u+C=\sin(x^2)+C.
$$

Check by differentiation: the derivative of $\sin(x^2)$ is $2x\cos(x^2)$, exactly the integrand.

### Integration by parts reverses the product rule

The product rule says $(uv)'=u'v+uv'$. Rearranging and integrating gives

$$
\int u\,dv=uv-\int v\,du.
$$

For $\int xe^x\,dx$, choose $u=x$ (it simplifies when differentiated) and $dv=e^x\,dx$:

$$
du=dx,\qquad v=e^x.
$$

Then

$$
\int xe^x\,dx=xe^x-\int e^x\,dx=e^x(x-1)+C.
$$

Differentiate the answer to check it.

## Practice the reasoning

1. Differentiate $y=(x^2+1)^3$. Identify the inside function and explain where the factor $2x$ comes from.
2. A particle has velocity $v(t)=3t^2$ metres per second for $0\le t\le2$. Find its displacement.
3. Evaluate $\int_0^1(3x^2+2x)\,dx$ using an antiderivative.

**Check:** 1. $y'=3(x^2+1)^2(2x)$; the inner function $x^2+1$ changes at rate $2x$. 2. $\int_0^2 3t^2\,dt=[t^3]_0^2=8$ metres. 3. An antiderivative is $x^3+x^2$, so the value is 2.

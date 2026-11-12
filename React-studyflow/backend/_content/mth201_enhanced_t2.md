# Revision of Differentiation and Integration

## Two questions: how fast, and how much?

Imagine tracking a car. Its position tells you where it is. A speedometer tells you how quickly its position is changing at this instant. A trip meter tells you how far it travelled over a period. Calculus gives mathematical tools for both questions:

- **Differentiation** measures an instantaneous rate of change.
- **Integration** accumulates many small contributions over an interval.

These are connected ideas, but they are not the same operation. The derivative looks locally at change; an integral combines contributions across a whole range.

## A derivative is the slope at one point

For a straight line, slope is rise divided by run. A curve does not have one constant slope, so we zoom in around a point and compare two nearby points. As the second point approaches the first, the secant slope approaches the tangent slope.

For $y=f(x)$, the derivative at $x=a$ is defined by

$$f'(a)=\lim_{h\to0}\frac{f(a+h)-f(a)}{h},$$

when this limit exists. Here, $h$ is a small input change; the numerator is the corresponding output change. Their ratio is an average rate over a short step, and the limit gives the instantaneous rate.

For example, if position is $s(t)=t^2$, then

$$s'(t)=2t.$$

At $t=3$ seconds, the instantaneous velocity is $s'(3)=6$ units per second. The units confirm the interpretation: position divided by time.

### Choose the derivative rule from the shape of the expression

The rules are shortcuts built from the limit definition. Identify the structure before differentiating:

| Expression structure | Rule | Example |
|---|---|---|
| A sum | Differentiate each term | $(x^3+\sin x)'=3x^2+\cos x$ |
| A product | $(uv)'=u'v+uv'$ | $(x^2e^x)'=2xe^x+x^2e^x$ |
| A quotient | $(u/v)'=(u'v-uv')/v^2$ | Keep the denominator squared |
| A function inside another | Chain rule: $(F(g(x)))'=F'(g(x))g'(x)$ | $(\sin 3x)'=3\cos 3x$ |

For $y=\frac{\sin(3x)}{x+1}$, the numerator is a composite function and the whole expression is a quotient. Apply both rules:

$$y'=\frac{3(x+1)\cos(3x)-\sin(3x)}{(x+1)^2},\qquad x\ne-1.$$

The condition $x\ne-1$ remains because the original function is undefined there.

**Pause and try:** For $y=(x^2+1)^3$, identify the outer and inner functions before differentiating. The outer rule cubes its input; the inner rule is $x^2+1$. Therefore

$$y'=3(x^2+1)^2(2x)=6x(x^2+1)^2.$$

## An integral is accumulated change

Suppose a car’s velocity is known at every moment. Over a tiny time interval $\Delta t$, its change in position is approximately velocity times time, $v(t)\Delta t$. Add these small changes over a whole trip and make the time steps arbitrarily small: the result is a definite integral.

$$\int_a^b v(t)\,dt$$

is the **signed** change in position from time $a$ to time $b$. Forward motion contributes positively and backward motion negatively. Total distance instead adds the magnitude of velocity, so it is $\int_a^b|v(t)|\,dt$ when the velocity is integrable.

Integration can also reverse differentiation. If $F'(x)=f(x)$, then $F$ is an **antiderivative** of $f$. The Fundamental Theorem of Calculus states

$$\int_a^b f(x)\,dx=F(b)-F(a).$$

For example, with $f(x)=3x^2+2x$, an antiderivative is $F(x)=x^3+x^2$. Thus

$$\int_0^1(3x^2+2x)\,dx=F(1)-F(0)=2.$$

The same theorem explains why differentiation and integration fit together: the net accumulation of a rate is the total change in the quantity.

## Choose an integration strategy

Integration reverses differentiation, but the reverse pattern may be hidden.

- Use **substitution** when the derivative of an inner expression appears as a factor. With $u=\cos x$, so $du=-\sin x\,dx$:
  $$\int\frac{\sin x}{\cos^3x}\,dx=-\int u^{-3}\,du=\frac{1}{2\cos^2x}+C.$$
- Use **integration by parts** when a product becomes easier after differentiating one factor:
  $$\int u\,dv=uv-\int v\,du.$$
  For instance, choosing $u=x$ and $dv=e^x\,dx$ gives $\int xe^x\,dx=e^x(x-1)+C$.
- Use algebraic simplification, trigonometric identities, or partial fractions when the expression’s structure calls for them.

For an indefinite integral, include the constant $C$: derivatives of constants are zero, so an antiderivative is never unique. For a definite integral, evaluate the antiderivative at the upper bound and subtract its value at the lower bound.

## Check an antiderivative by differentiating

After finding an antiderivative, differentiate it to test the result. For the substitution example,

$$\frac{d}{dx}\left(\frac12\sec^2x\right)=\sec^2x\tan x=\frac{\sin x}{\cos^3x}.$$

This reverse check catches a missing chain-rule factor or a sign error. It is often quicker and more reliable than repeating the integration from scratch.

**Your turn:** Find $\int x\cos x\,dx$. Choose $u=x$ and $dv=\cos x\,dx$, so $du=dx$ and $v=\sin x$. By parts, the result is $x\sin x+\cos x+C$; differentiating verifies it.

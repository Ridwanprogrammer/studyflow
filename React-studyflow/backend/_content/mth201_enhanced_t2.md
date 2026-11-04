# Revision of Differentiation and Integration

## Two questions about change

[[Derivative|Differentiation]] asks, “How fast is this quantity changing right here?” [[Integral|Integration]] asks, “How much has accumulated over this interval?” They are connected, but they answer different questions.

For position $s(t)$, the derivative $s'(t)$ is instantaneous velocity. If velocity is known, integrating it over time recovers the change in position.

## Choosing a derivative rule

Start by identifying the structure of the expression:

| Structure | Rule | Example |
|---|---|---|
| Sum of terms | Differentiate each term | $(x^3+\sin x)'=3x^2+\cos x$ |
| Product | $(uv)'=u'v+uv'$ | $(x^2e^x)'=2xe^x+x^2e^x$ |
| Quotient | $(u/v)'=(u'v-uv')/v^2$ | Keep the denominator squared |
| Nested function | Chain rule: $(F(g(x)))'=F'(g(x))g'(x)$ | $(\sin 3x)'=3\cos 3x$ |

For $y=\frac{\sin(3x)}{x+1}$, combine the chain and quotient rules:
$$y'=\frac{3(x+1)\cos(3x)-\sin(3x)}{(x+1)^2},\qquad x\ne-1.$$

When both the base and exponent vary, logarithmic differentiation can simplify the work. For $y=x^x$ with $x>0$:
$$\ln y=x\ln x,\qquad \frac{y'}y=\ln x+1,\qquad y'=x^x(\ln x+1).$$

## Choosing an integration strategy

Integration reverses differentiation, but the reverse is not always obvious from the expression.

- Use **substitution** when the derivative of an inner expression is also present. With $u=\cos x$,
  $$\int\frac{\sin x}{\cos^3x}\,dx=-\int u^{-3}\,du=\frac{1}{2\cos^2x}+C.$$
- Use **integration by parts** for products where one factor becomes simpler when differentiated:
  $$\int u\,dv=uv-\int v\,du.$$
  For instance, $\int xe^x\,dx=e^x(x-1)+C$.
- Use known identities or partial fractions when the integrand is a trigonometric expression or a rational function.

For definite integrals, evaluate the antiderivative at the bounds:
$$\int_a^b f(x)\,dx=F(b)-F(a),\qquad F'=f.$$
The Fundamental Theorem of Calculus is the bridge: accumulated change is governed by an antiderivative.

## A quick method check

Differentiate your proposed antiderivative. For the substitution result above,
$$\frac{d}{dx}\left(\frac12\sec^2x\right)=\sec^2x\tan x=\frac{\sin x}{\cos^3x}.$$
This check catches missing chain-rule factors and sign errors.

## Practice the choice, not just the formula

1. Differentiate $y=\frac{\sin(2x)}{x}$.
2. Evaluate $\int_0^1(3x^2+2x)\,dx$.
3. Find $\int x\cos x\,dx$.

**Answers:** 1. $\frac{2x\cos(2x)-\sin(2x)}{x^2}$ for $x\ne0$. 2. $2$. 3. $x\sin x+\cos x+C$.

# MTH 201 Topic 7: Chain Rule, Extrema, Lagrange Multipliers -- Enhanced

## The Central Idea

The multivariable chain rule tracks how changes propagate through dependent variables. Extrema are max/min values. Lagrange multipliers find extrema subject to constraints.

---

## Why It Matters -- Past Exam Coverage

| Past Exam Question | This Topic Covers |
|--------------------|-------------------|
| "Chain rule, extrema, Lagrange multipliers" | All three topics |
| "Maximize f(x,y)=xy subject to x+y=10" | Lagrange multipliers |

---

## Section 1 -- Chain Rule

If z = f(x,y), x = x(t), y = y(t):
dz/dt = f_x dx/dt + f_y dy/dt

If z = f(x,y), x = x(u,v), y = y(u,v):
∂z/∂u = f_x ∂x/∂u + f_y ∂y/∂u

---

## Section 2 -- Extrema

Critical points: ∇f = 0 (f_x = 0, f_y = 0)

Second derivative test:
D = f_xx f_yy - (f_xy)^2

| D | f_xx | Result |
|---|------|--------|
| >0 | >0 | Local min |
| >0 | <0 | Local max |
| <0 | any | Saddle |
| =0 | any | Inconclusive |

---

## Section 3 -- Lagrange Multipliers

Max/min f(x,y) subject to g(x,y) = c:

Solve ∇f = λ ∇g together with g(x,y) = c

---

## Section 4 -- Worked Exam Problem

### Problem: Maximize f(x,y) = xy subject to x + y = 10, x,y > 0

**Set up:**
f(x,y) = xy, g(x,y) = x + y = 10

∇f = (y, x), ∇g = (1, 1)

Equations:
y = λ
x = λ
x + y = 10

From first two: x = y = λ
From third: x + x = 10 → x = 5, y = 5

**Candidate:** (5,5) with value 25

**Check boundary:** x→0 or y→0 → xy→0
**Maximum:** 25 at (5,5)

---

## Section 5 -- Self-Check

1. Use chain rule: z = x^2 y, x = t^2, y = sin t. Find dz/dt.
2. Find extrema of f(x,y) = x^2 + y^2 - 4x + 6y.
3. Minimize x^2 + y^2 subject to x + 2y = 5.

---

## Solutions

1. dz/dt = 2x y (2t) + x^2 cos t = 2(t^2)(sin t)(2t) + (t^2)^2 cos t = 4t^3 sin t + t^4 cos t

2. f_x = 2x-4=0 → x=2; f_y = 2y+6=0 → y=-3. D = 4 > 0, f_xx=2>0 → local min at (2,-3), value = -13.

3. f = x^2 + y^2, g = x + 2y - 5 = 0
∇f = (2x, 2y) = λ(1, 2) → 2x=λ, 2y=2λ → y=2x
x + 4x = 5 → x=1, y=2. Minimum = 1^2 + 2^2 = 5.

---

## Glossary Terms

chain-rule-multivariable, extrema, critical-point, lagrange-multipliers, constrained-optimization, gradient, hessian-matrix, second-derivative-test, saddle-point, local-minimum, local-maximum, constrained-extremum, lagrange-multiplier, constraint, gradient-parallel, unconstrained-extremum, boundary-behavior
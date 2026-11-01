# MTH 201 Topic 6: Partial Derivatives -- Enhanced

## The Central Idea

Partial derivatives measure how a multivariable function changes with respect to one variable while holding others fixed.

---

## Why It Matters -- Past Exam Coverage

| Past Exam Question | This Topic Covers |
|--------------------|-------------------|
| "Given f(x,y) = 7x^2 - x^3 y^4 + 5x^4 y^3, find f_x, f_y, f_xy, f_yx" | Partial derivatives and mixed partials |

---

## Section 1 -- Definition

For f(x,y):
f_x = ∂f/∂x = lim_{h→0} [f(x+h,y) - f(x,y)]/h
f_y = ∂f/∂y = lim_{h→0} [f(x,y+h) - f(x,y)]/h

Higher partials: f_xx, f_xy, f_yx, f_yy
Mixed partials: f_xy = ∂/∂y (∂f/∂x), f_yx = ∂/∂x (∂f/∂y)

**Clairaut's Theorem:** If f_xy and f_yx are continuous, f_xy = f_yx.

---

## Section 3 -- Worked Exam Problem

### Problem: f(x,y) = 7x^2 - x^3 y^4 + 5x^4 y^3

**Find f_x:**
f_x = ∂/∂x [7x^2 - x^3 y^4 + 5x^4 y^3]
= 14x - 3x^2 y^4 + 20x^3 y^3

**Find f_y:**
f_y = ∂/∂y [7x^2 - x^3 y^4 + 5x^4 y^3]
= -4x^3 y^3 + 15x^4 y^2

**Find f_xy:**
f_xy = ∂/∂y [f_x] = ∂/∂y [14x - 3x^2 y^4 + 20x^3 y^3]
= -12x^2 y^3 + 60x^3 y^2

**Find f_yx:**
f_yx = ∂/∂x [f_y] = ∂/∂x [-4x^3 y^3 + 15x^4 y^2]
= -12x^2 y^3 + 60x^3 y^2

**Check:** f_xy = f_yx = -12x^2 y^3 + 60x^3 y^2 ✓ (Clairaut's theorem)

---

## Section 4 -- Gradient

∇f = (f_x, f_y) = vector of first partials
Points in direction of maximum increase.

---

## Section 6 -- Self-Check

1. Find f_x, f_y for f(x,y) = x^2 y + y^3.
2. Verify f_xy = f_yx for f(x,y) = x^3 y^2.

---

## Solutions

1. f_x = 2xy, f_y = x^2 + 3y^2
2. f_x = 3x^2 y^2, f_y = 2x^3 y
   f_xy = 6x^2 y, f_yx = 6x^2 y ✓

---

## Glossary Terms

partial-derivative, partial-differentiation, mixed-partial, clairauts-theorem, gradient, first-partial, second-partial, mixed-partial-equality, directional-derivative, tangent-plane, linear-approximation, chain-rule-multivariable, holding-constant, treating-as-constant
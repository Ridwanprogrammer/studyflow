# MTH 201 Topic 8: Differentials and Linear Approximations -- Enhanced

## The Central Idea

Differentials and linear approximations use the tangent line (1D) or tangent plane (2D) to estimate function values near a known point.

---

## Why It Matters -- Past Exam Coverage

| Past Exam Question | This Topic Covers |
|--------------------|-------------------|
| "Use linear approximation of f(x) = x^{1/3} at a=8 to approximate 8.05^{1/3}" | Linear approximation |
| "Differentials: f(x,y)=xy near (2,3)" | Differentials in 2D |

---

## Section 1 -- Linear Approximation (1D)

For y = f(x) near x = a:
f(x) ≈ f(a) + f'(a)(x - a)

Differential: dy = f'(a) dx where dx = x - a

---

## Section 2 -- Linear Approximation (2D)

For z = f(x,y) near (a,b):
f(x,y) ≈ f(a,b) + f_x(a,b)(x-a) + f_y(a,b)(y-b)

Differential: dz = f_x dx + f_y dy

---

## Section 3 -- Worked Exam Problems

### Problem 1: ∛8.05 using f(x) = x^{1/3} at a = 8

**f(x) = x^{1/3}, f'(x) = 1/3 x^{-2/3}**

At a = 8:
f(8) = 2
f'(8) = 1/3 × 8^{-2/3} = 1/3 × 1/4 = 1/12

Linear approximation:
f(x) ≈ 2 + (1/12)(x - 8)

For x = 8.05:
f(8.05) ≈ 2 + (1/12)(0.05) = 2 + 0.05/12 = 2 + 0.0041667 = **2.0041667**

**Actual:** 8.05^{1/3} ≈ 2.0041649 (very close!)

---

### Problem 2: f(x,y) = xy near (2,3)

f(x,y) = xy
f_x = y, f_y = x

At (2,3): f = 6, f_x = 3, f_y = 2

For dx = 0.1, dy = -0.05:
dz = 3(0.1) + 2(-0.05) = 0.3 - 0.1 = 0.2

Linear estimate: f(2.1, 2.95) ≈ 6 + 0.2 = **6.2**

**Actual:** 2.1 × 2.95 = 6.195 (close!)

---

## Section 4 -- Self-Check

1. Approximate √(100.1) using linear approximation.
2. For f(x,y) = x^2 + y^2 near (1,2), estimate f(1.1, 1.9).
3. Use differential to approximate (3.98)^3.

---

## Solutions

1. f(x)=√x, f'(x)=1/(2√x). At a=100: f=10, f'=1/20. √100.1 ≈ 10 + 0.1/20 = 10.005.

2. f(x,y)=x^2+y^2, f_x=2x, f_y=2y. At (1,2): f=5, f_x=2, f_y=4. dx=0.1, dy=-0.1. dz = 2(0.1) + 4(-0.1) = -0.2. Estimate = 5 - 0.2 = 4.8. Actual: 1.21 + 3.61 = 4.82.

3. f(x)=x^3, f'(x)=3x^2. At a=4: f=64, f'=48. dx=-0.02. df = 48(-0.02) = -0.96. Estimate = 64 - 0.96 = 63.04. Actual: 63.048.

---

## Glossary Terms

differential, linear-approximation, tangent-line, tangent-plane, total-differential, partial-differential, linearization, increment, error-estimation, approximation-error, local-linearity, multivariable-differential, chain-rule-differential
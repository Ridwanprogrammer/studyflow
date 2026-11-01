# MTH 201 Topic 9: Line and Multiple Integrals -- Enhanced

## The Central Idea

Line integrals accumulate along curves; multiple integrals accumulate over regions. Both generalize definite integration to higher dimensions.

---

## Why It Matters -- Past Exam Coverage

| Past Exam Question | This Topic Covers |
|--------------------|-------------------|
| "int_C xy ds, C: x=cos t, y=sin t" | Scalar line integral |
| "int_1^3 int_1^3 (2x-4y^3) dy dx" | Double integral |
| "Volume by rotation" | Volume of revolution |

---

## Section 1 -- Line Integrals

### Scalar Line Integral
int_C f(x,y) ds = int_a^b f(r(t)) |r'(t)| dt

### Vector Line Integral
int_C F·dr = int_a^b F(r(t))·r'(t) dt

---

## Section 4 -- Worked Exam Problems

### Problem 1: Scalar Line Integral
> Evaluate int_C xy ds, where C: x = cos t, y = sin t, 0 ≤ t ≤ π/2

**Solution:**

r(t) = (cos t, sin t), r'(t) = (-sin t, cos t)
|r'(t)| = sqrt(sin^2 t + cos^2 t) = 1

f(x,y) = xy = cos t sin t

int_C xy ds = int_0^{π/2} cos t sin t × 1 dt
= (1/2) int_0^{π/2} sin 2t dt
= (1/2)[-cos 2t/2]_0^{π/2}
= (1/4)[-cos π + cos 0]
= (1/4)[1 + 1] = **1/2**

---

### Problem 2: Double Integral
> Evaluate int_1^3 int_1^3 (2x - 4y^3) dy dx

**Solution:**

Inner integral (dy):
int_1^3 (2x - 4y^3) dy = [2xy - y^4]_1^3 = (6x - 81) - (2x - 1) = 4x - 80

Outer integral (dx):
int_1^3 (4x - 80) dx = [2x^2 - 80x]_1^3 = (18 - 240) - (2 - 80) = -222 + 78 = **-144**

---

### Problem 3: Volume of Revolution

#### Disk Method (around x-axis)
V = π int_a^b [f(x)]^2 dx

#### Shell Method (around y-axis)
V = 2π int_a^b x f(x) dx

**Example:** y = x+1 from x=1 to x=2, around x-axis
V = π int_1^2 (x+1)^2 dx = π [ (x+1)^3/3 ]_1^2 = π(27/3 - 8/3) = 19π/3

---

## Section 4 -- Self-Check

1. Evaluate int_C x^2 y ds where C: x=t, y=t^2, 0≤t≤1.
2. Evaluate int_0^2 int_0^1 (x + y) dy dx.
3. Volume of y = x^2, x=0 to 2, about x-axis.

---

## Solutions

1. r(t)=(t,t^2), r'=(1,2t), |r'|=sqrt(1+4t^2). f=t^3. int = int_0^1 t^3 sqrt(1+4t^2) dt. u=1+4t^2 → 1/24(5^{3/2}-1).

2. Inner: int_0^1 (x+y)dy = [xy + y^2/2]_0^1 = x + 1/2. Outer: int_0^2 (x+1/2)dx = [x^2/2 + x/2]_0^2 = 2+1 = 3.

3. V = π int_0^2 (x^2)^2 dx = π int_0^2 x^4 dx = π[32/5] = 32π/5.

---

## Glossary Terms

line-integral, scalar-line-integral, vector-line-integral, arc-length, parametrization, double-integral, iterated-integral, fubini-theorem, triple-integral, volume-of-revolution, disk-method, washer-method, shell-method, cylindrical-shells, jacobian, polar-coordinates, change-of-variables, area-element, volume-element, work, circulation, flux, greens-theorem, stokes-theorem, divergence-theorem
# MTH 201 Topic 3: Mean Value Theorem -- Enhanced

## The Central Idea

The **Mean Value Theorem (MVT)** connects the average rate of change over an interval to the instantaneous rate at some interior point. It is a fundamental theorem of calculus with many applications.

---

## Why It Matters -- Past Exam Coverage

| Past Exam Question | This Topic Covers |
|--------------------|-------------------|
| "State the mean value theorem" | Statement and conditions |
| "Determine if f(x) = x^3 - 2x^2 - 4x + 1, 0 <= x <= 1 satisfy the mean value theorem" | Application and verification |

---

## Section 1 -- Statement of MVT

### Theorem (Mean Value Theorem)

If f is **continuous on [a,b]** and **differentiable on (a,b)**, then there exists at least one c in (a,b) such that:

f'(c) = (f(b) - f(a)) / (b - a)

### Geometric Interpretation

The tangent line at x = c is **parallel** to the secant line joining (a, f(a)) and (b, f(b)).

### Rolle's Theorem (Special Case)

If f(a) = f(b), then f'(c) = 0 for some c in (a,b).

---

## Section 2 -- Conditions Check

| Condition | Meaning | Why Needed |
|-----------|---------|------------|
| Continuous on [a,b] | No breaks, jumps, holes | Ensures f attains max/min |
| Differentiable on (a,b) | Derivative exists at all interior points | Ensures tangent exists |

**Counterexample:** f(x) = |x| on [-1,1]
- Continuous on [-1,1] ✓
- NOT differentiable at 0 ✗
- f'(x) = 1 for x>0, -1 for x<0
- Average slope = 0, but f'(c) never = 0

---

## Section 4 -- Worked Exam Problem

### Problem: f(x) = x^3 - 2x^2 - 4x + 1 on [0,1]

**Check conditions:**
- f is a polynomial → continuous on [0,1] ✓
- f is a polynomial → differentiable on (0,1) ✓

**Average rate of change:**
f(1) = 1 - 2 - 4 + 1 = -4
f(0) = 1
Average = (f(1) - f(0)) / (1 - 0) = (-4 - 1) / 1 = -5

**Find c such that f'(c) = -5**
f'(x) = 3x^2 - 4x - 4
Set f'(c) = -5:
3c^2 - 4c - 4 = -5
3c^2 - 4c + 1 = 0
(3c - 1)(c - 1) = 0
c = 1/3 or c = 1

Since c must be in (0,1), **c = 1/3** ✓

**MVT satisfied** with c = 1/3.

---

## Section 5 -- Applications

| Application | Description |
|-------------|-------------|
| **Error bounds** | Taylor remainder estimates |
| **Monotonicity** | f' > 0 implies increasing |
| **Uniqueness of roots** | f' never zero means at most one root |
| **Speed analysis** | Average speed = instantaneous speed at some point |

---

## Section 6 -- Self-Check Problems

1. State the Mean Value Theorem.
2. Check MVT for f(x) = x^2 on [1,4].
3. Check MVT for f(x) = |x| on [-1,2].
4. Use MVT to show ln(1+x) < x for x > 0.

---

## Solutions

1. If f continuous on [a,b] and differentiable on (a,b), then exists c in (a,b) with f'(c) = (f(b)-f(a))/(b-a).

2. f(x)=x^2, f'=2x. Avg = (16-1)/3 = 5. 2c=5 -> c=2.5 in (1,4). ✓

3. Not differentiable at 0. MVT does not apply.

4. Let f(x)=ln(1+x). f'(x)=1/(1+x). By MVT, f(x)-f(0) = f'(c)x for some c in (0,x). 1/(1+c) < 1 for c>0, so ln(1+x) < x.

---

## Glossary Terms

mean-value-theorem, rolle-theorem, average-rate-of-change, instantaneous-rate-of-change, secant-line, tangent-line, differentiable, continuous, counterexample, differentiable-function, polynomial-function, absolute-value-function, open-interval, closed-interval, derivative
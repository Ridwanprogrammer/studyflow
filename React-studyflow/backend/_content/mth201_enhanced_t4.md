# MTH 201 Topic 4: Taylor Series -- Enhanced

## The Central Idea

A **Taylor series** approximates a function using an infinite polynomial built from its derivatives at a single point. The **Maclaurin series** is the special case centered at a=0.

---

## Why It Matters -- Past Exam Coverage

| Past Exam Question | This Topic Covers |
|--------------------|-------------------|
| "State the basic similarity between Taylor's and Maclaurin's series" | Definition and relationship |
| "Use the fourth degree Maclaurin's polynomial for f(x) = ln(1+x) to estimate ln(1.03)" | Polynomial construction and estimation |

---

## Section 1 -- Taylor and Maclaurin Series

### Taylor Series (center a)

f(x) = f(a) + f'(a)(x-a) + f''(a)/2! (x-a)^2 + f'''(a)/3! (x-a)^3 + ...

In sigma notation:
f(x) = sum_{n=0}^\infty f^{(n)}(a)/n! (x-a)^n

### Maclaurin Series (center a=0)

f(x) = f(0) + f'(0)x + f''(0)/2! x^2 + f'''(0)/3! x^3 + ...

---

## Section 2 -- Common Maclaurin Series (Memorize)

| Function | Series | Interval of Convergence |
|----------|--------|------------------------|
| e^x | 1 + x + x^2/2! + x^3/3! + ... | (-∞, ∞) |
| sin x | x - x^3/3! + x^5/5! - ... | (-∞, ∞) |
| cos x | 1 - x^2/2! + x^4/4! - ... | (-∞, ∞) |
| ln(1+x) | x - x^2/2 + x^3/3 - x^4/4 + ... | (-1, 1] |
| 1/(1-x) | 1 + x + x^2 + x^3 + ... | |x| < 1 |
| (1+x)^r | 1 + rx + r(r-1)/2! x^2 + ... | |x| < 1 |

---

## Section 3 -- Taylor's Theorem with Remainder

Taylor's theorem gives an error bound for the polynomial approximation:

f(x) = P_n(x) + R_n(x)

where P_n(x) is the degree-n Taylor polynomial, and

R_n(x) = f^{(n+1)}(c) / (n+1)! (x-a)^{n+1}  (Lagrange form)

for some c between a and x.

---

## Section 4 -- Worked Exam Problem

### Problem: ln(1.03) using 4th degree Maclaurin polynomial

**f(x) = ln(1+x), a = 0, estimate ln(1.03) = ln(1+0.03)**

**Derivatives at 0:**
f(x) = ln(1+x)
f'(x) = 1/(1+x) → f'(0) = 1
f''(x) = -1/(1+x)^2 → f''(0) = -1
f'''(x) = 2/(1+x)^3 → f'''(0) = 2
f^{(4)}(x) = -6/(1+x)^4 → f^{(4)}(0) = -6

**4th degree Maclaurin polynomial:**
P_4(x) = f(0) + f'(0)x + f''(0)/2! x^2 + f'''(0)/3! x^3 + f^{(4)}(0)/4! x^4
= 0 + 1*x + (-1)/2 x^2 + 2/6 x^3 + (-6)/24 x^4
= x - x^2/2 + x^3/3 - x^4/4

**Estimate ln(1.03):**
x = 0.03
P_4(0.03) = 0.03 - (0.03)^2/2 + (0.03)^3/3 - (0.03)^4/4
= 0.03 - 0.00045 + 0.000009 - 0.00000002025
= 0.029559 - 0.00000002025
≈ **0.029559**

**Actual ln(1.03) ≈ 0.0295588** (very close!)

---

## Section 5 -- Taylor vs Maclaurin Similarity

**Basic similarity:** Both represent a function as an infinite sum of terms calculated from the function's derivatives at a single point. The Maclaurin series is simply the Taylor series centered at a = 0.

---

## Section 6 -- Error Estimation

For ln(1+x) with x=0.03, the next term (R_4) is:
R_4 = f^{(5)}(c)/5! x^5 = 24/(1+c)^5 * x^5/120

For c between 0 and 0.03, (1+c) ≈ 1, so:
|R_4| ≈ 24/120 * (0.03)^5 = 0.2 * 2.43×10^{-8} ≈ 5×10^{-9}

Error < 5×10^{-9} → our estimate accurate to 8 decimal places.

---

## Section 7 -- Self-Check Problems

1. Write the Maclaurin series for e^x up to degree 4.
2. Find Taylor series for ln(x) centered at a=1.
3. Estimate sin(0.1) using 3rd degree Maclaurin polynomial.
4. What is the radius of convergence for ln(1+x)?

---

## Solutions

1. e^x = 1 + x + x^2/2 + x^3/6 + x^4/24 + ...

2. f(x)=ln x, a=1: f(1)=0, f'(1)=1, f''(1)=-1, f'''(1)=2, f^{(4)}(1)=-6
   ln x = (x-1) - (x-1)^2/2 + (x-1)^3/3 - (x-1)^4/4 + ...

3. sin x ≈ x - x^3/6. sin(0.1) ≈ 0.1 - 0.001/6 = 0.0998333. Actual: 0.0998334.

4. Radius = 1 (converges for |x| < 1, at x=1 converges to ln 2).

---

## Glossary Terms

taylor-series, maclaurin-series, taylor-polynomial, remainder-term, lagrange-remainder, radius-of-convergence, interval-of-convergence, maclaurin-series, taylor-theorem, approximation-error, polynomial-approximation, derivative-at-a-point, center, degree-n-polynomial, error-bound, ln-series, exponential-series, sine-series, cosine-series, binomial-series
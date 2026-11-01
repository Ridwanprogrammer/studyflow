# MTH 201 Topic 2: Revision of Differentiation and Integration -- Enhanced

## The Central Idea

Differentiation measures how a function changes locally (instantaneous rate). Integration measures accumulation over an interval. The Fundamental Theorem of Calculus connects them: differentiation and integration are inverse processes.

---

## Why It Matters -- Past Exam Coverage

| Past Exam Question | This Topic Covers |
|--------------------|-------------------|
| "Obtain the first derivative of: y = sin(3x)/(x+1), y = x^x" | Derivative rules (quotient, logarithmic diff) |
| "int sin x/cos^3 x dx, int x^2 sin x dx" | Integration techniques (substitution, by parts) |

---

## Section 1 -- Differentiation Rules Review

### Basic Derivatives

| Function | Derivative |
|----------|------------|
| x^n | n x^{n-1} |
| e^x | e^x |
| a^x | a^x ln a |
| ln x | 1/x |
| sin x | cos x |
| cos x | -sin x |
| tan x | sec^2 x |

### Rules

| Rule | Formula |
|------|---------|
| Sum | (f+g)' = f' + g' |
| Constant Multiple | (cf)' = c f' |
| Product | (fg)' = f'g + fg' |
| Quotient | (f/g)' = (f'g - fg')/g^2 |
| Chain | f(g(x))' = f'(g(x)) g'(x) |

---

## Section 2 -- Worked Exam Problems: Derivatives

### Problem 1: Quotient Rule with Chain Rule
> Obtain the first derivative of: y = sin(3x)/(x+1)

**Solution:**

Let u = sin(3x), v = x+1

y' = (u'v - uv')/v^2

u' = cos(3x) * 3 = 3cos(3x)  (chain rule)
v' = 1

y' = [3cos(3x)(x+1) - sin(3x)(1)] / (x+1)^2
y' = [3(x+1)cos(3x) - sin(3x)] / (x+1)^2

---

### Problem 2: Logarithmic Differentiation
> Obtain the first derivative of: y = x^x

**Solution:**

Take natural log:
ln y = ln(x^x) = x ln x

Differentiate implicitly:
(1/y) y' = d/dx (x ln x) = ln x + x(1/x) = ln x + 1

y' = y(ln x + 1) = x^x(ln x + 1)

---

### Problem 3: More Derivative Practice

| Function | Derivative | Technique |
|----------|------------|-----------|
| y = x^3 e^x | y' = x^3 e^x + 3x^2 e^x = x^2 e^x(x+3) | Product |
| y = ln(x^2+1) | y' = 2x/(x^2+1) | Chain |
| y = tan(2x) | y' = 2 sec^2(2x) | Chain |
| y = sin^{-1}(x/2) | y' = 1/sqrt(4-x^2) | Inverse trig + chain |
| y = x sin x | y' = sin x + x cos x | Product |

---

## Section 3 -- Integration Techniques Review

### Basic Integrals

| Function | Integral |
|----------|----------|
| x^n (n != -1) | x^{n+1}/(n+1) + C |
| 1/x | ln|x| + C |
| e^x | e^x + C |
| sin x | -cos x + C |
| cos x | sin x + C |
| sec^2 x | tan x + C |
| sec x tan x | sec x + C |

### Techniques

| Technique | When to Use |
|-----------|-------------|
| Substitution (u-sub) | Composite function, g'(x) present |
| Integration by Parts | Product: int u dv = uv - int v du |
| Trig Substitution | sqrt(a^2-x^2), sqrt(a^2+x^2), sqrt(x^2-a^2) |
| Partial Fractions | Rational functions |
| Trig Identities | Powers of sin/cos |

---

## Section 4 -- Worked Exam Problems: Integrals

### Problem 1: Substitution + Trig Identity
> int sin x/cos^3 x dx

**Solution:**

**Method 1: u = cos x, du = -sin x dx**
int sin x/cos^3 x dx = int -du/u^3 = -int u^{-3} du = -u^{-2}/(-2) + C = 1/(2u^2) + C = 1/(2cos^2 x) + C = 1/2 sec^2 x + C

**Method 2: Rewrite**
int sin x/cos^3 x dx = int tan x sec^2 x dx
Let u = tan x, du = sec^2 x dx
= int u du = u^2/2 + C = 1/2 tan^2 x + C

Check: 1/2 sec^2 x = 1/2(1+tan^2 x) = 1/2 tan^2 x + 1/2. Both differ by constant.

---

### Problem 2: Integration by Parts (Twice)
> int x^2 sin x dx

**Solution:**

Let u = x^2, dv = sin x dx
du = 2x dx, v = -cos x

int x^2 sin x dx = -x^2 cos x - int (-cos x)(2x) dx
= -x^2 cos x + 2 int x cos x dx

**Second integration by parts:**
int x cos x dx
Let u = x, dv = cos x dx
du = dx, v = sin x

int x cos x dx = x sin x - int sin x dx = x sin x + cos x

**Combine:**
int x^2 sin x dx = -x^2 cos x + 2(x sin x + cos x) + C
= -x^2 cos x + 2x sin x + 2cos x + C
= 2x sin x + (2-x^2)cos x + C

---

### Problem 3: More Integration Practice

| Integral | Result | Technique |
|----------|--------|-----------|
| int x e^x dx | e^x(x-1) + C | Parts |
| int ln x dx | x ln x - x + C | Parts (u=ln x, dv=dx) |
| int sin^2 x dx | 1/2(x - 1/2 sin 2x) + C | Identity sin^2x = 1/2(1-cos 2x) |
| int dx/(x^2+4) | 1/2 tan^{-1}(x/2) + C | Formula int dx/(x^2+a^2) |
| int x/sqrt(1-x^2) dx | -sqrt(1-x^2) + C | u = 1-x^2 |

---

## Section 5 -- Self-Check Problems

1. Find y' if y = x^2 ln x
2. Find int x cos x dx
3. Evaluate int_0^1 (3x^2 + 2x) dx
4. Find derivative of y = (x^2+1)^x
5. int e^x sin x dx (hint: parts twice)

---

## Solutions

1. y' = 2x ln x + x^2(1/x) = 2x ln x + x
2. u=x, dv=cos x dx -> x sin x + cos x + C
3. [x^3 + x^2]_0^1 = 1 + 1 = 2
4. ln y = x ln(x^2+1), y'/y = ln(x^2+1) + 2x^2/(x^2+1) -> y' = (x^2+1)^x[ln(x^2+1) + 2x^2/(x^2+1)]
5. I = int e^x sin x dx. Parts twice -> I = 1/2 e^x(sin x - cos x) + C

---

## Glossary Terms

derivative, differentiation, integral, integration, quotient-rule, chain-rule, product-rule, logarithmic-differentiation, integration-by-parts, u-substitution, trigonometric-substitution, partial-fractions, fundamental-theorem-of-calculus, definite-integral, indefinite-integral, antiderivative, constant-of-integration, critical-point, extremum, first-derivative-test, second-derivative-test, inflection-point, concavity, rate-of-change, accumulation, area-under-curve
# MTH 201 Topic 10: MCQ Workshop -- 35 Questions with Solutions

## The Central Idea

This workshop covers all 35 multiple-choice questions from the MTH 201 past exam, with step-by-step solutions and common distractor explanations.

---

## Questions 15-49 (Derivatives & Integrals)

### 15. Derivative of y = sin x / cos x
**Answer:** A) sec^2 x
**Reason:** y = tan x, y' = sec^2 x

### 16. φ = sin x + 3x^2, find φ'''(0)
**Answer:** A) -1
**Solution:**
φ' = cos x + 6x
φ'' = -sin x + 6
φ''' = -cos x
φ'''(0) = -cos(0) = -1

### 17. f(x) = x^3, gradient of tangent at (2,8)
**Answer:** 12
**Solution:** f'(x) = 3x^2, f'(2) = 12

### 18. f(x) = x/sqrt(x^2+1), find f'(x)
**Answer:** D) (x^2+1)^{-3/2}
**Solution:**
f(x) = x(x^2+1)^{-1/2}
f'(x) = (x^2+1)^{-1/2} - x * (1/2)(x^2+1)^{-3/2} * 2x
= (x^2+1)^{-3/2}[(x^2+1) - x^2]
= (x^2+1)^{-3/2}

### 19. Point where dy/dx = 0 is called
**Answer:** D) All of the above
**Reason:** Stationary, critical, and turning point are all used for dy/dx = 0.

### 20. y = x^3 - 6x^2 + 9x + 1, point of inflexion
**Answer:** D) 2
**Solution:**
y' = 3x^2 - 12x + 9
y'' = 6x - 12
y'' = 0 → 6x - 12 = 0 → x = 2
y''' = 6 ≠ 0 → inflection point at x = 2

### 21. y = x^3 - 6x^2 + 9x + 1, maximum value
**Note:** The calculated maximum is 5 at x=1, but options don't include 5. There may be an error in the question options.

### 22. Body moves: s = t^3 - 4t^2 - 3t. Velocity?
**Answer:** C) 3t^2 - 8t - 3
**Solution:** v = ds/dt = 3t^2 - 8t - 3

### 23. y = x^3 - 6x^2 + 9x + 1, maximum value
(Duplicate of question 21)

### 24. Point where d^2y/dx^2 > 0 at dy/dx = 0 is
**Answer:** B) minimum
**Reason:** Second derivative test: f'' > 0 at critical point → local minimum

### 25. int (3x^2 + 4x) dx
**Answer:** B) x^3 + 2x^2 + c
**Solution:** int 3x^2 dx = x^3, int 4x dx = 2x^2

### 26. Integration is the ______ process of differentiation
**Answer:** A) reverse
**Reason:** Fundamental Theorem of Calculus

### 27. int sqrt(x sqrt(x)) dx
**Note:** The integrand sqrt(x*sqrt(x)) = x^(3/4). int x^(3/4) dx = 4/7 x^(7/4) + C. The option A (8/15 x^(15/8)) appears to be for a different integrand.

### 28. int_1^3 (x^2 - 1) dx
**Answer:** A) 6 2/3
**Solution:** [x^3/3 - x]_1^3 = (9-3) - (1/3 - 1) = 6 + 2/3 = 6 2/3

### 29. int_1^2 x e^x dx
**Answer:** A) e^2
**Solution:** int x e^x dx = e^x(x-1) + C. [e^x(x-1)]_1^2 = e^2

### 30. int_1^2 (2x - 3)^4 dx
**Answer:** B) 1/5
**Solution:** u = 2x-3, dx = du/2. Limits: x=1→u=-1, x=2→u=1. int = 1/2 * [u^5/5]_{-1}^1 = 1/5.

### 31. int cos(3x + 7) dx
**Answer:** B) sin(3x+7)/3 + c
**Solution:** u = 3x+7, du = 3dx.

### 32. int 2x/(3x^2 + 2) dx
**Answer:** C) ln(3x^2 + 2)/3 + c
**Solution:** u = 3x^2+2, du = 6x dx, 2x dx = du/3.

### 33. int 5e^(5x+4) dx
**Answer:** C) e^(5x+4) + c
**Solution:** u = 5x+4, du = 5dx.

### 34. Area under y = x^2 - 3x + 2 from x=0 to 1
**Answer:** A) 5/6
**Solution:** [x^3/3 - 3x^2/2 + 2x]_0^1 = 1/3 - 3/2 + 2 = 5/6.

### 35. Volume: y = x^2 + 5, x=1 to 3, about y-axis
**Note:** Shell method gives V = 80π, but option C is 60π. There may be an error in options.

### 36. Volume: y = x+1 from x=1 to 2, about x-axis
**Answer:** B) 19π/3
**Solution:** Disk method: V = π int_1^2 (x+1)^2 dx = π[27/3 - 8/3] = 19π/3

---

## Summary of Key Answers

| Q | Answer | Q | Answer |
|---|--------|---|--------|
| 15 | A) sec^2 x | 26 | A) reverse |
| 16 | A) -1 | 27 | A)* |
| 17 | 12 | 28 | A) 6 2/3 |
| 18 | D) (x^2+1)^{-3/2} | 29 | A) e^2 |
| 19 | D) All of the above | 30 | B) 1/5 |
| 20 | D) 2 | 31 | B) sin(3x+7)/3 + c |
| 21 | 5* | 31 | B) sin(3x+7)/3 + c |
| 22 | C) 3t^2 - 8t - 3 | 32 | C) ln(3x^2+2)/3 + c |
| 24 | B) minimum | 33 | C) e^(5x+4) + c |
| 25 | B) x^3 + 2x^2 + c | 34 | A) 5/6 |
| 26 | A) reverse | 35 | 80π* |
| | | 36 | B) 19π/3 |

*Discrepancy noted between calculated answer and options.

---

## Study Tips

1. Show all steps - Partial credit for method
2. Check units - Area in units^2, volume in units^3
3. Verify critical points - Use second derivative test
4. Watch domains - Denominator ≠ 0, radicand ≥ 0, log > 0
5. Constants of integration - Always +C for indefinite integrals

---

## Glossary Terms

mcq-workshop, multiple-choice, distractor, derivative, integral, quotient-rule, chain-rule, product-rule, logarithmic-differentiation, integration-by-parts, u-substitution, fundamental-theorem-of-calculus, definite-integral, indefinite-integral, inflection-point, critical-point, stationary-point, turning-point, maximum, minimum, volume-of-revolution, disk-method, shell-method, line-integral, double-integral, taylor-series, maclaurin-series, mean-value-theorem, lagrange-multipliers, partial-derivative, differential, linear-approximation, error-estimation
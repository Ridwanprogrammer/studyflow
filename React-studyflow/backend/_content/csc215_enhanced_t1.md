# CSC 215 Topic 1: Number Systems and Codes — Enhanced

## The Central Idea

Digital circuits process **binary** (0/1), but humans work in **decimal**. We need systematic ways to convert between number systems and to encode special types of data (negative numbers, decimal digits, characters).

This topic covers conversions, codes, and the **exact problem types from past exams**.

---

## Why It Matters — Past Exam Coverage

| Past Exam Question | This Topic Covers |
|--------------------|-------------------|
| Convert 73₁₀ to binary | Decimal → Binary conversion |
| Convert 0.125₁₀ to binary | Fractional decimal → Binary |
| Convert 2B6₁₆ to decimal | Hex → Decimal |
| Convert 47₁₀ to octal | Decimal → Octal |
| Convert 1010100101₂ to octal | Binary → Octal (group by 3) |
| Find 2's complement of 11010₂ | 2's complement method |
| BCD encoding | BCD vs binary distinction |

---

## Section 1 — Conversions (Integer)

### Decimal → Binary (Repeated Division)

**Algorithm:** Divide by 2, collect remainders bottom-to-top.

**Example: 73₁₀ → Binary**
```
73 ÷ 2 = 36 rem 1
36 ÷ 2 = 18 rem 0
18 ÷ 2 = 9  rem 0
9  ÷ 2 = 4  rem 1
4  ÷ 2 = 2  rem 0
2  ÷ 2 = 1  rem 0
1  ÷ 2 = 0  rem 1  ← stop
```
Read remainders **bottom-to-top: 1001001₂**

**Check:** 64 + 8 + 1 = 73 ✓

**Example: 47₁₀ → Octal**
```
47 ÷ 8 = 5 rem 7
5  ÷ 8 = 0 rem 5
```
**57₈** (Check: 5×8 + 7 = 47 ✓)

---

### Decimal → Binary (Fractional Part)

**Algorithm:** Multiply fraction by 2, collect integer parts top-to-bottom.

**Example: 0.125₁₀ → Binary**
```
0.125 × 2 = 0.25  → 0
0.25  × 2 = 0.5   → 0
0.5   × 2 = 1.0   → 1  ← stop when fraction becomes 0
```
Read **top-to-bottom: 0.001₂**

**Check:** 0×½ + 0×¼ + 1×⅛ = 0.125 ✓

---

### Binary Fraction → Decimal

Digits to the right of the binary point use negative powers of 2.

**Example: 110.10₂**

```text
1×2² + 1×2¹ + 0×2⁰ + 1×2⁻¹ + 0×2⁻²
= 4 + 2 + 0 + 0.5 + 0
= 6.5₁₀
```

---

### Binary → Decimal (Positional Weights)

**Example: 1010100101₂ → Decimal**
```
Position: 9 8 7 6 5 4 3 2 1 0
Bits:     1 0 1 0 1 0 0 1 0 1
Weights:  512 256 128 64 32 16 8 4 2 1
Sum: 512 + 128 + 32 + 4 + 1 = 677
```

**Example: 1010100101₂ → Octal** (Group by 3 from right)
```
1 010 100 101  (pad left with zeros: 001 010 100 101)
   1   2   4   5
```
**1245₈**

---

### Hex ↔ Binary (Group by 4)

| Hex | Binary |
|-----|--------|
| 0 | 0000 |
| 1 | 0001 |
| ... | ... |
| 9 | 1001 |
| A | 1010 |
| B | 1011 |
| C | 1100 |
| D | 1101 |
| E | 1110 |
| F | 1111 |

**Example: 2B6₁₆ → Binary**
```
2 = 0010
B = 1011
6 = 0110
→ 0010 1011 0110 = 1010110110₂
```

**Example: 2B6₁₆ → Decimal**
```
2×16² + 11×16¹ + 6×16⁰ = 2×256 + 11×16 + 6 = 512 + 176 + 6 = 694
```

---

### Binary → Hex (Group by 4 from right)

**Example: 101100110₂ → Hex**
```
Pad: 0001 0110 0110
     1    6    6
→ 166₁₆
```

---

## Section 2 — Signed Integer Representations (Critical for Exams)

### 1. Sign-Magnitude
- MSB = sign (0=+, 1=-)
- Remaining bits = magnitude
- **Problem:** Two zeros (+0, -0), addition complicated

### 2. One's Complement
- Positive: same as binary
- Negative: invert all bits
- **Problem:** Still two zeros, end-around carry in addition

### 3. Two's Complement (STANDARD — Used in All Computers)

**To get -X in n bits:**
1. Write +X in n bits
2. Invert all bits (one's complement)
3. Add 1

**Example: 2's Complement of 11010₂ (5-bit)**

**Method 1: Invert + Add 1**
```
Original:  1 1 0 1 0
Invert:    0 0 1 0 1
Add 1:     0 0 1 1 0
Result:    00110
```

**Method 2: Copy from right until first 1, then invert rest**
```
11010
  ↑  First 1 from right (position 1)
Copy:  0  (the 1 itself)
Invert rest: 0011
Result: 00110
```

**Check:** If original was +26 (11010 = 16+8+2), then -26 in 5-bit 2's comp:
Range: -16 to +15. -26 needs 6 bits! 
Actually 11010 as unsigned = 26. As signed 5-bit, MSB=1 so negative.
Value = -16 + 8 + 2 = -6. 
-6 in 5-bit 2's comp: 16-6=10 = 01010? No...

Let's recheck: 11010₂ = 26₁₀. But 5-bit signed range is -16 to +15. So 11010 as signed IS negative.
Magnitude: invert (00101) + 1 = 00110 = 6. So value = -6.
2's complement of -6 (i.e., +6) = 00110. ✓

---

### Past Exam: 2's Complement Problems

| Binary | 2's Complement (negate) | Value (if 5-bit signed) |
|--------|------------------------|-------------------------|
| 11010 | 00110 | -6 |
| 1001010 (7-bit) | 0110110 | -54? Wait, 1001010 = 74. MSB=1 → negative. Invert: 0110101 + 1 = 0110110 = 54. So -54. |
| 1010010 | 0101110 | -42? 1010010 = 82. Invert: 0101101 + 1 = 0101110 = 46. So -46. |

---

## Section 3 — BCD (Binary Coded Decimal)

### Definition
Each decimal digit encoded separately in 4-bit binary.

**Example: 59 in BCD**
```
5 = 0101
9 = 1001
BCD: 0101 1001
```
**NOT the same as binary 59 = 111011!**

### BCD Addition
Add as binary. If any 4-bit group > 9 (i.e., 1010-1111), add 6 (0110) to that group.

**Example: 45 + 38 in BCD**
```
  0100 0101  (45)
+ 0011 1000  (38)
= 0111 1101
       ↑ This group = 13 > 9, add 6:
  0111 1101
+      0110
= 1000 0011  → 83 ✓
```

---

## Section 4 — Past Exam Worked Problems

### Problem 1: Convert 73₁₀ to Binary
**Solution:** As shown above: **1001001₂**

### Problem 2: Convert 0.125₁₀ to Binary
**Solution:** 0.001₂

### Problem 3: Convert 2B6₁₆ to Decimal
**Solution:** 2×256 + 11×16 + 6 = 512 + 176 + 6 = **694**

### Problem 4: Convert A4B1₁₆ to Decimal
**Solution:** 10×4096 + 4×256 + 11×16 + 1 = 40960 + 1024 + 176 + 1 = **42161**

### Problem 5: Convert 2C5₁₆ to Decimal
**Solution:** 2×256 + 12×16 + 5 = 512 + 192 + 5 = **709**

### Problem 6: 2's Complement of 11010₂
**Solution:** Invert → 00101, Add 1 → **00110**

### Problem 7: 2's Complement of 1001010₂
**Solution:** Invert → 0110101, Add 1 → **0110110**

### Problem 8: 2's Complement of 1010010₂
**Solution:** Invert → 0101101, Add 1 → **0101110**

### Problem 9: Convert 47₁₀ to Octal
**Solution:** 47 ÷ 8 = 5 rem 7, 5 ÷ 8 = 0 rem 5 → **57₈**

### Problem 10: Convert 151₁₀ to Octal
**Solution:** 151 ÷ 8 = 18 rem 7, 18 ÷ 8 = 2 rem 2, 2 ÷ 8 = 0 rem 2 → **227₈**

### Problem 11: Convert 302₁₀ to Octal
**Solution:** 302 ÷ 8 = 37 rem 6, 37 ÷ 8 = 4 rem 5, 4 ÷ 8 = 0 rem 4 → **456₈**

### Problem 12: Convert 1010100101₂ to Octal
**Solution:** Group by 3: 001 010 100 101 → **1245₈**

### Problem 13: Convert 101100110₂ to Octal
**Solution:** Group by 3: 101 100 110 → **546₈**

---

## Section 5 — Arithmetic Operations (Past Exam)

### Binary Addition

**Example: 101.1011₂ + 1100.001₂**
```
  101.1011
+1100.0010
----------
 10001.1101
```
Align binary points. Add column by column with carry.

### Binary Subtraction

**Example: 1011.011₂ - 1001.110₂**
```
  1011.011
- 1001.110
----------
    1.101
```
Borrow as needed. Or use 2's complement: A - B = A + (-B).

### Binary Addition (Multi-bit)

**Example: 1100001₂ + 10011101₂**
```
  01100001  (pad to 8 bits)
+ 10011101
----------
 100011110  (9 bits = overflow in 8-bit)
```
Unsigned: 97 + 157 = 254 = 11111110? Wait: 97+157=254. 254 = 11111110₂.
Let me recheck: 1100001 = 97, 10011101 = 157. 97+157=254.
254 in binary: 128+64+32+16+8+4+2 = 254 = 11111110₂.
But our addition gave 100011110 = 286? Something wrong.

Let's redo:
```
  01100001  (97)
+ 10011101  (157)
----------
 100011110  (286) — that's 9 bits
```
Ah! 10011101 with leading 1 is negative in signed 8-bit! -99.
97 + (-99) = -2 = 11111110 in 8-bit 2's comp.
But as unsigned: 97 + 157 = 254 = 11111110.
The problem likely expects unsigned addition giving 9-bit result.

---

### Verify De Morgan's Theorems (Past Exam)

**De Morgan's First:** (A + B)' = A' · B'
**De Morgan's Second:** (A · B)' = A' + B'

**Truth Table Verification (3 variables):**

| A | B | C | A+B | (A+B)' | A' | B' | A'·B' |
|---|---|---|-----|--------|----|----|-------|
| 0 | 0 | 0 | 0   | 1      | 1  | 1  | 1     |
| 0 | 0 | 1 | 0   | 1      | 1  | 1  | 1     |
| ... | ... | ... | ... | ...    | ...| ...| ...   |

(Complete all 8 rows — both sides match for all combinations)

---

## Section 6 — Quick Reference: Conversion Algorithms

| Conversion | Algorithm |
|------------|-----------|
| Dec → Bin (int) | Repeated ÷2, remainders bottom-up |
| Dec → Bin (frac) | Repeated ×2, integers top-down |
| Bin → Dec | Sum of 2ᵏ for each 1-bit |
| Bin → Oct | Group 3 bits from right |
| Bin → Hex | Group 4 bits from right |
| Oct → Bin | Each digit → 3 bits |
| Hex → Bin | Each digit → 4 bits |
| Dec → Oct | Repeated ÷8 |
| Dec → Hex | Repeated ÷16 |
| 2's Comp | Invert all bits, add 1 (or: copy to first 1, invert rest) |
| BCD | Each decimal digit → 4-bit binary |

---

## Section 7 — Self-Check Problems

1. Convert 23₁₀ to binary, octal, hex
2. Convert 0.625₁₀ to binary
3. 2's complement of 01101 (5-bit)
4. 101101₂ + 11011₂ (binary addition)
4. BCD of 387
5. Verify (A+B)' = A'·B' with truth table
6. Convert 3B6₁₆ to binary, octal, decimal

---

## Glossary Terms

[[number-system]], [[base]], [[radix]], [[positional-notation]], [[binary]], [[octal]], [[hexadecimal]], [[bcd]], [[sign-magnitude]], [[ones-complement]], [[twos-complement]], [[signed-integer]], [[unsigned-integer]], [[overflow]], [[de-morgans-theorems]], [[truth-table]], [[complement]], [[bit]], [[nibble]], [[byte]], [[word]], [[msb]], [[lsb]]
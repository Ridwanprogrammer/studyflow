# Modular Arithmetic

## The Central Idea

**Modular arithmetic** is arithmetic on a circle. Instead of the infinite number line, numbers "wrap around" after reaching a fixed value called the **modulus**.

Think of a clock: 12-hour clock, after 12 comes 1 again.
- 10 + 5 = 3 (mod 12)
- 7 - 10 = 9 (mod 12)
- 4 × 3 = 12 ≡ 0 (mod 12)

This topic covers:
- Congruence relation and its properties
- Arithmetic modulo n (addition, subtraction, multiplication, division)
- Modular inverses and solving linear congruences
- Chinese Remainder Theorem
- Fermat's Little Theorem and Euler's Theorem
- Applications: cryptography, hashing, checksums, algorithms

---

## Why It Matters

- **Cryptography:** RSA, Diffie-Hellman, elliptic curves all use modular arithmetic
- **Hashing:** Hash tables use modulo for bucket indexing
- **Checksums:** ISBN, credit cards, barcodes use mod 10/11
- **Algorithms:** Many competitive programming problems
- **Number theory:** Foundation for advanced topics

---

## How the Idea Develops

**Section 1 — Conceptual Introduction** → **Section 2 — Terminology** → **Section 3 — Congruence Definition & Properties** → **Section 4 — Modular Arithmetic Operations** → **Section 5 — Modular Inverses & Division** → **Section 6 — Linear Congruences** → **Section 7 — Chinese Remainder Theorem** → **Section 8 — Fermat & Euler Theorems** → **Section 9 — Applications** → **Section 10 — Worked Problems** → **Section 11 — Self-Check**

---

## Section 1 — Conceptual Introduction

### The Clock Analogy

Imagine a clock with n hours (labeled 0 to n-1). When you reach n, you wrap to 0.

- **Addition:** Move clockwise
- **Subtraction:** Move counter-clockwise
- **Multiplication:** Repeated addition
- **Division:** "What multiplied by b gives a?" (not always possible!)

### Congruence

Two integers a and b are **congruent modulo n** if they leave the same remainder when divided by n.

Notation: $a \equiv b \pmod n$

$$
 a \equiv b \pmod n \iff n \mid (a - b) \iff a \bmod n = b \bmod n 
$$

**Examples:**
- 17 ≡ 5 (mod 12) — both leave remainder 5
- -3 ≡ 9 (mod 12) — -3 + 12 = 9
- 100 ≡ 1 (mod 11) — 100 = 9×11 + 1

---

## Section 2 — Required Terminology

| Term | Meaning |
|------|---------|
| [[modulus]] | The positive integer n in "mod n" |
| [[congruence]] | a ≡ b (mod n): n divides a-b |
| [[residue]] | Remainder when divided by n (0 to n-1) |
| [[residue-class]] | Set of all integers congruent to a given value |
| [[complete-residue-system]] | Set of n integers, one from each residue class mod n |
| [[reduced-residue-system]] | Residues coprime to n (units modulo n) |
| [[modular-inverse]] | a⁻¹ mod n: integer x such that ax ≡ 1 (mod n) |
| [[unit]] | Element with a multiplicative inverse modulo n |
| [[zero-divisor]] | Non-zero a such that ab ≡ 0 (mod n) for some b ≠ 0 |
| [[linear-congruence]] | ax ≡ b (mod n) |
| [[chinese-remainder-theorem]] | System of congruences with coprime moduli has unique solution mod product |
| [[fermat-little-theorem]] | a^{p-1} ≡ 1 (mod p) for prime p, a not divisible by p |
| [[euler-theorem]] | a^{φ(n)} ≡ 1 (mod n) for gcd(a,n)=1 |
| [[euler-totient]] | φ(n) = count of 1≤k≤n with gcd(k,n)=1 |
| [[order]] | Smallest k>0 with a^k ≡ 1 (mod n) |
| [[primitive-root]] | Generator of multiplicative group modulo p |
| [[quadratic-residue]] | a is QR mod p if x² ≡ a (mod p) has solution |
| [[legendre-symbol]] | (a/p) = 1 if QR, -1 if QNR, 0 if p|a |
| [[rsa]] | Public-key cryptosystem using modular exponentiation |

---

## Section 3 — Congruence Properties

### Equivalence Relation

Congruence modulo n is an **equivalence relation**:
1. **Reflexive:** a ≡ a (mod n)
2. **Symmetric:** a ≡ b ⇒ b ≡ a
3. **Transitive:** a ≡ b, b ≡ c ⇒ a ≡ c

Partitions ℤ into n **residue classes**: [0], [1], ..., [n-1].

### Arithmetic Compatibility

If a ≡ b (mod n) and c ≡ d (mod n), then:
- a + c ≡ b + d (mod n)
- a - c ≡ b - d (mod n)
- a · c ≡ b · d (mod n)
- aᵏ ≡ bᵏ (mod n) for any k ≥ 0

**This means:** We can compute with residues instead of full integers!

---

## Section 4 — Modular Arithmetic Operations

### Addition & Subtraction

$ (a + b) \bmod n = ((a \bmod n) + (b \bmod n)) \bmod n $

$ (a - b) \bmod n = ((a \bmod n) - (b \bmod n)) \bmod n $

**Example:** (123 + 456) mod 7 = (4 + 1) mod 7 = 5

### Multiplication

$ (a \cdot b) \bmod n = ((a \bmod n) \cdot (b \bmod n)) \bmod n $

**Example:** (123 × 456) mod 7 = (4 × 1) mod 7 = 4

### Exponentiation

Use **repeated squaring** (binary exponentiation) for large powers:

```python
def mod_pow(a, e, n):
    result = 1
    a = a % n
    while e > 0:
        if e % 2 == 1:
            result = (result * a) % n
        a = (a * a) % n
        e //= 2
    return result
```

**Example:** 3¹⁰⁰ mod 7
3² = 9 ≡ 2
3⁴ ≡ 2² = 4
3⁸ ≡ 4² = 16 ≡ 2
3¹⁶ ≡ 4
3³² ≡ 2
3⁶⁴ ≡ 4
100 = 64 + 32 + 4
3¹⁰⁰ ≡ 4 × 2 × 4 = 32 ≡ 4 (mod 7)

---

## Section 5 — Modular Inverses & Division

### Division in Modular Arithmetic

"Division" by b means multiplying by **b⁻¹** (modular inverse of b).

$ a / b \equiv a \cdot b^{-1} \pmod n $

### When Does Inverse Exist?

**Theorem:** a has an inverse modulo n **iff** gcd(a, n) = 1.

**Proof:** By Bézout's identity, ∃x,y: ax + ny = 1 ⇔ ax ≡ 1 (mod n). gcd(a,n) must divide 1.

### Finding Inverse: Extended Euclidean Algorithm

Solve ax + ny = gcd(a,n) = 1. Then x ≡ a⁻¹ (mod n).

**Example:** Find 3⁻¹ mod 7.
3x + 7y = 1
7 = 2×3 + 1
1 = 7 - 2×3
So x = -2 ≡ 5 (mod 7). 3⁻¹ ≡ 5. Check: 3×5 = 15 ≡ 1 ✓

### Zero Divisors

If gcd(a,n) > 1, a has **no inverse**. Such a is a **zero divisor**: ∃b≠0 with ab ≡ 0 (mod n).

**Example:** mod 6. gcd(2,6)=2. 2 × 3 = 6 ≡ 0 (mod 6). 2 and 3 are zero divisors.

---

## Section 6 — Linear Congruences

### General Form

$$
 ax \equiv b \pmod n 
$$

### Solution Method

Let d = gcd(a, n).

- **If d ∤ b:** No solutions.
- **If d | b:** Divide by d: (a/d)x ≡ (b/d) (mod n/d)
  - Now gcd(a/d, n/d) = 1, so inverse exists
  - Unique solution modulo n/d
  - d solutions modulo n: x₀, x₀ + n/d, x₀ + 2n/d, ..., x₀ + (d-1)n/d

### Example

Solve: 6x ≡ 9 (mod 15)

d = gcd(6,15) = 3. 3 | 9 ✓
Divide: 2x ≡ 3 (mod 5)
Inverse of 2 mod 5 is 3 (2×3=6≡1).
x ≡ 3×3 ≡ 9 ≡ 4 (mod 5)
Solutions mod 15: 4, 4+5=9, 9+5=14.
**Answer: x ≡ 4, 9, 14 (mod 15)**

---

## Section 7 — Chinese Remainder Theorem (CRT)

### Statement

Let n₁, n₂, ..., nₖ be **pairwise coprime**. The system:

\begin{align}
x &\equiv a_1 \pmod{n_1} \\
x &\equiv a_2 \pmod{n_2} \\
&\vdots \\
x &\equiv a_k \pmod{n_k}
\end{align}

has a **unique solution modulo N = n₁n₂⋯nₖ**.

### Constructive Solution

For each i:
- Nᵢ = N / nᵢ
- Find yᵢ = Nᵢ⁻¹ mod nᵢ (exists since gcd(Nᵢ, nᵢ) = 1)
- Solution: $x = \sum_{i=1}^k a_i N_i y_i \pmod N$

### Example

Solve:
x ≡ 2 (mod 3)
x ≡ 3 (mod 5)
x ≡ 2 (mod 7)

N = 3×5×7 = 105
N₁ = 35, y₁ = 35⁻¹ mod 3 = 2⁻¹ mod 3 = 2
N₂ = 21, y₂ = 21⁻¹ mod 5 = 1⁻¹ mod 5 = 1
N₃ = 15, y₃ = 15⁻¹ mod 7 = 1⁻¹ mod 7 = 1

x = 2×35×2 + 3×21×1 + 2×15×1 = 140 + 63 + 30 = 233 ≡ 233 - 2×105 = **23 (mod 105)**

Check: 23 mod 3 = 2 ✓, 23 mod 5 = 3 ✓, 23 mod 7 = 2 ✓

---

## Section 8 — Fermat's Little Theorem & Euler's Theorem

### Fermat's Little Theorem

If p is prime and p ∤ a:
$$
 a^{p-1} \equiv 1 \pmod p 
$$

**Corollary:** For any a, $a^p \equiv a \pmod p$

### Euler's Theorem (Generalization)

If gcd(a, n) = 1:
$$
 a^{\varphi(n)} \equiv 1 \pmod n 
$$

where φ(n) = number of integers 1 ≤ k ≤ n with gcd(k, n) = 1.

### Euler's Totient Function φ(n)

- φ(p) = p-1 for prime p
- φ(pᵏ) = pᵏ - pᵏ⁻¹ = pᵏ⁻¹(p-1)
- φ(mn) = φ(m)φ(n) if gcd(m,n)=1 (multiplicative)
- φ(n) = n ∏_{p|n} (1 - 1/p)

**Examples:**
- φ(12) = φ(4)φ(3) = 2×2 = 4 (coprime: 1,5,7,11)
- φ(100) = φ(4)φ(25) = 2×20 = 40

### Applications

**Modular exponentiation simplification:**
- aᵏ mod n: Reduce exponent modulo φ(n) if gcd(a,n)=1
- Example: 7¹⁰⁰ mod 15. φ(15)=8. 100 ≡ 4 (mod 8). 7⁴ = 2401 ≡ 1 (mod 15).

**Fermat primality test:** If a^{n-1} ≢ 1 (mod n) for some a, n is composite.

---

## Section 9 — Applications

### 1. Cryptography: RSA

**Key Generation:**
1. Choose large primes p, q
2. n = pq, φ(n) = (p-1)(q-1)
3. Choose e with 1 < e < φ(n), gcd(e, φ(n)) = 1
4. d = e⁻¹ mod φ(n)
5. Public: (n, e). Private: d.

**Encryption:** c = mᵉ mod n
**Decryption:** m = cᵈ mod n

Works because m^{ed} ≡ m^{1+kφ(n)} ≡ m (mod n) by Euler.

### 2. Hashing

Hash table with m buckets: h(k) = k mod m
Choose m prime to reduce collisions.

### 3. Checksums

**ISBN-10:** ∑_{i=1}^{10} i·dᵢ ≡ 0 (mod 11)
**Credit card (Luhn):** Double every second digit from right, sum digits, total ≡ 0 (mod 10)

### 4. Diffie-Hellman Key Exchange

Public: prime p, generator g
Alice: picks a, sends A = gᵃ mod p
Bob: picks b, sends B = gᵇ mod p
Shared secret: s = Bᵃ = g^{ab} = Aᵇ mod p

---

## Section 10 — Worked Problems

### Problem 1: Basic Computation

> *Compute: (1234 × 5678) mod 9*

**Solution:** 1234 ≡ 1+2+3+4 = 10 ≡ 1 (mod 9)
5678 ≡ 5+6+7+8 = 26 ≡ 8 (mod 9)
1 × 8 = 8 (mod 9)
**Answer: 8**

---

### Problem 2: Modular Inverse

> *Find 7⁻¹ mod 26.*

**Solution:** Extended Euclid:
26 = 3×7 + 5
7 = 1×5 + 2
5 = 2×2 + 1
1 = 5 - 2×2 = 5 - 2(7-5) = 3×5 - 2×7 = 3(26-3×7) - 2×7 = 3×26 - 11×7
So -11 ≡ 15 (mod 26). 7⁻¹ ≡ 15.
Check: 7×15 = 105 = 4×26 + 1 ≡ 1 ✓

---

### Problem 3: Linear Congruence

> *Solve: 8x ≡ 12 (mod 20)*

**Solution:**
d = gcd(8,20) = 4. 4 | 12 ✓
Divide: 2x ≡ 3 (mod 5)
2⁻¹ ≡ 3 (mod 5)
x ≡ 3×3 ≡ 9 ≡ 4 (mod 5)
Solutions mod 20: 4, 9, 14, 19
**Answer: x ≡ 4, 9, 14, 19 (mod 20)**

---

### Problem 4: Chinese Remainder Theorem

> *Find smallest positive integer x such that:*
> x ≡ 1 (mod 3)
> x ≡ 2 (mod 4)
> x ≡ 3 (mod 5)

**Solution:**
N = 60
N₁=20, y₁=20⁻¹≡2⁻¹≡2 (mod 3)
N₂=15, y₂=15⁻¹≡3⁻¹≡3 (mod 4)
N₃=12, y₃=12⁻¹≡2⁻¹≡3 (mod 5)

x = 1×20×2 + 2×15×3 + 3×12×3 = 40 + 90 + 108 = 238 ≡ 238 - 3×60 = **58**

Check: 58 mod 3 = 1 ✓, 58 mod 4 = 2 ✓, 58 mod 5 = 3 ✓

---

### Problem 5: Fermat's Little Theorem

> *Compute 3¹⁰⁰ mod 11.*

**Solution:** 11 is prime, gcd(3,11)=1.
By FLT: 3¹⁰ ≡ 1 (mod 11)
3¹⁰⁰ = (3¹⁰)¹⁰ ≡ 1¹⁰ = 1 (mod 11)
**Answer: 1**

---

### Problem 6: Euler's Theorem

> *Compute 7¹⁰⁰ mod 15.*

**Solution:** gcd(7,15)=1. φ(15)=φ(3)φ(5)=2×4=8.
7⁸ ≡ 1 (mod 15)
100 = 8×12 + 4
7¹⁰⁰ = (7⁸)¹² × 7⁴ ≡ 1 × 7⁴ (mod 15)
7² = 49 ≡ 4
7⁴ ≡ 4² = 16 ≡ 1
**Answer: 1**

---

### Problem 7: Divisibility Test

> *Prove: A number is divisible by 9 iff sum of its digits is divisible by 9.*

**Proof:** 10 ≡ 1 (mod 9) ⇒ 10ᵏ ≡ 1 (mod 9) for all k.
Number N = dₖ10ᵏ + ... + d₁10 + d₀
N ≡ dₖ + ... + d₁ + d₀ (mod 9)
So N ≡ 0 (mod 9) ⇔ sum of digits ≡ 0 (mod 9). ∎

---

### Problem 8: RSA Example (Small Numbers)

> *RSA with p=3, q=11. e=3. Encrypt m=7.*

**Solution:**
n = 33, φ = 2×10 = 20
e = 3, gcd(3,20)=1 ✓
d = 3⁻¹ mod 20. 3×7=21≡1 ⇒ d=7
Encrypt: c = 7³ mod 33 = 343 mod 33 = 343 - 10×33 = 13
Decrypt: m = 13⁷ mod 33
13² = 169 ≡ 4
13⁴ ≡ 4² = 16
13⁷ = 13⁴ × 13² × 13 ≡ 16 × 4 × 13 = 832 ≡ 832 - 25×33 = 7 ✓

---

### Problem 9: Order of Element

> *Find the order of 2 modulo 11.*

**Solution:** φ(11)=10. Order divides 10.
2¹ = 2
2² = 4
2⁵ = 32 ≡ 10 ≡ -1 (mod 11)
2¹⁰ = (2⁵)² ≡ (-1)² = 1
Order = 10 (primitive root modulo 11)

---

### Problem 10: System with Non-Coprime Moduli

> *Solve: x ≡ 2 (mod 6), x ≡ 3 (mod 4)*

**Solution:** Moduli not coprime (gcd=2).
Check compatibility: 2 ≡ 3 (mod 2)? 0 ≡ 1 (mod 2) ✗
**No solution.**

If compatible (e.g., x≡2 (mod 6), x≡4 (mod 4)):
2 ≡ 4 (mod 2) ✓
Solve: x = 2 + 6k ≡ 4 (mod 4) ⇒ 2 + 2k ≡ 0 (mod 4) ⇒ 2k ≡ 2 (mod 4) ⇒ k ≡ 1 (mod 2)
k = 1 + 2t ⇒ x = 2 + 6(1+2t) = 8 + 12t
Solution: **x ≡ 8 (mod 12)**

---

## Section 11 — Common Pitfalls

| Pitfall | Correction |
|---------|------------|
| Dividing without checking gcd | Only divide congruence by d if d divides everything |
| Forgetting to reduce modulo n at each step | Keep numbers small: (a×b) mod n = ((a mod n)×(b mod n)) mod n |
| Using FLT when modulus not prime | Use Euler's theorem instead |
| Assuming inverse exists | Check gcd(a,n)=1 first |
| CRT with non-coprime moduli | Must check compatibility condition first |
| Confusing a^b mod n with (a mod n)^b | They ARE equal, but compute the reduced base first |

---

## Section 12 — Conceptual Model

**Modular Arithmetic = Arithmetic on a Circle**

- **Modulus n** = circumference of circle
- **Residues** = positions 0 to n-1
- **Addition** = walk clockwise
- **Multiplication** = repeated walking
- **Inverse** = "what walk undoes this walk?"
- **CRT** = multiple circles aligned at one point → single big circle
- **Fermat/Euler** = walking around circle eventually returns to 1
- **RSA** = easy to walk forward (encrypt), hard to reverse without secret (decrypt)

---

## Section 13 — Glossary Terms Used in This Topic

[[modulus]], [[congruence]], [[residue]], [[residue-class]], [[complete-residue-system]], [[reduced-residue-system]], [[modular-inverse]], [[unit]], [[zero-divisor]], [[linear-congruence]], [[chinese-remainder-theorem]], [[fermat-little-theorem]], [[euler-theorem]], [[euler-totient]], [[order]], [[primitive-root]], [[quadratic-residue]], [[legendre-symbol]], [[rsa]], [[diffie-hellman]], [[extended-euclidean-algorithm]], [[bezout-identity]], [[modular-exponentiation]], [[binary-exponentiation]], [[repeated-squaring]], [[carmichael-function]], [[pseudoprime]], [[miller-rabin]], [[hash-function]], [[checksum]], [[luhn-algorithm]], [[isbn-check-digit]]
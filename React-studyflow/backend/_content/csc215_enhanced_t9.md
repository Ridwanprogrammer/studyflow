# Exam Problem Workshop: Digital Logic Design

## Translate, solve, and verify

Digital-logic exam problems often move between representations: a requirement becomes a truth table, the table becomes a Boolean expression, and the expression becomes a circuit. For number systems, the same value is written in different bases or signed encodings. In every case, state your convention and verify the result independently.

## Draw a circuit from a Boolean expression

For $X=A'C+BC+A'B'C$, begin by grouping terms:

$$A'C+A'B'C=A'C(1+B')=A'C,$$

so $X=A'C+BC$. This simplified expression needs two AND terms and one OR, plus an inverter for $A$. Check against the original expression using Boolean identities before drawing.

To verify a theorem such as De Morgan's law, compare both sides for every input combination. For two inputs, $(A+B)'$ and $A'B'$ are both 1 only when $A=B=0$, so the columns match for all four rows.

**Try it:** Simplify $AB+A'B$. Factor $B$: $B(A+A')=B$.

## Convert between number systems

### Decimal to another base

Repeated division gives digits from right to left. For $151_{10}$ in base 8:

```text
151 ÷ 8 = 18 remainder 7
 18 ÷ 8 =  2 remainder 2
  2 ÷ 8 =  0 remainder 2
```

Read bottom-up: $227_8$. Check: $2(64)+2(8)+7=151$.

### Binary to octal or hexadecimal

Group bits in threes from the binary point for octal and fours for hexadecimal. For $101100110_2$, grouping by three gives $101\ 100\ 110$, or $546_8$. Convert back: $5(64)+4(8)+6=366$, which is also the binary value.

### Fractional binary

Bits after the point have weights $2^{-1},2^{-2},\ldots$. Thus $101.101_2=4+1+1/2+1/8=5.625_{10}$.

## Interpret signed binary carefully

For an $n$-bit two's-complement number, the leftmost bit has negative weight $-2^{n-1}$. In 5 bits, `11010` means $-16+8+2=-6$. To negate a bit pattern, invert and add 1 while retaining the same width: `11010` becomes `00110`, or $+6$.

The width is part of the representation. Five-bit signed numbers range from $-16$ to $15$; `+26` does not fit. In 6 bits, `+26` is `011010` and `-26` is `100110`.

**Try it:** Interpret the 7-bit pattern `1001010`. Its value is $-64+8+2=-54$.

## Encode decimal digits in BCD

BCD stores each decimal digit separately in four bits. Decimal 59 is `0101 1001` in BCD, not the ordinary binary number `111011`. When adding BCD digits, add as binary; if a four-bit result exceeds 9, add `0110` to correct it and pass any carry into the next digit.

For 45+38, the units are $0101+1000=1101$ (13), so add 6 to obtain `1 0011`: units digit 3 with carry 1. The tens are $0100+0011+1=1000$, digit 8. The result is BCD `1000 0011`, representing 83.

## A reliable final check

1. Write down the base, bit width, and signed/unsigned convention.
2. Show each conversion step and the direction in which digits are read.
3. Use a truth table for small Boolean functions.
4. Verify a converted number by converting back or evaluating its place values.
5. Check that the answer fits the specified width and encoding.

These checks catch common mistakes: reversing division remainders incorrectly, grouping from the wrong side, omitting sign extension, and confusing BCD with ordinary binary.

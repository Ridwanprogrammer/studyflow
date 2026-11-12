# Number Systems and Codes

## Different symbols can describe the same quantity

People usually write numbers in decimal, using ten symbols: $0$ through $9$. A digital circuit is built from two stable states, commonly represented as 0 and 1, so binary is a natural way to represent information inside it. Decimal and binary are not different kinds of quantity; they are different ways to write a value.

The key is **place value**. In decimal, each position is a power of 10. In binary, each position is a power of 2. Once the place values are clear, conversions are bookkeeping rather than guesswork.

## Read a number using its base

The **base** (or radix) tells you how many digit symbols are used and what each position is worth. For a base-$b$ number,

$$(d_nd_{n-1}\ldots d_0)_b=\sum_{i=0}^{n}d_i b^i.$$

The subscript $b$ names the base. For example,

$$1011_2=1(2^3)+0(2^2)+1(2^1)+1(2^0)=8+0+2+1=11_{10}.$$

The same value in decimal is $11$. A binary digit is called a **bit**. The rightmost bit is the $2^0$ place; moving left multiplies the place value by 2 each time.

Hexadecimal uses base 16. Since ten symbols are not enough, it uses $A$ through $F$ for values 10 through 15. One hexadecimal digit represents exactly four bits:

| Hex digit | Binary | Hex digit | Binary |
|---|---|---|---|
| 0–3 | 0000–0011 | 8–B | 1000–1011 |
| 4–7 | 0100–0111 | C–F | 1100–1111 |

For instance, $2B6_{16}=2(16^2)+11(16)+6=694_{10}$. Converting each hex digit to four bits gives $0010\ 1011\ 0110_2$; leading zeros may be dropped when they do not represent a fixed-width word.

## Convert between decimal and binary

### Whole-number conversion: divide and collect remainders

To convert a positive decimal integer to base 2, divide by 2 repeatedly. Each remainder is the next binary digit, starting from the rightmost place. Read the remainders from bottom to top.

For $73_{10}$:

```text
73 ÷ 2 = 36 remainder 1
36 ÷ 2 = 18 remainder 0
18 ÷ 2 =  9 remainder 0
 9 ÷ 2 =  4 remainder 1
 4 ÷ 2 =  2 remainder 0
 2 ÷ 2 =  1 remainder 0
 1 ÷ 2 =  0 remainder 1
```

Reading upward gives $1001001_2$. Check by place value: $64+8+1=73$. This check is useful because reversing the remainders is an easy mistake.

The same method works in another base: divide by that base and read remainders upward. For example, $47_{10}$ in base 8 gives remainders 7 and 5, so $47_{10}=57_8$.

### Fraction conversion: multiply and collect whole parts

For a decimal fraction between 0 and 1, multiply by 2 repeatedly. At each step, the whole-number part is the next bit after the binary point; continue with the remaining fractional part.

For $0.125_{10}$:

```text
0.125 × 2 = 0.25  → bit 0
0.25  × 2 = 0.5   → bit 0
0.5   × 2 = 1.0   → bit 1; stop
```

Reading downward gives $0.001_2$. Check: $0(2^{-1})+0(2^{-2})+1(2^{-3})=1/8=0.125$. Some fractions do not terminate in binary, just as $1/3$ does not terminate in decimal; in those cases, stop at the required precision and state that the result is an approximation.

## Use grouping to convert binary quickly

Because $8=2^3$, group binary digits in threes from the binary point to convert to octal. Because $16=2^4$, group in fours to convert to hexadecimal. Add leading or trailing zeros to complete a group; they do not change the value.

For $1010100101_2$, grouping by threes gives $001\ 010\ 100\ 101$, which converts to $1245_8$. Grouping by fours gives $0010\ 1010\ 0101$, or $2A5_{16}$.

**Pause and try:** Convert $1101_2$ to decimal and hexadecimal. Its place values give $8+4+1=13_{10}$. Padding to four bits gives $1101_2=D_{16}$.

## Bits alone do not tell you whether a number is negative

A bit pattern has meaning only after a representation and a word width are specified. The 5-bit pattern `11010` is 26 if interpreted as unsigned binary. In **two's-complement** signed representation, the same pattern means $-6$.

For an $n$-bit two's-complement number, the leftmost bit has weight $-2^{n-1}$ and the remaining bits have positive powers of 2. A 5-bit signed value therefore ranges from $-16$ to $15$. To negate a value, invert every bit and add 1, keeping the same width.

For example, $+6$ in 5 bits is `00110`. Invert to `11001`, then add 1 to get `11010`, which represents $-6$. Negating `11010` repeats the process and returns `00110`.

The width matters. Five-bit signed representation cannot hold $+26$. In six bits, $+26$ is `011010`, and $-26$ is `100110`. Always pad to the chosen width before taking a two's complement.

## Binary-coded decimal stores decimal digits separately

Binary-coded decimal (**BCD**) represents each decimal digit using its own four-bit group. Thus decimal 59 is `0101 1001` in BCD: `0101` represents digit 5 and `1001` represents digit 9. This is different from the ordinary binary representation of 59, which is `111011`.

BCD is useful when a system must display or process decimal digits directly. Its trade-off is that some four-bit patterns, such as `1010`, are not valid BCD digits. When adding BCD numbers, a digit group above 9 must be corrected by adding 6 (binary `0110`) so the result returns to a valid decimal digit and passes any carry to the next group.

## A safe conversion routine

1. Write down the source base and target base.
2. For positional evaluation, multiply each digit by its place value and add.
3. For whole-number conversion by repeated division, read remainders from last to first.
4. For fractional conversion by repeated multiplication, read whole parts from first to last.
5. For binary/octal/hex conversion, group bits from the point in threes or fours.
6. For signed values or BCD, state the representation and bit width before interpreting the pattern.

These checks prevent the most common errors: reading remainders in the wrong direction, grouping from the wrong side, and treating a bit pattern as though its meaning were self-evident.

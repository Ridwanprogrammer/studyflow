# Logic and Proof Techniques

## A proof is a checked path from assumptions to a conclusion

Suppose someone claims that a sequence of steps always leads to the correct answer. You would want each step to follow from a rule or an earlier step, not just sound convincing. Mathematical logic studies which conclusions follow from which statements; a proof is a careful chain that makes this dependence visible.

A **proposition** is a statement that is either true or false. “7 is prime” is true; “10 is odd” is false. A question or command is not a proposition because it does not have a truth value.

## Connect simple statements with logical operations

Let $p$ and $q$ be propositions. The main connectives combine their truth values:

| Expression | Read as | True when |
|---|---|---|
| $\neg p$ | not $p$ | $p$ is false |
| $p\land q$ | $p$ and $q$ | both are true |
| $p\lor q$ | $p$ or $q$ | at least one is true |
| $p\to q$ | if $p$, then $q$ | except when $p$ is true and $q$ is false |
| $p\leftrightarrow q$ | $p$ iff $q$ | both have the same truth value |

In mathematics, “or” is normally inclusive: if both $p$ and $q$ are true, $p\lor q$ is true.

An implication $p\to q$ can sound like cause and effect, but logically it states a condition: there is no case where $p$ holds and $q$ fails. It is equivalent to $\neg p\lor q$. Its **contrapositive** $\neg q\to\neg p$ is logically equivalent to it; its converse $q\to p$ is not generally equivalent.

**Pause and check:** “If an integer is divisible by 4, it is even” is true. Its converse—“if an integer is even, it is divisible by 4”—is false, as 6 shows. The contrapositive, “if it is not even, it is not divisible by 4,” is true.

## Quantifiers describe how many objects satisfy a statement

The universal quantifier $\forall$ means “for every,” and the existential quantifier $\exists$ means “there is at least one.” For example,

$$\forall x\in\mathbb Z,\quad x^2\ge0$$

says every integer has a nonnegative square. By contrast,

$$\exists x\in\mathbb Z,\quad x^2=9$$

says at least one integer squares to 9.

To disprove a universal claim, one **counterexample** is enough. To prove an existential claim, exhibit an example and verify it. Negating quantifiers switches them: “not every student passed” means “there exists a student who did not pass”; “there is no failing student” means “every student passed.”

## Choose a proof method that matches the claim

### Direct proof

Start with the assumptions and use definitions and known facts to reach the conclusion.

**Claim:** The sum of two even integers is even. By definition, write them as $2m$ and $2n$ for integers $m,n$. Their sum is $2m+2n=2(m+n)$; since $m+n$ is an integer, the sum is even.

### Contrapositive

To prove $p\to q$, it can be simpler to prove the equivalent statement $\neg q\to\neg p$.

**Claim:** If $n^2$ is odd, then $n$ is odd. Prove the contrapositive: if $n$ is even, write $n=2k$. Then $n^2=4k^2=2(2k^2)$ is even. Therefore an even $n$ cannot have an odd square, which proves the original claim.

### Contradiction

Assume the claim is false and show that this assumption forces an impossibility.

To prove $\sqrt2$ is irrational, suppose $\sqrt2=a/b$ in lowest terms with integers $a,b$ and $b\ne0$. Squaring gives $a^2=2b^2$, so $a^2$ is even and therefore $a$ is even. Let $a=2k$. Then $4k^2=2b^2$, so $b^2=2k^2$ and $b$ is even too. This contradicts that $a/b$ was in lowest terms. Thus $\sqrt2$ is irrational.

### Proof by cases

Split all possibilities into cases that cover the domain, then prove the result in each. For an integer $n$, either it is even or it is odd. Any argument using these cases must handle both.

### Mathematical induction

Induction proves a statement $P(n)$ for every integer $n$ from some starting value onward. First prove the base case. Then assume $P(k)$ for an arbitrary $k$ in range and use that assumption to prove $P(k+1)$. The inductive step is the bridge from one case to the next; without the base case, the bridge has no starting point.

**Example:** Prove $1+2+\cdots+n=n(n+1)/2$ for $n\ge1$. Base case $n=1$: both sides are 1. Assume the formula for $k$. Then

$$1+\cdots+k+(k+1)=\frac{k(k+1)}2+(k+1)=\frac{(k+1)(k+2)}2,$$

which is the formula for $k+1$. Therefore it holds for every $n\ge1$.

## Common proof mistakes

- Giving several examples does not prove a statement about every integer.
- An implication is disproved only by a case where its premise is true and conclusion false.
- In induction, assume the statement only for an arbitrary $k$; do not assume the desired result for all values.
- A proof by contradiction must identify a genuine contradiction with a definition, assumption, or established result.
- Define variables and state the domain so the proof's claims have a precise meaning.

## Practice

1. Write the negation of “every integer greater than 2 is prime.”
2. Is the converse of “if $n$ is divisible by 6, then $n$ is divisible by 3” true?
3. Use induction to prove $1+3+\cdots+(2n-1)=n^2$ for $n\ge1$.

**Check:** 1. “There exists an integer greater than 2 that is not prime.” 2. No; 9 is divisible by 3 but not by 6. 3. Base $n=1$ holds. If the sum through $2k-1$ is $k^2$, adding the next odd term $2k+1$ gives $k^2+2k+1=(k+1)^2$.

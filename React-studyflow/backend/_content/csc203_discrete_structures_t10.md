# Exam Problem Workshop: Discrete Structures

## Treat a problem as a translation task

Exam questions often describe a familiar structure in words and ask you to express it mathematically. Before calculating, identify the objects, the rule connecting them, and what the question wants counted or proved. This workshop uses representative problems from sets, counting, relations, functions, logic, recurrence, graphs, and modular arithmetic.

## Sets and counting

### Ordered pairs and Cartesian products

Let $A=\{1,2\}$ and $B=\{a,b,c\}$. The Cartesian product $A\times B$ contains every ordered pair whose first component is from $A$ and second from $B$:

$$A\times B=\{(1,a),(1,b),(1,c),(2,a),(2,b),(2,c)\}.$$

The order matters: $(1,a)$ and $(a,1)$ are different, and the latter is not in this product. If $|A|=m$ and $|B|=n$, then $|A\times B|=mn$.

### Count arrangements with restrictions

Four distinct students are to stand in a line. If Ada must stand first, fix her position and arrange the remaining three: $3!=6$. If Ada and Bola must stand together, treat them as one block. There are three units to arrange, giving $3!$ orders, and Ada/Bola can swap within their block in 2 ways. Total: $3!\cdot2=12$.

The useful question is whether a condition fixes a position, creates a block, or excludes cases. For “at least one” conditions, count all arrangements and subtract the arrangements with none when that complement is easier.

**Try it:** How many 5-character strings use distinct letters from A–Z? There are 26 choices for the first position, then 25, 24, 23, and 22: $26\cdot25\cdot24\cdot23\cdot22$.

## Relations and their properties

Let $A=\{2,3,4,5,6\}$ and define $xRy$ when $x$ and $y$ are relatively prime, meaning their greatest common divisor is 1. Check pairs by fixing $x$ and finding the elements of $A$ that share no common factor greater than 1:

- For 2: 3 and 5.
- For 3: 2, 4, and 5.
- For 4: 3 and 5.
- For 5: 2, 3, 4, and 6.
- For 6: only 5.

Thus

$$R=\{(2,3),(2,5),(3,2),(3,4),(3,5),(4,3),(4,5),(5,2),(5,3),(5,4),(5,6),(6,5)\}.$$

It is symmetric because $\gcd(x,y)=\gcd(y,x)$. It is not reflexive, since $(2,2)$ is not in $R$. It is not transitive: $(2,3)$ and $(3,4)$ are in $R$, but $(2,4)$ is not.

## Functions: check the direction of the pairing

For $f:\{1,2,3\}\to\{a,b,c\}$ with $1\mapsto a$, $2\mapsto b$, $3\mapsto b$, the range is $\{a,b\}$. It is not injective because two inputs share $b$; it is not surjective because $c$ is missed. Therefore it is not bijective and has no inverse function on the stated codomain.

Keep the tests separate: injective asks whether inputs collide; surjective asks whether any codomain outputs are missed. A function may pass one test and fail the other.

## Logic and proof

To disprove “for every integer $n$, $n^2+n+41$ is prime,” one counterexample is enough. At $n=41$, the expression is $41^2+41+41=41\cdot43$, which is composite. A pattern that works for many small inputs is not a proof of a universal claim.

For a proof by induction, state the base case and the step explicitly. To prove $1+2+\cdots+n=n(n+1)/2$, check $n=1$. Then assume the result for $k$ and add $k+1$:

$$\frac{k(k+1)}2+(k+1)=\frac{(k+1)(k+2)}2.$$

This proves the formula for $k+1$, completing the induction.

## Recurrences and graphs

The Fibonacci recurrence $F_n=F_{n-1}+F_{n-2}$ needs two starting values, such as $F_0=0$ and $F_1=1$. It then gives $0,1,1,2,3,5,\ldots$. To compute a term, expand backward until reaching known initial values. Do not confuse the recurrence rule with a closed formula; they describe the same sequence in different ways.

In an undirected graph, the sum of all vertex degrees equals twice the number of edges: each edge touches two endpoints and contributes 1 to each endpoint's degree. Thus a graph with 9 edges has total degree 18. Since a sum of odd degrees is even, the number of odd-degree vertices must be even.

## Modular arithmetic

Congruence modulo $m$ means two integers have the same remainder after division by $m$. For example, $38\equiv2\pmod{12}$ because both leave remainder 2. Reduce numbers before multiplying:

$$17\cdot23\pmod 5\equiv2\cdot3\equiv6\equiv1\pmod5.$$

The final reduction matters. An inverse of $a$ modulo $m$ exists exactly when $\gcd(a,m)=1$. For example, 3 has an inverse modulo 7 because $3\cdot5=15\equiv1\pmod7$; its inverse is 5.

## A final exam routine

1. Rewrite the question using the exact definition of the requested object.
2. Record the domain, assumptions, and any restrictions before calculating.
3. Decide whether order matters, whether repetition is allowed, and whether cases overlap.
4. Show the key reasoning, not only a final number or label.
5. Test the result with a small example, a counterexample search, or an inverse operation.

**Self-check:** Why does one counterexample disprove a universal claim but one confirming example not prove it? A universal claim must hold for every allowed input, so one failure refutes it; finitely many successes do not establish all cases.

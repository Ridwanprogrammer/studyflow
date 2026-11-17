# Past Examination Questions Compilation

## CSC 203: Discrete Structures (C.A. Test - 15/11/2025)

1. Given that $A = \{2, 3, 5\}$ and $B = \{0, 1\}$, find the number of different ordered pairs in which the first entry is an element of $A$ and the second is an element of $B$.

2. It has been decided that the flag of a newly formed forum will be in the form of three blocks, each coloured differently. If there are six different colours on the whole to choose from, how many such designs are possible?

3. Let $A = \{2, 3, 4, 5, 6\}$ and $R = \{(x, y) \mid x, y \text{ are relatively prime}\}$ be a relation in $R$. Write down $R$ as the set of ordered pairs in roster form.

4. Prove that $(n - r) \cdot C(n, r) = (r + 1) \cdot C(n, r + 1)$.

5. Show that $(p \rightarrow q) \rightarrow r$ and $p \rightarrow (q \rightarrow r)$ are not equivalent.

## CSC 215: Digital Logic Design (First Semester Examination)

### Test / Paper Section A

1. Draw the logic gate diagram of the following expressions below:
   - (i) $X = A \cdot C + B \cdot C + A \cdot B \cdot C$

   - (ii) Using Truth Table and Boolean variables $X, Y,$ and $Z$, verify De-Morgan's Second Theorem.

2. Convert the following decimal numbers to binary:
   - (i) $73_{10}$

   - (ii) $0.125_{10}$

3. What is the output expression from the logic gate diagram?
   _(Logic Diagram with inputs A, B, C, D leading to output logic network)_

### Test / Paper Section B

1. **Answer any four (4) Questions:**
   - a. Enumerate any four (4) areas where Digital systems are applicable.

   - b. Draw the logic gate diagram of the following expressions:
     - i. $F = A \cdot B + A \cdot C + B \cdot C$

     - ii. $X = A \cdot C + B \cdot C + A \cdot B \cdot C$

     - iii. $Z = \bar{A} \cdot B \cdot C \cdot (A + D)$

   - c. Find the 2's complement of the following:
     - i. $11010_2$

     - ii. $1001010_2$

     - iii. $1010010_2$

2. - a. What is the only input combination that will produce a "HIGH" at the output of five-input of an AND gate?

   - b. Convert the following into decimal:
     - i. $2B6_{16}$

     - ii. $A4B1_{16}$

     - iii. $2C5_{16}$

   - c. Simplify the Boolean expressions below:
     - i. $X \cdot Y \cdot Z + X \cdot Y \cdot \bar{Z} + X \cdot Y \cdot Z + \bar{X} \cdot Y \cdot Z + X \cdot Y \cdot X \cdot Y \cdot Z$

     - ii. $(X + Y) \cdot (X + \bar{Y})$

     - iii. $[(\overline{w \bar{x} + y z}) + z] \{ w + y[\bar{z}] \}$

3. - a. Using Truth Table and Boolean variables $X, Y,$ and $Z$, verify De-Morgan's First and Second Theorems.

   - b. Carry out the following Arithmetic operations:
     - i. $101.1011_2 + 1100.001_2$

     - ii. $1011.011_2 - 1001.110_2$

     - iii. $1100001_2 + 10011101_2$

   - c. Given that $A = 1010$ and $B = 1100$, prove if $\bar{A} \cdot \bar{B} = \overline{A + B}$

4. - a. $A$ and $\bar{A}$ are the same from the circuit diagram given below, determine the Boolean functions $F1$ and $F2$, expressed solely in terms of the external inputs $T1-T8$.

   - b. Convert the following decimal numbers to binary:
     - i. $41.6875_{10}$

     - ii. $51_{10}$

     - iii. $73_{10}$

     - iv. $23_{10}$

     - v. $0.125_{10}$

5. - a. What is the output expression for the logic gate (i) and switching circuit (ii) diagrams below?

   - b. Draw the logic gate diagram of $F = (A \cdot B) \cdot (C \cdot D)$

   - c. Convert the following numbers to octal:
     - i. $47_{10}$

     - ii. $151_{10}$

     - iii. $302_{10}$

     - iv. $1010100101_2$

     - v. $101100110_2$

6. - a. Elaborate on the term Karnaugh Map (K-Map), and outline the simplified expressions produced by the map.

   - b. What does the term _Canonical form_ means in Boolean function?

   - c. Simplify the below Boolean expressions to its minimum level and prove the result using Truth table: $F = A \cdot B + \bar{A} \cdot C + B \cdot C + A \cdot C$

## COS 201 / CSC 201: Software Engineering & Object-Oriented Programming

### FUGUS_CSC201 Test

1. - a) What was the brain behind NATO Software Engineering Conference in 1968 and explicitly explain the concept behind Software Engineering?

   - b) In Tabular form, outline the characteristics of a good software giving example with WhatsApp Application.

   - c) Explain how encapsulation is achieved in object-oriented programming, and write a program to support your explanation.

2. - a) With aid of diagram, list and explain the three types of class relationships in UML.

   - b) Write a program using java programming language. Create a User base class, and Create Student, Lecturer, and Admin classes that inherit from User base class. Demonstrate how an object of each derived class can use:
     - iii. Methods from the parent class

     - iv. Its own specific methods.

   - c) With aid of diagrammatic example, distinguish between aggregation and composition.

### COS 201 / CSC 201 Examination

1. - a. OOP language provides mechanisms that help in implementing the OO Model, briefly explain that OOP concept.

   - b. Write and explain the syntax of the followings java iteration constructs:
     - i. while-loop

     - ii. do-while loop

   - c. Write a java program that will compute factorial of 1000 using for... loop.

2. - a. What are the properties of Java Classes?

   - b. Write a java program that reads your registration number, name, examination scores, test scores and compute total marks. The program should test and assign appropriate grade points based on the table below. The program should print your registration number, name, and grade points.

| Total Marks | Grade | Points |
| ----------- | ----- | ------ |
| $0 - 39$    | F     | 0.0    |
| $40 - 44$   | E     | 1.0    |
| $45 - 49$   | D     | 2.0    |
| $50 - 59$   | C     | 3.0    |
| $60 - 69$   | B     | 4.0    |
| $70 - 100$  | A     | 5.0    |

3. - a. Write a java program that creates a java class named "Dog". Where, the class attributes are breed, age, and color. The class methods are `setBreed()`, `setColor()`, and `printDetails()` to assign values of the dog breed, age, color and display these attributes respectively. Create another class named "TestDog", and create an object named `obj` of Dog class to access its methods.

   - b. Write a java program that reads two integer numbers from the user. The program should test and print the maximum of the two numbers.

4. - a.
     - i. What are Identifiers in JAVA, and what are the several points to remember about identifiers?

     - ii. What would happen if you used Java keywords as a variable or identifier in your Java program?

   - b. What will be the output of the following codes?

## MTH 201: Mathematical Methods I

### Structured / Long Answer Section

1. - a. Define the following:
     - i. Real valued function

     - ii. Differentiation

   - b. If $f(x) = 2^x$, show that $f(x + 3) - f(x - 1) = \frac{15}{2} f(x)$.

   - c. Obtain the first derivative of the following:
     - i. $y = \frac{\sin 3x}{x + 1}$

     - ii. $y = x^x$

2. - a. A rectangular box which is open at the top has capacity of 256 cubic feet. Define the dimensions of the box such that the least material is required for the construction of the box. Use Lagrange's method of multipliers to obtain the length, breadth, and height of the box. Take: $x, y,$ and $z$ to be the length, breadth, and height, $u(x, y, z) = xy + 2yz + 2zx$ and $\phi(x, y, z) = xyz - 256 = 0$.

   - b. Use the Linear approximation of $f(x) = \sqrt[3]{x}$ at $a = 8$ to approximate $\sqrt[3]{8.05}$.

   - c. Differentiate $y = x^2 + 2xy + 3y^2 - 4 = 0$ implicitly at $x = 2, y = 3$.

3. - a. Given $f(x) = 7x^2 - x^3 y^4 + 5x^4 y^3$. Find the following:
     - i. $f_x$

     - ii. $f_y$

     - iii. $f_{xy}$

     - iv. $f_{yx}$

   - b. Use the first derivative test to find the relative extrema of $f(x) = x^2 - 12x$.

   - c. Integrate the Following:
     - i. $\int \frac{\sin x}{(\cos x)^3} dx$

     - ii. $\int x^2 \sin x dx$

4. - a.
     - i. Compute $\int_{-1}^{4} \int_{1}^{3} 2x - 4y^3 dy dx$

   - b. Evaluate the line integral: $F(x, y) = xy$, along the curve $c: x = \cos t, \quad y = \sin t, \quad \text{for } 0 \le t \le \frac{\pi}{2}$

5. - a. State the basic similarity between Taylor's and Maclaurin's series.

   - b. Use the fourth degree Maclaurin's polynomial for $f(x) = \ln(1 + x)$ to estimate the value of $\ln(1.03)$.

6. - a. State the mean value theorem.

   - b. Determine if $f(x) = x^3 - 2x^2 - 4x + 1, \quad 0 \le x \le 1$ satisfy the mean value theorem.

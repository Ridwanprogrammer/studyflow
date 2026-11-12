# Real-valued Functions of Two or More Variables

## A landscape takes a location and returns a measurement

Imagine a weather map. At each location, it assigns a temperature. The location needs two coordinates on a map, but the result is one number. This is a real-valued function of two variables.

$$f:D\subseteq\mathbb R^2\to\mathbb R,\qquad (x,y)\mapsto f(x,y).$$

The ordered pair $(x,y)$ is the input point; $f(x,y)$ is one real output. For three independent coordinates,

$$F:D\subseteq\mathbb R^3\to\mathbb R,\qquad (x,y,z)\mapsto F(x,y,z).$$

“Independent variables” means each coordinate may vary as an input, subject to the domain. Do not confuse a scalar-valued function of three inputs with a vector-valued function, which returns a vector of several outputs.

## The domain becomes a region

The domain is the set of input points that make the rule meaningful and real-valued. For

$$f(x,y)=\sqrt{9-x^2-y^2},$$

the expression under the square root must be nonnegative, so $x^2+y^2\le9$. The domain is a closed disk of radius 3. The graph $z=f(x,y)$ is the upper half of a sphere of radius 3.

For

$$G(x,y,z)=\ln(16-x^2-y^2-z^2),$$

the logarithm's input must be strictly positive. Thus $x^2+y^2+z^2<16$, an open ball of radius 4. The boundary is excluded because $\ln(0)$ is undefined.

**Pause and check:** What is the domain of $h(x,y)=\sqrt{y-x^2}$? It is the region $y\ge x^2$, the points on or above a parabola.

## Visualize outputs as height and contour

For two inputs, the graph $z=f(x,y)$ fits in three-dimensional space: its height at $(x,y)$ is the output. A horizontal slice at a fixed height $k$ gives the level curve

$$f(x,y)=k.$$

A contour map is a collection of these level curves, like lines of equal elevation on a map. For three inputs, the graph would require four coordinates, so we commonly visualize **level surfaces** instead:

$$F(x,y,z)=k.$$

For $F(x,y,z)=x^2+y^2+z^2$, each positive level $k$ is a sphere of radius $\sqrt{k}$ centred at the origin; level zero is just the origin, and negative levels have no points.

## Read a model by interpreting its inputs and output

Suppose a simplified temperature model is

$$T(x,y,z)=20+2x-y+\frac12z,$$

where $(x,y,z)$ locates a point and $T$ is its temperature. At $(1,2,4)$,

$$T(1,2,4)=20+2-2+2=22.$$

The coefficient 2 says that increasing $x$ by one unit while fixing the other coordinates raises the model's output by 2 units. This idea—vary one input while holding the others fixed—leads to partial derivatives in the next topic.

## Practice

1. Find the domain of $f(x,y)=\ln(4-x^2-y^2)$.
2. Describe the level surfaces of $F(x,y,z)=x^2+y^2+z^2$.
3. How many inputs and outputs does $F:\mathbb R^3\to\mathbb R$ have?

**Check:** 1. $x^2+y^2<4$, the open disk of radius 2. 2. Spheres for positive $k$, the origin for $k=0$, and no points for $k<0$. 3. Three real inputs and one real output.

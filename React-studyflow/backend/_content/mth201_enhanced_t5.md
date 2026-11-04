# Real-valued Functions of Two or More Variables

## From a curve to a landscape

A real-valued [[function|function]] of several variables takes a point as input and returns one real number. For example, a room’s temperature can depend on position: two coordinates locate a point on a floor, and the function gives the temperature there.

For two independent variables,
$$f:D\subseteq\mathbb{R}^2\to\mathbb{R},\qquad (x,y)\mapsto f(x,y).$$
For **three independent variables**,
$$F:D\subseteq\mathbb{R}^3\to\mathbb{R},\qquad (x,y,z)\mapsto F(x,y,z).$$
Here “independent” means each coordinate can be chosen as an input, subject to the domain. The output is still one real number. A function of three inputs is not the same as a vector-valued function that returns three outputs.

## Domain is now a region

The same [[domain|domain]] restrictions apply, but the allowed inputs form a region in a plane or in three-dimensional space.

For $f(x,y)=\sqrt{9-x^2-y^2}$, the radicand condition gives
$$x^2+y^2\le9.$$
The domain is the closed disk of radius $3$. Its graph is the upper hemisphere $z=\sqrt{9-x^2-y^2}$.

For $G(x,y,z)=\ln(16-x^2-y^2-z^2)$, the logarithm requires
$$x^2+y^2+z^2<16,$$
so the domain is the open ball of radius $4$.

## How to picture an output you cannot graph directly

The graph of $F(x,y,z)$ would require four coordinates: $(x,y,z,F)$. Instead, use **level surfaces**:
$$F(x,y,z)=k.$$
Each fixed $k$ identifies the input points that produce that output. For $F=x^2+y^2+z^2$, the level surface $F=k$ is a sphere of radius $\sqrt{k}$ when $k>0$.

For two-input functions, the graph $w=f(x,y)$ fits in ordinary three-dimensional space. Horizontal slices $f(x,y)=k$ are level curves; a collection of them is a contour map. A vertical slice fixes one input, such as $y=b$, and shows how the output changes as $x$ varies.

## Read a model before calculating

Consider $T(x,y,z)=20+2x-y+0.5z$, a simple temperature model. The coordinates represent location and $T$ is the measured temperature. At $(1,2,4)$, $T=22$. The coefficient of $x$ describes how the model changes with that coordinate while the others are held fixed; this idea leads to partial derivatives in the next topic.

## Practice

1. Find the domain of $f(x,y)=\ln(4-x^2-y^2)$.
2. Describe the level surfaces of $F(x,y,z)=x^2+y^2+z^2$.
3. How many independent inputs and outputs does $F:\mathbb{R}^3\to\mathbb{R}$ have?

**Answers:** 1. $x^2+y^2<4$, the open disk of radius $2$. 2. Spheres centered at the origin for positive levels; the origin at level $0$; no points for negative levels. 3. Three inputs and one real output.

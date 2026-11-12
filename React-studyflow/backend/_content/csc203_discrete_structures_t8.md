# Graph Theory Basics

## The Central Idea

A **graph** is a mathematical structure for modeling pairwise relationships between objects. It consists of **vertices** (nodes) and **edges** (connections).

Graphs are everywhere:
- Social networks (people = vertices, friendships = edges)
- Computer networks (routers = vertices, cables = edges)
- Road maps (cities = vertices, roads = edges)
- Molecules (atoms = vertices, bonds = edges)
- Web pages (pages = vertices, hyperlinks = edges)

This topic covers:
- Basic definitions and types of graphs
- Graph representation (adjacency matrix, adjacency list)
- Paths, cycles, connectivity
- Trees and spanning trees
- Euler and Hamiltonian paths/circuits
- Graph coloring
- Planar graphs

---

## Why It Matters

- **Algorithms:** Shortest path (Dijkstra), MST (Kruskal/Prim), network flow
- **Data structures:** Trees, heaps, tries are all graphs
- **Compilers:** Control flow graphs, dependency graphs
- **Databases:** Entity-relationship diagrams
- **AI:** Knowledge graphs, neural networks
- **Discrete math exams:** Graph theory questions are standard

---

## How the Idea Develops

**Section 1 — Conceptual Introduction** → **Section 2 — Terminology** → **Section 3 — Types of Graphs** → **Section 4 — Graph Representation** → **Section 5 — Paths, Cycles, Connectivity** → **Section 6 — Trees** → **Section 7 — Euler & Hamiltonian Paths** → **Section 8 — Graph Coloring** → **Section 9 — Planar Graphs** → **Section 10 — Worked Problems** → **Section 11 — Self-Check**

---

## Section 1 — Conceptual Introduction

### What is a Graph?

A **graph** G = (V, E) consists of:
- **V** = set of vertices (nodes, points)
- **E** = set of edges, each edge is a pair of vertices

**Undirected graph:** Edges are unordered pairs {u, v}. Symmetric relationship.
**Directed graph (digraph):** Edges are ordered pairs (u, v). Asymmetric.

### Visual Intuition

```
Undirected:         Directed:
  A --- B             A → B
  | \   |             ↑   ↓
  |  \  |             C ← D
  |   \ |
  C --- D
```

---

## Section 2 — Required Terminology

| Term | Meaning |
|------|---------|
| [[graph]] | G = (V, E): vertices V, edges E ⊆ V×V (or V choose 2) |
| [[vertex]] | Node, point in the graph (plural: vertices) |
| [[edge]] | Connection between two vertices |
| [[undirected-graph]] | Edges are unordered pairs {u,v} |
| [[directed-graph]] | Edges are ordered pairs (u,v); also called digraph |
| [[simple-graph]] | No loops, no multiple edges between same pair |
| [[multigraph]] | Multiple edges allowed between same vertices |
| [[loop]] | Edge from vertex to itself |
| [[adjacent]] | Vertices connected by an edge |
| [[incident]] | Edge e is incident to its endpoints |
| [[degree]] | deg(v) = number of edges incident to v |
| [[in-degree]] | In digraph: edges entering v |
| [[out-degree]] | In digraph: edges leaving v |
| [[path]] | Sequence of vertices v₀,v₁,...,vₖ with edges between consecutive |
| [[cycle]] | Path where v₀ = vₖ and no other repeats |
| [[simple-path]] | No repeated vertices |
| [[connected]] | Undirected: path between every pair |
| [[strongly-connected]] | Digraph: path from u to v AND v to u for all u,v |
| [[component]] | Maximal connected subgraph |
| [[tree]] | Connected, acyclic undirected graph |
| [[forest]] | Acyclic undirected graph (collection of trees) |
| [[spanning-tree]] | Tree containing all vertices of G |
| [[euler-path]] | Path using every edge exactly once |
| [[euler-circuit]] | Euler path that starts and ends at same vertex |
| [[hamiltonian-path]] | Path visiting every vertex exactly once |
| [[hamiltonian-cycle]] | Hamiltonian path that returns to start |
| [[graph-coloring]] | Assignment of colors to vertices, adjacent ≠ color |
| [[chromatic-number]] | Minimum colors needed: χ(G) |
| [[bipartite]] | Vertices partitionable into 2 sets, all edges cross |
| [[planar]] | Drawable in plane with no edge crossings |
| [[complete-graph]] | Kₙ: every pair of n vertices connected |
| [[adjacency-matrix]] | n×n matrix Aᵢⱼ = 1 if edge i-j exists |
| [[adjacency-list]] | For each vertex, list of neighbors |

---

## Section 3 — Types of Graphs

### By Edge Type

1. **Simple graph:** No loops, no parallel edges
2. **Multigraph:** Parallel edges allowed
3. **Pseudograph:** Loops and parallel edges allowed
4. **Directed graph (digraph):** Ordered edges
5. **Weighted graph:** Edges have weights/costs

### Special Families

| Graph | Description | Vertices | Edges |
|-------|-------------|----------|-------|
| Kₙ | Complete graph | n | n(n-1)/2 |
| Cₙ | Cycle | n | n |
| Pₙ | Path | n | n-1 |
| K_{m,n} | Complete bipartite | m+n | mn |
| Qₙ | Hypercube | 2ⁿ | n·2ⁿ⁻¹ |

---

## Section 4 — Graph Representation

### 1. Adjacency Matrix

n×n matrix A where:
$$
 A_{ij} = \begin{cases} 1 & \text{if } \{i,j\} \in E \\ 0 & \text{otherwise} \end{cases} 
$$

**Undirected:** Symmetric matrix.
**Directed:** Not necessarily symmetric.
**Weighted:** Aᵢⱼ = weight (or ∞ if no edge).

**Space:** O(n²). Good for dense graphs.
**Edge lookup:** O(1).

### 2. Adjacency List

Array/list of size n. Adj[v] = list of neighbors of v.

**Space:** O(n + m). Good for sparse graphs.
**Iterate neighbors:** O(deg(v)).

### 3. Edge List

List of all edges (u, v, weight?).

**Space:** O(m). Simple, good for edge iteration.

---

## Section 5 — Paths, Cycles, Connectivity

### Path

Sequence v₀, v₁, ..., vₖ where {vᵢ, vᵢ₊₁} ∈ E for all i.
**Length** = number of edges = k.

### Cycle

Path with v₀ = vₖ, k ≥ 3, no other repeated vertices.

### Connectedness (Undirected)

Graph is **connected** if there's a path between every pair of vertices.
**Connected components** = equivalence classes under "is connected to" relation.

### Connectedness (Directed)

- **Weakly connected:** Underlying undirected graph is connected
- **Strongly connected:** Path u→v AND v→u for all u,v
- **Strongly connected components (SCCs):** Maximal strongly connected subgraphs

### Distance & Diameter

- **Distance** d(u,v) = length of shortest u-v path (∞ if none)
- **Diameter** = max_{u,v} d(u,v)
- **Eccentricity** of v = max_u d(v,u)
- **Radius** = min_v eccentricity(v)
- **Center** = vertices achieving radius

---

## Section 6 — Trees

### Definition

A **tree** is a connected, acyclic undirected graph.

### Equivalent Characterizations (for graph with n vertices)

TFAE:
1. G is a tree
2. G is connected and has n-1 edges
3. G is acyclic and has n-1 edges
4. There is exactly one path between any two vertices
5. G is connected, but removing any edge disconnects it
6. G is acyclic, but adding any edge creates exactly one cycle

### Properties

- Every tree with n ≥ 2 has at least 2 **leaves** (degree 1)
- Sum of degrees = 2(n-1)
- Any connected graph has a **spanning tree**
- Number of spanning trees of Kₙ = nⁿ⁻² (Cayley's formula)

### Rooted Trees

Choose a root r. Orient edges away from root.
- **Parent, child, ancestor, descendant, sibling**
- **Depth** of v = distance from root
- **Height** = max depth
- **Binary tree:** Each node has ≤ 2 children

### Tree Traversals

- **Preorder:** Root, Left, Right
- **Inorder:** Left, Root, Right (BST gives sorted)
- **Postorder:** Left, Right, Root
- **Level-order:** Breadth-first

---

## Section 7 — Euler & Hamiltonian Paths

### Euler Path/Circuit

**Euler path:** Uses every edge exactly once.
**Euler circuit:** Euler path that starts and ends at same vertex.

**Euler's Theorem (Undirected):**
- Euler circuit exists ⇔ Graph connected AND every vertex has even degree
- Euler path (not circuit) exists ⇔ Graph connected AND exactly 2 vertices have odd degree

**Euler's Theorem (Directed):**
- Euler circuit ⇔ Strongly connected AND in-degree = out-degree for all vertices
- Euler path ⇔ At most one vertex with out-degree = in-degree + 1 (start), at most one with in-degree = out-degree + 1 (end), all others balanced

**Fleury's Algorithm / Hierholzer's Algorithm:** Find Euler circuit in O(E)

---

### Hamiltonian Path/Cycle

**Hamiltonian path:** Visits every vertex exactly once.
**Hamiltonian cycle:** Hamiltonian path returning to start.

**No simple characterization!** NP-complete to decide.

**Sufficient conditions (not necessary):**
- **Dirac's Theorem:** If n ≥ 3 and deg(v) ≥ n/2 for all v, then Hamiltonian cycle exists
- **Ore's Theorem:** If deg(u) + deg(v) ≥ n for all non-adjacent u,v, then Hamiltonian cycle exists

---

## Section 8 — Graph Coloring

### Vertex Coloring

Assign colors to vertices such that adjacent vertices have different colors.

**Chromatic number χ(G)** = minimum number of colors needed.

### Properties

- χ(G) ≥ 1, χ(Kₙ) = n
- χ(G) = 2 ⇔ G is bipartite (no odd cycles)
- χ(G) ≤ Δ(G) + 1 where Δ = max degree (Brook's Theorem: χ ≤ Δ unless G is complete or odd cycle)
- **Greedy coloring:** Order vertices, assign smallest available color. Uses ≤ Δ+1 colors.

### Edge Coloring

Color edges so incident edges differ. **Edge chromatic number χ'(G)**.

**Vizing's Theorem:** Δ ≤ χ'(G) ≤ Δ + 1

### Applications

- **Scheduling:** Vertices = tasks, edges = conflicts, colors = time slots
- **Register allocation:** Vertices = variables, edges = live simultaneously, colors = registers
- **Map coloring:** Countries = vertices, borders = edges (4-color theorem)

---

## Section 9 — Planar Graphs

### Definition

A graph is **planar** if it can be drawn in the plane with no edge crossings (except at vertices).

### Euler's Formula

For connected planar graph with n vertices, m edges, f faces:
$$
 n - m + f = 2 
$$

### Consequences

- For simple planar graph with n ≥ 3: m ≤ 3n - 6
- For bipartite planar: m ≤ 2n - 4
- K₅ and K₃,₃ are **non-planar** (Kuratowski's Theorem)
- Every planar graph has a vertex of degree ≤ 5
- **4-Color Theorem:** Every planar graph is 4-colorable

### Kuratowski's Theorem

G is planar ⇔ G contains no subdivision of K₅ or K₃,₃.

---

## Section 10 — Worked Problems

### Problem 1: Handshaking Lemma

> *Prove: In any undirected graph, sum of degrees = 2|E|.*

**Proof:** Each edge contributes 2 to the sum of degrees (one for each endpoint). Total = 2|E|. ∎

**Corollary:** Number of odd-degree vertices is even.

---

### Problem 2: Tree Properties

> *Prove: Every tree with n ≥ 2 vertices has at least 2 leaves.*

**Proof:** Sum of degrees = 2(n-1). Average degree = 2 - 2/n < 2.
If all degrees ≥ 2, sum ≥ 2n > 2(n-1) contradiction.
So some vertex has degree 1 (leaf).
Remove a leaf, remaining tree has n-1 vertices, still has a leaf (by induction or repeat argument).
At least 2 leaves. ∎

---

### Problem 3: Euler Circuit

> *Does the following graph have an Euler circuit?*
> (Graph with vertices A,B,C,D and degrees: deg(A)=4, deg(B)=2, deg(C)=4, deg(D)=2)

**Solution:** All degrees even (4,2,4,2). Graph connected (assumed). Yes, Euler circuit exists.

---

### Problem 4: Hamiltonian Cycle

> *Prove: If G is a complete graph Kₙ with n ≥ 3, it has a Hamiltonian cycle.*

**Proof:** Kₙ has all possible edges. Any permutation v₁, v₂, ..., vₙ forms a path. Since vₙ connects to v₁, we have cycle v₁→v₂→...→vₙ→v₁. ∎

---

### Problem 5: Bipartite Characterization

> *Prove: A graph is bipartite iff it has no odd cycles.*

**Proof:**
(⇒) In bipartite graph, vertices alternate between two sets along any path. Cycle must return to start after even number of steps → even length.

(⇐) No odd cycles. Pick any vertex v, color it red. Color neighbors blue, their neighbors red, etc. No conflict because any conflict would create an odd cycle. ∎

---

### Problem 6: Planar Graph Edge Bound

> *Prove: For simple connected planar graph with n ≥ 3, m ≤ 3n - 6.*

**Proof:** Every face has at least 3 edges. Each edge borders 2 faces (or same face twice, counted twice). So 3f ≤ 2m ⇒ f ≤ 2m/3.
Euler: n - m + f = 2 ⇒ n - m + 2m/3 ≥ 2 ⇒ n - m/3 ≥ 2 ⇒ m ≤ 3n - 6. ∎

---

### Problem 7: Non-Planarity of K₅

> *Prove K₅ is non-planar.*

**Proof:** K₅ has n=5, m=10. For planar: m ≤ 3n-6 = 9. But 10 > 9. Contradiction. ∎

---

### Problem 8: Graph Representation Conversion

> *Convert adjacency list to adjacency matrix for graph with edges: (1,2), (1,3), (2,3), (2,4), (3,4).*

**Solution:**
```
   1 2 3 4
1  0 1 1 0
2  1 0 1 1
3  1 1 0 1
4  0 1 1 0
```

---

### Problem 9: Spanning Trees of K₄

> *How many spanning trees does K₄ have?*

**Solution:** Cayley's formula: nⁿ⁻² = 4² = **16**

---

### Problem 10: Chromatic Number of Cycle

> *Find χ(Cₙ) for n ≥ 3.*

**Solution:**
- n even: Cₙ is bipartite → χ = 2
- n odd: Not bipartite (odd cycle). 3 colors suffice (alternate 2 colors, need 3rd for last vertex). χ = 3.

---

## Section 11 — Common Pitfalls

| Pitfall | Correction |
|---------|------------|
| Confusing Euler vs Hamiltonian | Euler = every edge; Hamiltonian = every vertex |
| Assuming all connected graphs have Euler path | Need 0 or 2 odd-degree vertices |
| Forgetting connectivity in Euler theorem | Disconnected graph can't have Euler path covering all edges |
| Thinking χ(G) = Δ+1 always | Only upper bound; often much smaller |
| Misusing Kuratowski | Must check for subdivision, not just subgraph |
| Double-counting edges in degree sum | Each edge contributes 2, not 1 |

---

## Section 12 — Conceptual Model

**Graphs = Relationships Made Visible**

- **Vertices** = entities
- **Edges** = relationships
- **Paths** = chains of relationships
- **Cycles** = closed chains
- **Trees** = hierarchies without loops
- **Euler** = traverse all relationships efficiently
- **Hamiltonian** = visit all entities efficiently
- **Coloring** = schedule conflicting entities
- **Planarity** = draw without crossings = "nice" structure

---

## Section 13 — Glossary Terms Used in This Topic

[[graph]], [[vertex]], [[edge]], [[undirected-graph]], [[directed-graph]], [[simple-graph]], [[multigraph]], [[loop]], [[adjacent]], [[incident]], [[degree]], [[in-degree]], [[out-degree]], [[path]], [[cycle]], [[simple-path]], [[connected]], [[strongly-connected]], [[component]], [[tree]], [[forest]], [[spanning-tree]], [[euler-path]], [[euler-circuit]], [[hamiltonian-path]], [[hamiltonian-cycle]], [[graph-coloring]], [[chromatic-number]], [[bipartite]], [[planar]], [[complete-graph]], [[adjacency-matrix]], [[adjacency-list]], [[handshaking-lemma]], [[cayley-formula]], [[fleury-algorithm]], [[hierholzer-algorithm]], [[dirac-theorem]], [[ore-theorem]], [[vizing-theorem]], [[four-color-theorem]], [[kuratowski-theorem]], [[euler-formula]], [[face]], [[leaf]], [[rooted-tree]], [[binary-tree]], [[tree-traversal]]
const topicMathFormulas = {
  "mth201-t2": [
    String.raw`\frac{d}{dx}\left(x^n\right)=nx^{n-1}`,
    String.raw`\int_0^2 x\,dx=2`,
    String.raw`\int 2x\,dx=x^2+C`,
  ],
  "mth201-t3": [
    String.raw`f'(c)=\frac{f(b)-f(a)}{b-a},\qquad a<c<b`,
  ],
  "mth201-t4": [
    String.raw`T_n(x)=\sum_{k=0}^{n}\frac{f^{(k)}(a)}{k!}(x-a)^k`,
    String.raw`e^x=1+x+\frac{x^2}{2!}+\frac{x^3}{3!}+\cdots`,
  ],
  "mth201-t5": [
    String.raw`f:D\subseteq\mathbb{R}^n\longrightarrow\mathbb{R}`,
    String.raw`z=f(x,y)`,
  ],
  "mth201-t6": [
    String.raw`f_x=\frac{\partial f}{\partial x},\qquad f_y=\frac{\partial f}{\partial y}`,
    String.raw`f(x,y)=x^2y+3xy^2\quad\Longrightarrow\quad f_x=2xy+3y^2,\quad f_y=x^2+6xy`,
  ],
  "mth201-t7": [
    String.raw`\frac{dz}{dt}=f_x\frac{dx}{dt}+f_y\frac{dy}{dt}`,
    String.raw`\nabla f=\lambda\nabla g`,
    String.raw`D=f_{xx}f_{yy}-(f_{xy})^2`,
  ],
  "mth201-t8": [
    String.raw`dy=f'(a)\,dx`,
    String.raw`f(a+\Delta x)\approx f(a)+f'(a)\Delta x`,
    String.raw`dz=f_x\,dx+f_y\,dy`,
  ],
  "mth201-t9": [
    String.raw`\int_C f\,ds=\int_a^b f(\mathbf{r}(t))\,\lVert\mathbf{r}'(t)\rVert\,dt`,
    String.raw`\int_C \mathbf{F}\cdot d\mathbf{r}=\int_a^b\mathbf{F}(\mathbf{r}(t))\cdot\mathbf{r}'(t)\,dt`,
    String.raw`\iint_D f(x,y)\,dA`,
  ],
  "csc203-t1": [
    String.raw`N=\sum_{i=0}^{n-1}b_i2^i`,
    String.raw`45_{10}=101101_2`,
  ],
  "csc203-t2": [
    String.raw`Y=A\land B`,
    String.raw`Y=A\lor B,\qquad Y=\neg A`,
  ],
  "csc203-t3": [
    String.raw`S=A\oplus B,\qquad C=A\land B`,
    String.raw`S=A\oplus B\oplus C_{\mathrm{in}}`,
    String.raw`C_{\mathrm{out}}=(A\land B)\lor\bigl(C_{\mathrm{in}}\land(A\oplus B)\bigr)`,
  ],
  "csc203-t4": [
    String.raw`Q_{t+1}=D\quad\text{at the active clock edge}`,
  ],
  "csc215-t1": [
    String.raw`N=\sum_{i=0}^{n-1}b_i2^i`,
    String.raw`59_{10}=111011_2`,
  ],
  "csc215-t2": [
    String.raw`Y=A\land B`,
    String.raw`Y=A\lor B,\qquad Y=\neg A`,
  ],
  "csc215-t3": [
    String.raw`(A\land B)\lor(A\land\neg B)=A`,
  ],
  "csc215-t4": [
    String.raw`S=A\oplus B,\qquad C=A\land B`,
    String.raw`S=A\oplus B\oplus C_{\mathrm{in}}`,
    String.raw`C_{\mathrm{out}}=(A\land B)\lor\bigl(C_{\mathrm{in}}\land(A\oplus B)\bigr)`,
  ],
  "csc215-t5": [
    String.raw`Q_{t+1}=D\quad\text{at the active clock edge}`,
  ],
  "csc215-t6": [
    String.raw`2^n\text{ states for an }n\text{-bit counter}`,
    String.raw`2^4=16`,
  ],
  "csc215-t7": [
    String.raw`\text{Capacity}=2^k\times w\text{ bits}`,
  ],
  "ent211-t4": [
    String.raw`R(q)=C(q)\quad\text{at break-even}`,
    String.raw`\Pi(q)=R(q)-C(q)`,
  ],
  "ent211-t5": [
    String.raw`\text{Net cash flow}=\text{cash inflows}-\text{cash outflows}`,
  ],
};

export function hasTopicMath(topicId, notes = "") {
  return Boolean(
    topicMathFormulas[topicId]?.length ||
      /\$\$[\s\S]+?\$\$|\\\[[\s\S]+?\\\]|\\\([\s\S]+?\\\)|(^|[^\\$])\$[^$\n]+\$/.test(
        notes,
      ),
  );
}

export function getTopicMathReference(topicId) {
  const formulas = topicMathFormulas[topicId];
  if (!formulas) return "";

  return `\n\n## Formula reference\n\n${formulas.map((formula) => `$$${formula}$$`).join("\n\n")}`;
}

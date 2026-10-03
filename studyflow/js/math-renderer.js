/**
 * StudyFlow KaTeX Math Renderer Module
 * Renders mathematical expressions seamlessly into semantic HTML/SVG.
 */

let katexInstance = null;

// Attempt to resolve KaTeX from window (loaded via script tag or bundle)
if (typeof window !== "undefined" && window.katex) {
  katexInstance = window.katex;
}

/**
 * Ensures KaTeX stylesheet and script are present if not already loaded
 */
export function initMathRenderer() {
  if (typeof window === "undefined") return;

  if (window.katex) {
    katexInstance = window.katex;
    return;
  }

  // Inject KaTeX stylesheet if missing
  if (!document.getElementById("sf-katex-css")) {
    const css = document.createElement("link");
    css.id = "sf-katex-css";
    css.rel = "stylesheet";
    css.href = "../node_modules/katex/dist/katex.min.css";
    css.onerror = () => {
      // CDN Fallback
      css.href = "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css";
    };
    document.head.appendChild(css);
  }

  // Inject KaTeX script if missing
  if (!document.getElementById("sf-katex-js") && !window.katex) {
    const script = document.createElement("script");
    script.id = "sf-katex-js";
    script.src = "../node_modules/katex/dist/katex.min.js";
    script.onerror = () => {
      // CDN Fallback
      script.src = "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js";
    };
    script.onload = () => {
      katexInstance = window.katex;
      // Re-trigger math render if any unrendered math elements exist
      renderMathInContainer(document.body);
    };
    document.head.appendChild(script);
  }
}

/**
 * Render a single math string to HTML string
 */
export function renderMathExpression(latex, displayMode = false) {
  const k = katexInstance || window.katex;
  if (!k) {
    // Plain text fallback while KaTeX is loading
    const wrapTag = displayMode ? "div" : "span";
    return `<${wrapTag} class="sf-math-fallback ${displayMode ? "math-block" : "math-inline"}">${escapeHtml(latex)}</${wrapTag}>`;
  }

  try {
    return k.renderToString(latex.trim(), {
      displayMode,
      throwOnError: false,
      output: "htmlAndMathml",
    });
  } catch (err) {
    console.warn("KaTeX rendering error:", err, "for expression:", latex);
    return `<span class="sf-math-error">${escapeHtml(latex)}</span>`;
  }
}

/**
 * Parse text content containing LaTeX blocks and render them to HTML
 * Supports:
 * - $$ latex $$ (block)
 * - \[ latex \] (block)
 * - $ latex $ (inline)
 * - \( latex \) (inline)
 */
export function parseAndRenderMath(text) {
  if (!text) return "";

  let result = text;

  // 1. Block math $$...$$
  result = result.replace(/\$\$([\s\S]+?)\$\$/g, (_, math) => {
    return `<div class="sf-math-block-wrap">${renderMathExpression(math, true)}</div>`;
  });

  // 2. Block math \[...\]
  result = result.replace(/\\\[([\s\S]+?)\\\]/g, (_, math) => {
    return `<div class="sf-math-block-wrap">${renderMathExpression(math, true)}</div>`;
  });

  // 3. Inline math $...$ (avoiding currency amounts like $5 or $10)
  result = result.replace(/(^|[^\\$])\$([^\$\n]+?)\$/g, (match, prefix, math) => {
    // If it looks like pure numeric price (e.g. $5 or $20), leave as is
    if (/^\d+(\.\d{2})?$/.test(math.trim())) {
      return match;
    }
    return `${prefix}<span class="sf-math-inline-wrap">${renderMathExpression(math, false)}</span>`;
  });

  // 4. Inline math \(...\)
  result = result.replace(/\\\(([\s\S]+?)\\\)/g, (_, math) => {
    return `<span class="sf-math-inline-wrap">${renderMathExpression(math, false)}</span>`;
  });

  return result;
}

/**
 * Scans a DOM container and renders all math elements inside it
 */
export function renderMathInContainer(container) {
  if (!container) return;
  initMathRenderer();

  // If auto-render is available or window.katex is loaded
  const k = katexInstance || window.katex;
  if (!k) return;

  // Render any elements with class sf-math-fallback
  const fallbacks = container.querySelectorAll(".sf-math-fallback");
  fallbacks.forEach((el) => {
    const isBlock = el.classList.contains("math-block");
    const latex = el.textContent || "";
    el.outerHTML = renderMathExpression(latex, isBlock);
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

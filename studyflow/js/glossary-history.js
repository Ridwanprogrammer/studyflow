/**
 * StudyFlow Glossary History & Origin Preservation Stack
 * Remembers exact lesson/topic origin, scroll position, and term anchor.
 * Supports multi-step navigation chains (Topic -> Domain -> Function -> Real Number).
 */

const STORAGE_KEY = "SF_GLOSSARY_STACK";

/**
 * Get current stack array from sessionStorage
 */
export function getGlossaryStack() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn("Failed to load glossary stack:", e);
    return [];
  }
}

/**
 * Save stack to sessionStorage
 */
function saveStack(stack) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stack));
  } catch (e) {
    console.warn("Failed to save glossary stack:", e);
  }
}

/**
 * Push a new frame onto the navigation stack
 * Frame schema:
 * {
 *   type: "topic" | "glossary",
 *   courseId?: string,
 *   topicId?: string,
 *   termId: string,
 *   anchorId?: string,
 *   scrollY?: number,
 *   topicTitle?: string,
 *   termTitle?: string
 * }
 */
export function pushGlossaryFrame(frame) {
  const stack = getGlossaryStack();

  // Don't push duplicate consecutive entries for the same term
  const top = stack[stack.length - 1];
  if (top && top.termId === frame.termId && top.type === frame.type) {
    return;
  }

  stack.push({
    timestamp: Date.now(),
    ...frame,
  });
  saveStack(stack);
}

/**
 * Pop the top frame off the stack
 */
export function popGlossaryFrame() {
  const stack = getGlossaryStack();
  if (stack.length === 0) return null;
  const popped = stack.pop();
  saveStack(stack);
  return popped;
}

/**
 * Get the initial topic origin from stack
 */
export function getTopicOrigin() {
  const stack = getGlossaryStack();
  for (let i = stack.length - 1; i >= 0; i--) {
    if (stack[i].type === "topic") {
      return stack[i];
    }
  }
  return null;
}

/**
 * Clear navigation history
 */
export function clearGlossaryStack() {
  sessionStorage.removeItem(STORAGE_KEY);
}

/**
 * Return to exact topic origin
 */
export function returnToTopicOrigin() {
  const origin = getTopicOrigin();
  if (!origin || !origin.courseId || !origin.topicId) {
    // Fallback: return to courses or home
    window.location.href = "course.html?id=MTH201";
    return;
  }

  const anchor = origin.anchorId ? `&anchor=${encodeURIComponent(origin.anchorId)}` : "";
  const scroll = origin.scrollY ? `&scrollY=${origin.scrollY}` : "";
  const term = origin.termId ? `&returnTerm=${encodeURIComponent(origin.termId)}` : "";

  // Relative path resolution based on current URL location
  const isSubFolder = window.location.pathname.includes("/pages/");
  const topicPath = isSubFolder ? "topic.html" : "pages/topic.html";

  window.location.href = `${topicPath}?c=${encodeURIComponent(origin.courseId)}&t=${encodeURIComponent(origin.topicId)}${term}${anchor}${scroll}`;
}

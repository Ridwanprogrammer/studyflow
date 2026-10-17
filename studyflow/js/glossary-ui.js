/**
 * StudyFlow Contextual Glossary Interaction & Popover UI
 * Handles term hover/click popovers, "See more →" navigation, and origin return highlighting.
 */

import { getGlossaryTerm } from "./glossary.js";
import { pushGlossaryFrame } from "./glossary-history.js";
import { renderMathExpression } from "./math-renderer.js";

let popoverEl = null;
let currentTermObj = null;
let currentTargetElem = null;
let currentCourseId = null;
let currentTopicId = null;
let currentTopicTitle = null;
let hideTimeout = null;

/**
 * Initialize Glossary Popover & Event listeners for a lesson container
 */
export function initGlossaryUI({ container, courseId, topicId, topicTitle }) {
  if (typeof document === "undefined") return;

  currentCourseId = courseId;
  currentTopicId = topicId;
  currentTopicTitle = topicTitle;

  ensurePopoverElement();
  attachTermListeners(container || document.body);
  handleReturnHighlighting();
}

/**
 * Ensures floating popover HTML element is present in body
 */
function ensurePopoverElement() {
  if (document.getElementById("sf-glossary-popover")) {
    popoverEl = document.getElementById("sf-glossary-popover");
    return;
  }

  popoverEl = document.createElement("div");
  popoverEl.id = "sf-glossary-popover";
  popoverEl.className = "sf-glossary-popover sf-popover-hidden";
  popoverEl.setAttribute("role", "dialog");
  popoverEl.setAttribute("aria-label", "Glossary quick definition");

  popoverEl.innerHTML = `
    <div class="sf-popover-header">
      <span class="sf-popover-discipline-tag" id="sf-popover-discipline">Mathematics</span>
      <button class="sf-popover-close-btn" id="sf-popover-close" aria-label="Close popover">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
    <div class="sf-popover-term-title" id="sf-popover-term-name">Domain</div>
    <div class="sf-popover-def-label">Brief definition</div>
    <div class="sf-popover-short-def" id="sf-popover-short-def"></div>
    <div class="sf-popover-actions">
      <button class="sf-popover-see-more-btn" id="sf-popover-see-more">
        <span>See more</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </button>
    </div>
  `;

  document.body.appendChild(popoverEl);

  // Wire popover actions
  document.getElementById("sf-popover-close")?.addEventListener("click", hidePopover);

  document.getElementById("sf-popover-see-more")?.addEventListener("click", () => {
    if (!currentTermObj) return;

    // Save origin frame before navigating
    if (currentCourseId && currentTopicId) {
      const anchorId = currentTargetElem ? currentTargetElem.id : null;
      pushGlossaryFrame({
        type: "topic",
        courseId: currentCourseId,
        topicId: currentTopicId,
        topicTitle: currentTopicTitle || "Lesson",
        termId: currentTermObj.id,
        anchorId,
        scrollY: window.scrollY,
      });
    }

    hidePopover();

    // Navigate to full glossary page
    const isSubFolder = window.location.pathname.includes("/pages/");
    const targetUrl = isSubFolder
      ? `glossary.html?term=${encodeURIComponent(currentTermObj.id)}`
      : `pages/glossary.html?term=${encodeURIComponent(currentTermObj.id)}`;

    window.location.href = targetUrl;
  });

  // Keep popover open while hovering inside it
  popoverEl.addEventListener("mouseenter", () => {
    if (hideTimeout) clearTimeout(hideTimeout);
  });
  popoverEl.addEventListener("mouseleave", () => {
    hideTimeout = setTimeout(hidePopover, 400);
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") hidePopover();
  });
}

/**
 * Attach hover/click listeners to interactive term spans
 */
function attachTermListeners(container) {
  const terms = container.querySelectorAll(".sf-glossary-term");

  terms.forEach((termElem) => {
    const termId = termElem.getAttribute("data-term-id");

    const showHandler = (e) => {
      if (hideTimeout) clearTimeout(hideTimeout);
      const termObj = getGlossaryTerm(termId);
      if (termObj) {
        showPopoverForTerm(termObj, termElem);
      }
    };

    termElem.addEventListener("mouseenter", showHandler);
    termElem.addEventListener("click", (e) => {
      e.preventDefault();
      showHandler(e);
    });
    termElem.addEventListener("focus", showHandler);

    termElem.addEventListener("mouseleave", () => {
      hideTimeout = setTimeout(hidePopover, 500);
    });
  });
}

/**
 * Position and display popover for a specific term element
 */
function showPopoverForTerm(termObj, targetElem) {
  currentTermObj = termObj;
  currentTargetElem = targetElem;

  const discEl = document.getElementById("sf-popover-discipline");
  const nameEl = document.getElementById("sf-popover-term-name");
  const defEl = document.getElementById("sf-popover-short-def");

  if (discEl) discEl.textContent = termObj.discipline || "Glossary";
  if (nameEl) nameEl.textContent = termObj.term;
  if (defEl) defEl.textContent = termObj.shortDefinition;

  // Render popover
  popoverEl.classList.remove("sf-popover-hidden");
  popoverEl.classList.add("sf-popover-visible");

  // Position popover relative to targetElem
  positionPopover(targetElem);
}

function positionPopover(targetElem) {
  const rect = targetElem.getBoundingClientRect();
  const popRect = popoverEl.getBoundingClientRect();

  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

  let top = rect.bottom + scrollTop + 8;
  let left = rect.left + scrollLeft + rect.width / 2 - popRect.width / 2;

  // Prevent overflowing right/left edge
  if (left < 16) left = 16;
  if (left + popRect.width > window.innerWidth - 16) {
    left = window.innerWidth - popRect.width - 16;
  }

  // If popover overflows bottom of viewport, position it above target
  if (rect.bottom + popRect.height + 16 > window.innerHeight) {
    top = rect.top + scrollTop - popRect.height - 8;
  }

  popoverEl.style.top = `${Math.max(10, top)}px`;
  popoverEl.style.left = `${Math.max(10, left)}px`;
}

export function hidePopover() {
  if (popoverEl) {
    popoverEl.classList.remove("sf-popover-visible");
    popoverEl.classList.add("sf-popover-hidden");
  }
}

/**
 * Checks URL for return parameters (anchor, returnTerm) and scrolls + highlights origin
 */
function handleReturnHighlighting() {
  const params = new URLSearchParams(window.location.search);
  const returnTerm = params.get("returnTerm");
  const anchor = params.get("anchor");

  if (!returnTerm && !anchor) return;

  // Wait for DOM to render completely
  setTimeout(() => {
    let targetElem = null;

    if (anchor) {
      targetElem = document.getElementById(anchor);
    }
    if (!targetElem && returnTerm) {
      targetElem = document.querySelector(`.sf-glossary-term[data-term-id="${returnTerm}"]`);
    }

    if (targetElem) {
      // Smooth scroll to target element
      targetElem.scrollIntoView({ behavior: "smooth", block: "center" });

      // Apply return highlight pulse animation
      targetElem.classList.add("sf-glossary-returned-highlight");

      // Remove class after animation finishes
      setTimeout(() => {
        targetElem.classList.remove("sf-glossary-returned-highlight");
      }, 4000);
    }
  }, 300);
}

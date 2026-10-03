/**
 * StudyFlow Global Glossary Page Controller
 */

import {
  getAllGlossaryTerms,
  getGlossaryTerm,
  searchGlossary,
} from "./glossary.js";
import {
  getTopicOrigin,
  returnToTopicOrigin,
  pushGlossaryFrame,
} from "./glossary-history.js";
import { parseAndRenderMath, renderMathInContainer } from "./math-renderer.js";

let activeDiscipline = "All";
let selectedTermId = null;
let currentSearchQuery = "";

window.addEventListener("DOMContentLoaded", () => {
  initGlossaryPage();
});

function initGlossaryPage() {
  setupOriginReturnBar();
  setupFilters();
  setupSearch();
  setupSidebarToggle();

  // Read term ID from URL parameter if present
  const params = new URLSearchParams(window.location.search);
  const termParam = params.get("term");

  renderTermsList();

  if (termParam) {
    selectTerm(termParam, false);
  } else {
    // Select first term by default
    const allTerms = getAllGlossaryTerms();
    if (allTerms.length > 0) {
      selectTerm(allTerms[0].id, false);
    }
  }
}

/**
 * Configure top origin return banner if learner came from a topic
 */
function setupOriginReturnBar() {
  const origin = getTopicOrigin();
  const returnBar = document.getElementById("sf-origin-return-bar");
  const topicNameEl = document.getElementById("sf-origin-topic-name");
  const returnBtn = document.getElementById("sf-return-to-topic-btn");
  const footerReturnBtn = document.getElementById("sf-return-footer-btn");

  if (origin && origin.courseId && origin.topicTitle) {
    returnBar?.classList.remove("hidden");
    if (topicNameEl) {
      topicNameEl.textContent = `${origin.courseId}: ${origin.topicTitle}`;
    }

    const handleReturn = () => returnToTopicOrigin();
    returnBtn?.addEventListener("click", handleReturn);
    footerReturnBtn?.addEventListener("click", handleReturn);
  } else {
    returnBar?.classList.add("hidden");
    const footerAction = document.getElementById("sf-detail-return-footer");
    if (footerAction) footerAction.style.display = "none";
  }
}

/**
 * Configure discipline filter pills
 */
function setupFilters() {
  const pills = document.querySelectorAll(".sf-pill[data-discipline]");
  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      pills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");

      activeDiscipline = pill.dataset.discipline;
      renderTermsList();
    });
  });
}

/**
 * Configure search input
 */
function setupSearch() {
  const searchInput = document.getElementById("sf-glossary-search-input");
  const clearBtn = document.getElementById("sf-glossary-clear-search");

  searchInput?.addEventListener("input", (e) => {
    currentSearchQuery = e.target.value.trim();
    if (currentSearchQuery) {
      clearBtn?.classList.remove("hidden");
    } else {
      clearBtn?.classList.add("hidden");
    }
    renderTermsList();
  });

  clearBtn?.addEventListener("click", () => {
    if (searchInput) searchInput.value = "";
    currentSearchQuery = "";
    clearBtn.classList.add("hidden");
    renderTermsList();
  });
}

/**
 * Render list of terms in the left scroll list
 */
function renderTermsList() {
  const container = document.getElementById("sf-terms-list");
  const countEl = document.getElementById("sf-terms-count");
  if (!container) return;

  let terms = searchGlossary(currentSearchQuery);

  if (activeDiscipline !== "All") {
    terms = terms.filter(
      (t) => t.discipline.toLowerCase() === activeDiscipline.toLowerCase()
    );
  }

  if (countEl) {
    countEl.textContent = `Showing ${terms.length} term${terms.length !== 1 ? "s" : ""}`;
  }

  container.innerHTML = "";

  if (terms.length === 0) {
    container.innerHTML = `
      <div class="sf-no-terms">
        <p>No matching terms found.</p>
      </div>`;
    return;
  }

  terms.forEach((t) => {
    const card = document.createElement("div");
    card.className = `sf-term-card ${t.id === selectedTermId ? "selected" : ""}`;
    card.setAttribute("data-id", t.id);

    card.innerHTML = `
      <div class="sf-term-card-header">
        <strong class="sf-term-card-name">${t.term}</strong>
        <span class="sf-term-disc-tag">${t.discipline}</span>
      </div>
      <p class="sf-term-card-sub">${t.shortDefinition}</p>
    `;

    card.addEventListener("click", () => {
      selectTerm(t.id, true);
    });

    container.appendChild(card);
  });
}

/**
 * Select term and display details in right panel
 */
function selectTerm(termId, pushHistory = true) {
  const termObj = getGlossaryTerm(termId);
  if (!termObj) return;

  selectedTermId = termId;

  // Update card active states in list
  document.querySelectorAll(".sf-term-card").forEach((card) => {
    if (card.dataset.id === termId) {
      card.classList.add("selected");
      card.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } else {
      card.classList.remove("selected");
    }
  });

  if (pushHistory) {
    pushGlossaryFrame({
      type: "glossary",
      termId: termObj.id,
      termTitle: termObj.term,
    });
  }

  renderTermDetails(termObj);
}

/**
 * Render term details into right side panel
 */
function renderTermDetails(termObj) {
  const emptyPlaceholder = document.getElementById("sf-detail-empty");
  const detailBody = document.getElementById("sf-detail-body");

  if (!emptyPlaceholder || !detailBody) return;

  emptyPlaceholder.classList.add("hidden");
  detailBody.classList.remove("hidden");

  // Title and tags
  document.getElementById("sf-detail-title").textContent = termObj.term;
  document.getElementById("sf-detail-discipline").textContent = termObj.discipline || "Glossary";
  document.getElementById("sf-detail-category").textContent = termObj.category || "General";

  // Short definition
  document.getElementById("sf-detail-short-def").textContent = termObj.shortDefinition;

  // Full definition with Markdown & Math parsing
  const fullDefEl = document.getElementById("sf-detail-full-def");
  if (fullDefEl) {
    let parsed = termObj.fullDefinition || "";
    // Basic Markdown formatting
    parsed = parsed.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    parsed = parseAndRenderMath(parsed);
    fullDefEl.innerHTML = `<p>${parsed}</p>`;
  }

  // Formal definition
  const formalWrapper = document.getElementById("sf-formal-wrapper");
  const formalEl = document.getElementById("sf-detail-formal");
  if (termObj.formalDefinition && formalEl) {
    formalWrapper.style.display = "block";
    formalEl.innerHTML = parseAndRenderMath(termObj.formalDefinition);
  } else if (formalWrapper) {
    formalWrapper.style.display = "none";
  }

  // Examples
  const examplesWrapper = document.getElementById("sf-examples-wrapper");
  const examplesList = document.getElementById("sf-detail-examples");
  if (termObj.examples && termObj.examples.length > 0 && examplesList) {
    examplesWrapper.style.display = "block";
    examplesList.innerHTML = termObj.examples
      .map((ex) => `<li>${parseAndRenderMath(ex)}</li>`)
      .join("");
  } else if (examplesWrapper) {
    examplesWrapper.style.display = "none";
  }

  // Related terms
  const relatedEl = document.getElementById("sf-detail-related");
  if (relatedEl) {
    relatedEl.innerHTML = "";
    if (termObj.relatedTerms && termObj.relatedTerms.length > 0) {
      termObj.relatedTerms.forEach((relId) => {
        const relObj = getGlossaryTerm(relId);
        const relName = relObj ? relObj.term : relId;

        const chip = document.createElement("button");
        chip.className = "sf-related-chip";
        chip.innerHTML = `<span>${relName}</span> <small>→</small>`;
        chip.addEventListener("click", () => {
          selectTerm(relId, true);
        });
        relatedEl.appendChild(chip);
      });
    } else {
      relatedEl.innerHTML = `<span class="muted-msg">No related terms listed.</span>`;
    }
  }

  // Trigger KaTeX rendering pass
  renderMathInContainer(detailBody);
}

function setupSidebarToggle() {
  const sidebarToggle = document.getElementById("sf-sidebar-toggle");
  const sidebar = document.getElementById("sf-sidebar");
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("mobile-open");
    });
  }
}

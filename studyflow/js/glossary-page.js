/**
 * StudyFlow Global Glossary Page Controller
 * Advanced UI & UX features:
 * - Search with live text highlighting & debounce
 * - Discipline & Starred Bookmarks filtering with live counts
 * - A-Z alphabetical jump scrubber
 * - Responsive master-detail with smooth mobile drill-down
 * - Audio pronunciation / text-to-speech
 * - Formula LaTeX copy & definition clipboard copy
 * - Shareable deep-linking
 * - Contextual AI Tutor integration
 * - Keyboard shortcuts (/ to search, arrows to navigate, Esc to clear/return)
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
import { initCommandPalette, showToast } from "./command-palette.js";

const BOOKMARKS_STORAGE_KEY = "studyflow_glossary_bookmarks";

let activeDiscipline = "All";
let activeLetter = "All";
let sortOrder = "az";
let selectedTermId = null;
let currentSearchQuery = "";
let currentVisibleTerms = [];
let termNavigationTrail = [];
let isSpeaking = false;

window.addEventListener("DOMContentLoaded", () => {
  initGlossaryPage();
  initCommandPalette();
  setupKeyboardShortcuts();
});

function initGlossaryPage() {
  setupOriginReturnBar();
  setupBookmarks();
  setupFilters();
  setupSort();
  setupSearch();
  setupMobileNavigation();
  setupSidebarToggle();
  setupDetailActionButtons();

  // Read term ID from URL parameter if present
  const params = new URLSearchParams(window.location.search);
  const termParam = params.get("term");

  buildAzScrubber();
  renderTermsList();

  if (termParam && getGlossaryTerm(termParam)) {
    selectTerm(termParam, false, false);
  } else {
    // Keep placeholder showing until user selects a term
    selectedTermId = null;
    const emptyPlaceholder = document.getElementById("sf-detail-empty");
    const detailBody = document.getElementById("sf-detail-body");
    emptyPlaceholder?.classList.remove("hidden");
    detailBody?.classList.add("hidden");
  }
}

// ─── Bookmark Management ────────────────────────────────────────────────────
function getBookmarks() {
  try {
    const raw = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn("Error reading bookmarks", e);
    return [];
  }
}

function saveBookmarks(bookmarks) {
  try {
    localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarks));
  } catch (e) {
    console.warn("Error saving bookmarks", e);
  }
}

function isTermBookmarked(termId) {
  const bookmarks = getBookmarks();
  return bookmarks.includes(termId);
}

function toggleBookmark(termId) {
  const bookmarks = getBookmarks();
  const term = getGlossaryTerm(termId);
  const termName = term ? term.term : termId;
  let newBookmarks;
  let isNowBookmarked = false;

  if (bookmarks.includes(termId)) {
    newBookmarks = bookmarks.filter((id) => id !== termId);
    showToast(`Removed "${termName}" from bookmarks`, "info");
  } else {
    newBookmarks = [...bookmarks, termId];
    isNowBookmarked = true;
    showToast(`Saved "${termName}" to bookmarks!`, "success");
  }

  saveBookmarks(newBookmarks);
  updateBookmarkCounts();
  updateBookmarkButtons(termId, isNowBookmarked);

  // If currently filtering by Starred, re-render the list
  if (activeDiscipline === "Starred") {
    renderTermsList();
  }
}

function setupBookmarks() {
  updateBookmarkCounts();
}

function updateBookmarkCounts() {
  const countEl = document.getElementById("count-starred");
  if (countEl) {
    countEl.textContent = getBookmarks().length;
  }
}

function updateBookmarkButtons(termId, isBookmarked) {
  // Update detail toolbar bookmark button
  if (selectedTermId === termId) {
    const detailBtn = document.getElementById("sf-bookmark-term-btn");
    const label = document.getElementById("sf-bookmark-btn-label");
    if (detailBtn) {
      if (isBookmarked) {
        detailBtn.classList.add("starred");
        if (label) label.textContent = "Starred";
      } else {
        detailBtn.classList.remove("starred");
        if (label) label.textContent = "Star";
      }
    }
  }

  // Update card bookmark icon in list
  const cardStar = document.querySelector(`.sf-card-star-btn[data-term-id="${termId}"]`);
  if (cardStar) {
    if (isBookmarked) {
      cardStar.classList.add("starred");
      cardStar.innerHTML = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      `;
    } else {
      cardStar.classList.remove("starred");
      cardStar.innerHTML = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      `;
    }
  }
}

// ─── Origin Return Bar ──────────────────────────────────────────────────────
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

// ─── Filter Pills & Counts ──────────────────────────────────────────────────
function setupFilters() {
  const allTerms = getAllGlossaryTerms();

  // Populate counts in badges
  const setDiscCount = (id, count) => {
    const el = document.getElementById(id);
    if (el) el.textContent = count;
  };

  setDiscCount("count-all", allTerms.length);
  setDiscCount("count-math", allTerms.filter((t) => t.discipline.toLowerCase() === "mathematics").length);
  setDiscCount("count-cs", allTerms.filter((t) => t.discipline.toLowerCase() === "computer science").length);
  setDiscCount("count-phys", allTerms.filter((t) => t.discipline.toLowerCase() === "physics").length);
  setDiscCount("count-chem", allTerms.filter((t) => t.discipline.toLowerCase() === "chemistry").length);
  updateBookmarkCounts();

  const pills = document.querySelectorAll(".sf-pill[data-discipline]");
  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      pills.forEach((p) => {
        p.classList.remove("active");
        p.setAttribute("aria-selected", "false");
      });
      pill.classList.add("active");
      pill.setAttribute("aria-selected", "true");

      activeDiscipline = pill.dataset.discipline;
      activeLetter = "All"; // Reset letter filter on discipline change
      buildAzScrubber();
      renderTermsList();
    });
  });
}

// ─── Sort Dropdown ──────────────────────────────────────────────────────────
function setupSort() {
  const sortSelect = document.getElementById("sf-sort-select");
  sortSelect?.addEventListener("change", (e) => {
    sortOrder = e.target.value;
    renderTermsList();
  });
}

// ─── Alphabetical A-Z Scrubber Bar ─────────────────────────────────────────
function buildAzScrubber() {
  const container = document.getElementById("sf-az-scrubber");
  if (!container) return;

  const allTerms = getAllGlossaryTerms();
  let baseTerms = allTerms;

  if (activeDiscipline === "Starred") {
    const bookmarks = getBookmarks();
    baseTerms = allTerms.filter((t) => bookmarks.includes(t.id));
  } else if (activeDiscipline !== "All") {
    baseTerms = allTerms.filter(
      (t) => t.discipline.toLowerCase() === activeDiscipline.toLowerCase()
    );
  }

  // Get unique initial letters
  const presentLetters = new Set(
    baseTerms.map((t) => t.term.charAt(0).toUpperCase())
  );

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  container.innerHTML = "";

  // 'All' button
  const allBtn = document.createElement("button");
  allBtn.type = "button";
  allBtn.className = `sf-az-btn ${activeLetter === "All" ? "active" : ""}`;
  allBtn.textContent = "All";
  allBtn.title = "Show all letters";
  allBtn.addEventListener("click", () => {
    activeLetter = "All";
    buildAzScrubber();
    renderTermsList();
  });
  container.appendChild(allBtn);

  alphabet.forEach((letter) => {
    const hasTerms = presentLetters.has(letter);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `sf-az-btn ${activeLetter === letter ? "active" : ""}`;
    btn.textContent = letter;
    btn.disabled = !hasTerms;
    if (hasTerms) {
      btn.title = `Jump to terms starting with ${letter}`;
      btn.addEventListener("click", () => {
        activeLetter = letter;
        buildAzScrubber();
        renderTermsList();
      });
    }
    container.appendChild(btn);
  });
}

// ─── Search Input ───────────────────────────────────────────────────────────
let searchDebounceTimer = null;
function setupSearch() {
  const searchInput = document.getElementById("sf-glossary-search-input");
  const clearBtn = document.getElementById("sf-glossary-clear-search");
  const hintEl = document.getElementById("sf-search-hint");

  searchInput?.addEventListener("input", (e) => {
    const query = e.target.value;
    if (query) {
      clearBtn?.classList.remove("hidden");
      hintEl?.style.setProperty("display", "none");
    } else {
      clearBtn?.classList.add("hidden");
      hintEl?.style.removeProperty("display");
    }

    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => {
      currentSearchQuery = query.trim();
      renderTermsList();
    }, 120);
  });

  clearBtn?.addEventListener("click", () => {
    if (searchInput) searchInput.value = "";
    currentSearchQuery = "";
    clearBtn.classList.add("hidden");
    hintEl?.style.removeProperty("display");
    renderTermsList();
    searchInput?.focus();
  });
}

// ─── Mobile Navigation Toggle ───────────────────────────────────────────────
function setupMobileNavigation() {
  const mobileBackBtn = document.getElementById("sf-mobile-back-btn");
  const grid = document.getElementById("sf-glossary-grid");

  mobileBackBtn?.addEventListener("click", () => {
    grid?.classList.remove("sf-mobile-view-detail");
    // Scroll back to active card on list
    const activeCard = document.querySelector(".sf-term-card.selected");
    activeCard?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

// ─── Keyboard Shortcuts ─────────────────────────────────────────────────────
function setupKeyboardShortcuts() {
  const searchInput = document.getElementById("sf-glossary-search-input");

  window.addEventListener("keydown", (e) => {
    const isTyping =
      document.activeElement === searchInput ||
      document.activeElement.tagName === "INPUT" ||
      document.activeElement.tagName === "TEXTAREA" ||
      document.activeElement.tagName === "SELECT";

    // '/' to focus search
    if (e.key === "/" && !isTyping) {
      e.preventDefault();
      searchInput?.focus();
      searchInput?.select();
      return;
    }

    // Escape clears search or returns to topic origin
    if (e.key === "Escape") {
      if (document.activeElement === searchInput && searchInput.value) {
        searchInput.value = "";
        currentSearchQuery = "";
        document.getElementById("sf-glossary-clear-search")?.classList.add("hidden");
        document.getElementById("sf-search-hint")?.style.removeProperty("display");
        renderTermsList();
        searchInput.blur();
        return;
      }
      // If mobile view is active, escape returns to list
      const grid = document.getElementById("sf-glossary-grid");
      if (grid?.classList.contains("sf-mobile-view-detail")) {
        grid.classList.remove("sf-mobile-view-detail");
        return;
      }
      // If origin return bar is visible, return to origin
      const origin = getTopicOrigin();
      if (origin && origin.courseId && origin.topicTitle) {
        returnToTopicOrigin();
        return;
      }
    }

    // 'b' toggles bookmark on currently selected term
    if ((e.key === "b" || e.key === "B") && !isTyping && selectedTermId) {
      e.preventDefault();
      toggleBookmark(selectedTermId);
      return;
    }

    // Arrow navigation through visible terms in list
    if ((e.key === "ArrowDown" || e.key === "ArrowUp") && !isTyping) {
      if (currentVisibleTerms.length === 0) return;
      e.preventDefault();

      if (!selectedTermId) {
        selectTerm(currentVisibleTerms[0].id, true, true);
        return;
      }

      const currentIndex = currentVisibleTerms.findIndex(
        (t) => t.id === selectedTermId
      );
      let nextIndex = 0;

      if (e.key === "ArrowDown") {
        nextIndex = currentIndex < currentVisibleTerms.length - 1 ? currentIndex + 1 : 0;
      } else {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : currentVisibleTerms.length - 1;
      }

      selectTerm(currentVisibleTerms[nextIndex].id, true, true);
    }
  });
}

// ─── Detail Action Buttons ──────────────────────────────────────────────────
function setupDetailActionButtons() {
  const bookmarkBtn = document.getElementById("sf-bookmark-term-btn");
  const audioBtn = document.getElementById("sf-pronounce-term-btn");
  const copyBtn = document.getElementById("sf-copy-term-btn");
  const shareBtn = document.getElementById("sf-share-term-btn");
  const aiBtn = document.getElementById("sf-ai-explain-term-btn");
  const copyLatexBtn = document.getElementById("sf-copy-latex-btn");
  const prevTermBtn = document.getElementById("sf-prev-term-btn");

  // Bookmark toggle
  bookmarkBtn?.addEventListener("click", () => {
    if (!selectedTermId) return;
    toggleBookmark(selectedTermId);
  });

  // Pronounce / Audio
  audioBtn?.addEventListener("click", () => {
    if (!selectedTermId) return;
    handleTextToSpeech();
  });

  // Copy Definition
  copyBtn?.addEventListener("click", () => {
    if (!selectedTermId) return;
    const term = getGlossaryTerm(selectedTermId);
    if (!term) return;

    const copyText = `${term.term} (${term.discipline})\n${term.shortDefinition}\n\n${term.fullDefinition || ""}`;
    navigator.clipboard.writeText(copyText).then(() => {
      showToast(`Copied "${term.term}" definition to clipboard!`, "success");
    });
  });

  // Share / Deep Link
  shareBtn?.addEventListener("click", () => {
    if (!selectedTermId) return;
    const url = new URL(window.location.href);
    url.searchParams.set("term", selectedTermId);
    navigator.clipboard.writeText(url.toString()).then(() => {
      showToast(`Copied link to "${getGlossaryTerm(selectedTermId)?.term}"`, "success");
    });
  });

  // Ask AI Tutor
  aiBtn?.addEventListener("click", () => {
    if (!selectedTermId) return;
    const term = getGlossaryTerm(selectedTermId);
    if (!term) return;

    localStorage.setItem(
      "studyflow_auto_prompt",
      `Please explain the concept of "${term.term}" (${term.discipline} - ${term.category || "General"}) from first principles. Include intuitive real-world analogies, formal reasoning, and common exam questions/misconceptions for university students.`
    );
    window.location.href = "chat.html";
  });

  // Copy raw LaTeX
  copyLatexBtn?.addEventListener("click", () => {
    if (!selectedTermId) return;
    const term = getGlossaryTerm(selectedTermId);
    if (!term || !term.formalDefinition) return;

    navigator.clipboard.writeText(term.formalDefinition).then(() => {
      showToast("LaTeX formula copied to clipboard!", "success");
    });
  });

  // Previous term in history trail
  prevTermBtn?.addEventListener("click", () => {
    if (termNavigationTrail.length > 1) {
      termNavigationTrail.pop(); // Remove current
      const prevTermId = termNavigationTrail.pop(); // Get previous
      if (prevTermId) {
        selectTerm(prevTermId, false, false);
      }
    }
  });
}

// ─── Text to Speech (Pronunciation & Summary) ───────────────────────────────
function handleTextToSpeech() {
  if (!("speechSynthesis" in window)) {
    showToast("Speech synthesis is not supported in your browser.", "info");
    return;
  }

  const audioBtn = document.getElementById("sf-pronounce-term-btn");
  const audioLabel = document.getElementById("sf-audio-btn-label");

  if (isSpeaking) {
    window.speechSynthesis.cancel();
    isSpeaking = false;
    audioBtn?.classList.remove("playing");
    if (audioLabel) audioLabel.textContent = "Listen";
    return;
  }

  const term = getGlossaryTerm(selectedTermId);
  if (!term) return;

  // Clean math symbols & markdown from spoken text
  const cleanSummary = term.shortDefinition
    .replace(/\$[^$]+\$/g, "")
    .replace(/[*_#]/g, "");

  const utteranceText = `${term.term}. ${cleanSummary}`;
  const utterance = new SpeechSynthesisUtterance(utteranceText);
  utterance.rate = 0.95;
  utterance.pitch = 1.0;

  utterance.onstart = () => {
    isSpeaking = true;
    audioBtn?.classList.add("playing");
    if (audioLabel) audioLabel.textContent = "Stop";
  };

  utterance.onend = () => {
    isSpeaking = false;
    audioBtn?.classList.remove("playing");
    if (audioLabel) audioLabel.textContent = "Listen";
  };

  utterance.onerror = () => {
    isSpeaking = false;
    audioBtn?.classList.remove("playing");
    if (audioLabel) audioLabel.textContent = "Listen";
  };

  window.speechSynthesis.speak(utterance);
}

// ─── Render Terms in Left Scroll List ───────────────────────────────────────
function renderTermsList() {
  const container = document.getElementById("sf-terms-list");
  const countEl = document.getElementById("sf-terms-count");
  if (!container) return;

  let terms = searchGlossary(currentSearchQuery);

  // Filter by Discipline or Bookmarks
  if (activeDiscipline === "Starred") {
    const bookmarks = getBookmarks();
    terms = terms.filter((t) => bookmarks.includes(t.id));
  } else if (activeDiscipline !== "All") {
    terms = terms.filter(
      (t) => t.discipline.toLowerCase() === activeDiscipline.toLowerCase()
    );
  }

  // Filter by A-Z Letter
  if (activeLetter !== "All") {
    terms = terms.filter(
      (t) => t.term.charAt(0).toUpperCase() === activeLetter
    );
  }

  // Sort terms
  if (sortOrder === "az") {
    terms.sort((a, b) => a.term.localeCompare(b.term));
  } else if (sortOrder === "za") {
    terms.sort((a, b) => b.term.localeCompare(a.term));
  } else if (sortOrder === "discipline") {
    terms.sort((a, b) => {
      const discComp = a.discipline.localeCompare(b.discipline);
      return discComp !== 0 ? discComp : a.term.localeCompare(b.term);
    });
  }

  currentVisibleTerms = terms;

  if (countEl) {
    const totalAll = getAllGlossaryTerms().length;
    if (currentSearchQuery || activeDiscipline !== "All" || activeLetter !== "All") {
      countEl.textContent = `Showing ${terms.length} of ${totalAll} terms`;
    } else {
      countEl.textContent = `Showing all ${terms.length} terms`;
    }
  }

  container.innerHTML = "";

  if (terms.length === 0) {
    const isBookmarkFilter = activeDiscipline === "Starred";
    container.innerHTML = `
      <div class="sf-no-terms">
        <div class="sf-no-terms-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
        <h4>${isBookmarkFilter ? "No bookmarked terms yet" : "No matching terms found"}</h4>
        <p>${
          isBookmarkFilter
            ? "Click the star icon on any concept to save it here for fast exam revision."
            : `No results matching "${escapeHtml(currentSearchQuery || activeLetter)}".`
        }</p>
        <button type="button" class="sf-clear-filters-btn" id="sf-reset-filters-btn">Reset all filters</button>
        ${
          !isBookmarkFilter
            ? `
          <div class="sf-suggested-queries">
            <button type="button" data-query="Domain">Domain</button>
            <button type="button" data-query="Derivative">Derivative</button>
            <button type="button" data-query="Recursion">Recursion</button>
            <button type="button" data-query="Velocity">Velocity</button>
            <button type="button" data-query="Molarity">Molarity</button>
          </div>`
            : ""
        }
      </div>`;

    document.getElementById("sf-reset-filters-btn")?.addEventListener("click", () => {
      activeDiscipline = "All";
      activeLetter = "All";
      currentSearchQuery = "";
      const searchInput = document.getElementById("sf-glossary-search-input");
      if (searchInput) searchInput.value = "";
      document.getElementById("sf-glossary-clear-search")?.classList.add("hidden");
      document.getElementById("sf-search-hint")?.style.removeProperty("display");
      document.querySelectorAll(".sf-pill").forEach((p) => p.classList.remove("active"));
      document.querySelector('.sf-pill[data-discipline="All"]')?.classList.add("active");
      buildAzScrubber();
      renderTermsList();
    });

    container.querySelectorAll(".sf-suggested-queries button").forEach((btn) => {
      btn.addEventListener("click", () => {
        const query = btn.dataset.query;
        const searchInput = document.getElementById("sf-glossary-search-input");
        if (searchInput) searchInput.value = query;
        currentSearchQuery = query;
        document.getElementById("sf-glossary-clear-search")?.classList.remove("hidden");
        document.getElementById("sf-search-hint")?.style.setProperty("display", "none");
        renderTermsList();
      });
    });

    return;
  }

  const bookmarks = getBookmarks();

  terms.forEach((t) => {
    const isSelected = t.id === selectedTermId;
    const isBookmarked = bookmarks.includes(t.id);
    const discClass = getDisciplineClass(t.discipline);

    const card = document.createElement("div");
    card.className = `sf-term-card ${isSelected ? "selected" : ""}`;
    card.setAttribute("data-id", t.id);
    card.setAttribute("data-discipline", t.discipline);
    card.setAttribute("role", "option");
    card.setAttribute("aria-selected", isSelected ? "true" : "false");
    card.setAttribute("tabindex", "0");

    // Highlight matches in title and summary
    const highlightedTitle = highlightMatch(t.term, currentSearchQuery);
    const highlightedSummary = highlightMatch(t.shortDefinition, currentSearchQuery);

    card.innerHTML = `
      <div class="sf-term-card-header">
        <strong class="sf-term-card-name">${highlightedTitle}</strong>
        <div class="sf-term-card-badges">
          <span class="sf-term-disc-tag ${discClass}">${escapeHtml(t.discipline)}</span>
          <button type="button" class="sf-card-star-btn ${isBookmarked ? "starred" : ""}" data-term-id="${t.id}" title="${isBookmarked ? "Remove bookmark" : "Bookmark term"}">
            ${
              isBookmarked
                ? `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`
                : `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`
            }
          </button>
        </div>
      </div>
      <p class="sf-term-card-sub">${highlightedSummary}</p>
      <div class="sf-term-card-footer">
        <span class="sf-term-card-category">${escapeHtml(t.category || "General")}</span>
        <span class="sf-term-card-arrow">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </span>
      </div>
    `;

    card.addEventListener("click", (e) => {
      // Don't trigger term selection if star was clicked
      if (e.target.closest(".sf-card-star-btn")) return;
      selectTerm(t.id, true, true);
    });

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        selectTerm(t.id, true, true);
      }
    });

    const starBtn = card.querySelector(".sf-card-star-btn");
    starBtn?.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleBookmark(t.id);
    });

    container.appendChild(card);
  });
}

// ─── Select Term & Display Details ──────────────────────────────────────────
function selectTerm(termId, pushHistory = true, isUserAction = true) {
  const termObj = getGlossaryTerm(termId);
  if (!termObj) return;

  // Stop any active speech synthesis when changing terms
  if (isSpeaking && window.speechSynthesis) {
    window.speechSynthesis.cancel();
    isSpeaking = false;
    const audioBtn = document.getElementById("sf-pronounce-term-btn");
    const audioLabel = document.getElementById("sf-audio-btn-label");
    audioBtn?.classList.remove("playing");
    if (audioLabel) audioLabel.textContent = "Listen";
  }

  selectedTermId = termId;

  // Track navigation trail for back navigation
  if (termNavigationTrail[termNavigationTrail.length - 1] !== termId) {
    termNavigationTrail.push(termId);
  }

  const prevBtn = document.getElementById("sf-prev-term-btn");
  if (prevBtn) {
    prevBtn.disabled = termNavigationTrail.length <= 1;
  }

  // Update card active states in list
  document.querySelectorAll(".sf-term-card").forEach((card) => {
    if (card.dataset.id === termId) {
      card.classList.add("selected");
      card.setAttribute("aria-selected", "true");
      card.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } else {
      card.classList.remove("selected");
      card.setAttribute("aria-selected", "false");
    }
  });

  // Mobile viewport drill-down: activate detail view
  if (isUserAction && window.innerWidth <= 960) {
    const grid = document.getElementById("sf-glossary-grid");
    grid?.classList.add("sf-mobile-view-detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Update shareable URL without reload
  const url = new URL(window.location.href);
  url.searchParams.set("term", termObj.id);
  window.history.replaceState({ term: termObj.id }, "", url.toString());

  if (pushHistory) {
    pushGlossaryFrame({
      type: "glossary",
      termId: termObj.id,
      termTitle: termObj.term,
    });
  }

  renderTermDetails(termObj);
}

// ─── Render Term Details into Right Panel ───────────────────────────────────
function renderTermDetails(termObj) {
  const emptyPlaceholder = document.getElementById("sf-detail-empty");
  const detailBody = document.getElementById("sf-detail-body");

  if (!emptyPlaceholder || !detailBody) return;

  emptyPlaceholder.classList.add("hidden");
  detailBody.classList.remove("hidden");

  // Breadcrumbs
  const crumbDisc = document.getElementById("sf-crumb-disc");
  const crumbCat = document.getElementById("sf-crumb-cat");
  if (crumbDisc) crumbDisc.textContent = termObj.discipline || "General";
  if (crumbCat) crumbCat.textContent = termObj.category || "General";

  // Badges & Title
  const discBadge = document.getElementById("sf-detail-discipline");
  const catTag = document.getElementById("sf-detail-category");
  const titleEl = document.getElementById("sf-detail-title");

  if (discBadge) {
    discBadge.textContent = termObj.discipline || "General";
    discBadge.className = `sf-discipline-badge ${getDisciplineClass(termObj.discipline)}`;
  }
  if (catTag) catTag.textContent = termObj.category || "General";
  if (titleEl) titleEl.textContent = termObj.term;

  // Bookmark Button State
  const isBookmarked = isTermBookmarked(termObj.id);
  const bookmarkBtn = document.getElementById("sf-bookmark-term-btn");
  const bookmarkLabel = document.getElementById("sf-bookmark-btn-label");
  if (bookmarkBtn) {
    if (isBookmarked) {
      bookmarkBtn.classList.add("starred");
      if (bookmarkLabel) bookmarkLabel.textContent = "Starred";
    } else {
      bookmarkBtn.classList.remove("starred");
      if (bookmarkLabel) bookmarkLabel.textContent = "Star";
    }
  }

  // Short definition
  const shortDefEl = document.getElementById("sf-detail-short-def");
  if (shortDefEl) {
    shortDefEl.textContent = termObj.shortDefinition;
  }

  // Full definition with Markdown & Math parsing
  const fullDefEl = document.getElementById("sf-detail-full-def");
  if (fullDefEl) {
    let parsed = termObj.fullDefinition || "";
    // Basic Markdown formatting
    parsed = parsed.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    parsed = parseAndRenderMath(parsed);
    fullDefEl.innerHTML = `<p>${parsed}</p>`;
  }

  // Formal definition (LaTeX)
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

  // Related terms chips
  const relatedEl = document.getElementById("sf-detail-related");
  if (relatedEl) {
    relatedEl.innerHTML = "";
    if (termObj.relatedTerms && termObj.relatedTerms.length > 0) {
      termObj.relatedTerms.forEach((relId) => {
        const relObj = getGlossaryTerm(relId);
        const relName = relObj ? relObj.term : relId;

        const chip = document.createElement("button");
        chip.type = "button";
        chip.className = "sf-related-chip";
        chip.innerHTML = `
          <span>${escapeHtml(relName)}</span>
          <span class="sf-chip-arrow">→</span>
        `;
        chip.title = `Explore ${relName}`;
        chip.addEventListener("click", () => {
          selectTerm(relId, true, true);
        });
        relatedEl.appendChild(chip);
      });
    } else {
      relatedEl.innerHTML = `<span style="color: #64748b; font-size: 0.85rem;">No related terms recorded yet.</span>`;
    }
  }

  // Trigger KaTeX rendering pass on the updated container
  renderMathInContainer(detailBody);
}

// ─── Helpers ────────────────────────────────────────────────────────────────
function getDisciplineClass(discipline) {
  if (!discipline) return "disc-all";
  const d = discipline.toLowerCase();
  if (d.includes("math")) return "disc-math";
  if (d.includes("computer")) return "disc-cs";
  if (d.includes("phys")) return "disc-phys";
  if (d.includes("chem")) return "disc-chem";
  return "disc-all";
}

function highlightMatch(text, query) {
  if (!text) return "";
  if (!query || !query.trim()) return escapeHtml(text);

  const safeText = escapeHtml(text);
  const safeQuery = escapeHtml(query.trim());
  const regex = new RegExp(`(${escapeRegex(safeQuery)})`, "gi");
  return safeText.replace(regex, `<mark class="sf-search-highlight">$1</mark>`);
}

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function setupSidebarToggle() {
  const sidebarToggle = document.getElementById("sf-sidebar-toggle");
  const sidebar = document.getElementById("sf-sidebar");
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener("click", () => {
      const isOpen = sidebar.classList.toggle("mobile-open");
      sidebarToggle.setAttribute("aria-expanded", String(isOpen));
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && sidebar.classList.contains("mobile-open")) {
        sidebar.classList.remove("mobile-open");
        sidebarToggle.setAttribute("aria-expanded", "false");
        sidebarToggle.focus();
      }
    });
  }
}

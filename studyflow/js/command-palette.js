/**
 * StudyFlow Global Command Palette & Quick Navigation
 * Keyboard shortcut: Ctrl + K or Cmd + K (or click the search button)
 */
import { coursesData } from "./courses.js";
import { globalGlossary } from "./glossary.js";

const isInsidePages = window.location.pathname.includes("/pages/");
const basePath = isInsidePages ? "../" : "./";

let modalBackdrop = null;
let searchInput = null;
let resultsContainer = null;
let selectedIndex = 0;
let currentItems = [];

// Quick Toast utility exportable for any page
export function showToast(message, type = "info", duration = 2800) {
  let container = document.getElementById("sf-toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "sf-toast-container";
    container.className = "sf-toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `sf-toast ${type === "success" ? "sf-toast-success" : ""}`;
  
  const icon = type === "success" 
    ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>'
    : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#01a9fe" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>';

  toast.innerHTML = `<span class="sf-toast-icon">${icon}</span><span>${message}</span>`;
  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add("sf-toast-show");
  });

  setTimeout(() => {
    toast.classList.remove("sf-toast-show");
    setTimeout(() => toast.remove(), 260);
  }, duration);
}

function buildCommandPaletteDOM() {
  if (document.getElementById("sf-cmd-palette")) return;

  const backdrop = document.createElement("div");
  backdrop.id = "sf-cmd-palette";
  backdrop.className = "sf-cmd-backdrop";
  backdrop.innerHTML = `
    <div class="sf-cmd-modal" role="dialog" aria-modal="true" aria-label="Quick Command and Search">
      <div class="sf-cmd-input-row">
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input type="text" id="sf-cmd-search-input" placeholder="Search courses, topics, glossary, or ask AI..." autocomplete="off" />
        <kbd>ESC</kbd>
      </div>
      <div class="sf-cmd-results" id="sf-cmd-results-list">
        <!-- Rendered results -->
      </div>
      <div class="sf-cmd-footer">
        <div class="sf-cmd-shortcuts">
          <span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
          <span><kbd>↵</kbd> Open</span>
          <span><kbd>ESC</kbd> Close</span>
        </div>
        <span>StudyFlow Search</span>
      </div>
    </div>
  `;

  document.body.appendChild(backdrop);
  modalBackdrop = backdrop;
  searchInput = document.getElementById("sf-cmd-search-input");
  resultsContainer = document.getElementById("sf-cmd-results-list");

  // Close when clicking backdrop outside modal
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) closeCommandPalette();
  });

  // Search input change
  searchInput.addEventListener("input", () => {
    renderSearchResults(searchInput.value.trim());
  });

  // Keyboard navigation within the modal
  searchInput.addEventListener("keydown", handleKeyNavigation);
}

function handleKeyNavigation(e) {
  if (e.key === "Escape") {
    closeCommandPalette();
    return;
  }

  if (currentItems.length === 0) return;

  if (e.key === "ArrowDown") {
    e.preventDefault();
    selectedIndex = (selectedIndex + 1) % currentItems.length;
    updateSelectedVisual();
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    selectedIndex = (selectedIndex - 1 + currentItems.length) % currentItems.length;
    updateSelectedVisual();
  } else if (e.key === "Enter") {
    e.preventDefault();
    const activeItem = currentItems[selectedIndex];
    if (activeItem) {
      executeCommandItem(activeItem);
    }
  }
}

function updateSelectedVisual() {
  const renderedItems = resultsContainer.querySelectorAll(".sf-cmd-item");
  renderedItems.forEach((el, idx) => {
    if (idx === selectedIndex) {
      el.classList.add("selected");
      el.scrollIntoView({ block: "nearest", behavior: "smooth" });
    } else {
      el.classList.remove("selected");
    }
  });
}

function executeCommandItem(item) {
  closeCommandPalette();
  if (item.action) {
    item.action();
  } else if (item.href) {
    window.location.href = item.href;
  }
}

function getAllSearchableItems() {
  const items = [];

  // Core Actions
  items.push({
    group: "Actions",
    type: "action",
    title: "Ask AI Tutor a question",
    subtitle: "Launch full AI chat assistant",
    badge: "AI Tool",
    icon: '<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>',
    href: `${basePath}pages/chat.html`
  });

  items.push({
    group: "Actions",
    type: "action",
    title: "Generate 5 FUGUS 200L exam practice questions",
    subtitle: "Quick exam revision with AI tutor",
    badge: "Exam Prep",
    icon: '<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>',
    action: () => {
      localStorage.setItem("studyflow_auto_prompt", "Give me 5 FUGUS 200L exam practice questions with detailed step-by-step solutions.");
      window.location.href = `${basePath}pages/chat.html`;
    }
  });

  items.push({
    group: "Actions",
    type: "action",
    title: "Open Global Glossary",
    subtitle: "Browse definitions and formulas across all disciplines",
    badge: "Glossary",
    icon: '<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>',
    href: `${basePath}pages/glossary.html`
  });

  // Courses
  coursesData.forEach((course) => {
    items.push({
      group: "Courses",
      type: "course",
      title: `${course.id} · ${course.title}`,
      subtitle: `${course.topics?.length || 0} topics available`,
      badge: "Course",
      icon: '<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>',
      href: `${basePath}pages/course.html?id=${course.id}`
    });

    // Topics inside each course
    course.topics?.forEach((topic) => {
      items.push({
        group: "Topics",
        type: "topic",
        title: topic.title,
        subtitle: `${course.id} · Study Notes & Quizzes`,
        badge: course.id,
        icon: '<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>',
        href: `${basePath}pages/topic.html?c=${course.id}&t=${topic.id}`
      });
    });
  });

  // Glossary terms
  globalGlossary.forEach((term) => {
    items.push({
      group: "Glossary Terms",
      type: "glossary",
      title: term.term,
      subtitle: term.shortDefinition,
      badge: term.discipline || "Glossary",
      icon: '<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2"><path stroke-linecap="round" stroke-linejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>',
      href: `${basePath}pages/glossary.html?term=${term.id}`
    });
  });

  return items;
}

function renderSearchResults(query = "") {
  const allItems = getAllSearchableItems();
  const lowerQuery = query.toLowerCase().trim();

  let filtered = allItems;
  if (lowerQuery) {
    filtered = allItems.filter(item => {
      const matchTitle = item.title.toLowerCase().includes(lowerQuery);
      const matchSub = item.subtitle ? item.subtitle.toLowerCase().includes(lowerQuery) : false;
      const matchBadge = item.badge ? item.badge.toLowerCase().includes(lowerQuery) : false;
      return matchTitle || matchSub || matchBadge;
    });
  } else {
    // When empty, show top actions and popular courses
    filtered = allItems.slice(0, 8);
  }

  currentItems = filtered.slice(0, 25);
  selectedIndex = 0;

  if (currentItems.length === 0) {
    resultsContainer.innerHTML = `
      <div class="sf-cmd-empty">
        <p>No results found for "<strong>${escapeHtml(query)}</strong>"</p>
        <span style="font-size:0.78rem; color:#64748b;">Try searching for "Calculus", "Logic", "COS201", or "Exam"</span>
      </div>
    `;
    return;
  }

  // Group by category
  let html = "";
  let currentGroup = "";

  currentItems.forEach((item, index) => {
    if (item.group !== currentGroup) {
      currentGroup = item.group;
      html += `<div class="sf-cmd-group-label">${currentGroup}</div>`;
    }

    const isSelected = index === selectedIndex ? "selected" : "";
    html += `
      <div class="sf-cmd-item ${isSelected}" data-index="${index}">
        <div class="sf-cmd-item-left">
          ${item.icon}
          <div style="min-width:0;">
            <div class="sf-cmd-title">${highlightMatch(item.title, lowerQuery)}</div>
            ${item.subtitle ? `<div class="sf-cmd-sub">${highlightMatch(item.subtitle, lowerQuery)}</div>` : ""}
          </div>
        </div>
        <span class="sf-cmd-badge">${escapeHtml(item.badge)}</span>
      </div>
    `;
  });

  resultsContainer.innerHTML = html;

  // Add click handlers
  resultsContainer.querySelectorAll(".sf-cmd-item").forEach(el => {
    el.addEventListener("click", () => {
      const idx = parseInt(el.dataset.index, 10);
      if (currentItems[idx]) {
        executeCommandItem(currentItems[idx]);
      }
    });
    el.addEventListener("mouseenter", () => {
      selectedIndex = parseInt(el.dataset.index, 10);
      updateSelectedVisual();
    });
  });
}

function highlightMatch(text, query) {
  if (!query) return escapeHtml(text);
  const regex = new RegExp(`(${escapeRegExp(query)})`, "gi");
  return escapeHtml(text).replace(regex, '<mark style="background: rgba(1, 169, 254, 0.25); color: #7dd3fc; border-radius: 2px; padding: 0 2px;">$1</mark>');
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

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function openCommandPalette() {
  buildCommandPaletteDOM();
  modalBackdrop.classList.add("active");
  searchInput.value = "";
  renderSearchResults("");
  setTimeout(() => searchInput.focus(), 50);
}

export function closeCommandPalette() {
  if (modalBackdrop) {
    modalBackdrop.classList.remove("active");
  }
}

// Auto-initialize listeners on window load
export function initCommandPalette() {
  buildCommandPaletteDOM();

  // Listen for Ctrl+K or Cmd+K
  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (modalBackdrop && modalBackdrop.classList.contains("active")) {
        closeCommandPalette();
      } else {
        openCommandPalette();
      }
    }
  });

  // Listen for search triggers
  document.querySelectorAll(".sf-cmd-trigger").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      openCommandPalette();
    });
  });
}

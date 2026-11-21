import { coursesData, getCourseById, getTopicById } from "./courses.js";
import { sendChatMessage, analyzePdfContent } from "./api/ai.js";
import { markGlossaryTermsInHtml } from "./glossary.js";
import { parseAndRenderMath, renderMathInContainer } from "./math-renderer.js";
import { initGlossaryUI } from "./glossary-ui.js";
import { getTopicMathReference, hasTopicMath } from "./topic-math.js";
import { initCommandPalette, showToast } from "./command-palette.js";

// ─── Shared State ─────────────────────────────────────────────────────────────
let currentCourse = null;
let currentTopic = null;
let chatHistory = []; // { role, content }
let isChatBusy = false;
let glossaryHtml = "";

// ─── Mental Model Scaffold Builder ────────────────────────────────────────────
function buildMentalModelScaffold(courseTitle, topicTitle, notes) {
  return { steps: [], glossary: "" };
}

function startQuickCheck(scaffold) {}

function openChatWithContext() {
  if (
    window.location.pathname.includes("topic.html") ||
    window.location.pathname.includes("course.html")
  ) {
    window.location.href = "chat.html";
    if (currentCourse && currentTopic) {
      localStorage.setItem(
        "chatContext",
        JSON.stringify({
          courseId: currentCourse.id,
          topicId: currentTopic.id,
          courseTitle: currentCourse.title,
          topicTitle: currentTopic.title,
        }),
      );
    }
  } else {
    openChatSidebar();
  }
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

// ─── Markdown Parser ─────────────────────────────────────────────────────────
function parseNotes(md) {
  if (!md) return "Notes not available.";
  let html = md;

  // 1. Process KaTeX math expressions BEFORE markdown tag conversions
  html = parseAndRenderMath(html);

  // 2. Process interactive glossary term tags [[termId|Label]] or [[termId]]
  html = markGlossaryTermsInHtml(html);

  // Extract Glossary if present in old format
  const glossaryMatch = html.match(
    /## Key terms & glossary([\s\S]*?)(?=## |$)/i,
  );
  glossaryHtml = "";
  if (glossaryMatch) {
    const glossaryContent = glossaryMatch[1];
    const terms = [];
    const termLines = glossaryContent.match(
      /^\s*-\s*\*\*([^*]+)\*\*:\s*(.*)$/gim,
    );
    if (termLines) {
      termLines.forEach((line) => {
        const m = line.match(/^\s*-\s*\*\*([^*]+)\*\*:\s*(.*)$/i);
        if (m) terms.push({ term: m[1].trim(), def: m[2].trim() });
      });
    }
    if (terms.length) {
      glossaryHtml = '<aside class="glossary-sidebar"><h4>Key Terms</h4><ul>';
      terms.forEach((t) => {
        glossaryHtml += `<li><strong>${t.term}</strong>: ${t.def}</li>`;
      });
      glossaryHtml += "</ul></aside>";
    }
  }

  // DeepSeek R1 <think> → collapsible
  html = html.replace(
    /<think>([\s\S]*?)<\/think>/gim,
    (_, thinking) => `
    <details class="think-block">
      <summary>🤖 Antigravity AI Thought Process</summary>
      <div class="think-content">${thinking.trim()}</div>
    </details>`,
  );

  // Interactive Knowledge Check Reveal
  html = html.replace(
    /\*\*Answer:\*\*\s*([\s\S]*?)(?=(?:<h[1-4]>|<\/p>|$))/i,
    (_, ans) => `
    <details class="knowledge-check-reveal">
      <summary class="quiz-reveal-btn">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
        <span>Reveal Answer / Self-Test</span>
      </summary>
      <div class="quiz-answer-content">
        <strong>Verified Solution:</strong>
        <p>${ans.trim()}</p>
      </div>
    </details>`,
  );

  // Headings with IDs for on-page jump navigation
  let sectionIdx = 0;
  html = html.replace(/^#### (.*$)/gim, "<h4>$1</h4>");
  html = html.replace(/^### (.*$)/gim, "<h3>$1</h3>");
  html = html.replace(/^## (.*$)/gim, (_, text) => {
    sectionIdx++;
    return `<h2 id="section-${sectionIdx}">${text}</h2>`;
  });
  html = html.replace(/^# (.*$)/gim, "<h1>$1</h1>");

  // Blockquote
  html = html.replace(/^\> (.*$)/gim, "<blockquote>$1</blockquote>");

  // Code blocks (```lang\n...\n```)
  html = html.replace(
    /```[\w]*\n([\s\S]*?)```/gim,
    "<pre><code>$1</code></pre>",
  );

  // Inline code
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  // Bold / Italic
  html = html.replace(/\*\*([^*]+)\*\*/gim, "<strong>$1</strong>");
  html = html.replace(/\*([^*]+)\*/gim, "<em>$1</em>");

  // Ordered lists (basic)
  html = html.replace(/^\d+\. (.*$)/gim, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>)/gims, "<ol>$1</ol>");

  // Unordered lists
  html = html.replace(/^\* (.*$)/gim, "<li>$1</li>");
  html = html.replace(/^- (.*$)/gim, "<li>$1</li>");

  // Highlight Section titles
  html = html.replace(
    /## Section (\d+) — (.*$)/gim,
    '<h2 class="notes-section-title">Section $1 — $2</h2>',
  );

  // Paragraphs (double newlines)
  html = html.replace(/\n\n/g, "</p><p>");
  html = "<p>" + html + "</p>";

  return html;
}

// ─────────────────────────────────────────────────────────────────────────────
// DASHBOARD (index.html)
// ─────────────────────────────────────────────────────────────────────────────
const courseCategories = {
  COS201: { discipline: "cs", tag: "Core CS", icon: "💻" },
  CSC203: { discipline: "cs", tag: "Architecture", icon: "🖥️" },
  CSC215: { discipline: "cs", tag: "Digital Logic", icon: "⚡" },
  MTH201: { discipline: "math", tag: "Calculus", icon: "📐" },
  ENT211: { discipline: "gen", tag: "Entrepreneurship", icon: "💼" },
  CSC299: { discipline: "gen", tag: "SIWES Training", icon: "🛠️" },
};

function renderDashboard() {
  const isInsidePages = window.location.pathname.includes("/pages/");
  const topicPrefix = isInsidePages ? "topic.html" : "pages/topic.html";
  const coursePrefix = isInsidePages ? "course.html" : "pages/course.html";
  const chatPrefix = isInsidePages ? "chat.html" : "pages/chat.html";

  // 1. Personalized Greeting by time of day
  const greetingEl = document.querySelector(".sf-greeting-title");
  if (greetingEl) {
    const hour = new Date().getHours();
    const timeGreeting =
      hour < 12
        ? "Good morning"
        : hour < 17
          ? "Good afternoon"
          : "Good evening";
    greetingEl.innerHTML = `${timeGreeting}, Student! 👋`;
  }

  // 2. Render counts
  const courseCount = document.getElementById("dashboard-course-count");
  const topicCount = document.getElementById("dashboard-topic-count");
  const totalTopics = coursesData.reduce(
    (total, course) => total + (course.topics?.length ?? 0),
    0,
  );
  if (courseCount) courseCount.textContent = String(coursesData.length);
  if (topicCount) topicCount.textContent = String(totalTopics);

  // 3. Resume Last Visited Topic banner
  const resumeWrap = document.getElementById("dashboard-resume-wrap");
  if (resumeWrap) {
    try {
      const lastTopicData = JSON.parse(
        localStorage.getItem("studyflow_last_topic") || "null",
      );
      if (lastTopicData && lastTopicData.courseId && lastTopicData.topicTitle) {
        resumeWrap.style.display = "block";
        resumeWrap.innerHTML = `
          <div style="display:inline-flex; align-items:center; gap:0.6rem; padding:0.5rem 0.9rem; border-radius:10px; background:rgba(1,169,254,0.12); border:1px solid rgba(1,169,254,0.3); font-size:0.82rem; color:#d9f5ff;">
            <strong>${lastTopicData.courseId} · ${lastTopicData.topicTitle}</strong>
            <a href="${topicPrefix}?c=${encodeURIComponent(lastTopicData.courseId)}&t=${encodeURIComponent(lastTopicData.topicId)}" style="color:var(--brand-cyan); font-weight:700; text-decoration:none; margin-left:0.25rem;">Continue &rarr;</a>
          </div>
        `;
      }
    } catch (e) {
      // Ignore json parse error
    }
  }

  // 4. Always initialize the real-time calendar
  initCalendar();

  // 5. If courses container is present (e.g. on index.html or pages/courses.html), render full courses list
  const container = document.getElementById("courses-container");
  if (!container) return;

  let activeDiscipline = "all";
  let searchQuery = "";

  const searchInput = document.getElementById("course-search-input");
  const clearBtn = document.getElementById("course-search-clear");
  const filterCountEl = document.getElementById("courses-filter-count");
  const disciplineTabs = document.querySelectorAll(".sf-discipline-chip");

  function filterAndRenderCourses() {
    let filtered = coursesData.filter((course) => {
      // Discipline filter
      const meta = courseCategories[course.id] || { discipline: "gen" };
      const matchesDiscipline =
        activeDiscipline === "all" || meta.discipline === activeDiscipline;
      if (!matchesDiscipline) return false;

      // Search query filter
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      const inId = course.id.toLowerCase().includes(q);
      const inTitle = course.title.toLowerCase().includes(q);
      const inDesc = course.description.toLowerCase().includes(q);
      const inTopics = course.topics?.some((t) =>
        t.title.toLowerCase().includes(q),
      );
      return inId || inTitle || inDesc || inTopics;
    });

    if (filterCountEl) {
      filterCountEl.textContent = `Showing ${filtered.length} of ${coursesData.length} course${filtered.length === 1 ? "" : "s"}`;
    }

    container.innerHTML = "";

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="sf-courses-empty">
          <h3>No matching courses found</h3>
          <p>We couldn't find any course matching "${escapeHtml(searchQuery)}".</p>
          <button type="button" id="reset-courses-filter">Reset Filters</button>
        </div>
      `;
      document
        .getElementById("reset-courses-filter")
        ?.addEventListener("click", () => {
          if (searchInput) searchInput.value = "";
          searchQuery = "";
          activeDiscipline = "all";
          disciplineTabs.forEach((tab) =>
            tab.classList.toggle("active", tab.dataset.discipline === "all"),
          );
          if (clearBtn) clearBtn.style.display = "none";
          filterAndRenderCourses();
        });
      return;
    }

    filtered.forEach((course, index) => {
      const card = document.createElement("div");
      card.className = `course-card fade-in delay-${Math.min(index + 1, 6) * 100}`;
      card.setAttribute("role", "article");
      card.setAttribute("aria-label", `${course.id}: ${course.title}`);

      const meta = courseCategories[course.id] || {
        tag: "General",
        discipline: "gen",
      };
      const total = course.topics?.length ?? 0;

      // Topics peek items
      const peekTopicsHtml = (course.topics || [])
        .slice(0, 5)
        .map(
          (t) =>
            `<a href="${topicPrefix}?c=${encodeURIComponent(course.id)}&t=${encodeURIComponent(t.id)}" class="peek-topic-link">
              <span>${t.title}</span>
              <span style="color:var(--brand-cyan)">&rarr;</span>
            </a>`,
        )
        .join("");

      card.innerHTML = `
        <div class="course-card-top">
          <h3 class="course-card-code">${course.id}</h3>
          <span class="course-category-badge">${meta.tag}</span>
        </div>
        <div class="course-desc">
          <strong>${course.title}</strong>
          <small>${course.description}</small>
        </div>

        <div class="course-topics-peek" id="peek-${course.id}">
          <div style="font-size:0.7rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#64748b; margin-bottom:0.2rem;">Quick Topic Jump</div>
          ${peekTopicsHtml}
        </div>

        <div class="course-meta">
          <button type="button" class="course-peek-btn" data-course="${course.id}" title="Preview syllabus topics">
            <span>📚 ${total} topics</span>
            <span class="peek-arrow" style="font-size:0.65rem;">▼</span>
          </button>
          <div class="course-card-actions">
            <button type="button" class="course-ai-quick-btn" data-course="${course.id}" title="Launch AI Tutor for ${course.id}">
              <span class="sf-sparkle">✦</span>
              <span>Ask AI</span>
            </button>
            <a href="${coursePrefix}?id=${course.id}" class="course-explore-link" title="Open ${course.id}">
              <span>View &rarr;</span>
            </a>
          </div>
        </div>
      `;

      // Entire card click navigates to course page unless clicking on sub-actions
      card.addEventListener("click", (e) => {
        if (e.target.closest("button, a")) return;
        window.location.href = `${coursePrefix}?id=${course.id}`;
      });

      // Topic peek toggle
      card.querySelector(".course-peek-btn")?.addEventListener("click", (e) => {
        e.stopPropagation();
        const peekBox = document.getElementById(`peek-${course.id}`);
        const arrow = e.currentTarget.querySelector(".peek-arrow");
        if (peekBox) {
          const isOpen = peekBox.classList.toggle("open");
          if (arrow) arrow.textContent = isOpen ? "▲" : "▼";
        }
      });

      // Quick Ask AI button
      card
        .querySelector(".course-ai-quick-btn")
        ?.addEventListener("click", (e) => {
          e.stopPropagation();
          window.location.href = `${chatPrefix}?course=${encodeURIComponent(course.id)}`;
        });

      container.appendChild(card);
    });
  }

  // Bind search input
  searchInput?.addEventListener("input", (e) => {
    searchQuery = e.target.value.trim();
    if (clearBtn) clearBtn.style.display = searchQuery ? "flex" : "none";
    filterAndRenderCourses();
  });

  clearBtn?.addEventListener("click", () => {
    if (searchInput) searchInput.value = "";
    searchQuery = "";
    clearBtn.style.display = "none";
    filterAndRenderCourses();
  });

  // Bind discipline filter tabs
  disciplineTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      disciplineTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      activeDiscipline = tab.dataset.discipline || "all";
      filterAndRenderCourses();
    });
  });

  // Wire AI Exam Prep Callout Button
  document
    .getElementById("quick-exam-prep-btn")
    ?.addEventListener("click", () => {
      localStorage.setItem(
        "studyflow_auto_prompt",
        "Give me 5 high-yield FUGUS 200-level exam practice questions across my enrolled courses with full step-by-step solutions.",
      );
      window.location.href = "pages/chat.html";
    });

  filterAndRenderCourses();
  initCalendar();
}

let calendarClockInterval = null;

function initCalendar() {
  const title = document.getElementById("calendar-month-title");
  const dates = document.getElementById("calendar-dates");
  const todayLabel = document.getElementById("calendar-today");
  const timeLabel = document.getElementById("calendar-time");
  const previous = document.getElementById("calendar-prev");
  const next = document.getElementById("calendar-next");
  const todayBtn = document.getElementById("calendar-today-btn");
  const headerTime = document.getElementById("header-live-time");

  if (!title || !dates) return;

  const now = new Date();
  let displayedMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const monthFormatter = new Intl.DateTimeFormat(undefined, {
    month: "long",
    year: "numeric",
  });
  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const timeFormatter = new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  function renderMonth() {
    title.textContent = monthFormatter.format(displayedMonth);
    dates.innerHTML = "";

    const firstDay = displayedMonth.getDay();
    const daysInMonth = new Date(
      displayedMonth.getFullYear(),
      displayedMonth.getMonth() + 1,
      0,
    ).getDate();
    const daysInPreviousMonth = new Date(
      displayedMonth.getFullYear(),
      displayedMonth.getMonth(),
      0,
    ).getDate();

    const totalCells = firstDay + daysInMonth > 35 ? 42 : 35;

    for (let index = 0; index < totalCells; index += 1) {
      const dayOffset = index - firstDay + 1;
      const cellDate = new Date(
        displayedMonth.getFullYear(),
        displayedMonth.getMonth(),
        dayOffset,
      );
      const cell = document.createElement("span");
      const isCurrentMonth = dayOffset > 0 && dayOffset <= daysInMonth;

      const dayNumber =
        dayOffset <= 0
          ? daysInPreviousMonth + dayOffset
          : dayOffset > daysInMonth
            ? dayOffset - daysInMonth
            : dayOffset;

      cell.textContent = String(dayNumber);

      if (!isCurrentMonth) {
        cell.classList.add("muted");
      }

      const today = new Date();
      if (
        cellDate.getDate() === today.getDate() &&
        cellDate.getMonth() === today.getMonth() &&
        cellDate.getFullYear() === today.getFullYear()
      ) {
        cell.classList.add("highlight-date");
        cell.setAttribute("aria-current", "date");
        cell.title = "Today";
      }

      dates.appendChild(cell);
    }
  }

  function updateClock() {
    const current = new Date();
    if (todayLabel) {
      todayLabel.textContent = `Today: ${dateFormatter.format(current)}`;
    }
    if (timeLabel) {
      timeLabel.textContent = timeFormatter.format(current);
    }
    if (headerTime) {
      headerTime.textContent = timeFormatter.format(current);
    }
  }

  if (previous) {
    previous.onclick = () => {
      displayedMonth = new Date(
        displayedMonth.getFullYear(),
        displayedMonth.getMonth() - 1,
        1,
      );
      renderMonth();
    };
  }

  if (next) {
    next.onclick = () => {
      displayedMonth = new Date(
        displayedMonth.getFullYear(),
        displayedMonth.getMonth() + 1,
        1,
      );
      renderMonth();
    };
  }

  if (todayBtn) {
    todayBtn.onclick = () => {
      const liveNow = new Date();
      displayedMonth = new Date(liveNow.getFullYear(), liveNow.getMonth(), 1);
      renderMonth();
    };
  }

  renderMonth();
  updateClock();

  if (calendarClockInterval) {
    clearInterval(calendarClockInterval);
  }
  calendarClockInterval = window.setInterval(updateClock, 1000);
}

// ─────────────────────────────────────────────────────────────────────────────
// COURSE VIEW (course.html)
// ─────────────────────────────────────────────────────────────────────────────
function renderCourseView() {
  const params = new URLSearchParams(window.location.search);
  const courseId = params.get("id");
  if (!courseId) return;

  const course = getCourseById(courseId);
  if (!course) return;

  const breadcrumbCode = document.getElementById("course-breadcrumb-code");
  const heroTitle = document.getElementById("course-hero-title");
  const courseCode = document.getElementById("course-code");
  const courseTitle = document.getElementById("course-title");
  const courseDescription = document.getElementById("course-desc");
  const topicCount = document.getElementById("course-topic-count");
  const courseBadgeLevel = document.getElementById("course-badge-level");

  if (breadcrumbCode) breadcrumbCode.textContent = course.id;
  if (courseCode) courseCode.textContent = `${course.id} · COURSE`;
  if (courseTitle) courseTitle.textContent = course.title;
  if (heroTitle) heroTitle.textContent = course.title;
  if (courseDescription) courseDescription.textContent = course.description;

  const meta = courseCategories[course.id];
  if (courseBadgeLevel && meta) {
    courseBadgeLevel.textContent = `FUGUS · 200L · ${meta.tag}`;
  }

  // Wire AI tutor links
  const aiTutorBtn = document.getElementById("course-ai-tutor-btn");
  const heroAiBtn = document.getElementById("hero-ai-study-btn");
  if (aiTutorBtn)
    aiTutorBtn.href = `chat.html?course=${encodeURIComponent(course.id)}`;
  if (heroAiBtn)
    heroAiBtn.href = `chat.html?course=${encodeURIComponent(course.id)}`;

  const container = document.getElementById("topics-container");
  if (!container) return;

  const topics = course.topics || [];
  if (topicCount) {
    topicCount.textContent = `${topics.length} topic${topics.length === 1 ? "" : "s"} in curriculum`;
  }

  function renderTopics() {
    container.innerHTML = "";

    if (topics.length === 0) {
      container.innerHTML = `
        <div style="padding: 2.5rem 1rem; text-align: center; color: #64748b; font-size: 0.9rem;">
          No topics available for this course yet.
        </div>`;
      return;
    }

    topics.forEach((topic, index) => {
      const el = document.createElement("div");
      el.className = `topic-item fade-in delay-${Math.min(index + 1, 8) * 100}`;
      el.style.display = "flex";
      el.style.alignItems = "center";
      el.style.justifyContent = "space-between";
      el.style.gap = "1rem";
      el.style.padding = "1.1rem 1.35rem";
      el.style.borderRadius = "14px";
      el.style.background = "rgba(15, 23, 42, 0.6)";
      el.style.border = "1px solid rgba(180, 205, 226, 0.1)";
      el.style.marginBottom = "0.75rem";
      el.style.transition = "all 0.18s ease";

      const words = (topic.notes || "").trim().split(/\s+/).length;
      const readMin = Math.max(3, Math.round(words / 180));
      const formattedNum = String(index + 1).padStart(2, "0");

      const mathBadge = hasTopicMath(topic.id, topic.notes)
        ? '<span class="topic-math-badge">Math notation</span>'
        : "";

      el.innerHTML = `
        <div style="display:flex; align-items:center; justify-content:start; gap:1rem; min-width:0;">
          <span style="display:flex; align-items:center; justify-content:center; width:34px; height:34px; border-radius:10px; background:rgba(1,169,254,0.12); color:var(--brand-cyan); font-weight:800; font-size:0.82rem; flex-shrink:0;">${formattedNum}</span>
          <div style="min-width:0;">
            <h4 style="margin:0 0 0.25rem; color:#fff; font-size:1.05rem; font-weight:700;">${escapeHtml(topic.title)}</h4>
            <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
              <span style="color:#94a3b8; font-size:0.75rem;">⏱ ~${readMin} min read</span>
              


              
            </div>
          </div>
        </div>
        <div style="display:flex; align-items:center; gap:0.5rem; flex-shrink:0;">
          <button type="button" class="course-ai-quick-btn" style="background:rgba(0,74,218,0.22); border:1px solid rgba(1,169,254,0.28); color:#d9f5ff; padding:0.35rem 0.65rem; border-radius:8px; font-size:0.75rem; font-weight:600; cursor:pointer;" data-topic="${topic.id}">
            <span class="sf-sparkle">✦</span> AI Quiz
          </button>
          <a href="topic.html?c=${encodeURIComponent(course.id)}&t=${encodeURIComponent(topic.id)}" class="action-btn study-btn" style="text-decoration:none; padding:0.45rem 0.9rem; font-size:0.8rem; border-radius:9px;">
            Study Notes &rarr;
          </a>
        </div>
      `;

      el.addEventListener("mouseenter", () => {
        el.style.borderColor = "rgba(1,169,254,0.35)";
        el.style.transform = "translateX(4px)";
      });
      el.addEventListener("mouseleave", () => {
        el.style.borderColor = "rgba(180, 205, 226, 0.1)";
        el.style.transform = "translateX(0)";
      });

      // Quick quiz button
      el.querySelector("button")?.addEventListener("click", (e) => {
        e.stopPropagation();
        localStorage.setItem(
          "studyflow_auto_prompt",
          `Test my knowledge on "${topic.title}" from ${course.id}. Give me 3 exam-style questions with detailed step-by-step explanations.`,
        );
        window.location.href = `chat.html?course=${encodeURIComponent(course.id)}&topic=${encodeURIComponent(topic.id)}`;
      });

      container.appendChild(el);
    });
  }

  renderTopics();
}

// ─────────────────────────────────────────────────────────────────────────────
// TOPIC VIEW (topic.html)
// ─────────────────────────────────────────────────────────────────────────────
function renderTopicView() {
  const params = new URLSearchParams(window.location.search);
  const courseId = params.get("c");
  const topicId = params.get("t");
  if (!courseId || !topicId) return;

  currentCourse = getCourseById(courseId);
  currentTopic = getTopicById(courseId, topicId);
  if (!currentCourse || !currentTopic) return;

  // Persist last visited topic for instant resume
  try {
    localStorage.setItem(
      "studyflow_last_topic",
      JSON.stringify({
        courseId: currentCourse.id,
        topicId: currentTopic.id,
        courseTitle: currentCourse.title,
        topicTitle: currentTopic.title,
        timestamp: Date.now(),
      }),
    );
  } catch (e) {
    // Ignore storage quota
  }

  // Back link
  const backLink = document.getElementById("back-link");
  if (backLink) backLink.href = `course.html?id=${courseId}`;

  // Topic title
  const titleEl = document.getElementById("topic-title");
  if (titleEl) titleEl.textContent = currentTopic.title;
  const courseLabel = document.getElementById("topic-course-label");
  if (courseLabel)
    courseLabel.textContent = `${currentCourse.id} · ${currentCourse.title}`;

  // Reading time badge
  const words = (currentTopic.notes || "").trim().split(/\s+/).length;
  const readMin = Math.max(3, Math.round(words / 180));
  const readTimeEl = document.getElementById("topic-read-time");
  if (readTimeEl) {
    readTimeEl.textContent = `⏱ ~${readMin} min read`;
    readTimeEl.style.display = "inline-flex";
  }

  // Reading progress bar on scroll
  const progressBar = document.getElementById("sf-reading-progress");
  if (progressBar) {
    window.addEventListener(
      "scroll",
      () => {
        const scrollTotal =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress =
          scrollTotal > 0 ? (window.scrollY / scrollTotal) * 100 : 0;
        progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
      },
      { passive: true },
    );
  }

  renderNotesArea();
  buildTopicOutline();
  wireTopicButtons();
  wireFontScaling();
}

function buildTopicOutline() {
  const outlineBar = document.getElementById("topic-outline-bar");
  const container = document.getElementById("notes-container");
  if (!outlineBar || !container) return;

  const headings = container.querySelectorAll("h2");
  if (headings.length <= 1) {
    outlineBar.style.display = "none";
    return;
  }

  outlineBar.innerHTML = "";
  outlineBar.style.display = "flex";

  headings.forEach((heading) => {
    if (!heading.id) return;
    const text = heading.textContent
      .replace(/^Section\s*\d+\s*—\s*/i, "")
      .trim();
    if (!text) return;

    const chip = document.createElement("a");
    chip.href = `#${heading.id}`;
    chip.className = "outline-chip";
    chip.textContent = text;
    chip.addEventListener("click", (e) => {
      e.preventDefault();
      heading.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    outlineBar.appendChild(chip);
  });
}

function wireFontScaling() {
  let fontStep = 1; // 0: small, 1: normal, 2: large, 3: xlarge
  const fontClasses = [
    "font-small",
    "font-normal",
    "font-large",
    "font-xlarge",
  ];
  const notesContainer = document.getElementById("notes-container");

  document
    .getElementById("font-decrease-btn")
    ?.addEventListener("click", () => {
      if (fontStep > 0) {
        fontStep--;
        notesContainer.className = `notes-content ${fontClasses[fontStep]}`;
        showToast("Font size decreased", "info", 1400);
      }
    });

  document
    .getElementById("font-increase-btn")
    ?.addEventListener("click", () => {
      if (fontStep < fontClasses.length - 1) {
        fontStep++;
        notesContainer.className = `notes-content ${fontClasses[fontStep]}`;
        showToast("Font size increased", "info", 1400);
      }
    });
}

function renderNotesArea() {
  const container = document.getElementById("notes-container");
  if (!container) return;

  const sourceNotes = currentTopic.notes || "";
  const [firstLine, ...remainingLines] = sourceNotes.split(/\r?\n/);
  const notesWithoutDuplicateTitle =
    firstLine?.replace(/^#\s*/, "").trim().toLowerCase() ===
    currentTopic.title.trim().toLowerCase()
      ? remainingLines.join("\n").replace(/^\s+/, "")
      : sourceNotes;
  const notes = `${notesWithoutDuplicateTitle}${getTopicMathReference(currentTopic.id)}`;
  if (!notes.trim()) {
    container.innerHTML = `<div class="empty-state"><p>No notes available for this topic.</p></div>`;
    return;
  }

  // Render markdown notes with math and interactive glossary tags
  container.innerHTML = parseNotes(notes) + (glossaryHtml || "");

  // Initialize KaTeX rendering pass in container
  renderMathInContainer(container);

  // Initialize Contextual Glossary UI (popovers, return highlighting, click listeners)
  initGlossaryUI({
    container,
    courseId: currentCourse.id,
    topicId: currentTopic.id,
    topicTitle: currentTopic.title,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// TOPIC BUTTON WIRING
// ─────────────────────────────────────────────────────────────────────────────
function wireTopicButtons() {
  // Study with AI button
  document
    .getElementById("ask-assistant-btn")
    ?.addEventListener("click", () => {
      if (currentCourse && currentTopic) {
        window.location.href = `chat.html?course=${encodeURIComponent(currentCourse.id)}&topic=${encodeURIComponent(currentTopic.id)}`;
      } else {
        window.location.href = "chat.html";
      }
    });

  document
    .getElementById("close-chat-btn")
    ?.addEventListener("click", closeChatSidebar);

  // Upload button
  document
    .getElementById("upload-btn")
    ?.addEventListener("click", () => openModal("upload-modal"));

  // Export PDF button
  document
    .getElementById("export-btn")
    ?.addEventListener("click", () => openModal("pdf-modal"));

  // Modal close buttons
  document.querySelectorAll(".modal-close, .modal-close-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const target = e.currentTarget.dataset.modal;
      if (target) closeModal(target);
    });
  });

  // Close modals on overlay click
  document.querySelectorAll(".modal-overlay").forEach((overlay) => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeModal(overlay.id);
    });
  });

  wireChatInput();
  wireUploadModal();
  wirePdfModal();
}

// ─────────────────────────────────────────────────────────────────────────────
// CHAT SIDEBAR
// ─────────────────────────────────────────────────────────────────────────────
function openChatSidebar() {
  const sidebar = document.getElementById("chat-sidebar");
  const layout = document.querySelector(".topic-layout");
  sidebar?.classList.remove("hidden");
  layout?.classList.add("sidebar-open");

  if (chatHistory.length === 0) {
    appendChatBubble(
      "ai",
      `👋 Hey! I'm your Antigravity AI study guide for **${currentTopic.title}**.\n\nAsk me anything, request a quiz, or just say "explain this"!`,
    );
  }
}

function closeChatSidebar() {
  const sidebar = document.getElementById("chat-sidebar");
  const layout = document.querySelector(".topic-layout");
  sidebar?.classList.add("hidden");
  layout?.classList.remove("sidebar-open");
}

function appendChatBubble(role, content) {
  const container = document.getElementById("chat-messages");
  if (!container) return;

  const bubble = document.createElement("div");
  bubble.className = `chat-bubble bubble-${role}`;
  bubble.innerHTML = parseNotes(content);
  container.appendChild(bubble);
  container.scrollTop = container.scrollHeight;
}

function showThinkingIndicator() {
  const container = document.getElementById("chat-messages");
  if (!container) return null;

  const bubble = document.createElement("div");
  bubble.className = "chat-bubble bubble-thinking";
  bubble.id = "thinking-indicator";
  bubble.innerHTML = `<span class="typing-dots"><span></span><span></span><span></span></span> Antigravity AI is thinking…`;
  container.appendChild(bubble);
  container.scrollTop = container.scrollHeight;
  return bubble;
}

function wireChatInput() {
  const input = document.getElementById("chat-input");
  const sendBtn = document.getElementById("send-btn");

  const submitMessage = async () => {
    const message = input?.value.trim();
    if (!message || isChatBusy) return;

    input.value = "";
    input.style.height = "auto";
    appendChatBubble("user", message);

    chatHistory.push({ role: "user", content: message });

    isChatBusy = true;
    sendBtn.disabled = true;
    const thinking = showThinkingIndicator();

    try {
      const reply = await sendChatMessage(
        currentCourse.title,
        currentTopic.title,
        currentTopic.notes,
        chatHistory.slice(-8), // keep last 8 turns for context
        message,
      );
      thinking?.remove();
      appendChatBubble("ai", reply);
      chatHistory.push({ role: "assistant", content: reply });
    } catch (err) {
      thinking?.remove();
      appendChatBubble(
        "ai",
        "❌ Error reaching Antigravity AI. Please check your connection and try again.",
      );
    } finally {
      isChatBusy = false;
      sendBtn.disabled = false;
    }
  };

  sendBtn?.addEventListener("click", submitMessage);
  input?.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitMessage();
    }
  });

  // Auto-resize textarea
  input?.addEventListener("input", () => {
    input.style.height = "auto";
    input.style.height = Math.min(input.scrollHeight, 120) + "px";
  });

  // Quick prompt buttons
  document.querySelectorAll(".quick-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (input) input.value = btn.dataset.prompt;
      submitMessage();
    });
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// UPLOAD MODAL
// ─────────────────────────────────────────────────────────────────────────────
function wireUploadModal() {
  const zone = document.getElementById("upload-zone");
  const input = document.getElementById("file-input");
  const browseEl = document.getElementById("upload-browse");
  const listEl = document.getElementById("upload-file-list");
  const processBtn = document.getElementById("process-upload-btn");

  let uploadedFiles = [];

  browseEl?.addEventListener("click", () => input?.click());
  zone?.addEventListener("click", () => input?.click());

  // Drag and drop
  zone?.addEventListener("dragover", (e) => {
    e.preventDefault();
    zone.classList.add("drag-over");
  });
  zone?.addEventListener("dragleave", () => zone.classList.remove("drag-over"));
  zone?.addEventListener("drop", (e) => {
    e.preventDefault();
    zone.classList.remove("drag-over");
    handleFiles(Array.from(e.dataTransfer.files));
  });

  input?.addEventListener("change", () => handleFiles(Array.from(input.files)));

  function handleFiles(files) {
    uploadedFiles = [...uploadedFiles, ...files];
    renderFileList();
  }

  function renderFileList() {
    if (!listEl) return;
    listEl.innerHTML = uploadedFiles
      .map(
        (f, i) => `
      <div class="uploaded-file-item">
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
        <span style="flex:1">${f.name}</span>
        <span style="color:var(--text-secondary)">${(f.size / 1024).toFixed(1)} KB</span>
      </div>`,
      )
      .join("");
  }

  processBtn?.addEventListener("click", async () => {
    if (uploadedFiles.length === 0) return;

    processBtn.textContent = "⏳ Analysing…";
    processBtn.disabled = true;

    // Simulate reading file text (real implementation would use FileReader)
    await new Promise((r) => setTimeout(r, 1500));

    const fileNames = uploadedFiles.map((f) => f.name).join(", ");

    // Append a context note to the topic notes
    const uploadNote = `\n\n---\n## 📎 Materials Uploaded\nThe following materials were uploaded and will inform your next AI session:\n${uploadedFiles.map((f) => `- ${f.name}`).join("\n")}`;
    currentTopic.notes += uploadNote;

    closeModal("upload-modal");
    renderNotesArea();

    // Open chat and let AI acknowledge the upload
    openChatSidebar();
    if (input)
      input.value = `I just uploaded ${fileNames}. Can you help me understand how it connects to this topic?`;
    document.getElementById("send-btn")?.click();
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// PDF EXPORT MODAL
// ─────────────────────────────────────────────────────────────────────────────
function wirePdfModal() {
  // Pill selection toggle
  document.querySelectorAll(".pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      const group = pill.dataset.group;
      document
        .querySelectorAll(`.pill[data-group="${group}"]`)
        .forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
    });
  });

  document
    .getElementById("generate-pdf-btn")
    ?.addEventListener("click", handlePdfGenerate);
}

function getSelectedPillValue(group) {
  return (
    document.querySelector(`.pill.active[data-group="${group}"]`)?.dataset
      .value ?? "standard"
  );
}

async function handlePdfGenerate() {
  const prefs = {
    style: getSelectedPillValue("style"),
    visual: getSelectedPillValue("visual"),
    depth: getSelectedPillValue("depth"),
  };

  const btn = document.getElementById("generate-pdf-btn");
  const genSection = document.getElementById("pdf-generating");
  const statusText = document.getElementById("pdf-status-text");

  btn.style.display = "none";
  genSection.style.display = "block";

  const steps = [
    "Analyzing your study interactions…",
    "Identifying areas of focus…",
    "Building personalized report structure…",
    "Formatting with your preferences…",
  ];
  let stepIdx = 0;
  const stepInterval = setInterval(() => {
    if (stepIdx < steps.length) {
      statusText.textContent = steps[stepIdx++];
    }
  }, 2000);

  try {
    const report = await analyzePdfContent(
      currentCourse.title,
      currentTopic.title,
      currentTopic.notes,
      prefs,
    );

    clearInterval(stepInterval);

    // Inject into print-only section
    const printContainer = document.getElementById("print-content");
    if (printContainer) {
      printContainer.innerHTML = `
        <div class="print-header">
          <h1>StudyFlow Study Report</h1>
          <p>${currentCourse.title} — ${currentTopic.title}</p>
          <p style="font-size:10pt; color:#94a3b8">Generated ${new Date().toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
        </div>
        <div class="print-section">${parseNotes(report)}</div>
        <div class="print-footer">
          Generated by StudyFlow • Powered by Antigravity AI • Adaptive Learning
        </div>`;
    }

    closeModal("pdf-modal");

    // Trigger browser print
    setTimeout(() => window.print(), 200);
  } catch (err) {
    clearInterval(stepInterval);
    genSection.style.display = "none";
    btn.style.display = "inline-flex";
    statusText.textContent = "❌ Error generating report. Please try again.";
    console.error("PDF generation error:", err);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MODAL HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function openModal(id) {
  document.getElementById(id)?.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeModal(id) {
  document.getElementById(id)?.classList.add("hidden");
  document.body.style.overflow = "";
}

// ─────────────────────────────────────────────────────────────────────────────
// ROUTER
// ─────────────────────────────────────────────────────────────────────────────
function initRouter() {
  const path = window.location.pathname;

  if (path.includes("topic.html")) {
    renderTopicView();
  } else if (path.includes("course.html")) {
    renderCourseView();
  } else {
    renderDashboard();
  }
}

window.addEventListener("DOMContentLoaded", () => {
  console.log("StudyFlow initialized ✓");
  initRouter();
  initCommandPalette();

  // Mobile sidebar drawer toggle
  const sidebarToggle = document.getElementById("sf-sidebar-toggle");
  const sidebar = document.getElementById("sf-sidebar");
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener("click", () => {
      const isOpen = sidebar.classList.toggle("mobile-open");
      sidebarToggle.setAttribute("aria-expanded", String(isOpen));
    });
    sidebar.querySelectorAll(".sf-nav-item").forEach((navItem) => {
      navItem.addEventListener("click", () => {
        sidebar.classList.remove("mobile-open");
        sidebarToggle.setAttribute("aria-expanded", "false");
      });
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && sidebar.classList.contains("mobile-open")) {
        sidebar.classList.remove("mobile-open");
        sidebarToggle.setAttribute("aria-expanded", "false");
        sidebarToggle.focus();
      }
    });
  }
});

import { coursesData, getCourseById, getTopicById } from "./courses.js";
import { sendChatMessage, analyzePdfContent } from "./api/ai.js";
import { markGlossaryTermsInHtml } from "./glossary.js";
import { parseAndRenderMath, renderMathInContainer } from "./math-renderer.js";
import { initGlossaryUI } from "./glossary-ui.js";

// ─── Shared State ─────────────────────────────────────────────────────────────
let currentCourse = null;
let currentTopic = null;
let chatHistory = []; // { role, content }
let isChatBusy = false;
let isFullScreen = false;
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

  // Headings
  html = html.replace(/^#### (.*$)/gim, "<h4>$1</h4>");
  html = html.replace(/^### (.*$)/gim, "<h3>$1</h3>");
  html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>");
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
function renderDashboard() {
  const container = document.getElementById("courses-container");
  if (!container) return;
  container.innerHTML = "";

  coursesData.forEach((course, index) => {
    const card = document.createElement("a");
    card.href = `pages/course.html?id=${course.id}`;
    card.className = `course-card fade-in delay-${(index + 1) * 100}`;

    const total = course.topics?.length ?? 0;

    card.innerHTML = `
      <h3>${course.id}</h3>
      <div class="course-desc">
        ${course.title}<br/>
        <small style="color:var(--text-secondary)">${course.description}</small>
      </div>
      <div class="course-meta">
        <span>${total} Topic${total !== 1 ? "s" : ""}</span>
      </div>`;
    container.appendChild(card);
  });

  initCalendar();
}

function initCalendar() {
  const title = document.getElementById("calendar-month-title");
  const dates = document.getElementById("calendar-dates");
  const todayLabel = document.getElementById("calendar-today");
  const timeLabel = document.getElementById("calendar-time");
  const previous = document.getElementById("calendar-prev");
  const next = document.getElementById("calendar-next");
  if (!title || !dates || !todayLabel || !timeLabel || !previous || !next)
    return;

  const now = new Date();
  let displayedMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthFormatter = new Intl.DateTimeFormat(undefined, {
    month: "long",
    year: "numeric",
  });
  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const timeFormatter = new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
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

    for (let index = 0; index < 42; index += 1) {
      const dayOffset = index - firstDay + 1;
      const date = new Date(
        displayedMonth.getFullYear(),
        displayedMonth.getMonth(),
        dayOffset,
      );
      const cell = document.createElement("span");
      cell.textContent = String(
        dayOffset <= 0
          ? daysInPreviousMonth + dayOffset
          : dayOffset > daysInMonth
            ? dayOffset - daysInMonth
            : dayOffset,
      );
      if (dayOffset <= 0 || dayOffset > daysInMonth)
        cell.classList.add("muted");
      if (date.toDateString() === now.toDateString())
        cell.classList.add("highlight-date");
      dates.appendChild(cell);
    }
  }

  function updateClock() {
    const current = new Date();
    todayLabel.textContent = `Today: ${dateFormatter.format(current)}`;
    timeLabel.textContent = timeFormatter.format(current);
  }

  previous.addEventListener("click", () => {
    displayedMonth = new Date(
      displayedMonth.getFullYear(),
      displayedMonth.getMonth() - 1,
      1,
    );
    renderMonth();
  });
  next.addEventListener("click", () => {
    displayedMonth = new Date(
      displayedMonth.getFullYear(),
      displayedMonth.getMonth() + 1,
      1,
    );
    renderMonth();
  });

  renderMonth();
  updateClock();
  window.setInterval(updateClock, 1000);
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

  document.getElementById("course-title").textContent = course.id;
  document.getElementById("course-desc").textContent = course.title;

  const container = document.getElementById("topics-container");
  container.innerHTML = "";

  course.topics?.forEach((topic, index) => {
    const el = document.createElement("a");
    el.href = `topic.html?c=${course.id}&t=${topic.id}`;
    el.className = `topic-item fade-in delay-${(index + 1) * 100}`;

    el.innerHTML = `
      <div class="topic-info">
        <h4>${topic.title}</h4>
      </div>`;
    container.appendChild(el);
  });
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

  // Back link
  const backLink = document.getElementById("back-link");
  if (backLink) backLink.href = `course.html?id=${courseId}`;

  // Topic title
  const titleEl = document.getElementById("topic-title");
  if (titleEl) titleEl.textContent = currentTopic.title;

  renderNotesArea();
  wireTopicButtons();
}

function renderNotesArea() {
  const container = document.getElementById("notes-container");
  if (!container) return;

  const notes = currentTopic.notes || "";
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
  document.getElementById("study-btn")?.addEventListener("click", () => {
    if (currentCourse && currentTopic) {
      window.location.href = `chat.html?course=${encodeURIComponent(currentCourse.id)}&topic=${encodeURIComponent(currentTopic.id)}`;
    } else {
      window.location.href = "chat.html";
    }
  });

  // NEW: Add full-screen toggle button to chat sidebar init
  const toggleBtn = document.createElement("div");
  toggleBtn.innerHTML = `
    <button id="chat-toggle-fullscreen" class="action-btn small-btn" style="float:right; margin:0.5rem; display:none;">
      🖥️ Full Screen
    </button>
  `;
  const sidebar = document.getElementById("chat-sidebar");
  if (sidebar) {
    sidebar
      .querySelector("h2")
      .parentElement.insertBefore(toggleBtn, sidebar.querySelector("h2"));
  }
  document
    .getElementById("close-chat-btn")
    ?.addEventListener("click", closeChatSidebar);

  // NEW: Full-screen toggle button
  document
    .getElementById("chat-toggle-fullscreen")
    ?.addEventListener("click", toggleFullScreenChat);

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

// NEW: Toggle full-screen chat mode
function toggleFullScreenChat() {
  const sidebar = document.getElementById("chat-sidebar");
  const layout = document.querySelector(".topic-layout");

  isFullScreen = !isFullScreen;

  if (isFullScreen) {
    // Switch to full-screen mode
    sidebar.classList.add("full-screen");
    layout.classList.add("full-screen-overlay");
    layout.classList.remove("sidebar-open");

    // Add exit button inside sidebar
    const toggleContainer = document.createElement("div");
    toggleContainer.className = "full-screen-toggle";
    toggleContainer.innerHTML = `
      <div style="padding:1rem; border-bottom:1px solid var(--divider);">
        <button id="chat-exit-fullscreen" class="action-btn small-btn" style="float:right; margin-left:0.5rem;">
          ← Back to Notes
        </button>
      </div>
    `;
    sidebar.insertBefore(toggleContainer, sidebar.firstChild);
  } else {
    // Return to sidebar mode
    sidebar.classList.remove("full-screen");
    layout.classList.remove("full-screen-overlay");
    layout.classList.add("sidebar-open");

    // Remove the custom toggle container
    const toggleContainer = sidebar.querySelector(".full-screen-toggle");
    if (toggleContainer) toggleContainer.remove();
  }
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

  // Mobile sidebar drawer toggle
  const sidebarToggle = document.getElementById("sf-sidebar-toggle");
  const sidebar = document.getElementById("sf-sidebar");
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("mobile-open");
    });
  }
});

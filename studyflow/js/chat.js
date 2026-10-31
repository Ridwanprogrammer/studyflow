import { coursesData, getCourseById, getTopicById } from "./courses.js";
import { sendGlobalChatMessage } from "./api/ai.js";
import { parseAndRenderMath } from "./math-renderer.js";
import { initCommandPalette, showToast } from "./command-palette.js";

// ─── Storage Keys ─────────────────────────────────────────────────────────────
const SESSIONS_KEY = "studyflow_chat_sessions";
const ACTIVE_SESSION_KEY = "studyflow_active_session_id";
const SIDEBAR_STATE_KEY = "studyflow_sidebar_collapsed";

// ─── State ────────────────────────────────────────────────────────────────────
let sessions = [];
let currentSessionId = null;
let isGenerating = false;
let stopRequested = false;
let pendingAttachments = [];

const MAX_IMAGE_BYTES = 4 * 1024 * 1024;
const MAX_TEXT_BYTES = 160 * 1024;
const SUPPORTED_TEXT_TYPES = new Set([
  "text/plain",
  "text/markdown",
  "text/csv",
  "application/json",
]);

// ─── DOM References ──────────────────────────────────────────────────────────
const sidebar = document.getElementById("gpt-sidebar");
const sidebarCloseBtn = document.getElementById("sidebar-close-btn");
const sidebarOpenBtn = document.getElementById("sidebar-open-btn");
const newChatBtn = document.getElementById("new-chat-btn");
const topNewChatBtn = document.getElementById("top-new-chat-btn");
const exportChatBtn = document.getElementById("export-chat-btn");
const conversationsList = document.getElementById("conversations-list");
const sidebarCoursePills = document.getElementById("sidebar-course-pills");

const modelPillBtn = document.getElementById("model-pill-btn");
const contextMenu = document.getElementById("context-menu");
const pillCourseTitle = document.getElementById("pill-course-title");
const pillTopicTitle = document.getElementById("pill-topic-title");
const modalCourseSelect = document.getElementById("modal-course-select");
const modalTopicSelect = document.getElementById("modal-topic-select");

const messagesContainer = document.getElementById("messages-container");
const messagesInner = document.getElementById("messages-inner");
const emptyStateHero = document.getElementById("gemini-empty-state");
const heroSubGreeting = document.getElementById("hero-sub-greeting");

const chatTextarea = document.getElementById("gpt-chat-textarea");
const sendBtn = document.getElementById("gpt-send-btn");
const sendIconSvg = document.getElementById("send-icon-svg");
const stopIconSvg = document.getElementById("stop-icon-svg");
const capsuleToolBtn = document.getElementById("capsule-tool-btn");
const chatFileInput = document.getElementById("chat-file-input");
const attachmentTray = document.getElementById("attachment-tray");
const quickToolsMenu = document.getElementById("quick-tools-menu");

// ─── Markdown Parser ─────────────────────────────────────────────────────────
function parseMarkdown(md) {
  if (!md) return "";
  let html = md;

  // Reasoning / Thinking blocks
  html = html.replace(
    /<think>([\s\S]*?)<\/think>/gim,
    (_, t) => `
    <details class="think-block" style="background: rgba(255,255,255,0.03); border: 1px dashed rgba(255,255,255,0.15); border-radius: 10px; padding: 0.6rem 0.9rem; margin: 0.85rem 0;">
      <summary style="cursor: pointer; font-size: 0.85rem; font-weight: 600; color: #94a3b8;">🤔 Thought Process</summary>
      <div style="margin-top: 0.65rem; font-size: 0.85rem; color: #94a3b8; line-height: 1.5; white-space: pre-wrap;">${t.trim()}</div>
    </details>`,
  );

  // Preserve Code Blocks
  const codeSnippets = [];
  html = html.replace(/```([\w-]*)\n([\s\S]*?)```/gim, (_, lang, code) => {
    const key = `__CODE_${codeSnippets.length}__`;
    codeSnippets.push({ lang: lang || "code", code: code.trim() });
    return key;
  });

  const inlineCodeSnippets = [];
  html = html.replace(/`([^`]+)`/g, (_, code) => {
    const key = `__INLINE_CODE_${inlineCodeSnippets.length}__`;
    inlineCodeSnippets.push(code);
    return key;
  });
  html = parseAndRenderMath(html);

  // Headings
  html = html.replace(/^#### (.*$)/gim, "<h4>$1</h4>");
  html = html.replace(/^### (.*$)/gim, "<h3>$1</h3>");
  html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>");
  html = html.replace(/^# (.*$)/gim, "<h1>$1</h1>");

  // Blockquotes
  html = html.replace(/^\> (.*$)/gim, "<blockquote>$1</blockquote>");

  // Bold & Italics
  html = html.replace(/\*\*([^\*]+)\*\*/gim, "<strong>$1</strong>");
  html = html.replace(/\*([^\*]+)\*/gim, "<em>$1</em>");

  // Tables
  const lines = html.split("\n");
  let inTable = false;
  let tableMarkup = "";
  const filtered = [];

  for (let i = 0; i < lines.length; i++) {
    const l = lines[i].trim();
    if (l.startsWith("|") && l.endsWith("|")) {
      if (!inTable) {
        inTable = true;
        tableMarkup =
          "<table style='width:100%; border-collapse: collapse; margin: 1rem 0; font-size: 0.92rem;'>";
      }
      if (l.includes("---")) continue;
      const cells = l
        .split("|")
        .slice(1, -1)
        .map((c) => c.trim());
      const isH =
        !tableMarkup.includes("<tbody>") && !tableMarkup.includes("<tr>");
      if (isH) {
        tableMarkup +=
          "<thead><tr>" +
          cells
            .map(
              (c) =>
                `<th style='border: 1px solid rgba(255,255,255,0.1); padding: 0.5rem 0.8rem; background: rgba(255,255,255,0.06); color: #fff;'>${c}</th>`,
            )
            .join("") +
          "</tr></thead><tbody>";
      } else {
        tableMarkup +=
          "<tr>" +
          cells
            .map(
              (c) =>
                `<td style='border: 1px solid rgba(255,255,255,0.08); padding: 0.5rem 0.8rem;'>${c}</td>`,
            )
            .join("") +
          "</tr>";
      }
    } else {
      if (inTable) {
        tableMarkup += "</tbody></table>";
        filtered.push(tableMarkup);
        inTable = false;
        tableMarkup = "";
      }
      filtered.push(l);
    }
  }
  if (inTable) {
    tableMarkup += "</tbody></table>";
    filtered.push(tableMarkup);
  }
  html = filtered.join("\n");

  // Lists
  html = html.replace(/^\- (.*$)/gim, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>)/gims, "<ul>$1</ul>");

  // Paragraphs
  html = html
    .split("\n\n")
    .map((p) => {
      p = p.trim();
      if (!p) return "";
      if (
        p.startsWith("<h") ||
        p.startsWith("<ul") ||
        p.startsWith("<ol") ||
        p.startsWith("<blockquote") ||
        p.startsWith("<details") ||
        p.startsWith("<table") ||
        p.startsWith('<div class="sf-math-block-wrap"') ||
        p.startsWith("__CODE_")
      ) {
        return p;
      }
      return `<p>${p.replace(/\n/g, "<br>")}</p>`;
    })
    .join("\n");

  // Inject Code Blocks with Copy button
  codeSnippets.forEach((snippet, i) => {
    const escaped = snippet.code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    const block = `
    <div class="code-wrapper">
      <div class="code-header">
        <span>${snippet.lang}</span>
        <button class="action-icon-btn copy-code-btn" data-code="${encodeURIComponent(snippet.code)}">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          Copy
        </button>
      </div>
      <pre><code>${escaped}</code></pre>
    </div>`;
    html = html.replace(`__CODE_${i}__`, block);
  });

  inlineCodeSnippets.forEach((code, i) => {
    html = html.replace(
      `__INLINE_CODE_${i}__`,
      `<code>${escapeHtml(code)}</code>`,
    );
  });

  return html;
}

// ─── Sessions / Multi-Chat Management ─────────────────────────────────────────
function loadSessions() {
  try {
    const raw = localStorage.getItem(SESSIONS_KEY);
    sessions = raw ? JSON.parse(raw) : [];
  } catch {
    sessions = [];
  }

  currentSessionId = localStorage.getItem(ACTIVE_SESSION_KEY);
  if (!currentSessionId || !sessions.find((s) => s.id === currentSessionId)) {
    if (sessions.length > 0) {
      currentSessionId = sessions[0].id;
    } else {
      createNewSession();
    }
  }
}

function saveSessions() {
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
  localStorage.setItem(ACTIVE_SESSION_KEY, currentSessionId);
}

function getActiveSession() {
  return sessions.find((s) => s.id === currentSessionId) || sessions[0];
}

function createNewSession(courseId = "ALL", topicId = "ALL") {
  const newId = "chat_" + Date.now();
  const newSession = {
    id: newId,
    title: "New Study Chat",
    courseId: courseId,
    topicId: topicId,
    messages: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  sessions.unshift(newSession);
  currentSessionId = newId;
  saveSessions();
  renderSidebarConversations();
  loadActiveSessionIntoView();
  return newSession;
}

function deleteSession(id, e) {
  if (e) e.stopPropagation();
  sessions = sessions.filter((s) => s.id !== id);
  if (currentSessionId === id) {
    if (sessions.length > 0) {
      currentSessionId = sessions[0].id;
    } else {
      createNewSession();
      return;
    }
  }
  saveSessions();
  renderSidebarConversations();
  loadActiveSessionIntoView();
}

function renderSidebarConversations() {
  conversationsList.innerHTML = "";
  if (sessions.length === 0) {
    conversationsList.innerHTML =
      '<div style="padding: 0.5rem 0.75rem; font-size: 0.8rem; color: #64748b;">No recent chats</div>';
    return;
  }

  sessions.forEach((sess) => {
    const item = document.createElement("div");
    item.className =
      "conversation-item" + (sess.id === currentSessionId ? " active" : "");
    item.innerHTML = `
      <span class="conversation-title-text">${sess.title}</span>
      <button class="conversation-delete-btn" title="Delete chat">
        <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
      </button>
    `;

    item.addEventListener("click", () => {
      if (currentSessionId !== sess.id) {
        currentSessionId = sess.id;
        saveSessions();
        renderSidebarConversations();
        loadActiveSessionIntoView();
      }
    });

    item
      .querySelector(".conversation-delete-btn")
      .addEventListener("click", (e) => {
        deleteSession(sess.id, e);
      });

    conversationsList.appendChild(item);
  });
}

// ─── UI Sync for Active Session ──────────────────────────────────────────────
function syncContextPill(courseId, topicId) {
  if (!courseId || courseId === "ALL") {
    pillCourseTitle.textContent = "StudyFlow AI";
    pillTopicTitle.textContent = "(General Assistant)";
    modalCourseSelect.value = "ALL";
    updateModalTopicSelect("ALL");
    sidebarCoursePills.querySelectorAll(".sidebar-course-chip").forEach((c) => {
      c.classList.toggle("active", c.dataset.course === "ALL");
    });
    if (heroSubGreeting) {
      heroSubGreeting.textContent =
        "Where should we start your FUGUS study session today?";
    }
    return;
  }

  const course = getCourseById(courseId);
  const courseName = course ? course.id : courseId;
  modalCourseSelect.value = courseId;
  updateModalTopicSelect(courseId, topicId);

  sidebarCoursePills.querySelectorAll(".sidebar-course-chip").forEach((c) => {
    c.classList.toggle("active", c.dataset.course === courseId);
  });

  if (topicId && topicId !== "ALL") {
    const topic = getTopicById(courseId, topicId);
    const topicName = topic ? topic.title : topicId;
    pillCourseTitle.textContent = `${courseName}`;
    pillTopicTitle.textContent = `(${topicName})`;
    if (heroSubGreeting) {
      heroSubGreeting.textContent = `Ready to master ${courseName} • ${topicName} for your FUGUS exams.`;
    }
  } else {
    pillCourseTitle.textContent = `${courseName}`;
    pillTopicTitle.textContent = "(All Topics)";
    if (heroSubGreeting) {
      heroSubGreeting.textContent = `Ready to study ${course ? course.title : courseName} for your FUGUS exams.`;
    }
  }
}

function updateModalTopicSelect(courseId, selectedTopicId = "ALL") {
  if (!courseId || courseId === "ALL") {
    modalTopicSelect.innerHTML =
      '<option value="ALL">📚 Select a course first</option>';
    modalTopicSelect.disabled = true;
    return;
  }

  const course = getCourseById(courseId);
  if (!course) return;

  modalTopicSelect.disabled = false;
  modalTopicSelect.innerHTML = `<option value="ALL">📚 All Topics in ${course.id}</option>`;

  course.topics.forEach((t) => {
    const opt = document.createElement("option");
    opt.value = t.id;
    opt.textContent = t.title;
    modalTopicSelect.appendChild(opt);
  });

  modalTopicSelect.value = selectedTopicId || "ALL";
}

function loadActiveSessionIntoView() {
  const session = getActiveSession();
  if (!session) return;

  syncContextPill(session.courseId, session.topicId);

  // Clear existing rendered messages
  const messageRows = messagesInner.querySelectorAll(".msg-row");
  messageRows.forEach((r) => r.remove());

  if (!session.messages || session.messages.length === 0) {
    emptyStateHero.style.display = "grid";
  } else {
    emptyStateHero.style.display = "none";
    session.messages.forEach((msg) => {
      if (msg.role === "user") {
        renderUserMessageWithAttachments(msg.content, msg.attachments || []);
      } else {
        renderAssistantMessage(msg.content);
      }
    });
  }

  scrollToBottom();
}

// ─── Rendering Messages ───────────────────────────────────────────────────────
function scrollToBottom() {
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function renderUserMessage(text) {
  const row = document.createElement("div");
  row.className = "msg-row user fade-in";
  row.innerHTML = `<div class="user-msg-bubble">${escapeHtml(text)}</div>`;
  messagesInner.appendChild(row);
  scrollToBottom();
}

function renderUserMessageWithAttachments(text, attachments = []) {
  const row = document.createElement("div");
  row.className = "msg-row user fade-in";
  const safeText = text
    ? escapeHtml(text)
    : '<span class="muted-msg">Attached file for analysis</span>';
  const attachmentMarkup = renderAttachmentSummary(attachments);
  row.innerHTML = `<div class="user-msg-bubble">${safeText}${attachmentMarkup}</div>`;
  messagesInner.appendChild(row);
  scrollToBottom();
}

function renderAttachmentSummary(attachments = []) {
  if (!attachments.length) return "";
  return `
    <div class="message-attachments">
      ${attachments
        .map((file) => {
          const isImage = file.kind === "image";
          const thumb =
            isImage && file.dataUrl
              ? `<img src="${file.dataUrl}" alt="${escapeHtml(file.name)}" />`
              : `<span class="attachment-file-icon">${file.kind === "text" ? "TXT" : "FILE"}</span>`;
          return `
            <div class="message-attachment-chip">
              ${thumb}
              <span>${escapeHtml(file.name)}</span>
            </div>`;
        })
        .join("")}
    </div>`;
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () =>
      reject(reader.error || new Error("Could not read file."));
    reader.readAsDataURL(file);
  });
}

function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () =>
      reject(reader.error || new Error("Could not read file."));
    reader.readAsText(file);
  });
}

function isSupportedTextFile(file) {
  const lowerName = file.name.toLowerCase();
  return (
    SUPPORTED_TEXT_TYPES.has(file.type) ||
    lowerName.endsWith(".txt") ||
    lowerName.endsWith(".md") ||
    lowerName.endsWith(".csv") ||
    lowerName.endsWith(".json")
  );
}

async function addPendingFiles(fileList) {
  const files = Array.from(fileList || []);
  const rejected = [];

  for (const file of files) {
    if (file.type.startsWith("image/")) {
      if (file.size > MAX_IMAGE_BYTES) {
        rejected.push(`${file.name} is larger than 4 MB.`);
        continue;
      }
      pendingAttachments.push({
        id: crypto.randomUUID
          ? crypto.randomUUID()
          : `att_${Date.now()}_${Math.random()}`,
        kind: "image",
        name: file.name,
        type: file.type,
        size: file.size,
        dataUrl: await readFileAsDataUrl(file),
      });
      continue;
    }

    if (isSupportedTextFile(file)) {
      if (file.size > MAX_TEXT_BYTES) {
        rejected.push(`${file.name} is larger than 160 KB.`);
        continue;
      }
      pendingAttachments.push({
        id: crypto.randomUUID
          ? crypto.randomUUID()
          : `att_${Date.now()}_${Math.random()}`,
        kind: "text",
        name: file.name,
        type: file.type || "text/plain",
        size: file.size,
        text: await readFileAsText(file),
      });
      continue;
    }

    rejected.push(
      `${file.name} is not supported yet. Use images, txt, md, csv, or json.`,
    );
  }

  renderAttachmentTray();
  updateSendButtonState();

  if (rejected.length) {
    chatTextarea.value = `${chatTextarea.value}${chatTextarea.value ? "\n" : ""}${rejected.join("\n")}`;
    chatTextarea.focus();
  }
}

function removePendingAttachment(id) {
  pendingAttachments = pendingAttachments.filter((file) => file.id !== id);
  renderAttachmentTray();
  updateSendButtonState();
}

function renderAttachmentTray() {
  if (!attachmentTray) return;
  attachmentTray.classList.toggle("hidden", pendingAttachments.length === 0);
  attachmentTray.innerHTML = pendingAttachments
    .map((file) => {
      const preview =
        file.kind === "image" && file.dataUrl
          ? `<img src="${file.dataUrl}" alt="${escapeHtml(file.name)}" />`
          : `<span class="attachment-file-icon">${file.kind === "text" ? "TXT" : "FILE"}</span>`;
      return `
        <div class="attachment-chip" data-attachment-id="${file.id}">
          ${preview}
          <span class="attachment-name">${escapeHtml(file.name)}</span>
          <button type="button" class="attachment-remove-btn" title="Remove attachment">x</button>
        </div>`;
    })
    .join("");

  attachmentTray.querySelectorAll(".attachment-remove-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const chip = btn.closest(".attachment-chip");
      removePendingAttachment(chip.dataset.attachmentId);
    });
  });
}

function renderAssistantMessage(markdownContent, onComplete = null) {
  const row = document.createElement("div");
  row.className = "msg-row assistant fade-in";

  row.innerHTML = `
    <div class="assistant-msg-flow">
     
      <div class="assistant-content-pane">
        <div class="assistant-text-target">${parseMarkdown(markdownContent)}</div>
        <div class="msg-action-bar">
          <button class="action-icon-btn copy-msg-btn" title="Copy response">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            <span>Copy</span>
          </button>
          <button class="action-icon-btn listen-msg-btn" title="Listen to response">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M11 5L6 9H2v6h4l5 4V5z"/></svg>
            <span>Listen</span>
          </button>
          <button class="action-icon-btn simpler-msg-btn" title="Ask AI to simplify this explanation">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            <span>Simplify</span>
          </button>
          <button class="action-icon-btn regen-msg-btn" title="Regenerate response">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            <span>Regenerate</span>
          </button>
        </div>
      </div>
    </div>
  `;

  attachMessageActions(row, markdownContent);
  messagesInner.appendChild(row);
  scrollToBottom();
  if (onComplete) onComplete();
}

// ─── Sleek Typewriter / Streaming Generation Animation ────────────────────────
function streamAssistantResponse(fullMarkdown, onComplete) {
  const row = document.createElement("div");
  row.className = "msg-row assistant fade-in";

  row.innerHTML = `
    <div class="assistant-msg-flow">
      
      <div class="assistant-content-pane">
        <div class="assistant-text-target"></div>
        <div class="msg-action-bar" style="display: none;">
          <button class="action-icon-btn copy-msg-btn" title="Copy response">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            <span>Copy</span>
          </button>
          <button class="action-icon-btn listen-msg-btn" title="Listen to response">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M11 5L6 9H2v6h4l5 4V5z"/></svg>
            <span>Listen</span>
          </button>
          <button class="action-icon-btn simpler-msg-btn" title="Ask AI to simplify this explanation">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            <span>Simplify</span>
          </button>
          <button class="action-icon-btn regen-msg-btn" title="Regenerate response">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            <span>Regenerate</span>
          </button>
        </div>
      </div>
    </div>
  `;

  messagesInner.appendChild(row);
  const textTarget = row.querySelector(".assistant-text-target");
  const actionBar = row.querySelector(".msg-action-bar");

  // Word token stream
  const words = fullMarkdown.split(" ");
  let currentIdx = 0;
  const chunkSize = Math.max(1, Math.floor(words.length / 80)); // scale speed smoothly

  stopRequested = false;
  setGeneratingUI(true);

  const streamInterval = setInterval(() => {
    if (stopRequested || currentIdx >= words.length) {
      clearInterval(streamInterval);
      textTarget.innerHTML = parseMarkdown(fullMarkdown);
      actionBar.style.display = "flex";
      attachMessageActions(row, fullMarkdown);
      setGeneratingUI(false);
      scrollToBottom();
      if (onComplete) onComplete();
      return;
    }

    currentIdx = Math.min(words.length, currentIdx + chunkSize);
    const partialText = words.slice(0, currentIdx).join(" ");
    textTarget.innerHTML =
      parseMarkdown(partialText) + '<span class="typing-stream-cursor"></span>';
    scrollToBottom();
  }, 22);
}

function attachMessageActions(row, fullText) {
  const copyBtn = row.querySelector(".copy-msg-btn");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(fullText).then(() => {
        copyBtn.innerHTML = "✓ Copied";
        showToast("Response copied to clipboard!", "success");
        setTimeout(() => {
          copyBtn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg><span>Copy</span>`;
        }, 2000);
      });
    });
  }

  // Audio Speech Synthesis (Listen)
  const listenBtn = row.querySelector(".listen-msg-btn");
  if (listenBtn) {
    listenBtn.addEventListener("click", () => {
      handleAudioSpeak(fullText, listenBtn);
    });
  }

  // Simplify Explanation Button
  const simplerBtn = row.querySelector(".simpler-msg-btn");
  if (simplerBtn) {
    simplerBtn.addEventListener("click", () => {
      handleSendMessage(
        "Can you break that down in simpler terms with a familiar, concrete real-world analogy?",
      );
    });
  }

  const regenBtn = row.querySelector(".regen-msg-btn");
  if (regenBtn) {
    regenBtn.addEventListener("click", () => {
      const session = getActiveSession();
      if (session && session.messages.length > 0) {
        const lastUserMsg = [...session.messages]
          .reverse()
          .find((m) => m.role === "user");
        if (lastUserMsg) {
          handleSendMessage(
            lastUserMsg.content,
            true,
            lastUserMsg.attachments || [],
          );
        }
      }
    });
  }

  // Code snippet copy buttons
  row.querySelectorAll(".copy-code-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const code = decodeURIComponent(btn.getAttribute("data-code"));
      navigator.clipboard.writeText(code).then(() => {
        btn.innerHTML = "✓ Copied";
        setTimeout(() => {
          btn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy`;
        }, 2000);
      });
    });
  });
}

function handleAudioSpeak(text, btn) {
  if (!("speechSynthesis" in window)) {
    showToast("Speech synthesis is not supported in this browser.", "info");
    return;
  }
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    btn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M11 5L6 9H2v6h4l5 4V5z"/></svg><span>Listen</span>`;
    return;
  }

  // Clean markdown and latex
  const clean = text
    .replace(/<think>[\s\S]*?<\/think>/gi, "")
    .replace(/```[\s\S]*?```/g, "Code snippet omitted.")
    .replace(/\$[^$]+\$/g, "")
    .replace(/[*_#`]/g, "");

  const utterance = new SpeechSynthesisUtterance(clean);
  utterance.rate = 1.0;
  utterance.onstart = () => {
    btn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2"/></svg><span>Stop</span>`;
  };
  utterance.onend = utterance.onerror = () => {
    btn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M11 5L6 9H2v6h4l5 4V5z"/></svg><span>Listen</span>`;
  };
  window.speechSynthesis.speak(utterance);
}

function setGeneratingUI(generating) {
  isGenerating = generating;
  if (generating) {
    sendBtn.disabled = false;
    sendBtn.classList.add("stop-mode");
    sendBtn.title = "Stop generating";
    sendIconSvg.style.display = "none";
    stopIconSvg.style.display = "block";
  } else {
    sendBtn.classList.remove("stop-mode");
    sendBtn.title = "Send message";
    sendIconSvg.style.display = "block";
    stopIconSvg.style.display = "none";
    updateSendButtonState();
  }
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// ─── Sending Messages ─────────────────────────────────────────────────────────
async function handleSendMessage(
  customPrompt = null,
  isRegen = false,
  customAttachments = null,
) {
  const text = (customPrompt || chatTextarea.value).trim();
  const attachmentsForMessage =
    customAttachments ?? (customPrompt ? [] : [...pendingAttachments]);
  if (!text && attachmentsForMessage.length === 0) return;

  if (isGenerating) {
    // If clicked while generating, stop generating
    stopRequested = true;
    return;
  }

  const session = getActiveSession();
  if (!session) return;
  const lastUserIndex = isRegen
    ? session.messages.map((message) => message.role).lastIndexOf("user")
    : -1;
  const historyForRequest =
    isRegen && lastUserIndex >= 0
      ? session.messages.slice(0, lastUserIndex).slice(-8)
      : session.messages.slice(-8);

  if (!customPrompt) {
    chatTextarea.value = "";
    chatTextarea.style.height = "auto";
    pendingAttachments = [];
    renderAttachmentTray();
  }

  emptyStateHero.style.display = "none";

  if (!isRegen) {
    renderUserMessageWithAttachments(text, attachmentsForMessage);
    session.messages.push({
      role: "user",
      content: text,
      attachments: attachmentsForMessage,
    });

    // Auto-update session title from first message
    if (session.title === "New Study Chat") {
      const titleSource =
        text || attachmentsForMessage[0]?.name || "Attached file";
      session.title =
        titleSource.slice(0, 30) + (titleSource.length > 30 ? "..." : "");
      renderSidebarConversations();
    }
  }

  // Show thinking indicator shimmer
  const thinkingRow = document.createElement("div");
  thinkingRow.className = "msg-row assistant fade-in";
  thinkingRow.id = "active-thinking-indicator";
  thinkingRow.innerHTML = `
    <div class="assistant-msg-flow">
      
      <div class="gemini-thinking-shimmer">
        <span>...</span>
      </div>
    </div>
  `;
  messagesInner.appendChild(thinkingRow);
  scrollToBottom();

  // Retrieve course & topic notes if selected
  let courseTitle = null;
  let topicTitle = null;
  let topicNotes = null;

  if (session.courseId && session.courseId !== "ALL") {
    const course = getCourseById(session.courseId);
    if (course) {
      courseTitle = `${course.id}: ${course.title}`;
      if (session.topicId && session.topicId !== "ALL") {
        const topic = getTopicById(session.courseId, session.topicId);
        if (topic) {
          topicTitle = topic.title;
          topicNotes = topic.notes || "";
        }
      }
    }
  }

  try {
    const aiResponse = await sendGlobalChatMessage({
      courseTitle,
      topicTitle,
      topicNotes,
      chatHistory: historyForRequest,
      userMessage:
        text ||
        "Please analyze the attached file and explain what I should learn from it.",
      attachments: attachmentsForMessage,
    });

    thinkingRow.remove();

    // Stream the sleek response animation!
    streamAssistantResponse(aiResponse, () => {
      session.messages.push({ role: "assistant", content: aiResponse });
      session.updatedAt = Date.now();
      saveSessions();
    });
  } catch (err) {
    thinkingRow.remove();
    const errorMsg = `**Could not send message.**\n\nMake sure you are online.`;
    renderAssistantMessage(errorMsg);
    session.messages.push({ role: "assistant", content: errorMsg });
    saveSessions();
    setGeneratingUI(false);
  }
}

// ─── Input & Textarea Listeners ───────────────────────────────────────────────
function updateSendButtonState() {
  const hasContent =
    chatTextarea.value.trim().length > 0 || pendingAttachments.length > 0;
  if (!isGenerating) {
    sendBtn.disabled = !hasContent;
    sendBtn.classList.toggle("active-send", hasContent);
  }
}

// ─── Initialization ──────────────────────────────────────────────────────────
function init() {
  loadSessions();
  renderSidebarConversations();

  // Parse URL query parameters
  const params = new URLSearchParams(window.location.search);
  const qCourse = params.get("course");
  const qTopic = params.get("topic");

  if (qCourse && getCourseById(qCourse)) {
    // If opened with specific course/topic, create or set session with that subject
    const active = getActiveSession();
    active.courseId = qCourse;
    active.topicId = qTopic || "ALL";
    syncContextPill(qCourse, qTopic || "ALL");
    saveSessions();
  }

  loadActiveSessionIntoView();

  // Sidebar toggle
  const isCollapsed = localStorage.getItem(SIDEBAR_STATE_KEY) === "true";
  const dashboardLayout = sidebar.closest(".sf-dashboard-layout");
  if (isCollapsed) {
    sidebar.classList.add("collapsed");
    dashboardLayout?.classList.add("sidebar-collapsed");
  }

  sidebarCloseBtn.addEventListener("click", () => {
    sidebar.classList.add("collapsed");
    sidebar.classList.remove("sidebar-open");
    dashboardLayout?.classList.add("sidebar-collapsed");
    sidebarOpenBtn.setAttribute("aria-expanded", "false");
    localStorage.setItem(SIDEBAR_STATE_KEY, "true");
  });

  sidebarOpenBtn.addEventListener("click", () => {
    sidebar.classList.remove("collapsed");
    sidebar.classList.add("sidebar-open");
    dashboardLayout?.classList.remove("sidebar-collapsed");
    sidebarOpenBtn.setAttribute("aria-expanded", "true");
    localStorage.setItem(SIDEBAR_STATE_KEY, "false");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !contextMenu.classList.contains("hidden")) {
      contextMenu.classList.add("hidden");
      modelPillBtn.setAttribute("aria-expanded", "false");
      modelPillBtn.focus();
      return;
    }

    if (event.key === "Escape" && sidebar.classList.contains("sidebar-open")) {
      sidebar.classList.add("collapsed");
      sidebar.classList.remove("sidebar-open");
      dashboardLayout?.classList.add("sidebar-collapsed");
      sidebarOpenBtn.setAttribute("aria-expanded", "false");
      localStorage.setItem(SIDEBAR_STATE_KEY, "true");
      sidebarOpenBtn.focus();
    }
  });

  // New Chat Buttons
  newChatBtn.addEventListener("click", () => {
    const s = createNewSession();
    syncContextPill(s.courseId, s.topicId);
    chatTextarea.focus();
  });

  topNewChatBtn.addEventListener("click", () => {
    const s = createNewSession();
    syncContextPill(s.courseId, s.topicId);
    chatTextarea.focus();
  });

  // Sidebar course quick filter chips
  sidebarCoursePills
    .querySelectorAll(".sidebar-course-chip")
    .forEach((chip) => {
      chip.addEventListener("click", () => {
        const course = chip.dataset.course;
        const session = getActiveSession();
        session.courseId = course;
        session.topicId = "ALL";
        syncContextPill(course, "ALL");
        saveSessions();
      });
    });

  // Top Bar Context Menu Toggle
  modelPillBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = contextMenu.classList.toggle("hidden") === false;
    modelPillBtn.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", (e) => {
    if (!contextMenu.contains(e.target) && !modelPillBtn.contains(e.target)) {
      contextMenu.classList.add("hidden");
      modelPillBtn.setAttribute("aria-expanded", "false");
    }
  });

  // Context Dropdown changes
  modalCourseSelect.addEventListener("change", (e) => {
    const course = e.target.value;
    const session = getActiveSession();
    session.courseId = course;
    session.topicId = "ALL";
    syncContextPill(course, "ALL");
    saveSessions();
  });

  modalTopicSelect.addEventListener("change", (e) => {
    const topic = e.target.value;
    const session = getActiveSession();
    session.topicId = topic;
    syncContextPill(session.courseId, topic);
    saveSessions();
  });

  // Textarea input events
  chatTextarea.addEventListener("input", () => {
    chatTextarea.style.height = "auto";
    chatTextarea.style.height = Math.min(chatTextarea.scrollHeight, 180) + "px";
    updateSendButtonState();
  });

  chatTextarea.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  });

  // Send / Stop button click
  sendBtn.addEventListener("click", () => {
    if (isGenerating) {
      stopRequested = true;
    } else {
      handleSendMessage();
    }
  });

  // Gemini-style suggestion cards click
  document.querySelectorAll(".gemini-suggestion-card").forEach((card) => {
    card.addEventListener("click", () => {
      const prompt = card.getAttribute("data-prompt");
      handleSendMessage(prompt);
    });
  });

  // Quick Prompt Chips Bar
  document.querySelectorAll(".sf-quick-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      const prompt = chip.dataset.prompt;
      if (prompt) {
        handleSendMessage(prompt);
      }
    });
  });

  // Hero Subject Chips (Quick Course Switcher)
  document.querySelectorAll(".sf-hero-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      const course = chip.dataset.course;
      document
        .querySelectorAll(".sf-hero-chip")
        .forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      const session = getActiveSession();
      session.courseId = course;
      session.topicId = "ALL";
      syncContextPill(course, "ALL");
      saveSessions();
    });
  });

  capsuleToolBtn.addEventListener("click", () => {
    quickToolsMenu.classList.toggle("hidden");
  });

  quickToolsMenu.querySelectorAll(".quick-tool-item").forEach((item) => {
    item.addEventListener("click", () => {
      quickToolsMenu.classList.add("hidden");

      if (item.dataset.tool === "upload") {
        chatFileInput.click();
        return;
      }

      const prompt = item.dataset.prompt;
      if (prompt) {
        chatTextarea.value = prompt;
        chatTextarea.style.height = "auto";
        chatTextarea.style.height =
          Math.min(chatTextarea.scrollHeight, 180) + "px";
        updateSendButtonState();
        chatTextarea.focus();
      }
    });
  });

  document.addEventListener("click", (e) => {
    if (
      !quickToolsMenu.contains(e.target) &&
      !capsuleToolBtn.contains(e.target)
    ) {
      quickToolsMenu.classList.add("hidden");
    }
  });

  chatFileInput.addEventListener("change", async (e) => {
    await addPendingFiles(e.target.files);
    chatFileInput.value = "";
  });

  ["dragenter", "dragover"].forEach((eventName) => {
    document.addEventListener(eventName, (e) => {
      e.preventDefault();
      document.body.classList.add("dragging-file");
    });
  });

  ["dragleave", "drop"].forEach((eventName) => {
    document.addEventListener(eventName, (e) => {
      e.preventDefault();
      document.body.classList.remove("dragging-file");
    });
  });

  document.addEventListener("drop", async (e) => {
    await addPendingFiles(e.dataTransfer.files);
  });

  // Export Chat
  if (exportChatBtn) {
    exportChatBtn.addEventListener("click", exportConversationToMarkdown);
  }

  // Pre-load prompt from other pages (Glossary / Dashboard / Topic / Course)
  const autoPrompt = localStorage.getItem("studyflow_auto_prompt");
  if (autoPrompt) {
    localStorage.removeItem("studyflow_auto_prompt");
    chatTextarea.value = autoPrompt;
    chatTextarea.style.height = "auto";
    chatTextarea.style.height = Math.min(chatTextarea.scrollHeight, 180) + "px";
    updateSendButtonState();
    chatTextarea.focus();
    showToast("Prompt loaded! Press Send or edit.", "info");
  }

  // Global command palette
  initCommandPalette();
}

function exportConversationToMarkdown() {
  const session = getActiveSession();
  if (!session || !session.messages || session.messages.length === 0) {
    showToast("No messages in this session to export yet!", "info");
    return;
  }

  const courseTitle =
    session.courseId !== "ALL"
      ? getCourseById(session.courseId)?.title || session.courseId
      : "General Assistant";
  const dateStr = new Date().toLocaleString();

  let md = `# StudyFlow AI - Study Session Notes\n\n`;
  md += `**Course:** ${courseTitle} (${session.courseId || "ALL"})\n\n`;
  if (session.topicId && session.topicId !== "ALL") {
    md += `**Topic Focus:** ${session.topicId}\n\n`;
  }
  md += `**Date:** ${dateStr}\n\n`;
  md += `---\n\n`;

  session.messages.forEach((msg) => {
    const roleTitle =
      msg.role === "user"
        ? "### 👤 Student Question"
        : "### ✦ StudyFlow AI Tutor";
    md += `${roleTitle}\n\n${msg.content}\n\n---\n\n`;
  });

  const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  const safeTitle = (session.title || "study_session")
    .replace(/[^a-z0-9_-]/gi, "_")
    .toLowerCase();
  a.download = `StudyFlow_${session.courseId || "Chat"}_${safeTitle}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast("Exported session notes to Markdown! 📥", "success");
}

document.addEventListener("DOMContentLoaded", init);

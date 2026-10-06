require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const path = require("path");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = process.env.PORT || 3001;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "https:", "'unsafe-inline'"],
        fontSrc: ["'self'", "https:", "data:"],
        imgSrc: ["'self'", "data:", "blob:"],
        connectSrc: ["'self'"],
      },
    },
  }),
);
app.use(
  rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 60, // limit each IP to 60 requests per minute
    message: { error: "Too many requests, please try again later." },
  }),
);
const allowedOrigins = new Set([
  `http://localhost:${PORT}`,
  `http://127.0.0.1:${PORT}`,
]);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
  }),
);
app.use(express.json({ limit: "10mb" }));

// Route root directly to the loader splash screen
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "loader.html"));
});

app.use(express.static(path.join(__dirname))); // Serve all static files (HTML, CSS, JS)

// ─── Validate API key at startup ─────────────────────────────────────────────
const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY;
if (!NVIDIA_API_KEY) {
  console.error(
    "❌  NVIDIA_API_KEY is missing from .env. Server will not function.",
  );
  process.exit(1);
}

const NVIDIA_BASE =
  process.env.DEEPSEEK_ENDPOINT || "https://integrate.api.nvidia.com/v1";
const CHAT_ENDPOINT = `${NVIDIA_BASE.replace(/\/$/, "")}/chat/completions`;
const MODEL_NAME = process.env.MODEL_NAME || "google/gemma-4-31b-it";
const MODEL_FALLBACKS = (process.env.MODEL_FALLBACKS || "meta/llama-3.1-8b-instruct")
  .split(",")
  .map((model) => model.trim())
  .filter(Boolean);
const MODEL_CANDIDATES = Array.from(
  new Set([MODEL_NAME, "google/gemma-4-31b-it", ...MODEL_FALLBACKS]),
);
const REQUEST_TIMEOUT_MS = Number(process.env.REQUEST_TIMEOUT_MS || 120000);
const ENABLE_THINKING = process.env.ENABLE_THINKING === "true";
const MAX_IMAGE_BYTES = 4 * 1024 * 1024;
const MAX_TEXT_CHARS = 160000;

function extractAiText(payload) {
  if (payload?.choices?.[0]?.message?.content) {
    return payload.choices[0].message.content;
  }

  if (payload?.output_text) {
    return payload.output_text;
  }

  if (Array.isArray(payload?.output)) {
    return payload.output
      .flatMap((item) => item.content || [])
      .map((part) => part.text || part.content || "")
      .filter(Boolean)
      .join("\n");
  }

  return "";
}

function asChatCompletion(payload, modelName) {
  const content = extractAiText(payload);
  if (!content) return null;

  return {
    id: payload.id || `studyflow-${Date.now()}`,
    object: "chat.completion",
    created: payload.created || Math.floor(Date.now() / 1000),
    model: payload.model || modelName,
    choices: [
      {
        index: 0,
        message: { role: "assistant", content },
        finish_reason: payload.choices?.[0]?.finish_reason || "stop",
      },
    ],
    usage: payload.usage,
  };
}

function modelSupportsImages(modelName) {
  return /vision|vlm|vila|neva|fuyu|kosmos|deplot|phi-3-vision/i.test(modelName);
}

function buildMessagesForNvidia(messages, attachments = [], includeImages = true) {
  if (!attachments.length) return messages;

  const safeMessages = messages.map((message) => ({ ...message }));
  const lastUserMessage = [...safeMessages].reverse().find((message) => message.role === "user");
  if (!lastUserMessage) return safeMessages;

  const textAttachments = [];
  const contentParts = [
    {
      type: "text",
      text:
        typeof lastUserMessage.content === "string"
          ? lastUserMessage.content
          : "",
    },
  ];

  for (const file of attachments) {
    if (!file || typeof file !== "object") continue;

    if (file.kind === "text" && typeof file.text === "string") {
      textAttachments.push(
        `\n\n--- Uploaded file: ${file.name || "text file"} ---\n${file.text.slice(0, MAX_TEXT_CHARS)}`,
      );
      continue;
    }

    if (
      includeImages &&
      file.kind === "image" &&
      typeof file.dataUrl === "string" &&
      file.dataUrl.startsWith("data:image/")
    ) {
      const approxBytes = Math.ceil((file.dataUrl.length * 3) / 4);
      if (approxBytes <= MAX_IMAGE_BYTES + 2048) {
        contentParts.push({
          type: "image_url",
          image_url: { url: file.dataUrl },
        });
      }
      continue;
    }

    if (file.kind === "image") {
      textAttachments.push(
        `\n\n--- Uploaded image: ${file.name || "image file"} ---\nImage content requires a vision-capable model.`,
      );
    }
  }

  if (textAttachments.length) {
    contentParts[0].text += textAttachments.join("");
  }

  lastUserMessage.content = contentParts.length > 1 ? contentParts : contentParts[0].text;
  return safeMessages;
}

// ─── /api/chat ────────────────────────────────────────────────────────────────
// Proxy all AI chat requests securely through the server.
// Body: { messages: [...], max_tokens?: number }
app.post("/api/chat", async (req, res) => {
  const { messages, max_tokens = 4096, attachments = [] } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "messages array is required" });
  }

  if (!Array.isArray(attachments)) {
    return res.status(400).json({ error: "attachments must be an array" });
  }

  let lastError = null;

  for (const modelName of MODEL_CANDIDATES) {
    const nvidiaMessages = buildMessagesForNvidia(
      messages,
      attachments,
      modelSupportsImages(modelName),
    );
    try {
      const primaryBody = {
        model: modelName,
        messages: nvidiaMessages,
        chat_template_kwargs: { enable_thinking: ENABLE_THINKING },
        temperature: 0.6,
        top_p: 0.7,
        max_tokens,
        stream: false,
      };

      console.log("Outgoing NVIDIA request:", {
        url: CHAT_ENDPOINT,
        method: "POST",
        model: modelName,
        messageCount: nvidiaMessages.length,
        attachmentCount: attachments.length,
        max_tokens,
      });

      const response = await fetch(CHAT_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${NVIDIA_API_KEY}`,
        },
        body: JSON.stringify(primaryBody),
        timeout: REQUEST_TIMEOUT_MS,
      });

      const responseText = await response.text();

      if (response.ok) {
        try {
          const parsed = JSON.parse(responseText);
          return res.json(asChatCompletion(parsed, modelName) || parsed);
        } catch (e) {
          return res.send(responseText);
        }
      }

      lastError = {
        status: response.status,
        body: responseText,
        model: modelName,
      };
      console.error(
        `NVIDIA API Error ${response.status} for model ${modelName}:`,
        responseText,
      );

      if (response.status === 401 || response.status === 403) break;
    } catch (err) {
      console.error("Proxy fetch error for model:", modelName, err.message);
      lastError = { status: 500, body: err.message, model: modelName };
    }
  }

  return res.status(lastError?.status || 500).json({
    error: "NVIDIA request failed for all configured model IDs",
    details: lastError,
    tried: MODEL_CANDIDATES,
  });
});

// ─── /api/health ─────────────────────────────────────────────────────────────
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    model: MODEL_NAME,
    fallbacks: MODEL_FALLBACKS,
    base: NVIDIA_BASE,
    chatEndpoint: CHAT_ENDPOINT,
    apiKeyConfigured: Boolean(NVIDIA_API_KEY),
    thinkingEnabled: ENABLE_THINKING,
  });
});

// ─── /api/config ─────────────────────────────────────────────────────────────
app.get("/api/config", (_req, res) => {
  res.json({ model: MODEL_NAME });
});
// ─── /api/admin/test ─────────────────────────────────────────────────────────
// Run simple probes against configured endpoints and a list of candidate models.
app.post("/api/admin/test", async (req, res) => {
  const { models, base } = req.body || {};
  const baseUrl = (base || NVIDIA_BASE).replace(/\/$/, "");
  const candidates =
    Array.isArray(models) && models.length
      ? models
      : MODEL_CANDIDATES;

  const results = [];

  for (const m of candidates) {
    const entry = { model: m, probes: [] };

    // chat/completions probe
    try {
      const url = `${baseUrl}/chat/completions`;
      const body = {
        model: m,
        messages: [{ role: "user", content: "ping from admin tester" }],
      };
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${NVIDIA_API_KEY}`,
        },
        body: JSON.stringify(body),
      });
      const text = await resp.text();
      entry.probes.push({
        endpoint: "chat/completions",
        url,
        status: resp.status,
        body: text.slice(0, 2000),
      });
    } catch (err) {
      entry.probes.push({ endpoint: "chat/completions", error: err.message });
    }

    results.push(entry);
  }

  res.json({ base: baseUrl, results });
});

// No generic catch‑all needed – static middleware serves all files.
// Direct navigation (e.g., /pages/topic.html) works because express.static serves them.

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log("");
  console.log("  ███████╗████████╗██╗   ██╗██████╗ ██╗   ██╗");
  console.log("  ██╔════╝╚══██╔══╝██║   ██║██╔══██╗╚██╗ ██╔╝");
  console.log("  ███████╗   ██║   ██║   ██║██║  ██║ ╚████╔╝ ");
  console.log("  ╚════██║   ██║   ██║   ██║██║  ██║  ╚██╔╝  ");
  console.log("  ███████║   ██║   ╚██████╔╝██████╔╝   ██║   ");
  console.log("  ╚══════╝   ╚═╝    ╚═════╝ ╚═════╝    ╚═╝   ");
  console.log("");
  console.log(`  ✅  StudyFlow server running at http://localhost:${PORT}`);
  console.log(`  🤖  AI Model   : ${MODEL_NAME}`);
  console.log(`  🔑  API Key    : ${NVIDIA_API_KEY.slice(0, 14)}...`);
  console.log(`  📂  Serving    : ${__dirname}`);
  console.log("");
});

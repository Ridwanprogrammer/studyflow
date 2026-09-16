// StudyFlow Configuration
// The browser talks to our LOCAL Node.js proxy server (server.js).
// The server securely reads .env and forwards requests to NVIDIA — no CORS issues.
export const CONFIG = {
  API_BASE:
    window.location.protocol === "http:" || window.location.protocol === "https:"
      ? window.location.origin
      : "http://localhost:3001",
};

CONFIG.CHAT_ENDPOINT = `${CONFIG.API_BASE}/api/chat`;
CONFIG.HEALTH_ENDPOINT = `${CONFIG.API_BASE}/api/health`;

// Load safe config (model name) from server at runtime
export const CONFIG_READY = fetch(`${CONFIG.API_BASE}/api/config`)
  .then((r) => r.json())
  .then((data) => {
    CONFIG.MODEL_NAME = data.model;
    return CONFIG;
  })
  .catch((e) => {
    console.error("Failed to load config", e);
  });

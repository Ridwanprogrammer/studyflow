async function requestAi(messages, attachments = []) {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, attachments }),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || "The AI request failed.");
  }

  const content = payload.choices?.[0]?.message?.content;
  if (!content) throw new Error("The AI returned an empty response.");
  return content;
}

export function generateTopicNotes(courseTitle, topicTitle) {
  return requestAi([
    {
      role: "system",
      content:
        "Create clear, accurate study notes for a university student. Use headings, examples, and revision questions.",
    },
    {
      role: "user",
      content: `Generate comprehensive study notes for the course ${courseTitle}, topic ${topicTitle}.`,
    },
  ]);
}

export function sendChatMessage(
  courseTitle,
  topicTitle,
  topicNotes,
  chatHistory,
  userMessage,
) {
  return requestAi([
    {
      role: "system",
      content: `You are a helpful study tutor. Course: ${courseTitle}. Topic: ${topicTitle}.\n\nReference notes:\n${topicNotes}`,
    },
    ...chatHistory,
    { role: "user", content: userMessage },
  ]);
}

export function analyzePdfContent(
  courseTitle,
  topicTitle,
  topicNotes,
  studyHistory,
  preferences,
) {
  return requestAi([
    {
      role: "system",
      content:
        "Create a concise personalized study report in Markdown. Include strengths, gaps, and a practical next-step plan.",
    },
    {
      role: "user",
      content: `Course: ${courseTitle}\nTopic: ${topicTitle}\nNotes: ${topicNotes}\nStudy history: ${JSON.stringify(studyHistory)}\nPreferences: ${JSON.stringify(preferences)}`,
    },
  ]);
}

export function sendGlobalChatMessage({
  courseTitle,
  topicTitle,
  topicNotes,
  chatHistory,
  userMessage,
  attachments = [],
}) {
  return requestAi(
    [
      {
        role: "system",
        content: `You are StudyFlow's study assistant. Course: ${courseTitle || "All courses"}. Topic: ${topicTitle || "General study"}.\n\nReference notes:\n${topicNotes || "No topic selected."}`,
      },
      ...chatHistory,
      { role: "user", content: userMessage },
    ],
    attachments,
  );
}

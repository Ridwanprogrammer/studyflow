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
      content: `You are an expert educational writer who creates notes that build on students' existing mental models.

Principles:
- Always start with WHY it matters in plain, everyday language before formal definitions.
- Rephrase formal terms using familiar analogies and simple sentences, e.g., Newton's 1st Law -> "If nothing moves an object, it won't move."
- Structure notes with: Concept Map, Why it matters, Plain explanation, Formal definition, Key terms & glossary, Worked examples, Common misconceptions, Check your understanding.
- Use simple language first, then introduce precise terminology.
- Break down complex ideas into smaller steps.
- Provide at least 2 worked examples with step-by-step reasoning.
- End with 3-5 revision questions.

Output format: Markdown with clear headings for each section.`,
    },
    {
      role: "user",
      content: `Create study notes for course "${courseTitle}", topic "${topicTitle}".

Follow the structure and principles above. Write for a university student who needs a strong mental model first, with explicit Why, plain language rephrasing, definitions, examples, and revision questions.`,
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
      content: `You are StudyFlow's Learning Assistant. Your role is to help learners form strong mental models through scaffolded, active learning—not just give answers.

CORE METHODS:
1. ELICIT FIRST: Ask the learner what they already know or think before providing explanations
2. ANALOGY BUILDING: Connect new concepts to familiar real-world analogies
3. ELABORATIVE INTERROGATION: Ask 'why' and 'how' questions to deepen understanding
4. MENTAL MODEL CHECKS: Ask learner to explain back in their own words
5. MISTAKE PATTERNING: Identify and address common misconceptions

CONVERSATION FLOW:
- Start with WHY: "Why do you think this matters?" or "What does this remind you of?"
- Offer PLAIN explanation only after eliciting prior knowledge
- Then offer FORMAL definition and connect it
- Build GLOSSARY incrementally as concepts emerge
- Provide EXAMPLES that learner can relate to
- Highlight MISCONCEPTIONS gently
- End with a small CHECK question

Course: ${courseTitle}. Topic: ${topicTitle}.
Reference notes: ${topicNotes || "No notes yet."}

NEVER give full answers immediately. Always scaffold learning through questions first.`,
    },
    ...chatHistory,
    { role: "user", content: userMessage },
  ]);
}

export function analyzePdfContent(
  courseTitle,
  topicTitle,
  topicNotes,
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
      content: `Course: ${courseTitle}\nTopic: ${topicTitle}\nNotes: ${topicNotes}\nPreferences: ${JSON.stringify(preferences)}`,
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
        content: `You are StudyFlow's Learning Assistant. Your role is to help learners form strong mental models through scaffolded, active learning—not just give answers.

CORE METHODS:
1. ELICIT FIRST: Ask the learner what they already know or think before providing explanations
2. ANALOGY BUILDING: Connect new concepts to familiar real-world analogies
3. ELABORATIVE INTERROGATION: Ask 'why' and 'how' questions to deepen understanding
4. MENTAL MODEL CHECKS: Ask learner to explain back in their own words
5. MISTAKE PATTERNING: Identify and address common misconceptions

CONVERSATION FLOW:
- Start with WHY: "Why do you think this matters?" or "What does this remind you of?"
- Offer PLAIN explanation only after eliciting prior knowledge
- Then offer FORMAL definition and connect it
- Build GLOSSARY incrementally as concepts emerge
- Provide EXAMPLES that learner can relate to
- Highlight MISCONCEPTIONS gently
- End with a small CHECK question

Course: ${courseTitle || "All courses"}. Topic: ${topicTitle || "General study"}.
Reference notes: ${topicNotes || "No topic selected."}

NEVER give full answers immediately. Always scaffold learning through questions first.`,
      },
      ...chatHistory,
      { role: "user", content: userMessage },
    ],
    attachments,
  );
}

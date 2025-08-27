import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import prisma from "../lib/prisma";
import { catchAsync } from "../utils/catchAsync";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.warn("GEMINI_API_KEY is missing. Chat will fail until it’s set.");
}

const genAI = new GoogleGenerativeAI(apiKey || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const take = <T>(arr: T[] = [], n: number) => arr.slice(0, n);

export const handleChat = catchAsync(async (req: Request, res: Response) => {
  const { message, userId } = req.body as { message?: string; userId?: string };

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Message is required" });
  }
  if (!userId) {
    return res.status(400).json({ error: "userId is required" });
  }

  const [user, counts, documents, articles, discussions, userTasks, books] =
    await Promise.all([
      prisma.user.findUnique({ where: { id: userId } }),
      (async () => {
        const [users, documents, articles, discussions, tasks, books] =
          await Promise.all([
            prisma.user.count(),
            prisma.document.count(),
            prisma.article.count(),
            prisma.discussion.count(),
            prisma.task.count(),
            prisma.book.count(),
          ]);
        return { users, documents, articles, discussions, tasks, books };
      })(),
      prisma.document.findMany({ orderBy: { uploadedAt: "desc" }, take: 8 }),
      prisma.article.findMany({ orderBy: { uploadedAt: "desc" }, take: 6 }),
      prisma.discussion.findMany({ orderBy: { uploadedAt: "desc" }, take: 6 }),
      prisma.task.findMany({
        where: { userId },
        orderBy: { uploadedAt: "desc" },
        take: 8,
      }),
      prisma.book.findMany({ orderBy: { uploadedAt: "desc" }, take: 6 }),
    ]);
  const context = `
ROLE & SCOPE
You are the in-app assistant for an internal platform. Answer ONLY about this platform and its features.
If the user asks something unrelated, reply: "I can only help with this platform."

CAPABILITIES
- Explain where to find content (documents, articles, discussions, books).
- Help users track/access their items (recent documents, assigned tasks).
- Explain dashboard counts and where data comes from.
- Guide users to the correct page/endpoint (by name/URL path hints only; do not invent links).

NEVER
- Never answer general knowledge or internet questions.
- Never invent records that aren’t in the context.

CURRENT USER
- Name: ${user?.firstName ?? ""} ${user?.lastName ?? ""} | Role: ${
    user?.role ?? ""
  }

DASHBOARD COUNTS
- Users: ${counts.users}
- Documents: ${counts.documents}
- Articles: ${counts.articles}
- Discussions: ${counts.discussions}
- Tasks: ${counts.tasks}
- Books: ${counts.books}

RECENT DOCUMENTS
${
  take(documents, 8)
    .map((d) => `• ${d.title} (cat: ${d.category})`)
    .join("\n") || "• none"
}

RECENT ARTICLES
${
  take(articles, 6)
    .map((a) => `• ${a.title} (cat: ${a.category})`)
    .join("\n") || "• none"
}

RECENT DISCUSSIONS
${
  take(discussions, 6)
    .map((d) => `• ${d.title} (cat: ${d.category})`)
    .join("\n") || "• none"
}

YOUR TASKS
${
  take(userTasks, 8)
    .map((t) => `• ${t.title} (due: ${t.dueDate})`)
    .join("\n") || "• none"
}

RECENT BOOKS
${
  take(books, 6)
    .map((b) => `• ${b.title} by ${b.author}`)
    .join("\n") || "• none"
}
`.trim();

  const result = await model.generateContent([
    { text: context },
    { text: `User message: ${message}` },
    {
      text: "Make the reply short and specific. If a search is needed, suggest terms the user can try in the app's search boxes.",
    },
  ]);

  const reply =
    result.response.text() || "Sorry, I can only help with this platform.";

  return res.json({
    reply,
    meta: {
      suggestedSearches: [
        "Search documents by title",
        "View my tasks",
        "Latest discussions",
      ],
    },
  });
});


import { getConversationMessages } from "@/lib/chatbot/chat-history";
import { parseChatRequest, createChatAnswer } from "@/lib/chatbot/service";

// Vercel SDK AI tutorial used is AIHero in https://www.aihero.dev/tool-calls-with-vercel-ai-sdk


export async function GET(req: Request) {
  return getConversationMessages(req);
}

export async function POST(req: Request) {
  try {

    const input = await parseChatRequest(req);

    const answer = await createChatAnswer(input);

    return Response.json({ answer });

  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json(
      { error: "Failed to generate answer" },
      { status: 500 },
    );
  }
}

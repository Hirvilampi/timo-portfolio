import { embed, generateText, embedMany } from "ai";
import { openai } from "@ai-sdk/openai";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { matchDocumentChunksFin } from "@/lib/chatbot/rag";
import { chatPrompt } from "@/lib/chatbot/prompts";
import { ChatMessage } from "@/types/embedding-types";

const supabaseAdmin = getSupabaseAdmin();

const model = openai("gpt-4o-mini-2024-07-18");
// const model = openai("gpt-4.1-2025-04-14");

const embeddingModel = openai.embedding("text-embedding-3-small");

export type ParseChatRequestResult = {
  conversationId: string;
  latestUserMessage: ChatMessage;
};

export async function parseChatRequest(
  req: Request,
): Promise<ParseChatRequestResult> {
  const { conversationId, messages } = await req.json();

  // tarkastetaan, että conversationId ja messages on olemassa
  if (!conversationId || typeof conversationId !== "string") {
    throw new Error("Conversation ID is required");
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    throw new Error("Messages are required");
  }

  const latestUserMessage = messages[messages.length - 1];

  console.log("LATEST MESSAGE ", latestUserMessage);

  if (
    !latestUserMessage ||
    latestUserMessage.role !== "user" ||
    typeof latestUserMessage.content !== "string"
  ) {
    throw new Error("Latest message must be a user message");
  }


  return { conversationId, latestUserMessage };
}

export async function createChatAnswer(
  input: ParseChatRequestResult,
): Promise<string> {
  const { conversationId, latestUserMessage } = input;

   const { error: conversationError } = await supabaseAdmin
    .from("conversations")
    .upsert({ id: conversationId });

  if (conversationError) {
    throw conversationError;
  }

  const { error: userMessageError } = await supabaseAdmin
    .from("messages")
    .insert({
      conversation_id: conversationId,
      role: "user",
      content: latestUserMessage.content,
    });

  if (userMessageError) {
    throw userMessageError;
  }

  // haetaan supabasesta historia, vain viimeiset 20 vastausta ja kysymystä
  const { data: storedMessages, error: storedMessagesError } =
    await supabaseAdmin
      .from("messages")
      .select("role, content")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: false })
      .limit(20);

  if (storedMessagesError) {
    throw storedMessagesError;
  }

  // muutetaan messaget oikeaan muotoon
  const modelMessages = (storedMessages ?? []).reverse().map((message) => ({
    role: message.role,
    content: message.content,
  }));

  // tähän vektorien avulla query phase, eli haetaan kontekstia kysymykselle tallenuista chunkeista

  // viimeinen viesti embeddingiin
  const { embedding } = await embed({
    model: embeddingModel,
    value: latestUserMessage.content,
  });

  // create ragContext
  // käyttäen document_chunks_fin
  const ragContext = await matchDocumentChunksFin({
    queryEmbedding: embedding,
    matchThreshold: 0.4,
    matchCount: 20,
  });


  // käyttäen document_chunks
  // const ragContext = await matchDocumentChunks({
  //   queryEmbedding: embedding,
  //   matchThreshold: 0.4,
  //   matchCount: 10,
  // });

  // käyttäen match_document_chunks_big_fin
  // const ragContext = await matchDocumentChunksBigFin({
  //   queryEmbedding: embedding,
  //   matchThreshold: 0.30,
  //   matchCount: 20,
  // });

  // send question with history and guardrails
  const { text } = await generateText({
    model,
    messages: modelMessages,
    system: chatPrompt(ragContext),
  });

  const { error: assistantMessageError } = await supabaseAdmin
    .from("messages")
    .insert({
      conversation_id: conversationId,
      role: "assistant",
      content: text,
    });

  if (assistantMessageError) {
    throw assistantMessageError;
  }

  return text;
}

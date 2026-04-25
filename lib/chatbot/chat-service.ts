

import { getSupabaseAdmin } from "@/lib/supabase-admin";

const supabaseAdmin = getSupabaseAdmin();

export async function getConversationMessages(req: Request){
      const { searchParams } = new URL(req.url);
  const conversationId = searchParams.get("conversationId");

  if (!conversationId) {
    return Response.json(
      { error: "Conversation id is required" },
      { status: 400 },
    );
  }

  const { data, error } = await supabaseAdmin
    .from("messages")
    .select("role, content")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });

  if (error) {
    return Response.json({ error: "Failed to load messages" }, { status: 500 });
  }

  return Response.json({ messages: data ?? [] });

}


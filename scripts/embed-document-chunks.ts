import dotenv from "dotenv";
dotenv.config({path: ".env.local"});

import { embedMany } from "ai";
import { openai } from "@ai-sdk/openai";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

type DocumentChunk = {
  id : number;
  document_id: string | null;
  content: string;
  metadata: {
    title: string;
    category: string;
    source: string;
    visibility: "public" | "private";
    language: string;
    sensitivity?: string;
  } | null;
  embedding?: number[] | null;
};

const embeddingModel = openai.embedding("text-embedding-3-small");


export async function embedDocumentChunks() {
  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
  .from("document_chunks")
  .select("id, document_id, content, metadata, embedding")
  .is("embedding", null);

  if (error) {
    console.log("Got error on loading data");
    throw error;
  }
  
  const documents = (data as DocumentChunk[]).filter(
    (row) => row.content && row.metadata?.visibility === "public"
  );

  if (documents.length === 0) {
    console.log("No document chunks without embeddings.");
    return;
  }

  const {embeddings} = await embedMany({
    model: embeddingModel,
    values: documents.map((doc) => doc.content),
  })

  for (const [index, doc] of documents.entries()) {
    const { error: updateError } = await supabaseAdmin
    .from("document_chunks")
    .update({ embedding: embeddings[index] })
    .eq("id", doc.id);

    if (updateError) throw updateError;
  }

  console.log(`Embedded ${documents.length} document chunks.`);


}

// for running the script from CLI
  embedDocumentChunks().catch((error) => {
  console.error("Embedding failed:", error);
  process.exit(1);
});
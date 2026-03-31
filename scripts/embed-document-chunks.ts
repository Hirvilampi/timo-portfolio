import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { embedMany } from "ai";
import { openai } from "@ai-sdk/openai";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

type DocumentChunk = {
  id: number;
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

type ChunkVisibility = "public" | "private" | string;
type ChunkConfidence = "high" | "medium" | "low";
type ChunkLanguage = "fi" | "en" | "sv" | string;

export type DocumentChunkBigMetadata = {
  source: string;
  source_type?: string;
  visibility?: ChunkVisibility;
  audience?: string;
  confidence?: ChunkConfidence;
  updated_at?: string;
};

export type DocumentChunkBig = {
  id: string;
  document_id: string;
  chunk_index: number;

  title: string;
  category: string;
  language: ChunkLanguage;

  content_original: string;
  content_display: string;
  content_search: string;

  keywords: string[];
  entities: string[];

  metadata: DocumentChunkBigMetadata;

  created_at?: string;
  embedding?: number[] | null;
};

type ChunkForEmbedding = Pick<
  DocumentChunkBig,
  "id" | "content_search" | "metadata"
>;

const embeddingModel = openai.embedding("text-embedding-3-small");

export async function embedDocumentChunksBig() {
  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from("document_chunks_big_fin")
    .select(
      "id,content_search, metadata",
    )
    .is("embedding", null);

  if (error) {
    console.log("Got error on loading data");
    throw error;
  }

  const documents = (data as ChunkForEmbedding[]).filter(
    (row) => row.content_search && row.metadata?.visibility === "public",
  );

  if (documents.length === 0) {
    console.log("No document chunks without embeddings.");
    return;
  }

  const { embeddings } = await embedMany({
    model: embeddingModel,
    values: documents.map((doc) => doc.content_search),
  });

  for (const [index, doc] of documents.entries()) {
    const embedding = embeddings[index];
    if (!embedding) continue;

    const { error: updateError } = await supabaseAdmin
      .from("document_chunks_big_fin")
      .update({ embedding: embeddings[index] })
      .eq("id", doc.id);

    if (updateError) throw updateError;
  }

  console.log(`Embedded ${documents.length} document chunks.`);
}

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
    (row) => row.content && row.metadata?.visibility === "public",
  );

  if (documents.length === 0) {
    console.log("No document chunks without embeddings.");
    return;
  }

  const { embeddings } = await embedMany({
    model: embeddingModel,
    values: documents.map((doc) => doc.content),
  });

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
async function main() {
  console.log("Starting embedDocumentChunks...");
  await embedDocumentChunks();

  console.log("Starting embedDocumentChunksBig...");
  await embedDocumentChunksBig();

  console.log("All embeddings completed.");
}

main().catch((error) => {
  console.error("Embedding failed:", error);
  process.exit(1);
});

// embedDocumentChunks().catch((error) => {
//   console.error("Embedding failed:", error);
//   process.exit(1);
// });

// embedDocumentChunksBig().catch((error) => {
//   console.error("Embedding failed:", error);
//   process.exit(1);
// })

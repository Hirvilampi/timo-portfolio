import { openai } from "@ai-sdk/openai";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import type { 
  MatchDocumentChunksParams, 
  MatchDocumentChunksBigFinParams, 
  RagMatchBigFin } from "@/types/embedding-types.ts";

  const supabaseAdmin = getSupabaseAdmin();


const model = openai("gpt-4o-mini-2024-07-18");
// const model = openai("gpt-4.1-2025-04-14");

const embeddingModel = openai.embedding("text-embedding-3-small");

// Vercel SDK AI tutorial used is AIHero in https://www.aihero.dev/tool-calls-with-vercel-ai-sdk

export async function matchDocumentChunks({
  queryEmbedding,
  matchThreshold = 0.78,
  matchCount = 10,
}: MatchDocumentChunksParams) {
  // kutsutaan Supabasen funtkiota match_document_chunks
  const { data: ragMatches, error: ragError } = await supabaseAdmin.rpc(
    "match_document_chunks",
    {
      query_embedding: queryEmbedding,
      match_threshold: matchThreshold,
      match_count: matchCount,
    },
  );

  if (ragError) {
    throw ragError;
  }

  const ragContext = (ragMatches ?? [])
    .map((match: { content: string; document_id?: string }) => {
      return `Document: ${match.document_id ?? "unknown"}\n${match.content}`;
    })
    .join("\n\n---\n\n");

  console.log(
    "RAG matches:",
    (ragMatches ?? []).map(
      (match: {
        document_id: any;
        similarity?: number;
        content: string | any[];
      }) => ({
        document_id: match.document_id,
        similarity: match.similarity,
        contentPreview: match.content.slice(0, 120),
      }),
    ),
    "RAG count:",
    ragMatches.length,
  );

  return ragContext;
}

export async function matchDocumentChunksFin({
  queryEmbedding,
  matchThreshold = 0.78,
  matchCount = 10,
}: MatchDocumentChunksParams) {
  // kutsutaan Supabasen funtkiota match_document_chunks
  const { data: ragMatches, error: ragError } = await supabaseAdmin.rpc(
    "match_document_chunks_fin",
    {
      query_embedding: queryEmbedding,
      match_threshold: matchThreshold,
      match_count: matchCount,
    },
  );

  if (ragError) {
    throw ragError;
  }

  const ragContext = (ragMatches ?? [])
    .map((match: { content: string; document_id?: string }) => {
      return `Document: ${match.document_id ?? "unknown"}\n${match.content}`;
    })
    .join("\n\n---\n\n");

  console.log(
    "RAG matches:",
    (ragMatches ?? []).map(
      (match: {
        document_id: any;
        similarity?: number;
        content: string | any[];
      }) => ({
        document_id: match.document_id,
        similarity: match.similarity,
        contentPreview: match.content.slice(0, 120),
      }),
    ),
    "RAG count:",
    ragMatches.length,
  );

  return ragContext;
}

export async function matchDocumentChunksBigFin({
  queryEmbedding,
  matchThreshold = 0.78,
  matchCount = 10,
}: MatchDocumentChunksBigFinParams) {
  // kutsutaan Supabasen funtkiota match_document_chunks
  const { data: ragMatches, error: ragError } = await supabaseAdmin.rpc(
    "match_document_chunks_big_fin",
    {
      query_embedding: queryEmbedding,
      match_threshold: matchThreshold,
      match_count: matchCount,
    },
  );

  if (ragError) {
    throw ragError;
  }

  const matches = (ragMatches ?? []) as RagMatchBigFin[];

  const ragContext = matches
    .map((match) => {
      return [
           `Document: ${match.document_id ?? "unknown"}`,
           `Title: ${match.title}`,
           `Category: ${match.category}`,
           `Content: ${match.content_display}`,
      ].join("\n");
    })
    .join("\n\n---\n\n");

  console.log(
    "RAG matches:",
    matches.map((match) => ({
      document_id: match.document_id,
      title: match.title,
      category: match.category,
      similarity: match.similarity,
      contentPreview: match.content_display.slice(0, 120),
    })),
    "RAG count:",
    matches.length, 
    "Threshold:",matchThreshold,
  );

  return ragContext;
}
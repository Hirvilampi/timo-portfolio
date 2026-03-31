export type MatchDocumentChunksParams = {
  queryEmbedding: number[];
  matchThreshold?: number;
  matchCount?: number;
};

export type MatchDocumentChunksBigFinParams = {
  queryEmbedding: number[];
  matchThreshold?: number;
  matchCount?: number;
};

export type RagMatchBigFin = {
  id: string;
  document_id: string;
  chunk_index: number;
  title: string;
  category: string;
  language: string;
  content_original: string;
  content_display: string;
  content_search: string;
  keywords: string[];
  entities: string[];
  metadata: {
    source: string;
    source_type?: string;
    visibility?: string;
    audience?: string;
    confidence?: "high" | "medium" | "low";
    updated_at?: string;
  };
  similarity: number;
};
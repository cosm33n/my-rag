// src/lib/search.ts
import { cosineDistance, desc, gt, sql } from "drizzle-orm";
import { documentsTable } from "@/db/schema";
import db from "@/db";
import { generateEmbedding } from "@/lib/embeddings";

/**
 * Search for similar documents using Drizzle ORM with cosineDistance
 */
export async function searchDocuments(query: string, limit: number = 5, threshold: number = 0.5) {
  // Generate embedding for the search query
  const embedding = await generateEmbedding(query);

  // Calculate similarity using Drizzle's cosineDistance function
  // This creates a SQL expression for similarity calculation
  const similarity = sql<number>`1 - (${cosineDistance(documentsTable.embedding, embedding)})`;

  // Use Drizzle's query builder for the search
  const similarDocuments = await db
    .select({
      id: documentsTable.id,
      content: documentsTable.content,
      similarity,
    })
    .from(documentsTable)
    .where(gt(similarity, threshold))
    .orderBy(desc(similarity))
    .limit(limit);

  return similarDocuments;
}

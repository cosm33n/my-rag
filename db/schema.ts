import { pgTable, serial, text, vector, index } from "drizzle-orm/pg-core";

export const documentsTable = pgTable(
  "documents",
  {
    id: serial("id").primaryKey(),
    content: text("content").notNull(),
    embedding: vector("embedding", { dimensions: 1536 }), // text-embedding-3-small
  },
  (table) => [index("embeddingIndex").using("hnsw", table.embedding.op("vector_cosine_ops"))],
);

export type InsertDocument = typeof documentsTable.$inferInsert;
export type SelectDocument = typeof documentsTable.$inferSelect;

// src/lib/chunking.ts
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 300,
  chunkOverlap: 80,
  separators: ["\n", " "],
});

export async function chunkContent(content: string) {
  return await textSplitter.splitText(content.trim());
}

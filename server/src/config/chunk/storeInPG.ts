import { chunkData } from './chunkType'
import prisma from '../../DataBase/db';
export const storeInPostgreSQL = async (chunks: chunkData[]) => {
  try {
    // Use createMany for batch insert
    await prisma.documentChunk.createMany({
      data: chunks.map(chunk => ({
        chunkIndex: chunk.chunkIndex,
        text: chunk.text,
        qdrantId: chunk.qdrantId,
        tokenCount: chunk.tokenCount,
        metadata: chunk.metadata,
        fileId: chunk.fileId,
        conversationId: chunk.conversationId
      }))
    });

    console.log(`Stored ${chunks.length} chunks in PostgreSQL`);

  } catch (error) {
    console.error('Error storing in PostgreSQL:', error);
    throw error;
  }
};
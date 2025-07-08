import { QdrantClient } from '@qdrant/js-client-rest';
import { chunkData } from './chunkType'
import prisma from '../../DataBase/db';



// Ensure Qdrant collection exists
const ensureCollection = async (client: QdrantClient, collectionName: string) => {
  try {
    await client.getCollection(collectionName);
  } catch (error) {
    // Collection doesn't exist, create it
    await client.createCollection(collectionName, {
      vectors: {
        size: 1536, // Adjust based on your embedding model
        distance: 'Cosine'
      }
    });
  }
};

export const storeInQdrant = async (chunks: chunkData[], embeddings: number[][], conversationId: number) => {
  const client = new QdrantClient({ host: 'localhost', port: 6333 });
  const collectionName = `conversation_${conversationId}`;

  try {
    // Create collection if it doesn't exist
    await ensureCollection(client, collectionName);

    // Prepare points for Qdrant
    const points = chunks.map((chunk, index) => ({
      id: chunk.qdrantId,
      vector: embeddings[index],
      payload: {
        chunkIndex: chunk.chunkIndex,
        fileId: chunk.fileId,
        conversationId: chunk.conversationId,
        fileName: chunk.metadata.fileName,
        chunkText: chunk.text,
        tokenCount: chunk.tokenCount,
        metadata: chunk.metadata
      }
    }));

    // Upsert points to Qdrant
    await client.upsert(collectionName, {
      wait: true,
      points: points
    });

    console.log(`Stored ${points.length} vectors in Qdrant`);

  } catch (error) {
    console.error('Error storing in Qdrant:', error);
    throw error;
  }
};
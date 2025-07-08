// import { v4 as uuidv4 } from 'uuid';
// import { Document } from "@langchain/core/documents";
// import {calculateTokenCount} from '../tokenCount';
// import {File} from '@prisma/client'
// import {storeChunks} from './storeChunks'
// import { createVectorStore } from '../createVectorStore';
// import { QdrantClient } from "@qdrant/js-client-rest";
// import prisma from '../../DataBase/db';


// export const processFileToVectorStore = async (file: File, splitDocs: Document[]) => {
//   try {
//     const collectionName = `conversation_${file.conversationId}`;

//     // Step 1: Create vector store (simple approach)
//     const vectorStore = await createVectorStore(collectionName, splitDocs);

//     // Step 2: Get the points that were created
//     const qdrantClient = new QdrantClient({
//       url: process.env.QDRANT_URL,
//       apiKey: process.env.QDRANT_API_KEY,
//     });

//     const points = await qdrantClient.scroll(collectionName, {
//       limit: splitDocs.length,
//       with_payload: true
//     });

//     // Step 3: Store minimal info in PostgreSQL
//     const chunks = points.result.points.map((point, index:number) => ({
//       chunkIndex: index,
//       text: splitDocs[index].pageContent,
//       qdrantId: point.id.toString(),
//       tokenCount: calculateTokenCount(splitDocs[index].pageContent),
//       metadata: splitDocs[index].metadata,
//       fileId: file.id,
//       conversationId: file.conversationId
//     }));

//     await prisma.documentChunk.createMany({
//       data: chunks
//     });

//     return { vectorStore, chunks };

//   } catch (error) {
//     console.error('Error processing file:', error);
//     throw error;
//   }
// };



// export const processChunks = async (file: File , splitDocs: Document[]) => {
//   try {
//     // Step 1: Load and split file
//     // const splitDocs = await load_Split_File(file.downloadUrl);

//     // Step 2: Create chunks with metadata
//     const chunks = [];

//     for (let i = 0; i < splitDocs.length; i++) {
//       const doc = splitDocs[i]; // each split docs
//       const chunkId = uuidv4(); // Generate unique ID for Qdrant

//       const chunkData = {
//         chunkIndex: i,
//         text: doc.pageContent || '',
//         qdrantId: chunkId,
//         tokenCount: calculateTokenCount(doc.pageContent || ''),
//         metadata: {...doc.metadata},  // json of metadata
//         fileId: file.id || 0,
//         conversationId: file.conversationId || 0
//       };

//       chunks.push(chunkData);
//     }

//     // Step 3: Store chunks in both databases [ Quadrant and Pg ]
//     await storeChunks(chunks, file.conversationId || 0);

//     return chunks;

//   } catch (error) {
//     console.error('Error processing file to chunks:', error);
//     throw error;
//   }
// };
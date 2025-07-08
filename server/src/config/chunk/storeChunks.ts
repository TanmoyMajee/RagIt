
// import {storeInPostgreSQL} from './storeInPG'
// import {storeInQdrant } from './storeInQuadrant'
// import {createEmbeddings} from '../createEmbeddings'
// import {chunkData} from './chunkType'


// export const storeChunks = async (chunks: chunkData[], conversationId: number) => {
//   try {
//     // Step 1: Create embeddings for all chunks
//     const embeddings = await createEmbeddings(chunks.map(c => c.text));

//     // Step 2: Store in Qdrant first
//     await storeInQdrant(chunks, embeddings, conversationId);

//     // Step 3: Store in PostgreSQL
//     await storeInPostgreSQL(chunks);

//     console.log(`Successfully stored ${chunks.length} chunks`);

//   } catch (error) {
//     console.error('Error storing chunks:', error);
//     // Rollback logic if needed
//     throw error;
//   }
// };
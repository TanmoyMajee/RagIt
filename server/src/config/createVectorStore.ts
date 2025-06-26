import { Document } from "@langchain/core/documents"; 
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";
import { QdrantVectorStore } from "@langchain/qdrant";
import { QdrantClient } from "@qdrant/js-client-rest";


export const createVectorStore = async (collectionName:string,splitDocs:Document[]) =>{

  try {

      // create the client of Quadrant 
      const qdrantClient = new QdrantClient({
        url: process.env.QDRANT_URL,
        apiKey: process.env.QDRANT_API_KEY,
      });  
  
      // create the embadign using huggingface
      console.log("🔤 Creating embeddings...");
      const embeddings = new HuggingFaceTransformersEmbeddings({
        model: "Xenova/all-MiniLM-L6-v2",
      });
  
      // crete store
  
      console.log("🗄️ Creating vector store...");
  
      const vectorStore = await QdrantVectorStore.fromDocuments(
        splitDocs,
        embeddings,
        {
          client: qdrantClient,
          collectionName: collectionName
        }
      );
  
      console.log("✅ Vector store created");

  } catch (error:any) {
    console.log("Vector store ceartion Error",error);
  }

}
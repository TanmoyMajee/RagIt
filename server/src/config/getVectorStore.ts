import { QdrantVectorStore } from "@langchain/qdrant";
import { QdrantClient } from "@qdrant/js-client-rest";
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";
import { url } from "inspector";


export const getVectorStore = async(collectionName:string) : Promise<QdrantVectorStore> =>{
    try {
      const embeddings = new HuggingFaceTransformersEmbeddings({
        model: "Xenova/all-MiniLM-L6-v2",
      });
      const client =new QdrantClient({
        url: process.env.QDRANT_URL,
        apiKey: process.env.QDRANT_API_KEY,
      })

      const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
        collectionName,
        client,
      });
      console.log('Vector Store get SuccessFully ')
      return vectorStore;
    } catch (error) {
      console.log('Erro Geting Vector Store  ',error)
      throw error;
    }
}
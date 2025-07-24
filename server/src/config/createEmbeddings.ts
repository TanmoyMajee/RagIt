// // Create embeddings
// import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";
// import { text } from "stream/consumers";

// export const createEmbeddings = async (texts: string[]): Promise<number[][]> => {
//   // Use OpenAI, Hugging Face, or local model
//   // This is a placeholder - implement based on your embedding service
//   const embeddings = new HuggingFaceTransformersEmbeddings({
//     model: "Xenova/all-MiniLM-L6-v2",
//     input:text,
//   })

//   return embeddings.data.map(d => d.embedding);
// };


//texts: string[]
export const createEmbeddings = async (): Promise<number[][]> => {

  const texts = ["hi my name is tanmoy","age is 23","i am form kolkata"]

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2",
      {
        method: "POST",
        headers: {
          // "Authorization": `Bearer ${process.env.API_KEY}`,
          "Authorization": `Bearer ${process.env.API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: texts,
          options: { wait_for_model: true }
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HuggingFace API error: ${response.status}`);
    }
    console.log(response);
    const embeddings = await response.json();
    return embeddings;

  } catch (error) {
    console.error('Error creating embeddings:', error);
    throw error;
  }
};
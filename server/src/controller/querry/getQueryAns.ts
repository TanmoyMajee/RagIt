import {Request,response,Response} from 'express'
import {getVectorStore} from '../../config/getVectorStore'
import { QdrantVectorStore } from "@langchain/qdrant";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval"; 

import { HuggingFaceInference } from "@langchain/community/llms/hf"; 

import { ChatPromptTemplate } from "@langchain/core/prompts";
// import { ChatHuggingFace } from "@langchain/community/chat_models/huggingface"; 
// import { ChatOpenAI } from "@langchain/openai";
// import { HuggingFaceHub } from "@langchain/community/llms/huggingface";

// console.log(process.env.HuggingFace_API_KEY)



export const getQueryAns = async (req:Request, res:Response) :Promise<void> => {
  const { query, conversationsId } = req.body;
  
  try {
    const vectorStore = await getVectorStore('tanmoy_cv_001');

    console.log("🔍 Setting up retriever...");
    const retriever = vectorStore.asRetriever({
      k: 3,
      searchType: "similarity",
    });

 

     const llm = new HuggingFaceInference({
          apiKey: process.env.API_KEY,
          model: "HuggingFaceH4/zephyr-7b-beta",
          // model:"gpt2",
          maxRetries: 2,
          // timeout: 15000, // Reduced timeout
          // provider:"hf-inference",
          maxTokens: 512,
          temperature: 0.1,
        });
//     // Test the model with a simple prompt
      //   console.log("🧪 Testing model...");
      // const result1 =   await llm.invoke("Hello, how are you?"); 
      // console.log(result1);
        
    

    // Rest of your code stays the same...
    const prompt = ChatPromptTemplate.fromTemplate(`
You are a helpful assistant. Answer the question based on the provided context.

Context: {context}

Question: {input}

Instructions:
- Be specific and concise
- Only use information from the context
- If the context doesn't contain relevant information, say "I don't have enough information to answer this question based on the provided context."

Answer:`);

    console.log("🔗 Creating chains...");
    const documentChain = await createStuffDocumentsChain({
      llm,
      prompt,
    });

    const retrievalChain = await createRetrievalChain({
      retriever,
      combineDocsChain: documentChain,
    });

    console.log("✅ RAG system ready!");
    const result = await retrievalChain.invoke({ input: query });
    console.log(result);
    res.status(200).json({ res: result });
    // res.send(result1);

  } catch (err:any) {
    console.log('Error in Query Route:', err);
    res.status(500).json({ msg: 'Something Went Wrong', error: err.message });
  }
};




// const freeModelOptions = [
//   "HuggingFaceH4/zephyr-7b-beta",
//   "microsoft/DialoGPT-medium",
//   "facebook/blenderbot-400M-distill",
//   "google/flan-t5-base",
//   "EleutherAI/gpt-neo-125m",  // This one usually works
//   "distilgpt2",               // Smaller version of GPT-2
//   "gpt2"                      // Fallback
// ];



  // const llm = new ChatOpenAI({
    //   openAIApiKey: "anything", // Not needed for local
    //   modelName: "gpt-3.5-turbo",
    //   configuration: {
    //     baseURL: "https://api.together.xyz/v1", // Free API
    //   }
    // });

    // let workingModel = null;
    // let llm = null;

    // for (const model of freeModelOptions) {
    //   try {
    //     console.log(`🧪 Testing model: ${model}`);

    //     llm = new HuggingFaceInference({
    //       apiKey: process.env.HuggingFace_API_KEY,
    //       model: model,
    //       maxRetries: 2,
    //       timeout: 15000,
    //       maxTokens: 256,  // Reduced for better reliability
    //       temperature: 0.1,
    //     } as any);

    //     // Test the model
    //     await llm.invoke("Hello");
    //     workingModel = model;
    //     console.log(`✅ Model ${model} is working!`);
    //     break;

    //   } catch (error) {
    //     console.log(`❌ Model ${model} failed, trying next...`);
    //     continue;
    //   }
    // }
// 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

// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: "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",
// });

// const completion = openai.chat.completions.create({
//   model: "gpt-4o-mini",
//   store: true,
//   messages: [
//     {"role": "user", "content": "write a haiku about ai"},
//   ],
// });

// completion.then((result) => console.log(result.choices[0].message));

    // // DON'T OVERRIDE THE WORKING MODEL!
    // if (!llm || !workingModel) {
    //   throw new Error("All models failed. Please check your API key."); 
    // }

    // const llm = new HuggingFaceInference({  
    //   apiKey: process.env.API_KEY,
    //   model: "HuggingFaceH4/zephyr-7b-beta",  // if this model is supported
    //   maxTokens: 512,
    //   temperature: 0.1,
    // });

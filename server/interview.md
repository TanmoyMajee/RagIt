
**How does the system work step by step when a user uploads a PDF and asks a question?**

> When a user uploads a document, the backend extracts the text and splits it into chunks. Each chunk is converted into embeddings using a HuggingFace sentence transformer model and saved inside Qdrant, which is a vector database. For every new conversation, I create a separate collection in Qdrant based on the conversation ID, so that the data from one session doesn’t get mixed up with another. This way each chat stays independent and organized.

> When the user asks a question, we create an embedding for that query and use Qdrant to fetch the most relevant chunks. Then I built a retrieval chain in LangChain, where those chunks are combined with a custom prompt. The prompt makes sure the model only answers from the given context. Finally, a HuggingFace LLM generates the response, and both the user’s question and the AI’s answer are stored in the database to maintain chat history.


## Why I Chose DeepSeek:

>"I chose DeepSeek because it’s an open-source language model hosted on Hugging Face, which makes it easy to access and integrate without the need for any credit card information. This accessibility is crucial for development, especially since I don’t have a credit card. Additionally, DeepSeek provides reliable and accurate answers, making it a perfect fit for my RAG-based project. Compared to other models like OpenAI or Gemini, DeepSeek is more accessible and cost-effective, which is why it was the best choice for my needs."


**4.	What is an embedding? Why do you need it?**

>   “Embeddings are numerical vector representations of text that capture the meaning of the text. In my project, each chunk of the document gets its own embedding vector based on its content. Then, when the user asks a question, that question is also turned into an embedding. By comparing these vectors, the system can find the most similar chunks in the document and pass them to the model. That’s how semantic search works here.”
  	
**6.	Why did you use Qdrant instead of MongoDB or MySQL?**
>   I used Qdrant because it’s designed for vector similarity search, which is essential for retrieving relevant chunks from embeddings. Relational databases like MySQL or Postgres aren’t built for that use case. In my project, Qdrant handled the embeddings, while Prisma with Postgres managed structured data like users, sessions, and messages

**8.	What is the role of LangChain in your project?**
> “LangChain is an open-source Library that helps build applications powered by LLMs. In my project, its role was to connect different components of the RAG pipeline.
For example, I used classes like PDFLoader to read documents, RecursiveCharacterTextSplitter to break them into smaller chunks, and HuggingFaceTransformersEmbeddings to generate embeddings. On the other side, LangChain provides functions like createRetrievalChain and createStuffDocumentsChain, which help me connect the retriever with my LLM.
So overall, LangChain made it easy to orchestrate the whole flow — from loading the document, splitting it, generating embeddings, storing them, and finally retrieving the right chunks to pass into the LLM for answering.”
  	
**10.	what is HuggingFace , what is the role in yr project?**
>  Hugging Face is a popular platform for hosting and sharing machine learning mode In my project, I used their embedding model Xenova/all-MiniLM-L6-v2 (a sentence transformer) to convert document chunks and user queries into vectors, and their LLM (DeepSeek) to generate natural language answers. So, HuggingFace powered both the embedding generation and the answer generation parts of my RAG pipeline


**How I Implemented the Retrieval Chain:**

*Initialization:*
>I began by initializing the LLM model and setting up a ChatPromptTemplate (a LangChain class) that defines how the model should respond — for example, to be concise and mention when there isn’t enough information in the context.

*Document Chain:*
>Then I used the createStuffDocumentsChain() function from LangChain. This function combines the LLM and the prompt into a single chain that processes the retrieved documents and generates a context-aware response.

*Retrieval Chain:*
>After that, I used the createRetrievalChain() function, which connects the document chain with a retriever (from the vector store). The retriever is responsible for fetching the most relevant document chunks from the vector database.

*Execution:*
>Finally, I invoked the retrievalChain by passing the user’s query as input. The chain first retrieves the relevant context using the retriever, then passes it through the document chain to generate a final answer.

**Challanges to  INtegrate AI Model **
>In my project, I utilized two primary AI models. First, I used the Hugging Face Sentence Transformer to generate embeddings, which helped in converting text into meaningful vector representations. Secondly, I leveraged the DeepSeek LLM to generate the final responses.

>In my project, I first used LangChain’s default HuggingFaceInference class. Later, Hugging Face updated their system to use something called “Inference Providers,” where you have to mention the provider name (like novita or together) in the API request. The default class didn’t allow adding a custom provider name, so it stopped working properly with the new setup.

>To solve this, I built my own custom LLM class where I could set the provider, endpoint, headers, and retry logic manually. This made the integration work smoothly with Hugging Face’s updated policy.






**What is Prisma & Why did u use it **
>Prisma is an open-source ORM (Object Relational Mapping tool) that lets us write database queries in JavaScript or TypeScript instead of raw SQL, making them more readable and type-safe. It also simplifies migrations, helping us manage schema changes effortlessly and reducing errors. 



**15.	If I upload a very large PDF, how does your system handle it?**
>If a very large document is uploaded, the first step is file handling.
I use Multer with memoryStorage in my Node.js backend to temporarily store the uploaded PDF in memory.
Then LangChain’s PDFLoader extracts the text, and a RecursiveCharacterTextSplitter breaks it into smaller overlapping chunks.
Each chunk gets its own embedding vector and is stored in Qdrant.
Because we only retrieve a few most relevant chunks when answering, the size of the PDF doesn’t slow down the query or overload the model.
This chunking and retrieval strategy lets the system handle very large documents efficiently within the LLM’s context limits.

24.	How do you avoid LLM hallucination — ensuring answers come from the PDF?
>To avoid LLM hallucination and ensure answers come only from the PDF, I use a retrieval-augmented generation (RAG) setup. First, I convert the PDF into vector embeddings and store them in a vector database (Qdrant). Then, when a user asks a question, a retriever fetches only the most relevant chunks from the PDF. The LLM receives both the query and these retrieved chunks as context. I also use a prompt template that instructs the LLM to answer only using the provided context and to respond with “I don’t have enough information” if the context is insufficient. This way, the LLM is grounded in the PDF content and doesn’t make up information.


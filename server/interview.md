
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
   	

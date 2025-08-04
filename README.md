

---

# RagIT PDF Reader

**Chat with your PDFs using AI. Upload, ask, and get instant answers from your documents.**

---

## 🚀 Features

- **PDF Upload & Management:** Upload and manage your PDF files securely.
- **AI-Powered Q&A:** Ask questions in natural language and get contextual answers from your PDFs.
- **Conversation History:** Each chat is saved as a session for easy reference.
- **File Chunking & Vector Search:** Documents are split and indexed for fast, accurate retrieval.
- **User Authentication:** Secure login and protected routes.
- **Responsive UI:** Works seamlessly on desktop and mobile.
- **Pricing Plans:** Free and Pro plans (with usage limits and upgrade path).

---

## 🛠️ Tech Stack

**Frontend:**
- React + TypeScript + Vite
- Tailwind CSS

**Backend:**
- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL (Neon.tech)
- LangChain (AI document processing)
- Qdrant (Vector DB)
- Firebase (for file storage)
- Multer (file uploads)
- Zod (validation)
- JWT (authentication)

---

## 📚 Project Structure

```
client/
  src/
    components/
    context/
    pages/
    App.tsx
    main.tsx
    index.css
server/
  src/
    controller/
    config/
    routes/
    DataBase/
    index.ts
  prisma/
    schema.prisma
```

---

## 🔄 Application Flow

1. **User Authentication:**  
   - User signs up or logs in.
   - JWT token is stored and used for protected routes.

2. **PDF Upload:**  
   - User uploads a PDF (drag & drop or file picker).
   - File is stored in Firebase, split into chunks, and indexed in Qdrant.

3. **Chat with PDF:**  
   - User selects a session and asks questions.
   - Backend retrieves relevant chunks using vector search.
   - AI model (via LangChain) generates an answer based on context.

4. **Conversation Management:**  
   - Each Q&A is saved as a message in the session.
   - Users can view previous chats and uploaded files.

5. **Pricing & Usage:**  
   - Free plan: limited uploads/questions.
   - Pro plan: unlimited usage (coming soon).

---

## 🖥️ Local Development

**Frontend:**
```bash
cd client
npm install
npm run dev
```

**Backend:**
```bash
cd server
npm install
npx prisma migrate dev
npm run dev
```


---

## 📄 License

MIT

---

**Made with ❤️ by Tanmoy Majee**  
[GitHub](https://github.com/TanmoyMajee) | [LinkedIn](https://www.linkedin.com/in/tanmoy-majee-2b7280288/)

---

Let me know if you want to add more details or sections!

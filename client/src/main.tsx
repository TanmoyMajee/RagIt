import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx';
import { ChatProvider } from './context/ChatContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ChatProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
      </ChatProvider>
    </AuthProvider>
  </StrictMode>,
)

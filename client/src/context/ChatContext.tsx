
import { createContext, useState,  useContext } from 'react';
import type { ReactNode, FC } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';
// Define the shape of your auth context value

export interface Conversation {
  id: number;
  userId:number;
  title: string;
  updatedAt:string;
  createdAt:string
}

export interface chatType {
  id: number,
  content: string,
  sender: string,
  tokenCount?: number | undefined,
  responseTime?: number | undefined,
  contextChunks: string[],
  modelUsed?: string | undefined,
  createdAt?: string,
  conversationId?: number
}

export interface ChatContextType {
  // user: User | null;
  AllConversations:Conversation[];
  sessionLoading:boolean;
  selectedSession:number|null;
  // setSelectedSession: (session: Conversation | null) => void;
  setSelectedSession: (id:number) => void;
  fetchSession:()=>Promise<void>;
  fetchChatHistory: (id:number | null) => Promise<void>;
  chatHistory:chatType[];
  setChatHistory: React.Dispatch<React.SetStateAction<chatType[]>>;
}

// Create the context with a default value (undefined for safety)
export const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function useChatAuth() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Provider props type
interface AuthProviderProps {
  children: ReactNode;
}

export const ChatProvider: FC<AuthProviderProps> = ({ children }) => {

  const [AllConversations, setAllConversations] = useState([]);
  const [selectedSession, setSelectedSession] = useState<number | null>(null);
  const [sessionLoading, setSessionLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<chatType[]>([]);
  const {token} = useAuth();

  // this will call when the chat page render so we should have token to call 
  const fetchSession = async()=>{
    setSessionLoading(true);
    try {
      const backendURL = import.meta.env.VITE_BACKEND_URL;
      // console.log('Backend URL:', backendURL);
      const response = await axios.get(`${backendURL}/conversation`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      // console.log(response.data.session);
      setAllConversations(response.data.session);
    } catch (error) {
      
    }finally{
      setSessionLoading(false);
    }
  }

const fetchChatHistory = async(id:number | null)=>{
  if (id == null) return;
  try {
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.get(`${backendURL}/chat/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    // console.log(response.data);
    setChatHistory(response.data.chats);
  } catch (err) {
    console.log("Err in fecthing the chat history", err)
  }
} 

 







  const val: ChatContextType = {
    AllConversations,
    fetchSession,
    sessionLoading,
    setSelectedSession,
    selectedSession,
    fetchChatHistory,
    chatHistory,
    setChatHistory
  };

  return (
    <ChatContext.Provider value={val}>
      {children}
    </ChatContext.Provider>
  );
};



import SessionBar from "../components/chat/SidebarSessions"
import CharArea from "../components/chat/ChatArea"
import Upload from "../components/chat/UploadPanel"
import { useAuth } from "../context/AuthContext";
import { useChatAuth } from "../context/ChatContext";
import React, { useEffect} from "react"
import { useParams } from 'react-router-dom';


export const ChatPage: React.FC = ()=> {
  const { sessionId } = useParams();
  const { user,token } = useAuth();
  const {fetchSession , fetchChatHistory , setSelectedSession} = useChatAuth();

  // fecth all the session tile on first render or when user chage or when a new chat creatd
  useEffect(()=>{
    fetchSession();
  },[user,token])

  useEffect(() => {
    if (sessionId) {
      setSelectedSession(parseInt(sessionId))
      const fetchData = async () => {
        await fetchChatHistory(parseInt(sessionId));
      };
      fetchData();
    }
    // else: do nothing or show a default UI
  }, [sessionId]);




  return (
    <div className="flex min-h-screen text-black">
     <SessionBar/>
     <CharArea/>
     <Upload/>
    </div>
  )
}
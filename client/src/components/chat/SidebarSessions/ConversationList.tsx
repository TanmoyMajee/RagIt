
import { MessageSquare} from "lucide-react";
import { useChatAuth } from '../../../context/ChatContext'
import { useNavigate } from "react-router-dom";
import type { Conversation } from "../../../context/ChatContext";

// Mock conversation list component
const ConversationList = () => {
  
  const {selectedSession} = useChatAuth();
  const navigate = useNavigate();
  const { AllConversations , setSelectedSession } = useChatAuth();

  const handleSelectSession = (session:Conversation) => {
    // set the crrnt selected seion to the session id and navigate to taht page
    // setSelectedSession(session.id);
    console.log(session)
    navigate(`/chat/${session.id}`)
  }
  

  return (
    <div className="flex-1 h-[420px]  overflow-y-auto">
      {AllConversations.map((conv, index) => (
        <div
          key={index}
          onClick={() => handleSelectSession(conv)}

          className={`px-3 py-2 mx-2 mb-1 text-sm text-gray-300 hover:bg-gray-700 rounded-lg
             cursor-pointer ${selectedSession===conv.id?'bg-gray-700':''} truncate transition-colors`}
        >
          <MessageSquare className="inline w-4 h-4 mr-2" />
          {conv.title}
        </div>
      ))}
    </div>
  );
};
export default ConversationList
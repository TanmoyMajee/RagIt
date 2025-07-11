
import { MessageSquare, } from "lucide-react";

// Mock conversation list component
const ConversationList = () => {
  const conversations = [
    "How to build a chatbot",
    "React best practices",
    "JavaScript fundamentals",
    "CSS Grid vs Flexbox",
    "API integration guide",
    "CSS Grid vs Flexbox",
    "CSS Grid vs Flexbox",
    "CSS Grid vs Flexbox",
    "CSS Grid vs Flexbox",
    "CSS Grid vs Flexbox",
    "CSS Grid vs Flexbox",
    "CSS Grid vs Flexbox",
    "CSS Grid vs Flexbox",
    "CSS Grid vs Flexbox",
    "CSS Grid vs Flexbox",
    "CSS Grid vs Flexbox",

    
  ];

  return (
    <div className="flex-1 h-[420px]  overflow-y-auto">
      {conversations.map((conv, index) => (
        <div
          key={index}
          className="px-3 py-2 mx-2 mb-1 text-sm text-gray-300 hover:bg-gray-700 rounded-lg cursor-pointer truncate transition-colors"
        >
          <MessageSquare className="inline w-4 h-4 mr-2" />
          {conv}
        </div>
      ))}
    </div>
  );
};
export default ConversationList
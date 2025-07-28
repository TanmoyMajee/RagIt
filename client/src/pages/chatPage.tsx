


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SessionBar from "../components/chat/SidebarSessions";
import CharArea from "../components/chat/ChatArea";
import UploadPanel from "../components/chat/UploadPanel";
import { useAuth } from "../context/AuthContext";
import { useChatAuth } from "../context/ChatContext";
import { Menu, Upload } from "lucide-react";

export const ChatPage: React.FC = () => {
  const { sessionId } = useParams();
  const { user, token } = useAuth();
  const { fetchSession, fetchChatHistory, setSelectedSession, setChatHistory } = useChatAuth();

  // Sidebar open state for mobile
  const [isLeftOpen, setLeftOpen] = useState(false);
  const [isRightOpen, setRightOpen] = useState(false);

  // Fetch sessions on mount/user change
  useEffect(() => {
    fetchSession();
  }, [user, token]);

  // Fetch or clear chat history on sessionId change
  useEffect(() => {
    if (sessionId) {
      const id = parseInt(sessionId, 10);
      setSelectedSession(id);
      fetchChatHistory(id);
    } else {
      setSelectedSession(null);
      setChatHistory([]);
    }
  }, [sessionId]);

  return (
    <div className="flex h-screen text-black relative">
      {/* Mobile toggles */}
      <div className="md:hidden fixed top-2 left-2 z-50 flex space-x-2">
        <button
          onClick={() => setLeftOpen(true)}
          className="p-2 bg-gray-800 text-white rounded"
        >
          <Menu />
        </button>
        <button
          onClick={() => setRightOpen(true)}
          className="p-2 bg-gray-800 text-white rounded"
        >
          <Upload />
        </button>
      </div>

      {/* Left sidebar (SessionBar) */}
      <SessionBar isOpen={isLeftOpen} onClose={() => setLeftOpen(false)} />

      {/* Main chat area */}
      <main className="flex-1 flex flex-col">
        <CharArea />
      </main>

      {/* Right panel (Upload) */}
      <UploadPanel isOpen={isRightOpen} onClose={() => setRightOpen(false)} />

      {/* Overlays for mobile (now z-30, panels are z-40) */}
      {isLeftOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setLeftOpen(false)}
        />
      )}
      {isRightOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setRightOpen(false)}
        />
      )}
    </div>
  );
};

import SessionBar from "../components/chat/SidebarSessions"
import CharArea from "../components/chat/ChatArea"
import Upload from "../components/chat/UploadPanel"

import React from "react"
export const ChatPage: React.FC = ()=> {
  return (
    <div className="flex min-h-screen text-black">
     <SessionBar/>
     <CharArea/>
     <Upload/>
    </div>
  )
}
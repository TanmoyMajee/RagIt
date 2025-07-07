import SessionBar from "../components/SidebarSessions"
import CharArea from "../components/ChatArea"
import Upload from "../components/UploadPanel"

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
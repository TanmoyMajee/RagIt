

import {  Plus, Crown,User  } from 'lucide-react'
import ConversationList from './ConversationList'

export default function Sidebar() {
  return (
    <div className=" bg-gray-900 text-white h-screen flex flex-col w-[300px]">
      {/* Header */}
      <div className="px-4 py-6 text-2xl font-bold border-b border-gray-700">
        RagIt
      </div>

      {/* New Chat */}
      <button className="flex items-center px-4 py-2 mt-4 hover:bg-gray-700">
        <Plus className="mr-2" />
        New Chat
      </button>

      {/* Sessions */}
      <div className="px-4 mt-6 text-gray-400 uppercase text-xs">
        Chats
      </div>
      {/* List  Flext-1 covers rst of the area */}
      <div className="flex-grow overflow-y-auto px-4 mt-2"> 
        <ConversationList />
      </div>

      {/* Footer Actions */}
      <div className="border-t border-gray-700  px-4 py-4 space-y-2">
        <button className="flex items-center w-full hover:bg-gray-700 px-2 py-2 rounded">
          <User className="mr-2" />
          Profile
        </button>
        <button className="flex items-center w-full hover:bg-gray-700 px-2 py-2 rounded">
          <Crown className="mr-2 text-yellow-400" />
          Upgrade Plan
        </button>
      </div>

    </div>
  )
}

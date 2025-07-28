

// import {  Plus, Crown,User } from 'lucide-react'
// import ConversationList from './ConversationList'
// import { useNavigate } from 'react-router-dom'
// import { useAuth } from '../../../context/AuthContext'
// // import { useState } from 'react';
// // import { Menu } from 'lucide-react';

// export default function Sidebar() {

//   const {user} = useAuth();

//   // const [isMOobile,setisMobile] = useState(false);

// const navigate = useNavigate();

//   return (
//     <div className="flex flex-col bg-gray-900 text-white h-screen  w-[300px]">
//       {/* Header */}
//       <div className="px-4 py-6 text-2xl font-bold border-b border-gray-700">
//         RagIt
//       </div>

//       {/* New Chat */}
//       <button onClick={()=>navigate('/chat')}  className="flex items-center px-4 py-2 mt-4 hover:bg-gray-700 hover:cursor-pointer">
//         <Plus className="mr-2" />
//         New Chat
//       </button>

//       {/* Sessions */}
//       <div className="px-4 mt-6 text-gray-400 uppercase text-xs">
//         Chats
//       </div>
//       {/* List  Flext-1 covers rst of the area */}
//       <div className="flex-grow overflow-y-auto px-4 mt-2"> 
//         <ConversationList />
//       </div>

//       {/* Footer Actions */}
//       <div className="border-t border-gray-700  px-4 py-4 space-y-2">
//         <button className="flex items-center w-full hover:bg-gray-700 px-2 py-2 rounded">
//           <User className="mr-2" />
//           {user?.name}
//         </button>
//         <button className="flex items-center w-full hover:bg-gray-700 px-2 py-2 rounded">
//           <Crown className="mr-2 text-yellow-400" />
//           Upgrade Plan
//         </button>
//       </div>


    
//     </div>

//   )
// }


import { Plus, Crown, User } from 'lucide-react'
import ConversationList from './ConversationList'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <div
      className={
        `fixed top-0 left-0 bottom-0 z-40 w-64 bg-gray-900 text-white flex flex-col transition-transform duration-300
         ${isOpen ? 'translate-x-0' : '-translate-x-full'}
         md:translate-x-0 md:static md:flex-shrink-0`
      }
    >
      {/* Optional mobile close button */}
      <div className="md:hidden flex justify-end p-2">
        <button onClick={onClose} className="p-1 text-gray-400 hover:text-white">
          Close
        </button>
      </div>

      {/* Header */}
      <div className="px-4 py-6 text-2xl font-bold border-b border-gray-700">
        RagIt
      </div>

      {/* New Chat */}
      <button
        onClick={() => navigate('/chat')}
        className="flex items-center px-4 py-2 mt-4 hover:bg-gray-700"
      >
        <Plus className="mr-2" />
        New Chat
      </button>

      {/* Sessions */}
      <div className="px-4 mt-6 text-gray-400 uppercase text-xs">Chats</div>
      <div className="flex-grow overflow-y-auto px-4 mt-2">
        <ConversationList />
      </div>

      {/* Footer Actions */}
      <div className="border-t border-gray-700 px-4 py-4 space-y-2">
        <button className="flex items-center w-full hover:bg-gray-700 px-2 py-2 rounded">
          <User className="mr-2" />
          {user?.name}
        </button>
        <button className="flex items-center w-full hover:bg-gray-700 px-2 py-2 rounded">
          <Crown className="mr-2 text-yellow-400" />
          Upgrade Plan
        </button>
      </div>
    </div>
  )
}

// import React from "react"

import {Send} from 'lucide-react'
import ChatList from './ChatList'
import { useEffect, useState ,useRef } from 'react'
import { respose } from "./chatDummyRespose"
import type { chatType } from "./chatDummyRespose"
const CharArea: React.FC = () => {

  const [query,setQuery] = useState('');
  const [chat,setChat] = useState<chatType[]>([]);
  const scrollref = useRef(null);



  useEffect(()=>{

      setChat(respose.chats);
       scrollref.current?.scrollIntoView({ behavior: "smooth" });
  },[chat]) // this will run when the id , user will chage || not firts render as chat id is required

  const handleSubmit =async ()=>{
    // call the qury api
    alert(query)
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-800 text-gray-200">

      <div className='flex-1 max-h-[650px] overflow-y-auto mt-4 '>
        <ChatList chats={chat} />
        {/* empty div for auto scroll 1st renderr or whern new chat comes */}
        <div ref={scrollref} ></div>
        </div>

       
          <form onSubmit={handleSubmit} className="flex m-3 space-x-1"> 
               <input className="w-full px-1.5 ml-12 bg-gray-900 h-10 rounded-xl"
              value={query}
              onChange={(e)=>setQuery(e.target.value)}
          />
        <button type='submit' className='px-2 py-2 bg-gray-900
        rounded-xl hover:cursor-pointer hover:bg-gray-700'>
              <Send/>
          </button>
          </form>
       
      
        
    </div>
  )
}

export default CharArea
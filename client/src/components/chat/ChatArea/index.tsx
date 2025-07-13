// import React from "react"

import {Send} from 'lucide-react'
import ChatList from './ChatList'
import { useEffect, useState ,useRef } from 'react'
import type { chatType } from '../../../context/ChatContext'
import { useChatAuth } from '../../../context/ChatContext'
import { useAuth } from '../../../context/AuthContext'
import axios from 'axios'

const CharArea: React.FC = () => {

  const [query,setQuery] = useState('');
  const scrollref = useRef<HTMLDivElement>(null);
  const {chatHistory,setChatHistory,selectedSession} = useChatAuth();
  const {token} = useAuth();


  useEffect(()=>{
       scrollref.current?.scrollIntoView({ behavior: "smooth" });
  },[chatHistory]) // this will run when the id , user will chage || not firts render as chat id is required

  const handleSubmit = async(e:React.FormEvent)=>{
    e.preventDefault();

    if (!selectedSession) {
      alert("Please select a conversation first!");
      return;
    }

    // create a tmp chat before calling the api and append the user tmp qur to the curunt chat state for responsiveness 
    const tempChat: chatType = {
      id: Date.now(), // temporary unique id
      content: query,
      sender: "HUMAN",
      contextChunks: [],
    };
    setChatHistory(prev => [...prev,tempChat])
    const tmpQur = query;
    setQuery('');
    // call the qury api and apped the ap respose
    try {
      const backendURL = import.meta.env.VITE_BACKEND_URL;
      const respose = await axios.post(`${backendURL}/query`,{
        query: tmpQur,
        conversationsId: selectedSession
      },{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      console.log(respose);
      setChatHistory(prev => [...prev, respose.data.AiRespose]);
    } catch (error) {
      console.log("Err while Geting the ai respsone",error);
    }
    // again if succes then a
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-800 text-gray-200">

      <div className='flex-1 max-h-[650px] overflow-y-auto mt-4 '>
        <ChatList chats={chatHistory} />
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
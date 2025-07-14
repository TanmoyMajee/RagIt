


import type { chatType } from '../../../context/ChatContext';
// import Chunks from './chunks'
import ChunkItem from './chunks'
import { useChatAuth } from '../../../context/ChatContext';
// import {  } from "./chatDummyRespose"
type ChatListProps = {
  chats: chatType[];
};
const ChatList: React.FC<ChatListProps> = ({chats=[]})=>{

  const {selectedSession} = useChatAuth();

// if no chat selets then return a div [ greeting text ]
if(!selectedSession){
  return(
    <div className='text-end text-xl mt-20 mr-20 '>
      please upload a file to start conversation 
    </div>
  )
}

// if chat is selcted but theer is no qur show enter yor qur
if(chats.length == 0){
  return(
    <div>
      enter your  query from this pdf files 
    </div>
  )
}

    return (
      <div className=" space-y-2 px-3 py-3   ">
          {
            chats.map((elem,i)=><div key={i}>

                {/* avatar + ans  */}      
                     <div className={`flex   ${elem.sender=="AI"?'justify-start':'justify-end'}`}>
                  {/* for Ai  */}
                  {
                    elem.sender=="AI" && <div className={`w-[35px] h-[30px] rounded-full px-2 
                     py-0.5 bg-blue-300 text-gray-600 mr-1 `}>AI</div>
                  }
                  
                
                <div className={`max-w-[70%] rounded-lg p-3
                  ${elem.sender=="AI"?'bg-gray-900 text-white':'bg-gray-600 text-gray-300'}`}>
                  {elem.content}
                  </div>
                  
                    {
                    elem.sender=="HUMAN" && <span className={`w-[35px] h-[30px] rounded-full px-3 py-0.5
                     bg-indigo-100 text-black ml-1 mt-1`}>U</span>
                  }
            
             </div>

                {/* chunks */}
                 
                  {
                    elem.contextChunks.length>0 &&    <div className="flex flex-wrap gap-2 mt-2 ml-8">
                           {elem.contextChunks.map((chunkText, i) => (
                          <ChunkItem key={i} idx={i} text={chunkText} />
                             ))}
                         </div>
                  }

            </div>)
         
         }
      </div>
    )
}
export default ChatList
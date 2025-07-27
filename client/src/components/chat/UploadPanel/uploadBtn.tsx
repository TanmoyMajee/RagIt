import axios from 'axios';
import { Upload } from 'lucide-react';
import {useRef,useState} from 'react'
import { useAuth } from '../../../context/AuthContext';
import { useChatAuth } from '../../../context/ChatContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import type {FileType} from './File'

type UploadBtnProps = {
  addNewFile: React.Dispatch<React.SetStateAction<FileType[]>>;
};

const UploadBtn: React.FC<UploadBtnProps> = ({ addNewFile }) => {
const [file,setFile] = useState<FileList | null>(null)
const [loading,setLoading] = useState(false)
const {token} = useAuth();
const {selectedSession,setAllConversations} = useChatAuth();
  const inputRef = useRef<HTMLInputElement | null>(null);
const navigate = useNavigate();

  const handleDrag = (e: React.DragEvent<HTMLDivElement>)=>{
      e.preventDefault();
      // call upload only when drop & select do need to do for darg 
  }

  const UploadFile =async ()=>{
    // here clal the api and set loadin is true
      console.log('Uplaodin',file)
      if(!file || file.length == 0){
        return;
      }
      try {
        setLoading(true);
        const backendURL = import.meta.env.VITE_BACKEND_URL;

        const formData = new FormData();  // must use form data as cannot send a File object as JSON. The backend will not      receive the file data properly.
        formData.append('file', file[0]);

        if (selectedSession) {
          formData.append('conversationId', String(selectedSession));
        }

        const response = await axios.post(`${backendURL}/file`, formData,{
          headers:{
               'Authorization': `Bearer ${token}` 
          }
        })
        console.log(response);
        if (response.data.file) {
      addNewFile((prevFiles: FileType[]) => [...prevFiles, response.data.newFile]);
      // If your backend returns an array, use: [...prevFiles, ...response.data.file]
    }
        // now if the seletedSession is null then redirect to the newly created session form the respose and apppedn the created session in the list
        if(!selectedSession){
            setAllConversations(prev=>[...prev,response.data.conversation])
             navigate(`/chat/${response.data.conversation.id}`)
        }
        toast.success('File Upload Succesfully')
        // else we are already in a session so no need to rdiret 
      } catch (error) {
          console.log("Error Uplaoin file",error);
          toast.error('Cant Upload this File  :'); 
      }finally{
        setLoading(false);
        setFile(null); // ******** clean the state , no matter what happens , 
      } 
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>)=>{
      e.preventDefault()
      // console.log(e);
      setFile(e.dataTransfer.files)
      UploadFile();
  }

  const handleFileSelect = (e:React.ChangeEvent<HTMLInputElement>)=>{
    e.preventDefault()
    // console.log(e);
     setFile(e.target.files);
      UploadFile();
  }

  // if Lodadig then retun a uploadin componet
  if(loading){
    return(
      <div className=" flex flex-col justify-center items-center text-2xl w-[350px] h-[140px] ml-3 bg-gray-600 border-2 border-dashed border-gray-300 ">
        uploading
      </div>
    ) 
  }

  return (
     <div 
     onClick={()=>inputRef.current?.click()}
     onDragOver={handleDrag}
     onDrop={handleDrop}
     className=" flex flex-col justify-center items-center w-[350px] h-[140px] ml-3 bg-gray-600 border-2 border-dashed border-gray-300">

        <h1>Uploads</h1>
        <Upload size={40}/>
        <h1 className='mt-1'>Drag and Drop Files</h1>
        <h1>Only Pdf Allowed For now</h1>
        {/* hidden Input */}
        <input
          type='file'
          hidden
          onChange={handleFileSelect}
          ref={inputRef}
        />
    </div>
  )
}
export default UploadBtn
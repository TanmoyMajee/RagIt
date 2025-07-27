import React , {useEffect, useState} from "react"
import UploadBtn from './uploadBtn'
// import {} from 'lucide-react'
import File  from "./File"
import type {FileType} from './File'
import axios from "axios"
import { useAuth } from '../../../context/AuthContext';
import { useChatAuth } from '../../../context/ChatContext'

const Upload: React.FC = () => {
  // fetch the files when a session is selected and , when session is changed
  const {token} = useAuth();
  const {selectedSession} = useChatAuth();
  const [files, setFiles] = useState<FileType[]>([]);

 useEffect(() => {
    const fetchFile = async () => {
      if (!selectedSession) return; // Only run if session is selected
      const backendURL = import.meta.env.VITE_BACKEND_URL || "";
      try {
        const response = await axios.get(
          `${backendURL}/file/getFile/${selectedSession}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        console.log(response);
        setFiles(response.data.File)
        // TODO: handle response, e.g. set files state
      } catch (error) {
         console.log(error);
      }
    };
    fetchFile();
  }, [selectedSession]); // Run when selectedSession changes


  return (
    <div className="bg-gray-700 text-gray-200 w-1/4">

        <h1 className="text-3xl   px-4 py-6">Uploads</h1>

       <UploadBtn addNewFile={setFiles} />
      {/* List of Uploaded File into this session */}
      <div className="grid  grid-cols-1 md:grid-cols-2 gap-2 mt-2 px-2 py-2 h-[500px] overflow-y-auto bg-gray-600">
         {files.map((f,i) => (
          <File key={i} file={f} />
        ))}
      </div>

    </div>
  )
}

export default Upload
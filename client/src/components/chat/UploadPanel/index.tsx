// import React , {useEffect, useState} from "react"
// import UploadBtn from './uploadBtn'
// // import {} from 'lucide-react'
// import File  from "./File"
// import type {FileType} from './File'
// import axios from "axios"
// import { useAuth } from '../../../context/AuthContext';
// import { useChatAuth } from '../../../context/ChatContext'

// const Upload: React.FC = () => {
//   // fetch the files when a session is selected and , when session is changed
//   const {token} = useAuth();
//   const {selectedSession} = useChatAuth();
//   const [files, setFiles] = useState<FileType[]>([]);

//  useEffect(() => {
//     const fetchFile = async () => {
//       if (!selectedSession) return; // Only run if session is selected
//       const backendURL = import.meta.env.VITE_BACKEND_URL || "";
//       try {
//         const response = await axios.get(
//           `${backendURL}/file/getFile/${selectedSession}`,
//           {
//             headers: {
//               'Authorization': `Bearer ${token}`
//             }
//           }
//         );
//         console.log(response);
//         setFiles(response.data.File)
//         // TODO: handle response, e.g. set files state
//       } catch (error) {
//          console.log(error);
//       }
//     };
//     fetchFile();
//   }, [selectedSession]); // Run when selectedSession changes


//   return (
//     <div className="bg-gray-700 text-gray-200 w-1/4">

//         <h1 className="text-3xl   px-4 py-6">Uploads</h1>

//        <UploadBtn addNewFile={setFiles} />
//       {/* List of Uploaded File into this session */}
//       <div className="grid  grid-cols-1 md:grid-cols-2 gap-2 mt-2 px-2 py-2 h-[500px] overflow-y-auto bg-gray-600">
//          {files.map((f,i) => (
//           <File key={i} file={f} />
//         ))}
//       </div>

//     </div>
//   )
// }

// export default Upload

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth } from "../../../context/AuthContext";
// import { useChatAuth } from "../../../context/ChatContext";
// import UploadBtn from './uploadBtn';
// import File from './File';
// import type { FileType } from './File';

// interface UploadProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const Upload: React.FC<UploadProps> = ({ isOpen, onClose }) => {
//   const { token } = useAuth();
//   const { selectedSession } = useChatAuth();
//   const [files, setFiles] = useState<FileType[]>([]);

//   // Fetch files when the selectedSession changes
//   useEffect(() => {
//     const fetchFile = async () => {
//       if (!selectedSession) return;
//       const backendURL = import.meta.env.VITE_BACKEND_URL || "";
//       try {
//         const response = await axios.get(
//           `${backendURL}/file/getFile/${selectedSession}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setFiles(response.data.File);
//       } catch (error) {
//         console.error("Error fetching files:", error);
//       }
//     };
//     fetchFile();
//   }, [selectedSession, token]);

//   return (
//     <aside
//       className={
//         `fixed inset-y-0 right-0 z-40 w-64 bg-gray-700 text-gray-200 flex flex-col transition-transform duration-300
//          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
//          md:translate-x-0 md:static md:flex-shrink-0`
//       }
//     >
//       {/* Mobile-only close button */}
//       <div className="md:hidden flex justify-end p-2">
//         <button
//           onClick={onClose}
//           className="p-2 text-gray-300 hover:text-white"
//         >
//           Close
//         </button>
//       </div>

//       <h1 className="text-3xl px-4 py-6">Uploads</h1>
//       <UploadBtn addNewFile={setFiles} />

//       {/* File list */}
//       <div className="flex-grow overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-2 px-2 py-2 bg-gray-600">
//         {files.map((f, i) => (
//           <File key={i} file={f} />
//         ))}
//       </div>
//     </aside>
//   );
// };

// export default Upload;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import { useChatAuth } from "../../../context/ChatContext";
import UploadBtn from './uploadBtn';
import File from './File';
import type { FileType } from './File';

interface UploadProps {
  isOpen: boolean;
  onClose: () => void;
}

const Upload: React.FC<UploadProps> = ({ isOpen, onClose }) => {
  const { token } = useAuth();
  const { selectedSession } = useChatAuth();
  const [files, setFiles] = useState<FileType[]>([]);

  // Fetch files when the selectedSession changes
  useEffect(() => {
    const fetchFile = async () => {
      if (!selectedSession) return;
      const backendURL = import.meta.env.VITE_BACKEND_URL || "";
      try {
        const response = await axios.get(
          `${backendURL}/file/getFile/${selectedSession}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFiles(response.data.File);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };
    fetchFile();
  }, [selectedSession, token]);

  return (
    <div
      className={
        `fixed inset-y-0 right-0 z-40 w-64 bg-gray-700 text-gray-200 flex flex-col transition-transform duration-300
         ${isOpen ? 'translate-x-0' : 'translate-x-full'}
         md:translate-x-0 md:static md:flex-shrink-0`
      }
    >
      {/* Mobile-only close button */}
      <div className="md:hidden flex justify-end p-2">
        <button
          onClick={onClose}
          className="p-2 text-gray-300 hover:text-white"
        >
          Close
        </button>
      </div>

      <h1 className="text-3xl px-4 py-6">Uploads</h1>
      <UploadBtn addNewFile={setFiles} />

      {/* File list */}
      <div className="flex-grow overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-2 px-2 py-2 bg-gray-600">
        {files.map((f, i) => (
          <File key={i} file={f} />
        ))}
      </div>
    </div>
  );
};

export default Upload;

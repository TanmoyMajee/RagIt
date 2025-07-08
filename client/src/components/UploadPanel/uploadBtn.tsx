import { Upload } from 'lucide-react';
import {useRef,useState} from 'react'

const UploadBtn = ()=>{
const [file,setFile] = useState(null)
const [loading,setLoading] = useState(false)
const inputRef =  useRef(null);

  const handleDrag =(e)=>{
      e.preventDefault();
      // call upload only when drop & select do need to do for darg 
  }

  const UploadFile =async ()=>{
    // here clal the api and set loadin is true
      console.log('Uplaodin')
  }

   const handleDrop =(e)=>{
      e.preventDefault()
      console.log(e);
      setFile(e.dataTransfer.files)
      UploadFile();
  }

  const handleFileSelect = (e)=>{
     setFile(e.dataTransfer.files);
      UploadFile();
  }

  // if Lodadig then retun a uploadin componet
  if(loading){
    return(
      <div className=" flex flex-col justify-center items-center text-2xl w-[350px] h-[140px] ml-3 bg-gray-600 bg-gray-600 border-2 border-dashed border-gray-300 ">
        uploading
      </div>
    ) 
  }

  return (
     <div 
     onClick={()=>inputRef.current.click()}
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
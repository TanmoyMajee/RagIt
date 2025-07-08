
import fs from 'fs';
import path from 'path';
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Document } from "@langchain/core/documents"; // Adjust the import path if needed

// 1 --> Write the file into a tmp file then return the path 
// 2 --> feed the the to  loader to the documes 
// 3 -- > dele the tmp file
// 
export const writeTmpFile = (buffer:Buffer,fileId:string) : string  =>{
    try {
      const fielPath = path.join(process.cwd(),'src',`${fileId}.pdf`,);
      // now write into that file
      fs.writeFileSync(fielPath,buffer);
      console.log('File write Succesfuly  into tmp file path :' , fielPath)
      return fielPath; // retuen the path to feed into loader
    } catch (e:any) {
      console.log('Erro While Writing the file Buffer into tmp :',e)
      throw e; 
    }
}

// NOW LOAD 

export const load_Split_File =async (fielPath:string) : Promise<Document[]> =>{
 try {
  console.log("📄 Loading PDF...");
  const loader = new PDFLoader(fielPath);
  const docs = await loader.load();
  console.log(`📊 Loaded ${docs.length} pages`);
  // console.log(docs);

// Split documents
console.log("✂️ Splitting documents...");
const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 800,
  chunkOverlap: 100,
});
const splitDocs : Document[] = await textSplitter.splitDocuments(docs);
console.log(`📋 Created ${splitDocs.length} chunks`);
// splitDocs.map((doc)=>{
//   console.log('Each Docs :',doc)
// })
return splitDocs;
}
 catch (error:any) {
    console.log('Error Wile Loading the File',error);
    return []; 
 }
}

export const deleteTmpFile = ()=>{

}
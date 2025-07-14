

import multer from 'multer';
import { Request, Response } from 'express';
import { FirebaseFileUpload } from '../../config/file/firebaseFileUpload'
import { writeTmpFile, load_Split_File , deleteTmpFile} from '../../config/file/load&splitFile'
import {createVectorStore} from '../../config/createVectorStore'
import {getVectorStore} from '../../config/getVectorStore'
import prisma from '../../DataBase/db'
import fs from 'fs'
// import {processChunks} from '../../config/chunk/processChunks'
// import path from 'path'
// import fs from 'fs';
import { z } from 'zod';
import { VectorStore } from '@langchain/core/vectorstores';


// Define allowed mimetypes
const fileSchema = z.object({
  mimetype: z.enum([
    'application/pdf',
    // 'text/csv',
    // 'text/plain',
    // 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]),
  originalname: z.string(),
  buffer: z.instanceof(Buffer),
  // conversation_id : z.string()
});





// Memory Storage

const storage = multer.memoryStorage();

export const upload = multer({ storage });

// Controller for handling file upload
export const fileUploadController =async (req: Request, res: Response) : Promise<void> => {




  const { conversationId } = req.body;

  let conversation, newFile, tmpfilepath,splitDocs,vecStore; // golbal instace for rool back if err occuer

  try {
    
  
    // Step 1: Handle conversation creation/validation


    // Step 1: Handle conversation creation/validation
    if (!conversationId) {
      // Create new conversation (first file upload)
      conversation = await prisma.conversation.create({
        data: {
          title: req.file?.originalname || "New Conversation",
          userId: req.user.id
        }
      });
    } else {
      // Validate existing conversation
      conversation = await prisma.conversation.findFirst({
        where: {
          id: parseInt(conversationId), 
          userId: req.user.id
        }
      });

      if (!conversation) {
         res.status(404).json({ msg: 'Conversation not found' });
         return;
      }
    }

  


    // Step 2: Validate file

  const valid = fileSchema.safeParse({
    ...req.file,  // destructure the object 
    // conversation_id: req.params
  });
  if (!valid.success) {
     res.status(400).json({ 
      msg: 'Invalid file type ', 
       allowedTypes: ['PDF'] 
      // allowedTypes: ['PDF', 'CSV', 'TXT', 'DOCX'] 
    });
    return;
  }

  const { mimetype, originalname, buffer } = valid.data;
  


 // 3. Generate the Public Url of File Using Firebase

//  chek the id is number or not | convert it to number
if(isNaN(req.user.id)){
  req.user.id = Number(req.user.id);
}

let url;
try {
  url = await FirebaseFileUpload(buffer, originalname, mimetype, req.user.id);  // id must be number
} catch (error) {
  throw new Error("Firebase upload failed: " + error);
}


 console.log('File Url : ',url); 
const filename = Date.now() + originalname;
//  now make entry in databse ,
 newFile = await prisma.file.create({
    data:{
    filename: `${Date.now()}_${originalname}`,
    originalName: originalname ,
    filetype: mimetype ,
    fileSize: buffer.length ,
    downloadUrl: url || '',
    conversationId: conversation?.id || 0,
    userId: req.user.id
    }
})


  
    try {
      tmpfilepath = writeTmpFile(buffer, newFile.filename);
    } catch (error) {
      throw new Error(" File Writing err : " + error);
    }
 

    try {
      splitDocs = await load_Split_File(tmpfilepath);
      if(splitDocs.length == 0) throw new Error("No chunks created [splitDocs]")
    } catch (err) {
      throw new Error("File splitting failed: " + err);
    }

// store chunk in pg and qdrant

// await processChunks(newFile,splitDocs); 


    const collectionName = `conversation_${newFile.conversationId}`;
//        await createVectorStore(collectionName,splitDocs);
    //  based on uniq file id | as cant give seeon id as to create converstaion table we ned pg store to creta first

//  get the vector store

try {
   vecStore = await getVectorStore(collectionName);
  if (!vecStore) {
    // Collection doesn't exist, create it with documents
    vecStore =  await createVectorStore(collectionName, splitDocs);
  }else{
    // Collection exists, but check if it has documents
    const collectionInfo = await vecStore.client.getCollection(collectionName);

    if (collectionInfo.points_count === 0) {
      // Collection is empty, add documents to it
      await vecStore.addDocuments(splitDocs);
      console.log(`Added ${splitDocs.length} documents to existing collection : ${collectionName}`);
    } else {
      // Collection has documents, just add new ones
      await vecStore.addDocuments(splitDocs);
      console.log(`Added ${splitDocs.length} more documents to collection ${collectionName}`);
    }
  }
} catch (error) {
  throw new Error("Error creating vec store : " + error);
}

//   now send respose

// now save the collection , fileId into conversation table [ now stat of a conversation ]
//  aslo generate a random name based on the file [ auth user can change it  ]


    // now del the file form sr dir
    deleteTmpFile(newFile.filename);

  res.status(200).json({
    msg: 'File uploaded successfully',
    file: {
      originalname,
      mimetype,
    },
    splitDocs: splitDocs,
    newFile: newFile,
    conversation: conversation,
  });

} catch (err:any) {
    console.log('Error in File Upload Route ;',err);

    if (!conversationId && conversation ){  //del newly created conversation & file & vectore store & tmpfile
        await prisma.conversation.delete({where : {id:conversation.id}})
        console.log('conversation delted as err occuer');
    }
    if(newFile){
       await prisma.file.delete({ where : {id:newFile.id}});
      console.log('new file entry delted as err occuer');
    }
    if(tmpfilepath){
      if(fs.existsSync(tmpfilepath))deleteTmpFile(tmpfilepath);
      console.log('tmp file  delted ');
    }
    if(vecStore){
      console.log('vector store is  not  delted [pending] ');
      // del vector store 
    }

    // if ther is any err thwn del the conversation table if its newly  created [ find out from conv Id passed by req body ]
    // del the file table if cerated 
    // del the vecotr store 
    res.status(500).json({msg:'Something Went Wrong',error:err});
}

};


// ****************************************************************

    // during loading i pass direlty .pdf that ineed to chek based on fiel type ? 

    //************************************ */




// Helper function to get file extension
// const getFileExtension = (mimeType: string): string => {
//   const mimeToExt: Record<string, string> = {
//     'application/pdf': '.pdf',
//     'text/csv': '.csv',
//     'text/plain': '.txt',
//     'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx'
//   };
//   return mimeToExt[mimeType] || '';
// };


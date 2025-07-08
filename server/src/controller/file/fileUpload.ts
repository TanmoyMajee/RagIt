

import multer from 'multer';
import { Request, Response } from 'express';
import { FirebaseFileUpload } from '../../config/file/firebaseFileUpload'
import { writeTmpFile, load_Split_File } from '../../config/file/load&splitFile'
import {createVectorStore} from '../../config/createVectorStore'
import {getVectorStore} from '../../config/getVectorStore'
import prisma from '../../DataBase/db'
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

  try {
    
  
    // Step 1: Handle conversation creation/validation

    let conversation;

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

 const url =await FirebaseFileUpload(buffer,originalname,mimetype,req.user.id);  // id must be number

 console.log('File Url : ',url); 
const filename = Date.now() + originalname;
//  now make entry in databse ,
const newFile = await prisma.file.create({
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


    const filepath =  writeTmpFile(buffer,'2');
    
    const splitDocs =await load_Split_File(filepath);  //[ type langchain Document[]  ]
// console.log('splitDocs: ',splitDocs);

// store chunk in pg and qdrant




// await processChunks(newFile,splitDocs); 



    const collectionName = `conversation_${newFile.conversationId}`;
//        await createVectorStore(collectionName,splitDocs);
    //  based on uniq file id | as cant give seeon id as to create converstaion table we ned pg store to creta first

//  get the vector store
  const vec = getVectorStore(collectionName);
  if(!vec){
    await createVectorStore(collectionName,splitDocs);
  }
//   now send respose

// now save the collection , fileId into conversation table [ now stat of a conversation ]
//  aslo generate a random name based on the file [ auth user can change it  ]

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
    res.status(404).json({msg:'Something Went Wrong',error:err});
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


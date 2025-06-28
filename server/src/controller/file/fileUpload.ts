

import multer from 'multer';
import { Request, Response } from 'express';
import { FirebaseFileUpload } from '../../config/firebaseFileUpload'
import { writeTmpFile, load_Split_File } from '../../config/load&splitFile'
import {createVectorStore} from '../../config/createVectorStore'
import {getVectorStore} from '../../config/getVectorStore'
// import path from 'path'
// import fs from 'fs';
import { z } from 'zod';


// Define allowed mimetypes
const fileSchema = z.object({
  mimetype: z.enum([
    'application/pdf',
    'text/csv',
    'text/plain',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]),
  originalname: z.string(),
  buffer: z.instanceof(Buffer),
});


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


// Memory Storage

const storage = multer.memoryStorage();

export const upload = multer({ storage });

// Controller for handling file upload
export const fileUploadController =async (req: Request, res: Response) : Promise<void> => {

  if (!req.file) {
     res.status(400).json({ msg: 'No file uploaded' });
  }

try {

  
  // console.log(req.file);
  const valid = fileSchema.safeParse(req.file);
  // console.log(valid);
  if (!valid.success) {
     res.status(400).json({ 
      msg: 'Invalid file type', 
      allowedTypes: ['PDF', 'CSV', 'TXT', 'DOCX'] 
    });
    return;
  }

  const { mimetype, originalname, buffer } = valid.data;
  
 // 3. Generate the Public Url of File Using Firebase

 const url =await FirebaseFileUpload(buffer,originalname,mimetype,1);

 console.log('File Url : ',url); 

//  now make entry in databse ,
//  thn load the file [directy provide the file buffer] 

    const filepath =  writeTmpFile(buffer,'2');


    // ****************************************************************

    // during loading i pass direlty .pdf that ineed to chek based on fiel type ? 

    //************************************ */
    const splitDocs =await load_Split_File(filepath);  //[ type langchain Document[]  ]
// store chunk in pg 
const collectionName = 'tanmoy_cv_001'
       await createVectorStore(collectionName,splitDocs);
    //  based on uniq file id | as cant give seeon id as to create converstaion table we ned pg store to creta first

//  get the vector store
  // const vec = getVectorStore(collectionName);
//   now send respose

// now save the collection , fileId into conversation table [ now stat of a conversation ]
//  aslo generate a random name based on the file [ auth user can change it  ]

  res.status(200).json({
    msg: 'File uploaded successfully',
    file: req.file
  });
  
} catch (err:any) {
    console.log('Error in File Upload Route ;',err);
    res.status(404).json({msg:'Something Went Wrong',error:err});
}

};
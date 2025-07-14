import { initializeApp, cert } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import { readFileSync } from "fs";

import {getFirebaseStorage} from '../firebase'


export const FirebaseFileUpload =async  (buffer: Buffer,fileName:string, mimetype: string,userId: number) : Promise<string|undefined> =>{

  try {

const bucket = getFirebaseStorage();
    const remotePath = `uploads/${userId}/${Date.now()}_${fileName}`;
    const fileRef    = bucket.file(remotePath);
    // await fileRef.save(buffer, { contentType: req.file!.mimetype });
    // const [fileUrl]  = await fileRef.getSignedUrl({
    //   action: "read", expires: "03-01-2500",
    // });

    // new: make public & use permanent public URL
await fileRef.save(buffer, { contentType: mimetype });
await fileRef.makePublic();                       // <-- mark the file public
const fileUrl = fileRef.publicUrl();              // <-- returns e.g. https://storage.googleapis.com/BUCKET_NAME/uploads/useId/timestap/filename...
console.log("File Url :", fileUrl)
return fileUrl;
  } catch (err:any) {
    console.log('Error Uploading in firebase',err);
    throw err;
  }
}

// // read the firebse api key file synchronouly , then parse the json
// const keyPath = process.env.FIREBASE_ADMIN_CREDENTIALS_PATH!;
// const keyJson = JSON.parse(readFileSync(keyPath, "utf-8"));
//     // —– Firebase init —–
// initializeApp({
//   credential: cert(keyJson),
//   storageBucket: process.env.FIREBASE_BUCKET,
// });
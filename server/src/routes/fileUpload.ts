import express from 'express'
const router = express.Router();

import { fileUploadController , upload} from '../controller/file/fileUpload';
import  {verifyUser}  from '../middleware/verifyUser';

router.post('/',upload.single('file'),verifyUser,fileUploadController);


export default router;
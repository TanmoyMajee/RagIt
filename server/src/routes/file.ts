import express from 'express'
const router = express.Router();
// import getFile from '../'
import getFile from '../controller/file/getFile'
import { checkSessionLimit } from '../middleware/checkSessionLimit';

import { fileUploadController , upload} from '../controller/file/fileUpload';
import  {verifyUser}  from '../middleware/verifyUser';

router.post('/',upload.single('file'),verifyUser,checkSessionLimit,fileUploadController);
 

router.get('/getFile/:id',verifyUser,getFile)

export default router;
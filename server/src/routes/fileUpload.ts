import express from 'express'
const router = express.Router();

import { fileUploadController , upload} from '../controller/file/fileUpload';


router.post('/',upload.single('file'),fileUploadController);


export default router;
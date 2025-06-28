import express from 'express'
const router = express.Router();

import { getQueryAns } from '../controller/querry/getQueryAns';


router.post('/', getQueryAns);


export default router;
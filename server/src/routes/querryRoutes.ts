import express from 'express'
const router = express.Router();

import { getQueryAns } from '../controller/querry/getQueryAns';
import { verifyUser } from '../middleware/verifyUser';
import { checkQueryLimit } from '../middleware/checkQueryLimit';
import {getAllConversation} from '../controller/conversation/getAllConversation'


router.post('/',verifyUser,checkQueryLimit, getQueryAns);

// router.get('/',getAllConversation)

export default router;
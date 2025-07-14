import express , { Request, Response  } from 'express'
import dotenv from 'dotenv';
import cors from 'cors'
dotenv.config();
import pool from './config/db'
import {CreateAllTable} from './config/createAllTable'
import fileRouter from './routes/fileUpload'
import queryRouter from './routes/querryRoutes'
import authRoutes from './routes/authRoutes'
import prisma from './DataBase/db';
import { getAllConversation } from './controller/conversation/getAllConversation';
import { verifyUser } from './middleware/verifyUser';
import { ChatHistory } from './controller/conversation/ChatHistory';


const app = express();
// Middleware to parse JSON
app.use(express.json()); 
app.use(cors());


app.get('/',async (req:Request,res:Response)=>{
    res.status(200).json({msg:"Welcome to rag pdf reader "});
})


// Start the server


app.use('/api/auth',authRoutes);
app.use('/api/file',fileRouter);
app.use('/api/query',queryRouter); 
app.get('/api/chat/:id',verifyUser,ChatHistory);
app.get('/api/conversation',verifyUser,getAllConversation)


const startServer = async () => { 
  // await CreateAllTable(); // Ensure tables exist Before atarting the server
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
};

startServer();
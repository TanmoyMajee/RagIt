import express , { Request, Response  } from 'express'
import dotenv from 'dotenv';
dotenv.config();
import pool from './config/db'
import {CreateAllTable} from './config/createAllTable'
import fileRouter from './routes/fileUpload'
import queryRouter from './routes/querryRoutes'
const app = express();


// Middleware to parse JSON
app.use(express.json()); 

// try llm 
// const llm = new HuggingFaceInference({
//   apiKey : process.env.HuggingFace_API_KEY,
//   model: "HuggingFaceH4/zephyr-7b-beta",
//   maxRetries: 2,
//   // timeout: 15000, // Reduced timeout
//   maxTokens: 512,
//   temperature: 0.1,
// })

// const llmTest = async ()=>{
//   try {
//     const result = await llm.invoke('Hi What is the Weatcher of Kolkata');
//     console.log(result);
//   } catch (error : any) {
//     console.log(error)
//   }
    
// }
// llmTest();

app.get('/',(req:Request,res:Response)=>{
    res.status(200).json({msg:"Welcome to rag pdf reader "});
})

const pgtest = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query("SELECT current_database()");
    res.json({
      msg: "Db connect Successfully",
      database: result.rows[0].current_database
    });
  } catch (error:any) {
    console.log(error);
    res.status(500).json({ msg: "Database connection failed", error });
  }
};

app.get('/pgtest',pgtest);

const userTable = async(req:Request,res:Response)=>{
  try{
      const result = await pool.query('SELECT * FROM USERS');
      console.log(result.rows);
      res.json(result.rows);  
  }catch(error : any){
    console.log(error);
    res.status(404).json({msg:'user table Error' , error : error})
  }
}

const userInsert = async(req:Request,res:Response)=>{
  const name = 'User2';
  const email = 'user2emsil';
  const password = '222134'
  try{
      const result = await pool.query('INSERT INTO  USERS (name,email,PASSWORD) VALUES ($1,$2,$3)  RETURNING *',[name,email,password]);
      console.log(result);
      res.json(result);  
  }catch(error : any){
    console.log(error);
    res.status(404).json({msg:'user table Error' , error : error})
  }
}

const deluser = async(req:Request,res:Response)=>{
  
  try{
      const result = await pool.query('DROP TABLE IF EXISTS USERS');
      console.log(result);
      res.json(result);  
  }catch(error : any){
    console.log(error);
    res.status(404).json({msg:'user table Error' , error : error})
  }
}

app.get('/user',userTable);
app.get('/user1',userInsert);
app.get('/deluser',deluser);
// Start the server

app.use('/file',fileRouter);
app.use('/query',queryRouter); 


const startServer = async () => {
  await CreateAllTable(); // Ensure tables exist Before atarting the server
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
};

startServer();
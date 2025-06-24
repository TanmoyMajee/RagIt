import express , { Request, Response  } from 'express'
import dotenv from 'dotenv';
dotenv.config();
import pool from './config/db'
import createUserTable from './model/user';
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Create user Table
createUserTable();

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

// Start the server

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
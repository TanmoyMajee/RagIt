import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();
 
// console.log(process.env.PG_CONNECTION_URL);

const pool  = new Pool({
  connectionString: process.env.PG_CONNECTION_URL
  // ssl: { rejectUnauthorized: false }
});

// const pool = new Pool({
//   user: 'postgres.ihehryaryrkgdoxkazlh',
//   password: 'IFmpcN1lD86VcrSi',
//   host: 'aws-0-ap-south-1.pooler.supabase.com',
//   port: 6543,
//   database: 'postgres',
//   ssl: { rejectUnauthorized: false }
// });

pool.on("connect",()=>{
  console.log("Databse Connected") 
})

pool.on('error',(error : any)=>{
  console.log("Databse error : ",error);
})

export default pool;
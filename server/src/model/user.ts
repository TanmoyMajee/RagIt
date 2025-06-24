import pool from "../config/db";


const createUserTable = async () : Promise<void> =>{ 
    const qur = `CREATE TABLE  IF NOT EXISTS users (
              id SERIAL PRIMARY KEY,
              NAME VARCHAR(20) NOT NULL,
              EMAIL VARCHAR(25) UNIQUE NOT NULL,
              created_at TIMESTAMP DEFAULT NOW()  )`
    try{
        pool.query(qur);
        console.log("USER Table Create Successfuly if not exists")
    } catch(error : any){
        console.log(error);
    }             
}

export default  createUserTable;
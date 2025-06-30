import pool from '../config/db'

export const CreateFileTable = async (): Promise<void> => {
  const qur = `CREATE TABLE IF NOT EXISTS files ( 
    id SERIAL PRIMARY KEY,
    downloadurl VARCHAR(300) NOT NULL,
    imageurl VARCHAR(300),
    filename VARCHAR(200),
    filetype VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
  )`;
  try {
    await pool.query(qur);
    console.log('File Table Created Successfully (if not exists)');
  } catch (e: any) {
    console.log('File Table Creation error:', e);
  }
}
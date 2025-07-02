import pool from '../config/db'

export const CreateFileTable = async (): Promise<void> => {
  // const qur = `CREATE TABLE IF NOT EXISTS files ( 
  //   id SERIAL PRIMARY KEY,
  //   downloadurl VARCHAR(300) NOT NULL,
  //   imageurl VARCHAR(300),
  //   filename VARCHAR(200),
  //   filetype VARCHAR(50),
  //   created_at TIMESTAMP DEFAULT NOW()
  //   user_id INTEGER NOT NULL REFERENCES users(id),
  // )`;
  const qur = `CREATE TABLE IF NOT EXISTS "file" (
    id SERIAL PRIMARY KEY,
    downloadurl TEXT NOT NULL,
    imageurl TEXT,
    filename TEXT NOT NULL,
    filetype TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    user_id INT NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES "user"(id)
  )`;
  try {
    await pool.query(qur);
    console.log('File Table Created Successfully (if not exists)');
  } catch (e: any) {
    console.log('File Table Creation error:', e);
  }
}
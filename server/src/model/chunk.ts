import pool from '../config/db'

export const CreateChunkTable = async (): Promise<void> => {
  const qur = `CREATE TABLE IF NOT EXISTS chunk ( 
    id SERIAL PRIMARY KEY,
  conversation_id INTEGER NOT NULL REFERENCES conversation(id),
  content TEXT NOT NULL,
  pgnumber INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
  )`;
  try {
    await pool.query(qur);
    console.log('Chunk Table Created Successfully (if not exists)');
  } catch (e: any) {
    console.log('Chunk Table Creation error:', e);
  }
}

//file_id INTEGER NOT NULL REFERENCES file(id), 
// no need to pass it 
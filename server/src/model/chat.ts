import pool from '../config/db'

export const CreateChatTable = async (): Promise<void> => {
  const qur = `CREATE TABLE IF NOT EXISTS chat ( 
    id SERIAL PRIMARY KEY,
  conversation_id INTEGER NOT NULL REFERENCES conversation(id),
  human TEXT NOT NULL,
  ai TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
  )`;
  try {
    await pool.query(qur);
    console.log('Chat Table Created Successfully (if not exists)');
  } catch (e: any) {
    console.log('Chat Table Creation error:', e);
  }
}
import pool from '../config/db'

export const CreateConversationTable = async (): Promise<void> => {
  const qur = `CREATE TABLE IF NOT EXISTS conversation ( 
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    file_id INTEGER NOT NULL REFERENCES files(id),
    quadrant_collection VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
  )`;
  try {
    await pool.query(qur);
    console.log('Conversation Table Created Successfully (if not exists)');
  } catch (e: any) {
    console.log('Conversation Table Creation error:', e);
  }
}

//user can have multiple conversation wich will store 
/* 
1 id [primay key]
2 user_id

3 fiel_id [only one file id as user can add one file durig creation on the conversation] /upload route

3 vectorBD colleion name [ that will help to ger the colletion of the db during each qary] /upload [created  while creating the conversation ]

*/
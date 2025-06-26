import createUserTable from '../model/user'
import {CreateChunkTable} from '../model/chunk'
import{ CreateConversationTable} from '../model/conversations'
import {CreateFileTable} from '../model/file'
import {CreateChatTable} from '../model/chat'

export const CreateAllTable =async (): Promise<void>=>{
  try{
    await createUserTable();
    await CreateFileTable();
    await CreateConversationTable();
    await CreateChunkTable();
    await CreateChatTable();
  }catch(err : any){
    console.log('Table Creation error:', err);
  }
}
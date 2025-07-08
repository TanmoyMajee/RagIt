import {Request,Response} from 'express';
import prisma from '../../DataBase/db';


export const ChatHistory = async (req:Request,res:Response):Promise<void>=>{
    // get the conversation id form params then search id db 
    // id exits then find all the cahts of this conversdation 
    const id = req.params.id;
    if(!id){
      console.log('NO OCnverSation Id provided');
      res.status(400).json({msg:"Must Provide the conversation Id in Params"});
      return;
    }
      try{
          // chek the conversation id is valid or not and 
          // the rqestes user is a part or owner is of this chat 
          const conversation = await prisma.conversation.findUnique({
            where:{
              id:parseInt(id)
            }
          })
          if(!conversation ){
            console.log(' CnverSation doesnt exists ');
            res.status(400).json({ msg: "CnverSation doesnt exists" });
            return;
          }
          
        // if (parseInt(req.user.id) != conversation.userId) {
        //   console.log('U cnat aces it ');
        //   res.status(400).json({ msg: "U cnat aces it " });
        //   return;
        // }

          const  AllChats = await prisma.message.findMany({
            where:{
              conversationId:parseInt(id)
            },
            orderBy: { createdAt: 'asc' }
          })
        res.status(200).json({ msg: "SuccessFully get the chat history ", chats: AllChats });
      }catch(error : any){
        console.log('error while getting Chat Hisatory :',error);
        res.status(404).json({msg:"Something went wrong while freating the conversation",error:error})
      }
}
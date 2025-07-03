import {Request,Response} from 'express';
import prisma from '../../DataBase/db';
export const getAllConversation = async (req:Request,res:Response):Promise<void>=>{
      try{
          const  AllConversation = await prisma.conversation.findMany({
            where:{
              userId:Number(req.user.id),
            }
          })
          res.status(200).json({msg:"Success",session:AllConversation});
      }catch(error : any){
        console.log('error while getting all conversation :',error);
        res.status(404).json({msg:"Something went wrong while freating the conversation"})
      }
}
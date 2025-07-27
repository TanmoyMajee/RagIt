import {Request,Response} from 'express';
import prisma from '../../DataBase/db';
// retrun all the uploaded file in a perticular conv
const getFile = async (req:Request,res:Response):Promise<void>=>{
    // get the conid from params , 
    const conversationId = parseInt(req.params.id);
    if(!conversationId){
      res.status(400).json({msg:'Need ConvSession id in Params'});
      return;
    }
    // now chek if this con avl | no need to chk if the req user in owner or not
    try {
      const Conversation = await prisma.conversation.findUnique({
      where:{
        id:conversationId
      }
    })
    if(!Conversation){
      res.status(400).json({msg:'NO session exixts'});
      return;
    }
    // now return all the file details
    const files = await prisma.file.findMany({
      where:{
        conversationId:conversationId
      }
    })
    // console.log('All teh Files : ',files);
    res.status(200).json({msg:'File Get successfully',File:files});
    } catch (error) {
       res.status(404).json({msg:'File retrive error'});
      return;
    }
    
}

export default getFile;
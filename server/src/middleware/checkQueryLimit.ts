
import { Request , Response , NextFunction } from "express"
import prisma from "../DataBase/db"

const FREE_DAILY_LIMIT = 10;

export const checkQueryLimit = async(req:Request, res:Response ,next:NextFunction):Promise<void>=>{ 
    try{
       const userId = req.user.id;
       const {conversationsId} = req.body;

  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user){
    res.status(401).json({ msg: "User not found" });
    return
  }

  const session = await prisma.conversation.findUnique({
    where:{
      userId:user.id,
      id:conversationsId
    }
  })

  if(!session){
    res.status(401).json({ msg: "Session NOt Found" });
    return;
  }


  if (user.plan === "PREMIUM") return next();

//   now chke the cnt of qur for free user


    const QurCnt = session.queryCount;

    if(QurCnt >= FREE_DAILY_LIMIT){
         res.status(403).json({ msg: "Daily free query limit reached. Upgrade to Premium for unlimited access." });
         return;
    }

    // update the cnt in qur cntrl if its succesfully generated 

    next();



    }catch(error){
        res.status(404).json({msg:"Err while Checking User Plan "});
        return;
    }
}   

import { Request , Response , NextFunction } from "express"
import prisma from "../DataBase/db"

const freeLimit = parseInt(process.env.FREE_DAILY_LIMIT ?? "10", 10); // Default to 10 if undefined

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


  // PREMIUM logic with expiry check
        if (user.plan === "PREMIUM") {
            if (user.planExpiry && new Date(user.planExpiry) > new Date()) {
                // Premium and not expired
                return next();
            } else {
                // Premium but expired, downgrade to FREE
                await prisma.user.update({
                    where: { id: userId },
                    data: { plan: "FREE", planExpiry: null }
                });
                // Continue to FREE logic below
            }
        }

//   now chke the cnt of qur for free user


    const QurCnt = session.queryCount;

    if(QurCnt >= freeLimit){
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
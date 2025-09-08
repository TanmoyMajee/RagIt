
import { Request , Response , NextFunction } from "express"
import prisma from "../DataBase/db"

export const checkSessionLimit = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
        try {
           const userId = req.user.id;
           const user = await prisma.user.findUnique({ where: { id: userId } });
           if (!user){
              res.status(401).json({ msg: "User not found" });
               return
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

        // now get the curr cnt , and the date of last created session

        const cnt = user.sessionCount;
        const lastDate  = user.lastSessionDate;
        const limit = 5;    
        // if(lastDate==curDate && cnt>5)return "update to premius"
        // else just forword the respose and if succsfuly created seion then update cnt and last date in uplofolder controler 
        // / Get today's date (YYYY-MM-DD)
        const today = new Date().toISOString().slice(0, 10);
        const lastSessionDay = new Date(lastDate).toISOString().slice(0, 10);

        if (lastSessionDay === today && cnt >= limit) {
            res.status(403).json({ msg: "Daily session limit reached. Upgrade to Premium for unlimited sessions." });
            return;
        }

        // If it's a new day, reset count in your session creation controller after successful creation

        next();
        } catch (error:any) {
          res.status(404).json({msg:"Err while Checking User Plan & Sessin Cnt"});
          return;
        }
}
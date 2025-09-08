import express, { Request, Response} from 'express';
import prisma from '../../DataBase/db';
import { number } from 'zod';
// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    // User is already attached to req by verifyUser middleware
    if (!req.user) {
      res.status(401).json({ msg: "User not authenticated" });
      return;
    }

    // Find user by ID (excluding password)
    const uId = Number(req.user.id);//make it int
    let user = await prisma.user.findUnique({
      where:{
        id:uId
      },
      select:{
        name:true,
        email:true,
        id:true,
        plan:true,
        planExpiry:true,
        createdAt: true,
        updatedAt:true
      }
    })

    if (!user) {
      res.status(404).json({ msg: "User not found" });
      return;
    }

    // Chek if the user has premimun plan then chk expires or not , then update
      if (user.plan === "PREMIUM" && user.planExpiry && new Date(user.planExpiry) < new Date()) {
    user = await prisma.user.update({
      where: { id: user.id },
      data: { plan: "FREE", planExpiry: null }
    });

     // Re-fetch user with selected fields
  user = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      name: true,
      email: true,
      id: true,
      plan: true,
      planExpiry: true,
      createdAt: true,
      updatedAt: true
    }
  });
  
  }

    // Return user profile data
    res.status(200).json({
      msg: "Profile retrieved successfully",
      user: user
    });

  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      msg: "Failed to retrieve profile",
      error: error.message
    });
  }
};
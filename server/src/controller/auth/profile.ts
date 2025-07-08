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
    const user = await prisma.user.findUnique({
      where:{
        id:uId
      },
      select:{
        name:true,
        email:true,
        id:true,
        createdAt: true,
        updatedAt:true
      }
    })

    if (!user) {
      res.status(404).json({ msg: "User not found" });
      return;
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
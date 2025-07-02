import express, { Request, Response, NextFunction } from 'express';
import prisma from '../../DataBase/db';

export const getAlluser = async (req: Request, res: Response): Promise<void> => {
  // User can see all registered users and for challenge assigning
  try {

    if (!req.user) {
      res.status(401).json({ msg: "User not authenticated" });
      return;
    }
    // Optionally  pagination and search 

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt:true
        // Add other fields you want to include
        // Do NOT include password
      }
    })

    res.status(200).json({
      msg: "All users retrieved successfully",
      users
    });
  } catch (error: any) {
    res.status(500).json({
      msg: "Failed to retrieve users",
      error: error.message
    });
  }
};
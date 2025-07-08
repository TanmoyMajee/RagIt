import express, { Request, Response } from 'express';
import prisma from '../../DataBase/db';
import generateAuthToken from '../../config/generateJwtToken'
import { z } from "zod";
import bcrypt from "bcryptjs";

const registSchema = z.object({
  name : z.string().min(2,"Name Must have Len 3"),
  email:z.string().email("Invalid Email"),
  password: z.string().min(6, "Password must be at least 6 characters long")
    .max(20, "Password must be at less then 20 characters long"),
});

export const register = async (req:Request,res:Response) : Promise<void>=>{
    try{
        const {name,email,password} = registSchema.parse(req.body);
        // find if uer alrady exits 
        const existingUser =await prisma.user.findUnique({
          where : {email : email}
        });

        if(existingUser){
          res.status(400).json({ msg: "User already exists" }); return; 
        }
        // now create the user [ hash the pass]
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the user
      const newUser = await prisma.user.create({
          data : {
            name,
            email,
            password:hashedPassword
          }
      })
      // await newUser.save();

      // Generate JWT token
      const token = generateAuthToken(newUser.id);

      // Respond with token and user info (excluding password)
      res.status(201).json({
        msg: "Registration successful",
        token,
        user: {
          _id: newUser.id,
          email: newUser.email,
          name: newUser.name
        }
      });
      return;

    }catch(error : any){ 
      // Zod err
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      console.log(error);
      res.status(500).send("Failed to register user, please try again later.");
    }
}
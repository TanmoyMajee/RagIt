
import jwt from 'jsonwebtoken'

const generateAuthToken = (id: number) : string =>{
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  const token = jwt.sign({id : id },process.env.JWT_SECRET,{expiresIn:'10d'}).toString();
  return token
} 

export default generateAuthToken;
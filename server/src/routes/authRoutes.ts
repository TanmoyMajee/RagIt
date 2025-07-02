import express from 'express';
import { register } from '../controller/auth/register';
import { login } from '../controller/auth/login';
import { getProfile} from '../controller/auth/profile';
// import { logout } from '../controller/auth/logout';
import { verifyUser } from '../middleware/verifyUser';
import { getAlluser } from '../controller/auth/getAllUser';


const router = express.Router();

// Public routes
router.post('/login', login);
router.post('/register', register);

// Protected routes (require authentication)
// router.post('/logout', verifyUser, logout);
router.get('/profile', verifyUser, getProfile);
router.get('/gelAllUsers', verifyUser, getAlluser);



export default router;
import Router from 'express';
import verifyToken from '../middlewares/auth.middleware.js';
import {
  getCurrentUser,
  getUserById,
} from '../controllers/users.controller.js';

const userRouter = Router();

// api/users
userRouter.get('/me', verifyToken, getCurrentUser);

userRouter.get('/:userId', verifyToken, getUserById);

export default userRouter;

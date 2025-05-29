import { Router } from 'express';
import {
  register,
  logIn,
  logOut,
  validateToken,
} from '../controllers/auth.controller.js';
import verifyToken from '../middlewares/auth.middleware.js';

const authRouter = Router();

// api/auth
authRouter.post('/register', register);

authRouter.post('/login', logIn);

authRouter.post('/logout', logOut);

authRouter.get('/validate-token', verifyToken, validateToken);

export default authRouter;

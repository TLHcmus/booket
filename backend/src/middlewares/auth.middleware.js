import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../../config/env.js';

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies['auth_token'];

    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.error('JWT Error:', error.message);

    const err = new Error('Unauthorized');
    err.statusCode = 401;
    next(err);
  }
};

export default verifyToken;

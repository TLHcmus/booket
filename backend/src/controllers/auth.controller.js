import { JWT_EXPIRES_IN, JWT_SECRET_KEY, NODE_ENV } from '../../config/env.js';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const register = async (req, res, next) => {
  try {
    // Retrieve email req body
    const { email, password } = req.body;

    // Check for existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error('User already exists');
      error.statusCode = 409;
      throw error;
    }

    // Check if password is 6 character or more
    if (password.length < 6) {
      const error = new Error('Password must be at least 6 characters long');
      error.statusCode = 400;
      throw error;
    }

    // Create new user
    const user = new User(req.body);
    await user.save();

    const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      maxAge: (parseInt(JWT_EXPIRES_IN) || 1) * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    next(error);
  }
};

const logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error('User is not existed');
      error.statusCode = 404;
      throw error;
    }

    // Check if password matches
    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      const error = new Error('Invalid password');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      maxAge: (parseInt(JWT_EXPIRES_IN) || 1) * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: 'User logged in successfully',
      userId: user._id,
    });
  } catch (error) {
    next(error);
  }
};

const logOut = (req, res, next) => {
  try {
    res.cookie('auth_token', '', {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      maxAge: new Date(0),
    });

    res.status(200).json({ message: 'User logged out successfully' });
  } catch (error) {
    next(error);
  }
};

const validateToken = (req, res, next) => {
  try {
    res.status(200).json({ userId: req.userId });
  } catch (error) {
    next(error);
  }
};
export { register, logIn, logOut, validateToken };

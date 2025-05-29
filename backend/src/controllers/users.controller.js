import User from '../models/user.model.js';

export const getCurrentUser = async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select('-password');

    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 400;
      throw error;
    }

    res.status(200).json({
      message: 'Successfully fetched current user',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).select('-password');

    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 400;
      throw error;
    }

    res.status(200).json({
      message: 'Successfully fetched user',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "User Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please fill a valid email"],
    },
    password: {
      type: String,
      required: [true, "User Pasword is required"],
    },
    firstName: {
      type: String,
      required: [true, "User First name is required" ],
    },
    lastName: {
      type: String,
      required: [true, "User Last name is required" ],
    },
  },
  { timestamps: true }
);

// Encrypt password
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const User = mongoose.model('User', userSchema);

export default User;

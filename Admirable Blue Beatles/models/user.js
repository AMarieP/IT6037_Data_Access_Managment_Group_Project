import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['student', 'admin', 'teacher'],
      default: 'student'
    },
  },
  { timestamps: true }
  
);



const User = mongoose.model('User', userSchema);

export { User }
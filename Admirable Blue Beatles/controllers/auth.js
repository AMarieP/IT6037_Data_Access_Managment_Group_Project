import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User } from '../models/user.js'

// Create a new user
const signUp = async (req, res, next) => {
  const { username,  password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.json({ message: 'User Registered Sucessfully', user });
  } catch (error) {
    res.status(500).send({ error });
  }
};

// Login
const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = bcrypt.compare(password, user.password)
    
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    return res.json({ token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, process.env.SECRET_KEY) });

  } catch (error) {
    next(error);
  }
};

export { signUp, login };
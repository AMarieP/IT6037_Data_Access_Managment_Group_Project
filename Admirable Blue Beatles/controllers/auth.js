import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User } from '../models/user.js'

// Create a new user
const signUp = async (req, res, next) => {
  const { username,  password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, role });
    await user.save();
    res.status(200).json({ message: 'User Registered Sucessfully', user });
  } catch (error) {
    res.status(500).send({ error });
  }
};

// Login
const login = async (req, res, next) => {
  if (req.session.user) {
    return res.redirect('/');
  }
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log(user.password,":",password)

    const passwordMatch =  bcrypt.compare(password, user.password)
    
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    req.session.user = {
          _id: user._id,
          username: user.username,
          role: user.role,
        };
    
    // return res.status(200).json({
    //       message: 'Login successful',
    //       user: req.session.user,
    //       token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, process.env.SECRET_KEY)
    //     });
    console.log("user logged in successfully ")
    // Redirect to the home page
    return res.redirect('/');
  } catch (error) {
    next(error);
  }
};

export { signUp, login };
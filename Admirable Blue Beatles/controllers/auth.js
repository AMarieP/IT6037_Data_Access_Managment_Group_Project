// -----------------------------------------------------------------------
// Controller File for Authentication; Sign Up and Login
// -----------------------------------------------------------------------
// This file is the controller file for Sign Up and Login routes. 
// It handles user registration and user login.
// -----------------------------------------------------------------------

//Imports
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User } from '../models/user.js'

// -----------------------------------------------------------------------
// Function: Sign Up
// -----------------------------------------------------------------------
// This function handles creating a new user when a user signs up. 
// It takes the username and password provided by the new user, hashes the password
// and then creates a new user object in the database. 
// It check to see if all the required input is there, if not it will send an error asking for valid input.
//Also runs a check to see if user with the same username exists, and  
// -----------------------------------------------------------------------
//Parameters:
//req: The request
//res: the response
// -----------------------------------------------------------------------

const signUp = async (req, res) => {
  //Sets username and password according to the request body
  const { username,  password } = req.body;
  //Sets role to the request body, or if no role is specified sets it to student. 
  const role = req.body.role || 'student';

  //Checks if username has been input
  if (!username) {
    //if there is no valid username, returns an error 500
    return res.status(400).send({ message: "You need to input a valid username!" });
  }
  
  //Checks if password has been input
  if (!password) {
    //if there is no valid password, returns an error 500
    return res.status(400).send({ message: "You need to input a valid password!" });
  }
  
  try {
    
    //Search database for user with matching username
    const isUser = await User.findOne({'username': username})
    if(isUser){
        //If there is a match, return error 409
        return res.status(409).send({message: "Please choose a different username, User already exists!"})
    }

    //Hashes given password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Create new user with the given values
    const user = new User({ username, password: hashedPassword, role });

    //Save the new user to the database
    await user.save();
    
    //Redirect to the login page, send status 200
    return res.status(200).redirect('/login');
  } catch (error) {
    //Handle any errors
    return res.status(500).send({ error });
  }
};

// -----------------------------------------------------------------------
// Function: Login
// -----------------------------------------------------------------------
// This function handles when an existing user logs in to the application.
//It checks if there is alreay an active session, and if not it will search for
//the user in the database and create a new session with a JWT token. 
//It handles if there is invalid username or password input and if user is already logged in. 
// -----------------------------------------------------------------------
//Parameters:
//req: The request
//res: the response
// -----------------------------------------------------------------------

const login = async (req, res) => {
  
  //Sets username and password to the req body
  const { username, password } = req.body;

  //Checks if session is already active and if so redirects to home page
  if (req.session.user) {
    return res.status(403).json({message: "User Already Logged In"}).redirect('/' );
  }

  //Checks if username has been input
  if (!username) {
    //if there is no valid username, returns an error 500
    return res.status(400).send({ message: "You need to input a valid username!" });
  }
  
  //Checks if password has been input
  if (!password) {
    //if there is no valid password, returns an error 500
    return res.status(400).send({ message: "You need to input a valid password!" });
  }

  try {
    
    //Search if there is a user matching this username
    const user = await User.findOne({ username });
    
    //Checks if user exists
    if (!user) {
      //if there is no valid user, send error 404
      return res.status(404).json({ message: 'User not found' });
    }
    
    //Check if password matches
    const passwordMatch =  await bcrypt.compare(password, user.password)
    
    //If passwords dont match, send error 401
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }
    
    //If user is valid, set the session to this user and create token. 
    req.session.user = {
          _id: user._id,
          username: user.username,
          role: user.role,
          token: jwt.sign(
            { email: user.email, fullName: user.fullName, _id: user._id }, 
            process.env.SECRET_KEY,
            {expiresIn: '1 hour'}
            )
        };
    return res.status(200).redirect('/');
  } catch (error) {
    //Handle any errors
    return res.status(500).send({ error });
  }
};

export { signUp, login };
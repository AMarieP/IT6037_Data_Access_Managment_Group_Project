import jwt from 'jsonwebtoken'
import { User } from '../models/user.js'

//Authenticates the Token for Sign In

const authenticate = async(req, res, next) =>  {
    
    //Checks if session and session.user are truthy
    if (req.session && req.session.user) {

        //Gets token from session
        const token = req.session.user.token

        //Decodes token
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY)

        //Gets user id from token
        const this_user_id = decodedToken._id

        //Search DB for the user
        const user = await User.findById(this_user_id)

        //Check is user is truthy
        if(!user){
            //If false send error 404
            return res.status(404).json({message: "User Not Found! Token is Invalid."})
        }else{
            //Set the req.user to this user
            req.user = user;
            //Run next function
            next()
        }

    }
    //Handles errors
    else{
        return res.status(404).json({message: "Error with Token! Not Signed In!"})
    }
  };

export { authenticate }
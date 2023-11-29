import jwt from 'jsonwebtoken'
import { User } from '../models/user.js'

//Authenticates the Token for Sign In
const authenticate = async(req, res, next) =>  {
    if (req.session && req.session.user) {
        // If there's a user in the session, it means the user is authenticated
        next();

    } else if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        const deocodedToken = jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET_KEY)
        const ID = deocodedToken._id
        const user = await User.findById(ID)
        console.log(user)
        if(!user){
            return res.status(404).json({message: "User Not Found!"})
        }else{
            req.user = user;
            next()
        }
    }else{
        return res.status(404).json({message: "Error with Token!"})
    }
  };

export { authenticate }
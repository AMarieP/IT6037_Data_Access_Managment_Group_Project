import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
import { User } from '../models/user.js'

//Checks a user's permissions
const isPermission = async(req, res, next, allowedRoles) =>  {

    //If no roles are defined, it will check for all roles
    const roles = allowedRoles || ['student', 'teacher', 'admin'];

    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        const deocodedToken = jwt.verify(req.headers.authorization.split(' ')[1], 'SECRETKEY')
        const ID = deocodedToken._id
        const user = await User.findById(ID)
        if(!user){
            return res.status(404).json({message: "Not Logged In"})
        }else{
            if(roles.some((roles) => {return roles == user.role})) next();
            else res.status(403).json({message: 'You are unauthorized for this action!'})
        }
    }else{
        return res.status(404).json({message: "Not Logged In!"})
    }

  };

export { isPermission }
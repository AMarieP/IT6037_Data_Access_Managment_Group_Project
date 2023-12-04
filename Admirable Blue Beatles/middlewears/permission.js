

//Checks a user's permissions
  const isPermission = async (req, res, next, allowedRoles) => {
    const roles = allowedRoles || ['student', 'teacher', 'admin'];
  
    if (req.session && req.session.user) {
      // If there's a user in the session, check if their role is allowed
      if (roles.some((role) => role === req.session.user.role)) {
        next();
      } else {
        res.status(403).json({ message: 'You are unauthorized for this action!' });
      }
    }else return res.status(404).json({ message: "You are not logged in!" });
  };


export { isPermission }
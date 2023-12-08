
// -----------------------------------------------------------------------------
//Middleware to check if user has permission. 
// -----------------------------------------------------------------------------
//
//This Middleware function performs a permission check to see if the user
//has the appropriate permissions to go to a route or complete a request
// -----------------------------------------------------------------------------
//Parameters:
//req: The request
//res: The response
//next: next function
//allowedRoles: Array containing the allowed roles. (This can be passed by a user, defaults to: ['student', 'teacher', 'admin'])
// -----------------------------------------------------------------------------
//How it works:
//If the user has the correct roles, next is called. If the user does not, then the function
//sends code 403.
//
//If there is no user in session, then it returns error 404. 
// -----------------------------------------------------------------------------

  const isPermission = async (req, res, next, allowedRoles) => {
    //If no 'allowedRoles' is passed, then use the roles ['student', 'teacher', 'admin']
    const roles = allowedRoles || ['student', 'teacher', 'admin'];
    
    //Check if there is an active session and a user in the session
    if (req.session && req.session.user) {

      //Check if the user's role matches with any of the allowed roles
      if (roles.some((role) => role === req.session.user.role)) {
        //If there is a match, proceed with request
        next();
      } else {
        //If there is no match, the user is not authenticated. Send 403 Forbidden response. 
        res.status(403).json({ message: 'You are unauthorized for this action!' });
      }
      //if there is no session or user, user in not logged in
    }else return res.status(404).json({ message: "You are not logged in!" });
  };


export { isPermission }
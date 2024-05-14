const { verifyToken } = require("./token");

// const checkRole = (userRole, sysRole) => {
//    return userRole.some((item) => sysRole.includes(item));
// }
const checkRole = (userRole, sysRole) => {
  if (!Array.isArray(userRole)) {
      return false; // Or handle the case where userRole is not an array
  }
  return userRole.some((item) => sysRole.includes(item));
}


// const secure= (sysRole) =>{
//     return (req,res,next) =>{
//       const {role} = req.headers;

//       const result = checkRole([role] ,sysRole);
//       console.log({result}); //why this result gives undefined??
//       if(!result) res.status(400).json({msg: "Unauthorized user"});
//       next();
//     }  
// }

const secure = (sysRole) => {
  return (req,res,next) => {
    try{
      const {token} = req.headers;
      console.log(token);

    //what to do if no token
    if(!token) throw new Error("Token is missing");
    //check the token is valid or not
    const isValid = verifyToken(token);
    console.log({isValid});
    
    // token expired??
    if(!isValid) throw new Error("Token expired");
      const {data} = isValid;
      const validRole = checkRole({sysRole, userRole: data?.roles });
      if(!validRole) throw new Error("User unauthorized");
      next();
    }catch(e){
      next(e);
    }
    
  }
};

module.exports = {checkRole, secure };
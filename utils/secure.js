
const checkRole = (userRole, sysRole) => {
    userRole.some((item) => sysRole.includes(item));
}

const mw = (sysRole) =>{
    return (req,res,next) =>{
      const {role} = req.headers;

      const result = checkRole([role] ,sysRole);
      console.log({result}); //why this result gives undefined??
      if(!result) res.status(400).json({msg: "Unauthorized user"});
      next();
    }
    
   
}

module.exports = {checkRole, mw};
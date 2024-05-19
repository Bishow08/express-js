// const { verifyToken } = require("./token");

// // const checkRole = (userRole, sysRole) => {
// //    return userRole.some((item) => sysRole.includes(item));
// // }
// const checkRole = (userRole, sysRole) => {
//   if (!Array.isArray(userRole)) {
//       return false; // Or handle the case where userRole is not an array
//   }
//   return userRole.some((item) => sysRole.includes(item));
// }

// const secure = (sysRole = []) => {
//   return (req,res,next) => {
//     try{
//       const {access_token} = req.headers;
//       console.log(token);

//     //what to do if no token
//     if(!token) throw new Error("Token is missing");
//     //check the token is valid or not
//     const isValid = verifyToken(access_token);
    
//     // token expired??
//     if(!isValid) throw new Error("Token expired");
//       const {data} = isValid;
//       // Check user email with database
//       const validRole = checkRole({sysRole, userRole: data?.roles });
//       if(!validRole) throw new Error("User unauthorized");
//       next();
//     }catch(e){
//       next(e);
//     }
    
//   }
// };

// module.exports = {checkRole, secure };

const { checkRole, verifyToken } = require("./token");



const secure = (sysRole) => {

    return (req, res, next) => {

        try {

            const { access_token } = req.headers;

            //what to do if no token

            if (!access_token) throw new Error("Token is missing");



            //check the roken valid or not

            const isValid = verifyToken(access_token);

            //Token expired

            if (!isValid) throw new Error("Token expired");

            const { data } = isValid;

            const validRole = checkRole({ sysRole, userRole: data?.roles || [] });

            if (!validRole) throw new Error("User unauthorized");

            next();

        } catch (e) {

            next(e);

        }



    };

};





module.exports = { secure };
const router = require("express").Router();

const {generateToken} = require("../../utils/token");

const {secure}= require("../../utils/secure");

const {sendMail} = require("../../services/mailer");
const event = require("events");

const eventEmitter = new event.EventEmitter();



/*
Register
Login
forget password
reset password
change password
verify token
change status of user
delete user
list users
update user
update my profile
get one user
*/
router.post("/register", (req,res,next) => {
    try{
        const { email } = req.body;
        
        if(!email) throw new Error("Email is missing");
        //call the nodemailer
        eventEmitter.addListener("signup", (email) => 
            sendMail({
                email, 
                subject: "MovieMate Signup", 
                htmlMsg: "<b> Thank you for joining MovieMate </b>"
        
               })
            );
            eventEmitter.emit("signup", email);
        res.json({msg: "User registerd successfully" });
    }catch(e){
        next(e);
    }
});



router.post("/login", (req,res,next) => {
    try{
        const {email, password} = req.body;
        
        if (email === "bishal@gmail.com" && password === "bishal"){
            //generate the jwt token
            const payload ={
             email,
             roles:["user", "admin"],
            }
             const token = generateToken(payload);
             res.json({msg: "user logged in successfully", data:token});
        }else{
        res.json({msg: "email or passwerd invalid", data:{}});
        }
        
    }catch(e){
        next(e);
    }
})

router.post("/:id/forget-password",(req,res,next) => {
    try{
        const {id} = req.params;
        res.json({msg: `Forget password through email and username of id ${id}` });
    }catch(e){
        next(e);
    }
});

router.patch("/:id/reset-password",(req,res,next) => {
    try{
        const {id} = req.params;
        res.json({msg: `Password reset successfully of id ${id}`});
    }catch(e){
        next(e);
    }
});

router.patch("/:id/change-password",(req,res,next) => {
    try{
        const {id} = req.params;
        res.json({msg: `Password updated successfully of id ${id}`});
    }catch(e){
        next(e);
    }
});

router.post("/:id/verify-token/:token",(req,res,next) => {
    try{
        const {id,token} = req.params;
        res.json({msg: `Token is verified of id ${id} and token ${token}`});
    }catch(e){
        next(e);
    }
});

router.patch("/:id/status",(req,res,next) => {
    try{
        const {id} = req.params;
        res.json({msg: `User status change of id ${id}`});
    }catch(e){
        next(e);
    }
});

router.delete("/:id",(req,res,next) => {
    try{
        const {id} = req.params;
        res.json({msg: `User deleted of id ${id}`});
    }catch(e){
        next(e);
    }
});

router.get("/", secure(["admin"]), (req,res,next) => {
    try{
        res.json({msg: "list all users"});
    }catch(e){
        next(e);
    }
});

router.put("/:id",(req,res,next) => {
    try{
        const {id} = req.params;
        res.json({msg: `User updated successfully of id ${id}`});
    }catch(e){
        next(e);
    }
});

router.patch("/profile",(req,res,next) => {
    try{
        const {id} = req.params;
        res.json({msg: "User profile updated"});
    }catch(e){
        next(e);
    }
});

router.get("/:id",(req,res,next) => {
    try{
        const {id} = req.params;
        res.json({msg: `Get one user of id ${id}`});
    }catch(e){
        next(e);
    }
});



module.exports = router;
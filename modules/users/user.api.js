const router = require("express").Router();

const {secure}= require("../../utils/secure");

const userController = require("./user.controller");

const { validator } = require("./user.validator");

const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/upload");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname.concat(
            "-",
            Date.now(),
            ".",
            file.originalname.split(".")[1]
        )
      );
    }
  });
  
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB file size limit
    }
});




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
router.post("/register", upload.single("profile"), //req.body, req.file, req.files 
validator, 
async(req,res,next) => {
    try{
        if (req.file){
            req.body.profile = req.file.path;
        }

        const result = await userController.create(req.body);
        //call the nodemailer
        
            
        res.json({msg: "User registerd successfully" , data: result});
    }catch(e){
        next(e);
    }
});


router.post("/login", async(req,res,next) => {
    try{
        
        const result = await userController.login(req.body)
        res.json({msg: "User login successfully" });
        
    }catch(e){
        next(e);
    }
})




router.post("/generate-email-token", async(req,res,next) => {
    try{
        
        const result = await userController.generateEmailToken(req.body);
        res.json({msg: "Generated user token" , data: result});
         
    }catch(e){
        next(e);
    }
});


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
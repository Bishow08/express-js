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
        res.json({msg: "User login successfully", data:result});
        
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

router.post("/verify-email-token", async(req,res,next) => {
    try{
        
        const result = await userController.verifyEmailToken(req.body)
        res.json({msg: "Email successfully sent", data:result});
        
    }catch(e){
        next(e);
    }
})

router.put("/profile", secure(), async(req, res, next) => {
    try{
        const result = await userController.updateById(req.currentUser, req.body);
        res.json({msg: "User Profile Updated successfully" , data: result});
    }catch(e){
        next(e);
    }
    
})

router.get("/:id",secure(["admin"]), async(req, res, next) => {
    try{
        const result = await userController.getById(req.params.id);
        res.json({msg:"User details generated", data: result});
    }catch(e){
        next(e);
    }
})

router.delete("/:id", async(req, res, next) => {
    try{
    
    }catch(e){
        next(e);
    }
    
})


router.post("/change-password", secure(["user", "admin"]), async(req, res, next) => {
    try{
        const result = await userController.changePassword(req.currentUser, req.body);
        res.json({msg: "Password change successfully", data: result});
    }catch(e){
        next(e);
    }
})

router.post("/reset-password", secure(["admin"]), async(req, res, next) => {
    try{
        const {id, newPassword} = req.body;
        if(!id || !newPassword) throw new Error("something went wrong");
    const result = await userController.resetPassword(id, newPassword);
    res.json({msg: "Password reset successfully", data: result});
    }catch(e){
        next(e);
    }
})

router.post("/forget-password-token", async(req, res, next) => {
    try{
        const result = await userController.forgetPasswordTokenGen(req.body);
        res.json({msg:"Foget password token sent successfully", data:result});
    }catch(e){
        next(e);
    }
})

router.post("/forget-password", async(req, res, next) => {
    try{
        const result = await userController.forgetPasswordPassChange(req.body);
        res.json({msg:"Foget changed successfully", data:result});
    }catch(e){
        next(e);
    }
})


router.get("/", secure(["admin"]), async(req,res,next) => {
    try{
        const data = await userController.list();
        res.json({msg: "list all users", data:data});
    }catch(e){
        next(e);
    }
});





module.exports = router;
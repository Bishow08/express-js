const express =require("express");
const router = express.Router();


router.post("/", (req,res,next)=>{
    try{
        res.json("orders creates successfully");
    }catch(e){
        next(e);
    }
})

router.get("/", (req,res,next)=>{
    try{
        res.json("orders listed");
    }catch(e){
        next(e);
    }
})

router.get("/:id", (req,res,next)=>{
    try{
        res.json("one order read");
    }catch(e){
        next(e);
    }
})

router.delete("/:id", (req,res,next){
    try{
        res.json({"one order read"});
    }catch(e){
        next(e);
    }
})

router.patch("/:id/status", (req,res,next)=>{
    try{
        res.json("change status here");
    }catch(e){
        next(e);
    }
})





modules.exports = router;
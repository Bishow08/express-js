const express = require("express");
const router = express.Router();

router.post("/",(req,res,next)=>{
    try{
        res.json({msg:"movie created"});
    }catch(e){
        next(e);
    }
})

router.get("/:id",(req,res,next)=>{
    try{
        res.json({msg:"one movie read"});
    }catch(e){
        next(e);
    }
})

router.put("/;id",(req,res,next)=>{
    try{
        res.json({msg:"movie updated"});
    }catch(e){
        next(e);
    }
})

router.delete("/:id",(req,res,next)=>{
    try{
        res.json({msg:"movie deleted"});
    }catch(e){
        next(e);
    }
})

router.get("/",(req,res,next)=>{
    try{
        res.json({msg:"movie listed successfully"});
    }catch(e){
        next(e);
    }
})

router.patch("/:id/seats",(req,res,next)=>{
    try{
        const {id} = req.params;
        res.json({msg:`"seat updated of one movie id ${id}"`});
    }catch(e){
        next(e);
    }
})

router.patch("/:id/release-date",(req,res,next)=>{
    try{
        res.json({msg:"changed releae date"});
    }catch(e){
        next(e);
    }
})



/*

*/
module.exports = router;
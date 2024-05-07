const router = require("express").Router();

/*
Create
List
Read one order
Delete the order
Change the status of order
Update the order
*/

router.post("/", (req,res, next)=>{
    try{
        res.json({msg: "Created new orders"});
    }catch(e){
        next(e);
    }
});

router.get("/", (req,res, next)=>{
    try{
        res.json({msg: "Movies orders listed"});
    }catch(e){
        next(e);
    }
});

router.get("/:id", (req,res, next)=>{
    try{
        const {id}= req.params;
        res.json({msg: `Get one order by id ${id}`});
    }catch(e){
        next(e);
    }
});

router.delete("/:id", (req,res, next)=>{
    try{
        const {id}= req.params;
        res.json({msg: `Deleted order by id ${id}`});
    }catch(e){
        next(e);
    }
});

router.patch("/:id/status", (req,res, next)=>{
    try{
        const {id}= req.params;
        res.json({msg: `Change order status of one order by id ${id}`});
    }catch(e){
        next(e);
    }
});

router.put("/:id", (req,res, next)=>{
    try{
        const {id}= req.params;
        res.json({msg: `Update the order by id ${id}`});
    }catch(e){
        next(e);
    }
});



module.exports = router;
const express = require("express");

const router = express.Router();

router.get("/students",(req,res)=>{
    res.json({msg: "Hello from students routes"})
});

module.exports = router;
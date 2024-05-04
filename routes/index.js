const express = require("express");

const router = express.Router();


router.get("/", (req, res)=>{
  
    res.json({ msg: "Hello  World! by Bishal"})
});

router.post("/post/:id", (req, res)=>{
    //client send the data
    res.json({ msg: "POST  World! by Bishal"})
console.log({query:req.query,params: req.params, body:req.body});

});

router.put("/:id", (req, res)=>{
    //client send the data
    console.log({query:req.query,params: req.params, body:req.body});
    res.json({ msg: "PUT  World! by Bishal"})
});

router.patch("/:id", (req, res)=>{
    //client send the data
    res.json({ msg: "PATCH  World! by Bishal"})
});

router.delete("/", (req, res)=>{
    res.json({ msg: "DELETE World! by Bishal"})
});

module.exports = router;
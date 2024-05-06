const express = require("express");

const router = express.Router();

const orderRouter = require("../modules/orders/order.api.");
const movieRouter = require("../modules/movies/movie.api");



// router.get("/", (req, res)=>{

//     res.json({ msg: "Hello  World! by Bishal"})
// });

// router.post("/post/:id", (req, res)=>{
//     //client send the data
//     res.json({ msg: "POST  World! by Bishal"})
// console.log({query:req.query,params: req.params, body:req.body});

// });

// router.put("/:id", (req, res)=>{
//     //client send the data
//     console.log({query:req.query,params: req.params, body:req.body});
//     res.json({ msg: "PUT  World! by Bishal"})
// });

// router.patch("/:id", (req, res)=>{
//     //client send the data
//     res.json({ msg: "PATCH  World! by Bishal"})
// });

// router.delete("/", (req, res)=>{
//     res.json({ msg: "DELETE World! by Bishal"})
// });
router.use("api/v1/orders",orderRouter);

router.use("api/v1/movies", movieRouter);

//register scenario
router.post("/register", (req, res, next) => {
	try{const { email, password } = req.body;

	if (email !== "bishal@gmail.com" || password !== "bishal") {
		res.json({ msg: "Invalid User" });
	} else {
		res.json({ msg: "User Registered successfully" });
	}
}catch(e){
    next(e);
}

	res.json({ msg: "User Registered" }); //This line is not executed because after executed if else block the function terminated
});

//login scenario

router.post("/login", (req, res, next) => {
    try{
        const {email, password} = req.body;
    
	//logic
    // exception handling in the logic

    if(email !== "bishal@gmail.com" || password !== "bishal"){
        throw new Error("Invalid Credentials");
    }else {
    res.json({ msg: "User Loggedin" });
    }
}catch(error){ //middleware is used for handling error and must have 4 arguments (err, req, res,next)
next(error);
}
});

module.exports = router;

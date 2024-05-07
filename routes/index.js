const express = require("express");

const router = express.Router();

const movieRouter = require("../modules/movies/movie.api");
const orderRouter = require("../modules/orders/order.api");
const userRouter = require("../modules/users/user.api");


// How to connect modules from routes index.js

router.get("/api/v1", (req, res, next)=>{
    try{
        res.json({msg: "MovieMate API is working"});
    }catch(e){
        next(e);
    }
});

router.use("/api/v1/movies", movieRouter);
router.use("/api/v1/orders", orderRouter);
router.use("/api/v1/users", userRouter);







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

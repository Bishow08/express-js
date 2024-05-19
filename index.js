require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const indexRouter = require("./routes");

mongoose
.connect(process.env.DB_URL)
.then(() => {
	console.log("Database connected successfully...");
})
.catch((e) => {
	console.log("error db connection", e);
});

const app = express();
const PORT = Number(process.env.PORT);

app.use(express.json()); // I can parse request body as json
app.use(morgan("dev"));
app.use(express.static("public"));

// middleware (application level custom mw)
// app.use((req, res, next)=>{
// 	req.body.country = "NP",
// 	req.body.currency = "NPR",
// 	req.body.currentTime = new Date().toISOString();
// 	next();
// });


app.use("/", indexRouter); // I am the routing mechanism, I will send the API request from / to indexRouter

// Error Handling
app.use((err, req, res, next)=>{
	const errorMsg = err ?  err.toString() : "something went wrong";
	res.status(500).json({msg: errorMsg});
})


app.listen(PORT, () => {
	console.log(`Application is running on port ${PORT}`);
});

// co
//     name: "bishal",
//     age: {dob: 1111},
// }

//destructure
// during destructure = represents default value

// const {name, age} = data;
// console.log(name,age);

//soc (separation of concern)
// handler is also called as the call back function

// folder structure -----

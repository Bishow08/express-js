require("dotenv").config();
const express = require("express");

const indexRouter = require("./routes");
const studentRouter = require("./routes/students");

const app = express();
const PORT = Number(process.env.PORT);

app.use(express.json()); // I can parse request body as json

app.use("/", indexRouter); // I am the routing mechanism, I will send the API request from / to indexRouter

app.use("/students",studentRouter);


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



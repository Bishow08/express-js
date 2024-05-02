require("dotenv").config();
const express = require("express");

const app = express();
const PORT = Number(process.env.PORT);

app.use(express.json());
app.get("/", (req, res)=>{
    res.json({ msg: "Hello  World! by Bishal"})
});

app.post("/post/:id", (req, res)=>{
    //client send the data
    res.json({ msg: "POST  World! by Bishal"})
console.log({query:req.query,params: req.params, body:req.body});

});

app.put("/:id", (req, res)=>{
    //client send the data
    console.log({query:req.query,params: req.params, body:req.body});
    res.json({ msg: "PUT  World! by Bishal"})
});

app.patch("/:id", (req, res)=>{
    //client send the data
    res.json({ msg: "PATCH  World! by Bishal"})
});

app.delete("/", (req, res)=>{
    res.json({ msg: "DELETE World! by Bishal"})
});


app.listen(PORT, () => {
    console.log(`Application is running on port ${PORT}`);
});

// const data = {
//     name: "bishal",
//     age: {dob: 1111},
// }

//destructure
// during destructure = represents default value

// const {name, age} = data;
// console.log(name,age);


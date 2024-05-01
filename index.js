require("dotenv").config();
const express = require("express");

const app = express();
const PORT = Number(process.env.PORT);

app.get("/", (req, res)=>{
    res.json({ msg: "Hello  World! by Bishal"})
});

app.listen(PORT, () => {
    console.log(`Application is running on port ${PORT}`);
});
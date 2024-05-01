1. npm init -y
2. npm i express --save
3. create .gitignore file > Add node_modules folder
4. create index.js file
5. update the script as dev: "node index.js" in the package.json
6. in index.js,
    const express = require("express);
    const app = express();

    app.get("/",(req,res)=>{
        res.json( {msg:"Hello World!"})
    })

    app.listen(8000, ()=>{
        console.log("Server is running on port 8000");
    })

    7. npm i --save-dev nodemon

    8. In package.json, scripts:{
        "dev":"nodemon index.js",
        "start": "node index.js"
    }

    9. npm run dev
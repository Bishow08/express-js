const movieController = require("./movie.controller");
const { validator } = require("./movie.validator");


const router = require("express").Router();

/* All movies API
List
Create
get one Movie (getById)
Update release Date (updateReleaseDate)
Delete
Update the seats for one movie
Change the release date of 1 movie
*/

router.get("/", (req,res,next) => {
    try{
        res.json({msg:"All movies list"});
    }catch(e){
        next(e);
    }
});

router.post("/create", async(req,res,next) => {
    try{
        const result = await movieController.create(req.body);
        res.json({msg:"Movie created successfully", data:result});
    }catch(e){
        next(e);
    }
});

router.get("/:id",(req,res,next) => {
    try{
        const {id}= req.params;
        res.json({msg:`one movie read of id ${id}`});
    }catch(e){
        next(e);
    }
});

router.put("/:id",(req,res,next) => {
    try{
        res.json({msg:`movie updated of id ${id}`});
    }catch(e){
        next(e);
    }
});

router.delete("/:id",(req,res,next) => {
    try{
        const {id}= req.params;
        res.json({msg:`movie deleted of id ${id}`});
    }catch(e){
        next(e);
    }
});


router.patch("/:id/seats",(req,res,next) => {
    try{
        const {id} = req.params;
        res.json({msg:`seat updated of one movie id ${id}`});
    }catch(e){
        next(e);
    }
});

router.patch("/:id/release-date",(req,res,next) =>{
    try{
        const {id}= req.params;
        res.json({msg:`changed releae date movie of id ${id}`});
    }catch(e){
        next(e);
    }
});




module.exports = router;
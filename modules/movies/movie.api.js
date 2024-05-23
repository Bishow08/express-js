const movieController = require("./movie.controller");
const { validator } = require("./movie.validator");
const multer = require("multer");
const {secure} = require("../../utils/secure");


const router = require("express").Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/upload/movies");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname.concat(
            "-",
            Date.now(),
            ".",
            file.originalname.split(".")[1]
        )
      );
    }
  });
  
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB file size limit
    }
});


/* All movies API
List
Create
get one Movie (getById)
Update release Date (updateReleaseDate)
Delete
Update the seats for one movie
Change the release date of 1 movie
*/

router.get("/", async(req,res,next) => {
    try{
        const result = await movieController.list();
        res.json({msg:"All movies list", data:result});
    }catch(e){
        next(e);
    }
});

router.post("/create", secure(["admin"]),
upload.single("poster"),
async(req,res,next) => {
    try{
        if (req.file) {
            req.body.poster = req.file.path;
        }
        const result = await movieController.create(req.body);
        res.json({msg:"Movie created successfully", data:result});
    }catch(e){
        next(e);
    }
});

router.get("/:slug", async(req,res,next) => {
    try{
        const {slug}= req.params;
        const result = await movieController.getBySlug(slug);
        res.json({msg:`one movie read of id ${slug}`, data:result});
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
// model CRUD + LIST (aggregation, pagination)
const { get } = require("mongoose");
const { Movie }= require("../movies/movie.model");

const getMovies = async(req, res, next) => {
    try{
        const data = req.body;
        const newMovie = new Movie(data);
        await newMovie.save();
        res.status(201).json({data: newMovie});
    }catch(e){
        next(e);
    }

}

module.exports = { getMovies };
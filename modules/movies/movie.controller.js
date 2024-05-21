// model CRUD + LIST (aggregation, pagination)
const movieModel = require("./movie.model");
const slugMake = require("../../utils/slug");

// movie create
const create = async(payload) => {
        //create slug from title
        const short = slugMake.slugMake(payload?.title);
        // check if the slug exists in db
        const movie = await movieModel.findOne({slug: short});
        if(movie) throw new Error("Movie already exist");
        payload.slug = short;
        // create the movie
        const result = movieModel.create(payload);
        return result;
};

//movie list
const list = () => {};

//get one movie 
const getById = (id) => {

};
;
//update release Date
const updateReleaseDate = (id, payload) => {};

//movie detail update
const update = (id, payload) => {};

// seats update
const updateSeats = (id, payload) => {};

// delete movie
const remove = (id) => {};


module.exports = { create, list, getById, updateReleaseDate, update, updateSeats, remove };
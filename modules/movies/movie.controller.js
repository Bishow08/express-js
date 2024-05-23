// model CRUD + LIST (aggregation, pagination)
const movieModel = require("./movie.model");
const {slugger} = require("../../utils/text");

// movie create
const create = async(payload) => {
        //create slug from title (slugify)
        const slug = slugger(payload?.title);
        // check if the slug exists in db
        const movie = await movieModel.findOne({slug});
        if(movie) throw new Error("Movie title is already in use");
        // create the movie
        payload.slug = slug;
        console.log({slug})
        const result = await movieModel.create(payload);
        return result;
};

//movie list
const list = () => {
        return movieModel.find();
};

//get one movie 
const getBySlug = (slug) => {
        return movieModel.findOne({ slug });
};

//update release Date
const updateReleaseDate = (id, payload) => {
        
};

//movie detail update
const update = (id, payload) => {};

// seats update
const updateSeats = (id, payload) => {};

// delete movie
const remove = (id) => {};


module.exports = { create, list, getBySlug, updateReleaseDate, update, updateSeats, remove };
// schema
// validation
// model
const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    email: {
        type :String,
        required: true,
        unique: true,
    },
    title: {
        type : String,
        required : true,
        trim: true  
    },
    description : {
        type : String,
        required : true,
    },
    genre : {
        type : String,
        required : true,
        enum : ['Action', 'Adventure', 'Comedy', 'Drama', 'Thriller', 'Animation']
    },
    releaseDate : {
        type : Date,
        required : true
    }

})

const Movie = mongoose.model('Movie', movieSchema);

module.exports = { Movie };
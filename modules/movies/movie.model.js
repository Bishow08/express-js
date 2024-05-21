// schema
// validation
// model
const { Schema, model } = require("mongoose");
//schema
const movieSchema = new Schema({
    title: {
        type : String,
        required : true,
        unique: true, 
    },
    slug: {
     type: String,   
    },
    duration: {
        type: String, 
        required: true,
    },
     synopsis: {
        type : String,
    },
    poster:{
        type : String,
        required:false,
    },
    releaseDate : {
        type : Date,
        required : true,
        default: Date.now,
    },
    endDate:{
        type : Date,
        required: true,
        default: Date.now,
    },
    seats:{
        type : Number,
        required: true,
        default: 0,
    },
    //TODO (reference)
    //createdBy: {}

}, 
{
    timestamps: true,
});


module.exports = model("Movie", movieSchema);
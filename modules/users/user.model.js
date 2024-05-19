
const { Schema , model } = require("mongoose");

//class is initiates by new keyword
const userSchema = new Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    roles : 
        {
        type : Array,
        default : ["user"],
        required : true,
    },

    image : {
        type : String
    },
    otp: {type : String},
    
    isEmailVerified : {
        type : Boolean, required : true, default : false,
    },
    isActive : {
        type : Boolean,
        requierd : true,
        default : true,
    }},
    { timestamps : true }
)



module.exports = model("User", userSchema);
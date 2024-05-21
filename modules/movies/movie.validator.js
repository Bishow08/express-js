const Joi = require("joi");

//schema
const movieSchema = Joi.object({
    title: Joi.string()
    .alphanum()
    .min(5)
    .max(20)
    .required(),
    duration: Joi.string()
    .required(),
    synopsis: Joi.string(),
   name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
   email: Joi.string()
   .email({ minDomainSegments: 1, tlds: { allow: [ 'com' ] } 
}),
password: Joi.string().required(),
roles : Joi.array().items(Joi.string().valid("admin","user")),
image: Joi.string(),
isEmailVerified: Joi.boolean(),
isActive: Joi.boolean(),
gender: Joi.string().valid("f", "m", "o"),
profile: Joi.string(),
});

//mw define
const validator = async(req, res, next) =>{
   try{
      const { error } = await movieSchema.validateAsync(req.body);
      if(error) next(error);
      next();
   }catch(e){
      next(e);
   }
};


module.exports = { validator };
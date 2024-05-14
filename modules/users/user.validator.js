const Joi = require("joi");

//schema
const userSchema = Joi.object({
   username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
   email: Joi.string()
   .email({ minDomainSegments: 1, tlds: { allow: [ 'com' ] } 
}),
gender: Joi.string().valid("f", "m", "o"),
profile: Joi.string(),
});

//mw define
const validator = async(req, res, next) =>{
   try{
      const { error } = await userSchema.validateAsync(req.body);
      if(error) next(error);
      next();
   }catch(e){
      next(e);
   }
};


module.exports = { validator };
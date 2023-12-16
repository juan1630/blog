import Joi from 'joi';


Joi.object({
    name: Joi.string().required(),
    email:Joi.string().required(),
    passworod: Joi.string().required()
    
});



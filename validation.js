
const Joi = require('@hapi/joi');

const registrationValidate = data => {
    const schema = Joi.object({
        username: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
}

const loginValidate = data => {
    const schema = Joi.object({
        username: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
}


module.exports.registrationValidate = registrationValidate;
module.exports.loginValidate = loginValidate;
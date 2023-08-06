const Joi = require("joi");

const categoryValidatationSchema = Joi.object({
    title: Joi.string().min(2).required(),
    shortName: Joi.string().min(2).required(),
});

module.exports = { categoryValidatationSchema };

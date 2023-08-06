const Joi = require("joi");

const blogValidationSchema = Joi.object({
    title: Joi.string().required(),
    image: Joi.string().required(),
    tip: Joi.string().required(),
});

module.exports = { blogValidationSchema };

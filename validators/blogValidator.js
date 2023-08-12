const Joi = require("joi");

const blogValidationSchema = Joi.object({
    title: Joi.string().required(),
    image: Joi.string().required(),
    tip: Joi.string().required(),
});

const searchBlogValidationSchema = Joi.object({
    title: Joi.string().required().min(3),
});

module.exports = { blogValidationSchema, searchBlogValidationSchema };

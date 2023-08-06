const Joi = require("joi");

const productValidationSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().min(20).required(),
    priceOriginal: Joi.number().required(),
    offPercent: Joi.number(),
    ability: Joi.string().required(),
});

module.exports = { productValidationSchema };

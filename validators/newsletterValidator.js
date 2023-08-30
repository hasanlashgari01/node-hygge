const Joi = require("joi");

const newsletterSchema = Joi.object({
    email: Joi.string().email().required(),
});

module.exports = newsletterSchema;

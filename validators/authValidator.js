const Joi = require("joi");

const registerValidationSchema = Joi.object({
    fullName: Joi.string().min(3).max(28).required(),
    username: Joi.string().min(3).max(28).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .min(6)
        .max(20)
        .required()
        .regex(/[a-zA-Z0-9]{6,20}/),
    confirmPassword: Joi.ref("password"),
});

const loginValidationSchema = Joi.object({
    email: Joi.string().email().message("Email or Password isn't valid").required(),
    password: Joi.string()
        .min(6)
        .max(20)
        .required()
        .regex(/[a-zA-Z0-9]{6,20}/),
});

module.exports = {
    registerValidationSchema,
    loginValidationSchema,
};

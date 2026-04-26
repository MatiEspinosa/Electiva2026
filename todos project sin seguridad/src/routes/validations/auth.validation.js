const Joi = require("joi");

const signupSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    username: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(3).max(20).alphanum().required(),
    email: Joi.string().min(3).max(20).required()
})

const loginSchema = Joi.object({
    userName: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(3).max(20).alphanum().required(),
})

module.exports = {
    signupSchema,
    loginSchema
}
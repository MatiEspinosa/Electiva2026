const Joi = require("joi");

const todoSchema = Joi.object({
  title: Joi.string().min(3).max(20).required(),
  description: Joi.string().min(3).max(20).required()
});

module.exports = todoSchema;

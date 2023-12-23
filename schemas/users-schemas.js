import Joi from "joi";

export const usersLoginSchema = Joi.object({
  nickname: Joi.string().required(),
  password: Joi.string().required(),
}).messages({
  "string.base": "{#key} must be a string",
  "string.empty": "{#key} cannot be an empty field",
  "any.required": "missing required {#key} field",
});

export const updateProgressSchema = Joi.object({
  progress: Joi.number().required(),
}).messages({
  "number.base": "{#key} must be a number",
  "number.empty": "{#key} cannot be an empty field",
  "any.required": "missing required {#key} field",
});

export const updateCorrectAnswersSchema = Joi.object({
  correct: Joi.number().required(),
}).messages({
  "number.base": "{#key} must be a number",
  "number.empty": "{#key} cannot be an empty field",
  "any.required": "missing required {#key} field",
});

export const updateStatusSchema = Joi.object({
  status: Joi.boolean().required(),
}).messages({
  "boolean.base": "{#key} must be a boolean",
  "boolean.empty": "{#key} cannot be an empty field",
  "any.required": "missing required {#key} field",
});

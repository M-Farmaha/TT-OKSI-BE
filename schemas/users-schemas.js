import Joi from "joi";

export const usersLoginSchema = Joi.object({
  nickname: Joi.string().required(),
  password: Joi.string().required(),
}).messages({
  "string.base": "{#key} must be a string",
  "string.empty": "{#key} cannot be an empty field",
  "any.required": "missing required {#key} field",
});
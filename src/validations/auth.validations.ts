import Joi from "joi";

export const userSchema = Joi.object({
  name: Joi.string().allow("", null),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

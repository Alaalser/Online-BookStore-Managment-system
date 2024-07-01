import Joi from "joi";

export const addressSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  countryCode: Joi.string().required(),
  mobile: Joi.string().required(),
  location: Joi.string().required(),
});

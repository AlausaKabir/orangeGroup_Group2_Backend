const joi = require('joi');

export const createUserSchema = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  email: joi.string().email().required(),
  phone: joi.string().required(),
  password: joi.string().required(),
});

export const loginUserSchema = joi
  .object({
    email: joi.string().email(),
    password: joi.string().min(6).max(30).required(),
    phone: joi.string(),
    emailVerified: joi.boolean(),
  })
const Joi = require('@hapi/joi');

const userValidator = Joi.object({
  type: Joi.string().min(2).max(2).required(),
  name: Joi.string().required(),
  cpfCnpj: Joi.string().min(11).max(14).required(),
  sex: Joi.string().min(1).max(1).required(),
  birthday: Joi.date(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  photoUrl: Joi.string().required(),
});

module.exports = userValidator;

const Joi = require('@hapi/joi');

module.exports = Joi.object().keys({
  type: Joi.string().min(2).max(2).required(),
  name: Joi.string().required(),
  cpfCnpj: Joi.string().min(11).max(14).required(),
  sex: Joi.string().min(1).max(1),
  birthday: Joi.date(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  photoUrl: Joi.string().required(),
});

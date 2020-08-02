const Joi = require('@hapi/joi');

module.exports = Joi.object().keys({
  zipCode: Joi.string().min(8).max(8).required(),
  street: Joi.string().required(),
  number: Joi.number().required(),
  complement: Joi.string().allow(null).allow(''),
  district: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
});

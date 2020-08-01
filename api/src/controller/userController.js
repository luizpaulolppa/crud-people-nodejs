const User = require('../model/User');

module.exports = {
  async index(ctx) {
    const users = await User.find();
    ctx.body = users;
  },

  async find(ctx) {
    ctx.body = {};
  },

  async create(ctx) {
    const {
      type,
      name,
      companyName,
      cpfCnpj,
      sex,
      birthday,
      email,
      phone,
      photoUrl,
    } = ctx.request.body;
    ctx.body = {
      type,
      name,
      companyName,
      cpfCnpj,
      sex,
      birthday,
      email,
      phone,
      photoUrl,
    };
  },

  async update(ctx) {
    ctx.body = {};
  },

  async delete(ctx) {
    ctx.body = {};
  },
};

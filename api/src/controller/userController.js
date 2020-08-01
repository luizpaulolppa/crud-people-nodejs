const User = require('../model/User');
const userValidator = require('../validator/userValidator');

module.exports = {
  async index(ctx) {
    const users = await User.find();
    ctx.body = users;
  },

  async find(ctx) {
    const { id } = ctx.params.id;
    const user = await User.find(id);
    ctx.body = user;
  },

  async create(ctx) {
    try {
      const {
        type, name, cpfCnpj, sex, birthday, email, phone, photoUrl,
      } = ctx.request.body;

      await userValidator.validateAsync({
        type, name, cpfCnpj, sex, birthday, email, phone, photoUrl,
      });

      const user = await User.create({
        type, name, cpfCnpj, sex, birthday, email, phone, photoUrl,
      });

      ctx.body = user;
    } catch (ex) {
      ctx.body = { error: ex };
    }
  },

  async update(ctx) {
    ctx.body = {};
  },

  async delete(ctx) {
    ctx.body = {};
  },
};

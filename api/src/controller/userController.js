module.exports = {
  async index(ctx) {
    ctx.body = {};
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

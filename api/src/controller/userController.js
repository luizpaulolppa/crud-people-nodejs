const User = require('../model/User');
const userValidator = require('../validator/userValidator');
const { mapErrors } = require('../util/mapErros');
const { validCpfCnpj } = require('../util/validators');

module.exports = {
  async index(ctx) {
    try {
      const users = await User.find({ active: true });
      ctx.body = users.map((user) => ({
        id: user._id,
        type: user.type,
        name: user.name,
        cpfCnpj: user.cpfCnpj,
        sex: user.sex,
        birthday: user.birthday,
        email: user.email,
        phone: user.phone,
        photoUrl: user.photoUrl,
        createdAt: user.createdAt,
      }));
    } catch (ex) {
      ctx.status = 500;
    }
  },

  async find(ctx) {
    try {
      const { id } = ctx.params;
      const user = await User.findOne({ _id: id, active: true });

      if (user) {
        ctx.body = {
          id: user._id,
          type: user.type,
          name: user.name,
          cpfCnpj: user.cpfCnpj,
          sex: user.sex,
          birthday: user.birthday,
          email: user.email,
          phone: user.phone,
          photoUrl: user.photoUrl,
          createdAt: user.createdAt,
        };
      } else {
        ctx.status = 204;
      }
    } catch (ex) {
      ctx.status = 500;
    }
  },

  async create(ctx) {
    try {
      await userValidator.validateAsync(ctx.request.body);

      const {
        type, name, cpfCnpj, email, phone, photoUrl,
      } = ctx.request.body;

      let { sex, birthday } = ctx.request.body;

      if (!['PF', 'PJ'].includes(type)) {
        ctx.body = {
          errors: [
            {
              key: 'type',
              message: 'Tipo de usuário inválido',
            },
          ],
        };
        return;
      }

      if (type === 'PJ') {
        sex = null;
        birthday = null;
      } else {
        if (!sex) {
          ctx.body = {
            errors: [
              {
                key: 'sex',
                message: 'Sexo inválido',
              },
            ],
          };
          return;
        }

        if (!birthday) {
          ctx.body = {
            errors: [
              {
                key: 'birthday',
                message: 'Data de aniversário inválido',
              },
            ],
          };
          return;
        }
      }

      let user = await User.findOne({ email });
      if (user) {
        ctx.body = {
          errors: [
            {
              key: 'email',
              message: 'E-mail já existe.',
            },
          ],
        };
        return;
      }

      user = await User.findOne({ cpfCnpj });
      if (user) {
        ctx.body = {
          errors: [
            {
              key: 'cpfCnpj',
              message: 'CPF/CNPJ já existe.',
            },
          ],
        };
        return;
      }

      if (!validCpfCnpj(type, cpfCnpj)) {
        ctx.body = {
          errors: [
            {
              key: 'cpfCnpj',
              message: 'CPF/CNPJ inválido.',
            },
          ],
        };
        return;
      }

      user = await User.create({
        type, name, cpfCnpj, sex, birthday, email, phone, photoUrl,
      });

      ctx.status = 201;
      ctx.body = {
        id: user._id,
        type: user.type,
        name: user.name,
        cpfCnpj: user.cpfCnpj,
        sex: user.sex,
        birthday: user.birthday,
        email: user.email,
        phone: user.phone,
        photoUrl: user.photoUrl,
        createdAt: user.createdAt,
      };
    } catch (ex) {
      if (ex.details && ex.details.length) {
        ctx.status = 403;
        ctx.body = { errors: mapErrors(ex.details) };
      } else {
        ctx.status = 500;
        ctx.body = { error: ex };
      }
    }
  },

  async update(ctx) {
    try {
      await userValidator.validateAsync(ctx.request.body);

      const { id } = ctx.params;

      const {
        type, name, cpfCnpj, email, phone, photoUrl,
      } = ctx.request.body;

      let { sex, birthday } = ctx.request.body;

      if (!['PF', 'PJ'].includes(type)) {
        ctx.body = {
          errors: [
            {
              key: 'type',
              message: 'Tipo de usuário inválido',
            },
          ],
        };
        return;
      }

      if (type === 'PJ') {
        sex = null;
        birthday = null;
      } else {
        if (!sex) {
          ctx.body = {
            errors: [
              {
                key: 'sex',
                message: 'Sexo inválido',
              },
            ],
          };
          return;
        }

        if (!birthday) {
          ctx.body = {
            errors: [
              {
                key: 'birthday',
                message: 'Data de aniversário inválido',
              },
            ],
          };
          return;
        }
      }

      let user = await User.findOne({ _id: id });
      if (!user) {
        ctx.body = {
          errors: [
            {
              key: 'id',
              message: 'Usuário não existe.',
            },
          ],
        };
        return;
      }

      user = await User.findOne({ email });
      if (user && `${user._id}` !== `${id}`) {
        ctx.body = {
          errors: [
            {
              key: 'email',
              message: 'E-mail já existe.',
            },
          ],
        };
        return;
      }

      user = await User.findOne({ cpfCnpj });
      if (user && `${user._id}` !== `${id}`) {
        ctx.body = {
          errors: [
            {
              key: 'cpfCnpj',
              message: 'CPF/CNPJ já existe.',
            },
          ],
        };
        return;
      }

      if (!validCpfCnpj(type, cpfCnpj)) {
        ctx.body = {
          errors: [
            {
              key: 'cpfCnpj',
              message: 'CPF/CNPJ inválido.',
            },
          ],
        };
        return;
      }

      await User.findOne({ _id: id }).update({
        type, name, cpfCnpj, sex, birthday, email, phone, photoUrl,
      });

      user = await User.findOne({ _id: id });

      ctx.status = 200;
      ctx.body = {
        id: user._id,
        type: user.type,
        name: user.name,
        cpfCnpj: user.cpfCnpj,
        sex: user.sex,
        birthday: user.birthday,
        email: user.email,
        phone: user.phone,
        photoUrl: user.photoUrl,
        createdAt: user.createdAt,
      };
    } catch (ex) {
      if (ex.details && ex.details.length) {
        ctx.status = 403;
        ctx.body = { errors: mapErrors(ex.details) };
      } else {
        ctx.status = 500;
        ctx.body = { error: ex };
      }
    }
  },

  async delete(ctx) {
    try {
      const { id } = ctx.params;

      const user = await User.findOne({ _id: id });
      if (user) {
        await User.update({ active: false });
        ctx.status = 200;
      } else {
        ctx.body = {
          errors: [
            {
              key: 'id',
              message: 'Usuário não existe.',
            },
          ],
        };
      }
    } catch (ex) {
      ctx.status = 500;
      ctx.body = { error: 'Erro ao excluir usuário' };
    }
  },
};

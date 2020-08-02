const Address = require('../model/Address');
const User = require('../model/User');
const addressValidator = require('../validator/addressValidator');
const { mapErrors } = require('../util/mapErros');
const { pageLimit } = require('../contants');

module.exports = {
  async index(ctx) {
    try {
      const page = Number(ctx.request.query.page || 1);
      const { user_id: userId } = ctx.params;

      let addresses = await Address.find({ user: userId })
        .limit(pageLimit)
        .skip((page - 1) * pageLimit)
        .sort({ name: 'asc' });

      const total = await Address.count();
      const totalPages = Math.ceil(total / pageLimit);

      addresses = addresses.map((address) => ({
        id: address._id,
        street: address.street,
        number: address.number,
        complement: address.complement,
        district: address.district,
        city: address.city,
        state: address.state,
        zipCode: address.zipCode,
        createdAt: address.createdAt,
      }));

      ctx.body = {
        addresses,
        page,
        pageSize: pageLimit,
        totalPages,
        total,
      };
    } catch (ex) {
      ctx.status = 500;
    }
  },

  async find(ctx) {
    try {
      const { user_id: userId, address_id: addressId } = ctx.params;
      const address = await Address.findOne({ _id: addressId, user: userId });

      if (address) {
        ctx.body = {
          id: address._id,
          street: address.street,
          number: address.number,
          complement: address.complement,
          district: address.district,
          city: address.city,
          state: address.state,
          zipCode: address.zipCode,
          createdAt: address.createdAt,
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
      const { user_id: userId } = ctx.params;

      await addressValidator.validateAsync(ctx.request.body);

      const {
        street,
        number,
        complement,
        district,
        city,
        state,
        zipCode,
      } = ctx.request.body;

      const user = await User.findOne({ _id: userId });
      if (!user) {
        ctx.body = {
          errors: [
            {
              key: 'email',
              message: 'Usuário não existe.',
            },
          ],
        };
        return;
      }

      const address = await Address.create({
        street, number, complement, district, city, state, zipCode, user,
      });

      ctx.status = 201;
      ctx.body = {
        id: address._id,
        street: address.street,
        number: address.number,
        complement: address.complement,
        district: address.district,
        city: address.city,
        state: address.state,
        zipCode: address.zipCode,
        createdAt: address.createdAt,
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
      const { user_id: userId, address_id: addressId } = ctx.params;

      await addressValidator.validateAsync(ctx.request.body);

      const {
        street,
        number,
        complement,
        district,
        city,
        state,
        zipCode,
      } = ctx.request.body;

      const user = await User.findOne({ _id: userId });
      if (!user) {
        ctx.body = {
          errors: [
            {
              key: 'email',
              message: 'Usuário não existe.',
            },
          ],
        };
        return;
      }

      let address = await Address.findOne({ _id: addressId, user: userId });
      if (!address) {
        ctx.body = {
          errors: [
            {
              key: 'address_id',
              message: 'Endereço não existe.',
            },
          ],
        };
        return;
      }

      await Address.findOne({ _id: addressId }).update({
        street, number, complement, district, city, state, zipCode,
      });

      address = await Address.findOne({ _id: addressId });

      ctx.status = 201;
      ctx.body = {
        id: address._id,
        street: address.street,
        number: address.number,
        complement: address.complement,
        district: address.district,
        city: address.city,
        state: address.state,
        zipCode: address.zipCode,
        createdAt: address.createdAt,
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
      const { address_id: addressId, user_id: userId } = ctx.params;

      const user = await User.findOne({ _id: userId });
      if (!user) {
        ctx.body = {
          errors: [
            {
              key: 'user_id',
              message: 'Usuário não existe.',
            },
          ],
        };
      }

      const address = await Address.findOne({ _id: addressId, user: userId });
      if (!address) {
        ctx.body = {
          errors: [
            {
              key: 'address_id',
              message: 'Endereço não existe.',
            },
          ],
        };
      }

      await Address.deleteOne({ _id: addressId });
      ctx.status = 200;
    } catch (ex) {
      ctx.status = 500;
      ctx.body = { error: 'Erro ao excluir usuário' };
    }
  },
};
